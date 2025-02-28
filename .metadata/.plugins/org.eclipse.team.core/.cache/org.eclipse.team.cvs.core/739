Ext.define('MOST.view.operation.ConfirmHandlingOutOfRORO', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-confirmhandlingoutofroro',
	
	requires: [
		'MOST.view.operation.ConfirmHandlingOutOfROROModel',
		'MOST.view.operation.ConfirmHandlingOutOfROROController',
		'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	controller: 'confirmhandlingoutofroro',
	
	viewModel: {
		type: 'confirmhandlingoutofroro'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
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
				{
		            xtype: 'fieldset',
					padding: '15 15 15 0',
					margin: '0 0 0 -10',
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
							labelWidth: 100,
		                    flex: 1,
		                    fieldLabel: ViewUtil.getLabel('confirmHandlingOutBlGr'),
		                    bind:'{theRRDetail.cgNo}',
		                    reference:'ctlBlGr',
		                    readOnly:true
		                },
		                {
		                    xtype: 'textfield',
		                    flex: 1,
		                    fieldLabel: ViewUtil.getLabel('confirmHandlingOutCargoClearanceStatus'),
		                    labelWidth: 180,
		                    bind:'{theRRDetail.custMode}',
		                    readOnly:true, 
		                    emptyText:'Hold'
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
					padding: '15 15 5 5',
					margin: '0 0 0 -15',
		            defaults: {
		                labelAlign: 'right',
		                layout: {
		                    type: 'hbox',
		                    align: 'stretch'
		                },
		                defaults: {
		                    margin: '0 5 5 0',
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingStartDateTime')
		                        },
		                        {
		                            xtype: 'datetimefield',
		                            flex: 1,
									reference:'startTimeConfirmHO',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
            	   					allowBlank:false,
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
		                            labelWidth: 80,
		                            queryMode: 'local',
									margin: '0 0 5 0',
		                            bind: {
		                            	// store: '{confirmHandlingOutForCargoTypeCombo}',
		                            	value: '{theRRDetail.cgTpCdNm}'
		                            },
									readOnly: true,
		                            reference: 'refCargoType'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    items: [
		                        {
		                            xtype: 'label',
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingEndDateTime')
		                        },
		                        {
		                            xtype: 'datetimefield',
		                            flex: 1,
									reference:'endTimeConfirmHO',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                        },
		                        {//multicago
									xtype: 'container',
									flex: 1,
									margin: '0 0 5 0',
								},
		                        {//multicago
									xtype: 'checkboxfield',
									hidden:true,
									flex: 2,
									margin: '0 0 0 10',
									reference: 'ctlChkMultipleCargo',
									boxLabel: ViewUtil.getLabel('multipleCargo'),
									bind: '{isMultiCargoCheck}'
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingLorryNo')
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
		                                    xtype: 'truckfield',
		                                    reference: 'ctlHOLorryNo',
		                                    flex: 1,
		                                    bind :{
		                                    	value : '{theRRDetail.lorryId}',
		            	   						lorryNo : '{theRRDetail.lorryId}',
		            	   						vslCallId: '{theRRDetail.vslCallId}',
		            	   						ptnrCd: '{theRRDetail.tsptr}',
		            	   						blNo: '{theRRDetail.cgNo}',
		            	   						isMultiCargo: '{theRRDetail.isMultiCargo}',
		            	   						searchDivCd : 'IN-GATE-RCV',
		            	   						weightCheckYn: '{theRRDetail.weightCheckYn}'
		            	   					},
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'textfield',
		                            readOnly:true,
		                            flex: 1,
									labelWidth: 80,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
		                            bind:'{theRRDetail.tsptCompCd}',
									margin: '0 0 5 0',
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('gateoperation.driverid'),
		                        },
		                    	{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'textfield',
											readOnly: true,
											flex: 1,
											bind:{
												value : '{theRRDetail.driverId}'
											},
											reference:'ctlDriverID',
										},
										{
											xtype: 'button',
											iconCls: 'x-fa fa-search',
											margin: '0 0 0 5',
											listeners: {
												click: 'openDriversPopup'
											}
										},
									]
								},
								{
									xtype: 'container',
									flex: 1,
									margin: 0
								},
		                        {
		                            xtype: 'textfield',
		                            readOnly:true,
		                            hidden: true,
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
					padding: '10 10 10 5',
		            defaults: {
		                margin: '0 0 0 -15',
		                labelAlign: 'right',
		                defaults: {
		                    margin: '0 5 5 0',
		                    labelAlign: 'right',
		                    labelWidth: 100,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    }
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
		                    items: [
		                        {
		                            xtype: 'container',
		                            width: 100
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'Qty'
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'MT'
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'M3'
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 3
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmDischargingDocAmt')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.docQty}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.docMt}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.docM3}'
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 3
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingActualAmt')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.actQty}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.actMt}',
		                            decimalPrecision: 3
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.actM3}',
		                            decimalPrecision: 3
		                        },
		                        
		                        {
		                            xtype: 'container',
		                            flex: 3
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmHandlingOutNormalAmt')
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.qty}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.mt}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theRRDetail.m3}'
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 3
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmHandlingOutWhBalance')
		                        },
		                        {
		                            xtype: 'numberfield',
		                            readOnly:true,
		                            //minValue : 0,
		                        	maxValue: 999999999,
		                        	reference: 'ctlBalQty',
		                            flex: 1,
		                            bind:'{theRRDetail.balQty}'
		                        },
		                        {
		                            xtype: 'numberfield',
		                            readOnly:true,
		                            //minValue : 0,
		                        	maxValue: 999999999999.999,
		                        	decimalPrecision: 3,
		                            flex: 1,
		                            reference: 'ctlBalMt',
		                            bind:'{theRRDetail.balMt}'
		                        },
		                        {
		                            xtype: 'numberfield',
		                            readOnly:true,
		                           // minValue : 0,
		                        	maxValue: 999999999999.999,
		                        	decimalPrecision: 3,
		                            flex: 1,
		                            bind:'{theRRDetail.balM3}'
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 3
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
		                            margin: '5 5 0 0',
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
		                            bind:'{theRRDetail.loadQty}',
		                            reference: 'ctlLoadQty',
		                            readOnly: true,
		                            listeners:{
//	                                	change: 'onQtyChange'
		        					}
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                        	readOnly: true,
		                            flex: 1,
		                            bind:'{theRRDetail.loadMt}',
		                            reference: 'ctlLoadMt',
		                            listeners:{
	                                	//change: 'onMtChange'
		        					}
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                        	readOnly: true,
		                            flex: 1,
		                            bind:'{theRRDetail.loadM3}',
		                            reference: 'ctlLoadM3',
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 3,
//                                    hidden:true,
//		                            items: [
//		                                {
//		                                    xtype: 'checkboxfield',
//		                                    boxLabel: ViewUtil.getLabel('confirmHandlingOutFinalDelivery'),
//		                                    bind: '{whFnlDelvYnChecked}'
//		                                }
//		                            ]
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingLocation')
		                        },
		                        {
		                            xtype: 'textfield',
		                            reference: 'ctlConfirmHandlingOutLocId',
									readOnly: true,
		                            bind:'{theRRDetail.locId}',
									flex: 2
		                        },
		                        {
		                            xtype: 'button',
		                            text: ViewUtil.getLabel('confirmLoadingWhDeAllocation'),
									flex: 1,
		                            listeners: {
										click: {
											fn : 'onWarehouseAllocation',
											args : ['ctlConfirmHandlingOutLocId']
										}
									}
		                        },
		                        {
        		                    xtype: 'container',
									flex: 3,
        		                    layout: {
				                        type: 'hbox',
				                    },
				                    defaults: {
					                    margin: '0 0 0 0',
					                    labelAlign: 'right',
					                    labelWidth: 100
					                },
        		                    items: [
        		                    	{
                     	   					xtype:'textfield', //Display list of vin
                     	   					fieldLabel: ViewUtil.getLabel('unitNo'),
											flex: 1,
                                            labelWidth: 73,
                                            labelAlign: 'right',
                     	   					reference:'ctlUnitNoSearchField',
                     	   					readOnly:true,
        				                    bind:{
        				                    	value : '{theRRDetail.unitNo}'
        				                    }
                                         },{
             								xtype: 'button',
											 margin: '0 0 0 5',
             								disabled: false,
                     	   					reference:'ctlBtnUnitNoSearchField',
             			 					iconCls: 'x-fa fa-search',
             			 					listeners: {
             			 						click: 'openUnitListPopup'
             			 					}
             							}
        		                    ]
                                
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingPackageNo')
		                        },
		                        {
		                            xtype: 'textfield',
		                            reference: 'cltPkgNo',
		                            flex: 2,
		                            bind:'{theRRDetail.pkgNo}',
			    					fieldStyle: 'text-transform:uppercase',
			    					listeners:{
			    						change: 'onUpperCase'
			    					},
		                            maxLength: 60,
		                            enforceMaxLength : true,
		                            editable: false
		                        },
		                        {
		                            xtype: 'button',
		                            reference: 'btnPackageNo',
		                            flex: 0.5,
		                            iconCls: 'x-fa fa-search',
				 					listeners: {
				 						click: 'onOpenPkgNoPopup'
				 					}
		                        },
								{
									xtype: 'container',
									flex: 2.5,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: '5 5 0 0',
											style: {
												'text-align': 'right'
											},
											width: 74,
											text: ViewUtil.getLabel('confirmLoadingPkgType'),
										},
										{
											xtype: 'cmmcdfield',
											flex: 1,
											reference:'ctlConfirmHandlingOutPacTypeCode',
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
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'right'
		                            },
		                            width: 100,
		                            text: ViewUtil.getLabel('confirmLoadingRemark')
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 2,
		                            bind:'{theRRDetail.rmk}',
			    					fieldStyle: 'text-transform:uppercase',
			    					listeners:{
			    						change: 'onUpperCase'
			    					},
		                            maxLength: 50,
		                            enforceMaxLength : true
		                        }
		                    ]
		                }
		            ]
		        },{
					xtype:'container',
					layout:{
						type:'hbox',
						pack:'center'
					},
					
					margin:'0 5 5 5',
					items:[{
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
					}]
				}
			],
		    
		    dockedItems: [
		    	
		    ]
		});
		
		me.callParent();
	}
});