Ext.define("MOST.view.operation.TheListOfDamageCheckOfRORO", {
	extend: "Ext.panel.Panel",

	alias: 'widget.app-thelistofdamagecheckofroro',
	requires: [
		'MOST.view.operation.TheListOfDamageCheckOfROROModel',
		'MOST.view.operation.TheListOfDamageCheckOfROROController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-rorodamagecheck',
	
	controller: 'theListOfDamageCheckOfRORO',
	viewModel: {
		type: 'theListOfDamageCheckOfRORO'
	},
	listeners: {
		afterrender: 'onLoad'
	},
	/**
	* =========================================================================================================================
	* CONSTANT START
	*/
	MAIN_GRID_REF_NAME: 'refTheListOfDamageCheckOfROROGrid',
	MAIN_STORE_NAME: 'theListOfDamageCheckOfRORO',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: { type: 'hbox', align: 'stretch' },
	initComponent: function () {

		var me = this;

		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: 'refTheListOfDamageCheckOfROROGrid',
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
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					celldblclick: 'onDetailRORODamageCheck',
					pagingSearch: 'onSearch'
				},
				columns: {
					defaults: {
						style: 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('TheListOfDamageCheckOfRORO')
				}
			}
			],
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
				},
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
					reference: 'refBtnCreate',
					itemId: 'btnAdd',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					listeners: {
						//click: 'onAdd'
						click: 'onTblDamage'
					}
				},
				{
					xtype: 'button',
					itemId: 'btnDelete',
					reference: 'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					// listeners: {
					// 	click: 'onRemove'
					// }
				},
				{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					reference : 'refBtnDownload',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image',
					cls: 'excel-button'
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button'
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
			},
			{
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
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						margin: '0 0 5 0'
					},
					flex: 1,
					items: [
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								margin: '4 0 0 0',
								labelWidth: 90
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										margin: '4 0 0 0',
										labelWidth: 90
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'datefield',
											reference: 'ctlCheckTimeFromDt',
											width: 210,
											margin: '5 0 0 5',
											fieldLabel: ViewUtil.getLabel('checkTime'),
											format: MOST.config.Locale.getShortDate(),
											labelAlign: 'right',
											labelWidth: 85,
											listeners: {
												change: 'onDateChange'
											},
										},
										{
											xtype: 'datefield',
											reference: 'ctlCheckTimeToDt',
											width: 120,
											margin: '5 0 0 5',
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												change: 'onDateChange'
											},
										}
									]
								},
								{
									xtype: 'combobox',
									reference: 'ctlCategory',
									fieldLabel: ViewUtil.getLabel('category'),
									emptyText: "select",
									bind: {
										store: '{categoryCombo}',
										value: '{theSearch.catgCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									queryMode: 'local',
									emptyText: "select",
									value: ''
								},
								{
									xtype: 'textfield',
									bind: '{theSearch.unitNo}',
									fieldLabel: ViewUtil.getLabel('unitNo'),
									fieldStyle: 'text-transform : uppercase',
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								margin: '4 0 0 0',
								labelWidth: 90
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},

									items: [
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											defaults: {
												labelAlign: 'right',
												margin: '5 0 0 0',
												labelWidth: 90

											},
											items: [
												{
													xtype: 'vesselcalllistfield',
													fieldLabel: ViewUtil.getLabel('vessel'),
													width: 280,
													reference: 'ctlVslCallId',
													emptyText: ViewUtil.getLabel('vslcallid'),
													change: function (field, newValue) {
														field.setValue(newValue.toUpperCase());
													},
													bind: { value: '{theSearch.vslCallId}' }
												}, 
												{
													xtype: 'combobox',
													reference: 'ctlBlNo',
													fieldLabel: ViewUtil.getLabel('blno'),
													emptyText: "select",
													bind: {
														store: '{blCombo}',
														value: '{theSearch.blNo}'

													},
													displayField: 'scdNm',
													valueField: 'blNo',
													queryMode: 'local',
													value: ''
												},
												{
													xtype: 'combobox',
													reference: 'ctlSnNo',
													fieldLabel: ViewUtil.getLabel('SNLSNNo'),
													emptyText: "select",
													bind: {
														store: '{snCombo}',
														value: '{theSearch.snNo}'
													},
													displayField: 'scdNm',
													valueField: 'shipgNoteNo',
													queryMode: 'local',
													value: ''
												},
											]
										}
									]
								}
								
							]
						}
					]
				}],
			}]

		});
		me.callParent();
	}

});
