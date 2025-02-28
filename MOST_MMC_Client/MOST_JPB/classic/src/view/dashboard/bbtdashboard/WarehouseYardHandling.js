Ext.define('MOST.view.dashboard.bbtdashboard.WarehouseYardHandling', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-warehouseyardhandling',

    requires: [
        'TSB.locale.i18n.Bundle'
    ],

    config: {
        bulktype: ''
    },

    controller: 'bbtdashboard',
    viewmodel: 'bbtdashboard',

    layout: 'fit',

    listeners:{
        beforerender: 'setFinalVars'
    },

    initComponent: function () {
        var me = this;
        var title = TSB.locale.i18n.Bundle.instance.getMsg('warehouseYardHandling');

        Ext.apply(me, {
            items: [{
                xtype: 'cartesian',
                reference: 'refWhYdHandlingChart',
                captions: {
                    title: {
                        text: title,
                        align: 'center',
                        style: {
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontFamily: 'Verdana'
                        }
                    }
                },   
                bind:{
                    store: '{warehouseYardHandlingStore}'
                },
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    grid: true,
                    fields : 'handlingWgt',
                }, {
                    type: 'category',
                    position: 'bottom',
                    grid: true,
                    field: 'jobTypeNm'
                }],
                series: {
                    type: 'bar',
                    stacked: false,
                    xField: 'jobTypeNm',
                    yField: 'handlingWgt',
                    colors: ['#6e92ff'],
                    style: {
                        minGapWidth: 20
                    },
                    label: {
                        field: 'handlingWgt',
                        display: 'inside',
                        orientation: 'horizontal',
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'onWhYdTooltipRenderer'
                    }
                }
            }]
        });
        me.callParent();
    }
});
