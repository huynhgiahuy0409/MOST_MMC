Ext.define('MOST.view.operation.CargoHandlingOut', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-cargohandlingout',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	width:700,
	height: 570,
	scrollable: true,
	
	controller: 'cargohandlingout',
	
	viewModel: {
		type: 'cargohandlingout'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	defaults: {
        padding: '5 0 5 0',
        margin: '0 5 5 5',
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },
    
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
		            defaults: {
		                margin: '0 5 0 5',
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
		                    flex: 2,
		                    fieldLabel: ViewUtil.getLabel('confirmHandlingOutBlGr'),
		                    bind:'{theDetail.cgNo}',
		                    reference:'ctlBlGr',
		                    readOnly:true
		                },
		                {
		                    xtype: 'textfield',
		                    flex: 1,
		                    flex: 2,
		                    fieldLabel: ViewUtil.getLabel('confirmHandlingOutCargoClearanceStatus'),
		                    labelWidth: 160,
		                    bind:'{theDetail.custMode}',
		                    readOnly:true, 
		                    emptyText:'Hold'
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            defaults: {
		                margin: '0 5 0 5',
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
		                            flex: 3,
									reference:'startTimeConfirmHO',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
            	   					allowBlank:false,
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 2,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
		                            labelWidth: 80,
		                            queryMode: 'local',
		                            bind: {
		                            	// store: '{confirmHandlingOutForCargoTypeCombo}',
		                            	value: '{theDetail.cgTpCdNm}'
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
		                            flex: 3,
									reference:'endTimeConfirmHO',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                        },
		                        {//multicago
									xtype: 'checkboxfield',
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
		                            flex: 2,
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
		                                    	value : '{theDetail.lorryId}',
		            	   						lorryNo : '{theDetail.lorryId}',
		            	   						vslCallId: '{theDetail.vslCallId}',
		            	   						ptnrCd: '{theDetail.tsptr}',
		            	   						blNo: '{theDetail.cgNo}',
		            	   						isMultiCargo: '{theDetail.isMultiCargo}',
		            	   						searchDivCd : 'IN-GATE',
		            	   						weightCheckYn: '{theDetail.weightCheckYn}',
		            	   						searchDelvTp: 'I',
		            	   						isOpeChk: 'Y'
		            	   					},
		            	   					allowBlank:false
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'textfield',
		                            readOnly:true,
		                            flex: 2,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
		                            bind:'{theDetail.tsptr}'
		                        },
		                        {
		                            xtype: 'container'
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            defaults: {
		                margin: '0 5 0 5',
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
		                            bind:'{theDetail.docQty}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.docMt}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.docM3}'
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
		                            bind:'{theDetail.actQty}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.actMt}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.actM3}'
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
		                            bind:'{theDetail.qty}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.mt}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.m3}'
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
		                            bind:'{theDetail.balQty}'
		                        },
		                        {
		                            xtype: 'numberfield',
		                            readOnly:true,
		                            //minValue : 0,
		                        	maxValue: 999999999999.999,
		                        	decimalPrecision: 3,
		                            flex: 1,
		                            reference: 'ctlBalMt',
		                            bind:'{theDetail.balMt}'
		                        },
		                        {
		                            xtype: 'numberfield',
		                            readOnly:true,
		                           // minValue : 0,
		                        	maxValue: 999999999999.999,
		                        	decimalPrecision: 3,
		                            flex: 1,
		                            bind:'{theDetail.balM3}'
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
		                            bind:'{theDetail.loadQty}',
		                            reference: 'ctlLoadQty',
		                            listeners:{
	                                	change: 'onQtyChange'
		        					}
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999999999.999,
		                        	decimalPrecision: 3,
		                        	selectOnFocus : true,
		                            flex: 1,
		                            bind:'{theDetail.loadMt}',
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
		                            flex: 1,
		                            bind:'{theDetail.loadM3}',
		                            reference: 'ctlLoadM3',
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 3,
		                            items: [
		                                {
		                                    xtype: 'checkboxfield',
		                                    boxLabel: ViewUtil.getLabel('confirmHandlingOutFinalDelivery'),
		                                    bind: '{whFnlDelvYnChecked}'
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
		                            text: ViewUtil.getLabel('confirmLoadingLocation')
		                        },
		                        {
		                            xtype: 'textfield',
		                            reference: 'ctlConfirmHandlingOutLocId',
		                            flex: 1,
									readOnly: true,
		                            bind:'{theDetail.locId}',
		                            fieldLabel: ''
		                        },
		                        {
		                            xtype: 'button',
		                            flex: 1,
		                            text: ViewUtil.getLabel('confirmLoadingWhDeAllocation'),
		                            listeners: {
										click: {
											fn : 'onWarehouseAllocation',
											args : ['ctlConfirmHandlingOutLocId']
										}
									}
		                        },
		                        {
        		                    xtype: 'container',
        		                    flex: 2,
        		                    layout: {
				                        type: 'hbox',
				                        pack: 'end'
				                    },
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
        		                    items: [
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
		                            flex: 1.5,
		                            bind:'{theDetail.pkgNo}',
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
		                            xtype: 'cmmcdfield',
		                            reference:'ctlConfirmHandlingOutPacTypeCode',
		                            flex: 2,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingPkgType'),
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
		                },
						{
		                    xtype: 'container',
		                    defaults: {
								margin: '0 5 2 0',
								labelAlign: 'right',
								labelWidth: 100,
								flex: 1
							},
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
									xtype: 'eqfield',
									fieldLabel: ViewUtil.getLabel('confirmLoadingForklift'),
									reference:"ctlConfirmDischargingForklift",
									bind: {
										value: '{theDetail.forkNo}',
										eqCd: CodeConstants.MT_EQFCTPCD_FL
									},
								},
								{
									xtype: 'eqfield',
									labelWidth: 155,
									fieldLabel: ViewUtil.getLabel('confirmLoadingPrime'),
									reference:"ctlConfirmDischargingPrime",
									bind: {
										value: '{theDetail.primeNo}',
										eqCd: CodeConstants.MT_EQFCTPCD_PM
									},
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
		                            text: ViewUtil.getLabel('confirmLoadingRemark')
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 2,
		                            bind:'{theDetail.rmk}',
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