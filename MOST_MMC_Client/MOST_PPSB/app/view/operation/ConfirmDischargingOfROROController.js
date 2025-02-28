Ext.define('MOST.view.operation.ConfirmDischargingOfROROController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.confirmdischargingofroro',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoGrid',
	MAIN_STORE_NAME: 'cargoItems',
	cgItem:null,
	cgIndex:0,
	unitIndex:0,
	prevData:null,
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

		var recvData = me.getView().recvData;
		me.prevData = recvData.clone();
		var store = me.getStore('confirmDischargingforRORO');

		var params = me.getSearchCondition();
		var modeOfOprCombo = me.getStore('confirmDischargingForModeOfOprCombo');
		var deliveryCombo = me.getStore('confirmDischargingForDeliveryCombo');
		var cargoTypeCombo = me.getStore('confirmDischargingForCargoTypeCombo');
		var confirmDischargingHatchCombo = me.getStore('confirmDischargingHatchCombo');
		
		modeOfOprCombo.load();
		deliveryCombo.load();
		cargoTypeCombo.load();
		confirmDischargingHatchCombo.load();
//		me.getViewModel().setData({theRRDetail:recvData});
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.setDetailInitialize(record[0]);
						me.operationSetting();
					}
				}
			}
		});
		var infoForm = me.getView().form;
		infoForm.isValid();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onCargoGridItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		//Reset
		me.onClear_clickHandler();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		//get the Unit list base on cargo
		me.getUnitItems(selection);
		me.cgItem = selection;
		me.cgIndex = grid.store.indexOf(selection);
	},
	
	
	onDischargingCheck_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var unitStore = me.getStore('unitItems');
		
		var unitItem = me.getViewModel().get('unitItem');
		
		unitItem.set('dischargedDate', Ext.Date.format(refs.ctlDischargingDtm.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		unitItem.set('action', 'DISCHARGING_CHECK');
		if(unitItem.get('delvTpCd') == 'D'){
			//Deliveried Out
			unitItem.set('statCd', 'DO');
			unitItem.set('inDate', Ext.Date.format(refs.ctlDischargingDtm.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			unitItem.set('outDate', Ext.Date.format(refs.ctlDischargingDtm.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		}
		else {
			//On-Discharging
			unitItem.set('statCd', 'OD');
		}
		
		if(!StringUtil.isNullorEmpty(unitItem.get('correctionUnitNo'))
				&& unitItem.get('correctionUnitNo') != unitItem.get('unitNo')){
			unitItem.set('correctionUnitNoYN', 'Y');
		}
		
		unitItem.set('userId', Token.getUserId());
		
		//Mandantory validation
		var strValidation = "";
		if(StringUtil.isNullorEmpty(unitItem.get('stevedoreId'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('stevedoreId');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('stevedoreId');
		}
		if(StringUtil.isNullorEmpty(unitItem.get('delvTpCd'))){
			if(StringUtil.isNullorEmpty(strValidation))
				strValidation += ViewUtil.getLabel('delvMode');
			else
				strValidation = strValidation + ", " + ViewUtil.getLabel('delvMode');
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
		
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var unitStore = me.getStore('unitItems');
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
						if (button === 'ok') {
					       me.onSearch();
						}
				});
			}
		});
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

     	//Auto Detect shift:
		var crrDate = Ext.Date.format(new Date(), 'd/m/Y H:i');

    	var params = {
			vslCallId : recvData.get('vslCallId'),
			cgTpCd : recvData.get('cgTpCd'),
			startDtStr: crrDate,
			blNo : recvData.get('blNo'),
			searchType : 'BL',
			gateTxnNo: recvData.get('gateTxnNo'),
			sdoNo: recvData.get('sdoNo')
//			,hhtFlags : '1STLD'
		};
    	
    	return params;   	
	},
	
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var theSearch = me.getViewModel().get('theSearch');
		
		if(masterItem != null){
			var detailItem = Ext.create('MOST.model.operation.ConfirmDischargingOfRORO');
			DateUtil.convertDateToLong(masterItem.data, ['startDt', 'endDt']);
			
//			masterItem.get('items')[0].lorryId = '';
			detailItem.data = recvData.data;

//			detailItem.set('bargeCheck', recvData.get('bargeCheck'));
			detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
			detailItem.set('cgNo', detailItem.get('blNo'));
			detailItem.set('balQty', masterItem.get('balQty'));
			detailItem.set('balMt', masterItem.get('balMt'));
			detailItem.set('balM3', masterItem.get('balM3'));
			detailItem.set('tsptr', masterItem.get('tsptr'));
			detailItem.set('tsptTpCd', masterItem.get('tsptTpCd'));
			detailItem.set('dQty', masterItem.get('dQty'));
			detailItem.set('dMt', masterItem.get('dMt'));
			detailItem.set('dM3', masterItem.get('dM3'));
			
			detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
//			detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
			
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theRRDetail:detailItem});
			me.getView().recvData = detailItem;

			if(masterItem.get('delvTpCd') == 'I'){
				refs.ctlIndirectOperation.setValue(true);
				refs.refCtnLorryOperationVA.setDisabled(false);
				refs.refCtnLorryOperationVG.setDisabled(true);
				detailItem.set('dqty', 0);
				detailItem.set('dmt', 0);
				detailItem.set('dm3', 0);
				
				detailItem.set('aqty', 0);
				detailItem.set('amt', 0);
				detailItem.set('am3', 0);
				
				//Barge
//				refs.refCtnBargeOperationVB.setDisabled(true);
//				refs.refCtnBargeOperationAB.setDisabled(true);
				
			}else{
				if(detailItem.get('doNo') == null ||  detailItem.get('doNo') == ''){
					refs.ctlIndirectOperation.setValue(true);
				}	
				if(theSearch.get('driverId') != null && theSearch.get('driverId') != ''){
					refs.ctlDriverID.setValue(theSearch.get('driverId'));
				}
				if(!StringUtil.isNullorEmpty(detailItem.get('sdoNo'))) {
					if(detailItem.get('tsptTpCd') == CodeConstants.CGMST_TSPT_TP_SE){
						refs.ctlDirectOperation.setValue(false);
						
						refs.refCtnLorryOperationVG.setDisabled(true);
						refs.refCtnLorryOperationVA.setDisabled(false);
					}else{
						refs.ctlDirectOperation.setValue(true);
						refs.refCtnLorryOperationVG.setDisabled(false);
						refs.refCtnLorryOperationVA.setDisabled(false);
					}
				}else {
					refs.ctlDirectOperation.setValue(true);
					refs.refCtnLorryOperationVG.setDisabled(false);
					refs.refCtnLorryOperationVA.setDisabled(false);
				}		
			}
		}
	},
	
	operationSetting : function(){
		var me = this;
		var refs = me.getReferences();
     	var recvData = me.prevData;
     	var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theRRDetail');
		
		theDetail.set('startDt' ,new Date());
		theDetail.set('externalLorryNo', recvData.get('lorryNo'));
		
		if(recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_RCV){
			MessageUtil.warning('warning_msg', 'ConfirmDischarging_can_not_operation_msg', recvData.get('cgTpCd'));
			var window = me.getView().up('window');
			window.close();
		}
	},
	
	onSetActionButton: function (unitItem){
		var me = this;
		var refs = me.getReferences();
		
		refs.btnDischargingCheck.setDisabled(true);
		refs.btnYardCheck.setDisabled(true);
		refs.refBtnDelete.setDisabled(true);
		
		refs.ctlNewCarYn.setDisabled(true);
		refs.ctlDelvMode.setDisabled(true);
		refs.txtStevedoreId.setEditable(false);
		refs.txtDischargingRmk.setEditable(false);
		refs.txtUnitCorrectionNo.setEditable(false)
		refs.ctlDelvMode.setDisabled(true);
		
		refs.txtHandlingInRmk.setEditable(false);
		refs.btnSetLocId.setDisabled(true);
		
		//didn't do operation yet
		if(StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('inDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			refs.btnDischargingCheck.setDisabled(false);
			refs.ctlNewCarYn.setDisabled(false);
			refs.ctlDelvMode.setDisabled(false);
			refs.txtStevedoreId.setEditable(true);
			refs.txtDischargingRmk.setEditable(true);
			refs.txtUnitCorrectionNo.setEditable(true)
			
			refs.ctlDischargingDtm.setValue(new Date());
			if(me.cgItem && me.cgItem.get('delvTpCd') == 'I'){
				refs.ctlDelvMode.setValue('I');
				refs.ctlDelvMode.setDisabled(true);
			}
				
			
		}
		//On Discharging >> ready for Stack in Yard
		else if(!StringUtil.isNullorEmpty(unitItem.get('dischargedDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('inDate'))
				&& StringUtil.isNullorEmpty(unitItem.get('outDate'))){
			refs.refBtnDelete.setDisabled(false);
			refs.btnYardCheck.setDisabled(false);
			refs.btnSetLocId.setDisabled(false);
			refs.txtHandlingInRmk.setEditable(true);
			
			refs.txtLocId.setValue(unitItem.get('yardPlanLoc'));
			refs.ctlHandlingInDtm.setValue(new Date());
		}
		//Update/delete
		else if(StringUtil.isNullorEmpty(unitItem.get('outDate'))
				&& unitItem.get('statCd') != 'RH'){
			refs.refBtnDelete.setDisabled(false);
		}
	},
	
	// Popup After Setting
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
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
		}else if(targetControl === 'ctlUnitNoIndirectSearchField'){
			if(returnValue){
//				refs.ctlUnitNoSearchField.setValue(returnValue.code);

				var theDetail = me.getViewModel().get('theRRDetail');
				theDetail.set('iunitNo',returnValue.code);
				theDetail.set('whWgt',returnValue.totalMT);
				theDetail.set('whQty',returnValue.totalCnt);
				theDetail.set('whM3', returnValue.totalCbm);
				theDetail.set('sdoNo',returnValue.items[0].sdoNo);
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([],false);
				refs.ctlSearchBlNo.reset();
			}
		}else if(targetControl === 'ctlUnitNoDirectSearchField'){
			if(returnValue){
//				refs.ctlUnitNoSearchField.setValue(returnValue.code);

				var theDetail = me.getViewModel().get('theRRDetail');
				theDetail.set('dunitNo',returnValue.code);
				theDetail.set('loadMt',returnValue.totalMT);
				theDetail.set('loadQty',returnValue.totalCnt);
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([],false);
				refs.ctlSearchBlNo.reset();
			}
		}else if(targetControl === 'ctlDriverID'){
			refs.ctlDriverID.setValue(returnValue.code);
		}else {
			if(returnValue){
				refs.txtLocId.setValue(returnValue.data.locId);
			}
			else {
				refs.txtLocId.setValue();
			}
		}
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
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
	
	// Direct/Indirect Mode change
	onDirectModeChange : function(control, newValue){
		var me = this;
		var refs = me.getReferences();
		var clearItem = new Ext.create('MOST.model.operation.ConfirmDischargingOfRORO');
		var detailItem = me.getViewModel().get('theRRDetail');
		
		//reset package list
		me.packageItems = new Array();//btnPackageNo
		if(control == refs.ctlDirectOperation && refs.ctlDirectOperation.checked){
			me.getViewModel().setData({directMode:newValue});
			me.getViewModel().setData({apronMode:!newValue});
			me.getViewModel().setData({indirectMode:!newValue});
			me.updateRecordWithNoCommit(detailItem, clearItem, ['dmgWgt', 'dmgM3', 'dmgQty', 'whQty', 'whWgt', 'whM3', 'aprQty' , 'aprM3' , 'aprMt', 'vbQty', 'vbMt', 'vbM3']);
			refs.ctlConfirmDischargingLorryNo.setEditableControl(true);
//			refs.ctlConfirmDischargingApronLorryNo.setEditableControl(false);
//			refs.ctlConfirmDischargingApronLorryNo.setValue('');
//			refs.txtInternalTruckNo.allowBlank = true;

//			if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
//				refs.ctlConfirmDischargingLoadQty.setAllowBlank(false);
//				refs.ctlConfirmDischargingLoadMt.setAllowBlank(true);
//				refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
//				refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
//				refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
//			}else {
				refs.ctlConfirmDischargingLoadMt.setAllowBlank(false);
				refs.ctlConfirmDischargingLoadQty.setAllowBlank(true);
				refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
				refs.ctlConfirmDischargingLoadMt.setReadOnly(false);
				refs.ctlConfirmDischargingLoadM3.setReadOnly(false);
//			}
			
			refs.ctlIndirectOperation.setValue(!newValue);
			refs.ctlBtnUnitNoIndirectSearchField.setDisabled(true);
			refs.ctlBtnUnitNoDirectSearchField.setDisabled(false);
			
		} else if(control == refs.ctlIndirectOperation && refs.ctlIndirectOperation.checked){
//			refs.txtInternalTruckNo.allowBlank = false;
			
			detailItem.set('vaLorryNo', detailItem.get('externalLorryNo'));
			detailItem.set('abLorryNo', '');
			
			me.getViewModel().setData({directMode:!newValue});
			me.getViewModel().setData({apronMode:!newValue});
			me.getViewModel().setData({indirectMode:newValue});
			me.updateRecordWithNoCommit(detailItem, clearItem, ['loadQty', 'loadMt', 'loadM3', 'aprQty' , 'aprM3' , 'aprMt', 'aprQty', 'aprMt', 'aprM3']);
			refs.ctlConfirmDischargingLorryNo.setEditableControl(false);
			refs.ctlConfirmDischargingLorryNo.setValue('');
			
			refs.ctlConfirmDischargingLoadQty.setReadOnly(true);
			refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
			refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
			refs.ctlDirectOperation.setValue(!newValue);
			refs.ctlBtnUnitNoIndirectSearchField.setDisabled(false);
			refs.ctlBtnUnitNoDirectSearchField.setDisabled(true);
		}
	},
	
	openUnitListPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();

     	var recvData = me.getView().recvData;
     	var refer = '';
     	if(field.reference == 'ctlBtnUnitNoDirectSearchField'){
     		refer = 'ctlUnitNoDirectSearchField';
     	}else{
     		refer = 'ctlUnitNoIndirectSearchField';
     	}
     	recvData.set('jobTpCd', 'DS');
     	if(refs.ctlIndirectOperation.checked){
     		recvData.set('jobPurpCd', 'VA');
     	}else{
     		recvData.set('jobPurpCd', 'VG');
     	}
     	
	    me.openCodePopup('popup-unitnoforrorolistpopup',  refer , recvData);
	},
	
	onMtChange: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var mt = 0;
		var refsMt;
		var balanceMt = 0;

		balanceMt = Number(refs.refBalanceMT.getValue()).toFixed(3);
		
		if(refs.ctlIndirectOperation.checked){
			mt = Number(refs.ctlConfirmDischargingWhMt.getValue()).toFixed(3);
			refsMt = refs.ctlConfirmDischargingWhMt;

		}else if(refs.ctlDirectOperation.checked){
			mt = Number(refs.ctlConfirmDischargingLoadMt.getValue()).toFixed(3);
			refsMt = refs.ctlConfirmDischargingLoadMt;

		}
		else{
			balanceMt = Number(refs.ctlConfirmDischargingAMt.getValue()).toFixed(3);
			mt =Number(refs.ctlConfirmDischargingAprMt.getValue()).toFixed(3);
			refsMt = refs.ctlConfirmDischargingAprMt;
		}
		
	},
	
	onQtyChange: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var qty = 0;
		var balanceQty = 0;
		var eachVol = Number(detailItem.get('eachVol')).toFixed(3);
		var eachWgt = Number(detailItem.get('eachWgt')).toFixed(3);
		var refsQty = '';
		var refsMt = '';
		var refsM3 = '';

		if(refs.ctlIndirectOperation.checked){
			balanceQty = Number(refs.refBalanceQty.getValue());
			qty = Number(refs.ctlConfirmDischargingWhQty.getValue());
			refsQty = refs.ctlConfirmDischargingWhQty;
			refsMt = refs.ctlConfirmDischargingWhMt;
			refsM3 = refs.ctlConfirmDischargingWhM3;
//			refs.ctlConfirmDischargingWhMt.setValue(0);
//			refs.ctlConfirmDischargingWhM3.setValue(0);
		}else if(refs.ctlDirectOperation.checked){
			balanceQty = Number(refs.refBalanceQty.getValue());
			qty = Number(refs.ctlConfirmDischargingLoadQty.getValue());
			refsQty = refs.ctlConfirmDischargingLoadQty;
			refsMt = refs.ctlConfirmDischargingLoadMt;
			refsM3 = refs.ctlConfirmDischargingLoadM3;
//			refs.ctlConfirmDischargingLoadMt.setValue(0);
//			refs.ctlConfirmDischargingLoadM3.setValue(0);
		}else{
			balanceQty = Number(refs.ctlConfirmDischargingAQty.getValue());
			qty = Number(refs.ctlConfirmDischargingAprQty.getValue());
			refsQty = refs.ctlConfirmDischargingAprQty;
			refsMt = refs.ctlConfirmDischargingAprMt;
			refsM3 = refs.ctlConfirmDischargingAprM3;
//			refs.ctlConfirmDischargingAprMt.setValue(0);
//			refs.ctlConfirmDischargingAprM3.setValue(0);
		}

		if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_RCV){		
			var mt = eachWgt * qty;
			var m3 = eachVol * qty;

			refsMt.setValue(mt);
			refsM3.setValue(m3);

		}
	},
	
	onM3Change: function(ref){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var m3 = 0;
		var refsMt;
		var balanceM3 = 0;
		
		balanceM3 = Number(refs.refBalanceM3.getValue()).toFixed(3);
		
		if(refs.ctlIndirectOperation.checked){
			m3 = Number(refs.ctlConfirmDischargingWhM3.getValue()).toFixed(3);

		}else if(refs.ctlDirectOperation.checked){
			m3 = Number(refs.ctlConfirmDischargingLoadM3.getValue()).toFixed(3);

		}else{
			balanceM3 = Number(refs.ctlConfirmDischargingAM3.getValue()).toFixed(3);
			m3 = Number(refs.ctlConfirmDischargingAprM3.getValue()).toFixed(3);
		}
	},
	
	// Detail Save
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var infoForm = me.getView().form;
		me.prevSaveCheck();
	},
	
	
	prevSaveCheck : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if(detailItem.get('fnlDis') === 'Y'){
			MessageUtil.warning('warning_msg', 'confirmdischarging_final_operation_msg'); // CT1210060004
			return;
		}
		
		//Hatch No
		if(StringUtil.isNullorEmpty(detailItem.get('hatchNo'))){
			MessageUtil.warning('warning_msg', 'confirmloading_hatch_no_empty_msg');
			return;
		}
		
		if(refs.ctlDirectOperation.checked){
			if(detailItem.get('doNo') != null &&  detailItem.get('doNo') != ''){
				if(detailItem.get('delvTpCd') == null ||
					detailItem.get('delvTpCd') == '' ||
					detailItem.get('delvTpCd') == 'I'){
					MessageUtil.warning('warning_msg', 'confirmdischarging_direct_case_msg'); // CT1210060008
					return;
				}
				if(refs.ctlDirectOperation.checked && refs.ctlConfirmDischargingLorryNo.getValue() == '' 
					&& refs.ctlDriverID.getValue() == ''){
					MessageUtil.warning('warning_msg', 'This cargo lorry and driver is empty'); // CT1210060010
					return;
				}
			}else{
				MessageUtil.warning('warning_msg', 'confirmdischarging_do_require_msg'); // CT1210060007
				return;
			}
			
			if(detailItem.get('dunitNo') == null ||  detailItem.get('dunitNo') == ''){
				MessageUtil.warning('warning_msg', 'Please select unit number '); 
				return;
			}
			
		}
		else if(refs.ctlIndirectOperation.checked){
//			if(refs.txtInternalTruckNo.getValue() == ''){
//				MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg'); // CT1210060010
//				return;
//			}
			if(detailItem.get('iunitNo') == null ||  detailItem.get('iunitNo') == ''){
				MessageUtil.warning('warning_msg', 'Please select unit number '); 
				return;
			}
		}
		
		//Binding data
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		if(refs.ctlDirectOperation.checked){					
			detailItem.set('opDelvTpCd', 'D');
			detailItem.set('jobPurpCd', 'VG'); 
			detailItem.set('lorryId', refs.ctlConfirmDischargingLorryNo.getValue());
			detailItem.set('lorryNo', detailItem.get('externalLorryNo')); 
			detailItem.set('driverId', detailItem.get('driverId'));  
			detailItem.set('unitNos', detailItem.get('dunitNo')); 

//			detailItem.set('loadQty', detailItem.get('whQty'));
//			detailItem.set('loadMt', detailItem.get('whWgt'));
//			detailItem.set('loadM3', detailItem.get('whM3'));
		}else if(refs.ctlIndirectOperation.checked){
			detailItem.set('opDelvTpCd', 'I');
			detailItem.set('jobPurpCd', 'VA'); 
			detailItem.set('lorryNo', detailItem.get('vaLorryNo')); 
			detailItem.set('unitNos', detailItem.get('iunitNo')); 
		
			detailItem.set('whQty', detailItem.get('whQty'));
			detailItem.set('whWgt', detailItem.get('whWgt'));
			detailItem.set('whM3', detailItem.get('whM3'));
		}
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('packageItems', me.packageItems);
		detailItem.set('hangingScaleItems', me.hangingScaleItems);
		if(detailItem.get('delvTpCd') == 'D'){
			//Deliveried Out
			detailItem.set('statCd', 'DO');
		}
		else {
			//On-Discharging
			detailItem.set('statCd', 'OD');
		}
		var startDtStr = Ext.Date.format(detailItem.get('startDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDtStr = '';

		var crrDateTime =  new Date();
		var shftDtStr = endDtStr = Ext.Date.format(crrDateTime, 'Ymd');
		if(detailItem.get('endDt')){
			endDtStr = Ext.Date.format(detailItem.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());// "d/m/Y"
		}else{
			endDtStr = Ext.Date.format(crrDateTime, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}
		
		detailItem.set('startDtStr', startDtStr); 
		detailItem.set('endDtStr', endDtStr); 
		detailItem.set('shftDt', shftDtStr);
		detailItem.set('dischargedDate', endDtStr); 
		
		//Set Mode of Operation combo as Lorry or Vessel by default in corresponding case
//		if(me.getViewModel().get('theSearch').get('bargeCheckYn') == 'true'){
//			refs.refConfirmLoadingModeOfOpr.setValue('SE');
//		}else{
//			refs.refConfirmLoadingModeOfOpr.setValue('LR');
//		}
		
		//01-Terminal Hold Validation
//		if(Token.getTmnlHoldChk() === 'Y') {
//			me.onTerminalHoldValidation ();
//		} else {
//			me.onPassedTerminalHoldValidation();
//		}
		if(detailItem.get('jobPurpCd') === 'VA'){
			me.onInternalTruckJobValidation();
		}else{
			me.save();
		}
	},
	
	onInternalTruckJobValidation: function (){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if(!StringUtil.isNullorEmpty(detailItem.get('lorryNo'))) {
			var store = me.getStore('validationCheck');
			var params = {
				tyCd: 'INTERNALTRUCK_APRON_OPE_VALIDATION',
				col1: detailItem.get('lorryNo')
			};
			store.load({
				params : params,
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							if(records[0].get('isValidated') == 'Y'){
								me.onPassedInternalTruckJobValidation();
							}
							else {
								MessageUtil.question('info_msg', 'truckValidation_msg02', null,
										function(button){
											if(button == 'ok'){
												me.onPassedInternalTruckJobValidation();
											}
										}
									);
							}
							
						}
						else {
							me.onPassedInternalTruckJobValidation();
						}
					}
				}
			});
		}
		else {
			me.onPassedInternalTruckJobValidation();
		}
	},
	
	onPassedInternalTruckJobValidation: function(){
		var me = this;
		//Amount validation
		if(me.onAmountValidation()){
			return;
		}
		me.save();
	},
	//05: AMOUNT VALIDATION
	onAmountValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var cgTpCd = detailItem.get('cgTpCd');
		
		var actMT = detailItem.get('loadMt');
		var actM3 = detailItem.get('loadM3');
		var actQty = detailItem.get('loadQty');
		
		var balMt = detailItem.get('balMt'); 
		var balQty = detailItem.get('balQty');
		
		if(cgTpCd == CodeConstants.MT_CGTP_RCV){
			if(actQty <=0){
				MessageUtil.warning('warning_msg', 'confirmdischarging_qty_zero_msg'); // CT1210060012
				return true;
			}
			
			if (actQty > balQty){
				MessageUtil.warning('warning_msg', 'confirmloading_qty_over_msg'); // CT1210060009
				return true;
			}
			
			if(actMT <= 0 && actM3 <= 0 && actQty <=0){
				MessageUtil.warning('warning_msg', 'confirmdischarging_amount_zero_msg'); // CT1210060012
				return true;
			}
		}
		return false;
	},
	save: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		var recvData = me.prevData;

		var totalMt = detailItem.get('loadMt'); 
		var totalQty = detailItem.get('loadQty');
		var balMt = detailItem.get('balMt'); 
		var balQty = detailItem.get('balQty');
		
		if(detailItem.get('cgTpCd') !=  null 
				&& detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_RCV){
			if (totalQty == balQty){
				MessageUtil.question('info_msg', 'confirmdischarging_isfinalope_msg', null, // CT1210060001 
					function(button){
						if(button == 'ok'){
							detailItem.set('fnlOpeYn', 'Y');
						}else{
							detailItem.set('fnlOpeYn', 'N');
						}
						me.cudData();
					}
				);
			}
			else{
				detailItem.set('fnlOpeYn', 'N');
				me.cudData();
			}
			
		}else {
			if (totalMt >= balMt){
				MessageUtil.question('info_msg', 'balValidation_msg', null,
						function(button){
							if(button == 'ok'){
								MessageUtil.question('info_msg', 'confirmdischarging_isfinalope_msg', null, // CT1210060001 
										function(button){
											if(button == 'ok'){
												detailItem.set('fnlOpeYn', 'Y');
											}else{
												detailItem.set('fnlOpeYn', 'N');
											}
											me.cudData();
										}
									);
							}
						}
					);
				
				
			}else{
				detailItem.set('fnlOpeYn', 'N');
				me.cudData();
			}
		}
	},
	
	// cudData
	cudData : function(){
		var me = this;
		var window = me.getView().up('window');
		var parentView = me.getParentView();
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		detailItem.set('userId', Token.getUserId());
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/cargolist';
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(record, operation, success) {
				if(success){
//					me.saveDimension(record);
//					me.saveDamage(record);
					
					MessageUtil.saveSuccess(); // Success Message
					detailItem.commit();
					me.onLoad();
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
	
	openDriversPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
//		var ptnrCd = refs.ctlTransporter.getValue().toString();
		var params = {
				vslCallId: detailItem.get('vslCallId'),
				blNo: detailItem.get('blNo'),
				codeType: 'RORO'
		}
		
		me.openCodePopup('popup-driverlistpopup', 'ctlDriverID', params);
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});