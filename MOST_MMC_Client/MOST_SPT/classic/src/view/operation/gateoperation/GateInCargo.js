Ext.define('MOST.view.operation.GateInCargo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-gateincargo',
	requires: [
	],

	layout : {
        type  : 'vbox',
        align : 'stretch'
    },
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */	
	MAIN_GRID_REF_NAME: 'refGateInCargo',
	MAIN_STORE_NAME: 'gateInCargo',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [
                {	
                	xtype: 'fieldset',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                    	margin: '5 0 5 0'
                    },
                    items: [{

                        xtype: 'fieldset',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                        	margin: '5 0 5 0'
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
                                    margin: '5 5 0 5',
                                    labelAlign: 'right',
                                    labelWidth: 100,
                                },
                                items: [
                                	{
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                        },
           							 	width: 300,
                                        items: [
                                            {
                                                xtype: 'container',
                                                width: 30
                                            },
                                            {
                                                xtype: 'radiofield',
                                                reference: 'refGateInGCTruck',
                                                name: 'gateInGCRadio',
                                                inputValue: 'gateInGCTruckVal',
                                                width: 30,
                                                checked: true,
//                                                listeners: {
//                                                    change: 'onRadioEditableChange'
//                                                },
                                                hidden: true
                                            },
                                            {
                        	   					xtype:'truckfield',
                        	   					fieldLabel: ViewUtil.getLabel('gateoperation.truck'),
                                                labelWidth: 70,
                                                flex: 1,
                                                labelAlign: 'right',
                 								disabled: false,
                        	   					reference:'refGateInGCLorryField',
                        	   					bind :{ 
                        	   						value: '{gateInGC.lorryNo}',
                        	   						searchDivCd : 'ASSIGNMENT-TRUCK',
                        	   						isAutoLoad: 'false'
                        	   					}
                                            }
                                        ]
                                    },
                                    {
            							xtype: 'container',
                                        margin: '5 5 0 0',
            							 layout: {
            								 type: 'hbox',
            								 align: 'stretch'
            							 },
            							 items: [ 
                                             {
                                                xtype: 'radiofield',
                                                reference: 'refGateInGCDriver',
                                                name: 'gateInGCRadio',
                                                inputValue: 'gateInGCDriverVal',
                                                width: 20,
                                                margin: '5 0 5 0',
                                                /*
                                                listeners: {
                                                    change: 'onRadioEditableChange'
                                                },
                                                */
                                                hidden: true
                                             },
            								 {
                         	   					xtype:'textfield', //Driver
                         	   					fieldLabel: ViewUtil.getLabel('gateoperation.driverid'),
                                                labelWidth: 75,
                                                flex: 1,
                                                labelAlign: 'right',
                 								margin: '0 0 0 30',
                         	   					reference:'ctlGateInGCDriverIdField',
            								 	readOnly: true,
                         	   					bind :{ 
                         	   						value: '{gateInGC.driverId}'
                         	   					}
                                             },{
                 								xtype: 'button',
                 								margin: '0 0 0 5',
                 								disabled: true,
                         	   					reference:'ctlBtnDriverGCGIField',
                 			 					iconCls: 'x-fa fa-search',
                 			 					listeners: {
                 			 						click: 'openDriverIDPopup'
                 			 					},
                 			 					hidden: true
                 							},
            							 ]
            						},
            						{
                	   					xtype:'textfield', 
                	   					fieldLabel: ViewUtil.getLabel('gateoperation.gr'),
                	   					reference:'ctlGateInGCGrField',
                                        readOnly: true,
                	   					bind :{
                	   						value: '{gateInGC.grNo}'
                	   					}
                                    },
                                    {
                	   					xtype:'textfield',
                                        hidden: true,
                	   					fieldLabel: ViewUtil.getLabel('SDONo'),
                	   					reference:'ctlGateInGCSDOField',
                                        readOnly: true,
                	   					bind :{
                	   						value: '{gateInGC.sdoNo}'
                	   					}
                                    },
                                    {
                                        xtype:'textfield',
                                        fieldLabel: ViewUtil.getLabel('doNo'),
                                        reference:'ctlGateInGCDOField',
                                        readOnly: true,
                                        bind :{
                                            value: '{gateInGC.doNo}'
                                        }
                                    },
                                   {
                                        xtype: 'combo',
                                        reference: 'refGateInGateCombo',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.gate'),
                                        queryMode: 'local',
                                        bind: {
                                            store: '{gateComboList}'
                                        },
                                        editable: false,
                                        displayField: 'scdNm',
                                        valueField: 'scd',
                                        value : ''
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference: 'refGateInCommodity',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.commodity'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateInGC.cmdtNm}'
                                        }
                                    },
                                    {//To Location
                                        xtype: 'textareafield',
                                        reference: 'refGateInToLocation', 
                                        height: 70,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.tolocation'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateInGC.locId}'
                                        },
                                        maxLength: 500
                                    },
                                    {
                                        xtype: 'combo',
                                        hidden: true,
                                        reference: 'refDgCombo',
                                        fieldLabel: ViewUtil.getLabel('gateoperation'),
                                        queryMode: 'local',
                                        bind: {
                                            store: '{dgYnCombo}',
                                            editable: '{editableMode}',
                                            disabled: '{disabledMode}',
                                        },
                                        readOnly: true,
                                        displayField: 'label',
                                        valueField: 'data'
                                    },
                                    {
                                        xtype: 'combo',
                                        hidden: true,
                                        reference: 'refDgStatusCombo',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.dgstatus'),
                                        queryMode: 'local',
                                        bind: {
                                            store: '{dgStatusCombo}',
                                            editable: '{editableMode}',
                                            disabled: '{disabledMode}'
                                        },
                                        displayField: 'label',
                                        valueField: 'data'
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference: 'refGateInDriverName',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.drivername'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateInGC.driverNm}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                        },
                                        defaults: {
                                            labelAlign: 'right'
                                        }
                                        ,
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                reference: 'refGateInLicenseNo',
                                                flex: 1,
                                                labelWidth: 100,
                                                fieldLabel: ViewUtil.getLabel('gateoperation.licenseno'),
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{gateInGC.liscNo}'
                                                },
                                            },
                                            {
                                                xtype: 'textfield',
                                                reference: 'refGateInExpiryDate',
                                                flex: 1,
                                                fieldLabel: ViewUtil.getLabel('gateoperation.expirydate'),
                                                labelWidth: 60,
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{gateInGC.expdate}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                        },
                                        defaults: {
                                            labelAlign: 'right'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                reference: 'refGateInTransporter',
                                                fieldLabel: ViewUtil.getLabel('gateoperation.transporter'),
                                                width: 170,
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{gateInGC.tsptr}'
                                                },
                                            },
                                            {
                                                xtype: 'container',
                                                width: 5
                                            },
                                            {
                                                xtype: 'textfield',
                                                reference: 'refGateInTransporterName',
                                                flex: 1,
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{gateInGC.tsptCompNm}'
                                                },
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'datetimefield',
                                        reference:'refGateInDateTime',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.gateintime'),
                                        format:  MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                        anchor: '100%',
                                        editable: false
                                        
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                            },
                                            {
                                                xtype: 'button',
                                                width: 80,
                                                text: ViewUtil.getLabel('ok'),
                                                listeners: {
                                                    click: 'onOk'
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
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    margin: '5 5 0 5',
                                    labelAlign: 'right',
                                    //width: 300,
                                    labelWidth: 100,
                                },
                                items: [
                                    // {
                                    //     xtype: 'textfield',
                                    //     reference: 'refGateInCargoTxnNo',
                                    //     fieldLabel: ViewUtil.getLabel('gateoperation.txtno'),
                                    //     width: 300,
                                    //     bind: {
                                    //         readOnly: '{readOnlyMode}',
                                    //         value: '{gateInGC.gateTxnNo}'
                                    //     }
                                    // },
                                    {
                                        xtype: 'textfield',
                                        reference: 'refGateInCargoDMode',
                                        width: 200,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.dmode'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
            	    	   					value: '{gateInGC.delvTpNm}'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference: 'refGateInCargoCustomStatus',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.custom'),
                                        editable: false,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
            	    	   					value: '{gateInGC.customsReleaseStatus}'
                                        }
                                    },
                                    {
                                        xtype: 'numberfield',
                                        reference: 'refGateInCargoQty',
                                        maxValue: 9999999,
                                        minValue: 0,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.qty'),
                                        width: 130,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
            	    	   					value: '{gateInGC.pkgQty}'
                                        }
                                    },
                                    {
                                        xtype: 'numberfield',
                                        reference: 'refGateInCargoMt',
                                        maxValue: 999999.999,
                                        minValue: 0,
                                        decimalPrecision: 3,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.mt'),
                                        width: 200,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
            	    	   					value: '{gateInGC.wgt}'
                                        }
                                    },
                                    {
                                        xtype: 'numberfield',
                                        reference: 'refGateInCargoM3',
                                        maxValue: 999999.999,
                                        minValue: 0,
                                        decimalPrecision: 3,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.m3'),
                                        width: 200,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
            	    	   					value: '{gateInGC.msrmt}'
                                        }
                                    },{

                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                         	   					xtype:'textareafield', //WB Test
                         	   					fieldLabel: 'Weight Scale',
                                                labelWidth: 100,
                                                height: 70,
                                                maxLength: 500,
                                                labelAlign: 'right',
                         	   					reference:'refWBTest'
                                            },
                                            {

                 								xtype: 'button',
                 								margin: '0 0 0 5',
                         	   					reference:'ctlWBTest',
                 			 					iconCls: 'fa fa-balance-scale',
                 			 					listeners: {
                 			 						click: 'onWBConnect'
                 			 					}
                                            }
                                        ]
                                    
                                    },{},{}
                                ]
                            },
                        ]
                    },{
                    	xtype: 'fieldset',
                    	flex : 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '5 5 0 5',
                            labelAlign: 'right',
                            height: 750
                        },
                        items: [{
            				xtype: 'tsb-datagrid',
            				reference: me.MAIN_GRID_REF_NAME,
            				usePagingToolbar: false,
             				flex: 1,
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
            					cellclick: 'onGridGOREClick',
            				},
            				
            				columns: {
            					defaults: {
            						style : 'text-align:center',
            						align: 'center'
            					},
            					items: GridUtil.getGridColumns('GateInCargo')
            				}
                        }]
                    }]
                }
			]
		});
		me.callParent();
	}
});