Ext.define('MOST.view.popup.WarehouseRentalPopup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.popup-warehouserentalpopup',

    requires: [
        'MOST.view.popup.WarehouseRentalPopupController',
        'MOST.view.popup.WarehouseRentalPopupModel'
    ],

    controller: 'warehouserentalpopup',

    viewModel: {
        type: 'warehouserentalpopup'
    },

    listeners:{
        afterrender: 'onLoad'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    

	width: 1150,
	height: 600,
	scrollable: true,
	
    // Toolbox labels
    lblKeepFitYardToWindow: {type: 'bundle', key: 'keepFitBerthToWindow'},
    lblWarehouseZoom: {type: 'bundle', key: 'warehouseZoom'},
    lblWarehouseId: {type: 'bundle', key: 'WHId'},
    lblWarehouseMode : {type: 'bundle', key: 'warehouseViewMode'},
    lblWarehouseByColor : {type: 'bundle', key: 'warehouseViewByColor'},
    lblWarehouseLegend : {type: 'bundle', key: 'warehouseViewLegend'},
    lblwarehouseViewTooltip: {type: 'bundle', key:'warehouseViewTooltip'},
    lblwarehouseViewRentInfo: {type: 'bundle', key:'warehouseViewRentInfo'},
    lblwarehouseViewDetail: {type: 'bundle', key:'warehouseViewDetail'},
    lblconfirmMovementSetLocation: {type: 'bundle', key:'confirmMovementSetLocation'},
    lblwarehouseRentalPopupRent: {type: 'bundle', key:'warehouseRentalPopupRent'},
    

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
                    emptyText: me.lblEmptyText,
                    displayField: 'locNm',
                    valueField: 'locId',
                    labelWidth: 60,
                    margin: '0 40 0 0',
                    queryMode: 'local',
                    bind: {
                        store: '{warehouseList}'
                    },
                    listeners : {
                        change : 'onWarehouseSelect'
                    }
                },
                 '->'
                ,{
                    xtype:'button',
                    text: me.lblWarehouseMode,
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
                    text: me.lblWarehouseByColor,
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
                    text: me.lblWarehouseLegend,
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
                    text: me.lblconfirmMovementSetLocation,
                    handler: 'onSetLocationBtnClicked'
                },{
                    xtype: 'button',
                    text: me.lblwarehouseRentalPopupRent,
                    handler: 'onRentBtnClicked'
                },{
                    xtype: 'button',
                    text: me.lblwarehouseViewTooltip,
                    handler: 'onTooltipBtnClicked'
                },{
                    xtype: 'button',
                    text: me.lblwarehouseViewDetail,
                    handler: 'onDetailClicked'
                }]
            }]
        });
        me.callParent();
    }
})