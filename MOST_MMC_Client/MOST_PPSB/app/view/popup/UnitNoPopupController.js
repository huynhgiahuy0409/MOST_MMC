Ext.define('MOST.view.popup.UnitNoPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.unitnopopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refUnitNoPopupGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'unitNoList',			// Main Store Name
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
		var store = this.getStore(me.MAIN_STORE_NAME);
    	var recvData = me.getView().recvData;
    	
		store.load({
			params: {
				vslCallId: recvData.vslCallId,
				docNo: recvData.docNo,
				ie: recvData.ie,
				cdNm: refs.refUnitNo.getValue()
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	onUpdate: function(){
		var me = this;
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.MAIN_STORE_NAME);
		var setChkValue = '';
		
		store.each(function(record,idx){
			if(record.data.itChk) {
				if(setChkValue === ''){
					setChkValue = record.data.cd;
				} else {
					setChkValue += "," + record.data.cd;
				}
			}
		});
		
		return setChkValue;
	},
	
	onChecked : function (model, record, index, eOpts) {
		if(record.data.itChk){
			record.data.itChk=false;
		}
		else{
			record.data.itChk=true;
		}
    },
    
	onCategoryChange: function(obj,newVal,oldVal, index){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('workingAreaMultiList');
		var proxyPath;
		var params;
		
		if (newVal=='' || newVal ==null){
			store.removeAll();
			store.commitChanges();
			return;
		}
			
		if(newVal === me.AREA_WHARF || newVal === me.AREA_EDIBLE || newVal === me.AREA_NON_EDIBLE){
			params = me.getSearchBerthLocList();
			proxyPath = me.LOCATION_LIST_PROXY_URL;
		} else if (newVal === me.AREA_WHS){
			params = me.getSearchWhsLocList();
			proxyPath = me.COMMONCODE_LIST_PROXY_URL;
		} else if (newVal === me.AREA_OTHERS){
			params = me.getSearchOthersList();
			proxyPath = me.COMMONCODE_LIST_PROXY_URL;
		} else {
			params = me.getSearchLocDefList();
			proxyPath = me.LOCATION_LIST_PROXY_URL;
		}
		
		if(params === null){
			return;
		}
		
		store.getProxy().url = proxyPath;
		
		if(newVal === me.AREA_HATCH){
			me.onHatchDataSet();
		} else {
			store.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		}
	},
	
	onWharfCheck: function(chk,newVal,oldVal, index){
		var me = this;
		var refs = me.getReferences();
		
		if(newVal){
			refs.ctlCategory.setEditable(false);
			refs.ctlCategory.setDisabled(true);
			refs.ctlCategory.setValue(me.AREA_HATCH);
			
		} else {
			refs.ctlCategory.setEditable(true);
			refs.ctlCategory.setDisabled(false);
			refs.ctlCategory.setValue('WRF');
		}
		
		me.onHatchDataSet();
	},
	
	onHatchDataSet: function(){
		var me = this;
		var store = me.getStore('workingAreaMultiList');
		
		store.removeAll();
		store.commitChanges();
		
		for(var i = 0; i < me.MAX_HATCH_NO; i++){
			store.insert(i, [{
				cdNm: 'H' + (i+1),
				cd: 'H' + (i+1)
			}])
		}
		
		store.commitChanges();
	},
	
	onSet: function(){
		var me = this;
		var refs = me.getReferences();
		var getWharfCheckValue = refs.refWharfCheck.getValue();
		var store = me.getStore('workingAreaMultiList');	
		var setChkCdNmValue = '';
		var cnt = 0;
		
		store.each(function(record,idx){
			if(record.data.chk === 1) {
				if(setChkCdNmValue === ''){
					if(getWharfCheckValue){
						setChkCdNmValue = 'Wharf(' + record.data.cd;
					} else {
						setChkCdNmValue = record.data.cd;
					}
					
				} else {
					setChkCdNmValue += "," + record.data.cd;
				}
			}
		});
		
		if(getWharfCheckValue && setChkCdNmValue != ''){
			setChkCdNmValue += ')';
		}
		
		refs.txtSetCds.setValue(setChkCdNmValue);
	},
	
	onClear: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.txtSetCds.setValue("");
	},
	
	onWorkingAreaMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore('workingAreaMultiList');
		var refs = me.getReferences();
		
		if (checked) {
			record.set({
				chk: 1
			});
		} else {
            record.set({
            	chk: 0
            });
		}
		
		store.commitChanges();
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	getSearchBerthLocList: function(){
		var me = this;
     	var refs = me.getReferences();
     	var ctlCategory = refs.ctlCategory.getValue();
		var params = {
			locCd: me.LOC_CD,
			berthTp: ctlCategory,
			searchType: 'BerthLoc'
		}
    		
        return params;
	},
	
	getSearchWhsLocList: function(){
		var me = this;
     	var refs = me.getReferences();
     	var ctlCategory = refs.ctlCategory.getValue();
		var params = {
			divCd: ctlCategory,
			lcd: CodeConstants.LCD_MOST,
			searchType: 'COMM'
		}
    		
        return params;
	},
	
	getSearchOthersList: function(){
		var me = this;
     	var refs = me.getReferences();
     	var ctlCategory = refs.ctlCategory.getValue();
		var params = {
			divCd: ctlCategory,
			lcd: CodeConstants.LCD_MOST,
			searchType: 'COMM'
		}
    		
        return params;
	},
	
	getSearchLocDefList: function(){
		var me = this;
     	var refs = me.getReferences();
     	var ctlCategory = refs.ctlCategory.getValue();
		var params = {
			locDivCd: ctlCategory,
			searchType: 'LocDef'
		}
    		
        return params;
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});