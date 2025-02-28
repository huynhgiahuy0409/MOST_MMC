Ext.define('MOST.view.billing.SsrDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-ssrdetail',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	height: 580,
    width: 1350,
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	config: {
		recvData: null
	},
	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			xtype: 'form',
			defaults:{
				margirn: '5 5 0 5'
			},
			layout: {
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
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'fieldset',
                            reference: 'fsJPVC',
                            layout: {
                                type: 'vbox'
                            },
                            margin: '5 5 5 5',
                            defaults:{
                            	margin: '5 0 0 0',
          				    	labelAlign: 'left',
        					},
                            items: [
                            	{
    								xtype: 'shipcallnofield',
    								fieldLabel: ViewUtil.getLabel('scn'),
    								margin: '0 0 0 5',
    								reference: 'ctlDetailScn',
    								width:270,
    								labelWidth:70,
    								bind:{
    									value: '{theHeadDetail.scn}'
    								}
    							},
                            	{
              				    	xtype:'vesselcalllistfield',
              				    	width:270,
              				    	margin: '4 0 0 5',
              				    	fieldLabel: ViewUtil.getLabel('vessel'),
              				    	labelWidth:70,
              				    	reference:'ctlDetailVesselField',
              				    	bind:{
              				    		value : '{theHeadDetail.vslCallId}',
              				    	}
                            	}
                            ]
                        },{
                            xtype: 'fieldset',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults:{
        						labelAlign: 'right'
        					},
        					margin: '5 5 5 0',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults:{
                						margin: '5 0 0 0',
                						labelAlign: 'right',
                						labelWidth: 80
                					},
                					flex: 1,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('vesselName'),
                                            flex : 1,
                                            editable:false,
                                            reference: 'ctlvesselName',
                                            bind:'{theHeadDetail.vesselName}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex : 1,
                                            fieldLabel: ViewUtil.getLabel('sA'),
                                            editable:false,
                                            reference: 'ctlSA',
                                            bind:'{theHeadDetail.sa}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex : 1,
                                            fieldLabel: ViewUtil.getLabel('eTA'),
                                            editable:false,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                            reference: 'ctlDetailETA',
                                            bind:'{theHeadDetail.eta}'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'stretch'
                                    },
                                    defaults:{
                						margin: '5 0 0 0',
                						labelAlign: 'right',
                						labelWidth: 80
                					},
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex:1,
                                            fieldLabel: ViewUtil.getLabel('voyage'),
                                            editable:false,
                                            reference: 'ctlvoyage',
                                            bind:'{theHeadDetail.voyage}'
                                        },
                                        {
                                        	 xtype: 'textfield',
                                             flex:1,
                                             fieldLabel: ViewUtil.getLabel('berthNo'),
                                             editable:false,
                                             reference: 'ctlberthNo',
                                            bind:'{theHeadDetail.berthLoc}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex:1,
                                            fieldLabel: ViewUtil.getLabel('eTD'),
                                            editable:false,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                            reference: 'ctlDetailETD',
                                            bind:'{theHeadDetail.etd}'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
				},
				{
                    xtype: 'container',
                    defaults:{
						margin: '0 5 5 0',
						labelAlign: 'right'
					},
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                    	{
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('shippingLine'),
                            reference: 'refStatus',
                            labelWidth: 80,
                            width: 300,
                            bind:'{theHeadDetail.shp}',
                            editable:false
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Status',
                            reference: 'refStatus',
                            labelWidth: 40,
                            width: 150,
                            editable:false,
                            fieldStyle: 'color: #DE0C09',
                        },{
                            xtype: 'button',
                            text: ViewUtil.getLabel('verify'),
                            reference:'ctlVerify',
                            disabled: true,
    						cls: 'search-button',
    						width : 130,
                            listeners:{
        						click:'onVerify'
        					},
        					hidden: true
                        },{
                            xtype: 'button',
                            text: ViewUtil.getLabel('proofSheet'),
                            reference:'ctlProofsheet',
    						iconCls: 'fa fa-product-hunt',
    						cls: 'search-button',
    						width : 130,
                            listeners:{
        						click:'openPSPopup'
        					}
                        },{
                            xtype: 'button',
                            reference:'ctlCreateIv',
                            text: ViewUtil.getLabel('createInvoice'),
    						iconCls: 'fa fa-envelope',
    						cls: 'search-button',                             
                            disabled:true,
                            width : 130,
                            listeners:{
        						click:'onCreateIv'
        					},
        					hidden: true
                        }
                    ]
				},{
                    xtype: 'tabpanel',
                    reference:'ctlSsrDetailTabPanel',
                    flex: 1,
                    margin : '0 5 5 5',
                    activeTab: 0,
                    items: [
                        { // Vessel Schedule
                            xtype: 'container',
                            title: 'SSR Header', //me.lblhead,
    						scrollable: 'both',
    						items : [
    						{
    							xtype: 'app-ssrdetailtabheader',
    				    		reference: 'refSsrDetailTabHeader',
    						}]
                        },{
                        	xtype: 'app-ssrdetailtabdetail',
				    		reference: 'refSsrDetailTabDetail',
                            title: 'SSR Detail'
                        }
                    ]
                }
			],
		    
		    /*Head*/
		    dockedItems: [{
		    	
		    }]
		});
		me.callParent();
	}
});

