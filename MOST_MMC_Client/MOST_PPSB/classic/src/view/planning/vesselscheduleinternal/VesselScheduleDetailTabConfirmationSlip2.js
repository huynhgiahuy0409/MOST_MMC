Ext.define('MOST.view.planning.vesselscheduleinternal.VesselScheduleDetailTabConfirmationSlip2', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselscheduledetailtabconfirmationslip2',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	 /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CS2_GRID_REF_NAME: 'refConfirmationSlipLiquidBulkGrid',  // Main Grid Name 
	CS2_STORE_NAME: 'confirmationSlipLiquidBulk',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'confirmationSlipLiquidBulkEditor',
			listeners: {
				cancelEdit: 'onConfirmationSlip2CancelEdit',				
				validateedit: 'onConfirmationSlip2ValidateEdit',				
				edit: 'onConfirmationSlip2Edit'
			}
		});
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'fieldset',
		            margin: '5 0 5 0',
					padding: '0 10 10 10',
		            title: ViewUtil.getLabel('dGDeclaration'),
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
							defaults: {
								xtype: 'textfield',
								margin: '5 0 0 0',
								labelAlign: 'right',
								labelWidth: 100
							},
							items: [
								{
									reference: 'ctlConfirmationSlip2OperationType',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('operationType'),
									editable: false,
								},
								{
									fieldLabel: ViewUtil.getLabel('shoreTank'),
									bind: '{theConfirmationSlip.shreTk}',
									maxLength: 10,
									enforceMaxLength: true
								},
								{
									fieldLabel: ViewUtil.getLabel('numberofLines'),
									bind: '{theConfirmationSlip.nofLines}',
									maxValue: 9999999999,
									selectOnFocus: true
								}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							defaults: {
								margin: '5 0 0 0',
								labelAlign: 'right',
								labelWidth: 100
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'vesselcalllistfield',
									reference: 'ctlLiquidBulkMthrVslCallId',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('motherVessel'),
									emptyText: ViewUtil.getLabel('motherVessel'),
									bind: {
										value: '{theConfirmationSlip.mthrVslCallId}'
									}
								},
								{
									xtype: 'textfield',
									reference: 'refTotalOpeHrs',
									editable: false,
									fieldLabel: ViewUtil.getLabel('operationHours'),
								},
								{
									xtype: 'datetimefield',
									reference: 'refTemperatureReady',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('temperatureReady'),
									bind: '{theConfirmationSlip.tempRedyDt}'
								},

							]
						},
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                    	margin: '5 0 0 0',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                    	{
		                        	xtype:'datetimefield',
		                        	reference: 'refCargoready',
									margin: '0 0 0 0',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('cargoready'),
	                                bind: '{theConfirmationSlip.cgRedyDt}'
		                        },
		                        {
	                                xtype: 'textfield',
	                                fieldLabel: ViewUtil.getLabel('invoiceStatus'),
	                                readOnly : true,
	                                bind: '{theMain.invoiceStatus}'
	                            },
		                        {
		                            xtype: 'container', 
		                            layout: {
		                                type: 'hbox',
		                                align: 'stretch'
		                            },
									defaults: {
		                                labelAlign: 'right',
		                            },
		                            items: [
				                        {
				                            xtype: 'checkboxfield',
				                            boxLabel: ViewUtil.getLabel('doubleBanking'),
											margin: '0 0 0 105',
			                                bind: '{confirmationSlipDbYnChecked}',
			                                readOnly:true
				                        },
				                        {
				                            xtype: 'textfield',
				                            reference: 'ctlCrc',
											labelWidth: 30,
											flex: 1,
				                            editable: false,
				                            fieldLabel: ViewUtil.getLabel('crc'),
				                        }
				                    ]
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
		                    defaults: {
		                    	margin: '5 0 0 0',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    items: [
		                        {
		                        	xtype:'datetimefield',
		                            reference: 'refTankready',
									margin: '0 0 0 0',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('tankready'),
	                                bind: '{theConfirmationSlip.tkRedyDt}'
		                        },
		                        {
		                        	xtype:'datetimefield',
		                            reference: 'refUllageready',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('ullageready'),
	                                bind: '{theConfirmationSlip.ultgRedyDt}'
		                        },
		                        {
		                        	xtype:'datetimefield',
		                            reference: 'refDocumentsready',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('documentsready'),
	                                bind: '{theConfirmationSlip.docRedyDt}'
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'container',
		            flex: 1,
		            margin : '0 0 0 0',
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		            	{
		                    xtype: 'container',
		                    defaults: {
	                            margin: '0 5 5 0'
	                        },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                    	{
		    	                    xtype: 'container',
		    	                    flex: 3,
		    	                    border: 1,
		    	                    scrollable: true,
									padding: '0 5 5 5',
		    	                    style: {
		    	                        borderColor: '#d0d0d0',
		    	                        borderStyle: 'solid'
		    	                    },
		    	                    layout: {
		    	                        type: 'vbox',
										align: 'stretch'
		    	                    },
		    	                    defaults: {
		                                margin: '5 0 0 0',
		                                labelWidth: 130,
		                                labelAlign: 'right'
		                            },
		    	                    items: [
		    	                    	{
		    	                    		xtype: 'combo',
		    	                    		fieldLabel: ViewUtil.getLabel('cargoOperation'),
		    	                    		reference: 'refCgOpeComboBox',
		    	                    		bind: {
		    	                    			store: '{vesselScheduleCargoOperationCombo}',
												value: '{theConfirmationSlip.cgOptTpCd}'
		    	                    		},
	            							queryMode: 'local',
	            					        displayField: 'scdNm',
	            					        valueField: 'scd',
	            					        editable: false,
	            					        allowBlank: false,
	            					        listeners: {
	            								change: 'onCargoOperationComboChange'
	            							}
		                                },
										{
		    	                    		xtype: 'combo',
		    	                    		fieldLabel: ViewUtil.getLabel('blSnNo'),
		    	                    		reference: 'refBlSnNoComboBox',
		    	                    		bind: {
		    	                    			store: '{vesselScheduleBlSnNoCombo}',
		    	                    			value: '{theConfirmationSlip.blNo}'
		    	                    		},
	            							queryMode: 'local',
	            					        displayField: 'blNoSnNo',
	            					        valueField: 'blNoSnNo',
	            					        listeners: {
	            								change: 'onBlNoComboChange'
	            							},
											disabled: true
		                                },
										{
					                		xtype: 'combo',
					                		reference:'ctlDeliveryMode',
					                		fieldLabel: ViewUtil.getLabel('deliveryMode'),
					                		editable:false,
				                            allowBlank: false,
				                            bind: {
				            	    			store: '{delvModeCombo}',
												value: '{theConfirmationSlip.delvTpCd}'
				            	    		},
				            	    		displayField: 'name',
				           					valueField: 'code',
				           					queryMode: 'local',
											readOnly: true
					                	},
		    	                    	{
		    	                    		xtype: 'combo',
		    	                    		fieldLabel: ViewUtil.getLabel('cgTpNm'),
		    	                    		reference: 'refCgTpComboBox',
	            							bind: {
	            								store: '{vesselScheduleCargoTypeLiquidCombo}',
	            								value: '{theConfirmationSlip.cgTpCd}'
	            							},
	            							queryMode: 'local',
	            					        displayField: 'scdNm',
	            					        valueField: 'scd',
	            					        editable: false,
	            					        allowBlank: false,
	            					        listeners: {
	            								change: 'onCargoTypeLiquidComboChange'
	            							},
											readOnly: true
		                                },
		                                {
		                                	xtype : 'numberfield',
		                                	fieldLabel: ViewUtil.getLabel('vorTotalTonnage'),
		    	                    		reference: 'refTotalTonnage',
		        							minValue : 0,
		        							maxValue: 999999999999.999,
		        							align : 'right',
		        							decimalPrecision: 3,
		        							selectOnFocus : true
		                                },
		                                {
		    	    	   					xtype:'partnercdfield',
		    	    	   					reference:'ctlTmnlOpr',
		    	    	   					fieldLabel:ViewUtil.getLabel('vorTerminalOperator'),
		    	    	   					bind: {
												value: '{theConfirmationSlip.opeTpCd}'
											},
		    	    	   					labelAlign: 'left',
		    	    	   					allowBlank: false,
		            	   					params:{
	                	   						ptnrType: CodeConstants.CM_PTNRTP_CNS,
	                	   						initSearch: false
		            	   					}
		    	    	   				},
		    	    	   				{
		    	    	   					xtype:'textfield',
		    	    	   					reference:'ctlShipper',
		    	    	   					fieldLabel:ViewUtil.getLabel('shprCnsne'),
		    	    	   					bind: {
												value: '{theConfirmationSlip.shprNm}'
											},
		            	   					params:{
	                	   						ptnrType: CodeConstants.CM_PTNRTP_CNS,
	                	   						initSearch: false
		            	   					},
											readOnly: true
		    	    	   				},
		    	    	   				{
		    	    	   					xtype:'textfield',
		    	    	   					reference:'ctlConsignee',
		    	    	   					fieldLabel:ViewUtil.getLabel('cnsne'),
		    	    	   					bind: {
												value: '{theConfirmationSlip.cnsneNm}'
											},
		            	   					params:{
	                	   						ptnrType: CodeConstants.CM_PTNRTP_CNS,
	                	   						initSearch: false
		            	   					},
											readOnly: true 
		    	    	   				},
		    	    	   				{
		    	                            xtype: 'textfield',
		    	                            fieldLabel: ViewUtil.getLabel('cmdtCd'),
		    	                            bind: {
												value: '{theConfirmationSlip.cmdtDesc}'
											},
		    	                            reference: 'ctlCmdtCode',
	            					        allowBlank: false,
		            	   					params:{
		            	   						searchType: 'CMDT'
		            	   					},
											readOnly: true
		    	                        },
		    	                        {
		    	                            xtype: 'textfield',
		    	                            fieldLabel: ViewUtil.getLabel('pkgTpCd'),
		    	                            bind: {
												value: '{theConfirmationSlip.pkgTpNm}'
											},
		    	                            allowBlank: false,
		    	                            reference: 'ctlTypeofPackage',
		    	                            params:{
		    	                            	searchLcd:CodeConstants.LCD_MOST,
	    		                            	searchMcd: CodeConstants.MCD_MT_PKGTP,
	    	        	   						searchType: 'COMM'
		            	   					},
											readOnly: true
		    	                        },
		    	                        {
		    	    	                    xtype: 'container',
		    	    	                    layout: {
		    	    	                        type: 'hbox',
		    	    	                        align: 'stretch'
		    	    	                    },
		    	    	                    items: [
												{
													xtype: 'label',
													text: ViewUtil.getLabel('unnoClass') + ':',
													style: {
														'text-align': 'right',
													},
													width: 130,
													margin: '5 5 0 0',
												},
		    	    	                        {
		    	    	                            xtype: 'textfield',
		    	    	        					reference:'ctlUnno',
													flex: 1,
		    	    	        					bind: {
														value: '{theConfirmationSlip.unno}'
													},
		    	    	                            readOnly:true,
		    	    	                        },
		    	    	                        {
		    	    	                            xtype: 'textfield',
		    	    	        					reference:'ctlImdg',
													flex: 1,
													margin: '0 0 0 5',
		    	    	                            editlable : false,
		    	    	                            bind: {
														value: '{theConfirmationSlip.imdg}'
													},
		    	            	   					params:{
		    	            	   						searchType: 'IMDG'
		    	            	   					},
													readOnly: true
		    	    	                        }
		    	    	                    ]
		    	    	                },	       
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 130,
											},
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'label',
													text: ViewUtil.getLabel('polpod') + ':',
													style: {
														'text-align': 'right',
													},
													width: 130,
													margin: '5 5 0 0',
												},
												{
													xtype: 'textfield',
													reference: 'ctlPOL',
													flex: 1,
													bind: {
														value: '{theConfirmationSlip.pol}'
													},
													allowBlank: false,
													readOnly: true
												},
												{
													xtype: 'textfield',
													reference: 'ctlPOD',
													flex: 1,
													margin: '0 0 0 5',
													bind: {
														value: '{theConfirmationSlip.fdest}'
													},
													allowBlank: false,
													readOnly: true
												}
											]
										},	     	   
										{
											xtype:'datetimefield',
											reference: 'refLiquidStartTime',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											fieldLabel: ViewUtil.getLabel('start_time'),
											bind: '{theConfirmationSlip.stDt}',
											required: true,
											readOnly: false,
											listeners: {
												change: 'onStartTimeChange'
											}
										}, 	 
										{
											xtype: 'datetimefield',
											reference: 'refLiquidETC',
											fieldLabel: ViewUtil.getLabel('vorETC'),
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											bind: '{theConfirmationSlip.etc}',
											required: true,
											readOnly: true
										},                    
		    	                        {
		                                	xtype : 'numberfield',
		                                	fieldLabel: ViewUtil.getLabel('crc'),
		    	                    		reference: 'refCRC',
		    	                    		bind: '{theConfirmationSlip.crc}',
		        							minValue : 0,
		        							maxValue: 999999999999.999,
		        							align : 'right',
		        							decimalPrecision: 3,
		        							selectOnFocus : true
		                                },
		                                {
		    	    	                    xtype: 'container',
		    	    	                    defaults: {
		    	                                labelWidth: 130,
		    	                                labelAlign: 'right'
		    	                            },
		    	    	                    layout: {
		    	    	                        type: 'hbox',
		    	    	                        align: 'stretch'
		    	    	                    },
		    	    	                    items: [
		    	    	                    	{
		    	                                	xtype : 'numberfield',
		    	    	                    		reference: 'refEstOprTime',
													flex: 1,
		    	                                	fieldLabel: ViewUtil.getLabel('estOprTime'),
		    	        							minValue : 0,
		    	        							maxValue: 999999999999,
		    	        							align : 'right',
		    	        							decimalPrecision: 0,
		    	        							selectOnFocus : true
		    	                                },
		    	                                {
		                                            xtype: 'label',
		                                            text: ViewUtil.getLabel('hours'),
													margin: '5 0 0 5'
		                                        }
		    	    	                    ]
		    	    	                },
		                                {
	            							xtype: 'textfield',
		                                	fieldLabel: ViewUtil.getLabel('remark'),
		    	                    		reference: 'refRemark',
		    	                    		bind: '{theConfirmationSlip.remark}',
	            							maxLength: 100,
	            							enforceMaxLength : true,
	            							allowBlank: true,
	            				       }
		    	                    ]
		    	                },
		    	                {
		    	                	xtype: 'tsb-datagrid',
		    	    				reference: me.CS2_GRID_REF_NAME,
		    	    				flex: 7,
									margin: '0 0 5 0',
		    	    				usePagingToolbar : false,
		    	                	stateful : true,
		    	                	stateId : 'stateConfirmationSlipLiquidBulkGrid',
		    	                	plugins: [
		    	                		'gridexporter',
		    	                		'gridfilters',
		    	                		'clipboard'
		    	                	],
		    	                	bind: {
		    	                		store: '{' + me.CS2_STORE_NAME + '}'
		    	                	},
		    	                	selModel: {
		                        		type: 'spreadsheet',
		                        		cellSelect: false
		                        	},
		    	                	listeners: {
		    	    					rowClick: 'onRefConfirmationSlipLiquidBulkGrid_CellClick'
		    	    				},
		                            features: [{
		                                ftype: 'summary',
		                                dock: 'bottom'
		                            }],  	    	    				
		    	                	columns: {
		    	                		defaults: {
		    	                			style : 'text-align:center',
		    	                			align : 'center'
		    	                		},
		    	                		items: GridUtil.getGridColumns('ConfirmationSlip2')
		    	                	}
		    	                }
		                    ]
		                },
		                {
		                    xtype: 'container',
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
									defaults: {
										margin: '0 0 0 3',
										labelAlign: 'right',
										labelWidth: 100
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'button',
											margin: '0 0 0 0',
											text: ViewUtil.getLabel('clear'),
											listeners: {
												click: 'onClearConfirmationSlip2'
											}
										},
										{
											xtype: 'button',
											text: ViewUtil.getLabel('add'),
											cls: 'search-button',
											iconCls: 'x-fa fa-plus',
											listeners: {
												click: 'onAddConfirmationSlip2'
											}
										},
										{
											xtype: 'button',
											text: ViewUtil.getLabel('update'),
											listeners: {
												click: 'onUpdateConfirmationSlip2'
											}
										},
										{
											xtype: 'button',
											text: ViewUtil.getLabel('remove'),
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											listeners: {
												click: 'onDeleteConfirmationSlip2'
											}
										}
									]
								},
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										margin: '0 0 0 5',
										labelAlign: 'right',
										labelWidth: 100
									},
									layout: {
										type: 'hbox',
										align: 'stretch',
										pack: 'end'
									},
									items: [
										{
											xtype: 'button',
											text: ViewUtil.getLabel('dGDeclaration'),
											ui: 'delete-button',
											iconCls: 'x-fa fa-exclamation-triangle',
											hidden: true,
											listeners: {
												click: {
													fn: 'onDgDeclaration',
													args: ['ConfirmationSlip2']
												}
											}
										},
										{
											xtype: 'button',
											text: ViewUtil.getLabel('seeBlSnList'),
											listeners: {
												click: 'onSeeBlList'
											}
										},
										{
											xtype: 'button',
											text: ViewUtil.getLabel('submitConfirmationSlip'),
											cls: 'search-button',
											listeners: {
												click: 'onSubmitConfirmationSlip2'
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