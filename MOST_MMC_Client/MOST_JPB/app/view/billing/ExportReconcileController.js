Ext.define('MOST.view.billing.ExportReconcileController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.exportreconcile',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	VERIFY_LABEL : "Verify",
	UNVERIFY_LABEL : "Unverify",
	VERIFY_COLOR : "#ff80ff",
	UNVERIFY_COLOR : "#c0c0c0",
	
	MAIN_GRID_REF_NAME: 'refexportReconcileGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'exportReconcileList',	
	
	SUB_GRID_REF_NAME: 'refExportManifestGrid',				// Sub Grid Name 
	SUB_STORE_NAME: 'exportManifestList',	
	
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
		var searchParm = Ext.create('MOST.model.billing.SearchExportReconcileParm');
		
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		var transportTypeCombo = me.getStore('exportReconcileTransportTypeList');
		var packageTypeCombo = me.getStore('exportReconcilePackageTypeList');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		
		searchParm.set('progress', 'N');
		
		refs.ctlVerifyText.setValue(me.UNVERIFY_LABEL);
		refs.ctlVerifybtn.setText(me.VERIFY_LABEL);
		
		transportTypeCombo.load({
			params: {
				lcd : 'MT',
				mcd : 'TSPTTP',
				col1: 'SN'
			},
			callback:function(records,success){
				
			}
		});
		transportTypeCombo.commitChanges();
		packageTypeCombo.load({
			params: {
				searchLcd:'MT',
            	searchDivCd: 'PKGTP',
				searchType: 'COMM',
				searchCol1: ''
			},
			callback:function(records,success){
				
			}
		});
		packageTypeCombo.commitChanges();
		cargoTypeCombo.load();
		cargoTypeCombo.commitChanges();
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
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
     	var label = refs.ctlVerifyText;
     	
    	var exportList = me.getStore('exportList');
    	var exportStatusList = me.getStore('exportStatusList');
		var transportTypeCombo = me.getStore('exportReconcileTransportTypeList');
		var packageTypeCombo = me.getStore('exportReconcilePackageTypeList');
		
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
					}
				}
			}
		});
	},
	
	onSetVerifyStatus: function(){
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var exportStatusList = me.getStore('exportStatusList');
		var label = refs.ctlVerifyText;
    	
		if(!theSearch.data.vslCallId){
			return;
		}
		
    	exportStatusList.load({
    		params: {
				vslCallId: theSearch.data.vslCallId,
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0  && records[0].data.status =="Y"){
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
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
	},
		
	// Cell Click
	onCellClick: function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var statusStore = me.getStore('exportStatusList');
		if(record.data.status == "Y"){
			MessageUtil.warning('warning_msg', 'importexportreconcile_verified_edit_data_msg');
			return null;
		}
	},
	
	onSave: function(){
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		var statusStore = me.getStore('exportStatusList');
		
		var masterItem = Ext.create('MOST.model.billing.ExportReconcile');
		var statusItem = Ext.create('MOST.model.billing.ExportReconcile');
		
		var arrItems = new Array();
		var statusItems = new Array();
		
		if(refs.ctlVesselCallIdfield.getValue() == "" || refs.ctlVesselCallIdfield.getValue() == null){
			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
			return null;
		}
				
		if(statusStore.data.length > 0 && statusStore.data.items[0].data.status == "Y"){
			MessageUtil.warning('warning_msg', 'importexportreconcile_verified_save_data_msg');
			return null;
		}
		
		masterItem.phantom = false; // UPDATE
		
		// CREATE, UPDATE RECORD
		store.data.items.forEach(function(record, index, array){
			if(record.data.statCd == "Y"){
				MessageUtil.warning('warning_msg', 'importexportreconcile_verified_save_data_msg');
				return null;
			}
			
			record.set('userId', Token.getUserId());
			record.set('newVersion', me.generateUuid());
			record.data.workingStatus = WorkingStatus.UPDATE;
			
			arrItems.push(record.data);
		});
		
		for(var i=0;i<arrItems.length;i++){
			if(arrItems[i].tsptTpCd == null || arrItems[i].tsptTpCd ==""){
				MessageUtil.warning('warning_msg', 'importexportreconcile_no_select_transporttype');
				return null;
			}
		}

//		To perform the save logic only when modified
		if(masterItem.dirty||arrItems.length>0){
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			var proxy = masterItem.getProxy();
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/list';

			masterItem.set("workingStatus", WorkingStatus.UPDATE);
			masterItem.set("items",arrItems);
			masterItem.set("statusitems",statusItems);
			masterItem.set('newVersion', me.generateUuid());
			masterItem.set("userId", Token.getUserId());

			var isCreated = masterItem.phantom;
			
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/list';
			updateParm.phantom = isCreated;
			updateParm.set("workingStatus", isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			masterItem.set("vslCallId", theSearch.data.vslCallId);
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

	//popup
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlVesselCallIdfield'){ // JPVC POPUP
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			} else {
				me.getViewModel().setData({theVsl:null});
			}
		} else if (targetControl === 'ctlScn') {
			if (returnValue) {
				refs.ctlScn.setValue(returnValue.code);

				if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
					refs.ctlVesselCallIdfield.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({ theVsl: returnValue.item });
				} else {
					refs.ctlVesselCallIdfield.setValue('');
					me.getViewModel().setData({ theVsl: null });
				}
			}
		}
	},
	
	onVerify : function(){
		var me = this;
		var refs = me.getReferences();
		var sumWgtOpe;
		var sumWgtDo;
		var sumWgtDoc;
    	var exportList = me.getStore('exportList');
    	var recclList = me.getStore(me.MAIN_STORE_NAME)

    	if(refs.ctlVerifybtn.getText() == me.VERIFY_LABEL){
			me.onVerifyData();
		}else{
			me.onUnverifyData();
		}
	},
	
	onVerifyData : function(){
		var me = this;
		var refs = me.getReferences();
		var label = refs.ctlVerifyText;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var theSearch = me.getViewModel().get('theSearch');
		var statusStore = me.getStore('exportStatusList');
		var masterItem = Ext.create('MOST.model.billing.ExportReconcile');
		var statusItem = Ext.create('MOST.model.billing.ExportReconcile');
		var arrItems = new Array();
		var statusItems = new Array();

		masterItem.phantom = false; // UPDATE
		
		// CREATE, UPDATE RECORD
		store.data.items.forEach(function(record, index, array){
			record.set('userId', Token.getUserId());
			record.set('newVersion', me.generateUuid());
			record.data.workingStatus = WorkingStatus.UPDATE;
			arrItems.push(record.data);
		});
		
		for(var i=0;i<arrItems.length;i++){
			if(arrItems[i].tsptTpCd == null || arrItems[i].tsptTpCd ==""){
				MessageUtil.warning('warning_msg', 'importexportreconcile_no_select_transporttype');
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
		if(masterItem.dirty || arrItems.length>0 || statusItems.length>0){
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			var proxy = masterItem.getProxy();
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/list';
			
			masterItem.set("vslCallId", theSearch.data.vslCallId);
			masterItem.set("userId", Token.getUserId());
			masterItem.set("workingStatus", WorkingStatus.UPDATE);
			masterItem.set("items",arrItems);
			masterItem.set("statusitems",statusItems);
			masterItem.set('newVersion', me.generateUuid());
			
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/list';
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
		var statusStore = me.getStore('exportStatusList');
		var masterItem = Ext.create('MOST.model.billing.ExportReconcile');
		var statusItem = Ext.create('MOST.model.billing.ExportReconcile');
		
		var arrItems = new Array();
		var statusItems = new Array();
		
		masterItem.phantom = false; // UPDATE
		
		// CREATE, UPDATE RECORD
		store.data.items.forEach(function(record, index, array){
			record.set('userId', Token.getUserId());
			record.set('newVersion', me.generateUuid());
			record.data.workingStatus = WorkingStatus.UPDATE;
			
			arrItems.push(record.data);
		});
		
		for(var i=0;i<arrItems.length;i++){
			if(arrItems[i].tsptTpCd == null || arrItems[i].tsptTpCd ==""){
				MessageUtil.warning('warning_msg', 'importexportreconcile_no_select_transporttype');
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
			var proxy = masterItem.getProxy();
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/list';
			masterItem.set("vslCallId", theSearch.data.vslCallId);
			masterItem.set("workingStatus", WorkingStatus.UPDATE);
			masterItem.set("items",arrItems);
			masterItem.set("statusitems",statusItems);
			masterItem.set('newVersion', me.generateUuid());
			masterItem.set("userId", Token.getUserId());

			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/exportreconcile/list';
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
	
	onGridComboRenderer:function(val, cell){
		var me = this;
		var refs = me.getReferences();
		var transportTypeList = me.getStore('exportReconcileTransportTypeList');
		var packageTypeList = me.getStore('exportReconcilePackageTypeList');
		
		cell.style = 'background: #ffff80; color: red; align: right';
		
		if(cell.column.dataIndex == 'tsptTpCd'){
			if(!StringUtil.isNullorEmpty(val)){
				var indx = -1;
				indx = transportTypeList.find('scd', val);

				if (indx != -1){
					return transportTypeList.getAt(indx).get('scdNm'); 
				}else{
					return transportTypeList.getAt(0).get('scdNm'); 
				}
			}
		} 
	},
	
	onSelectModeofOPR: function( combo, record, eOpts ) {
		var lcdVal = combo.getValue();
		var mStore = this.getStore('exportReconcileTransportTypeList');
		
		mStore.load({
			params: {
				lcd : 'MT',
				mcd : 'TSPTTP',
				col1: 'SN'
			}
		}); 
	},
	
	onSelectPackageType: function( combo, record, eOpts ) {
		var lcdVal = combo.getValue();
		var mStore = this.getStore('exportReconcilePackageTypeList');
		
		mStore.load({
			params: {
				searchLcd:'MT',
            	searchDivCd: 'PKGTP',
				searchType: 'COMM',
			}
		}); 
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
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
		
    	if(StringUtil.isNullorEmpty(searchParm.get("vslCallId"))
    			&&StringUtil.isNullorEmpty(searchParm.get("scn")) ){
    		MessageUtil.warning("warning_msg", "goodsreceipt_jpvc_input_msg");
    		return;
    	}
    	
		params['vslCallId'] = StringUtil.toUpperCase(searchParm.get("vslCallId"));
		params['scn'] = StringUtil.toUpperCase(searchParm.get("scn"));
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
    	
       	return params;
	},
	
	onDetailDownload:function(){
		var me = this;
		var refs = me.getReferences();
		var exportExcel = me.getStore('exportExcel');
		var params = {
				fromAtb: Ext.Date.format(new Date(refs.refDtFm.getValue()), 'd/m/Y'),
				toAtb: Ext.Date.format(new Date(refs.refDtTo.getValue()), 'd/m/Y'),
				userId: MOST.config.Token.getUserId()
		}
		
		exportExcel.load({
			params:params,
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
					Ext.exporter.File.saveBinaryAs(content,records[0].data.fileName);
				}
			}
		})
	},
	
	onBillingExportReconcileExport:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.getView().detailViewAlias = 'popup-reportbillingimportreconcile';
		var record = '';
		var title = 'Billing Export Reconcile Report';
		
		me.openDetailPopup(record, title);
	},
	
	onValidateEdit:	function(editor, context) {
		var me = this;

		if(context.record.phantom == true) {
			var systemCodeDuplicateCheckStore = me.getStore('exportReconcileList');
			
			me.gridDupliationCheck(editor, context, systemCodeDuplicateCheckStore, params);
		}
	},
	
	onCancelEdit: function(rowEditing, context) {
		if (context.record.phantom) {
			context.store.remove(context.record);
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchExportReconcileParm';
		searchBizParm.serviceID = 'MOST.exportReconcile.selectExportList';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});