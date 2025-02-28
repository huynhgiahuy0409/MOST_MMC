Ext.define('MOST.view.operation.ConfirmLoadingOfROROController', {
    extend: 'MOST.view.foundation.BaseViewController',
    requires: [
           	],
    alias: 'controller.confirmLoadingOfRORO',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    MAIN_GRID_REF_NAME: 'refConfirmHandlingInOfROROGrid',
	MAIN_STORE_NAME: 'confirmLoadingList',
	cgIndex:0,
	
	CARGO_LOADING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititems',
	prevDate:{ startDt: null, endDt: null},

 	prevData:null,
 	
	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */

    
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    onLoad : function() {
    	var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var params = me.getSearchCondition();
		params['shftDt'] = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());

		var window = me.getView().up('window');
		me.prevData = recvData.clone();
		me.booleanDirSpr = false;
		
		var store = me.getStore('confirmLoadingList');
		var hatchListStore = me.getStore('confirmLoadingHatchCombo');
		hatchListStore.load();
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.setDetailInitialize(record[0]);
						me.operationSeting();
					}
				}
			}
		});
	},
    
	
	// Detail Initialize
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var modeOfOprCombo = me.getStore('confirmLoadingForModeOfOprCombo');
		var deliveryCombo = me.getStore('confirmLoadingForDeliveryCombo');
		var cargoTypeCombo = me.getStore('confirmLoadingForCargoTypeCombo');
		
		if(masterItem.data == null ){
			MessageUtil.warning('warning_msg', 'confirmloading_erro_data_msg');
			return;
		}
		
		var jobWA = recvData.get('jobNo'); //Loading from Job WA.
		
		var detailItem = new Ext.create('MOST.model.operation.CargoLoading');
		DateUtil.convertDateToLong(masterItem.data, ['startDt', 'endDt']); // date to long
		detailItem.data = masterItem.data;
		
		if(recvData.get('jobNo')){//Load from WA Job
			//Amount Indirect:
			detailItem.set('loadAvQty', recvData.get('yardTruckQty'));
			detailItem.set('loadAvMt', recvData.get('yardTruckMt'));
			detailItem.set('loadAvM3', recvData.get('yardTruckM3'));
			detailItem.set('prevJobNo', recvData.get('prevJobNo'));
			detailItem.set('internalLorryNo', recvData.get('lorryNo'));
			detailItem.set('secondWgt', recvData.get('secondWgt'));

//			refs.ctlBlGr.setHidden(true);
//			me.getPackageNoList();
		}else{
			detailItem.set('externalLorryNo', recvData.get('lorryNo'));
			detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
//			detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
		}

		//Amount Direct
		detailItem.set('loadGvQty', detailItem.get('balQty'));
		detailItem.set('loadGvMt', detailItem.get('balMt'));
		detailItem.set('loadGvM3', detailItem.get('balM3'));
		
		detailItem.set('loadBvQty', detailItem.get('balQty'));
		detailItem.set('loadBvMt', detailItem.get('balMt'));
		detailItem.set('loadBvM3', detailItem.get('balM3'));
		detailItem.set('loadAvQty', detailItem.get('avBalQty'));
		detailItem.set('loadAvMt', detailItem.get('avBalMt'));
		detailItem.set('loadAvM3', detailItem.get('avBalM3'));
		detailItem.set('driverId', me.getViewModel().get('theSearch').get('driverId'));

		if(detailItem.get('delvTpCd') == CodeConstants.MT_DELVTP_I) {
			detailItem.set('docQty', "");
			detailItem.set('docMt', "");
			detailItem.set('docM3', "");
		}
		
		// Previous Date
		me.prevDate['startDt'] = detailItem.get('startDt');
		me.prevDate['endDt'] = detailItem.get('endDt');
		
		detailItem.phantom = false; // UPDATE
		detailItem.commit();
		me.getViewModel().setData({theRRDetail:detailItem});
		me.getView().recvData = detailItem;
		
//		modeOfOprCombo.setData(masterItem.get('modeOfOprList'));
//		deliveryCombo.setData(masterItem.get('deliveryList'));
//		cargoTypeCombo.setData(masterItem.get('cargoTypeList'));

		var delvTpCd = detailItem.get('delvTpCd');
		
		if(delvTpCd === 'I'){
			refs.ctlRadioAV.setValue(true);
			
			refs.refGV.setDisabled(true);
			refs.refAV.setDisabled(false);
		}else{
			refs.refAV.setDisabled(true);
			refs.refGV.setDisabled(true);
			
			if(CodeConstants.CGMST_TSPT_TP_SE == detailItem.get('tsptTpCd')) {
//				refs.ctlRadioBV.setValue(true);
//				refs.refBV.setDisabled(false);
			} else {
				refs.ctlRadioGV.setValue(true);
				refs.refGV.setDisabled(false);
			}
		}

		refs.ctlLoadGvMt.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);
		refs.ctlLoadGvM3.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);

		refs.ctlLoadGaMt.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);
		refs.ctlLoadGaM3.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);

		refs.ctlLoadAvMt.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);
		refs.ctlLoadAvM3.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);
		
		me.getDeployedEquipmentNoList();
	},
	
	// operationSeting
	operationSeting : function(){
		var me = this;
     	var recvData = me.prevData;
     	var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theRRDetail');

//		theDetail.set('hatchNo', recvData.get('hatchNo'));
		theDetail.set('startDt', new Date());

		refs.ctlConfirmLoadingPacTypeCode.setAllowBlank(true);
	},
	
	getDeployedEquipmentNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theRRDetail');
		var store = me.getStore('deployedEquipmentNoList');
		
		store.load({
			params: {
				vslCallId : theDetail.get('vslCallId'),
				workYmd : Ext.Date.format(new Date(), 'd/m/Y H:i')
			}
		});
	},
	
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
		
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition : function() {
		var me = this;
		var store = me.getStore('confirmLoadingList');
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
     	var recvData = me.getView().recvData;
		var crrDate = Ext.Date.format(new Date(), 'd/m/Y H:i');  //Auto Detect shift:

		var params = {
				vslCallId 	: recvData.get('vslCallId'),
				grNo 		: recvData.get('grNo'),
				cgNo 		: recvData.get('shipgNoteNo'),
				statCd 		: recvData.get('statCd'),
				cgTpCd 		: recvData.get('cgTpCd'),
				startDtStr	: crrDate,
				shipgNoteNo : recvData.get('shipgNoteNo'),
				gateTxnNo	: recvData.get('gateTxnNo'),
				delvTpCd 	: recvData.get('delvTpCd'),
				pageNo		: pageNo,
				sizePerPage	: sizePerPage
		};
		
		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getSnComboItems();
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var snCombo = me.getStore('snCombo');
				snCombo.loadData([],false);
				refs.ctlSearchSnno.reset();
			}
		}else if(targetControl === 'ctlUnitNoSearchField'){
			if(returnValue){
				refs.ctlUnitNoSearchField.setValue(returnValue.code);
				
				if (refs.ctlRadioGV.checked){
					refs.ctlLoadGvMt.setValue(returnValue.totalMT);
					refs.ctlLoadGvQty.setValue(returnValue.totalCnt);
					refs.ctlLoadGvM3.setValue(returnValue.totalCbm);
				}else if (refs.ctlRadioAV.checked){
					refs.ctlLoadAvMt.setValue(returnValue.totalMT);
					refs.ctlLoadAvQty.setValue(returnValue.totalCnt);
					refs.ctlLoadAvM3.setValue(returnValue.totalCbm);
				}
				
			}
		}
	},
	
	getSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		if(theVslInfo){
			var snCombo = me.getStore('snCombo');
			snCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							//snCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
						}
					}
				}
			});
		}
	},
	
	getInDirectUnitItemsList: function(record){
		var me = this;
		var refs = me.getReferences();
		if(record){
			var store = me.getStore('inDirectUnitItemsList');
			store.load({
				params : {
					vslCallId:record.get('vslCallId'),
					shipgNoteNo:record.get('shipgNoteNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		}
	},
	
	getDirectUnitItemsList: function(record){
		var me = this;
		var refs = me.getReferences();
		if(record){
			var store = me.getStore('directUnitItemsList');
			store.load({
				params : {
					vslCallId:record.get('vslCallId'),
					shipgNoteNo:record.get('shipgNoteNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		}
	},
	
	getUnitItemsList: function(record){
		var me = this;
		var refs = me.getReferences();
		
		var indirectStore = me.getStore('inDirectUnitItemsList');
		var directStore = me.getStore('directUnitItemsList');
		
		if(record){
			var store = me.getStore('unitItemsList');
			store.load({
				params : {
					vslCallId:record.get('vslCallId'),
					shipgNoteNo:record.get('shipgNoteNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							indirectStore.setData(records[0].data.indirectUnitItems);
							directStore.setData(records[0].data.directUnitItems);
						}
						
					}
				}
			});
		}
	},
	
	onSetActionButton: function (strTp, unitItem){
		var me = this;
		var refs = me.getReferences();
		
		//button
		refs.btnYardCheck.setDisabled(true);
		refs.btnLoadingCheck.setDisabled(true);
		refs.refBtnDelete.setDisabled(true);
		
		//Yard check
		refs.ctlOutDtm.setReadOnly(true);
		refs.ctlStevedoreId.setEditable(false);
		refs.ctlOutRemark.setEditable(false);
		
		//Loading check
		refs.ctlLoadingDtm.setReadOnly(true);
		refs.ctlMhc.setDisabled(true);
		refs.ctlLdRemarks.setEditable(false);
		refs.ctlVslLocation.setEditable(false);
		
		if(unitItem){
			if(strTp == "DIRECT"){
				if(unitItem.get('statCd') == 'RS' 
					|| StringUtil.isNullorEmpty(unitItem.get('statCd'))){//just for temporary CUD wihout WB application. Original it should be 'IC'
					//ready for Loading (loading check)
					refs.btnLoadingCheck.setDisabled(false);
					refs.ctlLoadingDtm.setReadOnly(false);
					refs.ctlMhc.setDisabled(false);
					refs.ctlLdRemarks.setEditable(true);
					refs.ctlVslLocation.setEditable(true);
					
					refs.ctlLoadingDtm.setValue(new Date());
				}
				else if(unitItem.get('statCd') == 'LD'){
					//Allow Update/Delete
					refs.refBtnDelete.setDisabled(false);
				}
			}
			else if(strTp == "INDIRECT"){
				if(unitItem.get('statCd') == 'ST'){
					//ready for Handling out (Yard check)
					refs.btnYardCheck.setDisabled(false);
					refs.ctlOutDtm.setReadOnly(false);
					refs.ctlStevedoreId.setEditable(true);
					refs.ctlOutRemark.setEditable(true);
					
					refs.ctlOutDtm.setValue(new Date());
				}
				else if(unitItem.get('statCd') == 'OL'){
					//ready for Loading (loading check)
					refs.btnLoadingCheck.setDisabled(false);
					refs.ctlLoadingDtm.setReadOnly(false);
					refs.ctlMhc.setDisabled(false);
					refs.ctlLdRemarks.setEditable(true);
					refs.ctlVslLocation.setEditable(true);
					
					refs.ctlLoadingDtm.setValue(new Date());
					
					//Allow Update/Delete
					refs.refBtnDelete.setDisabled(false);
				}
				else if(unitItem.get('statCd') == 'LD'){
					//Allow Update/Delete
					refs.refBtnDelete.setDisabled(false);
				}
			}
		}
	},
	
	onBindingUnitItem: function (unitItem){
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().setData({theDetail:unitItem});
		refs.ctlOutDtm.setValue(unitItem.get('outDate'));
		refs.ctlLoadingDtm.setValue(unitItem.get('loadingTime'));
	},
	
	onClear: function (){
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().setData({theDetail:null});
		
		refs.ctlOutDtm.setValue();
		refs.ctlLoadingDtm.setValue();
		
		refs.ctlMhc.setValue(false);
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	onCheckLoadingType: function(ctl , newValue, oldValue, eOpts ) {
		if(!newValue){
			return;
		}
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		var delvTpCd = detailItem.get('delvTpCd');

		var isGV = refs.ctlRadioGV.getValue();
		var isGA = refs.ctlRadioGA.getValue();
		var isAV = refs.ctlRadioAV.getValue();
		

		refs.ctlLoadGvMt.setDisabled(!isGV);
		refs.ctlLoadGvM3.setDisabled(!isGV);
		refs.ctlLoadGvQty.setDisabled(!isGV);

		refs.ctlLoadGaMt.setDisabled(!isGA);
		refs.ctlLoadGaM3.setDisabled(!isGA);
		refs.ctlLoadGaQty.setDisabled(!isGA);

		refs.ctlLoadAvMt.setDisabled(!isAV);
		refs.ctlLoadAvM3.setDisabled(!isAV);
		refs.ctlLoadAvQty.setDisabled(!isAV);

		if(isGV){
			detailItem.set('loadGaMt', 0);
			detailItem.set('loadGaM3', 0);
			detailItem.set('loadGaQty', 0);

			detailItem.set('loadAvMt', 0);
			detailItem.set('loadAvM3', 0);
			detailItem.set('loadAvQty', 0);
			
		}else if (isGA){
			detailItem.set('loadGvMt', 0);
			detailItem.set('loadGvM3', 0);
			detailItem.set('loadGvQty', 0);

			detailItem.set('loadAvMt', 0);
			detailItem.set('loadAvM3', 0);
			detailItem.set('loadAvQty', 0);
			
		}else if (isAV){
			detailItem.set('loadGvMt', 0);
			detailItem.set('loadGvM3', 0);
			detailItem.set('loadGvQty', 0);

			detailItem.set('loadGaMt', 0);
			detailItem.set('loadGaM3', 0);
			detailItem.set('loadGaQty', 0);
		}
	},

	onChangePkgQty: function(ctl, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var cgTpCd = detailItem.get('cgTpCd');

		//Auto Calculate 
		var eachMt = detailItem.get('eachMt');
		var eachM3 = detailItem.get('eachM3');
		var inputQty = Number(newValue);

		if(ctl.reference  === 'ctlLoadGvQty'){
			detailItem.set('loadGvMt', eachMt * inputQty);
			detailItem.set('loadGvM3', eachM3 * inputQty);
		}
		if(ctl.reference  === 'ctlLoadGaQty'){
			detailItem.set('loadGaMt', eachMt * inputQty);
			detailItem.set('loadGaM3', eachM3 * inputQty);
		}
		if(ctl.reference  === 'ctlLoadAvQty'){
			detailItem.set('loadAvMt', eachMt * inputQty);
			detailItem.set('loadAvM3', eachM3 * inputQty);
		}
		
	},	
	
	openUnitListPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();

     	var recvData = me.getView().recvData;
		recvData.set('grNo', '')
//     	recvData.set('jobTpCd', 'LD');
     	if(recvData.get('delvTpCd') != null && recvData.get('delvTpCd') == 'I'){
     		recvData.set('jobPurpCd', 'AV');
     	}else{
     		recvData.set('jobPurpCd', 'GV');
     	}
     	
	    me.openCodePopup('popup-unitnoforrorolistpopup',  'ctlUnitNoSearchField' , recvData);
	},
	
	openDriversPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
//		var ptnrCd = refs.ctlTransporter.getValue().toString();
		var params = {
				ptnrCd 		: detailItem.get('tsptr'),
				vslCallId	:  detailItem.get('vslCallId'),
				shipgNoteNo	: detailItem.get('shipgNoteNo'),
				grNo		: detailItem.get('grNo'),
				codeType	: 'RORO'
		}
		
		me.openCodePopup('popup-driverlistpopup', 'ctlDriverID', params);
	},
	
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
    keyup: function () {

    },
    
    
 // Detail Save
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		me.setLoadingAmt();
		me.setLoadingItems();
		
		var infoForm = me.getView().form;

		//Mandatory validation
		if(!infoForm.isValid()){
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
//		Hatch No
		if(StringUtil.isNullorEmpty(detailItem.get('hatchNo'))){
			MessageUtil.warning('warning_msg', 'confirmloading_hatch_no_empty_msg'); // CT1210005
			return;
		}
		
		if(detailItem.get('unitNo') == null ||  detailItem.get('unitNo') == ''){
			MessageUtil.warning('warning_msg', 'Please select unit number '); 
			return;
		}
		
		//LORRY NO
//		if((refs.ctlRadioGV.getValue() || refs.ctlRadioAV.getValue())
//				&& StringUtil.isNullorEmpty(detailItem.get('lorryNo'))){
//			MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg');
//			return;
//		}
		
		me.prevSaveCheck();
	},
	
	prevSaveCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if(detailItem.get('unitNo') == null && detailItem.get('unitNo') == ''){
			MessageUtil.warning('warning_msg', 'Please select Units Number');
			return;
		}
		if(Token.getCustomHoldChk() === 'Y') {
			me.onCustomsHoldValidation();
		}
		else {
			me.onPassedCustomsHoldValidation();
		}
	},
	
	//03: CUSTOMS RELEASED VALIDATION
	onCustomsHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		var store = me.getStore('validationCheck');
		
		store.load({
			params : {
				tyCd: 'CUSTOMS_RELEASED_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('mfDocId'),
				col4: detailItem.get('scn')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N' && detailItem.get('domesticChk') == 'N'){
							//Confirm msg
							MessageUtil.question('info_msg', 'confirmhandlingout_clearance_msg', null,
									function(button){
										if(button == 'ok'){
											me.onPassedCustomsHoldValidation();
										}
									}
								);
						} else {
							me.onPassedCustomsHoldValidation();
						}
					}else{
						me.onPassedCustomsHoldValidation();
					}
				}
			}
		});
	},
	
	onPassedCustomsHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		me.save();
	},
	
	
	// Save Process - save
	save : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		var recvData = me.prevData;
		var window = me.getView().up('window');

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(records, operation, success) {
				if (success) {
//					me.saveDimension(records);
//					me.saveDamage(records);
					
					detailItem.commit();
					MessageUtil.saveSuccess(); // Success Message
					
					var parentView = me.getParentView();
					if(parentView.getController().onSearch){
						parentView.getController().onSearch();
					}
					window.close(); 
				}
			}
		});
	},
	
	setLoadingAmt: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');

		var delvTpCd = detailItem.get('delvTpCd');

		if(!delvTpCd){
			return;
		}
		
		var loadMt = loadM3 = loadQty = 0;
		var jobPurpCd = "";
		var lorryNo = "";

		if(refs.ctlRadioGV.getValue()){//Direct Gate to vesel
			loadMt = refs.ctlLoadGvMt.getValue();
			loadM3 = refs.ctlLoadGvM3.getValue();
			loadQty = refs.ctlLoadGvQty.getValue();
			jobPurpCd = 'GV';
			lorryNo = detailItem.get('externalLorryNo');

		}else if(refs.ctlRadioAV.getValue()){//Apron to Vessel
			loadMt = refs.ctlLoadAvMt.getValue();
			loadM3 = refs.ctlLoadAvM3.getValue();
			loadQty = refs.ctlLoadAvQty.getValue();
			jobPurpCd = 'AV';
			lorryNo = detailItem.get('internalLorryNo');
		}
		detailItem.set('loadMt', loadMt);
		detailItem.set('loadQty', loadQty);
		detailItem.set('loadM3', loadM3);		
		detailItem.set('jobPurpCd', jobPurpCd);
		detailItem.set('lorryNo', lorryNo);
	},	
	
	setLoadingItems: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var startDtStr = Ext.Date.format(detailItem.get('startDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDtStr = '';

		var crrDateTime =  new Date();
		var shftDtStr = endDtStr = Ext.Date.format(crrDateTime, 'Ymd');
		if(detailItem.get('endDt')){
			endDtStr = Ext.Date.format(detailItem.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}else{
			endDtStr = Ext.Date.format(crrDateTime, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}

		detailItem.set('startDtStr', startDtStr); 
		detailItem.set('endDtStr', endDtStr); 
		detailItem.set('shftDt', shftDtStr); 
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set('packageItems', me.packageItems);
		detailItem.set('hangingScaleItems', me.hangingScaleItems);
	},
});

