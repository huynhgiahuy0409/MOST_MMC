Ext.define("MOST.view.cargo.bl.BLDetail",{
    extend: "Ext.form.Panel",
    alias: 'widget.app-bldetail',
    requires:[
		'MOST.config.Locale',
		'TSB.ux.form.field.DateTimePicker',
	],
	
	scrollable: 'vertical',
	
	layout: 'fit',
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	width: 1400,
    
    layout: {
		type: 'vbox',
		align: 'stretch',
	},
	
    //height: 700,
	
    OPERATION_TYPE_STORE: 'operationTypeCombo',
    
	initComponent: function(){
		var me = this;
		
		Ext.apply(me, {
			xtype: 'form',
			defaults:{
				margin: '5 5 0 5'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items:[
				{
	                xtype: 'container',
	                defaults:{
	                	padding: '5 5 0 5'
	                },
	                items: [
	    				{
	    					xtype: 'fieldset',
	    					defaults:{
	    						margin: '0 0 5 0'
	    					},
	    					items:[
	    						{
	    							xtype: 'container',
	    			                defaults: {
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox',
	    			                    align: 'stretch'
	    			                },
	    			                items:[
	    			                	{
	    									xtype: 'vesselcalllistfield',
	    									fieldLabel: ViewUtil.getLabel('vslCallId'),
	    									reference: 'refVslCallId',
	    									flex: 1,
	    									editable: false,
	    									bind:{
	    										value: '{theBL.vslCallId}'
	    									}
	    								},{
	    									xtype: 'textfield',
	    									fieldLabel: ViewUtil.getLabel('vesselCode'),
	    									reference: 'txtVslCdDetail',
	    									flex: 1,
	    									format: MOST.config.Locale.getShortDate(),
	    									editable: false,
	    									bind:'{theBL.vslCd}'
	    								},{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('shippingAgent'),
											flex: 1,
											editable: false,
											bind:'{theBL.arrvSaId}',
										},{
											xtype: 'textfield',
											flex: 1,
											editable: false,
											fieldLabel: ViewUtil.getLabel('berthLoc'),
											bind:'{theBL.berthLoc}'
										}	
	    			                ]
	    						},{
	    							xtype: 'container',
	    			                defaults: {
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox',
	    			                    align: 'stretch'
	    			                },
	    			                items:[
	    			                	{
	    									xtype: 'container',
	    									flex: 1
	    								},
	    			                	{
	    									xtype: 'textfield',
	    									fieldLabel: ViewUtil.getLabel('vslNm'),
	    									reference: 'refVslNm',
	    									flex: 1,
	    									editable: false,
	    									bind:{
	    										value: '{theBL.vslNm}'	
	    									}
	    								},{
	    									xtype: 'textfield',
	    									fieldLabel: ViewUtil.getLabel('eta'),
	    									flex: 1,
	    									editable: false,
	    									bind:{
	    										value: '{theBL.eta}'
	    									}
	    								},{
	    									xtype: 'textfield',
	    									hidden: false,
	    									fieldLabel: ViewUtil.getLabel('storageLoc'),
	    									flex: 1,
	    									editable: false,
	    									bind:{
	    										value: '{theBL.locCd}'
	    									}
	    								}	
	    			                ]
	    						},{
	    							xtype: 'container',
	    			                defaults: {
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox',
	    			                    align: 'stretch'
	    			                },
	    			                items:[
	    			                	{
	    									xtype: 'container',
	    									flex:1
	    								},{
	    									xtype: 'textfield',
	    									fieldLabel: ViewUtil.getLabel('voyage'),
	    									reference: 'refVoyage',
	    									flex: 1,
	    									editable: false,
	    									bind:'{theBL.voyage}'
	    								},{
	    									xtype: 'textfield',
	    									fieldLabel: ViewUtil.getLabel('etd'),
	    									flex: 1,
	    									editable: false,
	    									format: MOST.config.Locale.getShortDate(),
	    									bind:'{theBL.etd}',
	    								},{
	    									xtype: 'container',
	    									flex:1
	    								}	
	    			                ]
	    						}
    						]
	    				},{
	    					xtype: 'container',
	    					margin: '0 0 0 0',
				            padding: '0 0 0 0',
//	    	                defaults:{
//	    	                	padding: '7 7 0 7'
//	    	                },
	    	                items: [
	    	                	{
	    	    					xtype: 'fieldset',
	    	    					layout: {
					                	type: 'vbox',
					                	align: 'stretch'
					                },
	    	    					defaults:{
	    	    						margin: '0 0 5 0'
	    	    					},
	    	    					items:[
	    	    						{
	    			                		xtype: 'container',
	    					                layout: {
	    					                	type: 'hbox',
	    					                	align: 'stretch'
	    					                },
	    									defaults: {
	    										//margin: '0 0 5 0',
	    										labelAlign: 'right',
	    										labelWidth: 100
	    									},
	    					                items:[
	    					                	{
	    					                		xtype: 'textfield',
	    						                	reference: 'refMasterBLNo',
	    						                	flex: 1,
	    						                	fieldLabel: ViewUtil.getLabel('masterBLNo'),
	    						                	bind:'{theBL.mfDocId}',
	    						                	allowBlank: false,
	    						                	enforceMaxLength: true,
	    					                		editable: false,
	        										maxLength : 30,
//	    						                	listeners: {
//	    					    						change: 'onUpperCase'
//	    					    					}
	    					                	},{
	    					                		xtype: 'textfield',
	    					                		reference: 'refSubBLNo',
	    					                		flex: 1,
	    					                		fieldLabel: ViewUtil.getLabel('blno'),
	    					                		bind:'{theBL.blNo}',
	    					                		allowBlank: false,
	    					                		enforceMaxLength: true,
	        										maxLength : 35,
	    					                		listeners: {
	    					    						change: 'onUpperCaseModified'
	    					    					}
	    					                	},{
	    					                		xtype: 'textfield',
	    					                		reference:'refBLRefNo',
	    					                		flex: 1,
	    					                		fieldLabel: ViewUtil.getLabel('blOrinalNo'),
	    					                		bind: '{theBL.orgBlNo}',
	    					                		readOnly: true,
	    					                		enforceMaxLength: true,
	        										maxLength : 35,
	    					                		listeners: {
	    					    						change: 'onUpperCase'
	    					    					}
	    					                	},{
	    					                		xtype: 'container',
	    					                		flex: 1
	    					                	}
	    					                ]
	    			                	},
	    			                	{
	    			                		xtype: 'container',
	    					                layout: {
	    					                	type: 'hbox',
	    					                	align: 'stretch'
	    					                },
	    									defaults: {
	    										//margin: '0 0 5 0',
	    										labelAlign: 'right',
	    										labelWidth: 100
	    									},
	    					                items:[
	    					                	{
    	    					                	xtype: 'combo',
								                    reference: 'ctlModeofOperation',
								                    fieldLabel: ViewUtil.getLabel('modeofOperation'),
								                    flex: 1,
								                    bind: {
							                    		store: '{' + me.OPERATION_TYPE_STORE + '}',
							                    		value: '{theBL.tsptTpCd}',
								                    },
													queryMode: 'local',
											        displayField: 'scdNm',
											        valueField: 'scd',
											        editable: false,
											        allowBlank: false,
											        emptyText: 'Select',
											        value : ''
								                },{
	    					                		xtype: 'combo',
	    					                		reference:'ctlDeliveryMode',
	    					                		fieldLabel: ViewUtil.getLabel('deliveryMode'),
	    					                		flex: 1,
	    					                		editable:false,
	    				                            allowBlank: false,
	    				                            emptyText: 'Select',
	    				                            bind: {
	    				            	    			store: '{delvModeCombo}',
	    												value: '{theBL.delvTpCd}'
	    				            	    		},
	    				            	    		displayField: 'scdNm',
	    				           					valueField: 'scd',
	    				           					queryMode: 'local',
	    				           					value : '',
	    				           					listeners:{
	    				           						select: 'onAdditionalChkSetting'
	    				           					}
	    					                	},{
	    					                		xtype: 'textfield',
	    					                		reference:'refUserRefNo',
	    					                		flex: 1,
	    					                		fieldLabel: ViewUtil.getLabel('lotNo'),
	    					                		bind:'{theBL.lotNo}',
	    					                		enforceMaxLength: true,
	        										maxLength : 30,
	    					                		listeners: {
	    					    						change: 'onUpperCase'
	    					    					}
	    					                	},{
	    					                		xtype: 'textfield',
	    					                		reference:'refStatus',
	    					                		fieldLabel: ViewUtil.getLabel('status'),
	    					                		flex: 1,
	    					                		readOnly: true,
	    					                		bind: '{theBL.docStatNm}'
	    					                	}
	    					                ]
	    			                	}
	    			                ]
	    						}
	    	                ]
	    				},{
				            xtype: 'tabpanel',
				            margin: '0 0 0 0',
				            padding: '0 0 0 0',
				            activeTab: 0,
				            flex: 1,
				            items: [
				            	{
									xtype: 'blinfo',
									title: 'B/L Detail'
								},{
									xtype: 'blconsignorconsignee',
									title: 'Shipper/Consignee'
								},{
									xtype: 'rorotab',
									reference: 'refROROTab',
									title: 'RORO'
								},{
									xtype: 'blpackagedetail',
									reference: 'refPackageDetailTab',
									title: 'Package Detail'
								}
				            ]
				        }
					]
				}
	        ],
	        
	        dockedItems: [
	        	{
		            xtype: 'toolbar',
		            defaults: {
		                margin: '0 5 0 0'
		            },
		            dock :'bottom',
		            layout: {
		                type: 'hbox',
		                align: 'stretch',
		                pack: 'end'
		            },
		            items: [
		            	{
							xtype: 'container',
							style: { "background-color":"white" },
							layout: {
								align:'left'
							},
							defaults: {
								margin: '1 1 1 1'
							},
							items: [
				                {
				                	xtype: 'button',
				                	width: 120,
				                	reference : 'ctlSubmit',
				                	text: ViewUtil.getLabel('submit'),
				                	hidden: true,
				                	listeners: {
				                		click: 'onSubmit'
				                	}
				                },{
				                    xtype: 'button',
				                    width: 120,
				                    reference : 'ctlConfirm',
				                    text: ViewUtil.getLabel('confirmDelivery'),
				                    hidden: true,
				                    listeners: {
				                    	click: 'onConfirmDelivery'
				                    }
				                },{
				                    xtype: 'button',
				                    width: 120,
				                    reference : 'ctlApproval',
				                    text: ViewUtil.getLabel('approval'),
				                    hidden: true,
				                	listeners:{
				                		click: 'onApproval'
				                	}
				                },{
				                    xtype: 'button',
				                    width: 120,
				                    reference : 'ctlSplit',
				                    text: ViewUtil.getLabel('splitBL'),
				                    hidden: true,
				                	listeners:{
				                		click: 'onSplitBL'
				                	}
				                }					
							]
						}
		            ]
		        }]
		});
		
		me.callParent();
	}
});