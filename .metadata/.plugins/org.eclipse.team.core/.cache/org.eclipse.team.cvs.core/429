Ext.define('MOST.view.operation.hht.ConfirmHandlingOutOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.confirmhandlingoutofrorohhtctl',

	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	FORM_REF: 'refValidateHOROROForm',
	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	onTblLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var unitItem = me.getView().recvData;
		
		me.getViewModel().setData({theYardCheckHoHHT:unitItem});
		me.getDoItems(unitItem);
	},
	
	getComboMasterItem: function(record){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		
		var masterCombo = me.getStore('handlingOutComboItems');
		masterCombo.load({
			params : {
				vslCallId: unitItem.data.vslCallId,
				blNo: record.get('blNo'),
				doNo: record.get('doNo'),
				sdoNo: record.get('sdoNo')
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
//		var unitCombo = me.getStore('unitCombo');
		var truckCombo = me.getStore('truckCombo');
		var driverWithTruckCombo = me.getStore('driverWithTruckCombo');
		var driverCombo = me.getStore('driverCombo');
		

//		if(masterItem.data.unitItems){
//			unitCombo.setData(masterItem.data.unitItems);
//			unitCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
//			refs.ctlUnitCombo.setValue('');
//		}
//		
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
		
//		if(masterItem.data.truckItems){
//		for(var i = 0; i < masterItem.data.truckItems.length; i++){
//			if(masterItem.data.truckItems[i] != null){
//				truckCombo.insert(0, masterItem.data.truckItems[i]);
//			}
//		}
//		truckCombo.setData(masterItem.data.truckItems);
//		truckCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
//		refs.ctlTruckCombo.setValue('');
//	}
		
	},
	
	onConfirmHandlingOut_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var unitStore = me.getStore('handlingOutUnitItems');
		var unitItem = me.getViewModel().get('theYardCheckHoHHT');
		if(unitItem == null) return;
		
		//VALIDATE MANDATORY://VALIDATE MANDATORY:
//		var validForm = refs.refValidateHOROROForm.validate();
//		if (!validForm) {
//			MessageUtil.mandatoryFieldInValid();
//			me.setMaskedForm(false);
//			return;
//		}
		
		if(refs.reftxtUnitNo.getValue() == null || refs.reftxtUnitNo.getValue() == ''
				|| refs.refCboSubDeliveryOrder.getValue() == null || refs.refCboSubDeliveryOrder.getValue() == ''){
			MessageUtil.warning('warning_msg', 'You are missing required field.');
			return;
		}	
		
		var gateTicketNo = refs.refCboSubDeliveryOrder.getSelection().get('gateTicketNo');
		var gateInDate = refs.refCboSubDeliveryOrder.getSelection().get('gateInDate');
		
		//if(StringUtil.isNullorEmpty(gateInDate) && StringUtil.isNullorEmpty(gateTicketNo)) {
		//	MessageUtil.warning('Warning', 'You are missing required field.');
		//	return;
		//}
		
		unitItem.set('statCd', 'DV');
		unitItem.set('sdoNo', refs.refCboSubDeliveryOrder.getValue());
		unitItem.set('doNo', refs.refYardCheckerHoDoNo.getValue());
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('gateTicketNo', gateTicketNo);
		unitItem.set('gateInDate', gateInDate);
		unitItem.set('unitNo', refs.reftxtUnitNo.getValue());
		unitItem.set('hoRemarks', refs.refYardCheckerHORemark.getValue());

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
			unitItem.set('driverId', refs.refDriverHHT.getValue());
			unitItem.set('driverNm', refs.refYardCheckerHODriverName.getValue());
			unitItem.set('driverLicense', refs.refYCDriverLicenseNo.getValue());
			
			//Unable to do handling-out process without select Driver
			if(refs.refDriverHHT.getValue() == null || refs.refDriverHHT.getValue() == ''){
				MessageUtil.warning('warning_msg', 'Please select Driver');
				return;
			}	
		}
		
		me.setMaskedForm(true);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation, success) {
				me.saveDamage();
				unitStore.commitChanges();
				me.setMaskedForm(false);
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							window.close();
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
	
	onChangeDriverHHTGroup: function(radioField,newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var sdoNo = refs.refCboSubDeliveryOrder.getValue();
		
		 if(radioField.getValue() == 'driver' && newValue){
			refs.refDriverHHT.setHidden(false);
			refs.refTruckHHT.setHidden(true);
			refs.refCboDriverWithTruck.setHidden(true);
			
			refs.refCboDriverWithTruck.clearValue();
			refs.refTruckHHT.clearValue();
			
		}else if(radioField.getValue() == 'truck' && newValue){
			refs.refTruckHHT.setHidden(false);
			refs.refDriverHHT.setHidden(true);
			refs.refCboDriverWithTruck.setHidden(false);
			
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
	
	onDriverWithTruckCombo_changeHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		if(!StringUtil.isNullorEmpty(refs.refCboDriverWithTruck.getValue())){
			refs.refYardCheckerHODriverName.setValue(refs.refCboDriverWithTruck.getSelection().get('driverNm'));
			refs.refYCDriverLicenseNo.setValue(refs.refCboDriverWithTruck.getSelection().get('driverLicense'));
		}
		else {
			refs.refYardCheckerHODriverName.setValue();
			refs.refYCDriverLicenseNo.setValue();
		}
	},
	
	onDriverCombo_changeHandler: function (){
		var me = this;
		var refs = me.getReferences();

		if(!StringUtil.isNullorEmpty(refs.refDriverHHT.getValue())){
			refs.refYardCheckerHODriverName.setValue(refs.refDriverHHT.getSelection().get('driverNm'));
			refs.refYCDriverLicenseNo.setValue(refs.refDriverHHT.getSelection().get('driverLicense'));
		}
		else {
			refs.refYardCheckerHODriverName.setValue();
			refs.refYCDriverLicenseNo.setValue();
		}
	},
	
	onDamageHHT_clickHandler: function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var cgItem = me.getViewModel().get('theYardCheckHoHHT');
     	var unitNo = refs.reftxtUnitNo.getValue();
     	
		if(!unitNo){
			MessageUtil.warning('Warning', 'Please select UnitNo');
			return;
		}
		
		var selection = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO', {
			title : 'Damage Check',
			vslCallId : cgItem.get("vslCallId"),
			vslCd :  cgItem.get("vslCd"),
			callSeq : cgItem.get("callSeq"),
			callYear: cgItem.get("callYear"),
			searchType: 'HandlingOut',
			cgNo: cgItem.get("blNo"),
			statCd: 'ST',
			unitNo: unitNo,
			brandCd: cgItem.get("brandCd"),
			modelCd: cgItem.get("modelCd"),
		});
		
		ViewUtil.openCodePopup(me, 'app-rorodamagecheckhht', 'refBtnDamage', selection);
	},
	
	//Unit No Popup:
	onSearchUnitNo: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'reftxtUnitNo';
		var title = 'Unit list';
		var searchParams = '';
		var unitItem = me.getView().recvData;
		
		unitItem.set('statCd', 'ST');
		unitItem.set('searchType', 'HO');
		unitItem.set('title', title);
		
		searchParams = unitItem.clone();
		
		ViewUtil.openCodePopup(this, 'app-unitlisthhtpopup', targetCtl, searchParams);
	},
	
	saveDamage : function(){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore('damageStore');
		var damageStoreDtl = me.getStore('roroDamageCheckDetail');
		if(damageStore.data.length > 0){
			var insertItem = damageStore.data.items[0];
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = damageStoreDtl.getProxy().url;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('items', new Array());
			updateParm.get('items').push(insertItem.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						damageStoreDtl.commitChanges();
					}else {
						MessageUtil.warning('warning_msg', 'FAIL');
						return;
					}
				}
			});
		}
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.reftxtUnitNo.setValue(returnValue.code);
				//refs.ctlInDt.setValue(returnValue.inDate);
			}
		}
		
	},
	
	onCancelHHT: function(){
		var me = this;
     	var refs = me.getReferences();
     	var window = me.getView().up('window');
     	MessageUtil.questionModern('Confirm', 'modity_save_confirm_msg',null,
			function(button){
				if (button === 'ok') {
					window.close();
		        }else if(button === 'cancel'){
		        	return;
		        };
			}
		);	
	},
	
});