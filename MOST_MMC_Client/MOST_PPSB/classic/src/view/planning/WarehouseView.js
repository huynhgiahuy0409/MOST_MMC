Ext.define('MOST.view.planning.WarehouseView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-warehouseview',

    requires: [
        'MOST.view.planning.WarehouseViewController',
        'MOST.view.planning.WarehouseViewModel'
    ],

    controller: 'warehouseview',

    viewModel: {
        type: 'warehouseview'
    },

    listeners:{
        afterrender: 'onLoad'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function(){
        var me = this;
        Ext.apply(this, {
            items: [{
                xtype: 'panel',
                height: '100%',
                flex: 1,
                reference: 'refWarehouseLayoutView',
                layout: {
                    type: 'absolute'
                },
                scrollable: true,
                listeners : {
                    'render': 'onLayoutViewRender'
                }
            }],

            dockedItems: [{ // top toolbox
                xtype:'toolbar',
                dock : 'top',
                hidden: false,
                items : [{
                    xtype: 'combo',
                    fieldLabel: 'Warehouse',
                    editable: false,
                    allowBlank: true,
                    reference: 'refWarehouseCombo',
                    emptyText:  '',
                    displayField: 'locNm',
                    valueField: 'locId',
                    labelWidth: 100,
                    margin: '0 40 0 10',
                    queryMode: 'local',
                    bind: {
                        store: '{warehouseList}'
                    },
                    listeners : {
                        select : 'onWarehouseSelect'
                    }
                },
                 '->'
                ,{
                    xtype:'button',
                    text:  ViewUtil.getLabel('warehouseViewMode'),
                    iconCls: 'fa fa-qrcode',
                    arrowAlign:'right',
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
                    text:  ViewUtil.getLabel('warehouseViewByColor'),
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
                    text:  ViewUtil.getLabel('warehouseViewLegend'),
                    iconCls: 'fa fa-list-alt',
                    handler: 'onDisplayLegend'
                },{
                    xtype:'button',
                    text:  ViewUtil.getLabel('warehouseZoom'),
                    iconCls: 'x-fa fa-search-plus',
                    arrowAlign:'right',
                    tooltip:  ViewUtil.getLabel('warehouseZoom'),
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
            }, { // bottom toolbox
                xtype: 'toolbar',
                dock: 'bottom',
                hidden: false,
                margin: '0 0 20 0',
                items: [{
                    xtype: 'textfield',
                    reference: 'refRangeStartCell'
                },'~',{
                    xtype: 'textfield',
                    reference: 'refRangeEndCell'
                },
                '->'
                ,{
                    xtype: 'button',
                    text:  ViewUtil.getLabel('warehouseViewTooltip'),
                    handler: 'onTooltipBtnClicked'
                },{
                    xtype: 'button',
                    text:  ViewUtil.getLabel('warehouseViewRentInfo'),
                    handler: 'onRentInfoBtnClicked'
                },{
                    xtype: 'button',
                    text:  ViewUtil.getLabel('warehouseViewDetail'),
                    handler: 'onDetailClicked'
                }]
            }]
        });
        me.callParent();
    }
})