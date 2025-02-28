Ext.define('MOST.view.operation.ConfirmHandlingInHHTPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],
	alias: 'controller.confirmhandlinginhhtpopup',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	FORM_REF: 'refFrmCfrmHI',
	CARGO_HANDLING_IN_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargohandlingin/cargohandlingin',
	WAREHOUSE_POPUP_ALIAS : 'app-warehousepopup',
	prevDate:{ startDt: null, endDt: null},
	prevData:null,
	prevLorryId : null,
	booleanDirSpr : false,
	isFinal : false,
	tempStatus : false,
	prevWhItems : new Array(),
 	shuWhItems : new Array(),
 	dmgWhItems : new Array(),
 	
 	GATETXNNO: null,
 	DAMAGE_STORE: 'damageStore',
 	DAMAGE_CHECK_STORE: 'damageCheckStore',
	DIMENSION_STORE: 'dimensionStore',
	UPLOAD_STORE: 'uploadStore',
	JOB_NO_STORE: 'jobNoStore',
	
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
	// After Renderer Event
 	onLoadHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('confirmHandlingIn');
		var window = me.getView().up('window');
		var params = me.getSearchCondition();
		me.GATETXNNO = params.gateTxnNo;
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.setDetailInitialize(record[0]);
					}
				}
			}
		});
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Detail Save
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var lorrysPopupStore = me.getStore('confirmHandlingInAssignmentLorrysPopup');
		var infoForm = refs.refFrmCfrmHI.validate();
		
		if(infoForm){
			//Set start/end Time
			var startDtStr = refs.refConfirmHdlInStartDt.getValue();
			var endDtStr = '';

			endDtStr = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			
			detailItem.set('hdlInStDt',startDtStr);
			detailItem.set('hdlInEndDt',endDtStr);

			detailItem.set('hdlInStDtStr',refs.refConfirmHdlInStartDt.getValue());
			detailItem.set('hdlInEndDtStr',endDtStr);
			
			//me.prevSaveCheck();
			if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
				if(Token.getCustomHoldChk() === 'Y') {
					
					me.onBondedWhValidation();
					
				} else {
					me.prevSaveCheck();
				}
			}
			else {
				me.prevSaveCheck();
			}
		} else {
			MessageUtil.mandatoryFieldInValid();
		}
	},
	
	//Change Qty event:
	onChangeQty: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		var whBalQty = detailItem.get('whBalQty');
		var whBalMt = detailItem.get('whBalWgt');
		var whBalM3 = detailItem.get('whBalMsrmt');

		//Check Over Balance:
		// if (!me.checkOverBalance(ctl, newValue)) {
		// 	MessageUtil.warning('warning_msg', 'confirmhandlingin_bbk_exceed_msg');

		// 	ctl.suspendEvents();
		// 	ctl.setValue(oldValue);
		// 	ctl.resumeEvents();

		// 	return;
		// }

		//Start Auto Calculate with BBK:
		if (cgTpCd !== CodeConstants.MT_CGTP_BBK) {
			return;
		}
		var wgt = 0, msrmt = 0;
		if (newValue === whBalQty) {
			wgt = whBalMt;
			msrmt = whBalM3;
		} else {
			var eachWgt = detailItem.get('eachWgt');
			var eachMsrmt = detailItem.get('eachMsrmt');
			var inputQty = Number(newValue);

			wgt = Number(eachWgt * inputQty).toFixed(3);
			msrmt = Number(eachMsrmt * inputQty).toFixed(3);
		}

		//End Auto Calculate with BBK./
		detailItem.set('wgt', wgt);
		detailItem.set('msrmt', msrmt);

		refs.refTxtHIMt.setValue(wgt);
		refs.refTxtHIM3.setValue(msrmt);
	},

	onChangeMt: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		if (cgTpCd === CodeConstants.MT_CGTP_BBK) {//MT is auto calculate in BBK
			return;
		}

		//Check Over Balance:
		// if (!me.checkOverBalance(ctl, newValue)) {
		// 	MessageUtil.warning('warning_msg', 'confirmhandlingin_dbk_mt_exceed_msg');

		// 	ctl.suspendEvents();
		// 	ctl.setValue(oldValue);
		// 	ctl.resumeEvents();

		// 	return;
		// }
	},

	onChangeM3: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences(ctl, newValue);
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		if (cgTpCd === CodeConstants.MT_CGTP_BBK) {//M3 is auto calculate in BBK
			return;
		}

		//Check Over Balance:
		if (!me.checkOverBalance(ctl)) {
			MessageUtil.warning('warning_msg', 'confirmhandlingin_dbk_m3_exceed_msg');

			ctl.suspendEvents();
			ctl.setValue(oldValue);
			ctl.resumeEvents();

			return;
		}
	},

	// WarehouseAllocation
	onWarehouseAllocationHHT : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var params = {
				totMt: detailItem.get('wgt'),
				totM3: detailItem.get('msrmt'),
				totQty: detailItem.get('pkgQty'),
				cgNo: detailItem.get('grNo'),
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				blNo: detailItem.get('blNo'),
				whTpCd: 'G',
				vslCallId: detailItem.get('vslCallId'),
				title: 'W/H - Set Location',
				displayOccupiedInfo: false
			};
		
		if(params.totMt == 0 && params.totM3 == 0 && params.totQty == 0){
			MessageUtil.warning('warning_msg', 'MT, M3, Qty must be greater than 0.');
			return;
		}
		ViewUtil.openHhtPopup(this, 'app-whcheckersetlocpopuphht', 'refConfirmHILocId', params);
	},

	//Search Package Type:
	onSearchPkgTpHHT:function(refBtn){;
		var me = this;
		var targetCtl = '';
		var title = 'Package Type';
		var params = '';
		targetCtl = 'refConfirmHandlingInPacTypeCode';
		params = {
			title: title,
			searchType: 'COMM',
			searchDivCd: 'PKGTP',
			searchLcd : 'MT',
			searchCol1 : '',
		};	
		if(params && targetCtl){
			ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetCtl, params);
		}
	},
	
	//Search Lorry For Lorry Grid:
	onOpenTruckPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refLorryNo',
			popupAlias = '', 
			title = '';
		var detailItem = me.getViewModel().get('theDetail');
		title = 'In-Gate Truck List';
		popupAlias = 'popup-ingatetrucklistpopuphht';

		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				lorryNo: refs.refLorryNo.getValue(),
				blNo: '',
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				grNo: detailItem.get('grNo'),
				weightCheckYn: detailItem.get('weightCheckYn')
			};
	
		if(popupAlias){
			ViewUtil.openHhtPopup(me, popupAlias, targetCtl , params);
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
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				ixCd: 'X',
				jobPurpCd: 'GW'
			};
		ViewUtil.openCodePopup(this, 'app-packagenomultipopuphht', targetCtl, params);
	},
	
	getSearchParamLorryHHT: function(){
        var me = this;
        var refs = me.getReferences();	
        var detailItem = me.getViewModel().get('theDetail');
        if(detailItem === null) 
        	return null;
        var inputLorryNo = refs.refConfirmLoadingLorryNo.getValue();
        
        var tsptrQuote = '';
		var partnerCdArr = new Array();
        if(detailItem.get('tsptr')){
        	var arrTsptr = detailItem.get('tsptr').split(",");
        
       		arrTsptr.forEach(function(data){
            	//tsptrQuote += Ext.String.format("'{0}'", data);
				partnerCdArr.push(Ext.String.format("'{0}'", data));
            });
        }
        
        var params;
        params = {
            lorryNo : detailItem.get('lorryId'),
            shipgNoteNo: detailItem.get('shipgNoteNo'),
            vslCallId: detailItem.get('vslCallId'),
            searchType : 'onlyLorry',
            tsptr : partnerCdArr
        };
        return params;
	},
	
	onClearZero: function(ref, e, eOpts){
		var val = ref.getValue();
		if(val != null && val == 0){
			ref.clearValue();
		}
	},
	
	onSetZero: function(ref, e, eOpts){
		var val = ref.getValue();
		if(!val){
			ref.setValue(0);
		}
	},
	
	onCancelHHT: function(btn){
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
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */	
	// Popup After Setting
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getView().getViewModel().get('theDetail');
		
		if(targetControl === 'refConfirmHILocId'){
			if(returnValue){
				detailItem.set('locId',returnValue.locId);
				refs.refConfirmHILocId.setValue(returnValue.plannedLoc);
				var whItems = new Array();
				for(var i = 0; i < returnValue.arrWHLocation.items.length; i++){
					var invLocItem = returnValue.arrWHLocation.items[i];
					var handlingItemHHT = Ext.create('MOST.model.configuration.WhConfiguration', {
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
					whItems.push(handlingItemHHT.data);
				}
				me.prevWhItems = whItems; 
				me.whType = invLocItem.data.locTpCd;
			} else {
				detailItem.set("locId","");
				me.whType = '';
			}
		}
		else if(targetControl === 'refLorryNo'){
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
		
		refs.refTxtHIQty.setValue(qty);
		refs.refTxtHIMt.setValue(mt);
		refs.refTxtHIM3.setValue(m3);
	},
	
	checkOverBalance: function (ctl, newValue) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var whBalQty = detailItem.get('whBalQty');
		var whBalMt = detailItem.get('whBalWgt');
		var whBalM3 = detailItem.get('whBalMsrmt');

		if (!newValue) {
			newValue = 0;
		}

		if (ctl.reference === 'refTxtHIQty' 
			&& newValue > whBalQty
			&& detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_BBK) {
			return false;
		}
//		else if (ctl.reference === 'refTxtHIMt' && newValue > whBalMt) {
//			return false;
//		} else if (ctl.reference === 'refTxtHIM3' && newValue > whBalM3) {
//			return false;
//		}
		return true;
	},

	// Detail Initialize
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;

		var detailItem = Ext.create('MOST.model.operation.CargoHandlingIn');
		var deliveryCombo = me.getStore('confirmHandlingInForDeliveryCombo');
		var cargoTypeCombo = me.getStore('confirmHandlingInForCargoTypeCombo');
		var shiftCombo = me.getStore('confirmHandlingInForShiftCombo');
		
		if(!masterItem.get('items')  ||  masterItem.get('items').length == 0){
			return;
		}
		var detailItem = new Ext.create('MOST.model.operation.CargoHandlingIn');
		DateUtil.convertDateToLong(masterItem.get('items')[0], ['startDt', 'endDt', 'hdlInStDt']); // date to long
		detailItem.data = masterItem.get('items')[0];

		//Combo:
		deliveryCombo.setData(masterItem.get('deliveryList'));
		cargoTypeCombo.setData(masterItem.get('cargoTypeList'));
		cargoTypeCombo.filterBy(function(record, id){
			if(record.get('cd') !== 'CTR'){
				return record;
			}
		});

		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		refs.refConfirmHdlInStartDt.setValue(currentTime);
		
		detailItem.data.startDt = currentTime;
		detailItem.data.endDt = '';
		
		// Previous Date
		me.prevDate['startDt'] = detailItem.get('startDt');
		me.prevDate['endDt'] = detailItem.get('endDt');
		me.prevLorryId = detailItem.get('lorryId');
		
		detailItem.set('lorryId', recvData.get('lorryNo'));
		detailItem.set('lorryNo', recvData.get('lorryNo'));
		detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
		detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
		
		detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
		detailItem.set('opDelvTpCd', 'I');
		detailItem.phantom = false; // UPDATE

		//Balance Amt (remain of SN Amount has to load HI):
		detailItem.set('whBalWgt', detailItem.get('balMt'));
		detailItem.set('whBalMsrmt', detailItem.get('balM3'));
		detailItem.set('whBalQty', detailItem.get('balQty'));
		
		//Set Default Amt of GR to HandlingIn:
		detailItem.set('wgt', detailItem.get('grMt'));
		detailItem.set('msrmt', detailItem.get('grM3'));
		detailItem.set('pkgQty', detailItem.get('grQty'));

		detailItem.commit();
		
		me.getViewModel().setData({theDetail:detailItem});
		me.getView().recvData = detailItem;
		
		if(detailItem.get('fnlOpeYn') === 'Y'){
			refs.refConfirmHandlingInFinal.setValue(true);
			refs.refConfirmHandlingInFinal.setReadOnly(true);
			me.isFinal = true;
		}
		
		var store = me.getStore('loadLocation');
		store.load({
			params:{
				vslCallId : detailItem.get('vslCallId'),
				shipgNoteNo : detailItem.get('shipgNoteNo'),
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						if (records.length > 1 ) {
							var res = records[0].data.locId.split('-'),
								locId = records[0].data.whId;
								
								locId += '(' + res[1] + ',' + records.length + ')';
								detailItem.set('locId',locId);
							return;
						}else{
							var whItems = new Array();
							var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
								locTpCd:  records[0].get('locTpCd'),
								whId: records[0].get('whId'),
								locId :records[0].get('locId'),
								vslCallId : detailItem.get('vslCallId'),
								cgNo : detailItem.get('cgNo'),
								wgt:  refs.refTxtHIMt.getValue(),
								msrmt: refs.refTxtHIM3.getValue(),
								pkgQty:  refs.refTxtHIQty.getValue(),
								whTpCd:'G',
								spCaCoCd :''
							});
							whItems.push(handlingItem.data);
							me.prevWhItems = whItems;
							detailItem.set('locId', records[0].get('locId'));
						}
					}
				}
			}
		});
	},
	
	// delvCheck
	delvCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('delvTpCd') === 'D' &&
		   detailItem.get('spCaCoCd') !== 'S'){
			MessageUtil.warning('warning_msg', 'confirmhandlingin_delivery_direct_msg'); // CT1210080003
			return true;
		} else {
			return false;
		}
	},
	
	// endTimeCheck
	endTimeCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('gatePassYn')){
			if(detailItem.get('hdlInEndDt') == null){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_endtime_msg'); // CT1210080004 - Input endTime When Return to Shipper had
				return false;
			}
			
			if(StringUtil.isNullorEmpty(detailItem.get('lorryId'))){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_input_lorryid_msg'); // CT1210080005 - Input Lorry When Return to Shipper had
				return false;
			}
		}
		
		return true;
	},
	
	// timeValidCheck
	timeValidCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		//Time check
		var startDate = detailItem.get('hdlInStDt');
		var endDate = detailItem.get('hdlInEndDt');
		var startDateFormat = Ext.Date.format(startDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(endDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(startDate != null && endDate != null){
			if(endDate < startDate){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_start_end_date_msg'); // "Start Date Should Be Less Than End Date"
				return false;
			}
		}
		
		return true;
	},
	
	// amtVal
	amtVal : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		var actMT=detailItem.get('wgt')+detailItem.get('shuMt')+detailItem.get('dmgMt');
		var actM3=detailItem.get('msrmt')+detailItem.get('shuM3')+detailItem.get('dmgM3');
		var actQty=detailItem.get('pkgQty')+detailItem.get('shuQty')+detailItem.get('dmgQty');
		
		var actNorMT = detailItem.get('wgt');
		var actNorM3 = detailItem.get('msrmt');
		var actNorQty = detailItem.get('pkgQty');
			
		//Case of Break Bulk : one of the MT or M3 have to  input at least  
		if(detailItem.get('cgTpCd') !=  null && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
			if(detailItem.get('pkgQty')<=0){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_amount_zero_msg'); // CT1210080006
 				return false;
			}
		}	
		
		if(actNorMT > 0 || actNorQty >0 || actNorM3 > 0){
			if(StringUtil.isNullorEmpty(detailItem.get('locId'))){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_input_location_msg'); // CT1210080008
				return false;
			}
		}			
		
		return true;
	},
	
	// continueLoading
	continueLoading : function(isOk){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if (isOk === 'cancel') {
			me.tempStatus = false;
		} else {
			me.tempStatus = true;
			detailItem.set('fnlOpeYn', 'Y');
		}
		
		me.cudData();
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
				col3: 'I'
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
	
	onTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		me.setMaskedForm(true);
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('shipgNoteNo'),
				col3: CodeConstants.TMNL_HOLD_CHI
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
				me.setMaskedForm(false);
			}
		});
	},
	
	onPassedTerminalHoldValidation : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(me.isFinal) {
			MessageUtil.warning('warning_msg', 'confirmhandlingin_final_msg');
			return;
		} else {
			if(me.delvCheck()){
				return;
			} 

			if (!me.endTimeCheck()) {
				return;
			}
			
			if (!me.timeValidCheck()) {
				return;
			}
			
			var actMTLoad = detailItem.get('accuSumWgt');
            var actQtyLoad = detailItem.get('accuSumQty');    
            var actM3Load = detailItem.get('accuSumMsrmt');    
            var dcMT = detailItem.get('snMt');
            var dcQty = detailItem.get('snQty');    
            var dcM3 = detailItem.get('snM3');
            var isLoadingMT = detailItem.get('wgt');
            var isLoadingQty = detailItem.get('pkgQty');    
            var isLoadingM3 = detailItem.get('msrmt');
		
			 //Fix iss R29
			 if(!me.amtVal())
				 return;
			 else {
				 if ((((actM3Load + isLoadingM3) >= dcM3 && dcM3 > 0) || 
					  ((actMTLoad + isLoadingMT) >= dcMT && dcMT > 0) || 
					  ((actQtyLoad + isLoadingQty) >= dcQty && dcQty > 0) ) && ( detailItem.get('fnlOpeYn') === 'N')){
					MessageUtil.questionModern('info_msg', 'confirmhandlingin_final_handlingin_msg', null, 
						function(button){
						 	me.continueLoading(button);
						}
					);
					return;
				 } 	
				 
				 me.cudData();
			 }
		}
	},
	
	// Prev Save Check - okSaveButton
	prevSaveCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		//Terminal Hold
		if(Token.getTmnlHoldChk() === 'Y') {
			me.onTerminalHoldValidation ();
		} else {
			me.onPassedTerminalHoldValidation();
		}
	},
	
	validateTruckNo: function() {
		var me = this,
		refs = me.getReferences(),
		store = me.getStore('validationTruckGateInStore'),

		detailItem = me.getViewModel().get('theDetail');
		var params = {
			vslCallId: detailItem.get('vslCallId'),	
			lorryNo: detailItem.get('lorryId'),
			cgNo: detailItem.get('cgNo'),
		};

		store.load({
			params,
			callback: function(records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						var gateTxnNo = records[0].get('gateTxnNo');
						detailItem.set('gateTxnNo', gateTxnNo);
						me.prevSaveCheck();
					}
					else {
						MessageUtil.warning('warning_msg', 'confirm_truck_fail_msg', params["lorryNo"]); 
						return;
					}
				}
			}
		});
	},
	
	// loadingCancelShutStat
	loadingCancelShutStat : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		detailItem.set('loadCnclMode', 'Y');
		
		if(detailItem.get('shutRhdlMode') === "R"){
			detailItem.set('rhdlYn', 'Y');
		}else if(detailItem.get('shutRhdlMode') === "C"){
			detailItem.set('rhdlYn', 'Y');
		}else{
			if(detailItem.get('dmgRhdlMode') === "R" ||
					detailItem.get('dmgRhdlMode') === "C"){
				detailItem.set('rhdlYn', 'Y');
			}else{
				detailItem.set('rhdlYn', 'N');
			}
		}
	},
	
	// loadingCancelDmgStat
	loadingCancelDmgStat : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		detailItem.set('loadCnclMode', 'Y');
		
		if(detailItem.get('dmgRhdlMode') === "R"){
			detailItem.set('rhdlYn', 'Y');
		}else if(detailItem.get('dmgRhdlMode') === "C"){
			detailItem.set('rhdlYn', 'Y');
		}else{
			if(detailItem.get('shutRhdlMode') === "R" ||
			   detailItem.get('shutRhdlMode') === "C"){
				detailItem.set('rhdlYn', 'Y');
			}else{
				detailItem.set('rhdlYn', 'N');
			}
		}
	},
	
	// Cargo Type Save Data - getBindingXml()
	setCargoTypeSaveData : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var refs = me.getReferences();
		var cgTpCd = detailItem.get('cgTpCd');
		var isBBK = (cgTpCd === CodeConstants.MT_CGTP_BBK);
		var isDBK = (cgTpCd === CodeConstants.MT_CGTP_DBN || cgTpCd === CodeConstants.MT_CGTP_DBE);
		
		detailItem.set('cgInOutCd', 'I');
		detailItem.set('delvTpCd', 'I');
		
		if(isBBK){
			//shut
			if(( detailItem.get('shuMt') > 0 ||  detailItem.get('shuM3') > 0)){
				me.loadingCancelShutStat();
			}else{
				detailItem.set('loadCnclMode', 'N');
			}
			//dmg
			if(( detailItem.get('dmgMt') > 0 ||  detailItem.get('dmgM3') > 0)){
				me.loadingCancelDmgStat();
			}else{
				 if(detailItem.get('loadCnclMode') != 'Y'){
					 detailItem.set('loadCnclMode', 'N');
			 	}
			}
		} else if(isDBK){
			detailItem.set('loadCnclMode', 'N');
			detailItem.set('loadCnclMode', 'N');
		} else {
			MessageUtil.warning('warning_msg', 'invalide_cargo_type_msg');
			
		}
	},
	
	// lorryCudData
	lorryCudData : function(isOk){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if (isOk === 'ok') {
			detailItem.set('lorryFlag', true);
		} else {
			detailItem.set('lorryFlag', false);
			detailItem.set('lorryId', me.prevLorryId);
		}
		
		me.cudFunction();
	},
	
	// cudData
	cudData : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		me.setCargoTypeSaveData();
		
		if(!me.amtVal()){
			return;
		} else {
			if(StringUtil.isNullorEmpty(me.prevLorryId)){
				detailItem.set('lorryFlag', false);
				
				if( me.tempStatus){
					detailItem.set('fnlOpeYn', 'Y');
				}
				
				me.cudFunction();
			}else if(me.prevLorryId === detailItem.get('lorryId')){
				if( me.tempStatus === true){
					detailItem.set('fnlOpeYn', 'Y');
				}
				
				detailItem.set('lorryFlag', false);
				me.cudFunction();
			}else{
				MessageUtil.questionModern('info_msg', 'confirmhandlingin_change_lorry_no_msg', null, // CT1210001
					function(button){
						me.lorryCudData(button);
					}
				);
			}
		}
	},
	
	// cudFunction
	cudFunction : function(){
		var me = this;
		var refs = me.getReferences();
		me.setMaskedForm(true);

		var window = me.getView().up('window');
		var detailItem = me.getViewModel().get('theDetail');
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('packageItems', me.packageItems);
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = me.CARGO_HANDLING_IN_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(records, operation, success) {
				if (success) {
					detailItem.commit();
					me.saveDamage();
					me.saveDimension();
					MessageUtil.saveSuccess(); // Success Message
					
					var parentView = me.getParentView();
					if (parentView.getController().onTblRetrieve) {
						parentView.getController().onTblRetrieve();
					}
					
					window.close();
				}
				
				me.setMaskedForm(false);
			}
		});
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	me.prevData = recvData.clone();

     	var params = {
			vslCallId 	: me.prevData.get('vslCallId'),
			grNo 		: me.prevData.get('grNo'),
			cgNo 		: me.prevData.get('cgNo'),
			shipgNoteNo : me.prevData.get('shipgNoteNo'),
			cgTpCd 		: me.prevData.get('cgTpCd'),
			shftDt 		: me.prevData.get('shftDt'),
			shftId	 	: me.prevData.get('shftId'),
			gateTxnNo : me.prevData.get('gateTxnNo'),
		};
    	
    	return params;
	},
	
	
	onHITabDamage: function(){
		var me = this;
		var refs = me.getReferences();
		var jobNoStore = me.getStore(me.JOB_NO_STORE);
		jobNoStore.removeAll();
		jobNoStore.load({
			params: {
				gateTicketNo : me.GATETXNNO,
				cgNo : me.prevData.get('grNo'),
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null & records.length > 0){
						me.prevData.set('jobNo', records[0].get('jobNo'));
						ViewUtil.openCodePopup(me, 'app-damageofcargo', 'refsHIBtnDamage', me.prevData);
					}else{
						return;
					}
					
				}
			}
		});
		
	},

	onHITabDimension: function(){
		var me = this;
		var refs = me.getReferences();
		var jobNoStore = me.getStore(me.JOB_NO_STORE);
		jobNoStore.removeAll();
		jobNoStore.load({
			params: {
				gateTicketNo : me.GATETXNNO,
				cgNo : me.prevData.get('grNo'),
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null & records.length > 0){
						me.prevData.set('jobNo', records[0].get('jobNo'));
						ViewUtil.openCodePopup(me, 'app-dimensionofcargohht', 'refsHIBtnDimension', me.prevData);
					}else{
						return;
					}
					
				}
			}
		});
	},
	
	saveDamage : function(){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore('damageStore');
		var damageCheckStore = me.getStore('damageCheckStore');
		
		if(damageCheckStore.data.length > 0){
			var insertItem = damageCheckStore.data.items[0];
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = damageStore.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', insertItem.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						damageCheckStore.commitChanges();
					}else {
						MessageUtil.warning('warning_msg', 'FAIL');
						return;
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

	onOpenTblDamageCheck: function() {
		var  me = this
			,currentTimeFormatted = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
			,detailItem = me.getViewModel().get('theDetail')
		;

		detailItem.set({
			isOperationScreen: true
		   ,checkedDt: currentTimeFormatted
		   ,title: 'The Detail of Damage Check'
		   ,locCd: 'YARD'
	   });
		ViewUtil.openHhtPopup(me, 'app-damagecheckhhtpopup', null, detailItem);
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	//Masked Form
	setMaskedForm (value){
		var me = this;
		var ctl = me.lookupReference(me.FORM_REF);
		if(ctl){
			me.setMaskedHHT(me, ctl.reference, value);
		}
	},
});