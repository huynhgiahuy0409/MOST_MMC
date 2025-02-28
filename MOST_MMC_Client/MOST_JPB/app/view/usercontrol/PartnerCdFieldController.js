Ext.define('MOST.view.usercontrol.PartnerCdFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.partnercdfield',
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onFieldFocusleave:function(){
		var me = this;
		var store = me.getStore('partnerCdPopupStore');
		var compareFieldName = "ptnrCode";
		var params = {};
		var returnItemFieldNames = {
			code : "ptnrCode",
			codeName : "ptnrName"
		};
		
		if(me.getView().params){
			params = me.getView().params;
		}

		if(params.ptnrCode){
			params["ptnrCode"] = params.ptnrCode;
		}else{
			params["ptnrCode"] = "SHA";
		}
		
		params["reqType"] = "CD";
		
		me.onValidationCode(store, params, compareFieldName, returnItemFieldNames);
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var fieldControl = me.lookupReference("ctlField");
		
		if(returnValue){
			fieldControl.setValue(returnValue.code);
		} else {
			fieldControl.setValue("");
		}
	}
});