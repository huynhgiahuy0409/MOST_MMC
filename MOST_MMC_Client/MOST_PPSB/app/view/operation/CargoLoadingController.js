Ext.define('MOST.view.operation.CargoLoadingController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.cargoloading',
	
	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_LOADING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoloading/cargoLoading',
	prevDate:{ startDt: null, endDt: null},
	booleanDirSpr : false,

 	prevData:null,
 	CUST_RELEASE: 'RELEASE', //CUSTOMS MODE
	CUST_HOLD: 'HOLD', //CUSTOMS MODE
	whType: '',
	
	DAMAGE_STORE: 'damageStore',
	DAMAGE_CHECK_STORE: 'damageCheckStore',
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
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var params = me.getSearchCondition();
		params['shftDt'] = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());

		var window = me.getView().up('window');
		me.prevData = recvData.clone();
		me.booleanDirSpr = false;
		
		var store = me.getStore('confirmLoading');
		var hatchListStore = me.getStore('confirmLoadingHatchList');
		hatchListStore.load();
		me.setComboBoxWithLocalCache(CacheServiceConstants.APFP_COMBOBOX, 'ctlConfirmLoadingHatchDrtCombo');


		var piplineGrNoStore = me.getStore('piplineGrNo');
		
		piplineGrNoStore.load({
			params:{
				vslCallId: recvData.get('vslCallId'),
				shipgNoteNo: recvData.get('shipgNoteNo'),
				grNoPlStr: recvData.get('grNoPlStr')
			}
		})
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						record[0].set('workYmd', params.workYmd);
						record[0].set('shftId', params.shftId);
						me.setDetailInitialize(record[0]);
						me.operationSeting(params.startDtStr, params.endDtStr);
					}
				}
			}
		});
		
		//No need for Shift and Start/End time if cargo type is not BBK/DBN/DBE
		var cgTpCdList = ['BBK', 'DBN', 'DBE'];
		if (!cgTpCdList.includes(recvData.data.cgTpCd)) {
		    refs.ctlConfirmLoadingStartDt.setAllowBlank(true);
		    refs.ctlConfirmLoadingStartDt.validate(); 
		    refs.ctlConfirmLoadingShift.setAllowBlank(true);
		    refs.ctlConfirmLoadingShift.validate();
		} else {
			refs.ctlConfirmLoadingStartDt.setAllowBlank(false);
		    refs.ctlConfirmLoadingStartDt.validate(); 
		    refs.ctlConfirmLoadingShift.setAllowBlank(false);
		    refs.ctlConfirmLoadingShift.validate();
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
	onCheckLoadingType: function(ctl , newValue, oldValue, eOpts ) {
		if(!newValue){
			return;
		}
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var delvTpCd = detailItem.get('delvTpCd');

		var isGV = refs.ctlRadioGV.getValue();
		var isGA = refs.ctlRadioGA.getValue();
		var isAV = refs.ctlRadioAV.getValue();
		
		var isBV = refs.ctlRadioBV.getValue();

		refs.ctlLoadGvMt.setDisabled(!isGV);
		refs.ctlLoadGvM3.setDisabled(!isGV);
		refs.ctlLoadGvQty.setDisabled(!isGV);

		refs.ctlLoadGaMt.setDisabled(!isGA);
		refs.ctlLoadGaM3.setDisabled(!isGA);
		refs.ctlLoadGaQty.setDisabled(!isGA);

		refs.ctlLoadAvMt.setDisabled(!isAV);
		refs.ctlLoadAvM3.setDisabled(!isAV);
		refs.ctlLoadAvQty.setDisabled(!isAV);
		
		refs.ctlLoadBvMt.setDisabled(!isBV);
		refs.ctlLoadBvM3.setDisabled(!isBV);
		refs.ctlLoadBvQty.setDisabled(!isBV);

		if(isGV){
			detailItem.set('loadGaMt', 0);
			detailItem.set('loadGaM3', 0);
			detailItem.set('loadGaQty', 0);

			detailItem.set('loadAvMt', 0);
			detailItem.set('loadAvM3', 0);
			detailItem.set('loadAvQty', 0);
			
			detailItem.set('loadBvMt', 0);
			detailItem.set('loadBvM3', 0);
			detailItem.set('loadBvQty', 0);
		}else if (isGA){
			detailItem.set('loadGvMt', 0);
			detailItem.set('loadGvM3', 0);
			detailItem.set('loadGvQty', 0);

			detailItem.set('loadAvMt', 0);
			detailItem.set('loadAvM3', 0);
			detailItem.set('loadAvQty', 0);
			
			detailItem.set('loadBvMt', 0);
			detailItem.set('loadBvM3', 0);
			detailItem.set('loadBvQty', 0);
		}else if (isAV){
			detailItem.set('loadGvMt', 0);
			detailItem.set('loadGvM3', 0);
			detailItem.set('loadGvQty', 0);

			detailItem.set('loadGaMt', 0);
			detailItem.set('loadGaM3', 0);
			detailItem.set('loadGaQty', 0);
			
			detailItem.set('loadBvMt', 0);
			detailItem.set('loadBvM3', 0);
			detailItem.set('loadBvQty', 0);
		} else if (isBV){
			detailItem.set('loadGvMt', 0);
			detailItem.set('loadGvM3', 0);
			detailItem.set('loadGvQty', 0);

			detailItem.set('loadGaMt', 0);
			detailItem.set('loadGaM3', 0);
			detailItem.set('loadGaQty', 0);
			
			detailItem.set('loadAvMt', 0);
			detailItem.set('loadAvM3', 0);
			detailItem.set('loadAvQty', 0);
		}

	},

	onChangePkgQty: function(ctl, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var cgTpCd = detailItem.get('cgTpCd');

		//Auto Calculate with BBK:
		if(cgTpCd === CodeConstants.MT_CGTP_BBK){
			var eachMt = detailItem.get('projectCargo') == 'Y' ? detailItem.get('snMt') / detailItem.get('snQty') : detailItem.get('eachMt');
			var eachM3 = detailItem.get('projectCargo') == 'Y' ? detailItem.get('snM3') / detailItem.get('snQty') : detailItem.get('eachM3');
			var inputQty = Number(newValue);

			if(ctl.reference  === 'ctlLoadGvQty'){
				detailItem.set('loadGvMt', Number(detailItem.get('mt')) / Number(detailItem.get('qty')) * inputQty);
				detailItem.set('loadGvM3', Number(detailItem.get('m3')) / Number(detailItem.get('qty')) * inputQty);
			}
			if(ctl.reference  === 'ctlLoadGaQty'){
				detailItem.set('loadGaMt', eachMt * inputQty);
				detailItem.set('loadGaM3', eachM3 * inputQty);
			}
			if(ctl.reference  === 'ctlLoadAvQty'){
				detailItem.set('loadAvMt', eachMt * inputQty);
				detailItem.set('loadAvM3', eachM3 * inputQty);
			}
			
			//Barge
			if(ctl.reference  === 'ctlLoadBvQty'){
				detailItem.set('loadBvMt', eachMt * inputQty);
				detailItem.set('loadBvM3', eachM3 * inputQty);
			}
		}
	},	
	
	//Dimension check
	onDimension_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		me.openCodePopup('app-dimensioncheckregistration', 'btnDimension', me.prevData);
	},
	
	onDamage_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		me.prevData.set('locCd', 'VSL')
		me.prevData.set('isOperationScreen', true)
		me.openCodePopup('app-damagecheckregistration', 'btnDamage', me.prevData);
	},

	onOpenPkgNoPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var isGV = refs.ctlRadioGV.getValue();;
		var isAV = refs.ctlRadioAV.getValue();
		
		var params = {
				vslCallId: detailItem.get('vslCallId'),
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				ixCd: 'X',
				jobPurpCd: (isAV ? 'AV' : ''),
				delvTpCd: detailItem.get('delvTpCd')
		}
		
		me.openCodePopup('popup-packagenomultipopup', 'cltPkgNo', params);
	},
	
	onHangingScaleFetch_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(refs.ctlRadioBV.checked) {
			var store = me.getStore('hangingScaleFetchingItems');
			store.load({
				params:{
					vslCallId	: detailItem.get('vslCallId'),
					mfDocId 	: detailItem.get('mfDocId'),
					shipgNoteNo : detailItem.get('shipgNoteNo'),
					grNo 		: detailItem.get('grNo'),
					
				},
				callback: function(records, operation, success) {
					if (success) {
						me.hangingScaleItems = new Array();
						
						if(records.length > 0) {
							
							for (var i=0; i<records.length; i++){
								me.hangingScaleItems.push(records[i].data);
							}
							
							refs.ctlLoadBvQty.setValue(records[0].get('pkgQty'));
							refs.ctlLoadBvMt.setValue(records[0].get('cgWgt'));
							refs.ctlLoadBvM3.setValue(records[0].get('cgVol'));
						}
					}
				}
			});
		}
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		
		window.close();
	},
	
	// Detail Save
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		me.setLoadingAmt();
		me.setLoadingItems();
		
		var infoForm = me.getView().form;

		//Mandatory validation
		if(!infoForm.isValid()){
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
		if(detailItem.get('tsptTpCd') === 'PL'){
			if(refs.ctlLoadGvQty.getValue() > Number(detailItem.get('balQty')) 
					|| refs.ctlLoadGvMt.getValue() > Number(detailItem.get('balMt')) 
					|| refs.ctlLoadGvM3.getValue() > Number(detailItem.get('balM3'))){				  
				MessageUtil.warning('warning_msg', 'confirmdischarging_exceed_pil_amount');
				return;
			}
		}
		
		if(detailItem.get('fnlLoadYn') === 'Y'){
			MessageUtil.warning('warning_msg', 'confirmloading_loading_final_msg');
			return;
		}
		
		//Hatch No
		if(StringUtil.isNullorEmpty(detailItem.get('hatchNo'))){
			MessageUtil.warning('warning_msg', 'confirmloading_hatch_no_empty_msg'); // CT1210005
			return;
		}
		
		//BARGE NO
		if(refs.ctlRadioBV.getValue() && StringUtil.isNullorEmpty(detailItem.get('bargeNo'))){
			MessageUtil.warning('warning_msg', 'bargeValidation');
			return;
		}
		
		//LORRY NO
		if(detailItem.get('cgTpCd') != null && detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_LQN){
			if(refs.refConfirmLoadingModeOfOpr.getValue() != null && refs.refConfirmLoadingModeOfOpr.getValue() != 'PL'){
				if((refs.ctlRadioGV.getValue() || refs.ctlRadioAV.getValue())
						&& StringUtil.isNullorEmpty(detailItem.get('lorryNo'))){
					MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg');
					return;
				}
			}
		}else{
			if((refs.ctlRadioGV.getValue() || refs.ctlRadioAV.getValue())
					&& StringUtil.isNullorEmpty(detailItem.get('lorryNo'))){
				// MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg');
				// return;
			}
		}
		
		me.prevSaveCheck();
	},
	
	onVesselDelay_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
					
		var recvData = {
				vslCallId: detailItem.get('vslCallId')
			};
		
		me.loadMenuView('app-vesseldelay', recvData);
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Detail Initialize
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var modeOfOprCombo = me.getStore('confirmLoadingForModeOfOprCombo');
		var deliveryCombo = me.getStore('confirmLoadingForDeliveryCombo');
		var cargoTypeCombo = me.getStore('confirmLoadingForCargoTypeCombo');
		
		if(masterItem.get('items') == null || masterItem.get('items').length == 0){
			MessageUtil.warning('warning_msg', 'confirmloading_erro_data_msg');
			return;
		}
		
		var jobWA = recvData.get('jobNo'); //Loading from Job WA.
		
		var detailItem = new Ext.create('MOST.model.operation.CargoLoading');
//		DateUtil.convertDateToLong(masterItem.get('items')[0], ['startDt', 'endDt']); // date to long
		detailItem.data = masterItem.get('items')[0];
		detailItem.set('workYmd', masterItem.get('workYmd'));
		detailItem.set('shftId', masterItem.get('shftId'));
		me.prevData.set('vslCallId', detailItem.get('vslCallId'))
		me.prevData.set('vslCd', detailItem.get('vslCd'))
		me.prevData.set('scn', detailItem.get('scn'))
		me.prevData.set('callSeq', detailItem.get('callSeq'))
		me.prevData.set('callYear', detailItem.get('callYear'))
		if(detailItem.get('tsptTpCd') == 'PL'){
			refs.ctlBlGr.setHidden(true);
			refs.ctlPiplineGrNo.setHidden(false);
			refs.refConfirmLoadingModeOfOpr.setDisabled(true);
		}else{
			refs.ctlPiplineGrNo.setHidden(true);
			refs.ctlBlGr.setHidden(false);
			refs.refConfirmLoadingModeOfOpr.setDisabled(false);
		}
		
		if(recvData.get('jobNo')){//Load from WA Job
			//Amount Indirect:
			detailItem.set('loadAvQty', recvData.get('yardTruckQty'));
			detailItem.set('loadAvMt', recvData.get('yardTruckMt'));
			detailItem.set('loadAvM3', recvData.get('yardTruckM3'));
			detailItem.set('prevJobNo', recvData.get('prevJobNo'));
			detailItem.set('internalLorryNo', recvData.get('lorryNo'));
			detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
			detailItem.set('secondWgt', recvData.get('secondWgt'));
			detailItem.set('driverId', recvData.get('driverId'));

			refs.ctlBlGr.setHidden(true);
			me.getPackageNoList();
		}else{
//			if(!StringUtil.isNullorEmpty(detailItem.get('lorryNo'))) {
//				detailItem.set('externalLorryNo', detailItem.get('lorryNo'));
//				detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
//				detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
//				detailItem.set('secondWgt', recvData.get('secondWgt'));
//			}
			
			detailItem.set('externalLorryNo', recvData.get('lorryNo'));
			detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
			detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
		}

		//Amount Direct
		detailItem.set('loadGvQty', detailItem.get('balQty'));
		detailItem.set('loadGvMt', detailItem.get('balMt'));
		detailItem.set('loadGvM3', detailItem.get('balM3'));
		
		detailItem.set('loadBvQty', detailItem.get('balQty'));
		detailItem.set('loadBvMt', detailItem.get('balMt'));
		detailItem.set('loadBvM3', detailItem.get('balM3'));
		
		// Previous Date
//		me.prevDate['startDt'] = detailItem.get('startDt');
//		me.prevDate['endDt'] = detailItem.get('endDt');			
		
//		detailItem.set('shftNm', recvData.get('shftNm'));
//		detailItem.set('shftId', recvData.get('shftId'));
//		detailItem.set('shftDt', recvData.get('shftDt'));
		
		detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
		detailItem.phantom = false; // UPDATE
		detailItem.commit();
		me.getViewModel().setData({theDetail:detailItem});
		me.getView().recvData = detailItem;

		modeOfOprCombo.load();
		deliveryCombo.setData(masterItem.get('deliveryList'));
		cargoTypeCombo.setData(masterItem.get('cargoTypeList'));

		var delvTpCd = detailItem.get('delvTpCd');
		
		if(delvTpCd === 'I'){
			refs.ctlRadioAV.setValue(true);
			
			refs.refGV.setDisabled(true);
			refs.refBV.setDisabled(true);
			refs.refAV.setDisabled(false);
		}else{
			refs.refAV.setDisabled(true);
			refs.refGV.setDisabled(true);
			refs.refBV.setDisabled(true);
			
			if(CodeConstants.CGMST_TSPT_TP_SE == detailItem.get('tsptTpCd')) {
				refs.ctlRadioBV.setValue(true);
				refs.refBV.setDisabled(false);
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
		
		refs.ctlLoadBvMt.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);
		refs.ctlLoadBvM3.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);
		
		me.getDeployedEquipmentNoList();
	},
	
	getDeployedEquipmentNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		var store = me.getStore('deployedEquipmentNoList');
		var equipmentStore = me.getStore('confirmLoadingHatchList');
		var hatchStore = me.getStore('confirmLoadingHatchCombo');
		equipmentStore.load({
			params: {
				vslCallId 	: theDetail.get('vslCallId'),
				cgTpCd 		: ['DBE', 'DBN'].includes(theDetail.get('cgTpCd')) ? 'DBK' : 'BBK',
				workYmd 	: theDetail.get('workYmd'),
				shftId 		: theDetail.get('shftId')
			},
			callback: function (records, operation, success) {
				if (success) {
					for(i in records){
						var item;
						if(theDetail.get('cgTpCd') == 'DBE' || theDetail.get('cgTpCd') == 'DBN'){
							if(records[i].data.dbkOpHatchList != null && records[i].data.dbkOpHatchList.length > 0){
								item = records[i].data.dbkOpHatchList[0];
							}
						} else {
							if(records[i].data.bbkOpHatchList != null && records[i].data.bbkOpHatchList.length > 0){
								item = records[i].data.bbkOpHatchList[0];
							}
						}
					}
					
					store.load({
//						params: {
//							vslCallId : theDetail.get('vslCallId'),
//						},
						callback: function (records, operation, success) {
							if (success) {
								for(i in records){
									if(item){
										if(item.eqFacNo != null && item.eqFacNo != '' && records[i].data.scd == item.eqFacNo){
										refs.ctlConfirmLoadingEquiptment.setValue(records[i]);
										}
									
										if(item.hatchNo != null && item.hatchNo != ''){
											refs.ctlConfirmLoadingHatchNo.setValue(item.hatchNo);
										}
									}
								}
							}
						}
					});
				}
			}
		});

		// var packageStore = me.getStore('packageNoList');
		
		// var setChkPtyCdValue = '';
		// var cnt = 0;
		// var storeTotal = packageStore.data.items.length;
		// var selectArray = new Array();
		
		// packageStore.load({
		// 	params: {
		// 		vslCallId: theDetail.data.vslCallId,
		// 		shipgNoteNo: theDetail.data.shipgNoteNo,
		// 		grNo: theDetail.data.grNo,
		// 		jobPurpCd: theDetail.data.delvTpCd == 'D' ? 'GV' : 'AV'
		// 	}, 
		// 	callback: function(records, operation, success) {
		// 		if (success) {
					
		// 			var qty = 0;
		// 			var mt = 0;
		// 			var m3 = 0;
					
		// 			packageStore.each(function(record,idx){
		// 				if(packageStore.data.items.length > cnt){
		// 					if(setChkPtyCdValue === ''){
		// 						setChkPtyCdValue = record.get("packageNo")
		// 					} else {
		// 						setChkPtyCdValue += "," + record.get("packageNo")
		// 					}
							
		// 					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
		// 						vslCallId: record.get("vslCallId"),
		// 						mfDocId : record.get("mfDocId"),
		// 						refNo: record.get("refNo"),
		// 						pkgNo: record.get("packageNo")
		// 					});

		// 					qty += 1;
		// 					mt += Number(record.get("mt"));
		// 					m3 += Number(record.get("m3"));
							
		// 					selectArray.push(pkgItem.data);
		// 				}
		// 				cnt++;
		// 			});
		// 			me.packageItems = selectArray;
		// 			refs.cltPkgNo.setValue(setChkPtyCdValue);

		// 			if(refs.ctlRadioGV.checked){
		// 				theDetail.set('loadGvQty', qty);
		// 				theDetail.set('loadGvMt', mt);
		// 				theDetail.set('loadGvM3', m3);
		// 			} else if(refs.ctlRadioBV.checked){
		// 				theDetail.set('loadBvQty', qty);
		// 				theDetail.set('loadBvMt', mt);
		// 				theDetail.set('loadBvM3', m3);
		// 			} else if(refs.ctlRadioGA.checked){
		// 				theDetail.set('loadGaQty', qty);
		// 				theDetail.set('loadGaMt', mt);
		// 				theDetail.set('loadGaM3', m3);
		// 			} else if (refs.ctlRadioAV.checked) {
		// 				theDetail.set('loadAvQty', qty);
		// 				theDetail.set('loadAvMt', mt);
		// 				theDetail.set('loadAvM3', m3);
		// 			}
		// 		}
		// 	}
		// });
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail')
		
		if(targetControl === 'refYardTruck' || targetControl ==='ctlConfirmLoadingLorryNo'){
			if(returnValue) {
				detailItem.set('lorryNo',returnValue.item.get('lorryNo'));
				detailItem.set('gateTxnNo',returnValue.item.get('gateTxnNo'));
				detailItem.set('wbTransactionNo',returnValue.item.get('wbTransactionNo'));
			}
			else {
				detailItem.set('lorryNo', '');
				detailItem.set('gateTxnNo', '');
				detailItem.set('wbTransactionNo', '');
			}
		}
		else if(targetControl === 'cltPkgNo'){
			if(returnValue){
				var packageItems = new Array();
				var qty = 0;
				var mt = 0;
				var m3 = 0;
				
				for(var i = 0; i < returnValue.item.length; i++){
					var returnItem = returnValue.item[i];
					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
						vslCallId: returnItem.vslCallId,
						mfDocId : returnItem.mfDocId,
						refNo: returnItem.refNo,
						pkgNo: returnItem.packageNo
					});
					
					qty += 1;
					mt += Number(returnValue.item.at(i).mt);
					m3 += Number(returnValue.item.at(i).m3);
					
					packageItems.push(pkgItem.data);
				}
				
				if(refs.ctlRadioGV.checked){
					detailItem.set('loadGvQty', qty);
					detailItem.set('loadGvMt', mt);
					detailItem.set('loadGvM3', m3);
				} else if(refs.ctlRadioBV.checked){
					detailItem.set('loadBvQty', qty);
					detailItem.set('loadBvMt', mt);
					detailItem.set('loadBvM3', m3);
				} else if(refs.ctlRadioGA.checked){
					detailItem.set('loadGaQty', qty);
					detailItem.set('loadGaMt', mt);
					detailItem.set('loadGaM3', m3);
				} else if (refs.ctlRadioAV.checked) {
					detailItem.set('loadAvQty', qty);
					detailItem.set('loadAvMt', mt);
					detailItem.set('loadAvM3', m3);
				}
				
				me.packageItems = packageItems;
				refs.cltPkgNo.setValue(returnValue.code);
			} else{
				me.packageItems = new Array();
				refs.cltPkgNo.setValue();
			}	
		}else if(targetControl === 'btnDamage'){
			var {modifiedFileUploads, damageChecks, theDmg} = returnValue
			var uploadedFileDamageStore = me.getStore('uploadedFileDamageStore'),
				damageCheckDetail = me.getStore('damageCheckDetail')
				uploadedFileDamageStore.removeAll()
				damageCheckDetail.removeAll()

				uploadedFileDamageStore.setData(modifiedFileUploads)
				uploadedFileDamageStore.commitChanges()
				damageCheckDetail.setData(damageChecks)
				damageCheckDetail.commitChanges()
				me.getViewModel().set('theDmg', theDmg)
		}
	},	
	
	getPackageNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		
		var store = me.getStore('packageNoList');
		store.load({
			params:{
				vslCallId : recvData.get('vslCallId'),
				shipgNoteNo : recvData.get('shipgNoteNo'),
				ixCd: 'X',
				jobPurpCd: 'AV',
				jobNo: recvData.get('jobNo')
			},
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.packageItems = new Array();
						var pkgNo = '';
						for(var i = 0; i < record.length; i++){
							var returnItem = record[i];
							var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
								vslCallId: returnItem.get('vslCallId'),
								mfDocId : returnItem.get('mfDocId'),
								refNo: returnItem.get('refNo'),
								pkgNo: returnItem.get('packageNo')
							});
							me.packageItems.push(pkgItem.data);
							if(pkgNo == '') {
								pkgNo = returnItem.get('packageNo');
							} else {
								pkgNo = pkgNo + ', ' + returnItem.get('packageNo');
							}
						}
						refs.cltPkgNo.setValue(pkgNo);
					}
				}
			}
		});
	},

	// operationSeting
	operationSeting : function(startDtStr, endDtStr){
		var me = this;
     	var recvData = me.prevData;
     	var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');

		if (startDtStr && endDtStr) {
		    theDetail.set('startDt', new Date(startDtStr));
		    theDetail.set('endDt', new Date(endDtStr));
		} else {
		    theDetail.set('startDt', null); 
		    theDetail.set('endDt', null); 
		}

		/*if(recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK &&  recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_DBN &&  recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_LQN){
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', recvData.get('cgTpCd'));
			var window = me.getView().up('window');
			window.close();

		}*/

		if (recvData.get('cgTpCd') === CodeConstants.MT_CGTP_DBN){
			refs.ctlConfirmLoadingPacTypeCode.setAllowBlank(true);
			
		}else if(recvData.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){	
			refs.ctlConfirmLoadingPacTypeCode.setAllowBlank(false);
		}
	},
	
	validateAndAdjustDate: function(dateStr, operation = null, unit = null, amount = 0, dateFormat = "DD/MM/YYYY") {
	    let day, month, year;
	    
	    if(dateFormat === "DD/MM/YYYY"){
	    	[day, month, year] = dateStr.split("/").map(Number);
	    } else if (dateFormat === "YYYYMMDD") {
	        year = Number(dateStr.slice(0, 4));
	        month = Number(dateStr.slice(4, 6));
	        day = Number(dateStr.slice(6, 8));
	    }
	    
	    // Check if the date parts are valid numbers
	    if (isNaN(day) || isNaN(month) || isNaN(year)) {
	        return false;
	    }

	    // JavaScript months are 0-based, so we subtract 1 from the month
	    let date = new Date(year, month - 1, day);

	    // Validate the initial date
	    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
	        return false;
	    }

	    // Perform the adjustment if the operation is provided
	    if (operation && unit && amount) {
	        switch (unit) {
	            case "day":
	                date.setDate(date.getDate() + (operation === "increase" ? amount : -amount));
	                break;
	            case "month":
	                date.setMonth(date.getMonth() + (operation === "increase" ? amount : -amount));
	                break;
	            case "year":
	                date.setFullYear(date.getFullYear() + (operation === "increase" ? amount : -amount));
	                break;
	            default:
	                return false;
	        }
	    }

	    // Format the adjusted date back to DD/MM/YYYY
	    const adjustedDay = String(date.getDate()).padStart(2, '0');
	    const adjustedMonth = String(date.getMonth() + 1).padStart(2, '0');
	    const adjustedYear = date.getFullYear();

	    return `${adjustedMonth}/${adjustedDay}/${adjustedYear}`;
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	
     	var dateStr = recvData.get('shftDtFromCbbx');
        var shift = recvData.get('shftCdFromCbbx');
        if (shift) {
        	if(shift.includes('1ST')){
            	var start = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 07:00';
            	var end = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 14:59';
            } else if(shift.includes('2ND')){
            	var start = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 15:000';
            	var end = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 22:59';
            } else if (shift.includes('3RD')){
            	var start = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 23:00';
            	var end = me.validateAndAdjustDate(dateStr, "increase", "day", 1, "YYYYMMDD") + ' 06:59';
            }
        }
           
        //Get shift from Shift Date combo box:
        var startDate = '';
		var endDate = '';
        if (start != null && start !== '') {
			startDate = Ext.Date.format(new Date(start), 'm/d/Y H:i');
		}
		if (end != null && end !== '') {
			endDate = Ext.Date.format(new Date(end), 'm/d/Y H:i');
		}
		
    	var params = {
			vslCallId 			: recvData.get('vslCallId'),
			grNo 				: recvData.get('grNo'),
			cgNo 				: recvData.get('cgNo'),
			stat 				: recvData.get('stat'),
			cgTpCd 				: recvData.get('cgTpCd'),
			startDtStr			: startDate,
            endDtStr			: endDate,
			shipgNoteNo 		: recvData.get('shipgNoteNo'),
			gateTxnNo			: recvData.get('gateTxnNo'),
			delvTpCd 			: recvData.get('delvTpCd'),
			workYmd 			: dateStr,
			shftId				: recvData.get('shftIdFromCbbx')
		};
    	
    	return params;
	},
	
	// Search Pipline Condition
	getSearchPiplineCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
		var crrDate = Ext.Date.format(new Date(), 'd/m/Y H:i');  //Auto Detect shift:

    	var params = {
			vslCallId : recvData.get('vslCallId'),
			grNo : refs.ctlPiplineGrNo.getValue(),
			cgNo : recvData.get('cgNo'),
			stat : recvData.get('stat'),
			cgTpCd : recvData.get('cgTpCd'),
			startDtStr: crrDate,
			shipgNoteNo : recvData.get('shipgNoteNo'),
			gateTxnNo: recvData.get('gateTxnNo'),
			delvTpCd : recvData.get('delvTpCd')
		};
    	
    	return params;
	},

	// continueLoading
	continueLoading : function(isOk){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if (isOk === 'ok') {
			detailItem.set('fnlOpeYn', 'Y');
		}
		
		me.cudFunction();
	},
	
	// Question Message - CudFunction
	questionCudFunction: function(msg){
		var me = this;
		
		MessageUtil.question('info_msg', msg, null,
			function(button){
				if(button === 'ok'){
					me.cudFunction();
				}
			}
		);
	},
	
	// Save Process - save
	save : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.prevData;

		var actMTLoad = detailItem.get('accuSumWgt');
		var actQtyLoad = detailItem.get('accuSumQty');	
		var actM3Load = detailItem.get('accuSumMsrmt');	
		var dcMT = detailItem.get('snMt');
		var dcQty = detailItem.get('snQty');	
		var dcM3 = detailItem.get('snM3');
		var isLoadingMT = detailItem.get('loadMt');
		var isLoadingQty = detailItem.get('loadQty');	
		var isLoadingM3 = detailItem.get('loadM3');
		
		if ((((actM3Load + isLoadingM3) >= dcM3 && dcM3 > 0) || ((actMTLoad + isLoadingMT) >= dcMT && dcMT > 0)  || ((actQtyLoad + isLoadingQty) >= dcQty && dcQty > 0 ))  &&
			( detailItem.get('fnlOpeYn') === 'N')){
			
			if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_DBN){
				MessageUtil.question('info_msg', 'balValidation_msg', null,
						function(button){
							if(button == 'ok'){
								MessageUtil.question('info_msg', 'confirmloading_final_loading_continue_loading_msg', null, 
										function(button){
											me.continueLoading(button);
										}
									);
							}
				});
			}
			else {
				MessageUtil.question('info_msg', 'confirmloading_final_loading_continue_loading_msg', null, 
						function(button){
							me.continueLoading(button);
						}
					);
			}
			
			return;
		 }
		
		if(!me.allAmountValidation()){
			return;
		}

		me.cudFunction();
	},

	setLoadingAmt: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

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

		}else if(refs.ctlRadioGA.getValue()){// Direct Gate to Apron
			loadMt = refs.ctlLoadGaMt.getValue();
			loadM3 = refs.ctlLoadGaM3.getValue();
			loadQty = refs.ctlLoadGaQty.getValue();
			jobPurpCd = 'GA';
			lorryNo = detailItem.get('externalLorryNo');

		}else if(refs.ctlRadioAV.getValue()){//Apron to Vessel
			loadMt = refs.ctlLoadAvMt.getValue();
			loadM3 = refs.ctlLoadAvM3.getValue();
			loadQty = refs.ctlLoadAvQty.getValue();
			jobPurpCd = 'AV';
			lorryNo = detailItem.get('internalLorryNo');
		}else if(refs.ctlRadioBV.getValue()){//Barge to Vessel
			loadMt = refs.ctlLoadBvMt.getValue();
			loadM3 = refs.ctlLoadBvM3.getValue();
			loadQty = refs.ctlLoadBvQty.getValue();
			jobPurpCd = 'BV';
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
		var detailItem = me.getViewModel().get('theDetail');
		
		var startDtStr = Ext.Date.format(detailItem.get('startDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDtStr = '';

		var crrDateTime =  new Date();
		var shftDtStr = endDtStr = Ext.Date.format(crrDateTime, 'Ymd');
		if(detailItem.get('endDt')){
			endDtStr = Ext.Date.format(detailItem.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());// "d/m/Y"
		}else{
			endDtStr = Ext.Date.format(crrDateTime, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}

		// Forklift & Prime Mover
		if(refs.ctlConfirmDischargingForklift.getValue() != '' || refs.ctlConfirmDischargingForklift.getValue() != null) {
			detailItem.set('forkliftNo', refs.ctlConfirmDischargingForklift.getValue());
		}
		
		if(refs.ctlConfirmDischargingPrime.getValue() != '' || refs.ctlConfirmDischargingPrime.getValue() != null) {
			detailItem.set('primeNo', refs.ctlConfirmDischargingPrime.getValue());
		}
		
		detailItem.set('startDtStr', startDtStr); 
		detailItem.set('endDtStr', endDtStr); 
		detailItem.set('shftDt', shftDtStr); 
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set('packageItems', me.packageItems);
		detailItem.set('hangingScaleItems', me.hangingScaleItems);
	},
	
	saveWithNoRelease: function(detailItem){
		var me = this;
		
		if(StringUtil.isNullorEmpty(detailItem.get('hatchNo'))){
			MessageUtil.warning('warning_msg', 'confirmloading_hatch_no_empty_msg');
			return;
		}

		if(!me.allAmountValidation()){
			return;
		} else {
			me.save();
		}
	},
	

	// cudFunction
	cudFunction : function() {
		var me = this;
		var window = me.getView().up('window');
		var detailItem = me.getViewModel().get('theDetail');
		var damageCheckDetail = me.getStore('damageCheckDetail')
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(records, operation, success) {
				if (success) {
					me.saveDimension(records);
					// me.saveDamage(records);
					if(damageCheckDetail.getCount() > 0){
						me.checkDamageCheck(records)
					}else{
						detailItem.commit();
						MessageUtil.saveSuccess(); // Success Message
						
						var parentView = me.getParentView();
						if(parentView.getController().onSearch){
							
							if(parentView.getController().onCallBackFromOperationScreen){
								parentView.getController().onCallBackFromOperationScreen();
							}
							parentView.getController().onSearch();
						}
						me.getViewModel().get('theSearch').set('lorryNo', '');
						window.close(); 
					}
				}
			}
		});
		
	},
	
	
	checkDamageCheck: function(insertedJob){
		var me = this,
		refs = me.getReferences(),
		uploadedFileDamageStore = me.getStore('uploadedFileDamageStore'),
		damageCheckDetail = me.getStore('damageCheckDetail'),
		frm = refs.fileForm,
		formData = new FormData(frm)		
		
		damageCheckDetail.each(function(record) {
			if(record.data.workingStatus === WorkingStatus.INSERT){
				record.data.jobNo = insertedJob.data.jobNo
			}
		});
		damageCheckDetail.commitChanges()
		if(uploadedFileDamageStore.getCount() > 0){
			uploadedFileDamageStore.each(function(record, index){
				if(record.get('workingStatus') === WorkingStatus.INSERT){
					formData.append(record.data.fileName, record.data.fileStream);
				}
			});
			me.fileDamageCheckUpload(formData);
		} else {
			me.saveDamageCheckProcess(); 
		}
	},

	fileDamageCheckUpload : function(formData) {
		var me = this;
		var uploadedFileDamageStore = me.getStore('uploadedFileDamageStore')
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function() {
    		if(xhr.status === 200) {
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			uploadedFileDamageStore.each(function(record, index, array) {
					if(record.get('workingStatus') === WorkingStatus.INSERT){
						record.set('ufileName', rtnData[record.get('fileName')]);
					}
    	    	});
				uploadedFileDamageStore.commitChanges()
                me.saveDamageCheckProcess();
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    	});
    	
    	xhr.open('POST',MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
	},

	saveDamageCheckProcess: function () {
        var me = this,
			refs = me.getReferences(),
			window = me.getView().up('window'),
			theDamageStore = me.getStore('theDamageStore'),
			currentUploadStore = me.getStore('uploadedFileDamageStore'),
			damageCheckDetailStore = me.getStore('damageCheckDetail'),
			detailItem = me.getViewModel().get('theDmg'),
			sendArray = new Array(),
			uploadList = new Array()
		;

		damageCheckDetailStore.data.items.forEach(item => {
			sendArray.push(item.data)
		})

		if(currentUploadStore.data.length > 0) {
			for(var i = 0; i < currentUploadStore.data.length; i++) {
				var uploadItem = currentUploadStore.data.items[i];
				var recordUpload = Ext.create('MOST.model.common.FileUpload');
				recordUpload.set('ufileName', uploadItem.get('ufileName'));
				recordUpload.set('pgmId', 'mpct239');
				recordUpload.set('fileName', uploadItem.get('fileName'));
				recordUpload.set('fileSize', uploadItem.get('fileSize'));
				recordUpload.set('fileStream', null);
				recordUpload.set('workingStatus', uploadItem.get('workingStatus'));
				recordUpload.set('catgCd', uploadItem.get('catgCd'))
				uploadList.push(recordUpload.data);
			}
			
		}

		var proxy = detailItem.getProxy();
		proxy.url = theDamageStore.getProxy().url;
		detailItem.phantom = false;
		detailItem.set("items", sendArray);
		detailItem.set('uploadItems', uploadList);
		detailItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		detailItem.save({
			success : function(records,success){
				MessageUtil.saveSuccess(); // Success Message
				
				var parentView = me.getParentView();
				if(parentView.getController().onSearch){
					
					if(parentView.getController().onCallBackFromOperationScreen){
						parentView.getController().onCallBackFromOperationScreen();
					}
					parentView.getController().onSearch();
				}
				me.getViewModel().get('theSearch').set('lorryNo', '');
				window.close();
			}
		});
		
    },

	saveDimension : function(obj){
		var me = this;
		var refs = me.getReferences();
		var dimensionStore = me.getStore(me.DIMENSION_STORE);
		if(dimensionStore.data.length > 0){
			var item = dimensionStore.data.items[0];
			if(obj){
				item.set('jobNo', obj.get('jobNo'))
			}
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = dimensionStore.getProxy().url;
			updateParm.phantom = true;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('item', item.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						
					}
				}
			});
		}
	},
	
	saveDamage : function(obj){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore(me.DAMAGE_STORE);
		
		if(damageStore.data.length > 0){
			var insertItem = damageStore.data.items[0];
			var isCreated = true;
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			if(obj){
				insertItem.set('jobNo', obj.get('jobNo'))
			}
			
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
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD START
	 */
	//Prev Save Check - okSaveButton
	//1-Mandatory check
	prevSaveCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		//Terminal Hold
		if(Token.getTmnlHoldChk() === 'Y') {
			me.onTerminalHoldValidation();
		} else {
			me.onPassedTerminalHoldValidation();
		}
	},
	
	//2-Terminal Hold check
	onTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('shipgNoteNo'),
				col3: CodeConstants.TMNL_HOLD_CLD
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
	
	onPassedTerminalHoldValidation : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');

		if(detailItem.get('domesticChk') == 'N' && Token.getCustomHoldChk() == 'Y'){
			me.onCustomsHoldValidation();
		}else{
			me.onPassedCustomsHoldValidation();
		}
	},
	
	//03: CUSTOMS RELEASED VALIDATION
	onCustomsHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore('validationCheck');
		
		store.load({
			params : {
				tyCd: 'CUSTOMS_RELEASED_VALIDATION',
				col1: detailItem.get('vslCd'),
				col2: detailItem.get('mfDocId'),
				col3: 'E'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					/* PPSB_MOST_CUSP_Operation - GAP ID: OPR-20 */
					var isCustomBlockProcess = 'N'
					if(records.length === 0 || (records[0].get('isValidated') !== 'Y')){
						if(isCustomBlockProcess === 'Y'){
							MessageUtil.warning('warning_msg', 'confirmdischarging_clearance_blockprocess_msg');
						}else{
							MessageUtil.question('info_msg', 'confirmhandlingout_clearance_msg', null,
								function(button){
									if(button == 'ok'){
										me.onPassedCustomsHoldValidation();
									}
								}
							);
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
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('jobPurpCd') === 'AV' || detailItem.get('jobPurpCd') === 'GV') {
			me.onWeightingScaleValidation();
		}
		else {
			me.onPassedWeightingScaleValidation();
		}
	},
	
	//04: WEIGHTING SCALE VALIDATION
	//AV job: 2nd scaled Internal truck
	//VG job: 1st scaled External truck 
	//**Result: N - has been done 2 times scaling/ Y: just passed 1st time scaling
	onWeightingScaleValidation: function (){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(!StringUtil.isNullorEmpty(detailItem.get('wbTransactionNo'))) {
			var store = me.getStore('validationCheck');
			var params = {
				tyCd: '2ND_WEIGHTED_VALIDATION',
				col1: detailItem.get('wbTransactionNo')
			};
			store.load({
				params : params,
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							if(detailItem.get('jobPurpCd') === 'AV'){
								
								if(records[0].get('isValidated') == 'N'){
									me.onPassedWeightingScaleValidation();
								}
								else {
									MessageUtil.question('info_msg', 'truckValidation_msg03', null,
											function(button){
												if(button == 'ok'){
													me.onPassedWeightingScaleValidation();
												}
											}
										);
								}
							}
							else if(detailItem.get('jobPurpCd') === 'GV'){
								
								if(records[0].get('isValidated') == 'Y'){
									me.onPassedWeightingScaleValidation();
								}
								else {
									MessageUtil.question('info_msg', 'truckValidation_msg01', null,
											function(button){
												if(button == 'ok'){
													me.onPassedWeightingScaleValidation();
												}
											}
										);
								}
							}
							else {
								me.onPassedWeightingScaleValidation();
							}
						}
						else {
							me.onPassedWeightingScaleValidation();
						}
					}
				}
			});
		}
		else {
			me.onPassedWeightingScaleValidation();
		}
	},
	
	onPassedWeightingScaleValidation: function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		me.save();
	},
	
	// allAmountValidation
	allAmountValidation:function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(!StringUtil.isNullorEmpty(detailItem.get('delvTpCd')) &&
		  (detailItem.get('delvTpCd') !== 'D' || (detailItem.get('delvTpCd') === 'D' && me.booleanDirSpr))){
			return me.amtInDVal();
		} else {
			return me.amtDirectVal();
		}
	},
	
	// amtInDVal
	amtInDVal : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');


		if(!me.checkInDirectBalanceAmt())
			return false;
		return true;
	},

	checkInDirectBalanceAmt: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var loadQty = loadMt = balQty = balMt = 0;

		if(refs.ctlRadioAV.getValue()){//Direct Apron to Vessel
			loadQty = Number(detailItem.get('loadAvQty'));
			loadMt = Number(detailItem.get('loadAvMt'));
			loadM3 = Number(detailItem.get('loadAvM3'));

			balQty = Number(detailItem.get('avBalQty'));			
			balMt = Number(detailItem.get('avBalMt'));
			balM3 = Number(detailItem.get('avBalM3'));
		}

		//BBK: Check base on Qty
		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
			if(!loadQty || loadQty == 0){
				MessageUtil.warning('warning_msg', 'confirmloading_qty_zero_msg');
				return false;
			}
			if(loadQty > balQty){
				MessageUtil.warning('warning_msg', 'confirmloading_qty_over_msg');
				return false;
			}
			
			//Validate with package items
			if(me.packageItems.length > 0){
				if(loadQty != me.packageItems.length){
					MessageUtil.warning('warning_msg', 'packageItemValidationMsg'); // CT1210060012
					return false;
				}
			}
		}		
		/*
		DBN: Check base on MT
		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_DBN){
			if(!loadMt || loadMt == 0){
				MessageUtil.warning('warning_msg', 'confirmloading_mt_zero_msg');
				return false;
			}
			
			//Additional Check
			if(detailItem.get('additionalCheckYn') && detailItem.get('additionalCheckYn') != 'Y') {
				if(loadMt > balMt || loadM3 > balM3 || loadQty > balQty){
					MessageUtil.warning('warning_msg', 'confirmloading_over_bal_amt_msg');
					return false;
				}
			}
			
		}
		*/
		return true;
	},
	
	// amtDirectVal
	amtDirectVal : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');

		if(!me.checkDirectBalanceAmt()){
			return;
		}
		return true;
	},

	checkDirectBalanceAmt: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var eachMt = detailItem.get('eachMt');
		var eachM3 = detailItem.get('eachM3');
		
		var loadQty = loadMt = balQty = balMt = 0;
		
		if(refs.ctlRadioGV.getValue()){//Direct Gate to vesel
			loadQty = Number(detailItem.get('loadGvQty'));
			loadMt = Number(detailItem.get('loadGvMt'));
			loadM3 = Number(detailItem.get('loadGvM3'));

			balQty = Number(detailItem.get('balQty'));
			balMt = Number(detailItem.get('balMt'));
			balM3 = Number(detailItem.get('balM3'));			
		}else if(refs.ctlRadioGA.getValue()){// Direct Gate to Apron
			loadQty = Number(detailItem.get('loadGaQty'));
			loadMt = Number(detailItem.get('loadGaMt'));
			loadM3 = Number(detailItem.get('loadGaM3'));
			
			balMt = Number(detailItem.get('balMt'));
			balQty = Number(detailItem.get('balQty'));
			balM3 = Number(detailItem.get('balM3'));
		}else if(refs.ctlRadioAV.getValue()){//Direct Apron to Vessel
			loadQty = Number(detailItem.get('loadAvQty'));
			loadMt = Number(detailItem.get('loadAvMt'));
			loadM3 = Number(detailItem.get('loadAvM3'));
			
			balMt = Number(detailItem.get('avBalMt'));
			balQty = Number(detailItem.get('avBalQty'));
			balM3 = Number(detailItem.get('avBalM3'));
		}else if(refs.ctlRadioBV.getValue()){//Direct Barge to Vessel
			loadQty = Number(detailItem.get('loadBvQty'));
			loadMt = Number(detailItem.get('loadBvMt'));
			loadM3 = Number(detailItem.get('loadBvM3'));
			
			balQty = Number(detailItem.get('balQty'));
			balMt = Number(detailItem.get('balMt'));
			balM3 = Number(detailItem.get('balM3'));
		}


		//BBK: Check base on Qty
		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
			if(!loadQty || loadQty == 0){
				MessageUtil.warning('warning_msg', 'Quantity should be greater than zero');
				return false;
			}
			if(loadQty > balQty){
				MessageUtil.warning('warning_msg', 'Quantity can’t exceed the quantity in Balance Amount');
				return false;
			}
			
			//Validate with package items
			if(me.packageItems.length > 0){
				if(loadQty != me.packageItems.length){
					MessageUtil.warning('warning_msg', 'packageItemValidationMsg'); // CT1210060012
					return false;
				}
			}
		}		
		//DBN: Check base on MT
//		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_DBN){
//			if(!loadMt || loadMt == 0){
//				MessageUtil.warning('warning_msg', 'MT should be greater than zero');
//				return false;
//			}
//			//Additional Check
//			if(detailItem.get('additionalCheckYn') && detailItem.get('additionalCheckYn') != 'Y') {
//				if(loadMt > balMt || loadM3 > balM3 || loadQty > balQty){
//					MessageUtil.warning('warning_msg', 'MT and M3 can’t exceed the Balance Amount');
//					return false;
//				}
//			}	
//		}
		return true;
	},
	
	// endTimeCheck
	endTimeCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('gatePassYn') === 'Y'){
			if(detailItem.get('endDt') == null){
				MessageUtil.warning('warning_msg', 'confirmloading_input_endtime_msg');
				return false;
			}
		}
		
		return true;
	},

	onSelectEquiptment: function(ctl){
		var me = this;
		var refs = me.getReferences();

		
		if(ctl.reference === 'ctlConfirmLoadingEquiptment'){
			if(ctl.getValue() == 'PIPLINE 01'){
				refs.refConfirmLoadingModeOfOpr.setValue('PL');
			}
		}
	},
	
	onSelectPiplineGrNo: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('confirmLoading');
		var params = me.getSearchPiplineCondition();
		params['shftDt'] = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
//						me.setDetailInitialize(record[0]);
//						me.operationSeting();
					}
				}
			}
		});
	}
	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD END
	 */

});