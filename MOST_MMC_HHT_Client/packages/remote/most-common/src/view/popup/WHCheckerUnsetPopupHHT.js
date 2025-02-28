Ext.define('MOST.view.popup.WHCheckerUnSetPopupHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-wcunsetpopuphht',
    requires: [
        'MOST.view.popup.WHCheckerUnsetPopupController',
        'MOST.view.popup.WHCheckeUnsetPopupModel'
    ],
    controller: 'whcheckerunsetpopup',
    viewModel: {
        type: 'whcheckerunsetpopup'
    },

    //title: 'W/H De-Allocation',

    shadow: false,
    autoSize: true,
    scrollable: true,
    width: 500,
    minWidth: 500,
    listeners: {
        painted: 'onLoad'
    },
    // initialize: function () {
    //     var me = this;
    //     me.setItems();
    //     me.callParent();
    // },

    // afterRender: function () {
    //     var me = this;
    //     //me.getController().onPopupHHTLoad();
    //     me.callParent(arguments);
    // }
    items: [
        {
            xtype: 'formpanel',
            reference: 'refDetail',
            padding: 0,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {//Button
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'top',
                        pack: 'end',
                        
                    },
                    defaults: {
                        margin: '5 0 5 5',
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: { type: 'bundle', key: 'ok' },
                            //width: 120,
                            ui: 'action',
        					iconCls: 'x-fa fa-floppy-o',
                            handler: 'onConfirm'
                        },
                        {
                            xtype: 'button',
                            text: { type: 'bundle', key: 'cancel' },
                            //width: 120,
                            ui: 'delete-button-modern',
        					iconCls: 'x-fa fa-times',
                            handler: 'onCancel'
                        }
                    ]
                },
                {//Doc/ Select Loc
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        labelAlign: 'left',
                        labelTextAlign: 'right',
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'reftxtCgNo',
                            flex: 1,
                            disabled: true,
                            label: 'Cargo No',
                            labelWidth: 95,
                            labelAlign: 'left',
                            required: true
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        
                        {
                            xtype: 'combobox',
                            reference: 'refcboSpareCg',
                            flex: 1,
                            label: 'Cargo No',
                            labelWidth: 80,
                            labelAlign: 'left',
                            displayField: 'cgNo',
                            valueField: 'cgNo',
                            queryMode: 'local',
                            clearable: true,
                            required: true,
                            bind: {
                                store: '{exportList}',
                                value: '{theWarehouse.cgNo}'
                            },
                            listeners: {
                                select: 'onCboWHNOChange',
                            },
                            typeAhead: true
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {//Combobox Location:
                            xtype: 'combobox',
                            reference: 'refcboLocation',
                            flex: 1,
                            editable: false,
                            label: 'Loc',
                            labelAlign: 'left',
                            labelWidth: 40,
                            labelAlign: 'left',
                            displayField: 'strLoc',
                            valueField: 'locId',
                            queryMode: 'local',
                            clearable: true,
                            required: true,
                            bind: {
                                store: '{locList}',
                                value: '{theWarehouse.whId}'
                            },
                            listeners: {
                                select: 'oncboLocationChange',
                            },
                            typeAhead: true
                        }
                    ]
                },
                {//Loc Amount -------------------------
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        labelTextAlign: 'right',
                    },
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 5 0 0',
                            style: {
                                'text-align': 'right',
                            },
                            width: 90,
                            html: 'Loc Amt'
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtCellQty',
                            flex: 1,
                            disabled: true,
                            minValue: 0,
                            defaultValue: 0,
                            width: 120,
                            ui: 'field-numbercolormodern',
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtCellMt',
                            flex: 1,
                            minValue: 0,
                            defaultValue: 0,
                            disabled: true,
                            decimals: 3,
                            ui: 'field-numbercolormodern',
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtCellM3',
                            flex: 1,
                            disabled: true,
                            minValue: 0,
                            defaultValue: 0,
                            width: 120,
                            decimals: 3,
                            ui: 'field-numbercolormodern',
                        },
                    ]
                },
                {//Handling Amount -------------------------
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        labelTextAlign: 'right',
                    },
                    items:[
                        {
                            xtype: 'label',
                            width: 90,
                            margin: '0 5 0 0',
                            style: {
                                'text-align': 'right',
                            },
                            html: 'Load Amt'
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtTotQty',
                            flex: 1,
                            disabled: true,
                            bind: {
                            },
                            minValue: 0,
                            defaultValue: 0,
                            ui: 'field-numbercolormodern',
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtTotMt',
                            flex: 1,
                            disabled: true,
                            minValue: 0,
                            defaultValue: 0,
                            decimals: 3,
                            ui: 'field-numbercolormodern',
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtTotM3',
                            flex: 1,
                            disabled: true,
                            minValue: 0,
                            defaultValue: 0,
                            decimals: 3,
                            ui: 'field-numbercolormodern',
                        }
                    ]
                },
                {//Actual Amount: -------------------------
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        labelTextAlign: 'right',
                    },
                    items: [
                        {
                            xtype: 'label',
                            width: 90,
                            margin: '0 5 0 0',
                            style: {
                                'text-align': 'right',
                            },
                            html: 'Actual Amt'
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtQty',
                            flex: 1,
                            required: true,
                            bind: {
                                value: '{theWarehouse.pkgQty}'
                            },
                            minValue: 0,
                            defaultValue: 0,
                            ui: 'numbercolormodern',
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtMT',
                            flex: 1,
                            minValue: 0,
                            defaultValue: 0,
                            required: true,
                            bind: {
                                value: '{theWarehouse.wgt}'
                            },
                            decimals: 3,
                            ui: 'numbercolormodern',
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'reftxtM3',
                            flex: 1,
                            required: true,
                            bind: {
                                value: '{theWarehouse.msrmt}'
                            },
                            minValue: 0,
                            defaultValue: 0,
                            decimals: 3,
                            ui: 'numbercolormodern',
                        },
                        
                    ]
                },
                {//Button
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    defaults:{
                        width: 120
                    },
                    items: [
                        {
                            xtype: 'spacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: 'Add  ',
                            width: 105,
                            ui: 'create-button-modern',
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
                            width: 105,
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
                            width: 105,
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
                                    width: 50,
                                    align: 'center'
                                },
                                {
                                    width: 100,
                                    dataIndex: 'cgNo',
                                    text: 'Cg No'
                                },
                                {
                                    width: 100,
                                    dataIndex: 'whId',
                                    text: 'W/H'
                                },
                                {
                                    width: 100,
                                    dataIndex: 'wgt',
                                    text: 'MT'
                                },
                                {
                                    width: 100,
                                    dataIndex: 'msrmt',
                                    text: 'M3'
                                },
                                {
                                    width: 100,
                                    dataIndex: 'pkgQty',
                                    text: 'Qty'
                                }
                            ]
                        }
                    ]
                },
                // {
                //     xtype: 'container',
                //     width: '100%',
                //     layout: 'hbox',
                //     margin: '5 0 5 0',
                //     items: [
                //         {
                //             xtype: 'spacer',
                //             flex: 1,
                //         },
                //         {
                //             xtype: 'button',
                //             text: 'OK',
                //             width: 100,
                //             ui: 'action',
                //             handler: 'onConfirm'
                //         },
                //         {
                //             xtype: 'spacer',
                //             width: 5
                //         },
                //         {
                //             xtype: 'button',
                //             text: 'Cancel',
                //             width: 100,
                //             ui: 'action',
                //             handler: 'onCancel'
                //         }
                //     ]
                // },
            ]
        }
    ]
});
