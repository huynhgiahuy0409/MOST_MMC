Ext.define('MOST.view.planning.StaffAttendanceController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [

	],

	alias: 'controller.staffattendance',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY: 31,
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
		var costCenterStore = me.getStore('costCenterCombo');
		var staffAttendanceStore = me.getStore('staffAttendanceStore');
		var shiftCombo = me.getStore('shiftCombo');

		me.setDateInDays("refdtFrom", -30);
		me.setDateInDays("refdtTo");
		me.setDateInDays("refLeaveStaffdtFrom", -30);
		me.setDateInDays("refLeaveStaffdtTo");

		var maYnCombo = me.getStore('maYnStore');
		var eaYnCombo = me.getStore('eaYnStore');
		var berthUnberthingYnCombo = me.getStore('berthUnberthingYnStore');
		var incentiveYnCombo = me.getStore('incentiveYnStore');
		maYnCombo.load();
		eaYnCombo.load();
		berthUnberthingYnCombo.load();
		incentiveYnCombo.load();
		shiftCombo.load();

		staffAttendanceStore.load({
			params: {
				searchTp: 'combo'
			},
			callback: function (records, eOp, success) {

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
	// Search Event Handler
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var staffAttendanceStore = me.getStore('staffAttendanceStore');
		var girdStore = me.getStore('staffAttendanceGrid');
		var rdCheck = refs.ctlRadioStaff.getValue().staff_radio;

		if (rdCheck === 'DATE') {
			if (refs.ctrDate.getValue() === null) {
				MessageUtil.info('info_msg', 'saDateNoneMssg');
				return;
			}
		} else if (rdCheck === 'STAFF') {
			if (StringUtil.isNullorEmpty(refs.refStaffNo.getValue())) {
				MessageUtil.info('info_msg', 'saStaffNoneMssg');
				return;
			}
		}
		
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}

		staffAttendanceStore.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
	},
	onChangeSelect: function (combo, record, eOpts) {
		var me = this;
		var refs = me.getReferences();
		refs.refCostCenterCd.setValue(record.data.codeCostCenter);
	},

	onEditImport: function (editor, context) {
		var me = this,
			proxy = context.store.getProxy(),
			leaveType = context.newValues.leaveTp;

		context.record.set('leaveTp', leaveType);
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/staffattendance/leaveType';

		me.gridEdit(editor, context, true, function () {
			me.onSearch(false);
		});
	},

	onRowClick: function () {
		var me = this;
		var grid = me.lookupReference('refStaffAttendanceGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null)
			return;

		if (StringUtil.isNullorEmpty(selection.get('normalShiftId'))) {
			me.openDetailPopup(selection, 'Staff Attendance Detail');
		}
	},

	onRowDbClick: function () {
		var me = this;
		var grid = me.lookupReference('refStaffAttendanceGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null)
			return;

		if (!StringUtil.isNullorEmpty(selection.get('normalShiftId'))) {
			me.loadMenuView('app-staffattendancepershift', selection);
		}
	},
	
	onSelect: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refStaffAttendanceGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null)
			return;
		refs.refStaffName.setValue(selection.data.staffNm);
		refs.refStaffNo.setValue(selection.data.hiddenEmpId);
	}, 

	onReset: function () {
		var me = this;
		var refs = me.getReferences();

		refs.refStaffName.setValue('');
		refs.cboShift.setValue('');
		refs.ctrDate.setValue('');
		refs.cboCostCenter.setValue('');
		refs.refCostCenterCd.setValue('');
		refs.refStaffNo.setValue('');

		me.setDateInDays('refdtFrom');
		me.setDateInDays('refLeaveStaffdtFrom');
	},

	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var addRef = control.reference.indexOf('LeaveStaff') == -1 ? '' : 'LeaveStaff';
		var refdtFrom = ''.concat('ref', addRef, 'dtFrom');
		var refdtTo = ''.concat('ref', addRef, 'dtTo');

		var fromDate = refs[refdtFrom].getValue();
		var toDate = refs[refdtTo].getValue();

		if (fromDate && toDate) {
			var Difference_In_Time = toDate.getTime() - fromDate.getTime();
			var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

			if (0 < Difference_In_Days && Difference_In_Days <= 31) return;

			if (Difference_In_Days > 31 && control == refs.refdtTo) {
				me.setDateInDaysByDate(refdtTo, me.MAX_PERIOD_DAY, fromDate);
				return;
			}
		}

		if (control == refs[refdtFrom]) {
			me.setDateInDaysByDate(refdtTo, me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate(refdtFrom, -me.MAX_PERIOD_DAY, control.getValue());
		}
	},

	onSave: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refStaffAttendanceGrid');
		var masterItem = Ext.create('MOST.model.planning.StaffAttendance');
		var store = me.getStore('staffAttendanceGrid');
		masterItem.set('userId', MOST.config.Token.getUserId());
		var arrStaffAttendance = new Array();
		store.getModifiedRecords().forEach(function (record, index, array) {
			record.set('userId', MOST.config.Token.getUserId());
			arrStaffAttendance.push(record.getData());
		});
		masterItem.phantom = false;
		//		me.setArrayShiftRequest(masterItem);

		if (masterItem.dirty) {
			var proxy = masterItem.getProxy();
			proxy.type = 'rest';
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/staffattendance/list';

			masterItem.set('staffAttendanceList', arrStaffAttendance);
			masterItem.save({
				success: function (records) {
					MessageUtil.saveSuccess();
					me.onSearch();
				}
			});
		}

	},

	onLoadPopupPerShift: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var costCenterStore = me.getStore('costCenterCombo');
		var itemStore = me.getStore('staffAttendancePerShiftList');
		var girdDetailStore = me.getStore('staffAttendancePerShiftGrid');
		var shiftStore = me.getStore('shiftCombo');

		me.setDateInDays("refdtFrom", -7);
		me.setDateInDays("refdtTo");

		var recvData = detailView.items.get(0).recvData;
		refs.refStaffNo.setValue(recvData.data.hiddenEmpId);
		refs.ctrDate.setValue(recvData.data.dspWorkYmd);
		refs.cboCostCenter.setValue(recvData.data.costCentCd);
		refs.refStaffName.setValue(recvData.data.staffNm);
		refs.refCostCenterCd.setValue(recvData.data.costCentCd);
		itemStore.load({
			params: {
				searchTp: 'StaffAttendanceVoucher',
				searchConditionTp: 'DATE',
				workYmd: recvData.data.dspWorkYmd,
				staffNo: recvData.data.hiddenEmpId,
				costCentCd: recvData.data.costCentCd,
				staffNm: recvData.data.staffNm
			},
			callback: function (records, eOpt, success) {
				if (success) {
					girdDetailStore.setData(records[0].data.staffAttendanceList);
					girdDetailStore.commitChanges();
				}
			}
		});
	},

	onSearchPerShift: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var itemStore = me.getStore('staffAttendancePerShiftList');
		var girdDetailStore = me.getStore('staffAttendancePerShiftGrid');
		var params = me.getSearchCondition();

		girdDetailStore.removeAll();
		itemStore.load({
			params: params,
			callback: function (records, eOpt, success) {
				if (success) {
					girdDetailStore.setData(records[0].data.staffAttendanceList);
					girdDetailStore.commitChanges();
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

	deleteProcess: function (deleteItems, selections) {
		var me = this;
	},

	// Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var rdCheck = refs.ctlRadioStaff.getValue().staff_radio;
		var shift = refs.cboShift.getValue();
		var dateWork = refs.ctrDate.getValue();
		var costCenter = refs.cboCostCenter.getValue();
		var staffCd = refs.refStaffNo.getValue();
		var dateWorkString = dateWork == null ? null : Ext.Date.format(dateWork, MOST.config.Locale.getShortDate());
		var dateCondition;

		if (rdCheck != 'LEAVESTAFF') {
			dateCondition = me.checkFromToDate('refdtFrom', 'refdtTo');
		} else if (rdCheck == 'LEAVESTAFF') {
			dateCondition = me.checkFromToDate('refLeaveStaffdtFrom', 'refLeaveStaffdtTo');
		}

		if (dateCondition == null) {
			return null;
		}

		var params = {
			searchTp: 'StaffAttendanceVoucher',
			searchConditionTp: rdCheck,
			workYmd: dateWorkString,
			shiftId: shift,
			staffNo: staffCd,
			costCentCd: costCenter

		};

		if (dateCondition != null) {
			params['fmStaffDt'] = dateCondition.fromDtString;
			params['toStaffDt'] = dateCondition.toDtString;
		}

		return params;
	},

	onDownloadPDF: function () {
		var me = this;
		var refs = me.getReferences();

		var grid = me.lookupReference('refStaffAttendanceGrid');

		var params = me.setSrchStrReport();
		params.previewType = 'DOWNLOAD';
		if (params.workYmd === null) {
			MessageUtil.info('info_msg', 'saDateNoneMssgRpt');
			return;
		}
		if (params.shiftId === null) {
			MessageUtil.info('info_msg', 'saShiftNoneMssgRpt');
			return;
		}
		me.getView().detailViewAlias = 'app-staffattendancegeneratepdf';
		me.openDetailPopup(params, 'Download');
	},

	onPreviewPDF: function () {
		var me = this;
		var refs = me.getReferences();

		var grid = me.lookupReference('refStaffAttendanceGrid');

		var params = me.setSrchStrReport();
		params.previewType = 'PREVIEW';
		if (params.workYmd === null) {
			MessageUtil.info('info_msg', 'saDateNoneMssgRpt');
			return;
		}
		if (params.shiftId === null) {
			MessageUtil.info('info_msg', 'saShiftNoneMssgRpt');
			return;
		}

		me.getView().detailViewAlias = 'app-staffattendancegeneratepdf';
		me.openDetailPopup(params, 'Download');

	},

	setSrchStrReport: function (selection) {
		var me = this;
		var refs = me.getReferences();
		var params = null;
		var shift = refs.cboShift.getValue();
		var dateWork = refs.ctrDate.getValue();
		var dateWorkString = dateWork == null ? null : Ext.Date.format(dateWork, MOST.config.Locale.getShortDate());
		var costCenter = refs.cboCostCenter.getValue();
		var userId = MOST.config.Token.getUserId();

		params = {
			workYmd: dateWorkString,
			userId: userId,
			costCentCd: costCenter,
			shiftId: shift,
			reportId: '',
			searchTp: '',
			previewType: '',
		}
		return params
	},

	onRefreshStaffNo: function () {
		var me = this;
		var refs = me.getReferences();
		refs.refStaffNo.setValue('');
		refs.refStaffName.setValue('');
	},

	onDetailLoad: function () {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		me.getViewModel().set('theDetail', recvData);
	},

	onDetailUpdate: function () {
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		var proxy = theDetail.getProxy();
		var ma = refs.ctlMa.getValue() ? 'Y' : 'N';
		var ea = refs.ctlEA.getValue() ? 'Y' : 'N';
		var incentive = refs.ctlIncentive.getValue() ? 'Y' : 'N';
		var berthing = refs.ctlBerthing.getValue() ? 'Y' : 'N';

		theDetail.set('ma', ma);
		theDetail.set('ea', ea);
		theDetail.set('incentive', incentive);
		theDetail.set('berthUnberthing', berthing);

		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/staffattendance/leaveType';

		theDetail.save({
			success: function () {
				me.onDetailClose();
				MessageUtil.infoToast('info_msg', 'savesuccess_msg');
			}
		});
	},

	onDetailClose: function () {
		var me = this;
		var detailView = me.getDetailBizView();
		detailView.close();
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});