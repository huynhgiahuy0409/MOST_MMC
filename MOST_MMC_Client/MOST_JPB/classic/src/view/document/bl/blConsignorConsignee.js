Ext.define("MOST.view.document.bl.BLConsignorConsignee",{
    extend: "Ext.form.Panel",
    alias: 'widget.blconsignorconsignee',
    requires:[
  		'MOST.config.Locale',
  		'TSB.ux.form.field.DateTimePicker',
  	],
	scrollable: 'y',
	
  	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			xtype:'container',
			defaults:{
				margin: '5 0 0 0'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items:[
				{
					xtype: 'fieldset',
					margin: '5 0 5 0',
					padding: '0 5 0 5',
					height: 361,
					items:[
						{
							xtype: 'container',
			                defaults: {
			                    labelAlign: 'right',
			                    labelWidth: 100
			                },
			                margin: '0 0 0 0',
			                layout: {
			                	type: 'hbox',
			                },
			                items:[
			                	{
			    		            xtype: 'container',
			    		            flex: 1,
			    		            height: 200,
			    		            layout: {
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
			    		                    items: [
			    		                        {
			    		                            xtype: 'partnercdfield',
			    		                            flex: 1,
			    		                            margin: '4 5 5 15',
			    		                            reference:'ctlCnsnor',
			    		                            fieldLabel: ViewUtil.getLabel('shipper'),
			    		                            bind: {
			    		                            	value: '{theBL.shpr}'
			    		                            },
			    		                            labelAlign: 'right',
			    		                            labelWidth: 50,
			    		    	   					params:{
			    		    	   						ptnrType: CodeConstants.CM_PTNRTP_CNS // CNS, FWD, TRK
			    		    	   					}
			    		                        },
			    		                        {
			    		                            xtype: 'textfield',
			    		                            flex: 1,
			    		                            reference:'ctlShipperNm',
			    		                            readOnly : true,
			    		                            bind:'{theBL.shprNm}',
			    		                            margin: '5 0 5 0',
			    		                            width: 280,
			    		                            fieldLabel: ''
			    		                        }
			    		                    ]
			    		                },
			    		                {
			    		                    xtype: 'container',
			    		                    height: 154,
			    		                    layout: {
			    		                        type: 'vbox',
			    		                        align: 'stretch'
			    		                    },
			    		                    items: [
			    		                        {
			    		                            xtype: 'textfield',
			    		                            fieldLabel: ViewUtil.getLabel('SNAddress'),
			    		                            labelAlign: 'right',
			    		                            readOnly : true,
			    		                            bind: '{theBL.shprAddr}',
			    		                            labelWidth: 65
			    		                        }
			    		                    ]
			    		                }
			    		            ]
			    		        },{
			    		            xtype: 'container',
			    		            flex: 1,
			    		            height: 200,
			    		            layout: {
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
			    		                    items: [
			    		                        {
			    		                            xtype: 'partnercdfield',
			    		                            flex: 1,
			    		                            margin: '4 5 5 15',
			    		                            reference:'ctlCnsnee',
			    		                            fieldLabel: ViewUtil.getLabel('csgnee'),
			    		                            bind:{
			    		                            	value : '{theBL.cnsne}'
			    		                            },
			    		                            labelAlign: 'right',
			    		                            labelWidth: 50,
			    		    	   					params:{
			    		    	   						ptnrType: CodeConstants.CM_PTNRTP_CNS // CNS, FWD, TRK
			    		    	   					}
			    		                        },
			    		                        {
			    		                            xtype: 'textfield',
			    		                            flex: 1,
			    		                            reference:'ctlShipperNm',
			    		                            readOnly : true,
			    		                            bind:'{theBL.cnsneNm}',
			    		                            margin: '5 0 5 0',
			    		                            width: 280,
			    		                            fieldLabel: ''
			    		                        }
			    		                    ]
			    		                },
			    		                {
			    		                    xtype: 'container',
			    		                    height: 154,
			    		                    layout: {
			    		                        type: 'vbox',
			    		                        align: 'stretch'
			    		                    },
			    		                    items: [
			    		                        {
			    		                            xtype: 'textfield',
			    		                            fieldLabel: ViewUtil.getLabel('SNAddress'),
			    		                            labelAlign: 'right',
			    		                            readOnly : true,
			    		                            bind: '{theBL.cnsneAddr}',
			    		                            labelWidth: 65
			    		                        }
			    		                    ]
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