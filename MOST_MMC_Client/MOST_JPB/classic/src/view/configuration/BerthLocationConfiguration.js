Ext.define('MOST.view.configuration.BerthLocationConfiguration', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-berthwharflocationcode',
	
	requires:[
		'MOST.config.Locale',
   		'Ext.grid.plugin.RowEditing',
   		'Ext.grid.plugin.Exporter',
   		'Ext.grid.plugin.Clipboard',
   		'Ext.grid.filters.Filters',
   		'Ext.grid.selection.SpreadsheetModel'
	],
    
	controller: 'berthLocationConfiguration',
	
	viewModel: {
		type: 'berthLocationConfiguration'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBerthWharfLocationGrid',
	MAIN_STORE_NAME: 'berthWharfLocation',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: {type:'hbox', align: 'stretch'},
	
	initComponent: function() {
		var me=this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'berthWharfLocationEditor',
			autoCancel: false,
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateedit',
				edit: 'onEdit',
				beforeedit: 'updateBackgroundColorForPicker'
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
						// type: 'spreadsheet',
						rowSelect: true,
						cellSelect: false,
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
						items: GridUtil.getGridColumns('BerthWharfLocation')
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
					itemId: 'btnAdd',
					reference:'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},
				{
					xtype: 'button',
					itemId: 'btnDelete',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemove'
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
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [{
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
					margin: '0 0 0 0',
					items: [{
						xtype: 'container',
						layout:{
							type:'hbox'
						},
						defaults:{
							labelAlign: 'right',
							labelWidth:80,
							margin:'5 5 5 0'
						},
						items:[{
							xtype: 'textfield',
							reference: 'refBerthCode',
							fieldLabel: ViewUtil.getLabel('berthcode'),
							inputType: 'search',
							selectOnFocus: true,
							maxLength: 4,
							enforceMaxLength: true,
							listeners:{
								change: function(){
									this.setValue(this.getValue().toUpperCase());
								}
							},
							bind: {
								value: '{theSearch.berthCd}'
							},
						},{
							xtype: 'textfield',
							reference: 'refBerthName',
							fieldLabel: ViewUtil.getLabel('berthname'),
							inputType: 'search',
							selectOnFocus: true,
							bind: {
								value: '{theSearch.berthNm}'
							},
						}]
					}]
				}]
			}]
		});
		me.callParent();
	}
});