Ext.define('MOST.view.popup.ApronYardTruckPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',
	alias: 'controller.apronyardtruckpopuphht',
	
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
		var vslCallId = '';
		var lorryNo = '';
		var grid = me.lookupReference('refLorryPopupHHTGridHHT');
		
		if(me.getView().recvData){
			title = me.getView().recvData.title;
			me.getView().up('window').setTitle(title);
			
			vslCallId = me.getView().recvData.vslCallId;
			lorryNo = me.getView().recvData.lorryNo;
			refs.reflorryNo.setValue(lorryNo);
		}
		
		if(vslCallId != '' && vslCallId != null){
			var store = me.getStore('apronYardTruckListPopup');
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
		var store = me.getStore('apronYardTruckListPopup');
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
     	var shipgNoteNo = '';
     	var weightCheckYn = 'Y';
     	
     	if(me.getView().recvData){
			blNo = me.getView().recvData.blNo;
			shipgNoteNo = me.getView().recvData.shipgNoteNo;
			weightCheckYn = me.getView().recvData.weightCheckYn; 
		}
     	
     	if(inputVslCallId === '' && inputLorryNo === ''){
     		return null;
     	} 
     		
		var params = {
			searchType: 'YT',
			vslCallId: inputVslCallId,
			blNo: blNo,
			shipgNoteNo: shipgNoteNo,
			lorryNo: inputLorryNo,
			weightCheckYn: weightCheckYn
		}
 	    return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refLorryPopupHHTGridHHT');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
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