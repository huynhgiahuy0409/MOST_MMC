Ext.define('MOST.view.billing.TariffCodePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.tariffcodepopup',
		
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTariffCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'tariffCodeList',	
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
		var searchTariffCodeCombo = me.getStore('tariffCodeTypeCombo');
		var costCenterCombo = me.getStore('costCenterCombo');
		var billingTypeCombo = me.getStore('billingTypeCombo');
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		searchTariffCodeCombo.load();
		costCenterCombo.load();
		billingTypeCombo.load();
		
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
    	var params = me.getSearchConditionTariff()
    	
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
	onAddTariff: function() {
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var gridTariff = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var storeTariff = gridTariff.getStore(me.MAIN_STORE_NAME);
		var storeTotal = storeTariff.totalCount;
		var selectCmmCdArray = new Array();
		if(storeTotal > 0){
			storeTariff.each(function(record,idx){
				if(record.data.chkCdNm === 1) {
					selectCmmCdArray.push(record.data);
				}
			});
		}
    	
		var returnItem = {
			item: selectCmmCdArray
		}
		
		return returnItem;
	},
	
	// Cell Click
	onCellClick: function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
	},
	
	// Grid Edit
	onEdit : function(editor, context){
//		context.record.phantom=true;
		var me = this;
	},
	
	
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */

	
	
	
	// Detail Initialize
	
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchConditionTariff:function(){
		var me = this;
     	var refs = me.getReferences();
    	var tariffCode = refs.ctlsearchTariffCodeCombo.getValue();
    	var costCenter = refs.ctlCostCenterCondition.getValue();
    	var billingType = refs.ctlBillingType.getValue();
    	
     	var params = {
 			trfTpCd: tariffCode,
 			costCntCd: costCenter,
 			billTpCd: billingType,
     		searchTp : 'TRF_DATA'
		};
    	return params;
	},
	
	onMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var refs = me.getReferences();
		
		if (checked) {
			record.set({
				chkCdNm: 1
			});
		} else {
            record.set({
            	chkCdNm: 0
            });
		}
		store.commitChanges();
		
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});