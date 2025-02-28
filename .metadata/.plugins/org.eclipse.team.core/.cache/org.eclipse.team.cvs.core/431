Ext.define('MOST.view.operation.hht.ConfirmHandlingOutOfRORORehandlingHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.confirmloadingofrororehandlingouthhtctl',

	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	ROROSEQ: null,
	RHDLNO: null,
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	onTblLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var unitItem = me.getView().recvData;
		
		me.getViewModel().setData({yardRhHoHHT:unitItem});
	},
	
	getComboMasterItem: function(record){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		
		
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
	
	onConfirmHandlingOut_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var unitStore = me.getStore('handlingOutUnitItems');
		var unitItem = me.getViewModel().get('yardRhHoHHT');
		if(unitItem == null) return;

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
		
		unitItem.set('statCd', 'DV');
		unitItem.set('rhdlNo', me.RHDLNO);
		unitItem.set('roroSeq', me.ROROSEQ);
		unitItem.set('hoRemarks', refs.refYardCheckerHORemark.getValue());
		unitItem.set('userId', MOST.config.Token.getUserId());
		
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
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							window.close();
						}
				});
			}
		});
	},
	
	onChangeDriverHHTGroup: function(radioField,newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
//		var sdoNo = refs.refCboSubDeliveryOrder.getValue();
		
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
		 
		 if(newValue){
			var masterCombo = me.getStore('handlingOutComboItems');
			masterCombo.load({
				params : {
					vslCallId: unitItem.data.vslCallId,
					shipgNoteNo: unitItem.data.shipgNoteNo,
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
		var driverNm = refs.refCboDriverWithTruck.getSelection();
		var driverLicense = refs.refCboDriverWithTruck.getSelection();
		
		if(!StringUtil.isNullorEmpty(refs.refCboDriverWithTruck.getValue())
				&& !StringUtil.isNullorEmpty(driverNm)
				&& !StringUtil.isNullorEmpty(driverLicense)
		){
			driverNm = refs.refCboDriverWithTruck.getSelection().get('driverNm');
			driverLicense = refs.refCboDriverWithTruck.getSelection().get('driverLicense');
			
			refs.refYardCheckerHODriverName.setValue(driverNm);
			refs.refYCDriverLicenseNo.setValue(driverLicense);
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
     	var cgItem = me.getViewModel().get('yardRhHoHHT');
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
	
	getHandlingOutUnitItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var handlingOutUnitItems = me.getStore('handlingOutUnitItems');
		handlingOutUnitItems.load({
			params : {
				vslCallId : unitItem.get('vslCallId'),
				shipgNoteNo : record.get('shipgNoteNo'),
				searchType : 'HOUNIT'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
					}
				}
			}
		});
	},
	
	onSearchUnitNo: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'reftxtUnitNo';
		var title = 'Unit No';
		
		var unitItem = me.getView().recvData;
		var handlingOutUnitItems = me.getStore('handlingOutUnitItems');
		
		unitItem.set('statCd', 'ST');
		unitItem.set('searchType', 'HOUNIT');
		unitItem.set('title', title);
		
		ViewUtil.openCodePopup(this, 'app-unitlisthhtpopup', targetCtl, unitItem);
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
				refs.refYardLoc.setValue(returnValue.item.data.yardLoc);
				me.ROROSEQ = returnValue.item.data.roroSeq;
				me.RHDLNO = returnValue.item.data.rhdlNo;
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