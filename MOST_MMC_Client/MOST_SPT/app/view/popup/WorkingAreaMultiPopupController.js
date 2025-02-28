Ext.define('MOST.view.popup.WorkingAreaMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.workingareamultipopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	AREA_WHS : 'WHS',
	AREA_HATCH : 'HTC',
	AREA_WHARF : 'WRF',
	AREA_EDIBLE : 'EDJ',
	AREA_NON_EDIBLE : 'NDJ',
	AREA_OTHERS : 'OTH',
	LOC_CD : 'BBT',
	WHARF : 'Wharf',
	MAX_HATCH_NO : 11,	// Hatch Setting
	
	COMMONCODE_LIST_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/cmmcdpopupmultiselect/',
	LOCATION_LIST_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/locationCodeList',
	
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
		var commonCodeList = me.getStore('commonCodeList');
		
		commonCodeList.load({
			params: {
				searchType: 'COMM',
				lcd: CodeConstants.LCD_MOST,
				mcd: CodeConstants.MCD_MT_LOCDIV1
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
        me.onSetWorkingArea(me.getView().recvData);
	},
	
	onSetWorkingArea: function(workingAreaType){
		var me = this;
		var refs = me.getReferences();
		
		if(workingAreaType){
			refs.ctlCategory.setValue(workingAreaType);
			refs.ctlCategory.setReadOnly(true);
		}else{
			refs.ctlCategory.setValue('');
			refs.ctlCategory.setReadOnly(false);
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
				codeName: 'H' + (i+1),
				code: 'H' + (i+1)
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
						setChkCdNmValue = 'Wharf(' + record.data.code;
					} else {
						setChkCdNmValue = record.data.code;
					}
					
				} else {
					setChkCdNmValue += "," + record.data.code;
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

	getReturnData:function(){
		var me = this;
		var refs = me.getReferences();
		var getWharfCheckValue = refs.refWharfCheck.getValue();
		var store = me.getStore('workingAreaMultiList');
		var storeTotal = store.totalCount;
		var codes = refs.txtSetCds.getValue();
		var cnt = 0;
		var selectCmmCdArray = new Array();
		
		if(!getWharfCheckValue){
			if(codes === ''){
				if(storeTotal > 0){
					store.each(function(record,idx){
						if(record.data.chk === 1) {
							if(storeTotal > cnt ){
								record.set('chk', 0);
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
						if(record.data.chk === 1) {
							if(storeTotal > cnt ){
								selectCmmCdArray.push(record.data);
							}
							
							cnt++;
						}
					});
				}
			}
		}
		
		var returnItem = {
			code : codes,
			item: selectCmmCdArray
		}
		
		return returnItem;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});