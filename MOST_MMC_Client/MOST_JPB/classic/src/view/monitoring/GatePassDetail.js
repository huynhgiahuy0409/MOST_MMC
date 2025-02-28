Ext.define('MOST.view.monitoring.GatePassDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-gatepassdetail',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	width:980,
	height: 582,
	scrollable: true,
	
	controller: 'gatepassdetail',
	
	viewModel: {
		type: 'gatepassdetail'
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
		            flex: 0,
		            margin: '5 5 5 5',
		            defaults: {
		                margin: '2 0 0 0',
		                defaults: {
		                    readOnly: true
		                }
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch',
		                padding: '0 0 0 0'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 5 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 50
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch',
		                        padding: '0 0 0 0'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailJpvc'),
		                            bind:'{theDetail.vslCallId}',
		                            readOnly: true
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailBl'),
		                            bind:'{theDetail.blNo}',
		                            readOnly: true
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailDo'),
		                            bind:'{theDetail.doNo}',
		                            readOnly: true
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 5 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 50,
		                        readOnly: true
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailGp'),
		                            bind:'{theDetail.gatePassNo}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailSn'),
		                            bind:'{theDetail.sn}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailGr'),
		                            bind:'{theDetail.grNo}'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 5 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 100,
		                        readOnly: true
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailVesselCode'),
		                            bind:'{theDetail.vslCd}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailVesselName'),
		                            bind:'{theDetail.vslName}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailSa'),
		                            bind:'{theDetail.shipgAgnt}'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 5 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 100,
		                        readOnly: true
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailEta'),
		                            bind:'{theDetail.eta}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailBerthLoc'),
		                            bind:'{theDetail.berthLoc}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailWhLoc'),
		                            bind:'{theDetail.storageLoc}'
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            flex: 0,
		            margin: '2 5 0 5',
		            defaults: {
		                margin: '2 0 0 0',
		                defaults: {
		                    margin: '2 5 0 5',
		                    labelAlign: 'right',
		                    labelWidth: 100,
		                    readOnly: true
		                }
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch',
		                padding: '0 0 0 0'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailLorryNo'),
		                            bind:'{theDetail.lorryNo}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailLorryCompany'),
		                            bind:'{theDetail.transporter}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailNosGpIssued'),
		                            bind:'{theDetail.nosGpIssue}'
		                        },
		                        {
		                            xtype: 'container',
		                            defaults: {
		                                margin: '0 0 0 0',
		                                labelAlign: 'right',
		                                labelWidth: 100
		                            },
		                            layout: {
		                                type: 'vbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'label',
		                                    flex: 1,
		                                    text: ViewUtil.getLabel('gatePassDetailCargo')
		                                },
		                                {
		                                    xtype: 'textareafield',
		                                    flex: 1,
		                                    bind:'{theDetail.cargoMarking}',
		                                    readOnly: true
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'container',
		                            defaults: {
		                                margin: '0 0 0 0',
		                                labelAlign: 'right',
		                                labelWidth: 100
		                            },
		                            layout: {
		                                type: 'vbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'label',
		                                    flex: 1,
		                                    text: ViewUtil.getLabel('gatePassDetailRemarks')
		                                },
		                                {
		                                    xtype: 'textareafield',
		                                    flex: 1,
		                                    bind:'{theDetail.rmk}',
		                                    readOnly: true
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailCustomFzAppr'),
		                            bind:'{theDetail.custAppr}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailReleaseNo'),
		                            bind:'{theDetail.releaseNo}'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1.1,
		                    defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100,
		                        readOnly: true,
		                        defaults: {
		                            margin: '0 5 2 0',
		                            labelAlign: 'right',
		                            labelWidth: 100,
		                            layout: {
		                                type: 'hbox',
		                                align: 'stretch'
		                            },
		                            readOnly:true
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
		                                    xtype: 'container',
		                                    flex: 1
		                                },
		                                {
		                                    xtype: 'label',
		                                    flex: 1,
		                                    style: 'text-align: center',
		                                    text: 'MT'
		                                },
		                                {
		                                    xtype: 'label',
		                                    flex: 1,
		                                    style: 'text-align: center',
		                                    text: 'M3'
		                                },
		                                {
		                                    xtype: 'label',
		                                    flex: 1,
		                                    style: 'text-align: center',
		                                    text: 'QTY'
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
		                                    flex: 1,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailDocAmt')
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.grossTot}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.cumulTot}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.outQty}'
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
		                                    flex: 1,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailActAmt')
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.actMt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.actM3}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.actQty}'
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
		                                    flex: 1,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailDeliver')
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.wgt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.msrmt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.pkgQty}'
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
		                                    flex: 1,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailTotDelv')
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.totDelvMt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.totDelvM3}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.totDelvQty}'
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
		                                    flex: 1,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    width: 100,
		                                    text: ViewUtil.getLabel('gatePassDetailBalance')
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.balMt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.balM3}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    flex: 1,
		                                    bind:'{theDetail.balQty}'
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
		                                    flex: 2,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailModeOfOperation')
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 2,
		                                    bind:'{theDetail.tsptTpCd}'
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
		                                    flex: 2,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailCommodity')
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 2,
		                                    bind:'{theDetail.commodity}'
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
		                                    flex: 2,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailCargoType')
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 2,
		                                    bind:'{theDetail.cgTpCd}'
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
		                                    flex: 2,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailPackageType')
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 2,
		                                    bind:'{theDetail.pkgTpCd}'
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
		                                    flex: 2,
		                                    margin: '2 10 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailUnnoClass')
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 1,
		                                    bind:'{theDetail.imdg}'
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 1,
		                                    bind:'{theDetail.unno}'
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
		                                    flex: 2,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailDgStatus')
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 2,
		                                    bind:'{theDetail.dgApproval}'
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
		                                    flex: 2,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailCargoDelivery')
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 2,
		                                    bind:'{theDetail.cgDelivery}'
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
		                                    flex: 2,
		                                    margin: '2 5 0 0',
		                                    style: 'text-align:right',
		                                    text: ViewUtil.getLabel('gatePassDetailCargoStatus')
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 2,
		                                    bind:'{theDetail.statCd}'
		                                }
		                            ]
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 5 2 5',
		                        labelAlign: 'right',
		                        labelWidth: 100,
		                        readOnly: true,
		                        defaults: {
		                            readOnly: true
		                        }
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailShipper'),
		                            bind:'{theDetail.shprNm}'
		                        },
		                        {
		                            xtype: 'textareafield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailAddress'),
		                            bind:'{theDetail.shprAddr}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailConsignee'),
		                            bind:'{theDetail.cnsneNm}'
		                        },
		                        {
		                            xtype: 'textareafield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailAddress'),
		                            bind:'{theDetail.cnsneAddr}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailFAgent'),
		                            bind:'{theDetail.fwrAgnt}'
		                        },
		                        {
		                            xtype: 'container',
		                            defaults: {
		                                labelAlign: 'right',
		                                readOnly:true
		                            },
		                            layout: {
		                                type: 'hbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'textfield',
		                                    flex: 1.5,
		                                    fieldLabel: ViewUtil.getLabel('gatePassDetailPol'),
		                                    bind:'{theDetail.portOfLoad}'
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 1,
		                                    fieldLabel: ViewUtil.getLabel('gatePassDetailPod'),
		                                    labelWidth: 40,
		                                    bind:'{theDetail.portOfDis}'
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'container',
		                            defaults: {
		                                labelAlign: 'right',
		                                readOnly:true
		                            },
		                            layout: {
		                                type: 'hbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'textfield',
		                                    flex: 1.5,
		                                    fieldLabel: ViewUtil.getLabel('gatePassDetailHatchNo'),
		                                    bind:'{theDetail.hatchNo}'
		                                },
		                                {
		                                    xtype: 'textfield',
		                                    flex: 1,
		                                    fieldLabel: ViewUtil.getLabel('gatePassDetailWharf'),
		                                    labelWidth: 40,
		                                    bind:'{theDetail.wharf}'
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailWhLoc'),
		                            bind:'{theDetail.whLoc}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailFinalDest'),
		                            bind:'{theDetail.finalDest}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailNoTrips'),
		                            bind:'{theDetail.noTrips}'
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('gatePassDetailPkgNo'),
		                            bind:'{theDetail.packingNo}'
		                        }
		                    ]
		                }
		            ]
		        }
			],
		    
		    dockedItems: [
		    	{
					xtype: 'container',
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [{
						xtype: 'tbfill'
					},{
	                    xtype: 'button',
	                    itemId:'downloadItemId',
	                    text: ViewUtil.getLabel('download') + ' CIR',
	                    iconCls: 'fa fa-file-pdf-o',
	                    cls: 'downloadpdf-button', 
	                    listeners: {
	                        click: 'onPrintPDF'
	                    }
	                }]
				}
			]
		});
		
		me.callParent();
	}
});