Ext.define('MOST.view.planning.VesselScheduleRequestTimePopup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.popup-vesselschedulerequesttimepopup',
    
    title: 'Request Time',

    listeners: {
    },
 
    // controller: 'vesselscheduleinternal',
	

	// viewModel: {
	// 	type: 'vesselscheduleinternal'
	// },
     /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
    layout : {type  : 'vbox', align : 'stretch'},
    initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    flex: 1,
				    margin: '5 5 5 5',
                    defaults: {
                        margin: '0 0 0 5',
			            labelAlign: 'right',
			            labelWidth: 110
                    },
                    items: [
                        {
                            xtype:'datetimefield',
                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            fieldLabel: ViewUtil.getLabel('vslschCurrentATA'),
                            bind: '{theMain.ata}',
                            flex: 1,
                            readOnly: true
                        },
                        {
                            xtype:'datetimefield',
                            reference: 'refReadinessAta',
                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            fieldLabel: ViewUtil.getLabel('vslschRequestNewATA'),
                            allowBlank: false,
                            bind: '{theMain.readinessAta}',
                            flex: 1
                        },
                    ]
                },  
                {
                    xtype: 'container',
                    layout: 'hbox',
                    flex: 1,
				    margin: '5 5 5 5',
                    defaults: {
                        margin: '0 0 0 5',
			            labelAlign: 'right',
			            labelWidth: 110
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: ViewUtil.getLabel('vslschReasonForRequest'),
                            reference: 'refVslDlRsn',
                            flex: 1,
                            bind: {
                                store: '{vslDelayReason}',
                                value: '{theMain.vslDlRsn}'
                            },
                            queryMode: 'local',
                            displayField: 'scdNm',
                            valueField: 'scd',
                            allowBlank: false,
                        },
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 5 5 5',
                    defaults: {
                        margin: '0 0 0 5',
                        labelAlign: 'right',
                        labelWidth: 100
                    },
                    layout: {   
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'OK',
                            listeners: {
                                click: 'onRequestTimeOK'
                            }
                        }
                    ]
                }
            ],
		});
		
		me.callParent();
	}
});
