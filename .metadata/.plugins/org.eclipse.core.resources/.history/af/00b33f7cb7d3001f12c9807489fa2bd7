Ext.define('MOST.view.planning.berth.berthApprovalDetail.EstimatedCharges', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthapprovalestimatedcharges',
	
	requires: [
	],
	
	title: {type: 'bundle', key: 'estimatedCharges'},
	
	lblVesselInformation:{type: 'bundle', key: 'vesselinformation'},
	lblVesselName:{type: 'bundle', key: 'vesselname'},
	lblOperationType:{type: 'bundle', key: 'operationtype'},
	lblJpvc:{type: 'bundle', key: 'jpvc'},
	lblLoa:{type: 'bundle', key: 'loa'},
	lblCargoType:{type: 'bundle', key: 'cargotype'},
	lblLoadingCargo:{type: 'bundle', key: 'loadingcargo'},
	lblEtw:{type: 'bundle', key: 'etw'},
	lblEta:{type: 'bundle', key: 'eta'},
	lblDischagingCargo:{type: 'bundle', key: 'discharging'},
	lblEtc:{type: 'bundle', key: 'etc'},
	lblEtd:{type: 'bundle', key: 'etd'},

	
	lblEstimateCharges: {type: 'bundle', key: 'estimatecharges'},
	lblPortDues: {type: 'bundle', key: 'portdues'},
	lblDockage: {type: 'bundle', key: 'dockage'},
	lblStevedore: {type: 'bundle', key: 'stevedore'},
	lblPilotageDue: {type: 'bundle', key: 'pilotagedue'},
	lblTugService: {type: 'bundle', key: 'tugservice'},
	lblProfessionalFee: {type: 'bundle', key: 'professionalfee'},
	lblMooring: {type: 'bundle', key: 'mooring'},
	lblRate: {type: 'bundle', key: 'rate'},
	lblHours: {type: 'bundle', key: 'hours'},
	lblTonnage: {type: 'bundle', key: 'tonnage'},
	lblTwoTimes: {type: 'bundle', key: 'twotimes'},
	lblTugQty: {type: 'bundle', key: 'tugqty'},
	lblClear: {type: 'bundle', key: 'clear'},
	lblAmount: {type: 'bundle', key: 'amount'},
	lblTotalAmount: {type: 'bundle', key: 'totalamount'},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				  {
	                    xtype: 'panel',
	                    flex: 1,
	                    items: [
	                        {
	                            xtype: 'fieldset',
	                            title: me.lblVesselInformation,
	                            height: 160,
	                            width: '100%',
	                            layout: {
	                                type: 'vbox',
	                                align: 'stretch',
	                                width: '100%'
	                            },
	                            items: [
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '5 0 0 0',
					                        editable: false
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblVesselName,
	                                            labelWidth: 120,
	                                            bind :'{vesselInfo.vslNm}',
	                                            width: 270
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblOperationType,
	                                            bind :'{vesselInfo.opeTp}',
	                                            labelWidth: 120,
	                                            width: 270
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblJpvc,
	                                            bind :'{vesselInfo.jpvcNo}',
	                                            labelWidth: 100,
	                                            width: 250
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblLoa,
	                                            bind :'{vesselInfo.loa}',
	                                            labelWidth: 100,
	                                            width: 250
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '5 0 0 0',
					                        editable: false
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblCargoType,
	                                            bind :'{vesselInfo.cgTp}',
	                                            labelWidth: 120,
	                                            width: 270
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblLoadingCargo,
	                                            bind :'{vesselInfo.loadCargo}',
	                                            labelWidth: 120,
	                                            width: 270
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblEtw,
	                                            bind :'{vesselInfo.etw}',
	                                            labelWidth: 100,
	                                            width: 250
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblEta,
	                                            bind :'{vesselInfo.eta}',
	                                            labelWidth: 100,
	                                            width: 250
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '5 0 0 0',
					                        editable: false
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblDischagingCargo,
	                                            bind :'{vesselInfo.dischargeCargo}',
	                                            margin: '5 0 0 270',
	                                            labelWidth: 120,
	                                            width: 270
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblEtc,
	                                            bind :'{vesselInfo.etc}',
	                                            labelWidth: 100,
	                                            width: 250
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            fieldLabel: me.lblEtd,
	                                            bind :'{vesselInfo.etd}',
	                                            labelWidth: 100,
	                                            width: 250
	                                        }
	                                    ]
	                                }
	                            ]
	                        },
	                        {
	                            xtype: 'fieldset',
	                            title: me.lblEstimateCharges,
	                            layout: {
	                                type: 'vbox',
	                                align: 'stretch',
	                                width: '100%'
	                            },
	                            items: [
	                                {
	                                    xtype: 'container',
	    	                            layout: {
	    	                                type: 'hbox',
	    	                                pack: 'end'
	    	                            },
	                                    items: [
	                                        {
	                                            xtype: 'button',
	                                            width: 170,
	                                            margin: '0 0 5 0',
	                                            text: me.lblClear,
	                                            itemId:'clearItemId',
	                                            reference: 'refBtnClear',
	                                            listeners: {
	        										click: 'onCalculationClear'
	        									}
	                                           
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox',
	                                        width: '100%'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '0 0 0 0'
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'displayfield',
	                                            fieldLabel: me.lblPortDues
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            labelWidth: 50,
	                                            width: 150,
	                                            fieldLabel: me.lblRate,
	                                            bind: '{calculation.pdrate}'
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            fieldLabel: me.lblLoa,
	                                            bind: '{calculation.loa}',
						                        editable: false
	                                        },
	                                        {	xtype: 'container',
	                                        	flex: 1,
	    	                                    layout: {
	    	                                        type: 'hbox',
	    	                                        width: '100%',
	    	                                        pack: 'end'
	    	                                    },
	    					                    defaults: {
	    					                        labelAlign: 'right',
	    					                        margin: '0 0 0 0',
	    					                        editable: false
	    					                    },
	    	                                    items: [
	    	                                        {
			                                            xtype: 'textfield',
			                                            fieldLabel: '=',
			                                            bind: '{calculation.pdtotal}'
	    	                                        }
	    	                                    ]
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '0 0 0 0'
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'displayfield',
	                                            fieldLabel: me.lblDockage
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            labelWidth: 50,
	                                            width: 150,
	                                            bind: '{calculation.dkrate}',
	                                            fieldLabel: me.lblRate
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            bind: '{calculation.loa}',
	                                            fieldLabel: me.lblLoa,
						                        editable: false
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            bind: '{calculation.dkhours}',
	                                            fieldLabel: me.lblHours
	                                        },
	                                        {	xtype: 'container',
	                                        	flex: 1,
	    	                                    layout: {
	    	                                        type: 'hbox',
	    	                                        width: '100%',
	    	                                        pack: 'end'
	    	                                    },
	    					                    defaults: {
	    					                        labelAlign: 'right',
	    					                        margin: '0 0 0 0',
	    					                        editable: false
	    					                    },
	    	                                    items: [
	    	                                        {
			                                            xtype: 'textfield',
			                                            fieldLabel: '=',
			                                            bind: '{calculation.dktotal}',
	    	                                        }
	    	                                    ]
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '0 0 0 0'
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'displayfield',
	                                            fieldLabel: me.lblStevedore
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            labelWidth: 50,
	                                            width: 150,
	                                            bind: '{calculation.sdrate}',
	                                            fieldLabel: me.lblRate
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 245',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            bind: '{calculation.sdton}',
	                                            fieldLabel: me.lblTonnage
	                                        },
	                                        {	xtype: 'container',
	                                        	flex: 1,
	    	                                    layout: {
	    	                                        type: 'hbox',
	    	                                        width: '100%',
	    	                                        pack: 'end'
	    	                                    },
	    					                    defaults: {
	    					                        labelAlign: 'right',
	    					                        margin: '0 0 0 0',
	    					                        editable: false
	    					                    },
	    	                                    items: [
	    	                                        {
			                                            xtype: 'textfield',
			                                            fieldLabel: '=',
			                                            bind: '{calculation.sdtotal}',
	    	                                        }
	    	                                    ]
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '0 0 0 0'
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'displayfield',
	                                            fieldLabel: me.lblPilotageDue
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            labelWidth: 50,
	                                            width: 150,
	                                            bind: '{calculation.ptdrate}',
	                                            fieldLabel: me.lblRate
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            bind: '{calculation.loa}',
	                                            fieldLabel: me.lblLoa,
						                        editable: false
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },{
	                                            xtype: 'label',
	                                            text: me.lblTwoTimes,
	                                            margin: '5 0 0 15',
	                                            width: 50
	                                        },
	                                        {	xtype: 'container',
	                                        	flex: 1,
	    	                                    layout: {
	    	                                        type: 'hbox',
	    	                                        width: '100%',
	    	                                        pack: 'end'
	    	                                    },
	    					                    defaults: {
	    					                        labelAlign: 'right',
	    					                        margin: '0 0 0 0',
	    					                        editable: false
	    					                    },
	    	                                    items: [
	    	                                        {
			                                            xtype: 'textfield',
			                                            fieldLabel: '=',
			                                            bind: '{calculation.ptdtotal}',
	    	                                        }
	    	                                    ]
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '0 0 0 0'
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'displayfield',
	                                            fieldLabel: me.lblTugService
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            labelWidth: 50,
	                                            width: 150,
	                                            bind: '{calculation.tsrate}',
	                                            fieldLabel: me.lblRate
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            bind: '{calculation.loa}',
	                                            fieldLabel: me.lblLoa,
						                        editable: false
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },{
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            bind: '{calculation.tshours}',
	                                            fieldLabel: me.lblHours
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '0 0 0 0'
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'displayfield',
	                                            fieldLabel: ''
	                                        },
	                                    	{
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 500',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            bind: '{calculation.tstugqty}',
	                                            fieldLabel: me.lblTugQty
	                                        }, {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },{
	                                            xtype: 'label',
	                                            text: me.lblTwoTimes,
	                                            margin: '5 0 0 15',
	                                            width: 50
	                                        },
	                                        {	xtype: 'container',
	                                        	flex: 1,
	    	                                    layout: {
	    	                                        type: 'hbox',
	    	                                        width: '100%',
	    	                                        pack: 'end'
	    	                                    },
	    					                    defaults: {
	    					                        labelAlign: 'right',
	    					                        margin: '0 0 0 0',
	    					                        editable: false
	    					                    },
	    	                                    items: [
	    	                                        {
			                                            xtype: 'textfield',
			                                            fieldLabel: '=',
			                                            bind: '{calculation.tstotal}',
	    	                                        }
	    	                                    ]
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '0 0 0 0'
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'displayfield',
	                                            fieldLabel: me.lblProfessionalFee
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            labelWidth: 50,
	                                            width: 150,
	                                            bind: '{calculation.pfrate}',
	                                            fieldLabel: me.lblRate
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            margin: '0 0 0 230',
	                                            width: 200,
	                                            bind: '{calculation.pfhours}',
	                                            fieldLabel: me.lblHours
	                                        }, {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },{
	                                            xtype: 'label',
	                                            text: me.lblTwoTimes,
	                                            margin: '5 0 0 15',
	                                            width: 50
	                                        },
	                                        {	xtype: 'container',
	                                        	flex: 1,
	    	                                    layout: {
	    	                                        type: 'hbox',
	    	                                        width: '100%',
	    	                                        pack: 'end'
	    	                                    },
	    					                    defaults: {
	    					                        labelAlign: 'right',
	    					                        margin: '0 0 0 0',
	    					                        editable: false
	    					                    },
	    	                                    items: [
	    	                                        {
			                                            xtype: 'textfield',
			                                            fieldLabel: '=',
			                                            bind: '{calculation.pftotal}',
	    	                                        }
	    	                                    ]
	                                        }
	                                    ]
	                                },
	                                {
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        margin: '0 0 0 0'
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'displayfield',
	                                            fieldLabel: me.lblMooring
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            labelWidth: 50,
	                                            width: 150,
	                                            bind: '{calculation.moorrate}',
	                                            fieldLabel: me.lblRate
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '0 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },
	                                        {
	                                            xtype: 'textfield',
	                                            width: 200,
	                                            bind: '{calculation.loa}',
	                                            fieldLabel: me.lblLoa,
						                        editable: false
	                                        },
	                                        {
	                                            xtype: 'label',
	                                            text: 'X',
	                                            margin: '5 0 0 15',
	                                            labelWidth: 10,
	                                            width: 15
	                                        },{
	                                            xtype: 'label',
	                                            text: me.lblTwoTimes,
	                                            margin: '5 0 0 15',
	                                            width: 50
	                                        },
	                                        {	xtype: 'container',
	                                        	flex: 1,
	    	                                    layout: {
	    	                                        type: 'hbox',
	    	                                        width: '100%',
	    	                                        pack: 'end'
	    	                                    },
	    					                    defaults: {
	    					                        labelAlign: 'right',
	    					                        margin: '0 0 0 0',
	    					                        editable: false
	    					                    },
	    	                                    items: [
	    	                                        {
			                                            xtype: 'textfield',
			                                            bind: '{calculation.moortotal}',
			                                            fieldLabel: '='
	    	                                        }
	    	                                    ]
	                                        }
	                                    ]
	                                }
	                            ]
	                        },
	                        {
	                            xtype: 'container',
	                            height: 50,
	                            layout: {
	                                type: 'hbox'
	                            },
			                    defaults: {
			                        labelAlign: 'right',
			                        margin: '0 0 0 0'
			                    },
	                            items: [
	                                {
	                                    xtype: 'textfield',
	                                    margin: '0 0 5 300',
	                                    width : 200,
	                                    bind: '{calculation.amount}',
	                                    fieldLabel: me.lblAmount,
				                        editable: false
	                                },{
                                        xtype: 'label',
                                        text: '+',
                                        margin: '10 0 0 15',
                                        labelWidth: 10,
                                        width: 15
                                    },{
	                                    xtype: 'textfield',
	                                    width: 50,
	                                    bind: '{calculation.pecent}',
	                                    value: 10
	                                },{
                                        xtype: 'label',
                                        text: '%',
                                        margin: '10 0 0 15',
                                        labelWidth: 10,
                                        width: 15
                                    },{
	                                    xtype: 'textfield',
	                                    margin: '0 0 0 20',
	                                    width: 100,
				                        editable: false,
				                        bind: '{calculation.tax}'
	                                },{	xtype: 'container',
                                    	flex: 1,
	                                    layout: {
	                                        type: 'hbox',
	                                        width: '100%',
	                                        pack: 'end'
	                                    },
					                    defaults: {
					                        labelAlign: 'right',
					                        editable: false
					                    },
	                                    items: [
	                                        {
	                                            xtype: 'textfield',
	                                            margin: '0 15 5 0',
	                                            bind: '{calculation.totalamount}',
	                                            fieldLabel: '=',
	        			                        editable: false
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

