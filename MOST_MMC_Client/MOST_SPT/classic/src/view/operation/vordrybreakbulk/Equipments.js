Ext.define('MOST.view.operation.vordrybreakbulk.Equipments', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-equipments',
	
	requires: [
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	BULK_GRID_REF_NAME: 'refBulkGrid',			
	BULK_STORE_NAME: 'bulk',
	FACILITY_GRID_REF_NAME: 'refFacilityGrid',			
	FACILITY_STORE_NAME: 'facilityList',
	BREAKBULK_GRID_REF_NAME: 'refBreakBulkGrid',			
	BREAKBULK_STORE_NAME: 'breakBulk',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			items: [
		        {
		            xtype: 'container',
	                flex: 1,
	                layout: {
	                    type: 'hbox',
	                    align: 'stretch'
	                },
	                defaults: {
                        margin: '5 0 0 0'// top, right, bottom, left
                    },
		            items: [
		            	{
		            		xtype: 'fieldset',
		            		flex: 1,
		            		margin: '5 0 5 5',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            title:'Bulk',
				            defaults: {
		                        margin: '5 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                        {
				                    xtype: 'tsb-datagrid',
				                    reference: me.BULK_GRID_REF_NAME,
				                    usePagingToolbar : false,
				    				stateful : true,
				    				flex:1,
				    				stateId : 'stateBulkGrid',
				    				plugins: [
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		bind: {
				    	    			store: '{' + me.BULK_STORE_NAME + '}'
				    	    		},
				    	    		selModel: {
				    					type: 'spreadsheet',
				    					cellSelect: false
				    				},
				    				listeners: {
				    						
				    				},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items: GridUtil.getGridColumns('BulkList'),
				                    }
						        }
		                    ]
		            	},{
		            		xtype: 'fieldset',
		            		flex: 1,
		            		margin: '5 0 5 5',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'vbox',
				                align: 'stretch'
				            },
				            title:'Facility',
				            defaults: {
		                        margin: '5 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
				                    xtype: 'tsb-datagrid',
				                    reference: me.FACILITY_GRID_REF_NAME,
				                    usePagingToolbar : false,
				    				stateful : true,
				    				flex:1,
				    				stateId : 'stateFacilityGrid',
				    				plugins: [
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		bind: {
				    	    			store: '{' + me.FACILITY_STORE_NAME + '}'
				    	    		},
				    	    		selModel: {
				    					type: 'spreadsheet',
				    					cellSelect: false
				    				},
				    				listeners: {
				    						
				    				},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items: GridUtil.getGridColumns('FacilityList'),
				                    }
						        }
		                    ]
		            	},{
		            		xtype: 'fieldset',
		            		flex: 1,
		            		margin: '5 0 5 5',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            title:'Break Bulk',
				            defaults: {
		                        margin: '5 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
				                    xtype: 'tsb-datagrid',
				                    reference: me.BREAKBULK_GRID_REF_NAME,
				                    usePagingToolbar : false,
				    				stateful : true,
				    				flex:1,
				    				stateId : 'stateBreakBulkGrid',
				    				plugins: [
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		bind: {
				    	    			store: '{' + me.BREAKBULK_STORE_NAME + '}'
				    	    		},
				    	    		selModel: {
				    					type: 'spreadsheet',
				    					cellSelect: false
				    				},
				    				listeners: {
				    						
				    				},
				                    columns: {
				    	            	defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items: GridUtil.getGridColumns('BulkList'),
				                    }
						        }
		                    ]
		            	},{
		            		xtype: 'fieldset',
		            		flex: 1,
		            		margin: '5 0 5 5',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            title:'Delivery Mode',
				            defaults: {
		                        margin: '5 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
				                    xtype: 'container',
				                    flex: 1,
					                layout: {
					                    type: 'vbox',
					                    align: 'stretch'
					                },
				                    defaults: {
				                        labelAlign: 'right',
				                        margin: '5 5 0 0'
				                    },
			    	            	items: [
			    	            	{
			    	            		xtype: 'checkboxfield',
			    	            		boxLabel: ViewUtil.getLabel('vorDirect'),
			    	            		value: 'false',
			           				    reference: 'refVORDirect',
			           				    readOnly: true
			    					},{
			    						xtype: 'checkboxfield',
			    						boxLabel: ViewUtil.getLabel('vorInDirect'),
			    	            		value: 'false',
			           				    reference: 'refVORInDirect',
			           				    readOnly: true
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