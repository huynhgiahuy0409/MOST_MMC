Ext.define('MOST.view.popup.EquipmentCdPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.equipmentcdpopup',	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('equipmentListPopup');
		
		var params = me.getSearchCondition();
		
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var params;
    	var store = me.getStore('equipmentListPopup');
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
		
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
		var recvData = me.getView().recvData
     	var eqDivCd = recvData.eqDivCd? recvData.eqDivCd : CodeConstants.MT_EQFCTPCD_TR;
		var eqFacNo = recvData.eqFacNo
		var params = {
			eqDivCd,
			eqFacNo,
			searchType: 'equipmentcode'
		}
		
    	return params;
	},
	
//	// Search Condition
//	getSearchCondition : function(){
//		var me = this;
//     	var refs = me.getReferences();
//     	var inputData = '';
//     	var store = me.getStore('equipmentListPopup');
//     	var getCdDescComboValue = '';
//     	var searchType = '';
//		var eqDivCdType = '';
//		var eqDivLcd = '';
//		var eqDivMcd = '';
//		
//		if(Ext.isClassic){
//			inputData = refs.txtEqDivCd.getValue();
//			getCdDescComboValue = refs.ctlCdNmCombo.getValue();
//		}else{
//			inputData = refs.txtEqDivCdHHT.getValue();
//	     	getCdDescComboValue = refs.refcomboTypeHHT.getValue();
//		}
//		
//		if(me.getView().recvData){
//			searchType = me.getView().recvData.searchType;
//			eqDivCdType = me.getView().recvData.eqDivCdType;
//			eqDivLcd = me.getView().recvData.eqDivLcd;
//			eqDivMcd = me.getView().recvData.eqDivMcd;
//		}
//		
//		if(searchType === '' && eqDivCdType === '' && eqDivLcd === '' && eqDivMcd === ''){
//			return null;
//		}
//		
//		if(searchType === 'EQNO'){
//			searchType = 'equipmentcode';
//			
//		} else {
//			searchType = 'equipmentcapa';
//		}
//     	
//		var params = {
////			scdLgv: eqDivLcd,
////			scdVal: eqDivMcd,
//			ptnrType: eqDivCdType,
//			searchType: searchType,
//			ptnrName: inputData,
//			reqType: getCdDescComboValue,
////			viewType: 'Single'
//		}
//		
//    	return params;
//	},
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
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refEquipmentListPopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var returnItem = {
			code : selection.data.capaDescr,
			item : selection
		}
		
		return returnItem;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/*
	 * HHT TABLET START 
	 * ===============================================================
	 * */
	
	onPopUpHHTSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('equipmentListPopup');
    	var filterCondition = refs.refcomboTypeHHT.getValue()
    	var filterValue = refs.txtEqDivCdHHT.getValue()

		store.clearFilter();
		store.commitChanges();
		store.filter(item => {
			const {eqFacNo, capaDescr} = item.data
			if(filterCondition === 'CODE'){
				return eqFacNo.includes(filterValue)
			}else{
				return capaDescr.includes(filterValue)
			}
		})		
	},
	
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnHHTData();
       	window.close();
	},
	
	// Returns the popup result.
	getReturnHHTData:function(){
		var me = this;
		var grid = me.lookupReference('refMechanicalEquipmentPopupHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		var returnItem = {
			code : selection.data.capaDescr,
//			codeName : selection.data.eqFacNm,
			item : selection
		}
		
		return returnItem;
	},
});