Ext.define('MOST.view.operation.VesselOperationReport', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-vesseloperationreport',

    requires: [
    ],
    
	width:1100,
	height:560,
	itemId: 'vesseloperationreport',

	listeners:{
		afterrender: 'onDetailLoad'
	},

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'form',
			defaults:{
				margin: '5 5 5 0' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
            items: [
            	{
		            xtype: 'container',
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            margin: '0 0 0 0',
		            items: [{
                            xtype: 'fieldset',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            margin: '5 5 5 5',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: { type: 'vbox'},
                                    defaults:{
                						labelAlign: 'right',
                					},
                                    items: [
                                        {
                                        	xtype:'textfield',
                                        	reference: 'refVslCallId',
                        					fieldLabel: ViewUtil.getLabel('jpvc'),
                        					labelWidth: 35,
                                            width:205,
                                            bind: '{theVessel.vslCallId}',
                                            readOnly : true,
                                        }
                                    ]
                                }
                            ]
                        },{
                            xtype: 'fieldset',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            margin: '5 5 5 0',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    flex :1,
                                    defaults:{
                						labelAlign: 'right',
                						labelWidth : 70,
                						margin: '5 5 0 0'
                					},
                                    items: [
                                    	{
                                        	xtype:'textfield',
                        					reference:'refWorkYmd',
                        					fieldLabel: ViewUtil.getLabel('vorDate'),
                                            width:205,
                                            readOnly : true,
                                            bind: '{theCargo.workYmd}'
                                        },
                                        {
                                        	xtype:'combo',
                        					reference:'refShift',
                        					fieldLabel: ViewUtil.getLabel('vorShift'),
                                            width:205,
                                            align : 'left',
                                            bind: {
                            	    			store: '{shiftCombo}'
                            	    		},
                            	    		displayField: 'shftNm',
                           					valueField: 'shftId',
                           					queryMode: 'local',
											value : '',
											hideTrigger: true,
											readOnly : true,
                                        }
                                     
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    flex :1,
                                    defaults:{
                						labelAlign: 'right',
                						labelWidth : 70,
                						margin: '5 5 0 0'
                					},
                                    items: [
                                    	{
                                        	xtype:'textfield',
                        					reference:'refVORHatchNo',
                        					fieldLabel: ViewUtil.getLabel('vorHatchNo'),
                                            width:205,
                                            readOnly : true,
                                            bind: '{theCargo.hatchNo}'
                                        },
                                        {
                                        	xtype:'combo',
                        					reference:'refVORStevedore',
                        					fieldLabel: ViewUtil.getLabel('vorStevedore'),
                                            width:205,
                                            readOnly : true,
                                            bind: '{theCargo.workComp}'
                                        }
                                    ]
                                }
                            ]
                        }			          
		            ]
				},{
                    xtype: 'tabpanel',
                    margin: '0 5 5 5',
                    flex: 1,
    	    		layout: 'fit',                    
                    items: [
                    {
                    	title: ViewUtil.getLabel('vesselInformation'),
						xtype: 'app-vesselInformation',
			    		reference: 'refVesselInformation',                    	
                    },{
                    	title: ViewUtil.getLabel('vorDailyRosterStevedores'),
                    	xtype: 'app-dailyRosterStevedores',
			    		reference: 'refDailyRosterStevedores',                    	
                    },{
                    	title: ViewUtil.getLabel('vorEquipments'),
						xtype: 'app-equipments',
			    		reference: 'refEquipments'
                    },{
                    	title: ViewUtil.getLabel('vorDetailOfHandling'),
						xtype: 'app-detailOfHandling',
			    		reference: 'refDetailOfHandling'
                    },{
                    	xtype:'panel',
                    	title: ViewUtil.getLabel('tabVSRCheckList'),
                    	tabConfig:{
			    			listeners: {
			    				click: 'onStartVSRChecklist'
         					}
     					}
                    },{
                    	xtype:'panel',
                    	title: ViewUtil.getLabel('tabVesselDelay'),
                    	tabConfig:{
			    			listeners: {
			    				click: 'onStartVesselDelay'
         					}
     					}
                    }
                    ]
                }            	
            ],
            dockedItems:[{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
	        	},
	        	 margin: '5 5 0 0',
				items: [{
			            xtype: 'container',
			            layout: {
			                type: 'hbox',
			                align: 'stretch'
			            },
			            defaults: {
		                    margin: '0 5 0 0',
		                    editable: false,
		                    align : 'center',
		                    width : 150
		                },
			            items: [
			            	{
								xtype: 'button',
								reference: 'ctlVerifyText',
								style: 'display:inline-block;text-align:center;background:#c0c0c0;font-weight:bold;'
							},
			                {
								xtype: 'button',
								reference: 'ctlVerifybtn',
								text: ViewUtil.getLabel('verify'),
								listeners: {
									click: 'onVerify'
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