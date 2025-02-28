Ext.define('MOST.view.popup.UserTypePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.usertypepopup',	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
//		var userTypeComboAllData = me.getStore('userTypeComboAllData');
		var userTypeCombo = me.getStore('userTypeCombo');

		userTypeCombo.load(
//				{
//			params : {
//				lcd: "MT",
//				mcd: "PTNRTP"
//			},
//			callback: function(records, operation, success) {
//				if (success) {
//					// SUCCES
//					if(records != null && records.length > 0){
//
//					} 
//				}
//			}
//		}
				);
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('userTypePopup');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					// SUCCES
				}
			}
		});
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},

	// Store Filter
	onStoreFilter : function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
    	var store = me.getStore('userTypePopup');
    	store.clearFilter();
    	
    	store.filter([{
			filterFn: function(item) {
		    	return (item.get('engNm').replace(' ', '').toUpperCase().trim().search(newValue.replace(' ', '').toUpperCase()) != -1);
		    }
    	}]);
    	
    	field.setValue(newValue.toUpperCase());
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var ptnrTp = refs.ctlUserTypeCombo.getValue();
     	var ptnrName = refs.ctlPartnerName.getValue();

     	if(StringUtil.isNullorEmpty(refs.ctlUserTypeCombo.getValue())){
     		MessageUtil.warning('warning_msg', 'usertypepopup_partner_type_select_msg');
     		refs.ctlUserTypeCombo.focus();
     		return null;
     	}
     	
     	var params = {
     			searchType : 'USER_CODE',
     			ptnrTp : ptnrTp,
     			ptnrName : ptnrName
     	};

    	return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refUserTypePopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		var returnItem = {
			code : selection.data.staffCd,
		    codeName : selection.data.engNm,
		    item : selection
		}
		
		return returnItem;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});