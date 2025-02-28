Ext.define('MOST.view.operation.GateTransactionHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [

	],

	alias: 'controller.gatetransactionhht',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	//<Start QR Constant:
	QR_ACTIVE: false,
	TXT_CANCEL: 'Cancel',
	TXT_QRSCAN: 'QR Scan',
	FRAME_SIZE: 400,
	html5QrCode: null,
	//End QR constant>.

	PORTSAFETY_CONFIRMATION_PROXY_URL: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/cargoarrivaldelivery',
	tabMode: '',
	vslCallId: '',
	insGateInData: Ext.create('MOST.model.operation.CargoArrvDelv'),
	insGateOutData: Ext.create('MOST.model.operation.CargoArrvDelv'),
	gateConfig: {
		gateIn: '',
		gateOut: ''
	},

	GR_LIST_TO_GATE_IN: new Array(),
	GR_LIST_TO_GATE_OUT: new Array(),
	ALL_TRUCKS_LIST_INSIDE: new Array(), //List Truck (with BL/GR No.) still inside.
	FIRST_LIST_TO_GATE_OUT: new Array(), //Incase of Gate Out:  may be The truck gate in many time with different CG No= > select on list random to gate out
	FORM_REF: 'refTabGateTxn',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */


	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */

	onLoad: function () {
		var me = this;
		var refs = me.getReferences();

		var currentDate = new Date();
		var days = 0;
		me.onComboList();
		me.setDefaultControl();
		me.tabMode = 'gateIn';
		me.setReadOnlyMode(true);

		me.vslCallId = me.getViewModel().get('globalVesselCallId');

		var theGateInItem = Ext.create('MOST.model.operation.GateOperation');
		var theGateOutItem = Ext.create('MOST.model.operation.GateOperation');

		me.getViewModel().setData({ theGateIn: theGateInItem });
		me.getViewModel().setData({ theGateOut: theGateOutItem });



	},

	onComboList: function () {
		var me = this;
		var store = me.getStore('gateComboList');

		store.load();
	},

	setDefaultControl() {
		var me = this;
		var refs = me.getReferences();

		refs.refRdoGateOutTabGPass.suspendEvents();
		refs.refRdoGateOutTabGr.suspendEvents();

		refs.refRdoGateOutTabGPass.setValue(true);

		refs.refTxtGateOutTabGPass.setEditable(true);
		refs.refTxtGateOutTabGr.setEditable(false);

		refs.refRdoGateOutTabGPass.resumeEvents();
		refs.refRdoGateOutTabGr.resumeEvents();
	},

	setReadOnlyMode: function (mode) {
		var me = this;
		me.getViewModel().setData({ readOnlyMode: mode });
		me.getViewModel().setData({ disabledMode: mode });
		me.getViewModel().setData({ editableMode: !mode });
	},

	/**
	* INITIALIZE END
	* =========================================================================================================================
	*/

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 * 
	 */

	// Tab Change Event
	onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var tabTitle = refs.refTabGateTxn.getActiveItem().getTitle().trim();

		switch (tabTitle) {
			case 'GateIn':
				me.tabMode = 'gateIn';
				break;
			case 'GateOut':
				me.tabMode = 'gateOut';
				break;
		}
	},

	//Gate_in: Assigned Lorry List
	onSearchLorryGateIn: function () {
		var me = this;
		var refs = me.getReferences();
		var params = {
			title: ViewUtil.getLabel('poup_title_assigned_trucklist'),
			lorryNo: refs.refTxtGateInTabLorryNo.getValue(),
			vslCallId: me.getViewModel().get('globalVesselCallId'),
			site: 'JPB'
		};
		ViewUtil.openHhtPopup(this, 'popup-assignedexternaltrucklistpopuphht', 'refTxtGateInTabLorryNo', params);
	},

	onSearchDOGateIn: function () {
		var me = this;
		var refs = me.getReferences();

		if (StringUtil.isNullorEmpty(refs.refTxtGateInTabLorryNo.getValue())) {
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}

		var params = {
			title: ViewUtil.getLabel('poup_title_dolist'),
			lorryNo: refs.refTxtGateInTabLorryNo.getValue(),
			vslCallId: me.getViewModel().get('globalVesselCallId')
		};
		ViewUtil.openHhtPopup(this, 'app-sdopopuphht', 'refTxtGateInTabBlDo', params);
	},

	onSearchGRListGI: function () {
		var me = this;
		var refs = me.getReferences();

		if (StringUtil.isNullorEmpty(refs.refTxtGateInTabLorryNo.getValue())) {
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
		var params = {
			title: ViewUtil.getLabel('poup_title_grlist'),
			vslCallId: me.getViewModel().get('globalVesselCallId'),
			lorryNo: refs.refTxtGateInTabLorryNo.getValue(),
			tabMode: 'gateIn',
			gdsRecvNo: refs.refTxtGateInTabGr.getValue(),
			//gridSelMode: 'multi'
		};
		ViewUtil.openHhtPopup(this, 'app-grhhtpopup', 'refTxtGateInTabGr', params);
	},

	//GateOut
	onSearchLorryGateOut: function () {
		var me = this;
		var refs = me.getReferences();
		var params = {
			title: ViewUtil.getLabel('poup_title_ingate_trucklist'),
			vslCallId: me.getViewModel().get('globalVesselCallId'),
			lorryNo: refs.refTxtGateOutTabLorryNo.getValue(),
			searchType: 'GO'
		};

		ViewUtil.openHhtPopup(this, 'popup-ingatetrucklistpopuphht', 'refTxtGateOutTabLorryNo', params);
	},

	onSearchGPGateOut: function () {
		var me = this;
		var refs = me.getReferences();
		if (StringUtil.isNullorEmpty(refs.refTxtGateOutTabLorryNo.getValue())) {
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
		var params = {
			title: ViewUtil.getLabel('poup_title_gatepasslist'),
			gatePassNo: refs.refTxtGateOutTabGPass.getValue(),
			lorryNo: refs.refTxtGateOutTabLorryNo.getValue(),
			vslCallId: me.getViewModel().get('globalVesselCallId'),
		};
		ViewUtil.openHhtPopup(this, 'app-gatepasslisthhtpopup', 'refBtnGPGateOut', params);
	},

	onSearchGRListGO: function () {
		var me = this;
		var refs = me.getReferences();
		if (StringUtil.isNullorEmpty(refs.refTxtGateOutTabLorryNo.getValue())) {
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
		var params = {
			title: ViewUtil.getLabel('poup_title_grlist'),
			lorryNo: refs.refTxtGateOutTabLorryNo.getValue(),
			gdsRecvNo: refs.refTxtGateOutTabGr.getValue(),
			tabMode: 'gateOut',
			gateInOut: 'O',
			gridSelMode: 'single'
		};
		ViewUtil.openHhtPopup(this, 'app-grhhtpopup', 'refTxtGateOutTabGr', params);
	},

	onSearchGateTicketNoGateOut: function () {
		var me = this;
		var refs = me.getReferences();
		if (StringUtil.isNullorEmpty(refs.refTxtGateOutTabLorryNo.getValue())) {
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
		var params = {
			title: ViewUtil.get('poup_title_gatetxnlist'),
			lorryNo: refs.refTxtGateOutTabLorryNo.getValue(),
			vslCallId: me.getViewModel().get('globalVesselCallId')
		};
		ViewUtil.openHhtPopup(this, 'popup-gateticketnopopuphht', 'refTxtGateOutTxnNo', params);
	},

	onFocusGateInBLDO: function () {
		var me = this;
		var refs = me.getReferences();
		refs.refRdoGateInTabBlDo.setChecked(true);
	},

	onFocusGateInGR: function () {
		var me = this;
		var refs = me.getReferences();
		refs.refRdoGateInTabGr.setChecked(true);
	},

	onFocusGateOutGP: function () {
		var me = this;
		var refs = me.getReferences();
		refs.refRdoGateOutTabGPass.setChecked(true);
	},

	onFocusGateOutGR: function () {
		var me = this;
		var refs = me.getReferences();
		refs.refRdoGateOutTabGr.setChecked(true);
	},

	onRadioEditableChange: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();

		if (!oldValue) {
			if (me.tabMode === 'gateIn') {
				me.functionGRDO(field, newValue, oldValue);
			} else {
				//me.functionGPGR(field, newValue, oldValue);
			}
		}
	},

	onSave: function () {
		var me = this;
		var refs = me.getReferences();

		if (me.tabMode === 'gateIn') {
			me.gateInValidation();
		} else {
			me.gateOutValidation();
		}
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	globalGateInGrList: new Array(),
	globalGateInBlDoList: new Array(),
	globalDriverGateInItem: new Object(),

	globalGateOutGrList: new Array(),
	globalGateOutBlList: new Array(),
	globalDriverGateOutItem: new Object(),


	onChangeLorry: function (gateInOut) {
		var me = this;
		var refs = me.getReferences();

		if (gateInOut === 'GI') {
			me.getViewModel().setData({ theGateIn: Ext.create('MOST.model.operation.GateOperation') });
		}
		if (gateInOut === 'GO') {

			refs.refTxtGateOutTabGr.setValue('');
			me.insGateOutData.set('tsptr', '');
			refs.refTxtGateOutTabCommodity.setValue('');
			refs.refTxtGateOutTabMt.setValue('');
			refs.refTxtGateOutTabQty.setValue('');
		}
	},
	setGateInDetailByBL: function () {
		var me = this;
		var refs = me.getReferences();

		if (me.globalGateInGrList.length > 0) {
			return;
		}

		var cmdtSet = new Set();
		var toLocIdSet = new Set();
		var customsStatusSet = new Set();
		var mt = 0, m3 = 0, qty = 0;
		var totalMt = 0, totalM3 = 0, totalQty = 0;
		var cmdtStr = '', toLocIdStr = '', customsStatValue = '';

		for (var element of me.globalGateInBlDoList) {
			mt += Number(element.get('wgt'));
			m3 += Number(element.get('vol'));
			qty += Number(element.get('pkgqty'));
			cmdtSet.add(element.get('cmdtcd'));
			toLocIdSet.add(element.get('actLocId'));
			customsStatusSet.add(element.get('customsStat'));
		}

		totalMt = Number(mt.toFixed(3));
		totalM3 = Number(m3.toFixed(3));
		totalQty = Number(qty);
		cmdtStr = Array.from(cmdtSet).filter(ele => ele != null).join(',');
		toLocIdStr = Array.from(toLocIdSet).filter(ele => ele != null).join(',');
		customsStatValue = customsStatusSet.has(me.CUSTOMS_HOLD) ? me.CUSTOMS_HOLD : me.CUSTOMS_RELEASE;

		refs.refTxtGateInTabMt.setValue(totalMt);
		refs.refTxtGateInTabM3.setValue(totalM3);
		refs.refTxtGateInTabQty.setValue(totalQty);
		refs.refTxtGateInTabCommodity.setValue(cmdtStr);
		refs.refTxtGateInTabToLocId.setValue(toLocIdStr)
		refs.refTxtGateInTabCustoms.setValue(customsStatValue);
	},
	//callBack information from pop-up
	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		var returnValueDriverIdItem = Ext.create('MOST.model.popup.PopupService');
		var returnValueGrItem = Ext.create('MOST.model.popup.PopupService');
		var returnValueBldoItem = Ext.create('MOST.model.popup.PopupService');

		if (targetControl === 'refTxtGateInTabLorryNo'
			|| targetControl === 'refTxtGateInTabGr'
			|| targetControl === 'refTxtGateInTabBlDo') {
			me.tabMode = 'gateIn';
		} else {
			me.tabMode = 'gateOut';
		}

		if (
			targetControl === 'refTxtGateInTabGr' ||
			targetControl === 'refTxtGateInTabBlDo' ||
			targetControl === 'refTxtGateOutTabGPass' ||
			targetControl === 'refTxtGateOutTabGr' ||
			targetControl === 'refTxtGateOutTxnNo') {

			me.getViewModel().setData({ gateInGr: null });
			me.getViewModel().setData({ gateInBldo: null });
			me.getViewModel().setData({ gateOutGp: null });
			me.getViewModel().setData({ gateOutGr: null });
			me.getViewModel().setData({ gateOutTicket: null });
		}


		//SetData:
		if (targetControl === 'refTxtGateInTabLorryNo') {
			me.onChangeLorry('GI');
			me.setDocForGateIn(returnValue);
		} else if (targetControl === 'refTxtGateInTabGr') {
			if (returnValue) {
				refs.refRdoGateInTabGr.setChecked(true);
				me.getViewModel().setData({ gateInGr: returnValue.item });

				me.vslCallId = returnValue.item.get('vslCallId');
				refs.refTxtGateInTabGr.setValue(returnValue.item.get('grNo'));
				refs.refTxtGateInTabCommodity.setValue(returnValue.item.get('cmdtCode'));
				refs.refTxtGateInTabMt.setValue(returnValue.item.get('mt'));
				refs.refTxtGateInTabQty.setValue(returnValue.item.get('pkgQty'));
				refs.refTxtGateInTabM3.setValue(returnValue.item.get('m3'));
				refs.refTxtGateInTabDMode.setValue(returnValue.item.get('delvTpName'));
				refs.refTxtGateInTabToLocId.setValue(returnValue.item.get('location'));
			} else {
				me.getViewModel().setData({ gateInGr: null });
			}

		} else if (targetControl === 'refTxtGateInTabBlDo') {
			if (returnValue) {

				refs.refRdoGateInTabBlDo.setChecked(true);
				me.getViewModel().setData({ gateInBldo: returnValue.item });

				me.vslCallId = returnValue.item.get('vslCallId');
				refs.refTxtGateInTabBlDo.setValue(returnValue.item.get('sdoNo'));
				refs.refTxtGateInTabCommodity.setValue(returnValue.item.get('cmdtCode'));
				refs.refTxtGateInTabMt.setValue(returnValue.item.get('mt'));
				refs.refTxtGateInTabQty.setValue(returnValue.item.get('pkgQty'));
				refs.refTxtGateInTabM3.setValue(returnValue.item.get('m3'));
				refs.refTxtGateInTabDMode.setValue(returnValue.item.get('delvTpName'));
				refs.refTxtGateInTabToLocId.setValue(returnValue.item.get('location'));
			} else {
				me.getViewModel().setData({ gateInBldo: null });
			}

		}
		// GateOut afterSetCodePopupData ============================================================
		else if (targetControl === 'refTxtGateOutTabLorryNo') {
			me.onChangeLorry('GO');
			if (returnValue) {
				me.getViewModel().setData({ gateOutLorry: returnValue.item });

				refs.refTxtGateOutTabLorryNo.setValue(returnValue.code);
				refs.refTxtGateOutTabDriverId.setValue(returnValue.item.data.driverId);
				refs.refTxtGateOutTabDriverName.setValue(returnValue.item.data.driverName);
				refs.refTxtGateOutTabExpired.setValue(returnValue.item.data.licenseExpired);
				refs.refTxtGateOutTabLicense.setValue(returnValue.item.data.licenseNo);
				//refs.refTxtGateOutTabTransporter.setValue(returnValue.item.data.transportCd);
				refs.refTxtGateOutTabTransporterName.setValue(returnValue.item.data.transportName);
				refs.refTxtGateOutTabCustoms.setValue(returnValue.item.data.customsReleasedStatus);

				refs.refTxtGateOutTxnNo.setValue(returnValue.item.data.gateTxnNo);
				//refs.refTxtGateOutGateInTime.setValue(returnValue.item.data.gateInDate);

				me.onGetGateOutGateTicketInformation();
			} else {
				me.getViewModel().setData({ gateOutLorry: null });
				me.getViewModel().setData({ gateOutTicket: null });
			}
		}
		else if (targetControl === 'refTxtGateOutTxnNo') {
			if (returnValue) {

				me.getViewModel().setData({ gateOutTicket: returnValue.item });

				me.vslCallId = returnValue.item.get('vslCallId');
				refs.refTxtGateOutTxnNo.setValue(returnValue.item.get('gateTxnNo'));
				refs.refTxtGateOutGateInTime.setValue(returnValue.item.get('gateInDate'));
				refs.refTxtGateOutTabCommodity.setValue(returnValue.item.get('cmdtCode'));
				refs.refTxtGateOutTabMt.setValue(returnValue.item.get('mt'));
				refs.refTxtGateOutTabQty.setValue(returnValue.item.get('pkgQty'));
				refs.refTxtGateOutTabM3.setValue(returnValue.item.get('m3'));

			} else {
				me.getViewModel().setData({ gateOutTicket: null });
			}

		}
		else if (targetControl === 'refBtnQRScanGate') { //Received form QR Scan Popup:
			if (returnValue) {
				me.setValueQRcode(returnValue.code);
			}
		}
	},

	//For GateIn Tab
	functionGRDO: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var refFeild = field.getReference();
		var isBLDO = false, isGR = false;

		isBLDO = (refFeild === 'refRdoGateInTabBlDo' && newValue);
		isGR = (refFeild === 'refRdoGateInTabGr' && newValue);

		if (isGR) {
			refs.refTxtGateInTabGr.setEditable(isGR);
			refs.refTxtGateInTabBlDo.setValue('');
		}

		if (isBLDO) {
			refs.refTxtGateInTabBlDo.setEditable(isBLDO);
			refs.refTxtGateInTabGr.setValue('');
		}

		if (isBLDO || isGR) {
			refs.refTxtGateInTabDMode.setValue('');
			refs.refTxtGateInTabCommodity.setValue('');
			refs.refTxtGateInTabMt.setValue('');
			refs.refTxtGateInTabM3.setValue('');
			refs.refTxtGateInTabQty.setValue('');
			refs.refTxtGateInTabToLocId.setValue('');
		}

	},

	//2024-06-11: GateIn - autoget Doc after select TruckNumber
	setDocForGateIn: function (returnValue) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('gateInDocumentStore');

		if (returnValue) {
			me.getViewModel().setData({ theGateIn: returnValue.item.clone() });
		} else {
			me.getViewModel().setData({ gateInLorry: null });
		}
	},

	gateInValidation: function () {
		var me = this;
		var refs = me.getReferences();
		var theGateIn = me.getViewModel().get('theGateIn');
		if (StringUtil.isNullorEmpty(refs.refTxtGateInTabLorryNo.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}

		if (StringUtil.isNullorEmpty(refs.refCboGateInTabGateNo.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', 'portsafetyconfirmation_validcheck_gate_mandatory_msg');
			return;
		}

		if (theGateIn.data.custMode != 'RELEASE') {
			MessageUtil.warning('warning_msg', 'customrealeaseblock_msg');
			return
		}

		me.save();

	},

	gateOutValidation: function () {
		var me = this;
		var refs = me.getReferences();

		if (StringUtil.isNullorEmpty(refs.refTxtGateOutTabLorryNo.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_lorry_mandatory_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}

		me.save();
	},

	save: function () {
		var me = this;
		var refs = me.getReferences();
		me.getBindingXml();
		me.cudData();
	},

	cudData: function () {
		var me = this;
		var refs = me.getReferences();
		var cudItem;
		var arrayGateItems = new Array();
		var isCreated = true;

		//Gate In:
		if (me.tabMode === 'gateIn') {
			cudItem = me.getViewModel().get('theGateIn');
			arrayGateItems.push(cudItem.data);
			isCreated = true;
		}
		//Gate Out:
		else {
			cudItem = me.getViewModel().get('theGateOut');
			arrayGateItems.push(cudItem.data);
			isCreated = false;
		}

		var proxy = cudItem.getProxy();
		proxy.url = me.PORTSAFETY_CONFIRMATION_PROXY_URL;

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		//var isCreated = cudItem.phantom;

		cudItem.set('userId', MOST.config.Token.getUserId());

		updateParm.phantom = isCreated;
		updateParm.getProxy().url = proxy.url;
		updateParm.set('items', arrayGateItems);
		updateParm.save({
			success: function (records) {
				MessageUtil.saveSuccess();
				me.clearInputGateInFields();
				me.clearInputGateOutFields();
			}
		});
	},

	getBindingXml: function () {
		var me = this;
		var refs = me.getReferences();
		var theVessel = me.getViewModel().get('theVessel');
		const {vslCallId} = theVessel
		var theGateIn = me.getViewModel().get('theGateIn');
		var theGateOut = me.getViewModel().get('theGateOut');
		theGateIn.set('vslCallId', vslCallId);
		theGateIn.set('searchType', 'gateIn');	
		//GATE IN
		if (me.tabMode === 'gateIn') {
			// var theGateInGr = me.getViewModel().get('gateInGr');
			// var theGateInBldo = me.getViewModel().get('gateInBldo');
			// var theGateInLorry = me.getViewModel().get('gateInLorry');
			//GR GateIn:
			if (!StringUtil.isNullorEmpty(theGateIn.data.shipgNoteNo)) {
				theGateIn.set('cgInOutCd', (theGateIn.get('rhdlMode') === 'R' ? 'O' : 'I'));
				theGateIn.set('cgNo', theGateIn.get('shipgNoteNo'));
			}
			//BL GateIn:
			if (!StringUtil.isNullorEmpty(theGateIn.data.blNo)) {
				theGateIn.set('cgInOutCd', 'O');
				theGateIn.set('cgNo', theGateIn.get('blNo'));
				// me.insGateInData.set('tsptTpCd', theGateInBldo.get('tspttpcd'));
				// me.insGateInData.set('delvTpCd', theGateInBldo.get('delvTpCode'));
				// me.insGateInData.set('toLocId', theGateInBldo.get('toLocId'));
				// me.insGateInData.set('pkgTpCd', theGateInBldo.get('pkgTpCd'));
			}

			//LorryDetail:
			// if (theGateInLorry) {
			// 	me.insGateInData.set('lorryNo', theGateInLorry.get('lorryNo'));
			// 	me.insGateInData.set('tsptCompNm', theGateInLorry.get('transportName'));
			// 	me.insGateInData.set('tsptr', theGateInLorry.get('transportCd'));
			// }

			if (refs.refTxtGateInTabGateInTime.getValue()) {
				theGateIn.set('gateInDt', refs.refTxtGateInTabGateInTime.getValue());
			} else {
				theGateIn.set('gateInDt', Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			}
			

		} else {// GATE OUT:
			var gateOutTicketItem = me.getViewModel().get('gateOutTicket');
			var gateOutLorryItem = me.getViewModel().get('gateOutLorry');

			me.insGateOutData.set('callYear', gateOutTicketItem.get('callYear'));
			me.insGateOutData.set('callSeq', gateOutTicketItem.get('callSeq'));
			me.insGateOutData.set('vslCd', gateOutTicketItem.get('vslCd'));
			me.insGateOutData.set('cgNo', gateOutTicketItem.get('cgNo'));
			me.insGateOutData.set('catgCd', gateOutTicketItem.get('opeClassCd'));
			me.insGateOutData.set('delvTpCd', gateOutTicketItem.get('delvTpCode'));
			me.insGateOutData.set('pkgTpCd', gateOutTicketItem.get('pkgTpCd'));
			me.insGateOutData.set('rePkgTpCd', gateOutTicketItem.get('rePkgTpCd'));
			me.insGateOutData.set('grNo', gateOutTicketItem.get('grNo'));
			me.insGateOutData.set('subDoNo', gateOutTicketItem.get('sdoNo'));
			me.insGateOutData.set('sdoNo', gateOutTicketItem.get('sdoNo'));
			me.insGateOutData.set('blNo', gateOutTicketItem.get('blNo'));
			me.insGateOutData.set('shipgNoteNo', gateOutTicketItem.get('shipgNoteNo'));

			me.insGateOutData.set('lorryNo', gateOutLorryItem.get('lorryNo'));

			//me.insGateOutData.set('tsptr', refs.refTxtGateOutTabTransporter.getValue());
			me.insGateOutData.set('gateTxnNo', refs.refTxtGateOutTxnNo.getValue());
			me.insGateOutData.set('vslCallId', me.vslCallId);

			me.insGateOutData.set('wgt', refs.refTxtGateOutTabMt.getValue());
			me.insGateOutData.set('pkgQty', refs.refTxtGateOutTabQty.getValue());
			me.insGateOutData.set('msrmt', refs.refTxtGateOutTabM3.getValue());
			me.insGateOutData.set('cmdtCd', refs.refTxtGateOutTabCommodity.getValue());

			me.insGateOutData.set('gateOutCd', refs.refCboGateOutTabGateNo.getValue());
			me.insGateOutData.set('searchType', 'gateOut');

			if (refs.refTxtGateOutTabGateOutTime.getValue()) {
				me.insGateOutData.set('gateOutDt', refs.refTxtGateOutTabGateOutTime.getValue());
			} else {
				me.insGateOutData.set('gateOutDt', Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			}

			if (gateOutTicketItem.get('blNo')) {
				me.insGateInData.set('cgInOutCd', 'O');

			} else if (gateOutTicketItem.get('grNo') && gateOutTicketItem.get('rhdlMode') === 'R') {
				me.insGateInData.set('cgInOutCd', 'O');
			} else {
				me.insGateInData.set('cgInOutCd', 'I');
			}


			me.getViewModel().setData({ theGateOut: me.insGateOutData });
		}

	},

	clearInputGateInFields: function () {
		var me = this;
		var refs = me.getReferences();

		refs.refTxtGateInTabLorryNo.setValue('');
		refs.refTxtGateInTabBlDo.setValue('');
		refs.refTxtGateInTabGr.setValue('');
		refs.refTxtGateInTabDriverId.setValue('');
		refs.refTxtGateInTabDriverName.setValue('');
		refs.refTxtGateInTabLicense.setValue('');
		refs.refTxtGateInTabExpired.setValue('');
		refs.refTxtGateInTabTransporterName.setValue('');

		refs.refTxtGateInTabDMode.setValue('');
		refs.refTxtGateInTabCommodity.setValue('');
		refs.refTxtGateInTabMt.setValue('');
		refs.refTxtGateInTabM3.setValue('');
		refs.refTxtGateInTabQty.setValue('');
		refs.refTxtGateInTabCustoms.setValue('');
		refs.refTxtGateInTabToLocId.setValue('');
		refs.refTxtGateInTabGateInTime.setValue('');

		me.getViewModel().setData({ theGateIn: Ext.create('MOST.model.operation.GateOperation') });
		me.getViewModel().setData({ gateInGr: null });
		me.getViewModel().setData({ gateInBldo: null });


		refs.refCboGateInTabGateNo.setValue(me.gateConfig.gateIn);
	},

	clearInputGateOutFields: function () {
		var me = this;
		var refs = me.getReferences();

		refs.refTxtGateOutTabLorryNo.setValue('');
		refs.refTxtGateOutTabDriverId.setValue('');
		refs.refTxtGateOutTabDriverName.setValue('');
		refs.refTxtGateOutTabLicense.setValue('');
		refs.refTxtGateOutTabExpired.setValue('');
		//refs.refTxtGateOutTabTransporter.setValue('');
		refs.refTxtGateOutTabTransporterName.setValue('');
		refs.refTxtGateOutTabMt.setValue('');
		refs.refTxtGateOutTabQty.setValue('');
		refs.refTxtGateOutTabM3.setValue('');
		refs.refTxtGateOutTabCommodity.setValue('');
		refs.refTxtGateOutTabCustoms.setValue('');
		refs.refTxtGateOutTxnNo.setValue('');

		refs.refTxtGateOutGateInTime.setValue('');
		refs.refTxtGateOutTabGateOutTime.setValue('');
		refs.refCboGateOutTabGateNo.setValue('');

		me.getViewModel().setData({ theGateOut: Ext.create('MOST.model.operation.GateOperation') });
		me.getViewModel().setData({ gateOutTicket: null });
	},

	onGetGateOutGateTicketInformation: function () {
		var me = this;
		var refs = me.getReferences();
		var gateOutLorryItem = me.getViewModel().get('gateOutLorry');

		var store = me.getStore('gateTicketNoPopup');
		me.setMaskedForm(true);
		store.load({
			params: {
				lorryNo: gateOutLorryItem.get('lorryNo'),
				vslCallId: gateOutLorryItem.get('vslCallId'),
				gateTxnNo: gateOutLorryItem.get('gateTxnNo')
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.getViewModel().setData({ gateOutTicket: records[0] });

						me.vslCallId = records[0].get('vslCallId');
						refs.refTxtGateOutTxnNo.setValue(records[0].get('gateTxnNo'));
						refs.refTxtGateOutGateInTime.setValue(records[0].get('gateInDate'));
						refs.refTxtGateOutTabCommodity.setValue(records[0].get('cmdtCode'));
						refs.refTxtGateOutTabMt.setValue(records[0].get('mt'));
						refs.refTxtGateOutTabQty.setValue(records[0].get('pkgQty'));
						refs.refTxtGateOutTabM3.setValue(records[0].get('m3'));

						refs.refCboGateOutTabGateNo.focus();
					}
				}
				me.setMaskedForm(false);
			}
		});
	},


	//20240703. Added. Scan QR Code:
	//#################################

	//Rbt. Test:
	openQR: function () {
		var me = this;
		var title = ViewUtil.getLabel('popup_title_qrscanner');
		var parms = {
			title: title
		};

		ViewUtil.openHhtPopup(me, 'popup-qrscannerpopup', 'refBtnQRScanGate', parms);
	},

	onTblBtnBarcode: function () {
		var me = this;

		if (me.tabMode === 'gateIn') {
			me.getViewModel().setData({ gateInGr: null });
			me.getViewModel().setData({ gateInBldo: null });
		}

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
		me.html5QrCode = new Html5Qrcode(/* element id */ "qr-readerGtxn");
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

	setQRButton: function (active) {
		var me = this;
		var refs = me.getReferences();
		var qrBtn = refs.refBtnQRScanApron;

		if (active) {
			qrBtn.setText(me.TXT_CANCEL);
		} else {
			qrBtn.setText(me.TXT_QRSCAN);
		}
		me.QR_ACTIVE = active;
	},
	//QR scan
	getCameraDevice: function () {
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		//var deviceNo = refs.refCameraFrontRear.getValue()? 0 : 1;
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
	clearCodeValue: function (ref) {
		var me = this;
		var refs = me.getReferences();

		// if(!ref){//Call by begin Scan -> clear SN and BL combo
		// 	refs.refCboBookingNo.reset();
		// 	refs.refCboShipgNoteNo.reset();
		// 	refs.refTxtGrNo.setValue('');

		// 	refs.refCboMBLNo.reset();
		// 	refs.refCboBlNo.reset();
		// 	refs.refTxtSdoNo.setValue('');

		// 	refs.refChkYardTruck.setChecked(false);
		// 	refs.refChkBargeOperation.setValue(false);
		// 	refs.refTxtLorryNo.setValue('');
		// 	refs.refTxtUserRefNo.setValue('');
		// }
	},

	//GateIn + GateOut
	setValueQRcode: function (value) {

		var me = this;
		var refs = me.getReferences();
		var store = null;
		if (!value) {
			return;
		}

		if (me.tabMode === 'gateIn') {
			store = me.getStore('gateInQRScanning');

		} else {
			store = me.getStore('gateOutQRScanning');

		}

		me.setMaskedForm(true);
		store.load({
			params: {
				qrNo: value
			},
			callback: function (record, operation, success) {
				if (success) {
					if (record != null && record.length > 0) {

						if (me.tabMode === 'gateIn') {
							me.setQRrestultGateIn(record[0]);
						} else {
							me.setQRrestultGateOut(record[0]);
						}
					} else {
						MessageUtil.noMatchData();
						me.setMaskedForm(false);
					}
				} else {
					MessageUtil.error('Error', 'Error');
					me.setMaskedForm(false);
				}

			}
		});
	},

	setQRrestultGateIn: function (record) {
		var me = this;

		if (!StringUtil.isNullorEmpty(record.get('blNo'))) {//Import
			me.retrieveBlDoNoInfo(record);

		} else if (!StringUtil.isNullorEmpty(record.get('shipgNoteNo'))) {//Export			
			me.retrieveGrInfo(record);

		}
	},

	//GateIn + GateOut
	setQRrestultGateOut: function (record) {
		var me = this;
		var refs = me.getReferences();

		//Retrive GateOut Information
		me.getViewModel().setData({ gateOutLorry: record });

		refs.refTxtGateOutTabLorryNo.setValue(record.data.lorryNo);
		refs.refTxtGateOutTabDriverId.setValue(record.data.driverId);
		refs.refTxtGateOutTabDriverName.setValue(record.data.driverNm);
		refs.refTxtGateOutTabExpired.setValue(record.data.expdate);
		refs.refTxtGateOutTabLicense.setValue(record.data.liscNo);
		refs.refTxtGateOutTabTransporterName.setValue(record.data.tsptCompNm);
		refs.refTxtGateOutTabCustoms.setValue(record.data.customsStat);
		refs.refTxtGateOutTxnNo.setValue(record.data.gateTxnNo);
		//refs.refTxtGateOutGateInTime.setValue(record.data.gateInDate);

		me.onGetGateOutGateTicketInformation();
	},

	//GateIn:
	retrieveBlDoNoInfo: function (masterItem) {

		var me = this;
		var refs = me.getReferences();
		var theGateInItem = me.getViewModel().get('theGateIn');

		var blDoStore = me.getStore('blDo');

		let searchType = '';
		if (masterItem.get('blNo')) {
			searchType = 'I'; //Import
			refs.refRdoGateInTabBlDo.setChecked(true);
		} else {
			searchType = 'E';
		}

		me.getViewModel().setData({ gateInLorry: masterItem });

		theGateInItem.set('lorryNo', masterItem.get('lorryNo'));
		theGateInItem.set('driverId', masterItem.get('driverId'));
		theGateInItem.set('driverNm', masterItem.get('driverNm'));
		theGateInItem.set('licsExprYmd', masterItem.get('licsExprYmd'));
		theGateInItem.set('licsNo', masterItem.get('licsNo'));
		theGateInItem.set('tsptr', masterItem.get('tsptr'));
		theGateInItem.set('vslCallId', masterItem.get('vslCallId'));
		theGateInItem.set('mfDocId', masterItem.get('mfDocId'));
		theGateInItem.set('blNo', masterItem.get('blNo'));
		theGateInItem.set('doNo', masterItem.get('doNo'));
		theGateInItem.set('sdoNo', masterItem.get('sdoNo'));

		var param = {
			searchType: 'I',
			lorryNo: masterItem.get('lorryNo'),
			vslCallId: masterItem.get('vslCallId'),
			qrNo: masterItem.get('imtNo'),
			masterBL: masterItem.get('mfDocId'),
			blNo: masterItem.get('blNo'),
			sdoNo: masterItem.get('sdoNo'),
			grNo: masterItem.get('grNo'),
			shipgNoteNo: masterItem.get('shipgNoteNo'),
		};

		me.setMaskedForm(true);
		blDoStore.load({
			params: param,
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						//set BLDO information
						me.getViewModel().setData({ gateInBldo: records[0] });

						theGateInItem.set('cmdtCd', records[0].get('cmdtCd'));
						theGateInItem.set('cmdtNm', records[0].get('cmdtNm'));
						theGateInItem.set('wgt', records[0].get('wgt'));
						theGateInItem.set('msrmt', records[0].get('msrmt'));
						theGateInItem.set('pkgQty', records[0].get('pkgQty'));
						theGateInItem.set('toLocId', records[0].get('toLocId'));
						theGateInItem.set('customsStat', records[0].get('customsStat'));
						theGateInItem.set('delvTpCd', records[0].get('delvTpCd'));
						theGateInItem.set('delvTpNm', records[0].get('delvTpNm'));

						refs.refCboGateInTabGateNo.focus();
					}
				}
				me.setMaskedForm(false);
			}
		});
	},

	//GateIn:
	retrieveGrInfo: function (masterItem) {
		var me = this;
		var refs = me.getReferences();
		var theGateInItem = me.getViewModel().get('theGateIn');
		var grStore = me.getStore('goodReceipt');

		if (!masterItem.get('grNo')) {
			return;
		}

		let searchType = '';
		if (masterItem.get('blNo')) {
			searchType = 'I'; //Import

		} else {
			refs.refRdoGateInTabGr.setChecked(true);
			searchType = 'E';
		}

		//Set GateIN assgined Information:
		me.getViewModel().setData({ gateInLorry: masterItem });

		theGateInItem.set('lorryNo', masterItem.get('lorryNo'));
		theGateInItem.set('driverId', masterItem.get('driverId'));
		theGateInItem.set('driverNm', masterItem.get('driverNm'));
		theGateInItem.set('licsExprYmd', masterItem.get('licsExprYmd'));
		theGateInItem.set('licsNo', masterItem.get('licsNo'));
		theGateInItem.set('tsptr', masterItem.get('tsptr'));
		theGateInItem.set('vslCallId', masterItem.get('vslCallId'));
		theGateInItem.set('shipgNoteNo', masterItem.get('shipgNoteNo'));
		theGateInItem.set('mfDocId', masterItem.get('mfDocId'));
		theGateInItem.set('grNo', masterItem.get('grNo'));

		//Retrieve GR Detail
		var param = {
			searchType: 'E',
			lorryNo: masterItem.get('lorryNo'),
			vslCallId: masterItem.get('vslCallId'),
			qrNo: masterItem.get('imtNo'),
			bookingNo: masterItem.get('mfDocId'),
			shipgNoteNo: masterItem.get('shipgNoteNo'),
			grNo: masterItem.get('grNo'),
			sdoNo: masterItem.get('sdoNo'),
			blNo: masterItem.get('blNo'),
		};

		grStore.load({
			params: param,
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						//set GR information
						me.getViewModel().setData({ gateInGr: records[0] });

						theGateInItem.set('cmdtCd', records[0].get('cmdtCd'));
						theGateInItem.set('cmdtNm', records[0].get('cmdtNm'));
						theGateInItem.set('wgt', records[0].get('wgt'));
						theGateInItem.set('msrmt', records[0].get('msrmt'));
						theGateInItem.set('pkgQty', records[0].get('pkgQty'));
						theGateInItem.set('toLocId', records[0].get('toLocId'));
						theGateInItem.set('customsStat', records[0].get('customsStat'));
						theGateInItem.set('delvTpCd', records[0].get('delvTpCd'));
						theGateInItem.set('delvTpNm', records[0].get('delvTpNm'));

						refs.refCboGateInTabGateNo.focus();
					}
				}
				me.setMaskedForm(false);
			}
		});
	},


	/**
	 * ===============================================================================================================
	*/
	setMaskedForm(value) {
		var me = this;
		var ctl = me.lookupReference(me.FORM_REF);
		if (ctl) {
			me.setMaskedHHT(me, ctl.reference, value);
		}
	},

	// onDamageCheck: function(button, e, eOpts){
	// 	var  me = this
	//         ,record = Ext.create('MOST.model.operation.DamageCheck')
	//         ,theVessel = me.getViewModel().get('theVessel')
	//         ,currentTimeFormatted = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
	//     ;

	//     record.set({
	//          vslCallId: me.getViewModel().get('globalVesselCallId') 
	//         ,vslCd: theVessel['vslCd']
	//         ,callSeq: theVessel['callSeq']
	//         ,callYear: theVessel['callYear']
	//         ,catgCd: me.IMPORT_CD
	//         ,checkedDt: currentTimeFormatted
	//         ,workingStatus: WorkingStatus.INSERT
	//     });
	//     me.openTblDamageCheckDetailPopup(button.reference, record);
	// },

	// openTblDamageCheckDetailPopup: function(ref, record) {
	//     var  me = this
	//         ,detailData = me.getViewModel().get('tblDamageCheckDetail')
	//     ;

	//     Ext.Object.merge(detailData.data, record.data);
	//     detailData.phantom = record.phantom;
	//     record.title = 'The Detail of Damage Check';
	//     ViewUtil.openHhtPopup(me, 'app-damagecheckhhtpopup', null, record);
	// },

	openDamageCheck: function () {
		var me = this
			, currentTimeFormatted = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
			, damageCheckData = new Ext.create('MOST.model.operation.DamageCheck')
			, refs = me.getReferences()
			, tabTitle = refs.refTabGateTxn.getActiveItem().getTitle().trim()
			, listCargo = new Array()
			, gateInBldo = me.getViewModel().get('gateInBldo')
			, gateInGr = me.getViewModel().get('gateInGr')
			;

		if (gateInBldo && !gateInGr && tabTitle == 'GateIn') {
			damageCheckData = gateInBldo;
		}

		if (!gateInBldo && gateInGr && tabTitle == 'GateOut') {
			damageCheckData = gateInGr;
		}


		if (tabTitle == 'GateInRORO' || tabTitle == 'GateOutRORO') {
			var refGrid = '',
				grid = null,
				selection = null;

			if (tabTitle == 'GateInRORO') {
				refGrid = 'refROROGateInHHTGrid';
			} else {
				refGrid = 'refROROGateOutHHTGrid';
			}

			grid = me.lookupReference(refGrid),
				selection = grid.getSelection();

			if (selection) {
				damageCheckData = selection;
				damageCheckData.set({
					isOperationScreen: true
					, checkedDt: currentTimeFormatted
					, title: 'The Detail of Damage Check'
					, locCd: 'GATE'
				});
				ViewUtil.openHhtPopup(me, 'app-damagecheckhhtpopup', null, damageCheckData);
			} else {
				MessageUtil.warning('warning_msg', 'vesselworkplan_add_record_msg');
				return;
			}
		} else {
			damageCheckData.set({
				isOperationScreen: true
				, checkedDt: currentTimeFormatted
				, title: 'The Detail of Damage Check'
				, locCd: 'GATE'
			});
			ViewUtil.openHhtPopup(me, 'app-damagecheckhhtpopup', null, damageCheckData);
		}
	},
});

