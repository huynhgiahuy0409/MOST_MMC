Ext.define('MOST.view.popup.CountryCodePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',
    alias: 'controller.countrypopup',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCountryPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'countrylist',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	onLoad:function() {
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
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var window = me.getView().up('window');
		
		if(selection == null){
			return null
		}
		
		window.returnValue = selection;
		window.close();
		
	},
	
	getSearchCondition : function(){
		var me = this;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['scd'] = searchParm.get("scd");
		params['scdNm'] = searchParm.get("scdNm");
		
		return params;
	}
    
});
