Ext.define('MOST.view.sample.IndependencyPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.independencypopup',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
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
	 // Call Parent
	 onCallParent : function(){
		 var me = this;
		 var parentView = me.getParentView();
		 parentView.getController().recevePopup("test");
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