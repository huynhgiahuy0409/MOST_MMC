Ext.define('MOST.view.popup.DOPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.dopopuphht',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START 
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		me.setUIpopup();
		me.onSearch();
	},

	setUIpopup: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		
		if(recvData){
			refs.refTxtDOPopVslCallId.setValue(recvData.vslCallId);
			me.getView().up('window').setTitle('D/O List');
			
			me.onSearchBlCombo();
		};
	},
	
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('deliveryOrderPopupStore');
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

	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
       	window.close();
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
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
     	var inputVslCallIdValue = refs.refTxtDOPopVslCallId.getValue();
     	var getCtlBlCdComboValue = refs.refCboDOPopBlNo.getValue();
     	
     	var lorryNo = '';
     	var doNo = '';

     	if(me.getView().recvData){
     		lorryNo = me.getView().recvData.lorryNo;
     		doNo = me.getView().recvData.doNo;
     	}
     	
		var params = {
			searchType: 'doNo',
			dono: doNo,
			lorryNo: lorryNo,
			vslCallId: inputVslCallIdValue,
			blno: getCtlBlCdComboValue
		}

    	return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

	onSearchBlCombo:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('blCombo');
		
		store.load({
			params: {
				vslCallId: refs.refTxtDOPopVslCallId.getValue()
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	onHHTDblClick: function(){
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnDataHHT();
       	window.close();
	},

	onSelect: function() {
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnDataHHT();
		
		if (window.returnValue != null) {
			window.close();
		}
	},

	getReturnDataHHT:function(){
		var me = this;
		var grid = me.lookupReference('refDeliveryOrderPopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();

		if (selection == null) {
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}

		var returnItem = {
			code : selection.data.doNo,
			item : selection
		}
		
		return returnItem;
	},
});