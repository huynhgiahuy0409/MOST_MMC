Ext.define('MOST.view.billing.DataGatheringDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-datagatheringdetail',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
	    'Ext.form.field.Date',
	    'Ext.tab.Panel',
	    'Ext.tab.Tab'
	],
	
	width:1700,
	height:750,
	
	listeners:{
		afterrender: 'onDetailLoad'
	},

	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			xtype:'container',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
		            xtype: 'container',
		            reference:'refDataGatheringDetail',
		            defaults: {
		                margin: '5 0 0 5',
		                labelAlign: 'right',
		                labelWidth: 100
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'fieldset',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 130
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            defaults: {
		                                margin: '0 0 0 5',
		                                labelAlign: 'right',
										labelWidth: 120,
										width: 315
		                            },
		                            items: [
		                                {
		                                	xtype:'vesselcalllistfield',
		                                	margin: '5 0 0 0 ',
		                                	fieldLabel: ViewUtil.getLabel('datagatheringdetailjpvc'),
		              				    	emptyText:ViewUtil.getLabel('datagatheringdetailjpvc'),
		              				    	reference:'ctlDetailVslCallId',
		              				    	allowBlank: false
		                                },
		                                {
		                                    xtype: 'combobox',
		                                    margin: '5 0 0 0 ',
		                                    reference:'ctlPayerCombo',
		                                    fieldLabel: ViewUtil.getLabel('datagatheringdetailpayer'),
		                                    bind: {
		                                    	store: '{dataGatheringPayerCombo}'
		                                    },
		                                    queryMode: 'local',
	            							displayField: 'payerName',
	            					        valueField: 'payer',
	            					        emptyText: 'Select Data',
	            					        forceSelection:true,
											listeners: {
												select: 'onDetailSearch'
											}
		                                },
		                                {
		                                    xtype: 'combobox',
		                                    margin: '5 0 0 0 ',
		                                    reference:'ctlUserRefNoCombo',
		                                    fieldLabel: ViewUtil.getLabel('datagatheringdetailUserRefNo'),
		                                    bind: {
		                                    	store: '{dataGatheringUserRefNoCombo}'
		                                    },
		                                    queryMode: 'local',
	            							displayField: 'mfDocId',
	            					        valueField: 'mfDocId',
	            					        emptyText: 'Select Data',
	            					        forceSelection:true,
											listeners: {
												select: 'onDetailSearch'
											}
		                                },
		                                {
		                                    xtype: 'combobox',
		                                    margin: '5 0 0 0 ',
		                                    reference:'ctlSubBlSnNoCombo',
		                                    fieldLabel: ViewUtil.getLabel('subBlOrSn'),
		                                    bind: {
		                                    	store: '{dataGatheringSubBlSNNoCombo}'
		                                    },
		                                    queryMode: 'local',
	            							displayField: 'blNoSnNo',
	            					        valueField: 'blNoSnNo',
	            					        emptyText: 'Select Data',
	            					        forceSelection:true,
											listeners: {
												select: 'onDetailSearch'
											}
		                                },
		                            ]
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 1,
		                            defaults: {
		                                margin: '5 0 0 5',
		                                labelAlign: 'right',
		                                labelWidth: 100
		                            },
		                            layout: {
		                                type: 'hbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'button',
		                                    flex: 1,
		    	    						iconCls: 'fa fa-cogs',
		    	    						ui: 'create-button',
		                                    text: ViewUtil.getLabel('datagatheringdetailregathering'),
		                                    listeners: {
		                 						click: 'onStartDataGatheringDetail'
		                 					}
		                                },
		                                {
		                                    xtype: 'button',
		                                    iconCls: 'fa fa-product-hunt',
		                                    ui: 'delete-button', 
		                                    flex: 1,
		                                    text: ViewUtil.getLabel('datagatheringdetailproofSheet'),
		                                    listeners: {
		                 						click: 'onStartProofSheet'
		                 					}
		                                }
		                            ]
		                        }
		                    ]
		                },
		                {
		                    xtype: 'fieldset',
		                    flex: 1,
		                    width: 446,
		                    margin:'5 5 0 5',
		                    items: [
		                        {
		                            xtype: 'textareafield',
		                            margin : '5 5 5 5',
		                            labelWidth : 50,
		                            labelAlign: 'right',
		                        	reference:'ctlRemark',
		                            anchor: '100%',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('datagatheringdetailremark'),
		                            bind:'{DetailItem.remark}'
		                        }
		                    ]
		                }
		            ]
				},{
                    xtype: 'tabpanel',
                    margin : '5 5 5 5',
                    activeTab: 0,
                    flex: 1,
                    items: [
                    	{
                    		title: ViewUtil.getLabel('datagatheringdetailgathereddata'),
							xtype: 'app-datagatheringdetailgathereddata',
				    		flex: 1
						},
                        {
							title: ViewUtil.getLabel('datagatheringdetailvesselinformation'),
							xtype: 'app-datagatheringdetailvesselinformation',
							flex: 1
                        },
                        {
                        	title: ViewUtil.getLabel('datagatheringdetailcargoinformation'),
                        	xtype: 'app-datagatheringdetailcargoinformation',
                        	flex: 1
                        },
                        {
                        	title: ViewUtil.getLabel('datagatheringdetailequipmentinformation'),
                        	xtype: 'app-datagatheringdetailequipmentinformation',
                        	flex: 1
                        }
                    ]
                }
			]
		});
		
		me.callParent();
	}
});

