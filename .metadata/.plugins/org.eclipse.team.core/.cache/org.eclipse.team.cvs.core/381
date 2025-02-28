Ext.define('MOST.view.operation.ConfirmHandlingOutOfROROController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.confirmhandlingoutofroro',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_STORE_NAME: 'cargoItems',

	CARGO_HANDLING_OUT_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/handlingOutlist',
	cgItem:null,
	doItem:null,
	norManualFlag : false,
	autoNorLocFlag : false,
	amtNorFlag : false,
	autoLocFlag : false,
	empNorLocCount : false,
	amtOverNorLoc : false,
	autoPartialFlag : false,
	cgIndex:0,
	doIndex:0,
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
		var store = me.getStore('roroItems');
		var params = me.getSearchCondition();
		var window = me.getView().up('window');
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					
					if(record != null && record.length > 0){
						
						me.setDetailInitialize(record[0]);
					}
				}
			}
		});
		window.center();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	// Detail Initialize
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var parentRef = me.getParentView().getReferences();
		
		if(masterItem.data){
			var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
			refs.startTimeConfirmHO.setValue(currentTime);
			var detailItem = new Ext.create('MOST.model.operation.CargoHandlingOut');
			detailItem.data = recvData.data;
			
			if(recvData.get('gateTxnNo')) {
				detailItem.set('lorryId', recvData.get('lorryNo'));
				detailItem.set('lorryNo', recvData.get('lorryNo'));
				detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
			}
			
			detailItem.set('sdoNo', recvData.get('sdoNo'));
			detailItem.set('cgTpCd', recvData.get('cgTpCd'));
			detailItem.set('cgTpCdNm', recvData.get('cgTpCdNm'));
			detailItem.set('qty', masterItem.get('qty'));
			detailItem.set('mt', masterItem.get('mt'));
			detailItem.set('m3', masterItem.get('m3'));
			detailItem.set('actQty', masterItem.get('actQty'));
			detailItem.set('actMt', masterItem.get('actMt'));
			detailItem.set('actM3', masterItem.get('actM3'));
			detailItem.set('balQty', masterItem.get('balQty'));
			detailItem.set('balMt', masterItem.get('balMt'));
			detailItem.set('balM3', masterItem.get('balM3'));
			detailItem.set('tsptCompCd', masterItem.get('tsptCompCd'));
			detailItem.set('mfDocId', masterItem.get('mfDocId'));
			// Mantis: 0166711
			detailItem.set('driverId', parentRef.txtDriverId.getValue());
			detailItem.set('lorryId', parentRef.txtTruckNo.getValue());
			// Mantis: 0166711
			
			// Mantis: 0167017
//			if(masterItem.get('unitNo') != null && masterItem.get('unitNo') != ''){
//				detailItem.set('loadQty', masterItem.get('balQty'));
//				detailItem.set('loadMt', masterItem.get('balMt'));
//				detailItem.set('loadM3', masterItem.get('balM3'));
//			}
			
			// detailItem.set('locId', masterItem.get('locId'));
			detailItem.set('unitNo', '');
			detailItem.set('searchUnitNo', masterItem.get('unitNo'));
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theRRDetail:detailItem});
			me.getView().recvData = detailItem;
			
			me.prevData = detailItem.clone();
			
			// cargoTypeCombo.setData(masterItem.get('cargoTypeList'));
		}
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
		
		//refs.refHandlingOutUnitGrid.selectedIndex = -1;
		refs.refHandlingOutUnitGrid.setSelection(null);
		me.onSetActionButton("DO");
	},
	
	onAdd_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var unitStore = me.getStore('handlingOutUnitItems');
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		if(!StringUtil.isNullorEmpty(refs.ctlUnitCombo.getValue())){
			var unitItem = refs.ctlUnitCombo.getSelection();
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
			unitItem.set('doNo', me.doItem.get('doNo'));
			unitItem.set('sdoNo', me.doItem.get('sdoNo'));
			unitItem.set('userId', Token.getUserId());
			
			updateParm.get('items').push(unitItem.data);
			updateParm.save({
				success : function(record, operation) {
					unitStore.commitChanges();
					MessageUtil.saveSuccess();
					
					me.onSearch();
				}
			});
		}
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
				MessageUtil.saveSuccess();
				
				me.onSearch();
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
				MessageUtil.saveSuccess();
				
				me.onSearch();
			}
		});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.controller.SearchConfirmDischargingOfRoRoParm';
		searchBizParm.serviceID = 'MOST.confirmDischargingOfRoRo.selectCargoItems'

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
     	var recvData = me.getView().recvData;
     	var cgInOutCd = 'O'; 
		var grNo = "";
		var searchType = "";

     	if(recvData.get('caTyCd') === 'IM'){
			searchType = 'O';
			searchType = "IM";
     	} else if(recvData.get('caTyCd') === 'EX'){
     		cgInOutCd = 'I';
			grNo = recvData.get('cgNo');
			searchType = "EX";
     	}
     	
    	var params = {
			vslCallId : recvData.get('vslCallId'),
			blNo : recvData.get('blNo'),
			shipgNoteNo: recvData.get('shipgNoteNo'),
			grNo : grNo,
			sdoNo: recvData.get('sdoNo'),
			cgNo : recvData.get('cgNo'),
			cgInOutCd : cgInOutCd,
			lorryId : recvData.get('lorryId'),
			cgTpCd : recvData.get('cgTpCd'),
			searchType: searchType
		};
    	
    	return params;
	},
	
	getBlComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		if(theVslInfo){
			var blCombo = me.getStore('blCombo');
			blCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							blCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
						}
					}
				}
			});
		}
	},
	
	getComboMasterItem: function(record){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var masterCombo = me.getStore('handlingOutComboItems');
		masterCombo.load({
			params : {
				vslCallId:theVslInfo.get('vslCallId'),
				blNo: record.get('blNo'),
				doNo: record.get('doNo')
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
	
	getHandlingOutUnitItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var handlingOutUnitItems = me.getStore('handlingOutUnitItems');
		handlingOutUnitItems.load({
			params : {
				vslCallId:theVslInfo.get('vslCallId'),
				blNo: record.get('blNo'),
				doNo: record.get('doNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
					}
				}
			}
		});
	},
	
	// Combo Setting
	setCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var unitCombo = me.getStore('unitCombo');
		var truckCombo = me.getStore('truckCombo');
		var driverWithTruckCombo = me.getStore('driverWithTruckCombo');
		var driverCombo = me.getStore('driverCombo');

		if(masterItem.data.unitItems){
			unitCombo.setData(masterItem.data.unitItems);
			unitCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
			refs.ctlUnitCombo.setValue('');
		}
		
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
		
//		if(masterItem.data.truckItems){
//			truckCombo.setData(masterItem.data.truckItems);
//			truckCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
//			refs.ctlTruckCombo.setValue('');
//		}
		
		if(masterItem.data.truckItems){
		for(var i = 0; i < masterItem.data.truckItems.length; i++){
			if(masterItem.data.truckItems[i] != null){
				truckCombo.insert(0, masterItem.data.truckItems[i]);
			}
		}
//		truckCombo.setData(masterItem.data.truckItems);
		truckCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
		refs.ctlTruckCombo.setValue('');
	}
		
	},
	
	getDoItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refDoGrid;
		if(record){
			var doStore = me.getStore('doItems');
			doStore.load({
				params : {
					vslCallId:record.get('vslCallId'),
					blNo:record.get('blNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
							grid.getSelectionModel().select(me.doIndex);
							me.onDoGridItemClick();
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
		var detailItem = me.getViewModel().get('theRRDetail');
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getBlComboItems();
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([],false);
				refs.ctlSearchBlNo.reset();
			}
		}else if(targetControl === 'ctlUnitNoSearchField'){
			if(returnValue){
				refs.ctlUnitNoSearchField.setValue(returnValue.code);
				refs.ctlLoadMt.setValue(returnValue.totalMT);
				refs.ctlLoadQty.setValue(returnValue.totalCnt);
				refs.ctlLoadM3.setValue(returnValue.totalCbm);
				detailItem.set('tsptTpCd', returnValue.items[0].tsptTpCd)
			}
		}else{
			var control = me.lookupReference(targetControl);
			control.setValue(returnValue.data.locId);
			
			var whItems = new Array();
			for(var i = 0; i < returnValue.data.whConfigurationMap.data.items.length; i++){
				var invLocItem = returnValue.data.whConfigurationMap.data.items[i];
				var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
					locTpCd: invLocItem.data.locTpCd,
					whId: invLocItem.data.whId,
					locId : invLocItem.data.locId,
					vslCallId : invLocItem.data.vslCallId,
					cgNo : invLocItem.data.cgNo,
					wgt: invLocItem.data.wgt,
					msrmt: invLocItem.data.msrmt,
					pkgQty: invLocItem.data.pkgQty,
					whTpCd : invLocItem.data.whTpCd,
					whTpCdNm : invLocItem.data.whwhTpCdNmId,
					spCaCoCd :''
				});
				whItems.push(handlingItem.data);
				me.whType = invLocItem.data.locTpCd;
			}
			me.prevWhItems = whItems;
		}
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	
	
	// Detail Save
	onSave:function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		var infoForm = me.getView().form;
		
		if(infoForm.isValid()){
			me.prevSaveCheck();
		}else {
			MessageUtil.mandatoryFieldInValid();
		}
	},
	
	// Prev Save Check - okSaveButton
	prevSaveCheck : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var mt = Number(refs.ctlLoadMt.getValue()).toFixed(3);
		var balanceMt = Number(refs.ctlBalMt.getValue()).toFixed(3);

		if(refs.ctlHOLorryNo.getValue() == ''  && refs.ctlDriverID.getValue() == '' ){
			MessageUtil.warning('warning_msg', 'This cargo lorry and driver is empty'); // CT1210060010
			return;
		}
		
		if(refs.ctlConfirmHandlingOutLocId.getValue() == null  || refs.ctlConfirmHandlingOutLocId.getValue() == '' ){
			MessageUtil.warning('warning_msg', 'warehousecheckexport_deAlloc_msg'); // CT1210060010
			return;
		}
		
		if(mt - balanceMt > 0){
			MessageUtil.question('info_msg', 'balValidation_msg', null,
					function(button){
						if(button == 'ok'){
							//Terminal Hold
							if(Token.getTmnlHoldChk() === 'Y') {
								me.onTerminalHoldValidation();
							} else {
								me.onPassedTerminalHoldValidation();
							}	
						}
					}
			);
		} else {
			//Terminal Hold
			if(Token.getTmnlHoldChk() === 'Y') {
				me.onTerminalHoldValidation();
			} else {
				me.onPassedTerminalHoldValidation();
			}	
		}
		
	},
	
	
	onTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('blNo'),
				col3: CodeConstants.TMNL_HOLD_CHO
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'terminal_hold_msg');
							return false;
						}
						else {
							me.onPassedTerminalHoldValidation();
						}
					}
					else {
						me.onPassedTerminalHoldValidation();
					}
				}
			}
		});
	},
	
	
	onPassedTerminalHoldValidation : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if(Token.getCustomHoldChk() === 'Y') {
			if(detailItem.get('custMode') !== me.CUST_RELEASE) {
				MessageUtil.question('info_msg', 'confirmhandlingout_clearance_msg', null, // CT1210060011 
					function(button){
						if(button == 'ok'){
							me.clearance();
						}
					}
				);
			} else {
				me.clearance();
			}
		} else {
			me.clearance();
		}
	},
	
	// getBindingXml
	getBindingXml : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if(detailItem.get('spCaCoCd') == 'S'){
			/* chkSprYn.selected = true;	 */
			if(detailItem.get('delvTpCd') == 'D'){
				detailItem.set('delvTpCd', 'D');	
			}else{
				detailItem.set('delvTpCd', 'I');
			}
			
		}else{
			detailItem.set('delvTpCd', 'I');
		}
	},
	
	
	// clearance
	clearance : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		me.getBindingXml();
		
		if(!me.amtVal()){
			return;
		}
		
//		if(me.isAutoLocation()){
//			if(!me.autoNorLocFlag){ 
//				if(me.norManualFlag){
//					MessageUtil.warning('warning_msg', 'confirmhandlingout_deallocate_automatically_msg'); // CT1210090013
//					return;
//				}
//			}
//		}else{
//			if(me.norManualFlag){
//				MessageUtil.warning('warning_msg', 'confirmhandlingout_deallocate_automatically_msg'); // CT1210090013
//				return;
//			}
//		}
		
		//OPR-013 Warehouse balance checking (keep 60 MT into WH due to payment reason)
		/*if(detailItem.get('balMt') - detailItem.get('loadMt') < CommonConstants.WH_BALANCE_MT) {
			MessageUtil.question('warning_msg', 'warehousecheckexport_whBalance_msg', CommonConstants.WH_BALANCE_MT,
					function(button){
						if (button === 'ok') {
							me.save();
						}
					}
				);
		} else {
			me.save();
		}*/
		
		//Remove the 60 MT checking logic.
		me.save();
	},
	
	// save
	save : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if((!StringUtil.isNullorEmpty(detailItem.get('blNo'))) && StringUtil.isNullorEmpty(detailItem.get('doNo'))){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_dono_not_exist_msg'); // CT1210090003
			return;
		}
		
		//Time check
		var startDate = detailItem.get('hdlOutStDt');
		var endDate = detailItem.get('hdlOutEndDt');
		var startDateFormat = Ext.Date.format(startDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(endDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(startDate != null && endDate != null){
			if(endDate < startDate){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_start_end_date_msg'); // "Start Date Should Be Less Than End Date"
				return;
			}
		}
		
		me.cudData();
	},
	
	// cudData
	cudData : function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var vslDetail = me.getViewModel().get('theVsl');
		
		var proxy = detailItem.getProxy();
		proxy.url = me.CARGO_HANDLING_OUT_PROXY_URL;

		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		var startDtStr =  Ext.Date.format(refs.startTimeConfirmHO.getValue(), 'd/m/Y H:i');
		var endDtStr = currentTime;
		detailItem.set('hdlOutStDt', startDtStr); 
		detailItem.set('hdlOutEndDt', endDtStr); 
	
		detailItem.set('autoLocFlag', me.autoLocFlag);
		detailItem.set('autoNorLocFlag', me.autoNorLocFlag);
		detailItem.set('jobCoCd', 'G');		
		
		detailItem.set('wgt', detailItem.get('loadMt'));
		detailItem.set('pkgQty', detailItem.get('loadQty'));
		detailItem.set('msrmt', detailItem.get('loadM3'));
		detailItem.set('whTpCd', 'G');
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set('packageItems', me.packageItems);
		
		detailItem.set('masterBlNo', detailItem.get('masterBL'));
		
		detailItem.set('callYear', vslDetail.get('callYear'));
		detailItem.set('callSeq', vslDetail.get('callSeq'));
		detailItem.set('vslCd', vslDetail.get('vslCd'));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_HANDLING_OUT_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(records, operation, success) {
				if (success) {
//					me.saveDimension(records);
//					me.saveDamage(records);
					
					MessageUtil.saveSuccess(); // Success Message
					detailItem.commit();
					me.onLoad();
					var parentView = me.getParentView();
					
					if(parentView.getController().onSearch){
						
						if(parentView.getController().onCallBackFromOperationScreen){
							parentView.getController().onCallBackFromOperationScreen();
						}
						
						parentView.getController().onSearch();
					}
					window.close(); 
				}
			}
		});
	},
	
	
	// amtVal
	amtVal : function(){
		var me = this;
		var detailItem;
		detailItem =  me.getViewModel().get('theRRDetail');
		var actMT=0;
		var actM3=0;
		var actQty=0;
	
		actMT = detailItem.get('loadMt');
		actQty = detailItem.get('loadQty');
		actMT = detailItem.get('loadMt');
		
		var balQty= detailItem.get('balQty');
		var balM3= detailItem.get('balM3');
		var balMT= detailItem.get('balMt');
		var isNormal =false;  
		
		
		if(!(actMT == 0 && actQty ==0)){
			if(balMT <= 0 && balQty <=0){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_wh_balance_msg'); // CT1210090010
				return false;
			}
			if( (actMT > balMT || actQty > balQty) ){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_wh_balance_msg'); // CT1210090010 
				return false;
			}
			//Validate with package items
			if(me.packageItems){
				if(actQty != me.packageItems.length){
					MessageUtil.warning('warning_msg', 'packageItemValidationMsg'); // CT1210060012
					return false;
				}
			}
		} else if (actMT > 0 && actQty <= 0){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_zero_msg'); // CT1210090011
			return false;
		} else if (actMT <= 0 && actQty > 0){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_zero_msg'); // CT1210090011 
			return false;
		}else{
			isNormal = true;
		}
		
		
		me.amtNorFlag = isNormal;
		
		if(isNormal){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_empty_msg'); // CT1210090009
			return false;
		}
		
		return true
	},
	
	
	isAutoLocation : function(){
		var me = this;
		me.autoLocFlag = false;
		me.autoNorLocFlag = false;//normal == auto location 가능성 = true ;  loc != null
		me.norManualFlag = false;
		
		if(!me.amtNorFlag){
			if(me.isAutoNorLocFlag()){	 	 			 
				me.autoLocFlag = true;
				me.autoNorLocFlag = true;
			}
		}
		
		////if autoNorLocflag or autoDmgLocFlag or autoSprLocFlag is true, isAutoLocation is true = autoLocFlag	 	 		
		if(me.autoLocFlag){
			return true
		}
		
		return false;
	},
	
	onClear:function() {
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlUnitCombo.setValue();
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
			refs.refBtnAdd.setDisabled(true);
			refs.refBtnUpdate.setDisabled(true);
			refs.refBtnDelete.setDisabled(true);
			refs.btnClear.setDisabled(true);
		}
		else if(strTp == 'DO'){
			refs.refBtnAdd.setDisabled(true);
			refs.refBtnUpdate.setDisabled(true);
			refs.refBtnDelete.setDisabled(true);
			refs.btnClear.setDisabled(false);
			
			if(me.doItem && Number(me.doItem.get('remainUnit')) > 0){
				refs.refBtnAdd.setDisabled(false);
			}
			refs.ctlUnitCombo.setReadOnly(false);
		}
		else if(strTp == 'UNIT'){
			refs.refBtnAdd.setDisabled(true);
			refs.refBtnUpdate.setDisabled(false);
			refs.refBtnDelete.setDisabled(false);
			refs.btnClear.setDisabled(false);
			
			refs.ctlUnitCombo.setReadOnly(true);
		}
		else if(strTp == 'GATEOUT'){
			refs.refBtnAdd.setDisabled(true);
			refs.refBtnUpdate.setDisabled(true);
			refs.refBtnDelete.setDisabled(true);
			refs.btnClear.setDisabled(true);
		}
	},
	
	
	// WarehouseAllocation
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');

		if(	refs.ctlLoadMt.getValue() <= 0 &&
			refs.ctlLoadM3.getValue() <= 0 &&
			refs.ctlLoadQty.getValue()<= 0){
				
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please input location amount',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			return;
		}

		selection = Ext.create('MOST.model.operation.CargoHandlingOut', {
			vslCallId: detailItem.get('vslCallId'),
			whTpCd:'G',
			blSn: detailItem.get('blNo'),
			hdlInDt: detailItem.get('hdlOutEndDt'),
			cgNo: refs.ctlBlGr.getValue(),
			grMt: refs.ctlLoadMt.getValue(),
			grM3: refs.ctlLoadM3.getValue(),
			grQty: refs.ctlLoadQty.getValue(),
			catgCd : detailItem.get('catgCd'),
			cgTpCd: detailItem.get('cgTpCd'),
			eachMt: detailItem.get('eachWgt'),
			eachM3: detailItem.get('eachVol'),
		});
		
		selection.title = 'Warehouse Allocation';
		
		me.openCodePopup('app-warehouseofgc', controlName, selection);		
	},
	
	openUnitListPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');

     	var recvData = detailItem;
     	recvData.set('searchType', 'HO');
     	recvData.set('unitNo', detailItem.get('searchUnitNo'));
     	recvData.set('jobPurpCd', 'WG');
		recvData.set('grNo', detailItem.get('cgNo'));
	    me.openCodePopup('popup-unitnoforrorolistpopup',  'ctlUnitNoSearchField' , recvData);
	},
	
	openDriversPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var params = {
			driverId: refs.ctlDriverID.getValue(),
			cgTpCd: 'RCV',
			vslCallId : detailItem.get('vslCallId'),
			blNo : detailItem.get('blNo')
		};
	    me.openCodePopup('popup-driverlistpopup',  'ctlDriverID', params);
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});