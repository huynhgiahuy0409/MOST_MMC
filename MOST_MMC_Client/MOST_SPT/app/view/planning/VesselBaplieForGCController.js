Ext.define('MOST.view.planning.VesselBaplieForGCController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vesselbaplieforgc',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselBaplieGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'vesselBaplieStore',			// Main Store Name
	
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
		var searchParm = Ext.create('MOST.model.planning.SearchVesselBaplieForGCParm');
		var recvData = me.getView().recvData;
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
    	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	var pageNo = store.currentPage;
    	var sizePerPage = CommonConstants.PAGE_SIZE;
    	var searchParm = me.getViewModel().get('theSearch');
    	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
    	var params = {
    		vslCallId : vslCallId,
    		sizePerPage: sizePerPage,
    		pageNo: pageNo,
    		sort : grid.getSortString()
		};
    	
    	return params;
	},
	
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselfindpopup', 'ctlJpvc');
	},
});