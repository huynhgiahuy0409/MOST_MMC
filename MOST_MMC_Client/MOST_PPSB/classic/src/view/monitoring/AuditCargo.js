Ext.define('MOST.view.monitoring.AuditCargo', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-auditcargo',
	requires: [
		'MOST.view.monitoring.AuditCargoModel',
		'MOST.view.monitoring.AuditCargoController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'auditcargo',
	viewModel: {
		type: 'auditcargo'
	},
	listeners: {
		afterrender: 'onLoad'
	},
	/**
	* =========================================================================================================================
	* CONSTANT START
	*/
	MAIN_GRID_REF_NAME: 'refAuditCargoGrid',
	MAIN_STORE_NAME: 'auditCargo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: { 
        type: 'hbox', 
        align: 'stretch' 
    },
    
	initComponent: function () {
		let me = this;
		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: 'refAuditCargoGrid',
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
					pagingSearch: 'onSearch'
				},
				columns: {
					defaults: {
						style: 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('AuditCargo')
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
					itemId: 'exportToExcelButton',
					reference : 'refBtnDownload',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, true]
						}
					},
					hidden: true
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
							args:[me.MAIN_GRID_REF_NAME, false]
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
					},
					hidden: true
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
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'shipcallnofield',
									reference: 'ctlScn',
									labelWidth: 70,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theSearch.scn}',
									},
								},
								{
									xtype: 'vesselcalllistfield',
									reference: 'ctlVslCallId',
									labelWidth: 70,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('vslcallid'),
									change: function (field, newValue) {
										field.setValue(newValue.toUpperCase());
									},
									bind: { 
										value: '{theSearch.vslCallId}' 
									}
								},
							]
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								labelWidth: 90
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'combobox',
									reference: 'ctlScreenName',
									fieldLabel: ViewUtil.getLabel('ACscreenNm'),
									bind: {
										store: '{screenCombo}',
										value: '{theSearch.screenName}'
									},
									listeners: {
										//select: "onChangeScreen",
									},
									displayField: 'cdNm',
									valueField: 'cd',
									queryMode: 'local',
									emptyText: 'Select',
									value: ''
								},
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 90,
							},
							items: [
							{
								xtype: "container",
								layout: {
									type: "hbox",
								},
								defaults: {
									labelAlign: 'right',
									labelWidth: 90,
								},
								items: [
									{
										xtype: "datefield",
										reference: "ctlFromDt",
										flex: 1,
										margin: '0 0 5 5',
										fieldLabel: ViewUtil.getLabel('ACtransactionDate'),
										format: MOST.config.Locale.getShortDate(),
										labelAlign: "right",
										listeners: {
											change: "onDateChange",
										}
									},
									{
										xtype: "datefield",
										reference: "ctlToDt",
										flex: 1,
										margin: '0 0 5 5',
										format: MOST.config.Locale.getShortDate(),
										label: "~",
										listeners: {
											change: "onDateChange",
										}
									},
								],
							},
							{
								xtype: 'combobox',
								reference: 'refUpdateTypeCbo',
								margin: '5 0 0 5',
								fieldLabel: ViewUtil.getLabel('ACupdateType'),
								emptyText: "Select",
								bind: {
									store: '{updateTypeCombo}',
									value: '{theSearch.updateType}'
								},
								displayField: 'cdNm',
								valueField: 'cd',
								queryMode: 'local',
								emptyText: "Select",
								value: ''
							},
							]
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								labelWidth: 90,
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'combobox',
									reference: 'ctlBlNo',
									fieldLabel: ViewUtil.getLabel('blno'),
									emptyText: "Select",
									bind: {
										store: '{blCombo}',
										value: '{theSearch.blNo}'

									},
									displayField: 'cdNm',
									valueField: 'cd',
									queryMode: 'local',
									value: ''
								},
								{
									xtype: 'combobox',
									reference: 'ctlSnNo',
									fieldLabel: ViewUtil.getLabel('SNLSNNo'),
									emptyText: "Select",
									bind: {
										store: '{snCombo}',
										value: '{theSearch.snNo}'
									},
									displayField: 'cdNm',
									valueField: 'cd',
									queryMode: 'local',
									value: ''
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
