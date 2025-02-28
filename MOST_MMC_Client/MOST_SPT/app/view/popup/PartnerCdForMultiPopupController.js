Ext.define('MOST.view.popup.PartnerCdForMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.partnercdformultipopup',	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTransporterCdTypePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'partnerCdForMultiList',	
	COMBO_BOX_STORE: 'partnerCdForMultiCdNmCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
    	var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		me.setSearchParm(searchParm);
		
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.CODE_NAME_COMBOBOX, me.COMBO_BOX_STORE);
		
		me.updateViewStyle(me.getView());
		
		searchParm.set("reqType","CD");
		searchParm.set('progress', 'N');
		
		me.onSearch();
		
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var settingCds = '';
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(me.getView().codeValue){
							var strSplit = me.getView().codeValue.replace(/\s/gi, "").split(',');
							if(strSplit.length > 0){
								for(var i = 0; i < strSplit.length; i++){
									record = store.findRecord('ptnrCode', strSplit[i]);
									
									if(record){
										record.set('chkTransportCd', 1);
										if(settingCds === ''){
											settingCds = record.data.ptnrCode;
										} else {
											settingCds += "," + record.data.ptnrCode;
										}
										
									}
								}
								store.commitChanges();
								refs.txtPtyCds.setValue(settingCds);
							}
						}
					}
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
	getSearchCondition: function(){
		var me = this;
     	var refs = me.getReferences();
     	var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
    	var searchKey = '';
    	
     	if(me.getView().recvData){
     		searchParm.set("ptnrType",me.getView().recvData.ptnrType);
     	}
    	
    	searchParm.set("reqType",refs.ctlCdNmCombo.getValue());
    	searchKey = refs.txtSearchKey.getValue();
    	
     	if(searchParm.get("reqType") == "CD"){
     		searchParm.set("ptnrCode",searchKey);
     		searchParm.set("ptnrName","");
     	}else{
     		searchParm.set("ptnrCode","");
     		searchParm.set("ptnrName",searchKey);
     	}
     	
     	var params = {
     			ptnrCode: searchParm.get("ptnrCode"),
     			ptnrName: searchParm.get("ptnrName"),
     			ptnrType: searchParm.get("ptnrType"),
    			reqType: searchParm.get("reqType")
     	};
     	
     	return params;
		
	},
	
	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var getValue = me.lookupReference('txtPtyCds');
		
		var codes = refs.txtPtyCds.getValue();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var cnt = 0;
		var storeTotal = store.totalCount;
		var selectArray = new Array();
		
		if(codes === ''){
			if(storeTotal > 0){
				store.each(function(record,idx){
					if(record.data.chkTransportCd === 1) {
						if(storeTotal > cnt ){
							record.set('chkTransportCd', 0);
						}
						cnt++;
					}
				});
			}
			store.commitChanges();
			refs.txtPtyCds.setValue('');
			
		} else {
			if(storeTotal > 0){
				store.each(function(record,idx){
					if(record.data.chkTransportCd === 1) {
						if(storeTotal > cnt ){
							selectArray.push(record.data);
						}
						cnt++;
					}
				});
			}
		}
			
		var returnItem = {
			code : getValue.getValue(),
			item: selectArray
		}
		return returnItem;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	onSet: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);	
		var setChkPtyCdValue = '';
		var cnt = 0;
		var storeTotal = store.totalCount;
		
		store.each(function(record,idx){
			if(record.data.chkTransportCd === 1) {
				if(storeTotal > cnt ){
					if(setChkPtyCdValue === ''){
						setChkPtyCdValue = record.data.ptnrCode
					} else {
						setChkPtyCdValue += "," + record.data.ptnrCode
					}
				}
				cnt++;
			}
		});
		refs.txtPtyCds.setValue(setChkPtyCdValue);
	},
	
	onClear: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.txtPtyCds.setValue("");
	},
	
	onCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var refs = me.getReferences();
		
		if (checked) {
			record.set({
				chkTransportCd: 1
			});
		} else {
            record.set({
            	chkTransportCd: 0
            });
		}
		store.commitChanges();
	},
	
	onUpdate: function(){
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
       	window.close();
	}
	
});