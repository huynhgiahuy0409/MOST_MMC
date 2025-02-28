Ext.define("MOST.view.codes.HSCode",{
	extend: "Ext.panel.Panel",
	
	alias: 'widget.app-hscode',
	requires: 
	[
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
	],
	
	controller: 'hscode',
	
	viewModel: 
	{
		type: 'hscode'
	},
	
	listeners: 
	{
		afterrender: 'onLoad'
	},
	
	title:'HS Code',
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refHSCodeGrid',
	MAIN_STORE_NAME: 'hsCodelist',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout:
	{
		type:'hbox',
		align:'stretch'
	},
	initComponent: function()
	{
		var me = this;
		
		Ext.apply(me, {
			layout: 
			{
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					plugins: 
					[
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: 
					{
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					selModel: 
					{
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: 
					{
						rowdblclick: 'onDblClick',
						pagingSearch: 'onSearch'
					},
					columns: 
					{
					defaults: 
					{
						style : 'text-align:center',
						align: 'center'
					},
					items:GridUtil.getGridColumns('HSCode')
					}
				}  
			],
			dockedItems: [
				{
					xtype: 'container',
					style: 
					{
						"background-color":"white"
					},
					layout: 
					{
						type: 'hbox',
					},
					defaults: 
					{
						margin: '1 1 1 1'
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							reference:'btnRetrieve',
							itemId:'inquiryItemId',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search', 
							cls: 'search-button', 
							listeners: 
							{
								click: 'onSearch'
							}
						},
						{
							xtype: 'button',
							itemId: 'btnAdd',
							reference:'btnAdd',
							text: ViewUtil.getLabel('add'),
							iconCls: 'x-fa fa-plus',
							listeners: 
							{
								click: 'onAdd'
							}
						},
						{
							xtype: 'button',
							itemId: 'buttonDelete',
							reference:'buttonDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: 
							{
								click: 'onRemove'
							}
						}
					]
				},
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					defaults: 
					{
						labelAlign: 'right',
					},
					items: [
						{
							xtype:'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							layout:
							{
								type:'vbox',
								align:'stretch'
							},
							defaults:
							{
								margin: '0 0 5 0'
							},
							flex: 1,
							items:[
								{
									xtype: 'container',
									layout:
									{
										type:'hbox'
									},
									defaults:
									{
										labelAlign: 'right',
										labelWidth:120,
										margin:'5 5 5 0'
									},
									items: [
										{
											xtype:'container',
											flex:1,
											layout:
											{
												type:'hbox'
											},
											defaults:
											{
												labelAlign: 'right',
												labelWidth:120,
												margin:'5 5 5 0'
											},
											items:
											[
												{
													xtype: 'textfield',
													reference: 'txtHsCd',
													fieldLabel:  ViewUtil.getLabel('hsCode'),
													flex: 1,
													inputType: 'search',
													bind: '{theSearch.hsCd}',
												},
												{
													xtype: 'textfield',
													reference: 'txtHsNm',
													fieldLabel:  "HS Name",
													flex: 1,
													inputType: 'search',
													bind: '{theSearch.hsNm}'
												},
											]
										},
									]
								}
							]
						}
					]
				},
			]
		});
		
		me.callParent();
	}
});
