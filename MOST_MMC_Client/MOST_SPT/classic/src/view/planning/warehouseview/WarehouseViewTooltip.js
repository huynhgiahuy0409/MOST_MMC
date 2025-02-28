Ext.define('MOST.view.planning.warehouse.WarehouseViewTooltip', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-warehouseviewtooltip',

    requires: [
        'MOST.view.planning.WarehouseViewController',
        'MOST.view.planning.WarehouseViewModel',
    ],

    controller: 'warehouseview',

    viewModel: {
        type: 'warehouseview'
    },

    layout: {
        type: 'fit',
        align: 'stretch'
    },

    width:850,
    height:'50%',

    listeners : {
        afterrender : 'onPopupLoad'
    },

    // Column labels
    lblVslNm : {type: 'bundle', key : 'vslNm'},
    lblVslCallId : {type: 'bundle', key : 'vslCallId'},
    lblBlSn : {type: 'bundle', key : 'bl_sn'},
    lblSAgent : {type: 'bundle', key : 'sAgent'},
    lblFAgent : {type: 'bundle', key : 'fAgent'},
    lblShipper : {type: 'bundle', key : 'shipper'},
    lblCategory : {type: 'bundle', key : 'catgCd'},
    lblCargo : {type: 'bundle', key : 'cargoTp'},
    lblMt : {type: 'bundle', key : 'mT'},
    lblM3 : {type: 'bundle', key : 'm3'},
    lblQty : {type: 'bundle', key : 'quantity'},
    lblCargoCondition : {type: 'bundle', key : 'unclosedCargoCondition'},
    lblSpecialCargo : {type: 'bundle', key : 'spCaCoCd'},

    initComponent: function(){
        var me = this;
        Ext.apply(this, {
            items: [{
                xtype:'grid',
                reference:'refWarehouseTooltipGrid',
                bind: {
                    store: '{warehouseTooltipList}'
                },
                selModel: {
                    type: 'spreadsheet',
                    cellSelect: false
                },
                columns: {
                    items: [{
                        header: me.lblVslNm,
                        dataIndex: 'vslName',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblVslCallId,
                        dataIndex: 'vslCallId',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblBlSn,
                        dataIndex: 'blSn',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblSAgent,
                        dataIndex: 'shipgAgnt',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblFAgent,
                        dataIndex: 'fwrAgnt',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblShipper,
                        dataIndex: 'cngshp',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblCategory,
                        dataIndex: 'opeClassNm',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblCargo,
                        dataIndex: 'cargo',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblMt,
                        dataIndex: 'wgt',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblM3,
                        dataIndex: 'msrmt',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblQty,
                        dataIndex: 'pkgQty',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblCargoCondition,
                        dataIndex: 'whTpCdNm',
                        align: 'center',
                        width: 100
                    }, {
                        header: me.lblSpecialCargo,
                        dataIndex: 'spCaCoCdNm',
                        align: 'center',
                        width: 100
                    }]
                }

            }]
        });
        me.callParent();
    }
})