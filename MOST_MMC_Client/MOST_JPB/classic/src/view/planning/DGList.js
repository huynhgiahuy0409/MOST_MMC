Ext.define('MOST.view.planning.DGList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-dglist',

	requires: [
		'MOST.view.planning.DGListModel',
		'MOST.view.planning.DGlistController',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	detailViewAlias: 'dgdetail',

	closeFunction: 'Y',

	controller: 'dglist',

	viewModel: {
		type: 'dglist'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDgListGrid',
	MAIN_STORE_NAME: 'dgList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: { 
		type: 'vbox', 
		align: 'stretch' 
	},

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '5 5 5 0',
					stateful: true,
					stateId: 'stateDGListGridId',

					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],

					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},

					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}',
					},

					listeners: {
						pagingSearch: 'onSearch',
						cellDblClick: 'onDblClick'
					},
					columns: {
						defaults: {
							style: 'text-align: center',
							align: 'left'
						},
						items: GridUtil.getGridColumns('DGlist')
					}
				}
			],

			dockedItems: [
				{
					xtype: 'container',
					style: { "background-color": "white" },
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								pack: 'end'
							},
							flex: 1,
							margin: '5 5 0 0',
							items: [
								{
									xtype: 'button',
									reference: 'refBtnRetrieve',
									text: ViewUtil.getLabel('search'),
									iconCls: 'x-fa fa-search',
									cls: 'search-button',
									listeners: {
										click: 'onSearch'
									}
								},
								// {
								// 	ui: 'default-toolbar',
								// 	xtype: 'button',
								// 	margin: '1 5 0 0',
								// 	cls: 'dock-tab-btn',
								// 	text: 'Export to ...',
								// 	menu: {
								// 		defaults: {
								// 			handler: 'exportTo'
								// 		},
								// 		items: [
								// 			{
								// 				text: 'Excel xlsx',
								// 				cfg: {
								// 					type: 'excel07',
								// 					ext: 'xlsx'
								// 				}
								// 			},
								// 			{
								// 				text: 'Excel xlsx (include groups)',
								// 				cfg: {
								// 					type: 'excel07',
								// 					ext: 'xlsx',
								// 					includeGroups: true,
								// 					includeSummary: true
								// 				}
								// 			},
								// 			{
								// 				text: 'Excel xml',
								// 				cfg: {
								// 					type: 'excel03',
								// 					ext: 'xml'
								// 				}
								// 			},
								// 			{
								// 				text: 'Excel xml (include groups)',
								// 				cfg: {
								// 					includeGroups: true,
								// 					includeSummary: true
								// 				}
								// 			},
								// 			{
								// 				text: 'CSV',
								// 				cfg: {
								// 					type: 'csv'
								// 				}
								// 			},
								// 			{
								// 				text: 'TSV',
								// 				cfg: {
								// 					type: 'tsv',
								// 					ext: 'csv'
								// 				}
								// 			},
								// 			{
								// 				text: 'HTML',
								// 				cfg: {
								// 					type: 'html'
								// 				}
								// 			},
								// 			{
								// 				text: 'HTML (include groups)',
								// 				cfg: {
								// 					type: 'html',
								// 					includeGroups: true,
								// 					includeSummary: true
								// 				}
								// 			}
								// 		]
								// 	}
								// }
							]
						}
					]
				},
				{
					xtype: 'toolbar',
					padding: '0 0 0 0',
					margin: '0 0 0 0',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right'
					},
					items: [
						{
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible: true,
							flex: 1,
							padding: '0 10 10 10',
							margin: '0 0 0 0',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								flex: 1
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									items: [
										{
											reference: 'ctlFromDt',
											xtype: 'datefield',
											labelWidth: 110,
											width: 250,
											fieldLabel: ViewUtil.getLabel('dgDeclarationDate'),
											format: MOST.config.Locale.getShortDate(),
											editable: false,
											listeners: {
												blur: 'onDateChange'
											}
										},
										{
											reference: 'ctlToDt',
											margin: '5 0 0 5',
											xtype: 'datefield',
											width: 150,
											format: MOST.config.Locale.getShortDate(),
											editable: false,
											listeners: {
												blur: 'onDateChange'
											}
										},
										{
											xtype: 'vesselcalllistfield',
											labelWidth: 80,
											width: 290,
											fieldLabel: ViewUtil.getLabel('vslCallId'),
											reference: 'ctlJpvc',
											emptyText: ViewUtil.getLabel('vslCallId')
										},
										{
											xtype: 'textfield',
											width: 290,
											fieldLabel: ViewUtil.getLabel('blNo'),
											reference: 'ctlBl',
											labelWidth: 90
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('dgCategory'),
											reference: 'ctlDgCategory',
											width: 250,
											labelWidth: 110,
											bind: {
												store: '{categoryCombo}'
											},
											displayField: 'name',
											valueField: 'code',
											editable: false,
											queryMode: 'local'
										},
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('status'),
											reference: 'ctlStatus',
											labelWidth: 55,
											width: 155,
											bind: {
												store: '{statusCombo}'
											},
											displayField: 'name',
											valueField: 'code',
											editable: false,
											queryMode: 'local'
										},
										{
											xtype: 'textfield',
											width: 290,
											fieldLabel: ViewUtil.getLabel('sNNo'),
											reference: 'ctlSn',
											labelWidth: 80
										}
									]
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