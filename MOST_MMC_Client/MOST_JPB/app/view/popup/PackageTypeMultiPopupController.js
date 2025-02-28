Ext.define('MOST.view.popup.PackageTypeMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.packagetypemultipopup',	
	
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
	
	COMMONCODE_LIST_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/commonCodeList/',
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
		me.onSearch();
	},
	
	onSet: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('packageTypeMultiList');	
		var setChkCdNmValue = '';
		var cnt = 0;
		
		store.each(function(record,idx){
			if(record.data.chk === 1) {
				if(setChkCdNmValue === ''){					
					setChkCdNmValue = record.data.scd;
				} else {
					setChkCdNmValue += "," + record.data.scd;
				}
			}
		});	
		refs.txtSetCds.setValue(setChkCdNmValue);
	},
	
	onClear: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.txtSetCds.setValue("");
	},
	
	onPackageTypeMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore('packageTypeMultiList');
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
	
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var commonCodeList = me.getStore('commonCodeList');
		var store = me.getStore('packageTypeMultiList');
		var parentView = me.getParentView();
		var pkgStore  = parentView.viewModel.get('theDetail');

		if(pkgStore != null && pkgStore != undefined){
			var pkg = pkgStore.data.pkgTpCd;
			var item = pkg.split(',');
		}		
		
		commonCodeList.load({
			params: {
				searchType: 'PKGTP',
				pkgTpCode: me.getSearchCondition()
			},
			callback: function(records, operation, success) {
				if (success) {
					var count = 0;
					if(pkgStore != null){
						for(var i = 0; i < records.length; i++){
							if(count < item.length){
								if(records[i].data.scd == item[count]){
									records[i].data.chk = 1;
									i = 0;
									count++;
								}
							}
						}						
					}
					store.setData(records);
					store.commitChanges();
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
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('commonCodeList');

     	var pkgTpCd = refs.txtSetCds.getValue();
         	
        return pkgTpCd;			
	},
	
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
			lcd: 'MT',
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
			lcd: 'MT',
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
		var store = me.getStore('packageTypeMultiList');
		var storeTotal = store.totalCount;
		var codes = refs.txtSetCds.getValue();
		var cnt = 0;
		var selectCmmCdArray = new Array();
		
		
		if(codes === ''){
			codes = ' ';
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