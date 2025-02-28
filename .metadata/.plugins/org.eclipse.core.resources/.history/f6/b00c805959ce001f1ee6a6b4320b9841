Ext.define('MOST.view.controller.StaffAndEquipmentDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-staffanddeploymentdetail',
	
	requires: [
		'Ext.plugin.Viewport'
	],
	
	width: 1200,
	height: 650,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onDetailLoad',
		destroy:'onDetailDestroy'
	},

	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			xtype:'form',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype:'container',
					layout:{
						type:'hbox'
					},
					items:[
						{
							xtype :'fieldset',
							margin: '0 0 0 5',
			                layout: {
			                    type: 'hbox',
			                    align: 'stretch'
			                },
			                items: [
			                	{
				                    xtype: 'container',
				                    margin : '0 0 0 0',
				                    defaults: {
				                        margin: '2 0 0 5',
				                        labelAlign: 'right',
				                        labelWidth:60
				                    },
				                    layout: {
				                        type: 'vbox'
				                    },
				                    items: [
				                        {
				                        	xtype:'vesselcalllistfield',
				        					fieldLabel: ViewUtil.getLabel('vessel'),
				        					width:230,
				        					editable:false,
				        					name: 'vslCallId',
				        					reference: 'refVslCallId',
				        					bind: {
				        						value:'{theSearchDetail.vslCallId}'
				        					},
				        					listeners:{
												change:'onAutoRetrieve'
											}
				                        },{
				                        	xtype:'combo',
				        					fieldLabel: ViewUtil.getLabel('purpose'),
				        					bind: {
				            	    			store: '{purposeCombo}',
				            	    			value:'{theSearchDetail.purpTpCd}'
											},
											listeners:{
												select:'onSelectPurpose'
											},
				           					displayField: 'scdNm',
				           					valueField: 'scd',
				        					editable:false,
				        					matchFieldWidth: true,
				        	                width:230,
				        					queryMode: 'local',
				        					name: 'purpose',
				        					reference: 'txtPurpose'
				                        }
				                    ]
				                },{
				                    xtype: 'container',
				                    margin : '0 0 0 0',
				                    defaults: {
				                        margin: '2 0 0 5',
				                        labelAlign: 'right',
				                        labelWidth:60,
				                        width: 180
				                    },
				                    layout: {
				                        type: 'vbox',
				                        align: 'stretch'
				                    },
				                    items: [
				                    	{
		    	                        	xtype:'datefield',
		    	        					fieldLabel: ViewUtil.getLabel('date'),
		    	        					editable:false,
		    	        					format: MOST.config.Locale.getShortDate(),
		    	        					name: 'workYmd',
		    	        					reference: 'txtWorkYmd',
		    	        					bind: '{theSearchDetail.workYmd}',
		    	        					listeners:{
												change:'onAutoRetrieve'
											}
		    	                    	},{
			                            	xtype:'combo',
			            					fieldLabel: ViewUtil.getLabel('shift'),
			            					editable:false,
			            					name: 'shift',
			            					reference: 'txtShift',
			            					bind: {
			                	    			store: '{shiftCombo}',
			                	    			value: '{theSearchDetail.shftId}'
			                	    		},
			               					displayField: 'shftNm',
			               					valueField: 'shftId',
			                                matchFieldWidth: true,
			            					queryMode: 'local',
			            			        editable: false,
			            			        listeners:{
												change:'onAutoRetrieve'
											}
			                            }
			                        ]
				                }
			                ]
						},{
			                xtype: 'fieldset',
			                layout: {
			                    type: 'hbox',
		                        align: 'stretch'
			                },
			                flex:1,
			                margin: '0 5 0 5',
			                items: [
			                	{
				                    xtype: 'container',
				                    layout: {
				                        type: 'vbox',
				                        align: 'stretch'
				                    },
				                    flex: 1,
				                    margin : '0 0 0 0',
				                    defaults:{
				                    	margin: '2 0 0 0',
				                    	labelWidth : 80,
				                    	labelAlign:'right'
				                    },
				                    items: [
				                    	{
				                        	xtype:'textfield',
				        					fieldLabel: ViewUtil.getLabel('vesselname'),
				        					editable:false,
				        					name: 'vesselName',
				        					reference: 'txtVslNm',
				        					bind: '{theSearchDetail.vslNm}'
			    	                    },{
			                            	xtype:'textfield',
			            					fieldLabel: ViewUtil.getLabel('cargoTp'),
			            					editable:false,
			            					name: 'flagCd',
			            					reference:'txtCgType',
			            					bind: '{theSearchDetail.cgTpNm}'
			                            }
			                        ]
			                	},{
				                    xtype: 'container',
				                    defaults: {
				                    	margin: '2 0 0 0',
				                    	labelWidth : 80,
				                    	labelAlign:'right'
				                    },
				                    margin : '0 0 0 0',
				                    layout: {
				                        type: 'vbox',
				                        align: 'stretch'
				                    },
				                    flex: 1,
				                    items: [
				                    	{
			                            	xtype:'textfield',
			            					fieldLabel: ViewUtil.getLabel('berthingLoc'),
			            					editable:false,
			            					name: 'berthLoc',
			            					reference:'txtBerthLoc',
			            					bind: '{theSearchDetail.berthLoc}'
			                            },{
				                        	xtype:'datefield',
				        					fieldLabel: ViewUtil.getLabel('atd'),
				        					readOnly:true,
				        					name: 'eta',
				        					reference:'txtAtd',
				        					bind: '{theSearchDetail.atd}',
				        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
				                        }
			                        ]
			                	},{
				                    xtype: 'container',
				                    defaults: {
				                    	margin: '2 0 0 0',
				                    	labelWidth : 80,
				                    	labelAlign:'right'
				                    },
				                    margin : '0 0 0 0',
				                    layout: {
				                        type: 'vbox',
				                        align: 'stretch'
				                    },
				                    flex: 1,
				                    items: [
				                    	{
				        					xtype: 'datefield',
				                            fieldLabel: ViewUtil.getLabel('eta'),
				                            bind: '{theSearchDetail.eta}',
				                            reference:'txtEta',
				                            readOnly : true,
				                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
				                        },{
				                        	xtype:'datefield',
				        					fieldLabel: ViewUtil.getLabel('etb'),
				        					name: 'eta',
				        					reference:'txtEtb',
				        					bind: '{theSearchDetail.etb}',
				        					readOnly : true,
				        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
				                        }
				                    ]
		                		}
			                ]
			            }					
					]
				},{ // Row : 2
					xtype: 'container',
					height:620,
					layout: {
	                    type: 'vbox',
	                    align: 'stretch'
	                },
	                margin : '5 5 5 5',
	                flex: 1,
	                reference:'refDetailTabPanel',
	                items: [
		                {
		                    xtype: 'tabpanel',
		                    flex: 1,
		                    deferredRender:false, //all tab load
		                    defaults: {
		                    	margin: '0 0 0 0',
		                    },
		                    items: [
		                        {
		                        	xtype:'panel',
		                        	title: ViewUtil.getLabel('manPower'),
		                        	reference:'refStaffManPowerPnl',
		                        	autoScroll: true,
		                        	autoHeight: false,
		                        	disabled:false,
						    		layout:'fit',
		                        	items : [
		        						{
		        							xtype: 'app-staffandequipmentmanpower',
		        				    		reference: 'refStaffManPower',
		        				    		flex: 1,
		        						}
		        					]
		                        },
		                        {
		                        	xtype:'panel',
		                        	title: ViewUtil.getLabel('portCrane'),
		                        	reference:'refStaffPortCranePnl',
		                        	autoScroll: true,
		                        	autoHeight: false,
						    		layout:'fit',
						    		disabled:false,
		                        	items : [
		        						{
		        							xtype: 'app-staffandequipmentportcrane',
		        				    		reference: 'refPortCrane',
		        				    		flex: 1,
		        				    		
		        						}
		        					]
		                        },
		                        {
		                        	xtype:'panel',
		                        	title: ViewUtil.getLabel('forklift'),
		                        	reference:'refStaffForkLiftPnl',
		                        	disabled:false,
		                        	layout:'fit',
		                        	items : [
		        						{
		        							xtype: 'app-staffandequipmentforklift',
		        				    		reference: 'refForklift',
		        				    		flex: 1
		        						}
		        					]
		                        },
		                        {
		                        	xtype:'panel',
		                        	title: ViewUtil.getLabel('stevedore'),
		                        	reference:'refStaffStevedorePnl',
		                        	layout:'fit',
		                        	disabled:false,
		                        	items : [
		        						{
		        							xtype: 'app-staffandequipmentstevedore',
		        				    		reference: 'refStevedore',
		        				    		flex: 1
		        						}
		        					]
		                        }
		                    ]
		                }
		            ]
				}],
			
				dockedItems:[
					{
						xtype: 'container',
						layout: {
							type: 'hbox'
						},
						defaults: {
							margin: '1 1 1 1'
						},
						items: [
							{
								xtype: 'button',
								text: ViewUtil.getLabel('search'),
								iconCls: 'x-fa fa-search',
								cls: 'search-button', 
								reference:'btnRetrieveStaffEquip',
								listeners: {
									click: 'onRetrieveStaffEquip'
								}
							}
						]
					}
				]
			}
		);
		
		me.callParent();
	}
});