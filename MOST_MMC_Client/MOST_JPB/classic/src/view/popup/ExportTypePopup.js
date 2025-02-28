Ext.define('MOST.view.popup.ExportTypePopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-exporttypepopup',
	requires: [

	],

	title: "Download Report",
	width: 240,

	listeners: {
	},
	config: {
	},

	lblPdf: { type: 'bundle', key: 'pdfFile' },
	lblExcel: { type: 'bundle', key: 'excelFile' },
	btnCancle: { type: 'bundle', key: 'cancel' },
	btnExport: { type: 'bundle', key: 'ok' },

	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'center'
	},

	initComponent: function () {

		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					flex: 1,
					items: [
						{
							xtype: 'radiogroup',
							columns: 1,
							reference: 'refRadioReportType',
							flex: 1,
							padding: '5 10 0 5',
							margin: '0 0 0 0',
							items: [
								{
									boxLabel: me.lblPdf,
									inputValue: 'PDF',
									name: 'rb',
									reference: 'refRadioPdf',
									checked: true
								},
								{
									boxLabel: me.lblExcel,
									inputValue: 'EXCEL',
									name: 'rb',
									reference: 'refRadioExcel'
								}
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'center'
							},
							padding: '5 10 10 10',
							items: [
								{
									xtype: 'button',
									text: ViewUtil.getLabel('exportToPdf'),
									height: 33,
									flex: 1,
									margin: '0 5 0 0',
									reference: 'refBtnExportTypePopupOK',
									name: 'btnExportTypePopupOK',
									listeners: {
										click: 'onDownloadExport'
									}
								},
								{
									xtype: 'button',
									text: ViewUtil.getLabel('cancel'),
									flex: 1,
									height: 33,
									margin: '0 0 0 5',
									reference: 'refBtnCancelPopupOK',
									name: 'btnCancle',
									listeners: {
										click: 'onDownloadCancel'
									}
								}
							]
						}]
				}]
		});

		me.callParent();
	}
});

