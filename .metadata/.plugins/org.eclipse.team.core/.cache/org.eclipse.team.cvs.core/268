Ext.define('MOST.view.billing.ExportReconcileForLiquidController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.exportreconcileforliquid',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	VERIFY_LABEL : "Verify",
	UNVERIFY_LABEL : "Unverify",
	VERIFY_COLOR : "#ff80ff",
	UNVERIFY_COLOR : "#c0c0c0",
	
	MAIN_GRID_REF_NAME: 'refExportReconcileForLiquidGrid',
	MAIN_STORE_NAME: 'exportReconcileForLiquidList',	
	
	MF_GRID_REF_NAME: 'refExportReconcileForLiquidMfGrid',
	MF_STORE_NAME: 'exportReconcileForLiquidMfList',			
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.billing.SearchExportReconcileForLiquidParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		refs.ctlVerifyText.setValue(me.UNVERIFY_LABEL);
		refs.ctlVerifybtn.setText(me.VERIFY_LABEL);
		
		//Load ComboBox
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		var exportReconcilePackageTypeList = me.getStore('exportReconcilePackageTypeList');
		var operationTypeCombo = me.getStore('operationTypeCombo');
		
		cargoTypeCombo.load();
		exportReconcilePackageTypeList.load();
		operationTypeCombo.load();
		
	},
	
	onGridComboRenderer: function(val, cell){
		var me = this;
		var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'cgTpCd'){
			codeComboStore = me.getViewModel().getStore('cargoTypeCombo');
		}else if(cell.column.dataIndex == 'pkgTpCd'){
			codeComboStore = me.getViewModel().getStore('exportReconcilePackageTypeList');
		}
		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'cgTpCd') {
				indx = codeComboStore.find(codeFieldName, val);
			}else if(cell.column.dataIndex == 'pkgTpCd'){
				indx = codeComboStore.find(codeFieldName, val);
				cell.style =  'background: #ffffb3;';
			}
			
			if(indx != -1) {
				return codeComboStore.getAt(indx).get(displayFieldName);
			}
		}
	},

	/**
	 * =========================================================================================================================
	 * INITIALIZE END
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
						return null;
					}else{
						me.onSetVerifyStatus();
						me.onSearchManifestList();
					}
				}
			}
		});
	},
	
	onOpenCommonCodePopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var params = {
				searchType: 'CMDT',
				searchDivCd: selection.data.cgTpCd
			};
		
		me.openCodePopup('popup-cmmcdpopup', field.reference, params);
	},
	
	onCancelEdit: function(rowEditing, context) {
		if (context.record.phantom) {
			context.store.remove(context.record);
		}
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
	},
	
	onValidateBeforEdit: function (editor, context, eOpts) {
        var me = this;
        var refs = me.getReferences();
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        var statusStore = me.getStore('exportReconcileForLiquidStatusList');
		if(statusStore.data.items.length > 0){
			if(statusStore.data.items[0].data.status == "Y"){
				MessageUtil.warning('warning_msg', 'exportexportreconcile_verified_edit_data_msg');
				return false;
			}
		}
	},
	
	onValidateEdit:	function(editor, context) {
		var me = this;
		if(context.record.phantom == true) {
			//var systemCodeDuplicateCheckStore = me.getStore('exportReconcileRecclList');
			//me.gridDupliationCheck(editor, context, systemCodeDuplicateCheckStore, params);
		}
	},
	
	// Cell Click
	onCellClick: function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusStore = me.getStore('exportReconcileForLiquidStatusList');
		if(statusStore.data.items.length > 0){
			if(statusStore.data.items[0].data.status == "Y"){
				MessageUtil.warning('warning_msg', 'exportexportreconcile_verified_edit_data_msg');
				return null;
			}
		}
	},
	
	onSave: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var theSearch = me.getViewModel().get('theSearch');
		
		var statusStore = me.getStore('exportReconcileForLiquidStatusList');
		var masterItem = Ext.create('MOST.model.billing.ExportReconcileForLiquid');
		var statusItem = Ext.create('MOST.model.billing.ExportReconcileForLiquid');
		var arrItems = new Array();
		var statusItems = new Array();
		
		if(refs.ctlVesselCallIdfield.getValue() == "" || refs.ctlVesselCallIdfield.getValue() == null){
			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
			return null;
		}
		
		if(statusStore.data.length > 0 && statusStore.data.items[0].data.status == "Y"){
			MessageUtil.warning('warning_msg', 'exportexportreconcile_verified_save_data_msg');
			return null;
		}
		
		masterItem.phantom = false; // UPDATE
		
		// CREATE, UPDATE RECORD
		store.data.items.forEach(function(record, index, array){
//			if(record.data.statCd == "Y"){
//				MessageUtil.warning('warning_msg', 'exportexportreconcile_verified_save_data_msg');
//				return null;
//			}
			
			record.set('userId', Token.getUserId());
			record.set('newVersion', me.generateUuid());
			record.data.workingStatus = WorkingStatus.UPDATE;
			
			arrItems.push(record.data);
		});
		
		for(var i=0;i<arrItems.length;i++){
			if(arrItems[i].cgTpCd == null || arrItems[i].cgTpCd ==""){
				MessageUtil.warning('warning_msg', 'exportexportreconcile_no_select_cargotype');
				return null;
			}
		}

		if(arrItems.length == 0){
			MessageUtil.warning('warning_msg', 'There is no data to change. Please check again.');
			return;
		}
		
//		To perform the save logic only when modified
		if(masterItem.dirty||arrItems.length>0){
			masterItem.set("vslCallId", theSearch.data.vslCallId);
			masterItem.set("workingStatus", WorkingStatus.UPDATE);
			masterItem.set("items",arrItems);
			masterItem.set("statusitems",statusItems);
			masterItem.set('newVersion', me.generateUuid());
			
			var isCreated = masterItem.phantom;
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcileforliquid/list';
			
			updateParm.phantom = isCreated;
			updateParm.set("workingStatus", isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set("item", masterItem.data);
			updateParm.set("userId", Token.getUserId());
			updateParm.set('newVersion', me.generateUuid());
			updateParm.save({
				success:function(){
					masterItem.set("version", masterItem.get('newVersion'));
					masterItem.commit();
					MessageUtil.saveSuccess();
					me.onSearch();
				}
			});
		}
	},
	
	onVerify : function(){
		var me = this;
		var refs = me.getReferences();
    	var recclList = me.getStore(me.MAIN_STORE_NAME);
    	
		if(refs.ctlVerifybtn.getText() == me.VERIFY_LABEL){
			me.onVerifyData();
		}else{
			me.onUnverifyData();
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchExportReconcileForLiquidParm';
		searchBizParm.serviceID = 'MOST.exportReconcileForLiquid.selectExportReconcileForLiquidList';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
    	if(searchParm.get("vslCallId") == ''){
    		MessageUtil.warning("warning_msg", "goodsreceipt_jpvc_input_msg");
    		return;
    	}
    	
		params['vslCallId'] = StringUtil.toUpperCase(searchParm.get("vslCallId"));
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
    	
       	return params;
	},
	
	//popup
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(targetControl === 'ctlVesselCallIdfield'){
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
			} else {
				me.getViewModel().setData({theVsl:null});
			}
		} else if(targetControl === 'refTxtCmdtCode'){
			if(returnValue){
				selection.set('cmdtCd', returnValue.code);
			} else {
				refs.refTxtCmdtCode.setValue('');
			}
		}
	},
	
	onSetVerifyStatus: function(){
		var me = this;
		var refs = me.getReferences();
		var label = refs.ctlVerifyText;
		
		var store = me.getStore('exportReconcileForLiquidStatusList');
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		params['vslCallId'] = StringUtil.toUpperCase(searchParm.get("vslCallId"));
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0  && records[0].data.status == "Y"){
						refs.ctlVerifyText.setValue(me.VERIFY_LABEL);
						label.setFieldStyle('background-color: ' + me.VERIFY_COLOR + ';background-image:none;');
						refs.ctlVerifybtn.setText(me.UNVERIFY_LABEL);
					}else{
						refs.ctlVerifyText.setValue(me.UNVERIFY_LABEL);
						label.setFieldStyle('background-color: ' + me.UNVERIFY_COLOR + ';background-image:none;');
						refs.ctlVerifybtn.setText(me.VERIFY_LABEL);
					}
				}
			}
		})
	},
	
	onSearchManifestList: function() {
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MF_STORE_NAME);
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		params['vslCallId'] = StringUtil.toUpperCase(searchParm.get("vslCallId"));
    	
    	if(params == null){
    		return;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
					}else{
					}
				}
			}
		});
	},
	
	onVerifyData : function(){
		var me = this;
		var refs = me.getReferences();
		var label = refs.ctlVerifyText;
		var theSearch = me.getViewModel().get('theSearch');
		var store = me.getStore(me.MAIN_STORE_NAME);
		var statusStore = me.getStore('exportReconcileForLiquidStatusList');
		var masterItem = Ext.create('MOST.model.billing.ExportReconcileForLiquid');
		var statusItem = Ext.create('MOST.model.billing.ExportReconcileForLiquid');
		var arrItems = new Array();
		var statusItems = new Array();
		
		masterItem.phantom = false; // UPDATE

		store.data.items.forEach(function(record, index, array){
			record.set('userId', Token.getUserId());
			record.set('newVersion', me.generateUuid());
			record.data.workingStatus = WorkingStatus.UPDATE;
			arrItems.push(record.data);
		});
		
		for(var i=0;i<arrItems.length;i++){
			if(arrItems[i].cgTpCd == null || arrItems[i].cgTpCd ==""){
				MessageUtil.warning('warning_msg', 'exportexportreconcile_no_select_cargotype');
				return null;
			}
		}
		
		store.getData().items.forEach(function(record, index, array){
			record.data.status = "Y";
			record.data.userId = MOST.config.Token.getUserId();
			
			if(record.data.workingStatus == WorkingStatus.INSERT){
				record.data.workingStatus = WorkingStatus.INSERT;
			}else{
				record.data.workingStatus = WorkingStatus.UPDATE;
			}
			
			statusItems.push(record.data);
		});

		refs.ctlVerifyText.setValue(me.VERIFY_LABEL);
		label.setFieldStyle('background-color: ' + me.VERIFY_COLOR + ';background-image:none;');
		refs.ctlVerifybtn.setText(me.UNVERIFY_LABEL);
		
//		To perform the save logic only when modified
		if(masterItem.dirty||arrItems.length>0 || statusItems.length>0){
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

			masterItem.set("vslCallId", theSearch.data.vslCallId);
			masterItem.set("userId", Token.getUserId());
			masterItem.set("workingStatus", WorkingStatus.UPDATE);
			masterItem.set("items",arrItems);
			masterItem.set("statusitems",statusItems);
			masterItem.set('newVersion', me.generateUuid());
			
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcileforliquid/list';
			updateParm.phantom = false;
			updateParm.set("workingStatus", WorkingStatus.UPDATE);
			updateParm.set("item", masterItem.data);
			updateParm.set('newVersion', me.generateUuid());
			updateParm.set("userId", Token.getUserId());
			updateParm.save({
				success:function(){
					masterItem.set("version", masterItem.get('newVersion'));
					masterItem.commit();
					MessageUtil.saveSuccess();
					me.onSearch();
				}
			});
		}
	},
	
	onUnverifyData : function(){
		var me = this;
		var refs = me.getReferences();
		var label = refs.ctlVerifyText;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var theSearch = me.getViewModel().get('theSearch');
		var statusStore = me.getStore('exportReconcileForLiquidStatusList');
		var masterItem = Ext.create('MOST.model.billing.ExportReconcileForLiquid');
		var statusItem = Ext.create('MOST.model.billing.ExportReconcileForLiquid');
		var arrItems = new Array();
		var statusItems = new Array();
		
		masterItem.phantom = false; // UPDATE
		
		// CREATE, UPDATE RECORD
		store.data.items.forEach(function(record, index, array){
			record.set("userId", Token.getUserId());
			record.set('newVersion', me.generateUuid());
			record.data.workingStatus = WorkingStatus.UPDATE;
			arrItems.push(record.data);
		});
		
		for(var i=0;i<arrItems.length;i++){
			if(arrItems[i].cgTpCd == null || arrItems[i].cgTpCd ==""){
				MessageUtil.warning('warning_msg', 'exportexportreconcile_no_select_cargotype');
				return null;
			}
		}
				
		store.getData().items.forEach(function(record, index, array){
			record.data.status = "N";
			record.data.userId = MOST.config.Token.getUserId();
			
			if(record.data.workingStatus == WorkingStatus.INSERT){
				record.data.workingStatus = WorkingStatus.INSERT;
			}else{
				record.data.workingStatus = WorkingStatus.UPDATE;
			}
			
			statusItems.push(record.data);
		});
		
		refs.ctlVerifyText.setValue(me.UNVERIFY_LABEL);
		label.setFieldStyle('background-color: ' + me.UNVERIFY_COLOR + ';background-image:none;');
		refs.ctlVerifybtn.setText(me.VERIFY_LABEL);
		
//		To perform the save logic only when modified
		if(masterItem.dirty||arrItems.length>0||statusItems.length>0){
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

			masterItem.set("vslCallId", theSearch.data.vslCallId);
			masterItem.set("workingStatus", WorkingStatus.UPDATE);
			masterItem.set("items",arrItems);
			masterItem.set("statusitems",statusItems);
			masterItem.set('newVersion', me.generateUuid());
			masterItem.set("userId", Token.getUserId());
			
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcileforliquid/list';
			updateParm.phantom = false;
			updateParm.set("workingStatus", WorkingStatus.UPDATE);
			updateParm.set("item", masterItem.data);
			updateParm.set('newVersion', me.generateUuid());
			updateParm.set("userId", Token.getUserId());
			updateParm.save({
				success:function(){
					masterItem.set("version", masterItem.get('newVersion'));
					masterItem.commit();
					MessageUtil.saveSuccess();
					me.onSearch();
				}
			});
		}
	},
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD END
	 */

});