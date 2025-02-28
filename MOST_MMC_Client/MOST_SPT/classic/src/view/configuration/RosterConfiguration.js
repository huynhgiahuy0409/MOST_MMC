Ext.define('MOST.view.configuration.RosterConfiguration', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-rosterconfiguration',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Roster Configuration - Shift",
	width: 370,
	height: 280,
	
	controller: 'rosterconfiguration',
	
	viewModel: {
		type: 'rosterconfiguration'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype:'fieldset',
				height: 100,
				padding: '5 5 5 5',
				defaults:{
					margin: '5 5 5 5'
				},
				layout: {
					type: 'hbox',
					align: 'stretch'
				},				
				items: [{
		            xtype: 'button',
		            width: 120,
		            //margin: '5 5 5 10',
		            text: ViewUtil.getLabel('staffSetting'),
		            iconCls: 'fa fa-id-badge',
		            reference: 'refStaffSetting',
		            listeners: {
		            	click: 'openInternalStaffManagment'
		            }
		        },
		        {
		            xtype: 'button',
		            width: 120,
		            //margin: '5 5 5 0',
		            iconCls: 'fa fa-group',
		            text: ViewUtil.getLabel('groupSetting'),
		            reference: 'refGroupSetting',
	            	listeners: {
		            	click: 'openGroupManagementforRosterSetup'
		            }
		        },
		        {
		            xtype: 'button',
		            width: 120,
		            //margin: '5 0 10 0',
		            iconCls: 'fa fa-calendar',
		            text: ViewUtil.getLabel('shiftDefinition'),
		            reference: 'refShiftDefinition',
		            listeners: {
		            	click: 'openShiftDefinition'
		            }
				}]
			}]
		});
		me.callParent();
	}
});


