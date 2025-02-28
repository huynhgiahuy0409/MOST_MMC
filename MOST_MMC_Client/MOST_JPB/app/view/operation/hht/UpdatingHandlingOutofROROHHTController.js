Ext.define('MOST.view.operation.hht.UpdatingHandlingOutofROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.updatinghandlingoutofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	FORM_REF: 'refListOfWHChkImHHT',
	
	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	
	
	/**
	 * =========================================================================================================================
	 * HHT TABLET START.
	 * 
	 */
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var window = me.getView().up('window');
     	var unitStore = me.getStore('handlingOutUnitItems');
     	
     	var unitItem = me.getView().recvData;
     	var vslCallId =  unitItem.data.vslCallId;
     	var blNo =  unitItem.data.blNo;
     	var doNo =  unitItem.data.doNo;
     	
     	unitStore.load({
			params: {
				vslCallId: vslCallId,
				blNo: blNo,
				doNo: doNo,
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						
					}
				}
			}
		});
     	
     	me.getComboMasterItem(unitItem);
		me.getViewModel().setData({theListYardCheckHO:unitItem});
	},
	
	getComboMasterItem: function(record){
		var me = this;
		var refs = me.getReferences();
		var masterCombo = me.getStore('handlingOutComboItems');
		var grid = me.lookupReference('refGrdYardCheckHO');
		var unitItem = grid.getSelection();
		
		if(unitItem == null) return;
		
		var sdoNo = unitItem.get('sdoNo'); 
		
		masterCombo.load({
			params : {
				vslCallId: record.data.vslCallId,
				blNo: record.get('blNo'),
				doNo: record.get('doNo'),
				sdoNo: sdoNo
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
	
	onUpdate_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		//VALIDATE MANDATORY://VALIDATE MANDATORY:
		var validForm = refs.refListOfWHChkImHHT.validate();
		if (!validForm) {
			MessageUtil.mandatoryFieldInValid();
			me.setMaskedForm(false);
			return;
		}
		
		var unitStore = me.getStore('handlingOutUnitItems');
		var unitItem = me.getViewModel().get('theListYardCheckHO');
		if(unitItem == null) return;
		
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('statCd', 'ST');
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		unitItem.set('hoRemarks', refs.refYardCheckerHoRemark.getValue());
		
		if(refs.refTruckRdo.isChecked()){
			unitItem.set('truckNo', refs.refTruckHHT.getValue());
			unitItem.set('driverId', refs.refCboDriverWithTruck.getValue());
			unitItem.set('driverNm', refs.refYardCheckerHODriverName.getValue());
			unitItem.set('driverLicense', refs.refYCDriverLicenseNo.getValue());
			
			//Unable to do handling-out process without select Truck No
			if(refs.refTruckHHT.getValue() == null || refs.refTruckHHT.getValue() == ''){
				MessageUtil.warning('warning_msg', 'Please select Truck No');
				return;
			}
			
		}else {
			unitItem.set('truckNo', '');
			unitItem.set('driverId', refs.refDriverHHT.getValue());
			unitItem.set('driverNm', refs.refYardCheckerHODriverName.getValue());
			unitItem.set('driverLicense', refs.refYCDriverLicenseNo.getValue());
			
			//Unable to do handling-out process without select Driver
			if(refs.refDriverHHT.getValue() == null || refs.refDriverHHT.getValue() == ''){
				MessageUtil.warning('warning_msg', 'Please select Driver');
				return;
			}	
		}
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation, success) {
				unitStore.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
						if (button === 'ok') {
							me.onPopupHHTLoad();
						}
				});
			}
		});
	},
	
	setMaskedForm (value){
		var me = this;
		var ctl = me.lookupReference(me.FORM_REF);
		me.setMaskedHHT (me, ctl.reference, value);
	},
	
	onDeleteYardHHT: function(){
		var me = this;
		var refs = me.getReferences();
		
		var unitStore = me.getStore('handlingOutUnitItems');
		
		var grid = me.lookupReference('refGrdYardCheckHO');
		var unitItem = grid.getSelection();
		if(unitItem == null) return;
		
		unitItem.set('statCd', 'ST');
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation, success) {
				if(success){
					unitStore.commitChanges();
					MessageUtil.saveSuccess();
				}
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onTblRetrieve();
						}
				});
			}
		});
		
	},
	
	onTblRetrieve: function (){
		var me = this;
		var refs = me.getReferences();
	
		me.onPopupHHTLoad();
		
		//refs.refCboBrand.setValue('');
		//refs.refBlNo.setValue('');
		//refs.refHOTxtUnitNo.setValue('');
		//refs.refTxtLDTime.setValue('');
		//refs.refYardCheckerLocId.setValue('');
		//refs.refTxtYardOutDate.setValue('');
	},
	
	getDoItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var doStore = me.getStore('doItems');
		
		if(record){
			doStore.load({
				params : {
					vslCallId: record.get('vslCallId'),
					blNo: record.get('blNo'),
					doNo: record.get('doNo'),
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
						}
					}
				}
			});
		}
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
			refs.refCboDriverWithTruck.setValue('');
		}
		
		if(masterItem.data.driverItems){
			driverCombo.setData(masterItem.data.driverItems);
			driverCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
			refs.refDriverHHT.setValue('');
		}
		
		if(masterItem.data.truckItems){
			truckCombo.setData(masterItem.data.truckItems);
			truckCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
			refs.refTruckHHT.setValue('');
		}
		
	},
	
	onChangeDriverHHTGroup: function(radioField,newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var sdoNo = refs.refCboSubDeliveryOrder.getValue();
		
		 if(radioField.getValue() == 'driver' && newValue){
			refs.refDriverHHT.setHidden(false);
			refs.refTruckHHT.setHidden(true);
			refs.refCboDriverWithTruck.setHidden(true);
			
			refs.refYardCheckerHODriverName.clearValue();
			refs.refYCDriverLicenseNo.clearValue();
			refs.refCboDriverWithTruck.clearValue();
			refs.refTruckHHT.clearValue();
			
		}else if(radioField.getValue() == 'truck' && newValue){
			refs.refTruckHHT.setHidden(false);
			refs.refDriverHHT.setHidden(true);
			refs.refCboDriverWithTruck.setHidden(false);
			
			refs.refYardCheckerHODriverName.clearValue();
			refs.refYCDriverLicenseNo.clearValue();
			refs.refDriverHHT.clearValue();
			
		}
		 
		 if(!StringUtil.isNullorEmpty(sdoNo) && newValue){
				var masterCombo = me.getStore('handlingOutComboItems');
				masterCombo.load({
					params : {
						vslCallId: unitItem.data.vslCallId,
						blNo: unitItem.data.blNo,
						doNo: unitItem.data.doNo,
						sdoNo: sdoNo
					},
					
					callback: function(records, operation, success) {
						if (success) {
							if(records.length > 0){
								me.setCombo(records[0]);
							}
						}
					}
				});
			}
	},
	
	onSdoCombo_changeHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		
		if(!StringUtil.isNullorEmpty(refs.refCboDriverWithTruck.getValue())){
			refs.refYardCheckerHODriverName.setValue(refs.refCboSubDeliveryOrder.getSelection().get('driverNm'));
			refs.refYCDriverLicenseNo.setValue(refs.refCboSubDeliveryOrder.getSelection().get('driverLicense'));
		}
		
		if(!StringUtil.isNullorEmpty(refs.refDriverHHT.getValue())){
			refs.refYardCheckerHODriverName.setValue(refs.refCboSubDeliveryOrder.getSelection().get('driverNm'));
			refs.refYCDriverLicenseNo.setValue(refs.refCboSubDeliveryOrder.getSelection().get('driverLicense'));
		}
		
	},
	
	onDriverWithTruckCombo_changeHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var driverWithTruck = refs.refCboDriverWithTruck.getSelection();
		if(driverWithTruck == null) return;
		
		if(!StringUtil.isNullorEmpty(refs.refCboDriverWithTruck.getValue())){
			refs.refYardCheckerHODriverName.setValue(driverWithTruck.get('driverNm'));
			refs.refYCDriverLicenseNo.setValue(driverWithTruck.get('driverLicense'));
		}
		else {
			refs.refYardCheckerHODriverName.setValue();
			refs.refYCDriverLicenseNo.setValue();
		}
	},
	
	onDriverCombo_changeHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var driverId = refs.refDriverHHT.getSelection();
		if(driverId == null) return;
		
		if(!StringUtil.isNullorEmpty(refs.refDriverHHT.getValue())){
			refs.refYardCheckerHODriverName.setValue(driverId.get('driverNm'));
			refs.refYCDriverLicenseNo.setValue(driverId.get('driverLicense'));
		}
		else {
			refs.refYardCheckerHODriverName.setValue();
			refs.refYCDriverLicenseNo.setValue();
		}
	},
	
//	onTblUnitClick: function(){
//		var me = this;
//		var refs = me.getReferences();
//		var unitItem = me.getView().recvData;
//		
//		unitItem.set('statCd', 'ST');
//		
//		ViewUtil.openCodePopup(me, 'app-unitlisthhtpopup', 'refHOTxtUnitNo', unitItem);
//	},
	
	
	onSelectGridYardCheckHOHHT: function(){		// onHHTDblClick
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('handlingOutUnitItems');
		
		var grid = me.lookupReference('refGrdYardCheckHO');
		var unitItem = grid.getSelection();
		
		if(StringUtil.isNullorEmpty(unitItem.get('gateOutDate'))){
			me.onSetActionButton('UNIT');
		}
		else {
			me.onSetActionButton('GATEOUT');
		}
		
		
		if(!StringUtil.isNullorEmpty(unitItem.get('truckNo'))){
			refs.refTruckRdo.setChecked(true);
		}
		else {
			refs.refDriverRdo.setChecked(true);
		}
		
		me.getComboMasterItem(unitItem);
		
		//Binding
		me.getViewModel().setData({theListYardCheckHO:unitItem});
		
		refs.refCboSubDeliveryOrder.setValue(unitItem.get('sdoNo'));
	},
	
	onSetActionButton:function(strTp) {
		var me = this;
		var refs = me.getReferences();
		
		if(strTp == 'INIT'){
			refs.refBtnYardCheckUpdate.setDisabled(true);
			refs.refBtnYardCheckDelete.setDisabled(true);
			refs.refBtnSearch.setDisabled(true);	// Clear - Refresh
		}
		else if(strTp == 'DO'){
			refs.refBtnYardCheckUpdate.setDisabled(true);
			refs.refBtnYardCheckDelete.setDisabled(true);
			refs.refBtnSearch.setDisabled(false);
			
		}
		else if(strTp == 'UNIT'){
			refs.refBtnYardCheckUpdate.setDisabled(false);
			refs.refBtnYardCheckDelete.setDisabled(false);
			refs.refBtnSearch.setDisabled(false);
			
		}
		else if(strTp == 'GATEOUT'){
			refs.refBtnYardCheckUpdate.setDisabled(true);
			refs.refBtnYardCheckDelete.setDisabled(true);
			refs.refBtnSearch.setDisabled(true);
		}
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refHITxtUnitNo.setValue(returnValue.code);	// Unit No
				refs.refTxtYardOutDate.setValue(returnValue.outDate);
				refs.refYardCheckerLocId.setValue(returnValue.yardLoc);
			}
		}
		
	},
	
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});