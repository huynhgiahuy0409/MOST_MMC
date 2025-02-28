Ext.define('MOST.view.dashboard.bbtdashboard.BreakDryBulkProductivity', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-breakdrybulkproductivity',

    requires: [
        'Ext.chart.plugin.ItemEvents'
    ],

    controller: 'bbtdashboard',
    viewmodel: 'bbtdashboard',

    layout: 'fit',

    listeners : {
        beforerender: 'setFinalVars'
    },

    initComponent: function () {
        var me = this;
        var title =TSB.locale.i18n.Bundle.instance.getMsg('breakDryBulkProductivity');

            Ext.apply(me, {
                items: [{
                    xtype: 'cartesian',
                    reference: 'refBreakDryBulkProductivityChart',
                    plugins: {
                        ptype: 'chartitemevents',
                        spriteevents: true,
                        moveEvents: true
                    },
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
                    listeners : {
                        itemdblclick: 'onBreakDryBulkProductivityItemDoubleClick',
                    },
                    bind: {
                        store: '{breakDryBulkVslProductivityStore}'
                    },
                    legend: {
                        type: 'sprite',
                        docked: 'top'
                    },
                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        grid: true,
                        fields : ['handlingRate', 'kpiIdx'],
                    }, {
                        type: 'category',
                        position: 'bottom',
                        grid: true,
                        field: 'vslCallId'
                    }],
                    series: {
                        type: 'bar',
                        stacked: false,
                        xField: 'vslCallId',
                        yField: ['handlingRate', 'kpiIdx'],
                        title: ['Handling Rage (Mt/hr)', 'Target Rate (Mt/hr)'],
                        colors: ['#6e92ff','#e03030'],
                        style: {
                            minGapWidth: 20
                        },
                        label: {
                            field: ['handlingRate', 'kpiIdx'],
                            display : 'inside',
                            orientation: 'horizontal',

                        },
                        labelOverflowPadding : 20,
                        renderer: 'onBulkProductivitySeriesRenderer',
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onBreakDryBulkProductivityTooltipRenderer'
                        }
                    }
                }]
            });
        me.callParent();
    }
});
