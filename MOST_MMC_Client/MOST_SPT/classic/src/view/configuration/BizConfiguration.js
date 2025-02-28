Ext.define('MOST.view.configuration.BizConfiguration', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-bizconfiguration',

	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-bizconfigurationdetail',
	controller: 'bizConfiguration',
	viewModel: {
		type: 'bizConfiguration'
	},
	
	listeners:{
		afterrender:'onLoad'
	},
	
	layout: {type:'hbox', align:'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBizConfigurationGrid',
	MAIN_STORE_NAME: 'bizConfigurationItems',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex : 1,
					plugins : [ 
			            'gridexporter',
			            'gridfilters',
			            'clipboard' 
					],
					selModel : {
						type : 'spreadsheet',
						cellSelect : false
					},
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'	
					},
					listeners : {
						cellDblClick : 'onDblClick',
						pagingSearch: 'onSearch'
					},
					columns : {
						defaults : {
							style : 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('BizConfiguration')
					}
				}],
			
			dockedItems: [
				{
					xtype : 'container',
					style: {
						"background-color":"white" 
					},
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
							reference:'refBtnCreate',
							text: ViewUtil.getLabel('add'),
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
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
		            	}
		            ]
				},{
					xtype : 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							flex:1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults:{
								margin: '0 0 5 0'
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refCode',
											inputType: 'search',
											fieldLabel: ViewUtil.getLabel('DCCode'),
											listeners: {
												change : 'onUpperCase'
											},
											bind: '{theSearch.code}'
										},{
											xtype: 'textfield',
											reference: 'refDescription',
											inputType: 'search',
											fieldLabel: ViewUtil.getLabel('DCDesc'),
											bind: '{theSearch.description}',
											listeners: {
												change : 'onUpperCase'
											}
										}
									]
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