Ext.define('MOST.view.popup.MechanicalCdPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.mechanicalcdpopup',	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('mechanicalEquipmentComboStore');
		var eqDivCdType = '';
		var eqDivLcd = '';
		var eqDivMcd = '';
		
		if(me.getView().recvData){
			eqDivCdType = me.getView().recvData.eqDivCdType;
			eqDivLcd = me.getView().recvData.eqDivLcd;
			eqDivMcd = me.getView().recvData.eqDivMcd;
		}
		
		store.load({
			params:{
				// eqDivCd: eqDivCdType,
				scdLgv: "EQ",
				scdVal: "MC",
				searchType: 'mechanicalInitial',
				// viewType: 'Multi'
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			} 
		});
		
	},
	
	onSearchComboSelect: function(combo, value, obj){
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('mechanicalEquipmentListPopup');
    	var listGearStore = me.getStore('mechanicalEquipmentListGear');
    	
    	if(refs.ctlCdNmCombo.getValue() ==='GR'){
    		refs.ctlGearDescription.setHidden(false);
    		refs.ctlListGear.setHidden(false);
    		refs.btnSearch.setHidden(false);
			listGearStore.load();
    	}else{
    		refs.ctlGearDescription.setHidden(true);
    		refs.ctlListGear.setHidden(true);
    		refs.btnSearch.setHidden(true);
    		refs.ctlGearDescription.setValue('');
    	}
    	
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

	onGearSelect: function () {
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var store = me.getStore('mechanicalEquipmentListPopup');
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
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
     	var searchType = '';
		var eqDivLcd = '';
		var eqDivMcd = '';
		var eqDivCd;
		var searchValue = '';
		var gearCd = '';
		
		if(Ext.isClassic){
			eqDivCd = refs.ctlCdNmCombo.getValue();	
			if(refs.ctlCdNmCombo.getValue() ==='GR'){
				searchValue = refs.ctlGearDescription.getValue();
			}
			
		}else{
			eqDivCd = refs.refcomboType.getValue();
		}
		
    
		/*if(me.getView().recvData){
			searchType = me.getView().recvData.searchType;
			eqDivLcd = me.getView().recvData.eqDivLcd;
			eqDivMcd = me.getView().recvData.eqDivMcd;
			
		} else {
			return null;
		}*/
		
		if(searchType === '' && eqDivCd === '' && eqDivLcd === '' && eqDivMcd === ''){
			return null;	
		} 
		
		
		if(searchType === 'EQNO'){
			searchType = 'equipmentcode';
			
		} else {
			if(Ext.isClassic){
				if(refs.ctlCdNmCombo.getValue() ==='GR'){
					searchType = 'gearcode';
					gearCd = refs.ctlListGear.getValue();
				}else {
					searchType = 'equipmentcapa';
				}
			}else {
				if(refs.refcomboType.getValue() ==='GR'){
					searchType = 'gearcode';
				}else {
					searchType = 'equipmentcapa';
				}
			}
			
		}
     	
		var params = {
			ptnrType: eqDivCd,
			scdLgv: eqDivLcd,
			scdVal: eqDivMcd,
			searchType: searchType,
			ptnrName: searchValue,
			reqType: 'DESC',
			gearCd: gearCd,
			viewType: 'Multi'
		}
		
		return params;
		
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refMechanicalEquipmentListPopupGrid');
				
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		var returnItem = {
			code : selection.data.capaDescr,
			codeName : selection.data.eqFacNm,
			item : selection
		}
		
		return returnItem;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * EVENT POPUP HANDLER START
	 * =========================================================================================================================
	 */
	onPopupHHTLoad : function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('mechanicalEquipmentComboStore');
		var eqDivCdType = '';
		var eqDivLcd = '';
		var eqDivMcd = '';
		
		if(me.getView().recvData){
			eqDivCdType = me.getView().recvData.eqDivCdType;
			eqDivLcd = me.getView().recvData.eqDivLcd;
			eqDivMcd = me.getView().recvData.eqDivMcd;
		}
		
		store.load({
			params:{
				//eqDivCd: eqDivCdType,
				//scdLgv: eqDivLcd,
				//scdVal: eqDivMcd,
				scdLgv: "EQ",
				scdVal: "MC",
				searchType: 'mechanicalInitial',
				//viewType: 'Multi'
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			} 
		});
		
	},
	onCboEquipmentChangedHHT:function () {
		var me = this;
     	var refs = me.getReferences();
		var value = refs.refcomboType.getValue();
		var store = me.getStore('mechanicalEquipmentListPopup');
		if(me.getView().recvData.meqTab){
			store.clearFilter();
			store.filterBy((item)=>{
				return (item.data.eqDivCd === value || (value ==='' && me.isMEQdivCd(item)) || (value == null & me.isMEQdivCd(item)))
			})
		}
	},
	onPopUPHHTSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('mechanicalEquipmentListPopup');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
//					if(Ext.isModern)
//					{
//						if(me.getView().recvData.meqTab)
//						{
//							var storeMEQ = refs.refMechanicalEquipmentPopupHHTGrid.getStore();
//							storeMEQ.clearFilter();
//							storeMEQ.filterBy((item)=>{
//								return me.isMEQdivCd(item);
//							})
//						}
//					}
				}
			}
		});
	},
	isMEQdivCd: function(item){
		return item.data.eqDivCd =='CC'|| item.data.eqDivCd =='SC'|| item.data.eqDivCd =='EV'|| item.data.eqDivCd =='GR'|| item.data.eqDivCd =='SH'|| item.data.eqDivCd =='SL'
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
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectMechanicalEquipmentHHT'){//Select from JPVC:
			window.returnValue = me.getReturnDataHHT();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var grid = me.lookupReference('refMechanicalEquipmentPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.capaDescr,
//			codeName : selection.data.eqFacNm,
			item : selection
		}

    	window.returnValue = returnItem;
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	/**
	 * EVENT POPUP HANDLER END
	 * =========================================================================================================================
	 */
});