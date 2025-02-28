Ext.define('MOST.view.operation.vordrybreakbulk.VesselInformation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselInformation',
	
	requires: [
	],
	
	layout : {type  : 'vbox', align : 'stretch'},

	lblVORVessel: {type: 'bundle', key: 'vorVessel'},
	lblVORTonnageLoaded: {type: 'bundle', key: 'vorTonnageLoaded'},
	lblBerthLocation: {type: 'bundle', key: 'berthLocation'},
	lblVORTonnageDischarged: {type: 'bundle', key: 'vorTonnageDischarged'},
	lblVORWharfMarks: {type: 'bundle', key: 'vorWharfMarks'},
	lblVesselType: {type: 'bundle', key: 'vesselType'},
	lblAtb: {type: 'bundle', key: 'atb'},
	lblLoa: {type: 'bundle', key: 'loa'},
	lblAtw: {type: 'bundle', key: 'atw'},
	lblSAgent: {type: 'bundle', key: 'sAgent'},
	lblAtc: {type: 'bundle', key: 'atc'},
	lblAtu: {type: 'bundle', key: 'atu'},
	
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
	                defaults: {
                        margin: '5 0 0 0'// top, right, bottom, left
                    },
		            items: [
		            	{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('vorVessel'),
		                            name: 'vslNm',
									bind: '{theVslInfo.vslNm}',
									editable : false,
									labelWidth: 100
		                        },
		                        {
		                            xtype: 'textfield',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('vorTonnageLoaded'),
		                            name: 'loadCargoQty',
									bind: '{theVslInfo.loadCargoQty}',
									editable : false,
									labelWidth: 170
		                        }
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('berthLocation'),
		                            name: 'berthLoc',
									bind: '{theVslInfo.berthLoc}',
									editable : false,
									labelWidth: 100
		                        },
		                        {
		                            xtype: 'textfield',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('vorTonnageDischarged'),
		                            name: 'dischCargoQty',
									bind: '{theVslInfo.dischCargoQty}',
									editable : false,
									labelWidth: 170
		                        }
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            width: 215,
		                            fieldLabel: ViewUtil.getLabel('vorWharfMarks'),
		                            name: 'wharfMarkFrom',
									bind: '{theVslInfo.wharfMarkFrom}',
									editable : false,
									labelWidth: 100
		                        },
		                        {
	                            	xtype:'textfield',
	            					editable:false,
	            					width: 105,
	            					name: 'wharfMarkTo',
	            					bind: '{theVslInfo.wharfMarkTo}'
	                            },
	                            {
	                            	xtype:'textfield',
	            					editable:false,
	            					fieldLabel: ViewUtil.getLabel('vesselType'),
	            					width: 330,
	            					labelWidth: 170,
	            					name: 'vslTpNm',
	            					bind: '{theVslInfo.vslTpNm}'
	                            },
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('atb'),
		                            name: 'atb',
									bind: '{theVslInfo.atb}',
									editable : false,
									labelWidth: 100
		                        },
	                            {
	                            	xtype:'textfield',
	            					editable:false,
	            					fieldLabel: ViewUtil.getLabel('loa'),
	            					width: 330,
	            					labelWidth: 170,
	            					name: 'loa',
	            					bind: '{theVslInfo.loa}'
	                            },
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('atw'),
		                            name: 'atw',
									bind: '{theVslInfo.atw}',
									editable : false,
									labelWidth: 100
		                        },
	                            {
	                            	xtype:'textfield',
	            					editable:false,
	            					fieldLabel: ViewUtil.getLabel('sAgent'),
	            					width: 330,
	            					labelWidth: 170,
	            					name: 'sa',
	            					bind: '{theVslInfo.sa}'
	                            },
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('atc'),
		                            name: 'atc',
									bind: '{theVslInfo.atc}',
									editable : false,
									labelWidth: 100
		                        }
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '0 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('atu'),
		                            name: 'atu',
									bind: '{theVslInfo.atu}',
									editable : false,
									labelWidth: 100
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