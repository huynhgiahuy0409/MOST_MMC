Ext.define('MOST.view.monitoring.SummaryRevenueChargesReportController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.summaryrevenuechargesreport',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 31,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: '',
	MAIN_STORE_NAME: '',
	
	TERMINAL_STORE: 'terminalCombo',
	TARIFF_TYPE_STORE: 'tariffTypeCombo',
	
	REPORT_PDF_FILE: 'RST117SummaryRevenue.jrxml',
	REPORT_PDF_FUNCTION: 'MOST.statisticReport.previewSummaryRevenueChargesReport',
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
		
		me.setDateInDays('ctlFromDate');
		me.setDateInDays('ctlToDate', 30);
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPJ_TERMINAL, me.TERMINAL_STORE);
		
		
		var searchTypeCombo = me.getStore(me.TARIFF_TYPE_STORE);
		searchTypeCombo.load();
		
		var searchParm = Ext.create('MOST.model.monitoring.DailyHandlingReport');
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
//	onSearch: function() {
//		var me = this;
//     	var refs = me.getReferences();
//    	var store =  me.getStore(me.MAIN_STORE_NAME);
//    	var params = me.getSearchCondition();
//    	
//    	if(params == null){
//    		return;
//    	}
//    	
//		store.load({
//			params: params,
//			callback: function(records, operation, success) {
//				if (success) {
//					if (records && records.length <= 0) {
//						MessageUtil.noMatchData();
//					}
//				}
//			}
//		});
//	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var validateDate = false;
		
		if(control == refs.ctlFromDate){
			validateDate = me.validatePeriodDate(newValue, refs.ctlToDate.getValue(), me.MAX_DATE_PERIOD);

			if(!validateDate){
				me.setDateInDaysByDate('ctlToDate', me.MAX_DATE_PERIOD, control.getValue());
			}
		} else {
			validateDate = me.validatePeriodDate(refs.ctlFromDate.getValue(), newValue, me.MAX_DATE_PERIOD);
			
			if(!validateDate){
				me.setDateInDaysByDate('ctlFromDate', -me.MAX_DATE_PERIOD, control.getValue());
			}
		}
	},
	
	onReportDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if( newValue ){
			
			refs.ctlFromDate.setValue('');
			refs.ctlToDate.setValue('');
			
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchLoadingParm';
		searchBizParm.serviceID = 'MOST.loading.selectListOfLoading'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onPreviewPDF: function() {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		var params = me.getSearchCondition();
		
     	if(StringUtil.isNullorEmpty(params.vslCallId)){
			MessageUtil.warning('Warning', 'inputVslCallIdMsg');
			return;
     	}
     	
		params['branchCode'] = MOST.config.Token.getBranchCode(); 	// branch code fro multi db
		params['param1'] = params.vslCallId;
		params['param2'] = params.fromDate;
		params['param3'] = params.toDate;
		params['param4'] = MOST.config.Token.getUserId();
		//params['param5'] = refs.refRmkRpt.getValue().replaceAll('\n',' <br>');
		params['param5'] = params.trfTpCd;
		params['param6'] = params.payerCd;
		params['param7'] = params.payerNm;
		params['param8'] = params.terminalCode;
		
		params['file'] = me.REPORT_PDF_FILE;
		params['serviceId'] = me.REPORT_PDF_FUNCTION;
		
		me.openPDFPreview(params);
		
	},
	
	onPreviewExcel: function() {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		var params = me.getSearchCondition();
		
     	if(StringUtil.isNullorEmpty(params.vslCallId)){
			MessageUtil.warning('Warning', 'inputVslCallIdMsg');
			return;
     	}
     	
		params['branchCode'] = MOST.config.Token.getBranchCode(); 	// branch code fro multi db
		params['param1'] = params.vslCallId;
		params['param2'] = params.fromDate;
		params['param3'] = params.toDate;
		params['param4'] = MOST.config.Token.getUserId();
		//params['param5'] = refs.refRmkRpt.getValue().replaceAll('\n',' <br>');
		params['param5'] = params.trfTpCd;
		params['param6'] = params.payerCd;
		params['param7'] = params.payerNm;
		params['param8'] = params.terminalCode;
		
		params['file'] = me.REPORT_PDF_FILE;
		params['serviceId'] = me.REPORT_PDF_FUNCTION;
		
		me.downloadExcel(params);
		
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
		
		if(targetControl === 'ctlJpvc'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theSearch:returnValue.item});
			}
		}
		
		if(targetControl === 'ctlPartner'){
			refs.ctlPartnerName.setValue('');
			if(returnValue) {
				refs.ctlPartnerName.setValue(returnValue.codeName);
			}
		}
		
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var atw = searchParm.data.atw;
     	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	
     	//if(StringUtil.isNullorEmpty(vslCallId)){
		//	MessageUtil.warning('Warning', 'inputVslCallIdMsg');
		//	return;
     	//}
     	
    	var dateCondition = me.checkPeriodDate('ctlFromDate', 'ctlToDate', me.MAX_DATE_PERIOD, true);
    	if(dateCondition == null){
    		return null;
    	}
    	
		var startTime = dateCondition.fromDt;
		var endTime = dateCondition.toDt;

		var stString = startTime == null?null:Ext.Date.format(startTime, MOST.config.Locale.getShortDate());
		var edString = endTime == null?null:Ext.Date.format(endTime, MOST.config.Locale.getShortDate());
		
    	params['vslCallId'] = vslCallId;
    	params['trfTpCd'] = searchParm.data.trfTpCd;
    	params['terminalCode'] = refs.refCboTerminalSumRevRpt.getValue();
    	params['payerCd'] = refs.ctlPartner.getValue();
    	params['payerNm'] = refs.ctlPartnerName.getValue();
		
    	if(dateCondition != null){
    		params['fromDate'] = stString;
    		params['toDate'] = edString;
    	}
    	
    	return params;
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Discharging',
            fileName: 'Discharging' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refLoadingGrid;
        grid.saveDocumentAs(cfg);
    },
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});