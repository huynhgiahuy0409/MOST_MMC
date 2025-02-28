Ext.define('MOST.view.popup.ShippingNoteForStoragePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.shippingnoteforstoragepopupctl',	
	
	MIN_DATE_PERIOD : 60,	// MIN PERIOD DATE
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		me.setDateInDays("refFromDate", - me.MIN_DATE_PERIOD);
		me.setDateInDays("refToDate");
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
    	var store = me.getStore('shippingNoteForStoragePopupStore');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					// SUCCES
				} else {
					MessageUtil.noMatchData();
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
     	var dateCondition = me.checkFromToDate("refFromDate", "refToDate");
     	
     	var params = {
     		authority: 'SHAFWD',
     		snTp: 'NonJPVC',
     		//statCd: 'FSCS',
     		searchType: 'master',
     		vslCallId:'STRG'	// 0132798
     	}
     	
     	if(dateCondition != null){
			params["arrvDtFm"] = dateCondition.fromDtString;
    		params["arrvDtTo"] = dateCondition.toDtString;
		}
     	
    	return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refShippingNoteForStoragePopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var returnItem = {
			code : selection.data.shipgNoteNo,
			item : selection
		}
		
		return returnItem;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});