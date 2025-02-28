Ext.define('MOST.view.document.terminalholdreleasecontrol.TerminalHoldReleaseControlHold', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-terminalholdreleasecontrolhold',
	
	width: 800,
	height: 320,
	
	listeners:{
		afterrender: 'onHoldLoad'
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
		                    	margin: '2 40 2 0',
								labelAlign: 'right',
								labelWidth: 150
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
        		   					width:380,
        		   					fieldLabel:ViewUtil.getLabel('importExport'),
        		   					reference:'ctlImportExport',
        		   					editable: false,
        					        bind:'{ieString}'
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
        		   					xtype:'textfield',
        		   					width:290,
        		   					fieldLabel:ViewUtil.getLabel('masterBlNo'),
        		   					reference:'ctlMasterBlNo',
        		   					editable: false,
        					        bind: '{theDetail.docNo}'
        		   				},
        		   				{
        		   					xtype:'textfield',
        		   					width:380,
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
								labelWidth: 150
							},
		                    items: [
		                    	{
		                    		xtype: 'combo',
		                    		fieldLabel: ViewUtil.getLabel('holdReason'),
		                    		queryMode: 'local',
		                    		margin: '2 40 2 0',
		                    		width:290,
		                    		displayField: 'scdNm',
		                    		valueField: 'scd',
		                    		editable: false,
		                    		allowBlank: false,
		                    		bind: {
		                    			store: '{holdReasonCombo}',
		                    			value: '{theDetail.holdReasonCd}'
		             	    		},
		             	    		listeners:{
										select : 'onSelectHoldReason',
									},
        		   				},
        		   				{
        		   					xtype:'textfield',
        		   					width:290,
        		   					fieldLabel:ViewUtil.getLabel('vinNo'),
        		   					reference:'ctlVinNo',
        		   					editable: false,
        					        bind:{
        					        	value: '{theDetail.vinNo}'
        					        }
        		   				},
    							{
    								xtype : 'button',
    								width : 80,
    								margin : '0 5 0 5',
    								reference : 'ctlHold',
    								iconCls: 'x-fa fa-search',
    								text : ViewUtil.getLabel('find'),
    								listeners : {
    									click : 'openUnitNoPopup'
    								}
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
		                    		xtype: 'combo',
		                    		fieldLabel: ViewUtil.getLabel('opeartionToBeStoped'),
		                    		reference:'ctlOpeartionToBeStoped',
		                    		margin: '2 40 2 0',
		                    		queryMode: 'local',
		                    		displayField: 'scdNm',
		                    		valueField: 'scd',
		                    		editable: false,
		                    		width:710,
		                    		allowBlank: false,
		                    		bind: {
		                    			store: '{operationStopedCombo}',
		                    			value: '{theDetail.opToBeStoppedNm}'
		             	    		},
		             	    		listeners:{
										select : 'onSelectHoldOprStoped',
									},
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
        		   					xtype:'textfield',
        		   					width:710,
        		   					fieldLabel:ViewUtil.getLabel('remark'),
        		   					reference:'ctlRemark',
        					        bind:{
        					        	value: '{theDetail.holdRemark}'
        					        }
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
    									click : 'onAddHold'
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