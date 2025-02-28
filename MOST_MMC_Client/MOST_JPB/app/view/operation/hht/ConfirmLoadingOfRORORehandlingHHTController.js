Ext.define('MOST.view.operation.hht.ConfirmLoadingOfRORORehandlingHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.confirmloadingofrororehandlinghhtctl',

	/**
	 * VARIABLE, CONSTANT START
	 * =========================================================================================================================
	 */
	CARGO_LOADING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT',
	
	
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
		window.setTitle('Yard - Confirm Rehandling Operation of RORO L/D');
		
		var unitStore = me.getStore('unitItems');
		var unitItem = me.getView().recvData;
		
     	//binding data
		refs.ctlOutDtm.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
     	me.onSetActionButton();
     	
		me.getViewModel().setData({theLoadingRehandlingHHT:unitItem});

	},
	/**
	* INITIALIZE END
	* =========================================================================================================================
	*/
	
	// Combo Setting
	setCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var dmodeCombo = me.getStore('dmodeCombo');

		dmodeCombo.setData(masterItem.data.delvModeItems);
		dmodeCombo.insert(0, [{scdNm: 'Select',scd: ''}]);
	},
	
	onSetActionButton: function (strTp, unitItem){
		var me = this;
		var refs = me.getReferences();
		
		refs.refBtnYardCheckHHTConfirm.setDisabled(false);
		
		refs.refcboDMode.setDisabled(true);
		
	},
	
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onConfirmLoadingYardCheck: function(){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('unitItems');
		
		var unitItem = me.getViewModel().get('theLoadingRehandlingHHT');
		
		unitItem.set('userId', MOST.config.Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

		unitItem.set('action', 'YC');
		unitItem.set('statCd', 'OL');
		unitItem.set('outDate',refs.ctlOutDtm.getValue());
		if(unitItem.get('delvTpCd') == 'D') {
			unitItem.set('delvTpNm', 'DIRECT');
		}else {
			unitItem.set('delvTpNm', 'INDIRECT');
		}
		
		//Validation:
		var strValidation = "";
		if(StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('yardCheckerCheckTime');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('outDate');
		}
		if(StringUtil.isNullorEmpty(unitItem.get('yardLoc'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('yardCheckerYardPosition');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('yardCheckerYardPosition');
		}
		if(!StringUtil.isNullorEmpty(strValidation)){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", strValidation);
			return;
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus',  WorkingStatus.UPDATE);
		updateParm.set('item', unitItem.data);
		updateParm.save({
			success : function(record, operation) {
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
//								me.onYardCheckProcessing(unitItem);
//						}
//					}
//				}
//			}
//		});
//	},
//	
//	onYardCheckProcessing: function (unitItem){
//		var me = this;
//		var refs = me.getReferences();
//		var unitStore = me.getStore('unitItemsList');
//		
//		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
//		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
//		updateParm.phantom = false;
//		updateParm.set('workingStatus',  WorkingStatus.UPDATE);
//		updateParm.set('item', unitItem.data);
////		updateParm.get('items').push(unitItem.data);
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
	
//	onDamageYard_clickHandler: function(){
//		var me = this;
//     	var refs = me.getReferences();
//     	var recvData = me.getView().recvData;
//     	var cgItem = me.getViewModel().get('theLoadingYardCheckHHT');
//     	var unitNo = refs.refLDTxtUnitNo.getValue();
//     	
//		if(!unitNo){
//			MessageUtil.warning('Warning', 'Please select UnitNo');
//			return;
//		}
//		
//		var selection = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO', {
//			title : 'Damage Check',
//			vslCallId : cgItem.get("vslCallId"),
//			vslCd :  cgItem.get("vslCd"),
//			callSeq : cgItem.get("callSeq"),
//			callYear: cgItem.get("callYear"),
//			searchType: 'YardCheckLoading',
//			cgNo: cgItem.get("shipgNoteNo"),
//			statCd: 'ST',
//			unitNo: unitNo,
//			delvTpCd: cgItem.get("delvTpCd"),
//			delvTpNm: cgItem.get("delvTpNm"),
//			brandCd: cgItem.get("brandCd"),
//			modelCd: cgItem.get("modelCd"),
//		});
//		
//		ViewUtil.openCodePopup(me, 'app-rorodamagecheckhht', 'btnDamageYard', selection);
//	},
//	
//	saveDamage : function(){
//		var me = this;
//		var refs = me.getReferences();
//		var damageStore = me.getStore('damageStore');
//		var damageStoreDtl = me.getStore('roroDamageCheckDetail');
//		if(damageStore.data.length > 0){
//			var insertItem = damageStore.data.items[0];
//			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
//			
//			updateParm.getProxy().url = damageStoreDtl.getProxy().url;
//			updateParm.set('workingStatus', WorkingStatus.INSERT);
//			updateParm.set('userId', MOST.config.Token.getUserId());
//			updateParm.set('items', new Array());
//			updateParm.get('items').push(insertItem.data);
//			updateParm.save({
//				callback: function(record, operation, success) {
//					if(success){
//						damageStoreDtl.commitChanges();
//					}else {
//						MessageUtil.warning('warning_msg', 'FAIL');
//						return;
//					}
//				}
//			});
//		}
//	},
	
	onTblUnitClick: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		
		if(unitItem.data.delvTpNm = 'DIRECT') {
			unitItem.set('delvTpCd', 'D');
			unitItem.set('delvTpNm', 'DIRECT');
		}else {
			unitItem.set('delvTpCd', 'I');
			unitItem.set('delvTpNm', 'INDIRECT');
		}
		unitItem.set('searchType', 'RehandlingLoadingHHT');
		unitItem.set('statCd', 'ST');
		
		ViewUtil.openCodePopup(me, 'app-findunitlistrehandlingpopuphht', 'refLDTxtUnitNo', unitItem);
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'refLDTxtUnitNo'){ 	// Add for HHT
			if(returnValue){
				refs.refLDTxtUnitNo.setValue(returnValue.code);
				refs.refCudYardLoc.setValue(returnValue.item.data.yardLoc);
				refs.refStevedoreId.setValue(returnValue.item.data.stevedoreId);
			}
		}
		
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
});