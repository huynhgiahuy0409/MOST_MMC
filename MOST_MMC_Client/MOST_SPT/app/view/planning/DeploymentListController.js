Ext.define('MOST.view.planning.DeploymentListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.deploymentlist',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDeploymentGrid',
	MAIN_STORE_NAME: 'deploymentItems',

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 * 
	 * 
	 * /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.planning.SearchDeploymentListParm');
		var shiftCombo = me.getStore('shiftCombo');

		shiftCombo.load();
		
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
	// Search Event Handler
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
		var serviceDate = me.checkDate('ctlSearchDate');
		
		if(StringUtil.isNullorEmpty(serviceDate.dateString) && StringUtil.isNullorEmpty(searchParm.get('vslCallId')) && StringUtil.isNullorEmpty(searchParm.get('staffNo'))
			&& StringUtil.isNullorEmpty(searchParm.get('shiftId'))){
			MessageUtil.warning('Warning', 'mandantoryInquiryMsg_pn137001');
    		return null;
		}

		if(searchParm){
			var params = me.createParam(searchParm);
			
			params['deplDateFrom'] = serviceDate.dateString;
			params['userId'] = MOST.config.Token.getUserId();
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
			
			return params;
		}
		
    	return null;   	
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.planning.SearchDeploymentListParm';
		searchBizParm.serviceID = 'MOST.deploymentList.selectDeploymentItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});