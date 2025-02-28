Ext.define('MOST.view.popup.ChassisPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.chassispopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refChassisListPopupGrid',
	MAIN_STORE_NAME: 'chassisListPopup',
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
		var refs = me.getReferences();
		var selection = refs.refChassisListPopupGrid.getSelection() == null ? null : refs.refChassisListPopupGrid.getSelection()[0];
		var window = me.getView().up('window');
		
		if(selection == null){
			return null
		}
		
		var returnItem = {
			code : selection.get("plateNo"),
			codeName : selection.get("plateNo"),
			item : selection
		}
		
		window.returnValue = returnItem;
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
			code : selection.data.plateNo,
			item : selectArray
		}
	
		return returnItem;
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
     		ptnrCode = me.getView().recvData.ptnrCd;
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
			plateNo: searchParm.get("plateNo")
		}
		
    	return params;
    	
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});