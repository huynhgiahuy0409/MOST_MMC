Ext.define('MOST.view.document.ShippingNoteDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-shippingnotedetail',
	
	requires: [
	    'Ext.layout.container.Table',
		'MOST.view.document.DGDeclarationDoc'
	],
	
	width: 1550,
	height: 830,
	scrollable: true,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	layout:'fit',
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME : 'refShippingNoteGrid', // Main Grid Name 
	MAIN_STORE_NAME : 'shippingNoteGridList', // Main Store Name
	DELIVERY_MODE_STORE: 'deliveryModeCombo',
	OPERATION_TYPE_STORE: 'operationTypeCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'panel',
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
		            items: [
		                {
	                        xtype: 'fieldset',
	                        margin: '5 5 0 5',
	                        defaults: {
	                        	margin:'5 5 0 0',
		                        labelAlign: 'right',
		                        labelWidth: 70
		                    },
		                    layout: {
		                        type: 'vbox'
		                    },
	                        items: [
								{
	                                xtype: 'textfield',
	                                reference:'ctlScn',
	                                fieldLabel: ViewUtil.getLabel('scn'),
	                                readOnly: true,
	                                bind: '{theShippingNote.scn}'
	                            },
	                            {
	                                xtype: 'textfield',
	                                reference:'ctlVslCallId',
	                                fieldLabel: ViewUtil.getLabel('vslCallId'),
	                                readOnly: true,
	                                bind: '{theShippingNote.vslCallId}'
	                            }
	                        ]
		                },
		                {
		                	xtype:'fieldset',
		                    margin: '5 5 0 0',
		                    flex: 1,
		                    defaults:{
		                    	flex: 1
		                    },
		                	layout:{
		                		type :'hbox'
		                	},
		                	items:[
		                		{
		    	                    xtype: 'container',
		    	                    margin: '0 0 0 0',
		    	                    defaults: {
		    	                    	margin: '5 5 0 0',
		    	                        labelAlign: 'right',
		    	                        labelWidth: 70,
		    	                        width : 220
		    	                    },
		    	                    layout: {
		    	                        type: 'vbox'
		    	                    },
		    	                    items: [
		    	                        {
		    	                            xtype: 'textfield',
		    	                            reference: 'refVslCd',
		    	                            fieldLabel: ViewUtil.getLabel('vesselCode'),
		    	                            bind: '{theSearchDetail.vslCd}',
		    	                            editable: false
		    	                            	
		    	                        },
		    	                        {
		    	                            xtype: 'textfield',
		    	                            fieldLabel: ViewUtil.getLabel('vesselName'),
		    	                            bind: '{theSearchDetail.vslNm}',
		    	                            editable: false
		    	                        },
		    	                        {
		    	                            xtype: 'textfield',
		    	                            fieldLabel: ViewUtil.getLabel('voyage'),
		    	                            bind: '{theSearchDetail.voyage}',
		    	                            editable: false
		    	                        }
		    	                    ]
		    	                },
		    	                {
		    	                    xtype: 'container',
		    	                    margin: '0 0 0 0',
		    	                    defaults: {
		    	                        labelAlign: 'right',
		    	                        labelWidth: 70,
		    	                        width : 220,
		    	                        margin: '5 5 0 0'
		    	                    },
		    	                    layout: {
		    	                        type: 'vbox'
		    	                    },
		    	                    items: [
		    	                        {
		    	                            xtype: 'textfield',
		    	                            fieldLabel: ViewUtil.getLabel('aSA'),
		    	                            bind: '{theSearchDetail.arrvSaId}',
		    	                            editable : false
		    	                        },
		    	                        {
		    	    	                	xtype: 'datefield',
		    	                            fieldLabel: ViewUtil.getLabel('eta'),
		    	                            bind: '{theSearchDetail.eta}',
		    	                            editable : false,
		    	                            readOnly : true,
		    	                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
		    	                        },
		    	                        {
		    	    	                	xtype: 'datefield',
		    	                            fieldLabel: ViewUtil.getLabel('etd'),
		    	                            bind: '{theSearchDetail.etd}',
		    	                            editable : false,
		    	                            readOnly : true,
		    	                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
		    	                        }
		    	                    ]
		    	                },
		    	                {
		    	                    xtype: 'container',
		    	                    margin: '0 0 0 0',
		    	                    defaults: {
		    	                        labelAlign: 'right',
		    	                        labelWidth: 70,
		    	                        width : 220,
		    	                        margin: '5 5 0 0'
		    	                    },
		    	                    layout: {
		    	                        type: 'vbox'
		    	                    },
		    	                    items: [
		    	                        {
		    	                            xtype: 'textfield',
		    	                            fieldLabel: ViewUtil.getLabel('berthingLoc'),
		    	                            bind: '{theSearchDetail.berthLoc}',
		    	                            editable : false
		    	                        },
		    	                        {
		    	                            xtype: 'textfield',
		    	                            fieldLabel: ViewUtil.getLabel('storageLoc'),
		    	                            editable : false
		    	                            
		    	                        },
		    	                        {
		    	                            xtype: 'textfield',
		    	                            fieldLabel: ViewUtil.getLabel('dSA'),
		    	                            bind: '{theSearchDetail.depSaId}',
		    	                            editable : false
		    	                        }
		    	                    ]
		    	                }
		                	]
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
		            padding: '5 5 5 5',
		            defaults: {
		                margin: '0 0 0 0',
		                labelAlign: 'right',
		                flex:1
		            },
		            layout: {
		                type: 'hbox',
		            },
		            items: [
		            	{
	                        xtype: 'textfield',
	                        fieldLabel: ViewUtil.getLabel('sNNo'),
	                        bind: {
	                        	value: '{theShippingNote.shipgNoteNo}',
		                    },
	                        reference: 'ctlshipNoteNo',
	                        fieldStyle : 'text-transform: uppercase',
	                        listeners: {
	    			        	change: function(){
	    							var me = this;
	    							me.setValue(this.getValue().toUpperCase());
	    						},
	    					},
	    					maskRe: /[0-9A-Za-z]/,
	    					maxLength: 20,
	    					allowBlank: true,
	    					hidden: true
	                    },
	                    {
	                        xtype: 'textfield',
	                        padding: '0 0 0 0',
	                        fieldLabel: ViewUtil.getLabel('sNNo'),
	                        bind: {
	                        	value: '{theShippingNote.newShipgNoteNo}',
		                    },
	                        reference: 'ctlNewShipNoteNo',
	                        fieldStyle : 'text-transform: uppercase',
	                        listeners: {
	    			        	change: 'onChangeKeyDoc'
	    					},
	    					maskRe: /[0-9A-Za-z]/,
	    					maxLength: 20,
	    					enforceMaxLength: true,
	    					editable: false
	                    },
	                    {
	                		xtype: 'textfield',
	                		reference:'refUserRefNo',
	                		fieldLabel: ViewUtil.getLabel('lotNo'),
	                		bind:'{theShippingNote.lotNo}',
	                		enforceMaxLength: true,
							maxLength : 30,
	                		listeners: {
	    						change: 'onUpperCase'
	    					}
	                    },
		                {
		                    xtype: 'combo',
		                    reference: 'ctlDeliveryMode',
		                    fieldLabel: ViewUtil.getLabel('deliveryMode'),
		                    bind: {
		                    	store: '{' + me.DELIVERY_MODE_STORE + '}',
		                    	value: '{theMain.delvTpCd}'
		                    },
							queryMode: 'local',
					        displayField: 'scdNm',
					        valueField: 'scd',
					        emptyText: 'Select',
					        editable: false,
					        allowBlank: false,
					        value : '',
					        activeError: 'important',
					        listeners:{
					        	change:'onComboBoxChange'
					        }
		                },
		                {
		                    xtype: 'combo',
		                    reference: 'ctlModeofOperation',
		                    fieldLabel: ViewUtil.getLabel('modeofOperation'),
		                    bind: {
	                    		store: '{' + me.OPERATION_TYPE_STORE + '}',
	                    		value: '{theMain.tsptTpCd}',
		                    },
							queryMode: 'local',
					        displayField: 'scdNm',
					        valueField: 'scd',
					        editable: false,
					        allowBlank: false,
					        emptyText: 'Select',
					        value : '',
					        listeners:{
					        	change:'onComboBoxChange'
					        },
		                },
		                {
		                    xtype: 'textfield',
		                    reference: 'ctlSNStatus',
		                    fieldLabel: ViewUtil.getLabel('sNStatus'),
		                    editable: false,
		                    bind: '{theMain.statCdNm}'
		                }
		            ]
		        },
		        {
		            xtype: 'tabpanel',
		        	height: 310,
		        	minHeight: 310,
		            deferredRender:false,
		            margin : '0 5 5 5',
		            activeTab: 0,
		            flex : 1,
					listeners:{
		            	tabchange:'onTabChange'
		            },
		            items: [
		            	{
		                	xtype: 'app-submissionsndetail',
							name:'sndetail',
		                	reference: 'refSubmissionSnDetail',
		                    title: ViewUtil.getLabel('snDetail')
		                },{
		                    xtype: 'app-submissiongoodsdetail',
							name:'gooddetail',
		                    reference: 'refSubmissionGoodsDetail',
		                    title: ViewUtil.getLabel('goodsDetail')
		                },{
		                    xtype: 'app-submissionshipperconsignee',
		                    reference: 'refSubmissionShipperConsignee',
		                    title: ViewUtil.getLabel('shipperConsignee')
		                },{
		                    xtype: 'app-submissionsnrorotab',
							name:'shipperconsignee',
		                    reference: 'refROROTab',
		                    disabled: true,
		                    title: ViewUtil.getLabel('roro')
		                },{
		                	xtype: 'app-submissionpackagedetail',
							name:'packagedetail',
		                    reference: 'refPackageDetailTab',
		                    disabled: true,
							hidden: true,
		                    title: 'Package Detail'
		                }
		            ]
		        }],
		        dockedItems: [
		        	{
			            xtype: 'toolbar',
			            defaults: {
			                margin: '0 5 5 0',
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
					                    reference : 'ctlDGDeclaration',
					                    width: 120,
					                    text: ViewUtil.getLabel('dGDeclaration'),
					                    listeners: {
					                    	click: 'onOpenDG'
					                    }
					                },
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
					                    reference : 'ctlApproval',
					                    text: ViewUtil.getLabel('approval'),
					                    hidden: true,
					                	listeners:{
					                		click: 'onApproval'
					                	}
					                },{
					                    xtype: 'button',
					                    reference : 'ctlSASubmit',
					                    hidden: true,
					                    text: ViewUtil.getLabel('proformaPayment')
					                }
								]
							}
			            ]
			        }
		        ]	 
			}
		);
		
		me.callParent();
	}
});