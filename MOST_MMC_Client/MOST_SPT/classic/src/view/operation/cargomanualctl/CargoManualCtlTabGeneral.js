Ext.define('MOST.view.operation.cargomanualctl.CargoManualCtlTabGeneral', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargomanualctltabgeneral',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
		'Ext.chart.theme.Muted',
		'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Bar',
        'Ext.chart.series.Line',
	],
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'fieldset',
		            margin: '0 5 5 5',
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            collapsible:true,
		            padding : '2 10 10 10',
		            items: [
		                {
		                    xtype: 'container',
		                    flex: 1,
							margin: '0 0 5 0',
		                    defaults: {
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch', 
		                    },
		                    items: [
		                        {
		                            xtype: 'combobox',
		                            flex: 1,
		                            readOnly: true,
		                            fieldLabel: ViewUtil.getLabel('category'),
		                            queryMode: 'local',
		    	   					bind: {
		    	    	    			store: '{cargoManualCtlForCategoryCombo}',
		    	    	    			value:'{theGeneral.catgCd}'
		    	    	    		},
		    	   					displayField: 'scdNm',
		    	   					valueField: 'scd'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('cbr'),
		                            editable: false,
		                            bind:'{theGeneral.cbrNo}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('shpCng'),
		                            editable: false,
		                            bind:'{theGeneral.shpCng}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('pol'),
		                            editable: false,
		                            bind:'{theGeneral.pol}'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
							margin: '0 0 5 0',
		                    flex: 1,
		                    defaults: {
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'combobox',
		                            flex: 1,
		                            readOnly: true,
		                            fieldLabel: ViewUtil.getLabel('delivery'),
		                            queryMode: 'local',
		    	   					bind: {
		    	    	    			store: '{cargoManualCtlForDeliveryCombo}',
		    	    	    			value:'{theGeneral.delvTpCd}'
		    	    	    		},
		    	   					displayField: 'scdNm',
		    	   					valueField: 'scd'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('do'),
		                            editable: false,
		                            bind:'{theGeneral.delvOrder}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('sAgent'),
		                            editable: false,
		                            bind:'{theGeneral.shipgAgnt}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('pod'),
		                            editable: false,
		                            bind:'{theGeneral.pod}'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'combobox',
		                            flex: 1,
		                            readOnly: true,
		                            fieldLabel: ViewUtil.getLabel('modeofOPR'),
		    	   					bind: {
		    	    	    			store: '{cargoManualCtlForModeOfOprCombo}',
		    	    	    			value:'{theGeneral.tsptTpCd}'
		    	    	    		},
		    	   					displayField: 'scdNm',
		    	   					valueField: 'scd'
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 1
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('fAgent'),
		                            editable: false,
		                            bind:'{theGeneral.fwrAgnt}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('fnd'),
		                            editable: false,
		                            bind:'{theGeneral.fnd}'
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            margin: '0 5 5 5',
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            collapsible:true,
		            padding : '2 10 10 10',
		            items: [
		                {
		                    xtype: 'container',
							margin: '0 0 5 0',
		                    flex: 1,
		                    defaults: {
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'combobox',
		                            flex: 1,
		                            readOnly: true,
		                            fieldLabel: ViewUtil.getLabel('cargotype'),
		    	   					bind: {
		    	    	    			store: '{cargoManualCtlForCargoTypeCombo}',
		    	    	    			value:'{theGeneral.cgTpCd}'
		    	    	    		},
		    	   					displayField: 'scdNm',
		    	   					valueField: 'scd'
		                        },
		                        {
		                            xtype: 'combobox',
		                            flex: 1,
		                            readOnly: true,
		                            fieldLabel: ViewUtil.getLabel('pkgType'),
		    	   					bind: {
		    	    	    			store: '{cargoManualCtlForPackageTypeCombo}',
		    	    	    			value:'{theGeneral.pkgTpCd}'
		    	    	    		},
		    	   					displayField: 'scdNm',
		    	   					valueField: 'scd'
		                        },
								//s-OPR-016: Conveyor Mode Operation
		                        {
									xtype: 'combobox',
									reference: 'refConveyorNo',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('cmc_conveyor_no'),
									queryMode: 'local',
									bind: {
										store: '{conveyorNoList}',
										value: '{theGeneral.conveyorNo}',
									},
									listeners: {
										select: 'onSelectConveyorNo',
									},
									displayField: 'scdNm',
									valueField: 'scd',
									emptyText: 'Select',
									forceSelection: true,
									editable: true,
									anyMatch: true,
									disabled: true
								},
								{
									xtype: 'textfield',
									reference: 'refLoadingRate',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('cmc_loading_rate'),
									bind: '{theGeneral.loadingRate}',
									readOnly: true,
									disabled: true
								},
								//s-OPR-016: Conveyor Mode Operation
		                    ]
		                },
		                {
		                    xtype: 'container',
							margin: '0 0 5 0',
		                    flex: 1,
		                    defaults: {
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('commodity'),
		                            readOnly: true,
		                            bind:'{theGeneral.cargo}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('mAndN'),
		                            bind:'{theGeneral.markNo}',
		                            readOnly: true
		                        },
								//s-OPR-016: Conveyor Mode Operation
		                        {
		                            xtype: 'datetimefield',
		                            reference: 'refStartTime',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('startTime'),
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									bind: {
										value: '{theGeneral.startTime}'
									},
									listeners: {
										change: 'calculateETC'
									},
									editable: false,
									achor: '100%',
									disabled: true
		                        },
								//e-OPR-016: Conveyor Mode Operation
		                        {
		                            xtype: 'container',
		                            flex: 1
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container', 
		                    flex: 1,
		                    defaults: {
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            flex: 1,
		                            layout: {
		                                type: 'hbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'container',
		                                    width: 105
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 1,
		                                    fieldLabel: '',
		                                    editable: false,
				                            bind:'{theGeneral.cmdtCd}'
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 1,
		                            layout: {
		                                type: 'hbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'textfield',
		                                    flex: 1,
		                                    fieldLabel: ViewUtil.getLabel('dgUnno'),
		                                    labelAlign: 'right',
		                                    labelWidth: 100,
		                                    editable: false,
				                            bind:'{theGeneral.imdg}'
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 0.6,
		                                    margin: '0 0 0 5',
		                                    fieldLabel: '',
		                                    editable: false,
				                            bind:'{theGeneral.unno}'
		                                }
		                            ]
		                        },
								//s-OPR-016: Conveyor Mode Operation
								{
		                            xtype: 'datetimefield',
		                            reference: 'refETC',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('cmc_etc'),
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									bind: {
										value: '{theGeneral.etc}'
									},
									editable: false,
									readOnly: true,
									achor: '100%',
									disabled: true
		                        },
								//e-OPR-016: Conveyor Mode Operation
								{
		                            xtype: 'container',
		                            flex: 1
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            margin: '0 5 0 5',
					padding: '10 5 10 5',
		            flex: 1,
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                defaults: {
		                    labelAlign: 'right',
		                    labelWidth: 100,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    }
		                }
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
                            xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                        	xtype: 'tsb-datagrid',
		        					reference: 'refCargoManualCtlGeneralTabTotalGrid',
		        					gridName:'General Total',
		        					usePagingToolbar : false,
		        					flex : 1,
		        					stateful : true,
		        					stateId : 'stateCargoManualCtlGeneralTabTotalGrid',
		        					plugins: [
		        						'gridexporter',
		        						'gridfilters',
		        						'clipboard'
		        		    		],
		        		    		bind: {
		        		    			store: '{cargoManualCtlGeneralTabTotal}'
		        		    		},
		        		    		selModel: {
		        						type: 'spreadsheet',
		        						cellSelect: false
		        					},
		        					columns: {
		        		            	defaults: {
		        		            		style : 'text-align:center',
		        		            		align : 'center'
		        		            	},
		        		            	items: GridUtil.getGridColumns('GeneralTotalList')
		        					}
		        				}
		                    ]
		                },
		                {

                            xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                    	{
		                        	xtype: 'tsb-datagrid',
		        					reference: 'refCargoManualCtlGeneralTabRemainGrid',
		        					gridName:'General Remain',
		        					usePagingToolbar : false,
		        					flex : 1,
		        					stateful : true,
		        					stateId : 'stateCargoManualCtlGeneralTabRemainGrid',
		        					plugins: [
		        						'gridexporter',
		        						'gridfilters',
		        						'clipboard'
		        		    		],
		        		    		bind: {
		        		    			store: '{cargoManualCtlGeneralTabRemain}'
		        		    		},
		        		    		selModel: {
		        						type: 'spreadsheet',
		        						cellSelect: false
		        					},
		        					columns: {
		        		            	defaults: {
		        		            		style : 'text-align:center',
		        		            		align : 'center'
		        		            	},
		        		            	items: GridUtil.getGridColumns('GeneralOngoingRemainList')
		        					}
		        				}
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            flex: 1,
		            margin: '5 5 0 5',
		            hidden: true,
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            padding : '3 3 3 3',
		            items: [
		                {
		                    xtype: 'container',
		                    flex: 1.3,
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                    	{
		               		        xtype: 'cartesian',
		               		        reference: 'chart',
		               		        width: '100%',
		               		        height: '100%',
		               		        theme: 'Muted',
		               		        flipXY: true,
			               		    insetPadding: {
			               		    	top: 30,
			               		    	bottom: 10,
			               		    	left: 20,
			               		    	right: 40
			         	   	        },
		               		        interactions: ['itemhighlight'],
		               		        animation: {
		               		            duration: 200
		               		        },
		            		        bind: {
		            		        	store: '{cargoManualCtlGeneralTabChart}'
		            		        },
		               		        legend: {
		            		            type: 'sprite',
		            		            docked: 'right'
		            		        },
		               		        axes: [{
		               		            type: 'numeric',
		               		            position: 'bottom',
		               		            fields: ['sumQty', 'sumM3', 'sumWgt'],
		               		            grid: true,
		               		            renderer: 'onGeneralTabAxisLabelRender'
		               		        }, {
		               		            type: 'category',
		               		            position: 'left',
		               		            fields: 'type',
		               		            grid: true,
		               		            renderer: 'onGeneralTabBottomLabelRender'
		               		        }],
		               		        series: {
		               		            type: 'bar',
		               		            stacked: false,
		               		            title: ['Qty', 'M3', 'MT'],
		               		            xField: 'type',
		               		            yField: ['sumQty', 'sumM3', 'sumWgt'], 
		               		            label: {
		               		                field: ['sumQty', 'sumM3', 'sumWgt'],
		               		                display: 'insideEnd',
		               		                renderer: 'onGeneralTabSeriesLabelRender'
		               		            },
		               		            highlight: true,
		               		            style: {
		               		                inGroupGapWidth: 0
		               		            }
		               		        },
		               		        sprites: {
		               		            type: 'text',
		               		            text: 'Summary',
		               		            fontSize: 15,
		               		            width: 100,
		               		            height: 30,
		               		            x: 40,
		               		            y: 20
		               		        }
		                    	}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                    	{
		                    		xtype: 'tsb-datagrid',
		            				reference: 'refCargoManualCtlGenerlTabGrid',
		            				flex : 1,
		            				stateful : true,
		            				stateId : 'stateCargoManualCtlGenerlTabGrid',
		            				usePagingToolbar : false,
		            				gridName:'General Chart',
		            				plugins: [
		            					'gridexporter',
		            					'gridfilters',
		            					'clipboard'
		            	    		],
		            	    		bind: {
		            	    			store: '{cargoManualCtlGeneralTabChart}'
		            	    		},
		            	    		selModel: {
		            					type: 'spreadsheet',
		            					cellSelect: false
		            				},
		            				columns: {
		            	            	defaults: {
		            	            		style : 'text-align:center',
		            	            		align : 'center'
		            	            	},
		            	            	items: GridUtil.getGridColumns('CargoManualctlTabGeneral')
		            				}
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