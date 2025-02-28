Ext.define('MOST.view.dashboard.bbtdashboard.LorriesTurnaround', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-lorriesturnaround',

    requires: [
    ],

    config: {
        bulktype: ''
    },

    controller: 'bbtdashboard',
    viewmodel: 'bbtdashboard',

    layout: 'fit',

    listeners: {
        beforerender: 'setFinalVars'
    },

    initComponent: function () {
        var me = this;
        var title = TSB.locale.i18n.Bundle.instance.getMsg('lorriesTurnaround');

        Ext.apply(me, {
            items: [{
                xtype: 'cartesian',
                reference: 'refLorriesTurnaroundChart',
                bind:{
                    store : '{lorriesTurnaroundStore}'
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
                legend: {
                    type: 'sprite',
                    docked: 'top'
                },
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    grid: true,
                    fields : ['lorryTripsCount', 'lorryCount'],
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
                    yField: ['lorryTripsCount', 'lorryCount'],
                    title: ['Lorry Trips', 'Lorry Count'],
                    colors: ['#e03030', '#6e92ff'],
                    style: {
                        minGapWidth: 20
                    },
                    label: {
                        field: ['lorryTripsCount', 'lorryCount'],
                        display: 'inside',
                        orientation: 'horizontal',
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'onLorryTurnaroundTooltipRenderer'
                    }
                }
            }]
        });
        me.callParent();
    }
});
