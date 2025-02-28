Ext.define('MOST.view.operation.gateoperation.GateInRoRo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-gateinroro',
	requires: [
		
	],

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */	
	MAIN_GRID_REF_NAME: 'refGateInRoRo',
	MAIN_STORE_NAME: 'gateInForRoRo',
    RORO_UNIT_LIST_FOR_GATE_IN_GRID_REF_NAME: 'refRoRoUnitForGateInList',
    RORO_UNIT_LIST_FOR_GATE_IN_STORE_NAME: 'unitNoForGateInStore',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout : {type  : 'vbox', align : 'stretch'},

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
                        items: [{
                                xtype: 'container',
                                flex: 1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                margin: '5 0 0 20',
                                defaults: {
                                    margin: '5 5 0 5',
                                    labelAlign: 'right',
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        margin: '5 5 0 30',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                        },
                                        items: [
                                            {
                                                xtype: 'radiofield',
                                                reference: 'refGateInTruck',
                                                name: 'gateInRadio',
                                                inputValue: 'gateInTruckVal',
                                                checked: true,
                                                listeners: {
                                                    change: 'onRadioEditableChange'
                                                }
                                            },
                                            {
                        	   					xtype:'truckfield',
                        	   					fieldLabel: ViewUtil.getLabel('gateoperation.truck'),
                                                labelWidth: 57,
                                                flex: 1,
                                                labelAlign: 'right',
                 								disabled: false,
                        	   					reference:'refGateInRoRoLorryField',
                        	   					bind :{ 
                        	   						value: '{gateInRORO.lorryNo}',
                        	   						searchDivCd : 'ASSIGNMENT-TRUCK-RCV',
                        	   						isAutoLoad: 'false'
                        	   					}
                                            }
                                        ]
                                    },
                                    {
            							xtype: 'container',
                                        margin: '5 5 0 30',
            							 layout: {
            								 type: 'hbox',
            								 align: 'stretch'
            							 },
            							 items: [ 
                                             {
                                                 xtype: 'radiofield',
                                                 reference: 'refGateInDriver',
                                                 name: 'gateInRadio',
                                                 listeners: {
                                                     change: 'onRadioEditableChange'
                                                 }
                                             },
            								 {
                         	   					xtype:'textfield', //Driver
                         	   					fieldLabel: ViewUtil.getLabel('gateoperation.driverid'),
                                                labelWidth: 57,
                                                flex: 1,
                                                labelAlign: 'right',
                         	   					reference:'ctlGateInRoRoDriverIdField',
            								 	readOnly: true,
                         	   					bind :{ 
                         	   						value: '{theDriver.driverId}'
                         	   					}
                                             },{
                 								xtype: 'button',
                                                margin: '0 0 0 5',
                 								disabled: true,
                         	   					reference:'ctlBtnDriverROROGIField',
                 			 					iconCls: 'x-fa fa-search',
                 			 					listeners: {
                 			 						click: 'openDriverIDPopup'
                 			 					}
                 							},
            							 ]
            						},
                                    {
                	   					xtype:'textfield', 
                	   					fieldLabel: ViewUtil.getLabel('gateoperation.gr'),
                	   					reference:'ctlGateInRoRoGrField',
                                        readOnly: true,
                	   					bind :{
                	   						value: '{gateInRORO.grNo}'
                	   					}
                                    },
                                    {
                	   					xtype:'textfield',
                	   					fieldLabel: ViewUtil.getLabel('SDONo'),
                	   					reference:'ctlGateInRoRoSDOField',
                                        readOnly: true,
                	   					bind :{
                	   						value: '{gateInRORO.sdoNo}'
                	   					}
                                    },
                                   {
                                        xtype: 'combo',
                                        reference: 'ctlGateInRoRoGateCombo',
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

                                    	xtype:'textfield',
            							reference:'ctlTareWGT',
            							fieldLabel: 'Tare WGT.',
            							labelAlign: 'right',
            							fieldStyle: 'text-transform:uppercase',
                                        readOnly: true,
            							bind:{
            								value: '{gateInRORO.wgt}'
            							}
                                    
                                    },
                                    {//To Location
                                        xtype: 'textareafield',
                                        reference: 'txtGateInRoRoToLocation', 
                                        height: 70,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.tolocation'),
                                        readOnly: true,
                                        bind: {
                                        	value: '{gateInRORO.locId}'
                                        },
                                        maxLength: 500
                                    },
                                    {
                                        xtype: 'combo',
                                        hidden: true,
                                        reference: 'ctlDgRoRoCombo',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.dg'),
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
                                        reference: 'ctlDgRoRoStatusCombo',
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
                                        reference: 'txtGateInRoRoDriverName',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.drivername'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{theDriver.driverNm}'
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
                                                reference: 'txtGateInRoRoLicenseNo',
                                                flex: 1,
                                                labelWidth: 100,
                                                fieldLabel: ViewUtil.getLabel('gateoperation.licenseno'),
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{theDriver.licsNo}'
                                                },
                                            },
                                            {
                                                xtype: 'textfield',
                                                reference: 'txtGateInRoRoExpiryDate',
                                                flex: 1,
                                                fieldLabel: ViewUtil.getLabel('gateoperation.expirydate'),
                                                labelWidth: 60,
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{theDriver.licsExprYmd}'
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
                                                reference: 'txtGateInRoRoTransporter',
                                                fieldLabel: ViewUtil.getLabel('gateoperation.transporter'),
                                                flex: 1,
//                                                width: 170,
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{gateInRORO.tsptr}'
                                                },
                                            },
                                            {
                                                xtype: 'container',
                                                width: 5,
                                                hidden: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                reference: 'txtGateInTransporterName',
                                                flex: 1,
                                                hidden: true,
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{gateInRORO.driverLisence}'
                                                },
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'datetimefield',
                                        reference:'refGateInRoRoDateTime',
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
                                    {
                                        xtype: 'textfield',
                                        reference: 'refGateInRoRoTxtNo',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.txtno'),
                                        width: 300,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            //disabled: '{disabledMode}',
                                        }
                                    },
                                    {
                                    	xtype:'textfield',
            							reference:'refGateInRoRoVslCallId',
            							fieldLabel: ViewUtil.getLabel('vslschCallId'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{gateInRORO.vslCallId}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    {
                                    	xtype:'textfield',
            							reference:'refGateInRoRoVslName',
            							fieldLabel: ViewUtil.getLabel('VslNm'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{gateInRORO.vslNm}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    {
                                    	xtype:'textfield',
            							reference:'refGateInRoRoBLNo',
            							fieldLabel: ViewUtil.getLabel('blNo'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{gateInRORO.blNo}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    {
                                    	xtype:'textfield',
            							reference:'refGateInRoRoDoNo',
            							fieldLabel: ViewUtil.getLabel('doNo'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{gateInRORO.doNo}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    {
                                    	xtype:'textfield',
            							reference: 'refGateInRoRoCngShp',
            							fieldLabel: ViewUtil.getLabel('cngShp'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{gateInRORO.consignee}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    //sMantis: 0167331
                                    {
                                        xtype: 'container',
                                        reference: 'refGateInRoRoUnitNoList',
                                        flex: 1,
                                        layout: {
                                            type: 'hbox',
                                        },
                                        defaults: {
                                            abelAlign: 'right',
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                style: {
                                                    'text-align': 'right',
                                                    'vertical-align': 'middle'
                                                },
                                                text: 'Units No:',
                                                margin: '0 5 0 10',
                                                padding: '7 0 0 0',
                                                width: 90
                                            },
                                            {
                                                xtype: 'tsb-datagrid',
                                                reference: me.RORO_UNIT_LIST_FOR_GATE_IN_GRID_REF_NAME,
                                                usePagingToolbar: false,
                                                header: false,
                                                hideHeaders: true,
                                                disableSelection: true,
                                                height: 205,
                                                style: {
                                                    borderColor: '#d0d0d0', 
                                                    borderStyle: 'solid', 
                                                    borderWidth: 'thin',
                                                },
                                                flex: 1,
                                                bind: {
                                                    store: '{' + me.RORO_UNIT_LIST_FOR_GATE_IN_STORE_NAME +'}'
                                                },
                                                columns: {
                                                    defaults: {
                                                        style : 'text-align:left',
                                                        align: 'left'
                                                    },
                                                    items: GridUtil.getGridColumns('RoRoUnitNoForGateIn')
                                                }
                                            }
                                        ]
                                    }
                                    //eMantis: 0167331
                                ]
                            }
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
             				},listeners : {
            					cellclick: 'onGateInROROGridItemClick'
            				},
             				columns: {
             					defaults: {
             						style : 'text-align:center',
             						align: 'center'
             					},
             					items: GridUtil.getGridColumns('GateInRoRo')
             				}
     	                }]
                    }]
                }
			]
		});
		
		me.callParent();
	}
});