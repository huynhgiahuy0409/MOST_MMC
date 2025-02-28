Ext.define('MOST.view.billing.InvoiceList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-invoicelist',
	requires: [
		'MOST.view.billing.InvoiceListController',
		'MOST.view.billing.InvoiceListModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
	],

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refInvoiceListGrid',
	MAIN_STORE_NAME: 'invoiceListStore',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	detailViewAlias: 'app-invoicedetail',
	controller: 'invoicinglist',
	viewModel: {
		type: 'invoicinglist',
	},
	listeners: {
		afterrender: 'onLoad',
	},
	reference: 'refInvoiceList',
	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '0 5 5 0',
					stateId: 'stateInvoiceListGrid',
					plugins: ['gridexporter', 'gridfilters', 'clipboard'],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}',
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
					},
					listeners: {
						cellDblClick: 'onDblClick',
						pagingSearch: 'onSearch',
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('InvoiceList'),
					},
				},
			],

			dockedItems: [
				{
					xtype: 'container',
					style: { 'background-color': 'white' },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '5 5 0 0',
					},
					items: [
						{
							xtype: 'tbfill',
						},
						{
							xtype: 'button',
							reference: 'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							listeners: {
								click: 'onSearchBtn',
							},
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('add'),
							ui: 'create-button',
							reference: 'refBtnCreate',
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd',
							},
						},
						{
							xtype: 'button',
							reference: 'refBtnPreview',
							text: ViewUtil.getLabel('exportToPdf'),
							iconCls: 'x-fa fa-file-pdf-o',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args: [me.MAIN_GRID_REF_NAME, false],
								},
							},
						},
						{
							xtype: 'button',
							reference: 'refBtnDownload',
							text: ViewUtil.getLabel('exportToExcel'),
							iconCls: 'excel-button-image',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args: [me.MAIN_GRID_REF_NAME, true],
								},
							},
						},
						{
							xtype: 'button',
							cls: 'column-setting-button',
							iconCls: 'x-fa fa-columns',
							text: ViewUtil.getLabel('column'),
							listeners: {
								click: 'onColumnSettingPopup',
								args: [me.MAIN_GRID_REF_NAME],
							},
						},
					],
				},
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('search'),
							flex: 1,
							margin: '0 5 0 0',
							padding: '0 10 10 10',
							autoScroll: true,
							collapsible: true,
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							defaults: {
								margin: '0 0 0 5',
							},
							items: [ 
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										labelWidth: 80,
										labelAlign: 'right',
									},
									items: [
										{
											xtype: 'shipcallnofield',
											reference: 'ctlScn',
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											bind: {
												value: '{theSearch.scn}',
											},
										},
										,
										{
											xtype: 'vesselcalllistfield',
											fieldLabel: ViewUtil.getLabel('vessel'),
											reference: 'txtVslCallId',
											margin: '5 0 0 0',
											bind: {
												value: '{theSearch.vslCallId}',
											},
										},
									],
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										width: '100%',
									},
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											margin: '0 0 5 0', 
											items: [
												{
													xtype: 'radiogroup',
													width: '100%',
													layout: {
														type: 'hbox',
														align: 'stretch'
													},
													reference: 'ctl_optATB',
													defaults: {
														flex: 1
													},
													items: [
														{
															xtype: 'radiofield',
															boxLabel: ViewUtil.getLabel('ATBInList'),
															reference: 'refRadioAtb',
															name: 'ATB_radio',
															inputValue: '1',
															checked: true,
															listeners: {},
														},
														{
															xtype: 'radiofield',
															boxLabel: ViewUtil.getLabel('inDate'),
															reference: 'refRadioInDt',
															name: 'ATB_radio',
															inputValue: '2',
														},
														{
															xtype: 'radiofield',
															boxLabel: ViewUtil.getLabel('ERP'),
															reference: 'refRadioErp',
															inputValue: '3',
															listeners: {
																change: 'onRadioERP_CheckHandler',
															},
														},
													],
												},
											],
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												flex: 1
											},
											items: [
												{
													xtype: 'datefield',
													reference: 'ctlDateFromDt',
													id: 'ctlDateFromDt',
													format: MOST.config.Locale.getShortDate(),
													listeners: {
														change: 'onDateChange',
													},
												},
												{
													xtype: 'datefield',
													reference: 'ctlDateToDt',
													margin: '0 0 0 5',
													id: 'ctlDateToDt',
													format: MOST.config.Locale.getShortDate(),
													listeners: {
														change: 'onDateChange',
													},
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										width: '100%',
										margin: '0 0 0 0',
										labelWidth: 80,
										labelAlign: 'right',
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'ctrlInvoiceNo',
											fieldLabel: ViewUtil.getLabel('inNo'),
											listeners: {
												change: 'onUpperCase',
											},
											bind: {
												value: '{theSearch.invoiceNo}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refsPayer',
											margin: '5 0 0 0',
											fieldLabel: ViewUtil.getLabel('inPayer'),
											listeners: {
												change: 'onUpperCase',
											},
											bind: {
												value: '{theSearch.payer}',
											},
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									flex: 1,
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
									},
									items: [
										{
											reference: 'ctlstatusCombo',
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('statusIn'),
											queryMode: 'local',
											bind: {
												store: '{statusCombo}',
												value: '{theSearch.status}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select status',
											editable: false,
											allowBlank: true,
										},
										{
											reference: 'ctlforeignCuCombo',
											id: 'ctlforeignCuCombo',
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('foreignCu'),
											forceSelection: true,
											queryMode: 'local',
											bind: {
												store: '{currencyCombo}',
												value: '{theSearch.crcyCd}',
											},
											displayField: 'currency',
											valueField: 'currency',
											emptyText: 'Select currency',
											editable: false,
											listeners: {
												select: 'onSelectedCurrency',
											},
										},
									],
									hidden: true,
								},
								{
									xtype: 'container',
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									flex: 1,
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
									},
									items: [
										{
											reference: 'ctlInvoiceTypeCombo',
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('invoiceType'),
											queryMode: 'local',
											bind: {
												store: '{invoiceTypeCombo}',
												value: '{theSearch.invoiceType}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select type',
											editable: false,
											matchFieldWidth: false,
											allowBlank: true,
											hidden: true,
										},
										{
											reference: 'ctlInPrefixCombo',
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('inPrefix'),
											queryMode: 'local',
											bind: {
												store: '{prefixCombo}',
												value: '{theSearch.ivPrfx}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											editable: false,
											allowBlank: true,
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'vbox',
										align: 'end'
									},
									flex: 1,
									defaults: {
										width: 120,
									},
									items: [
										{
											xtype: 'button',
											text: ViewUtil.getLabel('inTrans'),
											reference: 'refTransfer',
											listeners: {
												click: 'onTransfer',
											},
											style: 'background-color:#9900ff; color:red;',
										},
										{
											xtype: 'button',
											reference: 'refTransferAll',
											text: ViewUtil.getLabel('inTransAll'),
											listeners: {
												click: 'onTranfferAll',
											},
											disabled: true,
											style: 'background-color:#9900ff;color:red; margin-top: 5px',
										},
									],
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
