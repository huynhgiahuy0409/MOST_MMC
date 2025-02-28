Ext.define('MOST.view.popup.HsCodePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',
	alias: 'controller.hscodepopup',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refHsCodePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'hsCodePopup',							// Main Store Name
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	onLoad: function()
	{
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm')
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.onSearch();
	},
	
	onSearch: function() 
	{
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		store.load({
			params: params, 
			callback: function(records, operation, success) 
			{
				if (records.length <= 0) 
				{
				}
			}
		});
	},
	
	onDblClick: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts )
	{
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refHsCodePopupGrid.getSelection() == null ? null : refs.refHsCodePopupGrid.getSelection()[0];
		var window = me.getView().up('window');
		
		if(selection == null)
		{
			return null
		}
		
		var returnItem = 
		{
			code : selection.data.hsCode,
			codeName : selection.data.hsNm,
			item : selection
		}
		
		window.returnValue = returnItem;
		window.close();
	},
	
	getSearchCondition : function()
	{
		var me = this;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['hsCdDiv'] = "H";
		return params;
	}
});
