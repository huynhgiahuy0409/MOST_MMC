Ext.define('MOST.view.controller.GatePassDetailController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],
	alias: 'controller.gatepassdetail',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
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
		var store = me.getStore('gatePassDetail');
		var params = me.getSearchCondition();
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.getViewModel().setData({theDetail:record[0]});
					}
				}
			}
		});
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var userId = MOST.config.Token.getUserId();
    	var params = {
			jpvcNo : recvData.get('vslCallId'),
			cgNo : recvData.get('cgNo'),
			gatePassNo : recvData.get('gatePassNo'),
			cgInOutCd : recvData.get('cgInOutCd'),
			seq : recvData.get('seq'),
			userId: userId
		};
    	
    	return params;
	},
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		
		
		var params = me.getSearchCondition();
		
		var storePDF = me.getStore('generatePDFGatePassDetail');
		storePDF.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
					window.close();
				}
			}
		});
		
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});