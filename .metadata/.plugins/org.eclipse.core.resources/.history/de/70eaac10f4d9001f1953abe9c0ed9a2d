Ext.define('MOST.view.monitoring.InternalTruckMonitoring', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-internaltruckmonitoring',
	requires: [
		'MOST.view.monitoring.InternalTruckMonitoringModel',
		'MOST.view.monitoring.InternalTruckMonitoringController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'internaltruckmonitoring',
	
	viewModel: {
		type: 'internaltruckmonitoring'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'ITMListGrid',
	 MAIN_STORE_NAME: 'internalTruckMonitoringList',
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
				margin: '5 5 0 0',
				stateful : true,
				stateId : 'stateLoadingGrid',
				usePagingToolbar : true,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
				listeners: {
					pagingSearch: 'onSearch'
				},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('InternalTruckMonitoring')
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
				padding : '0 0 0 0',
				margin: '0 -3 0 0', 
				defaults: {
					labelAlign: 'right',
				},
				items: [
					{
						xtype: 'fieldset',
						padding : '0 10 0 10',
						autoScroll: true,
						collapsible: true,
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						flex: 1,
						items: [
							{
								xtype: 'container',
								margin: '0 0 0 0', 
								padding: '0 0 0 0',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								flex: 1,
								items: [
									{
										xtype: 'searchfieldset',
										title: ViewUtil.getLabel('search'),
										margin: '0 5 0 0',
										padding: '0 10 10 10',
										defaults: {
											labelAlign: 'right',
											labelWidth: 80, 
										},
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										flex: 2.5,
										items: [ 
											{
												xtype: 'vesselcalllistfield',
												reference: 'refITMVslCallId',
												fieldLabel: ViewUtil.getLabel('vslCallId'),
												bind: {
													value: '{theSearch.vslCallId}'
												},
												allowBlank: false
											}, 
											{
												xtype: 'combobox',
												reference: 'refWHId',
												margin: '5 0 0 0',
												fieldLabel: ViewUtil.getLabel('WHId'),
												bind: {
													store: '{warehouseListCombo}',
													value: '{theSearch.whId}'
												},
												emptyText: 'Select',
												displayField: 'scdNm',
												valueField: 'scd'
											},
											{
												xtype: 'partnercdfield',
												reference: 'refTxtContractor',
												margin: '5 0 0 0',
												fieldLabel: ViewUtil.getLabel('vesselDelayContractor'),
												bind: {
													value: '{theSearch.contractor}'
												},
												params: {
													ptnrType: CodeConstants.CM_PTNRTP_CTT
												}
											}

										]
									},
									{
										xtype: 'fieldset',
										title: ViewUtil.getLabel('vslInfo'),
										margin: '0 0 0 5',
										padding: '0 10 0 10',
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										flex: 7.5,
										items: [
											{
												xtype: 'container',
												defaults: {
													margin: '0 0 5 5',
													labelAlign: 'right',
													labelWidth: 80
												},
												layout: {
													type: 'hbox'
												},
												items: [{
													xtype: 'datetimefield',
													flex: 1,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true,
													fieldLabel: ViewUtil.getLabel('eta'),
													bind: '{theVsl.eta}'
												},
												{
													xtype: 'datetimefield',
													flex: 1,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true,
													fieldLabel: ViewUtil.getLabel('atb'),
													bind: '{theVsl.atb}'
												},
												{
													xtype: 'datetimefield',
													flex: 1,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true,
													fieldLabel: ViewUtil.getLabel('atw'),
													bind: '{theVsl.atw}'
												},
												{
													xtype: 'textfield',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('sa'),
													bind: '{theVsl.arrvSaId}'
												}]
											},
											{
												xtype: 'container',
												defaults: {
													margin: '0 0 5 5',
													labelAlign: 'right',
													labelWidth: 80
												},
												layout: {
													type: 'hbox'
												},
												items: [{
													xtype: 'datetimefield',
													flex: 1,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true,
													fieldLabel: ViewUtil.getLabel('etd'),
													bind: '{theVsl.etd}'
												},
												{
													xtype: 'datetimefield',
													flex: 1,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true,
													fieldLabel: ViewUtil.getLabel('atu'),
													bind: '{theVsl.atu}'
												},
												{
													xtype: 'datetimefield',
													flex: 1,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true,
													fieldLabel: ViewUtil.getLabel('atc'),
													bind: '{theVsl.atc}'
												},
												{
													xtype: 'textfield',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('loc'),
													bind: '{theVsl.berthLoc}',
													readOnly: true
												}]
											},
											{
												xtype: 'container',
												defaults: {
													margin: '0 0 5 5',
													labelAlign: 'right',
													labelWidth: 80
												},
												layout: {
													type: 'hbox'
												},
												items: [
													{
														xtype: 'textfield',
														flex: 1,
														fieldLabel: ViewUtil.getLabel('vesselName'),
														bind: {
															value: '{theVsl.vslCd}'
														},
														readOnly: true
													},
													{
														xtype: 'textfield',
														margin: '0 -2 5 5',
														flex: 2,
														fieldLabel: '',
														bind: {
															value: '{theVsl.vslNm}'
														},
														readOnly: true
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
							}, 
							{
								xtype: 'container',
								margin: '10 0 0 0',
								layout: {
									type: 'hbox'
								},
								items: [
									{
										xtype: 'container',
										flex: 1,
										layout: {
											type: 'vbox'
										},
										items: [
											{
												xtype: 'container', 
												width: '100%',
												defaults: {
													labelAlign: 'right',
													labelWidth: 100
												},
												layout: {
													type: 'hbox',
													align: 'stretch'
												},
												items: [
													{
														xtype: 'datetimefield',
														reference: 'ctlConfirmFromDt',
														fieldLabel: ViewUtil.getLabel('confirmDt'),
														format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
														flex: 1,
													},
													{
														xtype: 'datetimefield',
														margin: '0 0 0 5', 
														reference: 'ctlConfirmToDt',
														format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
														flex: 0.55
													}
												]
											},
											{
												xtype: 'textfield',
												labelAlign: 'right',
												labelWidth: 100,
												margin: '5 0 0 0',
												width: '100%',
												reference: 'ctlSearchLorryNo',
												fieldLabel: ViewUtil.getLabel('lorryNo'),
												bind: {
													value: '{theSearch.lorryNo}'
												},
												fieldStyle: 'text-transform: uppercase',
												listeners: {
													change: function () {
														var me = this;
														me.setValue(this.getValue().toUpperCase());
													}
												}
											},
										]
									}, 
									{
										xtype: 'container',
										flex: 1,
										layout: {
											type: 'vbox'
										},
										items: [
											{
												xtype: 'container', 
												width: '100%',
												defaults: {
													labelAlign: 'right',
													labelWidth: 100,
													width: '100%',
													margin: '0 0 5 0'
												},
												layout: {
													type: 'hbox',
													align: 'stretch'
												},
												items: [
													{//Booking Number
														xtype: 'combobox',
														reference: 'ctlBookingNoCombo',
														fieldLabel: ViewUtil.getLabel('cmc_bookingno'),
														queryMode: 'local',
														bind: {
															store: '{bookingNoCombo}',
															value: '{theSearch.bookingNo}'
														},
														displayField: 'scdNm',
														valueField: 'mfDocId',
														emptyText: 'Select',
														forceSelection: true,
														editable: false,
														listeners: {
															//change: 'onSelectBookingNoCombo'
														}
													},
												]
											},
											//Master BL :
											{
												xtype: 'combobox',
												reference: 'ctlMBlNoCombo',
												width: '100%',
												fieldLabel: ViewUtil.getLabel('cmc_masterbl'),
												labelAlign: 'right',
												labelWidth: 100,
												queryMode: 'local',
												bind: {
													store: '{masterBlNoCombo}',
													value: '{theSearch.masterBlNo}'
												},
												displayField: 'scdNm',
												valueField: 'mfDocId',
												emptyText: 'Select',
												forceSelection: true,
												listeners: {
													//change: 'onSelectBookingNoCombo'
												}
											},
										]
									},  
									{
										xtype: 'container',
										flex: 1,
										layout: {
											type: 'vbox'
										},
										width: '100%',
										defaults: {
											labelAlign: 'right',
											labelWidth: 100,
											width: '100%',
										},
										flex: 1,
										items: [
											{
												xtype: 'container',
												width: '100%',
												defaults: {
													labelAlign: 'right',
													labelWidth: 100,
													width: '100%',
													margin: '0 0 5 0'
												},
												layout: {
													type: 'hbox',
													align: 'stretch'
												},
												items: [
													{
														xtype: 'combobox',
														reference: 'refITMSnNoCombo',
														fieldLabel: ViewUtil.getLabel('sn'),
														queryMode: 'local',
														bind: {
															store: '{snListCombo}',
															value: '{theSearch.snNo}'
														},
														displayField: 'scdNm',
														valueField: 'shipgNoteNo',
														emptyText: 'Select',
														forceSelection: true,
														editable: false,
													},
												]
											}, 
											{
												xtype: 'combobox',
												reference: 'refITMBlNo',
												fieldLabel: ViewUtil.getLabel('bl'),
												queryMode: 'local',
												bind: {
													store: '{blListCombo}',
													value: '{theSearch.blNo}'
												},
												displayField: 'scdNm',
												valueField: 'blNo',
												emptyText: 'Select',
												forceSelection: true,

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
											labelWidth: 80,
											width: '100%'
										},
										items: [
											{
												xtype: 'combobox',
												reference: 'refITMGrNo',
												fieldLabel: ViewUtil.getLabel('gr'),
												queryMode: 'local',
												bind: {
													store: '{grListCombo}',
													value: '{theSearch.grNo}'
												},
												displayField: 'scdNm',
												valueField: 'grNo',
												emptyText: 'Select',
												forceSelection: true,
												editable: false,
												hidden: true
											},
											{
												xtype: 'combobox',
												reference: 'refITMSdoNo',
												fieldLabel: ViewUtil.getLabel('sdoNo'),
												queryMode: 'local',
												bind: {
													store: '{subDoCombo}',
													value: '{theSearch.sdoNo}'
												},
												displayField: 'scdNm',
												valueField: 'sdoNo',
												emptyText: 'Select',
												forceSelection: true,
												hidden: true
											}
										]
									},
								]
							}
						]
					}
				],
			}]
		});
		
		me.callParent();
	}
});

