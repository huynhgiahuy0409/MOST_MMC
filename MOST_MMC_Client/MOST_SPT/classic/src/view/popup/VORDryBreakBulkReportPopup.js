Ext.define('MOST.view.popup.VORDryBreakBulkReportPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-vordrybreakbulkreportpopup',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"VOR Dry Break Bulk Report",
	width: 550,
	height: 350,

	controller: 'vordrybreakbulkreportpopupcontroller',
	
	viewModel: {
		type: 'vordrybreakbulk'
	},
	
	listeners:{
		afterrender: 'onLoadPopupPDF'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					reference : 'ctlReport1',
					items: [
						{
							xtype: 'container',
							margin: '5 0 0 0',
							layout:{
								type: 'hbox',
							    pack: 'center'
							},
							items: [
								{
									xtype : 'radiogroup',
									layout : 'vbox',
									reference : 'ctlOptRpt',
									margin: '5 0 0 0',
									items : [
									{
										xtype : 'radiofield',
										reference : 'refPortOfDeparture',
										name : 'vorRpt',
										inputValue : 'portOfDeparture',
										boxLabel : 'Port of Departure',
										margin : '0 10 0 10',
										labelWidth: 50,
										checked : true,
										width: 200,
										listeners : {
											//change: 'onCheckRptOpt'
										},
									},
//									{
//										xtype : 'radiofield',
//										reference : 'refOpeSrvReport',
//										name : 'vorRpt',
//										inputValue : 'opeSrvReport',
//										boxLabel : 'Operating Service Report',
//										margin : '0 10 0 10',
//										listeners : {
//											//change: 'onCheckRptOpt'
//										},
//									},
									{
										xtype : 'radiofield',
										reference : 'refRorocHdlSrv',
										name : 'vorRpt',
										inputValue : 'operatingService',
										boxLabel : 'Report of Operating Service',
										margin : '0 10 0 10',
										labelWidth: 50,
//										checked : true,
										width: 200,
										listeners : {
											//change: 'onCheckRptOpt'
										},
									},
									{
										xtype : 'radiofield',
										reference : 'refRorocForm1',
										name : 'vorRpt',
										inputValue : 'rorocForm1',
										boxLabel : 'ROROC – FORM 1',
										margin : '0 10 0 10',
										listeners : {
											//change: 'onCheckRptOpt'
										},
									},
									{
										xtype : 'radiofield',
										reference : 'refRorocForm2',
										name : 'vorRpt',
										inputValue : 'rorocForm2',
										boxLabel : 'ROROC – FORM 2',
										margin : '0 10 0 10',
										listeners : {
											//change: 'onCheckRptOpt'
										},
									}
									]
								},
							]
						},
						{
							xtype : 'container',
							layout : {
								type : 'hbox',
								align: 'center'
							},
							defaults:{
								margin: '10 0 0 0'
							},
							items: [
								{
									xtype:'textareafield',
									reference:'refPrtDrtRmk',
									fieldLabel: ViewUtil.getLabel('remark'),
									labelAlign: 'right',
				   					labelWidth: 60,
				   					height: 100,
									width: 500,
									multiline: true,
									emptyText: 'Remark',
				   				}
							]
						},
						{
							xtype: 'container',
							layout:{
								type: 'hbox',
							    pack: 'center'
							},
							defaults:{
								margin: '10 0 0 10'
							},
							items: [
								{
									xtype: 'button',
									text: ViewUtil.getLabel('pdfFile'),
									name: 'btnSearch',
									width: 70,
									listeners:{
										click:'onOkToPreviewDetailPDF'
									}
								},
								{
									xtype: 'button',
									text: ViewUtil.getLabel('excelFile'),
									name: 'btnSearch',
									width: 70,
									listeners:{
										click:'onOkToPreviewDetailExcel'
									}
								},
								{
									xtype: 'button',
									text: ViewUtil.getLabel('cancel'),
									width: 70,
									listeners: {
										click: 'onCancel'
									}
								}
							]
						}
					]
				}
			]
		});
		me.callParent();
	}
});


