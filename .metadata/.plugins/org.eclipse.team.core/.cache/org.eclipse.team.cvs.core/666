Ext.define('MOST.view.dashboard.bbtdashboard.CargoOperation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-cargooperationchart',

    requires: [
        'Ext.event.gesture.Rotate',
        'Ext.chart.series.Polar',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.series.Pie'
    ],

    controller: 'bbtdashboard',
    viewmodel: 'bbtdashboard',

    layout: 'fit',

    listeners: {
        beforerender: 'setFinalVars'
    },

    initComponent: function () {
        var me = this;
        var title = TSB.locale.i18n.Bundle.instance.getMsg('cargoOperation');

        Ext.apply(me, {
            items: [{
                bind: {
                    theme: '{menuGroups.charttheme}',
                    store: '{cargoOperationStore}'
                },
                xtype: 'polar',
                shadow: 'true',
                reference: 'refCargoOperationChart',
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
                // listeners: {
                //     render: function(chart, eOpts){
                        // var series = chart.getSeries()[0];
                        // var sprites = series.sprites;
                        // var items = chart.getStore().getData().items;
                        //
                        // if(sprites.length === 0 || items[0].get('cgTp') === 'No Data'){
                        //     return;
                        // }
                        //
                        // for(i = 0; i < series.getSprites().length; i++){
                        //     var sprite = series.getItemByIndex(i).sprite;
                        //     sprite.setAttributes({
                        //         fillStyle : me.getController().colors[items[i].get('cgTp')].fillStyle,
                        //         strokeStyle : me.getController().colors[items[i].get('cgTp')].strokeStyle
                        //     });
                        // }
                //     }
                // },
                insetPadding: 5,
                interactions: ['rotate', 'itemhighlight'],
                series: [{
                    type: 'pie',
                    angleField: 'cgWgtRate',
                    style: {
                        lineWidth: 1,
                        stroke: '#666',
                        opacity: 0.85
                    },
                    reference: 'refCargoOperationChartSeries',
                    highlight: true,
                    label: {
                        field: 'cgTp',
                        display: 'outside',
                        renderer : 'cargoOperationLabelRenderer',
                        fontSize: 12,
                        fontWeight: 'bold',
                        calloutLine: {
                            length: 5,
                            width: 1
                        }
                    },
                    renderer : 'cargoOperationVesselCntRenderer',
                    tooltip: {
                        trackMouse: true,
                        renderer: 'cargoOperationTooltipRenderer'
                    }
                }]
            }]
        });
        me.callParent();
    }
});
