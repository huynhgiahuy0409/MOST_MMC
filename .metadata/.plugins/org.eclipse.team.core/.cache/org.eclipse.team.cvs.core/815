Ext.define('MOST.view.planning.berth.BerthApprovalDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-berthapprovaldetail',
	
	requires: [
	    'Ext.layout.container.Table'
	],
	
	width: 1100,
	height: 620,
	
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
				margin: '5 5 0 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
		        {
		            xtype: 'tabpanel',
		            flex: 1,
		            activeTab: 0,
		            items: [
		                {
		                	xtype: 'app-berthapprovalpartnerInformation'
		                },
		                {
		                    xtype: 'app-berthapprovalbusinesshistory'
		                },
		                {
		                    xtype: 'app-berthapprovalestimatedcharges'
		                }
		            ]
		        }
		    ]
		});
		me.callParent();
	}
});