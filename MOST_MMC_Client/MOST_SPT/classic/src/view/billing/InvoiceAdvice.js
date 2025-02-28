Ext.define('MOST.view.billing.InvoiceAdvice', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-invoiceadvice',
	requires: [
		'MOST.view.billing.InvoiceAdviceModel',
		'MOST.view.billing.InvoiceAdviceController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	detailViewAlias: 'app-invoiceadvicedetail',

	controller: 'invoiceadvice',

	viewModel: {
		type: 'invoiceadvice'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refInvoiceAdviceGrid',
	MAIN_STORE_NAME: 'invoiceAdviceList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			xtype: 'form',
			defaults: {
				margin: '0 5 0 5' // top, right, bottom, left
			},
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '5 5 5 0',
					stateful: true,
					stateId: 'stateInvoiceAdviceGrid',
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
						celldblclick: 'onDblClick'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('InvoiceAdviceList')
					}
				}],
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
					items: [{
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
							click: 'onSearchBtn'
						}
					},
					{
						xtype: 'button',
						itemId: 'clearItemId',
						reference: 'refBtnClear',
						text: ViewUtil.getLabel('refresh'),
						iconCls: 'x-fa fa-refresh',
						listeners: {
							click: 'onRefresh'
						},

					},
					{
						xtype: 'button',
						itemId: 'clearItemId',
						reference:'refBtnRefresh',
						text: ViewUtil.getLabel('refresh'),
						iconCls: 'x-fa fa-refresh',
						listeners: {
							click: 'onRefresh'
						},
					
					},
					{
						xtype: 'button',
						itemId: 'createItemId',
						reference: 'refBtnCreate',
						text: ViewUtil.getLabel('add'),
						ui: 'create-button',
						iconCls: 'x-fa fa-plus',
						listeners: {
							click: 'onAdd'
						}
					},
					{
						xtype: 'button',
						itemId: 'exportToExcelButton',
						text: ViewUtil.getLabel('exportToExcel'),
						iconCls: 'excel-button-image', 
						cls: 'excel-button',
						listeners: {
							click: 'exportToExcel'
						}
					},
					{
						xtype: 'button',
						itemId: 'exportToPdfButton',
						text: ViewUtil.getLabel('exportToPdf'),
						iconCls: 'x-fa fa-file-pdf-o',
						cls: 'excel-button',
						listeners: {
							click: 'exportToPDF'
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

					},
					]
				},
				{////Search #################################
					xtype: 'toolbar',
					enableOverflow: true,
					margin: '0 -3 0 0',
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
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							width: '100%',
							defaults: {
								margin: '0 0 5 0'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									width: '100%',
									defaults: {
										labelAlign: 'right',
										editable: false,
										margin: '5 0 3 0',
									},
									items: [
										{
											reference: 'ctlFromDt',
											xtype: 'datefield',
											labelWidth: 25,
											flex: 0.6,
											fieldLabel: ViewUtil.getLabel('eTA'),
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												select: 'onDateChange'
											},
										},
										{
											reference: 'ctlToDt',
											xtype: 'datefield',
											margin: '5 0 3 5',
											flex: 0.5,
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												select: 'onDateChange'
											},
										},
										{
											xtype: 'vesselcalllistfield',
											flex: 1,
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('vslschlJPVCNo'),
											reference: 'refMainVslCallIdfield'
										},
										{
											xtype: 'partnercdtypefield',
											fieldLabel: ViewUtil.getLabel('partner'),
											reference: 'ctlPartner',
											flex: 1,
											labelWidth: 100,
											params: {
												searchModule: 'MT'
											},
											change: function (field, newValue) {
												field.setValue(newValue.toUpperCase());
											},
											editable: false
										},
										{
											xtype: 'textfield',
											reference: 'ctlAdviceNo',
											fieldLabel: ViewUtil.getLabel('adviceNo'),
											flex: 1,
											labelWidth: 100,
											fieldStyle: 'text-transform:uppercase',
											editable: true,
											listeners: {
												change: 'onUpperCase'
											}
										},
										{
											xtype: 'container',
											flex: 1,
										}
									]
								}
							]
						}]
				}
			]
		});
		me.callParent();
	}
});

