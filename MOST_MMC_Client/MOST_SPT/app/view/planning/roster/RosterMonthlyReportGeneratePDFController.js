Ext.define('MOST.view.controller.RosterMonthlyReportGeneratePDFController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.rostermonthlyreportgeneratepdf',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 7,	// MAX PERIOD DATE
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
	
//	// Grid Edit
//	onEdit : function(editor, context){
//		context.record.data.workingStatus = context.record.crudState;
//	},
	
	// Grid Edit

	// Search Condition
	onLoadPopupPDF:function(){
		var me = this;
		var refs = me.getReferences();
		me.setDateInDays('ctlDateFromDt');
		
		var params = me.getView().recvData;

		if(params.previewType != 'DOWNLOAD'){
			refs.ctl_optRptTp.setHidden(true);
		}
		
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		window.close();
	},
	onOkPDF:function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var storePDF = me.getStore('previewPDFRosterConfiguration');
		var params = me.getView().recvData;
		var fromDate = refs.ctlDateFromDt.getValue();
		var datefromStrg = fromDate==null?null:Ext.Date.format(fromDate, MOST.config.Locale.getShortDate());
		
		params.rstrYmd = datefromStrg;
		params.doffYmd = datefromStrg;
		
		if(refs.ctl_optRptTp.getValue().rptTp == 'EXCEL'){
			params['exportTp'] = 'EXCEL';
		}else{
			params['exportTp'] = 'PDF';
		}
		
		if(params.previewType === 'PREVIEW'){
			storePDF.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						me.openPDFPreview (records, operation, success),
						Ext.MessageBox.hide();
						window.close();
					}
				}
			});
		}else{
			storePDF.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
						Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
						Ext.MessageBox.hide();
						window.close();
					}
				}
			});
		}
		
		
	},
	
	onOk:function(){
		var me = this;
		var refs = me.getReferences();
		
		var fromDate = refs.ctlDateFromDt.getValue();
		var datefromStrg = fromDate==null?null:Ext.Date.format(fromDate, MOST.config.Locale.getShortDate());
		if(StringUtil.isNullorEmpty(datefromStrg)){
			MessageUtil.info("Vessel Dellay Download", "vesselDelayNoDataFromDatMsg");
			return;
		}
		
		var msgBox = Ext.MessageBox.show({
			msg: 'Progressing...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			fn:me.onOkPDF(),
			waitConfig: {interval:100}
		});
		
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});