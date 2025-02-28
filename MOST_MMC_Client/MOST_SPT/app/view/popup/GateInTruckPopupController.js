Ext.define('MOST.view.popup.GateInTruckPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.gateintruckpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGateInTruckPopupGrid',
	MAIN_STORE_NAME: 'gateInTruckPopup',
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
		
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		if(me.getView().recvData){
			if(me.getView().recvData.vslCallId){
				refs.refVslCallId.setValue(me.getView().recvData.vslCallId);
				me.getSnComboItems();
				me.getBlComboItems();
			}
			
			searchParm.set('grNo', me.getView().recvData.grNo);
			searchParm.set('blNo', me.getView().recvData.blNo);
			searchParm.set('shipgNoteNo', me.getView().recvData.shipgNoteNo);
			searchParm.set('isMultiCargo', me.getView().recvData.isMultiCargo);
			searchParm.set('weightCheckYn', me.getView().recvData.weightCheckYn);
			searchParm.set('searchType', me.getView().recvData.searchType);
			searchParm.set('cgTpCd', me.getView().recvData.cgTpCd);
			searchParm.set('searchDelvTp', me.getView().recvData.searchDelvTp);
			searchParm.set('isOpeChk', me.getView().recvData.isOpeChk);
		}
		
		me.onSearch();
	},
	
	// Search Event Handler
	onSearch: function() {
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		store.load({
			params: params, 
			callback: function(records, operation, success) {
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
			grNo: searchParm.get("grNo"),
			lorryNo: searchParm.get("lorryNo"),
			isMultiCargo: searchParm.get("isMultiCargo"),
			weightCheckYn: searchParm.get("weightCheckYn"),
			searchType: searchParm.get("searchType"),
			cgTpCd: searchParm.get("cgTpCd"),
			searchDelvTp: searchParm.get("searchDelvTp"),
			isOpeChk: searchParm.get("isOpeChk")
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