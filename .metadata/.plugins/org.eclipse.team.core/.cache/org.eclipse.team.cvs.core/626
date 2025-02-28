Ext.define('MOST.view.billing.PackageTariffRates', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-packagetariffrates',
	requires: [
		'MOST.view.billing.PackageTariffRatesModel',
		'MOST.view.billing.PackageTariffRatesController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	detailViewAlias: 'app-partnertariffratedetail',
	controller: 'packagetariffrates',

	viewModel: {
		type: 'packagetariffrates'
	},

	listeners: {
		afterrender: 'onLoad',

	},

	// filter Labels
	lblperiod: { type: 'bundle', key: 'period' },
	lbltariffType: { type: 'bundle', key: 'tariffType' },

	// Grid Column Labels
	lblpackageNo: { type: 'bundle', key: 'pckTrfPackageNo' },
	lblpackageNm: { type: 'bundle', key: 'pckTrfPackageNm' },
	lblpartner: { type: 'bundle', key: 'partner' },
	lblvesselCode: { type: 'bundle', key: 'pckTrfVslCd' },
	lblapplyDate: { type: 'bundle', key: 'pckTrfAppliedDt' },
	lblexpiryDate: { type: 'bundle', key: 'expiryDate' },
	lblrefNo: { type: 'bundle', key: 'refNo' },
	lblStaffCode: { type: 'bundle', key: 'staffCode' },
	lblUpdateTime: { type: 'bundle', key: 'pckTrfUpdateTime' },

	// Not used
	lblDescription: { type: 'bundle', key: 'description' },



	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPackageTariffRateGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'packageSumList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					stateful: true,
					stateId: 'statePackageTariffRateGrid',
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
						celldblclick: 'onBDClick'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'left'
						},
						items: GridUtil.getGridColumns('PackageTariffRates')
					}
				}],

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
													reference: 'ctlPeDateFromDt',
													labelWidth: 35,
													flex: 1.25,
													fieldLabel: ViewUtil.getLabel('period'),
													format: MOST.config.Locale.getShortDate(),
													editable: false,
													listeners: {
														change: 'onChangeDate'
													}
												},
												{
													xtype: 'datefield',
													reference: 'ctlPeDateToDt',
													flex: 1,
													margin: '0 0 0 5',
													format: MOST.config.Locale.getShortDate(),
													editable: false,
													listeners: {
														change: 'onChangeDate'
													}
												}
											]
										},
										{
											xtype: 'combo',
											reference: 'ctlTrfTypeCombo',
											labelWidth: 70,
											flex: 1,
											fieldLabel: ViewUtil.getLabel('trfTpCd'),
											emptyText: 'Tariff Type',
											queryMode: 'local',
											bind: {
												store: '{tariffCodeComboPkg}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											editable: false,
											forceSelection: true
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelAlign: 'right',
												margin: '0 5 0 0'
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'cltPartnerCodetxf',
													fieldLabel: ViewUtil.getLabel('partnerCode'),
													labelWidth: 80,
													emptyText: 'Partner Code',
													bind: '{theSearch.ptnrCd}',
													listeners: {
														change: 'onChangeUppercase'
													}
												},
												{
													xtype: 'button',
													iconCls: 'x-fa fa-search',
													reference: 'refPartnerCode',
													listeners: {
														click: 'openPartnerCdTypePopup'
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
						},
					]
				},
			] // End docked
		});

		me.callParent();
	}
});

