Ext.define('MOST.view.codes.GeneralCode',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.app-code',
	requires : [ 
	    'Ext.grid.plugin.Exporter',
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.grid.filters.Filters',
	    'Ext.grid.plugin.Clipboard'
	],
		
	detailViewAlias: 'app-codedetail',
	controller: 'generalcode',
	viewModel: {
		type: 'generalcode'
	},
	
	layout : { type : 'hbox', align : 'stretch'},

	listeners:{
		afterrender:'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'generalCode',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent : function() {
		var me = this;

		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items : [ 
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
						items: GridUtil.getGridColumns('GeneralCode')
					}
				}
			],
			
			dockedItems : [
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
							reference : 'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search', 
							cls: 'search-button', 
							listeners: {
								click: 'onSearch'
							}
						},{
							xtype: 'button',
							itemId: 'btnAdd',
							reference : 'refBtnCreate',
							text: ViewUtil.getLabel('add'),
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
						},{
							xtype: 'button',
							itemId: 'btnDelete',
							reference : 'refBtnDelete',
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
												store : '{largeCodeCombo}',
												value : '{theSearch.lcd}'
											},
											listeners : {
												select : 'onSearch'
											},
											editable : false
										},{
											reference : 'cmbCode',
											xtype : 'textfield',
											fieldLabel : ViewUtil.getLabel('mcd'),
											emptyText : 'code',
											editable : true,
											inputType : "search",
											listeners:{
												change: function(){
													this.setValue(this.getValue().toUpperCase());
												}
											},
											maskRe:/^[0-9a-zA-Z]$/,
											bind: '{theSearch.mcd}'
										},{
											reference : 'txtCodeNm',
											xtype : 'textfield',
											inputType : "search",
											selectOnFocus : true,
											fieldLabel : ViewUtil.getLabel('name'),
											bind: '{theSearch.mcdNm}'
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