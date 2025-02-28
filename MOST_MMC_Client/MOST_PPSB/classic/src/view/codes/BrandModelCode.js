Ext.define("MOST.view.codes.BrandModelCode",{
	extend: "Ext.panel.Panel",
    
    alias: 'widget.app-rorobrandandmodelcode',
    requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.codes.BrandModelCodeModel',
		'MOST.view.codes.BrandModelCodeController',
   	],
	controller: 'brandModelCode',
	viewModel: {
		type: 'brandModelCode'
	},
	listeners: {
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBrandCodeGrid',
	MAIN_STORE_NAME: 'brandCode',	
	MODEL_CODE_STORE_NAME: 'modelCode',
	MAIN_GRID_MODEL_CODE_NAME: 'refModelCode',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
    	
	layout: {type:'hbox', align:'stretch'},
	
	initComponent: function() {
		var me = this;
		
		var brandCodeEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'brandCodeEditor',
			autoCancel: false,
			listeners:{
				cancelEdit:'onCancelEdit',
				validateedit:'onBrandCodeValidateEdit',
				edit:'onEdit'
			}
		});
		
		var modelCodeEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 2,
			clicksToEdit: 2,
			pluginId :'modelCodeEditor',
			autoCancel: false,
			listeners:{
				cancelEdit:'onCancelEdit',
				validateedit:'onModelCodeValidateEdit',
				edit:'onEdit'
			}
		});
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{
					xtype:'container',
					layout:{
						type:'hbox',
						align : 'stretch'
					},
					flex: 1,
					items:[
						{
							xtype :'fieldset',
							title : ViewUtil.getLabel('brand'),
							layout:{
								type: 'vbox',
								align : 'stretch'
							},
							margin : '0 0 0 0',
							defaults:{
								labelAlign: 'right',
								labelWidth: 80,
								margin : '3 0 0 0'
							},
							flex : 1,
							items:[
								{
									xtype: 'tsb-datagrid',
									reference:  me.MAIN_GRID_REF_NAME,
									flex: 1,
									margin: '5 5 5 5',
									scrollable: true,
									stateful : true,
									plugins: [
										brandCodeEditing, 
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
										cellclick: 'onClick',
										celldblclick: 'onDblclick',
										pagingSearch: 'onSearch'
									},
									columns: {
										defaults: {
											style : 'text-align:center',
											align : 'center'
										},
										items:GridUtil.getGridColumns('BrandCode')
									}
								}
							]
						},{
							xtype :'fieldset',
							title : ViewUtil.getLabel('model'),
							margin : '0 0 0 5',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							defaults:{
								labelAlign: 'right',
								labelWidth: 80,
								margin : '3 0 0 0'
							},
							listeners: {
								pagingSearch: 'onSearch'
							},
							flex : 1,
							items:[
								{
									xtype: 'container',
									style: { "background-color":"white" },
									layout: {
										type: 'hbox'
									},
									defaults: {
										margin: '1 1 1 1'
									},
									items: [
										{
											xtype: 'tbfill'
										},{
											xtype: 'button',
											itemId: 'btnAdd',
											reference:'refBtnCreate',
											text: ViewUtil.getLabel('add'),
											iconCls: 'x-fa fa-plus',
											listeners: {
												click: 'onModelAdd'
											},
											disable: true
										},{
											xtype: 'button',
											itemId: 'btnDelete',
											reference:'refBtnDelete',
											text: ViewUtil.getLabel('remove'),
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											listeners: {
												click: 'onModelCodeRemove'
											}
										}
									]
								},{
									xtype: 'tsb-datagrid',
									reference:'refModelCode',
									flex: 1,
									margin: '5 5 5 5',
									bind: {
										store: '{' + me.MODEL_CODE_STORE_NAME + '}'
									},
									plugins: [
										modelCodeEditing, 
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									selModel: {
										type: 'spreadsheet',
										cellSelect: false
									},
									listeners: {
										celldblclick: 'onUpdateModel',
										pagingSearch: 'onSearch'
									},
									columns: {
										defaults: {
											style : 'text-align:center',
											align : 'center'
										},
										items:GridUtil.getGridColumns('ModelCode')
									}
								}
							]
						}
					]
				}
			],
			
			dockedItems: [
				{
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
						},{
							xtype: 'button',
							reference : 'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search', 
							cls: 'search-button', 
							listeners: {
								click: 'onSearch'
							}
						},{
							xtype: 'button',
							reference : 'refBtnCreate',
							itemId: 'btnAdd',
							text: ViewUtil.getLabel('add'),
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onBrandCodeAdd'
							}
						},{
							xtype: 'button',
							reference : 'refBtnDelete',
							itemId: 'btnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onBrandCodeRemove'
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
									args:[me.MAIN_GRID_MODEL_CODE_NAME, true]
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
									args:[me.MAIN_GRID_MODEL_CODE_NAME, false]
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
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype:'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							layout:{
								type:'vbox',
								align:'stretch'
							},
							defaults:{
								margin: '0 0 5 0'
							},
							flex: 1,
							items:[
								{
									xtype: 'container',
									layout:{
										type:'hbox'
									},
									defaults:{
										labelAlign: 'right',
										labelWidth:80,
										margin:'5 5 5 0'
									},
									items: [
										{
											reference: 'txtBrandCd',
											xtype: 'textfield',
											inputType: "search",
											selectOnFocus: true,
											fieldLabel: 'Brand',
											enableKeyEvents :true,
											fieldStyle: 'text-transform:uppercase',
											bind: '{theSearch.brandNm}'	
										},{
											reference: 'txtBrandNm',
											xtype: 'textfield',
											inputType: "search",
											selectOnFocus: true,
											fieldLabel: 'Model',
											fieldStyle: 'text-transform:uppercase',
											bind: '{theSearch.modelNm}'	
										}
									]
								}     					
							]
						}
					],
				}
			]
		});
		
		me.callParent();
	}
});
