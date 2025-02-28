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
		            xtype: 'container',
		            margin: '5 0 5 0',
		            title: ViewUtil.getLabel('dGDeclaration'),
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'form',
							reference: 'refTankerSubmissionForm', 
		                    flex: 1,
	                        margin: '2 0 0 0',
		                    defaults: {
		                        margin: '2 0 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 110
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('operationType'),
		                            editable: false,
		                            reference: 'ctlConfirmationSlip2OperationType'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('shoreTank'),
	                                bind: '{theConfirmationSlip.shreTk}',
	                                maxLength: 10,
	                                enforceMaxLength: true
		                        },
		                        {
		                        	xtype: 'numberfield',
		                            fieldLabel: ViewUtil.getLabel('numberofLines'),
	                                bind: '{theConfirmationSlip.nofLines}',
	                                maxValue: 9999999999,
	    							selectOnFocus : true
		                        },
								{
									xtype: 'combo',
									width: 320,
									fieldLabel: ViewUtil.getLabel('eqTp'),
									reference: 'refCS2EqTp',
									bind: {
										store: '{hoseTpCombo}',
										value: '{theConfirmationSlip.eqTpCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									queryMode: 'local',
									value : '',
									emptyText: 'Select',
									forceSelection:true,
									allowBlank: false,
								},
								{
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('vslschlOverallWorkingTime'),
		                            reference: 'ctlOverallWorkingTime',
		                        },
								{
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('vslschlOther'),
		                            reference: 'ctlOther',
		                        },
								{
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('shippingAgent'),
		                            reference: 'ctlShippingAgent',
		                        },
								{
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('vslschlPumpingRatePerHrs'),
		                            reference: 'ctlPumpingRate',
		                        },
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                    	margin: '2 0 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 120
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            defaults: {
		                                labelAlign: 'right',
		    	                        labelWidth: 120
		                            },
		                            layout: {
		                                type: 'hbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
	                       					xtype:'vesselcalllistfield',
	                       					flex:1,
	                       					fieldLabel:ViewUtil.getLabel('motherVessel'),
	                       					reference:'ctlLiquidBulkMthrVslCallId',
	                       					emptyText:ViewUtil.getLabel('motherVessel'),
	                       					bind:{
	                       						value : '{theConfirmationSlip.mthrVslCallId}'
	                       					}
	                       				}
		                            ]
		                        },
		                        {
		                            xtype: 'textfield',
		                            editable: false,
		                            fieldLabel: ViewUtil.getLabel('operationHours'),
		                            reference: 'refTotalOpeHrs',
		                        },
		                        {
		                        	xtype:'datetimefield',
									hidden: true,
		                        	reference: 'refTemperatureReady',
		                        	margin: '5 0 0 0',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('temperatureReady'),
	                                bind: '{theConfirmationSlip.tempRedyDt}'
		                        },
								{
									xtype:'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('eta'),
									readOnly : true,
									bind: '{theMain.eta}'
								},
								{
									xtype:'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('ata'),
									readOnly : true,
									bind: '{theMain.ata}',
									allowBlank: false,
								},
								{
									xtype:'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('vslschlReadinessATA'),
									readOnly : true,
									bind: '{theMain.readinessAta}',
									allowBlank: false,
								},
								{
	                                xtype: 'textfield',
	                                fieldLabel: ViewUtil.getLabel('vslschlSampling'),
	                                readOnly : true,
	                                bind: '{theMain.invoiceStatus}'
	                            },
								{
	                                xtype: 'textfield',
	                                fieldLabel: ViewUtil.getLabel('vslschlBlanketingN2'),
	                                readOnly : true,
	                                bind: '{theMain.invoiceStatus}'
	                            },
								{
	                                xtype: 'textfield',
	                                fieldLabel: ViewUtil.getLabel('vslschlPurgingN2'),
	                                readOnly : true,
	                                bind: '{theMain.invoiceStatus}'
	                            },
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    margin: '2 0 0 0',
		                    defaults: {
		                    	margin: '2 0 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 120
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                    	{
		                        	xtype:'datetimefield',
									hidden: true,
		                        	reference: 'refCargoready',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('cargoready'),
	                                bind: '{theConfirmationSlip.cgRedyDt}'
		                        },
								{
									xtype: 'container',
									height: 35,
									defaults: {
										labelAlign: 'right',
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'checkboxfield',
											boxLabel: ViewUtil.getLabel('doubleBanking'),
											margin: '1 0 0 0',
											bind: '{confirmationSlipDbYnChecked}',
											readOnly:true
										},
										{
											xtype: 'textfield',
											flex: 1,
											margin: '2 0 23 0',
											editable: false,
											fieldLabel: ViewUtil.getLabel('crc'),
											reference: 'ctlCrc'
										}
									]
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
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'container',
											margin: '5 0 5 5',
											flex: 1,
											layout: {
												type: 'hbox',
												pack: 'end'
											},
											items:[
												{
													xtype: 'filefield',
													name : 'fileUpload',
													margin: '0 -56 0 5',
													itemId: 'createButton',
													id:'doFileUpload',
													style: 'text-align:left',
													method: 'POST',
													fileUpload: true,
													enctype: 'multipart/form-data',
													buttonText: '',
													buttonOnly: true,
													multiple: true,
													buttonConfig: {
														text:  ViewUtil.getLabel('add'),
														iconCls: 'x-fa fa-plus' 
													},
													listeners: {
														change: 'onFileGridAdd',
														afterrender:function(cmp){
															cmp.fileInputEl.set({
																multiple:'multiple'
															});
														}
													}
												},{
													xtype: 'button',
													margin: '0 0 0 5',
													reference : 'refBtnRemoveFile',
													ui: 'delete-button',
													iconCls: 'x-fa fa-minus',
													text: ViewUtil.getLabel('remove'),
													listeners: {
														click: 'onRemoveForFileUpload'
													}
												}
											]
										},{
											xtype: 'tsb-datagrid',
											reference: me.FILE_GRID_REF_NAME,
											height: 130,
											stateful : true,
											usePagingToolbar : false,
											style: {
												borderColor: '#AAA', 
												borderStyle: 'solid', 
												borderWidth: 'thin'
											},
											stateId : 'stateDeliveryOrderUploadGrid',
											plugins: [
												'gridexporter',
												'gridfilters',
												'clipboard'
											],
											bind: {
												store: '{'+me.FILE_UPLOAD_STORE_NAME+'}'
											},
											listeners: {
												celldblclick: 'onFileDownloadDblClick'
											},
											selModel: {
												type: 'checkboxmodel',  
												checkOnly: false,
												showHeaderCheckbox: true
											},
											columns: {
												defaults: {
													style : 'text-align:center',
													align : 'center'
												},
												items: GridUtil.getGridColumns('DeliveryOrderFileUpload')
											}
										}
									]
								}
		                    ]
		                },
		                {
		                    xtype: 'container',
							hidden: true,
		                    flex: 1,
		                    margin: '2 0 0 0',
		                    defaults: {
		                    	margin: '2 0 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 120
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('tankready'),
		                            reference: 'refTankready',
	                                bind: '{theConfirmationSlip.tkRedyDt}'
		                        },
		                        {
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('ullageready'),
		                            reference: 'refUllageready',
	                                bind: '{theConfirmationSlip.ultgRedyDt}'
		                        },
		                        {
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            fieldLabel: ViewUtil.getLabel('documentsready'),
		                            reference: 'refDocumentsready',
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
		    	                    width: 350,
		    	                    border: 1,
		    	                    scrollable: true,
		    	                    style: {
		    	                        borderColor: '#d0d0d0',
		    	                        borderStyle: 'solid'
		    	                    },
		    	                    defaults: {
		                                margin: '2 0 0 0',
		                                labelWidth: 130,
		                                labelAlign: 'right'
		                            },
		    	                    layout: {
		    	                        type: 'vbox'
		    	                    },
		    	                    items: [
		    	                    	{
		    	                    		xtype: 'combo',
		    	                    		width: 320,
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
		                                },{
		    	                    		xtype: 'combo',
		    	                    		width: 320,
		    	                    		fieldLabel: ViewUtil.getLabel('blSnNo'),
		    	                    		reference: 
											'refBlSnNoComboBox',
		    	                    		bind: {
		    	                    			store: '{vesselScheduleBlSnNoCombo}',
		    	                    			value: '{theConfirmationSlip.blSnNo}'
		    	                    		},
	            							queryMode: 'local',
	            					        displayField: 'blNoSnNo',
	            					        valueField: 'blNoSnNo',
	            					        // editable: false,
	            					        listeners: {
	            								change: 'onBlNoComboChange'
	            							},
											disabled: true
		                                },
										{
					                		xtype: 'combo',
					                		reference:'ctlDeliveryMode',
					                		width: 320,
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
		    	                    		width: 320,
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
		                                	width: 320,
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
		    	    	   					width: 320,
		    	    	   					reference:'ctlTmnlOpr',
		    	    	   					fieldLabel:ViewUtil.getLabel('vorTerminalOperator'),
		    	    	   					bind: {
												value: '{theConfirmationSlip.tmnlOpr}'
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
		    	    	   					width: 320,
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
		    	    	   					width: 320,
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
		    	                            width: 320,
		    	                            margin: '2 0 0 0',
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
		    	                            width: 320,
		    	                            margin: '2 0 0 0',
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
		    	    	                    width: 320,
		    	    	                    defaults: {
		    	                                labelWidth: 130,
		    	                                labelAlign: 'right'
		    	                            },
		    	    	                    layout: {
		    	    	                        type: 'hbox',
		    	    	                        align: 'stretch'
		    	    	                    },
		    	    	                    margin: '0 0 0 0',
		    	    	                    items: [
		    	    	                        {
		    	    	                            xtype: 'textfield',
		    	    	                            fieldLabel: ViewUtil.getLabel('unnoClass'),
		    	    	        					reference:'ctlUnno',
		    	    	        					bind: {
														value: '{theConfirmationSlip.unno}'
													},
		    	    	                            readOnly:true,
		    	    	                            margin: '2 2.5 0 0',
		    	    	                            width: 220
		    	    	                        },
		    	    	                        {
		    	    	                            xtype: 'textfield',
		    	    	        					reference:'ctlImdg',
		    	    	                            editlable : false,
		    	    	                            margin: '2 0 0 0',
		    	    	                            bind: {
														value: '{theConfirmationSlip.imdg}'
													},
		    	    	                            width: 97.5,
		    	            	   					params:{
		    	            	   						searchType: 'IMDG'
		    	            	   					},
													readOnly: true
		    	    	                        }
		    	    	                    ]
		    	    	                },	       
										{
		    	    	                    xtype: 'container',
		    	    	                    width: 320,
		    	    	                    defaults: {
		    	                                labelAlign: 'right',
												labelWidth: 130,
		    	                            },
		    	    	                    layout: {
		    	    	                        type: 'hbox',
		    	    	                        align: 'stretch'
		    	    	                    },
		    	    	                    margin: '0 0 0 0',
		    	    	                    items: [
		    	    	                        {
													xtype: 'textfield',
													margin: '2 2.5 0 0',
													fieldLabel: ViewUtil.getLabel('polpod'),
													reference:'ctlPOL',
													bind:{
	    	    										value : '{theConfirmationSlip.pol}'
	    	    									},
													width: 220,
													allowBlank: false,
													readOnly: true
												},
												{
													xtype: 'textfield',
													margin: '2 0 0 0',
													bind:{
	    	    										value : '{theConfirmationSlip.fdest}'
	    	    									},
													width: 97.5,
													reference:'ctlPOD',
													allowBlank: false,
													readOnly: true
												}
		    	    	                    ]
		    	    	                },	     	                
		    	                        {
		                                	xtype : 'numberfield',
		                                	width: 320,
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
		    	    	                    width: 320,
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
		    	                                	width: 260,
		    	                                	fieldLabel: ViewUtil.getLabel('estOprTime'),
		    	    	                    		reference: 'refEstOprTime',
		    	        							minValue : 0,
		    	        							maxValue: 999999999999,
		    	        							align : 'right',
		    	        							decimalPrecision: 0,
		    	        							selectOnFocus : true
		    	                                },
		    	                                {
		                                            xtype: 'label',
		                                            margin: '2 0 0 5',
		                                            width: 60,
		                                            text: ViewUtil.getLabel('hours')
		                                        }
		    	    	                    ]
		    	    	                },
		                                {
	            							xtype: 'textfield',
	            							width: 320,
	            							margin : '2 0 2 0',
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
		    	    				flex: 1,
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
	                            margin: '0 0 0 0',
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
		    	                    flex:1,
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
		                                margin: '0 0 0 3',
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
											reference:'refBtnTankerSubmission',
											text: ViewUtil.getLabel('vslschlCargoVolume'),
											listeners: {
												click: 'onClickTankerSubmission'
											}
										},
										{
											xtype: 'button',
											reference:'refBtnRequestTimeCS2',
											text: ViewUtil.getLabel('vslschlRequestTime'),
											listeners: {
												click: 'onClickRequestTime'
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