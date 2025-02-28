Ext.define('MOST.view.popup.PackagePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',
    alias: 'controller.packagepopup',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPackagePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'packagePopup',	
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

    },
    
    onSearch:function() {
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		store.load({
			params: params, 
			callback: function(records, operation, success) {
			}
		});
		
    },
    
	getSearchCondition : function(){
    	var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		if(me.getView().recvData != null && me.getView().recvData !=undefined && me.getView().recvData !=""){
			params['commCd'] = me.getView().recvData.commCd;
		}
		
		params['pkgTpCode'] = searchParm.get("pkgTpCode");
		params['scdNm'] = searchParm.get("scdNm");
		
		return params;
	},
    
    dblclick: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
    	var me = this;
		var refs = me.getReferences();
		var selection = refs.refPackagePopupGrid.getSelection() == null ? null : refs.refPackagePopupGrid.getSelection()[0];
		var window = me.getView().up('window');
		
		window.returnValue = selection;
		window.close();
	}
	
});
