Ext.define('MOST.view.popup.AssignedExternalTruckListPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.assignedexternaltrucklistpopuphht',
	
	/*
	 * CONSTANTS
	 * */
	MAIN_STORE_NAME: 'assignmentTruckListPopup',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		
		me.getView().up('window').setTitle(recvData.title);
		me.onSearch();
	},
	
	// Search Event Handler
	onSearch : function() {
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		store.load({
			params: params, 
			callback: function(records, operation, success) {
				if (records.length <= 0) {
					
				}
			}
		});
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
     	var inputLorryNo = refs.txtLorryNoId.getValue();

     	var vslCallId = '';
     	var lorryNo = '';
     	if(me.getView().recvData){
     		vslCallId = me.getView().recvData.vslCallId;
     		lorryNo = me.getView().recvData.lorryNo;
     		site = me.getView().recvData.site;
     	} else {
     		return null;
     	}
     	
		var params = {
			lorryNo: (inputLorryNo != '' ? inputLorryNo : lorryNo),
			vslCallId: vslCallId,
			site
		}
		
    	return params;
		
	},
	
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnDataHHT();
       	window.close();
	},

	onSelectDataHHT: function(ref){
		var me = this;
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectHHT'){//Select from WorkingArea popup:
			window.returnValue = me.getReturnDataHHT();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getReturnDataHHT:function(){
		var me = this;
		var grid = me.lookupReference('refAssignmentLorrysPopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		var returnItem = {
			code : selection.data.lorryNo,
			codeName : selection.data.cdNm,
			item : selection
		}
		
		return returnItem;
	},

	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});