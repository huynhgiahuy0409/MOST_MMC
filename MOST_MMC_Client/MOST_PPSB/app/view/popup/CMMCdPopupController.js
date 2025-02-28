Ext.define('MOST.view.popup.CMMCdPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.cmmcdpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCommonCodePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commonCodePopup',	
	COMBO_BOX_STORE :'commonCodePopupSearchCombo',
	
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
		
		searchParm.set("reqType","CD");
		searchParm.set("searchType",me.getView().recvData.searchType);
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.CODE_NAME_COMBOBOX, me.COMBO_BOX_STORE);
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		if(searchType === 'CMDT'){
			me.onUiChanageCMDT();
		}else if(searchType === 'CMDT_GRP'){
			me.onUiChanageCMDTGrp();
		}else if(searchType === 'IMDG'){
			me.onUiChanageImdg();
		}else {
			me.onUiChangeOriginal();
		}
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
    	var searchType = me.getView().recvData.searchType;
    	
    	if(searchType === 'CMDT'){
    		var params = me.getSearchCmdtCondition();
		}else if(searchType === 'CMDT_GRP'){
			var params = me.getSearchCmdtGrpCondition();
		}else if(searchType === 'COMM'){
			var params = me.getSearchPkgTpCondition();
		}else if(searchType === 'IMDG'){
			var params = me.getSearchUNNOCondition();
		}
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	getSearchCmdtGrpCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var getCtlCdNmCombo;
     	var getSearchCommonCdNm;
     	
     	if(Ext.isClassic){    		
     		getCtlCdNmCombo = refs.ctlCdNmCombo.getValue();
         	getSearchCommonCdNm = refs.txtSearchCommonCdNm.getValue();
     	}else{     		
     		getCtlCdNmCombo = refs.refcomboSearchType.getValue();
         	getSearchCommonCdNm = refs.refSearchCode.getValue();	
     	}
     		
     	var searchCommonCd = '';
     	var searchCommonNm = '';
     	var searchType = '';
		var searchLcd = '';
		var searchMcd = '';
     	var pkgTypeCd ='';
     	var cgTpCd = '';

     	if(me.getView().recvData){
			searchType = me.getView().recvData.searchType;
			searchLcd = me.getView().recvData.searchLcd;
			searchMcd = me.getView().recvData.searchMcd;
			pkgTypeCd = me.getView().recvData.pkgTypeCd;
			cgTpCd = me.getView().recvData.cgTpCd;
     	} else {
     		return null;
     	}
     	
     	if(getCtlCdNmCombo === 'CD'){
     		searchCommonCd = getSearchCommonCdNm;
     		searchCommonNm ="";
     	} else {
     		searchCommonCd ="";
     		searchCommonNm = getSearchCommonCdNm;
     	}
		
		var params = {
			searchType: searchType,
			lcd: searchLcd,
			mcd:searchMcd,
			scd: searchCommonCd,
			scdNm: searchCommonNm,
			reqType: getCtlCdNmCombo,
			//pkgTypeCd: pkgTypeCd,
			cgTpCd: cgTpCd
		}
		
    	return params;
	},
	
	getSearchCmdtCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var getCtlCdNmCombo;
     	var getSearchCommonCdNm;
     	
     	if(Ext.isClassic){    		
     		getCtlCdNmCombo = refs.ctlCdNmCombo.getValue();
         	getSearchCommonCdNm = refs.txtSearchCommonCdNm.getValue();
     	}else{     		
     		getCtlCdNmCombo = refs.refcomboSearchType.getValue();
         	getSearchCommonCdNm = refs.refSearchCode.getValue();	
     	}
     		
     	var searchCommonCd = '';
     	var searchCommonNm = '';
     	var searchType = '';
		var searchLcd = '';
		var searchMcd = '';
     	var pkgTypeCd ='';
     	var cgTpCd = '';
     	var commGrpCd = '';
     	
     	if(me.getView().recvData){
			searchType = me.getView().recvData.searchType;
			searchLcd = me.getView().recvData.searchLcd;
			searchMcd = me.getView().recvData.searchMcd;
			pkgTypeCd = me.getView().recvData.pkgTypeCd;
			cgTpCd = me.getView().recvData.cgTpCd;
			commGrpCd = me.getView().recvData.cmdtGrpCd;
     	} else {
     		return null;
     	}

     	if(getCtlCdNmCombo === 'CD'){
     		searchCommonCd = getSearchCommonCdNm;
     		searchCommonNm ="";
     	} else {
     		searchCommonCd ="";
     		searchCommonNm = getSearchCommonCdNm;
     	}
		
		var params = {
			searchType: searchType,
			lcd: searchLcd,
			mcd:searchMcd,
			scd: searchCommonCd,
			scdNm: searchCommonNm,
			reqType: getCtlCdNmCombo,
			//pkgTypeCd: pkgTypeCd,
			codeType: cgTpCd,
			commGrpCd: commGrpCd
		}
		
    	return params;
	},
	
	getSearchPkgTpCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var getCtlCdNmCombo;
     	var getSearchCommonCdNm;
     	
     	if(Ext.isClassic){    		
     		getCtlCdNmCombo = refs.ctlCdNmCombo.getValue();
         	getSearchCommonCdNm = refs.txtSearchCommonCdNm.getValue();
     	}else{     		
     		getCtlCdNmCombo = refs.refcomboSearchType.getValue();
         	getSearchCommonCdNm = refs.refSearchCode.getValue();	
     	}
     		
     	var searchCommonCd = '';
     	var searchCommonNm = '';
     	var searchType = '';
		var searchLcd = '';
		var searchMcd = '';
     	var pkgTypeCd ='';
     	var cgTpCd = '';
     	var commGrpCd = '';
     	var commCd = '';
     	
     	if(me.getView().recvData){
			searchType = me.getView().recvData.searchType;
			searchLcd = me.getView().recvData.searchLcd;
			searchMcd = me.getView().recvData.searchMcd != null ? me.getView().recvData.searchMcd: CodeConstants.MCD_MT_PKGTP;
			pkgTypeCd = me.getView().recvData.pkgTypeCd;
			cgTpCd = me.getView().recvData.cgTpCd;
			commGrpCd = me.getView().recvData.cmdtGrpCd;
			commCd = me.getView().recvData.cmdtCd;
     	} else {
     		return null;
     	}

     	if(getCtlCdNmCombo === 'CD'){
     		searchCommonCd = getSearchCommonCdNm;
     		searchCommonNm ="";
     	} else {
     		searchCommonCd ="";
     		searchCommonNm = getSearchCommonCdNm;
     	}
		
		var params = {
			searchType: searchType,
			lcd: searchLcd,
			mcd:searchMcd,
			scd: searchCommonCd,
			scdNm: searchCommonNm,
			reqType: getCtlCdNmCombo,
			pkgTypeCd: pkgTypeCd,
			cgTpCd: cgTpCd,
			commGrpCd: commGrpCd,
			commCd: commCd
		}
		
    	return params;
	},
	
	getSearchUNNOCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var getCtlCdNmCombo;
     	var getSearchCommonCdNm;
     	
     	if(Ext.isClassic){    		
     		getCtlCdNmCombo = refs.ctlCdNmCombo.getValue();
         	getSearchCommonCdNm = refs.txtSearchCommonCdNm.getValue();
     	}else{     		
     		getCtlCdNmCombo = refs.refcomboSearchType.getValue();
         	getSearchCommonCdNm = refs.refSearchCode.getValue();	
     	}
     		
     	var searchCommonCd = '';
     	var searchCommonNm = '';
     	var searchType = '';
		var searchLcd = '';
		var searchMcd = '';

     	if(me.getView().recvData){
			searchType = me.getView().recvData.searchType;
			searchLcd = me.getView().recvData.searchLcd;
			searchMcd = me.getView().recvData.searchMcd;
     	} else {
     		return null;
     	}
     	
     	if(getCtlCdNmCombo === 'CD'){
     		searchCommonCd = getSearchCommonCdNm;
     		searchCommonNm ="";
     	} else {
     		searchCommonCd ="";
     		searchCommonNm = getSearchCommonCdNm;
     	}
		
		var params = {
			searchType: searchType,
			lcd: searchLcd,
			mcd:searchMcd,
			scd: searchCommonCd,
			scdNm: searchCommonNm,
			reqType: getCtlCdNmCombo,
		}
		
    	return params;
	},
	
	onUiChanageCMDT: function(){
		var me = this;
		var refs = me.getReferences();
		var reSize = 225;
		
		me.getView().up('window').setTitle('Commodity Code Popup');
		
		refs.refScd.setText(TSB.locale.i18n.Bundle.instance.getMsg('commodityCode'));
		refs.refScdNm.setText(TSB.locale.i18n.Bundle.instance.getMsg('whrCommodityNm'));
		refs.refScd.setHidden(true);
		refs.refScdNm.setHidden(true);
		
		if(Ext.isClassic){
			refs.refScd.setSize().width = reSize;
			refs.refScdNm.setSize().width = reSize;	
		}else{
			refs.refScd.setWidth(reSize);
			refs.refScdNm.setWidth(reSize);
		}
	},
	
	onUiChanageCMDTGrp: function(){
		var me = this;
		var refs = me.getReferences();
		var reSize = 225;
		
		me.getView().up('window').setTitle('Commodity Code Popup');
		
		refs.refScd.setHidden(true);
		refs.refScdNm.setHidden(true);
		refs.refCmdtCd.setHidden(true);
		refs.refCmdtName.setHidden(true);
		
		if(Ext.isClassic){
			refs.refScd.setSize().width = reSize;
			refs.refScdNm.setSize().width = reSize;	
		}
		else{
			refs.refScd.setWidth(reSize);
			refs.refScdNm.setWidth(reSize);
			
		}
	},
	
	onUiChanageImdg: function(){
		var me = this;
		var refs = me.getReferences();
		var reSize = 225;
		
		me.getView().up('window').setTitle('UN No / Class Code Popup');
		
		refs.refCmdtCd.setHidden(true);
		refs.refCmdtName.setHidden(true);
		refs.refCmdtGrpCd.setHidden(true);
		refs.refCmdtGrp.setHidden(true);
		
		refs.refScd.setText(TSB.locale.i18n.Bundle.instance.getMsg('gridtitleUnno'));
		refs.refScdNm.setText(TSB.locale.i18n.Bundle.instance.getMsg('gridtitleClass'));
		
		if(Ext.isClassic){
			refs.refScd.setSize().width = reSize;
			refs.refScdNm.setSize().width = reSize;	
		}else{
			refs.refScd.setWidth(reSize);
			refs.refScdNm.setWidth(reSize);
		}
		
		refs.refScdNm.setAlign('center');
	},
	
	onUiChangeOriginal: function(){
		var me = this;
		var refs = me.getReferences();
		
		me.getView().up('window').setTitle('Common Code Popup');
		
		refs.refScd.setText(TSB.locale.i18n.Bundle.instance.getMsg('scd'));
		refs.refScdNm.setText(TSB.locale.i18n.Bundle.instance.getMsg('scdNm'));
		
		refs.refCmdtCd.setHidden(true);
		refs.refCmdtName.setHidden(true);
		refs.refCmdtGrpCd.setHidden(true);
		refs.refCmdtGrp.setHidden(true);
		
		if(Ext.isClassic){
			refs.refScd.setSize().width = 150;
			refs.refScdNm.setSize().width = 300;	
		}else{
			refs.refScd.setWidth(150);
			refs.refScdNm.setWidth(300);
		}
		
		refs.refScdNm.setAlign('left');
	},

	onDblClick: function() {
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
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid;
		
		if(me.getView().recvData){
			searchType = me.getView().recvData.searchType;
			divCd = me.getView().recvData.divCd;
		}
		
		if(searchType == 'COMM' && divCd == CodeConstants.MCD_MT_LOCDIV1){
			grid = me.lookupReference('refWorkingAreaPopupHHTGrid');
			
		}else{
			grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
	
		}
		
		var selection;
		
		if(grid){
			if(Ext.isClassic){
				selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			}else{
				selection = grid.getSelection() == null ? null : grid.getSelection();
			}
		}
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.code,
			codeName : selection.data.codeName,
			item : selection
		}
		
		return returnItem;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * EVENT POPUP HANDLER START
	 * =========================================================================================================================
	 */
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var title ='';
		
		if(me.getView().recvData){
			title = me.getView().recvData.title;
		}
		
		me.onUiChangeOriginalHHT(title);
	},
	
	onSearchHHT: function() {
		var me = this;
     	var refs = me.getReferences();
     	var commonstore = me.getStore(me.MAIN_STORE_NAME);
     	var anotherstore = me.getStore('partnerCdPopupStore');
     	var grideStore = me.getStore('grideStore');
     	var searchType ='';
     	var searchString =  refs.refSearchCode.getValue();
     	var tyCd = refs.refcomboSearchType.getValue();

		if(me.getView().recvData){
			searchType = me.getView().recvData.searchType;
		}
		
		grideStore.removeAll();
		
		if(searchType == 'CMDT'){
			var params = me.getSearchCondition();
	    	
	    	if(params == null){
	    		return;
	    	}
	    	
	    	commonstore.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						for(var i = 0; i < records.length ; i++ ){
							//grideStore.insert(i, [{scdNm : records[i].data.codeName , scd : records[i].data.code}]);
							grideStore.insert(i, [{scdNm : records[i].data.codeName , scd : records[i].data.code}]);
						}
					}
				}
			});
		}else if(searchType == 'COMM'){
			var params = me.getSearchCondition();
	    	
	    	if(params == null){
	    		return;
	    	}
	    	
	    	commonstore.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						for(var i = 0; i < records.length ; i++ ){
							//grideStore.insert(i, [{scdNm : records[i].data.codeName , scd : records[i].data.code}]);
							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
						}
					}
				}
			});
		}else{
			anotherstore.load({
				params: {
					ptnrType : searchType,
					reqType : tyCd,					
					ptnrName : searchString
				},
				callback: function(records, operation, success) {
					if (success) {
						for(var i = 0; i < records.length ; i++ ){
							grideStore.insert(i, [{scdNm : records[i].data.ptnrName ,scd:records[i].data.ptnrCode}]);
						}
					}
				}
			});
		}
	},
	
	onUiChangeOriginalHHT: function(title){
		var me = this;
		var refs = me.getReferences();
		
		me.getView().up('window').setTitle(title);
		
		refs.refScd.setText(TSB.locale.i18n.Bundle.instance.getMsg('scd'));
		refs.refScdNm.setText(TSB.locale.i18n.Bundle.instance.getMsg('scdNm'));
		
		if(Ext.isClassic){
			refs.refScd.setSize().width = 150;
			refs.refScdNm.setSize().width = 300;	
		}else{
			refs.refScd.setWidth(150);
			refs.refScdNm.setWidth(300);
		}
		
		refs.refScdNm.setAlign('left');
	},
	
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	
	onHHTWorkingAreaLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var screenType ='';
		var searchType ='';
		var lcd ='';
		var divCd ='';		
		var store = me.getStore(me.MAIN_STORE_NAME);
		
    	if(me.getView().recvData){
			searchType = me.getView().recvData.searchType;
			lcd = me.getView().recvData.lcd;
			divCd = me.getView().recvData.divCd;
			screenType = me.getView().recvData.screenType;
		}
    	store.load({
			params: {
				lcd : lcd,
				mcd : divCd
			},
			callback: function(records, operation, success) {
				if (success) {
					if(screenType == 'TYPE_MANPOWER' || screenType =='TYPE_STEVEDORE'){
						
			    	}else if(screenType == 'TYPE_FORKLIFT'){
			    		store.removeAll();
			    		store.insert(1, [{scdNm : 'Hatch' ,scd:CodeConstants.MT_LOCDIV1_HTC }]);
			    		store.insert(2, [{scdNm : 'Warehouse' ,scd:CodeConstants.MT_LOCDIV1_WHO }]);
			    		store.insert(3, [{scdNm : 'Break Bulk Wharf' ,scd:CodeConstants.MT_LOCDIV1_WRF}]);
			    	}	
				}
			}
		});
	},
	
	onSelecthWorkingData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		
		if(ref.getReference() == 'refBtnSelectWorkingAreaHHT'){//Select from WorkingArea popup:
			window.returnValue = me.getReturnDataHHT();
		}
		
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	onSearchData : function(refsCbx){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var commonCodeListStore = me.getStore('commonCodeListStore');
		var locationCodeListStore = me.getStore('locationCodeListStore');
		var grideStore = me.getStore('grideStore');
		var divCd = refsCbx.getValue();
		
		if(me.getView().recvData){
			screenType = me.getView().recvData.screenType;
		}
		
		grideStore.removeAll();

    	if(screenType == 'TYPE_MANPOWER' || screenType =='TYPE_STEVEDORE'){
    		if(divCd == CodeConstants.MT_LOCDIV1_HTC){
    			commonCodeListStore.load({
    				params: {
    					searchType : 'COMM',
    					lcd : CodeConstants.LCD_MOST,
    					mcd : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
    					}
    				}
    			});
    			
    		}else if(divCd == CodeConstants.MT_LOCDIV1_WRF || divCd == CodeConstants.MT_LOCDIV1_EDJ || divCd == CodeConstants.MT_LOCDIV1_NDJ){
    			locationCodeListStore.load({
    				params: {
    					searchType : 'BerthLoc',
    					locCd : CodeConstants.VC_TMNL_BBT,
    					berthTp : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
    					}
    				}
    			});
    		}else if(divCd == CodeConstants.MT_LOCDIV1_WHS){
    			commonCodeListStore.load({
    				params: {
    					searchType : 'COMM',
    					lcd : CodeConstants.LCD_MOST,
    					mcd : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
    					}
    				}
    			});
    		}else if(divCd == CodeConstants.MT_LOCDIV1_OTH){
    			locationCodeListStore.load({
    				params: {
    					searchType : 'Others',
    					locDivCd : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
    					}
    				}
    			});
    		}else{
    			locationCodeListStore.load({
    				params: {
    					searchType : 'LocDef',
    					locDivCd : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
    					}
    				}
    			});
    		}
    		
    	}else if(screenType == 'TYPE_FORKLIFT'){
    		if(divCd == CodeConstants.MT_LOCDIV1_HTC){
    			commonCodeListStore.load({
    				params: {
    					searchType : 'COMM',
    					lcd : CodeConstants.LCD_MOST,
    					mcd : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
    					}
    				}
    			});
    		}else if(divCd == CodeConstants.MT_LOCDIV1_WRF){
    			locationCodeListStore.load({
    				params: {
    					searchType : 'BerthLoc',
    					locCd : CodeConstants.VC_TMNL_BBT,
    					berthTp : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
							for(var i = 0; i < 11; i++){
								grideStore.insert(i+records.length, [{scdNm: 'H' + (i+1),scd: 'H' + (i+1)}])
							}
							grideStore.commitChanges();
    					}
    				}
    			});
    			commonCodeListStore.load({
    				params: {
    					searchType : 'COMM',
    					lcd : CodeConstants.LCD_MOST,
    					mcd : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
    					}
    				}
    			});
    		}else if(divCd == CodeConstants.MT_FKLOCDIV_WHO){
    			locationCodeListStore.load({
    				params: {
    					searchType : 'LocDef',
    					locDivCd : divCd
    				},
    				callback: function(records, operation, success) {
    					if (success) {
    						for(var i = 0; i < records.length ; i++ ){
    							grideStore.insert(i, [{scdNm : records[i].data.scdNm ,scd:records[i].data.scd}]);
    						}
    					}
    				}
    			});
    		}
    	}
	},
	
	onCommonCodeForMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
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
	},
	
	getReturnDataHHT : function() {// Return Working Area multi select
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refWorkingAreaPopupHHTGrid');
		var storeTotal = grid.store.data.count();
		var setChkPtyCdValue = '';
	
		var cnt = 0;
		var selectArray = new Array();
	
		grid.store.each(function(record,idx){
			if(record.data.chkCdNm === 1) {
				if(storeTotal > cnt ){
					if(setChkPtyCdValue === ''){
						setChkPtyCdValue = record.data.scd
					} else {
						setChkPtyCdValue += "," + record.data.scd
					}
					selectArray.push(record.data);
				}
				cnt++;
			}
		});	
		
		if(selectArray.length == 0){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var window = me.getView().up('window');
		var returnItem = {
			code : setChkPtyCdValue,
			typeCd: refs.refcomboCaTagory.getValue(),
			typeNm: refs.refcomboCaTagory.getInputValue(),
			item : selectArray
		}
		
    	window.returnValue = returnItem;
       	window.close();
	},
	
	onSelectContractorData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		
		if(ref.getReference() == 'refBtnSelectContractorHHT'){//Select from JPVC:
			window.returnValue = me.getJPVCReturnDataHHT();
		}
		
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getJPVCReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.scd,
			codeName : selection.data.scdNm,
			item : selection
		}

    	window.returnValue = returnItem;
    	
		if(window.returnValue != null){
			window.close();	
		}
	}
	/**
	 * EVENT POPUP HANDLER END
	 * =========================================================================================================================
	 */
	
});
