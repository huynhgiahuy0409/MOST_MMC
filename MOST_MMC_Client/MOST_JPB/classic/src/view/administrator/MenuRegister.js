Ext.define('MOST.view.administrator.MenuRegister', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-menuregister',
	
	requires: [
	],
	
	controller: 'menuregister',

	viewModel: {
		type: 'menuregister'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	detailViewAlias: 'menuregisterdetail',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refColPgmId',  // Main Grid Name 
	MAIN_STORE_NAME: 'menuList',            // Main Store Name
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
			items: [
				{
					xtype: 'tsb-datagrid',
		    		reference: me.MAIN_GRID_REF_NAME,
		    		flex: 1,
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
		            	items: GridUtil.getGridColumns('MenuRegisterList')
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
					xtype: 'toolbar',
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
											reference: 'refPgmId',
											fieldLabel: ViewUtil.getLabel('programId'),
											labelWidth: 100,
											width: 300,
											maskRe: /[^$]/,
											bind: '{theSearch.pgmId}'
										},{
											xtype: 'textfield',
											reference: 'refPgmNm',
											fieldLabel: ViewUtil.getLabel('programNm'),
											labelWidth: 100,
											width: 300,
											maskRe: /[^$]/,
											bind: '{theSearch.pgmNm}'
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