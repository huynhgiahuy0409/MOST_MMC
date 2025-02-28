Ext.define('MOST.view.operation.hht.ConfirmDischargingHHTPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.confirmdischarginghhtpopup',
	
	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	FORM_REF: 'refFrmCfrmDischarging',
	CARGO_DISCHARGING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargodischarging/cargoDischarging',
	
	prevDate:{ startDt: null, endDt: null},
	prevData:null,

	isFirstLoad: true,
	fnlOpeYn: false,
	currBl: '',
	CUST_RELEASE: 'RELEASE', //CUSTOMS MODE
	CUST_HOLD: 'HOLD', //CUSTOMS MODE
	
	workingShift: new Object(),
 	DAMAGE_STORE: 'damageStore',
	DIMENSION_STORE: 'dimensionStore',
	UPLOAD_STORE: 'uploadStore',
	JOB_NO_STORE: 'jobNoStore',
	
	packageItems : new Array(),
	hangingScaleItems : new Array(),
	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		var recvData = me.getView().recvData;
		me.prevData = recvData.clone();

		//Common Combodata
		var hatchNoCombo = me.getStore('hatchNoCombo');
		var equipmentNoList = me.getStore('equipmentNoList');
		var modeOfOprCombo = me.getStore('modeOfOprCombo');
		hatchNoCombo.load();
		equipmentNoList.load();
		modeOfOprCombo.load();

		var store = me.getStore('confirmDischarging');
		var params = me.getSearchCondition();
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.setDetailInitialize(record[0]);
						me.setControlSetting();
						me.isFirstLoad = false;
					}
				}
			}
		});
	},
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE END
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onChangeHandlingQty: function(ctl, newValue, oldValue, eOpts){
		var me = this;
     	var refs = me.getReferences();
     	
     	var detailItem = me.getViewModel().get('theDetail');
     	
     	if(!me.checkOverBalance(ctl, newValue)){
			
			if(refs.refRadioCfmDischargingVG.getChecked()){
				MessageUtil.warning('warning_msg', 'hht_discharging_over_vg_amount');
			}else if(refs.refRadioCfmDischargingVB.getChecked()){
				MessageUtil.warning('warning_msg', 'hht_discharging_over_vg_amount');
			}else if(refs.refRadioCfmDischargingVA.getChecked()){
				MessageUtil.warning('warning_msg', 'hht_discharging_over_va_amount');
			}else if(refs.refRadioCfmDischargingAB.getChecked()){
				MessageUtil.warning('warning_msg', 'hht_discharging_over_ag_amount');
			}
			
			ctl.suspendEvents();
			ctl.setValue(oldValue);
			ctl.resumeEvents();
			
			return;
		}

     	var cgTpCd = detailItem.get('cgTpCd');
		if(cgTpCd ==  CodeConstants.MT_CGTP_BBK && newValue){
			me.autoCalculateAmount(ctl, newValue);
		}
		me.checkFinal(ctl);
	},
	
	onChangeHandlingMt: function(ctl, newValue, oldValue, eOpts){
		var me = this;
     	var refs = me.getReferences();
     	
     	var theDetail = me.getViewModel().get('theDetail');
     	var cgTpCd = theDetail.get('cgTpCd');
     	if(cgTpCd === CodeConstants.MT_CGTP_BBK){
     		return; // BBK is auto populate MT & M3
     	}
     	
     	//08-11-2022: Removed Balance check base LAIP request (Dry bulk)
//     	if(!me.checkOverBalance(ctl, newValue)){
//			MessageUtil.warning('warning_msg', 'hht_discharging_over_amount');
//			
//			ctl.suspendEvents();
//			ctl.setValue(oldValue);
//			ctl.resumeEvents();
//			
//			return;
//		}
     	
	},
	
	onChangeHandlingM3: function(ctl, newValue, oldValue, eOpts){
		var me = this;
     	var refs = me.getReferences();
     	
     	var theDetail = me.getViewModel().get('theDetail');
     	var cgTpCd = theDetail.get('cgTpCd');
     	if(cgTpCd === CodeConstants.MT_CGTP_BBK){
     		return; // BBK is auto populate MT & M3
     	}
     	
     	//08-11-2022: Removed Balance check base LAIP request (Dry bulk)
//     	if(!me.checkOverBalance(ctl, newValue)){
//			MessageUtil.warning('warning_msg', 'hht_discharging_over_amount');
//			
//			ctl.suspendEvents();
//			ctl.setValue(oldValue);
//			ctl.resumeEvents();
//			
//			return;
//		}
     	
	},
	
	onCheckDischargingType: function (ctl, eOpts) {
		var me = this;
		var refs = me.getReferences();

		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();

		//Set Hidden:
		refs.refCtnCfmDischargingVG.setHidden(!isVG);
		refs.refCtnCfmDischargingVA.setHidden(!isVA);
		refs.refCtnCfmDischargingVB.setHidden(!isVB);
		refs.refCtnCfmDischargingAB.setHidden(!isAB);
		
		refs.refScaleAmtBtn.setHidden(!isVB);
		
		if(isVG || isVA){
			refs.refConfirmDischargingLorryNo.setRequired(true);
			refs.refConfirmDischargingBargeNo.setRequired(false);
			refs.refConfirmDischargingBargeNo.setHidden(true);
		} else {
			refs.refConfirmDischargingLorryNo.setRequired(false);
			refs.refConfirmDischargingBargeNo.setRequired(true);
			refs.refConfirmDischargingBargeNo.setHidden(false);
		}
		
	},
	
	onChangeDischargingType: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		if (!newValue) {
			return;
		}
		var detailItem = me.getViewModel().get('theDetail');
		var delvTpCd = detailItem.get('delvTpCd');
		var cgTpCd = detailItem.get('cgTpCd');
		
		//reset
		if(!me.isFirstLoad){
			detailItem.set('lorryNo', '');
			detailItem.set('gateTxnNo', '');
			detailItem.set('wbTransactionNo', '');
			detailItem.set('sdoNo', '');
		}
		
		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();

		//Set Editable Amount input:
		refs.refTxtCfmDischargingVgMt.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refTxtCfmDischargingVgM3.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refTxtCfmDischargingVaMt.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refTxtCfmDischargingVaM3.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refTxtCfmDischargingVbMt.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refTxtCfmDischargingVbM3.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refTxtCfmDischargingAbMt.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refTxtCfmDischargingAbM3.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);

		//Set Editable Amount input:
		refs.refTxtCfmDischargingVgMt.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refTxtCfmDischargingVgM3.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);

		refs.refTxtCfmDischargingVaMt.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refTxtCfmDischargingVaM3.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refTxtCfmDischargingVbMt.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refTxtCfmDischargingVbM3.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refTxtCfmDischargingAbMt.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refTxtCfmDischargingAbM3.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refScaleAmtBtn.setHidden(!isVB);
		if(isVG || isVA){
			refs.refConfirmDischargingLorryNo.setRequired(true);
			refs.refConfirmDischargingBargeNo.setRequired(false);
			
		} else {
			refs.refConfirmDischargingLorryNo.setRequired(false);
			refs.refConfirmDischargingBargeNo.setRequired(true);
		}

		if (isVG) {
			detailItem.set('vaQty', 0);
			detailItem.set('vaMt', 0);
			detailItem.set('vaM3', 0);
			
			detailItem.set('vbQty', 0);
			detailItem.set('vbMt', 0);
			detailItem.set('vbM3', 0);
			
			detailItem.set('abQty', 0);
			detailItem.set('abMt', 0);
			detailItem.set('abM3', 0);

		} else if (isVA) {
			detailItem.set('vgQty', 0);
			detailItem.set('vgMt', 0);
			detailItem.set('vgM3', 0);
			
			detailItem.set('vbQty', 0);
			detailItem.set('vbMt', 0);
			detailItem.set('vbM3', 0);
			
			detailItem.set('abQty', 0);
			detailItem.set('abMt', 0);
			detailItem.set('abM3', 0);
		} else if (isVB) {
			detailItem.set('vgQty', 0);
			detailItem.set('vgMt', 0);
			detailItem.set('vgM3', 0);
			
			detailItem.set('vaQty', 0);
			detailItem.set('vaMt', 0);
			detailItem.set('vaM3', 0);
			
			detailItem.set('abQty', 0);
			detailItem.set('abMt', 0);
			detailItem.set('abM3', 0);
		} else if (isAB) {
			detailItem.set('vgQty', 0);
			detailItem.set('vgMt', 0);
			detailItem.set('vgM3', 0);
			
			detailItem.set('vaQty', 0);
			detailItem.set('vaMt', 0);
			detailItem.set('vaM3', 0);
			
			detailItem.set('vbQty', 0);
			detailItem.set('vbMt', 0);
			detailItem.set('vbM3', 0);
		}
	},
	
	onHangingScaleFetch_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(refs.refRadioCfmDischargingVB.getChecked()) {
			var store = me.getStore('hangingScaleFetchingItems');
			store.load({
				params:{
					vslCallId	: detailItem.get('vslCallId'),
					mfDocId 	: detailItem.get('mfDocId'),
					blNo 		: detailItem.get('blNo'),
					sdoNo 		: detailItem.get('sdoNo'),
					
				},
				callback: function(records, operation, success) {
					if (success) {
						me.hangingScaleItems = new Array();
						
						if(records.length > 0) {
							
							for (var i=0; i<records.length; i++){
								me.hangingScaleItems.push(records[i].data);
							}
							
							refs.refTxtCfmDischargingVbQty.setValue(records[0].get('pkgQty'));
							refs.refTxtCfmDischargingVbMt.setValue(records[0].get('cgWgt'));
							refs.refTxtCfmDischargingVbM3.setValue(records[0].get('cgVol'));
						}
					}
				}
			});
		}
	},
	
	//Confirm Discharging
	onSave: function () {
		var me = this;
		var refs = me.getReferences();
		
		//VALIDATE MANDATORY:
		var validForm = refs.refFrmCfrmDischarging.validate();
		if (!validForm) {
			MessageUtil.mandatoryFieldInValid();
			me.setMaskedForm(false);
			return;
		}

		var detailItem = me.getViewModel().get('theDetail');
		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();

		var loadQty = 0, loadMt = 0, loadM3 = 0;
		var whQty = 0, whWgt = 0, whM3 = 0;
		var balQty = 0, balMt = 0, balM3 = 0;
		var jobPurpCd = "";

		balQty = detailItem.get('balQty');
		balMt = detailItem.get('balMt');

		if (refs.refRadioCfmDischargingVG.getChecked()) {
			loadQty = detailItem.get('vgQty');
			loadMt = detailItem.get('vgMt');
			loadM3 = detailItem.get('vgM3');

			whQty = detailItem.get('vgQty');
			whWgt = detailItem.get('vgMt');
			whM3 = detailItem.get('vgM3');

			jobPurpCd = 'VG';
		}
		else if (refs.refRadioCfmDischargingVA.getChecked()) {
			loadQty = detailItem.get('vaQty');
			loadMt = detailItem.get('vaMt');
			loadM3 = detailItem.get('vaM3');

			whQty = detailItem.get('vaQty');
			whWgt = detailItem.get('vaMt');
			whM3 = detailItem.get('vaM3');

			jobPurpCd = 'VA';
		}
		else if (refs.refRadioCfmDischargingVB.getChecked()) {
			loadQty = detailItem.get('vbQty');
			loadMt = detailItem.get('vbMt');
			loadM3 = detailItem.get('vbM3');

			whQty = detailItem.get('vbQty');
			whWgt = detailItem.get('vbMt');
			whM3 = detailItem.get('vbM3');

			jobPurpCd = 'VB';
		}

		else if (refs.refRadioCfmDischargingAB.getChecked()) {
			loadQty = detailItem.get('abQty');
			loadMt = detailItem.get('abMt');
			loadM3 = detailItem.get('abM3');

			whQty = detailItem.get('abQty');
			whWgt = detailItem.get('abMt');
			whM3 = detailItem.get('abM3');

			balQty = detailItem.get('aqty');
			balMt = detailItem.get('amt');

			jobPurpCd = 'AB';
		}

		detailItem.set('loadQty', loadQty);
		detailItem.set('loadMt', loadMt);
		detailItem.set('loadM3', loadM3);

		detailItem.set('whQty', whQty);
		detailItem.set('whWgt', whWgt);
		detailItem.set('whM3', whM3);

		detailItem.set('jobPurpCd', jobPurpCd);

		//Check Pre Status discharge 
		if ((detailItem.get('fnlDis') === 'Y') && (isVA || isVG || isVB)) {
			//Final Discharged -> Block operation from Vessel
			MessageUtil.warning('warning_msg', 'confirmdischarging_final_operation_msg');
			return;
		}

		if (!me.oprTimeValidation()) {
			return;
		}

		if (!me.amountValidation()) {
			return;
		}
		
		me.terminalHoldValidation();
	},

	//button Cancel
	onCancel: function(btn){
		MessageUtil.questionModern('Confirm', 'modity_save_confirm_msg',null,
				function(button){
					if (button === 'ok') {
						btn.up('window').close();
				    
			        }else if(button === 'cancel'){
			        	return;
			        };
				}
			);		
	},
	
	//Truck popup
	onOpenTruckPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refConfirmDischargingLorryNo',
			popupAlias = '', 
			title = '';
		
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var detailItem = me.getViewModel().get('theDetail');

		if(isVA){
			title = 'Yard Truck List';
			popupAlias = 'app-assignedinternaltrucklistpopuphht';
		}else{
			title = 'In-Gate Truck List';
			popupAlias = 'popup-ingatetrucklistpopuphht';
		}
		
		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				lorryNo: refs.refConfirmDischargingLorryNo.getValue(),
				blNo: detailItem.get('blNo'),
				shipgNoteNo: '',
				weightCheckYn: detailItem.get('weightCheckYn')
			};
	
		if(popupAlias){
			ViewUtil.openCodePopup(me, popupAlias, targetCtl , params);
		}
	},
	
	//Package type popup
	onOpenPackageTypePopup: function(){
		var me = this;
		var targetCtl = 'refTxtCfmDischargingPkgTp';
		var title = 'Package Type';
		var params = {
				title: title,
				searchType: 'COMM',
				searchDivCd: 'PKGTP',
				searchLcd: 'MT',
				searchCol1:'',
			};
		ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetCtl, params);
	},
	
	//Package No popup
	onOpenPackageNoPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var targetCtl = 'refTxtCfmDischargingPkgNo';
		var title = 'Package No. List';
		
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var jobPurpCd = '';
		if(isVG){
			jobPurpCd = 'VG';
		}
		
		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				blNo: detailItem.get('blNo'),
				shipgNoteNo: '',
				ixCd: 'I',
				jobPurpCd: jobPurpCd
			};
		ViewUtil.openCodePopup(this, 'app-packagenomultipopuphht', targetCtl, params);
	},
	
	//Barge No popup
	onOpenBargePopup: function(){
		var me = this;
		var refs = me.getReferences();
		
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();
		
		if(isAB || isVB){
			var detailItem = me.getViewModel().get('theDetail');
			var targetCtl = 'refConfirmDischargingBargeNo';
			var title = 'Barge No. List';
			var searchType = '';
			if(isAB){
				searchType = 'I';
			}
			
			var params = {
					title: title,
					vslCallId: detailItem.get('vslCallId'),
					searchType: searchType
				};
			ViewUtil.openCodePopup(this, 'app-assignmentbargepopuphht', targetCtl, params);
		}
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	
     	//var blNo = me.isFirstLoad ? recvData.get('blNo') : refs.CltCbxBl.getValue();
     	var blNo = recvData.get('blNo');
     	me.currBl = blNo;
     	
    	var params = {
			vslCallId : recvData.get('vslCallId'),
			cgTpCd : recvData.get('cgTpCd'),
			shftDt : recvData.get('shftDt'),
			shftId : recvData.get('shftId'),
			blNo : blNo,
			gateTxnNo: recvData.get('gateTxnNo'),
			sdoNo: recvData.get('sdoNo'),
			searchType : recvData.get('bargeCheck') == 'Y' ? 'BARGE' : 'discharging',
			hhtFlags : '1STLD'
		};
    	
    	return params;
	},
	
	/*
	 * Set data initial
	 * */
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		
		if(masterItem.get('items') != null && masterItem.get('items').length > 0){
			var detailItem = Ext.create('MOST.model.operation.CargoDischarging');
			DateUtil.convertDateToLong(masterItem.get('items')[0], ['startDt', 'endDt']);
			
			masterItem.get('items')[0].lorryId = '';
			detailItem.data = masterItem.get('items')[0];

			detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
			detailItem.set('cgNo', detailItem.get('blNo'));
			detailItem.set('bargeCheck', recvData.get('bargeCheck'));
			detailItem.set('startDt', new Date());//Set Start Time
			
			//Get Gate/WB information from CMC
			detailItem.set('lorryNo', recvData.get('lorryNo'));
			detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
			detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
			detailItem.set('sdoNo', recvData.get('sdoNo'));
			
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theDetail:detailItem});

		}
	},
	
	setControlSetting: function(){
		var me = this;
     	var recvData = me.prevData;
     	var refs = me.getReferences();
     	
     	var detailItem = me.getViewModel().get('theDetail');
     	var delvTpCd = detailItem.get('delvTpCd');
     	var doNo = detailItem.get('doNo');
     	var sdoNo = detailItem.get('sdoNo');
     	var bargeCheck = detailItem.get('bargeCheck');
     	var tsptTpCd = detailItem.get('tsptTpCd');
     	
     	var isBBK = false;
		var isDBK = false;
		
		if(recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK && recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_DBN){			
			MessageUtil.warning('warning_msg', 'ConfirmDischarging_can_not_operation_msg', recvData.get('cgTpCd'));
			var window = me.getView().up('window');
			window.close();
		}
		
		if(recvData.get('cgTpCd') == CodeConstants.MT_CGTP_BBK) {
			isBBK = true;
		} else {
			isDBK = true;
		}
		
		//Set default:
//		refs.refRadioCfmDischargingVG.suspendEvents();
//		refs.refRadioCfmDischargingVA.suspendEvents();
//		refs.refRadioCfmDischargingVB.suspendEvents();
//		refs.refRadioCfmDischargingAB.suspendEvents();

		if(delvTpCd == CodeConstants.MT_DELVTP_I) {
			//Indirect case
			refs.refRadioCfmDischargingVA.setChecked(true);
			me.onCheckDischargingType(refs.refRadioCfmDischargingVA, '');
			
			refs.refRadioCfmDischargingVA.setDisabled(false);
			refs.refRadioCfmDischargingVG.setDisabled(true);
			refs.refRadioCfmDischargingVB.setDisabled(true);
			refs.refRadioCfmDischargingAB.setDisabled(true);
		}
		else {
			if(!StringUtil.isNullorEmpty(sdoNo) 
					&& bargeCheck == 'Y'
					&& tsptTpCd == CodeConstants.CGMST_TSPT_TP_SE){
				//Barge operation case
				refs.refRadioCfmDischargingVB.setChecked(true);
				me.onCheckDischargingType(refs.refRadioCfmDischargingVB, '');
				
				refs.refRadioCfmDischargingVB.setDisabled(false);
				refs.refRadioCfmDischargingAB.setDisabled(false);
				refs.refRadioCfmDischargingVA.setDisabled(false);
				refs.refRadioCfmDischargingVG.setDisabled(true);
			}
			else {
				refs.refRadioCfmDischargingVG.setChecked(true);
				me.onCheckDischargingType(refs.refRadioCfmDischargingVG, '');
				
				refs.refRadioCfmDischargingVA.setDisabled(false);
				refs.refRadioCfmDischargingVG.setDisabled(false);
				refs.refRadioCfmDischargingVB.setDisabled(true);
				refs.refRadioCfmDischargingAB.setDisabled(true);
			}
		}
		
		////Set Editable Input Amount:
		//refs.refTxtCfmDischargingVaQty.setReadOnly(isDBK);
		refs.refTxtCfmDischargingVaMt.setReadOnly(isBBK);
		refs.refTxtCfmDischargingVaM3.setReadOnly(isBBK);

		//refs.refTxtCfmDischargingVgQty.setReadOnly(isDBK);
		refs.refTxtCfmDischargingVgMt.setReadOnly(isBBK);
		refs.refTxtCfmDischargingVgM3.setReadOnly(isBBK);
		
		//refs.refTxtCfmDischargingVbQty.setReadOnly(isDBK);
		refs.refTxtCfmDischargingVbMt.setReadOnly(isBBK);
		refs.refTxtCfmDischargingVbM3.setReadOnly(isBBK);
		
		//refs.refTxtCfmDischargingAbQty.setReadOnly(isDBK);
		refs.refTxtCfmDischargingAbMt.setReadOnly(isBBK);
		refs.refTxtCfmDischargingAbM3.setReadOnly(isBBK);
	},
	

	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(targetControl === 'refConfirmDischargingLorryNo'){
			if(returnValue) {
				detailItem.set('lorryNo',returnValue.item.get('lorryNo'));
				detailItem.set('gateTxnNo',returnValue.item.get('gateTxnNo'));
				detailItem.set('wbTransactionNo',returnValue.item.get('wbTransactionNo'));
				detailItem.set('sdoNo',returnValue.item.get('sdoNo'));
			}
			else {
				detailItem.set('lorryNo', '');
				detailItem.set('gateTxnNo', '');
				detailItem.set('wbTransactionNo', '');
				detailItem.set('sdoNo', '');
			}
		}
		else if(targetControl === 'refTxtCfmDischargingPkgNo'){
			if(returnValue) {
				var packageItems = new Array();
				
				for(var i = 0; i < returnValue.item.length; i++){
					var returnItem = returnValue.item[i];
					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
						vslCallId: returnItem.get('vslCallId'),
						mfDocId : returnItem.get('mfDocId'),
						refNo: returnItem.get('refNo'),
						pkgNo: returnItem.get('packageNo')
					});
					packageItems.push(pkgItem.data);
				}
				me.packageItems = packageItems;
				me.onBindingAmoutnByPackageItems(returnValue);
			}
			else {
				me.packageItems = new Array();
				refs.refTxtCfmDischargingPkgNo.setValue();
			}
		}
	},
	
	onBindingAmoutnByPackageItems: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();
		
		var mt = 0, m3 = 0, qty = 0;
		
		if(returnValue.item.length > 0){
			for (var i=0; i<returnValue.item.length; i++){
				mt += Number(returnValue.item[i].get('mt'));
				m3 += Number(returnValue.item[i].get('m3'));
				qty++;
			}
		}
		
		if(isVB) {
			refs.refTxtCfmDischargingVbQty.setValue(qty);
			refs.refTxtCfmDischargingVbMt.setValue(mt);
			refs.refTxtCfmDischargingVbM3.setValue(m3);
		}
		else if(isAB) {
			refs.refTxtCfmDischargingAbQty.setValue(qty);
			refs.refTxtCfmDischargingAbMt.setValue(mt);
			refs.refTxtCfmDischargingAbM3.setValue(m3);
		}
		else if(isVG) {
			refs.refTxtCfmDischargingVgQty.setValue(qty);
			refs.refTxtCfmDischargingVgMt.setValue(mt);
			refs.refTxtCfmDischargingVgM3.setValue(m3);
		}
		else if(isVA) {
			refs.refTxtCfmDischargingVaQty.setValue(qty);
			refs.refTxtCfmDischargingVaMt.setValue(mt);
			refs.refTxtCfmDischargingVaM3.setValue(m3);
		}
	},
	
	/*
	 * Prevent Over load amount:
	*/
	checkOverBalance: function(ctl, newValue){
		var me = this;
     	var refs = me.getReferences();
     	
     	var detailItem = me.getViewModel().get('theDetail');
     	
     	var vslBalQty = 0;
		var vslBalMt = 0;
		var vslBalM3 = 0;
		
		var aprBalQty = 0; //Apron Balance
		var aprBalMt = 0;
		var aprBalM3 = 0;
		
		var drBalQty = 0; //Direct Balance
		var drBalMt = 0;
		var drBalM3 = 0;

		vslBalQty = detailItem.get('balQty');
		vslBalMt = detailItem.get('balMt');
		vslBalM3 = detailItem.get('balM3');
		
		aprBalQty = detailItem.get('aqty');
		aprBalMt = detailItem.get('amt');
		aprBalM3 = detailItem.get('am3');
		
		drBalQty = detailItem.get('drBalQty');
		drBalMt = detailItem.get('drBalMt');
		drBalM3 = detailItem.get('drBalM3');
		
		if(detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
			/*
			 * Vessel to Gate (Direct)
			 * */
			if(ctl.reference === 'refTxtCfmDischargingVgQty' && newValue > vslBalQty){
				return false;
			}
//			else if(ctl.reference === 'refTxtCfmDischargingVgMt' && newValue > vslBalMt){
//				return false;
//			}
//			else if(ctl.reference === 'refTxtCfmDischargingVgM3' && newValue > vslBalM3){
//				return false;
//			}
			
			/*
			 * Vessel to Apron
			 * */
			else if(ctl.reference === 'refTxtCfmDischargingVaQty' && newValue > vslBalQty){
				return false;
			}
//			else if(ctl.reference === 'refTxtCfmDischargingVaMt' && newValue > vslBalMt){
//				return false;
//			}
//			else if(ctl.reference === 'refTxtCfmDischargingVaM3' && newValue > vslBalM3){
//				return false;
//			}
			
			/*
			 * Vessel to Barge (Direct)
			 * */
			else if(ctl.reference === 'refTxtCfmDischargingVbQty' && newValue > vslBalQty){
				return false;
			}
//			else if(ctl.reference === 'refTxtCfmDischargingVbMt' && newValue > vslBalMt){
//				return false;
//			}
//			else if(ctl.reference === 'refTxtCfmDischargingVbM3' && newValue > vslBalM3){
//				return false;
//			}
			
			/*
			 * Apron to Barge (Direct)
			 * */
			else if(ctl.reference === 'refTxtCfmDischargingAbQty' && newValue > aprBalQty){
				return false;
			}
//			else if(ctl.reference === 'refTxtCfmDischargingAbMt' && newValue > aprBalMt){
//				return false;
//			}
//			else if(ctl.reference === 'refTxtCfmDischargingAbM3' && newValue > aprBalM3){
//				return false;
//			}
		}
		
		return true;
	},
	
	/*
	 * Auto Calculate MT/M3 for BBK
	 * */
	autoCalculateAmount: function (clt, newValue) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		if(cgTpCd != CodeConstants.MT_CGTP_BBK)
			return;

		var	vslBalQty = detailItem.get('balQty');
		var	vslBalMt = detailItem.get('balMt');
		var	vslBalM3 = detailItem.get('balM3');
		
		var	aprBalQty = detailItem.get('aqty');
		var	aprBalMt = detailItem.get('amt');
		var	aprBalM3 = detailItem.get('am3');

		
		var eachMt = Number(detailItem.get('eachWgt')).toFixed(3);
		var eachM3 = Number(detailItem.get('eachVol')).toFixed(3);
		var inputQty = Number(newValue);

		var loadMt = 0, loadM3 = 0;

		//Vessel to Gate
		if (clt.reference === 'refTxtCfmDischargingVgQty') {
			if (inputQty === vslBalQty) {
				loadMt = vslBalMt;
				loadM3 = vslBalM3;
			} else {
				loadMt = Number(eachMt * inputQty).toFixed(3);
				loadM3 = Number(eachM3 * inputQty).toFixed(3);
			}

			detailItem.set('vgMt', loadMt);
			detailItem.set('vgM3', loadM3);
		}

		//Vessel to Apron
		if (clt.reference === 'refTxtCfmDischargingVaQty') {
			if (inputQty === vslBalQty) {
				loadMt = vslBalMt;
				loadM3 = vslBalM3;
			} else {
				loadMt = Number(eachMt * inputQty).toFixed(3);
				loadM3 = Number(eachM3 * inputQty).toFixed(3);
			}
			detailItem.set('vaMt', loadMt);
			detailItem.set('vaM3', loadM3);
		}
		
		//Vessel to Barge
		if (clt.reference === 'refTxtCfmDischargingVbQty') {
			if (inputQty === vslBalQty) {
				loadMt = vslBalMt;
				loadM3 = vslBalM3;
			} else {
				loadMt = Number(eachMt * inputQty).toFixed(3);
				loadM3 = Number(eachM3 * inputQty).toFixed(3);
			}
			detailItem.set('vbMt', loadMt);
			detailItem.set('vbM3', loadM3);
		}

		//Apron to Barge
		if (clt.reference === 'refTxtCfmDischargingAbQty') {
			if (inputQty === aprBalQty) {
				loadMt = aprBalMt;
				loadM3 = aprBalM3;
			} else {
				loadMt = Number(eachMt * inputQty).toFixed(3);
				loadM3 = Number(eachM3 * inputQty).toFixed(3);
			}
			detailItem.set('abMt', loadMt);
			detailItem.set('abM3', loadM3);
		}
	},
	
	/*
	 * Auto check final base on Amount
	 * */
	checkFinal: function (ref) {
		var me = this;
		var refs = me.getReferences();
		var isFinalLoad = false;
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();
		
		//Balance amount
		//vsl Balance
		var balQty = detailItem.get('balQty');
		var balMt = detailItem.get('balMt');
		//Apron Bal
		var aprBalQty = detailItem.get('aqty');
		var aprBalMt = detailItem.get('amt');
		
		//Confirm Amount
		var loadVgQty = detailItem.get('vgQty');
		var loadVgMt = detailItem.get('vgMt');
		
		var loadVaQty = detailItem.get('vaQty');
		var loadVaMt = detailItem.get('vaMt');
		
		var loadVbQty = detailItem.get('vbQty');
		var loadVbMt = detailItem.get('vbMt');
		
		var loadAbQty = detailItem.get('abQty');
		var loadAbMt = detailItem.get('abMt');

		if(isVG){
			if(cgTpCd == CodeConstants.MT_CGTP_BBK && loadVgQty >= balQty){
				isFinalLoad = true;
			} else if(cgTpCd == CodeConstants.MT_CGTP_DBN && loadVgMt >= balMt){
				isFinalLoad = true;
			}
		}
		else if(isVA){
			if(cgTpCd == CodeConstants.MT_CGTP_BBK && loadVaQty >= balQty){
				isFinalLoad = true;
			} else if(cgTpCd == CodeConstants.MT_CGTP_DBN && loadVaMt >= balMt){
				isFinalLoad = true;
			}
		}
		else if(isVB){
			if(cgTpCd == CodeConstants.MT_CGTP_BBK && loadVbQty >= balQty){
				isFinalLoad = true;
			} else if(cgTpCd == CodeConstants.MT_CGTP_DBN && loadVbMt >= balMt){
				isFinalLoad = true;
			}
		}
		else if(isAB){
			if(cgTpCd == CodeConstants.MT_CGTP_BBK && loadAbQty >= aprBalQty){
				isFinalLoad = true;
			} else if(cgTpCd == CodeConstants.MT_CGTP_DBN && loadAbMt >= aprBalMt){
				isFinalLoad = true;
			}
		}

		refs.refChkCfmDischargingFinal.setChecked(isFinalLoad);		
	},
	
	setMaskedForm (value){
		var me = this;
		var ctl = me.lookupReference(me.FORM_REF);
		me.setMaskedHHT (me, ctl.reference, value);
	},
	
	onPassedTerminalHoldValidation : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(Token.getCustomHoldChk() === 'Y') {
			if(detailItem.get('custMode') !== me.CUST_RELEASE) {
				MessageUtil.questionModern('info_msg', 'confirmdischarging_clearance_msg', null, // CT1210060011 
					function(button){
						if(button == 'ok'){
							me.save();
						}
					}
				);
			} else {
				me.save();
			}
		} else {
			me.save();
		}
	},
	
	save: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.prevData;
		var finalYN = 'N';
		var cgTpCd = detailItem.get('cgTpCd');
		
		var loadQty = 0, balQty = 0, loadMt = 0, balMt = 0, loadM3 = 0, balM3 = 0;
		
		balQty = detailItem.get('balQty');
		balMt = detailItem.get('balMt');
		balM3 = detailItem.get('balM3');

		if (refs.refRadioCfmDischargingVG.getChecked()) {
			loadQty = detailItem.get('vgQty');
			loadMt = detailItem.get('vgMt');
			loadM3 = detailItem.get('vgM3');
		}
		else if (refs.refRadioCfmDischargingVA.getChecked()) {
			loadQty = detailItem.get('vaQty');
			loadMt = detailItem.get('vaMt');
			loadM3 = detailItem.get('vaM3');
		}
		else if (refs.refRadioCfmDischargingVB.getChecked()) {
			loadQty = detailItem.get('vbQty');
			loadMt = detailItem.get('vbMt');
			loadM3 = detailItem.get('vbM3');
		}
		else if (refs.refRadioCfmDischargingAB.getChecked()) {
			loadQty = detailItem.get('abQty');
			loadMt = detailItem.get('abMt');
			loadM3 = detailItem.get('abM3');
			
			balQty = detailItem.get('aQty');
			balMt = detailItem.get('aMt');
			balM3 = detailItem.get('aM3');
		}

		var fnlOpeYn = refs.refChkCfmDischargingFinal.getChecked() ? "Y" : "N";
		detailItem.set('fnlOpeYn', fnlOpeYn);
		
		if (fnlOpeYn && fnlOpeYn === 'Y') {
			finalYN = 'Y';
		}

		if (cgTpCd === CodeConstants.MT_CGTP_BBK) {
			if(loadQty == balQty && finalYN == 'N'){
				MessageUtil.questionModern('info_msg', 'confirmdischarging_isfinalope_msg', null,
						function (button) {
							finalYN = (button == 'ok' ? 'Y' : 'N');
							me.saveDischargeFinalYN(finalYN);
						}
					);
			}
			else if(loadQty > balQty){
				MessageUtil.warning('warning_msg', 'confirmloading_qty_over_msg');
				return;
			}
			else {
				me.saveDischargeFinalYN(finalYN);
			}
		}
		else {
			if(loadMt >= balMt){
				MessageUtil.questionModern('info_msg', 'confirmdischarging_isfinalope_msg', null,
						function (button) {
							finalYN = (button == 'ok' ? 'Y' : 'N');
							//me.saveDischargeFinalYN(finalYN);
							
							if(loadMt > balMt){
								MessageUtil.questionModern('info_msg', 'balValidation_msg', null,
										function (button) {
											if(button == 'ok'){
												me.saveDischargeFinalYN(finalYN);
											}
										}
									);
							}
							else {
								me.saveDischargeFinalYN(finalYN);
							}
						}
					);
			}
			else {
				me.saveDischargeFinalYN(finalYN);
			}
		}

	},
	
	saveDischargeFinalYN: function (value) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var newStartDate = Ext.Date.parse(refs.refTxtCfmDischargingStartDt.getValue(), 'd/m/Y H:i');
		var newEndDate = Ext.Date.parse(refs.refTxtCfmDischargingEndDt.getValue(), 'd/m/Y H:i');

		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();

		if (isVG || isVB) {
			detailItem.set('fnlDelvYn', value);
		}

		if (value === 'Y') {
			detailItem.set('fnlOpeYn', value);
			me.fnlOpeYn = true;
			me.cudData();
		} else {
			me.cudData();
		}
	},

	cudData: function () {
		var me = this;
		var window = me.getView().up('window');
		var parentView = me.getParentView();
		var refs = me.getReferences();
		var endDt = new Date();
		var detailItem = me.getViewModel().get('theDetail');

		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();

		if(isVG){					
			detailItem.set('opDelvTpCd', 'D');
			detailItem.set('jobPurpCd', 'VG'); 
			detailItem.set('lorryNo', refs.refConfirmDischargingLorryNo.getValue());
		}
		else if(isVA){
			detailItem.set('opDelvTpCd', 'I');
			detailItem.set('jobPurpCd', 'VA'); 
			detailItem.set('lorryNo', refs.refConfirmDischargingLorryNo.getValue());
		}
		else if(isVB){
			detailItem.set('opDelvTpCd', 'D');
			detailItem.set('jobPurpCd', 'VB');
			detailItem.set('bargeNoOfVslBarge', refs.refConfirmDischargingBargeNo.getValue()); 
		}
		else if(isAB){
			detailItem.set('opDelvTpCd', 'D');
			detailItem.set('jobPurpCd', 'AB');
			detailItem.set('bargeNoOfAprBarge', refs.refConfirmDischargingBargeNo.getValue()); 
		}
		
		var startDtStr = Ext.Date.format(detailItem.get('startDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDtStr = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		detailItem.set('startDtStr', startDtStr);
		detailItem.set('endDtStr', endDtStr);
		detailItem.set('endDt', endDt);
		detailItem.set('userId', MOST.config.Token.getUserId());
		detailItem.set('packageItems', me.packageItems);
		detailItem.set('hangingScaleItems', me.hangingScaleItems);

		me.setMaskedForm(true);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_DISCHARGING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function (record, operation, success) {
				/***********************************************************************************************/	
				if (success) {
					detailItem.commit();
					me.setMaskedForm(false);

					//Auto ReLoad DS List on CMC Screen:
					var parentView = me.getParentView();
					if(parentView.getController().searchDischarging){
						parentView.getController().searchDischarging();
					}
					MessageUtil.saveSuccess(); //Success Message
					window.close();
					
				/***********************************************************************************************/	
				}else{
					me.setMaskedForm(false);
					var exObject = JSON.parse(operation.getError().response.responseText);
					var errorCode = exObject.error.code;
					var errorId = exObject.error.errorId;
					var errorMsg = exObject.error.errorMessage;
					if(errorCode == 412 && errorId == "OptimisticLocking"){
						MessageUtil.warning('warning_msg', 'cargomanualctl_reloaddata');
					}else{
						MessageUtil.warning('warning_msg', errorCode + " - " + errorId + errorMsg);
					}
					return;
				}
			}
		});
	},
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD END
	 */
	
	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD START
	 */
	/*
	 * Validate Time:
	 * */
	oprTimeValidation: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.prevData;

		// Time check
		var startDt = me.prevDate['startDt'];
		var endDt = me.prevDate['endDt'];
		var newStartDate = Ext.Date.parse(refs.refTxtCfmDischargingStartDt.getValue(), 'd/m/Y H:i');
		var newEndDate = new Date (); //Ext.Date.parse(refs.refTxtCfmDischargingEndDt.getValue(), 'd/m/Y H:i');
		var startDateFormat = Ext.Date.format(me.prevDate['startDt'], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(me.prevDate['endDt'], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());

		if (newEndDate < newStartDate) {
			MessageUtil.warning('warning_msg', 'confirmloading_start_end_date_msg');
			return false;
		}
		
		return true;
	},
	
	/*
	 * Check amount Qty/Mt for BBK/DBN should be > 0
	 * */
	amountValidation: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');
		var isFinalLoad = false;

		var isVG = refs.refRadioCfmDischargingVG.getChecked();
		var isVA = refs.refRadioCfmDischargingVA.getChecked();
		var isVB = refs.refRadioCfmDischargingVB.getChecked();
		var isAB = refs.refRadioCfmDischargingAB.getChecked();

		//Balance Amount
		var balQty = detailItem.get('balQty');
		var balMt = detailItem.get('balMt');

		var aprBalQty = detailItem.get('aqty');
		var aprBalMt = detailItem.get('amt');

		//Confirm Amount
		var loadVgQty = (detailItem.get('vgQty') || 0);
		var loadVgMt = (detailItem.get('vgMt') || 0);

		var loadVaQty = (detailItem.get('vaQty') || 0);
		var loadVaMt = (detailItem.get('vaMt') || 0);
		
		var loadVbQty = (detailItem.get('vbQty') || 0);
		var loadVbMt = (detailItem.get('vbMt') || 0);

		var loadAbQty = (detailItem.get('abQty') || 0);
		var loadAbMt = (detailItem.get('abMt') || 0);

		if (isVG) {
			if (cgTpCd == CodeConstants.MT_CGTP_BBK && loadVgQty <= 0) {
				MessageUtil.warning('warning_msg', 'hht_discharging_bbk_zero_amount');
				return false;
			} else if (cgTpCd == CodeConstants.MT_CGTP_DBN && loadVgMt <= 0) {
				MessageUtil.warning('warning_msg', 'hht_discharging_dbn_zero_amount');
				return false;
			}
		}
		else if (isVA) {
			if (cgTpCd == CodeConstants.MT_CGTP_BBK && loadVaQty <= 0) {
				MessageUtil.warning('warning_msg', 'hht_discharging_bbk_zero_amount');
				return false;
			} else if (cgTpCd == CodeConstants.MT_CGTP_DBN && loadVaMt <= 0) {
				MessageUtil.warning('warning_msg', 'hht_discharging_dbn_zero_amount');
				return false;
			}
		}
		else if (isVB) {
			if (cgTpCd == CodeConstants.MT_CGTP_BBK && loadVbQty <= 0) {
				MessageUtil.warning('warning_msg', 'hht_discharging_bbk_zero_amount');
				return false;
			} else if (cgTpCd == CodeConstants.MT_CGTP_DBN && loadVbMt <= 0) {
				MessageUtil.warning('warning_msg', 'hht_discharging_dbn_zero_amount');
				return false;
			}
		}

		else if (isAB) {
			if (cgTpCd == CodeConstants.MT_CGTP_BBK && loadAbQty <= 0) {
				MessageUtil.warning('warning_msg', 'hht_discharging_bbk_zero_amount');
				return false;
			} else if (cgTpCd == CodeConstants.MT_CGTP_DBN && loadAbMt <= 0) {
				MessageUtil.warning('warning_msg', 'hht_discharging_dbn_zero_amount');
				return false;
			}
		}

		return true;
	},
	
	terminalHoldValidation: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('blNo'),
				col3: CodeConstants.TMNL_HOLD_CDS
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'terminal_hold_msg');
							return false;
						}
						else {
							me.onPassedTerminalHoldValidation();
						}
					}
					else {
						me.onPassedTerminalHoldValidation();
					}
				}
			}
		});
	},
	
	externalTruckNoValidation: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		
	},
	
	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD END
	 */
	
	onTabDamage: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		ViewUtil.openCodePopup(this, 'app-damageofcargo', 'refsBtnDamage', recvData);
	},

	onTabDimension: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		ViewUtil.openCodePopup(this, 'app-dimensionofcargohht', 'refsBtnDimension', recvData);
	},
	
	saveDamage : function(){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore(me.DAMAGE_STORE);
		if(damageStore.data.length > 0){
			var insertItem = damageStore.data.items[0];
			var isCreated = false;
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = damageStore.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', insertItem.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						
					}
				}
			});
		}
	},
	
	saveDimension : function(){
		var me = this;
		var refs = me.getReferences();
		var dimensionStore = me.getStore(me.DIMENSION_STORE);
		if(dimensionStore.data.length > 0){
			var item = dimensionStore.data.items[0];
			var isCreated = false;
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = dimensionStore.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', item.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						
					}
				}
			});
		}
	},
});