Ext.define('MOST.view.billing.InvoiceTemplate', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-invoicetemplate',
	requires: [
		'MOST.view.billing.InvoiceTemplateController',
		'MOST.view.billing.InvoiceTemplateModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'invoicetemplate',

	viewModel: {
		type: 'invoicetemplate'
	},

	listeners: {
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refinvoiceTemplateGrid',
	 MAIN_STORE_NAME: 'invoiceTemplateList',
	 /**
	  * CONSTANT END
	  * =========================================================================================================================
	  */
	layout: { type: 'hbox', align: 'stretch' },

	initComponent: function () {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'invoiceTemplateEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				edit: 'onEdit'
			}
		});

		Ext.apply(me, {
			defaults: {
				margin: '0 0 0 0' // top, right, bottom, left
			},
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'container',
					flex: 0.4,
					margin: '5 0 5 0',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [{
						xtype: 'fieldset',
						layout: {
							type: 'vbox',
							align: 'strecth'
						},
						margin: '0 5 0 0',
						defaults: {
							labelWidth: 90,
							labelAlign: 'right',
							margin: '5 0 0 0'
						},
						items: [
							{
								xtype: 'textfield',
								fieldLabel: 'Template Name',
								reference: 'refTemplateName',
								bind: '{theInvoiceTemplate.templateNm}',
								maxLength: 30,
								disabled: true,
								allowBlank: false,
								enforceMaxLength: true
							}, 
							{
								xtype: 'partnercdtypefield',
								fieldLabel: 'Payer',
								bind: {
									value: '{theInvoiceTemplate.payer}'
								},
								params: {
									searchModule: CodeConstants.LCD_MOST
								},
								change: function (field, newValue) {
									field.setValue(newValue.toUpperCase());
								}
							}, 
							{
								xtype: 'tagfield',
								width: '100%',
								bind: {
									store: '{searchCargoTpCdCombo}',
									value: '{theInvoiceTemplate.cargoTpCd}'
								},
								fieldLabel: 'Type of Cargo',
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								emptyText: 'Select',
								forceSelection: true
							}, 
							{
								xtype: 'tagfield',
								width: '100%',
								bind: {
									store: '{searchCategoryCombo}',
									value: '{theInvoiceTemplate.category}'
								},
								queryMode: 'local',
								fieldLabel: 'Category',
								displayField: 'scdNm',
								valueField: 'scd',
								emptyText: 'Select',
								forceSelection: true
							}, 
							{
								xtype: 'tagfield',
								width: '100%',
								bind: {
									store: '{searchDeliveryTpCdCombo}',
									value: '{theInvoiceTemplate.deliveryTpCd}'
								},
								fieldLabel: 'Devliery Mode',
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								emptyText: 'Select',
								forceSelection: true
							}, 
							{
								xtype: 'textfield',
								bind: '{theInvoiceTemplate.descr}',
								fieldLabel: 'Remark',
								maxLength: 50,
								enforceMaxLength: true
							}
						]
					}, 
					{
						xtype: 'tsb-datagrid',
						margin: '5 5 0 0',
						reference: me.MAIN_GRID_REF_NAME,
						stateful: true,
						stateId: 'stateinvoiceTemplateGrid',
						flex: 1,
						plugins: [
							//rowEditing,
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
							cellclick: 'onSearchClick'
						},
						columns: {
							defaults: {
								style: 'text-align:center',
								align: 'center'
							},
							items: GridUtil.getGridColumns('InvoiceTemplateList')
						}
					}]
				}, 
				{
					xtype: 'container',
					flex: 0.6,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					split: true,
					items: [
						{
							xtype: 'fieldset',
							margin: '5 5 5 5',
							items: [
								{
									xtype: 'container',
									margin: '5 5 5 5',
									layout: { type: 'hbox' },
									items: [
										{
											reference: 'ctltariffTypeCombo',
											xtype: 'combo',
											labelWidth: 80,
											labelAlign: 'right',
											width: 300,
											fieldLabel: ViewUtil.getLabel('invoicetemplatetrfTpCdNm'),
											queryMode: 'local',
											bind: {
												store: '{invoiceTemplateTariffTypeComboList}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection: true,
											listeners: {
												change: 'onTariffTypeChange'
											}
										}, 
										{
											xtype: 'button',
											margin: '0 0 0 5',
											itemId: 'saveButton',
											text: ViewUtil.getLabel('save'),
											disabled: true,
											ui: 'create-button',
											iconCls: 'fa fa-floppy-o',
											reference: 'refBtnSaveInfo',
											width: 150,
											listeners: {
												click: 'onSaveInfo'
											}
										}
									]
								}
							]
						}, 
						{
							xtype: 'tsb-datagrid',
							flex: 1,
							margin: '0 5 5 5',
							reference: 'reftariffTypeGrid',
							stateful: true,
							stateId: 'statetariffTypeGrid',
							bind: {
								store: '{invoiceTemplateTariffTypeList}'
							},
							listeners: {
								pagingSearch: 'onSearch'
							},
							layout: 'fit',
							columns: {
								items: GridUtil.getGridColumns('InvoiceTemplateTariffList')
							}
						}
					]
				}],
			dockedItems: [{
				xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
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
					itemId: 'deleteItemId',
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
					itemId: 'saveItemId',
					reference: 'refBtnSave',
					text: ViewUtil.getLabel('save'),
					ui: 'update-button',
					iconCls: 'x-fa fa-save',
					disabled: true,
					listeners: {
						click: 'onSave'
					}
				}]
			}]
		});
		me.callParent();
	}
});

