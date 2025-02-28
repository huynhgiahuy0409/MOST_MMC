Ext.define('MOST.view.operation.vorliquidbulk.BerthAndOperationInfo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthAndOperationInfo',
	
	requires: [
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			items: [
		        {
		            xtype: 'container',
	                layout: {
	                    type: 'vbox',
	                    align: 'stretch'
	                },
	                margin: '5 0 0 0',
	                defaults: {
                        margin: '5 0 0 0'// top, right, bottom, left
                    },
		            items: [
		            	{
		            		xtype: 'container', 
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right',
                                labelWidth: 60
		                    },
		                    items: [
		                    	{
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('eta'),
		                            name: 'eta',
									bind: '{theBerthing.eta}',
									editable : false
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('atw'),
		                            name: 'atw',
									bind: '{theBerthing.atw}',
									editable : false
		                        },
								{
									xtype: 'container',
									flex: 3
								}
		                    ]
		            	},{
		            		xtype: 'container',
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right',
                                labelWidth: 60
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('etw'),
		                            name: 'etw',
									bind: '{theBerthing.etw}',
									editable : false
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('atc'),
		                            name: 'atc',
									bind: '{theBerthing.atc}',
									editable : false
		                        },
								{
									xtype: 'container',
									flex: 3
								}
		                    ]
		            	},{
		            		xtype: 'container',
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right',
                                labelWidth: 60
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('ata'),
		                            name: 'ata',
									bind: '{theBerthing.ata}',
									editable : false
		                        },
	                            {
	                            	xtype:'textfield',
	            					editable:false,
	            					fieldLabel: ViewUtil.getLabel('atu'),
	            					flex: 1,
	            					name: 'atu',
	            					bind: '{theBerthing.atu}'
	                            },
								{
									xtype: 'container',
									flex: 3
								}
		                    ]
		            	},{
		            		xtype: 'container',
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right',
                                labelWidth: 60
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('atb'),
		                            name: 'atb',
									bind: '{theBerthing.atb}',
									editable : false
		                        },
	                            {
	                            	xtype:'textfield',
	            					editable:false,
	            					fieldLabel: ViewUtil.getLabel('atd'),
	            					flex: 1,
	            					name: 'atd',
	            					bind: '{theBerthing.atd}'
	                            },
								{
									xtype: 'container',
									flex: 3
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