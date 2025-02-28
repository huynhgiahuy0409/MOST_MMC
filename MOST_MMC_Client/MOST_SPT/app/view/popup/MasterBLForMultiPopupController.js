Ext.define('MOST.view.popup.MasterBLForMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.masterblformultipopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCommonCodeForMultiPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commonCodeMulti',	
	COMBO_STORE_NAME: 'codeMasterListCommodityCombo',
	CODE_NAME_STORE: 'codeNameCombo',
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
		var comboStore = me.getStore(me.COMBO_STORE_NAME);
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.CODE_NAME_COMBOBOX, me.CODE_NAME_STORE);
		
		comboStore.load({
			callback: function(records, operation, success) {
				if (success) {
					if(me.getView().recvData){
						refs.ctlVslCallId.setValue(me.getView().recvData.vslCallId);
						searchDivCd = me.getView().recvData.searchDivCd;	
						initSearch = me.getView().recvData.initSearch;
						me.onSearch();
					}
					
					if(me.getView().codeValue){
						refs.txtSetCds.setValue(me.getView().codeValue);
						me.onSearch();
					}
					
					if(initSearch && !StringUtil.isNullorEmpty(searchDivCd)){
						me.onSearch();
					}
				}
			}
		});
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME );
    	var record = Ext.create('MOST.model.popup.PopupService');
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
									record = store.findRecord('code', strSplit[i]);
									if(record){
										record.set('chkCdNm', 1);
										if(settingCds === ''){
											settingCds = record.data.code;
										} else {
											settingCds += "," + record.data.code;
										}
									}
								}
								
								store.commitChanges();
								refs.txtSetCds.setValue(settingCds);
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
     	var inputSearch = refs.txtCargoTypeSearch.getValue();
     	var getCdNmCombo  = refs.ctlCdNmCombo.getValue();
     	var cargoType = refs.ctlCargoType.getValue();
     	var searchDivCd = '';
     	var searchTp = '';
     	var scd ='';
     	var scdNm = '';
     
     	if(me.getView().recvData){
     		vslCallId = me.getView().recvData.vslCallId;
     		searchDivCd = me.getView().recvData.searchDivCd;
     	} else {
     		return null;
     	}
     	
     	if(searchDivCd != ''){
 			if(getCdNmCombo === 'CD'){
         		scd = inputSearch;
         	} else {
         		scdNm = inputSearch;
         	}
         	searchTp = searchDivCd;  	
    		var params = {
				vslCallId: vslCallId,
    			searchType: "MFBL",
    			codeType:cargoType,
    			reqType:getCdNmCombo,
    			scd: scd,
    			scdNm: scdNm
    		}
    		
        	return params;
    		
 		} else {
 			return null;
 		}
	},
	
	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var codes = refs.txtSetCds.getValue();
		var store = me.getStore(me.MAIN_STORE_NAME );
		var storeTotal = store.totalCount;
		var cnt = 0;
		var selectCmmCdArray = new Array();
		
    	if(codes === ''){
			if(storeTotal > 0){
				store.each(function(record,idx){
					if(record.data.chkCdNm === 1) {
						if(storeTotal > cnt ){
							record.set('chkCdNm', 0);
						}
						cnt++;
					}
				});
			}
			store.commitChanges();
			refs.txtSetCds.setValue('');
		} else {
			if(storeTotal > 0){
				store.each(function(record,idx){
					if(record.data.chkCdNm === 1) {
						if(storeTotal > cnt ){
							selectCmmCdArray.push(record.data);
						}
						cnt++;
					}
				});
			}
		}
    	
		var returnItem = {
			code : codes,
			item: selectCmmCdArray
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
		var store = me.getStore(me.MAIN_STORE_NAME );	
		var setChkCdNmValue = '';
		var cnt = 0;
		var storeTotal = store.totalCount;
		
		store.each(function(record,idx){
			if(record.data.chkCdNm === 1) {
				if(storeTotal > cnt ){
					if(setChkCdNmValue === ''){
						setChkCdNmValue = record.data.code
					} else {
						setChkCdNmValue += "," + record.data.code
					}
				}
				cnt++;
			}
		});
		
		refs.txtSetCds.setValue(setChkCdNmValue);
	},
	
	onClear: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.txtSetCds.setValue("");
	},
	
	onCommonCodeForMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME );
		var refs = me.getReferences();
		
		if (checked) {
			record.set({
				chkCdNm: 1
			});
		} else {
            record.set({
            	chkCdNm: 0
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