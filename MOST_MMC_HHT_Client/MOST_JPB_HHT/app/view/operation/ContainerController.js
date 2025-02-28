Ext.define('MOST.view.operation.ContainerController', {
	extend: 'MOST.view.foundation.BaseViewController',
	requires: [
	],
	alias: 'controller.container',
	VSLCALLID: "",
	IsRetrieve: false,
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var comboStore = me.getStore('containerGridList');
		var hatchNoStore = me.getStore('hatchNoStore');
		var equipmentStore = me.getStore('equipmentStore');
		var shiftStore = me.getStore('shiftStore');
		var theVessel = me.getViewModel().get('theVessel');
		me.VSLCALLID = theVessel.vslCallId;
		refs.refWorkDate.setValue(Ext.Date.format(MOST.config.Token.getWorkDate(), 'd/m/Y'));
		if (!me.IsRetrieve) {
			me.disabledButtons(true);
		}
		hatchNoStore.load({
			callback:function (records, operation, success) {
				if(success){
					hatchNoStore.setData(records);
					hatchNoStore.insert(0, [{ scdNm: 'All', scd: '' }]);
					hatchNoStore.commitChanges()
				}
			}
		})
		comboStore.load({
			params: {
				searchType: 'comboListTBL',
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						equipmentStore.setData(records[0].get('equipmentNoList'));
						equipmentStore.insert(0, [{ eqNm: 'All', eqNo: '' }]);
						me.setTimeWithShiftHHT();
						me.onSearch();
					}
				}
			}
		});
	},
    /**
	 * INITIALIZE END
	 * =============================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		me.IsRetrieve = true;
		me.disabledButtons(false);
		var store = me.getStore('containerGridList');
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
		var grid = me.lookupReference('refContainerGridList');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		//me.getViewModel().setData({ theContainerProcess: selection.data });
		me.getViewModel().set('theContainerProcess', selection.getData());
	},
	onUpdate: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refContainerGridList;
		var selecedRecord = grid.getSelection();
		var sltIndex = grid.store.indexOf(selecedRecord);
		if (sltIndex === -1) {
			MessageUtil.warning('warning_msg', 'container_updateRecordEmptyMsg');
			return false;
		}
		if (!me.onValidate()) {
			return false;
		}
		if (!me.validateWorkingTime()) {
			return false;
		}
		if (!me.validateTimeShift()) {
			return false;
		}
		if (!me.validDuplicated(true)) {
			MessageUtil.warning('warning_msg', "Duplicated work time on the same Hatch/Equipment.");
			return false;
		}
		MessageUtil.questionModern('confirm', 'infoupdate_msg', null,
			function (button) {
				if (button === 'ok') {
					//var sltedShift = shiftStore.findRecord('shftId', shiftId);
					var store = me.getStore('containerGridList');
					var detail = me.getViewModel().get('theContainerProcess');
					var endDt = refs.refEndTime.getValue();
					var stDt = refs.refStartTime.getValue();
					var workYmd = me.getViewModel().get('globalWorkDate')
					detail.vslCallId = me.VSLCALLID;
					detail.workYmd = workYmd;
					detail.stDt = stDt;
					detail.endDt = endDt;
					var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
					updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/container/list';
					updateParm.phantom = false
					updateParm.set('items', [detail]);
					updateParm.save({
						success: function () {
							MessageUtil.saveSuccess();
							me.onSearch();
							me.onClear();
						}
					});
				}
			});
	},
	onClear: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refContainerGridList;
		grid.setSelection(false);
		refs.refFormContrainerProcess.reset();
		me.getViewModel().set('theContainerProcess', null);
		me.gridSelected = false;
		refs.refCboShift.setValue(MOST.config.Token.getWorkShift());
		refs.refWorkDate.setValue(Ext.Date.format(MOST.config.Token.getWorkDate(), 'd/m/Y'));
		me.setTimeWithShiftHHT();
	},
	onAdd: function () {
		var me = this;
		if (!me.onValidate()) {
			return false;
		}
		if (!me.validateWorkingTime()) {
			return false;
		}
		if (!me.validateTimeShift()) {
			return false;
		}
		var refs = me.getReferences();
		var shiftId = me.getViewModel().get('globalWorkShift')
		var endDt = refs.refEndTime.getValue();
		var workYmd = me.getViewModel().get('globalWorkDate')
		var stDt = refs.refStartTime.getValue();
		var hatchNo = refs.refCboHack.getValue();
		var eqNo = refs.refCboEquip.getValue();
		var record = Ext.create('MOST.model.controller.ContainerProcessItem');
		var l20 = refs.reftxtL20.getValue();
		var l40 = refs.reftxtL40.getValue();
		var d20 = refs.reftxtD20.getValue();
		var d40 = refs.reftxtD40.getValue();
		record.data.stDt = stDt;
		record.data.endDt = endDt;
		record.data.workYmd = workYmd;
		record.data.shftId = shiftId;
		record.data.vslCallId = me.VSLCALLID;
		record.data.hatchNo = hatchNo;
		record.data.l20 = l20;
		record.data.l40 = l40;
		record.data.d20 = d20;
		record.data.d40 = d40;
		record.data.eqNo = eqNo;
		record.set('userId', MOST.config.Token.getUserId());
		if (!me.validDuplicated(false,record)) {
			MessageUtil.warning('warning_msg', "Duplicated work time on the same Hatch/Equipment.");
			return false;
		}
		MessageUtil.questionModern('confirm', 'infosave_msg', null,
			function (button) {
				if (button === 'ok') {
					if (record.data) {
						var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
						updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/container/list';
						updateParm.set('items', [record.data]);
						updateParm.phantom = true
						updateParm.save({
							success: function () {
								MessageUtil.saveSuccess();
								me.onSearch();
								me.onClear();
							}
						});
					}
				}
			});
	},
	onDelete: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refContainerGridList;
		var selecedRecord = grid.getSelection();
		var data = selecedRecord.data
		data.vslCallId = me.getViewModel().get('globalVesselCallId');
		var sltIndex = grid.store.indexOf(selecedRecord);
		if (sltIndex === -1) {
			MessageUtil.warning('warning_msg', 'container_deleteRecordEmptyMsg');
			return false;
		}
		MessageUtil.questionModern('confirm', 'infodelete_msg', null,
			function (button) {
				if (button === 'ok') {
					var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
					updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/container/list';
					updateParm.set('items', [data]);
					updateParm.phantom = false;
					updateParm.erase({
						success: function () {
							MessageUtil.saveSuccess();
							me.onClear();
							me.onSearch();
						},
						failure: function () {
							me.onSearch();
						}
					});
				}
			});
	},
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var startDt = '';
		var endDt = '';
		var searchType = "HHT_CTNR_PROC_TBL";
		var workYmd = me.getViewModel().get('globalWorkDate');
		var shftId = me.getViewModel().get('globalWorkShift');
		var params = {
			vslCallId: me.VSLCALLID,
			searchType: searchType,
			svcDtFm: startDt,
			svcDtTo: endDt,
			workYmd: workYmd,
			shftId: shftId
		};
		return params;
	},
	disabledButtons: function (disabled) {
		var me = this;
		var refs = me.getReferences();
		refs.refBtnAdd.setDisabled(disabled);
		refs.refBtnUpdate.setDisabled(disabled);
		refs.refBtnDelete.setDisabled(disabled);
		refs.refBtnClear.setDisabled(disabled);
	},
    /**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */


	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	onValidate: function () {
		var me = this;
		var refs = me.getReferences();
		var myFrom = refs.refFormContrainerProcess.validate();
		if (!myFrom) {
			Ext.Msg.alert('Validate', 'You are missing required field');
			return false;
		}
		return true;
	},
	// startTime and endTime is a range, timeValue1 is start time, timeValue2 is end time
	// timeValues could be empty. when timeValue is the same value of edge(start/end) of range, it is possible.
	isIncludeTime: function (startTime, endTime, timeValue1, timeValue2, checkBoth) {
		var result = false;
		var start;
		var end;
		var me = this;
		if (startTime == '' || endTime == '') {
			return false;
		}
		if (startTime != endTime) {
			if (timeValue1 != '') {
				start = me.validDate(startTime, timeValue1);
				end = me.validDate(timeValue1, endTime);

				if (start && end) {
					result = true;
				}
			}

			if (timeValue2 != '') {
				start = me.validDate(startTime, timeValue2);
				end = me.validDate(timeValue2, endTime);

				if (start && end) {
					result = true;
				}
			}
		} else {
			if (timeValue1 == timeValue2 && startTime == timeValue1) result = true;
		}
		return result;
	},
	validateWorkingTime: function () {
		var me = this;
		var refs = me.getReferences();
		var success = true;
		if (!me.validDate(refs.refStartTime.getValue(), refs.refEndTime.getValue())) {
			success = false;
			MessageUtil.warning('warning_msg', 'container_validStartEndTime');
		}
		return success;
	},
	validDate: function (startDate, endDate) {
		var success = true;
		var stShftDTime = Ext.Date.parse(startDate, 'd/m/Y H:i');
		var endShftDTime = Ext.Date.parse(endDate, 'd/m/Y H:i');
		if (stShftDTime > endShftDTime) {
			success = false;
		}
		return success;
	},
	validateTimeShift: function () {
		var me = this;
		var refs = me.getReferences();
		var sltedShift = me.getViewModel().get('globalWorkShiftInfo')
		var strShftDt = me.getViewModel().get('globalWorkDate')
		var stShftDTime = null;
		var endShftDTime = null;
		var strFromDt = strShftDt + ' ' + sltedShift.fmHhMm.substr(0, 2) + ':' + sltedShift.fmHhMm.substr(2, 4);
		var strToDt = strShftDt + ' ' + sltedShift.toHhMm.substr(0, 2) + ':' + sltedShift.toHhMm.substr(2, 4);
		stShftDTime = Ext.Date.parse(strFromDt, 'd/m/Y H:i');
		endShftDTime = Ext.Date.parse(strToDt, 'd/m/Y H:i');
		if (sltedShift.shftId === 'SF0013') {
			endShftDTime = new Date(endShftDTime.getTime() + (24 * 60 * 60 * 1000));
		}
		var inputStDTime = Ext.Date.parse(refs.refStartTime.getValue(), 'd/m/Y H:i');
		var inputEndDTime = Ext.Date.parse(refs.refEndTime.getValue(), 'd/m/Y H:i');
		if (inputStDTime < stShftDTime || inputEndDTime > endShftDTime) {
			MessageUtil.warning('warning_msg', 'containerTimeShift');
			return false;
		}
		if (inputStDTime >= inputEndDTime) {
			MessageUtil.warning('warning_msg', 'containerTime');
			return false;
		}
		return true;
	},
	validDuplicated: function (isUpdate) {
		var me = this;
		var refs = me.getReferences();
		var detail = me.getViewModel().get('theContainerProcess');
		var valid = true;
		if (detail === null) return valid;
		var shiftId = me.getViewModel().get('globalWorkShift');
		var endDt = refs.refEndTime.getValue();
		var workYmd = me.getViewModel().get('globalWorkDate');
		var stDt = refs.refStartTime.getValue();
		detail.stDt = stDt;
		detail.endDt = endDt;
		detail.workYmd = workYmd;
		detail.shftId = shiftId;
		//me.onSearch();
		var store = me.getStore('containerGridList');
		store.each(function (record, index) {
			if (isUpdate && detail.seq === record.get('seq')) {
			}
			else {
				if (detail.workYmd == record.data.workYmd &&
					detail.shftId == record.data.shftId &&
					detail.hatchNo == record.data.hatchNo &&
					detail.eqNo == record.data.eqNo) {
					if (me.isIncludeTime(record.data.stDt, record.data.endDt, detail.stDt, detail.endDt)) {
						valid = false;
						return valid;
					}
					if (me.isIncludeTime(detail.stDt, detail.endDt, record.data.stDt, record.data.endDt)) {
						valid = false;
						return valid;
					}
				}
			}
		});
		return valid;
	},
	setTimeWithShiftHHT: function(){
		var me = this;
		var refs = me.getReferences();

		var shift = me.getViewModel().get('globalWorkShiftInfo')
		var strWKDate = me.getViewModel().get('globalWorkDate')
		var strStartDt = strWKDate + ' ' + shift.fmHhMm.substr(0, 2) + ':' + shift.fmHhMm.substr(2, 4);
		var strEndDt = strWKDate + ' ' + shift.toHhMm.substr(0, 2) + ':' + shift.toHhMm.substr(2, 4);

		if(shift.shftId === 'SF0013'){
			var temp = Ext.Date.parse(strEndDt, 'd/m/Y H:i');
			var endShftDTime = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
			strEndDt = Ext.Date.format(endShftDTime, 'd/m/Y H:i');
		}
        refs.refStartTime.setValue(strStartDt);
		refs.refEndTime.setValue(strEndDt);
	},
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD END
	 */
});