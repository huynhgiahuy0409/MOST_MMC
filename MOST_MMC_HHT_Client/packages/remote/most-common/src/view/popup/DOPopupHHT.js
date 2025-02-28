Ext.define('MOST.view.popup.DOPopupHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-dopopuphht',

    requires: [
        'MOST.view.popup.DOPopupHHTModel',
        'MOST.view.popup.DOPopupHHTController',
    ],


    controller: 'dopopuphht',

    viewModel: {
        type: 'dopopuphht'
    },


    autoSize: true,
    shadow: false,
    layout: 'vbox',
    scrollable: true,
    width: 650,
    listeners: {
        painted: 'onLoad'
    },

    initialize: function () {
        var me = this;
        me.setItems(
            {
                xtype: 'formpanel',
                padding: '0 0 0 0',
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            labelAlign: 'left',
                            labelWidth: 100,
                            labelTextAlign: 'right',
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                label: { type: 'bundle', key: 'vslcallid' },
                                required: true,
                                flex: 1,
                                reference: 'refTxtDOPopVslCallId',
                                listeners: {
                                    change: function (field, newValue) {
                                        field.setValue(newValue.toUpperCase());
                                    }
                                },
                            },
                            {
                                xtype: 'button',
                                width: 150,
                                reference: 'refBtnSearchLorryNoHHT',
                                text: { type: 'bundle', key: 'search' },
                                margin: '0 0 5 10',
                                iconCls: 'x-fa fa-search',
                                ui: 'retrieve-button-modern',
                                handler: 'onSearch',
                            },
                            {
                                xtype: 'button',
                                width: 150,
                                margin: '0 0 5 5',
                                reference: 'refBtnSelectHHT',
                                text: { type: 'bundle', key: 'select' },
                                ui: 'action',
                                iconCls: 'x-fa fa-check-square-o',
                                handler: 'onSelect',
                            }

                        ]
                    },
                    //DO NO Textfield
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        defaults: {
                            labelAlign: 'left',
                            labelWidth: 100,
                            labelTextAlign: 'right',
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                flex: 1,
                                label: { type: 'bundle', key: 'blNo' },
                                reference: 'refCboDOPopBlNo',
                                queryMode: 'local',
                                bind: {
                                    store: '{blCombo}'
                                },
                                displayField: 'scdNm',
                                valueField: 'blno',
                                editable: false,
                            },
                            {
                                xtype: 'textfield',
                                reference: 'refTxtDONo',
                                label: { type: 'bundle', key: 'doNo' },
                                editable: true,
                                flex: 1,
                                listeners: {
                                    change: function (field, newValue) {
                                        field.setValue(newValue.toUpperCase());
                                    }
                                }
                            },
                        ]
                    },
                    //gird
                    {
                        xtype: 'grid',
                        reference: 'refDeliveryOrderPopupGrid',
                        height: '300',
                        style: 'border: 1px solid silver; padding: 5px',
                        flex: 1,
                        bind: {
                            store: '{deliveryOrderPopupStore}'
                        },
                        listeners: {
                            childdoubletap: 'onHHTDblClick'
                        },
                        selectable: {
                            mode: 'single',
                            checkbox: true,
    						checkboxSelect: true,
    						rows: true
                        },
                        columns: [
                            {
                                text: { type: 'bundle', key: 'gridNo' },
                                xtype: 'rownumberer',
                                width: 50,
                                align: 'center'
                            },
                            {
                                text: { type: 'bundle', key: 'mfDocId' },
                                dataIndex: 'mfDocId',
                                reference: 'refMfDocId',
                                filter: 'string',
                                width: 170
                            },
                            {
                                text: { type: 'bundle', key: 'LABLNo' },
                                dataIndex: 'blNo',
                                reference: 'refBlno',
                                filter: 'string',
                                width: 170
                            },
                            {
                                text: { type: 'bundle', key: 'LADONo' },
                                hidden: true,
                                dataIndex: 'doNo',
                                reference: 'refDono',
                                filter: 'string',
                                width: 170
                            },
                            {
                                text: { type: 'bundle', key: 'DONo' },
                                dataIndex: 'doNo',
                                reference: 'refDONo',
                                filter: 'string',
                                width: 170
                            },
                            {
                                text: { type: 'bundle', key: 'vessel' },
                                dataIndex: 'vslCallId',
                                reference: 'refVslCallId',
                                filter: 'string',
                                width: 170
                            }
                        ]
                    }
                ]
            });
        me.callParent();
    },

    afterRender: function () {
        var me = this;
        me.getController().onLoad();
        me.callParent(arguments);
    }
});
