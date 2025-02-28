Ext.define('MOST.view.dashboard.bbtdashboard.BulkHandlingVsBalance', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-bulkhandlingbalancecompare',

    requires: [
    ],

    config: {
        bulktype: ''
    },

    controller: 'bbtdashboard',
    viewmodel: 'bbtdashboard',

    layout: 'fit',

    listeners : {
        afterrender : 'onBulkHandlingBalanceCompareLoad',
        beforerender: 'setFinalVars'
    },

    initComponent: function () {
        var me = this;
        var title;
        if(me.config.bulktype === 'BREAK'){
            title = TSB.locale.i18n.Bundle.instance.getMsg('breakDryBulkHandlingBalanceCompare');
        } else if(me.config.bulktype === 'LIQUID') {
            title = TSB.locale.i18n.Bundle.instance.getMsg('liquidBulkHandlingBalanceCompare');
        }
        
        Ext.apply(me, {
            items: [{
                xtype: 'cartesian',
                reference: 'refBulkHandlingBalanceCompareChart',
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
                    fields : ['handlingWgt', 'balanceWgt'],
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
                    yField: ['handlingWgt', 'balanceWgt'],
                    title: ['Handling (Mt)', 'Balance (Mt)'],
                    colors: ['#6e92ff','#e03030'],
                    style: {
                        minGapWidth: 20
                    },
                    label: {
                        field: ['handlingWgt', 'balanceWgt'],
                        display: 'inside',
                        orientation: 'horizontal',
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'onBulkHandlingBalanceCompareTooltipRenderer'
                    }
                }
            }]
        });
        me.callParent();
    }
});