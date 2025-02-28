Ext.define('MOST.view.popup.InGateTruckListPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',
	alias: 'controller.ingatetrucklistpopuphht',
	
	requires: [
	],

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DATE_PERIOD : 7,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var title ='';
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var lorryNo = '';
		var grid = me.lookupReference('refLorryPopupHHTGridHHT');
		var recvData = me.getView().recvData;
		
		if(me.getView().recvData){
			title = me.getView().recvData.title;
			me.getView().up('window').setTitle(title);
			
			vslCallId = me.getView().recvData.vslCallId;
			lorryNo = me.getView().recvData.lorryNo;
			refs.reflorryNo.setValue(lorryNo);
		}
		
		if(vslCallId != '' && vslCallId != null){
			var store = me.getStore('lorryGateInListPopup');
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
			
		}
	},

	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore('lorryGateInListPopup');
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
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectLorryHHT'){//Select from WorkingArea popup:
			window.returnValue = me.getReturnData();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
//	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var inputVslCallId,inputLorryNo;
		
		inputVslCallId = me.getView().recvData.vslCallId;
     	inputLorryNo = refs.reflorryNo.getValue();
     	
     	var blNo = '';
     	var sdoNo = '';
     	var shipgNoteNo = '';
		var grNo = '';
     	var weightCheckYn = 'Y';
		var isMultiCargo = '';
     	
     	if(me.getView().recvData){
			blNo = me.getView().recvData.blNo;
			sdoNo = me.getView().recvData.sdoNo;
			grNo = me.getView().recvData.grNo;
			shipgNoteNo = me.getView().recvData.shipgNoteNo;
			isMultiCargo = me.getView().recvData.isMultiCargo;
			weightCheckYn = me.getView().recvData.weightCheckYn; 
			searchType = me.getView().recvData.searchType; 
		}
     	
     	if(inputVslCallId === '' && inputLorryNo === ''){
     		return null;
     	} 
     		
		var params = {
			searchType: searchType,
			vslCallId: inputVslCallId,
			blNo: blNo,
			sdoNo: sdoNo,
			shipgNoteNo: shipgNoteNo,
			grNo: grNo,
			lorryNo: inputLorryNo,
			isMultiCargo: isMultiCargo,
			weightCheckYn: weightCheckYn
		}
 	    return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refLorryPopupHHTGridHHT');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null){
			return null;
		}
		
		var returnItem = {
			code : selection.data.lorryNo,
			item : selection
		}
		
		return returnItem;
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});