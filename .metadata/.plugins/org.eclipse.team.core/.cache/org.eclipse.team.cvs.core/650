Ext.define('MOST.view.codes.CommodityPackageType', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-commoditypackagetype',
	
	requires: [
		'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-commoditypackagetypedetail',
	controller: 'commoditypackagetype',
	
	viewModel: {
		type: 'commoditypackagetype'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	COMMODITY_GRID_REF_NAME: 'refCommodityGrid',
	COMMODITY_GROUP_GRID_REF_NAME: 'refCommodityGroupGrid',
	
	COMMODITY_GRID_STORE_NAME: 'commodityCodeList',
	COMMODITY_GROUP_GRID_STORE_NAME: 'commodityGroup',
	
	COMMODITY_CODE_CARGOTP_STORE: 'commodityCodeCargoTpCombo',
	COMMODITY_CODE_GROUP_CODE_STORE: 'commodityCodeGroupCdCombo',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
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
							itemId:'inquiryItemId',
							reference:'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button', 
							listeners: {
								click: 'onSearch'
							}
						},{
							xtype: 'button',
							itemId:'createItemId',
							reference:'refBtnCreate',
							text: ViewUtil.getLabel('add'),
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onCreate'
							}
						},{
							xtype: 'button',
							itemId:'deleteItemId',
							reference:'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
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
							title: 'Search Condition',
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
											xtype: 'container',
											margin: '0 80 0 0'
										},{
											xtype: 'combo',
											reference: 'ctlCgTp',
											labelWidth: 100,
											width: 250,
											fieldLabel: ViewUtil.getLabel('cargoTp'),
											queryMode: 'local',
											bind: {
												store: '{' + me.COMMODITY_CODE_CARGOTP_STORE + '}',
												value: '{theSearch.cgTp}'
											},
											listeners : {
												select : 'onSearchGrpCdCbx'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select',
											editable: false
										},{
											xtype: 'combo',
											reference: 'ctlComGr',
											labelWidth: 100,
											width: 250,
											fieldLabel: ViewUtil.getLabel('commodityGroup'),
											queryMode: 'local',
											bind: {
												store: '{' + me.COMMODITY_CODE_GROUP_CODE_STORE + '}',
												value: '{theSearch.cmdtGrpCd}'
											},
											displayField: 'scd',
											valueField: 'scd',
											value: '',
											editable: true
										},{
											xtype: 'textfield',
											reference: 'txtComCd',
											labelWidth: 100,
											width: 250,
											fieldLabel: ViewUtil.getLabel('commodityCode'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind:'{theSearch.cmdtCd}'																													
										}
									]
								}
							]
						}
					]
				},{
					xtype : 'toolbar',
					enableOverflow: true,
					padding : '10 0 0 0',
					defaults:{
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'searchfieldset',
							title: 'Commodity Group Grid',
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
										margin: '0 0 0 0',
										height: 250
									},
									items: [
										{
											xtype: 'tsb-datagrid',
											reference: me.COMMODITY_GROUP_GRID_REF_NAME,
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
												store: '{' + me.COMMODITY_GROUP_GRID_STORE_NAME + '}'
											},
											selModel: {
												type: 'spreadsheet',
												cellSelect: false
											},
											listeners : {
												celldblclick: 'onDblClick',
												cellclick: 'onGridClick',
												pagingSearch: 'onSearch'
											},
											columns: {
												defaults: {
													style: 'text-align:center',
													align: 'center',
												},
												items: GridUtil.getGridColumns('CommodityGroupGrid')
											}
										}
									]
								}
							]
						}
					]
				},{
					xtype : 'toolbar',
					enableOverflow: true,
					padding : '10 0 0 0',
					defaults:{
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'searchfieldset',
							title: 'Commodity Grid',
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
										margin: '0 0 0 0',
										height: 400
									},
									items: [
										{
											xtype: 'tsb-datagrid',
											reference: me.COMMODITY_GRID_REF_NAME,
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
												store: '{' + me.COMMODITY_GRID_STORE_NAME + '}'
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
												items: GridUtil.getGridColumns('CommodityGrid')
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