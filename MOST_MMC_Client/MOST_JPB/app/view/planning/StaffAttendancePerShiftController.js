Ext.define('MOST.view.planning.StaffAttendancePerShiftController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.staffattendancepershift',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY: 30,
	recvItem: null,
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
		costCenterStore.load();
		costCenterStore.commitChanges();

		var shiftStore = me.getStore('shiftCombo');
		shiftStore.load();
		shiftStore.commitChanges();

		me.setDateInDays("refdtFrom", -7);

		//Receivng from other screens like: staff attendance
		me.recvItem = me.getView().recvData;
		if (me.recvItem) {
			me.inInitialByRecvItem(me.recvItem);
		}
	},

	inInitialByRecvItem: function (recvItem) {
		var me = this;
		var refs = me.getReferences();

		refs.rdDate.setValue(true);
		refs.ctrDate.setValue(recvItem.get('dspWorkYmd'));
		refs.cboShift.setValue(recvItem.get('normalShiftId'));
		refs.refStaffNo.setValue(recvItem.get('hiddenEmpId'));
		refs.refStaffName.setValue(recvItem.get('staffNm'));

		me.onBtnSearchClick();
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
	onBtnSearchClick: function () {
		var me = this;
		var refs = me.getReferences();
		var staffAttendancePerShiftStore = me.getStore('staffAttendancePerShiftStore');

		var params = me.getSearchCondition();
		if (params == null) {
			return;
		}

		staffAttendancePerShiftStore.load({
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

	onDblClickOnPerShift: function () {
		var me = this;
		var refs = me.getReferences();

		var grid = refs.refStaffAttendancePerShiftGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) {
			return;
		};

		selection.set('shftId', selection.get('shiftId'));
		selection.set('shftNm', selection.get('shiftNm'));
		selection.set('workYmd', selection.get('dspWorkYmd'));

		me.loadMenuView('app-staffanddeployment', selection);

		/*
		if (selection.get('vslCallId') === 'NonCallId' || selection.get('vslCallId') === 'NonJPVC') {
			me.loadMenuView('app-staffandequipmentdeploymentnonjpvc', selection);
		}
		else {
			me.loadMenuView('app-staffanddeployment', selection);
		}
		*/
	},

	// Date Change Event
	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		var fromDate = refs.refdtFrom.getValue();
		var toDate = refs.refdtTo.getValue();

		if (fromDate && toDate) {
			var diffInDays = toDate.getTime() - fromDate.getTime() / (1000 * 60 * 60 *24);

			if (0 <= diffInDays && diffInDays <= 31) return;

			if (diffInDays > 31 && control == refs.refdtTo) {
				me.setDateInDaysByDate('refdtTo', me.MAX_PERIOD_DAY, fromDate);
				return;
			}
		}

		if (control == refs.refdtFrom) {
			me.setDateInDaysByDate('refdtTo', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate('refdtFrom', -me.MAX_PERIOD_DAY, control.getValue());
		}
	},

	//JPVC Radio event
	onChecked: function () {
		var me = this;
		var refs = me.getReferences();
		var radioChk = refs.ctlRadioStaffPerShift.getValue().staff_radio_pershift;

		if (radioChk === "DATE") {
			refs.refStaffNo.setValue();
			refs.refStaffName.setValue();
		} else {
			refs.ctrDate.setValue();
			refs.cboShift.setValue();
			refs.cboCostCenter.setValue();
			refs.refCostCenterCd.setValue();
		}
	},

	onReset: function () {
		var me = this;
		var refs = me.getReferences();

		refs.rdDate.setValue(true);
		refs.refStaffNo.setValue();
		refs.refStaffName.setValue();
		refs.ctrDate.setValue();
		refs.cboShift.setValue();
		refs.cboCostCenter.setValue();
		refs.refCostCenterCd.setValue();
		
		me.setDateInDays("refdtFrom", -7);
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
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var rdCheck = refs.ctlRadioStaffPerShift.getValue().staff_radio_pershift;

		var shift = refs.cboShift.getValue();
		var dateWork = refs.ctrDate.getValue();
		var dateCondition = me.checkFromToDate('refdtFrom', 'refdtTo');
		var costCenter = refs.cboCostCenter.getValue();
		var staffCd = refs.refStaffNo.getValue();
		var staffNm = refs.refStaffName.getValue();
		var dateWorkString = dateWork == null ? null : Ext.Date.format(dateWork, MOST.config.Locale.getShortDate());
		if (dateCondition == null) {
			return null;
		}

		if (rdCheck == "DATE") {
			if (dateWork == null || StringUtil.isNullorEmpty(shift)) {
				MessageUtil.warning("warning_msg", "mandatoryField_msg", "[Date, Shift]");
				return null;
			}
		}
		else {
			if (StringUtil.isNullorEmpty(staffCd)) {
				MessageUtil.warning("warning_msg", "mandatoryField_msg", "[Staff No]");
				return null;
			}
		}

		var params = {
			searchTp: 'StaffAttendanceVoucher',
			searchConditionTp: rdCheck,
			workYmd: dateWorkString,
			shiftId: shift,
			staffNo: staffCd,
			staffNm: staffNm,
			costCentCd: costCenter

		};

		if (dateCondition != null) {
			params['fmStaffDt'] = dateCondition.fromDtString;
			params['toStaffDt'] = dateCondition.toDtString;
		}

		return params;
	},

	exportTo: function (btn) {
		var me = this;
		var refs = me.getReferences();

		var cfg = Ext.merge({
			title: 'Staff Attendance Per Shift',
			fileName: 'StaffAttendancePerShift' + '.' + (btn.cfg.ext || btn.cfg.type)
		}, btn.cfg);

		var grid = refs.refStaffAttendancePerShiftGrid;
		grid.saveDocumentAs(cfg);
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});