Ext.define('MOST.view.operation.gateoperation.GateOutRoRo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-gateoutroro',
	requires: [
		
	],

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */	
	MAIN_GRID_REF_NAME: 'refGateOutRoRoExGrid',
	MAIN_STORE_NAME: 'gateOutForRoRo',	
    RORO_UNIT_LIST_FOR_GATE_OUT_GRID_REF_NAME: 'refRoRoUnitForGateOutList',
    RORO_UNIT_LIST_FOR_GATE_OUT_STORE_NAME: 'unitNoForGateOutStore',	
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
                                        margin: '5 5 0 30',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                        },
           							 	width: 300,
                                        items: [
                                            {
                                                xtype: 'radiofield',
                                                reference: 'refGateOutTruck',
                                                name: 'gateOutRadio',
                                                inputValue: 'gateOutTruckVal',
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
                 								disabled: false,
                                                labelAlign: 'right',
                        	   					reference:'refGateOutRoRoLorryField',
                        	   					bind :{ 
                        	   						value: '{gateOutRORO.lorryNo}',
                        	   						searchDivCd : 'IN-GATE-RCV',
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
                                                 reference: 'refGateOutDriver',
                                                 name: 'gateOutRadio',
                                                 inputValue: 'gateOutDriverVal',
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
                         	   					reference:'refGateOutRoRoDriverIdField',
            								 	readOnly: true,
                         	   					bind :{ 
                         	   						value: '{theDriver.driverId}'
                         	   					}
                                             },{
                 								xtype: 'button',
                 								margin: '0 0 0 5',
                 								disabled: true,
                         	   					reference:'ctlBtnDriverROROGOField',
                 			 					iconCls: 'x-fa fa-search',
                 			 					listeners: {
                 			 						click: 'openDriverIDPopupForGateOut'
                 			 					}
                 							},
            							 ]
            						},
            						{
                	   					xtype:'textfield', 
                	   					fieldLabel: ViewUtil.getLabel('gateoperation.gr'),
                	   					reference:'refGateOutRoRoGrField',
                                        readOnly: true,
                	   					bind :{
                	   						value: '{gateOutRORO.grNo}'
                	   					}
                                    },
                                    {
                	   					xtype:'textfield',
                	   					fieldLabel: ViewUtil.getLabel('SDONo'),
                	   					reference:'refGateOutRoRoBldoField',
                                        readOnly: true,
                	   					bind :{
                	   						value: '{gateOutRORO.sdoNo}'
                	   					}
                                    },
                                    {
                                        xtype: 'combo',
                                        reference: 'refGateOutRoRoCombo',
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
            							reference:'refGateOutRoRoWGT',
            							fieldLabel: ViewUtil.getLabel('gateoperation.tareweight'),
            							labelAlign: 'right',
            							fieldStyle: 'text-transform:uppercase',
            							bind:{
            								value: '{gateOutRORO.wgt}'
            							}
                                    
                                    },{

                                    	xtype:'numberfield',
        								reference:'refGateOutRoRoGrossWGT',
        								fieldLabel: ViewUtil.getLabel('gateoperation.grossweoght'),
        								labelAlign: 'right',
        								fieldStyle: 'text-transform:uppercase',
        								minValue: 0,
        								maxValue: 999999999999.99,
        								decimalPrecision: 2,
        								bind: {
        		    	   					value: '{gateOutRORO.grossWGT}'
        		    	   				},
        		    	   				listeners: {
        	    							change:{
        	    								fn: 'calNetWGT'	    							
        	    							} 
        	    						}
                                    
                                    },
                                    {//To Location
                                        xtype: 'textareafield',
                                        reference: 'refGateOutRoRoToLocation', 
                                        fieldLabel: ViewUtil.getLabel('gateoperation.tolocation'),
                                        readOnly: true,
                                        bind: {
                                        	value: '{gateOutRORO.locId}'
                                        },
                                        maxLength: 500
                                    },
                                    {
                                        xtype: 'combo',
                                        hidden: true,
                                        reference: 'ctlDgCombo',
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
                                        reference: 'refGateOutRoRoStatusCombo',
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
                                        reference: 'refGateOutRoRoDriverName',
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
                                                reference: 'refGateOutRoRoLicenseNo',
                                                flex: 1,
                                                labelWidth: 100,
                                                readOnly: true,
                                                fieldLabel: ViewUtil.getLabel('gateoperation.licenseno'),
                                                bind: {
                                                    value: '{theDriver.licsNo}'
                                                },
                                            },
                                            {
                                                xtype: 'textfield',
                                                reference: 'refGateOutRoRoExpiryDate',
                                                flex: 1,
                                                readOnly: true,
                                                fieldLabel: ViewUtil.getLabel('gateoperation.expirydate'),
                                                labelWidth: 60,
                                                bind: {
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
                                                reference: 'refGateOutRoRoTransporter',
                                                fieldLabel: ViewUtil.getLabel('gateoperation.transporter'),
                                                width: 170,
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                    value: '{gateOutRORO.tsptr}'
                                                },
                                            },
                                            {
                                                xtype: 'container',
                                                width: 5
                                            },
                                            {
                                                xtype: 'textfield',
                                                reference: 'refGateOutRoRoTransporterName',
                                                flex: 1,
                                                bind: {
                                                    readOnly: '{readOnlyMode}',
                                                },
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'datetimefield',
                                        reference:'refGateOutRoRoDateTime',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.gateoutime'),
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
                                        reference: 'refGateOutRoRoTxnNo',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.txtno'),
                                        width: 300,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            //disabled: '{disabledMode}',
                                        }
                                    },
                                    {
                                    	xtype:'textfield',
            							reference:'refGateOutRoRoVSLCallID',
            							fieldLabel: ViewUtil.getLabel('vslschCallId'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{sdoInfo.vslCallId}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    {
                                    	xtype:'textfield',
            							reference:'refGateOutRoRoVSLName',
            							fieldLabel: ViewUtil.getLabel('VslNm'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{sdoInfo.vslNm}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    {
                                    	xtype:'textfield',
            							reference:'refGateOutRoRoBLNo',
            							fieldLabel: ViewUtil.getLabel('blNo'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{sdoInfo.blNo}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    {
                                    	xtype:'textfield',
            							reference:'refGateOutRoRoSNNo',
            							fieldLabel: ViewUtil.getLabel('doNo'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{sdoInfo.doNo}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    {
                                    	xtype:'textfield',
            							reference: 'refGateOutRoRocngShp',
            							fieldLabel: ViewUtil.getLabel('cngShp'),
            							labelAlign: 'right',
            							bind: {
            	    	   					value: '{sdoInfo.consignee}'
            	    	   				},
            	    	   				readOnly: true,
                                    },
                                    //sMantis: 0167331
                                    {
                                        xtype: 'container',
                                        reference: 'refGateOutRoRoUnitNoList',
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
                                                reference: me.RORO_UNIT_LIST_FOR_GATE_OUT_GRID_REF_NAME,
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
                                                    store: '{' + me.RORO_UNIT_LIST_FOR_GATE_OUT_STORE_NAME +'}'
                                                },
                                                columns: {
                                                    defaults: {
                                                        style : 'text-align:left',
                                                        align: 'left'
                                                    },
                                                    items: GridUtil.getGridColumns('RoRoUnitNoForGateOut')
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
                            labelAlign: 'right'
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
             					cellclick: 'onGateOutROROGridItemClick'
             				},
             				
             				columns: {
             					defaults: {
             						style : 'text-align:center',
             						align: 'center'
             					},
             					items: GridUtil.getGridColumns('GateOutRoRo')
             				}
     	                }]
                    }]
                }
			]
		});
		
		me.callParent();
	}
});

