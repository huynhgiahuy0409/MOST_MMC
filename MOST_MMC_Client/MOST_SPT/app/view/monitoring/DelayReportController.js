Ext.define('MOST.view.monitoring.DelayReportController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.delayreport',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 31,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: '',
	MAIN_STORE_NAME: '',
	
	DELAY_GROUP_STORE: 'delayGroupCombo',
	
	VESSEL_SUMMARY_DELAY_REPORT: 'RST116001DelayReport.jrxml',
	VESSEL_DETAIL_DELAY_REPORT: 'RST116002DetailDelayReport.jrxml',
	REPORT_PDF_FUNCTION: 'MOST.statisticReport.previewDelayReport',
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
		
		var delayGrpCombo = me.getStore(me.DELAY_GROUP_STORE);
		delayGrpCombo.load();
		
		var searchParm = Ext.create('MOST.model.monitoring.DelayReport');
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
		
		me.getViewModel().setData({theSearch:Ext.create('MOST.model.monitoring.DelayReport')});
		
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
	
	onChangeDelayGroup: function(){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		
		refs.ctlFromDate.setValue();
		refs.ctlToDate.setValue();
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
		var searchParams = me.getSearchCondition();
		
		params['branchCode']	= MOST.config.Token.getBranchCode(); 	// branch code fro multi db
		params['param1']		= searchParams.vslCallId;
		params['param2']		= searchParams.fromDate;
		params['param3']		= searchParams.toDate;
		params['param4']		= MOST.config.Token.getUserId();
		params['param5']		= searchParams.dlyGrpCd;
		
		if( StringUtil.isNullorEmpty(searchParams.vslCallId) )
		{
			params['param6']	= 'RST116001';
			params['file']		= me.VESSEL_SUMMARY_DELAY_REPORT;
     	}
		else
		{
     		params['param6']	= 'RST116002';
     		params['file']		= me.VESSEL_DETAIL_DELAY_REPORT;
     	}
		params['serviceId']		= me.REPORT_PDF_FUNCTION;
		
		me.openPDFPreview(params);
		
	},
	
	onPreviewExcel: function() {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		var searchParams = me.getSearchCondition();
		
		params['branchCode']	= MOST.config.Token.getBranchCode(); 	// branch code fro multi db
		params['param1']		= searchParams.vslCallId;
		params['param2']		= searchParams.fromDate;
		params['param3']		= searchParams.toDate;
		params['param4']		= MOST.config.Token.getUserId();
		params['param5']		= searchParams.dlyGrpCd;
		
		if( StringUtil.isNullorEmpty(searchParams.vslCallId) )
		{
			params['param6']	= 'RST116001';
			params['file']		= me.VESSEL_SUMMARY_DELAY_REPORT;
     	}
		else
     	{
     		params['param6']	= 'RST116002';
     		params['file']		= me.VESSEL_DETAIL_DELAY_REPORT;
     	}
		params['serviceId']		= me.REPORT_PDF_FUNCTION;
		
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
			if(returnValue) {
				me.getViewModel().setData({theSearch:returnValue.item});
				refs.ctlFromDate.setValue();
				refs.ctlToDate.setValue();
			}
		}
		
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
     	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	
     	//if(StringUtil.isNullorEmpty(vslCallId)){
		//	MessageUtil.warning('Warning', 'inputVslCallIdMsg');
		//	return;
     	//}
     	
    	var dateCondition = me.checkPeriodDate('ctlFromDate', 'ctlToDate', me.MAX_DATE_PERIOD, true);
    	
    	if( dateCondition == null ) {
    		
    		params['vslCallId'] = vslCallId;
    		params['dlyGrpCd'] = searchParm.data.dlyGrpCd;
    		
    	} else {
    		
    		var startTime = dateCondition.fromDt;
    		var endTime = dateCondition.toDt;

    		var stString = startTime == null?null:Ext.Date.format(startTime, MOST.config.Locale.getShortDate());
    		var edString = endTime == null?null:Ext.Date.format(endTime, MOST.config.Locale.getShortDate());
    		
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