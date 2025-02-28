Ext.define('MOST.view.controller.UnclosedOperationListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.unclosedoperationlist',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 30,	// MAX PERIOD DAY
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
		
		me.setDateInDays("ctlFromATB", -30);
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
     	var jpvc = refs.ctlJpvc.getValue();
     	if (jpvc != null && jpvc != ''){
     		refs.ctlFromATB.setValue('');
     		refs.ctlToATB.setValue('');
     	}
    	var store = me.getStore('unclosedOperationList');
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
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlJpvc'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
			} else {
				me.getViewModel().setData({theVsl:null});
// me.searchBlList(true);
			}
		}
	},
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var jpvcNo = me.getViewModel().get('globallVesselCallId');
     	var workStDt = '';
     	var workEndDt = '';
     	
        if(refs.ctlFromATB.getValue() != null && refs.ctlToATB.getValue() != null){
            dateCondition = me.checkPeriodDate("ctlFromATB", "ctlToATB", me.MAX_DATE_ALLOW, true);
            workStDt = dateCondition.fromDtString;
            workEndDt = dateCondition.toDtString;
        }
    	
 		var params = {
    			vslCallId : jpvcNo,
    			fromATB : workStDt,
    			toATB : workEndDt,
    			searchType : 'UnclosedOperationList'
		};
	
    	return params;
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
//		refs.ctlJpvc.setValue('');
		if(control == refs.ctlFromATB){
			me.setDateInDaysByDate("ctlToATB", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlFromATB", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},
	
	onClick : function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var store = me.getStore('JPVCPopupStore');
		var refs = me.getReferences();
		var grid = me.lookupReference('refUnclosedGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		// refs.ctlJpvc.setValue(selection.get('vslCallId'));
		store.load ({
			params: {
				vslCallId: selection.get('vslCallId'),
				mode:'textfield'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length == 1){
						var returnItem = {
								code : records[0].get('vslCallId'),
								codeName : records[0].get('vslNm'),
								item : records[0]
						}
						refs.ctlJpvc.setValue(selection.get('vslCallId'));
						me.getViewModel().setData({theVsl:returnItem.item})
					} else {
						me.clearJpvc();
					}
				}
			}
			});
	},
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START Tablet 
	 */
	// After Renderer Event Tablet 
	onLoadTbl: function(){
		var me = this;
		var refs= me.getReferences();
		var comboStore = me.getStore('unclosedOperationList');
		var shiftStore = me.getStore('shiftCombo');
		var shiftId = MOST.config.Token.getWorkShift();
		var workDate = MOST.config.Token.getWorkDate();
		/*comboStore.load({
			params: {
				searchType : 'comboList'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						shiftStore.setData(records[0].get('shiftList'));
						shiftStore.insert(0, [{shftNm: 'All',shftId: ''}]);
						me.onSearchTbl();
					}
				}
			}
		});*/
		me.onSearchTbl();
	},
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START Tablet 
	 */
	onSearchTbl: function() {
		var me = this;
    	var store = me.getStore('unclosedOperationList');
    	var params = me.getSearchConditionTbl();
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
	getSearchConditionTbl : function(){
		var me = this;
		var vslCallId = me.getViewModel().get('globalVesselCallId');
 		var params = {
				vslCallId : vslCallId,
    			searchType : 'UnclosedOperationList',
				pageType: 'UOL'
		};
    	return params;
	},
	 /**
	 * =========================================================================================================================
	 * EVENT HANDLER END Tablet 
	 */
});