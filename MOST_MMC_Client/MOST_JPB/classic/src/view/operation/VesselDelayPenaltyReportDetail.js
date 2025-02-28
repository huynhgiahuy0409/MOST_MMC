Ext.define('MOST.view.operation.VesselDelayPenaltyReportDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-vesseldelaypenaltyreportdetail',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
    ],

    // height: 600,
    width: 900,

    listeners: {
        afterrender: 'onDetailLoad'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            xtype: 'form',
            margin: '0 5 10 0',
            defaults: {
                margin: '5 5 5 0' // top, right, bottom, left
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
                            xtype: 'fieldset',
                            margin: '0 0 0 5',
                            padding: '10 10 10 10',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                margin: '5 0 0 0',
                                labelAlign: 'right',
                                labelWidth: 70,
                            },
                            items: [
                                {
                                    xtype: 'shipcallnofield',
                                    reference: 'ctlDetailScn',
                                    allowBlank: false,
                                    fieldLabel: ViewUtil.getLabel('shipCallNo'),
                                    bind: {
                                        value: '{theVslDetail.scn}',
                                    },
                                },
                                {
                                    xtype: 'vesselcalllistfield',
                                    reference: 'ctlDetailJpvc',
                                    bind: {
                                        value: '{theVslDetail.vslCallId}'
                                    },
                                    fieldLabel: ViewUtil.getLabel('vessel'),
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    reference: 'ctlDetailPurpose',
                                    fieldLabel: ViewUtil.getLabel('purpose'),
                                    queryMode: 'local',
                                    bind: {
                                        store: '{megaDetailPurposeCombo}',
                                        value: '{theMain.purpTpCd}'
                                    },
                                    displayField: 'scdNm',
                                    valueField: 'scd',
                                    value: '',
                                    allowBlank: false,
                                    emptyText: ViewUtil.getLabel('select'),
                                    // listeners: {
                                    // 	change: 'onComboChangeForMegaDetailPurpose'
                                    // },
                                    hidden: true
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '0 0 0 5',
                            padding: '10 10 10 10',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        margin: '0 0 5 0',
                                        labelAlign: 'right',
                                        flex: 1,
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('vesselCode'),
                                            labelWidth: 70,
                                            editable: false,
                                            bind: '{theVslDetail.vslCd}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('sa'),
                                            labelWidth: 50,
                                            flex: 0.9,
                                            editable: false,
                                            bind: '{theVslDetail.arrvSaId}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('berthingLoc'),
                                            labelWidth: 70,
                                            editable: false,
                                            bind: '{theVslDetail.berthLoc}'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        margin: '0 0 5 0',
                                        labelAlign: 'right',

                                        flex: 1,
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('vesselName'),
                                            labelWidth: 70,
                                            editable: false,
                                            bind: '{theVslDetail.vslNm}'
                                        },
                                        {
                                            xtype: 'datetimefield',
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                            reference: 'dtEta',
                                            flex: 0.9,
                                            fieldLabel: ViewUtil.getLabel('eta'),
                                            labelWidth: 50,
                                            readOnly: true,
                                            bind: '{theVslDetail.eta}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('storageLoc'),
                                            labelWidth: 70,
                                            editable: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        margin: '0 0 0 0',
                                        labelAlign: 'right',
                                        flex: 1,
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('voyage'),
                                            labelWidth: 70,
                                            editable: false,
                                            bind: '{theVslDetail.voyage}'
                                        },
                                        {
                                            xtype: 'datetimefield',
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                            reference: 'dtEtd',
                                            flex: 0.9,
                                            fieldLabel: ViewUtil.getLabel('etd'),
                                            labelWidth: 50,
                                            readOnly: true,
                                            bind: '{theVslDetail.etd}'
                                        },
                                        {
                                            xtype: 'datetimefield',
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                            reference: 'dtEtw',
                                            fieldLabel: ViewUtil.getLabel('etw'),
                                            labelWidth: 70,
                                            readOnly: true,
                                            bind: '{theVslDetail.etw}'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    reference: 'blankContainer',
                                    hidden: true,
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '5 10 5 5',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox'
                            },
                            flex: 1,
                            defaults: {
                                margin: '5 0 0 30',
                                labelAlign: 'right',
                                labelWidth: 100,
                                width: '100%'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 120,
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            reference: 'ctlShiftComboDetail',
                                            fieldLabel: ViewUtil.getLabel('vdprShift'),
                                            flex: 1,
                                            bind: {
                                                store: '{shiftCombo}',
                                                value: '{theDetail.shftId}'
                                            },
                                            displayField: "shftNm",
                                            valueField: "shftId",
                                            queryMode: "local",
                                            emptyText: "Select",
                                            editable: false,
                                            allowBlank: false,
                                            emptyText: "Select"
                                        },

                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            flex: 1,
                                            reference: 'ctlHatchComboDetail',
                                            fieldLabel: ViewUtil.getLabel('vdprHatchNo'),
                                            bind: {
                                                store: '{hatchNoCombo}',
                                                value: '{theDetail.hatchNo}'
                                            },
                                            displayField: "scdNm",
                                            valueField: "scd",
                                            queryMode: "local",
                                            emptyText: "Select",
                                            forceSelection: true,
                                            editable: false,
                                            allowBlank: false,
                                            value: '',
                                            emptyText: "Select"
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('vdprDate'),
                                            reference: 'ctlPntyDtDetail',
                                            format: MOST.config.Locale.getShortDate(),
                                            forceSelection: true,
                                            editable: true,
                                            allowBlank: false,
                                            // bind: {
                                            //     value: "{theDetail.pntyDt}"
                                            // }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('particulars'),
                                            reference: 'ctlParticularsComboDetail',
                                            bind: {
                                                store: '{particularsCombo}',
                                                value: '{theDetail.itemCd}'
                                            },
                                            displayField: "scdNm",
                                            valueField: "scd",
                                            queryMode: "local",
                                            emptyText: "Select",
                                            editable: false,
                                            allowBlank: false,
                                            listeners: {
                                                select: 'changeParticularsEvent',
                                            },
                                            value: "",
                                            matchFieldWidth: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 120,
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: "textfield",
                                            flex: 1,
                                            fieldLabel: ViewUtil.getLabel('vesselDelayPenalty'),
                                            reference: "ctlVesselDelayPenaltyDetail",
                                            bind: {
                                                value: "{theDetail.pntyDescr}",
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            defaults: {
                                                margin: '5 0 0 5',
                                                labelAlign: 'right',
                                                labelWidth: 120
                                            },
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                // {
                                                //     xtype: 'label',
                                                //     text: ViewUtil.getLabel('additional'),
                                                //     style: 'text-align:center;'
                                                // },
                                                {
                                                    xtype: 'combo',
                                                    reference: 'ctlMachineDetail',
                                                    fieldLabel: ViewUtil.getLabel('vdprMachine'),
                                                    bind: '{theDetail.nofGang}',
                                                    bind: {
                                                        store: '{machineCombo}',
                                                        value: '{theDetail.machineCd}'
                                                    },
                                                    displayField: "name",
                                                    valueField: "code",
                                                    queryMode: "local",
                                                    emptyText: "Select",
                                                    editable: false,
                                                    allowBlank: false,
                                                    // listeners: {
                                                    //     change: 'changeParticularsEvent',
                                                    // },
                                                    value: "",
                                                    matchFieldWidth: false
                                                },
                                                {
                                                    xtype: "combo",
                                                    fieldLabel: ViewUtil.getLabel('vesselDelayRole'),
                                                    reference: "ctlVesselDelayRoleDetail",
                                                    bind: {
                                                        store: '{roleComboVesselDelay}',
                                                        value: '{theDetail.roleCd}'
                                                    },
                                                    queryMode: "local",
                                                    displayField: "scdNm",
                                                    valueField: "scd",
                                                    editable: false,
                                                    allowBlank: true,
                                                    // listeners: {
                                                    //     change: 'changeRoleEvent'
                                                    // },
                                                    value: "",
                                                    emptyText: "Select",
                                                    disabled: true
                                                },
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel: ViewUtil.getLabel('vdprDelayCode'),
                                                    reference: "ctlVslPnRptDelayCodeDetail",
                                                    allowBlank: false,
                                                    triggers: {
                                                        someField: {
                                                            cls: 'fa-search',
                                                            scope: 'controller',
                                                            handler: 'onOpenDelayCodePopup'
                                                        }
                                                    },
                                                    listeners: {
                                                        //focusleave:'onCheckedContractor',
                                                        change: 'onChangeUppercase'
                                                    },
                                                    bind: {
                                                        value: '{theDetail.rsnCd}'
                                                    }
                                                },
                                                {
                                                    xtype:"partnercdfield",
                                                    fieldLabel: ViewUtil.getLabel('vesselDelayContrator'),
                                                    width: 150,
                                                    reference:"ctlContractorDetail",
                                                    allowBlank: false,
                                                    params:{
                                                    	searchPtyDivCd: 'CTT'
                                                    },
                                                    bind: {
                                                        value: '{theDetail.contrator}'
                                                    },
                                                    listeners:{
                                                        change: function(){
                                                            var me = this;
                                                            me.setValue(this.getValue().toUpperCase());
                                                        },
                                                        //"focusleave":"onFieldFocusleave"
                                                    }
                                                    
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            defaults: {
                                margin: '5 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 120,
                                width: '100%'
                            },
                            layout: {
                                type: 'vbox',
                            },
                            items: [
                                // {
                                //     xtype: 'label',
                                //     text: ViewUtil.getLabel('summary'),
                                //     style: 'display:inline-block; text-align:center'
                                // },
                                {
                                    xtype: "datetimefield",
                                    fieldLabel: ViewUtil.getLabel('vesselDelayStartTime'),
                                    reference: "ctlStDtDetail",
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                    disabled: true,
                                    // bind: {
                                    //     value: "{theDetail.pntyTime}"
                                    // }
                                },
                                {
                                    xtype: "datetimefield",
                                    fieldLabel: ViewUtil.getLabel('vesselDelayEndTime'),
                                    reference: "ctlEndDtDetail",
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                    disabled: true,
                                    // bind: {
                                    //     value: "{theDetail.pntyEndTime}"
                                    // }
                                },
                                {
                                    xtype: "numberfield",
                                    fieldLabel: ViewUtil.getLabel('vesselDelayItemQty'),
                                    reference: "ctlVesselDelayItemQtyDetail",
                                    format: 0,
                                    filter: "string",
                                    minValue: 0,
                                    maxValue: 9999999999,
                                    decimalPrecision: 3,
                                    selectOnFocus: true,
                                    allowBlank: false,
                                    bind: {
                                        value: "{theDetail.itemQty}"
                                    }
                                },                                
                                {
                                    xtype: "textfield",
                                    fieldLabel: ViewUtil.getLabel('vdprTotalHrs'),
                                    reference: "ctlTotalHRSDetail",
                                    bind: {
                                        value: "{theDetail.pntyAmt}"
                                    },
                                    fieldStyle:"text-align:right;",
                                    readOnly: true
                                },
                                
                            ]
                        },
                    ]
                }
            ]
        });

        me.callParent();
    }
});