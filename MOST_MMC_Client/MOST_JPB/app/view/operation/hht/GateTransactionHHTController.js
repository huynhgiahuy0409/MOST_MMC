Ext.define('MOST.view.operation.hht.GateTransactionHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [

	],

	alias: 'controller.gatetransactionhht',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	PORTSAFETY_CONFIRMATION_PROXY_URL: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatetransaction/portSafetyConfirmationComboList',
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

	},
	
	onComboList: function () {
		var me = this;
		var store = me.getStore('gateComboList');

		store.load();
	},

	setDefaultControl() {
		var me = this;
		var refs = me.getReferences();

		refs.refRdoGateInTabBlDo.suspendEvents();
		refs.refRdoGateInTabGr.suspendEvents();
		refs.refRdoGateOutTabGPass.suspendEvents();
		refs.refRdoGateOutTabGr.suspendEvents();

		refs.refRdoGateInTabBlDo.setChecked(true);
		refs.refRdoGateOutTabGPass.setValue(true);

		refs.refTxtGateOutTabGPass.setEditable(true);
		refs.refTxtGateOutTabGr.setEditable(false);

		refs.refRdoGateInTabBlDo.resumeEvents();
		refs.refRdoGateInTabGr.resumeEvents();
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
			title: 'Assigned Truck List',
			lorryNo: refs.refTxtGateInTabLorryNo.getValue(),
			vslCallId: me.getViewModel().get('globalVesselCallId')
		};
		ViewUtil.openCodePopup(this, 'popup-assignedexternaltrucklistpopuphht', 'refTxtGateInTabLorryNo', params);
	},

	onSearchDOGateIn: function () {
		var me = this;
		var refs = me.getReferences();
		
		if (StringUtil.isNullorEmpty(refs.refTxtGateInTabLorryNo.getValue())) {
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
		
		var params = {
			title: 'Sub D/O List',
			lorryNo: refs.refTxtGateInTabLorryNo.getValue(),
			vslCallId: me.getViewModel().get('globalVesselCallId')

		};
		ViewUtil.openCodePopup(this, 'app-sdopopuphht', 'refTxtGateInTabBlDo', params);
	},

	onSearchGRListGI: function () {
		var me = this;
		var refs = me.getReferences();

		if (StringUtil.isNullorEmpty(refs.refTxtGateInTabLorryNo.getValue())) {
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
		var params = {
			title: 'GR List',
			vslCallId: me.getViewModel().get('globalVesselCallId'),
			lorryNo: refs.refTxtGateInTabLorryNo.getValue(),
			tabMode: 'gateIn',
			gdsRecvNo: refs.refTxtGateInTabGr.getValue(),
			//gridSelMode: 'multi'
		};
		ViewUtil.openCodePopup(this, 'app-grhhtpopup', 'refTxtGateInTabGr', params);
	},

	//GateOut
	onSearchLorryGateOut: function () {
		var me = this;
		var refs = me.getReferences();
		var params = {
				title: 'In-Gate Truck List',
				vslCallId:  me.getViewModel().get('globalVesselCallId'),
				lorryNo: refs.refTxtGateOutTabLorryNo.getValue(),
				searchType: 'GO'
			};
		
		ViewUtil.openCodePopup(this, 'popup-ingatetrucklistpopuphht', 'refTxtGateOutTabLorryNo', params);
	},

	onSearchGPGateOut:function(){
		var me = this;
		var refs = me.getReferences();
		if(StringUtil.isNullorEmpty(refs.refTxtGateOutTabLorryNo.getValue())){
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
			var params = {
				title: 'Gate Pass List',
				gatePassNo:  refs.refTxtGateOutTabGPass.getValue(),
				lorryNo: refs.refTxtGateOutTabLorryNo.getValue(),
				vslCallId: me.getViewModel().get('globalVesselCallId'), 
			};		
			ViewUtil.openCodePopup(this, 'app-gatepasslisthhtpopup', 'refBtnGPGateOut', params);
	},

	onSearchGRListGO:function(){
		var me = this;
		var refs = me.getReferences();
		if(StringUtil.isNullorEmpty(refs.refTxtGateOutTabLorryNo.getValue())){
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
		var params = {
			title: 'GR List',
			lorryNo: refs.refTxtGateOutTabLorryNo.getValue(),
			gdsRecvNo:refs.refTxtGateOutTabGr.getValue(),
			tabMode:'gateOut',
			gateInOut: 'O',
			gridSelMode: 'single'
		};		
		ViewUtil.openCodePopup(this, 'app-grhhtpopup', 'refTxtGateOutTabGr', params);
	},
	
	onSearchGateTicketNoGateOut:function(){
		var me = this;
		var refs = me.getReferences();
		if(StringUtil.isNullorEmpty(refs.refTxtGateOutTabLorryNo.getValue())){
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}
		var params = {
			title: 'Gate Transaction List',
			lorryNo: refs.refTxtGateOutTabLorryNo.getValue(),
			vslCallId: me.getViewModel().get('globalVesselCallId')
		};		
		ViewUtil.openCodePopup(this, 'popup-gateticketnopopuphht', 'refTxtGateOutTxnNo', params);
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
	
	onChangeLorry: function (gateInOut) {
		var me = this;
		var refs = me.getReferences();

		if (gateInOut === 'GI') {

			refs.refTxtGateInTabBlDo.setValue('');
			refs.refTxtGateInTabDMode.setValue('');
			refs.refTxtGateInTabCommodity.setValue('');
			refs.refTxtGateInTabMt.setValue('');
			refs.refTxtGateInTabQty.setValue('');
			refs.refTxtGateInTabM3.setValue('');
		}
		if (gateInOut === 'GO') {

			refs.refTxtGateOutTabGr.setValue('');
			me.insGateOutData.set('tsptr', '');
			refs.refTxtGateOutTabCommodity.setValue('');
			refs.refTxtGateOutTabMt.setValue('');
			refs.refTxtGateOutTabQty.setValue('');
		}
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


		if (targetControl === 'refTxtGateInTabLorryNo') {
			me.onChangeLorry('GI');
			if (returnValue) {
				me.getViewModel().setData({ gateInLorry: returnValue.item });

				refs.refTxtGateInTabLorryNo.setValue(returnValue.code);
				refs.refTxtGateInTabDriverId.setValue(returnValue.item.data.driverId);
				refs.refTxtGateInTabDriverName.setValue(returnValue.item.data.driverName);
				refs.refTxtGateInTabExpired.setValue(returnValue.item.data.licenseExpired);
				refs.refTxtGateInTabLicense.setValue(returnValue.item.data.licenseNo);
				refs.refTxtGateInTabTransporterName.setValue(returnValue.item.data.transportName);
				refs.refTxtGateInTabCustoms.setValue(returnValue.item.data.customsReleasedStatus);
			} else {
				me.getViewModel().setData({ gateInLorry: null });
			}
		} else if (targetControl === 'refTxtGateInTabGr') {
			if (returnValue) {
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
	},
	
	//For GateIn Tab
	functionGRDO: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var refFeild = field.getReference();
		var isBLDO = false, isGR = false;
	
		isBLDO = (refFeild === 'refRdoGateInTabBlDo' && newValue);
		isGR = (refFeild === 'refRdoGateInTabGr' && newValue);

		if(isGR){
			refs.refTxtGateInTabGr.setEditable(isGR);
			refs.refTxtGateInTabBlDo.setValue('');
		}
		
		if(isBLDO){
			refs.refTxtGateInTabBlDo.setEditable(isBLDO);
			refs.refTxtGateInTabGr.setValue('');
		}

		if(isBLDO || isGR){
			refs.refTxtGateInTabDMode.setValue('');
			refs.refTxtGateInTabCommodity.setValue('');
			refs.refTxtGateInTabMt.setValue('');
			refs.refTxtGateInTabM3.setValue('');
			refs.refTxtGateInTabQty.setValue('');
			refs.refTxtGateInTabToLocId.setValue('');
		}
		
	},
	
	gateInValidation: function () {
		var me = this;
		var refs = me.getReferences();

		if (StringUtil.isNullorEmpty(refs.refTxtGateInTabLorryNo.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}

		if (refs.refRdoGateInTabGr.getChecked()) {
			if (StringUtil.isNullorEmpty(refs.refTxtGateInTabGr.getValue())) {
				MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', 'portsafetyconfirmation_validcheck_gr_mandatory_msg');
				return;
			}
		}
		
		if (refs.refRdoGateInTabBlDo.getChecked()) {
			if (StringUtil.isNullorEmpty(refs.refTxtGateInTabBlDo.getValue())) {
				MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', 'portsafetyconfirmation_validcheck_bldo_mandatory_msg');
				return;
			}
		}

		if (StringUtil.isNullorEmpty(refs.refCboGateInTabGateNo.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', 'portsafetyconfirmation_validcheck_gate_mandatory_msg');
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
	
	gateOutValidation: function () {
		var me = this;
		var refs = me.getReferences();

		if (StringUtil.isNullorEmpty(refs.refTxtGateOutTabLorryNo.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_lorry_mandatory_msg', 'portsafetyconfirmation_validcheck_lorry_mandatory_msg');
			return;
		}

		me.save();
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

		//GATE IN
		if (me.tabMode === 'gateIn') {
			var theGateInGr = me.getViewModel().get('gateInGr');
			var theGateInBldo = me.getViewModel().get('gateInBldo');
			var theGateInLorry = me.getViewModel().get('gateInLorry');

			//GR GateIn:
			if (theGateInGr) {
				me.insGateInData.set('cgInOutCd', (theGateInGr.get('rhdlMode') === 'R' ? 'O' : 'I'));
				me.insGateInData.set('catgCd', theGateInGr.get('opeClassCd'));
				me.insGateInData.set('pkgTpCd', theGateInGr.get('pkgTpCd'));
				me.insGateInData.set('rePkgTpCd', theGateInGr.get('rePkgTpCd'));
				me.insGateInData.set('grNo', theGateInGr.get('grNo'));
				me.insGateInData.set('cgNo', theGateInGr.get('grNo'));
				me.insGateInData.set('tsptTpCd', theGateInGr.get('tsptTpCd'));
				me.insGateInData.set('delvTpCd', theGateInGr.get('delvTpCode'));
				me.insGateInData.set('delvTpNm', theGateInGr.get('delvTpNm'));
				me.insGateInData.set('shipgNoteNo', theGateInGr.get('shipgNoteNo'));
				me.insGateInData.set('msrmt', theGateInGr.get('grMsrmt'));
				me.insGateInData.set('toLocId', theGateInGr.get('toLocId'));
			}

			//BL GateIn:
			if (theGateInBldo) {
				me.insGateInData.set('cgInOutCd', 'O');
				me.insGateInData.set('subDoNo', theGateInBldo.get('sdoNo'));
				me.insGateInData.set('doNo', theGateInBldo.get('doNo'));
				me.insGateInData.set('blNo', theGateInBldo.get('blNo'));
				me.insGateInData.set('cgNo', theGateInBldo.get('blNo'));
				me.insGateInData.set('catgCd', theGateInBldo.get('opeClassCd'));
				me.insGateInData.set('tsptTpCd', theGateInBldo.get('tspttpcd'));
				me.insGateInData.set('delvTpCd', theGateInBldo.get('delvTpCode'));
				me.insGateInData.set('toLocId', theGateInBldo.get('toLocId'));
				me.insGateInData.set('pkgTpCd', theGateInBldo.get('pkgTpCd'));
				me.insGateInData.set('rePkgTpCd', theGateInBldo.get('rePkgTpCd'));
			}

			//LorryDetail:
			if (theGateInLorry) {
				me.insGateInData.set('lorryNo', theGateInLorry.get('lorryNo'));
				me.insGateInData.set('tsptCompNm', theGateInLorry.get('transportName'));
				me.insGateInData.set('tsptr', theGateInLorry.get('transportCd'));
			}

			if (refs.refTxtGateInTabGateInTime.getValue()) {
				me.insGateInData.set('gateInDt', refs.refTxtGateInTabGateInTime.getValue());
			} else {
				me.insGateInData.set('gateInDt', Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			}


			me.insGateInData.set('vslCallId', me.vslCallId);
			me.insGateInData.set('licsExprYmd', refs.refTxtGateInTabExpired.getValue());
			me.insGateInData.set('gateCd', refs.refCboGateInTabGateNo.getValue());
			me.insGateInData.set('wgt', refs.refTxtGateInTabMt.getValue());
			me.insGateInData.set('pkgQty', refs.refTxtGateInTabQty.getValue());
			me.insGateInData.set('msrmt', refs.refTxtGateInTabM3.getValue());
			me.insGateInData.set('cmdtCd', refs.refTxtGateInTabCommodity.getValue());
			me.insGateInData.set('driverId', refs.refTxtGateInTabDriverId.getValue());
			me.insGateInData.set('searchType', 'gateIn');
			me.insGateInData.set('crud', 'I');

			me.getViewModel().setData({ theGateIn: me.insGateInData });
		} else {// GATE OUT:
			var gateOutTicketItem = me.getViewModel().get('gateOutTicket');
			var gateOutLorryItem = me.getViewModel().get('gateOutLorry');

			me.insGateOutData.set('cgNo', gateOutTicketItem.get('cgNo'));
			me.insGateOutData.set('catgCd', gateOutTicketItem.get('opeClassCd'));
			me.insGateOutData.set('delvTpCd', gateOutTicketItem.get('delvTpCode'));
			me.insGateOutData.set('pkgTpCd', gateOutTicketItem.get('pkgTpCd'));
			me.insGateOutData.set('rePkgTpCd', gateOutTicketItem.get('rePkgTpCd'));
			
			me.insGateOutData.set('lorryNo', gateOutLorryItem.get('lorryNo'));

			//me.insGateOutData.set('tsptr', refs.refTxtGateOutTabTransporter.getValue());
			me.insGateOutData.set('gateTxnNo',refs.refTxtGateOutTxnNo.getValue());
			me.insGateOutData.set('vslCallId', me.vslCallId);

			me.insGateOutData.set('wgt', refs.refTxtGateOutTabMt.getValue());
			me.insGateOutData.set('pkgQty', refs.refTxtGateOutTabQty.getValue());
			me.insGateOutData.set('msrmt', refs.refTxtGateOutTabM3.getValue());
			me.insGateOutData.set('cmdtCd', refs.refTxtGateOutTabCommodity.getValue());

			me.insGateOutData.set('grNo', gateOutTicketItem.get('grNo'));
			me.insGateOutData.set('subDoNo', gateOutTicketItem.get('sdoNo'));
			me.insGateOutData.set('gateOutCd', refs.refCboGateOutTabGateNo.getValue());
			me.insGateOutData.set('searchType', 'gateOut');

			if (refs.refTxtGateOutTabGateOutTime.getValue()) {
				me.insGateOutData.set('gateOutDt', refs.refTxtGateOutTabGateOutTime.getValue());
			} else {
				me.insGateOutData.set('gateOutDt', Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
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

		me.getViewModel().setData({ theGateIn: null });
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

		me.getViewModel().setData({ theGateOut: null });
		me.getViewModel().setData({ gateOutTicket: null });
	},

	onGetGateOutGateTicketInformation: function () {
		var me = this;
		var refs = me.getReferences();
		var gateOutLorryItem = me.getViewModel().get('gateOutLorry');
		
		var store = me.getStore('gateTicketNoPopup');
		store.load({
			params: {
				lorryNo: gateOutLorryItem.get('lorryNo'),
				vslCallId: gateOutLorryItem.get('vslCallId'),
				gateTxnNo: gateOutLorryItem.get('gateTxnNo')
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						me.getViewModel().setData({ gateOutTicket: records[0]});
						
						me.vslCallId = records[0].get('vslCallId');
						refs.refTxtGateOutTxnNo.setValue(records[0].get('gateTxnNo'));
						refs.refTxtGateOutGateInTime.setValue(records[0].get('gateInDate'));
						refs.refTxtGateOutTabCommodity.setValue(records[0].get('cmdtCode'));
						refs.refTxtGateOutTabMt.setValue(records[0].get('mt'));
						refs.refTxtGateOutTabQty.setValue(records[0].get('pkgQty'));
						refs.refTxtGateOutTabM3.setValue(records[0].get('m3'));
					}
				}
			}
		});
	},

});

