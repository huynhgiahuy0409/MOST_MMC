Ext.define('MOST.view.billing.PackageTariffRateDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-packagetariffratedetail',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab'
    ],

    height: 504,
    width: 960,
    listeners: {
        afterrender: 'onPackageDetailLoad', 

    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    config: {
        recvData: null,
        masterItem: null,
        listData: null
    },
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            xtype: 'form',
            defaults: {
                margin: '5 5 0 5' // top, right, bottom, left
            },
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            items: [
                {
                    xtype: 'tabpanel',
                    reference: 'ctlMegaDetailTabPanel',
                    flex: 1,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'app-packagetariffratetabhead',
                            reference: 'refpackageTariffRateTabHead',
                            title: ViewUtil.getLabel('header'),
                            flex: 1
                        },
                        {
                            xtype: 'app-packagetariffratetabdetail',
                            reference: 'refpackageTariffRateTabDetail',
                            title: ViewUtil.getLabel('detail'),
                            flex: 1
                        },
                    ]
                }
            ]
        });

        me.callParent();
    }
});