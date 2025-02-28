Ext.define('MOST.view.monitoring.GatePassDetailController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],
	alias: 'controller.gatepassdetail',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	GATE_PASS_PDF_FILE: 'RMT001.jrxml',
	GATE_PASS_PDF_FUNCTION: 'MOST.monitoringReport.getGatePassDetailReportItems',
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var store = me.getStore('gatePassDetail');
		var params = me.getSearchCondition();
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.getViewModel().setData({theDetail:record[0]});
					}
				}
			}
		});
	},
	
	onPrintPDF: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var detailItem = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		if(Token.getUserType() == CodeConstants.USER_TYPE_EXTERNAL){
			if(detailItem.data.blNo != null && detailItem.data.blNo != ''){
				if(Token.getPtnrCode() != detailItem.data.cnsne){
					return;
				}
			} else if(detailItem.data.shipgNoteNo != null && detailItem.data.shipgNoteNo != ''){
				if(Token.getPtnrCode() != detailItem.data.shpr){
					return;
				}
			}
		} 
		
		params['file'] = me.GATE_PASS_PDF_FILE; // report format file name
		params['serviceId'] = me.GATE_PASS_PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = detailItem.get("vslCallId"); //vessel call id
		params['param2'] = MOST.config.Token.getUserId(); //user Id
		params['param3'] = "update"; //search Flag
		params['param4'] = ""; //TranshipmentType CD
		
		me.openPDFPreview(params);
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var userId = MOST.config.Token.getUserId();
    	var params = {
			vslCallId : recvData.get('vslCallId'),
			cgNo : recvData.get('cgNo'),
			gatePassNo : recvData.get('gatePassNo'),
			cgInOutCd : recvData.get('cgInOutCd'),
			seq : recvData.get('seq'),
			userId: userId
		};
    	
    	return params;
	},
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		
		var storePDF = me.getStore('generatePDFGatePassDetail');
		storePDF.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
					window.close();
				}
			}
		});
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});