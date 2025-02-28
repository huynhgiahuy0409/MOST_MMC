Ext.define('MOST.view.operation.ConfirmDischargingOfRORO', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-confirmdischargingofroro',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	width: 820,
	height: 700,
	scrollable: true,
	
	controller: 'confirmdischargingofroro',
	
	viewModel: {
		type: 'confirmdischargingofroro'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	config: {
		recvData : null
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'cargoItems',            // Main Store Name
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
			items: [
				//Vessel/Document information
				{
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
		            defaults: {
		                //margin: '0 5 0 5',
		                labelAlign: 'right',
		                layout: {
		                    type: 'hbox',
		                    align: 'stretch'
		                },
		                defaults: {
		                    margin: '0 5 2 5',
		                    labelAlign: 'right',
		                    flex: 1,
		                    labelWidth: 100
		                }
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		            	{
		                    xtype: 'container',
		                    items: [
		                    	{
				                    xtype: 'textfield',
				                    flex: 1.5,
				                    reference: 'ctlVslCallId',
				                    fieldLabel: ViewUtil.getLabel('vslcallid'),
				                    readOnly:true,
				                    bind:'{theRRDetail.vslCallId}',
				                    readOnly:true
				                },
				                {
				                    xtype: 'textfield',
				                    flex: 1.5,
				                    fieldLabel: ViewUtil.getLabel('confirmDischargingBlDo'),
				                    reference: 'ctlCgNo',
				                    readOnly:true,
				                    bind:'{theRRDetail.blNo}'
				                },
		                    ]
		            	},
		            	{
		                    xtype: 'container',
		                    items: [
		                    	{
				                    xtype: 'textfield',
				                    fieldLabel: ViewUtil.getLabel('vesselname'),
				                    flex: 1.5,
				                    bind:'{theRRDetail.vslNm}',
				                    readOnly:true
				                },
		                    	
				                {
				                    xtype: 'combobox',
				                    fieldLabel: ViewUtil.getLabel('deliveryMode'),
				                    flex: 1.5,
				                    queryMode: 'local',
				                    bind: {
				                    	store: '{confirmDischargingForDeliveryCombo}',
				                    	value: '{theRRDetail.delvTpCd}'
				                    },
				                    displayField: 'scdNm',
				                    valueField: 'scd',
				                    readOnly:true
				                },
		                    ]
		            	}
		            ]
		            
				},
				
		        {
		            xtype: 'fieldset',
		            margin: '0 5 5 5',
		            defaults: {
	                    margin: '0 5 2 5',
	                    labelAlign: 'right',
	                    flex: 1,
	                    labelWidth: 100
	                },
		            reference:'ctlConfirmDischargingBreakBulkLabel',
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'combobox',
		                    fieldLabel: ViewUtil.getLabel('confirmLoadingEquipment'),
		                    queryMode: 'local',
		                    hidden:true,
		                    bind: {
								store: '{deployedEquipmentNoList}',
								value: '{theRRDetail.eqNo}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            allowBlank: false
		                },
		                {
		                    xtype: 'combobox',
		                    reference:"ctlConfirmDischargingBBKHatchNo",
		                    fieldLabel: ViewUtil.getLabel('confirmLoadingHatchNo'),
		                    queryMode: 'local',
		                    bind: {
								store: '{confirmDischargingHatchCombo}',
								value: '{theRRDetail.hatchNo}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            forceSelection:true
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            margin: '0 5 5 5',
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                layout: {
		                    type: 'hbox',
		                    align: 'stretch'
		                },
		                defaults: {
		                    margin: '0 5 2 0',
		                    labelAlign: 'right',
		                    labelWidth: 100
		                }
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    items: [
		                        {
		                            xtype: 'label',
		                            margin: '2 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingStartDateTime')
		                        },
		                        {
		                            flex: 3,
		                            xtype: 'datetimefield',
		                            reference: 'ctlConfirmDischargingStartDt',
		                            bind:'{theRRDetail.startDt}',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            allowBlank:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 2,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingShift'),
		                            bind:'{theRRDetail.shftNm}',
		                            readOnly:true,
		                            allowBlank:true
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    items: [
		                        {
		                            xtype: 'label',
		                            margin: '2 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingEndDateTime')
		                        },
		                        {
		                            flex: 3,
		                            xtype: 'datetimefield',
		                            reference: 'ctlConfirmDischargingEndDt',
		                            bind:'{theRRDetail.endDt}',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									editable: false,
									readOnly: true
		                        },
		                        {
		                            flex: 2,
		                            xtype: 'combobox',
		                            reference: 'refConfirmLoadingModeOfOpr',
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingModeOfOpr'),
		                            queryMode: 'local',
		                            bind: {
		                            	store: '{confirmDischargingForModeOfOprCombo}',
		                            	value: '{theRRDetail.tsptTpCd}'
		                            },
		                            displayField: 'scdNm',
		                            valueField: 'scd',
		                            forceSelection:true,
		                            allowBlank: false,
		                            emptyText: 'Select'
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
		                            xtype: 'container',
		                            width: 100
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            margin: '5 0 0 0',
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'Qty'
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            margin: '2 0 0 0',
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'MT'
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            margin: '2 0 0 0',
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'M3'
		                        },
		                        {
		                            flex: 2,
		                            labelWidth: 105,
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingClearance'),
		                            bind: {
		                            	value: '{theRRDetail.custMode}'
		                            },
		                            forceSelection:true,
		                            readOnly:true
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
		                            xtype: 'label',
		                            margin: '2 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmDischargingDocAmt')
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
				                    readOnly:true,
				                    bind:'{theRRDetail.docQty}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
				                    readOnly:true,
				                    bind:'{theRRDetail.docMt}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
				                    readOnly:true,
				                    bind:'{theRRDetail.docM3}'
		                        },
		                        {
		                            xtype: 'combobox',
		                            flex: 2,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
		                            queryMode: 'local',
		                            reference: 'refCargoType',
		                            bind: {
		                            	store: '{confirmDischargingForCargoTypeCombo}',
		                            	value: '{theRRDetail.cgTpCd}'
		                            },
		                            forceSelection:true,
		                            readOnly:true,
		                            displayField: 'scdNm',
		                            valueField: 'scd'
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
		                            xtype: 'label',
		                            margin: '2 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmDischargingBalance')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'refBalanceQty',
		                        	//minValue : 0,
		                        	maxValue: 999999.999,
		                            flex: 1,
		                            bind:'{theRRDetail.balQty}',
		                            readOnly:true
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	//minValue : 0,
		                        	reference: 'refBalanceMT',
		                        	maxValue: 999999.999,
									decimalPrecision: 3,
		                            flex: 1,
		                            bind:'{theRRDetail.balMt}',
		                            readOnly:true
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'refBalanceM3',
		                        	//minValue : 0,
		                        	maxValue: 999999.999,
									decimalPrecision: 3,
		                            flex: 1,
		                            bind:'{theRRDetail.balM3}',
		                            readOnly:true
		                        },
		                        {
		                            xtype: 'checkboxfield',
		                            reference:'ctlConfirmDischargingFinal',
		                            hidden:true,
		                            flex: 2,
		                            boxLabel: ViewUtil.getLabel('confirmDischargingFinalDischarging'),
		                            bind:'{theRRDetail.fnlOpeYn}'		                            
		                        },
		                        {
									xtype: 'container',
									flex: 2,
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
		                            xtype: 'packagenofield',
		                            reference:'ctlConfirmDischargingPackNoCode',
		                            flex: 3,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingPackageNo'),
		                            labelWidth: 100,
		                            bind:{
		                            	value : '{theRRDetail.pkgNo}',
		                            	vslCallId: '{theRRDetail.vslCallId}',
		                            	blNo: '{theRRDetail.blNo}',
		                            	ixCd: 'I'
		                            }                         
		                        },
		                        {
		                            xtype: 'cmmcdfield',
		                            reference:'ctlConfirmDischargingPacTypeCode',
		                            flex: 2,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingPkgType'),
		                            labelWidth: 105,
		                            bind:{
		                            	value : '{theRRDetail.pkgTpCd}'
		                            },
		                            params:{
				   						searchType: 'COMM',
				   						searchDivCd: 'PKGTP',
				   						searchLcd:CodeConstants.LCD_MOST,
			                            searchMcd: CodeConstants.MCD_MT_PKGTP
				   					},
				   					allowBlank:false	                            
		                        }
		                    ]
		                }
		            ]
		        },
		        
//		        Vessel to Apron
				{
		            xtype: 'fieldset',
		            reference:'refCtnLorryOperationVA',
		            margin: '0 5 5 5',
	                labelAlign: 'right',
	                defaults: {
	                    margin: '2 5 0 5',
	                    labelAlign: 'right',
	                    labelWidth: 100,
	                    layout: {
	                        type: 'hbox',
	                        align: 'stretch'
	                    }
		            },
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
		                            xtype: 'radiofield',
		                            reference:'ctlIndirectOperation',
		                            flex: 1,
		                            boxLabel: ViewUtil.getLabel('confirmDischargingIndirectOperation'),
							        listeners: {
										change: 'onDirectModeChange'
									}
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    hidden: true,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
			                defaults:{
		                    	margin: '0 5 0 0'
		                    },
		                    items: [
		                        {
		                            xtype: 'label',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmDischargingInDirectDocAmt')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999999,
		                        	selectOnFocus : true,
		                            flex: 1,
				                    readOnly:true,
				                    bind:{
				                    	value : '{theRRDetail.iqty}'
				                    }
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
				                    readOnly:true,
				                    bind:{
				                    	value : '{theRRDetail.imt}'
				                    }
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
				                    readOnly:true,
				                    bind:'{theRRDetail.im3}'
		                        },
		                        {
				                    xtype: 'combobox',
				                    flex: 4,
									hidden: true,
									allowBlank: true,
				                    labelWidth: 120,
				                    labelAlign: 'right',
				                    queryMode: 'local',
				                    editable: false,
				                    reference: 'ctlConfirmDischargingCrane',
				                    fieldLabel: ViewUtil.getLabel('confirmDischargingCrane'),
				                    bind: {
				                    	store: '{confirmDischargingCraneCombo}',
				                    	value : '{theRRDetail.eqFacNo}',
				                    },
				                    displayField: 'eqFacNo',
				                    valueField: 'eqFacNo'
				                },
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults:{
		                    	margin: '0 5 0 0'
		                    },
		                    items: [
		                        {
		                            xtype: 'label',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmDischargingWhAmt')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlConfirmDischargingWhQty',
		                        	minValue : 0,
		                        	maxValue: 999999999,
		                        	selectOnFocus : true,
		                            flex: 1,
	                            	bind:{
				                    	value : '{theRRDetail.whQty}'
				                    },
				                    listeners:{
//	                                	change: 'onQtyChange'
		        					}
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999.999,
		                        	reference: 'ctlConfirmDischargingWhMt',
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
		                            bind:{
				                    	value : '{theRRDetail.whWgt}'
				                    },
				                    listeners:{
//	                                	change: 'onMtChange'
		        					}
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlConfirmDischargingWhM3',
		                        	minValue : 0,
		                        	maxValue: 999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
		                            bind:{
				                    	value : '{theRRDetail.whM3}'
				                    },
				                    listeners:{
//	                                	change: 'onM3Change'
		        					}
		                        },
//		                        {
//									xtype: 'truckfield',
//									reference: 'txtInternalTruckNo',
//									fieldLabel: ViewUtil.getLabel('lorryNo'),
//									flex: 4,
//									labelWidth: 120,
//									labelAlign: 'right',
//									bind: {
//										value: '{theRRDetail.vaLorryNo}',
//										vslCallId: '{theRRDetail.vslCallId}',
//										blNo: '{theRRDetail.blNo}',
//										searchDivCd : 'YT',
//            	   						weightCheckYn: '{theRRDetail.weightCheckYn}'
//									}
//								}
		                        {
             	   					xtype:'textfield', //Display list of vin
             	   					fieldLabel: ViewUtil.getLabel('unitNo'),
                                    labelWidth: 50,
                                    labelAlign: 'right',
       							 	width: 308,
//     								margin: '5 2 5 0',
             	   					reference:'ctlUnitNoIndirectSearchField',
             	   					readOnly:true,
				                    bind:{
				                    	value : '{theRRDetail.iunitNo}'
				                    }
                                 },{
     								xtype: 'button',
     								disabled: false,
             	   					reference:'ctlBtnUnitNoIndirectSearchField',
     			 					iconCls: 'x-fa fa-search',
     			 					listeners: {
     			 						click: 'openUnitListPopup'
     			 					}
     							}
		                    ]
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
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingRemark')
								},
								{
									xtype: 'textfield',
									flex: 1,
									//with:300,
									bind:'{theRRDetail.rmk}',
									maxLength: 50,
									enforceMaxLength : true
								}
							]
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
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('stevedore')
								},
								{
									xtype: 'textfield',
									flex: 1,
									//with:300,
									bind:'{theRRDetail.stevedoreId}',
									maxLength: 40,
									enforceMaxLength : true
								}
							]
						}
		            ]
		        },
//		        Vessel to Gate
				{

		            xtype: 'fieldset',
		            margin: '0 5 5 5',
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                defaults: {
		                    margin: '0 5 2 0',
		                    labelAlign: 'right',
		                    labelWidth: 100,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    }
		                }
		            },
		            flex: 1,
		            width: 750,
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
                            xtype: 'container',
                            reference:'refCtnLorryOperationVG',
		                    flex: 1,
		                    layout: {
		                        type: 'vbox',
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
											xtype: 'radiofield',
											reference:'ctlDirectOperation',
											flex: 1,
											boxLabel: ViewUtil.getLabel('confirmDischargingVslToGate'),
											listeners: {
												change: 'onDirectModeChange'
											}
										}
									]
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
											margin: '2 5 0 0',
											style: {
												'text-align': 'right'
											},
											width: 100,
											text: ViewUtil.getLabel('confirmDischargingDirectDocAmt')
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999999,
											selectOnFocus : true,
											flex: 1,
											readOnly:true,
											margin: '0 5 0 0',
											bind:'{theRRDetail.dQty}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											readOnly:true,
											bind:'{theRRDetail.dMt}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											readOnly:true,
											bind:'{theRRDetail.dM3}'
										}, {
		             	   					xtype:'textfield', //Display list of vin
		             	   					fieldLabel: ViewUtil.getLabel('unitNo'),
		                                    labelWidth: 48,
		                                    labelAlign: 'right',
		       							 	width: 300,
		                                    margin: '0 5 0 0',
		             	   					reference:'ctlUnitNoDirectSearchField',
		             	   					readOnly:true,
						                    bind:{
						                    	value : '{theRRDetail.dunitNo}'
						                    }
		                                 },{
		     								xtype: 'button',
//		     								margin: '0 3 0 20',
		     								disabled: false,
		             	   					reference:'ctlBtnUnitNoDirectSearchField',
		     			 					iconCls: 'x-fa fa-search',
		     			 					listeners: {
		     			 						click: 'openUnitListPopup'
		     			 					}
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
											xtype: 'label',
											margin: '2 5 0 0',
											style: {
												'text-align': 'right'
											},
											width: 100,
											text: ViewUtil.getLabel('confirmDischargingLorryLoad')
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999999,
											selectOnFocus : true,
//											flex: 1,
											width:103,
											reference: 'ctlConfirmDischargingLoadQty',
											margin: '3 5 8 0',
											//readOnly : '{!directMode}',
											bind:'{theRRDetail.loadQty}',
											readOnly : true,
						                    listeners:{
//			                                	change: 'onQtyChange'
				        					}
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											width:103,
											maxValue: 999999.999,
											decimalPrecision: 3,
//											selectOnFocus : true,
//											flex: 1,
											reference: 'ctlConfirmDischargingLoadMt',
											margin: '3 5 8 0',
											readOnly : true,
											bind: '{theRRDetail.loadMt}',
						                    listeners:{
			                                	//change: 'onMtChange'
				        					}
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											readOnly : true,
											width:103,
//											flex: 1,
											reference: 'ctlConfirmDischargingLoadM3',
											margin: '3 5 8 0',
											//readOnly : '{!directMode}',
											bind:'{theRRDetail.loadM3}',
											listeners:{
												//change: 'onM3Change'
											}
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
													xtype: 'truckfield',
													reference: 'ctlConfirmDischargingLorryNo',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('confirmLoadingLorryNo'),
													params:{
														flag : false,
														readOnlyCgNo: true
													},
													bind :{
														value : '{theRRDetail.externalLorryNo}',
														lorryNo : '{theRRDetail.lorryNo}',
														vslCallId: '{theRRDetail.vslCallId}',
														blNo: '{theRRDetail.blNo}',
														searchDivCd : 'IN-GATE-RCV',
				            	   						weightCheckYn: '{theRRDetail.weightCheckYn}'
													}
												}
											]
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
											bind:'{theRRDetail.tsptr}',
											readOnly:true,
											hidden : true
										},
										
									]
								},{
									xtype: 'container',
//									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100
									},
									items: [
										{
		    								xtype: 'textfield',
		    							 	width: 275,
											labelWidth: 100,
		    								margin: '0 2 0 2',
		    							 	readOnly: true,
		    								fieldLabel: ViewUtil.getLabel('gateoperation.driverid'),
		    								bind:{
		    									value : '{theRRDetail.driverId}'
		    								},
		    								reference:'ctlDriverID',
		    							},
		    							{
		    								xtype: 'button',
		    								margin: '0 2 0 2',
		    			 					iconCls: 'x-fa fa-search',
		    			 					listeners: {
		    			 						click: 'openDriversPopup'
		    			 					}
		    							},
										{
											xtype: 'container'
										}
									]
								},
								{
									xtype: 'container',
									hidden : true,
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: '2 5 0 0',
											style: {
												'text-align': 'right'
											},
											width: 100,
											text: ViewUtil.getLabel('confirmLoadingRemark')
										},
										{
											xtype: 'textfield',
											flex: 2,
											maxLength: 50,
											enforceMaxLength : true
										}
									]
								}
		                    ]
		                },
//						{
//							xtype: 'container',
//							margin: '0 0 0 0',
//		                    flex: 1,
//						}
		            ]
		        }
			],
		    
		    dockedItems: [{
                xtype:'toolbar',
                dock : 'bottom',
                items : [{
						xtype: 'container',
						style: { "background-color":"white" },
						layout: {
							type: 'vbox',
							align:'center'
						},
						flex:1,
						items: [{
							xtype:'container',
							reference: 'ctlCtnConfirmDischargingBtn',
							layout: {
								type: 'hbox',
								align:'center'
						    },
						    items:[
								{
									xtype:'button',
									margin:'0 5 5 0',
									text: ViewUtil.getLabel('confirm'),
									reference:'btnOk',
									iconCls: 'fa fa-floppy-o',
									cls: 'search-button',                 	
									listeners:{
										click: 'onSave'
									}
								},{
									xtype:'button',
									text: ViewUtil.getLabel('cancel'),
									reference:'btnCancel',
									iconCls: 'fa fa-window-close',
									ui: 'delete-button',                 	
									listeners:{
										click: 'onCancel'
									}
								}
						    ]
						}
                    ]
					}
               	]
		    }]
		});
		
		me.callParent();
	}
});