Ext.define('MOST.view.popup.WHCheckerSetLocPopupHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-whcheckersetlocpopuphht',

    requires: [
        'MOST.view.popup.WHCheckerSetLocPopupController',
        'MOST.view.popup.WHCheckerSetLocPopupModel'
    ],
    controller: 'whcheckersetlocpopup',

    viewModel: {
        type: 'whcheckersetlocpopup'
    },

    //title: 'W/H Allocation',

    shadow: false,
    autoSize: true,
    scrollable: true,
    width: 450,
    listeners: {
        painted: 'onLoad'
    },
    initialize: function () {
        var me = this;
        me.setItems({
            xtype: 'formpanel',
            reference: 'refDetail',
            padding: 0,
            layout: 'vbox',
            items: [
            	{//ButtonCRUD
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        margin: '5 0 0 5',
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                        },
                        {
                            xtype: 'button',
                            text: { type: 'bundle', key: 'ok' },
                            width: 100,
                            ui: 'action',
        					iconCls: 'x-fa fa-floppy-o',
                            handler: 'onConfirm'
                        },
                        {
                            xtype: 'button',
                            text: { type: 'bundle', key: 'cancel' },
                            width: 100,
                            ui: 'delete-button-modern',
        					iconCls: 'x-fa fa-times',
                            handler: 'onCancel'
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    margin: '10 0 0 0',
                    reference: 'refcboWHNO',
                    label: 'W/H No',
                    labelWidth: 80,
                    labelAlign: 'left',
                    displayField: 'locId',
                    valueField: 'locId',
                    queryMode: 'local',
                    clearable: true,
                    required: true,
                    editable: false,
                    placeholder: 'Select',
                    bind: {
                        store: '{warehouseCombo}',
                        value: '{theWarehouse.whId}'
                    },
                    listeners: {
                        select: 'onCboWHNOChange',
                    },
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            label: 'Cell Loc',
                            labelWidth: 80,
                            labelAlign: 'left',
                            reference: 'refcboRow',
                            required: true,
                            bind: {
                                store: '{warehouseListRow}',
                                value: '{theWarehouse.rowwId}'
                            },
                            margin: '0 10 0 0',
                            displayField: 'rowwId',
                            valueField: 'rowwId',
                            queryMode: 'local',
                            clearable: true,
                            editable: false,
                        },
                        {
                            xtype: 'combobox',
                            label: '',
                            labelWidth: 80,
                            flex: 1,
                            labelAlign: 'left',
                            reference: 'refcboBay',
                            required: true,
                            bind: {
                                store: '{warehouseListBay}',
                                value: '{theWarehouse.bayId}'
                            },
                            displayField: 'bayId',
                            valueField: 'bayId',
                            queryMode: 'local',
                            clearable: true,
                            editable: false,
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    reference: 'reftxtPlannedLoc',
                    label: 'Planned Loc',
                    labelWidth: 80,
                    labelAlign: 'left',
                    disabled: true,
                },
                {//Row Balance Amount:
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 10 0 0',
                            style: {
                                'text-align': 'right',
                            },
                            width: 70,
                            html: 'Balance',
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtBalQty',
                            minValue: 0,
                            defaultValue: 0,
                            disabled: true,
                            flex: 1,
                            decimals: 3,
                            ui: 'field-numbercolormodern',
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtBalMT',
                            minValue: 0,
                            defaultValue: 0,
                            disabled: true,
                            flex: 1,
                            decimals: 3,
                            ui: 'field-numbercolormodern',
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtBalM3',
                            minValue: 0,
                            defaultValue: 0,
                            disabled: true,
                            flex: 1,
                            ui: 'field-numbercolormodern',
                        }
                    ]
                },
                {//Row Amount to input
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 0 0',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 10 0 0',
                            style: {
                                'text-align': 'right',
                            },
                            width: 70,
                            html: 'Actual',
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtActQty',
                            required: true,
                            bind: {
                                value: '{theWarehouse.pkgQty}'
                            },
                            minValue: 0,
                            defaultValue: 0,
                            ui: 'field-inputnumbermodern',
                            flex: 1
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtActMT',
                            minValue: 0,
                            defaultValue: 0,
                            required: true,
                            bind: {
                                value: '{theWarehouse.wgt}'
                            },
                            ui: 'field-inputnumbermodern',
                            flex: 1,
                            decimals: 3
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtActM3',
                            required: true,
                            bind: {
                                value: '{theWarehouse.msrmt}'
                            },
                            minValue: 0,
                            defaultValue: 0,
                            ui: 'field-inputnumbermodern',
                            flex: 1,
                            decimals: 3
                        }
                    ]
                },
                {//Button Add Update Delete
                    xtype: 'container',
                    width: '100%',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'spacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: 'Add  ',
                            width: 150,
                            ui: 'retrieve-button-modern',
                            iconCls: 'x-fa fa-plus',
                            handler: 'onAdd',
                        },
                        {
                            xtype: 'spacer',
                            width: 5
                        },
                        {
                            xtype: 'button',
                            text: 'Update',
                            width: 150,
                            iconCls: 'x-fa fa-refresh',
                            ui: 'update-button-modern',
                            handler: 'onUpdate',
                        },
                        {
                            xtype: 'spacer',
                            width: 5
                        },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            width: 150,
                            ui: 'delete-button-modern',
                            iconCls: 'x-fa fa-minus',
                            handler: 'onDelete',
                        },
                    ]

                },
                {//Grid
                    xtype: 'container',
                    layout: 'hbox',
                    scrollable: true,
                    style: 'border: 1px solid silver; padding: 5px',
                    items: [
                        {
                            xtype: 'grid',
                            height: '220',
                            reference: 'refWHPopupHHTGrid',
                            listeners: {
                                select: 'onCellClick'
                            },
                            bind: {
                                store: '{warehouseList}'
                            },
                            selectable: {
                                mode: 'single',
                            },
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'No',
                                    width: 50,//'10%',
                                    align: 'center'
                                },
                                {
                                    width: 100,//'10%','20%',
                                    dataIndex: 'whId',
                                    text: 'W/H'
                                },
                                {
                                    width: 100,//'10%','20%',
                                    dataIndex: 'rowwId',
                                    text: 'Row'
                                },
                                {
                                    width: 100,//'10%','20%',
                                    dataIndex: 'bayId',
                                    text: 'Bay'
                                },
                                {
                                    width: 100,//'10%','10%',
                                    dataIndex: 'wgt',
                                    text: 'MT'
                                },
                                {
                                    width: 100,//'10%','10%',
                                    dataIndex: 'msrmt',
                                    text: 'M3'
                                },
                                {
                                    width: 100,//'10%','10%',
                                    dataIndex: 'pkgQty',
                                    text: 'pkgQty'
                                }
                            ]

                        }
                    ]
                },
                
            ]

        });
        me.callParent();
    },

    afterRender: function () {
        var me = this;
        //me.getController().onPopupHHTLoad();
        me.callParent(arguments);
    }
});
