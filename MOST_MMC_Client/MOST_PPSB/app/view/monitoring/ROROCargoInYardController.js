Ext.define('MOST.view.monitoring.ROROCargoInYardController', {
    extend: 'MOST.view.foundation.BaseViewController',
    requires: [
           	],
    alias: 'controller.roroCargoInYard',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    
	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */

    
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    onLoad : function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.monitoring.SearchROROCargoInYardParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
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
		var store = me.getStore('ROROCargoInYardList');
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}
		
		store.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getBlComboItems();
				me.getSnComboItems();
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var blCombo = me.getStore('BLCombo');
				blCombo.loadData([],false);
				snCombo.loadData([],false);
				refs.ctlBlNo.reset();
				refs.ctlSnNo.reset();
			}
		}
	},
	getBlComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		if(theVslInfo){
			var blCombo = me.getStore('BLCombo');
			blCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
						}
					}
				}
			});
		}
	},
	getSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		if(theVslInfo){
			var blCombo = me.getStore('SNCombo');
			blCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
						}
					}
				}
			});
		}
	},
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
		
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
		getSearchCondition : function() {
			var me = this;
			var store = me.getStore('ROROCargoInYardList');
			var pageNo = store.currentPage;
			var sizePerPage = CommonConstants.PAGE_SIZE;
			var searchParm = me.getViewModel().get('theSearch');
			var params = me.createParam(searchParm);
			
			params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
			params['blNo'] = StringUtil.toUpperCase(searchParm.data.blNo);
			params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
	        params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			
			return params;
		},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
    keyup: function () {

    },
});

