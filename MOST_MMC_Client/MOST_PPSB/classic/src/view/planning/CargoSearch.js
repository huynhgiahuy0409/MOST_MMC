Ext.define('MOST.view.planning.CargoSearch', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargosearch',
	requires: [
		'MOST.view.planning.CargoSearchModel',
		'MOST.view.planning.CargoSearchController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'cargosearch',
	
	viewModel: {
		type: 'cargosearch'
	},
		
	listeners:{
		afterrender: 'onLoad'
	},

	MAIN_GRID_REF_NAME: 'refCargoSearchGrid',
	MAIN_STORE_NAME: 'cargoSearchList',
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [
    		{},{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				margin: '5 5 5 0',
				stateful : true,
				stateId : 'stateCargoSearchGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}',
	    		},
	    		listeners: {
	    			pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('CargoSearchList'),
				}
		    }],
			dockedItems: [
				{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
						type : 'hbox',
					},
					defaults: {
						margin: '1 1 1 1'
					},
                    items: [{
    						xtype: 'tbfill'
						},
                    	{
							xtype: 'button',
							itemId: 'inquiryItemId',
							reference:'refBtnRetrieve',
                        	text: ViewUtil.getLabel('retrieve'),
        					iconCls: 'x-fa fa-search',
        					cls: 'search-button', 
    						listeners: {
    							click: 'onSearch'
    						}
                        },
        		    	{
        					xtype: 'button',
        					reference:'refBtnReset',
        					text: ViewUtil.getLabel('clear'),
        					margin : '1 1 1 5',
        					iconCls: 'x-fa fa-refresh',
        					listeners: {
        						click: 'onRefesh'
        					}	
        				},
        				{
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
        				},
        				{
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
                    	},
        		    	{
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
        		},
        		{
        			xtype: 'toolbar',
					padding: '0 0 0 0',
					margin: '0 0 0 0',
    				enableOverflow: true,
    				defaults: {
    					labelAlign: 'right'
                	},
                	items: [
                		{
                			xtype: 'searchfieldset',
        					title: ViewUtil.getLabel('search'),
        					autoScroll: true,
        					collapsible:true,
        					flex: 1,
							padding: '0 10 10 10',
							margin: '0 0 0 0',
        			        layout: {
        			        	type: 'hbox',
        			        	align: 'stretch'
                            },
							defaults: {
								flex: 1
							},
                			items:[
        	                	{
        	                        xtype: 'container',
        	                        layout: {
        	                            type: 'vbox'
        	                        },
        	                        defaults: {
        	                        	labelAlign: 'right',
										labelWidth: 100,
										width: '100%'
        	                        },
        	                        items: [
        	                        	{
    										xtype: 'shipcallnofield',
    										reference: 'ctlScn',
    										flex: 1,
    										/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
    										fieldLabel: ViewUtil.getLabel('shipCallNo'),
    										bind: {
    											value: '{theSearch.scn}',
    										},
    									},
        	                        	{
        	                            	xtype:'vesselcalllistfield',
        			    	   				fieldLabel: ViewUtil.getLabel('jpvc'),
        			    	   				reference:'ctlJpvc',
    				    	   				bind: {
    				    	   					value: '{theSearch.vslCallId}'
    				    	   				}
        	                            },{
        	    		   					reference: 'ctlCategory',
        	    		   					xtype: 'combo',
        	    		   					fieldLabel: ViewUtil.getLabel('category'),
        	    		   					queryMode: 'local',
        	    		   					labelAlign: 'right',
											margin: '5 0 0 0',
        	    		   					bind: {
        	    		    	    			store: '{categoryCombo}',
        	    		    	    			value: '{theSearch.opeClassCd}'
        	    		    	    		},
        	    		   					displayField: 'scdNm',
        	    		   					valueField: 'scd',
        	    		   					forceSelection:true,
        	    		   					emptyText:'All',
        	    		   					editable: false,
        	    		   				}
        	                        ]
        	                    },
        	                	{
        	                        xtype: 'container',
        	                        layout: {
        	                            type: 'vbox',
        	                        },
        	                        defaults: {
        	                        	width: "100%",
        	                        	labelWidth: 100,
        	                        	labelAlign: 'right',
        	                        },
        	                        items: [
        	                        	{
        	                                xtype: 'combobox',
        	                                reference: 'ctlDeliveryMode',
        	                                fieldLabel: ViewUtil.getLabel('delvTpCd'),
        	        	                    bind: {
        	        	                    	store: '{deliveryModeCombo}',
        	        	                    	value: '{theSearch.delvTpCd}'
	        	                    		},
        	        						queryMode: 'local',
        	        				        displayField: 'scdNm',
        	        				        valueField: 'scd',
        	        				        editable: false
        	                            },{
        	                                xtype: 'container',
											margin: '-5 0 0 0',
        	                                layout: {
        	                                    type: 'hbox',
												align: 'stretch'
        	                                },
        	                                defaults: {
        	                                	labelWidth: 100,
        	                                	labelAlign: 'right',
												margin: '0 0 0 0',
        	                                },
        	                                items: [
        	                                	{
        	                                        xtype: 'datetimefield',
													flex: 1,
        	                                        reference: 'ctlATAFromDt',
        	                                        fieldLabel: ViewUtil.getLabel('atb'),
        	                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        	                                    },{
        	                                        xtype: 'datetimefield',
													margin: '0 0 0 5',
													flex: 0.45,
        	                                        reference: 'ctlATAToDt', 
        	                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        	                                        fieldLabel: ''
        	                                    }
        	                                ]
        	                            }
        	                        ]
        	                    },
        	                    {
        	                        xtype: 'container',
        	                        layout: {
        	                            type: 'vbox',
        	                        },
        	                        defaults: {
        	                        	labelWidth: 100,
        	                        	labelAlign: 'right',
										width: '100%',
										margin: '5 0 0 0'
        	                        },
        	                        items: [
        	                        	{
        	    		   					reference: 'ctlSn',
											margin: '0 0 0 0',
        	    		   					xtype: 'combo',
        	    		   					fieldLabel: ViewUtil.getLabel('sNNo'),
        	    		   					queryMode: 'local',
        	    		   					bind: {
        	    		    	    			store: '{snNoCombo}',
        	    		    	    			value: '{theSearch.shipgNoteNo}'
        	    		    	    		},
        	    		    	    		emptyText:'Select',
        	    		   					displayField: 'scdNm',
        	    		   					valueField: 'shipgNoteNo',
        	    		   					forceSelection:true,
        	    		   					editable: false
        	    		   				},
        	    		   				{
        	    		   					reference: 'ctlMasterBl',
        	    		   					xtype: 'combo',
        	    		   					fieldLabel: ViewUtil.getLabel('masterBLNo'),
        	    		   					queryMode: 'local',
        	    		   					bind: {
        	    		    	    			store: '{masterBlCombo}',
       	    		    	    				// value: '{theSearch.shipgNoteNo}'
        	    		    	    		},
        	    		    	    		emptyText:'Select',
        	    		   					displayField: 'scdNm',
        	    		   					valueField: 'mfDocId',
        	    		   					forceSelection:true,
        	    		   					editable: false,
        	    		   					listeners : {
        										select: 'onSelectMasterBl'
        									}
        	    		   				},
        	    		   				{
        	    		   					reference: 'ctlbl',
        	    		   					xtype: 'combo',
        	    		   					fieldLabel: ViewUtil.getLabel('bl'),
        	    		   					queryMode: 'local',
        	    		   					bind: {
        	    		    	    			store: '{blNoCombo}',
       	    		    	    				// value: '{theSearch.shipgNoteNo}'
        	    		    	    		},
        	    		    	    		emptyText:'Select',
        	    		   					displayField: 'scdNm',
        	    		   					valueField: 'blno',
        	    		   					forceSelection:true,
        	    		   					editable: false
        	    		   				}
        	                        ]
        	                    },
        	                    {
        	                        xtype: 'container',
        	                        layout: {
        	                            type: 'vbox'
        	                        },
        	                        defaults: {
        	                        	labelWidth: 100,
        	                        	labelAlign: 'right',
        	                        	margin: '5 0 0 0',
										width: '100%'
        	                        },
        	                        items: [
        	                        	{
        	    		   					reference: 'ctlGr',
        	    		   					xtype: 'textfield',
											margin: '0 0 0 0',
        	    		   					fieldLabel: ViewUtil.getLabel('gateOutGrNo'),
        	    		   					bind: '{theSearch.grNo}',
        	    		   					listeners: {
        	    	     			        	change: function(){
        	    	     							var me = this;
        	    	     							me.setValue(this.getValue().toUpperCase());
        	    	     			        	}
        	    		   					}
        	    		   				},{
        	    		   					reference: 'ctlGp',
        	    		   					xtype: 'textfield',
        	    		   					fieldLabel: ViewUtil.getLabel('gp'),
        	    		   					listeners: {
        	    	     			        	change: function(){
        	    	     							var me = this;
        	    	     							me.setValue(this.getValue().toUpperCase());
        	    	     			        	}
        	    		   					}
        	    		   				}
        	                        ]
        	                    },
        	                    {
        	                        xtype: 'container',
        	                        layout: {
        	                            type: 'vbox'
        	                        },
        	                        defaults: {
        	                        	labelWidth: 70,
        	                        	labelAlign: 'right',
        	                        	margin: '0 0 5 5',
        	                        },
        	                        items: [
        	                        	{
        	    		   					reference: 'ctlFind',
        	    		   					width: 100,
        	    		   					xtype: 'button',
        	    		   					text: ViewUtil.getLabel('find'),
        	    		   					listeners: {
        	    		   						click: 'onSearchSnByGr'
        	    		   					}
        	    		   				},{
        	    		                    xtype: 'checkbox',
        	    		                    reference: 'ctlSubItemsChk',
        	    		                    fieldLabel: ViewUtil.getLabel('subItems'),
        	    		                    bind: {
        	    		                    	value: '{theSearch.isSubItems}'
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