Ext.define('MOST.view.configuration.ServiceOrderSettingDetailUnitSetting', {
    extend: 'Ext.container.Container',

    alias: 'widget.app-serviceordersettingdetailunitsetting',

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

    lblUom: {type: 'bundle', key: 'soc_uom'},
    lblDecPt: {type: 'bundle', key: 'soc_decPt'},
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
                },
                items: [{
                    xtype: 'textfield',
                    reference: 'refUnitTtlTxtFld',
                    fieldLabel: ViewUtil.getLabel('soc_unit1Tit'),
                    width: 324,
                    labelWidth: 144,
                    bind: {
                        value: '{serviceOrderSettingItem.unitTit}'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'refUnitUomCombo',
                    fieldLabel: me.lblUom,
                    width: 150,
                    labelWidth: 40,
                    queryMode: 'local',
                    bind: {
                        store: '{unit1ComboStore}',
                        value: '{serviceOrderSettingItem.unitUom}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    editable: false,
                    emptyText: me.lblSelect
                }, {
                    xtype: 'numberfield',
                    reference: 'refUnitDecPtNumFld',
                    fieldLabel: me.lblDecPt,
                    width: 150,
                    labelWidth: 80,
                    maxValue: 3,
                    minValue: 0,
                    bind: {
                        value: '{serviceOrderSettingItem.unitDec}'
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
                    reference: 'refUnit1ChkBox',
                    name: 'unit1Chk',
                    hidden: true,
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }, {
                    xtype: 'textfield',
                    reference: 'refUnit1TtlTxtFld',
                    fieldLabel: ViewUtil.getLabel('soc_unit2Tit'),
                    width: 324,
                    labelWidth: 144,
                    bind: {
                        value: '{serviceOrderSettingItem.unit1Tit}'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'refUnit1UomCombo',
                    fieldLabel: me.lblUom,
                    width: 150,
                    labelWidth: 40,
                    queryMode: 'local',
                    bind: {
                        store: '{unit2ComboStore}',
                        value: '{serviceOrderSettingItem.unit1Uom}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    editable: false,
                    emptyText: me.lblSelect,
                    listeners: {
                    	change: 'onSelectUnit'
                    }
                }, {
                    xtype: 'numberfield',
                    reference: 'refUnit1DecPtNumFld',
                    fieldLabel: me.lblDecPt,
                    width: 150,
                    labelWidth: 80,
                    maxValue: 3,
                    minValue: 0,
                    bind: {
                        value: '{serviceOrderSettingItem.unit1Dec}'
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
                    reference: 'refUnit2ChkBox',
                    name: 'unit2Chk',
                    hidden: true,
                    listeners: {
                        change: 'onCheckboxChanged'
                    }
                }, {
                    xtype: 'textfield',
                    reference: 'refUnit2TtlTxtFld',
                    fieldLabel: ViewUtil.getLabel('soc_unit3Tit'),
                    width: 324,
                    labelWidth: 144,
                    bind: {
                        value: '{serviceOrderSettingItem.unit2Tit}'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'refUnit2UomCombo',
                    fieldLabel: me.lblUom,
                    width: 150,
                    labelWidth: 40,
                    queryMode: 'local',
                    bind: {
                        store: '{unit3ComboStore}',
                        value: '{serviceOrderSettingItem.unit2Uom}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    editable: false,
                    emptyText: me.lblSelect,
                    listeners: {
                    	change: 'onSelectUnit'
                    }
                }, {
                    xtype: 'numberfield',
                    reference: 'refUnit2DecPtNumFld',
                    fieldLabel: me.lblDecPt,
                    width: 150,
                    labelWidth: 80,
                    maxValue: 3,
                    minValue: 0,
                    bind: {
                        value: '{serviceOrderSettingItem.unit2Dec}'
                    }
                }]
            }]
        });

        me.callParent();
    }
});
