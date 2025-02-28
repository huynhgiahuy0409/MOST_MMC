Ext.define('MOST.view.document.DeliveryOrderDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-deliveryorderdetail',
	
	title: 'Master Delivery Order Detail',
	
	requires: [
	  
	],
	
	width:1300,
	height:720,
	
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
	                xtype: 'fieldset',
	                layout: {
	                    type: 'hbox',
	                    align: 'stretch'
	                },
	                items: [
	                    {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '2 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth:95
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                        	xtype:'textfield',
		        					fieldLabel: ViewUtil.getLabel('vessel'),
		        					editable:false,
		        					width: 250,
		        					name: 'vslCallId',
		        					bind: '{theMain.vslCallId}'
		                        },{
		                        	xtype:'textfield',
		        					fieldLabel: ViewUtil.getLabel('vesselname'),
		        					editable:false,
		        					width: 250,
		        					name: 'vslNm',
		        					bind: '{theMain.vslNm}'
		                        }
		                    ]
		                },{
		                    xtype: 'container',
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    flex: 2,
		                    items: [
		                        {
		    	                    xtype: 'container',
		    	                    defaults: {
		    	                        margin: '2 0 0 5',
		    	                        labelAlign: 'right',
		    	                        labelWidth:95
		    	                    },
		    	                    layout: {
		    	                        type: 'hbox',
		    	                        align: 'stretch'
		    	                    },
		    	                    items: [
		    	                    	{
		    	                    		xtype: 'container',
		    	                    		layout: {
		    	                    			type: 'hbox'
		    	                    		},
		    	                    		defaults: {
				    	                        margin: '2 0 0 5',
				    	                        labelAlign: 'right',
				    	                        labelWidth: 90
				    	                    },
		    	                    		flex:1,
		    	                    		items:[
		    	                    			{
					                            	xtype:'textfield',
					            					fieldLabel: ViewUtil.getLabel('voyage'),
					            					editable:false,
					            					padding: '0 -10 0 0',
					            					flex:3,
					            					name: 'inbVoy',
					            					bind: '{theMain.inbVoyage}'
					                            },{
					                            	xtype:'textfield',
					            					editable:false,
					            					flex:1,
					            					name: 'outbVoy',
					            					bind: '{theMain.outbVoyage}'
					                            }
		    	                    		]
		    	                    	},{
			                            	xtype:'textfield',
			            					fieldLabel: ViewUtil.getLabel('scn'),
			            					editable:false,
			            					flex:1,
			            					labelWidth:55,
			            					name: 'scn',
			            					bind: '{theMain.scn}'
			                            }
			                        ]
		                        },{
		    	                    xtype: 'container',
		    	                    defaults: {
		    	                        margin: '2 0 0 5',
		    	                        labelAlign: 'right',
		    	                        labelWidth:95
		    	                    },
		    	                    layout: {
		    	                        type: 'hbox',
		    	                        align: 'stretch'
		    	                    },
		    	                    items: [
			                            {
			                            	xtype:'textfield',
			            					fieldLabel: ViewUtil.getLabel('eta'),
			            					editable:false,
			            					flex:1,
			            					name: 'eta',
			            					format: MOST.config.Locale.getShortDate(),
			            					bind: '{theMain.eta}'
			                            },{
			                            	xtype:'textfield',
			            					fieldLabel: ViewUtil.getLabel('flag'),
			            					editable:false,
			            					flex:1,
			            					labelWidth:55,
			            					name: 'flagCd',
			            					bind: '{theMain.flagCd}'
			                            }
			                        ]
		                        },{
		    	                    xtype: 'container',
		    	                    defaults: {
		    	                        margin: '2 0 0 5',
		    	                        labelAlign: 'right',
		    	                        labelWidth:95
		    	                    },
		    	                    layout: {
		    	                        type: 'hbox',
		    	                        align: 'stretch'
		    	                    },
		    	                    items: [
			                            {
			                            	xtype:'textfield',
			            					fieldLabel: ViewUtil.getLabel('arrvSaId'),
			            					editable:false,
			            					flex:1,
			            					name: 'arrvSaId',
			            					bind: '{theMain.arrvSaId}'
			                            },{
			                            	xtype:'textfield',
			            					editable:false,
			            					flex:1,
			            					name: 'arrvSaNm',
			            					bind: '{theMain.arrvSaNm}'
			                            }
			                        ]
		                        }
		                    ]
		                },{
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '2 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth:95
		                    },
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                        	xtype:'textfield',
		        					fieldLabel: ViewUtil.getLabel('berLoc'),
		        					editable:false,
		        					width: 250,
		        					labelWidth:140,
		        					name: 'berthLoc',
		        					bind: '{theMain.berthLoc}'
		                        },{
		                        	xtype:'textfield',
		        					fieldLabel: ViewUtil.getLabel('storeLoc'),
		        					editable:false,
		        					width: 250,
		        					labelWidth:140,
		        					name: 'storLoc'
		                        },{
		                        	xtype:'textfield',
		        					fieldLabel: ViewUtil.getLabel('SNLDSA'),
		        					editable:false,
		        					width: 250,
		        					labelWidth:140,
		        					name: 'depSaId',
		        					bind: '{theMain.deprSaId}'
		                        }
		                    ]
		                }
	                ]
	            },{ // Row : 2
					xtype: 'fieldset',
					layout: {
	                    type: 'vbox',
	                    align: 'stretch'
	                },
	                items: [
		                {
		                    xtype: 'container',
		                    defaults: {
		                        labelAlign: 'right',
		                        labelWidth:80
		                    },
		                    layout: {
		                        type: 'hbox'
		                    },
		                    items: [
		                        {
		                        	xtype:'textfield',
		        					fieldLabel: ViewUtil.getLabel('blno'),
		        					editable:false,
		        					labelStyle: "color:blue;font-weight:bold;",
		        					width: 200,
		        					labelWidth:50,
		        					name: 'blno',
		        					bind: '{theMain.blno}'
		                        },{
		                            xtype: 'label',
		                            width: 120,
		                            margin: '5 0 0 20',
		                            style: "font-weight:bold;",
		                        	name: 'delvTpNm',
		        					bind: '{theMain.delvTpNm}'
		                        },{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('domesticCargo'),
									reference: 'refDomesticChk',
									bind: '{theMain.domesticChk}',
									inputValue: 'Domestic Cargo',
			                        uncheckedValue: 'N',
			                        readOnly: true,
			                        checked:false
								},{
		                        	xtype:'textfield',
		        					fieldLabel: ViewUtil.getLabel('userRefNo'),
		        					editable:false,
		        					width: 250,
		        					name: 'userRefNo',
		        					bind: '{theMain.mfdocid}'
		                        },{
		                        	xtype:'textfield',
		        					fieldLabel: ViewUtil.getLabel('hsCode'),
		        					editable:false,
		        					width: 250,
		        					name: 'hsCode',
		        					bind: '{theMain.hscd}'
		                        }
		                    ]
		                }
		            ]
				},{ // Row : 3
					xtype: 'container',
					layout: {
	                    type: 'vbox',
	                    align: 'stretch'
	                },
	                flex:1,
	                margin: '0 0 0 0',
	                items: [
		                {
		                    xtype: 'tabpanel',
		                    deferredRender:false,
		                    margin: '5 5 5 5',
		                    defaults: {
		                    	margin: '0 0 0 0',
		                    },
		                    flex: 1,
		                    items: [
		                        {
		                        	xtype:'panel',
		                        	title: ViewUtil.getLabel('main'),
		                        	items : [
		        						{
		        							xtype: 'app-deliverymain',
		        				    		reference: 'refDeliveryMain',
		        				    		flex: 1
		        						}
		        					]
		                        },{
		                        	xtype:'panel',
		                        	title: ViewUtil.getLabel('shipperConsignee'),
		                        	items : [
		        						{
		        							xtype: 'app-deliveryshipperconsignee',
		        				    		reference: 'refDeliveryShipperConsignee',
		        				    		flex: 1
		        						}
		        					]
		                        },{
									xtype: 'dororotab',
									reference: 'refROROTab',
									disabled: true,
									title: 'RORO'
								},{
		                        	xtype:'panel',
		                        	title: 'Package Detail',
		                        	reference: 'refDeliveryPackageDetail',
		                        	disabled: true,
		                        	items : [
		        						{
		        							xtype: 'app-deliverypackagedetail',
		        				    		flex: 1
		        						}
		        					]
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