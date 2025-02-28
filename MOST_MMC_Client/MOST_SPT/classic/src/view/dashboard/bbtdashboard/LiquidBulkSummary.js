Ext.define('MOST.view.dashboard.bbtdashboard.LiquidBulkSummary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-liquidbulksummarychart',

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
        afterrender: 'onLiquidBulkSummaryLoad',
        beforerender: 'setFinalVars'
    },

    initComponent: function () {
        var me = this;
        var title = TSB.locale.i18n.Bundle.instance.getMsg('liquidBulkSummary');

        Ext.apply(me, {
            items: [{
                bind: {
                    theme: '{menuGroups.charttheme}',
                    store: '{liquidBulkSummaryStore}'
                },
                xtype: 'polar',
                shadow: 'true',
                reference: 'refLiquidBulkSummaryChart',
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
                insetPadding: 10,
                //innerPadding: 10,
                interactions: ['rotate', 'itemhighlight'],
                series: [{
                    type: 'pie',
                    angleField: 'cgWgt',
                    highlight: true,
                    style: {
                        lineWidth: 1,
                        stroke: '#666',
                        opacity: 0.85
                    },                    
                    label: {
                        field: 'vslNm',
                        display: 'outside',
                        renderer: 'bulkSummaryLabelRenderer',
                        fontSize: 12,
                        fontWeight: 'bold',
                        calloutLine: {
                            length: 30,
                            width: 1
                        }
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'bulkSummaryTooltipRender'
                    },
                    renderer: 'bulkSummaryWharfRenderer'
                }]
            }]
        });
        me.callParent();
    }
});
