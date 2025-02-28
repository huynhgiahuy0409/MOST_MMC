Ext.define('MOST.view.operation.RehandlingOfRORO', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-rehandlingofroro',

	requires: [
		'MOST.view.operation.RehandlingOfROROModel',
		'MOST.view.operation.RehandlingOfROROController',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	detailViewAlias: 'app-rehandlingofrorodetail',

	controller: 'rehandlingofroro',

	viewModel: {
		type: 'rehandlingofroro'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'cargoItems',            // Main Store Name
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
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					margin: '5 5 5 0',
					height: 250,
					style: { "background-color": "white" },
					//usePagingToolbar : false,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						cellclick: 'onCargoGridItemClick',
						pagingSearch: 'onSearch'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('RehandlingOfROROCargoItems')
					}
				},

				{
					xtype: 'container',
					height: 25,
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					defaults: {
						margin: '0 5 0 5'
					},
					items: [
						{
							xtype: 'button',
							text: ViewUtil.getLabel('rehandling'),
							reference: 'refCreate',
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							disabled: false,
							listeners: {
								click: 'onAdd_clickHandler'
							}
						},
					]
				},

				{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'fieldset',
							flex: 1,
							title: ViewUtil.getLabel('rehandlingOfROROSummary'),
							margin: '0 0 0 0',
							padding: '0 10 10 10',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'tsb-datagrid',
									reference: 'refRehandlingOfROROGrid',
									flex: 1,
									style: { "background-color": "white" },
									//usePagingToolbar : false,
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{rehandlingItems}'
									},
									selModel: {
										type: 'spreadsheet',
										cellSelect: false
									},
									listeners: {
										cellclick: 'onRehandlingGridItemClick',
										celldblclick: 'onRehandlingGridItem_DblClick'
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center'
										},
										items: GridUtil.getGridColumns('RehandlingOfROROItems')
									}
								}
							]
						}
					]
				}

			],

			dockedItems: [
				{
					xtype: 'container',
					flex: 1,
					style: { "background-color": "white" },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '5 5 0 0'
					},
					items: [
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								//align: 'stretch',
								pack: 'end'
							},
							defaults: {
								margin: '0 0 0 5'
							},
							items: [
								{
									xtype: 'button',
									itemId: 'inquiryItemId',
									reference: 'refBtnRetrieve',
									text: ViewUtil.getLabel('search'),
									iconCls: 'x-fa fa-search',
									cls: 'search-button',
									listeners: {
										click: 'onSearch_clickHandler'
									}
								},
								{

									xtype: 'button',
									reference: 'refBtnDelete',
									//itemId: 'deleteItemId',
									reference: 'refDelete',
									text: ViewUtil.getLabel('delete'),
									ui: 'delete-button',
									iconCls: 'x-fa fa-minus',
									//disabled:true,
									listeners: {
										click: 'onRemove_clickHandler'
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

								}, {
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

								}, {
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
						}
					]
				},

				{//Search Condition and Vessel information:
					xtype: 'toolbar',
					enableOverflow: true,
					padding: '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [{
						xtype: 'searchfieldset',
						title: ViewUtil.getLabel('search'),
						autoScroll: true,
						collapsible: true,
						margin: '0 5 5 0',
						padding: '0 10 5 10',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							width: 250,
							labelAlign: 'right',
							labelWidth: 80, 
						},
						items: [
							//1
							{
								xtype: 'container',
								flex: 1,
								layout: {
									type: 'vbox'
								},
								defaults: {
									width: '100%',
									labelAlign: 'right',
									labelWidth: 100,
									margin: '0 0 5 5'
								},
								items: [
									{
										xtype: 'container',
										flex: 1,
										layout: {
											type: 'hbox'
										},
										defaults: {
											labelAlign: 'right',
											labelWidth: 100,
										},
										items: [
											{
												reference: 'ctlYardInFromDt',
												xtype: 'datefield',
												flex: 1.75,
												fieldLabel: ViewUtil.getLabel('yardInDate'),
												format: MOST.config.Locale.getShortDate(),
												editable: false,
												listeners: {
													//change: 'onDateChange'
												}
											},
											{
												reference: 'ctlYardInToDt',
												margin: '0 0 0 5',
												flex: 1,
												xtype: 'datefield',
												format: MOST.config.Locale.getShortDate(),
												editable: false,
												listeners: {
													//change: 'onDateChange'
												}
											}
										]
									},
									{
										xtype: 'combo',
										flex: 1,
										fieldLabel: ViewUtil.getLabel('category'),
										reference: 'ctlCatgType',
										emptyText: ViewUtil.getLabel('category'),
										bind: {
											store: '{categoryCombo}',
											value: '{theSearch.catgCd}'
										},
										displayField: 'scdNm',
										valueField: 'scd',
										queryMode: 'local',
										value: '',
										editable: false
									},
									{
										xtype: 'combo',
										flex: 1,
										fieldLabel: ViewUtil.getLabel('rehandleRehandleMode'),
										reference: 'ctlRhdlMode',
										emptyText: ViewUtil.getLabel('rehandleRehandleMode'),
										bind: {
											store: '{rehandlingModeCombo}',
											value: '{theSearch.rhdlModeCd}'
										},
										displayField: 'scdNm',
										valueField: 'scd',
										queryMode: 'local',
										value: '',
										editable: false
									},
									{
										xtype: 'container',
										layout: {
											type: 'hbox'
										},
										defaults: {
											labelAlign: 'right',
											labelWidth: 100,
										},
										items: [
											{
												reference: 'ctlEstArrvFromDt',
												xtype: 'datefield',
												flex: 1.75,
												fieldLabel: ViewUtil.getLabel('rehandleEstArrivalDate'),
												format: MOST.config.Locale.getShortDate(),
												editable: true,
												listeners: {
													//change: 'onDateChange'
												}
											},
											{
												reference: 'ctlEstArrvToDt',
												margin: '0 0 0 5',
												flex: 1,
												xtype: 'datefield',
												format: MOST.config.Locale.getShortDate(),
												editable: true,
												listeners: {
													//change: 'onDateChange'
												}
											}
										]
									},
								]
							},
							//2
							{
								xtype: 'container',
								flex: 1,
								layout: {
									type: 'vbox'
								},
								defaults: {
									width: '100%',
									labelAlign: 'right',
									labelWidth: 100,
									margin: '0 0 5 5'
								},
								items: [
									{
										xtype: 'vesselcalllistfield',
										reference: 'ctlVslCallId',
										fieldLabel: ViewUtil.getLabel('vslcallid'),
										emptyText: ViewUtil.getLabel('vslcallid'),
										bind: {
											value: '{theSearch.vslCallId}'
										}
									},
									{
										xtype: 'combo',
										fieldLabel: ViewUtil.getLabel('bLNo'),
										reference: 'ctlBlNo',
										emptyText: ViewUtil.getLabel('bLNo'),
										bind: {
											store: '{blCombo}',
											value: '{theSearch.blNo}'
										},
										displayField: 'cdNm',
										valueField: 'cd',
										queryMode: 'local',
										value: '',
										editable: true,
										anyMatch: true,
									},
									{
										xtype: 'combobox',
										fieldLabel: ViewUtil.getLabel('sNNo'),
										reference: 'ctlSnNo',
										emptyText: ViewUtil.getLabel('sNNo'),
										bind: {
											store: '{snCombo}',
											value: '{theSearch.shipgNoteNo}'
										},
										displayField: 'cdNm',
										valueField: 'cd',
										queryMode: 'local',
										value: '',
										editable: true,
										anyMatch: true,
									}
								]
							},
							{
								xtype: 'container',
								flex: 1,
								layout: {
									type: 'vbox'
								},
								defaults: {
									labelAlign: 'right',
									labelWidth: 100,
									margin: '0 0 5 5',
									width: '100%'
								},
								items: [
									{
										xtype: 'vesselcalllistfield',
										reference: 'ctlNextVslCallId',
										fieldLabel: ViewUtil.getLabel('nextVslcallid'),
										emptyText: ViewUtil.getLabel('nextVslcallid'),
										bind: {
											value: '{theSearch.nextVslCallId}'
										}
									},
									{
										xtype: 'combo',
										fieldLabel: ViewUtil.getLabel('nextSnNo'),
										reference: 'ctlNextSnNo',
										emptyText: ViewUtil.getLabel('nextSnNo'),
										bind: {
											store: '{nextSnCombo}',
											value: '{theSearch.nextShipgNoteNo}'
										},
										displayField: 'cdNm',
										valueField: 'cd',
										queryMode: 'local',
										value: '',
										editable: true,
										anyMatch: true,
									},
									{
										xtype: 'textfield',
										reference: 'ctlUnitNo',
										fieldLabel: ViewUtil.getLabel('unitNo'),
										fieldStyle: 'text-transform:uppercase',
										listeners: {
											change: 'onUpperCase'
										},
										bind: {
											value: '{theSearch.unitNo}'
										}
									}
								]
							},
							{
								xtype: 'container',
								flex: 1
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