Ext.define('MOST.view.popup.CMMCdPopupMultiSelectController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.cmmcdpopupmultiselect',	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCommonCodePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commonCodeMultiSelect',
	CODE_NAME_STORE: 'commonCodePopupSearchCombo',
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
		var ptnrTypeCombo = me.getStore('ptnrTypeComboStore');
		var codeNameCombo = me.getStore('codeNameComboStore');
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.CODE_NAME_COMBOBOX, me.CODE_NAME_STORE);
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.onSearch();
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
					me.onCheck();
				}
			}
		});
	},
	
	onCheck: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		dataField = me.getView().recvData.dataField;
		
		if (!StringUtil.isNullorEmpty(dataField)){
			var selected = new Array();
			selected = dataField.split(",")
           for (var j = 0; j < selected.length; j++){
				grid.getStore().each(function(rec){
						if(selected[j] == rec.get('code')){
							rec.set('chkLorryMulti',1);
							rec.set('chkMulti',1);
							store.commitChanges();
						}
				});
		    }
        }
	},
	
	onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
       	window.close();
	},

	onMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var refs = me.getReferences();
		
		if (checked) {
			record.set({
				chkMulti: 1
			});
		} else {
            record.set({
            	chkMulti: 0
            });
		}
		
		store.commitChanges();
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
			if(record.data.chkMulti === 1) {
				if(storeTotal > cnt ){
					if(setChkPtyCdValue === ''){
						setChkPtyCdValue = record.data.code
					} else {
						setChkPtyCdValue += "," + record.data.code
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
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection;
		
		if(grid){
			selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		}
		
		var returnItem = {
			code : selection.data.code,
			codeName : selection.data.codeName,
			item : selection
		}
		
		return returnItem;
	},
	
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	
     	var getCtlCdNmCombo = refs.ctlCdNmCombo.getValue();
     	var getSearchCommonCdNm = refs.txtSearchCommonCdNm.getValue();
     	
     	var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
     	
     	if(me.getView().recvData){
     		searchParm.set("lcd",me.getView().recvData.lcd);
     		searchParm.set("mcd",me.getView().recvData.mcd);
     		searchParm.set("searchType",me.getView().recvData.searchType);
     	} else {
     		return null;
     	}
     	
     	if(getCtlCdNmCombo === 'CD'){
     		searchParm.set("scd",getSearchCommonCdNm);
     		searchParm.set("commGrpCd",getSearchCommonCdNm);
     		searchParm.set("commCd",getSearchCommonCdNm);
     	} else {
     		searchParm.set("scdNm",getSearchCommonCdNm);
     		searchParm.set("commGrpNm",getSearchCommonCdNm);
     		searchParm.set("commNm",getSearchCommonCdNm);
     	}
		
		var params = {
			lcd: searchParm.get("lcd"),
			mcd: searchParm.get("mcd"),
			scd: searchParm.get("scd"),
			scdNm: searchParm.get("scdNm"),
			searchType: searchParm.get("searchType"),
			commGrpCd: searchParm.get("commGrpCd"),
			commGrpNm: searchParm.get("commGrpNm"),
			commCd: searchParm.get("commCd"),
			commNm: searchParm.get("commNm"),
			reqType: getCtlCdNmCombo
		}
		
    	return params;
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});