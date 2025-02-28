Ext.define('MOST.view.dashboard.bbtdashboard.BreakDryBulkSummary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-breakdrybulksummarychart',

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
        afterrender: 'onDryBreakBulkSummaryLoad',
        beforerender: 'setFinalVars',

    },

    initComponent: function () {
        var me = this;
        var title = TSB.locale.i18n.Bundle.instance.getMsg('breakDryBulkSummary');

        Ext.apply(me, {
            items: [{
                bind: {
                    theme: '{menuGroups.charttheme}',
                    store: '{breakBulkSummaryStore}'
                },
                xtype: 'polar',
                shadow: 'true',
                reference: 'refDryBreakBulkSummaryChart',
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
                interactions: ['rotate', 'itemhighlight'],
                series: [{
                    type: 'pie',
                    angleField: 'cgWgt',
                    style: {
                        lineWidth: 1,
                        stroke: '#666',
                        opacity: 0.85
                    },
                    highlight: true,
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
