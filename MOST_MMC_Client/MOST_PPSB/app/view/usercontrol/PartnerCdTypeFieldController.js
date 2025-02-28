Ext.define('MOST.view.usercontrol.PartnerCdTypeFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [

	],

	alias: 'controller.partnercdtypefield',

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onFieldFocusleave: function () {
		var me = this;
		var store = me.getStore('payerCdTypePopupModelStore');
		var compareFieldName = "ptnrName";
		var params = {};
		var returnItemFieldNames = {
			code: "ptyCd",
			codeName: "engPtyNm"
		};

		if (me.getView().params) {
			params = me.getView().params;
		}

		params["requestType"] = "CD";
		params["searchType"] = "ptnrType";

		params["isIgnorePtyDivCd"] = "Y";
		params["searchType"] = "ONE";

		me.onCustomValidationCode(store, params, compareFieldName, returnItemFieldNames);
	},


	// Custom Validation Code
	onCustomValidationCode: function (store, params, compareFieldName, returnItemFieldNames) {
		var me = this;
		var fieldControl = this.lookupReference("ctlField");
		var fieldValue = fieldControl.getValue();
		var controlName = me.getView().reference;
		var parent = me.getParent(me.getView());

		if (me.getView().parent) {
			parent = me.getView().parent;
		}

		var bizController = parent.getController();

		if (StringUtil.isNullorEmpty(fieldValue) ||
			me.getView().editableControl == false) {
			return;
		}

		fieldValue = fieldValue.toUpperCase();

		if (params) {
			params[compareFieldName] = fieldValue;
		}


		if(store) {
			store.load({
				params: params,
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0 && records[0].get("partnerCodeTypeList") != null && records[0].get("partnerCodeTypeList").length > 0) {
							var returnItem = {
								code: records[0].get("partnerCodeTypeList")[0][returnItemFieldNames.code],
								codeName: records[0].get("partnerCodeTypeList")[0][returnItemFieldNames.codeName],
								item: records[0].get("partnerCodeTypeList")[0]
							}
	
							if (bizController.afterSetCodePopupData) {
								bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem);
							}
	
							fieldControl.setValue(returnItem.code);
						} else {
							fieldControl.setValue("");
	
							if (bizController.afterSetCodePopupData) {
								bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null);
							}
						}
					}
				}
			});
		}

	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	afterSetCodePopupData: function (xtype, targetControl, returnValue, me, parent) {
		var fieldControl = me.lookupReference("ctlField");
		if (returnValue) {
			fieldControl.setValue(returnValue.code);
		} else {
			fieldControl.setValue("");
		}
	}
});