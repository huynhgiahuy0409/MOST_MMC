Ext.define('MOST.view.operation.CargoDischarging', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-cargodischarging',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	reference:'refCfDischargePopup',
	
	width: 820,
	height: 700,
	scrollable: true,
	
	controller: 'cargodischarging',
	
	viewModel: {
		type: 'cargodischarging'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	config: {
		recvData : null
	},

	layout : {type  : 'vbox', align : 'stretch'},

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
				                    bind:'{theDetail.vslCallId}',
				                    readOnly:true
				                },
				                {
				                    xtype: 'textfield',
				                    flex: 1.5,
				                    fieldLabel: ViewUtil.getLabel('confirmDischargingBlDo'),
				                    reference: 'ctlCgNo',
				                    readOnly:true,
				                    bind:'{theDetail.blNo}'
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
				                    bind:'{theDetail.vslNm}',
				                    readOnly:true
				                },
		                    	
				                {
				                    xtype: 'combobox',
				                    fieldLabel: ViewUtil.getLabel('deliveryMode'),
				                    flex: 1.5,
				                    queryMode: 'local',
				                    bind: {
				                    	store: '{confirmDischargingForDeliveryCombo}',
				                    	value: '{theDetail.delvTpCd}'
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
		                    reference:"ctlConfirmDischargingEquiptment",
		                    queryMode: 'local',
		                    bind: {
								store: '{deployedEquipmentNoList}',
								value: '{theDetail.eqNo}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
//                            allowBlank: false,
							listeners: {
								select: 'onSelectEquiptment'
							}
		                },
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								flex: 1,
								labelWidth: 100
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'combobox',
									reference:"ctlConfirmDischargingBBKHatchNo",
									fieldLabel: ViewUtil.getLabel('confirmLoadingHatchNo'),
									queryMode: 'local',
									bind: {
										store: '{confirmDischargingHatchCombo}',
										value: '{theDetail.hatchNo}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									forceSelection:true,
									flex: 6,
									margin: '0 3 0 0'
								},
								{
									xtype: 'combobox',
									reference:"ctlConfirmDischargingHatchDrt",
									queryMode: 'local',
									bind: {
										store: '{ctlConfirmDischargingHatchDrtCombo}',
										value: '{theDetail.hatchDrt}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									forceSelection:true,
									flex: 4
								}
							]
						},
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
		                            bind:'{theDetail.startDt}',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            allowBlank:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            reference: 'ctlConfirmLoadingShift',
		                            flex: 2,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingShift'),
		                            bind:'{theDetail.shftNm}',
		                            readOnly:true,
		                            allowBlank:false
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
		                            bind:'{theDetail.endDt}',
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
		                            	value: '{theDetail.tsptTpCd}'
		                            },
		                            displayField: 'scdNm',
		                            valueField: 'scd',
		                            forceSelection:true,
		                            allowBlank: false,
		                            emptyText: 'Select',
		                            listeners:{
		                            	select: 'onSelectModeOfOperation'
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
		                            	value: '{theDetail.custMode}'
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
				                    bind:'{theDetail.qty}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
				                    readOnly:true,
				                    bind:'{theDetail.mt}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
				                    readOnly:true,
				                    bind:'{theDetail.m3}'
		                        },
		                        {
		                            xtype: 'combobox',
		                            flex: 2,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
		                            queryMode: 'local',
		                            reference: 'refCargoType',
		                            bind: {
		                            	store: '{confirmDischargingForCargoTypeCombo}',
		                            	value: '{theDetail.cgTpCd}'
		                            },
		                            forceSelection:true,
		                            readOnly:true,
		                            displayField: 'scdNm',
		                            valueField: 'scd',
		                            listeners:{
			    						change: 'onCargoTypeChange'
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
		                            text: ViewUtil.getLabel('confirmDischargingBalance')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'refBalanceQty',
		                        	//minValue : 0,
		                        	maxValue: 999999.999,
		                            flex: 1,
		                            bind:'{theDetail.balQty}',
		                            readOnly:true
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	//minValue : 0,
		                        	reference: 'refBalanceMT',
		                        	maxValue: 999999.999,
									decimalPrecision: 3,
		                            flex: 1,
		                            bind:'{theDetail.balMt}',
		                            readOnly:true
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'refBalanceM3',
		                        	//minValue : 0,
		                        	maxValue: 999999.999,
									decimalPrecision: 3,
		                            flex: 1,
		                            bind:'{theDetail.balM3}',
		                            readOnly:true
		                        },
		                        {
		                            xtype: 'checkboxfield',
		                            reference:'ctlConfirmDischargingFinal',
		                            flex: 2,
		                            boxLabel: ViewUtil.getLabel('confirmDischargingFinalDischarging'),
		                            bind:'{theDetail.fnlOpeYn}'		                            
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
		                            	value : '{theDetail.pkgNo}',
		                            	vslCallId: '{theDetail.vslCallId}',
		                            	blNo: '{theDetail.blNo}',
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
		                            	value : '{theDetail.rePkgTpCd}'
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
				                    	value : '{theDetail.iqty}'
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
				                    	value : '{theDetail.imt}'
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
				                    bind:'{theDetail.im3}'
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
				                    	value : '{theDetail.eqFacNo}',
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
				                    	value : '{theDetail.whQty}'
				                    },
				                    listeners:{
	                                	change: 'onQtyChange'
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
				                    	value : '{theDetail.whWgt}'
				                    },
				                    listeners:{
	                                	change: 'onMtChange'
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
				                    	value : '{theDetail.whM3}'
				                    },
				                    listeners:{
	                                	change: 'onM3Change'
		        					}
		                        },
		                        {
									xtype: 'truckfield',
									reference: 'txtInternalTruckNo',
									fieldLabel: ViewUtil.getLabel('lorryNo'),
									flex: 4,
									labelWidth: 120,
									labelAlign: 'right',
									bind: {
										value: '{theDetail.vaLorryNo}',
										vslCallId: '{theDetail.vslCallId}',
										blNo: '{theDetail.blNo}',
										cgTpCd: '{theDetail.cgTpCd}',
										searchDivCd : 'YT',
            	   						weightCheckYn: '{theDetail.weightCheckYn}'
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
									bind:'{theDetail.rmk}',
									maxLength: 50,
									enforceMaxLength : true
								}
							]
						},
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    hidden : true,
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
		                            text: ViewUtil.getLabel('confirmLoadingLocation')
		                        },
		                        {
		                            xtype: 'textfield',
		                            reference: 'ctlConfirmHandlingInLocId',
		                            margin: '0 5 0 5',
		                            flex: 2,
				                    readOnly:false,
				                    bind:{
				                    	value : '{theDetail.locId}'
				                    }
		                        },
		                        {
		                            xtype: 'button',
		                            flex: 1,
		                            text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
		                            margin: '0 0 0 0',
		                            bind:{
		                            	disabled : '{directMode}'
		                            },
		                            listeners: {
										click: {
											fn : 'onWarehouseAllocation',
											args : ['ctlConfirmHandlingInLocId']
										}
									}
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 4
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    hidden : true,
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
		                            text: ViewUtil.getLabel('confirmLoadingDamage')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlConfirmDischargingDmgMt',
		                        	minValue : 0,
		                        	maxValue: 999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
		                            bind:{
				                    	value : '{theDetail.dmgWgt}',
				                    	readOnly : '{directMode}'
				                    }
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlConfirmDischargingDmgM3',
		                        	minValue : 0,
		                        	maxValue: 999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
		                            bind:{
				                    	value : '{theDetail.dmgM3}',
				                    	readOnly : '{directMode}'
				                    }
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlConfirmDischargingDmgQty',
		                        	minValue : 0,
		                        	maxValue: 999999999,
		                        	selectOnFocus : true,
		                            flex: 1,
		                            bind:{
				                    	value : '{theDetail.dmgQty}',
				                    	readOnly : '{directMode}'
				                    }
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 4
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    hidden : true,
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
		                            text: ViewUtil.getLabel('confirmLoadingLocation')
		                        },
		                        {
		                            xtype: 'textfield',
		                            margin: '0 5 0 5',
		                            reference: 'ctlConfirmHandlingInDmgLocId',
		                            flex: 2,
				                    readOnly:false,
		                            bind:{
				                    	value : '{theDetail.dmgLocId}'
				                    }
		                        },
		                        {
		                            xtype: 'button',
		                            reference: 'ctlConfirmDischargingWhAllocation',
		                            flex: 1,
		                            margin: '0 0 0 0',
		                            text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
		                            bind:{
		                            	disabled : '{directMode}'
		                            },
		                            listeners: {
										click: {
											fn : 'onWarehouseAllocation',
											args : ['ctlConfirmHandlingInDmgLocId']
										}
									}
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 4
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
											reference: 'ctlNormalLabel',
											style: {
												'text-align': 'right'
											},
											width: 100,
											text: ViewUtil.getLabel('confirmDischargingDirectDocAmt')
										},
										{
											xtype: 'label',
											margin: '2 5 0 0',
											reference: 'ctlPiplineLabel',
											style: {
												'text-align': 'right'
											},
											width: 100,
											text: ViewUtil.getLabel('confirmDischargingDirectPiplineAmt'),
											hidden: true
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999999,
											reference: 'ctlDirectQty',
											selectOnFocus : true,
											flex: 1,
											readOnly:true,
											margin: '0 5 0 0',
											bind:'{theDetail.dqty}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											reference: 'ctlDirectMt',
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											readOnly:true,
											bind:'{theDetail.dmt}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											reference: 'ctlDirectM3',
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											readOnly:true,
											bind:'{theDetail.dm3}'
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
											flex: 1,
											reference: 'ctlConfirmDischargingLoadQty',
											margin: '0 5 0 0',
											//readOnly : '{!directMode}',
											bind:'{theDetail.loadQty}',
						                    listeners:{
			                                	change: 'onQtyChange'
				        					}
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											reference: 'ctlConfirmDischargingLoadMt',
											margin: '0 5 0 0',
											//readOnly : '{!directMode}',
											bind: '{theDetail.loadMt}',
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
											flex: 1,
											reference: 'ctlConfirmDischargingLoadM3',
											margin: '0 5 0 0',
											//readOnly : '{!directMode}',
											bind:'{theDetail.loadM3}',
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
														value : '{theDetail.externalLorryNo}',
														lorryNo : '{theDetail.lorryNo}',
														vslCallId: '{theDetail.vslCallId}',
														blNo: '{theDetail.blNo}',
														searchDivCd : 'IN-GATE',
				            	   						weightCheckYn: '{theDetail.weightCheckYn}',
				            	   						searchDelvTp: 'D',
				            	   						isOpeChk: 'Y'
													}
												}
											]
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
											bind:'{theDetail.tsptr}',
											readOnly:true,
											hidden : true
										},
										
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
						{
							xtype: 'container',
							margin: '0 0 0 0',
		                    flex: 1,
						},
		                
						//Apron to Gate >> remove out of ADP
						{
                            xtype: 'container',
		                    flex: 1,
							hidden: true,
							disabled: true,
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
											reference:'ctlApronOperation',
											flex: 1,
											boxLabel: ViewUtil.getLabel('confirmDischargingApronToGate'),
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
											text: ViewUtil.getLabel('confirmDischargingApronBalAmt')
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											reference: 'ctlConfirmDischargingAQty',
											maxValue: 999999999,
											selectOnFocus : true,
											flex: 1,
											readOnly:true,
											margin: '0 5 0 0',
											bind:'{theDetail.aqty}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											reference: 'ctlConfirmDischargingAMt',
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											readOnly:true,
											margin: '0 5 0 0',
											bind:'{theDetail.amt}'
										},
										{
											xtype : 'numberfield',
											reference: 'ctlConfirmDischargingAM3',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											readOnly:true,
											margin: '0 5 0 0',
											bind:'{theDetail.am3}'
										}
									]
								},{

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
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlConfirmDischargingAprQty',
											//readOnly : '{!apronMode}',
											bind:{
												value : '{theDetail.aprQty}',
											
											},
											listeners:{
			                                	change: 'onQtyChange'
				        					}
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlConfirmDischargingAprMt',
											bind:{
												value : '{theDetail.aprMt}',
											},
						                    listeners:{
			                                	change: 'onMtChange'
				        					}
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlConfirmDischargingAprM3',
											bind:{
												value : '{theDetail.aprM3}',
											},
											listeners:{
												change: 'onM3Change'
											}
										}
									]
								},{
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
											bind:'{theDetail.rmk}',
											maxLength: 50,
											enforceMaxLength : true
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
													reference: 'ctlConfirmDischargingApronLorryNo',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('confirmLoadingLorryNo'),
													params:{
														flag : false
													},
													bind :{
														value : '{theDetail.externaLorryNo}',
														lorryNo : '{theDetail.lorryNo}',
														vslCallId: '{theDetail.vslCallId}',
														blNo: '{theDetail.blNo}',
														searchDivCd: 'IN-GATE',
				            	   						weightCheckYn: '{theDetail.weightCheckYn}'
													}
												}
											]
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
											bind:'{theDetail.tsptr}',
											readOnly:true,
											hidden: true
										}
									]
								},
								{
									xtype: 'container',
									flex: 1,
									hidden: true,
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
		                }
		            ]
		        },
		        
//		        Barge operation
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
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		            	//Vessel to Barge
		                {
                            xtype: 'container',
                            reference:'refCtnBargeOperationVB',
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
											reference:'ctlBargeOperationVB',
											flex: 1,
											boxLabel: ViewUtil.getLabel('vesselToBarge'),
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
											bind:'{theDetail.dqty}'
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
											bind:'{theDetail.dmt}'
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
											bind:'{theDetail.dm3}'
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
//										{
//											xtype: 'label',
//											margin: '2 5 0 0',
//											style: {
//												'text-align': 'right'
//											},
//											width: 100,
//											text: ViewUtil.getLabel('confirmDischargingLorryLoad')
//										},
										{
        		                            xtype: 'button',
        		                            ui: 'delete-button',
        		                            iconCls: 'x-fa fa-refresh',
        		                            reference: 'btnHsFetch',
        		                            width: 100,
        		                            margin: '2 5 0 0',
        		                            text: ViewUtil.getLabel('scaleAmt'),
        		                            listeners: {
        		    							click:'onHangingScaleFetch_clickHandler'
        		    						}
        		                        },
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999999,
											selectOnFocus : true,
											flex: 1,
											reference: 'ctlConfirmDischargingVslBargeQty',
											margin: '0 5 0 0',
											bind:{
												value : '{theDetail.vbQty}'
											},
						                    listeners:{
						                    	//Comment because it should get from Hangingscale
			                                	change: 'onQtyChange'
				        					}
										},				
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											reference: 'ctlConfirmDischargingVslBargeMt',
											margin: '0 5 0 0',
											bind:{
												value : '{theDetail.vbMt}'
											},
						                    listeners:{
				        					}
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											reference: 'ctlConfirmDischargingVslBargeM3',
											margin: '0 5 0 0',
											bind:{
												value : '{theDetail.vbM3}'
											},
											listeners:{
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
													xtype: 'bargefield',
													reference: 'ctlBargeNoVB',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('bargeNo'),
													bind :{
														value : '{theDetail.bargeNoOfVslBarge}',
														vslCallId: '{theDetail.vslCallId}',
													}
												}
											]
										}
										
									]
								},
								{
									xtype: 'container',
									flex: 1
								}
		                    ]
		                },
		                
		                //Apron to Barge
		                {

                            xtype: 'container',
                            reference:'refCtnBargeOperationAB',
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
											reference:'ctlBargeOperationAB',
											flex: 1,
											boxLabel: ViewUtil.getLabel('apronToBarge'),
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
											text: ViewUtil.getLabel('confirmDischargingApronBalAmt')
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											reference: 'ctlConfirmDischargingAQty',
											maxValue: 999999999,
											selectOnFocus : true,
											flex: 1,
											readOnly:true,
											margin: '0 5 0 0',
											bind:'{theDetail.aqty}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											reference: 'ctlConfirmDischargingAMt',
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											readOnly:true,
											margin: '0 5 0 0',
											bind:'{theDetail.amt}'
										},
										{
											xtype : 'numberfield',
											reference: 'ctlConfirmDischargingAM3',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											readOnly:true,
											margin: '0 5 0 0',
											bind:'{theDetail.am3}'
										}
									]
								},{

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
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlConfirmDischargingAprBargeQty',
											bind:{
												value : '{theDetail.aprQty}',
											
											},
											listeners:{
			                                	change: 'onQtyChange'
				        					}
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlConfirmDischargingAprBargeMt',
											bind:{
												value : '{theDetail.aprMt}',
											},
						                    listeners:{
			                                	change: 'onMtChange'
				        					}
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlConfirmDischargingAprBargeM3',
											bind:{
												value : '{theDetail.aprM3}',
											},
											listeners:{
												change: 'onM3Change'
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
													xtype: 'bargefield',
													reference: 'ctlBargeNoAB',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('bargeNo'),
													bind :{
														value : '{theDetail.bargeNoOfAprBarge}',
														vslCallId: '{theDetail.vslCallId}',
														searchType: 'I'
													}
												}
											]
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
													reference: 'txtABTruckNo',
													fieldLabel: ViewUtil.getLabel('lorryNo'),
													flex: 1,
													bind: {
														value: '{theDetail.abLorryNo}',
														vslCallId: '{theDetail.vslCallId}',
														blNo: '{theDetail.blNo}',
														searchDivCd : 'APRON',
				            	   						weightCheckYn: '{theDetail.weightCheckYn}'
													},
												},
											]
										}
									]
								},
								
		                    ]
		                }
		            ]
		        },
		        
//		        Non-Manifested
		        {
		            xtype: 'fieldset',
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
		                    flex: 1,
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
		                            text: ViewUtil.getLabel('confirmdischarging_non_manifested')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlConfirmDischargingNonQty',
		                        	minValue : 0,
		                        	maxValue: 999999999,
		                        	selectOnFocus : true,
		                            flex: 1,
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999.999,
		                        	reference: 'ctlConfirmDischargingNonMt',
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlConfirmDischargingNonM3',
		                        	minValue : 0,
		                        	maxValue: 999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 4
		                        },
		                        {
		                            xtype: 'button',
		                            reference: 'btnDamage',
		                            text: ViewUtil.getLabel('damageCheck'),
		                            listeners: {
		    							click:'onDamage_clickHandler'
		    						}
		                        },
		                        {
		                            xtype: 'button',
		                            reference: 'btnDimension',
		                            text: ViewUtil.getLabel('dimensionCheck'),
		                            listeners: {
		    							click:'onDimension_clickHandler'
		    						}
		                        },
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
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingLocation')
		                        },
		                        {
		                            xtype: 'textfield',
		                            reference: 'ctlConfirmHandlingInLocId',
		                            margin: '0 5 0 5',
		                            flex: 2,
				                    readOnly:false,
		                        },
		                        {
		                            xtype: 'button',
		                            flex: 1,
		                            text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
		                            margin: '0 0 0 0',
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 4
		                        }
		                    ]
		                }
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