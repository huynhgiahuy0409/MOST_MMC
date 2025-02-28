Ext.define('MOST.view.planning.WarehouseRental', {
	extend:'Ext.form.Panel',
	alias:'widget.app-warehouserental',
	
    requires: [
    	'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],
        
	width:1300,
	height:650,
	
	listeners:{
		afterrender: 'onDetailLoad',
        destroy: 'onSearch'
	},
	
//	layout: {
//        type: 'vbox',
//        align: 'stretch'
//    },
	
	layout: 'fit',
    
    lblRenTalNo: {type: 'bundle', key: 'whrRentalNo'},
    lblDuplication: {type: 'bundle', key: 'whrDuplication'},
    lblRefNo: {type: 'bundle', key: 'whrRefNo'},
    lblValidYn: {type: 'bundle', key: 'whrValidYn'},
    lblTerm: {type: 'bundle', key: 'whrTerm'},
    lblTenant: {type: 'bundle', key: 'whrTenant'},
    lblPeriod: {type: 'bundle', key: 'whrPeriod'},
    lblMonth: {type: 'bundle', key: 'whrMonth'},
    lblDays: {type: 'bundle', key: 'whrDays'},
    lblMonth: {type: 'bundle', key: 'whrMonth'},
    lblVesselCode: {type: 'bundle', key: 'whrVesselCode'},
    lblVesselName: {type: 'bundle', key: 'whrVesselName'},
    lblWareHouse: {type: 'bundle', key: 'whrWareHouse'},
    lblArea: {type: 'bundle', key: 'whrArea'},
    lblRentalRate: {type: 'bundle', key: 'whrRentalRate'},
    lblRentalCalculation: {type: 'bundle', key: 'whrRentalCalculation'},
    lblCheckHIHO: {type: 'bundle', key: 'whrCheckHIHO'},
    lblRemark: {type: 'bundle', key: 'whrRemark'},
    lblFreeStorageDays: {type: 'bundle', key: 'whrFreeStorageDays'},
    lblPayType: {type: 'bundle', key: 'whrPayType'},
    lblContractor: {type: 'bundle', key: 'whrContractor'},
    lblPayer: {type: 'bundle', key: 'whrPayer'},
    lblCommodity: {type: 'bundle', key: 'whrCommodity'},
    lblCommodityNm: {type: 'bundle', key: 'whrCommodityNm'},
    lblFontColor: {type: 'bundle', key: 'whrFontColor'},
    lblLineColor: {type: 'bundle', key: 'whrLineColor'},
    lblAmount: {type: 'bundle', key: 'whrAmount'},
    
    btnDuplication: {type: 'bundle', key: 'whrDuplication'},
	btnFind: {type: 'bundle', key: 'find'},
	btnAdd: {type: 'bundle', key: 'add'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnSetLoc: {type: 'bundle', key: 'whrSetLoc'},
	btnInitialize: {type: 'bundle', key: 'whrInitialize'},
    
	initComponent: function() {
		var me = this;
		
		var rowEditingVesselInfo = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'vesselInfoEditor',
			listeners: {
				cancelEdit: 'onCancelEditVesselInfo',				
//				validateedit: 'onValidateEdit',				
				edit: 'onEditVesselInfo'
			}
		});
		
		var rowEditingCommodityInfo = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'commodityInfoEditor',
			listeners: {
				cancelEdit: 'onCancelEditCommodityInfo',				
//				validateedit: 'onValidateEdit',				
				edit: 'onEditCommodityInfo'
			}
		});
		
		Ext.apply(me, {
			xtype:'form',
			defaults:{
				margin: '5 5 5 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					height: 350,
	                layout: {
	                    type: 'hbox',
	                    align: 'stretch'
	                },
	                items: [
	                	{
		            		xtype: 'container',
		            		flex:1,
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'vbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '5 5 0 20',
		                        labelAlign: 'right',
		                    },
		                    items: [
		    					{
		    						xtype: 'combo',
		    						reference:'refTerm',
		        					fieldLabel: me.lblTerm,
									labelWidth: 50,
									width: 150,
		                            align : 'left',
		                            bind: {
		            	    			store: '{termCombo}'
		            	    		},
		            	    		displayField: 'name',
		           					valueField: 'code',
		           					queryMode: 'local',
		           					editable: false,
		       						emptyText : 'Select',
		       						allowBlank: false,
		    					},
		    					{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85,
		                                margin: '0 5 0 0'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
											xtype: 'textfield',
											reference: 'refTenantTxt',
											fieldLabel: me.lblTenant,
											allowBlank: false,
											labelWidth: 50,
											width: 150,
										},{
											xtype: 'textfield',
											reference: 'refTenantNmTxt',
											fieldLabel: '',
											editable: false,
											fieldStyle: 'background-color: #E8D4F7;',
											width: 160,
										},{
											
											xtype: 'button',
											text: me.btnFind,
											margin: '0 5 0 0',
											reference: 'refPartnerCode',
											listeners: {
												click: 'openPartnerCdTypePopup'
											}
										}
				                    ]
			                	},
		    					{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85,
		                                margin: '0 5 0 0'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
				                			reference: 'ctlDateFromDtRental',
				        					xtype: 'datefield',
				        					labelWidth: 50,
				        					width: 180,
				        					fieldLabel: me.lblPeriod,
				        					allowBlank: false,
				        					format: MOST.config.Locale.getShortDate(),
				                			listeners: {
				                				change:  'updateDays'
				                			}
										},{
				                			reference: 'ctlDateToDtRental',
				        			        xtype: 'datefield',
// 				        			        labelWidth: 10,
				        			        width: 130,
				        			        anchor: '100%',
// 				        			        fieldLabel: '~',
				        			        allowBlank: false,
				        			        format: MOST.config.Locale.getShortDate(),
				        			        listeners: {
				                				change: 'updateDays'
				                			}
										},{
				                			reference: 'refDays',
				        			        xtype: 'textfield',
				        			        width: 41,
				        			        editable: false,
				        			        fieldStyle: 'background-color: #c0c0c0;',
										}
				                    ]
			                	},
		    					{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85,
		                                margin: '0 5 0 0'
		                            },
				            		layout: {
						                type: 'hbox',
//						                align: 'stretch'
						            },
				                    items: [
				                        {
				                            xtype: 'textfield',
				                            reference: 'refMonth',
				                            width: 150,
				                            fieldLabel: me.lblMonth,
				                            fieldStyle: 'background-color: #c0c0c0;',
											editable : false,
											labelWidth: 50,
				                        },{
				        			        xtype: 'textfield',
				        			        reference: 'txtDays',
				        			        fieldLabel: me.lblDays,
				        			        margin: '0 0 0 10',
				        			        labelWidth: 50,
				        			        width: 150,
				        			        editable: false,
				        			        fieldStyle: 'background-color: #c0c0c0;',
										}
				                    ]
			                	},
		    					{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85,
		                                margin: '0 5 0 0'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
				        					xtype: 'button',
				        					itemId: 'createItemId',
				        					text: me.btnAdd,
				        					itemId: 'createItemId',
				        					reference: 'refBtnCreate',
				        					ui: 'create-button',
				        					iconCls: 'x-fa fa-plus',
				        					listeners: {
				        						click: 'onAddVessel'
				        					}
				        				}, {
				        					xtype: 'button',
				        					itemId: 'deleteItemId',
				        					text: me.btnRemove,
				        					reference: 'refBtnRemove',
				        					ui: 'delete-button',
				        					iconCls: 'x-fa fa-minus',
				        					listeners: {
				        						click: 'onRemoveVessel'
				        					}
				        				}
				                    ]
			                	},
//			                	{
//		           					xtype:'jpvcfield',
//		           					labelWidth:100,
//		           					width:287,
//		           					fieldLabel:me.lblJpvc,
//		           					reference:'ctlJpvc',
//		           					emptyText:me.lblJpvc
//		           				},
			                	{
			                		xtype: 'grid',
				                    reference: 'refVesselGrid',
				    				stateful : true,
				    				
				    				stateId : 'stateVesselGrid',
// 				    				width:450,
                                    flex: 1,
				    				plugins: [
				    					rowEditingVesselInfo,
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		bind: {
				    	    			store: '{whrVesselList}'
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
				    	            	items: [
				    	            		{
					    	            		header: me.lblVesselCode,
					           				    reference: 'refVesselCode',
					           					dataIndex: 'cdVal',
					           					width: 100,
					    			            editor:{
					    			            	xtype:'textfield',
					    			            	reference:'refTxtVslCd',
					    			            	allowBlank: false,
					    			            	triggers: {
					    				                someField: {
					    				                    cls: 'fa-search',
					    				                    scope: 'controller',
					    				                    handler: 'onTxtVslCdTriggerClick'
					    				                }
					    				             },
//					    				            listeners:{
//					    			                	change: function(){
//					    			                		var me = this;
//					    			                		me.setValue(this.getValue().toUpperCase());
//					    			                	},
//					    			                	focusleave:'onFieldFocusleave',
//					    			                }
					    			            }
					    					},
					    					{
					    	            		header: me.lblVesselName,
					           				    reference: 'refVesselName',
					           					dataIndex: 'cdValNm',
					           					editor: {
					    							xtype: 'textfield',
					    							allowBlank: false,
					    							listeners: {
//					    								change: 'calcPumpRate',
					    							},
					    						},
					           					width: 300
					    					},
			    	            		]
				    	    		}
			                	},
		                    ]
	                	},
	                	{
		            		xtype: 'container',
		            		flex:1,
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85,
                                margin: '5 5 0 0',
                            },
		            		layout: {
				                type: 'vbox',
 				                align: 'stretch'
				            },
		                    items: [
		    					{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85,
		                                margin: '0 5 0 0'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
											xtype: 'textfield',
											reference: 'refWareHouse',
											fieldLabel: me.lblWareHouse,
											labelWidth: 100,
											width: 250,
				        			        editable: false,
				        			        fieldStyle: 'background-color: #c0c0c0;',
										},
										{
											xtype: 'button',
											text: me.btnSetLoc,
											margin: '0 5 0 0',
											reference: 'refSetLoc',
											listeners: {
												click: 'openWarehouseView'
											}
										}
				                    ]
			                	},
			                	{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85,
		                                margin: '0 5 0 0'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
											xtype: 'textfield',
											reference: 'refArea',
											fieldLabel: me.lblArea,
											labelWidth: 100,
											width: 250,
										},
										{
											
											xtype: 'button',
											text: me.btnInitialize,
											margin: '0 5 0 0',
											reference: 'refInitialize',
											listeners: {
												click: 'setInitialize'
											}
										}
				                    ]
			                	},
			                	{
									xtype: 'textfield',
									reference: 'refRentalRate',
									fieldLabel: me.lblRentalRate,
									labelWidth: 100,
									width: 315,
								},
			                	{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				    					{
				    						xtype: 'combo',
				    						margin: '0 5 0 0',
				    						reference:'refRentalCalculation',
				        					fieldLabel: me.lblRentalCalculation,
											labelWidth: 100,
											width: 205,
				                            align : 'left',
				                            bind: {
				            	    			store: '{prdTpCdCombo}'
				            	    		},
				            	    		displayField: 'name',
				           					valueField: 'code',
				           					queryMode: 'local',
				           					editable: false,
				       						value : ''
				    					},
				    					{
				    						xtype: 'combo',
				    						reference:'refRentUnit',
											width: 105,
				                            align : 'left',
				                            bind: {
				            	    			store: '{rentUnitCombo}'
				            	    		},
				            	    		displayField: 'name',
				           					valueField: 'code',
				           					queryMode: 'local',
				           					editable: false,
				       						value : '',
				       						listeners: {
												change: 'onChangeRentalUnit'
											}
				    					},
				    					{
				    						xtype: 'container',
				    						flex: 1
				    					},
				    					{
											xtype: 'textfield',
											reference: 'refAmount',
											fieldLabel: me.lblAmount,
											disabled: true,
											labelWidth: 50,
											width: 230
										}
				                    ]
			                	},
			                	{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				    					{
				    						xtype: 'checkboxfield',
				    						reference:'chkCheckHIHO',
//				        					fieldLabel: me.lblCheckHIHO,
											labelWidth: 100,
				    					},
				    					{
				    						xtype: 'label',
				    						margin: '2 16 0 5',
				    						style: 'font-weight:bold;',
				    						text: me.lblCheckHIHO,
				    					},
				    					{
				    						xtype: 'combo',
				    						reference:'refUseTpCd',
											width: 211,
				                            align : 'left',
				                            bind: {
				            	    			store: '{useTpCdCombo}'
				            	    		},
				            	    		displayField: 'name',
				           					valueField: 'code',
				           					queryMode: 'local',
				           					editable: false,
				       						value : ''
				    					},
				                    ]
			                	},
			                	{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
					                	{
					    					xtype: 'label',
					                        text: me.lblFontColor,
					                        margin: '5 0 0 50'
					    				},
					    				{
					    					xtype: 'button',
					                        width: 35,
					                        margin: '0 0 10 5',
					                        reference: 'ctlBtnFontColor',
					                        style: {"background-color":"black"}, 
					                        menu: {
					                        	items: [
					                        		{
					        	    					xtype: 'colorpicker',
					        	    					reference: 'ctlFontColor',
					        	    					listeners: {
					        	    				        select: 'onSelectFontColor'
					        	    				    }
					        	    				}
					                        	]
					                        }
					    				},
					                	{
					    					xtype: 'label',
					                        text: me.lblLineColor,
					                        margin: '5 0 0 30'
					    				},
					    				{
					    					xtype: 'button',
					                        width: 35,
					                        margin: '0 0 10 5',
					                        reference: 'ctlBtnLineColor',
					                        style: {"background-color":"orange"}, 
					                        menu: {
					                        	items: [
					                        		{
					        	    					xtype: 'colorpicker',
					        	    					reference: 'ctlLineColor',
					        	    					listeners: {
					        	    				        select: 'onSelectLineColor'
					        	    				    }
					        	    				}
					                        	]
					                        }
					    				},
				                    ]
			                	},
			                	{
									xtype: 'textfield',
									reference: 'refRemark',
									fieldLabel: me.lblRemark,
									labelWidth: 100,
									width: 320,
								},
		                    ]
	                	},
	                ]
				},
				{
					xtype: 'fieldset',
					height: 250,
	                layout: {
	                    type: 'hbox',
	                    align: 'stretch'
	                },
	                items: [
	                	{
		            		xtype: 'container',
		            		flex: 1,
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85,
                                margin: '5 5 0 5',
                            },
		            		layout: {
				                type: 'vbox',
				                align: 'stretch'
				            },
		                    items: [
			                	{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
					                	{
											xtype: 'textfield',
											reference: 'refFreeStorageDays',
											fieldStyle: 'text-transform:uppercase',
											fieldLabel: me.lblFreeStorageDays,
											labelWidth: 120,
											width: 215,
										},
				    					{
				    						xtype: 'combo',
				    						reference:'refPayTpCd',
				    						fieldLabel: me.lblPayType,
											labelWidth: 100,
											width: 180,
				                            align : 'left',
				                            bind: {
				            	    			store: '{payTpCdCombo}'
				            	    		},
				            	    		displayField: 'name',
				           					valueField: 'code',
				           					queryMode: 'local',
				           					editable: false,
				       						value : 'CA'
				    					},
				                    ]
			                	},
		    					{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85,
		                                margin: '0 5 0 0'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
											xtype: 'textfield',
											reference: 'refContractorCd',
											fieldLabel: me.lblContractor,
											labelWidth: 120,
											width: 215,
										},{
											xtype: 'textfield',
											reference: 'refContractorNm',
											fieldLabel: '',
											editable: false,
											fieldStyle: 'background-color: #E8D4F7;',
											width: 175,
										},{
											
											xtype: 'button',
											text: me.btnFind,
											margin: '0 5 0 0',
											reference: 'refPartnerCode',
											listeners: {
												click: 'openContractorPopup'
											}
										}
				                    ]
			                	},
		    					{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85,
		                                margin: '0 5 0 0'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
											xtype: 'textfield',
											reference: 'refPayerCd',
											fieldLabel: me.lblPayer,
											labelWidth: 120,
											width: 215,
										},{
											xtype: 'textfield',
											reference: 'refPayerNm',
											fieldLabel: '',
											editable: false,
											fieldStyle: 'background-color: #E8D4F7;',
											width: 175,
										},{
											
											xtype: 'button',
											text: me.btnFind,
											margin: '0 5 0 0',
											reference: 'refPartnerCode',
											listeners: {
												click: 'onPtnrCodePopup'
											}
										}
				                    ]
			                	},
		                    ]
	                	},
	                	{
		            		xtype: 'container',
		            		flex: 1,
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'vbox',
 				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '5 5 0 0',
		                        labelAlign: 'right',
		                    },
		                    items: [
		    					{
				            		xtype: 'container',
//				            		height: 40,
				            		defaults: {
		                                labelAlign: 'right',
		                                labelWidth: 85
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
						            defaults: {
				                        labelAlign: 'right',
				                        margin: '0 5 0 0'
				                    },
				                    items: [
				                    	{
				        					xtype: 'button',
				        					text: me.btnAdd,
				        					itemId: 'createItemId',
				        					reference: 'refBtnAdd',
				        					ui: 'create-button',
				        					iconCls: 'x-fa fa-plus',
				        					listeners: {
				        						click: 'onAddCommodity'
				        					}
				        				}, {
				        					xtype: 'button',
				        					itemId: 'deleteItemId',
				        					text: me.btnRemove,
				        					reference: 'refBtnDelete',
				        					ui: 'delete-button',
				        					iconCls: 'x-fa fa-minus',
				        					listeners: {
				        						click: 'onRemoveCommodity'
				        					}
				        				}
				                    ]
			                	},
//			                	{
//									xtype:'cmmcdfield',
//									labelWidth: 80,
//									width:230,
//									fieldLabel:me.lblCommodity,
//									reference:'ctlCommodity',
//									fieldStyle: 'background-color: #ffccff;',
//									params:{
//										searchType : 'CMDT'
//									}
//								},
			                	{
			                		xtype: 'grid',
				                    reference: 'refCommodityGrid',
				    				stateful : true,
				    				flex:1,
				    				stateId : 'stateCommodityGrid',
				    				plugins: [
				    					rowEditingCommodityInfo,
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    	    		],
				    	    		bind:{
				    	    			store: '{whrCommodityList}'
				    	    		},
				    	    		columns: {
				    	    			defaults: {
				    	            		style : 'text-align:center',
				    	            		align : 'center'
				    	            	},
				    	            	items: [
				    	            		{
					    	            		header: me.lblCommodity,
					           				    reference: 'refCommodity',
					           					dataIndex: 'cdVal',
					           					width: 100,
					    			            editor:{
					    			            	xtype:'textfield',
					    			            	reference:'refTxtCommodity',
					    			            	allowBlank: false,
					    			            	triggers: {
					    				                someField: {
					    				                    cls: 'fa-search',
					    				                    scope: 'controller',
					    				                    handler: 'onCommodityTriggerClick'
					    				                }
					    				             },
					    			            }
					    					},
					    					{
					    	            		header: me.lblCommodityNm,
					           				    reference: 'refCommodityNm',
					           					dataIndex: 'cdValNm',
					           					editor: {
					    							xtype: 'textfield',
					    							allowBlank: false,
					    							listeners: {
					    							},
					    						},
					           					width: 300
					    					},
			    	            		]
				    	    		}
			                	},
		                    ]
	                	},
	                ]
				},
			],
			dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
	        	},
	        	items: [
					{
						reference: 'refRenTalNo',
						xtype: 'textfield',
						fieldLabel: me.lblRenTalNo,
						fieldStyle: 'text-transform:uppercase',
						width:260,
						allowBlank: false,
						enforceMaxLength: true,
						maxLength: 10,
						labelWidth: 90,
						margin: '0 5 0 0'
					},
					{
						xtype: 'button',
						text: me.btnDuplication,
						reference:'refBtnDuplication',
						listeners: {
							click: 'onChkDupliRentNo'
						},
						margin: '0 50 0 0'
					},
					{
						reference: 'refRefNo',
						xtype: 'textfield',
						fieldLabel: me.lblRefNo,
						width:230,
						allowBlank: false,
						editable: false,
						fieldStyle: 'background-color: #ffff80;',
						margin: '0 100 0 0',
						labelWidth: 90
					},
					{
						xtype: 'combo',
						reference:'refValidYn',
    					fieldLabel: me.lblValidYn,
    					labelWidth: 35,
                        width:205,
                        align : 'left',
                        bind: {
        	    			store: '{validYnCombo}'
        	    		},
        	    		displayField: 'name',
       					valueField: 'code',
       					queryMode: 'local',
   						value : 'Y'
					}
        		]
			}]
		});
		me.callParent();
	}
});