Ext.define('MOST.view.foundation.usercontrol.PopupFieldViewController', {
	extend: 'MOST.view.foundation.usercontrol.BaseUserController',	
	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// Field Before Renderer
	onRenderField:function(){
		var me = this;
		var fieldButton = me.lookupReference("ctlOpenPopupButton");
		var fieldControl = me.lookupReference("ctlField");

		if(fieldControl.getEditable()){
			fieldControl.setEditable(me.getView().editableControl);
		}
		
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
	// Validation Code
	onValidationCode : function(store, params, compareFieldName, returnItemFieldNames){
		var me = this;
    	var fieldControl = this.lookupReference("ctlField");
    	var fieldValue = fieldControl.getValue();
    	var controlName = me.getView().reference;
    	var parent = me.getParent(me.getView());
		
		if(me.getView().parent){
			parent = me.getView().parent;
		}
		
    	var bizController = parent.getController();
    	
    	if(StringUtil.isNullorEmpty(fieldValue) ||
			me.prevValue === fieldValue ||
			me.getView().editableControl === false ||
			fieldControl.readOnly === true){
    		
    		if(bizController.afterSetCodePopupData){
				bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null);
			}
			return;
    	}
    	
    	fieldValue = fieldValue.toUpperCase();
    	
    	if(params){
    		params[compareFieldName] = fieldValue;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						var returnItem = {
								code : records[0].get(returnItemFieldNames.code),
								codeName : records[0].get(returnItemFieldNames.codeName),
								item : records[0]
						}
						
						if(bizController.afterSetCodePopupData){
							bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem);
						}
						
						if(me.afterSetCodePopupData){
							me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem, me, parent);
						}
						
						if(fieldControl.getValue() !== returnItem.code){
							fieldControl.setValue(returnItem.code);
						}
					} else {
						fieldControl.setValue("");
						
						if(bizController.afterSetCodePopupData){
							bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null);
						}
						
						if(me.afterSetCodePopupData){
							me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null, me, parent);
						}
					}
				}
			}
		});
	},
	
	// OPEN POPUP
	openPopup:function(popupAlias){
		var me = this;
		var parent = me.getParent(me.getView());
		var fieldControl = me.lookupReference("ctlField");
    	var fieldValue = fieldControl.getValue();
    	
    	if(me.getView().params){
    		me.getView().params.codeValue = fieldValue;
    		
    		if(me.getView().visibleName === true){
    			me.getView().params.popupType = ViewUtil.POPUPTYPE_SINGLE;
    		}
    	}
		
		if(me.getView().parent){
			parent = me.getView().parent;
		}
		
		ViewUtil.openCodePopup(parent.getController(), popupAlias, me.getView().reference, me.getView().params, me.afterSetCodePopupData, me);
	}
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});