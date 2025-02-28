Ext.define('MOST.view.document.CheckListCustomClearance', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-checklistcustomclearance',
	requires: [
		'MOST.view.document.CheckListCustomClearanceController',
		'MOST.view.document.CheckListCustomClearanceModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	
	controller: 'checklistcustomclearance',
	
	viewModel: {
		type: 'checklistcustomclearance'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
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
                            margin: '5 0 5 0',
                            layout: {
                                type: 'hbox'
                            },
                            defaults:{
        						margin: '0 0 5 0',
        						labelAlign: 'right',
        						labelWidth: 70
        					},
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults:{
                						margin: '0 5 5 0',
                						labelAlign: 'right',
                						labelWidth: 70
                					},	
                                    items: [
                                    	{
        									xtype: 'shipcallnofield',
        									reference: 'ctlScn',
        									emptyText: ViewUtil.getLabel('shipCallNo'),
        									fieldLabel: ViewUtil.getLabel('shipCallNo'),
        									width: 210,
        									/*bind: {
        										value: '{theSearch.scn}',
        									},*/
        								},
                                    	{
                                            xtype:'vesselcalllistfield',
                                            width: 210,
                                		    reference:'ctlVslCallId',
                                			fieldLabel: ViewUtil.getLabel('vslcallid'),
                                			emptyText: ViewUtil.getLabel('vslcallid')
                                        },
                                        {
                                            xtype: 'datefield',
                                            reference: 'ctlETAFromDt',
                                            width: 210,
                                            fieldLabel: ViewUtil.getLabel('eta'),
                                            format: MOST.config.Locale.getShortDate(),
                                            editable: false,
                        					 listeners: {
                       						change: 'onDateChange'
                       					 }
                                        }
                                    ]
                                },
                            	{
                                    xtype: 'container',
                                    margin: '0 5 5 0',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults:{
                						margin: '0 0 5 0',
                						labelAlign: 'right',
                						labelWidth: 70
                					},
                                    items: [
                                        {
                                            xtype:'textfield',
                                            width: 210,
                                		    reference:'ctlBlNo',
                                			fieldLabel: ViewUtil.getLabel('LABLNo'),
                                			emptyText: ViewUtil.getLabel('LABLNo'),
                                        },
                                        {
                                            xtype:'textfield',
                                            width: 210,
                                		    reference:'ctlSNNo',
                                			fieldLabel: ViewUtil.getLabel('sNNo'),
                                			emptyText: ViewUtil.getLabel('sNNo')
                                        },
                                        {
                                             xtype: 'datefield',
                                             reference: 'ctlETAToDt',
                                             width: 150,
                                             format: MOST.config.Locale.getShortDate(),
                                             editable: false,
                         					  listeners: {
                       						change: 'onDateChange'
                       					  }
                                        }
                                    ]
                            	},
                            ]
                    	},
                    	{
                            xtype: 'fieldset',
                            margin: '5 0 5 5',
                            flex:1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                            	{
                                    xtype: 'container',
                                    flex:1,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults:{
                						margin: '0 5 5 0',
                						labelAlign: 'right'
                					},
                                    items: [
                                    	{
                                            xtype: 'textfield',
                                            width: 250,
                                            editable: false,
                                            fieldLabel: ViewUtil.getLabel('vesselCode'),
                                            bind: '{theJpvc.vslCd}',
                                            labelWidth: 90
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: 220,
                                            editable: false,
                                            fieldLabel: ViewUtil.getLabel('sa'),
                                            bind: '{theJpvc.arrvSaId}',
                                            labelWidth: 50
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: 250,
                                            editable: false,
                                            fieldLabel: ViewUtil.getLabel('berthingLoc'),
                                            bind: '{theJpvc.berthLoc}',
                                            labelWidth: 80
                                        }
                                    ]
                            	},
                            	{
                                    xtype: 'container',
                                    flex:1,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults:{
                						margin: '0 5 5 0',
                						labelAlign: 'right'
                					},
                                    items: [
                                    	{
											xtype: 'textfield',
											width: 250,
											editable: false,
											fieldLabel: ViewUtil.getLabel('vesselName'),
											bind: '{theJpvc.vslNm}',
											labelWidth: 90
                            			},
                                        {
                                        	xtype:'textfield',
                        					reference:'dtEta',
                        					editable: false,
                                            width: 220,
                                            fieldLabel: ViewUtil.getLabel('eta'),
                                            bind: '{theJpvc.depSaId}',
                                            labelWidth: 50
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: 250,
                                            editable: false,
                                            fieldLabel: ViewUtil.getLabel('storageLoc'),
                                            labelWidth: 80
                                        }
                                	]
                            	},
                            	{
                                    xtype: 'container',
                                    flex:1,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults:{
                						margin: '0 5 5 0',
                						labelAlign: 'right'
                					},
                                    items: [
                                    	{
                                            xtype: 'textfield',
                                            editable: false,
                                            width: 250,
                                            fieldLabel: ViewUtil.getLabel('voyage'),
                                            bind: '{theJpvc.voyage}',
                                            labelWidth: 90
                                        },
                                        {
                                        	xtype:'datefield',
                                        	editable: false,
                                            width: 220,
                                            fieldLabel: ViewUtil.getLabel('etd'),
                                            bind: '{theJpvc.eta}',
                                            labelWidth: 50,
                                            readOnly : true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                                        },
                                        {
                                        	xtype:'datefield',
                                        	editable: false,
                                            width: 250,
                                            fieldLabel: ViewUtil.getLabel('etw'),
                                            bind: '{theJpvc.etd}',
                                            labelWidth: 80,
                                            readOnly : true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                                        }
                                    ]
                            	}
                            ]
                    	}
                    ]
				},
				{
		            xtype: 'tabpanel',
		            deferredRender:false,
		            reference: 'refTabMain',
		            activeTab: 0,
		            flex: 1,
		           
		            items: [
		            	{
		                    xtype: 'container',
		                    title: ViewUtil.getLabel('custClearanceExport'),
		                    name:'tabExport',
		                    scrollable: 'both',
		                    layout: { type: 'vbox', align: 'stretch'},
		                    items : [
		                    	{
									xtype: 'app-customclearanceexport',
						    		reference: 'refExport',
						    		flex: 1
								}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    title: ViewUtil.getLabel('custClearanceImport'),
		                    name:'tabImport',
		                    scrollable: 'both',
		                    layout: { type: 'vbox', align: 'stretch'},
		                    items : [
		                    	{
									xtype: 'app-customclearanceimport',
						    		reference: 'refImport',
						    		flex: 1
								}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    title: ViewUtil.getLabel('custClearanceTranshipment'),
		                    name:'tabTranshipment',
		                    scrollable: 'both',
		                    layout: { type: 'vbox', align: 'stretch'},
		                    items : [
		                    	{
									xtype: 'app-customclearancetranshipment',
						    		reference: 'refTranshipment',
						    		flex: 1
								}
		                    ]
		                }
		            ]
		        }
			],
		    dockedItems: [
		    	{
                    xtype: 'container',
    				layout: {
    					type : 'hbox',
    					align:'right'
    				},
                    defaults: {
                        margin: '1 1 1 1'
                    },
                    items: [
                    	{
            				xtype :'container',
            				layout:{
            					type : 'hbox',
            					pack : 'end'
            				},
            				flex : 1,
            				margin : '0 0 0 0',
            				items:[
                            	{
                					xtype: 'button',
                					itemId: 'inquiryItemId',
                					margin : '1 0 0 0',
                					text: ViewUtil.getLabel('search'),
                					reference: 'refBtnRetrieve',
                					iconCls: 'x-fa fa-search',
                					listeners: {
                						click: 'onSearch'
                					}
                                },
            					{
            		                ui: 'default-toolbar',
            		                xtype: 'button',
            		                hidden: true,
            		                margin : '1 5 0 5',
            		                cls: 'dock-tab-btn',
            		                text: 'Export to ...',
            		                menu: {
            		                    defaults: {
            		                        handler: 'exportTo'
            		                    },
            		                    items: [{
            		                        text: 'Excel xlsx',
            		                        cfg: {
            		                            type: 'excel07',
            		                            ext: 'xlsx'
            		                        }
            		                    },{
            		                        text: 'Excel xlsx (include groups)',
            		                        cfg: {
            		                            type: 'excel07',
            		                            ext: 'xlsx',
            		                            includeGroups: true,
            		                            includeSummary: true
            		                        }
            		                    },{
            		                        text: 'Excel xml',
            		                        cfg: {
            		                            type: 'excel03',
            		                            ext: 'xml'
            		                        }
            		                    },{
            		                        text: 'Excel xml (include groups)',
            		                        cfg: {
            		                            includeGroups: true,
            		                            includeSummary: true
            		                        }
            		                    },{
            		                        text: 'CSV',
            		                        cfg: {
            		                            type: 'csv'
            		                        }
            		                    },{
            		                        text: 'TSV',
            		                        cfg: {
            		                            type: 'tsv',
            		                            ext: 'csv'
            		                        }
            		                    },{
            		                    	text: 'HTML',
            		                        cfg: {
            		                            type: 'html'
            		                        }
            		                    },{
            		                        text: 'HTML (include groups)',
            		                        cfg: {
            		                            type: 'html',
            		                            includeGroups: true,
            		                            includeSummary: true
            		                        }
            		                    }]
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