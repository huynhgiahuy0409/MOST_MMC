Ext.define('MOST.view.administrator.CompanyRegister', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-companyregister',

	requires: [],

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	listeners: {
		afterrender: 'onLoad',
	},

	controller: 'companyregister',

	viewModel: {
		type: 'companyregister',
	},

	detailViewAlias: 'app-companyregisterdetail',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'companyRegsiterGrid', // Main Grid Name
	MAIN_STORE_NAME: 'companyRegister', // Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '0 5 0 0',
					plugins: ['gridexporter', 'gridfilters', 'clipboard'],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}',
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
					},
					listeners: {
						rowdblclick: 'onDblClick',
						pagingSearch: 'onSearch',
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('CompanyRegister'),
					},
				},
			],

			dockedItems: [
				{
					xtype: 'container',
					style: {
						'background-color': 'white',
					},
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
							reference: 'btnRetrieve',
							text: ViewUtil.getLabel('search'),
							itemId: 'inquiryItemId',
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							listeners: {
								click: 'onSearch',
							},
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
									args: [me.MAIN_GRID_REF_NAME, true],
								},
							},
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
									args: [me.MAIN_GRID_REF_NAME, false],
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
							autoScroll: true,
							collapsible: true,
							padding: '0 10 10 10',
							margin: '0 5 0 0',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										width: '100%'
									},
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'radiogroup',
													reference: 'rdgChk',
													layout: {
														type: 'hbox',
														align: 'stretch',
													},
													width: '100%',
													items: [
														{
															xtype: 'radiofield',
															boxLabel: ViewUtil.getLabel('newMem'),
															name: 'member',
															inputValue: 'N',
															margin: '0 40 0 31'
														},
														{
															xtype: 'radiofield',
															boxLabel: ViewUtil.getLabel('regMem'),
															checked: true,
															name: 'member',
															inputValue: 'Y',
														},
													],
												},
											],
										},
										{
											xtype: 'combo',
											reference: 'cmbPtnrType',
											fieldLabel: ViewUtil.getLabel('partnerType'),
											labelAlign: 'right',
											labelWidth: 100,
											margin: '5 0 0 0',
											forceSelection: true,
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Partner Type',
											bind: {
												store: '{ptnrTypeList}',
												value: '{theSearch.ptnrType}',
											},
										},
									],
								},
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										width: '100%'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtAccNo',
											margin: '0 0 0 0',
											bind: '{theSearch.accNo}',
											fieldLabel: ViewUtil.getLabel('accountno'),
										},
										{
											xtype: 'textfield',
											reference: 'txtPtnrCode',
											fieldLabel: ViewUtil.getLabel('partnerCode'),
											margin: '5 0 0 0',
											bind: '{theSearch.companyCode}',
											listeners: {
												change: 'onUpperCase',
											},
										},
									],
								},
								{
									xtype: 'container',
									flex: 1, 
									defaults: {
										width: '100%'
									},
									items: [
										{
											xtype: 'container',
											margin: '0 0 0 0',
											layout: {
												type: 'hbox',
											},
											items: [
												{
													xtype: 'label',
													text: ViewUtil.getLabel('balanceRange') + ':',
													width: 100,
													margin: '5 5 0 0',
													style: 'text-align: right'
												},
												{
													xtype: 'textfield',
													reference: 'txtBalStart',
													flex: 1,
													maskRe: /[0-9]/,
													bind: '{theSearch.balRangeFrom}',
												},
												{
													xtype: 'textfield',
													reference: 'txtBalEnd',
													flex: 1,
													margin: '0 0 0 5',
													bind: '{theSearch.balRangeTo}',
													maskRe: /[0-9]/,
												},
											],
										},
										{
											xtype: 'container',
											margin: '5 0 0 0',
											layout: {
												type: 'hbox',
											},
											defaults: {
												labelWidth: 100,
												labelAlign: 'right',
												flex: 1
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'txtPtnrNm',
													fieldLabel: ViewUtil.getLabel('ptnrName'),
													bind: '{theSearch.engSnm}',
												},
												{
													xtype: 'datefield',
													reference: 'dtFrom',
													fieldLabel: ViewUtil.getLabel('regDate'),
													editable: true,
													format: MOST.config.Locale.getShortDate(),
													bind: '{theSearch.regTimeFrom}',
													hidden: true
												}
											]
										}
									],
								},
								{
									xtype: 'container',
									flex: 1,
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
