Ext.define('MOST.view.monitoring.TheListOfUnitNoCorrectionController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.thelistofunitnocorrection',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refUnitCorrectionGrid',
	MAIN_STORE_NAME: 'unitCorrectionItems',

	MAX_DATE_PERIOD : 30,
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
		
		var searchParm = Ext.create('MOST.model.monitoring.SearchTheListOfUnitNoCorrectionParm');
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
	onSearchBtn: function() {
		var me = this;
		var refs = me.getReferences();
     	
		me.onSearch();
	},
	
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
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchTheListOfUnitNoCorrectionParm';
		searchBizParm.serviceID = 'MOST.theListOfUnitNoCorrection.selectCorrectionUnitNoItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
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
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
			
			params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
			params['blNo'] = StringUtil.toUpperCase(searchParm.data.blNo);
			params['snNo'] = StringUtil.toUpperCase(searchParm.data.snNo);
			params['unitNo'] = StringUtil.toUpperCase(searchParm.data.unitNo);
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
			var snCombo = me.getStore('snCombo');
			
			blCombo.load({
				params:{
					vslCallId:theVslInfo.get('vslCallId')
				}
			});
			snCombo.load({
				params:{
					vslCallId:theVslInfo.get('vslCallId')
				}
			});
		}
	},

	// Popup After Setting
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getComboMasterItem();
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([],false);
				refs.ctlBlNo.reset();
				
				var snCombo = me.getStore('snCombo');
				snCombo.loadData([],false);
				refs.ctlSnNo.reset();
			}
		}
		
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});