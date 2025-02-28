Ext.define('MOST.view.main.AlertList', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-alertlist',

	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
	],

	controller: 'alertlist',
	viewModel: {
		type: 'alertlist',
	},
	layout: {
		type: 'fit'
	},
	listeners: {
		afterrender: 'onLoad',
	},

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'grid',
					reference: 'refAlertListGrid',
					plugins: ['gridexporter', 'gridfilters', 'clipboard'],
					bind: {
						store: '{alertList}',
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
					},
					afterrender: this.onGridAfterRender,
					listeners: {
						celldblclick: 'dblclick',
					},
					columns: {
						defaults: {
							align : 'center'
						},
						items: [
							{
								header: 'Property',
								dataIndex: 'property',
								editable: false, 
								flex: 2,
								style: 'text-align:center',
								align: 'left'
							},
							{
								header: 'Count',
								dataIndex: 'cnt',
								editable: false,
								flex: 1
							},
						],
					},
				},
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					padding: '0 0 0 0',
					enableOverflow: true,
					layout: {
						type: 'vbox',
						align: 'stretch',
					},
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'container',
							margin: '0 0 0 0',
							padding: '5 5 5 5',
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							defaults: {
								labelAlign: 'right',
								editable: false,
							},
							items: [
								{
									xtype: 'label',
									html: 'Alert List',
									style: {
										fontWeight: 'bold',
									}
								},
							],
						},
					],
				},
			],
		});

		me.callParent();
	},
});
