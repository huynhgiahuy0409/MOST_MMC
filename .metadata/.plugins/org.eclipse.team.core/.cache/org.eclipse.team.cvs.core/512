Ext.define('MOST.view.popup.CargoTypePopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.cargotypepopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCommonCodeForMultiPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'cargoList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var initSearch = false;
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.onSearch();
		
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
     	var cargoStr  = me.getView().recvData.data;
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
     	refs.refCdtxt.setValue(cargoStr);
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						Ext.each(records, function(item){
							if(cargoStr.indexOf(item.data.code)!==-1){
								item.set({chkCdNm:1});
							}
								
						});
						store.commitChanges();
					}
				}
			}
		});
	},
	
	onSet: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
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
		refs.refCdtxt.setValue(setChkCdNmValue);
	},
	
	onClear: function(){
		var me = this;
		var refs = me.getReferences();
		refs.refCdtxt.setValue("");
	},
	
	onCommonCodeForMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
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
	},
	

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
     	
     	var params = {
     		lcd :CodeConstants.LCD_MOST,
     		mcd:CodeConstants.MCD_MT_CGTP
     	};
     	
    	return params;
	},
	
	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var codes = refs.refCdtxt.getValue();
		var store = me.getStore(me.MAIN_STORE_NAME);
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
			refs.refCdtxt.setValue('');
		} else {
			if(storeTotal > 0){
				var n = 0
				store.each(function(record){
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
	
});