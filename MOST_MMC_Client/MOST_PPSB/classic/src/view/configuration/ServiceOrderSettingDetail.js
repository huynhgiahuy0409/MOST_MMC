Ext.define('MOST.view.configuration.ServiceOrderSettingDetail', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.app-serviceordersettingdetail',

    requires: [
        'MOST.view.configuration.ServiceOrderSettingController',
        'MOST.view.configuration.ServiceOrderSettingModel'
    ],

    listeners: {
        afterrender: 'onLoadDetail'
    },

    defaults: {
        margin : '5 5 5 5'
    },

    lblCat1: {type:'bundle', key:'soc_cat1'},
    lblCat2: {type:'bundle', key:'soc_cat2'},
    lblCat3: {type:'bundle', key:'soc_cat3'},
    lblSelect: {type: 'bundle', key: 'select'},


    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'fieldset',
                    reference: 'refCategoriesFieldset',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    listeners: {
                        fieldValidityChange: 'onCategoryFieldsetValidityChange'
                    },
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
                            xtype: 'combo',
                            reference: 'refCategory1DetailCombo',
                            fieldLabel: me.lblCat1,
                            width: 220,
                            labelWidth: 80,
                            queryMode: 'local',
                            bind: {
                                store: '{category1ComboStore}',
                                value: '{serviceOrderSettingItem.category1}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            allowBlank: false,
                            emptyText: me.lblSelect,
                            listeners: {
                                change: 'onCategoryChange'
                            }
                        },{
                            xtype: 'combo',
                            reference: 'refCategory2DetailCombo',
                            fieldLabel: me.lblCat2,
                            width: 220,
                            labelWidth: 80,
                            queryMode: 'local',
                            bind: {
                                store: '{category2ComboStore}',
                                value: '{serviceOrderSettingItem.category2}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            emptyText: me.lblSelect,
                            listeners: {
                                change: 'onCategoryChange'
                            }
                        },{
                            xtype: 'combo',
                            reference: 'refCategory3DetailCombo',
                            fieldLabel: me.lblCat3,
                            width: 220,
                            labelWidth: 80,
                            queryMode: 'local',
                            bind: {
                                store: '{category3ComboStore}',
                                value: '{serviceOrderSettingItem.category3}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            emptyText: me.lblSelect
                        }]
                    }]
                },{
                    xtype: 'fieldset',
                    reference: 'refDatesFieldset',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    listeners: {
                        fieldValidityChange: 'onDatesFieldsetValidityChange'
                    },
                    items: [{
                        xtype: 'app-serviceordersettingdetaildatesetting'
                    }]
                },{
                    xtype: 'fieldset',
                    reference: 'refUnitsFieldset',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    listeners: {
                        fieldValidityChange: 'onUnitsFieldsetValidityChange'
                    },
                    items: [{
                        xtype: 'app-serviceordersettingdetailunitsetting'
                    }]
                },{
                    xtype: 'fieldset',
                    reference: 'refEtcFieldset',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    listeners: {
                        fieldValidityChange: 'onEtcFieldsetValidityChange'
                    },
                    items: [{
                        xtype: 'app-serviceordersettingdetailetcsetting'
                    }]
                }]
            }]
        });

        me.callParent();
    }
});
