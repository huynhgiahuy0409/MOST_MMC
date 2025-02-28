Ext.define('MOST.view.operation.hht.ApronConfirmLoadingOfRORORehandlingHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.apronconfirmloadingofrororehandlinghhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
    MAIN_GRID_REF_NAME: 'refCargoGrid',
	MAIN_STORE_NAME: 'cargoItems',
	cgIndex:0,
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// When click button open popup
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var window = me.getView().up('window');
		window.setTitle('Apron - Rehandling Opertion of RORO Loading');
		var masterCombo = me.getStore('commonComboItems');
     	var unitItem = me.getView().recvData;
     	
     	masterCombo.load({
			params : {
				searchType : 'commonCombo'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						//me.setCombo(records[0]);
					}
				}
			}
		});
     	
     	me.onSetActionButton(unitItem);
		me.getViewModel().setData({theLoadingCheckHHT:unitItem});
		if(unitItem.get('delvTpCd') == 'I'){
			unitItem.set('delvTpCd', 'I');
			unitItem.set('delvTpCd', 'INDIRECT');
		}else if(unitItem.get('delvTpCd') == 'D'){
			unitItem.set('delvTpCd', 'D');
			unitItem.set('delvTpCd', 'DIRECT');
		}
		refs.ctlLoadingDtm.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
	},
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	* =========================================================================================================================
	* EVENT HANDLER START
	*/
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
		
		refs.refCnfrmLDRhChkBtn.setDisabled(false);
		refs.refBtnConfirmLoadingCheckCancel.setDisabled(false);
		
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
	onTblUnitClick: function(){
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
		unitItem.set('searchType', 'ApronLoadingofRORORehandlingHHT');
		
		ViewUtil.openCodePopup(me, 'app-findunitlistrehandlingpopuphht', targetCtl, unitItem);
	},
	
	onConfirmLoadingCheck_clickHandler: function(){
		var me = this;
     	var refs = me.getReferences();
     	var unitStore = me.getStore('unitItems');
		var unitItem = me.getViewModel().get('theLoadingCheckHHT');
		
		//VALIDATE MANDATORY://VALIDATE MANDATORY:
		var validForm = refs.refFrmCfrmLDRhRORO.validate();
		if (!validForm) {
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
		unitItem.set('action', 'LC');
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		unitItem.set('loadingTime', refs.ctlLoadingDtm.getValue());
		unitItem.set('outDate', refs.ctlOutDtm.getValue());		// Case: Out Time is not null
		unitItem.set('statCd', 'LD');
		unitItem.set('delvTpCd', me.DELVTPCD_UNIT);
		
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
		if(!StringUtil.isNullorEmpty(strValidation)){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", strValidation);
			return;
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url =  unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('items', new Array());
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			callback: function(record, operation, success) {
				if(success){
					me.saveDamage();
					unitStore.commitChanges();
					MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
							if (button === 'ok') {
								var window = me.getView().up('window');
								window.close();
							}
					});
				}else {
					MessageUtil.warning('warning_msg', 'FAIL');
					return;
				}
			}
		});
	},
	
//	onOpeSettingValidation: function(unitItem){
//		var me = this;
//		var refs = me.getReferences();
//		
//		var store = me.getStore('validationCheck');
//		store.load({
//			params : {
//				tyCd: 'RORO_OP_CHECK',
//				col1: unitItem.get('vslCallId'),
//				col2: 'RORO',
//				col3: unitItem.get('action') == 'YC' ? unitItem.get('outDate'): unitItem.get('loadingTime')
//			},
//			
//			callback: function(records, operation, success) {
//				if (success) {
//					if(records.length > 0){
//						if(records[0].get('isValidated') == 'N'){
//							MessageUtil.warning('warning_msg', 'msgCT1210016');
//							return false;
//						}
//						else {
////							if(unitItem.get('action') == 'YC'){
////								me.onYardCheckProcessing(unitItem);
////							}
////							else {
//								me.onROROLoadingCheckProcessing(unitItem);
////							}
//						}
//					}
//				}
//			}
//		});
//	},
//	
//	onROROLoadingCheckProcessing: function (unitItem){
//		var me = this;
//		var refs = me.getReferences();
//		
//		var cgGrid = me.lookupReference('refGridExportApronCheckerHHTTab');
//		var unitStore = me.getStore('unitItems');
//
//		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
//		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
//		updateParm.phantom = false;
//		updateParm.set('workingStatus', WorkingStatus.UPDATE);
//		updateParm.set('item', unitItem.data);
//		updateParm.save({
//			success : function(record, operation) {
//				me.saveDamage();
//				unitStore.commitChanges();
//				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
//					function(button){
//					if (button === 'ok') {
//						var window = me.getView().up('window');
//						window.close();
//					}
//				});
//			}
//		});
//	},
//	
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
				refs.refcboDeliveryMode.setValue(returnValue.item.data.delvTpCd);
				me.DELVTPCD_UNIT = returnValue.item.data.delvTpCd;
			}
		}
		
	},
	
	
});