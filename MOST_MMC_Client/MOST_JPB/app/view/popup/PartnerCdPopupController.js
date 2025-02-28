Ext.define('MOST.view.popup.PartnerCdPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.partnercdpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPartnerCdPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'partnerCdPopupStore',	
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
		
		me.onSearch();
		
	},
	
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
     	var store = me.getStore(me.MAIN_STORE_NAME);
     	var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
    	var searchType='';
    	var searchKey = '';
     	
    	if(me.getView().recvData){
			var ptnrType = me.getView().recvData.searchPtyDivCd ? me.getView().recvData.searchPtyDivCd : me.getView().recvData.ptnrType;
     		searchParm.set("ptnrType", ptnrType);
     	}
     	
 		searchParm.set("reqType",refs.ctlCdNmCombo.getValue());
	     	
     	if(searchParm.get("reqType") === 'CD'){
     		searchParm.set("ptnrCode",refs.txtPtyCd.getValue());
     	} else {
     		searchParm.set("ptnrName",refs.txtPtyCd.getValue());
     	}
     	
     	var params = {
 			ptnrCode: searchParm.get("ptnrCode"),
 			ptnrName: searchParm.get("ptnrName"),
			ptnrType: searchParm.get("ptnrType"),
			reqType: searchParm.get("reqType")
     	};
         	
        return params;
			
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var gridLight = me.lookupReference('refPartnerCdForGridPopupGrid');
		var selection;
		
		if(grid){
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		} else {
			selection = gridLight.getSelection() == null ? null : gridLight.getSelection()[0];
		}
		
		var returnItem = {
			code : selection.data.ptnrCode,
			codeName : selection.data.ptnrName,
			item : selection
		}
		
		return returnItem;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});