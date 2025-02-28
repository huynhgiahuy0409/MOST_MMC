Ext.define('MOST.view.operation.hht.CargoManualCtlHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.cargomanualctlhht',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	GENERAL_GRID_REF_NAME: 'refCargoManualCtlGenerlTabGrid',
	EXPORT_GRID_REF_NAME: 'refCargoManualCtlTabExportGrid',
	IMPORT_GRID_REF_NAME: 'refCargoManualCtlTabImportGrid',
	GATEPASS_GRID_REF_NAME: 'refCargoManualCtlTabGatePassGrid',

	GENERAL_STORE_NAME: 'cargoManualCtlCargoGeneral',
	EXPORT_STORE_NAME: 'cargoManualCtlTabExport',
	IMPORT_STORE_NAME: 'cargoManualCtlTabImport',
	GATEPASS_STORE_NAME: 'cargoManualCtlTabGatePass',
	
	NUMBER_FORMAT : '0,000',
	caTyCd : 'GR',
	MAX_HATCH_NO: 11,
	ATBSTR: null,
	LIST_TYPE: '',
	gateObject: new Object(),
	flag: null,
	GATETXNNO: '',
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
		//Load SN BL Combobox:
		var shiftComboStore = me.getStore('shiftCombo'); //('shiftCombo');
		var store = me.getStore('cargoManualCtlSnBl');
		var snStore = me.getStore('cargoManualCtlForSnCombo');
		var blStore = me.getStore('cargoManualCtlForBlCombo');
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		
		var searchParm = Ext.create('MOST.model.operation.SearchCargoMasterParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		if(!globalVesselCallId)
			return;
		store.load({
			params : {
				opType : 'cgMst',
				vslCallId : me.getViewModel().get('globalVesselCallId')
			},
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						snStore.setData(record[0].get('snList'));
						snStore.each(function (record, index) {
							var spnNm = record.get('shipgNoteNo');
							record.set('spnNm', spnNm);
						});
						snStore.insert(0, [{shipgNoteNo: '', spnNm: 'All'}]);
						snStore.commitChanges();
						
						
						blStore.setData(record[0].get('blList'));
						blStore.each(function (record, index) {
							var blNm = record.get('blno');
							record.set('blNm', blNm);
						});
						blStore.insert(0, [{blno: '', blNm: 'All'}]);
						blStore.commitChanges();
					}
				}
			}
		});
		shiftComboStore.load({
			callback: function(record, operation, success) {
				if(success){
					me.setWorkDateShift();
				}
			}
		});
	},
	
	QR_ACTIVE: false,
	TXT_CANCEL: 'Cancel',
	TXT_QRSCAN: 'QR Scan',
	FRAME_SIZE: 400,
	
	getCameraDevice: function (){
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
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
		var qrBtn = refs.refBtnQRScan;
		
		if(active){
			qrBtn.setText(me.TXT_CANCEL);
		}else{
			qrBtn.setText(me.TXT_QRSCAN);
		}
		me.QR_ACTIVE = active;
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
		var html5QrCode = document.getElementById('qr-readerCMC');
		var count = 0;
        if (html5QrCode.children.length > 0) {
        	me.onStopScanning(null);
        }
        me.setHiddenScanner(false);
		html5QrCode = new Html5Qrcode(/* element id */ "qr-readerCMC");
		html5QrCode.start(
			cameraId,{
				fps: 10,    // Optional frame per seconds for qr code scanning
				qrbox: 250  // Optional if you want bounded box UI
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
		var html5QrCode = document.getElementById('qr-readerCMC');
		if (html5QrCode.children && html5QrCode.children.length > 0) {
			var mediaStream = html5QrCode.children[0].srcObject;
			var tracks = mediaStream.getTracks();
			tracks[0].stop();
		}
		html5QrCode = null;
		me.setHiddenScanner(true);
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
	
	clearCodeValue: function(ref){
		var me = this;
		var refs = me.getReferences();
		
		if(!ref){//Call by begin Scan -> clear SN and BL combo
			refs.refCbxSN.reset();
			refs.refCbxBL.reset();
			refs.refTxtGR.setValue('');
			refs.refTxtDO.setValue('');
			refs.refTxtGP.setValue('');
		}
		if(ref == 'refTxtGR' || ref == 'refCbxSN'){
			refs.refCbxBL.reset();
			refs.refTxtDO.setValue('');
			refs.refTxtGP.setValue('');
		}
		if(ref == 'refTxtDO' || ref == 'refCbxBL'){
			refs.refCbxSN.reset();
			refs.refTxtGR.setValue('');
			refs.refTxtGP.setValue('');
		}
		if(ref == 'refTxtGP'){
			refs.refCbxSN.reset();
			refs.refCbxBL.reset();
			refs.refTxtGR.setValue('');
			refs.refTxtDO.setValue('');
		}
	},
	
	setValueQRcode: function(value){
		var me = this;
		var refs = me.getReferences();
		var docTp = null;
		var crrValue = '';
		if(!value){
			return;
		}
		docTp = me.checkDocType(value);
		if(!docTp){
			return;
		}
		switch(docTp){
			case 'GR':
				crrValue = refs.refTxtGR.getValue();;
				refs.refTxtGR.setValue(value);
				refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
				if(value != crrValue){
					me.searchExportTbl(true);
				}
				break;
			case 'DO':
				crrValue = refs.refTxtDO.getValue();;
				refs.refTxtDO.setValue(value);
				refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
				if(value != crrValue){
					me.searchImportTbl(true);
				}
				break;
			case 'GP':
				crrValue = refs.refTxtGP.getValue();
				refs.refTxtGP.setValue(value);
				refs.refTabCargoManualCtl.setActiveItem(refs.refPnlGatePass);
				if(value != crrValue){
					me.searchGatePassTbl();
				}
				break;
			default:
				break;
		}
	},
	
	onFocus: function(ctrl, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		if(ctrl.reference === 'refTxtGR' || ctrl.reference === 'refCbxSN'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
			me.clearCodeValue('refTxtGR')
		}else if(ctrl.reference === 'refTxtDO' || ctrl.reference === 'refCbxBL'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
			if(ctrl.reference === 'refTxtDO'){}
			me.clearCodeValue('refTxtDO')
		}else if(ctrl.reference === 'refTxtGP'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlGatePass);
			me.clearCodeValue('refTxtGP')
		}
	},
	
	onSelectDoc: function(ctrl, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		if(ctrl.reference === 'refCbxSN'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlExport);
		}else if(ctrl.reference === 'refCbxBL'){
			refs.refTabCargoManualCtl.setActiveItem(refs.refPnlImport);
		}
		me.clearCodeValue(ctrl.reference);
	},
	
	checkDocType: function(value){
		var me = this;
		var refs = me.getReferences();
		if(!value){
			return null;
		}
		if(value.length === 9 && value.startsWith('R')){//GR
			return 'GR'
		}
		if(value.length === 14 && value.startsWith('DO')){//DO
			return 'DO'
		}
		if(value.length === 11 && value.startsWith('P')){
			return 'GP' //GatePass
		}
		return null;
	},
	
	onTblRetrieve: function (){
		var me = this;
		var refs = me.getReferences();
		var tabPanel = refs.refTabCargoManualCtl.getActiveItem().name;

		switch(tabPanel){
			case 'cmcexport':
				me.searchExportTbl();
				break;
			case 'cmcimport':
				me.searchImportTbl();
				break;
			case 'cmcgatepass':
				me.searchGatePassTbl();
				break;
		}
	},
	
	//Auto Show Popup After Scan GR:
	showConfirmPopUpforGRScan(cgItem){
		var me = this;
		var refs = me.getReferences();
		if(cgItem.delvTpCd === 'D'){ //Direct Case
			me.showTblLoadingPopUp();
		}else if(cgItem.delvTpCd === 'I'){// Indirect case
			// Call HI or LD?
			// If (SN Reserve/ Storing) = > HI
			// Else (Stored) => LD 
			var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
			validationCodeStore.load({
				params : {
					tyCd : 'validationFinalCargo4HandlingIn',
					col1 : cgItem.vslCallId,
					col2 : cgItem.shipgNoteNo
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
							if(records[0].get('isValidated') === 'Y'){
								//SN is not final HI-> Show HI:
								//me.showTblHIPopUp();
								
							} else {
								//SN is final HI.
								//If Handled In => Loading, If Reserve => Nothing happen
								me.showTblLoadingPopUp(cgItem);
							}
						}
					}
				}
			});
		}
	},
	
	//Auto Show Popup After Scan DO:
	
	showConfirmPopUpforDOScan: function(cgItem){
		var me = this;
		var refs = me.getReferences();
		var me = this;
		var refs = me.getReferences();
		if(cgItem.delvTpCd === 'B' || cgItem.delvTpCd === 'D'||
			cgItem.statCd === 'RS' || cgItem.statCd === 'OS'){// => DS
			me.showTblDischargingPopUp();
		}else if(cgItem.statCd === 'ST' || cgItem.statCd === 'OV'){// => HO
			me.onTblHandlingOut();
		}
		
	},
	
	searchExportTbl:function(isScan){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlTabExport');
		var jpvcNo = me.getViewModel().get('globalVesselCallId');
		var sn = refs.refCbxSN.getValue();
		var cgNo = refs.refTxtGR.getValue();
		var lorryNo = refs.refTxtTruckNo.getValue();
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		
		var searchParm = me.getViewModel().get('theSearch');

		me.LIST_TYPE = '';
		if(searchParm.get('truckType') === 'I'){ // YardTruck => ListType is Job (WA)
			//grid.setColumns(GridUtil.getGridColumns('cargoManualCtlTabExportYardTruckList'));
			me.LIST_TYPE = "JOBWA";//=> LD
		}else if(lorryNo != null && lorryNo != ''){// Handling-In or Loading Direct => ListType is GR List
			//grid.setColumns(GridUtil.getGridColumns('CargoManualCtlTabExport'));
			me.LIST_TYPE = "GR"; // => HI - LD
		}else {// Warehouse check => ListType is SN level
			me.LIST_TYPE = "SN"; // => WH
		}
		
		//if(!jpvcNo || !(sn || cgNo)){
		if(!jpvcNo){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		var params = {
			vslCallId : jpvcNo,
			shipgNoteNo : sn,
			cgNo : cgNo,
			listType	: me.LIST_TYPE,
			lorryNo		: lorryNo,
			lorryId		: lorryNo
		};

		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success && isScan){
					
					grid.setSelection(record[0]);
					me.showConfirmPopUpforGRScan(record[0].data);
				}else if (success && record && record.length <= 0) {
					if(me.LIST_TYPE == 'JOBWA'){
						MessageUtil.info('warning_msg', 'cargomanualctl_whcheck_job');
					}
				}
			}
		});
	},
	
	searchImportTbl:function(isScan){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlTabImport');
		var jpvcNo = me.getViewModel().get('globalVesselCallId');
		var bl = refs.refCbxBL.getValue();
		var doNo = refs.refTxtDO.getValue();
		var lorryNo = refs.refTxtTruckNo.getValue();
		var searchParm = me.getViewModel().get('theSearch');
		
		//if(!jpvcNo || !(bl || doNo)){
		if(!jpvcNo){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		
		me.LIST_TYPE = '';
		
		if(searchParm.get('truckType') === 'I'){ 
			// YardTruck => ListType is Job (VA)
			me.LIST_TYPE = 'JOBVA';
			//grid.setColumns(GridUtil.getGridColumns('cargoManualCtlTabImportWHcheck'));
		}else {
			//grid.setColumns(GridUtil.getGridColumns('CargoManualCtlTabImport'));
			me.LIST_TYPE = 'BL';
		}
		
		var params = {
				vslCallId : jpvcNo,
				blNo : bl,
				doNo : doNo,
				lorryNo 	: lorryNo,
				listType	: me.LIST_TYPE,
			};
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success && isScan){
					var grid = me.lookupReference('refGridImportCargoManualCtlTab');
					grid.setSelection(record[0]);
					me.showConfirmPopUpforDOScan(record[0].data);
				}else if (success && record && record.length <= 0) {
					if(me.LIST_TYPE == 'JOBVA'){
						MessageUtil.info('warning_msg', 'cargomanualctl_whcheck_job');
					}
				}
			}
		});
	},
	
	searchGatePassTbl:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoManualCtlTabGatePass');
		var jpvcNo = me.getViewModel().get('globalVesselCallId');
		var sn = refs.refCbxSN.getValue();
		var bl = refs.refCbxBL.getValue();
		var gatePassNo = refs.refTxtGP.getValue();
		
		/*if(!jpvcNo || !(sn || bl || gatePassNo)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC and SN or BL or GP');
			return;
		}*/
		var params = {
				vslCallId : jpvcNo,
				shipgNoteNo : sn,
				blNo : bl,
				//lorryNo : refs.ctlCargoManualCtlGatePassLorryNo.getValue(),
				gatePassNo : gatePassNo,
				//issued : refs.ctlCargoManualCtlGatePassIssued.getValue()
			};
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
				}
			}
		});
	},
	
	
	//HHT Tablet Button Handle:
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
	
	//Button HandlingIn
	onTblHandlingIn: function(){
		var me = this;
		var refs = me.getReferences();
		
		var title = 'Confirm Handling-In';
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		var searchParams = '';
		
		if(me.LIST_TYPE !== 'GR'){
			MessageUtil.warning('warning_msg', 'cargomanualctl_handlingin_msg');
			return;
		}
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else{
			searchParams = selection.clone();
			searchParams.title = title;
			searchParams.set('shftDt', Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('wkDt', refs.refDtWorkDate.getValue());
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft.getInputValue());
			searchParams.set('selectedShft', me.getViewModel().get('globalWorkShiftInfo'));
			searchParams.set('gateTxnNo', me.GATETXNNO);
			searchParams.commit();
			
			validationCodeStore.load({
				params : {
					tyCd : 'validationFinalCargo4HandlingIn',
					col1 : selection.get('vslCallId'),
					col2 : selection.get('shipgNoteNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
							if(records[0].get('isValidated') === 'Y'){
								//me.getView().detailViewAlias = 'app-confirmhandlinginpopup';
								//me.openDetailPopup(selection, title);
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

	onTblWHCheckExport: function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmHandlingOutTitle'};
		var grid;

		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWHE');
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		var searchParams = '';
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}

		searchParams = selection.clone();
		searchParams.title = title;
		searchParams.set('shftDt', Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
		searchParams.set('wkDt', refs.refDtWorkDate.getValue());
		searchParams.set('shftId', refs.refCbxShft.getValue());
		searchParams.set('shftNm', refs.refCbxShft.getInputValue());
		searchParams.set('selectedShft', me.getViewModel().get('globalWorkShiftInfo'));
		searchParams.commit();

		ViewUtil.openHhtPopup(me, 'app-warehousecheckforexporthht', 'refBtnHandlingIn', searchParams);
	},
	
	onTblWHCheckImport: function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmHandlingOutTitle'};
		var grid;

		var title = TSB.locale.i18n.Bundle.instance.getMsg('hht_confirmWHI'); 
		var grid = me.lookupReference('refGridImportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		var searchParams = '';
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		if(me.LIST_TYPE == 'JOBVA') {
			searchParams = selection.clone();
			searchParams.title = title;
			searchParams.set('shftDt', Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('wkDt', refs.refDtWorkDate.getValue());
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft.getInputValue());
			searchParams.set('height', selection.get('height'));
			searchParams.set('length', selection.get('length'));
			searchParams.set('width', selection.get('width'));
			searchParams.set('selectedShft', me.getViewModel().get('globalWorkShiftInfo'));
			searchParams.commit();

			ViewUtil.openHhtPopup(me, 'app-warehousecheckforimporthht', 'refBtnWHcheckImport', searchParams);
		}else {
			MessageUtil.warning('warning_msg', 'cargomanualctl_warehouse_check_import_msg');
			return;
		}
		
	},
	
	onTblHandlingOut: function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'confirmHandlingOutTitle'};
		var grid;
		
		switch(refs.refTabCargoManualCtl.getActiveItem().name){
			case 'cmcexport':
				grid = me.lookupReference('refGridExportCargoManualCtlTab');
				break;
			
			case 'cmcimport':
				grid = me.lookupReference('refGridImportCargoManualCtlTab');
				break;
		}
		
		var selection = grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}
		
		if(selection.get('fnlDelvYn')=='Y'){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_handledOut_msg');
			return;
		}else {
			if(selection.get('statCd') === 'RS' 
				|| selection.get('statCd') === 'OS' 
					|| selection.get('isExistedCargo') != 'Y'
						){
				MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
				return;
			}
			
//			if(selection.get('statCd') === 'OS'){
//				MessageUtil.warning('warning_msg', 'cargomanualctl_onstoring_handling_out_msg'); // CT1210014
//				return;
//			}
				
			var searchParams = selection.clone();
			searchParams.set('shftDt',Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft.getInputValue());
			searchParams.title ='Confirm Handling OUT';
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.set('gateTxnNo', me.GATETXNNO);
			searchParams.commit();
						
			ViewUtil.openHhtPopup(this, 'app-confirmhandlingOutHHT', 'refHOBtn', searchParams);
		}
	},
	
	onTblMovement: function(){
			var me = this;
			var refs = me.getReferences();
			var title = {type: 'bundle', key: 'confirmMovementTitle'};
			var grid;
			
			switch(refs.refTabCargoManualCtl.getActiveItem().name){
			case 'cmcexport':
				grid = me.lookupReference('refGridExportCargoManualCtlTab');
				break;
			
			case 'cmcimport':
				grid = me.lookupReference('refGridImportCargoManualCtlTab');
				break;
			}
			
			var selection = grid.getSelection();
			
			if(selection == null){
				MessageUtil.warning('warning_msg', 'select_list_msg');
				return;
			} else {
				if(selection.get('statCd') === 'RS'){
					MessageUtil.warning('warning_msg', 'cargomanualctl_no_cargo_handling_out_msg'); // CT1210014
					return;
				}
				
				var searchParams = selection.clone();
				searchParams.set('caTyCd', me.caTyCd);
				ViewUtil.openHhtPopup(this, 'app-cargoMovementhht', 'refBtnMovement', searchParams);
			}
		
	},
	
	// Import/Export Grid Double Click Job Monitoring HHT
	onDblClickForJobMonitoringHHT: function(grid) {
		var me = this;
		var refs = me.getReferences();
		var selection = grid.getSelection();

		if(selection == null) return;
		selection.set('screen','app-cargoJobMonitoring');
		selection.title = 'Job Monitoring';
		selection.set('shftDt',refs.refDtWorkDate.getValue());
		
		ViewUtil.openHhtPopup(me,'app-cargoJobMonitoring', 'refCgJobHHTGrid', selection);

	},
	
	/**
	 * 
	 * =======================================
	 */		
	
	showTblLoadingPopUp(){
		var me = this;
		var refs = me.getReferences();
		
		var refs = me.getReferences();
		var title = 'Confirm Loading';
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		var validationCodeStore = me.getStore('cargoManualCtlValidationCode');
		var selection = grid.getSelection();
		
		var isYardTruck = refs.ctlCargoManualHHTTruckType.getValue();
		
		if(me.LIST_TYPE !== 'GR' && me.LIST_TYPE !== 'JOBWA'){
			if(isYardTruck){
				MessageUtil.warning('warning_msg', 'cargomanualctl_loading_wajob_msg');
				return;
			}else{
				MessageUtil.warning('warning_msg', 'cargomanualctl_loading_direct_msg');
				return;
			}
		}
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else{
			var searchParams = selection.clone();
			
			searchParams.title = title;
			searchParams.set('shftDt', Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('wkDt', refs.refDtWorkDate.getValue());
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft.getInputValue());
			//searchParams.set('selectedShft', refs.refCbxShft.getSelection());
			searchParams.set('selectedShft', me.getViewModel().get('globalWorkShiftInfo'));
			searchParams.set('gateTxnNo', me.GATETXNNO);
			//searchParams.commit();
			
			
			if(refs.ctlCargoManualHHTTruckType.getChecked() == true){
				var lorryNo = searchParams.get('lorryNo');
				searchParams.set('lorryNo', lorryNo);
			} else {
				searchParams.set('lorryNo', refs.refTxtTruckNo.getValue());
			}
			
			if(selection.get('spYn') === 'Y'){
				MessageUtil.warning('warning_msg', 'cargomanualctl_special_cargo_msg');
				return;
			}
		}
		//me.openCodePopup('app-confirmloadinghhtpopup', 'refTxtGroupNm', params);
		
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
							//me.getView().detailViewAlias = 'app-confirmloadingpopup';
							//me.openDetailPopup(searchParams, title);
							//ViewUtil.openCodePopup(me, 'app-confirmloadinghhtpopup', 'refBtnLoading', searchParams);
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
	
		var grid = me.lookupReference('refGridImportCargoManualCtlTab');
		var selection = grid.getSelection();
		
//		if(StringUtil.isNullorEmpty(me.ATBSTR)){
//			MessageUtil.warning('warning_msg', 'mandatoryField_msg_atb', 'ATB');
//			return;
//		}
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else if(selection.get('fnlDelvYn')=='Y'){
			MessageUtil.warning('warning_msg', 'confirmdischarging_final_operation_msg');
			return;
			
		} else {
			var blStore2 = me.getStore('cargoManualCtlForBlCombo');
			var searchParams = selection.clone();
			searchParams.set('shftDt',Ext.Date.format(refs.refDtWorkDate.getValue(),'Ymd'));
			searchParams.set('shftId', refs.refCbxShft.getValue());
			searchParams.set('shftNm', refs.refCbxShft._inputValue);
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.set('blStore', blStore2);
			searchParams.title ='Confirm Discharging';
			searchParams.displayOccupiedInfo = true
			
			searchParams.commit();			
			//ViewUtil.openCodePopup(this, 'app-confirmdischarginghht', 'refDischargeHHTBtn', searchParams);
			ViewUtil.openHhtPopup(this, 'app-confirmdischarginghht', 'refDischargeHHTBtn', searchParams);
		}
	},
	
	showTblHandlingInPopUp(){
		
	},
	
	/**
	 * 
	 * =======================================
	 */		
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();		
	},
	
//	onCheckJpvcRadioField: function(radioField, newValue, oldValue, eOpts) {
//		var me = this;
//		var refs = me.getReferences();
//		
// 	},
	
	onGRBLSearchHHT : function(){
		var me = this;
		var refs = me.getReferences();
		var exportStore = me.getStore('cargoManualCtlTabExport');
		var importStore = me.getStore('cargoManualCtlTabImport');
		var grblPopupGrideStore = me.getStore('grblPopupGrideStore');
		var GRBLType =refs.refGLBLToggleButton.getItems().items[0].getValue()
		var code = refs.refgrblCode.getValue();
		if(code != null){
			code =  code.toUpperCase();
		}
		if(me.getView().recvData){
			if(me.getView().recvData.vslCallId == null){
				vslCallId = 'NonCallId';
			}else{
				vslCallId = me.getView().recvData.vslCallId;
			}
		}
		if(GRBLType == 'GR'){
			exportStore.load({
				params: {
					vslCallId : vslCallId,
					cgNo : code
				},
				callback: function(records, operation, success) {
					if (success) {
						grblPopupGrideStore.removeAll();
						for(var i = 0; i < records.length ; i++ ){
							grblPopupGrideStore.insert(i, [{vslCallId : records[i].data.vslCallId ,code:records[i].data.grNo}]);
						}
					}
				}
			});
		}
		else if(GRBLType == 'BL'){
			importStore.load({
				params: {
					vslCallId : vslCallId,
					blNo : code
				},
				callback: function(records, operation, success) {
					if (success) {
						grblPopupGrideStore.removeAll();
						for(var i = 0; i < records.length ; i++ ){
							grblPopupGrideStore.insert(i, [{vslCallId : records[i].data.vslCallId ,code:records[i].data.blNo}]);
						}
					}
				}
			})
		}
	},
	
	onDblTab: function() {
		var me = this; 
		var window = me.getView().up('window');
		
		if(window.returnValue != null){
			window.close();	
		}
		
		window.returnValue = me.getReturnData();
		window.close();
	},
	
	onActivateTabHHT: function(ref){
		var me = this;
		var tab = ref.reference;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		if(searchParm != null && searchParm.get('truckType') == 'I'){
			refs.refBtnWHcheckExport.setDisabled(true);
			refs.refBtnDischarging.setDisabled(true);
			refs.refBtnHandlingIn.setDisabled(true);
			refs.refBtnHandlingOut.setDisabled(true);
			refs.refBtnMovement.setDisabled(true);
			refs.refBtnGPass.setDisabled(true);
			
			var activeTab = ref.name;
			if(activeTab == 'cmcexport'){
				refs.refBtnWHcheckImport.setDisabled(true);
				refs.refBtnLoading.setDisabled(false);
			}else if(activeTab == 'cmcimport'){
				refs.refBtnWHcheckImport.setDisabled(false);
				refs.refBtnLoading.setDisabled(true);
			}else{
				refs.refBtnWHcheckImport.setDisabled(true);
				refs.refBtnLoading.setDisabled(true);
			}
		}else{
			me.setButtonByTab(tab);
		}

	},
	
	setButtonByTab: function(tab){
		var me = this;
		var refs = me.getReferences();
		var ld = ds = hi = ho = mv = gp = we = wi = true; //defaul: disable = true
		if (tab == 'refPnlExport'){
			me.caTyCd = 'EX';
			ld = hi = mv = we = false;
		}else if(tab == 'refPnlImport'){
			me.caTyCd = 'IM';
			ds = ho = mv = wi = false;
		}else if(tab == 'refPnlGatePass'){
			me.caTyCd = 'GP';
			gp = false;
		}
		refs.refBtnLoading.setDisabled(ld);
		refs.refBtnDischarging.setDisabled(ds);
		refs.refBtnHandlingIn.setDisabled(hi);
		refs.refBtnHandlingOut.setDisabled(ho);
		refs.refBtnMovement.setDisabled(mv);
		refs.refBtnGPass.setDisabled(gp);
		refs.refBtnWHcheckExport.setDisabled(we);
		refs.refBtnWHcheckImport.setDisabled(wi);
	},
	
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refGRBLPopupHHTGrid');
		var selection;
		
		if(grid){
			if(Ext.isClassic){
				selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			}
			else{
				selection = grid.getSelection() == null ? null : grid.getSelection();
			}
		}
		var returnItem = {
			code : selection.data.code,
			codeName : selection.data.code,
			item : selection
		}
		
		return returnItem;
	},
	
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectGLBLHHT'){//Select from JPVC:
			window.returnValue = me.getJPVCReturnDataHHT();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getJPVCReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var grid = me.lookupReference('refGRBLPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.code,
			codeName : selection.data.code,
			item : selection
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	},
	gatePassPrintingHHT:function(detailItem,gatePassNo){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGridGatePassCargoManualCtlTab');
		var selection = grid.getSelection();
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else{
			var params = {
					title: 'Gate Pass Printing',
					vslCallId: selection.get('vslCallId'),
					CgNo: selection.get('cgNo'),
					gatePassNo: selection.get('gatePassNo'),
				};
			ViewUtil.openCodePopup(me, 'app-gatepassprintinghht', 'refBtnGPass', params);
		}
	},
	
	// Discharging Button Click
	onWhCheckImport : function(){
		var me = this;
		var refs = me.getReferences();
		var title = {type: 'bundle', key: 'whCheckImportTitle'};
		var grid = me.lookupReference('refCargoManualCtlTabImportGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		
		// if(!me.checkWorkButtonMandatory()) return;
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		} 
		
		if(me.LIST_TYPE == 'JOBVA') {
			var searchParams = selection.clone();
			searchParams.set('shftDt', refs.ctlCargoManualCtlShiftDt.getValue());
			searchParams.set('shftId', refs.ctlCargoManualCtlShiftNo.getValue());
			searchParams.set('shftNm', refs.ctlCargoManualCtlShiftNo.getRawValue());
			searchParams.set('caTyCd', me.caTyCd);
			searchParams.commit();
			
			me.getView().detailViewAlias = 'app-whcheckimportpopup';
			me.openDetailPopup(searchParams, title);
		}else {
			MessageUtil.warning('warning_msg', 'cargomanualctl_warehouse_check_import_msg');
			return;
		}
	},
	
	onOpenCommonPopup:function(args){
		var me = this;
		var refs = me.getReferences();
		if(args == 'hatchNo'){ // For Hatch Multi Select
			var params = {
				searchType:'COMM',
				searchLcd: 'MT',
				searchDivCd: 'HTC'
			};
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'ctlHatchNo', params);
		}
		if(args == 'hatchNoExportTab'){ // For Hatch Export Tab Multi Select
			var params = {
				searchType:'COMM',
				searchLcd: 'MT',
				searchDivCd: 'HTC'
			};
			me.openCodePopup('popup-cmmcdpopupmultiselect', 'ctlCargoManualCtlHatchNoExportTab', params);
		}
	},
	
	setButtonByTab: function(tab){
		var me = this;
		var refs = me.getReferences();
		var ld = ds = hi = ho = mv = gp = we = wi = true; //defaul: disable = true
		if (tab == 'refPnlExport'){
			me.caTyCd = 'EX';
			ld = hi = mv = we = false;
		}else if(tab == 'refPnlImport'){
			me.caTyCd = 'IM';
			ds = ho = mv = wi = false;
		}else if(tab == 'refPnlGatePass'){
			me.caTyCd = 'GP';
			gp = false;
		}
		refs.refBtnLoading.setDisabled(ld);
		refs.refBtnDischarging.setDisabled(ds);
		refs.refBtnHandlingIn.setDisabled(hi);
		refs.refBtnHandlingOut.setDisabled(ho);
		refs.refBtnMovement.setDisabled(mv);
		refs.refBtnGPass.setDisabled(gp);
		refs.refBtnWHcheckExport.setDisabled(we);
		refs.refBtnWHcheckImport.setDisabled(wi);
	},
	
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refGRBLPopupHHTGrid');
		var selection;
		
		if(grid){
			if(Ext.isClassic){
				selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			}
			else{
				selection = grid.getSelection() == null ? null : grid.getSelection();
			}
		}
		var returnItem = {
			code : selection.data.code,
			codeName : selection.data.code,
			item : selection
		}
		
		return returnItem;
	},
	setShiftDtCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.ctlCargoManualCtlJpvcfield.getValue();
		var shiftDtStore = me.getStore('cargoManualCtlForShiftDtCombo');
		var shiftStore = me.getStore('cargoManualCtlForShiftNoCombo');

		shiftStore.removeAll();
		shiftStore.commitChanges();
		refs.ctlCargoManualCtlShiftDt.setValue(null);
		refs.ctlCargoManualCtlShiftNo.setValue(null);
		
		if(!StringUtil.isNullorEmpty(vslCallId)){
			shiftDtStore.load({
				params:{
					vslCallId : vslCallId
				}
			});
		} else {
			shiftDtStore.removeAll();
			shiftDtStore.commitChanges();
		}
	},
	
	setWorkDateShift: function(){
		var me = this;
		var refs = me.getReferences();
		var workDate =  MOST.config.Token.getWorkDate();
		var workShift =  MOST.config.Token.getWorkShift();
		refs.refDtWorkDate.setValue(Ext.Date.format(workDate,'d/m/Y'));
		refs.refCbxShft.setValue(workShift);
	},
	
	onChangeYardTruck: function(ctl, newVal, oldVal, eOpts ){
		
		var me = this;
		var refs = me.getReferences();
		refs.refTxtTruckNo.setValue('');
		var searchParm = me.getViewModel().get('theSearch');
		
		var activeTab = refs.refTabCargoManualCtl.getActiveItem().name;
		var tab = refs.refTabCargoManualCtl.getActiveItem().reference;

		searchParm.set('lorryNo','');
		
		if(newVal){
			refs.refCbxSN.setValue('');
			refs.refCbxBL.setValue('');
			refs.refTxtGR.setValue('');

			refs.refTxtDO.setValue('');
			refs.refTxtGP.setValue('');
			
			refs.refBtnWHcheckExport.setDisabled(newVal);
			refs.refBtnDischarging.setDisabled(newVal);
			refs.refBtnHandlingIn.setDisabled(newVal);
			refs.refBtnHandlingOut.setDisabled(newVal);
			refs.refBtnMovement.setDisabled(newVal);
			refs.refBtnGPass.setDisabled(newVal);
			
			if(activeTab == 'cmcexport'){
				refs.refBtnWHcheckImport.setDisabled(newVal);
				refs.refBtnLoading.setDisabled(!newVal);
			}else if(activeTab == 'cmcimport'){
				refs.refBtnWHcheckImport.setDisabled(!newVal);
				refs.refBtnLoading.setDisabled(newVal);
			}
		}else{
			me.setButtonByTab(tab);
		}

		refs.refCbxSN.setDisabled(newVal);
		refs.refCbxBL.setDisabled(newVal);
		refs.refTxtGR.setDisabled(newVal);
		refs.refTxtDO.setDisabled(newVal);
		refs.refTxtGP.setDisabled(newVal);
		
		me.onChangeSearchCondition();
	},
	
	onSearchTruckNoHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		var truckType = refs.ctlCargoManualHHTTruckType.getValue();
		
		if(!globalVesselCallId){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'JPVC');
			return;
		}
		
		switch(refs.refTabCargoManualCtl.getActiveItem().name){
		case 'cmcexport':
			me.flag = true;
			break;
		
		case 'cmcimport':
			me.flag = false;
			break;
		}
		
	    var params ={
			title: 'Lorry',
			vslCallId: globalVesselCallId,
			lorryNo: refs.refTxtTruckNo.getValue(),
			blNo: refs.refCbxBL.getValue(),
			shipgNoteNo: refs.refCbxSN.getValue(),
			flag: me.flag,
	    }
	    
	    if(refs.ctlCargoManualHHTTruckType.getChecked()) {
	    	ViewUtil.openCodePopup(me, 'app-yardtruckpopuphht',  'refTxtTruckNo', params);
	    } else {
	    	ViewUtil.openCodePopup(me, 'app-lorrylistpopuphht',  'refTxtTruckNo', params);
	    }
	      
	},
	
	
	onChangeSearchCondition: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGridExportCargoManualCtlTab');
		grid.getStore().removeAll();
		var grid2 = me.lookupReference('refGridImportCargoManualCtlTab');
		grid2.getStore().removeAll();
		
	},
	
	getReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var returnItem = {
//			inDate: selection.data.inDate,
//			dischargedDate: selection.data.dischargedDate,
//			modelCd: selection.data.modelCd,
//			blNo: selection.data.blNo,
//			brandCd: selection.data.brandCd,
//			brandNm: selection.data.brandNm,
//			delvTpNm: selection.data.delvTpNm,
//			yardPlanLoc: selection.data.yardPlanLoc,
//			yardCheckRmk: selection.data.yardCheckRmk,
//			nosOfUnit: selection.data.nosOfUnit,
//			remainUnit: selection.data.remainUnit,
//			code: selection.data.unitNo,
			item : selection,
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
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
		
		if(xtype ==='popup-lorrylistpopup'){
			
			if(returnValue) {
				if(!refs.ctlCargoManualTruckType.checked){
					me.gateObject = returnValue.item.data;
				}
			}
			return
		}
		
		if(targetControl === 'refTxtTruckNo'){
			if(returnValue) {
				
				var theSearch =  me.getViewModel().get('theSearch');
				theSearch.set('lorryNo', returnValue.code);

				if(returnValue.item && returnValue.item.lorryNo) {
					theSearch.set('lorryNo',returnValue.item.lorryNo)
				}

				if(!refs.ctlCargoManualHHTTruckType.getChecked()){
					me.gateObject = returnValue.item.data;
					me.GATETXNNO = returnValue.item.data.gateTxnNo;
				}
			}
		}

	},
	
	
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});