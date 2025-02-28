Ext.define('MOST.view.codes.CapacityCode', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-capacitycode',
	
	requires: [
		'MOST.view.codes.CapacityCodeModel',
		'MOST.view.codes.CapacityCodeController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	detailViewAlias: 'app-capacitycodedetail',
	controller: 'capacitycode',

	viewModel: {
		type: 'capacitycode'
	},

	listeners: {
		afterrender: 'onLoad'
	},
 	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   	MAIN_GRID_REF_NAME: 'refcapacityCodeGrid',
   	MAIN_STORE_NAME: 'capacityCodeList',
   	EQUIPMENT_COMBO_STORE_NAME: 'capacityCodeEquipmentTypeCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {
		type  : 'vbox',
		align : 'stretch'
	},

	initComponent: function() {
		var me = this;
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'capacityCodeEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateEdit',
				edit: 'onEdit'
			}
		});
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'capacityCodeEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					state: true,
					stateId: 'statecapacityCodeGrid',
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
					listeners : {
						celldblclick: 'onDblClick',
						pagingSearch: 'onSearch'
					},
					columns :{
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('CapacityCode')
					}
				}
			],
			
			dockedItems: [
				{
					xtype : 'container',
					style: { "background-color":"white" },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items:[
						{
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
							}
						},{
							xtype: 'button',
							itemId: 'btnDelete',
							reference: 'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
							}
						},{
							xtype: 'button',
							itemId: 'exportToExcelButton',
							reference: 'refBtnDownload',
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
							reference: 'refBtnPreview',
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
		            	}
		            ]
				},{
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype:'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							margin: '0 5 0 0',
							padding: '0 10 10 10',
							layout:{
								type:'hbox',
								align:'stretch',
							},
							defaults:{
								labelAlign: 'right',
								labelWidth: 80
							},
							flex: 1,
							items:[
								{
									xtype: 'combo',
									reference: 'ctlEqTpCd',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('capacityTp'),
									bind: {
										store: '{' + me.EQUIPMENT_COMBO_STORE_NAME + '}',
									},
									displayField: 'scdNm',
									valueField: 'scd',
									queryMode: 'local',
									value: '',
									editable: false,
									matchFieldWidth: true,
								},
								{
									xtype: 'textfield',
									reference: 'ctlCapaCd',
									fieldLabel: ViewUtil.getLabel('capacityCd'),
									flex: 1,
									emptyText: ViewUtil.getLabel('capacityCd'),
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase',
									},
									maxLength: 10,
									enforceMaxLength: true,
									bind: {
										value: '{theSearch.capaCd}',
									},
								},
								{
									xtype: 'container',
									flex: 3,
								},
							]
						}
					],
				}
			]
		});
		
		me.callParent();
	}	
});