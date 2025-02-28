Ext.define('MOST.view.document.shippingnote.submissionshippingnote.SubmissionShipperConsignee', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-submissionshipperconsignee',
	
	requires: [
	],
	
	flex:1,
	
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
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
		                    margin: '10 0 0 0',
		                    items: [
		                        {
		                            xtype: 'partnercdfield',
		                            flex: 1,
		                            margin: '4 5 5 15',
		                            reference:'ctlShipperCd',
		                            fieldLabel: ViewUtil.getLabel('SNShipper'),
		                            bind:{
		                            	value : '{theShippingNote.shpr}'
		                            },
		                            readOnly: true,
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
		                            bind:'{theShippingNote.shprNm}',
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
		                            bind: '{theShippingNote.shprAddr}',
		                            labelWidth: 65
		                        }
		                    ]
		                }
		            ]
		        },
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
		                    margin: '10 0 0 0',
		                    items: [
		                        {
		                            xtype: 'partnercdfield',
		                            flex: 1,
		                            margin: '4 5 5 15',
		                            width: 150,
		                            fieldLabel: ViewUtil.getLabel('SNConsignee'),
		                            reference:'ctlConsigneeCd',
		                            bind:{
		                            	value : '{theShippingNote.cnsne}'
		                            },
		                            readOnly: true,
		                            labelAlign: 'right',
		                            labelWidth: 60,
		    	   					params:{
		    	   						searchPtyDivCd: 'CNS' // CNS, FWD, TRK
		    	   					}
		                        },
		                        {
		                            xtype: 'textfield',
		                            reference:'ctlConsigneeNm',
		                            readOnly : true,
		                            bind: '{theShippingNote.cnsneNm}',
		                            flex: 1,
		                            margin: '5 0 5 0',
		                            width: 265,
		                            fieldLabel: '',
		    	   					params:{
		    	   						searchPtyDivCd: 'CNS' // CNS, FWD, TRK
		    	   					}
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
		                            readOnly : true,
		                            bind: '{theShippingNote.cnsneAddr}',
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