Ext.define('MOST.view.usercontrol.MasterBLMultiFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
	
	],

	alias: 'controller.masterblmultifield',
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
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