Ext.define('MOST.view.popup.PortPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',
    alias: 'controller.portpopup',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPortGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'portPopup',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.onSearch();
	},
	
    onSearch:function() {
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
    
    dblclick: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
    	var me = this;
		var refs = me.getReferences();
		var selection = refs.refPortGrid.getSelection() == null ? null : refs.refPortGrid.getSelection()[0];
		var window = me.getView().up('window');
		
		if(selection == null){
			return null
		}
		
		var returnItem = {
				code : selection.data.portCode,
				codeName : selection.data.portName,
				item : selection
		}
		
		window.returnValue = returnItem;
		window.close();
	},
	
	getSearchCondition : function(){
		var me = this;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['countryCode'] = searchParm.get("countryCode");
		params['countryName'] = searchParm.get("countryName");
		params['portCode'] = searchParm.get("portCode");
		params['portName'] = searchParm.get("portName");
		
		return params;
	}
});
