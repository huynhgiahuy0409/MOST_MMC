Ext.define('MOST.view.billing.packagetariffdetail.PackageTariffRateTabHead', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-packagetariffratetabhead',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab'
    ],
    config: {
        deliverStr: '',
        cargoStr: '',
        commodityStr: '',
        vesselStr: ''
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: [
                {  // ## Head Part
                    xtype: 'fieldset',
                    margin: '5 0 5 0',
                    padding: '5 10 10 10',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center',
                            },
                            items: [
                                { // Top Header Column 1
                                    xtype: 'container',
                                    flex: 1,
                                    padding: '0 40 0 20',
                                    defaults: {
                                        labelAlign: 'right',
                                        margin: '5 0 0 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            reference: 'refPackagetxt',
                                            fieldLabel: ViewUtil.getLabel('pckTrfPackage'),
                                            width: '100%',
                                            labelWidth: 60,
                                            bind: {
                                                value: '{theCurrentDetail.pkgNm}',
                                            },
                                            editable: true,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            width: '100%',
                                            defaults: {
                                                labelAlign: 'right'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    reference: 'refPartnertxt',
                                                    fieldLabel: ViewUtil.getLabel('pckTrfPartner'),
                                                    labelWidth: 60,
                                                    flex: 1,
                                                    bind: {
                                                        value: '{theCurrentDetail.ptnrCd}',
                                                    },
                                                    editable: true,
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-search',
                                                    reference: 'ctlPartnerCodeTypeBtn',
                                                    margin: '0 0 0 5',
                                                    listeners: {
                                                        click: 'openPartnerCdTypePopupHead'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'refRefNoTxt',
                                            fieldLabel: ViewUtil.getLabel('pckTrfRefNo'),
                                            labelWidth: 60,
                                            width: '100%',
                                            bind: {
                                                value: '{theCurrentDetail.rmk}'
                                            }
                                        },
                                    ]
                                },

                                { // Top Header Column 2
                                    xtype: 'container',
                                    padding: '0 40 0 20',
                                    defaults: {
                                        labelAlign: 'right',
                                        margin: '5 0 0 0'
                                    },
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                labelAlign: 'right',
                                            },
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    reference: 'refPackageRatetxt',
                                                    labelWidth: 100,
                                                    flex: 1,
                                                    fieldLabel: ViewUtil.getLabel('pckTrfPackageRate'),
                                                    bind: {
                                                        value: '{theCurrentDetail.pkgPrc}',
                                                    },
                                                    fieldStyle: 'text-align: right;',
                                                    editable: true,
                                                    allowBlank: false
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'datefield',
                                            reference: 'refAplDt',
                                            fieldLabel: ViewUtil.getLabel('pckTrfApplyDt'),
                                            labelWidth: 100,
                                            width: '100%',
                                            format: MOST.config.Locale.getShortDate(),
                                            listeners: {
                                                change: 'onChangeDate'
                                            },
                                            editable: false,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'datefield',
                                            reference: 'refExpDt',
                                            fieldLabel: ViewUtil.getLabel('pckTrfExpireDt'),
                                            labelWidth: 100,
                                            width: '100%',
                                            format: MOST.config.Locale.getShortDate(),
                                            listeners: {
                                                change: 'onChangeDate'
                                            },
                                            editable: false,
                                            allowBlank: false,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {    // ## Categories Part
                    xtype: 'fieldset',
                    margin: '0 0 5 0',
                    padding: '10 10 10 10',
                    title: 'Categories',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            padding: '0 0 0 0',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'center',
                                    },
                                    items: [
                                        { // Top Categories Column 1
                                            xtype: 'container',
                                            flex: 1,
                                            padding: '0 40 0 0',
                                            defaults: {
                                                labelAlign: 'right',
                                                margin: '5 0 0 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    width: '100%',
                                                    defaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            reference: 'refVesselCode',
                                                            fieldLabel: 'Vessel Code',
                                                            labelWidth: 80,
                                                            flex: 1,
                                                            bind: {
                                                                value: '{theCurrentDetail.vessels}'
                                                            },
                                                            editable: false
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'x-fa fa-search',
                                                            reference: 'ctlPartnerCodeTypeBtn',
                                                            margin: '0 0 0 5',
                                                            listeners: {
                                                                click: 'openVesselMultiPopup'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'combo',
                                                    reference: 'refBerthNo',
                                                    fieldLabel: 'Berth No',
                                                    labelWidth: 80,
                                                    width: '100%',
                                                    bind: {
                                                        store: '{berthListStore}'
                                                    },
                                                    queryMode: 'local',
                                                    displayField: 'berthNm',
                                                    valueField: 'berthCd',
                                                    editable: false
                                                }
                                            ]
                                        },
                                        { // Top Category Column 2
                                            xtype: 'container',
                                            padding: '0 40 0 20',
                                            defaults: {
                                                labelAlign: 'right',
                                                margin: '5 0 0 0'
                                            },
                                            flex: 1,
                                            items: [

                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {   // ### Bottom of Categories
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            margin: '10 0 0 0',
                            flex: 1,
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 5 0 0',
                                    layout: {
                                        xtype: 'vbox',
                                        align: 'stretch'
                                    },
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            boxLabel: 'Vessel Handling',
                                            reference: 'chbVsl',
                                            id: 'cbVsl',
                                            listeners: {
                                                change: 'onCheckedChangeVsl'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            reference: 'fieldSetVsl',
                                            disabled: true, 
                                            padding: '5 10 53 10',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch',
                                                pack: 'center'
                                            },
                                            flex: 1,
                                            defaults: {
                                                labelAlign: 'left'
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    reference: 'rdGrpVsl',
                                                    listeners: {
                                                    },
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        margin: '0 10 0 0',
                                                    },
                                                    items: [
                                                        {
                                                            boxLabel: 'LOA',
                                                            inputValue: '1',
                                                            reference: 'refLOA',
                                                            name: 'rd',
                                                            checked: true,
                                                        },
                                                        {
                                                            boxLabel: 'DWT',
                                                            inputValue: '2',
                                                            name: 'rd',
                                                            reference: 'refDWT',
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    margin: '0 0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            margin: '0 5 0 0',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: ViewUtil.getLabel('pckTrfFrom')
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    reference: 'refFormVsl',
                                                                    minValue: 0,
                                                                    bind: {
                                                                    }
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
                                                            margin: '0 0 0 5',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: ViewUtil.getLabel('pckTrfTo')
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    reference: 'refToVsl',
                                                                    minValue: 0,
                                                                    bind: {
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 5',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            boxLabel: 'Cargo Handling',
                                            reference: 'chbCargo',
                                            id: 'cbCargo',
                                            flex: 1,
                                            listeners: {
                                                change: 'onCheckedChangeCargo'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: '5 10 0 10',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            reference: 'fieldSetCargo',
                                            disabled: true, 
                                            flex: 1,
                                            defaults: {
                                                labelAlign: 'right',
                                                margin: '5 0 0 0'
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
                                                            xtype: 'textfield',
                                                            reference: 'refcargoType',
                                                            fieldLabel: 'Cargo Type',
                                                            labelWidth: 105,
                                                            labelAlign: 'right',
                                                            flex: 1,
                                                            margin: '0 5 0 0',
                                                            editable: false,
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'x-fa fa-search',
                                                            margin: '0 5 0 0',
                                                            listeners: {
                                                                click: 'openCargoPopup'
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
                                                    defaults: {
                                                        margin: '0 5 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            reference: 'refComdt',
                                                            fieldLabel: 'Commodity',
                                                            labelWidth: 105,
                                                            labelAlign: 'right',
                                                            flex: 1,
                                                            editable: false
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'x-fa fa-search',
                                                            listeners: {
                                                                click: 'openCommonCodeForMultiPopup'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '10 0 0 0',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    flex: 1,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: ViewUtil.getLabel('pckTrfHandleQty')
                                                        },

                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            margin: '0 0 0 0',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1,
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    margin: '0 5 0 0',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: ViewUtil.getLabel('pckTrfFrom')
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            reference: 'refFromCargo',
                                                                            minValue: 0,
                                                                            bind: {
                                                                            }
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
                                                                    margin: '0 0 0 5',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: ViewUtil.getLabel('pckTrfTo')
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            reference: 'refToCargo',
                                                                            minValue: 0,
                                                                            bind: {
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }]
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
    },
});