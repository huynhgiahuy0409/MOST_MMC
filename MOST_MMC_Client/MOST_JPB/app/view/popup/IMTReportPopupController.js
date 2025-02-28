Ext.define('MOST.view.popup.IMTReportPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.imtreportpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	PDF_FILE: 'RCS019.jrxml',
	PDF_FUNCTION: 'MOST.documentReport.previewInternalMovementTicket',
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
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		var gateCombo = me.getViewModel().getStore('gateCombo');
		var scaleCombo = me.getViewModel().getStore('scaleCombo');
		
		gateCombo.load();
		scaleCombo.load();
		
		var recvData = me.getView().recvData;
	},
	
	onOk: function(){
		var me = this;
		var refs = me.getReferences();
		
//		var returnItem = {
//				gateNo : refs.ctlGateNo.getValue(),
//				scaleNo : refs.ctlScaleNo.getValue(),
//				item : me.getView().recvData
//			}
		
		var detailItem = me.getView().recvData;
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		if(detailItem.get('truckVerify') == 'N' || detailItem.get('chassisVerify') == 'N'){
			MessageUtil.warning("warning_msg", "Please Check verify of Truck or Chassis");
			return;
		}
		
		params['file'] = me.PDF_FILE; // report format file name
		params['serviceId'] = me.PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = detailItem.get("vslCallId"); //vessel call id
		params['param2'] = detailItem.get("seq"); //seq
		params['param3'] = detailItem.get("blNo");
		params['param4'] = detailItem.get("shipgNoteNo");
		params['param5'] = detailItem.get("grNo");
		params['param6'] = detailItem.get("subDoNo");
		params['param7'] = refs.ctlGateNo.getValue();
		params['param8'] = refs.ctlScaleNo.getValue();
		params['param9'] = MOST.config.Token.getUserId(); //user Id
		
		me.openPDFPreview(params);
		
		//var window = me.getView().up('window');
		//window.close();
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});