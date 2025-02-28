Ext.define('MOST.view.operation.hht.ConfirmHandlingInOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.confirmhandlinginofrorohhtctl',

	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	CARGO_HANDLING_IN_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/handlinginlistHHT',
	
	RORO_SEQ: null,
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	onTblLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var unitItem = me.getView().recvData;
		
		me.getViewModel().setData({theYardCheckHiHHT:unitItem});
		refs.ctlInDt.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
	},
	
	onConfirmHandlingIn_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('handlingInItems');
		
		//VALIDATE MANDATORY://VALIDATE MANDATORY:
		var validForm = refs.refFrmCfrmHiWhRORO.validate();
		if (!validForm) {
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
		if(StringUtil.isNullorEmpty(refs.refYardCheckerLocId.getValue())){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('WHLocId'));
			return;
		}
		
		var unitItem = me.getViewModel().get('theYardCheckHiHHT');
		unitItem.set('inDate', refs.ctlInDt.getValue());
		unitItem.set('statCd', 'ST');
		unitItem.set('delvTpCd', 'I');
		
		if(!StringUtil.isNullorEmpty(unitItem.get('correctionNo'))
				&& unitItem.get('correctionNo') != unitItem.get('unitNo')){
			unitItem.set('correctionUnitNoYN', 'Y');
		}
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		unitItem.set('roroSeq', me.RORO_SEQ);
		
		//Validation:
		var strValidation = "";
		if(StringUtil.isNullorEmpty(unitItem.get('yardLoc'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('yardLoc');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('yardLoc');
		}
		if(StringUtil.isNullorEmpty(unitItem.get('unitNo'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('unitNo');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('unitNo');
		}
		if(StringUtil.isNullorEmpty(unitItem.get('inDate'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('inDate');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('inDate');
		}
		if(!StringUtil.isNullorEmpty(strValidation)){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", strValidation);
			return;
		}
		
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_HANDLING_IN_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				me.saveDamage();
				unitStore.commitChanges();
				MessageUtil.saveSuccess();
				
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
					if (button === 'ok') {
						var window = me.getView().up('window');
						window.close();
					}
				});
			}
		});
	},
	
	onDamage_clickHandler: function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var cgItem = me.getViewModel().get('theYardCheckHiHHT');
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
			searchType: 'HandlingIn',
			cgNo: cgItem.get("shipgNoteNo"),
			statCd: 'RS',
			unitNo: unitNo,
			brandCd: cgItem.get("brandCd"),
			modelCd: cgItem.get("modelCd"),
		});
		
		ViewUtil.openCodePopup(me, 'app-rorodamagecheckhht', 'refBtnDamage', selection);
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
	

	// WarehouseAllocation
	onWarehouseAllocationHHT : function(controlName){
		var me = this;
		var refs = me.getReferences();
		
		var cgItem = me.getViewModel().get('theYardCheckHiHHT');
		if(cgItem == null) return;
		
		var title = 'Warehouse Allocation';
		var selection;
		
		selection = Ext.create('MOST.model.operation.CargoHandlingIn', {
			vslCallId: cgItem.get("vslCallId"),
			whTpCd:'G',
			cgNo: cgItem.get("shipgNoteNo"),
			yardLoc: refs.refYardCheckerLocId.getValue(),
		});
		selection.title = title;
		
		ViewUtil.openCodePopup(me, 'app-whcheckersetlocroropopuphht', controlName, selection);
	},

		
	onSearchUnitNo: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'reftxtUnitNo';
		var title = 'Unit No';
		
		var unitItem = me.getView().recvData;
		unitItem.set('statCd', 'RS');
		unitItem.set('searchType', 'YardHI' );
		unitItem.set('title', title);
		
		ViewUtil.openCodePopup(this, 'app-listofunitforhandlinginhhtpopup', targetCtl, unitItem);
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.reftxtUnitNo.setValue(returnValue.code);
				refs.refYardCheckerHIDriverId.setValue(returnValue.item.data.driverId);
				refs.refYardCheckerHIName.setValue(returnValue.item.data.driverNm);
				refs.refYardCheckerHITruckNo.setValue(returnValue.item.data.truckNo);
				//refs.refYardCheckerLocId.setValue(returnValue.item.data.yardPlanLoc);	// yardLoc
				if(returnValue.item.data.yardPlanLoc){
					refs.refYardCheckerLocId.setValue(returnValue.item.data.yardPlanLoc);
				}else {
					refs.refYardCheckerLocId.setValue('');
				}
				me.RORO_SEQ = returnValue.item.data.roroSeq;
			}
		} else if(targetControl == 'refYardCheckerLocId') {
			if(returnValue) {
				refs.refYardCheckerLocId.setValue(returnValue.locId);
			}
		}
		
	},
	
});