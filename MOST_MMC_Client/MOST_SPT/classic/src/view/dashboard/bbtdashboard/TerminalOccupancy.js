Ext.define('MOST.view.dashboard.bbtdashboard.TerminalOccupancy', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-terminaloccupancychart',

    requires: [
        'Ext.event.gesture.Rotate',
        'Ext.chart.series.Polar',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.series.Pie'
    ],

    controller: 'bbtdashboard',
    viewmodel: 'bbtdashboard',

    layout: 'fit',

    listeners : {
        afterrender : 'onTerminalLoad',
        beforerender: 'setFinalVars'
    },

    initComponent: function () {
        var me = this;
        var title = TSB.locale.i18n.Bundle.instance.getMsg('terminalOccupancy');

        Ext.apply(me, {
            items: [{
                xtype: 'polar',
                shadow: 'true',
                padding: '0 0 0 0',
                reference: 'refTerminalOccupancyChart',
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
                width: '100%',
                height: '100%',
                bind: {
                    theme: '{menuGroups.charttheme}',
                    store: '{terminalOccupancyStore}'
                },
                insetPadding: 5,
                interactions: ['rotate', 'itemhighlight'],
                series: [{
                    type: 'pie',
                    style: {
                        lineWidth: 1,
                        stroke: '#666',
                        opacity: 0.85
                    },
                    angleField: 'cargoPercent',
                    highlight: true,
                    label: {
                        display: 'outside',
                        field : 'berthCnt',
                        renderer: 'terminalOccupancyDataRenderer',
                        fontSize: 12,
                        fontWeight: 'bold',
                        calloutLine: {
                            length: 5,
                            width: 1
                        }
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'onTerminalOccupancyTooltipRender'
                    }
                }]
            }]
        });
        me.callParent();
    }
});
