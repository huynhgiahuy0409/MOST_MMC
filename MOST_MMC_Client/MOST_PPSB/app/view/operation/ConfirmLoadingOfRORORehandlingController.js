Ext.define('MOST.view.operation.ConfirmLoadingOfRORORehandlingController', {
    extend: 'MOST.view.foundation.BaseViewController',
    requires: [
           	],
    alias: 'controller.rehandlingloadingofroro',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    MAIN_GRID_REF_NAME: 'refCargoGrid',
	MAIN_STORE_NAME: 'cargoItems',
	cgIndex:0,
	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */

    
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.operation.SearchConfirmLoadingOfROROParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});

		me.onSetActionButton('INIT', null);
		
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		cargoTypeCombo.load();
	},
    
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
   
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch: function() {
		var me = this;
		var store = me.getStore('cargoItems');
		var params = me.getSearchCondition();
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		//Reset
		me.onClear_clickHandler();
		
		if (params == null) {
			return;
		}
		
		store.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
					else {
						cgGrid.getSelectionModel().select(me.cgIndex);
						me.onCargoGridItemClick();
					}
				}
			}
		});
	},
	
	onCargoGridItemClick: function(){
		var me = this;
		var refs = me.getReferences();
		
		//Reset
		me.onClear_clickHandler();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.cgIndex = grid.store.indexOf(selection);
		
		//Get unit list
		me.getUnitItemsList(selection);
	},
	
	onUnitGrid_ItemClick: function(){
		var me = this;
		var refs = me.getReferences();
		me.onClear();
		
		var grid = me.lookupReference('refUnitGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;

		me.onSetActionButton('INDIRECT', selection);
		
		me.onBindingUnitItem(selection);
	},
	
	onClear_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		var indirectGrid = me.lookupReference('refUnitGrid');
		indirectGrid.setSelection(null);
		
		me.onClear();
	},
	
	onYardCheck_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		var unitStore = me.getStore('unitItems');
		var unitItem = me.getViewModel().get('theDetail');
		unitItem.set('userId', Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		
		unitItem.set('action', 'YC');
		unitItem.set('statCd', 'OL');
		unitItem.set('outDate', Ext.Date.format(refs.ctlOutDtm.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.saveSuccess();
				
				me.onSearch();
			}
		});
	},
	
	onLoadingCheck_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		var unitStore = me.getStore('unitItems');
		var unitItem = me.getViewModel().get('theDetail');
		unitItem.set('userId', Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		
		unitItem.set('action', 'LC');
		unitItem.set('statCd', 'LD');
		unitItem.set('loadingTime', Ext.Date.format(refs.ctlLoadingDtm.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		if(StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			unitItem.set('delvTpCd', 'D');
		}
		if(refs.ctlMhc.getValue()){
			unitItem.set('crane', 'MHC');
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.saveSuccess();
				
				me.onSearch();
			}
		});
	},
	
	onRemove_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
		var unitItem = me.getViewModel().get('theDetail');
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		//updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());
		
		unitItem.set('userId', Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		//delete Yard Job
		if(unitItem.get('statCd') == 'OL'){
			unitItem.set('action', 'YC');
			unitItem.set('outDate', null);
			unitItem.set('stevedoreId', null);
			unitItem.set('ycRemarks', null);
			unitItem.set('statCd', 'ST');
		}
		//delete Loading job
		else if(unitItem.get('statCd') == 'LD'){
			unitItem.set('action', 'LC');
			unitItem.set('loadingTime', null);
			unitItem.set('crane', null);
			unitItem.set('ldRemarks', null);
			
			if(StringUtil.isNullorEmpty(unitItem.get('outDate'))){
				unitItem.set('delvTpCd', null);
				unitItem.set('statCd', 'RS');
			}
			else
				unitItem.set('statCd', 'OL');
		}
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.saveSuccess();
				
				me.onSearch();
			}
		});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.controller.SearchConfirmLoadingOfROROParm';
		searchBizParm.serviceID = 'MOST.confirmLoadingOfRORORehandling.selectCargoItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
		
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition : function() {
		var me = this;
		var store = me.getStore('cargoItems');
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
		params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
        params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getSnComboItems();
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var snCombo = me.getStore('snCombo');
				snCombo.loadData([],false);
				refs.ctlSearchSnno.reset();
			}
		}
	},
	
	getSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		if(theVslInfo){
			var snCombo = me.getStore('snCombo');
			snCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							snCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
						}
					}
				}
			});
		}
	},

	getUnitItemsList: function(record){
		var me = this;
		var refs = me.getReferences();
		
		if(record){
			var store = me.getStore('unitItems');
			store.load({
				params : {
					vslCallId:record.get('vslCallId'),
					shipgNoteNo:record.get('shipgNoteNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
						}
					}
				}
			});
		}
	},
	
	onSetActionButton: function (strTp, unitItem){
		var me = this;
		var refs = me.getReferences();
		
		//button
		refs.btnYardCheck.setDisabled(true);
		refs.btnLoadingCheck.setDisabled(true);
		refs.refBtnDelete.setDisabled(true);
		
		//Yard check
		refs.ctlOutDtm.setReadOnly(true);
		refs.ctlStevedoreId.setEditable(false);
		refs.ctlOutRemark.setEditable(false);
		
		//Loading check
		refs.ctlLoadingDtm.setReadOnly(true);
		refs.ctlMhc.setDisabled(true);
		refs.ctlLdRemarks.setEditable(false);
		
		if(unitItem){
			if(strTp == "DIRECT"){
				if(unitItem.get('statCd') == 'RS'){//just for temporary CUD wihout WB application. Original it should be 'IC'
					//ready for Loading (loading check)
					refs.btnLoadingCheck.setDisabled(false);
					refs.ctlLoadingDtm.setReadOnly(false);
					refs.ctlMhc.setDisabled(false);
					refs.ctlLdRemarks.setEditable(true);
					
					refs.ctlLoadingDtm.setValue(new Date());
				}
				else if(unitItem.get('statCd') == 'LD'){
					//Allow Update/Delete
					refs.refBtnDelete.setDisabled(false);
				}
			}
			else if(strTp == "INDIRECT"){
				if(unitItem.get('statCd') == 'ST'){
					//ready for Handling out (Yard check)
					refs.btnYardCheck.setDisabled(false);
					refs.ctlOutDtm.setReadOnly(false);
					refs.ctlStevedoreId.setEditable(true);
					refs.ctlOutRemark.setEditable(true);
					
					refs.ctlOutDtm.setValue(new Date());
				}
				else if(unitItem.get('statCd') == 'OL'){
					//ready for Loading (loading check)
					refs.btnLoadingCheck.setDisabled(false);
					refs.ctlLoadingDtm.setReadOnly(false);
					refs.ctlMhc.setDisabled(false);
					refs.ctlLdRemarks.setEditable(true);
					
					refs.ctlLoadingDtm.setValue(new Date());
					
					//Allow Update/Delete
					refs.refBtnDelete.setDisabled(false);
				}
				else if(unitItem.get('statCd') == 'LD'){
					//Allow Update/Delete
					refs.refBtnDelete.setDisabled(false);
				}
			}
		}
	},
	
	onBindingUnitItem: function (unitItem){
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().setData({theDetail:unitItem});
	},
	
	onClear: function (){
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().setData({theDetail:null});
		
		refs.ctlOutDtm.setValue();
		refs.ctlLoadingDtm.setValue();
		
		refs.ctlMhc.setValue(false);
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});

