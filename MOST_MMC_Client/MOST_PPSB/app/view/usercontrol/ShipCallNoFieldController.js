Ext.define('MOST.view.usercontrol.ShipCallNoFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.shipcallnofield',	

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	POPUP_ALIAS : 'popup-shipcallnolistpopup',
	prevScn : null,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	STORE_NAME: 'shipCallNoDetailList', //'shipCallNoListPopup',
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		
		if(MOST.config.Token.getScn()){
			var scn = MOST.config.Token.getScn().toUpperCase();
			var refs = me.getReferences();
			refs.ctlField.setValue(scn);
			
			me.onFieldFocusleave();
		}
	},
	
	// Field Before Renderer
	onRenderField:function(){
		var me = this;
		var fieldButton = me.lookupReference("ctlOpenPopupButton");
		var fieldControl = me.lookupReference("ctlField");
		
		fieldControl.setEditable(me.getView().editableControl);
		fieldButton.setDisabled(!me.getView().editableControl);
		
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
	// Validation SCN
	onChangeFieldValue : function(elem, newValue, oldValue,
			eOpts) {
		var me = this;
		elem.setValue(elem.getValue().toUpperCase());
	},

	onFieldFocusleave : function(){
		var me = this;
		var store = me.getStore(me.STORE_NAME);
		var fieldControl = this.lookupReference("ctlField");
		var fieldValue = fieldControl.getValue();
		var controlName = me.getView().reference;
		var parent = me.getParent(me.getView());
	
		if(me.getView().editableControl === false) return;
		if(me.prevScn === fieldValue) return;
		
		//if(me.getView().parent){
		if((Ext.isClassic && me.getView().parent) 
				|| (Ext.isModern && me.getView().config.parent)){
			parent = me.getView().parent;
		}
		
		var bizController = parent.getController();
		
		if(StringUtil.isNullorEmpty(fieldValue)){
			if(!StringUtil.isNullorEmpty(me.prevScn)){
				me.clearScn();
			}
			return;
		}
		
		fieldValue = fieldValue.toUpperCase();
	
		if(me.getView().params == null){
			me.getView().params = {};
		}
		
		store.load({
			params: {
				scn : fieldValue,
				mode:'textfield'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length >= 1){
						/**
						 * if 1 scn has more than 1 record (vslcallid): just return scn item
						 * if 1 scn has 1 record (vslcallid): return vslcallid item.
						*/
						var item;
						if(records.length > 1){
							item = Ext.create('MOST.model.popup.VesselCallList');
							item.set('scn', records[0].get('scn'));
							item.set('vslCd', records[0].get('vslCd'));
							item.commit();
							//MessageUtil.info('Information','scn_notHasMultipleCall');

						}else if(records.length == 1){
							item = records[0]; //Full vslCallId infor
						}
							
						var returnItem = {
							code : records[0].get('scn'),
							codeName : records[0].get('scn'),
							item : item
						};
						
						me.getView().params['scn'] = returnItem.code;
						
						if(bizController.afterSetCodePopupData){
							bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem);
						}
						
						me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, returnItem, me, parent);
						
						if(fieldControl.getValue() !== returnItem.code){
							fieldControl.setValue(returnItem.code);
						}
						
					} else if(records.length == 0){
						MessageUtil.info('Information','scn_notExist');
						me.clearScn();
						return;
					}
				}
			}
		});
	},
	
	// Clear SCN
	clearScn:function(){
		var me = this;
		var fieldControl = this.lookupReference("ctlField");
		var fieldValue = fieldControl.getValue();
		var controlName = me.getView().reference;
		var parent = me.getParent(me.getView());
		var bizController = parent.getController();
		
		var fieldValue = fieldControl.getValue();
		fieldControl.setValue("");
		me.getView().params['scn'] = '';
		me.getView().params['codeValue'] = '';
		
		if(bizController.afterSetCodePopupData){
			bizController.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null);
		}
		
		me.afterSetCodePopupData(me.POPUP_ALIAS, controlName, null, me, parent);
	},
	
	// Popup is closed and receives return value. 
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		if(returnValue){
			me.prevScn = returnValue.code;
		} else {
			me.prevScn = null;
		}
		
		var xView = me.getView();
		var parent = me.getParent(xView);
		
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});