Ext.define('MOST.view.billing.AnnualHoliday', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-annualholiday',
	requires: [
		'MOST.view.billing.InvoiceUnitModel',
		'MOST.view.billing.InvoiceUnitController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'annualholiday',
	
	viewModel: {
		type: 'annualholiday'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	HOLIDAY_GRID_REF_NAME : 'refdefinedHolidayCodesGrid',
	HOLIDAY_STORE_NAME : 'defineHolidayList',
	
	MAIN_GRID_REF_NAME: 'refannualHolidayGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'annualHolidayList',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {
        type: 'hbox',
        align: 'stretch'
    },

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'annualHolidayEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',			
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [
		        {
		            xtype: 'fieldset',
		            width: '45%',
		            layout: 'auto',
		            scrollable: true,
		            title: 'DEFINED HOLIDAY CODES',
		            items: [
		                {
		                    xtype: 'container',
		                    items: [
		                        {
		                        	xtype: 'tsb-datagrid',
		            				reference: me.HOLIDAY_GRID_REF_NAME,
		            				usePagingToolbar : false,
		            				stateful : true,
		            				height: '100%',
		            				flex : 1,
		            				stateId : 'statedefinedHolidayCodesGrid',
		            				plugins: [
		            					'gridexporter',
		            					'gridfilters',
		            					'clipboard'
		            	    		],
		            	    		bind: {
		            	    			store: '{' + me.HOLIDAY_STORE_NAME + '}'
		            	    		},
		            	    		selModel: {
		            	    	        selType: 'checkboxmodel',
		            	    	        mode: 'MULTI',
		            	    	        checkOnly: true,
		            	    	        listeners: {
		            	    	            select: 'onChecked',
		            	    	            deselect:'onChecked'
		            	    	        }
		            	    	    },
		            	    	    columns:{
		            	    			defaults: {
		            	            		style : 'text-align:center',
		            	            		align: 'center'
		            	            	},
		            	            	items: GridUtil.getGridColumns('AnnualHoliday_Holiday')
		            	    		}
		                        }
		                    ]
		                }
		            ]
		        },
		        {

	            	xtype: 'container',
                    width: '10%',
                    layout : {
                    	type  : 'vbox', 
                    	align : 'stretch',
                    	margin: '0 0 0 0'
                       },
                    items: [
                       {

                    	   	xtype: 'button',
	       					itemId: 'btnAdd',
	       					text: ViewUtil.getLabel('add'),
	       					width: 50,
	       					margin:'230 10 0 10',
	       					ui: 'create-button',
	       					iconCls: 'x-fa fa-plus',
	       					listeners: {
	       						click: 'onAdd'
	       					}
                       
        				}, {
        					xtype: 'button',
        					itemId: 'deleteButton',
        					text: ViewUtil.getLabel('remove'),
        					width: 50,
        					margin:'20 10 0 10',
        					ui: 'delete-button',
        					iconCls: 'x-fa fa-minus',
        					listeners: {
        						click: 'onRemove'
        					}
        				}
                    ]
	            
		        },
		        {
		            xtype: 'fieldset',
                    margin: '10 10 0 0',
		            width: '45%',
		            layout: 'fit',
		            //scrollable: true,
		            items: [
		                {
		                    xtype: 'container',
		                    scrollable: true,
		                    //layout : {type  : 'hbox', align : 'stretch'},
		                    items: [
			                        {
			                        	xtype: 'toolbar',
			            				enableOverflow: true,
			            				items: [{
				                            xtype: 'numberfield',
				    	            		reference: 'refHolidayOfTheYear',
				                            labelWidth:150,
				                            minValue : 2010,
		        	    					maxValue: 2060,
		        	    					maxLength : 4,
		        							enforceMaxLength : true,
		        							allowBlank: false,
		        							allowOnlyWhitespace: false,
				                            fieldLabel: ViewUtil.getLabel('hOLIDAYofTHEYEAR'),
				                            margin:'0 10 0 0',
				                            listeners: {
				                            	change: 'onSearch'
				                            }
			            		}]
		                },
		                {
		                			xtype: 'tsb-datagrid',
		                			//margin:'10 0 0 0',
		                			usePagingToolbar : false,
		                            reference: me.MAIN_GRID_REF_NAME,
		                            stateful : true,
		            				stateId : 'stateannualHolidayGrid',
		                            plugins: [
//		            					rowEditing, 
		            					'gridexporter',
		            					'gridfilters',
		            					'clipboard'
		            	    		],
		            	    		bind: {
		            	    			store: '{' + me.MAIN_STORE_NAME + '}'
		            	    		},
		            	    		
		            				listeners: {
//		            					celldblclick: 'onDblClick'
		            				},
		            				selModel: {
		            	    	        selType: 'checkboxmodel',
		            	    	        mode: 'MULTI',
		            	    	        checkOnly: false,
		            	    	        listeners: {
		            	    	            select: 'onChecked',
		            	    	            deselect:'onChecked'
		            	    	        }
		            	    	    },
		            	    	    columns:{
		            	    			defaults: {
		            	            		style : 'text-align:center',
		            	            		align: 'center'
		            	            	},
		            	            	items: GridUtil.getGridColumns('AnnualHoliday')
		            	    		}
		                        }
		                    ]
		                }
		            ]
		        }
            ],
            dockedItems: [{
                xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
                items: [{
					xtype: 'tbfill'
				},
                {
					xtype: 'button',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search', 
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				}]
            }]
		});
		
		me.callParent();
	}
});


