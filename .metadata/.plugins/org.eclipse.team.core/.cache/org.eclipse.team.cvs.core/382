Ext.define('MOST.view.operation.ConfirmHandlingOutOfRORORehandlingController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.rehandlinghandlingoutofroro',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoGrid',
	MAIN_STORE_NAME: 'cargoItems',
	
	cgItem:null,
	stackedUnitItem:null,
	cgIndex:0,
	stackedUnitIndex:0,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 * 
	 * 
	 * /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		var searchParm = Ext.create('MOST.model.operation.SearchConfirmHandlingOutOfROROParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.onSetActionButton('INIT');
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
    	var params = me.getSearchCondition();
    	var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
					else {
						cgGrid.getSelectionModel().select(me.cgIndex);
						me.onCargoGrid_ItemClick();
					}
				}
			}
		});
	},
	
	onCargoGrid_ItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.cgItem = selection;
		me.cgIndex = grid.store.indexOf(selection);
		
		//get stacked unit list base on cargo
		me.getStackedUnitItems(selection);
		
		//Get data of Driver/truck/unit comboBox
		me.getComboMasterItem(selection);
		
		//Get Handling-out items
		me.getHandlingOutUnitItems(selection);
	},
	
	onStackedUnitGrid_ItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refStackedUnitGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.stackedUnitItem = selection;
		me.stackedUnitIndex = grid.store.indexOf(selection);
		
		//Get data of Driver/truck/unit comboBox
		//me.getComboMasterItem(selection);
		
		//Get Handling-out items
		//me.getHandlingOutUnitItems(selection);
		
		//Binding
		refs.txtUnitNo.setValue(selection.get('unitNo'))
		
		me.onClear_clickHandler();
	},
	
	onHandlingOutUnit_ItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refHandlingOutUnitGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.onClear();
		if(StringUtil.isNullorEmpty(selection.get('gateOutDate'))){
			me.onSetActionButton('UNIT');
		}
		else {
			me.onSetActionButton('GATEOUT');
		}
		
		//Binding
		me.getViewModel().setData({unitItem:selection});
		
		if(StringUtil.isNullorEmpty(selection.get('truckNo'))){
			refs.ctlTypeOfTransport.setValue({tspt_radio: 'DV'});
			refs.ctlDriverCombo.setValue(selection.get('driverId'));
		}
		else {
			refs.ctlTypeOfTransport.setValue({tspt_radio: 'LR'});
			refs.ctlTruckCombo.setValue(selection.get('truckNo'));
			refs.ctlDriverWithTruckCombo.setValue(selection.get('driverId'));
		}
		//me.onChangeDriverTruck();
	},
	
	onChangeDriverTruck: function (){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlTypeOfTransport.getValue().tspt_radio == 'DV'){
			refs.ctlTruckCombo.setValue();
			refs.ctlDriverWithTruckCombo.setValue();
			
			refs.ctlTruckCombo.setDisabled(true);
			refs.ctlDriverWithTruckCombo.setDisabled(true);
			refs.ctlDriverCombo.setDisabled(false);
		}
		else {
			refs.ctlDriverCombo.setValue();
			
			refs.ctlTruckCombo.setDisabled(false);
			refs.ctlDriverWithTruckCombo.setDisabled(false);
			refs.ctlDriverCombo.setDisabled(true);
		}
	},
	
	onDriverCombo_changeHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		if(!StringUtil.isNullorEmpty(refs.ctlDriverCombo.getValue())){
			refs.txtDriverName1.setValue(refs.ctlDriverCombo.getSelection().get('driverNm'));
			refs.txtLicenseNo1.setValue(refs.ctlDriverCombo.getSelection().get('driverLicense'));
		}
		else {
			refs.txtDriverName1.setValue();
			refs.txtLicenseNo1.setValue();
		}
	},
	
	onDriverWithTruckCombo_changeHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		if(!StringUtil.isNullorEmpty(refs.ctlDriverWithTruckCombo.getValue())){
			refs.txtDriverName2.setValue(refs.ctlDriverWithTruckCombo.getSelection().get('driverNm'));
			refs.txtLicenseNo2.setValue(refs.ctlDriverWithTruckCombo.getSelection().get('driverLicense'));
		}
		else {
			refs.txtDriverName2.setValue();
			refs.txtLicenseNo2.setValue();
		}
	},
	
	onClear_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		me.onClear();
		
		refs.refHandlingOutUnitGrid.setSelection(null);
		//refs.refHandlingOutUnitGrid.selectedIndex = -1;
		me.onSetActionButton("STACKED_UNIT");
	},
	
	onAdd_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var unitStore = me.getStore('handlingOutUnitItems');
		
		var grid = me.lookupReference('refStackedUnitGrid');
		var unitItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(unitItem == null) return;
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		if(refs.ctlTypeOfTransport.getValue().tspt_radio == 'DV'){
			unitItem.set('driverId', refs.ctlDriverCombo.getValue());
			unitItem.set('driverNm', refs.txtDriverName1.getValue());
			unitItem.set('driverLicense', refs.txtLicenseNo1.getValue());
		}
		else {
			unitItem.set('driverId', refs.ctlDriverWithTruckCombo.getValue());
			unitItem.set('truckNo', refs.ctlTruckCombo.getValue());
			unitItem.set('driverNm', refs.txtDriverName2.getValue());
			unitItem.set('driverLicense', refs.txtLicenseNo2.getValue());
		}
		
		unitItem.set('hoRemarks', refs.txtHandlingOutRmk.getValue());
		unitItem.set('statCd', 'DV');
		unitItem.set('userId', Token.getUserId());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
					if (button === 'ok') {
						me.onSearch();
					}
				});
			}
		});
	},
	
	onRemove_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var unitStore = me.getStore('handlingOutUnitItems');
		var unitItem = me.getViewModel().get('unitItem');
		unitItem.set('statCd', 'ST');
		unitItem.set('userId', Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
					if (button === 'ok') {
						me.onSearch();
					}
				});
			}
		});
	},
	
	onUpdate_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var unitStore = me.getStore('handlingOutUnitItems');
		var unitItem = me.getViewModel().get('unitItem');
		unitItem.set('statCd', 'ST');
		unitItem.set('userId', Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		
		if(refs.ctlTypeOfTransport.getValue().tspt_radio == 'DV'){
			unitItem.set('driverId', refs.ctlDriverCombo.getValue());
			unitItem.set('truckNo', null);
		}
		else {
			unitItem.set('driverId', refs.ctlDriverWithTruckCombo.getValue());
			unitItem.set('truckNo', refs.ctlTruckCombo.getValue());
		}
		unitItem.set('hoRemarks', refs.txtHandlingOutRmk.getValue());
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
					if (button === 'ok') {
						me.onSearch();
					}
				});
			}
		});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.controller.SearchConfirmHandlingOutOfRoRoParm';
		searchBizParm.serviceID = 'MOST.confirmHandlingOutOfRORORehandling.selectCargoItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
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
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		if(searchParm){
			var params = me.createParam(searchParm);
			params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
			params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
			params['unitNo'] = StringUtil.toUpperCase(searchParm.data.unitNo);
			
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
			return params;
		}
		
    	return null;   	
	},
	
	getComboMasterItem: function(record){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var masterCombo = me.getStore('handlingOutComboItems');
		masterCombo.load({
			params : {
				vslCallId: record.get('vslCallId'),
				shipgNoteNo: record.get('shipgNoteNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						me.setCombo(records[0]);
					}
				}
			}
		});
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
	
	getHandlingOutUnitItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var handlingOutUnitItems = me.getStore('handlingOutUnitItems');
		handlingOutUnitItems.load({
			params : {
				vslCallId:theVslInfo.get('vslCallId'),
				shipgNoteNo: record.get('shipgNoteNo'),
				//unitNo: record.get('unitNo'),
				searchType: 'HOUNIT'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						refs.refBtnCreate.setDisabled(true);
					}
				}
			}
		});
	},
	
	// Combo Setting
	setCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var truckCombo = me.getStore('truckCombo');
		var driverWithTruckCombo = me.getStore('driverWithTruckCombo');
		var driverCombo = me.getStore('driverCombo');

		if(masterItem.data.driverWithTruckItems){
			driverWithTruckCombo.setData(masterItem.data.driverWithTruckItems);
			driverWithTruckCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
			refs.ctlDriverWithTruckCombo.setValue('');
		}
		
		if(masterItem.data.driverItems){
			driverCombo.setData(masterItem.data.driverItems);
			driverCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
			refs.ctlDriverCombo.setValue('');
		}
		
		if(masterItem.data.truckItems){
			truckCombo.setData(masterItem.data.truckItems);
			truckCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
			refs.ctlTruckCombo.setValue('');
		}
	},
	
	getStackedUnitItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refStackedUnitGrid;
		if(record){
			var store = me.getStore('stackedUnitItems');
			store.load({
				params : {
					vslCallId:record.get('vslCallId'),
					shipgNoteNo:record.get('shipgNoteNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
							grid.getSelectionModel().select(me.stackedUnitIndex);
							me.onStackedUnitGrid_ItemClick();
						}
					}
				}
			});
		}
	},
	
	
	// Popup After Setting
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
				refs.ctlSearchSnNo.reset();
			}
		}
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	
	onClear:function() {
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlTruckCombo.setValue();
		refs.ctlDriverWithTruckCombo.setValue();
		refs.txtDriverName2.setValue();
		refs.txtLicenseNo2.setValue();
		
		refs.ctlDriverCombo.setValue();
		refs.txtDriverName1.setValue();
		refs.txtLicenseNo1.setValue();
		
		refs.ctlTypeOfTransport.setValue({tspt_radio: 'DV'});
		refs.txtHandlingOutRmk.setValue()
	},
	
	onSetActionButton:function(strTp) {
		var me = this;
		var refs = me.getReferences();
		
		if(strTp == 'INIT'){
			refs.refBtnCreate.setDisabled(true);
			refs.refBtnUpdate.setDisabled(true);
			refs.refBtnDelete.setDisabled(true);
			refs.refBtnClear.setDisabled(true);
		}
		else if(strTp == 'STACKED_UNIT'){
			refs.refBtnCreate.setDisabled(false);
			refs.refBtnUpdate.setDisabled(true);
			refs.refBtnDelete.setDisabled(true);
			refs.refBtnClear.setDisabled(false);
		}
		else if(strTp == 'UNIT'){
			refs.refBtnCreate.setDisabled(true);
			refs.refBtnUpdate.setDisabled(false);
			refs.refBtnDelete.setDisabled(false);
			refs.refBtnClear.setDisabled(false);
		}
		else if(strTp == 'GATEOUT'){
			refs.refBtnCreate.setDisabled(true);
			refs.refBtnUpdate.setDisabled(true);
			refs.refBtnDelete.setDisabled(true);
			refs.refBtnClear.setDisabled(true);
		}
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});