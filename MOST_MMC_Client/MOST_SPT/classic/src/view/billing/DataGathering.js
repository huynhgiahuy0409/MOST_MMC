Ext.define('MOST.view.billing.DataGathering', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-datagathering',
	requires: [
		'MOST.view.billing.DataGatheringController',
		'MOST.view.billing.DataGatheringModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	detailViewAlias: 'app-datagatheringdetail',

	controller: 'datagathering',

	viewModel: {
		type: 'datagathering'
	},

	listeners: {
		afterrender: 'onLoad'
	},
	/**
	* =========================================================================================================================
	* CONSTANT START
	*/
	MAIN_GRID_REF_NAME: 'refDataGatheringGrid',
	MAIN_STORE_NAME: 'dataGatheringList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				selModel: {
					selType: 'checkboxmodel',
					mode: 'MULTI',
					checkOnly: false,
					listeners: {
						select: 'onChecked',
						deselect: 'onChecked'
					}
				},
				listeners: {
					celldblclick: 'onDblclick',
					pagingSearch: 'onSearch'
				},
				columns: {
					defaults: {
						style: 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('DataGathering')
				}
			}],
			
			dockedItems: [{
				xtype: 'container',
				style: { "background-color": "white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
					xtype: 'tbfill'
				},{
					xtype: 'button',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button',
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					itemId: 'btnAdd',
					reference: 'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					},
					hidden: true
				},{
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
				},{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, false]
						}
					}
				},{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
				}]
			},{
				xtype: 'toolbar',
				enableOverflow: true,
				padding: '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible: true,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					margin: '0 5 0 0',
					padding: '0 10 10 10',
					flex: 1,
					items: [
						{
							xtype: 'container',
							margin: '0 0 5 0',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								flex: 1,
								width: '100%'
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
										margin: '0 5 0 0',
										editable: false, 
										flex: 1,
									},
									items: [
										{
											xtype: 'radiogroup',
											width: 80,
											reference: 'ctl_optAtu',
											items: [
												{
													xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('datagatheringatu'),
													name: 'atu_radio',
													inputValue: 'atu',
													checked: true
												}, {
													xtype: 'radiofield',
													margin: '0 0 0 15',
													boxLabel: ViewUtil.getLabel('datagatheringatb'),
													name: 'atu_radio',
													inputValue: 'atb',
												}
											]
										}, {
											reference: 'ctlDateFromDt',
											margin: '0 5 0 0',
											xtype: 'datefield',
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												change: 'onDateChange',
											}
										}, {
											reference: 'ctlDateToDt',
											xtype: 'datefield',
											anchor: '100%',
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												change: 'onDateChange',
											}
										}
									]
								}, 
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 5 0 0',
										editable: false,
										width: '100%'
									},
									items: [
										{
											reference: 'ctlcargoTypeCombo',
											xtype: 'combo',
											labelWidth: 80,
											fieldLabel: ViewUtil.getLabel('datagatheringcargoType'),
											queryMode: 'local',
											bind: {
												store: '{cargoTypeCombo}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											editable: false,
											allowBlank: true
										},
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 5 0 0',
										editable: false
									},
									items: [
										{
											xtype: 'button',
											iconCls: 'fa fa-cogs',
											cls: 'search-button',
											text: ViewUtil.getLabel('datagatheringstart'),
											listeners: {
												click: 'onStartDataGathering'
											}
										}
									]
								},
								{
									xtype: 'container'
								}
							]
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
								margin: '0 5 0 0',
								editable: false,
								flex: 1
							},
							items: [
								{
								xtype: 'vesselcalllistfield',
								fieldLabel: ViewUtil.getLabel('vessel'),
								emptyText: ViewUtil.getLabel('vessel'),
								labelWidth: 123,
								reference: 'refVslCallIdfield',
							}, 
							{
								reference: 'ctlstatusCombo',
								xtype: 'combo',
								labelWidth: 80,
								fieldLabel: ViewUtil.getLabel('datagatheringstatus'),
								queryMode: 'local',
								bind: {
									store: '{statusCombo}'
								},
								displayField: 'scdNm',
								valueField: 'scd',
								value: '',
								editable: false,
								allowBlank: true
							},
							{
								xtype: 'container',
								flex: 1,
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								items: [
									{
										xtype: 'checkboxfield',
										reference: 'ctlincludecheck',
										boxLabel: ViewUtil.getLabel('datagatheringincludinggathereddata'),
										inputValue: true,
										uncheckedValue: false
									}, {
										xtype: 'checkboxfield',
										reference: 'ctlvesselcheck',
										boxLabel: ViewUtil.getLabel('datagatheringvesselcancellation'),
										inputValue: true,
										uncheckedValue: false,
										hidden: true
									}
								]
							},
							{
								xtype: 'container'
							}
						]
						}
					]
				}]
			}]
		});

		me.callParent();
	}
});

