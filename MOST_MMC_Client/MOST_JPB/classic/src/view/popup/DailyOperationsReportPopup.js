Ext.define('MOST.view.popup.DailyOperationsReportPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-dailyoperationsreportpopup',
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
	
	title:"Daily Operations Report Popup",
	width: 550,
	height: 300,

	controller: 'dailyoperationreport',
	
	viewModel: {
//		type: 'cerfshrtovrlndedcargo'
	},
	
	listeners:{
//		afterrender: 'onLoadPopupPDF'
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
									reference:'refRmkRpt',
									fieldLabel: ViewUtil.getLabel('remark'),
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
							margin: '5 0 0 0',
							layout:{
								type: 'hbox',
							    pack: 'center'
							},
							items: [
								{
									xtype: 'button',
									text: ViewUtil.getLabel('ok'),
									name: 'btnSearch',
									listeners:{
										click:'onPreviewPDFDetail'
									}
								}
							]
						}
					]
				},
			],

		});
		
		me.callParent();
	}
});


