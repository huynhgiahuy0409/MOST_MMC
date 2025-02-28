Ext.define('MOST.view.operation.hht.ApronConfirmLoadingOfROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.apronconfirmloadingofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_LOADING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT',
	
	MAIN_GRID_REF_NAME: 'refDischargingGrid',
	MAIN_STORE_NAME: 'discharging',
	EXPORT_GRID_REF_NAME: 'refGridExportApronCheckerHHTTab',
	DELVTPCD_UNIT: null,
	RORO_SEQ: null,
	FORM_REF: 'refFrmCfrmLoadingRORO',
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	
	CARGO_DISCHARGING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlisthht',

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// When click button open popup
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var unitItem = me.getView().recvData;
     	var masterCombo = me.getStore('commonComboItems');
     	var window = me.getView().up('window');
     	
		refs.refcboDeliveryMode.setDisabled(true);
		
     	me.onSetActionButton(unitItem);
		me.getViewModel().setData({theLoadingCheckHHT:unitItem});
		refs.ctlLoadingDtm.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
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
	
	onSetActionButton: function (strTp, unitItem){
		var me = this;
		var refs = me.getReferences();
		
		refs.refConfirmLDChkBtn.setDisabled(false);
		refs.refCancelConfirmLDCheckBtn.setDisabled(false);
		
		refs.refcboDeliveryMode.setDisabled(true);
		
//		if(unitItem){
//			if(strTp == "DIRECT"){
//				if(unitItem.get('statCd') == 'RS'){//just for temporary CUD wihout WB application. Original it should be 'IC'
//					//ready for Loading (loading check)
//					refs.btnLoadingCheck.setDisabled(false);
//					refs.ctlLoadingDtm.setReadOnly(false);
//					
//					refs.ctlLoadingDtm.setValue(new Date());
//				}
//				else if(unitItem.get('statCd') == 'LD'){
//					//Allow Update/Delete
//					refs.btnRemove.setDisabled(false);
//				}
//			}
//			else if(strTp == "INDIRECT"){
//				if(unitItem.get('statCd') == 'ST'){
//					
//					refs.ctlOutDtm.setValue(new Date());
//				}
//				else if(unitItem.get('statCd') == 'OL'){
//					//ready for Loading (loading check)
//					refs.btnLoadingCheck.setDisabled(false);
//					refs.ctlLoadingDtm.setReadOnly(false);
//					
//					refs.ctlLoadingDtm.setValue(new Date());
//					
//					//Allow Update/Delete
//					refs.btnRemove.setDisabled(false);
//				}
//				else if(unitItem.get('statCd') == 'LD'){
//					//Allow Update/Delete
//					refs.btnRemove.setDisabled(false);
//				}
//			}
//		}
	},
	
	//Unit No Popup
	onSearchUnitNo: function () {
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refLDTxtUnitNo';
		var title = 'Unit No';
		
		var unitItem = me.getView().recvData;
		
		if(unitItem.data.delvTpNm = 'DIRECT') {
			unitItem.set('delvTpCd', 'D');
			unitItem.set('delvTpNm', 'DIRECT');
		}else {
			unitItem.set('delvTpCd', 'I');
			unitItem.set('delvTpNm', 'INDIRECT');
		}
		unitItem.set('statCd', 'OL');
		unitItem.set('searchType', 'ConfirmLoadingCheckHHT');
		unitItem.set('title', title);
		
		ViewUtil.openCodePopup(this, 'app-findunitlistpopuphht', targetCtl, unitItem);
	},
	
	onConfirmLoadingCheck_clickHandler: function(){
		var me = this;
     	var refs = me.getReferences();
		var unitStore = me.getStore('unitItemsList');

		var unitItem = me.getViewModel().get('theLoadingCheckHHT');

		//VALIDATE MANDATORY://VALIDATE MANDATORY:
//		var validForm = refs.refFrmCfrmLoadingRORO.validate();
//		if (!validForm) {
//			MessageUtil.mandatoryFieldInValid();
//			me.setMaskedForm(false);
//			return;
//		}
		
		unitItem.set('action', 'LC');
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		unitItem.set('loadingTime', refs.ctlLoadingDtm.getValue());
		unitItem.set('outDate', refs.ctlOutDtm.getValue());		// Case: Out Time is not null
		unitItem.set('statCd', 'LD');
		unitItem.set('delvTpCd', me.DELVTPCD_UNIT);
		unitItem.set('vslLocation', refs.refLVslLocation.getValue());
		unitItem.set('roroSeq', me.RORO_SEQ);
		refs.refLVslLocation.getValue();
		
		if(StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			unitItem.set('delvTpCd', 'D');
		}
		if(refs.ctlMhc.getChecked()) {
			unitItem.set('crane', 'MHC');
		}
		
		//Validation: Loading time should be greater than Yard check time
		var strValidation = "";
		if(!StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			if(!DateUtil.validateFromToDate(unitItem.get('outDate'), refs.ctlLoadingDtm.getValue())){
				MessageUtil.warning('warning_msg', 'msgCT244002', unitItem.get('outDate'));
				return;
			}
		}
		if(StringUtil.isNullorEmpty(unitItem.get('loadingTime'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('loadingCheckTime');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('loadingCheckTime');
		}
		if(StringUtil.isNullorEmpty(unitItem.get('unitNo'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('unitNo');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('unitNo');
		}
		if(!StringUtil.isNullorEmpty(strValidation)){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", strValidation);
			return;
		}
		
		//OPR Setting Validation
		//me.onOpeSettingValidation(unitItem);
		me.onROROLoadingCheckProcessing(unitItem);
	},
	
	onOpeSettingValidation: function(unitItem){
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'RORO_OP_CHECK',
				col1: unitItem.get('vslCallId'),
				col2: 'RORO',
				col3: unitItem.get('action') == 'YC' ? unitItem.get('outDate'): unitItem.get('loadingTime')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'msgCT1210016');
							return false;
						}
						else {
//							if(unitItem.get('action') == 'YC'){
//								me.onYardCheckProcessing(unitItem);
//							}
//							else {
								me.onROROLoadingCheckProcessing(unitItem);
//							}
						}
					}
				}
			}
		});
	},
	
	onROROLoadingCheckProcessing: function (unitItem){
		var me = this;
		var refs = me.getReferences();
		
		var cgGrid = me.lookupReference('refGridExportApronCheckerHHTTab');
		var unitStore = me.getStore('unitItemsList');

		me.setMaskedForm(true);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				me.saveDamage();
				unitStore.commitChanges();
				me.setMaskedForm(false);
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
	
	onDamageLoading_clickHandler: function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var cgItem = me.getViewModel().get('theLoadingCheckHHT');
     	var unitNo = refs.refLDTxtUnitNo.getValue();
     	
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
			searchType:  'ApronCheckLoading',
			cgNo: cgItem.get("shipgNoteNo"),
			statCd: 'OL',
			unitNo: unitNo,
			delvTpNm: cgItem.get("delvTpNm"),
			delvTpCd: cgItem.get("delvTpCd"),
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
	
	//button Cancel
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
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'refLDTxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refLDTxtUnitNo.setValue(returnValue.code);
				refs.ctlOutDtm.setValue(returnValue.item.data.outDate);
				me.DELVTPCD_UNIT = returnValue.item.data.delvTpCd;
				me.RORO_SEQ = returnValue.item.data.roroSeq;
			}
		}
	},
	
	
	setMaskedForm (value){
		var me = this;
		var ctl = me.lookupReference(me.FORM_REF);
		me.setMaskedHHT (me, ctl.reference, value);
	},
});