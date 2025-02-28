Ext.define('MOST.view.monitoring.GateOutController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.gateout',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 90,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refGateOutGrid',
    MAIN_STORE_NAME: 'gateOut',
    
    PDF_FILE: 'RMT002.jrxml',
	PDF_FUNCTION: 'MOST.monitoringReport.selectCargoInterchangeReceiptReport',
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
		me.setDateInDays('ctlGateOutFromDt', -6);
		me.setDateInDays('ctlGateOutToDt');
		var searchParm = Ext.create('MOST.model.monitoring.SearchGateOutParm');

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
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchGateOutParm';
		searchBizParm.serviceID = 'MOST.gateOut.selectListOfGateOut'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlGateOutJpvc'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				me.onSetMasterBlNoCombo(returnValue.item.get('vslCallId'));
				me.onSetBlNoCombo(returnValue.item.get('vslCallId'));
				//me.searchSnBlList(returnValue.item);
			} else {
				me.getViewModel().setData({theVsl:null});
				me.onSetMasterBlNoCombo('');
				me.onSetBlNoCombo('');
				//me.searchSnBlList(null);
			}
		}
	},
	
	onSetMasterBlNoCombo: function(vslCallId){
		var me = this;
		var refs = me.getReferences();
		var masterBlNoCombo = me.getStore('masterBlCombo');
		
		masterBlNoCombo.removeAll();
		refs.ctlGateOutMasterBlNoCombo.setValue('');
		masterBlNoCombo.load({
			params:{
				vslCallId: vslCallId
			}
		});
	},
	
	onSetBlNoCombo: function(vslCallId){
		var me = this;
		var refs = me.getReferences();
		var blNoCombo = me.getStore('BLNoList');
		
		blNoCombo.removeAll();
		refs.ctlGateOutBlNoCombo.setValue('');
		blNoCombo.load({
			params:{
				vslCallId: vslCallId
			}
		});
	},
	
	onSelectMasterBl: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('BLNoList');
		
		blCombo.removeAll();
		refs.ctlGateOutBlNoCombo.setValue('');
		blCombo.load({
			params:{
				vslCallId: refs.ctlGateOutJpvc.getValue(),
				mfDocNo: refs.ctlGateOutMasterBlNoCombo.getValue()
			}
		});
	},
	
	// Search Sn List
	searchSnBlList:function(record){
		var me = this;
		var store = me.getStore('gateOutSnBlNoComboForAll');
		var snComboStore = me.getStore('gateOutSnNoCombo');
		var blComboStore = me.getStore('gateOutBlNoCombo');
		var params = me.getSearchCondition();
		
		if(record){
			store.load({
				params: {
					vslCallId : record.get('vslCallId')
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records != null & records.length > 0){
							snComboStore.setData(records[0].get('snList'));
							blComboStore.setData(records[0].get('blList'));
						}
					}
				}
			});
		} else {
			store.removeAll();
		}
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	var dateCondition = me.checkFromToDate('ctlGateOutFromDt', 'ctlGateOutToDt');
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		
    	if(dateCondition == null){
    		return null;
    	}
    	
    	
    	var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
		if(dateCondition.isEmpty &&
    	    StringUtil.isNullorEmpty(vslCallId)){
    		MessageUtil.warning('warning_msg', 'listofgatein_search_condition_msg');
    		return null;
    	}
		params['blNo'] = StringUtil.toUpperCase(searchParm.data.blNo);
		params['mfDocId'] = StringUtil.toUpperCase(searchParm.data.mfDocId);
		params['snNo'] = StringUtil.toUpperCase(searchParm.data.sn);
		params['fwrAgnt'] = StringUtil.toUpperCase(searchParm.data.fwrAgnt);
		params['gatePassNo'] = StringUtil.toUpperCase(searchParm.data.gatePassNo);
		params['lorryNo'] = StringUtil.toUpperCase(searchParm.data.lorryNo);
		params['vslCallId'] = vslCallId;
		params['searchType'] = 'GateOut';
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
    	
    	if(dateCondition != null){
    		params['dischgStDt'] = dateCondition.fromDtString;
    		params['dischgEndDt'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Gate Out',
            fileName: 'GateOut' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refGateOutGrid;
        grid.saveDocumentAs(cfg);
    },
    
    onPreview : function() {
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) 
			return;
		
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		params['file'] = me.PDF_FILE; // report format file name
		params['serviceId'] = me.PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = selection.get("vslCallId");
		params['param2'] = selection.get("lorryNo");
		params['param3'] = selection.get("gateTxnNo");
		params['param4'] = selection.get("sdoNo");
		params['param5'] = selection.get("grNo");
		params['param6'] = MOST.config.Token.getUserId(); //user Id
		params['param7'] = MOST.config.Token.getUserName();
		
		me.openPDFPreview(params);
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});