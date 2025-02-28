Ext.define('MOST.view.usercontrol.GoodsReceiptFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.goodsreceiptfield',	

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
	},
	
	// Field Before Renderer
	onRenderField:function(){
		var me = this;
		var fieldButton = me.lookupReference("ctlOpenPopupButton");
		var fieldControl = me.lookupReference("ctlField");

		fieldControl.setEditable(me.getView().editableControl);
		fieldButton.setDisabled(!me.getView().editableControl);
		
		
		if(!StringUtil.isNullorEmpty(me.getView().fieldLabel)){
			fieldControl.setFieldLabel(me.getView().fieldLabel);
		}
		
		if(!StringUtil.isNullorEmpty(me.getView().emptyText)){
			fieldControl.setEmptyText(me.getView().emptyText);
		}
		
		if(me.getView().labelWidth){
			fieldControl.labelWidth = me.getView().labelWidth;
		}
		
		if(me.getView().bind){
			fieldControl.bind = me.getView().bind;
		}
		
		fieldControl.allowBlank = me.getView().allowBlank;
	},
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	openCodePopupForGr:function(){
		var me = this;
		var popupAlias = null;
		var lorryNo = '';

		var popupType = me.getView().popupType;
		
		lorryNo = me.getView().getLorryNo();
		
		if (StringUtil.isNullorEmpty(lorryNo)) {
			MessageUtil.error('fail_msg', 'requireLorryno');
			return;
		} else {
			popupAlias = "popup-goodsreceiptpopup";
		}
		
		if(me.getView().params == null){
			me.getView().params = {};
		}
	
		me.getView().params['lorryNo'] = me.getView().getLorryNo();
		me.getView().params['vslCallId'] = me.getView().getVslCallId();
		me.getView().params['searchType'] = me.getView().getGateInOut();
		
		if(popupAlias){
			var parent = me.getParent(me.getView());
			
			if(me.getView().parent){
				parent = me.getView().parent;
			}
			
			ViewUtil.openCodePopup(parent.getController(), popupAlias, me.getView().reference, me.getView().params, me.afterSetCodePopupData, me);
		}
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var fieldControl = me.lookupReference("ctlField");
		if(me.getView().isMultiGR === 'Y'){
			return;
		}
		if(returnValue){
			fieldControl.setValue(returnValue.code);
		} else {
			fieldControl.setValue("");
		}
	},
	
	onFieldFocusleave : function(){
		var me = this;
    	var store = me.getStore('goodsReceiptPopup');
    	var fieldControl = this.lookupReference("ctlField");
    	var fieldValue = fieldControl.getValue().split(',')[0].trim(); //Process Case Muiltiple-Cargo
    	var controlName = me.getView().reference;
    	var parent = me.getParent(me.getView());
    	var lorryNo = me.getView().getLorryNo();
    	var searchType = me.getView().getGateInOut();
    	
    	if (StringUtil.isNullorEmpty(lorryNo)) {
			MessageUtil.warning('fail_msg', 'requireLorryno');
			return;
		}
    	
		if(me.getView().parent){
			parent = me.getView().parent;
		}
		
    	var bizController = parent.getController();
    	
    	if(StringUtil.isNullorEmpty(fieldValue)){
    		fieldControl.setValue('');
    		return;
    	}
    	
    	fieldValue = fieldValue.toUpperCase();

    	if(me.getView().params == null){
			me.getView().params = {};
		}
    	
    	store.load({
    		params: {
    			grNo : fieldValue,
    			lorryNo: lorryNo,
    			searchType: searchType,
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length == 1){
					var returnItem = {
							code : records[0].get('grNo'),
							item : records[0]
					}
					

					if(bizController.afterSetCodePopupData){
						bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem);
					}
					
					me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem, me, parent);
					if(me.getView().isMultiGR === 'Y'){
						return;
					}
					if(fieldControl.getValue() !== returnItem.code){
						fieldControl.setValue(returnItem.code);
					}
				} else {
					fieldControl.setValue('');
				}
				}
			}
		});
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});