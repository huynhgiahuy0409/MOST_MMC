Ext.define('MOST.view.popup.UnitUpdatePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.unitupdatepopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPartnerCdPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'partnerCdPopupStore',	
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
		var refs = me.getReferences();
		var recvData = me.getViewModel().get('theUnit');
		
        refs.refUpdateUnit1.setDisabled(StringUtil.isNullorEmpty(recvData.get('ivUnit1')) || recvData.get('adhocYn') != 'Y');
		refs.refUpdateUnit2.setDisabled(StringUtil.isNullorEmpty(recvData.get('ivUnit2')) || recvData.get('adhocYn') != 'Y');
		refs.refUpdateUnit3.setDisabled(StringUtil.isNullorEmpty(recvData.get('ivUnit3')) || recvData.get('adhocYn') != 'Y');
		
		refs.refUpdateUnit1.setFieldLabel((recvData.get('ivUnit1') != null && recvData.get('ivUnit1') != 0) ? recvData.get('ivUnit1') : ViewUtil.getLabel('ivUnit1'));
		refs.refUpdateUnit2.setFieldLabel((recvData.get('ivUnit2') != null && recvData.get('ivUnit2') != 0) ? recvData.get('ivUnit2') : ViewUtil.getLabel('ivUnit2'));
		refs.refUpdateUnit3.setFieldLabel((recvData.get('ivUnit3') != null && recvData.get('ivUnit3') != 0) ? recvData.get('ivUnit3') : ViewUtil.getLabel('ivUnit3'));
	},

	onUpdate: function() {
		var me = this;
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var theUnit = me.getViewModel().get('theUnit');
		
		var returnItem = {
			item : theUnit
		}
		
		return returnItem;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});