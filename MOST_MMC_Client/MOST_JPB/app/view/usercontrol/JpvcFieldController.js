Ext.define('MOST.view.usercontrol.JpvcFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.jpvcfield',	

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	POPUP_ALIAS : 'popup-jpvcpopup',
	prevJpvc : null,
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
		
		if(MOST.config.Token.getVslCallId()){
			var vslCallId = MOST.config.Token.getVslCallId().toUpperCase();
			var refs = me.getReferences();
			refs.ctlField.setValue(vslCallId);
			
			me.onFieldFocusleave();
		}
	},
	
	// Field Before Renderer
	onRenderField:function(){
		var me = this;
		var fieldButton = me.lookupReference("ctlOpenPopupButton");
		var fieldControl = me.lookupReference("ctlField");
		var nameControl = me.lookupReference("ctlFieldName");
		
		fieldControl.setEditable(me.getView().editableControl);
		fieldButton.setDisabled(!me.getView().editableControl);
		
		if(Ext.isClassic){
		    nameControl.setVisible(me.getView().visibleName);	
		}else{

		    nameControl.setHidden(!me.getView().visibleName);
		}
		
		if(!StringUtil.isNullorEmpty(me.getView().fieldLabel)){
			if(Ext.isClassic){
				fieldControl.setFieldLabel(me.getView().fieldLabel);
			} else {
				fieldControl.setLabel(me.getView().fieldLabel);
			}
		}
		
		if(!StringUtil.isNullorEmpty(me.getView().emptyText)){
			if(Ext.isClassic){
				fieldControl.setEmptyText(me.getView().emptyText);
			}else{
				fieldControl.setPlaceholder(me.getView().emptyText);
			}
		}
		
		if(me.getView().labelWidth){
			if(Ext.isClassic){			
				fieldControl.labelWidth = me.getView().labelWidth;
			} else {
				fieldControl.setLabelWidth(me.getView().labelWidth);
			}
		}
		
		if(me.getView().bind){
			if(Ext.isClassic){			
				fieldControl.bind = me.getView().bind;
			} else {
				fieldControl.setBind(me.getView().bind);
			}	
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
	// Validation JPVC
    onChangeFieldValue :  function(elem, newValue, oldValue, eOpts){
        var me = this;
        elem.setValue(elem.getValue().toUpperCase());
    },

	onFieldFocusleave : function(){
		var me = this;
    	var store = me.getStore('JPVCPopupStore');
    	var fieldControl = this.lookupReference("ctlField");
    	var fieldValue = fieldControl.getValue();
    	var controlName = me.getView().reference;
    	var parent = me.getParent(me.getView());
    	
    	if(me.getView().editableControl === false){
    		return;
    	}
    	
//		if(me.getView().parent){
    	if((Ext.isClassic && me.getView().parent) 
    			|| (Ext.isModern && me.getView().config.parent)){
			parent = me.getView().parent;
		}
		
    	var bizController = parent.getController();
    	
    	if(StringUtil.isNullorEmpty(fieldValue)){
    		me.clearJpvc();
    		return;
    	}
    	
    	fieldValue = fieldValue.toUpperCase();

    	if(me.getView().params == null){
			me.getView().params = {};
		}
    	
    	store.load({
			params: {
				vslCallId : fieldValue,
				mode:'textfield'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length == 1){
						var returnItem = {
								code : records[0].get('vslCallId'),
								codeName : records[0].get('vslNm'),
								item : records[0]
						}
						
						me.getView().params['vslCallId'] = returnItem.code;
						
						if(bizController.afterSetCodePopupData){
							bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem);
						}
						
						me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem, me, parent);
						
						if(fieldControl.getValue() !== returnItem.code){
							fieldControl.setValue(returnItem.code);
						}
					} else {
						if(records.length == 0){
							MessageUtil.info('Information','vslcallid_notExist');
							me.clearJpvc();
							return;
						} 
						
					}
				}
			}
		});
	},
	
	// Clear Jpvc
	clearJpvc:function(){
		var me = this;
    	var fieldControl = this.lookupReference("ctlField");
    	var fieldValue = fieldControl.getValue();
    	var controlName = me.getView().reference;
    	var parent = me.getParent(me.getView());
    	var bizController = parent.getController();
    	
		var fieldValue = fieldControl.getValue();
		fieldControl.setValue("");

		if(bizController.afterSetCodePopupData){
			bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null);
		}
		
		me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null, me, parent);
	},
	
	// Popup is closed and receives return value. 
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var nameControl = me.lookupReference("ctlFieldName");
		
		if(returnValue){
			me.prevJpvc = returnValue.code;
			nameControl.setValue(returnValue.codeName);
		} else {
			me.prevJpvc = null;
			nameControl.setValue("");
		}
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * HHT PopUp HANDLER START
	 * =========================================================================================================================
	 */
	
	onSearchVesselCallHHT : function(btn,event){
		var me = this;
		var successMsg = MOST.getApplication().bundle.getMsg('success_msg')
				
		me.openPopup('app-jpvcpopuphht');

	},

	onChangeHHT: function(ref, newValue, oldValue, op){
		var me = this;
		if(!newValue){
			me.prevJpvc = null;
		}
	},

	/**
	 * HHT PopUp HANDLER END
	 * =========================================================================================================================
	 */
	
});