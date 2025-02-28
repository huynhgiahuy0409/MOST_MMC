// Web integration javascript file
Ext.define('MOST.view.dashboard.BBTDashboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-bbtdashboard',

    requires: [
        'MOST.view.dashboard.BBTDashboardController',
        'MOST.view.dashboard.BBTDashboardModel',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.series.Pie'
    ],

    controller: 'bbtdashboard',

    viewModel: {
        type: 'bbtdashboard'
    },

    // Button labels

    // Title labels

    listeners: {
        afterrender: 'onLoad'
    },

    layout: {type: 'vbox', align: 'stretch'},

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            // New Layout
            // Input page elements here
            items: [{	// First layer
                xtype: 'container',
                cls: 'dashboard_container',
                style: {
                    backgroundColor: '#ffffff',
                    border: '#ffffff'
                },                
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                padding: '0 0 0 0',
                flex: 1,
                items: [{
                    flex: 1,
                    xtype: 'panel',
                    layout: 'center',
                    items: [{
                        xtype: 'component',
                        html: '<div style="height:30px;"><h2 style="text-align:center; margin-top:5px;">BBT Dashboard</h2></div>',
                        autoScroll: true,
                        margin: '5 0 0 0'
                    }],
                    dockedItems: [{
                        xtyle: 'toolbar',
                        dock: 'bottom',
                        layout: 'center',
                        margin: '0 0 5 0',
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            items: [{
                                xtype: 'datefield',
                                reference: 'refShiftDate',
                                editable: false,
                                format: 'j F, Y',
                                width: 150,
                                listeners: {
                                    change: 'onDateShiftChange'
                                }
                            }, {
                                xtype: 'combo',
                                reference: 'refShift',
                                // fieldLabel: me.lblShift,
                                width: 70,
                                align: 'left',
                                margin : '0 0 0 2',
                                editable: false,
                                bind: {
                                    store: '{shiftCombo}'
                                },
                                displayField: 'shftNm',
                                valueField: 'shftId',
                                queryMode: 'local',
                                value: '',
                                listeners: {
                                    change: 'onDateShiftChange'
                                }
                            }]
                        }]
                    }]
                }, {
                    xtype: 'container',
                    layout: 'center',
                    flex: 1,
                    items: [{
                        xtype: 'panel',
                        reference: 'refVesselCountDraw',
                        layout: {
                            type: 'hbox'
                        },
                        scrollable: false,
                        flex: 1,
                        items: [
                            {
                                xtype: 'component',
                                layout: 'center',
                                html: '<h3 style="padding-top: 15px;height: 100%;vertical-align: center;">Wharves<br>Jetties&nbsp;:&nbsp;</h3>'
                            }, {
                                xtype: 'button',
                                layout: 'center',
                                reference: 'refWharvesCount',
                                style: {
                                    cursor: 'default',
                                    backgroundColor: '#ffffff',
                                    border: '#ffffff'
                                }
                            }, {
                                xtype: 'component',
                                layout: 'center',
                                html: '<h3 style="padding-top: 20px;margin-left: 5px;height: 100%;vertical-align: center;">Anchorage&nbsp;:&nbsp;</h3>'
                            }, {
                                xtype: 'button',
                                layout: 'center',
                                reference: 'refAnchorageCount',
                                style: {
                                    cursor: 'default',
                                    backgroundColor: '#ffffff',
                                    border: '#ffffff'
                                }
                            }]
                    }]
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    margin : '0 0 0 20',
                    flex: 1,
                    items: [{
                        xtype: 'panel',
                        reference: 'refWeatherForecastView',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                    }]
                }, {
                    xtype: 'container',
                    layout: 'center',
                    flex: 1,
                    margin : '0 20 0 00',
                    items: [{
                        xtype: 'panel',
                        reference: 'refAccidentsView',
                        layout: {
                            type: 'hbox'
                        },
                        scrollable: false,
                        flex: 1,
                    }]
                }]
            },{		// Second layer
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                flex: 3,
                padding:'0 0 0 0',
                items: [{
                    xtype: 'app-terminaloccupancychart',
                    reference: 'refTerminalOccupancyView',
                    flex: 1
                }, {
                    xtype: 'app-breakdrybulksummarychart',
                    reference: 'refBreakDryBulkSummaryView',
                    flex: 1.5
                }, {
                    xtype: 'app-cargooperationchart',
                    reference: 'refCargoOperationView',
                    flex: 1
                }, {
                    xtype: 'app-liquidbulksummarychart',
                    reference: 'refLiquidBulkSummaryView',
                    flex: 1.5
                }]
            }, {		// Third layer
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                flex: 3,
                items: [{
                    xtype: 'app-bulkhandlingbalancecompare',
                    reference: 'refBreakDryBulkHandlingBalanceCompareView',
                    flex: 1,
                    bulktype: 'BREAK'
                }, {
                    xtype: 'app-breakdrybulkproductivity',
                    reference: 'refBreakDryBulkProductivityView',
                    flex: 1
                }, {
                    xtype: 'app-bulkhandlingbalancecompare',
                    reference: 'refLiquidBulkHandlingBalanceCompareView',
                    flex: 1,
                    bulktype: 'LIQUID'
                }, {
                    xtype: 'app-liquidbulkproductivity',
                    reference: 'refLiquidBulkProductivityView',
                    flex: 1
                }]
            }, {		// Forth layer
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                flex: 3,
                items: [{
                    xtype: 'app-lorriesturnaround',
                    reference: 'refLorriesTurnaroundView',
                    flex: 1
                }, {
                    xtype: 'app-bulkdelay',
                    reference: 'refBreakDryBulkDelay',
                    flex: 1,
                    bulktype: 'BREAK'
                }, {
                    xtype: 'app-warehouseyardhandling',
                    reference: 'refWarehouseYardHandlingView',
                    flex: 1
                }, {
                    xtype: 'app-bulkdelay',
                    reference: 'refLiquidBulkDelayView',
                    flex: 1,
                    bulktype: 'LIQUID'
                }]
            }]
        });

        me.callParent();
    }
});
