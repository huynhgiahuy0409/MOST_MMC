Ext.define('MOST.view.usercontrol.PortCodeFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.portcodefield',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPortGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'portPopup',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	PREV_VALUE: '',
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onFocus:function(clt, event, eOpts){
		var me = this;
		me.PREV_VALUE = clt.getValue();
	},
	
	onFieldFocusleave:function(clt, event, eOpts){
		var me = this;
		
		if(me.PREV_VALUE === clt.getValue()){
			return;
		}
		
		var store = me.getStore('portPopup');
		var compareFieldName = "portCode";
		var searchParams = {};
		var returnItemFieldNames = {
				code : "portCode",
				codeName : "portName"
			};
		
		if(me.getView().params){
			var params = me.getView().params;
			searchParams['portCode'] = params['searchCol1'];
		}
		
		searchParams['tyCd'] = 'CD';
		
		me.onValidationCode(store, searchParams, compareFieldName, returnItemFieldNames);
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var fieldControl = me.lookupReference("ctlField");
		var params = me.getView().params;
		if(returnValue){
			fieldControl.setValue(returnValue.item.get('portCode'));
		} else {
			fieldControl.setValue("");
		}
	}
});