Ext.define('MOST.view.popup.YardTruckPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.yardtruckpopuphhtctl',	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('yardTruckList');
        var params = me.getSearchCondition();
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {

					}
				}
			}
		});
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('yardTruckList');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
					
					}
				}
			}
		});
	},

    onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
       	window.close();
	},

    getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refYardTruckGridHHT');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var returnItem = {
			code : selection.data.scd,
			codeName : selection.data.scdNm,
		}
		
		return returnItem;
	},

    getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var yardTruckCode = refs.ctlYardTruckCode.getValue();
		var yardTruckName = refs.ctlYardTruckName.getValue();
     	var params = {
			scd: yardTruckCode,
			scdNm: yardTruckName,
		}
    	return params;
	},
	
	/**
	 * EVENT POPUP HANDLER END
	 * =========================================================================================================================
	 */
	
});