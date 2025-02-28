Ext.define('MOST.view.operation.CMCofApronHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.cmcofapronhht',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	EXPORT_STORE_NAME: 'cargoManualCtlTabExport',
	IMPORT_STORE_NAME: 'cargoManualCtlTabImport',
	
	NUMBER_FORMAT : '0,000',
	caTyCd : 'GR',
	MAX_HATCH_NO: 11,
	ATBSTR: null,
	LIST_TYPE: '',
	gateObject: new Object(),
	flag: null,
	GATETXNNO: '',
	
	
	QR_ACTIVE: false,
	TXT_CANCEL: 'Cancel',
	TXT_QRSCAN: 'QR Scan',
	FRAME_SIZE: 400,
	html5QrCode: null,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onTblLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		
		var searchParm = Ext.create('MOST.model.operation.SearchCargoMasterParm');
		searchParm.set('truckType', 'E');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		if(!globalVesselCallId)
			return;
		
		//Load SN BL Combobox:
		me.onSelectDocumentComboItems();
		
	},
	
	onSelectDocumentComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		
		var mblNoStore = me.getStore('mblNoStore');
		var blNoStore = me.getStore('blNoStore');
		var bookingNoStore = me.getStore('bookingNoStore');
		var shipgNoteNoStore = me.getStore('shipgNoteNoStore');
		
		mblNoStore.load({
			params: {
				vslCallId : globalVesselCallId
			}
		});
		
		blNoStore.load({
			params: {
				vslCallId : globalVesselCallId
			}
		});
		
		bookingNoStore.load({
			params: {
				vslCallId : globalVesselCallId
			}
		});
		
		shipgNoteNoStore.load({
			params: {
				vslCallId : globalVesselCallId
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
	onActivateTabHHT: function(ref){
		var me = this;
		var tab = ref.reference;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');

		me.setConstrolSetting(tab);

	},
	
	onTblRetrieve: function (){
		var me = this;
		var refs = me.getReferences();
	
		var imtNo = refs.refTxtIMTNo.getValue();
		
		if(imtNo != '' ){
			me.setValueQRcode(imtNo);
			return;
		}
		var tabPanel = refs.refTabCargoManualCtl.getActiveItem().name;

		switch(tabPanel){
			case 'cmcexport':
				me.searchExportTbl();
				break;
			case 'cmcimport':
				me.searchImportTbl();
				break;
		}
	},
	
	//Button Loading:
	onTblLoading: function(){ //Go to confirmLoading
		var me = this;
		me.showTblLoadingPopUp();
	},
	
	//Button Discharging:
	onTblDischarging: function(){
		var me = this;
		var refs = me.getReferences();
		me.showTblDischargingPopUp();
	},
	
	//QR scan
	getCameraDevice: function (){
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		//var deviceNo = refs.refCameraFrontRear.getValue()? 0 : 1;
		return (deviceNo == null) ? 0 : deviceNo;
	},
	
	onChangeSegmentCam: function (){
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		if(me.QR_ACTIVE){
			me.startDeivce();
		}
	},
	
	setQRButton: function (active){
		var me = this;
		var refs = me.getReferences();
		var qrBtn = refs.refBtnQRScanApron;
		
		if(active){
			qrBtn.setText(me.TXT_CANCEL);
		}else{
			qrBtn.setText(me.TXT_QRSCAN);
		}
		me.QR_ACTIVE = active;
	},

	//Rbt. Test:
	openQR: function(){
		var me = this;
		var title = ViewUtil.getLabel('popup_title_qrscanner');
		var parms = {
			title: title
		};

		ViewUtil.openHhtPopup(me, 'popup-qrscannerpopup', 'refBtnOpenQR', parms);
	},
	
	onTblBtnBarcode: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(me.QR_ACTIVE){
			me.onStopScanning(null);
			me.setQRButton(false);
			return;
		}
		me.setQRButton(true);
		me.startDeivce();
	},

	startDeivce: function(){
		var me = this;
		var refs = me.getReferences();
		
		var deviceNo = me.getCameraDevice();
		var reader = refs.refPnlqrcoderedercomp;
		me.clearCodeValue(null);
		Html5Qrcode.getCameras().then(devices => {
			/**
			 * devices would be an array of objects of type:
			 * { id: "id", label: "label" }
			 */
			if (devices && devices.length) {
				var device = (devices[deviceNo] == null ? devices[0] : devices[deviceNo])
				var cameraId = device.id ; //devices[0].id
				// .. use this to start scanning.
				me.onstartScanning(cameraId);
			}
		}).catch(err => {
			  // handle err
		});	
	},
	
	onstartScanning: function(cameraId) {
		var me = this;
		var refs = me.getReferences();
		var lastQrCode = null;
		var count = 0;
		if (me.html5QrCode) {
        	me.onStopScanning(null);
        }
		me.setHiddenScanner(false);
		me.html5QrCode = new Html5Qrcode(/* element id */ "qr-readerCMC");
		me.html5QrCode.start(
			cameraId,{
				fps: 10,    // Optional frame per seconds for qr code scanning
				//qrbox: 250  // Optional if you want bounded box UI
			},
			qrCodeMessage => {
				// scanning
					// stop scan if receive same qrCodeMessages for 3 times 
				if (qrCodeMessage !== lastQrCode) {
					lastQrCode = qrCodeMessage;
					console.log(qrCodeMessage);
					if (count > 0) count = count - 1;
				} else {
					count = count + 1;
				}
				if (count >= 3) {
					//set value to control
					me.onStopScanning(null);
					me.setHiddenScanner(true);
					me.setQRButton(false);
					me.setValueQRcode(qrCodeMessage);
					
				}
			},
			errorMessage => {
				// parse error, ignore it.
			}).catch(err => {
				// Start failed, handle it.
			});		
	},
	
	onStopScanning: function(value) {
		var me = this;
		var refs = me.getReferences();
		if(me.html5QrCode) {
			me.html5QrCode.stop().then((ignore) => {
				  // QR Code scanning is stopped.
				me.html5QrCode = null;
				me.setHiddenScanner(true);
				}).catch((err) => {
				  // Stop failed, handle it.
				});
		}
	},
	
	setHiddenScanner(hidden){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refPnlqrcoderedercomp;
		//panel.setHidden(hidden);
		if(hidden){
			//panel.setWidth(1);
			panel.setHeight(0);
		}else{
			panel.setWidth(me.FRAME_SIZE);
			panel.setHeight(me.FRAME_SIZE-100);
		}
	},
	
	onChangeYardTruck: function(ctl, newVal, oldVal, eOpts ){
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		var activeTab = refs.refTabCargoManualCtl.getActiveItem().name;
		var tab = refs.refTabCargoManualCtl.getActiveItem().reference;
		
		me.clearGrids();

		theSearch.set('lorryNo', '');
		theSearch.set('imtNo', '');
		theSearch.set('masterBL', '');
		theSearch.set('blNo', '');
		theSearch.set('SDONo', '');
		theSearch.set('bookingNo', '');
		theSearch.set('shipgNoteNo', '');
		theSearch.set('userRefNo', '');

		me.setConstrolSetting(tab);
	},
	
	onOpenTruckPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		
		if(!globalVesselCallId){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Vsl Call Id');
			return;
		}
		
		var searchParm = me.getViewModel().get('theSearch');
		var truckType = StringUtil.toUpperCase(searchParm.get('truckType'));
		var popupAlias = '';
		var title = '';
		
		var tabPanel = refs.refTabCargoManualCtl.getActiveItem().name;
		switch(tabPanel){
		case 'cmcexport':
			me.flag = true;
			break;
		
		case 'cmcimport':
			me.flag = false;
			break;
		}
		
		if(truckType === 'I'){
			//popupAlias = 'popup-apronyardtruckpopuphht';
			popupAlias = 'popup-assignedinternaltrucklistpopuphht';
			title = ViewUtil.getLabel('poup_title_internaltruckapron');
		}
		else {
			popupAlias = 'popup-ingatetrucklistpopuphht';
			title = ViewUtil.getLabel('poup_title_ingate_trucklist');
		}
		
		var params = {
				title: title,
				vslCallId: globalVesselCallId,
				lorryNo: refs.refTxtLorryNo.getValue(),
				blNo: refs.refCboBlNo.getValue(),
				shipgNoteNo:refs.refCboShipgNoteNo.getValue(),
				weightCheckYn: '',
				searchType: 'OP' //Operation
			};
		
	    
	    ViewUtil.openHhtPopup(me, popupAlias,  'refTxtLorryNo', params);
	      
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	setConstrolSetting: function (tab) {
		var me = this;
		var refs = me.getReferences();
		var isLd = false,
			isLdD = false,
			isLdI = false,
			isDs = false;

		if(tab == 'refPnlExport'){
			me.caTyCd = 'EX';
			isLd = true;
			if (refs.refChkYardTruck.getChecked()) {
				isLdI = true;
			} else {
				isLdD = true;
			}
			
			//Export tab
			refs.refFlsGrLoadingGrid.setHidden(!isLdD);
			refs.refFlsJobLoadingGrid.setHidden(!isLdI);
		} else {
			me.caTyCd = 'IM';
			isDs = true;
		}
		
		refs.refBtnLoading.setDisabled(!isLd);
		refs.refBtnDischarging.setDisabled(!isDs);
		
		refs.refContSnNo.setHidden(!isLd);
		refs.refContBlNo.setHidden(!isDs);
		
		//refs.refChkYardTruck.setHidden(!isLd);
	},
	
	getSearchConditionLoading: function (isIndicator) {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var vslCallId = me.getViewModel().get('globalVesselCallId');

		if (StringUtil.isNullorEmpty(vslCallId)) {
			MessageUtil.warning('warning_msg', 'tbl_global_vslcallid_selected');
			return null;
		}

		me.LIST_TYPE = '';
		if (searchParm.get('truckType') === 'I') { // YardTruck => ListType is Job (WA)
			me.LIST_TYPE = "JOBWA";//=> LD InDirect
		} else if (searchParm.get('truckType') === 'E'
			|| refs.refChkBargeOperation.getChecked() == true) {//Loading Direct or loading by Barge => ListType is GR List
			me.LIST_TYPE = "GR"; // => LD Direct
		} else {
			return null;
		}

		var store = me.getStore(me.EXPORT_STORE_NAME);
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var pageNo = store.currentPage;

		var sn = StringUtil.toUpperCase(searchParm.get('shipgNoteNo'));
		var lorryNo = StringUtil.toUpperCase(searchParm.get('lorryNo'));
		var truckType = StringUtil.toUpperCase(searchParm.get('truckType'));
		var bookingNo = StringUtil.toUpperCase(searchParm.get('bookingNo'));
		var userRefNo = StringUtil.toUpperCase(searchParm.get('userRefNo'));
		
		var imtNo = refs.refTxtIMTNo.getValue();

		var params = {
			vslCallId: vslCallId,
			shipgNoteNo: sn,
			lorryNo: lorryNo,
			lorryId: lorryNo,
			listType: me.LIST_TYPE,
			bookingNo: bookingNo,
			userRefNo: userRefNo,
			imtNo : imtNo,
			bargeCheckYn: refs.refChkBargeOperation.getChecked() ? 'Y' : 'N'
		};
		return params;
	},

	
	searchExportTbl:function(isScan){
		var me = this;
		var refs = me.getReferences();
		
		var params = me.getSearchConditionLoading();
		var store = me.getStore(me.EXPORT_STORE_NAME);

		if (params == null) {
			return;
		}

		store.load({
			params:params,
			callback: function(record, operation, success) {
				if (record && record.length <= 0) {
					if (me.LIST_TYPE == 'JOBWA') {
						MessageUtil.info('warning_msg', 'cargomanualctl_whcheck_job');
					} else {
						MessageUtil.noMatchData();
					}
				} else if (record && record.length === 1) {
					if(me.LIST_TYPE == 'JOBWA'){
						me.lookupReference('refGridCmcLoadingInDirectList').setSelection(record[0]);
					}else {
						me.lookupReference('refGridCmcLoadingDirectList').setSelection(record[0]);
					}
				}
			}
		});
	},
	
	getSearchConditionDischarging: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var isYardTruck = refs.refChkYardTruck.getChecked();
		

		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.IMPORT_STORE_NAME);
		var searchParm = me.getViewModel().get('theSearch');

		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var bl = searchParm.get('blNo');
		var masterBL = searchParm.get('masterBL');
		var lorryNo = StringUtil.toUpperCase(searchParm.get('lorryNo'));
		var userRefNo = StringUtil.toUpperCase(searchParm.get('userRefNo'));
		
		var imtNo = refs.refTxtIMTNo.getValue();

		if (StringUtil.isNullorEmpty(vslCallId)) {
			MessageUtil.warning('warning_msg', 'tbl_global_vslcallid_selected');
			return null;
		}

		if(refs.refChkBargeOperation.getChecked() == true) {
			me.LIST_TYPE = 'BARGE';
		} else {
			me.LIST_TYPE = 'BL';
		}
		
		var params = {
			vslCallId: vslCallId,
			blNo: bl,
			masterBL: masterBL,
			cgNo: bl,
			lorryNo: lorryNo,
			userRefNo: userRefNo,
			listType: me.LIST_TYPE,
			searchType: 'DISCHARGING',
			imtNo : imtNo,
			truckTpCd: isYardTruck ? CodeConstants.MT_LORRYTYPECCD_I : CodeConstants.MT_LORRYTYPECCD_E,
		};
		return params;
	},

	
	searchImportTbl:function(isScan){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchConditionDischarging();
		var store = me.getStore(me.IMPORT_STORE_NAME);
		
		if(!params){
			return;
		}
		
		store.load({
			params: params,
			callback: function (record, operation, success) {
				if (success) {
					if (record && record.length <= 0) {
						MessageUtil.noMatchData();
						
					} else if (record && record.length === 1) {
						me.lookupReference('refGridImportCargoManualCtlTab').setSelection(record[0]);
					}
				}
			}
		});
	},
	
	setValueQRcode: function(value){
		var me = this;
		var refs = me.getReferences();
		if(!value){
			return;
		}
		var theSearch =  me.getViewModel().get('theSearch');
		var store = me.getStore('qrScanning');
		store.load({
			params:{
				qrNo: value
			},
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						if(record[0].get('truckMode') === 'I'){
							refs.refChkYardTruck.setChecked(true);
							me.gateObject = new Object();
							theSearch.set('lorryNo', record[0].get('lorryNo'));
							theSearch.set('imtNo', record[0].get('imtNo'));
							
						} else {
							refs.refChkYardTruck.setChecked(false);
							theSearch.set('lorryNo', record[0].get('lorryNo'));
							me.gateObject.lorryNo = record[0].get('lorryNo');
							me.gateObject.gateTxnNo = record[0].get('gateTxnNo');
							me.gateObject.wbTransactionNo = record[0].get('wbTransactionNo');
						}
						
						if(!StringUtil.isNullorEmpty(record[0].get('blNo'))){//Import
							refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
							theSearch.set('masterBL', record[0].get('mfDocId'));
							theSearch.set('blNo', record[0].get('blNo'));
							theSearch.set('sdoNo', record[0].get('sdoNo'));
							me.gateObject.sdoNo = record[0].get('sdoNo');
							
							me.searchImportTbl(true);
						}
						else if(!StringUtil.isNullorEmpty(record[0].get('shipgNoteNo'))){//Export
							refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
							theSearch.set('bookingNo', record[0].get('mfDocId'));
							theSearch.set('shipgNoteNo', record[0].get('shipgNoteNo'));
							theSearch.set('grNo', record[0].get('grNo'));
							me.gateObject.grNo = record[0].get('grNo');
							
							me.searchExportTbl(true);
						}
						
					} else {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	clearCodeValue: function(ref){
		var me = this;
		var refs = me.getReferences();
		
		if(!ref){//Call by begin Scan -> clear SN and BL combo
			refs.refCboBookingNo.reset();
			refs.refCboShipgNoteNo.reset();
			refs.refTxtGrNo.setValue('');
			
			refs.refCboMBLNo.reset();
			refs.refCboBlNo.reset();
			refs.refTxtSdoNo.setValue('');
			
			refs.refChkYardTruck.setChecked(false);
			refs.refChkBargeOperation.setValue(false);
			refs.refTxtLorryNo.setValue('');
			refs.refTxtUserRefNo.setValue('');
		}
	},
	
	showTblLoadingPopUp(){
		var me = this;
		var refs = me.getReferences();
		var title = ViewUtil.getLabel('confirmLoadingTitle');
		var selection = null;
		var grid = null;
		
		var isLdI = false;
		var isLdD = false;
		if (refs.refChkYardTruck.getChecked()) {
			isLdI = true;
		} else {
			isLdD = true;
		}
		
		if(isLdI){
			grid = me.lookupReference('refGridCmcLoadingInDirectList');
			selection = grid.getSelection();
		}
		else {
			grid = me.lookupReference('refGridCmcLoadingDirectList');
			selection = grid.getSelection();
		}
		
		var isYardTruck = refs.refChkYardTruck.getChecked();
		var selectedRecord = selection[0];
		
		if (selection == null) {
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;

		} else if (selection.get('delvTpCd') === CodeConstants.MT_DELVTP_I && isLdD) {
			MessageUtil.warning('warning_msg', 'loading_indirect_block');
			return;

		} else {
			var searchParams = selection.clone();
			
			searchParams.title = title;
			searchParams.set('listType', me.LIST_TYPE);
			if(refs.refChkYardTruck.getChecked() == true){
				var lorryNo = searchParams.get('lorryNo');
				searchParams.set('lorryNo', lorryNo);
				searchParams.set('wbTransactionNo', searchParams.get('wbTransactionNo'));
				
			} else {
				searchParams.set('lorryNo', refs.refTxtLorryNo.getValue());
				searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
				searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
			}
			
			searchParams.set('bargeCheck', refs.refChkBargeOperation.getChecked() ? 'Y' : 'N');
		}
		
		//ViewUtil.openHhtPopup(me, 'app-confirmloadinghhtpopup', 'refBtnLoading', searchParams);
		
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		validationCodeStore.load({
			params : {
				tyCd : 'validationFinalCargo',
				col1 : selection.get('vslCallId'),
				col2 : selection.get('shipgNoteNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'Y'){
							ViewUtil.openHhtPopup(me, 'app-confirmloadinghhtpopup', 'refBtnLoading', searchParams);
						} else {
							MessageUtil.warning('warning_msg', 'cargomanualctl_no_longer_loading_msg');
						}
					}
				}
			}
		});
	},
	
	showTblDischargingPopUp(){
		var me = this;
		var refs = me.getReferences();
		var isYardTruck = refs.refChkYardTruck.getChecked()
		var searchParm = me.getViewModel().get('theSearch');
	
		var grid = me.lookupReference('refGridImportCargoManualCtlTab');
		var selection = grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		var selectedParams = selection.clone();
		selectedParams.title = ViewUtil.getLabel('confirmDischargingTitle');
		selectedParams.set('caTyCd', me.caTyCd);
		selectedParams.set('listType', me.LIST_TYPE);
		selectedParams.set('lorryNo', searchParm.get('lorryNo'));
		selectedParams.set('truckType', searchParm.get('truckType'));
		selectedParams.set('vslCallId', me.getViewModel().get('globalVesselCallId'));
		selectedParams.set('scn', me.getViewModel().get('theVessel').scn);
		selectedParams.set('bargeCheck', refs.refChkBargeOperation.getChecked() ? 'Y' : 'N');

		selectedParams.set('gateTxnNo', me.gateObject.gateTxnNo);
		selectedParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
		selectedParams.set('isYardTruck', isYardTruck);
		
		
		if ( me.LIST_TYPE == 'BL' && me.gateObject) {
			selectedParams.set('sdoNo', me.gateObject.sdoNo);
		}

		selectedParams.commit();
		ViewUtil.openHhtPopup(me, 'app-confirmdischarginghhtpopup', 'refBtnDischarging', selectedParams);
	},
	
	onChangeSearchCondition: function(){
		var me = this;
		var refs = me.getReferences();
		var expStore = me.getStore(me.EXPORT_STORE_NAME);
		expStore.removeAll();
		var impStore = me.getStore(me.IMPORT_STORE_NAME);
		impStore.removeAll();
		
	},
	
	// Popup Data
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlSnBl');
		var snStore = me.getStore('cargoManualCtlForSnCombo');
		var blStore = me.getStore('cargoManualCtlForBlCombo');

		var bkNoStore = me.getStore('cargoManualCtlForBookingNoCombo');
		var masterBlStore = me.getStore('cargoManualCtlForMasterBlCombo');
		
		me.onChangeSearchCondition();
		
		if(targetControl === 'refTxtLorryNo'){
			if(returnValue) {
				
				var theSearch =  me.getViewModel().get('theSearch');
				var snNo = returnValue.item.get('shipgNoteNo');
				var blNo = returnValue.item.get('blNo');
				var bookingNo = returnValue.item.get('bookingNo');
				var masterBL = returnValue.item.get('masterBL');

				theSearch.set('lorryNo', returnValue.code);				
				theSearch.set('shipgNoteNo', snNo);
				theSearch.set('blNo', blNo);
				theSearch.set('bookingNo', bookingNo);
				theSearch.set('masterBL', masterBL);

				if(returnValue.item && returnValue.item.lorryNo) {
					theSearch.set('lorryNo',returnValue.item.lorryNo)
				}
				
				me.gateObject = returnValue.item.data;

				if(!refs.refChkYardTruck.getChecked()){
					me.GATETXNNO = returnValue.item.data.gateTxnNo;
				}
				me.onTblRetrieve();
			}
		}
		else if (targetControl === 'refBtnOpenQR') {
			if(returnValue){
				me.setValueQRcode(returnValue.code);
			}
		}

	},
	
	clearGrids: function(){
		var me = this;
		var impStore = me.getStore(me.IMPORT_STORE_NAME);
		var expStore = me.getStore(me.EXPORT_STORE_NAME);

		impStore.removeAll();
		impStore.commitChanges();
		expStore.removeAll();
		expStore.commitChanges();
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
//
//	
//	onFocus: function(ctrl, e, eOpts){
//		var me = this;
//		var refs = me.getReferences();
//		if(ctrl.reference === 'refTxtGrNo' || ctrl.reference === 'refCboShipgNoteNo'){
//			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
//			me.clearCodeValue('refTxtGrNo')
//		}else if(ctrl.reference === 'refTxtDO' || ctrl.reference === 'refCboBlNo'){
//			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
//			if(ctrl.reference === 'refTxtDO'){}
//			me.clearCodeValue('refTxtDO')
//		}else if(ctrl.reference === 'refTxtGP'){
//			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlGatePass);
//			me.clearCodeValue('refTxtGP')
//		}
//	},
//	
//	onSelectDoc: function(ctrl, e, eOpts){
//		var me = this;
//		var refs = me.getReferences();
//		if(ctrl.reference === 'refCboShipgNoteNo'){
//			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
//		}else if(ctrl.reference === 'refCboBlNo'){
//			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
//		}
//		me.clearCodeValue(ctrl.reference);
//	},
//
//	
	/**
	 * 
	 * =======================================
	 */		

	/**
	 * 
	 * =======================================
	 */		
//	onHHTLoad: function(){
//		var me = this;
//		var refs = me.getReferences();		
//	},
	
//	onGRBLSearchHHT : function(){
//		var me = this;
//		var refs = me.getReferences();
//		var exportStore = me.getStore('cargoManualCtlTabExport');
//		var importStore = me.getStore('cargoManualCtlTabImport');
//		var grblPopupGrideStore = me.getStore('grblPopupGrideStore');
//		var GRBLType =refs.refGLBLToggleButton.getItems().items[0].getValue()
//		var code = refs.refgrblCode.getValue();
//		if(code != null){
//			code =  code.toUpperCase();
//		}
//		if(me.getView().recvData){
//			if(me.getView().recvData.vslCallId == null){
//				vslCallId = 'NonCallId';
//			}else{
//				vslCallId = me.getView().recvData.vslCallId;
//			}
//		}
//		if(GRBLType == 'GR'){
//			exportStore.load({
//				params: {
//					vslCallId : vslCallId,
//					cgNo : code
//				},
//				callback: function(records, operation, success) {
//					if (success) {
//						grblPopupGrideStore.removeAll();
//						for(var i = 0; i < records.length ; i++ ){
//							grblPopupGrideStore.insert(i, [{vslCallId : records[i].data.vslCallId ,code:records[i].data.grNo}]);
//						}
//					}
//				}
//			});
//		}
//		else if(GRBLType == 'BL'){
//			importStore.load({
//				params: {
//					vslCallId : vslCallId,
//					blNo : code
//				},
//				callback: function(records, operation, success) {
//					if (success) {
//						grblPopupGrideStore.removeAll();
//						for(var i = 0; i < records.length ; i++ ){
//							grblPopupGrideStore.insert(i, [{vslCallId : records[i].data.vslCallId ,code:records[i].data.blNo}]);
//						}
//					}
//				}
//			})
//		}
//	},
//	
//	onDblTab: function() {
//		var me = this; 
//		var window = me.getView().up('window');
//		
//		if(window.returnValue != null){
//			window.close();	
//		}
//		
//		window.returnValue = me.getReturnData();
//		window.close();
//	},
//	
//	
//	
//	
//	
//	getReturnData:function(){
//		var me = this;
//		var grid = me.lookupReference('refGRBLPopupHHTGrid');
//		var selection;
//		
//		if(grid){
//			if(Ext.isClassic){
//				selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//			}
//			else{
//				selection = grid.getSelection() == null ? null : grid.getSelection();
//			}
//		}
//		var returnItem = {
//			code : selection.data.code,
//			codeName : selection.data.code,
//			item : selection
//		}
//		
//		return returnItem;
//	},
//	
//	
//	onSelectData : function(ref){
//		var me = this; 
//		var window = me.getView().up('window');
//		if(ref.getReference() == 'refBtnSelectGLBLHHT'){//Select from JPVC:
//			window.returnValue = me.getJPVCReturnDataHHT();
//		}
//		if(window.returnValue != null){
//			window.close();	
//		}
//	},
//	
//	getJPVCReturnDataHHT : function() {
//		var me = this;
//		var refs = me.getReferences();
//		var window = me.getView().up('window');
//		
//		var grid = me.lookupReference('refGRBLPopupHHTGrid');
//		selection = grid.getSelection() == null ? null : grid.getSelection();
//		
//		if(selection == null){
//			MessageUtil.warning('Warning', 'tbl_sts_select');
//			return null;
//		}
//		
//		var returnItem = {
//			code : selection.data.code,
//			codeName : selection.data.code,
//			item : selection
//		}
//
//    	window.returnValue = returnItem;
//		if(window.returnValue != null){
//			window.close();	
//		}
//	},
//
//	onOpenCommonPopup:function(args){
//		var me = this;
//		var refs = me.getReferences();
//		if(args == 'hatchNo'){ // For Hatch Multi Select
//			var params = {
//				searchType:'COMM',
//				searchLcd: 'MT',
//				searchDivCd: 'HTC'
//			};
//			me.openHhtPopup('popup-cmmcdpopupmultiselect', 'ctlHatchNo', params);
//		}
//		if(args == 'hatchNoExportTab'){ // For Hatch Export Tab Multi Select
//			var params = {
//				searchType:'COMM',
//				searchLcd: 'MT',
//				searchDivCd: 'HTC'
//			};
//			me.openHhtPopup('popup-cmmcdpopupmultiselect', 'ctlCargoManualCtlHatchNoExportTab', params);
//		}
//	},
//	
//	getReturnData:function(){
//		var me = this;
//		var grid = me.lookupReference('refGRBLPopupHHTGrid');
//		var selection;
//		
//		if(grid){
//			if(Ext.isClassic){
//				selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//			}
//			else{
//				selection = grid.getSelection() == null ? null : grid.getSelection();
//			}
//		}
//		var returnItem = {
//			code : selection.data.code,
//			codeName : selection.data.code,
//			item : selection
//		}
//		
//		return returnItem;
//	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});