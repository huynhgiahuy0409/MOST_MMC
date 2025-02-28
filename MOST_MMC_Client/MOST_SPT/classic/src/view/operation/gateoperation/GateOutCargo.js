Ext.define('MOST.view.operation.GateOutCargo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-gateoutcargo',
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
	MAIN_GRID_REF_NAME: 'refGateOutCargo',
	MAIN_STORE_NAME: 'gateOutCargo',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
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
                            items: [{
        	   					xtype:'truckfield',
        	   					fieldLabel: ViewUtil.getLabel('gateoperation.truck'),
        	   					reference:'ctlGateOutLorryField',
        	   					bind :{ 
        	   						//vslCallId: '{gateOutLorry.vslCallId}',
        	   						//shipgNoteNo: '{gateOutLorry.shipgNoteNo}',
        	   						//lorryNo: '{gateOutLorry.lorryNo}',
        	   						value: '{gateOutLorry.lorryNo}',
        	   						searchDivCd : 'IN-GATE',
        	   						isAutoLoad: 'false',
        	   						searchType: 'GO'
        	   					}
                            },{
                            	xtype:'textfield',
        	   					fieldLabel: ViewUtil.getLabel('gateoperation.driverid'),
        	   					reference:'ctlGateOutDriverIdField',
        	   					bind :{
                                    value: '{gateOutLorry.driverId}'
                                },
                                readOnly: true	
                            },{
                            	 xtype:'textfield',
                                 fieldLabel: ViewUtil.getLabel('gateTicketNo'),
                                 reference:'ctlGateOutTicketNoField',
                                 bind :{
                                     value: '{gateOutLorry.gateTxnNo}'
                                 },
                                 readOnly: true
                            },{
                            	xtype: 'textfield',
                                reference:'refGiOfGateOutDateTimeLink',
                                editable: false,
                                readOnly: true,
                                fieldLabel: ViewUtil.getLabel('gateoperation.gateintime'),
                                format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                anchor: '100%',
                                bind: {
                                    readOnly: '{readOnlyMode}',
                                    value: '{gateOutLorry.gateInDt}'
                                }
                            },{ 
                            	xtype: 'combo',
                                reference: 'ctlGateOutGateCombo',
                                fieldLabel: ViewUtil.getLabel('gateoperation.gate'),
                                queryMode: 'local',
                                bind: {
                                    store: '{gateComboList}'
                                    },
                                editable: false,
                                    displayField: 'scdNm',
                                    valueField: 'scd',
                                    value : 'scd'
                                    	
                            },{
                            	xtype: 'textfield',
                                reference: 'txtGateOutCommodity',
                                fieldLabel: ViewUtil.getLabel('gateoperation.commodity'),
                                bind: {
                                    readOnly: '{readOnlyMode}',
                                    value: '{gateOutLorry.cmdtNm}'
                                }
                            
                            },{
                            	xtype: 'textfield',
                                reference: 'txtGateOutDriverName',
                                fieldLabel: ViewUtil.getLabel('gateoperation.drivername'),
                                bind: {
                                    readOnly: '{readOnlyMode}',
                                    value: '{gateOutLorry.driverNm}'
                                }
                            },{

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
                                        reference: 'txtGateOutLicenseNo',
                                        flex: 1,
                                        labelWidth: 100,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.licenseno'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateOutLorry.liscNo}'
                                           },
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference: 'txtGateOutExpiryDate',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.expirydate'),
                                        flex: 1,
                                        labelWidth: 60,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateOutLorry.expdate}'
                                        }
                                    }
                                ]
                            
                            },{

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
                                        reference: 'txtGateOutTransporter',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.transporter'),
                                        width: 170,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateOutLorry.tsptr}'
                                        },
                                    },
                                    {
                                        xtype: 'container',
                                        width: 5
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference: 'txtGateOutTransporterName',
                                        flex: 1,
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateOutLorry.tsptCompNm}'
                                        }
                                    }
                                ]
                            },{

                                xtype: 'datetimefield',
                                reference:'refGateOutDateTime',
                                fieldLabel: ViewUtil.getLabel('gateoperation.gateoutime'),
                                format:  MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                anchor: '100%',
                                editable: false,
                                //width: setWidth
                            
                            },{

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
                                        text: ViewUtil.getLabel('ok'),
                                        width: 80,  
                                        listeners: {
                                            click: 'onOk'
                                        }
                                    }
                                ]   
                            }]
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
                            items: [{

                                xtype: 'container',
                                width: 300,
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
//                                	{
//                                	
//	                                    xtype: 'textfield',
//	                                    reference: 'txtGateInTxnNo',
//	                                    fieldLabel: ViewUtil.getLabel('gateoperation.txtno'),
//	                                    width: 300,
//	                                    bind: {
//	                                        readOnly: '{readOnlyMode}',
//	                                        //disabled: '{disabledMode}',
//	                                    }
//                                	},
                                    {
                                        xtype: 'textfield',
                                        reference: 'txtGOCustomStatus',
                                        fieldLabel: ViewUtil.getLabel('gateoperation.custom'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateOutLorry.customsReleaseStatus}'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference: 'txtGateOutQty',
                                        width: 200,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.qty'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateOutLorry.pkgQty}'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference: 'txtGateOutMt',
                                        width: 200,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.mt'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateOutLorry.wgt}'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference: 'txtGateOutM3',
                                        width: 200,
                                        fieldLabel: ViewUtil.getLabel('gateoperation.m3'),
                                        bind: {
                                            readOnly: '{readOnlyMode}',
                                            value: '{gateOutLorry.msrmt}'
                                        }
                                    }
                                ]
                            }]
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
        					cellclick: 'onGridGOREClick1',
        				},
        				
        				columns: {
        					defaults: {
        						style : 'text-align:center',
        						align: 'center'
        					},
        					items: GridUtil.getGridColumns('GateOutCargo')
        				}
                    }]
                }]
			}]
		});
		me.callParent();
	}
});