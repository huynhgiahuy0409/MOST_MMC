Ext.define('MOST.view.popup.PartnerCdTypePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.partnercdtypepopup',	
	searchType: '',
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPayerCdTypePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'ptnrListPopupStore',	
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
		var ptnrTypeCombo = me.getStore('ptnrTypeComboStore');
		var codeNameCombo = me.getStore('codeNameComboStore');
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		ptnrTypeCombo.load();
		
//		me.onSearch();
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
					if (records.length > 0) {
					}
				}
			}
		});
	},

	setComboStore: function(metaItem){
		var me = this;
		var refs = me.getReferences();
		var payerTypeCombo = me.getStore('payerTypeCombo');
		var searchScreen = me.getView().recvData.searchScreen;
		if (searchScreen != 'WHReconciliation') {
			if(metaItem.partnerCodeType){
				payerTypeCombo.setData(metaItem.partnerCodeType);
				payerTypeCombo.insert(0, [{engPtyNm: 'Select',ptyCd: ''}]);
			}
		}
		
		if(Ext.isClassic){
			if(searchScreen != undefined && searchScreen =='VSRCheckList'){
	     		refs.ctlPtnrTypeCombo.setValue(CodeConstants.CM_PTNRTP_CTT);
	     		refs.ctlPtnrTypeCombo.setDisabled(true);
	     	}else{
	     		refs.ctlPtnrTypeCombo.setDisabled(false);
	     	}	
		}else{
			if(searchScreen != undefined && searchScreen =='VSRCheckList'){
	     		refs.refPayerTypeCombo.setValue(CodeConstants.CM_PTNRTP_CTT);
	     		refs.refPayerTypeCombo.setDisabled(true);
	     	}else{
	     		refs.refPayerTypeCombo.setValue('');
	     		refs.refPayerTypeCombo.setDisabled(false);
	     	}	
		}
	},
	
	setDetailTabControl: function(metaItem){
		var me = this;
		var refs = me.getReferences();
		var payerTypeCodeTypeList = me.getStore('payerTypeCodeTypeList');
		
		if(Ext.isClassic){
			if(metaItem.partnerCodeTypeList){
				payerTypeCodeTypeList.setData(metaItem.partnerCodeTypeList);
				payerTypeCodeTypeList.commitChanges();
			}
		}else{
			if(metaItem.partnerCodeTypeList){
				payerTypeCodeTypeList.setData(metaItem.partnerCodeTypeList);
				payerTypeCodeTypeList.commitChanges();
			}else if(metaItem.shippingAgentCodeTypeList){
				payerTypeCodeTypeList.setData(metaItem.shippingAgentCodeTypeList);
				payerTypeCodeTypeList.commitChanges();
			}
		}
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
     	var searchModule = '';
    	var searchScreen = '';
    	var searchType='';
    	var searchKey = '';
    	
//     	if(me.getView().recvData.ptnrType){
//     		searchParm.set("ptnrType",me.getView().recvData.ptnrType);
//     		refs.ctlPtnrTypeCombo.setValue(me.getView().recvData.ptnrType);
//     		refs.ctlPtnrTypeCombo.setDisabled(true);
//     	}
     	
     	if(Ext.isClassic){
     		searchKey = refs.txtPayerCdNm.getValue();
     		searchParm.set("ptnrType",refs.ctlPtnrTypeCombo.getValue());
     		searchParm.set("reqType",refs.ctlCdNmCombo.getValue());
     		
     	}else{
     		searchKey = refs.refPayerCdNm.getValue();
     		searchParm.set("ptnrType",me.getView().recvData.ptyCd);
     		searchParm.set("reqType",refs.refPayerCdNmCombo.getValue());
     	}
     	
     	if(searchParm.get("reqType") == "CD"){
     		searchParm.set("ptnrCode",searchKey);
     	}else{
     		searchParm.set("ptnrName",searchKey);
     	}
     	
		if(searchParm.get("ptnrType") == undefined || searchParm.get("ptnrType")==""){
			searchParm.set("defaultPtnrCodeYn","Y");
		}
     	
     	var params = {
 			ptnrCode: searchParm.get("ptnrCode"),
 			ptnrName: searchParm.get("ptnrName"),
			ptnrType: searchParm.get("ptnrType"),
			reqType: searchParm.get("reqType"),
			defaultPtnrCodeYn: searchParm.get("defaultPtnrCodeYn")
 		};
     	
     	return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refPayerCdTypePopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var returnItem = {
			code : selection.data.ptnrCode,
			codeName : selection.data.ptnrName,
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
	// Search Event Handler
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
		var ptyCd = me.getView().recvData.ptyCd;
		var ptyDivCd = me.getView().recvData.ptyDivCd;
		if(ptyCd)
		{
			refs.refPayerCdNm.setValue(ptyCd);
		}
     	var comboStore = me.getStore('payerCdTypeComboPopupModelStore');
     	
    	comboStore.load({
			params: {
//				searchType: 'HHT_PartnerCodeType',
				searchModule: 'MT'
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
//						me.setComboStore(records[0].data);
//						if (ptyDivCd) {
//							refs.refPayerTypeCombo.setValue(ptyDivCd);
//							refs.refPayerTypeCombo.setDisabled(true);
//						}
					}
				}
			}
		});

	},
	
	// Search Event Handler
	onHHTSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var gridStore = me.getStore(me.MAIN_STORE_NAME);
    	var engPtyNm = refs.refPayerCdNm.getValue();
     	var getPtyDivCd = refs.refPayerTypeCombo.getValue();
 		var getCdNmComboValue = refs.refPayerCdNmCombo.getValue();	
		

    	gridStore.load({
			params: {
//				searchType: 'HHT_PartnerCodeList',
//				searchModule: 'MT',
				ptnrType : getPtyDivCd,
				ptnrName : engPtyNm,
				reqType : getCdNmComboValue
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
//						me.setDetailTabControl(records[0].data);
					}
				}
			}
		});
	},

	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getHHTReturnData();
       	window.close();
	},
	
	
	// Returns the popup result.
	getHHTReturnData:function(){
		var me = this;
		var selection;
		var grid = me.lookupReference('refReqeusterPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		var returnItem = {
			code : selection.data.ptyCd,
			codeName : selection.data.engPtyNm,
			item : selection
		}
		
		return returnItem;
	},
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectRequestHHT'){//Select from WorkingArea popup:
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
		
		var grid = me.lookupReference('refReqeusterPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.ptnrCode,
			codeName : selection.data.ptnrName,
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