Ext.define('MOST.view.planning.TheListOfYardPlanOfRoRoController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.thelistofyardplanofroro',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refRoRoYardPlanGrid',
	MAIN_STORE_NAME: 'roroYardPlanItems',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 * 
	 * /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.planning.SearchTheListOfYardPlanOfRoRoParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
	},
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
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
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
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
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		if(searchParm){
			var params = me.createParam(searchParm);
			
			params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
			params['blNo'] = StringUtil.toUpperCase(searchParm.data.blNo);
			params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
			params['userId'] = MOST.config.Token.getUserId();
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
			
			return params;
		}
		
    	return null;   	
	},
	
	getComboMasterItem: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		
		if(theVslInfo){
			var blCombo = me.getStore('blCombo');
			var shippingNoteCombo = me.getStore('shippingNoteCombo');
			
			blCombo.load({
				params:{
					vslCallId:theVslInfo.get('vslCallId')
				}
			});
			shippingNoteCombo.load({
				params:{
					vslCallId:theVslInfo.get('vslCallId')
				}
			});
		}
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlJpvc'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getComboMasterItem();
			} else {
				me.getViewModel().setData({theVslInfo:null});
				var blCombo = me.getStore('blCombo');
				
				blCombo.loadData([],false);
				refs.ctlBlNo.reset();
				
				var snCombo = me.getStore('shippingNoteCombo');
				
				snCombo.loadData([],false);
				refs.ctlSNNo.reset();
			}
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.planning.SearchTheListOfYardPlanOfRoRoParm';
		searchBizParm.serviceID = 'MOST.theListOfYardPlanOfRoRo.selectTheListOfYardPlanOfROROItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});