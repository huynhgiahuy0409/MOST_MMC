Ext.define('MOST.view.configuration.ServiceOrderSettingDetailEtcSetting', {
    extend: 'Ext.container.Container',

    alias: 'widget.app-serviceordersettingdetailetcsetting',

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

    lblPayTpDtl: {type: 'bundle', key: 'soc_payTpDtl'},
    lblProcessType: {type:'bundle', key:'soc_processType'},
    lblLocationChk: {type:'bundle', key:'soc_locationChk'},
    lblRmkChk: {type:'bundle', key:'soc_rmkChk'},
    lblCmdtChk: {type:'bundle', key:'soc_cmdtChk'},
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
                    margin: '5 5 0 0'
                },
                items: [{
                    xtype: 'combobox',
                    reference: 'refPaymentTpCombo',
                    fieldLabel: me.lblPayTpDtl,
                    width: 250,
                    labelWidth: 100,
                    queryMode: 'local',
                    bind: {
                        store: '{paymentMethodComboStore}',
                        value: '{serviceOrderSettingItem.payTpCd}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    emptyText: me.lblSelect,
                    editable: false
                },{
                    xtype: 'checkboxfield',
                    reference: 'refLocationChkBox',
                    name: 'locChk',
                    boxLabel: me.lblLocationChk,
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                },{
                    xtype: 'checkboxfield',
                    reference: 'refRmkChkBox',
                    name: 'rmkChk',
                    boxLabel: me.lblRmkChk,
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                },{
                    xtype: 'checkboxfield',
                    reference: 'refCmdtyChkBox',
                    name: 'cmdtyChk',
                    boxLabel: me.lblCmdtChk,
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }]
            },{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'left'
                },
                hidden: true,
                defaults: {
                    labelAlign: 'right',
                    margin: '5 5 0 0'
                },
                items: [{
                    xtype: 'combobox',
                    reference: 'refProcessTpCombo',
                    fieldLabel: me.lblProcessType,
                    width: 250,
                    labelWidth: 100,
                    queryMode: 'local',
                    bind: {
                        store: '{processTypeComboStore}',
                        value: '{serviceOrderSettingItem.prcTpCd}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    emptyText: me.lblSelect,
                    listeners: {
                        change: 'onDetailProcessTpChange'
                    },
                    editable: false,
                    forceSelection: true
                },{
                    xtype: 'textfield',
                    reference: 'refProcessTypeDetailDesc',
                    width: 400,
                    readOnly: true
                }]
            },{
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
                    reference: 'refChkDocument',
                    margin: '5 5 0 27',
                    boxLabel: ViewUtil.getLabel('documentChk'),
                    labelAlign: 'right',
                    boxLabelAlign: 'after',
                    name: 'documentChk',
                    bind: {
                        value: '{serviceOrderSettingItem.documentChk}'
                    },
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                },{
                    xtype: 'combobox',
                    reference: 'refDocumentTpCombo',
                    width: 145,
                    queryMode: 'local',
                    bind: {
                        store: '{documentTypeComboStore}',
                        value: '{serviceOrderSettingItem.documentTp}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    emptyText: me.lblSelect,
                    editable: false,
                    disabled: true,
                    forceSelection: true
                },{
                    xtype: 'textfield',
                    reference: 'refBLSNCombo',
                    queryMode: 'local',
                    bind: {
                        value: '{serviceOrderSettingItem.documentNm}'
                    },
                    hidden: true,
                    forceSelection: true
                },{
                    xtype: 'checkboxfield',
                    reference: 'refChkUnit',
                    name: 'unitChk',
                    boxLabel: ViewUtil.getLabel('unitNo'),
                    labelAlign: 'right',
                    boxLabelAlign: 'after',
                    labelWidth: 120,
                    bind: {
                        value: '{serviceOrderSettingItem.unitChk}'
                    },
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }]
            }]
        });

        me.callParent();
    }
});
