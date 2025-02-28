Ext.define('MOST.view.operation.LorryLoadingConfirm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-lorryloadingconfirm',
    
    requires: [
        'MOST.view.operation.LorryLoadingConfirmModel',
        'MOST.view.operation.LorryLoadingConfirmController',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel'
    ],
    
    controller: 'lorryloadingconfirm',
    
    viewModel: {
        type: 'lorryloadingconfirm',
    },
    
    // listeners:{
    //     afterrender: 'onLoad'
    // },
    
    layout : {type  : 'vbox', align : 'stretch'},
    
    initComponent: function() {
        var me = this;
            
        Ext.apply(me, {
            xtype:'form',
            defaults:{
                margin: '5 5 5 20' // top, right, bottom, left
            },
            layout : {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    height: 600,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '5 0 0 0'// top, right, bottom, left
                    },
                    
                    items: [
                        {
                            xtype: 'container',
                            height: 34,
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 85,
                                margin: '5 5 0 5'
                            },
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    reference: 'ctlFromYearMonth',
                                    fieldLabel: ViewUtil.getLabel('date'),
                                    width: 280,
                                    format: MOST.config.Locale.getShortDate(),
                                    labelAlign: 'right',
                                    labelWidth: 100,
                                    listeners: {
                                        blur: 'onMonthfieldChanged',
                                    },
                                    fieldStyle: { "background-color": "#f0f8ff" },
                                    editable: false
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'ctlShippingNote',
                                    fieldLabel: ViewUtil.getLabel('sn'),
                                    width: 280,
                                    labelWidth: 100,
                                    readOnly: true,
                                    inputAttrTpl: 'style="background-color: #f0f8ff !important;"',
                                    bind: '{theLorry.sn}'
                                },
                                {
                                    xtype: 'combo',
                                    reference: 'refLorryNoConfirmCombo',
                                    fieldLabel: ViewUtil.getLabel('lorryNoConfirm'),
                                    queryMode: 'local',
                                    editable: false,
                                    width: 280,
                                    labelWidth: 100,
                                    bind: {
                                        store: '{lorryLoadingConfirmItems}',
                                        value: '{theLorry.lorryNo}'
                                    },
                                    displayField: 'lorryNo',
                                    valueField: 'lorryNo',
                                    listeners: {
                                        select: 'onWarehouseSelect'
                                    },
                                    fieldStyle: { "background-color": "#f0f8ff" },
                                },
                                {
                                    xtype: 'combo',
                                    reference: 'refLorryTankConfrimCombo',
                                    fieldLabel: ViewUtil.getLabel('lorryTankConfirm'),
                                    queryMode: 'local',
                                    editable: false,
                                    width: 280,
                                    labelWidth: 100,
                                    bind: {
                                        store: '{sulphurConfigurationItems}'
                                    },
                                    displayField: 'locNm',
                                    valueField: 'locId',
                                    listeners: {
                                        select: 'onWarehouseSelect'
                                    },
                                    fieldStyle: { "background-color": "#f0f8ff" }
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        labelAlign: 'right',
                                    },
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            reference: 'ctlLorryLoadConfirm',
                                            fieldLabel: ViewUtil.getLabel('lorryLoadConfirm'),
                                            bind: '{theLorry.lorryLoadMt}',
                                            hideTrigger: true,
                                            minValue: 0,
                                            width: 280,
                                            labelWidth: 100,
                                            fieldStyle: 'background-color: #f0f8ff !important;'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '5 5 0 5',
                                            text: 'MT'
                                        }
                                    ]
                                }
                            ] 
                        }, {
                            xtype: 'container',
                            height: 34,
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 35,
                                margin: '5 5 0 0'
                            },
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'container', 
                                    height: 32, 
                                },
                                {
                                    xtype: 'container',
                                    height: 20,
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'ctlLorryTripConfirm',
                                    fieldLabel: ViewUtil.getLabel('lorryTripConfirm'),
                                    width: 80,  
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems:[
                {
                    xtype: 'container',
                    style: { "background-color":"white" },
                    layout: {
                        type: 'hbox',
                    },
                    defaults: {
                        margin: '1 1 1 1'
                    },
                    items: [
                        {
                            xtype: 'tbfill'
                        },{
                            xtype: 'button',
                            itemId: 'saveItemId',
                            reference:'refBtnSave',
                            text: ViewUtil.getLabel('save'),
                            iconCls: 'x-fa fa-save',
                            listeners: {
                                click: 'onSave'
                            }
                        }
                    ]
                }
            ]
        });
        
        me.callParent();
    }
});