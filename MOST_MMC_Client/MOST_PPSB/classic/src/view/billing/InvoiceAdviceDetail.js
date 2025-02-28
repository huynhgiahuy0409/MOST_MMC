Ext.define('MOST.view.billing.InvoiceAdviceDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-invoiceadvicedetail',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab'
    ],

    height: 560,
    width: 1300,

    listeners: {
        afterrender: 'onDetailLoad'
    },

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            xtype: 'form',
            defaults: {
                margin: '5 5 0 5' // top, right, bottom, left
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
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [{
                        xtype: 'container',
                        reference: 'ctlApprovalContainer',
                        activeItem: 0,
                        layout: 'card',
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                    pack: 'end'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: ViewUtil.getLabel('aCK'),
                                                reference: 'ctlACKbtn',
                                                disabled: true,
                                                ui: 'delete-button',
                                                listeners: {
                                                    click: 'onACK'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                margin: '0 0 0 5',
                                                reference: 'ctlHistorybtn',
                                                text: ViewUtil.getLabel('historyOfAcknowledge'),
                                                disabled: false,
                                                listeners: {
                                                    click: 'onHistoryOfACK'
                                                }
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
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    margin: '5 5 0 5',
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            margin: '0 0 0 0',
                            /*padding: '0 10 0 0',*/
                            layout: { 
                                type: 'vbox',
                                /*align: 'center',
                                pack: 'center'*/
                            },
                            items: [
                            	{
									xtype: 'shipcallnofield',
									reference: 'ctlDetailScn',
									labelWidth: 70,
                                    flex: 1,
                                    labelAlign: 'right',
									//emptyText: ViewUtil.getLabel('shipCallNo'),
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theVsl.scn}',
									},
								},
                                {
                                    xtype: 'vesselcalllistfield',
                                    fieldLabel: ViewUtil.getLabel('vslschlJPVCNo'),
                                    labelWidth: 70,
                                    flex: 1,
                                    labelAlign: 'right',
                                    margin: '0 0 0 0',
                                    reference: 'ctlDetailJpvcfield',
                                    bind: {
                                        value: '{theVsl.vslCallId}',
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 3,
                            margin: '0 0 0 5',
                            padding: '10 10 10 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right'
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
                                        margin: '5 5 0 0',
                                        labelAlign: 'right'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('vesselName'),
                                            labelWidth: 80,
                                            editable: false,
                                            reference: 'ctlvesselName',
                                            bind: '{theVsl.vslNm}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('voyage'),
                                            labelWidth: 80,
                                            margin: '5 5 0 0',
                                            editable: false,
                                            reference: 'ctlvoyage',
                                            bind: '{theVsl.voyage}'
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
                                        margin: '5 5 0 0',
                                        labelAlign: 'right'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('sA'),
                                            labelWidth: 80,
                                            editable: false,
                                            reference: 'ctlSA',
                                            bind: '{theVsl.arrvSaId}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('berthNo'),
                                            labelWidth: 80,
                                            margin: '5 5 0 0',
                                            editable: false,
                                            reference: 'ctlberthNo',
                                            bind: '{theVsl.berthLoc}'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    defaults: {
                                        margin: '5 5 0 0',
                                        labelAlign: 'right'
                                    },
                                    flex: 1,
                                    items: [  
                                        {
                                            xtype: 'datefield',
                                            editable: false,
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('eTA'),
                                            labelWidth: 80,
                                            readOnly: true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                            reference: 'ctlDetailETA',
                                            bind: '{theVsl.eta}'
                                        },
                                        {
                                            xtype: 'datefield',
                                            editable: false,
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('eTD'),
                                            labelWidth: 80,
                                            margin: '5 5 0 0',
                                            readOnly: true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                            reference: 'ctlDetailETD',
                                            bind: '{theVsl.etd}'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    reference: 'ctlMegaDetailTabPanel',
                    flex: 1,
                    margin: '5 5 5 5',
                    activeTab: 0,
                    items: [
                        { // Vessel Schedule
                            xtype: 'container',
                            title: ViewUtil.getLabel('head'),
                            items: [
                                {
                                    xtype: 'app-invoiceadvicedetailtabhead',
                                    reference: 'refMegaDetailTabVesselSchedule',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            title: ViewUtil.getLabel('detail'),
                            layout: { type: 'vbox', align: 'stretch' },
                            scrollable: 'both',
                            items: [
                                {
                                    xtype: 'app-invoiceadvicedetailtabdetail',
                                    reference: 'refMegaDetailTabStevedore',
                                    flex: 1
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