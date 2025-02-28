Ext.define('MOST.view.billing.WHRentalStatusController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [  
    ],

    alias: 'controller.whrentalstatus',

	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 62,   // MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refWHRentalStatusGrid',
	MAIN_STORE_NAME: 'whRentalStatus',	

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
		var searchParm = Ext.create('MOST.model.billing.SearchWHRentalStatus');
		var whCombo = me.getStore('whCombo');
		var mvTypeStatus = me.getStore('mvTypeStatus');


		whCombo.load();

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
				if(success){
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
		
		
		if(StringUtil.isNullorEmpty(searchParm.get('payer'))){
			MessageUtil.warning('Warning', 'selectWHRentalStatusListPayerEmptyMsg');
    		return null;
		}

		if(searchParm){
			var params = me.createParam(searchParm);
			
			params['fromDate'] = me.checkDate('ctlFromDt').dateString;
			params['toDate'] = me.checkDate('ctlToDt').dateString;

			params['userId'] = MOST.config.Token.getUserId();
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
			
			return params;
		}
		
    	return null; 
	}

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});