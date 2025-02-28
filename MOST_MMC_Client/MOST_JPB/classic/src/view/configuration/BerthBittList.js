Ext.define('MOST.view.configuration.BerthBittList', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-berthbittlist',
	
	requires:[
		'MOST.config.Locale',
   		'Ext.grid.plugin.RowEditing',
   		'Ext.grid.plugin.Exporter',
   		'Ext.grid.plugin.Clipboard',
   		'Ext.grid.filters.Filters',
   		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.configuration.BerthBittListModel',
		'MOST.view.configuration.BerthBittListController'
	],
    
	controller: 'berthBittList',
	
	viewModel: {
		type: 'berthBittList'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBerthBittGrid',
	MAIN_STORE_NAME: 'berthBitt',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: {type:'hbox', align: 'stretch'},
	
	initComponent: function() {
		var me=this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'berthBittEditor',
			autoCancel: false,
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateedit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(this, {
			items:[{
				xtype:'container',
				layout:{
					type:'vbox',
					align:'stretch'
				},
				flex: 1,
				items:[{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME ,
					usePagingToolbar : false,
					flex: 1,
					plugins: [
						rowEditing, 
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						rowSelect: true,
						cellSelect:false,
					},
					listeners: {
						cellDblClick: 'onDblClick',
						pagingSearch: 'onSearch'
					},
					columns:{
						defaults: {
							style : 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('BerthBitt')
					}
				}]
			}],
			
			dockedItems: [{
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items:[{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					reference : 'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search', 
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},
				{
					xtype: 'button',
					reference : 'refBtnCreate',
					itemId: 'btnAdd',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},
				{
					xtype: 'button',
					reference : 'refBtnDelete',
					itemId: 'btnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemove'
					}
				},
				{
					xtype: 'button',
					reference : 'refBtnDownload',
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
					reference : 'refBtnPreview',
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
			}]
		});
		me.callParent();
	}
});