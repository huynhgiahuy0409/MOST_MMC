Ext.define("MOST.view.codes.DangerousGoodsCode",{
	extend: "Ext.panel.Panel",
    
    alias: 'widget.app-dangerousgoodscode',
    requires: [
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
   	],
   	
   	detailViewAlias: 'app-dangerousgoodscodedetail',
   	controller: 'dangerousgoodscode',
   	viewModel: {
   		type: 'dangerousgoodscode'
   	},
   	layout : { type : 'hbox', align : 'stretch'},
   	
   	listeners:{
		afterrender:'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDangerousGoodsCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'dangerousGoodsCode',	
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
						cellSelect: false
					},
		    		listeners: {
		    			cellDblClick : 'onDblClick',
		    			pagingSearch: 'onSearch'
		    		},
	   				columns: {
		    			defaults: {
		            		style : 'text-align:center',
		            		align: 'center'
		            	},
		            	items: GridUtil.getGridColumns('DangerousGoodsCode')
	   				}
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
		                    itemId:'inquiryItemId',
		                    reference : 'refBtnRetrieve',
		                    text: ViewUtil.getLabel('search'),
		                    iconCls: 'x-fa fa-search',
		                    cls: 'search-button', 
		                    listeners: {
		                        click: 'onSearch'
		                    }
		                },{
		                    xtype: 'button',
		                    itemId:'createItemId',
		                    reference : 'refBtnCreate',
		                    text: ViewUtil.getLabel('add'),
		                    ui: 'create-button',
		                    iconCls: 'x-fa fa-plus',
		                    listeners: {
		                        click: 'onAdd'
		                    }
		                },{
		                    xtype: 'button',
		                    itemId: 'deleteItemId',
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
				   	       					reference: 'txtUNNO',
				   	       					xtype: 'textfield',
				   	       					inputType: "search",
				   	       					selectOnFocus: true,
				   	       					fieldLabel: ViewUtil.getLabel('unno'),
				   	       					enableKeyEvents :true,
				   	       					labelWidth: 50,
				   	       		            enforceMaxLength: true,
				       		            	bind: '{theSearch.unno}'
				   	       				},{
				   	       					reference: 'txtClass',
				   	       					xtype: 'textfield',
				   	       					selectOnFocus: true,
				   	       					fieldLabel: ViewUtil.getLabel('gridtitleClass'),
				   	       					labelWidth:50,
				   	       					maxLength: 5,
				   	       		            enforceMaxLength: true,
				   	       		            bind: '{theSearch.unnoClass}'
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
