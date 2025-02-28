Ext.define('MOST.view.popup.GatePassPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.gatepasspopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGatePassPopupGrid',
	MAIN_STORE_NAME: 'gatePassPopup',
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
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		if(me.getView().recvData.vslCallId){
			refs.refVslCallId.setValue(me.getView().recvData.vslCallId);
		}
		
		if(me.getView().recvData.lorryNo){
			refs.refTruckNo.setValue(me.getView().recvData.lorryNo);
		}
		
		me.onSearch();
	},
	
	// Search Event Handler
	onSearch: function() {
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		store.load({
			params: params, 
			callback: function(records, operation, success) {
				if (records.length <= 0) {
					
				}
			}
		});
    },
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var refs = me.getReferences();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var window = me.getView().up('window');
		
		if(selection == null){
			return null
		}
		
		var returnItem = {
			code : selection.get("gatePassNo"),
			codeName : selection.get("gatePassNo"),
			item : selection
		}
		
		window.returnValue = returnItem;
		window.close();
	},

	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		var selectArray = new Array();
		selectArray.push(selection.data);
		
		var returnItem = {
			code : selection.data.gatePassNo,
			item : selectArray
		}
	
		return returnItem;
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
		var searchParm = me.getViewModel().get('theSearch');
		
		var params = {
			vslCallId: searchParm.get("vslCallId"),
			gatePassNo: searchParm.get("gatePassNo"),
			lorryNo: searchParm.get("lorryNo")		
		}
		
    	return params;
    	
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});