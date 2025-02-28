Ext.define('MOST.view.sample.DesignMultiTabDetailController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	
	],

	alias: 'controller.designmultitabdetail',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var record = Ext.create('MOST.model.sample.SingleGrid');
		
		me.getViewModel().setData({theDetail:record});
	},
	
	// Initialize Control
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
	},	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselpopup', 'ctlJpvc');
	},
	
	/**
	 * Popup is closed and receives return value.If you set it in record form
	 * The value is set in the Text Control in the <setCodePopupData ()> function in [BaseViewController].
	 * The following function can be implemented only in record object.
	 * If you set only one value, delete it.
	 */ 
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
				
		if(targetControl === 'ctlJpvc'){ // GRID CONTROL POPUP
			refs.ctlJpvc.setValue(returnValue.code);
		}
	}
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});