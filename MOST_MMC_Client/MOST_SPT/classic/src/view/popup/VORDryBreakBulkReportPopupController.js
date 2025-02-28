Ext.define('MOST.view.popup.VORDryBreakBulkReportPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

	alias: 'controller.vordrybreakbulkreportpopupcontroller',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 7,	// MAX PERIOD DATE
	
	PORT_OF_DEPARTURE_PDF_FILE: 'PortDepartureReport.jrxml',
	PORT_OF_DEPARTURE_PDF_FUNCTION: 'MOST.monitoringReport.selectPortDepartureReport',
	
	HANDLING_SERVICE_PDF_FILE: 'ReportOfOperatingService.jrxml',
	HANDLING_SERVICE_PDF_FUNCTION: 'MOST.monitoringReport.selectHandlingServicePDFReportList',
	
	ROROC_FORM_1_PDF_FILE: 'ROROCForm1.jrxml',					// ROROC – FORM 1
	ROROC_FORM_2_PDF_FILE: 'ROROCForm2.jrxml',					// ROROC – FORM 2
	
	ROROC_FORM_1_PDF_PDF_FUNCTION: 'MOST.monitoringReport.selectROROCForm1Reprot',
	ROROC_FORM_2_PDF_PDF_FUNCTION: 'MOST.monitoringReport.selectROROCForm2Reprot',

	vslCallIDDbk: null,
	vslTpDbk: null,
	
	isOperation: false,
	isOrgBargeVsl: false,		// Type of Orgial Vessel
	isBargeVslDbk: false,	// Type of Double banking
	
	isUseHdlSrvReport: false,
	isUseForm1Report: false,		// FORM 1
	isUseForm2Report: false,		// FORM 2
	
	printType: null,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	onLoadPopupPDF: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('vorDryBreakBulk');
     	var recvData = me.getView().recvData;
     	var vslCallId = recvData.vslCallId.toUpperCase();
     	
     	// Type of Orgial Vessel
     	if(recvData.originalVslTp == 'BRGE'){
			me.isOrgBargeVsl = true;
		}
     	
     	if(recvData.doPackingDbbCases == true){
     		
     		refs.refRorocHdlSrv.setHidden(true);
     		refs.refRorocForm1.setHidden(true);
     		refs.refRorocForm2.setHidden(false);
			me.onLoadDblBanking();
			
			
		} else {
			refs.refRorocHdlSrv.setHidden(false);
			refs.refRorocForm1.setHidden(false);
			refs.refRorocForm2.setHidden(true);
		}
		
     	store.load({
     		params:{
				vslCallId: vslCallId,
				searchType:'info'
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						if(records[0].data.reportOprSrv.length == 0) {
							me.getViewModel().setData({reportOprList:null});
						} else {
							me.getViewModel().setData({reportOprList:records[0].data.reportOprSrv[0]});
						}
						if(records[0].data.reportForm1.length == 0) {
							me.getViewModel().setData({reportFrom1:null});
						} else {
							me.getViewModel().setData({reportFrom1:records[0].data.reportForm1[0]});
						}
						if(records[0].data.reportForm2.length == 0) {
							me.getViewModel().setData({reportFrom2:null});
						} else {
							me.getViewModel().setData({reportFrom2:records[0].data.reportForm2[0]});
						}
					}
				}
			}
		});
     	
	},
	
	
	// Button Ok
	onOkToPreviewDetailPDF:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var crtRadio = refs.ctlOptRpt.getValue();
		
		me.printType = 'PDF';
		
		if(crtRadio.vorRpt === 'portOfDeparture'){
			me.onPreviewPortOfDepartureReport();
		} 
		
		if(crtRadio.vorRpt === 'operatingService' || crtRadio.vorRpt === 'rorocForm1'){
			me.onOpenPDFPreview();
		}
		
		if(crtRadio.vorRpt === 'rorocForm2'){
			me.onOpenPDFPreview();
			//me.onCheckDocOpeToPreview();
		}
	},
	
	onOkToPreviewDetailExcel:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var crtRadio = refs.ctlOptRpt.getValue();
		
		me.printType = 'EXCEL';
		
		if(crtRadio.vorRpt === 'portOfDeparture'){
			me.onPreviewPortOfDepartureReport();
		} 
		
		if(crtRadio.vorRpt === 'operatingService' || crtRadio.vorRpt === 'rorocForm1'){
			me.onOpenPDFPreview();
		}
		
		if(crtRadio.vorRpt === 'rorocForm2'){
			me.onOpenPDFPreview();
		}
	},
	
	// Search Condition
	onLoadDblBanking:function() {
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var searchParm = me.getViewModel().get('theSearch');
    	var sftDblBankingStore = me.getStore('sftDblBankingList');
    	var doubleBankingList = me.getStore('doubleBankingList');
		var vslCallId = recvData.vslCallId.toUpperCase();

     	if(StringUtil.isNullorEmpty(vslCallId)){
			MessageUtil.warning('warning', 'inputVslCallIdMsg');
			return;
     	}
		
		sftDblBankingStore.removeAll();
		sftDblBankingStore.commitChanges();
		sftDblBankingStore.load({
			params:{
				vslCallId: vslCallId,
				searchType:'info'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records[0].get('doubleBankingList').length > 0){
						doubleBankingList.setData(records[0].get('doubleBankingList'));
						doubleBankingList.commitChanges();
						
						me.isUseForm2Report = true;
						//me.onCheckTypeDoubleBanking();
						doubleBankingList.filterBy(function (record){
							
							if(record.get('dblBnkDivCd') === "BG") {			// BARGE
								me.vslCallIDDbk = record.get('dblBnkShip1');
						    	me.vslTpDbk = record.get('dblBnkDivCd');
						    	me.isBargeVslDbk = true;
						    } else if(record.get('dblBnkDivCd') === "VL") {		// VESSEL
						    	
						    }
						});
					}
				}
			}
		});
	},

	onCheckRptOpt:function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getView().recvData;
		var crtRadioVal = refs.ctl_optRpt.getValue();
		
		if(crtRadioVal.rorocHdlSrv === 'handlingService'){
			params.reportId = 'ReportofHandlingService';
			
		}else if(crtRadioVal.rorocHdlSrv === 'rorocForm1'){
			params.reportId = 'RorocForm1';
			
		}else if(crtRadioVal.rorocHdlSrv === 'rorocForm2'){
			params.reportId = 'RorocForm1';
		}
		
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		window.close();
	},
	
	onCheckTypeDoubleBanking: function() {
		var me = this;
		var refs = me.getReferences();
		var params = me.getView().recvData;
		var checkDocOpeStore = me.getStore('checkDocumentDataStore');
		var doubleBankingList = me.getStore('doubleBankingList');
		
		if(StringUtil.isNullorEmpty(me.vslCallIDDbk)){
			me.onOpenPDFPreview();
			//MessageUtil.warning('warning', 'vor_vessel_call_id_empty_msg');
			return;
	 	}
		
		checkDocOpeStore.load({
			params:{
				vslCallId: me.vslCallIDDbk,
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						me.isOperation = true;
					} else {
						return;
					}
				}
			}
		});
		
		me.onOpenPDFPreview();
	},
	
	onPreviewPortOfDepartureReport:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		params['file'] = me.PORT_OF_DEPARTURE_PDF_FILE;
		params['serviceId'] = me.PORT_OF_DEPARTURE_PDF_FUNCTION;
		params['branchCode'] = MOST.config.Token.getBranchCode(); 							// branch code fro multi db
		params['param1'] = recvData.vslCallId; 												// Vessel Call id
		params['param3'] = refs.refPrtDrtRmk.getValue().replaceAll('\n',' <br>');			// Remark
		params['param4'] = MOST.config.Token.getUserId(); 									// User Id
		
		if(me.printType == 'PDF') {
			params['printType'] = 'PDF';		// print type PDF EXCEL
			me.openPDFPreview(params);
		} if (me.printType == 'EXCEL') {
			params['printType'] = 'EXCEL';		// print type PDF EXCEL
			me.downloadExcel(params);
		}
	},
	
	
	onOpenPDFPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		var crtRadioVal = refs.ctlOptRpt.getValue();
		
		params['branchCode'] = MOST.config.Token.getBranchCode(); 							// branch code fro multi db
		params['param1'] = recvData.vslCallId; 												// Vessel Call id
		params['param3'] = refs.refPrtDrtRmk.getValue().replaceAll('\n',' <br>');			// Remark
		params['param4'] = MOST.config.Token.getUserId(); 									// User Id
		
		
		if( crtRadioVal.vorRpt === 'operatingService'){
			if( me.isOrgBargeVsl == true || me.isBargeVslDbk == true){
				MessageUtil.warning('warning', 'vor_vessel_call_id_not_able_to_use_operating_service_msg');
				return;
	     	}
			
			if(me.getViewModel().get('reportOprList') == null){
				MessageUtil.noMatchData();
				return;
			}
			
			params['file'] = me.HANDLING_SERVICE_PDF_FILE;
			params['serviceId'] = me.HANDLING_SERVICE_PDF_FUNCTION;
			
		}else if( crtRadioVal.vorRpt === 'rorocForm1'){
			if( me.isOrgBargeVsl == true || me.isBargeVslDbk == true){
				MessageUtil.warning('warning', 'vor_vessel_call_id_not_able_to_use_form_1_msg');
				return;
	     	}
			
			if(me.getViewModel().get('reportFrom1') == null){
				MessageUtil.noMatchData();
				return;
			}
			
			params['file'] = me.ROROC_FORM_1_PDF_FILE;
			params['serviceId'] = me.ROROC_FORM_1_PDF_PDF_FUNCTION;
			
		}else if( crtRadioVal.vorRpt === 'rorocForm2'){
			
			if( me.isOrgBargeVsl == false && me.isBargeVslDbk == false ) {
				MessageUtil.warning('warning', 'vor_vessel_call_id_not_able_to_use_form_2_msg');
				return;
			}
			
			if(me.getViewModel().get('reportFrom2') == null){
				MessageUtil.noMatchData();
				return;
			}
			
			if( me.isBargeVslDbk == true && me.vslCallIDDbk != null) {
				params['param5'] = me.vslCallIDDbk;
			} else {
				params['param5'] = '';
			}
			
			params['file'] = me.ROROC_FORM_2_PDF_FILE;
			params['serviceId'] = me.ROROC_FORM_2_PDF_PDF_FUNCTION;
		}
		
		if(me.printType == 'PDF') {
			params['printType'] = 'PDF';		// print type PDF EXCEL
			me.openPDFPreview(params);
		} if (me.printType == 'EXCEL') {
			params['printType'] = 'EXCEL';		// print type PDF EXCEL
			me.downloadExcel(params);
		}
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});