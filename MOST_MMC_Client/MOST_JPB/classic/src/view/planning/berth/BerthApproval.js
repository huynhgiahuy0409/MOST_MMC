Ext.define('MOST.view.planning.berth.BerthApproval', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthapproval',
	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
	],
	detailViewAlias: 'app-berthapprovaldetail',

	controller: 'berthapproval',

	viewModel: {
		type: 'berthapproval',
	},

	listeners: {
		afterrender: 'onLoad',
	}, 

	layout: { 
		type: 'vbox', 
		align: 'stretch' 
	},

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					margin: '5 5 5 5',
					padding: '10 10 10 10',
					defaults: {
						flex: 1
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '5 0 0 0',
								editable: false,
							},
							items: [
								{
									xtype: 'vesselcalllistfield',
									reference: 'ctlVesselCallId',
									fieldLabel: ViewUtil.getLabel('vslCallId'),
									fieldStyle : 'text-transform: uppercase',
									margin: '0 0 0 0',
								},
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								editable: false,
								margin: '5 0 0 0',
							},
							items: [
								{
									xtype: 'container',
									margin: '0 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('eta') + ':',
											style: {
												'margin-top': '5px',
												'text-align': 'right',
												'width': '80px'
											}
										},
										{
											xtype: 'datefield',
											reference: 'ctlEtaFromDt',
											flex: 1,
											margin: '0 0 0 5',
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												change: 'onDateChange',
											},
											editable: false,
										},
										{
											xtype: 'datefield',
											reference: 'ctlEtaToDt',
											flex: 1,
											margin: '0 0 0 5',
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												change: 'onDateChange',
											},
											editable: false,
										},
									]
								},
								{
									xtype: 'combo',
									reference: 'ctlVesselTypeCombo',
									fieldLabel: ViewUtil.getLabel('vesselType'),
									queryMode: 'local',
									bind: {
										store: '{vesselTypeCombo}',
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: '', 
								}, 
							],
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '5 0 0 0',
								editable: false,
								width: '100%'
							},
							items: [
								{
									xtype: 'combo',
									reference: 'ctlPlanCombo',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('plan'),
									queryMode: 'local',
									bind: {
										store: '{planStatus}',
									},
									displayField: 'name',
									valueField: 'code',
								},
								{
									xtype: 'combo',
									reference: 'ctlStatusCombo',
									fieldLabel: ViewUtil.getLabel('status'),
									queryMode: 'local',
									bind: {
										store: '{vesselStatusCombo}',
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: '',
								},
							],
						}, 
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '5 0 0 0',
							},
							items: [
								{
									xtype: 'combo',
									reference: 'ctlCargoTypeCombo',
									fieldLabel: ViewUtil.getLabel('cargoType'),
									margin: '0 0 0 0',
									queryMode: 'local',
									bind: {
										store: '{cargoTypeCombo}',
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: '',
								},
							]
						},
						{
							xtype: 'container',
							flex: 0.75
						}
					],
				},
				{
					xtype: 'tsb-datagrid',
					reference: 'refBerthApprovallistGrid',
					margin: '0 5 0 5',
					flex: 1,
					stateful: true,
					stateId: 'stateareBerthApprovallistGrid',
					plugins: ['gridexporter', 'gridfilters', 'clipboard'],
					bind: {
						store: '{berthApprovalList}',
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
					},
					listeners: {
						celldblclick: 'onDblClick',
					},
					viewConfig: {
						stripeRows: true,
						enableTextSelection: true,
						getRowClass: function (rec, index) {
							var vslBackcolor;
							if (rec.get('vslColor')) {
								if (rec.get('vslColor') === 'R') {
									vslBackcolor = 'berth-approval-status-r';
								} else if (rec.get('vslColor') === 'B') {
									vslBackcolor = 'berth-approval-status-b';
								} else if (rec.get('vslColor') === 'G') {
									vslBackcolor = 'berth-approval-status-g';
								}
							}
							return vslBackcolor;
						},
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('BerthApproval'),
					},
				},
			],
			dockedItems: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'end'
					},
					defaults: {
						margin: '5 5 0 0',
					},
					items: [
						{
							xtype: 'button',
							reference: 'refSearchBtn',
							text: ViewUtil.getLabel('search'),
							itemId: 'inquiryItemId',
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							listeners: {
								click: 'onSearchBtn',
							},
						},
						{
							xtype: 'button',
							reference: 'refBtnRefresh',
							text:  ViewUtil.getLabel('refresh'),
							iconCls: 'x-fa fa-refresh',
							listeners: {
								click: 'onRefresh',
							},
						},
						{
							xtype: 'button',
							itemId: 'downloadItemId',
							text: ViewUtil.getLabel('exportToExcel'),
							cls: 'excel-button',
							reference: 'refBtnDownload',
							iconCls: 'excel-button-image',
							listeners: {
								click: {
									fn: 'onExportExcel',
									args: ['refBerthApprovallistGrid'],
								},
							},
						},
						{
							ui: 'default-toolbar',
							xtype: 'button',
							margin: '5 5 0 0',
							cls: 'dock-tab-btn',
							text: 'Export to ...',
							menu: {
								defaults: {
									handler: 'exportTo',
								},
								items: [
									{
										text: 'Excel xlsx',
										cfg: {
											type: 'excel07',
											ext: 'xlsx',
										},
									},
									{
										text: 'Excel xlsx (include groups)',
										cfg: {
											type: 'excel07',
											ext: 'xlsx',
											includeGroups: true,
											includeSummary: true,
										},
									},
									{
										text: 'Excel xml',
										cfg: {
											type: 'excel03',
											ext: 'xml',
										},
									},
									{
										text: 'Excel xml (include groups)',
										cfg: {
											includeGroups: true,
											includeSummary: true,
										},
									},
									{
										text: 'CSV',
										cfg: {
											type: 'csv',
										},
									},
									{
										text: 'TSV',
										cfg: {
											type: 'tsv',
											ext: 'csv',
										},
									},
									{
										text: 'HTML',
										cfg: {
											type: 'html',
										},
									},
									{
										text: 'HTML (include groups)',
										cfg: {
											type: 'html',
											includeGroups: true,
											includeSummary: true,
										},
									},
								],
							},
						},
					],
				},
			],
		});

		me.callParent();
	},
});
