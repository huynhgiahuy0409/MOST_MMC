Ext.define('MOST.view.planning.RoRoYardPlan', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-roroyardplan',
	
	requires: [
		'MOST.view.planning.RoRoYardPlanModel',
		'MOST.view.planning.RoRoYardPlanController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'roroyardplan',
	
	viewModel: {
		type: 'roroyardplan'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refRoRoYardPlanCargoGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'roroYardPlanCargoItems',            // Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},
	
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
					height: 200,
					usePagingToolbar : false,
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
						cellclick: 'onCargoGridItemClick',
						pagingSearch:'onSearch'
					},
					columns: {
						defaults: {
		            		style : 'text-align:center',
		            		align: 'center'
		            	},
		            	items: GridUtil.getGridColumns('RoRoYardPlanCargoItems')
					}
				},
				{
					xtype : 'container',
					style: { "background-color":"white" },
					flex: 1,
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					items : [
						{
							xtype: 'fieldset',
							flex: 1,
					    	title: ViewUtil.getLabel('unitList'),
					    	margin: '5 20 0 0',
					    	layout: {
					    		type: 'vbox',
					            align: 'stretch'
				    		},
					    	items: [
					    		{
									xtype: 'tsb-datagrid',
									reference: 'refRoroYardPlanUnitItemsGrid',
									flex: 1,
									usePagingToolbar : false,
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{roroYardPlanUnitItems}'
									},
									selModel: {
										type: 'spreadsheet',
										cellSelect: false
									},
									listeners : {
									},
									columns: {
										defaults: {
						            		style : 'text-align:center',
						            		align: 'center'
						            	},
						            	items: GridUtil.getGridColumns('RoRoYardPlanUnitItems')
									}
								}
					    	]
						},
						{
							xtype: 'fieldset',
							flex: 1,
					    	title: ViewUtil.getLabel('planSummary'),
					    	margin: '5 20 0 0',
					    	layout: {
					    		type: 'vbox',
					            align: 'stretch'
				    		},
					    	items: [
					    		{
							    	xtype: 'container',
							    	margin: '5 5 5 5',
						    		layout: {
						    			type: 'hbox'
						    		},
						    		items: [
							    		{
					                        xtype: 'numberfield',
					                        reference: 'txtPlannedQty',
					                        width: 230,
					                        fieldLabel: ViewUtil.getLabel('qty'),
					                        labelAlign: 'right',
					                        labelWidth: 40,
					                        minValue : 0,
						                    maxValue:9999999999,
					                        allowDecimals: false,
											allowNegative: false,
					                    },
					                    {
									    	xtype: 'container',
								    		layout: {
								    			type: 'vbox',
								    			align: 'stretch'
								    		},
								    		items: [
								    			{
								    				xtype: 'container',
										    		layout: {
										    			type: 'hbox',
										    			align: 'stretch'
										    		},
										    		items: [
										    			{
								                            xtype: 'label',
								                            style: {
								                                'text-align': 'right'
								                            },
								                            width: 100,
								                            text: ViewUtil.getLabel('WHLocId')
								                        },
								                        {
								                            xtype: 'textfield',
								                            reference: 'txtLocId',
								                            margin: '0 5 0 5',
										                    readOnly:true,
										                    allowBlank: false,
										                    listeners: {
										                    	change: function(){
																	var me = this;
																	me.setValue(this.getValue().toUpperCase());
																}
										                    }
								                        },
								                        {
								                            xtype: 'button',
								                            text: ViewUtil.getLabel('whrSetLoc'),
								                            listeners: {
								                            	click: {
																	fn : 'onWarehouseAllocation',
																	args : ['ctlConfirmHandlingInLocId']
																}
															}
								                        }
										    		]
								    			},
								    			{
								    				xtype: 'container',
										    		layout: {
										    			type: 'hbox',
										    			align: 'stretch',
										    			pack: 'end'
										    		},
										    		items: [
										    			{
								                            xtype: 'button',
								                            margin: '5 1 5 1',
								                            text: ViewUtil.getLabel('clear'),
								                            listeners: {
								                            	click: 'onClear_clickHandler'
															}
								                        },
								                        {
						                                    xtype: 'button',
						                                    margin: '5 1 5 1',
						                                    text: ViewUtil.getLabel('add'),
						                                    cls: 'search-button',
						                                    iconCls: 'x-fa fa-plus',
						                                    listeners: {
						                                    	click: 'onAdd_clickHandler'
															}              
						                                },
						                                {
						    	                            xtype: 'button',
						    	                            margin: '5 1 5 1',
						    	                            text: ViewUtil.getLabel('remove'),
						    	                            ui: 'delete-button',
						    	                            iconCls: 'x-fa fa-minus',
						                					listeners: {
						                						click: 'onRemove_clickHandler'
						                					}
						    	                        }
										    		]
								    			}
								    		]
					                    }
				                    ]
					    		},
					    		{
									xtype: 'tsb-datagrid',
									reference: 'refRoroYardPlanItemsGrid',
									flex: 1,
									usePagingToolbar : false,
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{roroYardPlannedItems}'
									},
									selModel: {
										type: 'spreadsheet',
										cellSelect: false
									},
									columns: {
										defaults: {
						            		style : 'text-align:center',
						            		align: 'center'
						            	},
						            	items: GridUtil.getGridColumns('RoRoYardPlannedItems')
									}
								}
					    	]
						}
					]
				}
			],
			
			dockedItems:[
				{
					xtype : 'container',
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
				},
				{//Search Condition and Vessel information:
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'searchfieldset',
							autoScroll: true,
							collapsible:true,
							margin: '5 5 5 5',
							flex:1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults:{
								margin: '0 0 5 0'
							},
							items:[
								{// Left: Search Condition
									xtype: 'searchfieldset',
									title: ViewUtil.getLabel('search'),
									layout: {
										type: 'vbox'
									},
									items: [
										{
											xtype : 'vesselcalllistfield',
											margin : '0 0 0 5',
											width : 230,
											reference : 'ctlJpvc',
											fieldLabel : ViewUtil.getLabel('jpvc'),
											labelAlign : 'right',
											labelWidth : 50,
											emptyText : ViewUtil.getLabel('jpvc'),
											bind : {
												value : '{theSearch.vslCallId}'
											}
										},
										{
											xtype : 'combo',
											margin : '5 0 0 5',
											width : 230,
											fieldLabel : ViewUtil.getLabel('bLNo'),
											reference : 'ctlBlNo',
											labelAlign : 'right',
											labelWidth : 50,
											emptyText : ViewUtil.getLabel('bLNo'),
											bind: {
				            	    			store: '{blCombo}',
												value: '{theSearch.blNo}'
				            	    		},
				            	    		listeners: {
		    	       							select: 'onSelectSNBL'
		    	       						},
				            	    		displayField: 'scdNm',
				           					valueField: 'blNo',
				           					queryMode: 'local',
				           					value : ''
										},
										{
											xtype : 'combo',
											margin : '5 0 0 5',
											width : 230,
											fieldLabel : ViewUtil.getLabel('SNLSNNo'),
											reference : 'ctlSNNo',
											labelAlign : 'right',
											labelWidth : 50,
											emptyText : ViewUtil.getLabel('SNLSNNo'),
											bind: {
				            	    			store: '{shippingNoteCombo}',
												value: '{theSearch.shipgNoteNo}'
				            	    		},
				            	    		listeners: {
		    	       							select: 'onSelectSNBL'
		    	       						},
				            	    		displayField: 'scdNm',
				           					valueField: 'shipgNoteNo',
				           					queryMode: 'local',
				           					value : ''
										},
										{
											xtype : 'combo',
											margin : '5 0 0 5',
											width : 230,
											fieldLabel : ViewUtil.getLabel('unitNo'),
											reference : 'ctlUnitNo',
											labelAlign : 'right',
											labelWidth : 50,
											emptyText : ViewUtil.getLabel('unitNo'),
											bind: {
				            	    			store: '{unitNoCombo}',
												value: '{theSearch.unitNo}'
				            	    		},
				            	    		displayField: 'scdNm',
				           					valueField: 'unitNo',
				           					queryMode: 'local'
										}
									]
								},
								{//Right: VesselInfo:
									xtype: 'searchfieldset',
									title: ViewUtil.getLabel('vslInfo'),
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									flex: 1,
									margin: '0 0 5 5',
									items: [
										{
											xtype : 'container',
											defaults : {
												margin : '5 5 0 0',
												labelAlign : 'right',
												width : 230,
												labelWidth : 80
											},
											layout : {
												type : 'vbox'
											},
											items : [
												{
													xtype : 'textfield',
													margin : '0 5 0 0',
													fieldLabel : ViewUtil.getLabel('vesselCode'),
													bind : '{theVslInfo.vslCd}',
													readOnly : true
												},
												{
													xtype : 'textfield',
													fieldLabel : ViewUtil.getLabel('vesselType'),
													bind : '{theVslInfo.vslTp}',
													readOnly : true
												},
												{
													xtype : 'textfield',
													fieldLabel : ViewUtil.getLabel('voyage'),
													bind : '{theVslInfo.voyage}',
													readOnly : true
												},
												{
													xtype : 'textfield',
													fieldLabel : ViewUtil.getLabel('SNLDSA'),
													bind : '{theVslInfo.depSaId}',
													readOnly : true
												}
											]
										},
										{
											xtype : 'container',
											defaults : {
												margin : '0 5 5 0',
												labelAlign : 'right',
												width : 180,
												labelWidth : 40
											},
											layout : {
												type : 'vbox'
											},
											items : [
												{
													xtype : 'textfield',
													fieldLabel : ViewUtil.getLabel('SNLASA'),
													bind : '{theVslInfo.arrvSaId}',
													readOnly : true
												},
												{
													xtype : 'datefield',
													fieldLabel : ViewUtil.getLabel('SNLETA'),
													bind : '{theVslInfo.eta}',
													readOnly : true,
													format : MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
												},
												{
													xtype : 'datefield',
													fieldLabel : ViewUtil.getLabel('etd'),
													bind : '{theVslInfo.etd}',
													readOnly : true,
													format : MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
												}
											]
										},
										{
											xtype : 'container',
											defaults : {
												margin : '0 5 5 0',
												labelAlign : 'right',
												width : 230,
												labelWidth : 100
											},
											layout : {
												type : 'vbox'
											},
											items : [
												{
													xtype : 'textfield',
													fieldLabel : ViewUtil.getLabel('berthingLoc'),
													bind : '{theVslInfo.berthLoc}',
													readOnly : true
												},
												{
													xtype : 'textfield',
													fieldLabel : ViewUtil.getLabel('storageLoc'),
													readOnly : true
												}
											]
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