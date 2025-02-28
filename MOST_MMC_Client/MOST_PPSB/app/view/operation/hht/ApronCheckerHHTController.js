Ext.define('MOST.view.operation.hht.ApronCheckerHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.aproncheckerhhtctl',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	EXPORT_GRID_REF_NAME: 'refGridExportApronCheckerHHTTab',
	IMPORT_GRID_REF_NAME: 'refGridImportApronCheckerHHTTab',
	
	caTyCd : 'GR',
	unitIndex:0,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onTblLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		var shiftComboStore = me.getStore('shiftCombo');
		
		if(!globalVesselCallId) return;
		
		//Load SN BL Combobox:
		me.selectSnComboItems();
		me.selectBlComboItems();
	},
	
	selectSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore('snCombo');
		var apronCheckerSnCombo = me.getStore('apronCheckerSnCombo');
		snCombo.load({
			params : {
				vslCallId: me.getViewModel().get('globalVesselCallId')
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						snCombo.insert(0, [{scdNm: 'Select', shipgNoteNo: ''}]);
						//apronCheckerSnCombo.commitChanges();
					}
				}
			}
		});
	},
	
	selectBlComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blCombo');
		var apronCheckerBlCombo = me.getStore('apronCheckerBlCombo');
		blCombo.load({
			params : {
				vslCallId: me.getViewModel().get('globalVesselCallId')
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						blCombo.insert(0, [{scdNm: 'Select', blNo: ''}]);
						//apronCheckerBlCombo.commitChanges();
					}
				}
			}
		});
	},
	
	// Retrieve
	onTblRetrieve: function (){
		var me = this;
		var refs = me.getReferences();
		var tabPanel = refs.refTabApronCheckerHHT.getActiveItem().name;

		switch(tabPanel){
			case 'aproncheckerhhtexport':
				me.searchExportTbl();
				break;
			case 'aproncheckerhhtimport':
				me.searchImportTbl();
				break;
		}
	},
	
	searchExportTbl:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('apronCheckerHHTTabExport');
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var shipgNoteNo = refs.refCbxSN.getValue();
		
		if(!vslCallId){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		
		var params = {
			vslCallId : vslCallId,
			shipgNoteNo: shipgNoteNo
		};
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
				}
			}
		});
	},
	
	searchImportTbl:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('apronCheckerHHTTabImport');
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var blNo = refs.refCbxBL.getValue();
		
		if(!vslCallId){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		
		var params = {
			vslCallId : vslCallId,
			blNo : blNo
		};
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
				}
			}
		});
	},
	
	// Import refPnlImport /Export refPnlExport Grid
	onActivateTabHHT: function(ref){
		var me = this;
		var tab = ref.reference;
		me.setButtonByTab(tab);
	},
	
	setButtonByTab: function(tab){
		var me = this;
		var refs = me.getReferences();
		var loading = discharging = rehandling = true; //defaul: disable = true
		if (tab == 'refPnlExport'){
			me.caTyCd = 'EX';
			loading = rehandling = false;
		}else if(tab == 'refPnlImport'){
			me.caTyCd = 'IM';
			discharging = false;
		}
		
		refs.refBtnRehandlingCheck.setDisabled(rehandling);
		
		refs.refBtnLoadingCheck.setDisabled(loading);
		//refs.refBtnListLoadingCheck.setDisabled(loading);
		refs.refBtnUpdatingLoadingCheck.setDisabled(loading);
		refs.refCbxSN.setDisabled(loading);
		refs.refCbxSN.setHidden(loading);
		
		refs.refBtnDischargingCheck.setDisabled(discharging);
		//refs.refBtnListDischargingCheck.setDisabled(discharging);
		refs.refBtnUpdatingDischargingCheck.setDisabled(discharging);
		refs.refCbxBL.setDisabled(discharging);
		refs.refCbxBL.setHidden(discharging);
		
		refs.refBtnDamageExport.setHidden(true);
		refs.refBtnDamageImport.setHidden(true);

	},
	
	onSelectDoc: function(ctrl, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		if(ctrl.reference === 'refCbxSN'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
		}else if(ctrl.reference === 'refCbxBL'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
		}
	},
	
	clearCodeValue: function(ref){
		var me = this;
		var refs = me.getReferences();
	},
	
	
	
	
	/**
	* ======================================================
	* LOADING START
	*/
	
	// Button Loading
	onTblConfirmLoadingCheck: function(){		// Go to Confirm Loading
		var me = this;
		me.showTblConfirmLoadingCheckPopUp();
	},
	
	// Button UPDATE L/D LIST
	onTblUpdatingLoadingCheck: function(){
		var me = this;
		me.showTblUpdatingLoadingCheckPopUp();
	},
	
	// Button WH/RH
	onTblConfirmRehandlingCheck: function(){
		var me = this;
		me.showTblConfirmRehandlingCheckPopUp();
	},
	
//	onTblListofLoadingCheck: function(){
//		var me = this;
//		me.showTblListofLoadingCheckPopUp();
//	},
//	showTblListofLoadingCheckPopUp(){
//		var me = this;
//		var refs = me.getReferences();
//		var title = 'The List of Loading Check';
//		
//		var grid = me.lookupReference('refGridExportApronCheckerHHTTab');
//		var unitItem = grid.getSelection();
//		
//		ViewUtil.openCodePopup(me, 'app-listofloadingcheckhhtpopup', 'refBtnListLoadingCheck', unitItem);
//	},
	
	showTblConfirmLoadingCheckPopUp(){
		var me = this;
		var refs = me.getReferences();
		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmLDRORO');
		
		var store = me.getStore('apronCheckerHHTTabExport');
		var grid = me.lookupReference('refGridExportApronCheckerHHTTab');
		
		var selection = grid.getSelection();
		var searchParams = '';
		
		store.reload();
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		searchParams = selection.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-apronconfirmloadingofrorohht', 'refBtnLoadingCheck', searchParams);
	},
	
	showTblConfirmRehandlingCheckPopUp(){
		var me = this;
		var refs = me.getReferences();
		var title = 'Apron - Rehandling Operation of RORO Loading';
		var store = me.getStore('apronCheckerHHTTabExport');
		var grid = me.lookupReference('refGridExportApronCheckerHHTTab');
		var unitItem = grid.getSelection();
		store.reload();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		ViewUtil.openHhtPopup(me, 'app-apronconfirmloadingofrororehandlinghht', 'refBtnRehandlingCheck', unitItem);
	},
	
	showTblUpdatingLoadingCheckPopUp() {
		var me = this;
		var refs = me.getReferences();
		var title = 'Updating Loading Check';
		
		var store = me.getStore('apronCheckerHHTTabExport');
		var grid = me.lookupReference('refGridExportApronCheckerHHTTab');
		
		var unitItem = grid.getSelection();
		
		store.reload();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		unitItem.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-updatingloadingofrorohht', 'refBtnUpdatingLoadingCheck', unitItem);

	},
	/**
	* ======================================================
	* LOADING CHECK END
	*/
	
	
	/**
	* ======================================================
	* DISCHARGING CHECK START
	*/
//  The List of Discharging Check
//	onTblListofDischargingCheck: function(){
//		var me = this;
//		me.showTblListofDischargingCheckPopUp();
//	},
	
	//Button Discharging:
	onTblDischargingCheck: function(){		// Go to D/S List
		var me = this;
		me.showTblDischargingCheckPopUp();
	},
	
	//Button Updating of Discharging Check
	onTblUpdatingDischargingCheck: function(){
		var me = this;
		me.showTblUpdatingDischargingCheckPopUp();
	},
	
	showTblDischargingCheckPopUp(){
		var me = this;
		var refs = me.getReferences();
		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_discharingLDRORO');
		
		var store = me.getStore('apronCheckerHHTTabImport');
		var grid = me.lookupReference('refGridImportApronCheckerHHTTab');
		
		var unitItem = grid.getSelection();
		var searchParams = '';
		
		store.reload();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-apronconfirmdischargingofrorohht', 'refBtnDischargingCheck', searchParams);
	},
	
//	showTblListofDischargingCheckPopUp(){
//		var me = this;
//		var refs = me.getReferences();
//		var title = 'The List of Discharging Check';
//		var store = me.getStore('apronCheckerHHTTabImport');
//		var grid = me.lookupReference('refGridImportApronCheckerHHTTab');
//		var unitItem = grid.getSelection();
//		store.reload();
//		if(unitItem == null){
//			MessageUtil.warning('warning_msg', 'select_list_msg');
//			return;
//		}
//		
//		ViewUtil.openCodePopup(me, 'app-listofdischargingofrorohht', 'refBtnListDischargingCheck', unitItem);
//	},
	
	
	showTblUpdatingDischargingCheckPopUp(){
		var me = this;
		var refs = me.getReferences();
		var title = 'Update Discharging for RORO';
		
		var store = me.getStore('apronCheckerHHTTabImport');
		var grid = me.lookupReference('refGridImportApronCheckerHHTTab');
		var searchParams = '';
		
		var unitItem = grid.getSelection();
		store.reload();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-updatingdischargingofrorohht', 'refBtnUpdatingDischargingCheck', searchParams);
	},
	
	/**
	* ======================================================
	* DISCHARGING CHECK END
	*/
	
	onTblDamageImport: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('apronCheckerHHTTabImport');
		store.reload();
		var grid = me.lookupReference('refGridImportApronCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		ViewUtil.openHhtPopup(me, 'app-yardcheckerdamagecheckofrorohht', 'refBtnDamageImport', unitItem);
	},
	
	onTblDamageExport: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('apronCheckerHHTTabExport');
		store.reload();
		var grid = me.lookupReference('refGridExportApronCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		ViewUtil.openHhtPopup(me, 'app-yardcheckerdamagecheckofrorohht', 'refBtnDamageExport', unitItem);
	},
	
	
	
    //******************************************************************************************
    //***********Vessel Schedule Picker - HHT first screen**************************************
    //******************************************************************************************
	onChangeUpperCase: function(field, newValue){
    	var me = this;
    	var vslStore = me.getStore('JPVCPopupStore');
    	var refs = me.getReferences();
    	
		field.setValue(newValue.toUpperCase());
		vslStore.removeAll();
		vslStore.commitChanges();
		var grid = refs.refVesselScheduleGrid;
		grid.getStore().removeAll();
	},
	
	onCheckJpvcRadioField: function(radioField, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		if (radioField.getValue() === 'JPVC' && newValue === true) {
			refs.refVesselScheduleButton.setDisabled(false);
			me.fireEvent('closeAllTab');
			
			var prevGlobalVsl = me.getViewModel().get('prevGlobalVsl');
			if(prevGlobalVsl){
				me.fireEvent('setVesselSchedule', 'JPVC', prevGlobalVsl);
			}
			
		} else if (radioField.getValue() === 'JPVC' && newValue === false) {
			//initiate vessel schedule
			me.fireEvent('setVesselSchedule', 'NON-JPVC', null);

			//hide vessel scheduler gird panel
			var panel = refs.refVesselScheduleGridPanel;
			var grid = refs.refVesselScheduleGrid;
			panel.setHeight(1);
			
			refs.refVesselScheduleButton.setDisabled(true);
		}
	},
	
	onOpenVesselSchedule: function(btn){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refVesselScheduleGridPanel;
		panel.setHeight(300);
		me.onLoadDefaultListVessel();
	},
	
	//Load Default vessel latest one month order by ATB desc:
	onLoadDefaultListVessel: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('JPVCPopupStore');
     	workingDt = me.getViewModel().get('globalWorkDate');
     	if(!workingDt){
     		return;
     	}
 		//if(store.getData().length <= 0){}
     	//always reload:
		store.load({
			params: {
 				hhtYn: 'Y',
 				searchType: 'HHT_DEFAULT',
 				workDt: workingDt,
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
	},
	
	onSearchVesselSchedule: function(btn) {
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('JPVCPopupStore');
     	var inputStr = refs.refFindScheduleTextField.getValue();
     	
 		if(inputStr == null || inputStr.trim().length < 4){
 			MessageUtil.warning('Warning', 'Search condition is at least 4 character');
			return null;
 		}

 		var inputVslCallId = (inputStr!=null ? inputStr.toUpperCase() : inputStr);
 		params = {
 				vslCallId : inputVslCallId,
		}
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});		
		
	},
	
	onApplyVesselSchedule: function(btn){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refVesselScheduleGridPanel;
		var grid = refs.refVesselScheduleGrid;
		panel.setHeight(1);
		
		var selection = grid.getSelection();
		
		if (selection) {
			//me.onSetVesselSchedule('JPVC', selection);
			me.fireEvent('setVesselSchedule', 'JPVC', selection);
		}
	},
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
	onCargoGridItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refGridImportApronCheckerHHTTab');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});