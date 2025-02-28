Ext.define('MOST.view.usercontrol.PartnerCdForMultiFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
	
	],

	alias: 'controller.partnercdformultifield',
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	onFieldFocusleave:function(e){
		var me = this;
		var store = me.getStore('partnerCdForMultiList');
		var compareFieldName = "ptnrCode";
		var params = {};
		var returnItemFieldNames = {
				code : "ptnrCode",
				codeName : "ptnrName"
			};
		
		if(me.getView().params){
			params = me.getView().params;
		}
		
		params["ptnrCode"] = "SHA";
		params["reqType"] = "CD";
		
		var stringField = e.getValue();
		if(stringField.indexOf(",") <0)
			me.onValidationCode(store, params, compareFieldName, returnItemFieldNames);
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var fieldControl = me.lookupReference("ctlField");
		if(returnValue){
			fieldControl.setValue(returnValue.code);
		} else {
			fieldControl.setValue("");
		}
	}
});