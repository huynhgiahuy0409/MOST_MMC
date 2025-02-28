Ext.define('MOST.view.codes.CommodityCode', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-commoditycode',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-commoditycodedetail',
	controller: 'commoditycode',
	
	viewModel: {
		type: 'commoditycode'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refcommodityCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commodityCodeList',
	COMMODITY_CODE_CATEGORY_STORE: 'commodityCodeCategoryCombo',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'commodityCodeEditor',
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
					margin : '0 5 5 0',
					flex: 1,
					stateful: true,
					stateId: 'statecommodityCodeGrid',
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
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('CommodityCode')
					}
				}
			],
			
			dockedItems:[
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
							text: ViewUtil.getLabel('search'),
							itemId:'inquiryItemId',
							iconCls: 'x-fa fa-search',
							cls: 'search-button', 
							reference:'refBtnRetrieve',
							listeners: {
								click: 'onSearch'
							}
						},{
							xtype: 'button',
							text: ViewUtil.getLabel('add'),
							itemId:'createItemId',
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							reference:'refBtnCreate',
							listeners: {
								click: 'onAdd'
							}
						},{
							xtype: 'button',
							itemId:'deleteItemId',
							text: ViewUtil.getLabel('remove'),
							reference:'refBtnDelete',
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
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
					defaults:{
						labelAlign: 'right',
					},
					items:[
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
											xtype: 'combo',
											reference: 'ctlCgTp',
											labelWidth: 50,
											width: 200,
											fieldLabel: ViewUtil.getLabel('category'),
											queryMode: 'local',
											bind: {
												store: '{' + me.COMMODITY_CODE_CATEGORY_STORE + '}',
												value: '{theSearch.cgTp}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											editable: false
										},{
											xtype: 'textfield',
											reference: 'ctlCmdtCd',
											fieldLabel: ViewUtil.getLabel('cmdtCd'),
											width: 250,
											emptyText: me.lblCmdtCd,
											fieldStyle: 'text-transform:uppercase',
											listeners: {
												change : 'onUpperCase'
											},
											maxLength: 10,
											enforceMaxLength: true,
											bind: '{theSearch.cmdtCd}'
										},{
											xtype: 'textfield',
											reference: 'ctlDescr',
											fieldLabel: ViewUtil.getLabel('descr'),
											width: 250,
											emptyText: me.lblDescr,
											fieldStyle: 'text-transform:uppercase',
											listeners: {
												change : 'onUpperCase'
											},
											bind: '{theSearch.descr}'
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