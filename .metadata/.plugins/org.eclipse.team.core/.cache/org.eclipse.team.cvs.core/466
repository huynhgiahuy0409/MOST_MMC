Ext.define('MOST.view.planning.CargoSearchController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.cargosearch',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	FORWARDER : "FWD",				//UserConfig.FORWARDER
	SHIPPING_AGENCY : "SHA",		//UserConfig.SHIPPING_AGENCY
	
	MAIN_GRID_REF_NAME: 'refCargoSearchGrid',
	MAIN_STORE_NAME: 'cargoSearchList',
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
		var searchParm = Ext.create('MOST.model.planning.SearchCargoSearchParm');
		
		var categoryCombo = me.getStore('categoryCombo');
		var deliveryModeCombo = me.getStore('deliveryModeCombo');
		
		categoryCombo.load();
		deliveryModeCombo.load();
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
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
					
				}
			}
		});
	},
	
	onRefesh: function(){
		var me = this;
     	var refs = me.getReferences();
     	
     	refs.ctlJpvc.setValue();
     	refs.ctlCategory.setValue();
     	refs.ctlDeliveryMode.setValue();
     	refs.ctlATAFromDt.setValue();
     	refs.ctlATAToDt.setValue();
     	refs.ctlSn.setValue();
     	refs.ctlBl.setValue();
     	refs.ctlGr.setValue();
     	refs.ctlGp.setValue();
     	refs.ctlSubItemsChk.setValue(false);
	},
	
	onSearchSnByGr: function(){
		var me = this;
     	var refs = me.getReferences();
     	
     	if(StringUtil.isNullorEmpty(refs.ctlGr.getValue())){ 
     		MessageUtil.error('fail_msg', "portsafetyconfirmation_validcheck_gr_mandatory_msg");
			return null;
     	} else {
     		var store = me.getStore('cargoSearchGoGr');
     		var snNoCombo = me.getStore('snNoCombo');

    		snNoCombo.removeAll();
    		snNoCombo.commitChanges();
    		
     		var params = {
     				vslCallId : refs.ctlJpvc.getValue(),
     				grNo: refs.ctlGr.getValue(),
        			searchType : 'goGr'
    		};
     		
     		store.load({
    			params:params,
    			callback: function(records, operation, success) {
    				if (success) {
    					if(records != null && records.length > 0){
    						snNoCombo.setData(records[0].get('snList'));
    						snNoCombo.insert(0, [{scdNm: 'Select', shipgNoteNo: ''}]);
    					}
    				}
    			}
    		});
     	}
	},
		
	onDownloadPDF : function(){
		var me = this;
		var refs = me.getReferences();
	},
	
	onDownloadExport:function(){
		var me = this;
		var refs = me.getReferences();
	},
	
	onDownloadCancel:function(ownWin){
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);
		
		win.close();
		
	},
	
	onPreviewPDF:function(){
		var me = this;
		var refs = me.getReferences();
	},
//	/**
//	 * EVENT HANDLER END
//	 * =========================================================================================================================
//	 */
//	
//	/**
//	 * =========================================================================================================================
//	 * GENERAL METHOD START
//	 */
//	
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlJpvc'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				
				me.onCargoComboList();
			}else{
				me.getViewModel().setData({theVsl:null});
				
				me.onResetCargoComboData();
			}
		}
	},
	
	onSelectMasterBl: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blNoCombo');
		
		blCombo.removeAll();
		refs.ctlbl.setValue('');
		blCombo.load({
			params:{
				vslCallId: refs.ctlJpvc.getValue(),
				mfDocNo: refs.ctlMasterBl.getValue()
			}
		});
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
     	var vslCallId = searchParm.data.vslCallId;
     	var mfDocId = searchParm.data.mfDocId;
     	var opeClassCd = searchParm.data.opeClassCd;
     	var isSubItems = (refs.ctlSubItemsChk.getValue() == true) ? 'true' : 'false';
     	var fromDate = Ext.Date.format(refs.ctlATAFromDt.getValue(), MOST.config.Locale.getShortDate());
     	var toDate = Ext.Date.format(refs.ctlATAToDt.getValue(), MOST.config.Locale.getShortDate());
     	//added code
     	var grNo = searchParm.data.grNo;
		var blNo = searchParm.data.blNo;
		var shipgNoteNo = searchParm.data.shipgNoteNo;
		var delvTpCd = searchParm.data.delvTpCd;
     	//end added code
     	var authority = '';
     	var ptnrCode = '';
     	
     	if(Token.getUserType() == 'E'){
     		if(me.existsPatnerType(me.SHIPPING_AGENCY)){
     			authority = me.SHIPPING_AGENCY;
     			ptnrCode = Token.getPtnrCode();
     		} else if(me.existsPatnerType(me.FORWARDER)){
     			authority = me.FORWARDER;
     			ptnrCode = Token.getPtnrCode();
     		}
     	}
     	
     	if(!StringUtil.isNullorEmpty(vslCallId) || !StringUtil.isNullorEmpty(opeClassCd)){ 
     		if(!StringUtil.isNullorEmpty(opeClassCd) && StringUtil.isNullorEmpty(vslCallId) ){
				if(StringUtil.isNullorEmpty(fromDate) && StringUtil.isNullorEmpty(toDate)){
					MessageUtil.error('fail_msg', "inquiry_condition_Atb_msg");
					return null;
				}
			}
     		
     		params = {
        			isSubItems: isSubItems,
        			fromDate: fromDate,
        			toDate: toDate,
        			authority: authority,
        			ptnrCode: ptnrCode,
        			searchType : 'combo',
        			delvTpCd: delvTpCd,
					shipgNoteNo: shipgNoteNo,
					blNo: blNo,
					grNo: grNo
    		};
     	}else{
     		MessageUtil.error('fail_msg', "inquiry_condition_msg");
			params = null;
     	}
     	
     	params['vslCallId'] = vslCallId;
     	params['opeClassCd'] = opeClassCd;
     	params['mfDocId'] = refs.ctlMasterBl.getValue();
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
    	return params;
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.planning.SearchCargoSearchParm';
		searchBizParm.serviceID = 'MOST.cargoSearch.selectCargoSearchList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onCargoComboList: function(){
		var me = this;
     	var refs = me.getReferences();
    	var snNoCombo = me.getStore('snNoCombo');
		var blNoCombo = me.getStore('blNoCombo');
		var masterBlNoCombo = me.getStore('masterBlCombo');
    	var vslCallId = refs.ctlJpvc.getValue();
    	var authority = '';
     	var ptnrCode = '';
     	
     	if(Token.getUserType() == 'E'){
     		if(me.existsPatnerType(me.SHIPPING_AGENCY)){
     			authority = me.SHIPPING_AGENCY;
     			ptnrCode = Token.getPtnrCode();
     		} else if(me.existsPatnerType(me.FORWARDER)){
     			authority = me.FORWARDER;
     			ptnrCode = Token.getPtnrCode();
     		}
     	}
     	
    	var params = {
			vslCallId : vslCallId
		};
	
		snNoCombo.load({
			params: params
		});
		
		masterBlNoCombo.load({
			params: params
		});
		
		blNoCombo.load({
			params: params
		});
	},
	
	onResetCargoComboData: function(){
		var me = this;
		var snNoCombo = me.getStore('snNoCombo');
		var blNoCombo = me.getStore('blNoCombo');
		
		snNoCombo.removeAll();
		snNoCombo.commitChanges();
		blNoCombo.removeAll();
		blNoCombo.commitChanges();
	},
	   
    exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Cargo Search',
            fileName: 'CargoSearch' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refCargoSearchGrid;
        grid.saveDocumentAs(cfg);
    },
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});
