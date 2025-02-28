Ext.define('MOST.view.operation.hht.ApronConfirmDischargingOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.apronconfirmdischargingofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDischargingGrid',
	MAIN_STORE_NAME: 'discharging',
	EXPORT_GRID_REF_NAME: 'refGridExportApronCheckerHHTTab',
	
	EXPORT_STORE: 'apronCheckerHHTTabExport',
	IMPORT_STORE: 'apronCheckerHHTTabImport',
	
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

	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		
		unitItem.set('delvTpCd', 'I');
		
		refs.refcboDeliveryMode.setDisabled(true);
		refs.ctlDischargingDtm.setValue(unitItem.get('dischargedDate'));
		
		me.onSetActionButton(unitItem);
		me.getViewModel().setData({theDischargingCheckHHT:unitItem});
		refs.ctlDischargingDtm.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
	},
	
	// Combo Setting
	setCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var dmodeCombo = me.getStore('dmodeCombo');

		dmodeCombo.setData(masterItem.data.delvModeItems);
		dmodeCombo.insert(0, [{scdNm: 'Select',scd: ''}]);
		dmodeCombo.commitChanges();
	},
	
	getBlComboItems: function(unitItem){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blCombo');
		if(unitItem){
			blCombo.load({
				params : {
					vslCallId: unitItem.data.vslCallId
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							blCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
							refs.refCboDSBlNo.setValue('');
						}
					}
				}
			});
		}
	},
	
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onConfirmDischargingCheck_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getViewModel().get('theDischargingCheckHHT');
		
		
		//VALIDATE MANDATORY://VALIDATE MANDATORY:
		var validForm = refs.refFrmCfrmDischargingRORO.validate();
		if (!validForm) {
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
		
		unitItem.set('action', 'DISCHARGING_CHECK');
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('dischargedDate', refs.ctlDischargingDtm.getValue());
		
		if(me.RORO_SEQ){
			unitItem.set('roroSeq', me.RORO_SEQ);
		}
		if(unitItem.get('delvTpCd') == 'D'){
			//Deliveried Out
			unitItem.set('statCd', 'DO');
			unitItem.set('inDate', refs.ctlDischargingDtm.getValue());
			unitItem.set('outDate', refs.ctlDischargingDtm.getValue());
		}
		else {
			//On-Discharging
			unitItem.set('statCd', 'OD');
		}

		//if(!StringUtil.isNullorEmpty(unitItem.get('correctionUnitNo')) && 
		//		unitItem.get('correctionUnitNo') != unitItem.get('unitNo')){
		//	unitItem.set('correctionUnitNoYN', 'Y');
		//}
		
		//Mandantory validation
		var strValidation = "";
		//if(StringUtil.isNullorEmpty(unitItem.get('stevedoreId'))){
		//	if(StringUtil.isNullorEmpty(strValidation))
		//		strValidation += ViewUtil.getLabel('stevedoreId');
		//	else
		//		strValidation = strValidation + ", " + ViewUtil.getLabel('stevedoreId');
		//}
		if(StringUtil.isNullorEmpty(unitItem.get('delvTpCd'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('delvMode');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('delvMode');
		}
		if(StringUtil.isNullorEmpty(unitItem.get('unitNo'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('unitNo');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('unitNo');
		}
		if(StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('disEndDt');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('disEndDt');
		}
		if(!StringUtil.isNullorEmpty(strValidation)){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", strValidation);
			return;
		}
		
		//Operation Setting Validation
		//me.onOpeSettingValidation(unitItem);
		
		me.onRORODischarging(unitItem);
	},
	
	onRORODischarging: function (unitItem){
		var me = this;
		var refs = me.getReferences();
//		var cgGrid = me.lookupReference('refGridImportApronCheckerHHTTab');
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_DISCHARGING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus',WorkingStatus.UPDATE);
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				me.saveDamage();
				unitItem.commit();
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
	
	
	onDamageDischargeHHT_clickHandler: function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var cgItem = me.getViewModel().get('theDischargingCheckHHT');
     	var unitNo = refs.reftxtUnitNo.getValue();
     	
		if(!unitNo){
			MessageUtil.warning('Warning', 'Please select UnitNo');
			return;
		}
		
		var selection = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO', {
			title : 'Damage Check',
			searchType: 'DSApronChecker',
			vslCallId : cgItem.get("vslCallId"),
			vslCd :  cgItem.get("vslCd"),
			callSeq : cgItem.get("callSeq"),
			callYear: cgItem.get("callYear"),
			cgNo: cgItem.get("blNo"),
			statCd: 'RS',
			unitNo: unitNo,
			brandCd: cgItem.get("brandCd"),
			modelCd: cgItem.get("modelCd"),
		});
		
		ViewUtil.openCodePopup(me, 'app-rorodamagecheckhht', 'refBtnDamage', selection);
	},
	
	//HHT Tablet Button: Unit No Popup:
	onSearchUnitNo: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'reftxtUnitNo';
		var title = 'Unit No';
		
		var unitItem = me.getView().recvData;
		
		unitItem.set('statCd', 'RS');
		unitItem.set('title', title);
		
		ViewUtil.openCodePopup(this, 'app-unitlisthhtpopup', targetCtl, unitItem);
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'reftxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				me.RORO_SEQ = returnValue.item.get('roroSeq');
				refs.reftxtUnitNo.setValue(returnValue.code);
				refs.refTxtDischargingCheckLocId.setValue(returnValue.yardPlanLoc);
				refs.refcboDeliveryMode.setValue('');
				refs.refcboDeliveryMode.setValue('I');
				refs.refcboDeliveryMode.setDisabled();
			}
		}
	},
	
	onCancelHHT: function(){
		var me = this;
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
	
	onChangeBLHHT: function(ref){
		var me = this;
		var refs = me.getReferences();
		if(!me.currBl){ // ~ first onLoadHHT.
			return;
		}
		if(!ref.getValue()){
			return;
		}
		if(ref.getValue() === me.currBl){
			return;
		}
		// me.getViewModel().setData({theDetailHHT:null});
		me.onLoadHHT();
	},

	onSetActionButton: function (unitItem){
		var me = this;
		var refs = me.getReferences();
		
		refs.refConfirmDischargingChkBtn.setDisabled(true);
		refs.refCancelConfirmDischargingChkBtn.setDisabled(false);
		
		refs.refcboDeliveryMode.setDisabled(true);
		
		//didn't do operation yet
		if(StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('inDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			refs.refConfirmDischargingChkBtn.setDisabled(false);
			refs.refcboDeliveryMode.setDisabled(false);
			
//			refs.ctlDischargingDtm.setValue(new Date());
//			refs.refcboDeliveryMode.setValue('I');
//			refs.refcboDeliveryMode.setDisabled(true);
			
		}
		//On Discharging >> ready for Stack in Yard
		else if(!StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('inDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			refs.refCancelConfirmDischargingChkBtn.setDisabled(false);
			
		}
		
		//Update/delete
//		else if(StringUtil.isNullorEmpty(unitItem.get('outDate'))
//				&& unitItem.get('statCd') != 'RH'){
//			refs.refCancelConfirmDischargingChkBtn.setDisabled(false);
//		}
	},
	
	onClear_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refGridImportApronCheckerHHTTab');
		grid.setSelection(null);
		me.getViewModel().setData({unitItem:null});
		
		refs.ctlDischargingDtm.setValue();
	},

	onOpeSettingValidation: function(unitItem){
		var me = this;
		var refs = me.getReferences();
		var cgTp='';
		if(unitItem.get('cgTpCd') == 'RMA'){
			cgTp = 'RBK';
		}else{
			cgTp = 'RORO';
		}
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'RORO_OP_CHECK',
				col1: unitItem.get('vslCallId'),
				col2: cgTp,
				col3: unitItem.get('dischargedDate')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'msgCT1210016');
							return false;
						}
						else {
							me.onRORODischarging(unitItem);
						}
					}
				}
			}
		});
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
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
});