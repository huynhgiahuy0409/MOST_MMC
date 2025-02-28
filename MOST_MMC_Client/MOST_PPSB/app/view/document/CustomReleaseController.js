Ext.define('MOST.view.controller.CustomReleaseController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.customrelease',

	MAX_PERIOD_DAY: 31,

	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = me.getViewModel().getStore('statusStore');
		statusGrid.load();

	},

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

	// Search Event Handler
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var statusGrid = me.getViewModel().getStore('statusStore'); 
		var store = me.getStore('customRelease'); 
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}
		statusGrid.load();
		var proxy = store.proxy;
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/customRelease/list';
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records.length <= 0) {
					}
				}
			}
		});
	},

	// Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		//var lorryNo = refs.ctlLorryNo.getValue();
		var blNo = refs.ctlBLCombo.getValue();
		//var snNo = refs.ctlSNCombo.getValue();
		var vslCallId = refs.ctlVslCallId.getValue();
		var scn = refs.ctlScn.getValue();
		var status = refs.ctlStatusCombo.getValue();
		var dateCondition = '';
		var snNo = refs.ctlSNCombo.getValue();

		if (((scn == null || scn == "") && (vslCallId == null || vslCallId == "")) &&
				(refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "") && (refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "")) {
			MessageUtil.warning('Warning', 'customsCargoReleaseControl_mandatory');
			return null;
		}

		if (refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null) {
			dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
			workStDt = dateCondition.fromDtString;
			workEndDt = dateCondition.toDtString;
		}

		//var searchType = 'VSRList';
		var params = {
			vslCallId: vslCallId,
			status: status,
			blNo: blNo,
			snNo: snNo,
			scn: scn
		};
		if (dateCondition != null) {
			params['startDate'] = dateCondition.fromDtString;
			params['endDate'] = dateCondition.toDtString;
		}

		return params;
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
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theJpvc:returnValue.item});
				}else {
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({theJpvc:null});
				}
			} 
		} else if (returnValue) {
			refs.ctlCbr.setValue('');
			me.getViewModel().setData({ theJpvc: returnValue.item });
			refs.ctlScn.setValue(returnValue.item.get('scn'));
			var blSnComboStore = me.getStore('blSnCombo');
			var params = {
				vslCallId: returnValue.item.get('vslCallId')
			};
			blSnComboStore.load({
				params: params,
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							me.setBlSnCombo(records[0]);
						}
					}
				}
			}) 
		}

	},

	// Combo Setting
	setBlSnCombo: function (masterItem) {
		var me = this;
		var refs = me.getReferences();

		var snCombo = me.getStore('snCombo');
		var blCombo = me.getStore('blCombo');


		snCombo.setData(masterItem.data.snList);
		snCombo.insert(0, [{ blNoNm: 'Select', blNo: '' }]);
		refs.ctlSNCombo.setValue('');

		blCombo.setData(masterItem.data.blList);
		blCombo.insert(0, [{ snNoNm: 'Select', cbr: '' }]);
		refs.ctlBLCombo.setValue('');


	},


	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();


		var toDate = refs.ctlToDt.getValue();
		var fromDate = refs.ctlFromDt.getValue();

		var Difference_In_Time = null;
		var Difference_In_Days = null;

		if (control == refs.ctlFromDt) {
			me.setDateInDaysByDate('ctlToDt', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			if (fromDate) {
				Difference_In_Time = control.getValue().getTime() - fromDate.getTime();
				Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
				if (Difference_In_Days > me.MAX_PERIOD_DAY) {
					me.setDateInDaysByDate('ctlFromDt', -me.MAX_PERIOD_DAY, control.getValue());
				} else if (Difference_In_Days < 0) {
					refs.ctlToDt.setValue(fromDate);
				}
			}
		}
	},
	//sMantis: 0178316
	onSNChange: function () {
		var me = this;
		var refs = me.getReferences();
		var params = {
			vslCallId: refs.ctlVslCallId.getValue()
		};
		var snnO = refs.ctlSNCombo.getValue();
		var bookingNos = me.getStore('snCombo').getData().items.filter(e => e.get("snNo") == snnO);
		refs.ctlCbr.setValue(bookingNos[0].get("mfDocId")); 
		refs.ctlBLCombo.setValue('');
	},

	onBLChange: function () {
		var me = this;
		var refs = me.getReferences();
		var params = {
			vslCallId: refs.ctlVslCallId.getValue()
		};
		var blNo = refs.ctlBLCombo.getValue();
		var masterBLNos = me.getStore('blCombo').getData().items.filter(e => e.get("blNo") == blNo);
		refs.ctlCbr.setValue(masterBLNos[0].get("mfDocId"));
		refs.ctlSNCombo.setValue('');
	},
	//eMantis: //sMantis: 0178316

	onEdit: function (editor, context) {
		var me = this,
			proxy = context.store.getProxy(),
			status = context.newValues.status,
			custDeclNo = context.newValues.custDeclNo,
			ediTransDate = Ext.Date.format(context.newValues.ediTransDate, 'd/m/Y');

			context.record.set('status', status);
			context.record.set('custDeclNo', custDeclNo);
			context.record.set('ediTransDate', ediTransDate);
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/customRelease/status';

		me.gridEdit(editor, context, true, function () {
			// me.onSearch(true); 
		});
	},

	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

});