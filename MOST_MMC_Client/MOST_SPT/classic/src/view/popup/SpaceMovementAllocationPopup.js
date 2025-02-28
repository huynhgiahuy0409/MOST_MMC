Ext.define('MOST.view.popup.SpaceMovementAllocationPopup', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.popup-spacemovementallocationpopup',

    requires: [
        'MOST.view.popup.SpaceMovementAllocationPopupController',
        'MOST.view.popup.SpaceMovementAllocationPopupModel'
    ],

    layout: 'fit',

    width: 1100,
    height: 590,
    scrollable: true,

    controller: 'spacemovementallocationpopup',

    viewModel: {
        type: 'spacemovementallocationpopup'
    },
    title: 'Warehouse Allocation For Space Movement Plan',
    listeners:{
        afterrender: 'onLoad'
    },

    lblWarehouseId: {type: 'bundle', key: 'WHId'},
    lblCgoSetLoc: {type: 'bundle', key: 'spaceMovementPlan_CgSetLoc'},
    lblWh: {type: 'bundle', key: 'storeRentWH'},
    lblLocation: {type: 'bundle', key: 'location'},
    lblSltdCel: {type: 'bundle', key: 'spaceMovementPlan_SltdCel'},
    lblAccmCels: {type: 'bundle', key: 'spaceMovementPlan_AccmCels'},
    lblApply: {type: 'bundle', key: 'apply'},
    lblDelete: {type: 'bundle', key: 'delete'},
    lblWarehouseZoom: {type: 'bundle', key: 'zoom'},

    btnSetLocation: {type: 'bundle', key: 'confirmMovementSetLocation'},
    btnSave: {type: 'bundle', key: 'save'},
    btnToolTip: {type: 'bundle', key: 'warehouseViewTooltip'},
    btnCancel: {type: 'bundle', key: 'cancel'},

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{// Warehouse part
                    xtype: 'panel',
                    reference: 'refWarehouseViewWrapper',
                    flex: 2,
                    listeners: {
                        resize: 'onResizeWrapper'
                    },
                    items: [{
                        xtype: 'panel',
                        reference: 'refWarehouseLayoutView',
                        margin: '5 5 5 0',
                        scrollable: true,
                        layout: {
                            type: 'absolute'
                        },
                        listeners : {
                            render: 'onLayoutViewRender'
                        }
                    }],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        margin: '1 0 0 0',
                        hidden: false,
                        items: [{
                            xtype: 'combo',
                            fieldLabel: 'Warehouse',
                            editable: false,
                            allowBlank: true,
                            reference: 'refWarehouse',
                            displayField: 'locNm',
                            valueField: 'locId',
                            labelWidth: 60,
                            margin: '0 40 0 0',
                            queryMode: 'local',
                            bind: {
                                store: '{warehouseList}'
                            },
                            listeners : {
                                change : 'onWarehouseComboSelect'
                            }
                        },{
                            xtype:'button',
                            text: 'Mode',
                            iconCls: 'fa fa-qrcode',
                            arrowAlign:'right',
                            reference:'refMode',
                            menu: [{
                                xtype: 'segmentedbutton',
                                vertical: false,
                                items:[{
                                    text: 'Occupied',
                                    value: 'occupied',
                                    reference: 'refOccupied',
                                    pressed: true,
                                    listeners: {
                                        click: 'onChangeColorBy'
                                    }
                                },{
                                    text: 'Plan',
                                    value: 'plan',
                                    reference: 'refPlan',
                                    listeners: {
                                        click: 'onChangeColorBy'
                                    }
                                }]
                            }]
                        },{
                            xtype:'button',
                            text: 'By Color',
                            iconCls: 'fa fa-th-large',
                            arrowAlign:'right',
                            menu: [{
                                xtype: 'segmentedbutton',
                                vertical: false,
                                items:[{
                                    text: 'Vessel',
                                    value: 'vessel',
                                    reference: 'refColorByCargo',
                                    pressed: true,
                                    listeners: {
                                        click: 'onWarehouseColorModeChange'
                                    }
                                },{
                                    text: 'Category',
                                    value: 'category',
                                    reference: 'refColorByPOD',
                                    listeners: {
                                        click: 'onWarehouseColorModeChange'
                                    }
                                },{
                                    text: 'Cargo Type',
                                    value: 'cargo',
                                    reference: 'refColorByCntry',
                                    listeners: {
                                        click: 'onWarehouseColorModeChange'
                                    }
                                }]
                            }]
                        },{
                            xtype:'button',
                            text: 'Legend',
                            iconCls: 'fa fa-list-alt',
                            handler: 'onDisplayLegend'
                        },{
                            xtype:'button',
                            text: me.lblWarehouseZoom,
                            iconCls: 'x-fa fa-search-plus',
                            arrowAlign:'right',
                            tooltip: me.lblWarehouseZoom,
                            menu: [{
                                xtype: 'segmentedbutton',
                                vertical: false,
                                items:[{
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
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Keep Fit Warehouse To Window',
                            name: 'fitWindow',
                            reference: 'refFit',
                            listeners: {
                                change: 'onFitToScreenWarehouse'
                            }
                        }]
                    }]
                },{// Allocation list part
                    xtype: 'panel',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'fieldset',
                        height: 180,
                        margin: '5 5 5 5',
                        title: me.lblCgoSetLoc,
                        defaults: {
                            labelAlign: 'right',
                            width: 380,
                            labelWidth: 120,
                            editable: false
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: me.lblSltdCel,
                            bind:{
                                value: '{selectedCell.locId}',
                            }
                        },{
                            xtype: 'textfield',
                            fieldLabel: me.lblAccmCels,
                            bind:{
                                value: '{accumulatedCells.locIds}'
                            }
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                            	margin: '0 5 0 0'
                            },
                            items: [{
                            	xtype: 'container',
                            	width: 100,
                            },{
                                xtype: 'button',
                                width: 100,
                                text: me.lblApply,
                                handler: 'onApply'
                            },{
                                xtype: 'button',
                                width: 100,
                                text: me.lblDelete,
                                handler: 'onDelete'
                            }]
                        }]
                    },{
                        xtype: 'grid',
                        flex: 3,
                        margin: '0 5 5 5',
                        reference: 'refWhSetLocGrid',
                        bind: {
                            store: '{allocatedWarehouseStore}'
                        },
                        columns : {
                            defaults: {
                                style: 'text-align:center'
                            },
                            items: [
                            new Ext.grid.RowNumberer({
                                width: 30,
                                align: 'center'
                            }),
                            {
                                header: me.lblWh,
                                dataIndex: 'whId',
                            }, {
                                header: me.lblLocation,
                                flex: 1,
                                dataIndex: 'locIdArr'
                            }]
                        }
                    }],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        margin: '1 0 0 0',
                        hidden: false,
                        items: [{
                            xtype:'button',
                            text: me.btnSetLocation,
                            handler: 'onSetLocationClicked'
                        },{
                            xtype:'button',
                            text: me.btnSave,
                            handler: 'onSave'
                        },{
                            xtype:'button',
                            text: me.btnToolTip,
                            handler: 'onTooltipClicked',
                            bind:{
                                disabled: '{!selectedCell}',
                            }
                        },{
                            xtype:'button',
                            text: me.btnCancel,
                            handler: 'onCancel'
                        }]
                    }]
                }]
            }]
        });

        me.callParent();
    }
});