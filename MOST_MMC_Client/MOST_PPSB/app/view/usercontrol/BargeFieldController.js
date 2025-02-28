Ext.define('MOST.view.usercontrol.BargeFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.bargefield',
	
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
		
		var store = me.getStore('assignmentBargeListPopup');
		var fieldControl = me.lookupReference("ctlField");
		var compareFieldName = "bargeNo";
		var params = {};
		var returnItemFieldNames = {
			code : "bargeNo",
			codeName : "bargeNo"
		};
		
		if(me.getView().params){
			params = me.getView().params;
		}
		
		params['vslCallId'] = me.getView().getVslCallId();
		params['searchType'] = me.getView().getSearchType();
		
		me.onValidationCode(store, params, compareFieldName, returnItemFieldNames);
	},
	
	openCodePopup:function(){
		var me = this;
		var popupAlias = null;
		var fieldControl = me.lookupReference("ctlField");
		
		if(me.getView().params == null){
			me.getView().params = {};
		}
		
		me.getView().params['vslCallId'] = me.getView().getVslCallId();
		me.getView().params['bargeNo'] = me.getView().getBargeNo();
		me.getView().params['searchType'] = me.getView().getSearchType();
		
		me.getView().params.title = 'Assignment Barge List';
		popupAlias = "popup-assignmentbargepopup";
		
		if(popupAlias){
			var parent = me.getParent(me.getView());
			
			if(me.getView().parent){
				parent = me.getView().parent;
			}
			
			ViewUtil.openCodePopup(parent.getController(), popupAlias, me.getView().reference, me.getView().params, me.afterSetCodePopupData, me);
		}
		
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