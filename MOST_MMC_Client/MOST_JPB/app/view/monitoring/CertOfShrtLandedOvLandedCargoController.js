Ext.define('MOST.view.monitoring.CertOfShrtLandedOvLandedCargoController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.certofshrtlandedovlandedcargo',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 91,	// MAX PERIOD DATE
	
	MAIN_GRID_REF_NAME: 'refDischargingGrid',
	MAIN_STORE_NAME: 'discharging',
	
	REPORT_PDF_FILE: 'CertOfShrtLandedOvLandedCargo.jrxml',
	REPORT_PDF_FUNCTION: 'MOST.monitoringReport.selectCertOfShrtLandedOvLandedCargoReport',
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
		
		var searchParm = Ext.create('MOST.model.monitoring.SearchDischargingParm');
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
    	var store =  me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
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
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchLoadingParm';
		searchBizParm.serviceID = 'MOST.loading.selectListOfLoading'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onPreviewPDF: function() {
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		theSearch.set('printType', 'PDF');
		
		me.openCodePopup('popup-shortlandedoverlandedcargopopup', 'Certificate of Shortlanded and Overlanded Cargo Report', null);
	},
	
	onPreviewExcel: function() {
		var me = this;
		var refs = me.getReferences();
		var theSearch = me.getViewModel().get('theSearch');
		theSearch.set('printType', 'EXCEL');
		
		me.openCodePopup('popup-shortlandedoverlandedcargopopup', 'Certificate of Shortlanded and Overlanded Cargo Report', null);
	},
	
	onPreviewPDFDetail: function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		var theSearch = me.getViewModel().get('theSearch');
		var printType = theSearch.data.printType;
		var vslCallId = StringUtil.toUpperCase(theSearch.data.vslCallId);
		var mfDocId = theSearch.data.mfDocId;
     	var setMfDocId = me.splitString(mfDocId);
		var blNo = theSearch.data.blNo;
		
		if(StringUtil.isNullorEmpty(vslCallId)){
			MessageUtil.warning('Warning', 'inputVslCallIdMsg');
			return;
     	}
		
		params['branchCode'] = MOST.config.Token.getBranchCode(); 	// branch code fro multi db
		params['param1'] = vslCallId; 								// Vessel Call id
		params['param2'] = setMfDocId;
		params['param3'] = blNo;
		params['param4'] = MOST.config.Token.getUserId(); 			// User Id
		params['param5'] = refs.refRmkRpt.getValue().replaceAll('\n',' <br>');
		
		params['file'] = me.REPORT_PDF_FILE;
		params['serviceId'] = me.REPORT_PDF_FUNCTION;
		
		if(printType == 'PDF') {
			params['printType'] = 'PDF';		// print type PDF EXCEL
			me.openPDFPreview(params);
		} if (printType == 'EXCEL') {
			params['printType'] = 'EXCEL';		// print type PDF EXCEL
			me.downloadExcel(params);
		}
	},
	
	onOpenMasterBLPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theSearch');
		
		var params = {
				vslCallId: detailItem.get('vslCallId'),
		}
		
		me.openCodePopup('popup-masterblformultipopup', 'ctlMasterBLCombo', params);
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
				me.getViewModel().setData({theVsl:returnValue.item});
			} 
			else {
				me.getViewModel().setData({theVsl:null});
			}
			refs.ctlMasterBLCombo.setValue("");
		}
		
	},
	
	// Search Master BL List:
	searchMasterBLCombo:function(isClear){
		var me = this;
		var store = me.getStore('dischargingManifestCombo');

		var searchParm = me.getViewModel().get('theSearch');
		var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
		
		if(isClear){
			store.removeAll();
		} else {
			store.load({
				params: {
					vslCallId: vslCallId
				},
				callback: function(records, operation, success) {
					if (success) {
						store.insert(0, [{scdNm: 'All', scd: '' }]);
					}
				}
			});
		}
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
     	
     	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	var mfDocId = refs.ctlMasterBLCombo.getValue();
     	var setMfDocId = me.splitString(mfDocId);
     	
     	
    	params['vslCallId'] = vslCallId;
    	params['mfDocId'] = setMfDocId;
    	
    	return params;
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	splitString: function (string) {
		var splitedString = '';
		if (!StringUtil.isNullorEmpty(string)) {
			splitString = string.replace(/\s/gi, "").split(',');
			if (splitString.length > 0) {

				if (splitString.length == 1) {
					splitedString = "'" + splitString[0] + "'";
				} else {
					for (var i = 0; i < splitString.length; i++) {
						if (splitedString === '') {
							splitedString = "'" + splitString[i] + "'";
						} else {
							splitedString += ",'" + splitString[i] + "'";
						}
					}
				}
			}
		}
		return splitedString;
	},

});