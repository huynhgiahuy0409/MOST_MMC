Ext.define('MOST.view.planning.vesselscheduleinternal.VesselScheduleDetailTabISPS', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselscheduledetailtabisps',
		
	requires: [
	],
	
	HR_MARGIN : '12 5 0 5',
	
	 /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refIspsVesselInformationGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'confirmationSlipPassenger',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : 'accordion',

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
                    xtype: 'panel',
                    title: ViewUtil.getLabel('vesselInformation'),
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                            	{
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '2 0 0 0',
                                    defaults: {
                                        margin: '0 0 5 5',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('jpvc'),
                                            editable: false,
                                            bind: '{theMain.vslCallId}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('vesselName'),
                                            editable: false,
                                            bind: '{theMain.vslNm}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('callSign'),
                                            editable: false,
                                            bind: '{theMain.callSign}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('typeofVessel'),
                                            editable: false,
                                            bind: '{theMain.vslTpNm}'
                                        }
                                    ]
                                },
                            	{
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '2 0 0 0',
                                    defaults: {
                                        margin: '0 0 5 5',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('outboundvoy'),
                                            editable: false,
                                            bind: '{theMain.outbVoy}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('inboundvoy'),
                                            editable: false,
                                            bind: '{theMain.inbVoy}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('sAgency'),
                                            editable: false,
                                            bind: '{theMain.arrvSaId}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('latitude'),
                                            editable: false,
                                            bind: '{theMain.isLattDeg}'
                                        }
                                    ]
                                },                                
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '2 0 0 0',
                                    defaults: {
                                        margin: '0 0 5 5',
                                        labelAlign: 'right',
                                        labelWidth: 120
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
            	                            reference: 'ctlConfirmationSlipIspsOperationType'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('imoNo'),
                                            editable: false,
                                            bind: '{theMain.imoNo}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('noofCrew'),
                                            editable: false,
                                            bind: '{thePassengerSummary.noOfCrw}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('longitude'),
                                            editable: false,
                                            bind: '{theMain.isLottDeg}'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '2 0 0 0',
                                    defaults: {
                                        margin: '0 0 5 5',
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
                                            fieldLabel: ViewUtil.getLabel('eta'),
                                            readOnly: true,
                                            bind: '{theMain.eta}'
                                        },
                                        {
                                        	xtype:'datetimefield',
            	        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                            fieldLabel: ViewUtil.getLabel('etd'),
                                            readOnly: true,
                                            bind: '{theMain.etd}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('flag'),
                                            editable: false,
                                            bind: '{theMain.vslFlagCd}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('grt'),
                                            editable: false,
                                            bind: '{theMain.grt}'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 165,
                            title: ViewUtil.getLabel('passengerList'),
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 5 5',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('documentNo'),
                                            bind: '{thePassengerSummary.docNo}',
                                            editable: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('crewonarrival'),
                                            bind: '{thePassengerSummary.crwOnArv}',
                                            editable: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('crewonDeparture'),
                                            bind: '{thePassengerSummary.crwOnDpt}',
                                            editable: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 5 5',
                                        labelAlign: 'right',
                                        labelWidth: 160
                                    },
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            height: 27
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('passengeronarrival'),
                                            bind: '{thePassengerSummary.pasgerOnArv}',
                                            editable: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('passengerondeparture'),
                                            bind: '{thePassengerSummary.pasgerOnDpt}',
                                            editable: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 5 5',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    }
                                }
                            ]
                        },
                        {
                        	xtype: 'tsb-datagrid',
            				reference: me.MAIN_GRID_REF_NAME,
            				flex: 1,
            				usePagingToolbar : false,
                        	stateful : true,
                        	stateId : 'stateIspsVesselInformationGrid',
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
                        	columns: {
                        		defaults: {
                        			style : 'text-align:center',
                        			align : 'center'
                        		},
                        		items: GridUtil.getGridColumns('ConfirmationSlipPassenger')
                        	}
                        }
                    ]
                },
                {
                    xtype: 'panel',
                	lblIsps1: {type: 'bundle', key: 'isps1'},
                    title: ViewUtil.getLabel('isps1'),
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '1. Dangerous Good onboard?'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
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
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is1_1_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    name:'is1_1_q',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    inputValue : 'Y',
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    name:'is1_1_q',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    inputValue : 'N',
                                                    readOnly:true
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            reference : 'ctl_is1_1_q_dtl',
                                            readOnly:true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '2. Purpose of call'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            reference:'ctl_is1_2_q',
        		           					queryMode: 'local',
        		           					bind: {
        		            	    			store: '{vesselSchedulePurposeOfCallCombo}'
        		            	    		},
        		           					displayField: 'scdNm',
        		           					valueField: 'scd',
        		           					value : '',
        		           					readOnly: true
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            reference:'ctl_is1_2_q_dtl',
        		           					queryMode: 'local',
        		           					bind: {
        		            	    			store: '{vesselScheduleCargoToDischargeCombo}'
        		            	    		},
        		           					displayField: 'scdNm',
        		           					valueField: 'scd',
        		           					value : '',
        		           					readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '3. Cargo to discharge'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            reference: 'ctl_is1_3_q_dtl',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '4. Name of Anchorage or Port Facility your ship is bound for'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            reference: 'ctl_is1_4_q_dtl',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '5. Name of agent in Malaysia/Tel/Fax No'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            reference: 'ctl_is1_5_q_dtl',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '6. Does your ship possess a valid International Ship Security Certificate (ISPS)?'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is1_6_q',
                                            readOnly: true,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name: 'is1_6_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name: 'is1_6_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '7. Date of expiry of the ISSC'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            reference : 'ctl_is1_7_q_dtl',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '8. Name of issuing authority for the ISSC'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            reference : 'ctl_is1_8_q_dtl',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '9. Current security level of the ship'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            margin: '',
                                            width: 190,
                                            defaults: {
                                                margin: '0 0 0 5'
                                            },
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            reference : 'ctl_is1_9_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: '1',
                                                    name:'is1_9_q',
                                                    inputValue : '1',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: '2',
                                                    name:'is1_9_q',
                                                    inputValue : '2',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: '3',
                                                    name:'is1_9_q',
                                                    inputValue : '3',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 42,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            height: 27,
                                            margin: '5 0 0 0',
                                            text: '10. Were there any special or additional security taken during any ship/port interface or ship-to-ship activity at the ports mentioned in \'Last 10 Port of Call\'?'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is1_10_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
													name:'is1_10_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
													name:'is1_10_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            reference : 'ctl_is1_10_q_dtl',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 53,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            height: 48,
                                            margin: '5 0 0 0',
                                            text: '11. Was the last port of call compliance with ISPS? If your answer is "NO", please submit FORM JL/ISPS 2.'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is1_11_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
													name:'is1_11_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
													name:'is1_11_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: ViewUtil.getLabel('isps2'),
                    items: [
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '1. Has a DOS been issued at the last port/port facility'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_1_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
													name:'is2_1_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
													name:'is2_1_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '2. Was a full watch kept at all vessel\'s access during stay in port'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_2_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is2_2_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is2_2_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '3. Are crew as specified in the crew list'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_3_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is2_3_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is2_3_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '4. Has checks been made on stowaway or other unlawful person onboard'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_4_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is2_4_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is2_4_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '5. Are cargo onboard duly manifested'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_5_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is2_5_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is2_5_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '6. Is cargo storage plan available'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_6_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is2_6_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is2_6_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '7. Any stores, spare parts and requisition received at last port/port facility'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_7_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is2_7_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is2_7_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '8. Are records kept for the above'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_8_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is2_8_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is2_8_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '9. Are dangerous goods onboard'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is2_9_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is2_9_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is2_9_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '10. If above is "YES", state IMDG Code class'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            width: 190,
                                            reference : 'ctl_is2_10_q_dtl',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: ViewUtil.getLabel('isps3'),
                    items: [
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '1. Last port of call'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_1_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_1_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_1_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '2. Was last port of call an ISPS compliant port facility'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_2_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_2_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_2_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '3. Any control measures imposed at last port. If "YES" give details'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_3_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_3_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_3_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            width: 185,
                                            reference : 'ctl_is3_3_q_dtl',
                                            readOnly: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '4. Have you conducted a SSA for your ship'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_4_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_4_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_4_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '5. Do you have SSP onboard the ship'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_5_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_5_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_5_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '6. If yes to above, is this plan(SSP) being implement'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_6_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_6_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_6_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '7. Any ship crew trained as SSO'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_7_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_7_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_7_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '8. Crew have awareness training on security procedures'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_8_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_8_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_8_q',
                                                    inputValue : 'N'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '9. Has full gangway watch been kept at last port'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_9_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_9_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_9_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '10. Has there any unlawful boarding at last port'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_10_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_10_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_10_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '11. Has Stowaway search conducted'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_11_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_11_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_11_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '12. Has any stowaways found'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_12_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_12_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_12_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 32,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    height: 32,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '5 0 0 0',
                                            text: '13. Declaration by master that no unlawful loading done at last port'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            contentEl: '',
                                            html: '<hr>',
                                            margin: me.HR_MARGIN,
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5'
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 190,
                                            reference : 'ctl_is3_13_q',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('yes'),
                                                    name:'is3_13_q',
                                                    inputValue : 'Y',
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: ViewUtil.getLabel('no'),
                                                    name:'is3_13_q',
                                                    inputValue : 'N',
                                                    readOnly: true
                                                }
                                            ]
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

