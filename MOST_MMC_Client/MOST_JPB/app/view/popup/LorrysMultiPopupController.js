Ext.define('MOST.view.popup.LorrysMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.lorrysmultipopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refLorryMultiListiPopupGrid',
	MAIN_STORE_NAME: 'lorryMultiListiPopup',
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
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.onSearch();
		
	},
	
	// Search Event Handler
	onSearch: function() {
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
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
       	window.close();
	},

	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		var selectArray = new Array();
		selectArray.push(selection.data);
		
		var returnItem = {
			code : selection.data.driverId,
			item : selectArray
		}
	
		return returnItem;
	},
	
	onUpdate: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);	
		var setChkPtyCdValue = '';
		var cnt = 0;
		var storeTotal = store.totalCount;
		var selectArray = new Array();
		
		store.each(function(record,idx){
			if(record.data.chkLorryMulti === 1) {
				if(storeTotal > cnt ){
					if(setChkPtyCdValue === ''){
						setChkPtyCdValue = record.get("lorryNo")
					} else {
						setChkPtyCdValue += "," + record.get("lorryNo")
					}
					selectArray.push(record.data);
				}
				cnt++;
			}
		});	
		
		var window = me.getView().up('window');
		var returnItem = {
			code : setChkPtyCdValue,
			item : selectArray
		}
		
    	window.returnValue = returnItem;
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
		var searchParm = me.getViewModel().get('theSearch');
     	var setPtnrCd = '';
     	var vslCallId ='';
     	var shipgNoteNo = '';
     	var blNo='';
     	
     	var splitPtnr = new Array();	
     	
     	if(me.getView().recvData){
     		ptnrCode = me.getView().recvData.ptnrCode;
			vslCallId: me.getView().recvData.vslCallId;
			shipgNoteNo: me.getView().recvData.shipgNoteNo;
			blNo:me.getView().recvData.blNo;
     		
     	} 
     	
     	if(!StringUtil.isNullorEmpty(ptnrCode)){
     		splitPtnr = ptnrCode.replace(/\s/gi, "").split(',');
     		if(splitPtnr.length > 0){
				for(var i = 0; i < splitPtnr.length; i++){
					if(setPtnrCd === ''){
						setPtnrCd = "'" + splitPtnr[i] + "'";
					} else {
						setPtnrCd += ",'" + splitPtnr[i] + "'";
					}
				}
     		}
     	}
     	
		var params = {
			tsptComp: setPtnrCd,
			vslCallId:vslCallId,
			shipgNoteNo:shipgNoteNo,
			blNo:blNo,
			lorryNo: searchParm.get("lorryNo"),
			lorryId: searchParm.get("lorryId")
		}
		
    	return params;
    	
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	onLorryMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var lorryMultiListiPopup = me.getStore(me.MAIN_STORE_NAME );
		var refs = me.getReferences();
		
		if (checked) {
			record.set({
				chkLorryMulti: 1
			});
		} else {
            record.set({
            	chkLorryMulti: 0
            });
		}
		
		lorryMultiListiPopup.commitChanges();
	},
	
	onLorryAllCheck: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(chk){
			store.each(function(record){
				if(record.data.chkLorryMulti === 0){
					record.set({
						chkLorryMulti: 1
					});
				} else {
					record.set({
						chkLorryMulti: 0
					});
				}
			});
		} else {
			store.clearFilter();
		}
		
		store.commitChanges();
	}
	
});