Ext.define('MOST.view.popup.PartnerCdForGridPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.partnercdforgridpopup',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchPtyDivCd = '';
		
		if(me.getView().recvData){
			searchPtyDivCd = me.getView().recvData.searchPtyDivCd;
		}
		
		if(searchPtyDivCd != null && searchPtyDivCd != ''){
			me.onSearch();
		} 
		
	},
	
	// Search Event Handler
	onSearch: function(paramPtyDivCd) {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('partnerCdPopupStore');
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
     	var inputPtyCd = refs.txtPtyCd.getValue();
     	var store = me.getStore('partnerCdPopupStore');
     	var getCdNmComboValue = refs.ctlCdNmCombo.getValue();
     	var searchPtyDivCd = '';
     	var ptnrCode = '';
     	var engPtyNm = '';
     	
     	if(me.getView().recvData){
			searchPtyDivCd = me.getView().recvData.searchPtyDivCd;
			
		} else {
			return null;
		}
     	
     	if(searchPtyDivCd != ''){
			if(getCdNmComboValue === 'CD'){
				ptnrCode = inputPtyCd;
	     		
	     	} else {
	     		engPtyNm = inputPtyCd;
	     	}
	     	
			var params = {
				ptnrCode: ptnrCode,
				engPtyNm: engPtyNm,
				ptyDivCd: searchPtyDivCd,
				reqType: getCdNmComboValue
			}
			
	    	return params;
			
		} else {
			return null;
		}
     	
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refPartnerCdPopupGrid');
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