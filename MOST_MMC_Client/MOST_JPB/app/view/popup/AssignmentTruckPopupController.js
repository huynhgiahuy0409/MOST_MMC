Ext.define('MOST.view.popup.AssignmentTruckPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.assignmenttruckpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refAssignmentTruckListPopupGrid',
	MAIN_STORE_NAME: 'assignmentTruckListPopup',
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
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		var store = me.getStore(me.MAIN_STORE_NAME);
		var gateInStore = me.getStore('gateInTruckListPopup');
		
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		if(me.getView().recvData.vslCallId){
			refs.refVslCallId.setValue(me.getView().recvData.vslCallId);
			me.getSnComboItems();
			me.getBlComboItems();
		}
		
		me.onSearch();
	},
	
	// Search Event Handler
	onSearch: function() {
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		var gateInStore = me.getStore('gateInTruckListPopup');
		var isInTerminal = false;
		
		for(var i = 0; i < gateInStore.data.length; i++){			
			if(refs.refTruckNo.getValue() == gateInStore.data.items[i].data.lorryNo){
				isInTerminal = true;
				break;				
			}
		}
		
		if(isInTerminal == true){
			MessageUtil.warning('warning_msg', "This Truck is still in terminal, please recheck");
			return;
		}
		
		gateInStore.load();
		
		store.load({
			params: params, 
			callback: function(records, operation, success) {
				if (records.length <= 0) {
					
				}
			}
		});
		
    },
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var refs = me.getReferences();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var window = me.getView().up('window');
		
		if(selection == null){
			return null
		}
		
		var returnItem = {
			code : selection.get("lorryNo"),
			codeName : selection.get("lorryNo"),
			item : selection
		}
		
		window.returnValue = returnItem;
		window.close();
	},

	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		var selectArray = new Array();
		selectArray.push(selection.data);
		
		var returnItem = {
			code : selection.data.plateNo,
			item : selectArray
		}
	
		return returnItem;
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
		var searchParm = me.getViewModel().get('theSearch');
		
		var params = {
			vslCallId: searchParm.get("vslCallId"),
			shipgNoteNo: searchParm.get("shipgNoteNo"),
			blNo: searchParm.get("blNo"),
			lorryNo: searchParm.get("lorryNo"),
			cgTpCd : me.getView().recvData.cgTpCd
		}
		
    	return params;
    	
	},
	
	getSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		
		var snCombo = me.getStore('shipgNoteNoCombo');
		
		snCombo.load({
			params : {
				vslCallId: refs.refVslCallId.getValue()
			},
			callback: function(records, operation, success) {
				if (success) {
					
				}
			}
		});
	},
	
	getBlComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blNoCombo');
		
		blCombo.load({
			params : {
				vslCallId: refs.refVslCallId.getValue()
			}
		});
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'refVslCallId'){
			if(returnValue){
				me.getSnComboItems();
				me.getBlComboItems();
			} else {
				var blCombo = me.getStore('blNoCombo');
				var snCombo = me.getStore('shipgNoteNoCombo');
				
				blCombo.loadData([],false);
				snCombo.loadData([],false);
				
				refs.refBlNo.reset();
				refs.refShipgNoteNo.reset();
			}
		}
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});