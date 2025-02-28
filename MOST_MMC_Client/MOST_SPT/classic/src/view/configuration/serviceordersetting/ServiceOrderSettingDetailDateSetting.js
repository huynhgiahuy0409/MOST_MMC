Ext.define('MOST.view.configuration.ServiceOrderSettingDetailDateSetting', {
    extend: 'Ext.container.Container',

    alias: 'widget.app-serviceordersettingdetaildatesetting',

    requires: [
        'MOST.view.configuration.ServiceOrderSettingController',
        'MOST.view.configuration.ServiceOrderSettingModel'
    ],

    layout: {
        type: 'vbox'
    },

    defaults: {
        margin: '5 5 0 0',
    },

    lblShiftChk: {type: 'bundle', key: 'soc_dtlShiftChk'},
    lblSvcDtFmt: {type: 'bundle', key: 'soc_svcDtFmt'},
    lblDtFmt: {type: 'bundle', key: 'soc_dtFmt'},
    lblDtTp: {type: 'bundle', key: 'soc_dtTp'},
    lblDt1Ttl: {type: 'bundle', key: 'soc_dt1Ttl'},
    lblDt2Ttl: {type: 'bundle', key: 'soc_dt2Ttl'},
    lblSvcShft: {type: 'bundle', key: 'soc_svcShft'},
    lblSelect: {type: 'bundle', key: 'select'},

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'left'
                },
                defaults: {
                    labelAlign: 'right',
                    margin: '5 5 0 0',
                    editable: false
                },
                items: [{
                    xtype: 'combobox',
                    reference: 'refSvcDtFmtCombo',
                    fieldLabel: me.lblSvcDtFmt,
                    width: 300,
                    labelWidth: 130,
                    queryMode: 'local',
                    bind: {
                        store: '{dateFormatComboStore}',
                        value: '{serviceOrderSettingItem.svcDtFmt}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    value: 'YMD',
                    allowBlank: false,
                    emptyText: me.lblSelect
                }, {
                    xtype: 'checkboxfield',
                    reference: 'refSvcDtTpChkBox',
                    name: 'svcDtTp',
                    boxLabel: me.lblDtTp,
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }]
            }, {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'left'
                },
                defaults: {
                    labelAlign: 'right',
                    margin: '5 5 0 0'
                },
                items: [{
                    xtype: 'checkboxfield',
                    reference: 'refDt1ChkBox',
                    name: 'dt1Chk',
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }, {
                    xtype: 'textfield',
                    reference: 'refDt1TtlTxtFld',
                    fieldLabel: me.lblDt1Ttl,
                    width: 300,
                    labelWidth: 120,
                    bind: {
                        value: '{serviceOrderSettingItem.dt1Tit}'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'refDt1FmtCombo',
                    fieldLabel: me.lblDtFmt,
                    width: 260,
                    labelWidth: 70,
                    queryMode: 'local',
                    bind: {
                        store: '{dateFormatComboStore}',
                        value: '{serviceOrderSettingItem.dt1Fmt}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    editable: false,
                    emptyText: me.lblSelect,
                }, {
                    xtype: 'checkboxfield',
                    reference: 'refDt1TpChkBox',
                    name: 'dt1Tp',
                    boxLabel: me.lblDtTp,
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }]
            }, {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'left'
                },
                defaults: {
                    labelAlign: 'right',
                    margin: '5 5 0 0'
                },
                items: [{
                    xtype: 'checkboxfield',
                    reference: 'refDt2ChkBox',
                    name: 'dt2Chk',
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }, {
                    xtype: 'textfield',
                    reference: 'refDt2TtlTxtFld',
                    fieldLabel: me.lblDt2Ttl,
                    width: 300,
                    labelWidth: 120,
                    bind: {
                        value: '{serviceOrderSettingItem.dt2Tit}'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'refDt2FmtCombo',
                    fieldLabel: me.lblDtFmt,
                    width: 260,
                    labelWidth: 70,
                    queryMode: 'local',
                    bind: {
                        store: '{dateFormatComboStore}',
                        value: '{serviceOrderSettingItem.dt2Fmt}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    editable: false,
                    emptyText: me.lblSelect,
                }, {
                    xtype: 'checkboxfield',
                    reference: 'refDt2TpChkBox',
                    name: 'dt2Tp',
                    boxLabel: me.lblDtTp,
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }]
            }, {
                xtype: 'checkboxfield',
                reference: 'refshftChkBox',
                name: 'shftChk',
                boxLabel: me.lblShiftChk,
                listeners: {
                    change: 'onCheckboxChanged'
                }
            }]
        });

        me.callParent();
    }
});
