Ext.define('MOST.view.dashboard.CargoFlowDashboard', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargoflowdashboard',
	requires: [
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	UNIT_COMBO_STORE: 'unitCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	controller: 'cargoflowdashboard',
	
	viewModel: {
		type: 'cargoflowdashboard'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},
	autoScroll: true,
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{
					xtype: 'container',
					flex: 1,
					autoScroll: true,
					layout: {
			    		type: 'vbox',
			            align: 'stretch'
		    		},
		    		items:[
						{
							xtype: 'fieldset',
			    			title: '<span style="color:red;font-weight:bold;font-size:15px;">' + ViewUtil.getLabel('summary') + '</span>',
			    			margin: '5 5 5 5',
			    			autoScroll: true,
			    			collapsible:true,
					    	layout: {
					    		type: 'hbox',
					            align: 'stretch'
				    		},
			                items:[{
			                	xtype: 'container',
			                	flex: 1,
			                	autoScroll: true,
			    		    	layout: {
			    		    		type: 'hbox',
			    		            align: 'stretch'
			    	    		},
			    		    	items: [{
							            xtype: 'container',
							            reference:'refDischargeCmmd',
							            defaults: {
							                //margin: '2 0 0 2'
							            },
			    				    	layout: {
			    				    		type: 'vbox',
			    				            align: 'stretch'
			    			    		},
							            items: [
							            	{
						    					xtype: 'panel',
						                    }
							            ]
			    		    		},{
			    		    			xtype: 'container',
			    		    			margin: '0 0 0 50',
			 				            reference:'refLoadingCmmd',
			     				    	layout: {
			     				    		type: 'vbox',
			     				            align: 'stretch'
			     			    		},
			 				            items: [
			 				            	{
						    					xtype: 'panel',
						                    }
			 				            ]
			    		    			
			    		    		}
			    		    	]
			                }],
						},
						{
							xtype: 'fieldset',
			    			title: '<span style="color:red;font-weight:bold;font-size:15px;">' + ViewUtil.getLabel('discharging') + '</span>',
			    			margin: '0 5 5 5',
			    			autoScroll: true,
			    			collapsible:true,
					    	layout: {
					    		type: 'vbox',
					            //align: 'stretch'
				    		},
				    		//height: 460,
				    		flex: 1,
			                items:[
			                	//Row-1: Vessel Discharged Area
			                	{
				                	xtype: 'container',
				                	autoScroll: true,
				    		    	layout: {
				    		    		type: 'hbox',
				    		            align: 'stretch'
				    	    		},
				    		    	items: [
				    		    		//Row-1-1: Vessel Stern Image
				    		    		{
				    			            xtype: 'container',
				    			            height: 182,
								            width: 156,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            layout: 'auto',
				    			            items: [
				    			            	{
				    		                        xtype: 'image',
				    		                        src:'resources/images/dashboard/stem.png',
				    		                        region:'center'
				    		                    }
				    			            ]
				    		    		},
				    		    		
					                    //Row-1-2: Vessel Hatch panel
					                    {
				    		    			xtype: 'container',
				    		    			flex: 1,
				 				            reference:'refcargoflowdishatchlayout',
				     				    	layout: {
				     				    		type: 'hbox',
				     				            align: 'stretch'
				     			    		},
				 				            items: [
				 				            	{
				 				            		xtype: 'panel'
				 			                    }
				 				            ]
				    		    			
				    		    		},
				    		    		//Row-1-3: Vessel Stem Image
				    		    		{
				    			            xtype: 'container',
				    			            height: 182,
								            width: 173,
				    			            defaults: {
				    			                margin: '5 5 5 5'
				    			            },
				    			            layout: 'auto',
				    			            items: [
				    			            	{
				    		                        xtype: 'image',
				    		                        src:'resources/images/dashboard/stern.png',
				    		                        region:'center'
				    		                    }
				    			            ]
				    		    		}
				    		    	]
			                	},
			                	
			                	//Row-2: WH Discharged Area
			                	{
				                	xtype: 'container',
				                	hidden: true,
				                	margin: '25 0 0 0',
				    		    	layout: {
				    		    		type: 'hbox',
				    		            align: 'stretch'
				    	    		},
				    		    	items: [
				    		    		//Row-2-1
				    		    		{
				    			            xtype: 'container',
				    			            width: 173,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            //layout: 'auto',
				    			            items: [
				    			            	{
							    					xtype: 'label',
							                        margin: '50 0 0 0',
							                        reference:'refDisWarehouse',
							                        style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
							                        //text: ViewUtil.getLabel('warehouse')
					    			    		}
				    			            ]
				    		    		},
				    		    		
					                    //Row-2-2: Hatch panel
					                    {
				    		    			xtype: 'container',
				 				            reference:'refWHDischargedHatchLayout',
				     				    	layout: {
				     				    		type: 'hbox',
				     				            align: 'stretch'
				     			    		},
				 				            items: [
				 				            	{
				 				            		xtype: 'panel'
				 			                    }
				 				            ]
				    		    			
				    		    		},
				    		    		//Row-2-3
				    		    		{
				    			            xtype: 'container',
				    			            width: 156,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            //layout: 'auto',
				    			            items: [
				    			            	
				    			            ]
				    		    		}
				    		    	]
			                	},
			                	
			                	//Row-3: Gate Discharged Area
			                	{
				                	xtype: 'container',
				                	hidden: true,
				                	margin: '-25 0 0 0',
				    		    	layout: {
				    		    		type: 'hbox',
				    		            align: 'stretch'
				    	    		},
				    		    	items: [
				    		    		//Row-3-1
				    		    		{
				    			            xtype: 'container',
				    			            width: 173,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            //layout: 'auto',
				    			            items: [
				    			            	{
							    					xtype: 'label',
							    					margin: '50 0 0 0',
							                        reference:'refDisGate',
							                        style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
							                        //text: ViewUtil.getLabel('gateNm')
					    			    		}
				    			            ]
				    		    		},
				    		    		
					                    //Row-3-2: Hatch panel
					                    {
				    		    			xtype: 'container',
				 				            reference:'refGateDischargedHatchLayout',
				     				    	layout: {
				     				    		type: 'hbox',
				     				            align: 'stretch'
				     			    		},
				 				            items: [
				 				            	{
				 				            		xtype: 'panel'
				 			                    }
				 				            ]
				    		    			
				    		    		},
				    		    		//Row-3-3
				    		    		{
				    			            xtype: 'container',
				    			            width: 156,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            //layout: 'auto',
				    			            items: [
				    			            	
				    			            ]
				    		    		}
				    		    	]
			                	},
			                	
			                ]    		
						},
						//LOADING
						{
							xtype: 'fieldset',
			    			title: '<span style="color:red;font-weight:bold;font-size:15px;">' + ViewUtil.getLabel('loading') + '</span>',
			    			margin: '0 5 5 5',
			    			autoScroll: true,
			    			collapsible:true,
					    	layout: {
					    		type: 'vbox',
					            //align: 'stretch'
				    		},
				    		//height: 460,
				    		flex: 1,
			                items:[
			                	//Row-1: Vessel Loading Area
			                	{
				                	xtype: 'container',
				                	autoScroll: true,
				    		    	layout: {
				    		    		type: 'hbox',
				    		            align: 'stretch'
				    	    		},
				    		    	items: [
				    		    		//Row-1-1: Vessel Stern Image
				    		    		{
				    			            xtype: 'container',
				    			            height: 182,
								            width: 156,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            layout: 'auto',
				    			            items: [
				    			            	{
				    		                        xtype: 'image',
				    		                        src:'resources/images/dashboard/stem.png',
				    		                        region:'center'
				    		                    }
				    			            ]
				    		    		},
				    		    		
					                    //Row-1-2: Vessel Hatch panel
				    		    		{
				    		    			xtype: 'container',
				    		    			flex: 1,
				 				            reference:'refcargoflowloadhatchlayout',
				     				    	layout: {
				     				    		type: 'hbox',
				     				            align: 'stretch'
				     			    		},
				 				            items: [
				 				            	{
				 				            		xtype: 'panel'
				 			                    }
				 				            ]
				    		    			
				    		    		},
				    		    		//Row-1-3: Vessel Stem Image
				    		    		{
				    			            xtype: 'container',
				    			            height: 182,
								            width: 173,
				    			            defaults: {
				    			                margin: '5 5 5 5'
				    			            },
				    			            layout: 'auto',
				    			            items: [
				    			            	{
				    		                        xtype: 'image',
				    		                        src:'resources/images/dashboard/stern.png',
				    		                        region:'center'
				    		                    }
				    			            ]
				    		    		}
				    		    	]
			                	},
			                	//Row-2: WH Loading Area
			                	{
				                	xtype: 'container',
				                	hidden: true,
				                	margin: '25 0 0 0',
				    		    	layout: {
				    		    		type: 'hbox',
				    		            align: 'stretch'
				    	    		},
				    		    	items: [
				    		    		//Row-2-1
				    		    		{
				    			            xtype: 'container',
				    			            width: 173,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            //layout: 'auto',
				    			            items: [
				    			            	{
							    					xtype: 'label',
							                        margin: '50 0 0 0',
							                        reference:'refLoadWarehouse',
							                        style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
							                        //text: ViewUtil.getLabel('warehouse')
					    			    		}
				    			            ]
				    		    		},
				    		    		//Row-2-2: Hatch panel
					                    {
				    		    			xtype: 'container',
				 				            reference:'refWHLoadingHatchLayout',
				     				    	layout: {
				     				    		type: 'hbox',
				     				            align: 'stretch'
				     			    		},
				 				            items: [
				 				            	{
				 				            		xtype: 'panel'
				 			                    }
				 				            ]
				    		    			
				    		    		},
				    		    		//Row-2-3
				    		    		{
				    			            xtype: 'container',
				    			            width: 156,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            //layout: 'auto',
				    			            items: [
				    			            ]
				    		    		}
				    		    	]
			                	},
			                	
			                	//Row-3: Gate Loading Area
			                	{
				                	xtype: 'container',
				                	hidden: true,
				                	margin: '-25 0 0 0',
				    		    	layout: {
				    		    		type: 'hbox',
				    		            align: 'stretch'
				    	    		},
				    		    	items: [
				    		    		//Row-3-1
				    		    		{
				    			            xtype: 'container',
				    			            width: 173,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            //layout: 'auto',
				    			            items: [
				    			            	{
							    					xtype: 'label',
							                        margin: '50 0 0 0',
							                        reference:'refLoadGate',
							                        style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
							                        //text: ViewUtil.getLabel('warehouse')
					    			    		}
				    			            ]
				    		    		},
				    		    		//Row-3-2: Hatch panel
					                    {
				    		    			xtype: 'container',
				 				            reference:'refGateLoadingHatchLayout',
				     				    	layout: {
				     				    		type: 'hbox',
				     				            align: 'stretch'
				     			    		},
				 				            items: [
				 				            	{
				 				            		xtype: 'panel'
				 			                    }
				 				            ]
				    		    			
				    		    		},
				    		    		//Row-3-3
				    		    		{
				    			            xtype: 'container',
				    			            width: 156,
				    			            defaults: {
				    			                margin: '5 5 5 2'
				    			            },
				    			            //layout: 'auto',
				    			            items: [
				    			            ]
				    		    		}
				    		    	]
			                	}
			                ],
						
						}
		    		]
				},
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
		 					text: ViewUtil.getLabel('search'),
		 					itemId:'inquiryItemId',
							iconCls: 'x-fa fa-search',
							cls: 'search-button', 
		 					reference:'refBtnRetrieve',
		 					listeners: {
		 						click: 'onSearch'
		 					}
		                
						}
						]
			    },
			    {
					xtype: 'toolbar',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right'
	            	},
	            	items :[{
						xtype: 'fieldset',
						title: ViewUtil.getLabel('search'),
						margin: '0 0 5 0',
						collapsible:true,
						flex: 1,
				        layout: {
				        	type: 'hbox',
				        	align: 'stretch'
	                    },
				    	items: [{
				    		xtype: 'searchfieldset',
				    		title: ViewUtil.getLabel('search'),
					    	margin: '5 0 0 0',
					    	layout: {
					    		type: 'vbox',
					            align: 'stretch'
				    		},
				    		defaults: {
			                    margin: '0 5 5 5',
			                    labelAlign: 'right',
			                    width: 300,
			                    labelWidth: 80
			                },
					    	items: [
					    		{
									xtype: 'shipcallnofield',
									reference: 'ctlScn',
									emptyText: ViewUtil.getLabel('shipCallNo'),
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theSearch.scn}',
									},
									
								},
					    	{
	
								xtype : 'vesselcalllistfield',
								reference : 'ctlVslCallId',
								fieldLabel : ViewUtil.getLabel('vslcallid'),
								emptyText : ViewUtil.getLabel('vslcallid'),
								bind : {
									value : '{theSearch.vslCallId}'
								}
							
					    	},
					    	{
								xtype: 'combobox',
								fieldLabel: ViewUtil.getLabel('unitType'),
								reference: 'ctlUnit',
								bind: {
									store: '{' + me.UNIT_COMBO_STORE + '}',
									value : '{theSearch.unitTp}'
								},
								displayField: 'name',
								valueField: 'code',
								emptyText: 'MT',
								editable: false,
								listeners: {
									select: 'onSelectUnitType'
								},
								queryMode: 'local'
							}]
			    		},{
			    			xtype: 'fieldset',
			    			title: ViewUtil.getLabel('vslInfo'),
			    			margin: '5 0 0 5',
			    			flex: 1,
			    			layout: {
			    				type: 'hbox',
			    				align: 'stretch'
		                    },
		                    items:[
		                    	{
		    		    			xtype: 'container',
		    		    			layout: {
		    		    				type: 'vbox',
		    		    				align: 'stretch'
		    	                    },
		    	                    flex: 1,
		    		    			defaults:{
		    		    				labelAlign: 'right',
		    		    				margin: '5 0 0 0',
		    		    				flex: 1
		    		    			},
		    	                    items:[
		    	                    	{
			    	                    	xtype: 'textfield',
			    	                    	fieldLabel: ViewUtil.getLabel('equipmentSettingVesselcode'),
			    	                    	readOnly: true,
			    	                    	bind: '{theVslInfo.vslCd}'
			    	                    },{
			    	                    	xtype: 'textfield',
			    	                    	fieldLabel: ViewUtil.getLabel('equipmentSettingVesselname'),
			    	                    	readOnly: true,
			    	                    	bind: '{theVslInfo.vslNm}'
			    	                    },
			    	                    {
                                            xtype: 'container',
											flex: 1,
			    	                    }
		    	                    ]
		    			    	},
		    			    	{
		    		    			xtype: 'container',
		    		    			layout: {
		    		    				type: 'vbox',
		    		    				align: 'stretch'
		    		    			},
		    		    			flex: 1,
		    		    			defaults:{
		    		    				labelAlign: 'right',
		    		    				flex: 1,
		    		    				margin: '5 0 0 0'
		    		    			},
		    		    			items:[
		    		    				{
			    	                    	xtype: 'textfield',
			    	                    	fieldLabel: ViewUtil.getLabel('equipmentSettingVoyage'),
			    	                    	readOnly: true,
			    	                    	bind: '{theVslInfo.voyage}'
			    	                    },
		    		    				{
			    		    				xtype: 'textfield',
			    		    				fieldLabel: ViewUtil.getLabel('vessleBerthingListShippingAgent'),
			    		    				readOnly: true,
			    		    				bind: '{theVslInfo.arrvSaId}'
			    		    			},
			    	                    {
                                            xtype: 'container',
											flex: 1,
			    	                    }
		    		    			]
		    			    	},
		    			    	{
		    		    			xtype: 'container',
		    				    	layout: {
		    	                         type: 'vbox',
			    		    			align: 'stretch'
		    	                     },
		    	                     flex: 1,
		    	                     defaults:{
		    		    				labelAlign: 'right',
		    		    				margin: '5 0 0 0'
		    	                     },
		    	                     items:[
		    	                    	 {
			    		    				xtype:'datetimefield',
			            					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
			            					readOnly: true,
			    		    				fieldLabel: ViewUtil.getLabel('equipmentSettingEta'),
			    		    				bind: '{theVslInfo.eta}'
		    	                    	 },
		    	                    	 {
			    		    				xtype:'datetimefield',
			            					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
			            					readOnly: true,
			                                fieldLabel: ViewUtil.getLabel('equipmentSettingEtb'),
			                                bind: '{theVslInfo.etb}'
		    	                    	 },
		    	                    	 {
	                                            xtype: 'container',
												flex: 1,
		    	                    	 }
			    	                ]
		    			    	},
		    			    	{
		    		    			xtype: 'container',
		    				    	layout: {
		    	                         type: 'vbox',
			    		    			align: 'stretch'
		    	                     },
		    	                     flex: 1,
		    	                     defaults:{
		    		    				labelAlign: 'right',
		    		    				margin: '5 0 0 0'
		    	                     },
		    	                     items:[
		    	                    	 
		    	                    	 {
			    	                    	 xtype: 'textfield',
			    	                    	 readOnly: true,
			                                 fieldLabel: ViewUtil.getLabel('equipmentSettingBerthingloc'),
			                                 bind: '{theVslInfo.berthLoc}'
			    	                     },
			    	                     {
			    		    				xtype:'datetimefield',
			            					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
			            					readOnly: true,
			    		    				fieldLabel: ViewUtil.getLabel('equipmentSettingEtd'),
			    		    				bind: '{theVslInfo.etd}'
			    	                     },
			    	                     {
	                                            xtype: 'container',
												flex: 1,
			    	                     }
			    	                ]
		    			    	}
		                    ]
	                    }]
	            	}]
			    }
			]
		});
		
		me.callParent();
	}
});