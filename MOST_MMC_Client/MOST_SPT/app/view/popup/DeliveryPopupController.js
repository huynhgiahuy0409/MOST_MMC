Ext.define('MOST.view.popup.DeliveryPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.deliverypopup',	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START	
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var initSearch = false;
		var store = me.getStore('deliveryList');
		var dataItem = this.getView().recvData.data;
//		var cargoStr = dataItem.data.cargoString;
		me.onSearch();
		
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('deliveryList');
//    	var params = me.getSearchCondition();
    	var params = null;
    	var deliveryStr = '';
//    	var deliveryStr  = me.getView().recvData.data.data.deliveryString;
//    	if(params == null){
//    		return;
//    	}
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						Ext.each(records, function(item){
//							if(deliveryStr.indexOf(item.data.cd)!==-1){
//								item.set({chkCdNm:1});
//							}
								
						});
						store.commitChanges();
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

	
	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var codes = refs.refCdtxt.getValue();
		var store = me.getStore('deliveryList');
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
	
	onSet: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('deliveryList');	
		var setChkCdNmValue = '';
		var cnt = 0;
		var storeTotal = store.totalCount;
		
		store.each(function(record,idx){
			if(record.data.chkCdNm === 1) {
				if(storeTotal > cnt ){
					if(setChkCdNmValue === ''){
						setChkCdNmValue = record.data.cd
					} else {
						setChkCdNmValue += "," + record.data.cd
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
		var store = me.getStore('deliveryList');
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