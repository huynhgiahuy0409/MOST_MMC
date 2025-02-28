Ext.define('MOST.view.popup.SpaceMovementAllocationPopup', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.popup-spacemovementallocationpopup',

    requires: [
        'MOST.view.popup.SpaceMovementAllocationPopupController',
        'MOST.view.popup.SpaceMovementAllocationPopupModel'
    ],

    layout: 'fit',

    width: 1200,
    height: 600,
    scrollable: true,

    controller: 'spacemovementallocationpopup',

    viewModel: {
        type: 'spacemovementallocationpopup'
    },
    title: 'Warehouse Allocation For Space Movement Plan',
    listeners: {
        afterrender: 'onLoad'
    },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {// Warehouse part
                            xtype: 'panel',
                            reference: 'refWarehouseViewWrapper',
                            flex: 2,
                            listeners: {
                                resize: 'onResizeWrapper'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    reference: 'refWarehouseLayoutView',
                                    scrollable: true,
                                    layout: {
                                        type: 'absolute'
                                    },
                                    listeners: {
                                        render: 'onLayoutViewRender'
                                    }
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    padding: '5 5 5 5',
                                    hidden: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Warehouse',
                                            editable: false,
                                            allowBlank: true,
                                            reference: 'refWarehouse',
                                            displayField: 'locNm',
                                            valueField: 'locId',
                                            labelWidth: 60,
                                            width: 225,
                                            queryMode: 'local',
                                            bind: {
                                                store: '{warehouseList}'
                                            },
                                            listeners: {
                                                change: 'onWarehouseComboSelect'
                                            }
                                        }, {
                                            xtype: 'button',
                                            text: 'Mode',
                                            iconCls: 'fa fa-qrcode',
                                            arrowAlign: 'right',
                                            reference: 'refMode',
                                            width: 100,
                                            menu: [
                                                {
                                                    xtype: 'segmentedbutton',
                                                    vertical: false,
                                                    items: [
                                                        {
                                                            text: 'Occupied',
                                                            value: 'occupied',
                                                            reference: 'refOccupied',
                                                            pressed: true,
                                                            listeners: {
                                                                click: 'onChangeColorBy'
                                                            }
                                                        }, {
                                                            text: 'Plan',
                                                            value: 'plan',
                                                            reference: 'refPlan',
                                                            listeners: {
                                                                click: 'onChangeColorBy'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }, {
                                            xtype: 'button',
                                            text: 'By Color',
                                            iconCls: 'fa fa-th-large',
                                            arrowAlign: 'right',
                                            width: 100,
                                            menu: [{
                                                xtype: 'segmentedbutton',
                                                vertical: false,
                                                items: [{
                                                    text: 'Vessel',
                                                    value: 'vessel',
                                                    reference: 'refColorByCargo',
                                                    pressed: true,
                                                    listeners: {
                                                        click: 'onWarehouseColorModeChange'
                                                    }
                                                }, {
                                                    text: 'Category',
                                                    value: 'category',
                                                    reference: 'refColorByPOD',
                                                    listeners: {
                                                        click: 'onWarehouseColorModeChange'
                                                    }
                                                }, {
                                                    text: 'Cargo Type',
                                                    value: 'cargo',
                                                    reference: 'refColorByCntry',
                                                    listeners: {
                                                        click: 'onWarehouseColorModeChange'
                                                    }
                                                }]
                                            }]
                                        }, {
                                            xtype: 'button',
                                            text: 'Legend',
                                            iconCls: 'fa fa-list-alt',
                                            handler: 'onDisplayLegend',
                                            width: 80,
                                        }, {
                                            xtype: 'button',
                                            text: ViewUtil.getLabel('zoom'),
                                            iconCls: 'x-fa fa-search-plus',
                                            arrowAlign: 'right',
                                            tooltip: ViewUtil.getLabel('zoom'),
                                            width: 120,
                                            menu: [{
                                                xtype: 'segmentedbutton',
                                                vertical: false,
                                                items: [{
                                                    text: '-20%',
                                                    tooltip: 'Zoom Out (-20%)',
                                                    handler: 'onZoomWarehouse',
                                                    value: '-20'
                                                }, {
                                                    xtype: 'button',
                                                    text: '100%',
                                                    tooltip: 'Zoom to 100%',
                                                    handler: 'onZoomWarehouse',
                                                    value: 100,
                                                    pressed: true
                                                }, {
                                                    text: '+20%',
                                                    tooltip: 'Zoom In (+20%)',
                                                    handler: 'onZoomWarehouse',
                                                    value: '20'
                                                }]
                                            }]
                                        }, {
                                            xtype: 'checkboxfield',
                                            reference: 'refFit',
                                            boxLabel: 'Keep Fit To Window',
                                            name: 'fitWindow',
                                            width: 150,
                                            listeners: {
                                                change: 'onFitToScreenWarehouse'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {// Allocation list part
                            xtype: 'panel',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: ViewUtil.getLabel('spaceMovementPlan_CgSetLoc'),
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    margin: '0 5 5 5',
                                    padding: '0 10 10 10',
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 100,
                                        editable: false,
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('spaceMovementPlan_SltdCel'),
                                            bind: {
                                                value: '{selectedCell.locId}',
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('spaceMovementPlan_AccmCels'),
                                            bind: {
                                                value: '{accumulatedCells.locIds}'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    width: 80,
                                                    text: ViewUtil.getLabel('apply'),
                                                    handler: 'onApply'
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 80,
                                                    margin: '0 0 0 5',
                                                    text: ViewUtil.getLabel('delete'),
                                                    handler: 'onDelete'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    flex: 3,
                                    margin: '0 5 5 5',
                                    reference: 'refWhSetLocGrid',
                                    bind: {
                                        store: '{allocatedWarehouseStore}'
                                    },
                                    columns: {
                                        defaults: {
                                            style: 'text-align:center'
                                        },
                                        items: [
                                            new Ext.grid.RowNumberer({
                                                width: 30,
                                                align: 'center'
                                            }),
                                            {
                                                header: ViewUtil.getLabel('storeRentWH'),
                                                dataIndex: 'whId',
                                                flex: 1,
                                            },
                                            {
                                                header: ViewUtil.getLabel('location'),
                                                flex: 2,
                                                dataIndex: 'locIdArr'
                                            }
                                        ]
                                    }
                                }],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    padding: '5 5 5 5',
                                    hidden: false,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    defaults: {
                                        margin: '0 0 0 5',
                                        width: 75
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: ViewUtil.getLabel('confirmMovementSetLocation'),
                                            xtype: 'button',
                                            text: ViewUtil.getLabel('confirmMovementSetLocation'),
                                            handler: 'onSetLocationClicked',
                                            width: 90
                                        }, {
                                            xtype: 'button',
                                            text: ViewUtil.getLabel('save'),
                                            handler: 'onSave'
                                        }, {
                                            xtype: 'button',
                                            text: ViewUtil.getLabel('warehouseViewTooltip'),
                                            handler: 'onTooltipClicked',
                                            bind: {
                                                disabled: '{!selectedCell}',
                                            }
                                        }, {
                                            xtype: 'button',
                                            text: ViewUtil.getLabel('cancel'),
                                            handler: 'onCancel'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent();
    }
});