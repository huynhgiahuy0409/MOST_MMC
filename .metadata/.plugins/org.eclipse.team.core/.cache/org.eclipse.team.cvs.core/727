Ext.define('MOST.view.monitoring.UnclosedOperationList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-unclosedoperationlist',
	requires: [
		'MOST.view.monitoring.UnclosedOperationListModel',
		'MOST.view.monitoring.UnclosedOperationListController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'unclosedoperationlist',
	
	viewModel: {
		type: 'unclosedoperationlist'
	},
		
	listeners:{
		afterrender: 'onLoad'
	},
	width : 800,
	height: 700,
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refUnclosedGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'unclosedOperationList',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'unclosedGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',		
				validateedit: 'onValidateEdit',	
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex : 1,
					stateful : true,
					stateId : 'stateUnclosedGrid',
					plugins: [
						rowEditing, 
						'gridexporter',
						'gridfilters',
						'clipboard'
		    		],
		    		bind: {
		    			store: '{' + me.MAIN_STORE_NAME + '}'
		    		},
		    		listeners: {
		    			cellclick: 'onClick',
		    			pagingSearch: 'onSearch'
					},
					columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items: GridUtil.getGridColumns('UnclosedOperationList')
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
							reference:'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button', 
							listeners: {
								click: 'onSearch'
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
					defaults: {
						labelAlign: 'right'
	            	},
	            	items: [
	            		{
	            			xtype: 'fieldset',
	    					title: ViewUtil.getLabel('search'),
	    					autoScroll: true,
	    					collapsible:true,
	    					flex: 1,
	    			        layout: {
	    			        	type: 'hbox',
	    			        	align: 'stretch'
	                        },
	                        items: [
	                        	{
	                                xtype: 'searchfieldset',
	                                title: ViewUtil.getLabel('search'),
	                                margin: '5 5 5 0',
	                                defaults: {
	                                    margin: '5 5 0 5',
	                                    labelAlign: 'right',
	                                    labelWidth: 60
	                                },
	                                layout: {
	                                    type: 'vbox',
	                                    align:'strecth'        
	                                },
	                                height : 110, 
	                                items: [
	                                	{
	                                        xtype:'vesselcalllistfield',
	                                        reference:'ctlJpvc',
	                                        width: 220,
	        				    	   		fieldLabel: ViewUtil.getLabel('jpvc'),
	        				    	   		bind: {
	        				    	   			value: '{theSearch.vslCallId}'
	        				    	   		}
	        				    	   	},{
	                                        xtype: 'container',
	                                        defaults: {
	                                            labelAlign: 'right',
	                                            labelWidth: 60,
	                                            margin: '0 5 0 0',
                                            },
	                                        layout: {
                                                type: 'hbox'
                                            },
	                                        items: [
	                                            {
	                                            	xtype: 'datefield',
	        										reference: 'ctlFromATB',
	        										width: 180,
	        										fieldLabel: ViewUtil.getLabel('unclosedATB'),
	        										format: MOST.config.Locale.getShortDate(),
	        										editable: false,
	        										listeners: {
	        											change: 'onDateChange'
	        										},
	        									},{
	        										xtype: 'datefield',
	        										reference: 'ctlToATB',
	        										width:120,
	        										format: MOST.config.Locale.getShortDate(),
	        										editable: false,
	        										listeners: {
	        											change: 'onDateChange'
	        										},
	        									}
	                                        ]
	                                    }
	                                ]
	                        	},{
	                                xtype: 'fieldset',
	                                title: ViewUtil.getLabel('vslInfo'),
	                                margin : '5 5 5 0',
	                                defaults: {
	                                    labelAlign: 'right',
	                                    labelWidth: 80
	                                },
	                                layout: {
	                                    type: 'hbox',
	                                    align: 'stretch'
	                                },
	                                flex : 1,
	                                items: [
	                                    {
	                                        xtype: 'container',
	                                        defaults: {
	                                            margin: '5 5 0 5',
	                                            labelAlign: 'right',
	                                            labelWidth: 100
	                                        },
	                                        layout: {
	                                            type: 'vbox',
	                                            align: 'stretch'
	                                        },
	                                        items: [
	                                        	{
	                                            	xtype: 'textfield',
	                    	                    	fieldLabel: ViewUtil.getLabel('unclosedVesselCode'),
	                    	                    	readOnly: true,
	                    	                    	bind: '{theVsl.vslCd}'
	                                            },{
	                                            	xtype: 'textfield',
	                    	                    	fieldLabel: ViewUtil.getLabel('unclosedVesselName'),
	                    	                    	readOnly: true,
	                    	                    	bind: '{theVsl.vslNm}'
	                                            },{
	                                            	xtype: 'textfield',
	                    	                    	fieldLabel: ViewUtil.getLabel('unclosedVoyage'),
	                    	                    	readOnly: true,
	                    	                    	bind: '{theVsl.voyage}'
	                                            }
	                                        ]
	                                    },{
	                                        xtype: 'container',
	                                        defaults: {
	                                            margin: '5 5 0 5',
	                                            labelAlign: 'right',
	                                            labelWidth: 100
	                                        },
	                                        layout: {
	                                            type: 'vbox',
	                                            align: 'stretch'
	                                        },
	                                        items: [
	                                        	{
	                                            	xtype: 'textfield',
	                    	                    	fieldLabel: ViewUtil.getLabel('unclosedSa'),
	                    	                    	readOnly: true,
	        	            	                    bind: '{theVsl.arrvSaId}'
	                                            },{
	                    	                    	xtype:'datetimefield',
	                    	                    	fieldLabel: ViewUtil.getLabel('unclosedEta'),
	                            					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                    	                    	readOnly: true,
	        	            	                    bind: '{theVsl.eta}'
	                                            },{
	                                            	xtype:'datetimefield',
	                    	                    	fieldLabel: ViewUtil.getLabel('unclosedEtd'),
	                    	                    	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                    	                    	readOnly: true,
	        	            	                    bind: '{theVsl.etd}'
	                                            }
	                                        ]
	                                    },{
	                                        xtype: 'container',
	                                        defaults: {
	                                            margin: '5 5 0 5',
	                                            labelAlign: 'right',
	                                            labelWidth: 100
	                                        },
	                                        layout: {
	                                            type: 'vbox',
	                                            align: 'stretch'
	                                        },
	                                        items: [
	                                        	{
	                                            	xtype: 'textfield',
	                    	                    	fieldLabel: ViewUtil.getLabel('unclosedBerthingloc'),
	                    	                    	readOnly: true,
	        	            	                    bind: '{theVsl.berthLoc}'
	                                            },{
	                                            	xtype: 'textfield',
	                    	                    	fieldLabel: ViewUtil.getLabel('unclosedStorageloc'),
	                    	                    	readOnly: true
	                                            },{
	                                            	xtype: 'container'
	                                            }
	                                        ]
	                                    }
	                                ]
	                        	}
	                        ]
	            		}
	        		]
	            },{
	            	xtype: 'container',
	            	style: {
	            		"background-color":"white" 
	            	},
	            	items:[
	            		{
	            			xtype: 'fieldset',
	            			margin: '5 6 5 6',
	            			defaults: {
	            				labelAlign: 'right',
	            				labelWidth: 80,
	            				margin: '5 0 2 0'
	            			},
	            			layout: {
	            				type: 'hbox',
	            				align: 'stretch'
							},
							flex : 1,
							items: [
								{
									xtype: 'datefield',
									reference: 'ctlFromATU',
									width: 250,
									fieldLabel: ViewUtil.getLabel('atu'),
									format: MOST.config.Locale.getShortDate(),
									editable: false,
									listeners: {
										change: 'onDateChange'
									}
		 						},{
		 							xtype: 'label',
		 							text: '~',
		 							margin: '7 20 0 20'
		 						},{
									xtype: 'datefield',
									reference: 'ctlToATU',
									width: 170,
									format: MOST.config.Locale.getShortDate(),
									editable: false,
									listeners: {
										change: 'onDateChange'
									}
		 						},{
	                                xtype: 'combobox',
	                                reference: 'ctlStatus',
	                                fieldLabel: ViewUtil.getLabel('status'),
	                                width: 250,
	                                margin: '5 0 2 50',
	                                bind: {
	        	                    	store: '{statusCombo}',
	        	                    	value: '{theSearch.statCd}'
    	                    		},
    	                    		emptyText: 'Select',
	        						queryMode: 'local',
	        				        displayField: 'scdNm',
	        				        valueField: 'scd',
	        				        editable: false
	                            },{
	                                xtype: 'combobox',
	                                reference: 'ctlWarehouse',
	                                fieldLabel: ViewUtil.getLabel('Wh'),
	                                width: 250,
	                                margin: '5 0 2 50',
	        	                    bind: {
	        	                    	store: '{whLocCombo}',
	        	                    	value: '{theSearch.whLoc}'
    	                    		},
    	                    		emptyText: 'ALL', 
	        						queryMode: 'local',
	        				        displayField: 'scdNm',
	        				        valueField: 'scd',
	        				        editable: false
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

