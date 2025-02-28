Ext.define('MOST.view.popup.GRHHTPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.grhhtpopup',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	PERIOD_DAY: 91,
	paramLorryNo: '',
	paramVslCallId: '',
	paramTabMode: '',
	NumberOfMonths: 3,
	shipgNoteNo: '',
	gdsRecvNo: '',
	opType: '',
	jpvcChk: true,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */

	// After Renderer Event
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		
//		me.setDateInDays("refTxtGrPopFromDate", -me.PERIOD_DAY);
//		me.setDateInDays("refTxtGrPopToDate");

		if (me.getView().recvData) {
			me.getView().up('window').setTitle(recvData.title);
			me.paramLorryNo = me.getView().recvData.lorryNo;
			me.paramVslCallId = me.getView().recvData.vslCallId;
			me.paramTabMode = me.getView().recvData.tabMode;
			me.paramGateInOut = me.getView().recvData.gateInOut;
			refs.ctlVslCallId.setValue(me.getView().recvData.vslCallId);
			
		}

		me.setUIpopup();
		me.onSearch();
	},

	setUIpopup: function(){
		var me = this;
		var recvData = me.getView().recvData;
		var grid = me.lookupReference('refGRPopupGrid');
		var selection = grid.getSelection();
		if(recvData && !StringUtil.isNullorEmpty(recvData.gridSelMode)){
			grid.getSelectable().setMode(recvData.gridSelMode);
		}
	},

	onCheckJpvcRadioField: function (radioField, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore('snCombo');

		if (radioField.getValue() == 'VESSEL' && newValue) {
			refs.ctlVslCallId.setDisabled(true);
			refs.ctlSn.setDisabled(true);


		} else if (radioField.getValue() == 'STRG' && newValue) {
			refs.ctlVslCallId.setDisabled(false);
			refs.ctlSn.setDisabled(false);
			snCombo.removeAll();
		}
	},

	// Grid Row Double
	onDblClick: function () {
		var me = this;
		var window = me.getView().up('window');
		var recvData = me.getView().recvData;
		var returnValue = null;

		if(recvData.gridSelMode === 'multi'){
			returnValue = me.getReturnMutiSelect();
		}else{
			returnValue = me.getReturnData();
		}

		if (!returnValue) {
			return;
		}

		window.returnValue = returnValue;
		window.close();
	},

	onSelect: function () {
		var me = this;
		var window = me.getView().up('window');
		var recvData = me.getView().recvData;
		var grid = me.lookupReference('refGRPopupGrid');
		var selection = grid.getSelection();

		if (selection == null || selection.length == 0) {
			MessageUtil.warning('warning_msg', 'grpopup_nonselected_warning');
			return;
		}

		if(recvData.gridSelMode === 'multi'){
			returnValue = me.getReturnMutiSelect();
		}else{
			returnValue = me.getReturnData();
		}

		window.returnValue = returnValue;
		window.close();
	},


	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if (control == refs.refTxtGrPopFromDate) {
			me.setDateInDaysByDate("refTxtGrPopToDate", me.PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("refTxtGrPopFromDate", -me.PERIOD_DAY, control.getValue());
		}
	},

	onFind: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('snHideCombo');
		var params = me.getFindCondition();

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (params.searchType === 'combo') {
						if (records.length > 0) {
							me.setComboStore(records[0].data)
						}
					}
				}
			}
		});
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	// getSearchCondition: function () {
	// 	var me = this;
	// 	var refs = me.getReferences();
	// 	var chkJpvc = refs.refChkJpvc.getValue();
	// 	var dateCondition = me.checkFromToDate("refTxtGrPopFromDate", "refTxtGrPopToDate");
	// 	var gdsRecvNo = '';
	// 	var vslCallId = '';
	// 	var lorryNo = '';
	// 	var shipgNoteNo = '';
	// 	var gateInOut = '';

	// 	if (me.getViewModel().get('theGr')) {
	// 		if (!StringUtil.isNullorEmpty(me.getViewModel().get('theGr').get('vslCallId'))) {
	// 			vslCallId = me.getViewModel().get('theGr').get('vslCallId');
	// 		} else {
	// 			vslCallId = me.paramVslCallId;
	// 		}

	// 		if (!StringUtil.isNullorEmpty(me.getViewModel().get('theGr').get('lorryNo'))) {
	// 			lorryNo = me.getViewModel().get('theGr').get('lorryNo');
	// 		} else {
	// 			lorryNo = me.paramLorryNo;
	// 		}

	// 	} else {
	// 		if (!StringUtil.isNullorEmpty(me.paramVslCallId)) {
	// 			vslCallId = me.paramVslCallId;
	// 		}

	// 		if (!StringUtil.isNullorEmpty(me.paramLorryNo)) {
	// 			lorryNo = me.paramLorryNo;
	// 		}
	// 	}

	// 	if (chkJpvc) {
	// 		// searching for JPVC 
	// 		if (!me.doSearchingforJPVC()) {
	// 			MessageUtil.warning('warning_msg', 'grpopup_date_warring_msg');
	// 			return;
	// 		}

	// 		if (!StringUtil.isNullorEmpty(refs.ctlSn.getValue())) {
	// 			shipgNoteNo = refs.ctlSn.getValue();
	// 		}
	// 	} else {
	// 		//searching for NonVessel
	// 		if (!me.doSearchingforNonJPVC()) {
	// 			MessageUtil.warning('warning_msg', 'grpopup_date_warring_msg');
	// 			return;
	// 		}

	// 		if (!StringUtil.isNullorEmpty(refs.ctlSnHide.getValue())) {
	// 			shipgNoteNo = refs.ctlSnHide.getValue();
	// 		}

	// 		vslCallId = 'NonCallId';
	// 	}


	// 	var params = {
	// 		gdsRecvNo: gdsRecvNo,
	// 		vslCallId: vslCallId,
	// 		lorryNo: lorryNo,
	// 		searchType: 'grNo',
	// 		opType: me.opType,
	// 		shipgNoteNo: shipgNoteNo,
	// 		gateInOut: me.paramGateInOut
	// 	}

	// 	if (dateCondition != null) {
	// 		params["arrvDtFm"] = dateCondition.fromDtString;
	// 		params["arrvDtTo"] = dateCondition.toDtString;
	// 	}

	// 	return params;
	// },

	getFindCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var chkJpvc = refs.refChkJpvc.getValue();
		var dateCondition = me.checkFromToDate("refTxtGrPopFromDate", "refTxtGrPopToDate");
		var gdsRecvNo = '';
		var shipgNoteNo = '';
		var params;

		if (!StringUtil.isNullorEmpty(refs.ctlSnHide.getValue())) {
			shipgNoteNo = refs.ctlSnHide.getValue();
		}

		if (me.validateSearchDoc()) {
			params = {
				vslCallId: me.vslCallId,
				shipgNoteNo: shipgNoteNo,
				searchType: 'combo',
			}
			if (dateCondition != null) {
				params["arrvDtFm"] = dateCondition.fromDtString;
				params["arrvDtTo"] = dateCondition.toDtString;
			}
		} else {
			params = null;
		}

		return params;
	},

	setComboStore: function (metaItem) {
		var me = this;
		var refs = me.getReferences();
		var snHideCombo = me.getStore('snHideCombo');
		if (metaItem.snList) {
			snHideCombo.setData(metaItem.snList);
		}

		snHideCombo.insert(0, [{ shipgNoteNo: '', shipgNoteNo: 'Select All' }]);

	},

	isChkJpvc: function () {
		var me = this;
		var refs = me.getReferences();

		if (me.paramVslCallId === 'NonCallId') {
			refs.refChkJpvc.setValue(false);
		} else {
			refs.refChkJpvc.setValue(true);
		}
	},

	doSearchingforJPVC: function () {
		var me = this;
		var refs = me.getReferences();
		var jpvc = me.paramVslCallId;

		me.opType = 'popUpGrJpvc';

		if (StringUtil.isNullorEmpty(jpvc)) {
			if (!me.doValidationOfTimePeriod()) {
				return false;
			}
		}

		me.shipgNoteNo = refs.ctlSn.getValue();

		return true;
	},

	doSearchingforNonJPVC: function () {
		var me = this;
		var refs = me.getReferences();
		if (!me.doValidationOfTimePeriod()) {
			return false;
		}
		me.paramVslCallId = 'NonCallId';
		me.shipgNoteNo = refs.ctlSn.getValue();
		return true;
	},

	doValidationOfTimePeriod: function () {
		var me = this;
		var refs = me.getReferences();
		var fromDt = new Date(refs.refTxtGrPopFromDate.getValue());
		var toDt = new Date(refs.refTxtGrPopToDate.getValue());
		var flag = false;
		var changeTargetDt = new Date(refs.refTxtGrPopFromDate.getValue());
		var tempDt = new Date(changeTargetDt.getFullYear(), (changeTargetDt.getMonth() + me.NumberOfMonths), changeTargetDt.getDate());

		if (fromDt < toDt && toDt < tempDt) {
			flag = true;
		} else {
			flag = false;
		}

		tempDt = null;
		return flag;

	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore('snCombo');

		if (targetControl === 'ctlVslCallId') {
			if (returnValue) {
				me.getViewModel().setData({ theGr: returnValue.item });
				//var vslCallId = me.getViewModel().get('theGr').get('vslCallId');
				var vslCallId = returnValue.code;
				me.paramVslCallId = vslCallId;
				snCombo.load({
					params: {
						vslCallId: vslCallId,
						searchType: 'combo',
						opTyp: 'popUpGr'
					},
					callback: function (records, operation, success) {
						if (success) {
						}
					}
				});
				
				//refs.ctlVslCallId.setValue(vslCallId);
//				refs.refTxtGrPopFromDate.setValue('');
//				refs.refTxtGrPopToDate.setValue('');
			} else {
//				me.setDateInDays("refTxtGrPopFromDate");
//				me.setDateInDays("refTxtGrPopToDate", +me.PERIOD_DAY);
			}
		}
	},

	onJpvcChecked: function (chk, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grPopupList = me.getStore('grPopupList');
		var snCombo = me.getStore('snCombo');

		if (newValue) {
			refs.ctlVslCallIdFieldSet.setVisible(true);
			refs.refJpvcBtn.setText('Search for JPVC');
			refs.ctlSn.setVisible(true);
			refs.txtGr.setHidden(false);
			refs.ctlSnHide.setVisible(false);
			refs.txtGrHide.setHidden(true);
			refs.refFindBtn.setHidden(true);
			me.jpvcChk = true;
		} else {
			refs.ctlVslCallIdFieldSet.setVisible(false);
			refs.refJpvcBtn.setText('Search for NonJPVC');
			refs.ctlSn.setVisible(false);
			refs.txtGr.setHidden(true);
			refs.ctlSnHide.setVisible(true);
			refs.txtGrHide.setHidden(false);
			refs.refFindBtn.setHidden(false);
			me.jpvcChk = false;
		}
	},

	validateSearchDoc: function () {
		var me = this;
		var refs = me.getReferences();
		var dateCondition = me.checkFromToDate("refTxtGrPopFromDate", "refTxtGrPopToDate");

		if (dateCondition == null) {
			MessageUtil.error('fail_msg', "grpopup_date_mandatory_error_msg");
			return false;
		} else {
			return true;
		}
	},

	// Returns the popup result.
	getReturnMutiSelect: function () {
		var me = this;
		var grid = me.lookupReference('refGRPopupGrid');
		var selection = grid.getSelected().items; //grid.getSelection();
		var returnItem = {
			code: '',
			codeName: '',
			item: ''
		};

		if (selection == null) {
			return returnItem;
		}

		var resultStr = '';
		var grNoArr = new Array();
		var grDetailArr = new Array();
		var checkingString = '';
		var checkingArr = new Set();//Check multi Select same Vessel
		var checkingRhdlArr = new Set();//Check multi Select has Rhdl Cargo
		var toLocIdList = new Set();
		var toLocIdValue = '';

		var notPlannedDoc = '';
		for (var element of selection) {
			var checkString = element.data.vslCallId;
			var checkingRhdlString = element.data.rhdlMode
			checkingArr.add(checkString);
			checkingRhdlArr.add(checkingRhdlString);
			grNoArr.push(element.data.grNo);

			if (StringUtil.isNullorEmpty(element.get('actLocId'))
				&& StringUtil.isNullorEmpty(element.get('planLocId'))
				&& element.get('delvTpCd') === 'I') {

				notPlannedDoc = element.get('shipgNoteNo');
				break;

			} else if (!StringUtil.isNullorEmpty(element.get('actLocId'))) {
				toLocIdList.add(element.get('actLocId'));

			} else if (!StringUtil.isNullorEmpty(element.get('planLocId'))) {
				toLocIdList.add(element.get('planLocId'));
			}
		}

		if (notPlannedDoc) {
			MessageUtil.warning('warning_msg', 'portsafetyconfirmation_notplanloc_msg', notPlannedDoc);
		}

		toLocIdValue = Array.from(toLocIdList).sort().toString(); //String of all ToLocId
		selection.forEach((el) => {
			if (el.get('delvTpCd') === 'I') {
				el.set('toLocId', toLocIdValue);
			} else {
				el.set('toLocId', el.get('berthLoc')); //Direct cas -> Berth
			}

			if (el.get('rhdlMode') == 'R') {
				el.set('grQty', 0);
				el.set('grWgt', 0);
				el.set('grMsrmt', 0);
			}
		});

		if (checkingArr.size > 1) {
			MessageUtil.error('fail_msg', 'grpopup_blocking_multi_vessel');
			checkingArr.clear();
			return null;
		}
		if (checkingRhdlArr.size > 1) {
			MessageUtil.error('fail_msg', 'grpopup_blocking_multi_rhdl');
			checkingRhdlArr.clear();
			return null;
		}

		resultStr = grNoArr.toString();

		returnItem = {
			code: resultStr,
			codeName: resultStr,
			item: selection
		}

		return returnItem;
	},

	getReturnData: function () {
		var me = this;
		var grid = me.lookupReference('refGRPopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();

		var returnItem = {
			code: selection.data.gdsRecvNo,
			codeName: selection.data.shipgNoteNo,
			item: selection
		}

		return returnItem;
	},
	
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('grPopupList');
		var params = me.getSearchCondition();

//		if(params.gateInOut === 'O') {
//			store = me.getStore('grInGateList');
//			refs.refGRPopupGrid.setStore(store);
//		}

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
	},

	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();

		//var dateCondition = me.checkFromToDate("refTxtGrPopFromDate", "refTxtGrPopToDate");
		var gdsRecvNo = '';
		var vslCallId = '';
		var lorryNo = '';
		var shipgNoteNo = '';
		var searchType = '';

		if(me.getView().recvData){
			lorryNo = me.getView().recvData.lorryNo;
			//vslCallId = me.getView().recvData.vslCallId;
		}
		
		if(!StringUtil.isNullorEmpty(refs.ctlVslCallId.getValue())){
			vslCallId = refs.ctlVslCallId.getValue();
		}
		
		if(me.getView().recvData.gateInOut == 'O'){
			searchType = 'O';
		}else{
			searchType = 'I';
		}

		var params = {
			gdsRecvNo: gdsRecvNo,
			vslCallId: vslCallId,
			lorryNo: lorryNo,
			searchType: searchType,
			opType: me.opType,
			shipgNoteNo: shipgNoteNo,
			gateInOut: me.paramGateInOut
		}

		//params["arrvDtFm"] = dateCondition.fromDtString;
		//params["arrvDtTo"] = dateCondition.toDtString;

		return params;
	},

	doSearchingforJPVCHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var jpvc = me.paramVslCallId;

		me.opType = 'popUpGrJpvc';

		if (StringUtil.isNullorEmpty(jpvc)) {
			if (!me.doValidationOfTimePeriodHHT()) {
				return false;
			}
		}

		me.shipgNoteNo = refs.ctlSn.getValue();

		return true;
	},

	doSearchingforNonJPVCHHT: function () {
		var me = this;
		var refs = me.getReferences();
		if (!me.doValidationOfTimePeriodHHT()) {
			return false;
		}
		me.paramVslCallId = 'NonCallId';
		me.shipgNoteNo = refs.ctlSn.getValue();
		return true;
	},

	doValidationOfTimePeriodHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var fromDt = new Date(Ext.Date.parse(refs.refTxtGrPopFromDate.getValue(), 'd/m/Y'));
		var toDt = new Date(Ext.Date.parse(refs.refTxtGrPopToDate.getValue(), 'd/m/Y'));
		var flag = false;
		var changeTargetDt = new Date(Ext.Date.parse(refs.refTxtGrPopFromDate.getValue(), 'd/m/Y'));
		var tempDt = new Date(changeTargetDt.getFullYear(), (changeTargetDt.getMonth() + me.NumberOfMonths), changeTargetDt.getDate());

		if (fromDt < toDt && toDt < tempDt) {
			flag = true;
		} else {
			flag = false;
		}

		tempDt = null;
		return flag;

	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});