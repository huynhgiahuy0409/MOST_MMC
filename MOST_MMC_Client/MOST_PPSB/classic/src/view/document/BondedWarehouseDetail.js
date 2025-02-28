Ext.define('MOST.view.document.BondedWarehouseDetail', {
    extend: 'Ext.form.Panel',

    alias: 'widget.app-bondedwarehousedetail',

    requires: [
        'Ext.layout.container.Table'
    ],

    width: 1250,
    height: 700,
    scrollable: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    layout: 'fit',

    listeners: {
        afterrender: 'onDetailLoad'
    },

    config: {
        recvData: null
    },

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            xtype: 'panel',
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
                            xtype: 'fieldset',
                            margin: '5 5 0 5',
                            padding: '5 5 5 5',
                            defaults: {
                                margin: '10 0 0 0',
                                labelAlign: 'right',
                                labelWidth: 70
                            },
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    reference: 'refScn',
                                    fieldLabel: ViewUtil.getLabel('vslschlSCN'),
                                    readOnly: true,
                                    bind: '{bondedWarehouse.scn}',
                                    width: 200
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '5 5 0 0',
                            flex: 1,
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 0',
                                    defaults: {
                                        margin: '5 5 0 0',
                                        labelAlign: 'right',
                                        labelWidth: 80,
                                        width: 275
                                    },
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('vesselCode'),
                                            bind: '{bondedWarehouse.vslCd}',
                                            editable: false

                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('vesselName'),
                                            bind: '{bondedWarehouse.vslNm}',
                                            editable: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('voyage'),
                                            // bind: '{theSearchDetail.voyage}',
                                            editable: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 0',
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 50,
                                        width: 245,
                                        margin: '5 5 0 0'
                                    },
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('aSA'),
                                            // bind: '{theSearchDetail.arrvSaId}',
                                            editable: false

                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('dSA'),
                                            // bind: '{theSearchDetail.depSaId}',
                                            editable: false
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: ViewUtil.getLabel('eta'),
                                            // bind: '{theSearchDetail.eta}',
                                            editable: false,
                                            readOnly: true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 0',
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 90,
                                        width: 285,
                                        margin: '5 5 0 0'
                                    },
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('berthingLoc'),
                                            // bind: '{theSearchDetail.berthLoc}',
                                            editable: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('storageLoc'),
                                            editable: false

                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: ViewUtil.getLabel('etd'),
                                            // bind: '{theSearchDetail.etd}',
                                            editable: false,
                                            readOnly: true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {//SNm Mode TransportType
                    xtype: 'fieldset',
                    margin: '5 5 5 5',
                    padding: '5 0 5 5',
                    defaults: {
                        margin: '0 0 0 0',
                        labelAlign: 'right',
                        labelWidth: 110,
                        width: 220,
                    },

                    layout: {
                        type: 'hbox',
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            padding: '0 0 0 0',
                            fieldLabel: ViewUtil.getLabel('sNNo'),
                            bind: {
                                value: '{bondedWarehouse.shipgNoteNo}',
                            },
                            reference: 'refShipNoteNo',
                            labelWidth: 60,
                            fieldStyle : 'text-transform: uppercase',
                            maskRe: /[0-9A-Za-z]/,
                            maxLength: 20,
                            allowBlank: true,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            padding: '0 0 0 0',
                            fieldLabel: ViewUtil.getLabel('sNNo'),
                            bind: {
                                value: '{bondedWarehouse.newShipgNoteNo}',
                            },
                            reference: 'refNewShipNoteNo',
                            labelWidth: 60,
                            fieldStyle: 'text-transform:uppercase',
                            change: function(field, newValue){
                                field.setValue(newValue.toUpperCase());
                            },
                            maskRe: /[0-9A-Za-z]/,
                            maxLength: 20,
                            enforceMaxLength: true,
                            allowBlank: false,
                            listeners: {
                                change: 'onUpperCase'
                            },
                        },
                        {
                            xtype: 'textfield',
                            reference: 'refDeliveryMode',
                            width: 250,
                            labelWidth: 130,
                            fieldLabel: ViewUtil.getLabel('deliveryMode'),
                            bind: ViewUtil.getLabel('indirect'),
                            editable: false,
                            allowBlank: false,
                            readOnly: true,
                            activeError: 'important',
                        },
                        {
                            xtype: 'textfield',
                            reference: 'refCategory',
                            width: 280,
                            labelWidth: 110,
                            fieldLabel: ViewUtil.getLabel('catgCd'),
                            bind: ViewUtil.getLabel('storage'),
                            editable: false,
                            allowBlank: false,
                            readOnly: true,
                        },
                        {
                            xtype: 'textfield',
                            reference: 'refModeOfOperation',
                            width: 280,
                            labelWidth: 150,
                            fieldLabel: ViewUtil.getLabel('modeofOperation'),
                            bind: ViewUtil.getLabel('lorry'),
                            editable: false,
                            allowBlank: false,
                            readOnly: true,
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    height: 310,
                    minHeight: 310,
                    deferredRender: false,
                    margin: '0 5 5 5',
                    activeTab: 0,
                    flex: 1,
                    items: [
                        {
                            xtype: 'app-submissionbondedwarehousedetail',
                            reference: 'refSubmissionBondedWarehouseDetail',
                            title: ViewUtil.getLabel('detail')
                        },
                        {
                            xtype: 'app-submissionbondedwarehouseconversion',
                            reference: 'refSubmissionBondedWarehouseConversion',
                            title: ViewUtil.getLabel('bondedConversion')
                        }
                    ]
                }],
        });
        me.callParent();
    }
});