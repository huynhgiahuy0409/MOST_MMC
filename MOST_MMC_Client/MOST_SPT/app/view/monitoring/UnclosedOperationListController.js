Ext.define('MOST.view.monitoring.UnclosedOperationListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.unclosedoperationlist',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 30,	// MAX PERIOD DAY
	
	MAIN_GRID_REF_NAME: 'refUnclosedGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'unclosedOperationList',
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
		var searchParm = Ext.create('MOST.model.monitoring.SearchUnclosedOperationListParm');
		var statusCombo = me.getStore('statusCombo');
		var whLocCombo = me.getStore('whLocCombo');
		
		statusCombo.load();
		whLocCombo.load();
		
		me.setDateInDays("ctlFromATB", -30);
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
			}
		}
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
		var params = me.createParam(searchParm);
     	var vslCallId = searchParm.data.vslCallId;
     	var statCd = searchParm.data.statCd;
     	var whLoc = searchParm.data.whLoc;
     	var fromATU = '';
     	var toATU = '';
     	var workStDt = '';
     	var workEndDt = '';
     	
     	if (vslCallId != null && vslCallId != ''){
     		refs.ctlFromATB.setValue('');
     		refs.ctlToATB.setValue('');
     	}
     	
        if(refs.ctlFromATB.getValue() != null && refs.ctlToATB.getValue() != null){
            dateCondition = me.checkPeriodDate("ctlFromATB", "ctlToATB", me.MAX_DATE_ALLOW, true);
            workStDt = dateCondition.fromDtString;
            workEndDt = dateCondition.toDtString;
        }
        
        if(refs.ctlFromATU.getValue() != null && refs.ctlToATU.getValue() != null){
            dateCondition = me.checkPeriodDate("ctlFromATU", "ctlToATU", me.MAX_DATE_ALLOW, true);
            fromATU = dateCondition.fromDtString;
            toATU = dateCondition.toDtString;
        }
    	
 		var params = {
    			vslCallId : vslCallId,
    			fromATB : workStDt,
    			toATB : workEndDt,
    			fromATU: fromATU,
    			toATU : toATU,
    			statCd: statCd,
    			whLoc: whLoc,
    			searchType : 'UnclosedOperationList'
		};
	
    	return params;
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();

		if(control == refs.ctlFromATB){
			me.setDateInDaysByDate("ctlToATB", me.MAX_PERIOD_DAY, control.getValue());
		} else if(control == refs.ctlToATB){
			me.setDateInDaysByDate("ctlFromATB", -me.MAX_PERIOD_DAY, control.getValue());
		} else if(control == refs.ctlFromATU){
			me.setDateInDaysByDate("ctlToATU", me.MAX_PERIOD_DAY, control.getValue());
		} else{
			me.setDateInDaysByDate("ctlFromATU", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},
	
	onClick : function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var store = me.getStore('JPVCPopupStore');
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			return;
		}
		
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
		var comboStore = me.getStore(me.MAIN_STORE_NAME);
		var shiftStore = me.getStore('shiftCombo');
		var shiftId = MOST.config.Token.getWorkShift();
		var workDate = MOST.config.Token.getWorkDate();
		
		comboStore.load({
			params: {
				searchType : 'comboList'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						shiftStore.setData(records[0].get('shiftList'));
						shiftStore.insert(0, [{shftNm: 'All',shftId: ''}]);
						refs.refCboShift.setValue(shiftId);
						refs.refCboShift.setDisabled(true);
						refs.refWorkDate.setValue(workDate);
						
						me.onSearchTbl();
					}
				}
			}
		});
	},
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START Tablet 
	 */
	onSearchTbl: function() {
		var me = this;
    	var store = me.getStore(me.MAIN_STORE_NAME);
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
		var theVessel = me.getViewModel().get('theVessel');
 		var params = {
				vslCallId : theVessel.vslCallId,
    			searchType : 'UnclosedOperationList'
		};
 		
    	return params;
	}
	 /**
	 * =========================================================================================================================
	 * EVENT HANDLER END Tablet 
	 */
});