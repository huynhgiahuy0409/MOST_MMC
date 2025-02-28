Ext.define('MOST.view.monitoring.Loading', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-loading',
	requires: [
		'MOST.view.monitoring.LoadingModel',
		'MOST.view.monitoring.LoadingController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'loading',
	
	viewModel: {
		type: 'loading'
	},
	
	detailViewAlias: 'app-unitnodetailforroro',
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refLoadingGrid',
	 MAIN_STORE_NAME: 'loading',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '0 5 5 0',
					stateful: true,
					stateId: 'stateLoadingGrid',
					//usePagingToolbar : false,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					listeners: {
						pagingSearch: 'onSearch',
						cellclick: 'onHandlingGridlClick',
						rowdblclick: 'onDblClick'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('Loading')
					}
				}
			],
		    
			dockedItems: [
				{
					xtype: 'container',
					style: { "background-color": "white" },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '5 5 0 0'
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							itemId: 'inquiryItemId',
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
								click: 'onDownload'
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
					margin: '0 -3 5 0',
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'fieldset',
							autoScroll: true,
							collapsible: true,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							padding: '0 10 10 10',
							flex: 1,
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									flex: 1,
									items: [
										{
											xtype: 'searchfieldset',
											title: ViewUtil.getLabel('search'),
											padding: '0 10 0 10',
											margin: '0 5 0 0',
											defaults: {
												labelAlign: 'right',
												labelWidth: 70
											},
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'shipcallnofield',
													reference: 'ctlScn',
													//emptyText: ViewUtil.getLabel('shipCallNo'),
													fieldLabel: ViewUtil.getLabel('shipCallNo'),
													bind: {
														value: '{theSearch.scn}',
													},
													
												},
												{
													xtype: 'vesselcalllistfield',
													fieldLabel: ViewUtil.getLabel('vessel'),
													margin: '5 0 0 0',
													reference: 'ctlLoadingJpvc',
													bind: {
														value: '{theSearch.vslCallId}'
													}
												}
											]
										},
										{
											xtype: 'fieldset',
											title: ViewUtil.getLabel('vslInfo'),
											margin: '0 0 0 5',
											padding: '0 10 10 10',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											flex: 1,
											items: [
												{
													xtype: 'container',
													flex: 1,
													defaults: {
														labelAlign: 'right',
														labelWidth: 50,
														flex: 1,
													},
													layout: {
														type: 'hbox',
														align: 'stretch'
													},
													items: [
														{
															xtype: 'datetimefield',
															format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
															readOnly: true,
															fieldLabel: ViewUtil.getLabel('eta'),
															bind: '{theVsl.eta}'
														},
														{
															xtype: 'datetimefield',
															format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
															readOnly: true,
															fieldLabel: ViewUtil.getLabel('atb'),
															bind: '{theVsl.atb}'
														},
														{
															xtype: 'datetimefield',
															format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
															readOnly: true,
															fieldLabel: ViewUtil.getLabel('atw'),
															bind: '{theVsl.atw}'
														},
														{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('sa'),
															bind: '{theVsl.arrvSaId}'
														}
													]
												},
												{
													xtype: 'container',
													defaults: {
														margin: '5 0 0 0',
														labelAlign: 'right',
														labelWidth: 50,
														flex: 1
													},
													layout: {
														type: 'hbox'
													},
													items: [{
														xtype: 'datetimefield',
														format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
														readOnly: true,
														fieldLabel: ViewUtil.getLabel('etd'),
														bind: '{theVsl.etd}'
													},
													{
														xtype: 'datetimefield',
														format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
														readOnly: true,
														fieldLabel: ViewUtil.getLabel('atu'),
														bind: '{theVsl.atu}'
													},
													{
														xtype: 'datetimefield',
														format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
														readOnly: true,
														fieldLabel: ViewUtil.getLabel('atc'),
														bind: '{theVsl.atc}'
													},
													{
														xtype: 'textfield',
														fieldLabel: ViewUtil.getLabel('loc'),
														bind: '{theVsl.berthLoc}'
													}]
												}
											]
										}
									]
								},
								{
									xtype: 'container',
									margin: '10 0 0 0',
									defaults: {
										margin: '0 0 0 5',
										labelAlign: 'right',
										labelWidth: 80
									},
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'container',
											flex: 1.5,
											defaults: {
												labelAlign: 'right',
												labelWidth: 80
											},
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'datetimefield',
													reference: 'ctlLoadedFromDt',
													fieldLabel: ViewUtil.getLabel('loadedDate'),
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													flex: 1,
													listeners: {
														change: 'onDateChange'
													}
												},
												{
													xtype: 'datetimefield',
													reference: 'ctlLoadedToDt',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													flex: 0.63,
													margin: '0 0 0 5',
													listeners: {
														change: 'onDateChange'
													}
												},
											]
										},
										{
											xtype: 'partnercdfield',
											reference: 'ctlLoadingFwrAgent',
											fieldLabel: ViewUtil.getLabel('forwarder'),
											emptyText: ViewUtil.getLabel('forwarder'),
											flex: 1.5,
											params: {
												searchPtyDivCd: 'FWD'
											},
											bind: {
												value: '{theSearch.fwrAgnt}'
											},
										},
										{
											xtype: 'combobox',
											reference: 'ctlLoadingShiftCombo',
											fieldLabel: ViewUtil.getLabel('shift'),
											queryMode: 'local',
											hidden: true, // Hidden.ADP
											bind: {
												store: '{loadingShiftCombo}'
											},
											labelWidth: 100,
											flex: 1,
											displayField: 'shftNm',
											valueField: 'shftId',
											value: '',
											emptyText: 'All',
											editable: false,
											listeners: {
												change: 'onSearch'
											}
										},
										{
											xtype: 'combobox',
											reference: 'ctlLoadingHatchCombo',
											fieldLabel: ViewUtil.getLabel('hatch'),
											queryMode: 'local',
											bind: {
												store: '{loadingHatchNoCombo}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											labelWidth: 80,
											flex: 1,
											emptyText: 'All',
											editable: false,
											listeners: {
												change: 'onSearch'
											}
										},
										{
											xtype: 'combobox',
											reference: 'ctlJobPurpModeCombo',
											fieldLabel: ViewUtil.getLabel('purposeJob'),
											queryMode: 'local',
											bind: {
												store: '{jobPurposeModeCombo}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											emptyText: 'All',
											editable: false,
											listeners: {
												change: 'onSearch'
											},
											flex: 1,
										},
										{
											xtype: 'combo',
											reference: 'ctlCgTp',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('cargoTp'),
											queryMode: 'local',
											bind: {
												store: '{cargoTpCombo}',
												value: '{theSearch.cargoTp}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											editable: true,
											emptyText: "Select",
											listeners: {
												select: 'onSelectCargoTpCombo'
											}
										}
									]
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									defaults: {
										margin: '0 0 0 5',
										labelAlign: 'right',
										labelWidth: 80
									},
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlBookingNoCombo',
											fieldLabel: ViewUtil.getLabel('cmc_bookingno'),
											queryMode: 'local',
											bind: {
												store: '{loadingManifestCombo}',
												value: '{theSearch.mfDocId}'
											},
											listeners: {
												select: 'onSelectBookingNo'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select',
											fieldStyle: 'text-transform:uppercase',
											forceSelection: true,
											flex: 1.5
										},
										{
											xtype: 'combobox',
											reference: 'ctlLoadingSnNoCombo',
											fieldLabel: ViewUtil.getLabel('snNo'),
											queryMode: 'local',
											bind: {
												store: '{loadingSnNoCombo}',
												value: '{theSearch.shipgNoteNo}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											emptyText: 'Select',
											fieldStyle: 'text-transform:uppercase',
											forceSelection: true,
											flex: 1.5
										},
										{
											xtype: 'textfield',
											reference: 'ctlLoadingGr',
											fieldLabel: ViewUtil.getLabel('gr'),
											emptyText: ViewUtil.getLabel('gr'),
											fieldStyle: 'text-transform:uppercase',
											listeners: {
												change: 'onUpperCase'
											},
											bind: {
												value: '{theSearch.grNo}'
											},
											flex: 1
										},
										{
											xtype: 'textfield',
											reference: 'ctlLoadingLorryNo',
											fieldLabel: ViewUtil.getLabel('lorryNo'),
											emptyText: ViewUtil.getLabel('lorryNo'),
											fieldStyle: 'text-transform:uppercase',
											listeners: {
												change: 'onUpperCase'
											},
											bind: {
												value: '{theSearch.lorryNo}'
											},
											flex: 1
										},
										{
											xtype: 'textfield',
											reference: 'ctlUnitNo',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('unitNo'),
											listeners: {
												change: function () {
													var me = this;
													me.setValue(this.getValue().toUpperCase());
												}
											},
											bind: {
												value: '{theSearch.unitNo}'
											},
											maxLength: 30,
											enforceMaxLength: true
										}
									]
								}
							]
						}
					],
				},
				{
					xtype: 'toolbar',
					padding: '0 0 0 0',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right'
					},
					dock: 'bottom',
					items: [
						{
							xtype: 'fieldset', 
							margin: '5 5 5 0',
							padding: '10 10 10 10',
							defaults: {
								labelAlign: 'right',
								labelWidth: 100
							},
							flex: 1,
							layout: {
								type: 'hbox'
							},
							items: [
								{
									xtype: 'combobox',
									flex: 0.3,
									reference: 'ctlCompareCombo',
									queryMode: 'local',
									bind: {
										store: '{loadingCompareCombo}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: 'Mt',
									listeners: {
										change: 'onCompareModeChange'
									}
								},
								{
									xtype: 'textfield',
									reference: 'ctlDocTotal',
									readOnly: true,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('docTotal'),
									bind: '{theCalc.displayDocTotal}'
								},
								{
									xtype: 'textfield',
									reference: 'ctlActTotal',
									readOnly: true,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('actualTotal'),
									bind: '{theCalc.displayActTotal}'
								},
								{
									xtype: 'textfield',
									reference: 'ctlBalance',
									readOnly: true,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('balance'),
									bind: '{theCalc.displayBalanceTotal}'
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

