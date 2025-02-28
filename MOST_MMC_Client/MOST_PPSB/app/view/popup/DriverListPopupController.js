Ext.define('MOST.view.popup.DriverListPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.driverlistpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDriverListPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'driverListPopup',	
	COMBO_BOX_STORE :'driverListPopupSearchCombo',
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
		var searchType = me.getView().recvData.searchType;
		
		searchParm.set("reqType","NM");
		searchParm.set("searchType",me.getView().recvData.searchType);
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.CODE_NAME_COMBOBOX, me.COMBO_BOX_STORE);
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		// me.onSearch();		
		
	},
	
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
					//2407100808 Remove duplicate drivers in the gate for RORO popup
					const uniqueDriver = [];
					records.sort((a, b) => a.get('driverId') - b.get('driverId'));
					for (let i = 0; i < records.length; i++) {
						if (i === 0 || records[i].get('driverId') !== records[i - 1].get('driverId')) {
							if(records[i].get('driverId') && records[i].get('driverId') != "") {
								uniqueDriver.push(records[i]);
							}							
						}
					}
					store.setData(uniqueDriver);
				}
			}
		});
	},
	
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var getCtlCdNmCombo;
     	var getSearchCommonCdNm;
     	
     	var searchCommonCd = '';
     	var searchCommonNm = '';
     	var setPtnrCd ='';
 		var ptnrCode ='';
		var vslCallId =''
		var shipgNoteNo=''
		var blNo='';
		
 		getCtlCdNmCombo = refs.ctlCdNmCombo.getValue();
     	getSearchCommonCdNm = refs.txtSearchCommonCdNm.getValue();
     		
     	if(me.getView().recvData){
     		ptnrCode = me.getView().recvData.ptnrCode;
			vslCallId = me.getView().recvData.vslCallId;
			shipgNoteNo = me.getView().recvData.shipgNoteNo;
			blNo = me.getView().recvData.blNo;
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
     	
     	if(getCtlCdNmCombo === 'CD'){
     		searchCommonCd = getSearchCommonCdNm;
     		searchCommonNm ="";
     		
     	} else {
     		searchCommonCd ="";
     		searchCommonNm = getSearchCommonCdNm;
     	}
		
     	var params = {
     		tsptComp: setPtnrCd,
			vslCallId:vslCallId,
			shipgNoteNo:shipgNoteNo,
			blNo:blNo,
			driverId: searchCommonCd,
			driverName: searchCommonNm,
			cgTpCd : me.getView().recvData.cgTpCd,
			codeType : me.getView().recvData.codeType
		}
     	
    	return params;
	},
	

	onDblClick: function() {
    	var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var window = me.getView().up('window');
		
		if(selection == null){
			return null;
		}
		
		var returnItem = {
			code : selection.get("driverId"),
			codeName : selection.get("driverName"),
			item : selection
		}
		
		window.returnValue = returnItem;
		window.close();
	}

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	
});
