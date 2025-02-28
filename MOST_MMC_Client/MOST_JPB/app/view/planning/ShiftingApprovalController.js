Ext.define('MOST.view.planning.ShiftingApprovalController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.shiftingapproval',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	alertYN: 'N',
	MAX_PERIOD_DAY: 60,
	REPORT_TYPE_PDF: 'PDF',
	REPORT_TYPE_EXCEL: 'EXCEL',
	SHIFT_REQUEST_LIST_REPORT_FUNCTION: 'MOST.planningReport.getShiftRequestListReportItems',
	SHIFT_REQUEST_LIST_REPORT: 'ShiftingApprovalListReport.jrxml',
	VSL_SHIFTING_NOTICE_REPORT: 'VesselShiftingNoticeReport.jrxml',
	VSL_SHIFTING_NOTICE_REPORT_FUNCTION: 'MOST.planningReport.getVesselShiftingNoticeItem',
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
		var comboStore = me.getStore('comboStore');
		var positionStore = me.getStore('positionStore');
		var reasonStore = me.getStore('reasonStore');
		var ATBStore = me.getStore('ATBCombo');

		me.setDateInDays('ctlDateFromDt', -me.MAX_PERIOD_DAY);

		ATBStore.load();
		var cur = ATBStore.findRecord('scd', 'ATB');
		refs.comboATB.setValue('ATB');
		comboStore.load({
			param: null,
			callback: function (records, eOp, success) {
				if (success) {
					positionStore.setData(records[0].data.postionList);
					reasonStore.setData(records[0].data.reasonList);
				}
			}
		});
		var recvData = me.getView().recvData;
		if (recvData != null) {
			refs.ctlDateFromDt.setValue('');
			refs.ctlDateToDt.setValue('');
			me.alertYN = 'Y';
			me.onSearch();
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
	// Search Event Handler
	onSearchBtn: function () {
		var me = this;
		me.alertYN = 'N';
		me.onSearch();
	},

	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('shiftingAprrovalStore');
		var params = me.getSearchCondition();

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

	onCellClick: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refShiftingApprovalGrid');
		var store = me.getStore('shiftingAprrovalStore');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;

		refs.txtVslCallId.setValue(selection.data.vslCallId);
		refs.txtATB.setValue(selection.data.atbDt);
		refs.txtSa.setValue(selection.data.sa);
		refs.txtFromLoc.setValue(selection.data.prevBerthNm);
		refs.txtToLoc.setValue(selection.data.nxBerthNm);
		refs.ctlPositionCombo.setValue(selection.data.berthAlongSide);
		refs.ctrlSftDTNo.setValue(selection.data.reqDt);
		refs.ctlReasonCombo.setValue(selection.data.rsnCd);
		refs.txtRmk.setValue(selection.data.rmk);

		if (selection.data.statCd === '') {
			refs.txtRmk.setDisabled(false);
			refs.ctlReasonCombo.setDisabled(false);
			refs.ctlPositionCombo.setDisabled(false);
			refs.btnApproval.setDisabled(false);
		} else {
			if (store.getModifiedRecords().length > 0) {

				store.each(function (item) {
					if (item.data.vslCallId === selection.data.vslCallId && item.data.seq === selection.data.seq) {
						if (item.data.statCd === null) {
							if (item.data.berthAlongSideNm !== selection.data.berthAlongSide ||
								item.data.rmk !== selection.data.rmk ||
								item.data.rsnCd !== selection.data.rsnCd) {

								refs.txtRmk.setDisabled(false);
								refs.ctlReasonCombo.setDisabled(false);
								refs.ctlPositionCombo.setDisabled(false);
								refs.btnApproval.setDisabled(false);
							} else {
								refs.txtRmk.setDisabled(true);
								refs.ctlReasonCombo.setDisabled(true);
								refs.ctlPositionCombo.setDisabled(true);
								refs.btnApproval.setDisabled(true);
							}
						} else {
							refs.txtRmk.setDisabled(true);
							refs.ctlReasonCombo.setDisabled(true);
							refs.ctlPositionCombo.setDisabled(true);
							refs.btnApproval.setDisabled(true);
						}

					}
				});

			} else if (store.getModifiedRecords().length == 0) {
				refs.txtRmk.setDisabled(true);
				refs.ctlReasonCombo.setDisabled(true);
				refs.ctlPositionCombo.setDisabled(true);
				refs.btnApproval.setDisabled(true);
			}

		}

		var userType = MOST.config.Token.getUserType();
		if (userType == 'E') {
			refs.btnApproval.setDisabled(true);
		}
	},
	// Grid Row Remove
	onRemove: function () {
		var me = this;

	},

	onApproval: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refShiftingApprovalGrid');
		var positionStore = me.getStore('positionStore');
		var reasonStore = me.getStore('reasonStore');
		var selection = grid.getSelectionModel().getSelection()[0];

		var position = refs.ctlPositionCombo.getValue();
		var reason = refs.ctlReasonCombo.getValue();
		var rmk = refs.txtRmk.getValue();
		var positionItem = positionStore.findRecord('scd', position)
		if (position != null && positionItem)
			var positionNm = positionItem.data.scdNm;
		else {
			var positionNm = '';
		}


		var currentDate = new Date();
		var dateValue = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes());
		var dateString = dateValue == null ? null : Ext.Date.format(dateValue, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var userId = MOST.config.Token.getUserId();
		selection.set('berthAlongSideNm', positionNm);
		selection.set('berthAlongSide', position);
		selection.set('rsnCd', reason);
		selection.set('rmk', rmk);

		selection.set('apprvDt', dateString);
		selection.set('apprvBy', userId);

		me.onSave();
	},

	onSave: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refShiftingApprovalGrid');
		var masterItem = Ext.create('MOST.model.planning.ShiftingApproval');
		var store = me.getStore('shiftingAprrovalStore');
		masterItem.set('userId', MOST.config.Token.getUserId());
		var arrShiftRq = new Array();
		store.getModifiedRecords().forEach(function (record, index, array) {
			record.set('statCd', 'AP');
			record.set('userId', MOST.config.Token.getUserId());
			record.set('workingStatus', WorkingStatus.UPDATE);
			arrShiftRq.push(record.getData());
		});

		if (masterItem.dirty) {
			masterItem.set('shiftReqList', arrShiftRq);

			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shiftingapproval/list';
			updateParm.set('workingStatus', WorkingStatus.UPDATE);
			updateParm.phantom = false;
			updateParm.set('items', new Array());
			updateParm.get('items').push(masterItem.data);

			updateParm.save({
				success: function (records) {
					MessageUtil.infoToast('success_msg', 'savesuccess_msg');
					refs.ctrlSftDTNo.setValue('');
					refs.txtVslCallId.setValue('');
					refs.txtATB.setValue('');
					refs.txtSa.setValue('');
					refs.txtFromLoc.setValue('');
					refs.txtToLoc.setValue('');

					refs.txtRmk.setValue('');
					refs.txtRmk.setDisabled(true);

					refs.ctlReasonCombo.setValue('');
					refs.ctlReasonCombo.setDisabled(true);

					refs.ctlPositionCombo.setValue('');
					refs.ctlPositionCombo.setDisabled(true);

					refs.btnApproval.setDisabled(true);

					me.onSearch();
				}
			});
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
	deleteProcess: function (deleteItems, selections) {
		var me = this;

	},

	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if (control == refs.ctlDateFromDt) {
			me.setDateInDaysByDate('ctlDateToDt', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate('ctlDateFromDt', -me.MAX_PERIOD_DAY, control.getValue());
		}
	},

	// Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.refVslCallIdfield.getValue();
		var scn = refs.ctlScn.getValue();
		var comboATB = refs.comboATB.getValue();
		if (me.alertYN == 'N') {
			var dateCondition = me.checkFromToDate('ctlDateFromDt', 'ctlDateToDt');
			if (dateCondition == null) {
				return null;
			}
		}

		if (comboATB == null) {
			comboATB = 'ATB';
		}
		var params = {
			vslCallId: vslCallId,
			scn: scn,
			dtType: comboATB,
			alertYn: me.alertYN
		};

		if (dateCondition != null) {
			params['fromDt'] = dateCondition.fromDtString;
			params['toDt'] = dateCondition.toDtString;
		}

		return params;
	},

	onDownload: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refShiftingApprovalGrid');
		var params = {
			initSearch: true
		};
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) {
			MessageUtil.warning("warning_msg", "noRecordSelectedMsg");
			return;
		};
		me.openCodePopup('popup-exporttypepopup', 'refBtnDownload', params);
	},

	onDownloadExport: function (button, e, options) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refShiftingApprovalGrid');
		var reportType = null;
		if(refs.refRadioReportType) {
			reportType = refs.refRadioReportType.getValue().rb;
		} 
		if(options.reportType) {
			reportType = options.reportType;
		}
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) {
			MessageUtil.warning("warning_msg", "noRecordSelectedMsg");
			return;
		};

		var params = me.setSrchStrReport(selection);
		params['serviceId'] = me.VSL_SHIFTING_NOTICE_REPORT_FUNCTION; 
		params['file'] = me.VSL_SHIFTING_NOTICE_REPORT;
		if(reportType == me.REPORT_TYPE_PDF) {
			me.openPDFPreview(params);
		} else if( reportType == me.REPORT_TYPE_EXCEL) {
			me.downloadExcel(params);
		};
	},

	onDownloadCancel: function (ownWin) {
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);

		win.close();

	},

	onPreviewPDF: function () {
		var me = this;
		var refs = me.getReferences();
		var previewPDF = me.getStore('generatePDFShftApprv');
		var grid = me.lookupReference('refShiftingApprovalGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		var params = me.setSrchStrReport(selection);

		previewPDF.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					me.openPDFPreview(records, operation, success);
				}
			}
		});

	},

	setSrchStrReport: function (selection) {
		var me = this;
		var refs = me.getReferences();
		var params = null;

		var vslCallId = selection.data.vslCallId;
		var seq = selection.data.seq;
		var userId = MOST.config.Token.getUserId();

		params = {
			param1: vslCallId,
			param2: seq,
			param3: userId, 
			branchCode: MOST.config.Token.getBranchCode()
		}
		return params;
	},

	exportToDocument: function(button, e, options) {
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var reportParams = {};
		var reportType = options.reportType;
		reportParams['file'] = me.SHIFT_REQUEST_LIST_REPORT;
		reportParams['serviceId'] = me.SHIFT_REQUEST_LIST_REPORT_FUNCTION;
		reportParams['branchCode'] = MOST.config.Token.getBranchCode();
		reportParams['param1'] = params.vslCallId;
		reportParams['param2'] = params.dtType;
		reportParams['param3'] = params.fromDt;
		reportParams['param4'] = params.toDt;
		reportParams['param5'] = Token.getUserId();
		reportParams['param6'] = params.alertYn;
		if(reportType) {
			if(reportType == me.REPORT_TYPE_PDF) {
				me.openPDFPreview(reportParams);
			} else if(reportType == me.REPORT_TYPE_EXCEL) {
				me.downloadExcel(reportParams);
			}
		}
	},
	
	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();

		var authority = '';
		var ptnrCd = '';

		if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.refVslCallIdfield.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					
				}else {
					refs.refVslCallIdfield.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		} else if(targetControl === 'refVslCallIdfield'){ 
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				refs.refVslCallIdfield.setValue(returnValue.item.get('vslCallId'));
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			} else {
				refs.refVslCallIdfield.setValue('');
				refs.ctlScn.setValue('');
				me.getViewModel().setData({theVslInfo:null});
			} 
		}
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});