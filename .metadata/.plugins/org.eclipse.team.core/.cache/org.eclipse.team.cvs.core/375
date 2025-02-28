Ext.define('MOST.view.operation.CargoManualCtlController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.cargomanualctl',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	GENERAL_GRID_REF_NAME: 'refCargoManualCtlGenerlTabGrid',
	EXPORT_GRID_REF_NAME: 'refCargoManualCtlTabExportGrid',
	IMPORT_GRID_REF_NAME: 'refCargoManualCtlTabImportGrid',
	GATEPASS_GRID_REF_NAME: 'refCargoManualCtlTabGatePassGrid',

	GENERAL_STORE_NAME: 'cargoManualCtlCargoGeneral',
	EXPORT_STORE_NAME: 'cargoManualCtlTabExport',
	IMPORT_STORE_NAME: 'cargoManualCtlTabImport',
	GATEPASS_STORE_NAME: 'cargoManualCtlTabGatePass',
	YARD_TRUCK_WH_IMPORT_LIST: 'yardTruckWhImportList',
	HANDLING_OUT_IMPORT_LIST: 'handlingOutImportList',
	HANDLING_IN_EXPORT_GR_LIST: 'handlingInExportGRList',
	SUB_BL_LIST: 'subBlList',
	
	NUMBER_FORMAT : '0,000',
	caTyCd : 'GR',
	MAX_HATCH_NO: 11,

	LIST_TYPE: '',

	gateObject: new Object(),
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
		
		var searchParm = Ext.create('MOST.model.operation.SearchCargoManualCtlParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		var comboStore = me.getStore('cargoManualCtlCargoGeneralCombo');
		var categoryStore = me.getStore('cargoManualCtlForCategoryCombo');
		var deliveryStore = me.getStore('cargoManualCtlForDeliveryCombo');
		var importDeliveryStore = me.getStore('cargoManualCtlForImportDeliveryCombo');
		var modeOfOprStore = me.getStore('cargoManualCtlForModeOfOprCombo');
		var cargoTypeStore = me.getStore('cargoManualCtlForCargoTypeCombo');
		var packageTypeStore = me.getStore('cargoManualCtlForPackageTypeCombo');
		
		me.setHiddenSnBlButton(true);
		
		comboStore.load({
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						categoryStore.setData(record[0].get('categoryList'));
						deliveryStore.setData(record[0].get('deliveryList'));
						modeOfOprStore.setData(record[0].get('modeOfOprList'));
						cargoTypeStore.setData(record[0].get('cargoTypeList'));
						packageTypeStore.setData(record[0].get('packageTypeList'));
						importDeliveryStore.setData(record[0].get('deliveryList'));
						importDeliveryStore.insert(0, [{scdNm: 'ALL',scd: ''}]);
					}
				}
			},
		});
		me.onHatchDataSet();
	},
	
	// Initialize Control
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
	},

	onHatchDataSet: function(){
		var me = this;
		var store = me.getStore('hatchNoCombo');
		
		store.removeAll();
		store.insert(0, [{cdNm: 'ALL',cd: ''}]);
		for(var i = 0; i < me.MAX_HATCH_NO; i++){
			store.insert(i+1, [{cdNm: 'H' + (i+1),cd: 'H' + (i+1)}])
		}
		store.commitChanges();
	},
	
	
	onUpperCaseGP: function(control){
		var me = this;
		var refs = me.getReferences();
		
		control.setValue(control.getValue().toUpperCase());
		refs.ctlCargoManualCtlTabPanel.setActiveTab(3);
	},
	
	onCallBackFromOperationScreen: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.txtTruckNo.setValue();
		me.gateObject = new Object();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Tab Change Event
	onTabChange : function(tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();

		switch(tabPanel.getActiveTab().name){
			case 'general':
				me.caTyCd = 'GR';
				refs.ctlLoadingButton.setDisabled(true);
				refs.ctlDischargingButton.setDisabled(true);
				refs.ctlHandlingInButton.setDisabled(true);
				refs.ctlHandlingOutButton.setDisabled(true);
				refs.ctlMovementButton.setDisabled(true);
				refs.ctlWhCheckImportButton.setHidden(true);
				refs.ctlWHCheckExportButton.setHidden(true);
				break;
			case 'export':
				me.caTyCd = 'EX';
				refs.refCargoManualSearchMode.setValue('SN');
				me.onSearchModeClick(refs.refCargoManualSearchMode);
				
				refs.ctlLoadingButton.setDisabled(false);
				refs.ctlDischargingButton.setDisabled(true);
				refs.ctlHandlingInButton.setDisabled(false);
				refs.ctlHandlingOutButton.setDisabled(true);
				refs.ctlMovementButton.setDisabled(false);
				refs.ctlWhCheckImportButton.setHidden(true);
				refs.ctlWHCheckExportButton.setHidden(false);
				refs.ctlCargoManualCtlShiftNo.clearValue();
				refs.ctlCargoManualCtlShiftDt.clearValue();
				break;
			case 'import':
				me.caTyCd = 'IM';
				refs.ctlLoadingButton.setDisabled(true);
				refs.ctlDischargingButton.setDisabled(false);
				refs.ctlHandlingInButton.setDisabled(true);
				refs.ctlHandlingOutButton.setDisabled(false);
				refs.ctlMovementButton.setDisabled(false);
				refs.ctlWhCheckImportButton.setHidden(false);
				refs.ctlWHCheckExportButton.setHidden(true);
				
				refs.refCargoManualSearchMode.setValue('BL');
				me.onSearchModeClick(refs.refCargoManualSearchMode);
				refs.ctlCargoManualCtlShiftNo.clearValue();
				refs.ctlCargoManualCtlShiftDt.clearValue();
				break;
			case 'gatePass':
				me.caTyCd = 'GP';
				refs.ctlLoadingButton.setDisabled(true);
				refs.ctlDischargingButton.setDisabled(true);
				refs.ctlHandlingInButton.setDisabled(true);
				refs.ctlHandlingOutButton.setDisabled(true);
				refs.ctlMovementButton.setDisabled(true);
				refs.ctlWhCheckImportButton.setHidden(true);
				refs.ctlWHCheckExportButton.setHidden(true);
				break;
		}
	},
	
	// Tab Search
	onSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlCargoGeneral');
		var jpvcNo = refs.ctlCargoManualCtlJpvcfield.getValue();
		var sn = refs.ctlCargoManualCtlSn.getValue();
		var bl = refs.ctlCargoManualCtlBl.getValue();
		var tabPanel = refs.ctlCargoManualCtlTabPanel.getActiveTab().name;
		
		var isIndicator = false;
				
		if(!StringUtil.isNullorEmpty(sn)){
			isIndicator = true;
		}
		
		switch(tabPanel){
			case 'general':
				me.searchGeneral(isIndicator);
				break;
			case 'export':
				me.searchExport(isIndicator);
				break;
			case 'import':
				me.searchImport(isIndicator);
				break;
			case 'gatePass':
				me.searchGatePass(isIndicator);
				break;
		}
	},
	
	// Validate Search Condition
	validateSearchCondition:function(){
		var me = this;
		var refs = me.getReferences();
		var tabPanel = refs.ctlCargoManualCtlTabPanel.getActiveTab().name;
		var sn = refs.ctlCargoManualCtlSn.getValue();
		var bl = refs.ctlCargoManualCtlBl.getValue();
		
		if(tabPanel !== 'gatePass'){
			if(tabPanel === 'export'){

			} else if(tabPanel === 'general') {
				if(StringUtil.isNullorEmpty(sn) && StringUtil.isNullorEmpty(bl)){
					MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'S/N or B/L');
					return false;
				}
			}
		}
		
		return true;
	},
	
	// Reset Window Button
	onResetWindowsState:function(btn){
		var me = this;
		var provider = Ext.state.Manager.getProvider();
		
		if(btn.getValue() !== 'all'){
			me.clearState(btn.getValue())
		} else {
			me.clearState('app-cargoloading');
			me.clearState('app-cargodischarging');
			me.clearState('app-cargohandlingin');
			me.clearState('app-cargohandlingout');
			me.clearState('app-cargomovement');
		}
	},
	
	// SN, BL Mode toggle button
	onSearchModeClick: function(btn, e) {
    	var me = this;
    	var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		
		searchParm.set('docTp', btn.getValue());
		
    	if(btn.getValue() === 'SN'){
    		me.setHiddenSnBlButton(true);
    		refs.ctlCargoManualCtlTabPanel.setActiveTab(1);	
			//refs.txtTruckNo.params.flag = true;		
    	} else {
    		me.setHiddenSnBlButton(false);
    		refs.ctlCargoManualCtlTabPanel.setActiveTab(2);
			//refs.txtTruckNo.params.flag = false;
    	}
	},
	
	// JPVC Information Toolbar 
	onCloseForJpvcInfo: function (btn) {
	    var me = this;
	    var refs = me.getReferences();
	    refs.ctlJpvcToolbar.setHidden(true);
	    refs.ctlCargoManualCtlJpvcInfoButton.setPressed(false);
    },
    
    // JPVC Information Toogle
    onJpvcInfoToggle:function(btn){
    	var me = this;
	    var refs = me.getReferences();
	    refs.ctlJpvcToolbar.setHidden(!btn.pressed);
    },
	
	// GR Button
	onGr : function(){
		var me = this;
		var refs = me.getReferences();
		var gr = refs.ctlCargoManualCtlGr.getValue();
		var snStore = me.getStore('cargoManualCtlForSnCombo');
		var store = me.getStore('cargoManualCtlForGoGr');
		var searchParm = me.getViewModel().get('theSearch');
		
		if(StringUtil.isNullorEmpty(gr)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'G/R');
			return;
		}
		
		var params = me.getGrGpSearchCondition();
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					snStore.setData(record[0].get('snList'));
					
					if(record[0].get('items') != null && record[0].get('items').length > 0){
						var detailItem = record[0].get('items')[0];
						me.getViewModel().setData({theVsl:detailItem});
						refs.ctlCargoManualCtlJpvcfield.setValue(detailItem.vslCallId);
						refs.ctlCargoManualCtlSn.setValue(detailItem.shipgNoteNo);
						me.setShiftDtCombo();
						
						searchParm.set('vslCallId',detailItem.vslCallId);
					}
				}
			}
		});
	},
	
	// GP Button
	onGp : function(){
		var me = this;
		var refs = me.getReferences();
		var gp = refs.ctlCargoManualCtlGp.getValue();
		var blStore = me.getStore('cargoManualCtlForBlCombo');
		var store = me.getStore('cargoManualCtlForGoGp');
		
		if(StringUtil.isNullorEmpty(gp)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'G/P');
			return;
		}
		
		var params = me.getGrGpSearchCondition();
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					me.convertBlList(record[0].get('blList'));
					blStore.setData(record[0].get('blList'));

					if(record[0].get('items') != null && record[0].get('items').length > 0){
						var detailItem = record[0].get('items')[0];
						me.getViewModel().setData({theVsl:detailItem});
						refs.ctlCargoManualCtlJpvcfield.setValue(detailItem.vslCallId);
						refs.ctlCargoManualCtlBl.setValue(detailItem.blNo);
						me.setShiftDtCombo();
					}
				}
			}
		});
	},
	
	// General Search condition
	getGrGpSearchCondition:function(){
		var me = this;
		var refs = me.getReferences();
		var jpvcNo = refs.ctlCargoManualCtlJpvcfield.getValue();
		var sn = refs.ctlCargoManualCtlSn.getValue();
		var bl = refs.ctlCargoManualCtlBl.getValue();
		var gr = refs.ctlCargoManualCtlGr.getValue();
		var gp = refs.ctlCargoManualCtlGp.getValue();
		
		var params = {
			vslCallId : jpvcNo,
			shipgNoteNo : sn,
			blNo : bl,
			grNo : gr,
			gatePassNo : gp
		}
		
		return params;
	},	
	
	// S/N, B/L Combo Change Event
	onSnBlComboChange: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		
		if(combo.reference === 'ctlCargoManualCtlSn'){
			refs.ctlCargoManualCtlBl.suspendEvent('change');
			refs.ctlCargoManualCtlBl.setValue('');
			refs.ctlCargoManualCtlBl.resumeEvent('change');
			//refs.ctlCargoManualCtlTabPanel.setActiveTab(1);
			
			var gridExport = refs.refCargoManualCtlTabExportGrid;
			var gridGenTotal = refs.refCargoManualCtlGeneralTabTotalGrid;
			var gridGenRemain = refs.refCargoManualCtlGeneralTabRemainGrid;

			gridExport.getStore().removeAll();
			gridGenTotal.getStore().removeAll();
			gridGenRemain.getStore().removeAll();

			gridExport.getStore().commitChanges();
			gridGenTotal.getStore().commitChanges();
			gridGenRemain.getStore().commitChanges();

			me.getViewModel().setData({theGeneral: null});
		} else {
			refs.ctlCargoManualCtlSn.suspendEvent('change');
			refs.ctlCargoManualCtlSn.setValue('');
			refs.ctlCargoManualCtlSn.resumeEvent('change');
		}
		me.onChangeSearchCondition();
	},
	
	// Shift Combo
	onShiftDtComboChange: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var shiftStore = me.getStore('cargoManualCtlForShiftNoCombo');
		var shftDt = refs.ctlCargoManualCtlShiftDt.getValue();
		var hatchNoCombo = me.getStore('hatchNoCombo');
		
		hatchNoCombo.removeAll();
		
		if(shftDt != null && shftDt != ''){
			shiftStore.load({
				params:{
					shftDt : shftDt,
					vslCallId : refs.ctlCargoManualCtlJpvcfield.getValue()
				},
				callback: function(record, operation, success) {
					if(success){
						hatchNoCombo.insert(0, [{
							cdNm: record[0].data.hatchNo,
							cd: record[0].data.hatchNo
						}]);
						hatchNoCombo.commitChanges();
					}
				}
			})
		}
	},
	
	// Shift No Combo
	onShiftNoComboChange: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var shiftStore = me.getStore('cargoManualCtlForShiftNoCombo');
		var hatchNoCombo = me.getStore('hatchNoCombo');
		
		hatchNoCombo.removeAll();

		shiftStore.each(
			function (record, index) {
				if(refs.ctlCargoManualCtlShiftNo.getRawValue() != null 
						&& refs.ctlCargoManualCtlShiftNo.getRawValue() != ''
							&& record.get('shftNm') == refs.ctlCargoManualCtlShiftNo.getRawValue()){
					hatchNoCombo.insert(0, [{
						cdNm: record.get('hatchNo'),
						cd: record.get('hatchNo')
					}]);
					hatchNoCombo.commitChanges();
				}
			}
		);
	},
	
	// Loading Button Click
	onLoading : function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmLoadingTitle'};
		var grid = me.lookupReference('refCargoManualCtlTabExportGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var searchParm = me.getViewModel().get('theSearch');
		var shiftNoStore = me.getStore('cargoManualCtlForShiftNoCombo');
		var shiftDtStore = me.getStore('cargoManualCtlForShiftDtCombo');
		var isYardTruck = refs.ctlCargoManualTruckType.getValue();
		var cgTpCdList = ['BBK', 'DBN', 'DBE'];
		
		var proceed = true;
		
		//if(!me.checkWorkButtonMandatory()) return;
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
			
			var cargoType;
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
				cargoType = 'BATAM';
			} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				cargoType = 'Container';
			} else {
				cargoType = selection.get('cgTpCd');
			}
			
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
			return;
		}
		
		if(cgTpCdList.includes(selection.get('cgTpCd'))){
			if(refs.ctlCargoManualCtlShiftDt.getValue() == '' || refs.ctlCargoManualCtlShiftDt.getValue() == null ||
					refs.ctlCargoManualCtlShiftNo.getValue() == '' || refs.ctlCargoManualCtlShiftNo.getValue() == null ||
					refs.refCboHatchNoSn.getValue() == '' || refs.refCboHatchNoSn.getValue() == null){
				if(shiftDtStore.getData().items.length > 0){
					MessageUtil.warning('warning_msg', 'Please select working Date/Shift and Hatch to operation.');
					return;
				} else if (shiftDtStore.getData().items.length == 0){
					MessageUtil.warning('warning_msg', 'There is no shift to define, please recheck!');
					return;
				}
			}
			
			var tempCgTpCd = '';
			
			if(selection.get('cgTpCd') != null && selection.get('cgTpCd') != '' && (selection.get('cgTpCd') == 'DBE' || selection.get('cgTpCd') == 'DBN')){
				tempCgTpCd = 'DBK';
			} else {
				tempCgTpCd = 'BBK';
			}
			
			shiftNoStore.each(
					function(record, index){
						if(record.get('shftNm') == refs.ctlCargoManualCtlShiftNo.getRawValue()){
							if(tempCgTpCd != record.get('cgTpCd')){
								MessageUtil.warning('warning_msg', 'Non match cargo type with selected shift.');
								proceed = false;
								return;
							}
						}
					}
			)
		}

		if(proceed){
			if(me.LIST_TYPE !== 'GR' && me.LIST_TYPE !== 'JOBWA'){
				if(isYardTruck){
					MessageUtil.warning('warning_msg', 'cargomanualctl_loading_wajob_msg');
					return;
				}else{
					if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_LQN){
						if(selection.get('tsptTpCd') != null && selection.get('tsptTpCd') == 'PL'){
							if(selection.get('lorryNo') != null && selection.get('lorryNo') != ''){
								MessageUtil.warning('warning_msg', 'cargomanualctl_loading_wajob_msg');
								return;
							}
						}else{
							MessageUtil.warning('warning_msg', 'cargomanualctl_loading_direct_msg');
							return;
						}
						
					}else{
						MessageUtil.warning('warning_msg', 'cargomanualctl_loading_direct_msg');
						return;
					}
				}
			}

			var searchParams = selection.clone();
				
			var atb = searchParams.get('atb');
			if (atb === null || atb === '') {
				MessageUtil.warning('warning_msg', 'There is no ATB registered, please recheck on Vessel schedule');
				return;
			}
				
			var lorryNo = searchParams.get('lorryNo');
			if(searchParm.get('lorryNo')){
				lorryNo = searchParm.get('lorryNo');
			}

			searchParams.set('caTyCd', me.caTyCd);
			searchParams.set('hatchNo', searchParm.get('hatchNo'));
			searchParams.set('lorryNo', lorryNo);
			searchParams.set('truckType', searchParm.get('truckType'));
			searchParams.set('shftDtFromCbbx', refs.ctlCargoManualCtlShiftDt.getValue());
			searchParams.set('shftCdFromCbbx', refs.ctlCargoManualCtlShiftNo.getRawValue());
			searchParams.set('shftIdFromCbbx', refs.ctlCargoManualCtlShiftNo.getValue());
			//searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
			//searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
				
			if(me.LIST_TYPE == 'JOBWA'){
				searchParams.set('prevJobNo', searchParams.get('jobNo'));
				searchParams.set('wbTransactionNo', searchParams.get('wbTransactionNo'));
			} else {
				searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
				searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
			}

			if(me.LIST_TYPE == 'JOBWA'){
				searchParams.set('prevJobNo', searchParams.get('jobNo'));
				searchParams.set('wbTransactionNo', searchParams.get('wbTransactionNo'));
			} else {
				searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
				searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
			}

			searchParams.commit();
				
			if(selection.get('spYn') === 'Y'){
				MessageUtil.warning('warning_msg', 'cargomanualctl_special_cargo_msg');
				return;
			}
			
			validationCodeStore.load({
				params : {
					tyCd : 'validationFinalCargo',
					col1 : selection.get('vslCallId'),
					col2 : selection.get('shipgNoteNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
							if(records[0].get('isValidated') === 'Y'){
								me.getView().detailViewAlias = 'app-cargoloading';
								me.openDetailPopup(searchParams, title);
							} else {
								MessageUtil.warning('warning_msg', 'cargomanualctl_no_longer_loading_msg');
							}
						}
					}
				}
			});
		}
	},
	
	onWHCheckExport: function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'warehouseCheckExportTitle'};
		var grid = me.lookupReference('refCargoManualCtlTabExportGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
				
		// if(!me.checkWorkButtonMandatory()) 
		// 	return;

		if(me.LIST_TYPE !== 'SN'){
			MessageUtil.warning('warning_msg', 'cargomanualctl_whcheck_export_msg');
			return;
		}
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		} else {
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
					|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
					|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				
				var cargoType;
				
				if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
					cargoType = 'BATAM';
				} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
					cargoType = 'Container';
				} else {
					cargoType = selection.get('cgTpCd');
				}
				
				MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
				return;
			}
			
			var searchParams = selection.clone();
			searchParams.set('shftDt', refs.ctlCargoManualCtlShiftDt.getValue());
			searchParams.set('shftId', refs.ctlCargoManualCtlShiftNo.getValue());
			searchParams.set('shftNm', refs.ctlCargoManualCtlShiftNo.getRawValue());
			searchParams.commit();
		}
		
		validationCodeStore.load({
			params : {
				tyCd : 'validationFinalCargo',
				col1 : selection.get('vslCallId'),
				col2 : selection.get('shipgNoteNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'Y'){
							me.getView().detailViewAlias = 'app-whcheckexport';
							me.openDetailPopup(searchParams, title);
						} else {
							MessageUtil.warning('warning_msg', 'cargomanualctl_no_longer_whcheck_msg');
						}
					}
				}
			}
		});
	},
	
	// Discharging Button Click
	onDischarging : function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmDischargingTitle'};
		var grid = me.lookupReference('refCargoManualCtlTabImportGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var searchParm = me.getViewModel().get('theSearch');
		var shiftDtStore = me.getStore('cargoManualCtlForShiftDtCombo');
		var shiftNoStore = me.getStore('cargoManualCtlForShiftNoCombo');
		var cgTpCdList = ['BBK', 'DBN', 'DBE'];
		
		var proceed = true;
		//if(!me.checkWorkButtonMandatory()) return; //Remove Combobox Shift+Date
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
			
			var cargoType;
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
				cargoType = 'BATAM';
			} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				cargoType = 'Container';
			} else {
				cargoType = selection.get('cgTpCd');
			}
			
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
			return;
		}
		
		if((selection.get('sdoNo') != null && selection.get('sdoNo') != '') && selection.get('sdoDelvTpCd') == 'I'){
			MessageUtil.warning('warning_msg', 'cargomanualctl_discharging_msg_Indirect');
			return;
		}
		
		if(cgTpCdList.includes(selection.get('cgTpCd'))){
			if(refs.ctlCargoManualCtlShiftDt.getValue() == '' || refs.ctlCargoManualCtlShiftDt.getValue() == null ||
					refs.ctlCargoManualCtlShiftNo.getValue() == '' || refs.ctlCargoManualCtlShiftNo.getValue() == null ||
					refs.refCboHatchNoBl.getValue() == '' || refs.refCboHatchNoBl.getValue() == null){
				if(shiftDtStore.getData().items.length > 0){
					MessageUtil.warning('warning_msg', 'Please select working Date/Shift and Hatch to operation.');
					return;
				} else if (shiftDtStore.getData().items.length == 0){
					MessageUtil.warning('warning_msg', 'There is no shift to define, please recheck!');
					return;
				}
			}
			
			var tempCgTpCd = '';
			
			if(selection.get('cgTpCd') != null && selection.get('cgTpCd') != '' && (selection.get('cgTpCd') == 'DBE' || selection.get('cgTpCd') == 'DBN')){
				tempCgTpCd = 'DBK';
			} else {
				tempCgTpCd = 'BBK';
			}
			
			shiftNoStore.each(
					function(record, index){
						if(record.get('shftNm') == refs.ctlCargoManualCtlShiftNo.getRawValue()){
							if(tempCgTpCd != record.get('cgTpCd')){
								MessageUtil.warning('warning_msg', 'Non match cargo type with selected shift.');
								proceed = false;
								return;
							}
						}
					}
				)
		}
		
		if(proceed){
			if (me.LIST_TYPE == 'BL' || me.LIST_TYPE == 'BARGE') {
				var searchParams = selection.clone();
				//check atb valid or not
				var atb = searchParams.get('atb');
				if (atb === null || atb === '') {
					MessageUtil.warning('warning_msg', 'There is no ATB registered, please recheck on Vessel schedule');
					return;
				}
				
				searchParams.set('caTyCd', me.caTyCd);
				searchParams.set('hatchNo', searchParm.get('hatchNo'));
				searchParams.set('lorryNo', searchParm.get('lorryNo'));
				searchParams.set('truckType', searchParm.get('truckType'));
				searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
				searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
				
				if ( me.LIST_TYPE == 'BL' && me.gateObject) {
					searchParams.set('sdoNo', me.gateObject.sdoNo);
				}
				//searchParams.set('sdoNo', me.gateObject.sdoNo);
				searchParams.set('bargeCheck', refs.ctlBargeOperationChk.getValue() ? 'Y' : 'N');
				searchParams.set('shftDtFromCbbx', refs.ctlCargoManualCtlShiftDt.getValue());
				searchParams.set('shftCdFromCbbx', refs.ctlCargoManualCtlShiftNo.getRawValue());
				searchParams.commit();
				
				me.getView().detailViewAlias = 'app-cargodischarging';
				me.openDetailPopup(searchParams, title);
			}
			else {
				MessageUtil.warning('warning_msg', 'cargomanualctl_discharging_msg');
				return;
			}
		}
	},
	
	// Handling In Button Click
	onHandlingIn : function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmHandlingInTitle'};
		var grid = me.lookupReference('refCargoManualCtlTabExportGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var theSearchParm = me.getViewModel().get('theSearch');
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
			
			var cargoType;
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
				cargoType = 'BATAM';
			} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				cargoType = 'Container';
			} else {
				cargoType = selection.get('cgTpCd');
			}
			
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
			return;
		}

		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
			
			var cargoType;
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
				cargoType = 'BATAM';
			} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				cargoType = 'Container';
			} else {
				cargoType = selection.get('cgTpCd');
			}
			
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
			return;
		}
		
		if(me.LIST_TYPE !== 'GR' || (refs.txtTruckNo.getValue() == null || refs.txtTruckNo.getValue() == '')){
			MessageUtil.warning('warning_msg', 'cargomanualctl_handlingin_msg');
			return;
		}
			
		var searchParams = selection.clone();
		var lorryNo = searchParams.get('lorryNo');

		if(theSearchParm.get('lorryNo')){
			lorryNo = theSearchParm.get('lorryNo');
		}

		searchParams.set('caTyCd', me.caTyCd);
		searchParams.set('hatchNo', theSearchParm.get('hatchNo'));
		searchParams.set('lorryNo', lorryNo);
		searchParams.set('truckType', theSearchParm.get('truckType'));
		searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
		searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
		searchParams.commit();
		
		validationCodeStore.load({
			params : {
				tyCd : 'validationFinalCargo4HandlingIn',
				col1 : selection.get('vslCallId'),
				col2 : selection.get('shipgNoteNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'Y'){
							me.getView().detailViewAlias = 'app-cargohandlingin';
							me.openDetailPopup(searchParams, title);
						} else {
							MessageUtil.warning('warning_msg', 'confirmhandlingin_final_msg');
						}
					}
				}
			}
		});
	},
	
	// Handling Out Button Click
	onHandlingOut:function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmHandlingOutTitle'};
		var grid;
		
		switch(refs.ctlCargoManualCtlTabPanel.getActiveTab().name){
			case 'export':
				grid = me.lookupReference('refCargoManualCtlTabExportGrid');
				break;
			
			case 'import':
				grid = me.lookupReference('refCargoManualCtlTabImportGrid')
				break;
		}
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
			
			var cargoType;
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
				cargoType = 'BATAM';
			} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				cargoType = 'Container';
			} else {
				cargoType = selection.get('cgTpCd');
			}
			
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
			return;
		}
		
		if((selection.get('sdoNo') != null && selection.get('sdoNo') != '') && selection.get('sdoDelvTpCd') == 'D'){
			MessageUtil.warning('warning_msg', 'cargomanualctl_discharging_msg_Direct');
			return;
		}
		
		if (me.LIST_TYPE == 'BL') {
			if(selection.get('statCd') === 'RS' || !selection.get('isExistedCargo') || selection.get('isExistedCargo') != 'Y'){
				MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
				return;
			}
				
			var searchParams = selection.clone();
			searchParams.set('shftDt', refs.ctlCargoManualCtlShiftDt.getValue());
			searchParams.set('shftId', refs.ctlCargoManualCtlShiftNo.getValue());
			searchParams.set('shftNm', refs.ctlCargoManualCtlShiftNo.getRawValue());
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.set('lorryNo', me.gateObject.lorryNo);
			searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
			searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
			searchParams.set('sdoNo', me.gateObject.sdoNo);
			searchParams.set('grNo', me.gateObject.grNo);
			searchParams.commit();
			
			me.getView().detailViewAlias = 'app-cargohandlingout';
			me.openDetailPopup(searchParams, title);
		}
		else {
			/*MessageUtil.warning('warning_msg', 'cargomanualctl_handling_out_msg');
			return;*/
			
			var searchParams = selection.clone();
			searchParams.set('shftDt', refs.ctlCargoManualCtlShiftDt.getValue());
			searchParams.set('shftId', refs.ctlCargoManualCtlShiftNo.getValue());
			searchParams.set('shftNm', refs.ctlCargoManualCtlShiftNo.getRawValue());
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
			searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
			searchParams.set('sdoNo', me.gateObject.sdoNo);
			searchParams.set('grNo', me.gateObject.grNo);
			searchParams.commit();
			
			me.getView().detailViewAlias = 'app-cargohandlingout';
			me.openDetailPopup(searchParams, title);
		}
	},
	
	// Movement Button Click
	onMovement : function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmMovementTitle'};
		var grid;
		
		switch(refs.ctlCargoManualCtlTabPanel.getActiveTab().name){
			case 'export':
				grid = me.lookupReference('refCargoManualCtlTabExportGrid');
				break;
			
			case 'import':
				grid = me.lookupReference('refCargoManualCtlTabImportGrid')
				break;
		}
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		} else {
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
					|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
					|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				
				var cargoType;
				
				if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
					cargoType = 'BATAM';
				} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
					cargoType = 'Container';
				} else {
					cargoType = selection.get('cgTpCd');
				}
				
				MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
				return;
			}
			
			if(selection.get('statCd') === 'RS' || !selection.get('isExistedCargo') || selection.get('isExistedCargo') != 'Y'){
				MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
				return;
			}
			
			var searchParams = selection.clone();
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.commit();
			
			me.getView().detailViewAlias = 'app-cargomovement';
			me.openDetailPopup(searchParams, title);
		}
	},
	
	// Discharging Button Click
	onWhCheckImport : function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'whCheckImportTitle'};
		var grid = me.lookupReference('refCargoManualCtlTabImportGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		
		// if(!me.checkWorkButtonMandatory()) return;
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
				|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
			
			var cargoType;
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
				cargoType = 'BATAM';
			} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				cargoType = 'Container';
			} else {
				cargoType = selection.get('cgTpCd');
			}
			
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
			return;
		}
		
		if(me.LIST_TYPE == 'JOBVA') {
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT
					|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_OIMR 
					|| selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
				
				var cargoType;
				
				if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BT){
					cargoType = 'BATAM';
				} else if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_CTR){
					cargoType = 'Container';
				} else {
					cargoType = selection.get('cgTpCd');
				}
				
				MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', cargoType);
				return;
			}
			
			if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_LQN){
//				if(selection.get('lorryNo') != null && selection.get('lorryNo') != ''){
//					MessageUtil.warning('warning_msg', 'cargomanualctl_warehouse_check_import_msg');
//					return;
//				}else{
//				}
				var searchParams = selection.clone();
				searchParams.set('shftDt', refs.ctlCargoManualCtlShiftDt.getValue());
				searchParams.set('shftId', refs.ctlCargoManualCtlShiftNo.getValue());
				searchParams.set('shftNm', refs.ctlCargoManualCtlShiftNo.getRawValue());
				searchParams.set('caTyCd', me.caTyCd);
				
				searchParams.set('wbTransactionNo', searchParams.get('wbTransactionNo'));
				
				searchParams.commit();
				
				me.getView().detailViewAlias = 'app-whcheckimport';
				me.openDetailPopup(searchParams, title);
			}else{
				var searchParams = selection.clone();
				searchParams.set('shftDt', refs.ctlCargoManualCtlShiftDt.getValue());
				searchParams.set('shftId', refs.ctlCargoManualCtlShiftNo.getValue());
				searchParams.set('shftNm', refs.ctlCargoManualCtlShiftNo.getRawValue());
				searchParams.set('caTyCd', me.caTyCd);
				
				searchParams.set('lorryNo', searchParams.get('lorryNo'));
				searchParams.set('wbTransactionNo', searchParams.get('wbTransactionNo'));
				searchParams.set('pkgNo', searchParams.get('pkgNo'));
				
				searchParams.commit();
				
				me.getView().detailViewAlias = 'app-whcheckimport';
				me.openDetailPopup(searchParams, title);
			}
		}
		else {
			MessageUtil.warning('warning_msg', 'cargomanualctl_warehouse_check_import_msg');
			return;
		}
	},

	onChangeYardTruck: function(ctl, newVal, oldVal, eOpts ){
		
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var mode = refs.refCargoManualSearchMode.getValue();

		searchParm.set('lorryNo','');
		searchParm.set('sdoNo','');
		me.gateObject =  new Object();
		
		if(newVal){
			//Remove all BL and SN combo
			refs.ctlCargoManualCtlBookingNo.setValue('');
			refs.ctlCargoManualCtlSn.setValue('');
			refs.ctlCargoManualCtlGr.setValue('');

			refs.ctlCargoManualCtlMasterBL.setValue('');
			refs.ctlCargoManualCtlBl.setValue('');
			refs.ctlCargoManualCtlGp.setValue('');
		}

		//BookingNumber/SN
		refs.ctlCargoManualCtlBookingNo.setDisabled(newVal);
		refs.ctlCargoManualCtlSn.setDisabled(newVal);
		refs.ctlCargoManualCtlGr.setDisabled(newVal);
		refs.ctlCargoManualCtlGrButton.setDisabled(newVal);

		//MasterBL/BL
		refs.ctlCargoManualCtlMasterBL.setDisabled(newVal);
		refs.ctlCargoManualCtlBl.setDisabled(newVal);
		refs.ctlCargoManualCtlGp.setDisabled(newVal);
		refs.ctlCargoManualCtlGpButton.setDisabled(newVal);
		me.onChangeSearchCondition();
	},
	
	onBargeOperationChk: function(ctl, newVal, oldVal, eOpts ){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var mode = refs.refCargoManualSearchMode.getValue();

		if(newVal){
			//Remove all BL and SN combo
			refs.ctlCargoManualCtlBookingNo.setValue('');
			refs.ctlCargoManualCtlSn.setValue('');
			refs.ctlCargoManualCtlGr.setValue('');

			refs.ctlCargoManualCtlMasterBL.setValue('');
			refs.ctlCargoManualCtlBl.setValue('');
			refs.ctlCargoManualCtlGp.setValue('');
		}
		
		me.onChangeSearchCondition();
	},

	onChangeSearchCondition: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refCargoManualCtlTabExportGrid');
		grid.getStore().removeAll();
		var grid2 = me.lookupReference('refCargoManualCtlTabImportGrid');
		grid2.getStore().removeAll();
		
	},
	
	onOpenTruckPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var theSearch =  me.getViewModel().get('theSearch');
		var popupAlias = '';
		var title = '';
		
		if(StringUtil.isNullorEmpty( theSearch.get('vslCallId'))){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Vsl Call Id');
			return;
		}
		
		if(theSearch.get('truckType') === 'I'){
			popupAlias = 'popup-apronyardtruckpopup';
			title = 'Internal Truck List (at Apron)';
		}
		else {
			popupAlias = 'popup-gateintruckpopup';
			title = 'In-gate Truck List';
		}
		
		var params = {
				title: title,
				vslCallId: theSearch.get('vslCallId'),
				lorryNo: theSearch.get('lorryNo'),
				blNo: theSearch.get('blNo'),
				shipgNoteNo: theSearch.get('shipgNoteNo'),
				isOpeChk: 'Y'
			};
		
	    
	    ViewUtil.openCodePopup(me, popupAlias,  'txtTruckNo', params);
	      
	},
	
	onChangeTruckNo: function(control){
		var me = this;
		var refs = me.getReferences();
		control.setValue(control.getValue().toUpperCase());
		var theSearch =  me.getViewModel().get('theSearch');
		var store = '';
		var params = {
				vslCallId: theSearch.get('vslCallId'),
				lorryNo: control.getValue(),
				blNo: theSearch.get('blNo'),
				shipgNoteNo: theSearch.get('shipgNoteNo'),
				searchType: 'truckchange'
			};
		
		if(theSearch.get('truckType') === 'I'){
			store = me.getStore('apronYardTruckPopup');
		}
		else {
			store = me.getStore('gateInTruckPopup');
		}
		
		if(!StringUtil.isNullorEmpty(store)){
			store.load({
				params: params, 
				callback: function(records, operation, success) {
					if(records.length > 0) {
						if(theSearch.get('truckType') === 'I'){
							me.gateObject = new Object();
						}
						else{
							me.gateObject = records[0].data;
						}
					}
					else {
						control.setValue();
					}
				}
			});
		}
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Hidden SN, BL Button
	setHiddenSnBlButton: function(visible){
		var me = this;
    	var refs = me.getReferences();
		refs.ctlSnContainer.setHidden(!visible);
		refs.ctlBlContainer.setHidden(visible);
	},
	
	// Clear State
	clearState:function(viewAlias){
		var me = this;
		var provider = Ext.state.Manager.getProvider();
		
		stateId = me.getPopupStateId(viewAlias);
		provider.clear(stateId);
	},
	
	// Work Button Basic Mandatory
	checkWorkButtonMandatory:function(){
		var me = this;
		var refs = me.getReferences();
		var shiftDate = refs.ctlCargoManualCtlShiftDt.getValue();
		var shiftNo = refs.ctlCargoManualCtlShiftNo.getValue();
		
		if(StringUtil.isNullorEmpty(shiftDate)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Shift Date');
			refs.ctlCargoManualCtlShiftDt.focus();
			return false;
		}
		
		if(StringUtil.isNullorEmpty(shiftNo)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Shift No');
			refs.ctlCargoManualCtlShiftNo.focus();
			return false;
		}
		
		return true;
	},
	
	// Convert BL List
	convertBlList:function(blList){
		if(blList){
			blList.forEach(function(record){
				record['blno'] = record.blNo;
			});
		}
	},
	
	// Popup Data
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		//var store = me.getStore('cargoManualCtlSnBl');
		var snStore = me.getStore('cargoManualCtlForSnCombo');
		var blStore = me.getStore('cargoManualCtlForBlCombo');

		var bkNoStore = me.getStore('cargoManualCtlForBookingNoCombo');
		var masterBlStore = me.getStore('cargoManualCtlForMasterBlCombo');

		me.onChangeSearchCondition();
		
		if(xtype ==='popup-lorrylistpopup'){
			me.onChangeSearchCondition();
			if(returnValue) {
				if(!refs.ctlCargoManualTruckType.checked){
					me.gateObject = returnValue.item.data;
				}
			}
			return
			
		}
		
		if(xtype ==='popup-gateintruckpopup'){
			me.onChangeSearchCondition();
			if(returnValue) {
				if(!refs.ctlCargoManualTruckType.checked){
					me.gateObject = returnValue.item.data;
				}
			}
			return
			
		}

		if(targetControl === 'txtTruckNo'){
			if(returnValue) {
				var theSearch =  me.getViewModel().get('theSearch');	
				theSearch.set('lorryNo',returnValue.code);

				if(returnValue.item && returnValue.item.lorryNo) {
					theSearch.set('lorryNo',returnValue.item.lorryNo)
				}
			}
		}

		if(targetControl === 'ctlCargoManualCtlJpvcfield'){ // JPVC Popup
			refs.ctlCargoManualCtlSn.setValue('');
			refs.ctlCargoManualCtlBl.setValue('');
			refs.ctlVesselName.setValue('');
			var theSearch =  me.getViewModel().get('theSearch');
			
			if(returnValue){
				refs.ctlVesselName.setValue(returnValue.codeName);
				me.getViewModel().setData({theVsl:returnValue.item});
				var theVsl =  me.getViewModel().get('theVsl');
				theSearch.set('vslCallId', theVsl.get('vslCallId'));
				
				snStore.load({
					params: {
						vslCallId : theVsl.get('vslCallId')
					}
				});

				blStore.load({
					params: {
						vslCallId : theVsl.get('vslCallId')
					}
				});
				
				bkNoStore.load({
					params: {
						vslCallId : theVsl.get('vslCallId')
					}
				});
				
				masterBlStore.load({
					params: {
						vslCallId : theVsl.get('vslCallId')
					}
				});
			} else {
				me.getViewModel().setData({theVsl:null});
				refs.ctlCargoManualCtlGr.setValue('');
				refs.ctlCargoManualCtlBl.setValue('');
				theSearch.set('vslCallId', '');
				snStore.removeAll();
				blStore.removeAll();
			}
			
			me.jpvcChange();
		}else if(targetControl === 'ctlHatchNo'){
			if(returnValue){
				refs.ctlCargoManualCtlImportHatchNo.setValue(returnValue.code);
			} else {
				refs.ctlCargoManualCtlImportHatchNo.setValue(returnValue.code);
			}
		}else if(targetControl === 'ctlCargoManualCtlHatchNoExportTab'){
			if(returnValue){
				refs.ctlCargoManualCtlHatchNoExportTab.setValue(returnValue.code);
			} else {
				refs.ctlCargoManualCtlHatchNoExportTab.setValue("");
			}
		}
	},
	
	// jpvcChange
	jpvcChange : function(){
		var me = this;
		var refs = me.getReferences();
		var exportStore = me.getStore('cargoManualCtlTabExport');
		var importStore = me.getStore('cargoManualCtlTabImport');
		var gatePassStore = me.getStore('cargoManualCtlTabGatePass');
		var tabPanel = refs.ctlCargoManualCtlTabPanel.getActiveTab().name;
		
		me.setShiftDtCombo();
		
		switch(tabPanel){
			case 'general':
				me.setGeneralTabInitialize(null);
				break;
			case 'export':
				exportStore.removeAll();
				exportStore.commitChanges();
				break;
			case 'import':
				importStore.removeAll();
				importStore.commitChanges();
				break;
			case 'gatePass':
				gatePassStore.removeAll();
				gatePassStore.commitChanges();
				break;
		}
	},
	
	// Set Shift Dt combo
	setShiftDtCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.ctlCargoManualCtlJpvcfield.getValue();
		var shiftDtStore = me.getStore('cargoManualCtlForShiftDtCombo');
		var shiftStore = me.getStore('cargoManualCtlForShiftNoCombo');

		shiftStore.removeAll();
		shiftStore.commitChanges();
		refs.ctlCargoManualCtlShiftDt.setValue(null);
		refs.ctlCargoManualCtlShiftNo.setValue(null);
		
		if(!StringUtil.isNullorEmpty(vslCallId)){
			shiftDtStore.load({
				params:{
					vslCallId : vslCallId
				}
			});
		} else {
			shiftDtStore.removeAll();
			shiftDtStore.commitChanges();
		}
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
    
	/**
	 * =========================================================================================================================
	 * General Tab START
	 */
	// General Tab
	searchGeneral:function(isIndicator){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlCargoGeneral');
		var jpvcNo = refs.ctlCargoManualCtlJpvcfield.getValue();
		var sn = refs.ctlCargoManualCtlSn.getValue();
		var bl = refs.ctlCargoManualCtlBl.getValue();
		var params = me.getSearchConditionGeneral(isIndicator);
		
		if(params == null){
			return;
		}
		store.load({
			params: params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						if(record[0].get('cargoGeneralList') != null && record[0].get('cargoGeneralList').length > 0){
							me.setGeneralTabInitialize(record[0]);
						}
					}
				}
			}
		}); 
	},
	
	getSearchConditionGeneral: function(isIndicator){
		var me = this;
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.GENERAL_STORE_NAME);
		var searchParm = me.getViewModel().get('theSearch');
		
		var jpvcNo = refs.ctlCargoManualCtlJpvcfield.getValue();
		var sn = searchParm.get('shipgNoteNo');
		var bl = searchParm.get('blNo');
		
		var params = {
			vslCallId 	: jpvcNo,
			shipgNoteNo : sn,
			blNo 		: bl,
			isIndicator	: isIndicator
		};
		return params;
	},
	
	// General Tab Initialize
	setGeneralTabInitialize: function (record) {
		var me = this;
		var totalStore = me.getStore('cargoManualCtlGeneralTabTotal');
		var remainStore = me.getStore('cargoManualCtlGeneralTabRemain');

		if (record) {
			var theGeneral = record.get('cargoGeneralList')[0];

			me.getViewModel().setData({ theGeneral: theGeneral });
			totalStore.setData(record.get('summaryList')[0]);
			remainStore.setData(record.get('summaryList')[1]);

			me.enableETCCalculationArea(theGeneral.tsptTpCd === 'CV')

		} else {
			me.getViewModel().setData({ theGeneral: null });
			totalStore.removeAll();
			totalStore.commitChanges();

			remainStore.removeAll();
			remainStore.commitChanges();
		}
	},
	
	// General Tab Chart Label Render
    onGeneralTabBottomLabelRender: function (axis, label, layoutContext) {
    	var me = this;
        return label;
    },
	    
    // General Tab Chart Axis Label Render
    onGeneralTabAxisLabelRender: function (axis, label, layoutContext) {
    	var me = this;
        var value = layoutContext.renderer(label);
        return value === 0 ? '0' : Ext.util.Format.number(value, me.NUMBER_FORMAT);
    },

    // General Tab Chart Series Label Render
    onGeneralTabSeriesLabelRender: function (value) {
    	var me = this;
        return Ext.util.Format.number(value, me.NUMBER_FORMAT);
    },


	onMasterBLBookingNoChange: function(ctl){
		var me = this;
		var refs = me.getReferences();
		var snComboStore = me.getStore('cargoManualCtlForSnCombo');
		var blComboStore = me.getStore('cargoManualCtlForBlCombo');
		var theVsl =  me.getViewModel().get('theVsl');
		
		if(ctl.reference === 'ctlCargoManualCtlBookingNo'){
			var mfDocId = ctl.getValue();
			
			snComboStore.removeAll();
			refs.ctlCargoManualCtlSn.setValue('');
			snComboStore.load({
				params:{
					vslCallId: theVsl.get('vslCallId'),
					mfDocNo: mfDocId
				}
			});
		}
		else if(ctl.reference === 'ctlCargoManualCtlMasterBL'){
			var mfDocId = ctl.getValue();
			
			blComboStore.removeAll();
			refs.ctlCargoManualCtlBl.setValue('');
			blComboStore.load({
				params:{
					vslCallId: theVsl.get('vslCallId'),
					mfDocNo: mfDocId
				}
			});
		}
		me.onChangeSearchCondition();
	},

	/**
	 * General Tab END
	 * =========================================================================================================================
	 */
    
	/**
	 * =========================================================================================================================
	 * Export Tab START
	 */
	// Export Tab
	searchExport:function(isIndicator){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchConditionExport(isIndicator);
		var store = me.getStore(me.EXPORT_STORE_NAME);
		

		if(params == null){
			MessageUtil.mandatoryFieldInValid();
			return;
		}
	
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if (record && record.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},

	onDblClickForExportTab: function(grid) {
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'updatingYardTruck'};
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if(selection == null) return;
		var searchParams = selection.clone();

//		if (searchParams.get('jobNo') != null) {
//			me.getView().detailViewAlias = 'app-updatingyardtruckindirectloadingpopup';
//			me.openDetailPopup(searchParams, title);
//			me.getViewModel().setData({theDetail:selection.data});
//		}else{
//			title = {type: 'bundle', key: 'jobMonitoringTitle'};
//			searchParams.set('workDate',	refs.ctlCargoManualCtlShiftDt.getValue());
//			searchParams.set('shiftId',	refs.ctlCargoManualCtlShiftNo.getValue());
//			if(me.LIST_TYPE == "GR"){
//				searchParams.set('cgNo', searchParams.get('cgNo'));
//			}else if(me.LIST_TYPE == "SN"){
//				searchParams.set('cgNo', searchParams.get('shipgNoteNo')); //ShipgingNote No
//			}
//			searchParams.set('docTp', me.LIST_TYPE);
//
//			me.getView().detailViewAlias = 'app-jobmonitoring';
//			me.openDetailPopup(searchParams, title);
//		}
		
		title = {type: 'bundle', key: 'jobMonitoringTitle'};
		searchParams.set('workDate',	refs.ctlCargoManualCtlShiftDt.getValue());
		searchParams.set('shiftId',	refs.ctlCargoManualCtlShiftNo.getValue());
		if(me.LIST_TYPE == "GR"){
			searchParams.set('cgNo', searchParams.get('cgNo'));
		}else if(me.LIST_TYPE == "SN"){
			searchParams.set('cgNo', searchParams.get('shipgNoteNo')); //ShipgingNote No
		}
		searchParams.set('docTp', me.LIST_TYPE);

		me.getView().detailViewAlias = 'app-jobmonitoring';
		me.openDetailPopup(searchParams, title);
		
	},
	
	onClickForExportTab: function(grid) {
		var me = this;
		var refs = me.getReferences();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if(selection == null) return;
		var searchParams = selection.clone();
		
		if(selection.data.rhdlMode == 'Y' && selection.data.catgNm != 'TransShipment'){
			refs.ctlHandlingInButton.setDisabled(true);
			refs.ctlHandlingOutButton.setDisabled(false);
		}else{
			refs.ctlHandlingInButton.setDisabled(false);
			refs.ctlHandlingOutButton.setDisabled(true);
		}
	},
	
	getSearchConditionExport: function(isIndicator){

		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.EXPORT_GRID_REF_NAME);

		var searchParm = me.getViewModel().get('theSearch');

		me.LIST_TYPE = '';
		if(searchParm.get('truckType') === 'I'){ // YardTruck => ListType is Job (WA)
			grid.setColumns(GridUtil.getGridColumns('cargoManualCtlTabExportYardTruckList'));
			me.LIST_TYPE = "JOBWA";//=> LD
		}else if(searchParm.get('lorryNo') 
					|| refs.ctlBargeOperationChk.getValue() == true){// Handling-In or Loading Direct => ListType is GR List
			grid.setColumns(GridUtil.getGridColumns('CargoManualCtlTabExport'));
			me.LIST_TYPE = "GR"; // => HI - LD
		}
		else if (!searchParm.get('lorryNo') && searchParm.get('vslCallId')){// Warehouse check => ListType is SN level
			grid.setColumns(GridUtil.getGridColumns('CargoManualTabExportSNList'));
			me.LIST_TYPE = "SN"; // => WH
		}else {
			return null;
		}

		var store = me.getStore(me.EXPORT_STORE_NAME);
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var pageNo = store.currentPage;
		
		var vslCallId = refs.ctlCargoManualCtlJpvcfield.getValue();
		var sn = searchParm.get('shipgNoteNo');
		var lorryNo = searchParm.get('lorryNo');
		var hatchNo = searchParm.get('hatchNo');
		var bl = searchParm.get('blNo');
		var cgNo = searchParm.get('cgNo');
		var truckType = searchParm.get('truckType');
		var bookingNo = searchParm.get('bookingNo');
		
		var userRefNo = searchParm.get('userRefNo');
		var pkgNo = searchParm.get('pkgNo');

		var dateCondition = me.checkFromToDate('ctlCargoManualCtlExportFromDt', 'ctlCargoManualCtlExportToDt', false);
		
		if(dateCondition == null){
			return null;
		}
		
		var params = {
				vslCallId 	: vslCallId,
				shipgNoteNo : sn,
				blNo 		: bl,
				cgNo 		: cgNo,
				isIndicator	: isIndicator,
				lorryNo		: lorryNo,
				lorryId		: lorryNo,
				hatchNo 	: hatchNo,
				listType	: me.LIST_TYPE,
				bookingNo	: bookingNo,
				pageNo		: pageNo,
				bookingNo	: bookingNo,
				sizePerPage : sizePerPage,
				sort		: grid.getSortString(),
				userRefNo	: userRefNo,
				pkgNo		: pkgNo,
				bargeCheckYn: refs.ctlBargeOperationChk.getValue() ? 'Y' : 'N'
			};
		if(dateCondition != null){
			params['startDt'] = dateCondition.fromDtString;
			params['endDt'] = dateCondition.toDtString;
		}
		return params;	
	},

	/**
	 * Export Tab END
	 * =========================================================================================================================
	 */
    
	/**
	 * =========================================================================================================================
	 * Import Tab START
	 */
	// Import Tab
	searchImport:function(isIndicator){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.IMPORT_STORE_NAME);
		var grid = me.lookupReference(me.IMPORT_GRID_REF_NAME);
		var params = me.getSearchConditionImport(isIndicator);
		var truckType = refs.ctlCargoManualTruckType.getValue();
		//var lorryNo = refs.txtTruckNo.getValue();
		if(params == null){
			return;
		}

		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if (record && record.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onDblClickForImportTab: function(grid) {
		var me = this;
		var refs = me.getReferences();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;

//		if (selection.get('jobNo') != null) {
//			var title = {type: 'bundle', key: 'updatingYardTruck'};
//			me.getView().detailViewAlias = 'app-updatingyardtruckwhcheckimportpopup';
//			me.openDetailPopup(selection, title);
//			me.getViewModel().setData({theDetail:selection.data});
//		}
//		else {
//			var title = {type: 'bundle', key: 'jobMonitoringTitle'};
//			
//			selection.set('workDate',	refs.ctlCargoManualCtlShiftDt.getValue());
//			selection.set('shiftId',	refs.ctlCargoManualCtlShiftNo.getValue());
//			
//			me.getView().detailViewAlias = 'app-jobmonitoring';
//			me.openDetailPopup(selection, title);
//		}
		
		var title = {type: 'bundle', key: 'jobMonitoringTitle'};
		
		selection.set('workDate',	refs.ctlCargoManualCtlShiftDt.getValue());
		selection.set('shiftId',	refs.ctlCargoManualCtlShiftNo.getValue());
		
		me.getView().detailViewAlias = 'app-jobmonitoring';
		me.openDetailPopup(selection, title);
		
	},

	getSearchConditionImport: function(isIndicator){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.IMPORT_STORE_NAME);
		var grid = me.lookupReference(me.IMPORT_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		
		var jpvcNo = refs.ctlCargoManualCtlJpvcfield.getValue();
		var sn = searchParm.get('shipgNoteNo');
		var bl = searchParm.get('blNo');
		var masterBL = searchParm.get('masterBL');
		var delvTpCd = searchParm.get('delvTpCd');
		
		var lorryNo = searchParm.get('lorryNo');
		var hatchNo = searchParm.get('hatchNo');
		var sdoNo = '';
		if(me.gateObject.sdoNo){
			sdoNo = me.gateObject.sdoNo;
		}
		
		
		var userRefNo = searchParm.get('userRefNo');
		var pkgNo = searchParm.get('pkgNo');

		if(searchParm.get('truckType') === 'I'){ 
			// YardTruck => ListType is Job (VA)
			me.LIST_TYPE = 'JOBVA';
			grid.setColumns(GridUtil.getGridColumns('cargoManualCtlTabImportWHcheck'));
		}
		else if (refs.ctlBargeOperationChk.getValue() == true) {
			grid.setColumns(GridUtil.getGridColumns('CargoManualCtlTabImportBargeCheck'));
			me.LIST_TYPE = 'BARGE';
		}
		else if (searchParm.get('vslCallId')){
			// discharge, Handling out => ListType is BL level
			grid.setColumns(GridUtil.getGridColumns('CargoManualCtlTabImport'));
			me.LIST_TYPE = 'BL';
		}else {
			return null;
		}
		
		var params = {
				vslCallId 	: jpvcNo,
				shipgNoteNo : sn,
				blNo 		: bl,
				masterBL 	: masterBL,
				cgNo 		: bl,
				isIndicator	: isIndicator,
				delvTpCd 	: delvTpCd,
				lorryNo 	: lorryNo,
				hatchNo 	: hatchNo,
				listType	: me.LIST_TYPE,
				pageNo		: pageNo,
				sizePerPage :sizePerPage,
				sort		:grid.getSortString(),
				userRefNo	: userRefNo,
				pkgNo		: pkgNo,
				sdoNo		: sdoNo,
				bargeCheckYn: refs.ctlBargeOperationChk.getValue() ? 'Y' : 'N'
			};

		return params;
	},
	
	// Import/Export Grid Double Click Job Monitoring
	onDblClickForJobMonitoring: function(grid) {
		var me = this;
		var refs = me.getReferences();
		
		var title = {type: 'bundle', key: 'jobMonitoringTitle'};
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		selection.set('workDate',	refs.ctlCargoManualCtlShiftDt.getValue());
		selection.set('shiftId',	refs.ctlCargoManualCtlShiftNo.getValue());
		
		me.getView().detailViewAlias = 'app-jobmonitoring';
		me.openDetailPopup(selection, title);
	},
	/**
	 * Import Tab END
	 * =========================================================================================================================
	 */
    
	/**
	 * =========================================================================================================================
	 * Gate Pass Tab START
	 */
	// Double click - Gate Pass Detail
	onDblClickForGatePassDetail : function(grid){
		var me = this;
		var me = this;
		var title = {type: 'bundle', key: 'gatePass'};
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-gatepassdetail';
		me.openDetailPopup(selection, title);
	},
	
	// Gate Pass Tab
	searchGatePass:function(isIndicator){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlTabGatePass');
		var params = me.getSearchConditionGatePass(isIndicator);
		
		if(params == null){
			return;
		}
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if (record && record.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	getSearchConditionGatePass(isIndicator){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.GATEPASS_STORE_NAME);
		var grid = me.lookupReference(me.GATEPASS_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		
		var jpvcNo = refs.ctlCargoManualCtlJpvcfield.getValue();
		var sn = searchParm.get('shipgNoteNo');
		var bl = searchParm.get('blNo');
		var gatePassNo = searchParm.get('gatePassNo');
		var issued = searchParm.get('issued');
		var dateCondition = me.checkFromToDate('ctlCargoManualCtlGatePassFromDt', 'ctlCargoManualCtlGatePassToDt', false);
		
		if(dateCondition == null){
			return null;
		}
		var params = {
				vslCallId 	: jpvcNo,
				shipgNoteNo : sn,
				blNo 		: bl,
				isIndicator	: isIndicator,
				lorryNo 	: refs.ctlCargoManualCtlGatePassLorryNo.getValue(),
				gatePassNo 	: gatePassNo,
				issued 		: issued,
				pageNo		: pageNo,
				sizePerPage :sizePerPage,
				sort		:grid.getSortString()
			};
		if(dateCondition != null){
			params['startDt'] = dateCondition.fromDtString;
			params['endDt'] = dateCondition.toDtString;
		}
		return params;
	}
	
	/**
	 * Gate Pass Tab END
	 * =========================================================================================================================
	 */
	
	
	/*
	 * ======================================= HHT TABLET =======================================
	 * */
	//HHT TABLET HANDLE EVENT:
	,
	onTblLoad: function(){
		var me = this;
		var refs = me.getReferences();
		//Load SN BL Combobox:
		var shiftComboStore = me.getStore('shiftCombo'); //('shiftCombo');
		var store = me.getStore('cargoManualCtlSnBl');
		var snStore = me.getStore('cargoManualCtlForSnCombo');
		var blStore = me.getStore('cargoManualCtlForBlCombo');
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		if(!globalVesselCallId)
			return;
		store.load({
			params : {
				opType : 'cgMst',
				vslCallId : me.getViewModel().get('globalVesselCallId')
			},
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						snStore.setData(record[0].get('snList'));
						snStore.each(function (record, index) {
							var spnNm = record.get('shipgNoteNo');
							record.set('spnNm', spnNm);
						});
						snStore.insert(0, [{shipgNoteNo: '', spnNm: 'ALL'}]);
						snStore.commitChanges();
						
						
						blStore.setData(record[0].get('blList'));
						blStore.each(function (record, index) {
							var blNm = record.get('blno');
							record.set('blNm', blNm);
						});
						blStore.insert(0, [{blno: '', blNm: 'ALL'}]);
						blStore.commitChanges();
					}
				}
			}
		});
		shiftComboStore.load({
			callback: function(record, operation, success) {
				if(success){
					me.setWorkDateShift();
				}
			}
		});
	},

	setWorkDateShift: function(){
		var me = this;
		var refs = me.getReferences();
		var workDate =  MOST.config.Token.getWorkDate();
		var workShift =  MOST.config.Token.getWorkShift();
		refs.refDtWorkDate.setValue(Ext.Date.format(workDate,'d/m/Y'));
		refs.refCbxShft.setValue(workShift);
	},
	
	QR_ACTIVE: false,
	TXT_CANCEL: 'Cancel',
	TXT_QRSCAN: 'QR Scan',
	FRAME_SIZE: 400,
	
	getCameraDevice: function (){
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		return (deviceNo == null) ? 0 : deviceNo;
	},
	
	onChangeSegmentCam: function (){
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		if(me.QR_ACTIVE){
			me.startDeivce();
		}
	},
	
	setQRButton: function (active){
		var me = this;
		var refs = me.getReferences();
		var qrBtn = refs.refBtnQRScan;
		
		if(active){
			qrBtn.setText(me.TXT_CANCEL);
		}else{
			qrBtn.setText(me.TXT_QRSCAN);
		}
		me.QR_ACTIVE = active;
	},
	
	onTblBtnBarcode: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(me.QR_ACTIVE){
			me.onStopScanning(null);
			me.setQRButton(false);
			return;
		}
		me.setQRButton(true);
		me.startDeivce();
	},

	startDeivce: function(){
		var me = this;
		var refs = me.getReferences();
		
		var deviceNo = me.getCameraDevice();
		var reader = refs.refPnlqrcoderedercomp;
		me.clearCodeValue(null);
		Html5Qrcode.getCameras().then(devices => {
			/**
			 * devices would be an array of objects of type:
			 * { id: "id", label: "label" }
			 */
			if (devices && devices.length) {
				var device = (devices[deviceNo] == null ? devices[0] : devices[deviceNo])
				var cameraId = device.id ; //devices[0].id
				// .. use this to start scanning.
				me.onstartScanning(cameraId);
			}
		}).catch(err => {
			  // handle err
		});	
	},
	
	onstartScanning: function(cameraId) {
		var me = this;
		var refs = me.getReferences();
		var lastQrCode = null;
		var html5QrCode = document.getElementById('qr-readerCMC');
		var count = 0;
        if (html5QrCode.children.length > 0) {
        	me.onStopScanning(null);
        }
        me.setHiddenScanner(false);
		html5QrCode = new Html5Qrcode(/* element id */ "qr-readerCMC");
		html5QrCode.start(
			cameraId,{
				fps: 10,    // Optional frame per seconds for qr code scanning
				qrbox: 250  // Optional if you want bounded box UI
			},
			qrCodeMessage => {
				// scanning
					// stop scan if receive same qrCodeMessages for 3 times 
				if (qrCodeMessage !== lastQrCode) {
					lastQrCode = qrCodeMessage;
					console.log(qrCodeMessage);
					if (count > 0) count = count - 1;
				} else {
					count = count + 1;
				}
				if (count >= 3) {
					//set value to control
					me.onStopScanning(null);
					me.setHiddenScanner(true);
					me.setQRButton(false);
					me.setValueQRcode(qrCodeMessage);
				}
			},
			errorMessage => {
				// parse error, ignore it.
			}).catch(err => {
				// Start failed, handle it.
			});		
	},
	
	onStopScanning: function(value) {
		var me = this;
		var refs = me.getReferences();
		var html5QrCode = document.getElementById('qr-readerCMC');
		if (html5QrCode.children && html5QrCode.children.length > 0) {
			var mediaStream = html5QrCode.children[0].srcObject;
			var tracks = mediaStream.getTracks();
			tracks[0].stop();
		}
		html5QrCode = null;
		me.setHiddenScanner(true);
	},
	
	setHiddenScanner(hidden){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refPnlqrcoderedercomp;
		//panel.setHidden(hidden);
		if(hidden){
			//panel.setWidth(1);
			panel.setHeight(0);
		}else{
			panel.setWidth(me.FRAME_SIZE);
			panel.setHeight(me.FRAME_SIZE-100);
		}
	},
	
	clearCodeValue: function(ref){
		var me = this;
		var refs = me.getReferences();
		
		if(!ref){//Call by begin Scan -> clear SN and BL combo
			refs.refCbxSN.reset();
			refs.refCbxBL.reset();
			refs.refTxtGR.setValue('');
			refs.refTxtDO.setValue('');
			refs.refTxtGP.setValue('');
		}
		if(ref == 'refTxtGR' || ref == 'refCbxSN'){
			refs.refCbxBL.reset();
			refs.refTxtDO.setValue('');
			refs.refTxtGP.setValue('');
		}
		if(ref == 'refTxtDO' || ref == 'refCbxBL'){
			refs.refCbxSN.reset();
			refs.refTxtGR.setValue('');
			refs.refTxtGP.setValue('');
		}
		if(ref == 'refTxtGP'){
			refs.refCbxSN.reset();
			refs.refCbxBL.reset();
			refs.refTxtGR.setValue('');
			refs.refTxtDO.setValue('');
		}
	},
	
	setValueQRcode: function(value){
		var me = this;
		var refs = me.getReferences();
		var docTp = null;
		var crrValue = '';
		if(!value){
			return;
		}
		docTp = me.checkDocType(value);
		if(!docTp){
			return;
		}
		switch(docTp){
			case 'GR':
				crrValue = refs.refTxtGR.getValue();;
				refs.refTxtGR.setValue(value);
				refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
				if(value != crrValue){
					me.searchExportTbl(true);
				}
				break;
			case 'DO':
				crrValue = refs.refTxtDO.getValue();;
				refs.refTxtDO.setValue(value);
				refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
				if(value != crrValue){
					me.searchImportTbl(true);
				}
				break;
			case 'GP':
				crrValue = refs.refTxtGP.getValue();
				refs.refTxtGP.setValue(value);
				refs.refTabCargoManualCtl.setActiveItem(refs.refPnlGatePass);
				if(value != crrValue){
					me.searchGatePassTbl();
				}
				break;
			default:
				break;
		}
	},
	
	onFocus: function(ctrl, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		if(ctrl.reference === 'refTxtGR' || ctrl.reference === 'refCbxSN'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
			me.clearCodeValue('refTxtGR')
		}else if(ctrl.reference === 'refTxtDO' || ctrl.reference === 'refCbxBL'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
			if(ctrl.reference === 'refTxtDO'){}
			me.clearCodeValue('refTxtDO')
		}else if(ctrl.reference === 'refTxtGP'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlGatePass);
			me.clearCodeValue('refTxtGP')
		}
	},
	
	onSelectDoc: function(ctrl, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		if(ctrl.reference === 'refCbxSN'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
		}else if(ctrl.reference === 'refCbxBL'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
		}
		me.clearCodeValue(ctrl.reference);
	},
	
	checkDocType: function(value){
		var me = this;
		var refs = me.getReferences();
		if(!value){
			return null;
		}
		if(value.length === 9 && value.startsWith('R')){//GR
			return 'GR'
		}
		if(value.length === 14 && value.startsWith('DO')){//DO
			return 'DO'
		}
		if(value.length === 11 && value.startsWith('P')){
			return 'GP' //GatePass
		}
		return null;
	},
	
	onTblRetrieve: function (){
		var me = this;
		var refs = me.getReferences();
		var tabPanel = refs.refTabCargoManualCtl.getActiveItem().name;

		switch(tabPanel){
			case 'cmcexport':
				me.searchExportTbl();
				break;
			case 'cmcimport':
				me.searchImportTbl();
				break;
			case 'cmcgatepass':
				me.searchGatePassTbl();
				break;
		}
	},
	
	//Auto Show Popup After Scan GR:
	showConfirmPopUpforGRScan(cgItem){
		var me = this;
		var refs = me.getReferences();
		if(cgItem.delvTpCd === 'D'){ //Direct Case
			me.showTblLoadingPopUp();
		}else if(cgItem.delvTpCd === 'I'){// Indirect case
			// Call HI or LD?
			// If (SN Reserve/ Storing) = > HI
			// Else (Stored) => LD 
			var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
			validationCodeStore.load({
				params : {
					tyCd : 'validationFinalCargo4HandlingIn',
					col1 : cgItem.vslCallId,
					col2 : cgItem.shipgNoteNo
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
							if(records[0].get('isValidated') === 'Y'){
								//SN is not final HI-> Show HI:
								//me.showTblHIPopUp();
								
							} else {
								//SN is final HI.
								//If Handled In => Loading, If Reserve => Nothing happen
								me.showTblLoadingPopUp(cgItem);
							}
						}
					}
				}
			});
		}
	},
	
	//Auto Show Popup After Scan DO:
	
	showConfirmPopUpforDOScan: function(cgItem){
		var me = this;
		var refs = me.getReferences();
		var me = this;
		var refs = me.getReferences();
		if(cgItem.delvTpCd === 'B' || cgItem.delvTpCd === 'D'||
			cgItem.statCd === 'RS' || cgItem.statCd === 'OS'){// => DS
			me.showTblDischargingPopUp();
		}else if(cgItem.statCd === 'ST' || cgItem.statCd === 'OV'){// => HO
			me.onTblHandlingOut();
		}
		
	},
	
	searchExportTbl:function(isScan){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlTabExport');
		var jpvcNo = me.getViewModel().get('globalVesselCallId');
		var sn = refs.refCbxSN.getValue();
		var cgNo = refs.refTxtGR.getValue();
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		
		//if(!jpvcNo || !(sn || cgNo)){
		if(!jpvcNo){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		var params = {
			vslCallId : jpvcNo,
			shipgNoteNo : sn,
			cgNo : cgNo,
		};

		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success && isScan){
					grid.setSelection(record[0]);
					me.showConfirmPopUpforGRScan(record[0].data);
				}
			}
		});
	},
	
	searchImportTbl:function(isScan){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlTabImport');
		var jpvcNo = me.getViewModel().get('globalVesselCallId');
		var bl = refs.refCbxBL.getValue();
		var doNo = refs.refTxtDO.getValue();
		
		//if(!jpvcNo || !(bl || doNo)){
		if(!jpvcNo){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		
		var params = {
				vslCallId : jpvcNo,
				blNo : bl,
				doNo : doNo,
			};
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success && isScan){
					var grid = me.lookupReference('refGridImportCargoManualCtlTab');
					grid.setSelection(record[0]);
					me.showConfirmPopUpforDOScan(record[0].data);
				}
			}
		});
	},
	
	searchGatePassTbl:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlTabGatePass');
		var jpvcNo = me.getViewModel().get('globalVesselCallId');
		var sn = refs.refCbxSN.getValue();
		var bl = refs.refCbxBL.getValue();
		var gatePassNo = refs.refTxtGP.getValue();
		
		/*if(!jpvcNo || !(sn || bl || gatePassNo)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC and SN or BL or GP');
			return;
		}*/
		var params = {
				vslCallId : jpvcNo,
				shipgNoteNo : sn,
				blNo : bl,
				//lorryNo : refs.ctlCargoManualCtlGatePassLorryNo.getValue(),
				gatePassNo : gatePassNo,
				//issued : refs.ctlCargoManualCtlGatePassIssued.getValue()
			};
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
				}
			}
		});
	},
	
	
	//HHT Tablet Button Handle:
	//Button Loading:
	onTblLoading: function(){ //Go to confirmLoading
		var me = this;
		me.showTblLoadingPopUp();
	},
	
	//Button Discharging:
	onTblDischarging: function(){
		var me = this;
		var refs = me.getReferences();
		me.showTblDischargingPopUp();
	},
	
	//Button HandlingIn
	onTblHandlingIn: function(){
		var me = this;
		var refs = me.getReferences();
		
		var title = 'Confirm Handling-In';
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		var searchParams = '';
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else{
			searchParams = selection.clone();
			searchParams.title = title;
			searchParams.set('shftDt', Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('wkDt', refs.refDtWorkDate.getValue());
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft.getInputValue());
			searchParams.set('selectedShft', me.getViewModel().get('globalWorkShiftInfo'));
			searchParams.commit();
			
			validationCodeStore.load({
				params : {
					tyCd : 'validationFinalCargo4HandlingIn',
					col1 : selection.get('vslCallId'),
					col2 : selection.get('shipgNoteNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
							if(records[0].get('isValidated') === 'Y'){
								ViewUtil.openHhtPopup(me, 'app-confirmhandlinginhhtpopup', 'refBtnHandlingIn', searchParams);
							} else {
								MessageUtil.warning('warning_msg', 'confirmhandlingin_final_msg');
							}
						}
					}
				}
			});
		}
	},

	onTblWHCheckExport: function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmHandlingOutTitle'};
		var grid;

		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWHE');
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		var searchParams = '';
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}

		searchParams = selection.clone();
		searchParams.title = title;
		searchParams.set('shftDt', Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
		searchParams.set('wkDt', refs.refDtWorkDate.getValue());
		searchParams.set('shftId', refs.refCbxShft.getValue());
		searchParams.set('shftNm', refs.refCbxShft.getInputValue());
		searchParams.set('selectedShft', me.getViewModel().get('globalWorkShiftInfo'));
		searchParams.commit();

		ViewUtil.openHhtPopup(me, 'app-warehousecheckforexporthht', 'refBtnHandlingIn', searchParams);
	},
	
	onTblWHCheckImport: function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmHandlingOutTitle'};
		var grid;

		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWHI'); 
		var grid = me.lookupReference('refGridImportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		var searchParams = '';
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}

		searchParams = selection.clone();
		searchParams.title = title;
		searchParams.set('shftDt', Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
		searchParams.set('wkDt', refs.refDtWorkDate.getValue());
		searchParams.set('shftId', refs.refCbxShft.getValue());
		searchParams.set('shftNm', refs.refCbxShft.getInputValue());
		searchParams.set('selectedShft', me.getViewModel().get('globalWorkShiftInfo'));
		searchParams.commit();

		ViewUtil.openHhtPopup(me, 'app-warehousecheckforimporthht', 'refBtnWHcheckImport', searchParams);
	},
	
	onTblHandlingOut: function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmHandlingOutTitle'};
		var grid;
		
		switch(refs.refTabCargoManualCtl.getActiveItem().name){
			case 'cmcexport':
				grid = me.lookupReference('refGridExportCargoManualCtlTab');
				break;
			
			case 'cmcimport':
				grid = me.lookupReference('refGridImportCargoManualCtlTab');
				break;
		}
		
		var selection = grid.getSelection();
		if(selection == null) return;
		
		if(selection.get('fnlDelvYn')=='Y'){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_handledOut_msg');
			return;
		}else {
			if(selection.get('statCd') === 'RS'){
				MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
				return;
			}
			
			if(selection.get('statCd') === 'OS'){
				MessageUtil.warning('warning_msg', 'cargomanualctl_onstoring_handling_out_msg'); // CT1210014
				return;
			}
				
			var searchParams = selection.clone();
			searchParams.set('shftDt',Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft.getInputValue());
			searchParams.title ='Confirm Handling OUT';
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.commit();
						
			ViewUtil.openHhtPopup(this, 'app-handlingOutHHT', 'refHOBtn', searchParams);
		}
	},
	
	onTblMovement: function(){
			var me = this;
			var refs = me.getReferences();
			var title = {type: 'bundle', key: 'confirmMovementTitle'};
			var grid;
			
			switch(refs.refTabCargoManualCtl.getActiveItem().name){
			case 'cmcexport':
				grid = me.lookupReference('refGridExportCargoManualCtlTab');
				break;
			
			case 'cmcimport':
				grid = me.lookupReference('refGridImportCargoManualCtlTab');
				break;
			}
			
			var selection = grid.getSelection();
			
			if(selection == null){
				MessageUtil.warning('warning_msg', 'select_list_msg');
				return;
			} else {
				if(selection.get('statCd') === 'RS'){
					MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
					return;
				}
				
				var searchParams = selection.clone();
				searchParams.set('caTyCd', me.caTyCd);
				ViewUtil.openHhtPopup(this, 'app-cgMovementPopuphht', 'refBtnMovement', searchParams);
			}
		
	},
	
	// Import/Export Grid Double Click Job Monitoring HHT
	onDblClickForJobMonitoringHHT: function(grid) {
		var me = this;
		var refs = me.getReferences();
		var selection = grid.getSelection();

		if(selection == null) return;
		selection.set('screen','app-cargoJobMonitoring');
		selection.title = 'Job Monitoring';
		selection.set('shftDt',refs.refDtWorkDate.getValue());
		
		ViewUtil.openHhtPopup(me,'app-cargoJobMonitoring', 'refCgJobHHTGrid', selection);

	},
	
	/**
	 * 
	 * =======================================
	 */		
	
	showTblLoadingPopUp(){
		var me = this;
		var refs = me.getReferences();
		
		var refs = me.getReferences();
		var title = 'Confirm Loading';
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else{
			var searchParams = selection.clone();
			searchParams.title = title;
			searchParams.set('shftDt', Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('wkDt', refs.refDtWorkDate.getValue());
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft.getInputValue());
			//searchParams.set('selectedShft', refs.refCbxShft.getSelection());
			searchParams.set('selectedShft', me.getViewModel().get('globalWorkShiftInfo'));
			//searchParams.commit();
			
			if(selection.get('spYn') === 'Y'){
				MessageUtil.warning('warning_msg', 'cargomanualctl_special_cargo_msg');
				return;
			}
		}
		//me.openCodePopup('app-confirmloadinghhtpopup', 'refTxtGroupNm', params);
		
		validationCodeStore.load({
			params : {
				tyCd : 'validationFinalCargo',
				col1 : selection.get('vslCallId'),
				col2 : selection.get('shipgNoteNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'Y'){
							//me.getView().detailViewAlias = 'app-cargoloading';
							//me.openDetailPopup(searchParams, title);
							//ViewUtil.openCodePopup(me, 'app-confirmloadinghhtpopup', 'refBtnLoading', searchParams);
							ViewUtil.openHhtPopup(me, 'app-confirmloadinghhtpopup', 'refBtnLoading', searchParams);
						} else {
							MessageUtil.warning('warning_msg', 'cargomanualctl_no_longer_loading_msg');
						}
					}
				}
			}
		});
	},
	
	showTblDischargingPopUp(){
		var me = this;
		var refs = me.getReferences();
	
		var grid = me.lookupReference('refGridImportCargoManualCtlTab');
		var selection = grid.getSelection();
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else if(selection.get('fnlDelvYn')=='Y'){
			MessageUtil.warning('warning_msg', 'confirmdischarging_final_operation_msg');
			return;
			
		} else {
			var blStore2 = me.getStore('cargoManualCtlForBlCombo');
			var searchParams = selection.clone();
			searchParams.set('shftDt',Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft._inputValue);
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.set('blStore', blStore2);
			searchParams.title ='Confirm Discharging';
			searchParams.displayOccupiedInfo = true
			
			searchParams.commit();			
			//ViewUtil.openCodePopup(this, 'app-confirmdischarginghht', 'refDischargeHHTBtn', searchParams);
			ViewUtil.openHhtPopup(this, 'app-confirmdischarginghht', 'refDischargeHHTBtn', searchParams);
		}
	},
	
	showTblHandlingInPopUp(){
		
	},
	
	/**
	 * 
	 * =======================================
	 */		
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();		
	},
	
//	onCheckJpvcRadioField: function(radioField, newValue, oldValue, eOpts) {
//		var me = this;
//		var refs = me.getReferences();
//		
// 	},
	
	onGRBLSearchHHT : function(){
		var me = this;
		var refs = me.getReferences();
		var exportStore = me.getStore('cargoManualCtlTabExport');
		var importStore = me.getStore('cargoManualCtlTabImport');
		var grblPopupGrideStore = me.getStore('grblPopupGrideStore');
		var GRBLType =refs.refGLBLToggleButton.getItems().items[0].getValue()
		var code = refs.refgrblCode.getValue();
		if(code != null){
			code =  code.toUpperCase();
		}
		if(me.getView().recvData){
			if(me.getView().recvData.vslCallId == null){
				vslCallId = 'NonCallId';
			}else{
				vslCallId = me.getView().recvData.vslCallId;
			}
		}
		if(GRBLType == 'GR'){
			exportStore.load({
				params: {
					vslCallId : vslCallId,
					cgNo : code
				},
				callback: function(records, operation, success) {
					if (success) {
						grblPopupGrideStore.removeAll();
						for(var i = 0; i < records.length ; i++ ){
							grblPopupGrideStore.insert(i, [{vslCallId : records[i].data.vslCallId ,code:records[i].data.grNo}]);
						}
					}
				}
			});
		}
		else if(GRBLType == 'BL'){
			importStore.load({
				params: {
					vslCallId : vslCallId,
					blNo : code
				},
				callback: function(records, operation, success) {
					if (success) {
						grblPopupGrideStore.removeAll();
						for(var i = 0; i < records.length ; i++ ){
							grblPopupGrideStore.insert(i, [{vslCallId : records[i].data.vslCallId ,code:records[i].data.blNo}]);
						}
					}
				}
			})
		}
	},
	
	onDblTab: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	onActivateTabHHT: function(ref){
		var me = this;
		var tab = ref.reference;
		me.setButtonByTab(tab);
	},
	
	setButtonByTab: function(tab){
		var me = this;
		var refs = me.getReferences();
		var ld = ds = hi = ho = mv = gp = true; //defaul: disable = true
		if (tab == 'refPnlExport'){
			me.caTyCd = 'EX';
			ld = hi = ho = mv = false;
		}else if(tab == 'refPnlImport'){
			me.caTyCd = 'IM';
			ds = ho = mv = false;
		}else if(tab == 'refPnlGatePass'){
			me.caTyCd = 'GP';
			gp = false;
		}
		refs.refBtnLoading.setDisabled(ld);
		refs.refBtnDischarging.setDisabled(ds);
		refs.refBtnHandlingIn.setDisabled(hi);
		refs.refBtnHandlingOut.setDisabled(ho);
		refs.refBtnMovement.setDisabled(mv);
		refs.refBtnGPass.setDisabled(gp);
	},
	
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refGRBLPopupHHTGrid');
		var selection;
		
		if(grid){
			if(Ext.isClassic){
				selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			}
			else{
				selection = grid.getSelection() == null ? null : grid.getSelection();
			}
		}
		var returnItem = {
			code : selection.data.code,
			codeName : selection.data.code,
			item : selection
		}
		
		return returnItem;
	},
	
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectGLBLHHT'){//Select from JPVC:
			window.returnValue = me.getJPVCReturnDataHHT();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getJPVCReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var grid = me.lookupReference('refGRBLPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.code,
			codeName : selection.data.code,
			item : selection
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	},
	gatePassPrintingHHT:function(detailItem,gatePassNo){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGridGatePassCargoManualCtlTab');
		var selection = grid.getSelection();
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else{
			var params = {
					title: 'Gate Pass Printing',
					vslCallId: selection.get('vslCallId'),
					CgNo: selection.get('cgNo'),
					gatePassNo: selection.get('gatePassNo'),
				};
			ViewUtil.openCodePopup(me, 'app-gatepassprintinghht', 'refBtnGPass', params);
		}
	},
	
	onOpenCommonPopup:function(args){
		var me = this;
		var refs = me.getReferences();
		if(args == 'hatchNo'){ // For Hatch Multi Select
			var params = {
				searchType:'COMM',
				searchLcd: 'MT',
				searchDivCd: 'HTC'
			};
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'ctlHatchNo', params);
		}
		if(args == 'hatchNoExportTab'){ // For Hatch Export Tab Multi Select
			var params = {
				searchType:'COMM',
				searchLcd: 'MT',
				searchDivCd: 'HTC'
			};
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'ctlCargoManualCtlHatchNoExportTab', params);
		}
	},
	//s-OPR-016: Conveyor Mode Operation
	onSelectConveyorNo: function (combobox, record, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var store = combobox.getStore();
		var conveyorNo = combobox.getValue();

		var index = store.findExact('scd', conveyorNo);

		if (index !== -1) {
			var conveyor = store.getAt(index);
			refs.refLoadingRate.setValue(conveyor.get('capa'));
			me.calculateETC();
		} else {
			refs.refLoadingRate.setValue(null);
		}
	},
	calculateETC: function () {
		var me = this;
		var refs = me.getReferences();
		var conveyor = refs.refConveyorNo.getValue();
		var startTime = refs.refStartTime.getValue();

		if (StringUtil.isNullorEmpty(conveyor) || StringUtil.isNullorEmpty(startTime)) {
			return;
		}

		var loadingRate = refs.refLoadingRate.getValue();
		var documentInfo = me.getStore('cargoManualCtlGeneralTabTotal').getAt(0);
		var sumWgt = parseFloat(documentInfo.get('sumWgt'));

		if (isNaN(loadingRate) || loadingRate <= 0 || isNaN(sumWgt)) {
			return;
		}

		var loadingTime = sumWgt / loadingRate;

		var etc = new Date(startTime);
		etc.setMinutes(etc.getMinutes() + loadingTime * 60);

		refs.refETC.setValue(etc);
	},

	enableETCCalculationArea: function(chk) {
		var me = this;
		var refs = me.getReferences(); 
		var isDisabled = !chk;

		refs.refConveyorNo.setDisabled(isDisabled);
		refs.refStartTime.setDisabled(isDisabled);
		refs.refETC.setDisabled(isDisabled);
		refs.refLoadingRate.setDisabled(isDisabled);

		if(isDisabled) {
			return;
		}

		var conveyorNoListStore = me.getStore('conveyorNoList');
		conveyorNoListStore.load({
			params:{
				searchType: 'CONVEYOR_EQ'
			},
			callback: function(records, operation, success) {
				if(success) {
				}	
			}
		})
	}

	//e-OPR-016: Conveyor Mode Operation

	/**
	 * HHT METHOD END
	 * =========================================================================================================================
	 */		
});