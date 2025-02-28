Ext.define('MOST.view.document.deliveryorderdetail.SdoShipperConsignee', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-sdoshipperconsignee',
	
	layout : {type  : 'hbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
		        {
		            xtype: 'container',
		            flex: 1,
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
		                            flex: 0.8,
		                            margin: '5 5 5 15',
		                            width: 145,
		                            fieldLabel: ViewUtil.getLabel('SNShipper'),
		                            bind:{value : '{theMain.shpr}'},
		                            labelAlign: 'right',
		                            labelWidth: 50,
		                            reference:'ctlShipperCd',
		                            params:{
		                            	ptnrType: CodeConstants.CM_PTNRTP_CNS // CNS, FWD, TRK
		    	   					}
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            reference:'refTxtShprNm',
		                            bind:'{theMain.shprNm}',
		                            margin: '5 0 5 5',
		                            width: 262,
		                            fieldLabel: ''
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('SNAddress'),
		                            labelAlign: 'right',
		                            reference:'refTxtSprAddr1',
		                            bind: '{theMain.shprAddr1}',
		                            labelWidth: 65
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'container',
		            flex: 1,
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
		                            flex: 0.8,
		                            margin: '5 5 5 15',
		                            width: 145,
		                            fieldLabel: ViewUtil.getLabel('SNConsignee'),
		                            reference:'ctlConsigneeCd',
		                            bind:{value : '{theMain.cnsneecd}'},
		                          	allowBlank: false,
		                            labelAlign: 'right',
		                            labelWidth: 60,
		                            params:{
		                            	ptnrType: CodeConstants.CM_PTNRTP_CNS // CNS, FWD, TRK
		    	   					}
		                        },{
		                            xtype: 'textfield',
		                            reference:'refTxtCnsNm',
		                            bind: '{theMain.cnsneenm}',
		                            flex: 1,
		                            margin: '5 0 5 5',
		                            width: 262,
		                            fieldLabel: ''
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('SNAddress'),
		                            reference:'refTxtCnsAddr1',
		                            bind: '{theMain.cnsneeaddr1}',
		                            labelAlign: 'right',
		                            labelWidth: 75
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