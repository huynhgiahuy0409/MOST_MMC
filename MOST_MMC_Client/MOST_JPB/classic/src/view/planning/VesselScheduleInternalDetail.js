Ext.define('MOST.view.planning.VesselScheduleInternalDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-vesselscheduleinternaldetail',
	
	requires: [
	    'Ext.layout.container.Table',
	    'MOST.view.planning.vesselscheduleinternal.VesselScheduleDetailTabMain',
	    'MOST.view.planning.vesselscheduleinternal.VesselScheduleDetailTabConfirmationSlip1',
	    'MOST.view.planning.vesselscheduleinternal.VesselScheduleDetailTabConfirmationSlip2'
	],
	
	width: 1300,
	height: 860,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'form',
			defaults:{
				margin: '5 5 5 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					defaults:{
						margin: '0 0 0 0'
					},
					xtype:'tabpanel',
					reference: 'ctlVesselDetailTabPanel',
					flex: 1,
					deferredRender:false,
					items:[
						{ // Vessel Detail
							xtype: 'panel',
							name:'vesselDetail',
							title: ViewUtil.getLabel('vesselDetail'),
							scrollable: 'both',
							items : [
								{
									xtype: 'app-vesselscheduledetailtabmain',
						    		reference: 'refVesselScheduleTabMain'
								}
							]
						},
						{ // Confirmation Slip (1)
							xtype: 'panel',
							name:'cs1',
							title: ViewUtil.getLabel('confirmationSlip1'),
							scrollable: 'both',
							layout : {
								type: 'vbox',
								align: 'stretch'
							},
							items : [
								{
									xtype: 'app-vesselscheduledetailtabconfirmationslip1',
						    		reference: 'refVesselScheduleTabConfirmationSlip1',
						    		flex: 1
								}
							]
						},
						{ // Confirmation Slip (2)
							xtype: 'panel',
							name:'cs2',
							title: ViewUtil.getLabel('confirmationSlip2'),
							scrollable: 'both',
							layout : {
								type: 'vbox',
								align: 'stretch'
							},
							items : [
								{
									xtype: 'app-vesselscheduledetailtabconfirmationslip2',
						    		reference: 'refVesselScheduleTabConfirmationSlip2',
						    		flex: 1
								}
							]
						}
					]
		        }
			]
		});
		
		me.callParent();
	}
});