Ext.define('MOST.view.operation.vorliquidbulk.LiquidOperation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-liquidoperation',
	
	requires: [
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refLiquidOperationGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'liquidOperationStore',
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
	                layout: {
	                    type: 'vbox',
	                    align: 'stretch'
	                },
	                margin: '5 0 0 0',
	                defaults: {
                        margin: '5 0 0 0'// top, right, bottom, left
                    },
		            items: [
		            	{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
		                            xtype: 'combo',
		                            width: 350,
		                            reference: 'refLoadingDischargingType',
									editable:false,
									allowBlank: false,
		                            fieldLabel: ViewUtil.getLabel('vorLoadingDischarging'),
		                            queryMode: 'local',
	                                labelWidth: 170,
		                            emptyText: 'Select',
									bind:{
										store:'{loadingDischargingTypeCombo}',
										value: '{theSearch.catgTpCd}'
									},
									listeners: {
				            			select : 'onChangeLDDCType'
				            		},
									displayField:'scdNm',
									valueField:'scd',
		                        },
		                        {
		                            xtype: 'textfield',
		                            width: 550,
	                                labelWidth: 280,
		                            fieldLabel: ViewUtil.getLabel('commodityGroup'),
		                            name: 'cmdtGrpCd',
									bind: '{theLiquid.cmdtGrpNm}',
									editable : false
		                        },
		                        {
		                            xtype: 'textfield',
		                            width: 300,
	                                labelWidth: 200,
		                            fieldLabel: ViewUtil.getLabel('gateoperation.custom'),
//		                            name: 'cmdtGrpCd',
									bind: '{theLiquid.custMode}',
									editable : false
		                        }
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 100
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
									xtype: 'combobox',
									reference: 'ctlLiquidBLSN',
									fieldLabel: ViewUtil.getLabel('blSN'),
	                                labelWidth: 170,
		                            width: 350,
		                            emptyText: 'Select',
									bind: {store: '{liquidBlSnNoCombo}'},
									listeners:{
										select:'onSelectBlSn'
									},
									queryMode: 'local',
									editable: false,
									allowBlank: false,
									displayField:'scdNm',
									valueField:'scd',
								},
		                        {
		                            xtype: 'textfield',
	                                labelWidth: 280,
		                            width: 550,
		                            fieldLabel: ViewUtil.getLabel('commodity'),
									bind: '{theLiquid.cmdtNm}',
									editable : false
		                        },
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 100
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
									xtype: 'combobox',
									reference: 'ctlLiquidSDOGR',
									fieldLabel: ViewUtil.getLabel('sdogrNo'),
	                                labelWidth: 170,
		                            width: 350,
		                            emptyText: 'Select',
									bind: {store: '{liquidSDOGRCombo}'},
									queryMode: 'local',
									listeners:{
										select:'onSelectSdoGr'
									},
									editable: false,
									displayField:'scdNm',
									valueField:'scd',
								},
		                        {
		                            xtype: 'textfield',
	                                labelWidth: 280,
		                            width: 550,
		                            fieldLabel: ViewUtil.getLabel('packageTp'),
									bind: '{theLiquid.pkgTpNm}',
									editable : false
		                        },
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 100
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
	                                labelWidth: 170,
		                            width: 350,
		                            fieldLabel: ViewUtil.getLabel('cargoType'),
									bind: '{theLiquid.cgTpCdNm}',
									editable : false
		                        },
	                            {
		                        	xtype: 'datefield',
	            					editable:false,
	            					forceSelection: true,
	            					fieldLabel: ViewUtil.getLabel('startTime'),
	                                labelWidth: 280,
	            					reference: 'refLiquidStartTime',
		                            width: 550,
		        					allowBlank: false,
		        					format: MOST.config.Locale.getShortDate(),
	                            },
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 100
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
	                                labelWidth: 170,
		                            width: 350,
	            					reference: 'refM3Handled',
									allowBlank: false,
		                            fieldLabel: ViewUtil.getLabel('vorM3Handled'),
									bind: '{theLiquid.msrmt}'
		                        },
	                            {
		                        	xtype: 'datefield',
	            					editable:false,
	            					forceSelection: true,
	            					fieldLabel: ViewUtil.getLabel('endTime'),
	                                labelWidth: 280,
	            					reference: 'refLiquidEndTime',
		                            width: 550,
		        					format: MOST.config.Locale.getShortDate(),
	            					bind: '{theLiquid.workEndDt}'
	                            },
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 100
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 2 0 2',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
		    						xtype: 'tbfill'
		    					},{
		    						xtype: 'button',
		    						reference : 'btnNew',
		    						text: ViewUtil.getLabel('refresh'),
		    						ui: 'create-button',
		    						iconCls: 'fa fa-refresh',
		    						listeners: {
		    							click: 'onRefreshLiquidOperation'
		    						}
		    					},{
		    						xtype: 'button',
		    						text: ViewUtil.getLabel('add'),
		    						ui: 'create-button',
		    						iconCls: 'x-fa fa-plus',
		    						listeners: {
		    							click: 'onAddLiquidOperation'
		    						}
		    					},
		    					{
		    						xtype: 'button',
		    						itemId: 'btnDelete',
		    						reference: 'ctlRhdlBtnRemove',
		    						text: ViewUtil.getLabel('remove'),
		    						ui: 'delete-button',
		    						iconCls: 'x-fa fa-minus',
		    						width: 80,
		    						listeners: {
		    							click: 'onLiquidRemove'
		    						}
		    					},
		                    	{
		    						xtype: 'button',
		    						text: ViewUtil.getLabel('update'),
		    						reference:'ctlUpdateAfterCreate',
		    						listeners: {
		    							click: 'onLiquidUpdate'
		    						},
		    						width: 80,
		    					}
		                    ]
		            	},{
		    	        	xtype: 'panel',
		    	        	layout: 'fit',
		    	        	flex: 1,
		    	        	items: [{
		    	        		xtype: 'tsb-datagrid',
		    	        		reference: me.MAIN_GRID_REF_NAME,
		    	        		usePagingToolbar : false,
		    	        		stateful : true,
		    	        		stateId : 'stateLiquidOperationGrid',
		    	        		viewConfig: {
        							stripeRows: true,
        							enableTextSelection: true,
        						},
		    	        		plugins: [
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
	    	                		cellclick: 'onCellClick'
	    	                	},
	    	        			columns: {
	    	        				defaults: {
	    	        					style : 'text-align:center',
	    	        					align : 'center'
	    	        				},
	    	        				items: GridUtil.getGridColumns('LiquidOperation'),
	    	        				
	    	        			}		
		    	        	}]
		    			}
		            ]
		        }
			]
		});
		
		me.callParent();
	}
});