Ext.define('MOST.view.main.SettingVessels', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-settingvessels',
	
	requires: [
		'MOST.config.Locale'
	],
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			items: [{
				xtype: 'container',
				margin : '0 0 0 0',
				items:[{
					layout: {
						type: 'vbox',
						align: 'stretch'
					},					
					margin : '5 0 0 5',
					items: [{
						flex: 1,
						defaults: {
	                        margin: '0 0 5 0',
	                        labelAlign: 'right',
	                        labelWidth: 120
	                    },
						items: [{
					        xtype: 'textarea',
					        fieldLabel: 'Vessel Call Id',
					        width : 300,
					        height : 200,
					        reference: 'refVesselCallIdField',
					        emptyText: 'Please put Vessel Call Id in here',
					        hideLabel: true
					    },{
					    	xtype:'numberfield',
					    	reference:'refDashboardIntervalField',
					    	fieldLabel : 'Dashboard Interval',
					    	minValue : 1,
	    					maxValue: 999,
					    }]
					}]
				}]
			}],
		    
		    dockedItems: [
                {
                    xtype: 'container',
                    layout: {
                        align:'left'
                    },
                    defaults: {
                        margin: '5 1 1 1',
                        width : 120
                    },
                    items: [{
	                    	margin: '5 1 1 5',
	                        xtype: 'button',
	                        text: 'Set Value',
	                        cls: 'search-button',
	                        iconCls: 'x-fa fa-plus',
	                        reference:'refSetVessel',
	                        listeners: {
	                            click: 'onSetVesselBtnClick'
	                        }
	                    },{
	                        
	                        xtype: 'button',
	                        text: 'Clear',
	                        ui: 'create-button',
	                        iconCls: 'fa fa-minus',
	                        reference:'refClearVessel',
	                        listeners: {
	                            click: 'onClearVesselBtnClick'
	                        }
	                    }
                    ]
                }]
		}); 
		
		this.callParent();
	}
	
});