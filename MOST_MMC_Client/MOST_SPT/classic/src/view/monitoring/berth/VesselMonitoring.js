Ext.define('MOST.view.monitoring.berth.VesselMonitoring', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.app-berthvesselmonitoring',

    requires: [
        'MOST.config.Locale',
        'TSB.ux.form.field.DateTimeField',
        'TSB.ux.form.field.DateTimePicker',
        'MOST.view.planning.berth.BerthExplorerController'
    ],

    

    layout: {type: 'vbox', align: 'stretch'},
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    VSL_GRID_REF_NAME: 'refVesselSchduleListGrid',				 
	VSL_STORE_NAME: 'plans',
    VSL_SFT_GRID_REF_NAME: 'refVesselSftSchduleListGrid',				
	VSL_SFT_STORE_NAME: 'sftPlans',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'tabpanel',
                height: '100%',

                defaults: {
                    margin: '5 5 0 5'
                },
                activeTab: 0,
                items: [
                    {
                        xtype: 'panel',
                        title: 'Vessel Monitoring Status',
                        collapsible: true,
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'grid',
                                reference: me.VSL_GRID_REF_NAME,
                                usePagingToolbar : false,
                                width: '100%',
                                margin: '5 5 10 0',
                                stateful: true,
                                stateId: 'stateVesselSchduleListGrid',
                                bind: {
                                    store: '{' + me.VSL_STORE_NAME + '}'
                                },
                                listeners: {
                                    select: 'onClickVesselSchduleList'
                                },
                                layout: 'fit',
                                columns: {
                                    defaults: {
                                        style: 'text-align:center',
                                        align: 'center'
                                    },
                                    items: GridUtil.getGridColumns('VesselMonitoringList'),
                                }
                            },
                        ]
                    },
                ]
            }]
        });

        me.callParent();
    }
});