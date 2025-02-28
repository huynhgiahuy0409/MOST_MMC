Ext.define('MOST.view.billing.ForeignExchangeRate', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-foreignexchangerate',
	requires: [
		'MOST.view.billing.ForeignExchangeRateModel',
		'MOST.view.billing.ForeignExchangeRateController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'foreignexchangerate',

	viewModel: {
		type: 'foreignexchangerate'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	layout: { type: 'vbox', align: 'stretch' },

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refforeignexchangerateGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'foreignExchangeRateList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.CellEditing', {
			ptype: 'cellediting',
			clicksToEdit: 2,
			pluginId: 'foreignexchangerateEditor',
			listeners: {
				edit: 'onEdit'
			}
		});

		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '0 5 0 0',
					plugins: [
						rowEditing,
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						rowSelect: true,
						cellSelect: false,
					},
					listeners: {
						cellDblClick: 'onDblClick',
						pagingSearch: 'onSearch'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('ForeignExchangeRate')
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
						margin: '5 5 0 0'
					},
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
						{
							xtype: 'button',
							itemId: 'btnAdd',
							reference: 'refBtnCreate',
							text: ViewUtil.getLabel('add'),
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
						},
						{
							xtype: 'button',
							itemId: 'btnDelete',
							reference: 'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
							}
						},
						{
							xtype: 'button',
							reference: 'refBtnUpdate',
							text: ViewUtil.getLabel('update'),
							ui: 'update-button',
							iconCls: 'fa fa-pencil-square-o',
							listeners: {
								click: 'onUpdate'
							}
						},
						{
							xtype: 'button',
							itemId: 'exportToExcelButton',
							text: ViewUtil.getLabel('exportToExcel'),
							iconCls: 'excel-button-image',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args: [me.MAIN_GRID_REF_NAME, true]
								}
							}
						},
						{
							xtype: 'button',
							itemId: 'exportToPdfButton',
							text: ViewUtil.getLabel('exportToPdf'),
							iconCls: 'x-fa fa-file-pdf-o',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args: [me.MAIN_GRID_REF_NAME, false]
								}
							}
						},
						{
							xtype: 'button',
							cls: 'column-setting-button',
							iconCls: 'x-fa fa-columns',
							text: ViewUtil.getLabel('column'),
							listeners: {
								click: 'onColumnSettingPopup',
								args: [me.MAIN_GRID_REF_NAME]
							}
						}
					]
				},
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible: true,
							flex: 1,
							margin: '0 5 5 0',
							padding: '5 10 10 10',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 0 5 0'
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 20'
									},
									items: [
										{
											xtype: 'combo',
											reference: 'refApplyDateCombo',
											labelWidth: 70,
											flex: 1,
											fieldLabel: ViewUtil.getLabel('applyDate'),
											queryMode: 'local',
											bind: {
												store: '{applyDateCombo}',
												value: '{theSearch.currency}'
											},
											displayField: 'indexDt',
											valueField: 'applyDate',
											editable: false,
											allowBlank: false,
											listeners: {
												select: 'onCboApplyDtSelect'
											}
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelAlign: 'right', 
											},
											flex: 1,
											items: [
												{
													xtype: 'datefield',
													reference: 'refApplyDateDt',
													labelWidth: 35,
													flex: 1,
													fieldLabel: ViewUtil.getLabel('from'),
													format: MOST.config.Locale.getShortDate(),
													allowBlank: false,
													disabled: true
												},
												{
		
													xtype: 'datefield',
													reference: 'refExpireDateDt',
													labelWidth: 20,
													flex: 1,
													margin: '0 0 0 5',
													fieldLabel: ViewUtil.getLabel('to'),
													format: MOST.config.Locale.getShortDate(),
													allowBlank: false,
													disabled: true
												}
											]
										},
										{
											xtype: 'container',
											flex: 2
										}
									]
								}
							]
						},
						{
							xtype: 'fieldset',
							hidden: true,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							margin: '0 5 5 0',
							padding: '15 10 15 10',
							defaults: {
								margin: '0 0 0 20',
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'combo',
									reference: 'refCopyRateApplyDateCombo',
									labelWidth: 70,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('applyDate'),
									queryMode: 'local',
									bind: {
										store: '{applyDateCombo}'
									},
									displayField: 'indexDt',
									valueField: 'applyDate',
									editable: false,
									allowBlank: true,
									disabled: true
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right', 
										margin: '0 0 0 8'
									},
									flex: 1,
									items: [
										{
											xtype: 'button',
											reference: 'refBtnCopyRate',
											text: ViewUtil.getLabel('applyDate'),
											ui: 'update-button',
											iconCls: 'fa fa-check-square-o',
											disabled: true,
											listeners: {
												click: 'onCopyRate'
											}
										},
									]
								},
								{
									xtype: 'container',
									flex: 2
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

