Ext.define('MOST.view.document.terminalholdreleasecontrol.TerminalHoldReleaseControlRelease', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-terminalholdreleasecontrolrelease',
	
	width: 900,
	height: 300,
	
	listeners:{
		afterrender: 'onReleaseLoad'
	},
	
	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},	

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			xtype: 'form',
			defaults: {
				margin: '0 0 0 0' // top, right, bottom, left
			},
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
		        {
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		                    	margin: '2 5 2 0',
								labelAlign: 'right',
								labelWidth: 100
							},
		                    items: [
		                    	{
        		   					xtype:'textfield',
        		   					width:290,
        		   					fieldLabel:ViewUtil.getLabel('vslcallid'),
        		   					reference:'ctlJpvcDtl',
        		   					editable: false,
        					        bind:'{theDetail.vslCallId}'
        		   				},
        		   				{
        		   					xtype:'textfield',
        		   					width:250,
        		   					fieldLabel:ViewUtil.getLabel('category'),
        		   					reference:'ctlImportExport',
        		   					editable: false,
        					        bind:'{ieString}'
        		   				},
        		   				{
        		   					xtype:'textfield',
        		   					width:290,
        		   					fieldLabel:ViewUtil.getLabel('masterBlNo'),
        		   					reference:'ctlMasterBlNo',
        		   					editable: false,
        					        bind: '{theDetail.docNo}'
        		   				}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		                    	margin: '2 5 2 0',
								labelAlign: 'right',
								labelWidth: 100
							},
		                    items: [
		                    	{
        		   					xtype:'textfield',
        		   					width:290,
        		   					fieldLabel:ViewUtil.getLabel('holdReason'),
        		   					reference:'ctlMasterBlNo',
        		   					editable: false,
        					        bind: '{theDetail.holdReasonDesc}'
        		   				},
        		   				{
        		   					xtype:'textfield',
        		   					width:250,
        		   					fieldLabel:ViewUtil.getLabel('blno'),
        		   					reference:'ctlBlno',
        		   					editable: false,
        					        bind: '{theDetail.cgNo}'
        		   				}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		                    	margin: '2 5 2 0',
								labelAlign: 'right',
								labelWidth: 100
							},
		                    items: [
        		   				{
        		   					xtype:'textfield',
        		   					width:545,
        		   					fieldLabel:ViewUtil.getLabel('vinNo'),
        		   					reference:'ctlVinNo',
        		   					editable: false,
        					        bind:{value: '{theDetail.vinNo}'}
        		   				}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		                    	margin: '2 5 2 0',
								labelAlign: 'right',
								labelWidth: 100
							},
		                    items: [
		                    	{
        		   					xtype:'textfield',
        		   					width:545,
        		   					fieldLabel:ViewUtil.getLabel('remark'),
        		   					reference:'ctlRemark',
        					        bind:{value: '{theDetail.releaseRemark}'}
        		   				}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		                    	margin: '2 40 2 0',
								labelAlign: 'right',
								labelWidth: 150
							},
		                    items: [
		                    	{
        		   					xtype : 'button',
    								width : 80,
    								margin : '15 5 0 400',
    								reference : 'ctlHold',
    								text : ViewUtil.getLabel('add'),
    								listeners : {
    									click : 'onRelease'
    								}
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