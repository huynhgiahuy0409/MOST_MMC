Ext.define('MOST.view.monitoring.Discharging', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-discharging',
	requires: [
		'MOST.view.monitoring.DischargingModel',
		'MOST.view.monitoring.DischargingController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'discharging',
	
	viewModel: {
		type: 'discharging'
	},
	
	detailViewAlias: 'app-unitnodetailforroro',
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refDischargingGrid',
	 MAIN_STORE_NAME: 'discharging',
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
				flex : 1,
				margin: '0 5 5 0',
				stateful : true,
				stateId : 'stateDischargingGrid',
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
	    			pagingSearch: 'onSearch',
	    			cellclick: 'onHandlingGridlClick',
	    			rowdblclick: 'onDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('Discharging')
				}
		    }],
		    
		    dockedItems: [{
				xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '5 5 0 0'
				},
				items: [{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					itemId:'inquiryItemId',
					reference:'refBtnRetrieve',
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
							args:[me.MAIN_GRID_REF_NAME, true]
						}
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('download'),
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
				}]
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
								items: [
									{
										xtype: 'searchfieldset',
										title: ViewUtil.getLabel('search'),
										padding: '0 10 0 10',
										margin: '0 5 0 0',
										defaults: {
											labelAlign: 'right',
											labelWidth: 40
										},
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										items: [
											{
												xtype: 'vesselcalllistfield',
												flex: 1,
												fieldLabel: ViewUtil.getLabel('vessel'),
												reference: 'ctlDischargingJpvc',
												bind: {
													value: '{theSearch.vslCallId}'
												}
											}
										]
									},
									{
										xtype: 'fieldset',
										margin: '0 0 0 5',
										padding: '0 10 10 10',
										title: ViewUtil.getLabel('vslInfo'),
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
												items: [
													{
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
													}
												]
											}
										]
									}
								]
							},
							{
								xtype: 'container',
								margin: '10 0 0 0',
								defaults: {
									labelAlign: 'right',
									labelWidth: 100
								},
								layout: {
									type: 'hbox'
								},
								items: [
									{
										xtype: 'container',
										flex: 1,
										defaults: {
											labelAlign: 'right',
										},
										layout: {
											type: 'hbox'
										},
										items: [
											{
												xtype: 'datetimefield',
												margin: '0 5 0 0',
												reference: 'ctlDischargingFromDt',
												labelWidth: 100,
												fieldLabel: ViewUtil.getLabel('dischargingDate'),
												format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												format: MOST.config.Locale.getShortDate(),
												flex: 1,
												listeners: {
													change: 'onDateChange'
												}
											},
											{
												xtype: 'datetimefield',
												reference: 'ctlDischargingToDt',
												format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												format: MOST.config.Locale.getShortDate(),
												flex: 0.55,
												listeners: {
													change: 'onDateChange'
												}
											},
										]
									}, 
									{
										xtype: 'partnercdfield',
										reference: 'ctlDischargingFwrAgent',
										fieldLabel: ViewUtil.getLabel('forwarder'),
										emptyText: ViewUtil.getLabel('forwarder'),
										flex: 1,
										labelWidth: 100,
										params: {
											searchPtyDivCd: 'FWD'
										},
										bind: {
											value: '{theSearch.fwrAgnt}'
										}
									},
									{
										xtype: 'combobox',
										reference: 'ctlDischargingShiftCombo',
										fieldLabel: ViewUtil.getLabel('shift'),
										queryMode: 'local',
										bind: {
											store: '{dischargingShiftCombo}'
										},
										displayField: 'shftNm',
										valueField: 'shftId',
										value: '',
										emptyText: 'All',
										labelWidth: 100,
										editable: false,
										listeners: {
											change: 'onSearch'
										},
										hidden: true //ADP.hidden
									},
									{
										xtype: 'combobox',
										flex: 1,
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
										}
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
									margin: '0 0 0 0',
									labelAlign: 'right',
									labelWidth: 100
								},
								layout: {
									type: 'hbox'
								},
								items: [
									{
										xtype: 'combobox',
										labelWidth: 100,
										reference: 'ctlDischargingMasterCombo',
										fieldLabel: ViewUtil.getLabel('cmc_masterbl'),
										queryMode: 'local',
										bind: {
											store: '{dischargingManifestCombo}',
											value: '{theSearch.mfDocId}'
										},
										listeners: {
											select: 'onSelectMasterBL'
										},
										displayField: 'scdNm',
										valueField: 'scd',
										emptyText: 'Select',
										forceSelection: true,
										flex: 1
									},
									{
										xtype: 'combobox',
										labelWidth: 100,
										reference: 'ctlDischargingBlNoCombo',
										fieldLabel: ViewUtil.getLabel('bl'),
										queryMode: 'local',
										bind: {
											store: '{dischargingBlNoCombo}',
											value: '{theSearch.blNo}'
										},
										displayField: 'scdNm',
										valueField: 'scd',
										emptyText: 'Select',
										forceSelection: true,
										flex: 1
									},
									{
										xtype: 'textfield',
										reference: 'ctlDischargingDo',
										flex: 1,
										labelWidth: 100,
										fieldLabel: ViewUtil.getLabel('do'),
										fieldStyle: 'text-transform:uppercase',
										listeners: {
											change: 'onUpperCase'
										},
										bind: {
											value: '{theSearch.doNo}'
										}

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
											labelWidth: 50
										},
										items: [
											{
												xtype: 'combobox',
												reference: 'ctlDischargingHatchCombo',
												fieldLabel: ViewUtil.getLabel('hatch'),
												labelWidth: 100,
												queryMode: 'local',
												bind: {
													store: '{dischargingHatchNoCombo}'
												},
												displayField: 'scdNm',
												valueField: 'scd',
												value: '',
												emptyText: 'All',
												editable: false,
												flex: 1,
												listeners: {
													change: 'onSearch'
												}
											},
											{
												xtype: 'textfield',
												reference: 'ctlUnitNo',
												flex: 0.75,
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
										store: '{dischargingCompareCombo}'
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

