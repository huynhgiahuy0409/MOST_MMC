Ext.define('MOST.view.operation.hht.YardCheckerHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
		
	],

	alias: 'controller.yardcheckerhhtctl',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	EXPORT_GRID_REF_NAME: 'refGridExportYardCheckerHHTTab',
	IMPORT_GRID_REF_NAME: 'refGridImportYardCheckerHHTTab',
	ALIAS_POPUP: '',
    TITLE: '',
    TYPE_OPERATION: '',
    DOC_TYPE: 'BL',
	caTyCd : 'GR',
	unitIndex:0,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	onTblLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore('snCombo');
		var blCombo = me.getStore('blCombo');
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');

		if(!globalVesselCallId) return;
		
		snCombo.load({
			params : {
				vslCallId : globalVesselCallId
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						snCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
					}
				}
			}
		});
		
		blCombo.load({
			params : {
				vslCallId : globalVesselCallId
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						blCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
					}
				}
			}
		});
	},
	
	// Retrieve
	onTblRetrieve: function (){
		var me = this;
		var refs = me.getReferences();
		var tabPanel = refs.refTabYardCheckerCtl.getActiveItem().name;

		switch(tabPanel){
			case 'yardcheckerexport':
				me.searchExportTbl();
				break;
			case 'yardcheckerimport':
				me.searchImportTbl();
				break;
		}
	},
	
	searchExportTbl:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('yardCheckerHHTTabExport');	// apronCheckerHHTTabExport
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var shipgNoteNo = refs.refCbxSN.getValue();
		
		if(!vslCallId){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		
		var params = {
			vslCallId : vslCallId,
			shipgNoteNo : shipgNoteNo,
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
		var store = me.getStore('yardCheckerHHTTabImport');
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var blNo = refs.refCbxBL.getValue();
		
		if(!vslCallId){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		var params = {
				vslCallId : vslCallId,
				blNo : blNo,
		};
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
				}
			}
		});
	},
	
	onActivateTabHHT: function(ref){
		var me = this;
		var tab = ref.reference;
		me.setButtonByTab(tab);
	},
	
	setButtonByTab: function(tab){
		var me = this;
		var refs = me.getReferences();
		var loading = discharging = handlingIn = handlingOut = rehandling = true; //defaul: disable = true
		if (tab == 'refPnlExport'){
			me.caTyCd = 'EX';
			loading = handlingIn = rehandling = false;
		}else if(tab == 'refPnlImport'){
			me.caTyCd = 'IM';
			discharging  = handlingOut = false;
		}
		
		refs.refRehandlingBtn.setHidden(rehandling);
		refs.refRehandlingOutBtn.setHidden(rehandling);
		
		refs.refBtnYHandlingIn.setHidden(handlingIn);
		refs.refBtnYHandlingInUpdate.setHidden(handlingIn);
		
		refs.refBtnYHandlingOut.setHidden(handlingOut);
		refs.refBtnYHandlingOutUpdate.setHidden(handlingOut);
		
		refs.refInventoryDischargingBtn.setHidden(true);
		refs.refDamageDischargingBtn.setHidden(true);
		refs.refYardCheckBtn.setHidden(discharging);
		refs.refDischargingYardCheckUpdateBtn.setHidden(discharging);
		refs.refDischargingYardCheckUpdateBtn.setHidden(discharging);

		refs.refInventoryLoadingBtn.setHidden(true);
		refs.refDamageLoadingBtn.setHidden(true);
		refs.refLoadingCheckBtn.setHidden(loading);
		refs.refLoadingYardCheckUpdateBtn.setHidden(loading);
		refs.refDischargingYardCheckUpdateBtn.setHidden(discharging);
		
		refs.refCbxBL.setDisabled(discharging);
		refs.refCbxBL.setHidden(discharging);
		refs.refCbxSN.setDisabled(loading);
		refs.refCbxSN.setHidden(loading);
		
	},
	
	
	
	/** 
	 * =========================================================
	 * 	IMPORT START
	 */
	
	// Button WH/IN
	onWarehouseInSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWHI_roro');

		var store = me.getStore('yardCheckerHHTTabImport');
		store.reload();
		
		var grid = me.lookupReference('refGridImportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		var searchParams = '';
		
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		searchParams = unitItem.clone();
		searchParams.title = title;
        
		ViewUtil.openHhtPopup(me, 'app-yardconfirmdischargingofrorohht', 'refYardCheckBtn', searchParams);
	},
	
	// Button Update DS/WH
	onTblUpdateYardDischarging: function(){
		var me = this;
		var refs = me.getReferences();
		var title = 'Update Warehouse Check for RORO Import';
		
		var store = me.getStore('yardCheckerHHTTabImport');
		store.reload();
		
		var searchParams = '';
		var grid = me.lookupReference('refGridImportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-yardlistofdischargingofrorohht', 'refDischargingYardCheckUpdateBtn', searchParams);
	},
	
	// Yard List
	onTblYardList: function(){
		var me = this;
		var refs = me.getReferences();
		
		ViewUtil.openHhtPopup(me, 'app-listofyardhht', 'refYardListBtn', null);
	},
	
	
	// Button Update HO/WH
	onTblHandlingOutUpdate: function(){
		var me = this;
		var refs = me.getReferences();
		var title = 'Update Warehouse Check for RORO Import';
		
		var store = me.getStore('yardCheckerHHTTabImport');
		store.reload();
		
		var grid = me.lookupReference('refGridImportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
        searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-updatinghandlingoutofrorohht', 'refBtnYHandlingOutUpdate', searchParams);
	},
	
	// Button Handling Out
	onTblHandlingOut: function(){
		var me = this;
		var refs = me.getReferences();
		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWH_HO_roro');
		
		var store = me.getStore('yardCheckerHHTTabImport');
		store.reload();
		var grid = me.lookupReference('refGridImportYardCheckerHHTTab');
		var searchParams = '';
		
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
        
        searchParams = unitItem.clone();
		searchParams.title = title;
        
		ViewUtil.openHhtPopup(me, 'app-confirmhandlingoutofrorohht', 'refBtnYHandlingOut', searchParams);
	},
	
	onTblDamageDischarging: function(){
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore('yardCheckerHHTTabImport');
		store.reload();
		var grid = me.lookupReference('refGridImportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		unitItem.set('searchType', 'YardDischarged');
		
		ViewUtil.openHhtPopup(me, 'app-yardcheckerdamagecheckofrorohht', 'refDamageDischargingBtn', unitItem);
	},
	
	onTblInventoryDischarging: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('yardCheckerHHTTabImport');
		store.reload();
		var grid = me.lookupReference('refGridImportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		ViewUtil.openHhtPopup(me, 'app-thelistofinventorycheckrorohht', 'refInventoryDischargingBtn', unitItem);
	},
	
	/** 
	 * 	IMPORT  END
	 *  =========================================================
	 */ 
	
	
	
	/** 
	 * =========================================================
	 * 	Export START
	 * 
	 */ 
	onTblRehandlingLoading: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('yardCheckerHHTTabExport');
		store.reload();
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		ViewUtil.openHhtPopup(me, 'app-confirmloadingofrororehandlinghht', 'refRehandlingBtn', unitItem);
	},
	
	
	// Button Rehandling H/O
	onTblRehandlingOutofRORO: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParams = '';
		var title = 'Yard - Confirm Rehandling Operation of RORO H/O';
		
		var store = me.getStore('yardCheckerHHTTabExport');
		store.reload();
		
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-confirmhandlingoutofrororehandlinghht', 'refRehandlingOutBtn', searchParams);
	},
	
	// Button W/H Check : Export
	onWarehouseOutSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var title = 'Confirm Warehouse Out for RORO Export';
		
		var searchParams = '';
		var store = me.getStore('yardCheckerHHTTabExport');
		store.reload();
		
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-yardconfirmloadingofrorohht', 'refLoadingCheckBtn', searchParams);
	},
	
	
	// Button Update WH/LD
	onTblUpdateYardLoading: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParams = '';
		var title = 'Update Warehouse-Out for RORO Export';
		
		var store = me.getStore('yardCheckerHHTTabExport');
		store.reload();
		
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-yardlistofloadingofrorohht', 'refLoadingYardCheckUpdateBtn', searchParams);
	},
	
	
	// Button HandlingIn
	onTblHandlingIn: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParams = '';
		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWH_HI_roro');
		
		var store = me.getStore('yardCheckerHHTTabExport');
		store.reload();
		
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
        
		searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-confirmhandlinginofrorohht', 'refBtnYHandlingIn', searchParams);
	},
	
	// Button Update HI/WH
	onTblHandlingInUpdate: function(){
		var me = this;
		var refs = me.getReferences();
		var title = 'Update Handling-In for RORO';
		
		var searchParams = '';
		var store = me.getStore('yardCheckerHHTTabExport');
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		
		store.reload();
		
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		searchParams = unitItem.clone();
		searchParams.title = title;
		
		ViewUtil.openHhtPopup(me, 'app-yardlistofhandlinginofrorohht', 'refBtnYHandlingInUpdate', searchParams);
	},
	
	onTblInventoryLoading: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('yardCheckerHHTTabExport');
		store.reload();
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		ViewUtil.openHhtPopup(me, 'app-thelistofinventorycheckrorohht', 'refInventoryLoadingBtn', unitItem);
	},
	
	onTblDamageLoading: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('yardCheckerHHTTabExport');
		store.reload();
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		var unitItem = grid.getSelection();
		if(unitItem == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		ViewUtil.openHhtPopup(me, 'app-yardcheckerdamagecheckofrorohht', 'refDamageLoadingBtn', unitItem);
	},
	/** 
	 * =========================================================
	 * 	Export END
	 * 
	 */ 
});