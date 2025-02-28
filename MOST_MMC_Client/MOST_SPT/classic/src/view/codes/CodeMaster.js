Ext.define('MOST.view.codes.CodeMaster', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-codemaster',

	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-codemasterdetail',
	controller: 'codeMaster',
	viewModel: {
		type: 'codeMaster'
	},
	
	listeners:{
		afterrender:'onLoad'
	},
	
	layout: {type:'hbox', align:'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDetailCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'codeMaster',
	LARGE_CODE_COMBO_STORE: 'largeCodeCombo',
	LARGE_CODE_COMBO_FOR_GRID_STORE: 'largeCodeComboForGrid',
	MIDDLE_CODE_COMBO_STORE: 'middleCodeCombo',
	MIDDLE_CODE_COMBO_FOR_GRID_STORE: 'middleCodeComboForGrid',
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
						items: GridUtil.getGridColumns('CodeMaster')
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
							itemId: 'btnDelete',
							reference:'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
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
											reference : 'cmbSystemCode',
											xtype : 'combo',
											fieldLabel : ViewUtil.getLabel('lcd'),
											emptyText : 'select',
											displayField : 'lcdNm',
											valueField : 'lcd',
											bind : {
												store: '{' + me.LARGE_CODE_COMBO_STORE + '}',
												value : '{theSearch.lcd}'
											},
											listeners : {
												select : 'onSearch'
											},
											editable : false
										},{
											reference : 'cmbCode',
											xtype : 'combo',
											fieldLabel : ViewUtil.getLabel('mcd'),
											emptyText : 'code',
											displayField: 'mcdNm',
											valueField: 'mcd',
											queryMode: 'local',
											editable : true,
											bind: {
												store: '{' + me.MIDDLE_CODE_COMBO_STORE + '}',
												value : '{theSearch.mcd}'
											}
										},{
											xtype: 'textfield',
											reference: 'txtDetailCode',
											inputType: 'search',
											fieldLabel: ViewUtil.getLabel('scd'),
											listeners: {
												change : 'onUpperCase'
											},
											bind: '{theSearch.scd}'
										},{
											xtype: 'textfield',
											reference: 'txtDetailCodeNm',
											inputType: 'search',
											fieldLabel: ViewUtil.getLabel('name'),
											bind: '{theSearch.scdNm}'
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