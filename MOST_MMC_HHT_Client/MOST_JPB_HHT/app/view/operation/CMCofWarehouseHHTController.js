Ext.define('MOST.view.operation.CMCofWarehouseHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [

	],

	alias: 'controller.cmcofwarehousehht',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	EXPORT_GRID_REF_NAME: 'refCargoManualCtlTabExportGrid',
	IMPORT_GRID_REF_NAME: 'refCargoManualCtlTabImportGrid',

	EXPORT_STORE_NAME: 'cargoManualCtlTabExport',
	IMPORT_STORE_NAME: 'cargoManualCtlTabImport',

	NUMBER_FORMAT: '0,000',
	caTyCd: 'GR',
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
	onTblLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');

		var searchParm = Ext.create('MOST.model.operation.SearchCargoMasterParm');
		searchParm.set('truckType', 'E');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });

		if (!globalVesselCallId)
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
				vslCallId: globalVesselCallId
			}
		});

		blNoStore.load({
			params: {
				vslCallId: globalVesselCallId
			}
		});

		bookingNoStore.load({
			params: {
				vslCallId: globalVesselCallId
			}
		});

		shipgNoteNoStore.load({
			params: {
				vslCallId: globalVesselCallId
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
	onActivateTabHHT: function (ref) {
		var me = this;
		var tab = ref.reference;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');

		me.setConstrolSetting(tab);

	},

	onTblRetrieve: function () {
		var me = this;
		var refs = me.getReferences();
		var tabPanel = refs.refTabCargoManualCtl.getActiveItem().name;

		var imtNo = refs.refTxtIMTNo.getValue();

		if (imtNo != '') {
			me.setValueQRcode(imtNo);
			return;
		}

		switch (tabPanel) {
			case 'cmcexport':
				me.searchExportTbl();
				break;
			case 'cmcimport':
				me.searchImportTbl();
				break;
		}
	},

	//Button WhCheck:
	onTblWhCheck: function () { //Go to W/H Check
		var me = this;
		me.showTblWhCheckPopUp();
	},

	//Button HandlingOut:
	onTblHandlingOut: function () {
		var me = this;
		var refs = me.getReferences();
		me.showTblHandlingOutPopUp();
	},

	//Button HandlingIn:
	onTblHandlingIn: function () {
		var me = this;
		var refs = me.getReferences();
		me.showTblHandlingInPopUp();
	},

	//Button Movement:
	onTblMovement: function () {
		var me = this;
		var refs = me.getReferences();
		var title = ViewUtil.getLabel('poup_title_confirmmovement');
		var grid;

		switch (refs.refTabCargoManualCtl.getActiveItem().name) {
			case 'cmcexport':
				grid = me.lookupReference('refGridCmcLoadingInDirectList');
				break;

			case 'cmcimport':
				grid = me.lookupReference('refGridImportCargoManualCtlTab');
				break;
		}

		var selection = grid.getSelection();

		if (selection == null) {
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		} else {
			if (selection.get('statCd') === 'RS') {
				MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
				return;
			}

			var searchParams = selection.clone();
			searchParams.title = title;
			searchParams.set('caTyCd', me.caTyCd);

			ViewUtil.openHhtPopup(this, 'app-cargoMovementhht', 'refBtnMovement', searchParams);
		}
	},

	//QR scan
	getCameraDevice: function () {
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		return (deviceNo == null) ? 0 : deviceNo;
	},

	onChangeSegmentCam: function () {
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		if (me.QR_ACTIVE) {
			me.startDeivce();
		}
	},

	setQRButton: function (active) {
		var me = this;
		var refs = me.getReferences();
		var qrBtn = refs.refBtnQRScan;

		if (active) {
			qrBtn.setText(me.TXT_CANCEL);
		} else {
			qrBtn.setText(me.TXT_QRSCAN);
		}
		me.QR_ACTIVE = active;
	},

	onTblBtnBarcode: function () {
		var me = this;
		var refs = me.getReferences();

		if (me.QR_ACTIVE) {
			me.onStopScanning(null);
			me.setQRButton(false);
			return;
		}
		me.setQRButton(true);
		me.startDeivce();
	},

	startDeivce: function () {
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
				var cameraId = device.id; //devices[0].id
				// .. use this to start scanning.
				me.onstartScanning(cameraId);
			}
		}).catch(err => {
			// handle err
		});
	},

	onstartScanning: function (cameraId) {
		var me = this;
		var refs = me.getReferences();
		var lastQrCode = null;
		var count = 0;
		if (me.html5QrCode) {
			me.onStopScanning(null);
		}
		me.setHiddenScanner(false);
		me.html5QrCode = new Html5Qrcode(/* element id */ "qr-readerCMC2");
		me.html5QrCode.start(
			cameraId, {
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

	onStopScanning: function (value) {
		var me = this;
		var refs = me.getReferences();
		if (me.html5QrCode) {
			me.html5QrCode.stop().then((ignore) => {
				// QR Code scanning is stopped.
				me.html5QrCode = null;
				me.setHiddenScanner(true);
			}).catch((err) => {
				// Stop failed, handle it.
			});
		}
	},

	setHiddenScanner(hidden) {
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refPnlqrcoderedercomp;
		//panel.setHidden(hidden);
		if (hidden) {
			//panel.setWidth(1);
			panel.setHeight(0);
		} else {
			panel.setWidth(me.FRAME_SIZE);
			panel.setHeight(me.FRAME_SIZE - 100);
		}
	},

	onChangeYardTruck: function (ctl, newVal, oldVal, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');

		var activeTab = refs.refTabCargoManualCtl.getActiveItem().name;
		var tab = refs.refTabCargoManualCtl.getActiveItem().reference;

		me.clearGrids();

		me.setConstrolSetting(tab);
	},

	onOpenTruckPopup: function () {
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');

		var searchParm = me.getViewModel().get('theSearch');
		var truckType = StringUtil.toUpperCase(searchParm.get('truckType'));
		var popupAlias = '';
		var title = '';

		if (!globalVesselCallId) {
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Vessel Call Id');
			return;
		}

		switch (refs.refTabCargoManualCtl.getActiveItem().name) {
			case 'cmcexport':
				me.flag = true;
				break;

			case 'cmcimport':
				me.flag = false;
				break;
		}

		if (truckType === 'I') {
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
			shipgNoteNo: refs.refCboShipgNoteNo.getValue(),
			weightCheckYn: '',
		};


		ViewUtil.openHhtPopup(me, popupAlias, 'refTxtLorryNo', params);

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

		if (tab == 'refPnlExport') {
			me.caTyCd = 'EX';
			isLd = true;

			if (me.LIST_TYPE == 'GR') {
				refs.refFlsGrLoading.setHidden(false);
				refs.refFlsSnWhCheckExport.setHidden(true);
			}
			else {
				refs.refFlsGrLoading.setHidden(true);
				refs.refFlsSnWhCheckExport.setHidden(false);
			}
		} else {
			me.caTyCd = 'IM';
			isDs = true;
		}

		refs.refBtnHandlingIn.setDisabled(!isLd);
		refs.refBtnHandlingOut.setDisabled(!isDs);

		refs.refContSnNo.setHidden(!isLd);
		refs.refContBlNo.setHidden(!isDs);

		//refs.refChkYardTruck.setHidden(!isDs);
	},

	getSearchConditionLoading: function (isIndicator) {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var lorryNo = refs.refTxtLorryNo.getValue();

		if (StringUtil.isNullorEmpty(vslCallId)) {
			MessageUtil.warning('warning_msg', 'tbl_global_vslcallid_selected');
			return null;
		}

		me.LIST_TYPE = '';

		if (searchParm.data.truckType == 'E') {//Handling In => ListType is GR List
			me.LIST_TYPE = "GR"; // => LD Direct
		} else if (searchParm.data.truckType == 'I') {// Warehouse check => ListType is SN level
			me.LIST_TYPE = "SN"; // => WH
		}

		if (me.LIST_TYPE == 'GR') {
			refs.refFlsGrLoading.setHidden(false);
			refs.refFlsSnWhCheckExport.setHidden(true);
		}
		else {
			refs.refFlsGrLoading.setHidden(true);
			refs.refFlsSnWhCheckExport.setHidden(false);
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
			imtNo: imtNo,
			truckType: truckType == 'E' ? 0 : 1
		};
		return params;
	},


	searchExportTbl: function (isScan) {
		var me = this;
		var refs = me.getReferences();

		var params = me.getSearchConditionLoading();
		var store = me.getStore(me.EXPORT_STORE_NAME);

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (record, operation, success) {
				if (record && record.length <= 0) {
					if (me.LIST_TYPE == 'SN') {
						MessageUtil.info('warning_msg', 'cargomanualctl_whcheck_job');

					} else {
						MessageUtil.noMatchData();

					}
				} else if (record.length === 1) {
					if (me.LIST_TYPE == 'SN') {
						me.lookupReference('refGridCmcLoadingInDirectList').setSelection(record[0]);

					} else {
						me.lookupReference('refGridExportCargoManualCtlTab').setSelection(record[0]);

					}
				}
			}
		});
	},

	getSearchConditionImportWhCheck: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var grid = null;

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

		me.LIST_TYPE = '';

		if (searchParm.get('truckType') === 'I') {
			// YardTruck => ListType is Job (VA)
			me.LIST_TYPE = 'JOBVA';
			//grid.setColumns(GridUtil.getGridColumns('cargoManualCtlTabImportWHcheck'));
		} else {
			//grid.setColumns(GridUtil.getGridColumns('CargoManualCtlTabImport'));
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
			imtNo: imtNo

		};
		return params;
	},


	searchImportTbl: function (isScan) {
		var me = this;
		var refs = me.getReferences();

		var params = me.getSearchConditionImportWhCheck();
		var store = me.getStore(me.IMPORT_STORE_NAME);

		if (!params) {
			return;
		}

		store.load({
			params: params,
			callback: function (record, operation, success) {
				if (success) {
					if (record && record.length <= 0) {
						MessageUtil.noMatchData();

					} else if(record.length === 1){
						me.lookupReference('refGridImportCargoManualCtlTab').setSelection(record[0]);

					}
				}
			}
		});
	},

	setValueQRcode: function (value) {
		var me = this;
		var refs = me.getReferences();
		if (!value) {
			return;
		}

		var theSearch = me.getViewModel().get('theSearch');

		var store = me.getStore('qrScanning');
		store.load({
			params: {
				qrNo: value
			},
			callback: function (record, operation, success) {
				if (success) {
					if (record != null && record.length > 0) {
						theSearch.set('imtNo', record[0].get('imtNo'));

						if (record[0].get('truckMode') === 'I') {
							refs.refChkYardTruck.setChecked(true);
							me.gateObject = new Object();
							theSearch.set('lorryNo', record[0].get('lorryNo'));
							refs.refTxtLorryNo.setValue(record[0].get('lorryNo'));

							me.gateObject.lorryNo = record[0].get('lorryNo');
							me.gateObject.wbTransactionNo = record[0].get('wbTransactionNo');
						} else {
							me.gateObject = new Object();
							refs.refChkYardTruck.setChecked(false);
							refs.refTxtLorryNo.setValue(record[0].get('lorryNo'));
							theSearch.set('lorryNo', record[0].get('lorryNo'));
							me.gateObject.lorryNo = record[0].get('lorryNo');
							me.gateObject.gateTxnNo = record[0].get('gateTxnNo');
							me.gateObject.wbTransactionNo = record[0].get('wbTransactionNo');
						}

						if (!StringUtil.isNullorEmpty(record[0].get('blNo'))) {//Import
							refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
							theSearch.set('masterBL', record[0].get('mfDocId'));
							theSearch.set('blNo', record[0].get('blNo'));
							theSearch.set('sdoNo', record[0].get('sdoNo'));
							me.gateObject.sdoNo = record[0].get('sdoNo');

							me.searchImportTbl(true);
						}
						else if (!StringUtil.isNullorEmpty(record[0].get('shipgNoteNo'))) {//Export
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

	clearCodeValue: function (ref) {
		var me = this;
		var refs = me.getReferences();

		if (!ref) {//Call by begin Scan -> clear SN and BL combo
			refs.refCboBookingNo.reset();
			refs.refCboShipgNoteNo.reset();
			refs.refTxtGrNo.setValue('');

			refs.refCboMBLNo.reset();
			refs.refCboBlNo.reset();
			refs.refTxtSdoNo.setValue('');

			refs.refChkYardTruck.setChecked(false);
			refs.refTxtLorryNo.setValue('');
			refs.refTxtUserRefNo.setValue('');
		}
	},

	showTblWhCheckPopUp() {
		var me = this;
		var refs = me.getReferences();
		var title = ViewUtil.getLabel('confirmHandlingOutTitle');
		var grid;
		var title;
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var tab = refs.refTabCargoManualCtl.getActiveItem().reference;

		if (tab == 'refPnlExport') {
			grid = me.lookupReference('refGridCmcLoadingInDirectList');
			title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWHE');
		} else {
			grid = me.lookupReference('refGridImportCargoManualCtlTab');
			title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWHI');
		}

		var selection = grid.getSelection();
		var searchParams = '';

		if (selection == null) {
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}

		if (me.LIST_TYPE == 'JOBVA') {
			searchParams = selection.clone();
			searchParams.title = title;

			ViewUtil.openHhtPopup(me, 'app-warehousecheckforimporthht', 'refBtnWhCheck', searchParams);

		} else {
			if (tab == 'refPnlImportt') {
				MessageUtil.warning('warning_msg', 'cargomanualctl_warehouse_check_import_msg');
				return;
			} else {

				if (me.LIST_TYPE !== 'SN') {
					MessageUtil.warning('warning_msg', 'cargomanualctl_whcheck_export_msg');
					return;
				}

				searchParams = selection.clone();
				searchParams.title = title;
				ViewUtil.openHhtPopup(me, 'app-warehousecheckforexporthht', 'refBtnWhCheck', searchParams);
			}
		}
	},

	showTblHandlingOutPopUp() {
		var me = this;
		var refs = me.getReferences();
		var title = ViewUtil.getLabel('confirmHandlingOutTitle');
		var grid;

		switch (refs.refTabCargoManualCtl.getActiveItem().name) {
			case 'cmcexport':
				grid = me.lookupReference('refGridExportCargoManualCtlTab');
				break;

			case 'cmcimport':
				grid = me.lookupReference('refGridImportCargoManualCtlTab')
				break;
		}

		var selection = grid.getSelection();

		if (selection == null) {
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}

		//		if(selection.get('fnlDelvYn')=='Y'){
		//			MessageUtil.warning('warning_msg', 'confirmhandlingout_handledOut_msg');
		//			return;
		//		}else {
		//			if(selection.get('statCd') === 'RS' 
		//				|| selection.get('statCd') === 'OS' 
		//					|| selection.get('isExistedCargo') != 'Y'
		//						){
		//				MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
		//				return;
		//			}
		//			
		//			var searchParams = selection.clone();
		//			searchParams.title ='Confirm Handling OUT';
		//			searchParams.set('caTyCd', 'IM');
		//			searchParams.set('lorryNo', me.gateObject.lorryNo);
		//			searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
		//			searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
		//			searchParams.commit();
		//						
		//			ViewUtil.openHhtPopup(this, 'app-confirmhandlingOutHHT', 'refHOBtn', searchParams);
		//		}
		if (me.LIST_TYPE == 'BL') {
			if (selection.get('statCd') === 'RS' || !selection.get('isExistedCargo') || selection.get('isExistedCargo') != 'Y') {
				MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
				return;
			}

			var searchParams = selection.clone();
			//			searchParams.set('shftDt', refs.ctlCargoManualCtlShiftDt.getValue());
			//			searchParams.set('shftId', refs.ctlCargoManualCtlShiftNo.getValue());
			//			searchParams.set('shftNm', refs.ctlCargoManualCtlShiftNo.getRawValue());
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
			searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
			searchParams.set('sdoNo', me.gateObject.sdoNo);
			searchParams.set('grNo', me.gateObject.grNo);
			searchParams.set('title', title);
			searchParams.title = title;
			searchParams.commit();

			//me.getView().detailViewAlias = 'app-cargohandlingout';
			//me.openDetailPopup(searchParams, title);
			ViewUtil.openHhtPopup(this, 'app-confirmhandlingOutHHT', 'refHOBtn', searchParams);
		}
		else {
			/*MessageUtil.warning('warning_msg', 'cargomanualctl_handling_out_msg');
			return;*/

			var searchParams = selection.clone();
			//			searchParams.set('shftDt', refs.ctlCargoManualCtlShiftDt.getValue());
			//			searchParams.set('shftId', refs.ctlCargoManualCtlShiftNo.getValue());
			//			searchParams.set('shftNm', refs.ctlCargoManualCtlShiftNo.getRawValue());
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
			searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
			searchParams.set('sdoNo', me.gateObject.sdoNo);
			searchParams.set('grNo', me.gateObject.grNo);
			searchParams.set('title', title);
			searchParams.title = title;
			searchParams.commit();

			//me.getView().detailViewAlias = 'app-cargohandlingout';
			//me.openDetailPopup(searchParams, title);
			ViewUtil.openHhtPopup(this, 'app-confirmhandlingOutHHT', 'refHOBtn', searchParams);
		}
	},

	showTblHandlingInPopUp() {
		var me = this;
		var refs = me.getReferences();

		var title = ViewUtil.getLabel('poup_title_confirmhi');
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		var searchParams = '';

		if (me.LIST_TYPE !== 'GR') {
			MessageUtil.warning('warning_msg', 'cargomanualctl_handlingin_msg');
			return;
		}

		if (selection == null) {
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		} else {
			searchParams = selection.clone();
			searchParams.title = title;
			searchParams.set('lorryNo', me.gateObject.lorryNo);
			searchParams.set('gateTxnNo', me.gateObject.gateTxnNo);
			searchParams.set('wbTransactionNo', me.gateObject.wbTransactionNo);
			searchParams.commit();

			validationCodeStore.load({
				params: {
					tyCd: 'validationFinalCargo4HandlingIn',
					col1: selection.get('vslCallId'),
					col2: selection.get('shipgNoteNo')
				},

				callback: function (records, operation, success) {
					if (success) {
						if (records != null && records.length > 0) {
							if (records[0].get('isValidated') === 'Y') {
								ViewUtil.openHhtPopup(me, 'app-confirmhandlinginhhtpopup', 'refBtnHandlingIn', searchParams);
							} else {
								MessageUtil.warning('warning_msg', 'confirmhandlingin_final_msg');
							}
						}
					}
				}
			});
		}
	},

	onChangeSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var expStore = me.getStore(me.EXPORT_STORE_NAME);
		expStore.removeAll();
		var impStore = me.getStore(me.IMPORT_STORE_NAME);
		impStore.removeAll();

	},

	// Popup Data
	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlSnBl');
		var snStore = me.getStore('cargoManualCtlForSnCombo');
		var blStore = me.getStore('cargoManualCtlForBlCombo');

		var bkNoStore = me.getStore('cargoManualCtlForBookingNoCombo');
		var masterBlStore = me.getStore('cargoManualCtlForMasterBlCombo');

		me.onChangeSearchCondition();

		if (targetControl === 'refTxtLorryNo') {
			if (returnValue) {

				var theSearch = me.getViewModel().get('theSearch');
				var snNo = returnValue.item.get('shipgNoteNo');
				var blNo = returnValue.item.get('blNo');
				var bookingNo = returnValue.item.get('bookingNo');
				var masterBL = returnValue.item.get('masterBL');

				theSearch.set('lorryNo', returnValue.code);
				theSearch.set('shipgNoteNo', snNo);
				theSearch.set('blNo', blNo);
				theSearch.set('bookingNo', bookingNo);
				theSearch.set('masterBL', masterBL);
				me.gateObject = returnValue.item.data;
				
				if (!refs.refChkYardTruck.getChecked()) {
					me.GATETXNNO = returnValue.item.data.gateTxnNo;
				}

				me.onTblRetrieve();
			}
		}

	},

	onClickForExportTab: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var selection = grid.getSelection() == null ? null : grid.getSelection();

		if (selection == null) return;

		if (selection.data.rhdlMode == 'Y' && selection.data.catgNm != 'TransShipment') {
			refs.refBtnHandlingIn.setDisabled(true);
			refs.refBtnHandlingOut.setDisabled(false);
		} else {
			refs.refBtnHandlingIn.setDisabled(false);
			refs.refBtnHandlingOut.setDisabled(true);
		}
	},

	onClickForExportTab1: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var selection = grid.getSelection() == null ? null : grid.getSelection();

		if (selection == null) return;

		if (selection.data.rhdlMode == 'Y' && selection.data.catgNm != 'TransShipment') {
			refs.refBtnHandlingIn.setDisabled(true);
			refs.refBtnHandlingOut.setDisabled(false);
		} else {
			refs.refBtnHandlingIn.setDisabled(false);
			refs.refBtnHandlingOut.setDisabled(true);
		}
	},

	clearGrids: function () {
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

});