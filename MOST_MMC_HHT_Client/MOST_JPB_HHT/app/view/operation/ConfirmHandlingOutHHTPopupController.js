Ext.define('MOST.view.operation.ConfirmHandlingOutHHTPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.confirmhandlingouthhtpopup',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 * 
	 */
	FORM_REF: 'refValidateHOForm',
	CARGO_HANDLING_OUT_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargohandlingout/cargohandlingout',
	norManualFlag : false,
	autoNorLocFlag : false,
	amtNorFlag : false,
	autoLocFlag : false,
	empNorLocCount : false,
	amtOverNorLoc : false,
	autoPartialFlag : false,
	
	prevWhItems : new Array(),
	CUST_RELEASE: 'RELEASE', //CUSTOMS MODE
	CUST_HOLD: 'HOLD', //CUSTOMS MODE
	DAMAGE_STORE: 'damageStore',
	DIMENSION_STORE: 'dimensionStore',
	UPLOAD_STORE: 'uploadStore',
	prevData:null,
	
	packageItems : new Array(),
	whType: '',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoadHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('confirmHandlingOut');
		var params = me.getSearchHHTCondition();	

		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){					
					if(record != null && record.length > 0){						
						me.setDetailInitializeHHT(record[0]);
					}
				}
			}
		});
		
		//theDetail is null when load ConfirmHandlingOut
		me.getViewModel().setData({theDetail:me.getView().recvData});
		
		//Lorry no is null when handling out in import tab
		if(me.getViewModel().get('theDetail').get('lorryNo') == null || me.getViewModel().get('theDetail').get('lorryNo') == ''){
			me.getViewModel().get('theDetail').set('lorryNo', me.getViewModel().get('theDetail').get('truckNo'));
		}
		refs.refTxtLorryNo.setValue('1102-EX')
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var lorrysPopupStore = me.getStore('confirmHandlingOutAssignmentLorrysPopup');
		var gridStore = me.getStore('lorryListPopup');
		var lorryNoList = [];
		var list = gridStore.data.items
		var myFrom = refs.refValidateHOForm.validate();
		if(!myFrom){
			Ext.Msg.alert('Validate', 'You are missing requires field');
			return ;
		}
		
		//Bonded WH validation
		if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
			me.onBondedWhValidation();
		}
		else {
			me.prevSaveCheck();
		}
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
       	window.close();
	},

	//Change Qty event:
	onChangeQty: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');
		var aprBalQty = detailItem.get('balQty');
		var aprBalMt = detailItem.get('balMt');
		var aprBalM3 = detailItem.get('balM3');
		var qty = Number(refs.ctlLoadQty.getValue());

		//Check Over Balance:
		if (!me.checkOverBalance(ctl, newValue)) {
			MessageUtil.warning('warning_msg', 'confirmhandlingoutg_qty_exceed_msg');

			ctl.suspendEvents();
			ctl.setValue(oldValue);
			ctl.resumeEvents();

			return;
		}

		//Start Auto Calculate with BBK:
		if (cgTpCd !== 'BBK' && cgTpCd !== 'RBK') {
			//me.autoDeAllocation();

		} else {
			if (qty == 0) {
				refs.ctlLoadMt.setValue(0);
				refs.ctlLoadM3.setValue(0);

			} else {
				var whMt = 0, whM3 = 0;
				if (newValue === aprBalQty) {
					whMt = aprBalMt;
					whM3 = aprBalM3;
				} else {
					var eachWgt = detailItem.get('eachWgt');
					var eachMsrmt = detailItem.get('eachVol');
					var inputQty = Number(newValue);

					whMt = Number(eachWgt * inputQty).toFixed(3);
					whM3 = Number(eachMsrmt * inputQty).toFixed(3);
				}

				//End Auto Calculate with BBK./
				detailItem.set('whWgt', whMt);
				detailItem.set('whM3', whM3);

				refs.ctlLoadMt.setValue(whMt);
				refs.ctlLoadM3.setValue(whM3);

				//me.autoDeAllocation();
			}
		}
	},

	onFocusLeaveQty: function (ctl, event, eOpts ) {
		var me = this;
		
		if(!!ctl.getValue() && ctl.getValue() > 0){
			me.autoDeAllocation();
		}
	},

	onChangeMt: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		if (cgTpCd === 'BBK') {//MT is auto calculate in BBK
			return;
		}

		//Check Over Balance:
		if (!me.checkOverBalance(ctl, newValue)) {
			MessageUtil.warning('warning_msg', 'confirmhandlingout_mt_exceed_msg');

			ctl.suspendEvents();
			ctl.setValue(oldValue);
			ctl.resumeEvents();

			return;
		}
	},

	onChangeM3: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences(ctl, newValue);
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		if (cgTpCd === 'BBK') {//M3 is auto calculate in BBK
			return;
		}

		//Check Over Balance:
		if (!me.checkOverBalance(ctl)) {
			MessageUtil.warning('warning_msg', 'confirmhandlingout_m3_exceed_msg');

			ctl.suspendEvents();
			ctl.setValue(oldValue);
			ctl.resumeEvents();

			return;
		}
	},
	
	onSearchUnsetPopupHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		if(refs.ctlLoadMt.getValue() <= 0 && refs.ctlLoadM3.getValue() <= 0 && refs.ctlLoadQty.getValue() <= 0){
			MessageUtil.warning('warning_msg', 'confirmdischarging_input_amount_msg');
				return;
		}

		var params = {
				totMt: refs.ctlLoadMt.getValue(),
				totM3: refs.ctlLoadM3.getValue(),
        		totQty: refs.ctlLoadQty.getValue(),
        		cgNo: detailItem.get('cgNo'),
        		whTpCd: 'G',
        		vslCallId: detailItem.get('vslCallId'),
				title: 'W/H - UnSet Location',
				isGeneralCg: true,
				isSpareCg: false
		};		
		ViewUtil.openHhtPopup(this, 'app-wcunsetpopuphht', 'HandlingOutUnsetLocIdHHT', params);
		
	},
	
	checkOverBalance: function (ctl, newValue) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var whBalQty = detailItem.get('balQty');
		var whBalMt = detailItem.get('balMt');
		var whBalM3 = detailItem.get('balM3');

		if (!newValue) {
			newValue = 0;
		}

		if (ctl.reference === 'ctlLoadQty' 
			&& newValue > whBalQty
			&& detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_BBK) {
			return false;
		}
		
		return true;
	},

	// WarehouseAllocation
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		if(	refs.ctlLoadMt.getValue() <= 0 &&
			refs.ctlLoadM3.getValue() <= 0 &&
			refs.ctlLoadQty.getValue()<= 0){
				
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please input location amount',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			return;
		}

		selection = Ext.create('MOST.model.operation.CargoHandlingOut', {
			vslCallId: detailItem.get('vslCallId'),
			whTpCd:'G',
			cgNo: refs.ctlBlGr.getValue(),
			grMt: refs.ctlLoadMt.getValue(),
			grM3: refs.ctlLoadM3.getValue(),
			grQty: refs.ctlLoadQty.getValue(),
			catgCd : detailItem.get('catgCd'),
			title: 'W/H De-Allocation'
		});

		me.openCodePopup('app-warehouseallocation', controlName, selection);		
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(targetControl === 'HandlingOutUnsetLocIdHHT'){
			var detailItem = me.getViewModel().get('theDetail');
			if(returnValue){
				detailItem.set('locId',returnValue.locId);
				var whItems = new Array();
				for(var i = 0; i < returnValue.arrWHLocation.items.length; i++){
					var invLocItem = returnValue.arrWHLocation.items[i];
					var handlingOutItemHHT = Ext.create('MOST.model.configuration.WhConfiguration', {
						locTpCd: invLocItem.data.locTpCd,
						whId: invLocItem.data.whId,
						locId : invLocItem.data.locId,
						vslCallId : invLocItem.data.vslCallId,
						cgNo : invLocItem.data.cgNo,
						wgt: invLocItem.data.wgt,
						msrmt: invLocItem.data.msrmt,
						pkgQty: invLocItem.data.pkgQty,
						whTpCd : invLocItem.data.whTpCd,
						whTpCdNm : invLocItem.data.whwhTpCdNmId,
						spCaCoCd :''
					});
					whItems.push(handlingOutItemHHT.data);
					me.whType = invLocItem.data.locTpCd;
				}
				me.prevWhItems = whItems; 
			} else {
				detailItem.set("locId","");
				me.whType = '';
			}
		}else if(targetControl === 'ConfirmHandlingOutWhAllocationHHT'){
			refs.ConfirmHandlingOutPkgTyCodeHHT.setValue(returnValue.code);
		}
		else if(targetControl === 'refTxtLorryNo'){
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
		else if(targetControl === 'refTxtPkgNo'){
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
				refs.refTxtPkgNo.setValue();
			}
		}
		else{
			var control = me.lookupReference(targetControl);
			control.setValue(returnValue.data.locId);
			
			var whItems = new Array();
			for(var i = 0; i < returnValue.data.whConfigurationMap.data.items.length; i++){
				var invLocItem = returnValue.data.whConfigurationMap.data.items[i];
				var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
					whId: invLocItem.data.whId,
					locId : invLocItem.data.locId,
					vslCallId : invLocItem.data.vslCallId,
					cgNo : invLocItem.data.cgNo,
					wgt: invLocItem.data.wgt,
					msrmt: invLocItem.data.msrmt,
					pkgQty: invLocItem.data.pkgQty,
					whTpCd : invLocItem.data.whTpCd,
					whTpCdNm : invLocItem.data.whwhTpCdNmId,
					spCaCoCd :''
				});
				whItems.push(handlingItem.data);
			}
			me.prevWhItems = whItems;
		}
	},
	
	onBindingAmoutnByPackageItems: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var mt = 0, m3 = 0, qty = 0;
		
		if(returnValue.item.length > 0){
			for (var i=0; i<returnValue.item.length; i++){
				mt += Number(returnValue.item[i].get('mt'));
				m3 += Number(returnValue.item[i].get('m3'));
				qty++;
			}
		}
		
		refs.ctlLoadQty.setValue(qty);
		refs.ctlLoadMt.setValue(mt);
		refs.ctlLoadM3.setValue(m3);
	},
	
	searchDetailLorry(returnValue) {
		var me = this;
		var store = me.getStore('BLSNNoDetail');
		
		store.load({
			params: {
				searchType : 'chgBlNo',
				vslCallId : returnValue.get('vslCallId'),				
				blNo : returnValue.get('blNo')
			},
			
			callback:function(records,success){
				if (success) {
					//me.getViewModel().set('theLorryDetail',records[0]);
				}
			}
		});
	},
	
	getSearchHHTCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var cgInOutCd = 'O'; 

     	if(recvData.get('caTyCd') === 'IM'){
     		cgInOutCd = 'O';
     	} else if(recvData.get('caTyCd') === 'EX'){
     		cgInOutCd = 'I';
     	}
     	
    	var params = {
			vslCallId : recvData.get('vslCallId'),
			blNo : recvData.get('blNo'),
			grNo : recvData.get('grNo'),
			cgNo : recvData.get('cgNo'),
			cgInOutCd : cgInOutCd,
			lorryId : recvData.get('lorryId'),
			shftId : recvData.get('shftId'),
			shftDt : recvData.get('shftDt'),
			cgTpCd : recvData.get('cgTpCd')
		};
    	
    	return params;
	},
	
	setDetailInitializeHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var workDate = MOST.config.Token.getWorkDate();
		var cargoTypeCombo = me.getStore('confirmHandlingOutForCargoTypeCombo');
		
		if(masterItem.getData().items.length > 0){
			
			var detailItem = new Ext.create('MOST.model.operation.CargoHandlingOut');
			DateUtil.convertDateToLong(masterItem.getData(), ['hdlOutStDt', 'hdlOutEndDt']); // date to long
			detailItem.data = masterItem.getData().items[0];
			detailItem.set('shftId', recvData.get('shftId'));
			detailItem.set('shftNm', recvData.get('shftNm'));
			
			var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
			refs.HandlingOutHHTSDt.setValue(currentTime);
			
			detailItem.set('startDt' ,currentTime);
	     	detailItem.set('endDt' , '');
	     	
	     	detailItem.set('lorryNo', recvData.get('lorryNo'));
	     	detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
	     	detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
			
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theDetail:detailItem});
			
			cargoTypeCombo.setData(masterItem.get('cargoTypeList'));
		}	
		
	},
	
	onOpenTruckPopup: function(btn) {
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refTxtLorryNo',
			popupAlias = '', 
			title = '';
		var detailItem = me.getViewModel().get('theDetail');
		title = 'In-Gate Truck List';
		popupAlias = 'popup-ingatetrucklistpopuphht';

		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				lorryNo: refs.refTxtLorryNo.getValue(),
				blNo: detailItem.get('blNo'),
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				grNo: detailItem.get('grNo'),
				weightCheckYn: detailItem.get('weightCheckYn')
			};
	
		if(popupAlias){
			ViewUtil.openCodePopup(me, popupAlias, targetCtl , params);
		}
	},
	
	//Package No popup
	onOpenPackageNoPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var targetCtl = 'refTxtPkgNo';
		var title = 'Package No. List';
		
		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				blNo: detailItem.get('blNo'),
				ixCd: 'I',
				jobPurpCd: 'WG'
			};
		ViewUtil.openCodePopup(this, 'app-packagenomultipopuphht', targetCtl, params);
	},
	
	onBondedWhValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'BONDED_WH_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('mfDocId'),
				col3: 'O'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'BondedWH_validation_msg');
							return false;
						}
						else {
							me.prevSaveCheck();
						}
					}
					else {
						me.prevSaveCheck();
					}
				}
			}
		});
	},
	
	prevSaveCheck:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var mt = Number(detailItem.get('balMt'));
		var balanceMt = Number(detailItem.get('loadMt'));
		
		if(detailItem.get('cgTpCd') != CodeConstants.MT_CGTP_BBK){
			if(mt - balanceMt > 0){
				MessageUtil.questionModern('info_msg', 'balValidation_msg', null,
						function(button){
							if(button == 'ok'){
								//Terminal Hold
								if(Token.getTmnlHoldChk() === 'Y') {
									me.onTerminalHoldValidation();
								} else {
									me.onPassedTerminalHoldValidation();
								}	
							}
						}
				);
			} else {
				//Terminal Hold
				if(Token.getTmnlHoldChk() === 'Y') {
					me.onTerminalHoldValidation();
				} else {
					me.onPassedTerminalHoldValidation();
				}	
			}
		}
		else {
			//Terminal Hold
			if(Token.getTmnlHoldChk() === 'Y') {
				me.onTerminalHoldValidation();
			} else {
				me.onPassedTerminalHoldValidation();
			}
		}
		
//		if(detailItem.get('custMode') !== me.CUST_RELEASE) {
//			MessageUtil.questionModern('info_msg', 'confirmhandlingout_clearance_msg', null, // CT1210060011 
//				function(button){
//					if(button == 'ok'){
//						me.clearanceHHT();
//					}
//				}
//			);
//		} else {
//			me.clearanceHHT();
//		}
	},
	
	onTerminalHoldValidation: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('blNo'),
				col3: CodeConstants.TMNL_HOLD_CHO
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
		if(detailItem.get('domesticChk') == 'N' &&  Token.getCustomHoldChk() === 'Y') {
			if(detailItem.get('custMode') !== me.CUST_RELEASE) {
				MessageUtil.warning('warning_msg', 'confirmhandlingout_clearance_blockprocess_msg');
				return
			} else {
				me.clearanceHHT();
			}
		} else {
			me.clearanceHHT();
		}
	},
	
	clearanceHHT : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(!me.amtVal()){
			return;
		}
		
		if(me.isAutoLocation()){
			if(!me.autoNorLocFlag){ 
				if(me.norManualFlag){
					MessageUtil.warning('warning_msg', 'confirmhandlingout_deallocate_automatically_msg'); // CT1210090013
					return;
				}
			}
		}else{
			if(me.norManualFlag){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_deallocate_automatically_msg'); // CT1210090013
				return;
			}
		}
		
		// Remove from LAIP
		//OPR-013 Warehouse balance checking (keep 60 MT into WH due to payment reason) 
		// if(detailItem.get('balMt') - detailItem.get('loadMt') < CommonConstants.WH_BALANCE_MT) {
		// 	MessageUtil.questionModern('warning_msg', 'warehousecheckexport_whBalance_msg', CommonConstants.WH_BALANCE_MT,
		// 			function(button){
		// 				if (button === 'ok') {
		// 					me.saveHHT();
		// 				}
		// 			}
		// 		);
		// } else {
		// 	me.saveHHT();
		// }

		me.saveHHT();
	},
	
	validateTruckNo: function() {
		var me = this,
		refs = me.getReferences(),
		store = me.getStore('validationTruckGateInStore'),

		detailItem = me.getViewModel().get('theDetail');
		var params = {
			vslCallId: detailItem.get('vslCallId'),	
			lorryNo: detailItem.get('lorryNo'),
			cgNo: detailItem.get('cgNo'),
			cgInOutCd: 'O',
			isMultiCargo: detailItem.get('isMultiCargo'),
		};

		store.load({
			params,
			callback: function(records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						var gateTxnNo = records[0].get('gateTxnNo');
						detailItem.set('gateTxnNo', gateTxnNo);
						me.saveHHT();
					}
					else {
						MessageUtil.warning('warning_msg', 'confirmhandlingout_truck_fail_msg', params["lorryNo"]); 
						return;
					}
				}
			}
		});
	},
	
	saveHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if((!StringUtil.isNullorEmpty(detailItem .get('blNo'))) && StringUtil.isNullorEmpty(detailItem.get('doNo'))){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_dono_not_exist_msg'); // CT1210090003
			return;
		}
		
		//Validate Loaded Amt > Allowable Amt
		var loadedAmt = refs.ctlLoadMt.getValue();
		var allowAmt = refs.ctlAllowMt.getValue();
		if (refs.ctlAllowQty.getValue() != null && refs.ctlAllowQty.getValue() != ''){
			if(loadedAmt > allowAmt){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_loaded_allow_amt_msg'); 
				return;
			}
		}	
		
		//Time check
		/*var startDate = Ext.Date.parse(refs.HandlingOutHHTSDt.getValue(),'d/m/Y H:i');
		var endDate = Ext.Date.parse(refs.HandlingOutHHTEDt.getValue(),'d/m/Y H:i');
		var startDateFormat = Ext.Date.format(startDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(endDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(startDate != null && endDate != null){
			if(endDate < startDate){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_start_end_date_msg'); // "Start Date Should Be Less Than End Date"
				return;
			}
		}
*/
		me.cudDataHHT();
	},
	
	// cudData
	cudDataHHT : function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var detailItem = me.getViewModel().get('theDetail');
		
		var proxy = detailItem.getProxy();
		proxy.url = me.CARGO_HANDLING_OUT_PROXY_URL;
		
		var startDtStr = refs.HandlingOutHHTSDt.getValue();
		var endDtStr = '';

		endDtStr = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		detailItem.set('hdlOutStDt', startDtStr); 
		detailItem.set('hdlOutEndDt', endDtStr); 
		
		//detailItem.set('hdlOutStDt', Ext.Date.parse(refs.HandlingOutHHTSDt.getValue(),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		//detailItem.set('hdlOutEndDt', Ext.Date.parse(refs.HandlingOutHHTEDt.getValue(),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));	
		detailItem.set('autoLocFlag', me.autoLocFlag);
		detailItem.set('autoNorLocFlag', me.autoNorLocFlag);
		detailItem.set('jobCoCd', 'G');		
		detailItem.set('rmk', refs.refRemarkHHTTextField.getValue());	
		detailItem.set('wgt', detailItem.get('loadMt'));
		detailItem.set('pkgQty', detailItem.get('loadQty'));
		detailItem.set('msrmt', detailItem.get('loadM3'));
		detailItem.set('lorryId', detailItem.get('lorryNo'));
		detailItem.set('whTpCd', 'G');
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('userId', MOST.config.Token.getUserId());
		detailItem.set('delvTpCd', 'I');
		
		detailItem.set('packageItems', me.packageItems);
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_HANDLING_OUT_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(record, operation, success) {
				if(success && record != null){
					me.onLoadHHT();
					me.getViewModel().set('theDetail', null);
					me.saveDamage();
					me.saveDimension();
					MessageUtil.saveSuccess(); // Success Message
					detailItem.commit();
					var parentView = me.getParentView();
					if (parentView.getController().onTblRetrieve) {
						parentView.getController().onTblRetrieve();
					}
					window.close();
				}
			}
		});
		
//		detailItem.save({
//			callback: function(record, operation, success) {
//				if(success){
//					if(record != null){					
//						MessageUtil.questionModern('Confirm','confirmdischarging_print_msg', record.data.gatePassNo,function(button){
//							if(button === 'ok'){
//								me.GatePassPrintingHHT(detailItem,record.data.gatePassNo);					
//							}else if(button === 'cancel'){
//								me.getViewModel().set('theDetail', null);
//								MessageUtil.saveSuccess(); // Success Message
//								var parentView = me.getParentView();
//								if (parentView.getController().onTblRetrieve) {
//									parentView.getController().onTblRetrieve();
//								}
//								window.close();
//							}
//						});				
//					}				
//				}
//			}
//		
//		});
	},
	setTimeWithShiftHHT: function(tab){
		var me = this;
		var refs = me.getReferences();

		var shift = refs.refHOCbxShft.getSelection();
		var strWKDate = refs.refWDTextfield.getDate();
		var strStartDt = strWKDate + ' ' + shift.get('fmHhmm').substr(0, 2) + ':' + shift.get('fmHhmm').substr(2, 4);
		var strEndDt = strWKDate + ' ' + shift.get('toHhmm').substr(0, 2) + ':' + shift.get('toHhmm').substr(2, 4);

		if(shift.get('shftId') === 'SF0013'){
			var temp = Ext.Date.parse(strEndDt, 'd/m/Y H:i');
			var endShftDTime = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
			strEndDt = Ext.Date.format(endShftDTime, 'd/m/Y H:i');
		}
		
		/*refs.HandlingOutHHTSDt.setValue(strStartDt);
    	refs.HandlingOutHHTEDt.setValue(strEndDt);*/
	},

	getBindingXmlHHT : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('spCaCoCd') == 'S'){
			/* chkSprYn.selected = true;	 */
			if(detailItem.get('delvTpCd') == 'D'){
				detailItem.set('delvTpCd', 'D');	
			}else{
				detailItem.set('delvTpCd', 'I');
			}
			
		}else{
			detailItem.set('delvTpCd', 'I');
		}
	},
	onSearchpktpPopupHHT: function(){
		var me = this;
		var targetCtl = 'ConfirmHandlingOutWhAllocationHHT';
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
	GatePassPrintingHHT:function(detailItem,gatePassNo){
		var me = this;
		var params = {
			title: 'Gate Pass Printing',
			vslCallId: detailItem.get('vslCallId'),
			CgNo: detailItem.get('blNo'),
			gatePassNo:gatePassNo
		};		
		ViewUtil.openCodePopup(this, 'app-gatepassprintinghht', 'GatePassPrintingHHT', params);
	},
	amtVal : function(){
		var me = this;
		var detailItem;
		if (Ext.platformTags.classic){
			detailItem =  me.getViewModel().get('theDetail');
		}else{
			detailItem =  me.getViewModel().get('theDetail');
		}
		var actMT=0;
		var actM3=0;
		var actQty=0;
	
		actMT = detailItem.get('loadMt');
		actQty = detailItem.get('loadQty');
		actMT = detailItem.get('loadMt');
		
		var balQty= detailItem.get('balQty');
		var balM3= detailItem.get('balM3');
		var balMT= detailItem.get('balMt');
		var isNormal =false;  
		
		if(detailItem.get('cgTpCd') == 'BBK'){
			if(!(actMT == 0 && actQty ==0)){
				if(balMT <= 0 && balQty <=0){
					MessageUtil.warning('warning_msg', 'confirmhandlingout_wh_balance_msg'); // CT1210090010
					return false;
				}
				
				if( (actMT > balMT || actQty > balQty) ){
					MessageUtil.warning('warning_msg', 'confirmhandlingout_wh_balance_msg'); // CT1210090010 
					return false;
				}
			} else if (actMT > 0 && actQty <= 0){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_zero_msg'); // CT1210090011
				return false;
			} else if (actMT <= 0 && actQty > 0){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_zero_msg'); // CT1210090011 
				return false;
			}else{
				isNormal = true;
			}
		} else {//DBK, DBN, DBE
			if(!(actMT == 0)){					
				if(balMT <= 0){
					MessageUtil.warning('warning_msg', 'confirmhandlingout_wh_balance_msg'); // CT1210090010  
					return false;
				}
				
				if( (actMT > balMT) ){
					MessageUtil.warning('warning_msg', 'confirmhandlingout_wh_balance_msg'); // CT1210090010
					return false;
				}
			} else if (actMT == 0 && (actQty > 0 || actM3 > 0)){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_mt_msg'); // CT1210090012
				return false;
			} else {
				isNormal = true;
			}	
		}
		
		me.amtNorFlag = isNormal;
		
		if(isNormal){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_empty_msg'); // CT1210090009
			return false;
		}
		
		return true
	},
	
	onHOTabDamage: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		
		ViewUtil.openCodePopup(this, 'app-damageofcargo', 'refsHOBtnDamage', recvData);
	},

	onHOTabDimension: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		
		ViewUtil.openCodePopup(this, 'app-dimensionofcargohht', 'refsHOBtnDimension', recvData);
	},
	
	saveDamage : function(){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore(me.DAMAGE_STORE);
		if(damageStore.data.length > 0){
			var insertItem = damageStore.data.items[0];
			var isCreated = true;
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
	
	// isAutoLocation
	isAutoLocation : function(){
		var me = this;
		me.autoLocFlag = false;
		me.autoNorLocFlag = false;//normal == auto location 가능성 = true ;  loc != null
		me.norManualFlag = false;
		
		if(!me.amtNorFlag){
			if(me.isAutoNorLocFlag()){	 	 			 
				me.autoLocFlag = true;
				me.autoNorLocFlag = true;
			}
		}
		
		////if autoNorLocflag or autoDmgLocFlag or autoSprLocFlag is true, isAutoLocation is true = autoLocFlag	 	 		
		if(me.autoLocFlag){
			return true
		}
		
		return false;
	},
	
	// isAutoNorLocFlag
	isAutoNorLocFlag : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		if(detailItem.get('locId') && me.prevWhItems){
			return false;
		}		
		
		var actMT=0;
		var actM3=0;
		var actQty=0;
		
		actMT =  detailItem.get('loadMt');
		actM3 =  detailItem.get('loadM3');
		actQty =  detailItem.get('loadQty');
		
		var sumMt = detailItem.get('balMt');
		var sumM3 = detailItem.get('balM3');
		var sumQty = detailItem.get('balQty');
		
		me.autoLocFlag = false;
		me.norManualFlag = false;
		me.empNorLocCount = false;
		me.amtOverNorLoc = false;
		
		if(detailItem.get('cgTpCd')){
			////////////Start Normal Case
			if(actMT > 0){ //ACTUAL WGT VALUE - CASE OF BBK
				if(sumMt == actMT){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else if(sumMt > actMT){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = false;//autoLocaFlag
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else{// amountOver
					me.autoLocFlag = false;
					me.amtOverNorLoc = true;
				}
			}else if(actQty >0){
				if(sumQty == actQty){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else if(sumMt > actMT){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = false;//autoLocaFlag
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else{// amountOver
					me.autoLocFlag = false;
					me.amtOverNorLoc = true;
				}	
			}else if(actM3 >0){
				if(sumM3 == actM3){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else if(sumM3 > actM3){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = false;//autoLocaFlag
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else{// amountOver
					me.autoLocFlag = false;
					me.amtOverNorLoc = true;
				}									
			}//////////// End Normal Case
			
		} 
		
		if(me.autoLocFlag){
			me.autoNorLocFlag = true;
			return true;
		}else{					
			if(StringUtil.isNullorEmpty(detailItem.get('locId'))){
				me.norManualFlag = true;//location empty
			}else{
				me.norManualFlag = false;
			}
			me.autoNorLocFlag = false;
			return false;
		}
		/* return autoLocFlag; */
	},
	
	autoDeAllocation: function () {
		var me = this;
		var searchType,
		 	recvData = me.getView().recvData,
			refs = me.getReferences(),
		 	loadQty = refs.ctlLoadQty.getValue(),
		 	balQty = recvData.get('balQty'),
		 	loadMt = refs.ctlLoadMt.getValue(),
		 	balMt = recvData.get('balMt'),
			recvData = me.getView().recvData,
			viewPlanInfoStore = me.getStore('WhViewList');
			
		searchType = 'viewPlanInfo';
		var cgTpCd = recvData.get('cgTpCd');
		var isBBK = (CodeConstants.MT_CGTP_BBK === cgTpCd || 'RBK' === cgTpCd);
		var isDBK = (CodeConstants.MT_CGTP_DBN === cgTpCd || CodeConstants.MT_CGTP_DBE === cgTpCd);

		me.setMaskedForm(true);
		viewPlanInfoStore.load({
			params: {
				searchType: searchType,
				whId: '',
				bayQty: 0,
				rowQty: 0,
				vslCallId: recvData.data.vslCallId,
				cgNo: recvData.data.spCaCoCd === 'S' ? '' :recvData.data.cgNo,
				grNo: recvData.data.cgNo,
				spCaCoCd: recvData.data.spCaCoCd,
				blSn: recvData.data.blSn
			},
			callback: function(records, operation, success) {
				if(records && records.length > 0 && records[0].data.locId){
					if (records.length > 1 && loadQty < balQty && isBBK|| 
						records.length > 1 && loadMt < balMt && isDBK) 
					{
						me.prevWhItems = null;
						refs.ctlConfirmHandlingOutLocId.setValue();
						return;
					}
					else if(records.length > 1 && loadQty == balQty && isBBK){

						var whItems = new Array();
						for(var i = 0; i < records.length; i++){
							var invLocItem = records[i];
							var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
								locTpCd: invLocItem.data.locTpCd,
								whId: invLocItem.data.whId,
								locId : invLocItem.data.locId,
								vslCallId : invLocItem.data.vslCallId,
								cgNo : invLocItem.data.cgNo,
								wgt: invLocItem.data.wgt,
								msrmt: invLocItem.data.msrmt,
								pkgQty: invLocItem.data.pkgQty,
								whTpCd : invLocItem.data.whTpCd,
								whTpCdNm : invLocItem.data.whwhTpCdNmId,
								spCaCoCd :''
							});
							whItems.push(handlingItem.data);
						}
						me.prevWhItems = whItems;

						var res = records[0].data.locId.split('-');
						
						var locId = records[0].data.whLocId;
						locId += '(' + res[1] + ',' + records.length + ')';

						refs.ctlConfirmHandlingOutLocId.setValue(locId);
					} 
					else if(records.length > 1 && loadMt == balMt && isDBK){

						var whItems = new Array();
						for(var i = 0; i < records.length; i++){
							var invLocItem = records[i];
							var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
								locTpCd: invLocItem.data.locTpCd,
								whId: invLocItem.data.whId,
								locId : invLocItem.data.locId,
								vslCallId : invLocItem.data.vslCallId,
								cgNo : invLocItem.data.cgNo,
								wgt: invLocItem.data.wgt,
								msrmt: invLocItem.data.msrmt,
								pkgQty: invLocItem.data.pkgQty,
								whTpCd : invLocItem.data.whTpCd,
								whTpCdNm : invLocItem.data.whwhTpCdNmId,
								spCaCoCd :''
							});
							whItems.push(handlingItem.data);
						}
						me.prevWhItems = whItems;

						var res = records[0].data.locId.split('-');
						
						var locId = records[0].data.whLocId;
						locId += '(' + res[1] + ',' + records.length + ')';

						refs.HandlingOutUnsetLocIdHHT.setValue(locId);
					} 
					else {
						var whItems = new Array();
						for(var i = 0; i < records.length; i++){
							var invLocItem = records[i];
							var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
								locTpCd: invLocItem.data.locTpCd,
								whId: invLocItem.data.whId,
								locId : invLocItem.data.locId,
								vslCallId : invLocItem.data.vslCallId,
								cgNo : invLocItem.data.cgNo,
								wgt: refs.ctlLoadMt.getValue(),
								msrmt: refs.ctlLoadM3.getValue(),
								pkgQty: refs.ctlLoadQty.getValue(),
								whTpCd : invLocItem.data.whTpCd,
								whTpCdNm : invLocItem.data.whwhTpCdNmId,
								spCaCoCd :''
							});
							whItems.push(handlingItem.data);
						}
						me.prevWhItems = whItems;

						var res = records[0].data.locId.split('-');
						
						var locId = records[0].data.whLocId;
						locId += '(' + res[1] + ',' + records.length + ')';

						refs.HandlingOutUnsetLocIdHHT.setValue(locId);
					}
				}
				me.setMaskedForm(false);
			}
		});
	},


	//Masked Form
	setMaskedForm (value){
		var me = this;
		var ctl = me.lookupReference(me.FORM_REF);
		if(ctl){
			me.setMaskedHHT(me, ctl.reference, value);
		}
	},
});