Ext.define('MOST.view.operation.hht.YardConfirmDischargingOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.yardconfirmdischargingofrorohhtctl',

	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	CARGO_DISCHARGING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlisthht',
	cgItem:null,
	currBl: '',
	prevHHTData:null,
	RORO_SEQ: null,
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	
	// When click button open popup
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
		var unitItem = me.getView().recvData;
     	
		if(!unitItem) return;
		
     	//binding data
		//unitItem.set('delvTpCd', 'I');
		refs.refYardCheckDischargingDtm.setValue(unitItem.get('dischargedDate'));
		refs.ctlHandlingInDtm.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		me.onSetActionButton(unitItem);
		me.getViewModel().setData({theYardCheckHHT:unitItem});
	},
	
	// Combo Setting
	setCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var dmodeCombo = me.getStore('dmodeCombo');

		dmodeCombo.setData(masterItem.data.delvModeItems);
		dmodeCombo.insert(0, [{scdNm: 'Select',scd: ''}]);
	},
	
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onTblConfirm: function(){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
		
		if(me.isTerminalHoldYardCheck()){
			MessageUtil.warning('warning_msg', 'terminal_hold_msg');
			return;
		};
		
		var unitItem = me.getViewModel().get('theYardCheckHHT');
		
		unitItem.set('action', 'YARD_CHECK');
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('inDate', refs.ctlHandlingInDtm.getValue());
		unitItem.set('dischargedDate', refs.refYardCheckDischargingDtm.getValue());
		unitItem.set('statCd', 'ST');
		if(me.RORO_SEQ){
			unitItem.set('roroSeq', me.RORO_SEQ);
		}
		
		//Mandantory validation
		var strValidation = "";
		if(StringUtil.isNullorEmpty(unitItem.get('unitYardLoc'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('WHLocId');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('WHLocId');
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
		if(StringUtil.isNullorEmpty(unitItem.get('roroSeq'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += 'roroSeq';
			else
				strValidation = strValidation + ", " + 'RoRoSeq';
		}
		if(!StringUtil.isNullorEmpty(strValidation)){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", strValidation);
			return;
		}
		
		if(DateUtil.validateFromToDate(unitItem.get('dischargedDate'), unitItem.get('inDate'))){
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = me.CARGO_DISCHARGING_PROXY_URL;
			updateParm.phantom = false;
			updateParm.set('workingStatus', WorkingStatus.UPDATE);
//			updateParm.set('items', new Array());
			updateParm.set('item', unitItem.data);
//			updateParm.get('items').push(unitItem.data);
			updateParm.save({
				success : function(record, operation) {
					me.saveDamage();
					unitStore.commitChanges();
					MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
						if (button === 'ok') {
							var window = me.getView().up('window');
							window.close();
						}
					});
				}
			});
		}
		else {
			MessageUtil.warning('warning_msg', 'msgCT235004');
			return;
		}
	},
	
	//Unit No Popup
	onSearchUnitNo: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'reftxtUnitNo';
		
		var title = 'Unit No';
		var selectedParams = '';
		var unitItem = me.getView().recvData;
		unitItem.set('statCd', 'OD');
		
		selectedParams = unitItem.clone();
		selectedParams.title = title;
		
		ViewUtil.openCodePopup(this, 'app-unitlisthhtpopup', targetCtl, selectedParams);
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				me.RORO_SEQ = returnValue.item.get('roroSeq');
				refs.reftxtUnitNo.setValue(returnValue.code);
				refs.refYardCheckDischargingDtm.setValue(returnValue.dischargedDate);
				refs.refcboDMode.setValue('I');
				refs.refPlannedLocId.setValue(returnValue.yardPlanLoc);
				refs.refDSLocId.setValue(returnValue.yardPlanLoc);
			}
		} else if(targetControl === 'refDSLocId') {
			refs.refDSLocId.setValue(returnValue.locId);
		}
		
	},
	
	onSetActionButton: function (strTp, unitItem){
		var me = this;
		var refs = me.getReferences();
		
		refs.refcboDMode.setDisabled(true);
		
		//didn't do operation yet
//		if(StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))
//				&& StringUtil.isNullorEmpty(unitItem.get('inDate'))
//				&& StringUtil.isNullorEmpty(unitItem.get('outDate'))){
//			refs.refBtnYardCheckHHTConfirm.setDisabled(false);
//			refs.refcboDMode.setDisabled(false);
//		}
		//On Discharging >> ready for Stack in Yard
//		else if(!StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))
//				&& StringUtil.isNullorEmpty(unitItem.get('inDate'))
//				&& StringUtil.isNullorEmpty(unitItem.get('outDate'))){
//			refs.refBtnConfirmDischargingCheckCancel.setDisabled(false);
//			
//		}
		
	},
	
	onTblDamageHHT: function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var cgItem = me.getViewModel().get('theYardCheckHHT');
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
			cgNo: cgItem.get("blNo"),
			statCd: 'OD',
			searchType: 'DSYard',
			unitNo: unitNo,
			brandCd: cgItem.get("brandCd"),
			modelCd: cgItem.get("modelCd"),
		});
		
		ViewUtil.openCodePopup(me, 'app-rorodamagecheckhht', 'refBtnDamage', selection);
	},
	
	onClear_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refGridExportYardCheckerHHTTab');
		grid.setSelection(null);
		me.getViewModel().setData({unitItem:null});
		
		refs.refYardCheckDischargingDtm.setValue();
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
		
		var cgItem = me.getViewModel().get('theYardCheckHHT');
		if(cgItem == null) return;
		
		var title = 'Warehouse Allocation';
		var selection;
		
		selection = Ext.create('MOST.model.operation.CargoHandlingIn', {
			vslCallId: cgItem.get("vslCallId"),
			yardPlanLoc: refs.refPlannedLocId.getValue(),
			unitYardLoc: refs.refDSLocId.getValue(),
			whTpCd:'G',
			cgNo: cgItem.get("blNo")
		});
		
		ViewUtil.openCodePopup(me, 'app-whcheckersetlocroropopuphht', controlName, selection);
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
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
	
	isTerminalHold: function(){
		var me = this;
		var refs = me.getReferences();
		var terminalHoldCheckStore = me.getStore('terminalHoldCheckStore');
		var flag = false;
		if(terminalHoldCheckStore.data.length > 0){
			flag = true;
		}
		
		return flag;
		
	},
	
	isTerminalHoldYardCheck: function(){
		var me = this;
		var refs = me.getReferences();
		var terminalHoldYardCheckStore = me.getStore('terminalHoldYardCheckStore');
		var flag = false;
		if(terminalHoldYardCheckStore.data.length > 0){
			flag = true;
		}
		
		return flag;
		
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
});