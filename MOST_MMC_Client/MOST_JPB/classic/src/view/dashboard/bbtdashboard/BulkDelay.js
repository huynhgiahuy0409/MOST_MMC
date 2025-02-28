Ext.define('MOST.view.dashboard.bbtdashboard.BulkDelay', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-bulkdelay',

    requires: [
    ],

    config: {
        bulktype: ''
    },

    controller: 'bbtdashboard',
    viewmodel: 'bbtdashboard',

    layout: 'fit',

    listeners: {
        afterrender: 'onBulkDelayAfterrender',
        beforerender: 'setFinalVars'
    },

    initComponent: function () {
        var me = this;
        var title;
        if(me.config.bulktype === 'BREAK'){
            title = TSB.locale.i18n.Bundle.instance.getMsg('breakDryBulkDely');
        } else if(me.config.bulktype === 'LIQUID') {
            title = TSB.locale.i18n.Bundle.instance.getMsg('liquidDryBulkDely');
        }
        Ext.apply(me, {
            items: [{
                xtype: 'cartesian',
                reference: 'refBulkDelayChart',
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
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    grid: true,
                    fields : 'dlyHrs',
                }, {
                    type: 'category',
                    position: 'bottom',
                    grid: true,
                    field: 'berthCd'
                }],
                series: {
                    type: 'bar',
                    stacked: false,
                    xField: 'berthCd',
                    yField: 'dlyHrs',
                    colors: ['#6e92ff'],
                    style: {
                        minGapWidth: 20
                    },
                    label: {
                        field: 'dlyHrs',
                        display: 'inside',
                        orientation: 'horizontal',
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'onBulkDelayChartTooltipRenderer'
                    }
                }
            }]
        });
        me.callParent();
    }
});
