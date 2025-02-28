Ext.define('MOST.view.document.DocumentationClearanceStatus', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-docclearancestatus',
	requires: [
		'MOST.view.sample.SingleGridModel',
		'MOST.view.sample.SingleGridController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'docclearancestatus',
	
	viewModel: {
		type: 'docclearancestatus'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lbljpvc: {type: 'bundle', key: 'jpvc'},
	lblsa: {type: 'bundle', key: 'sa'},
	lbleta: {type: 'bundle', key: 'eta'},
	lblzb55: {type: 'bundle', key: 'zb55'},
	lblregNo: {type: 'bundle', key: 'regNo'},
	lblconfirmationSlip: {type: 'bundle', key: 'confirmationSlip'},
	lblisps: {type: 'bundle', key: 'isps'},
	lblcrc: {type: 'bundle', key: 'crc'},
	lblstowage: {type: 'bundle', key: 'stowage'},
	
	btnRetrieve: {type: 'bundle', key: 'retrieve'},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;	
		Ext.apply(me, {
			items: [				
				{
					xtype: 'grid',
					margin: '0 0 0 0',
					reference: 'refDocumentationClearanceStatusGrid',
					flex : 1,
					stateful : true,
					stateId : 'stateSingleGridGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
		    		],
		    		bind: {
		    			store: '{documentationClearanceStatus}'
		    		},
		    		selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						/*celldblclick: 'onDblClick'*/
					},
					columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items: [
						{
							header: me.lbljpvc,
							dataIndex: 'vslCallId',
							width: 150,
						},{
							header: me.lblsa,
							dataIndex: 'saId',
							width: 100,
						},{
							header : me.lbleta,
							dataIndex : 'eta',
							width: 150,
						},{
							header : me.lblzb55,
							dataIndex : 'jobNo',
							width : 150,
						},{
	       				    header: me.lblregNo,
	       					dataIndex: 'regNo',
					        width: 160,
		            	}, {
	       					header: me.lblconfirmationSlip,
	       					dataIndex: 'confmDate',
	       					width: 160
	       				}, {
	       					header: me.lblisps,
	       					dataIndex: 'isps',
	       					width: 80
	       				},{
	       					header: me.lblcrc,
	       					dataIndex: 'crc',
	       					width: 80
	       				},{
	       					header: me.lblstowage,
	       					dataIndex: 'stowage',
	       					width: 80
	       				},]
					}
			    }],
		    
		    dockedItems: [
				{
					xtype: 'container',
					style: { "background-color":"white" },
					margin: '0 0 0 0',
					layout: {
						type: 'hbox',
						align:'right'
					},
	            	items: [
	            		{
    						xtype: 'tbfill'
    					},
                    	{
							xtype: 'button',
							itemId: 'inquiryItemId',
                        	text: ViewUtil.getLabel('search'),
        					iconCls: 'x-fa fa-search',
        					cls: 'search-button', 
    						reference:'refBtnRetrieve',
    						listeners: {
    							click: 'onSearch'
    						}
                        },{
	        				xtype :'container',
	        				layout:{
	        					type : 'hbox',
	        					pack : 'end'
	        				},
	        				hidden: true,
	        				/*flex : 1,*/
	        				margin : '0 0 0 5',
	        				items:[
	        					{
	        		                ui: 'default-toolbar',
	        		                xtype: 'button',
	        		                margin : '1 5 0 0',
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
	        		                    }, {
	        		                        text: 'Excel xlsx (include groups)',
	        		                        cfg: {
	        		                            type: 'excel07',
	        		                            ext: 'xlsx',
	        		                            includeGroups: true,
	        		                            includeSummary: true
	        		                        }
	        		                    }, {
	        		                        text: 'Excel xml',
	        		                        cfg: {
	        		                            type: 'excel03',
	        		                            ext: 'xml'
	        		                        }
	        		                    }, {
	        		                        text: 'Excel xml (include groups)',
	        		                        cfg: {
	        		                            includeGroups: true,
	        		                            includeSummary: true
	        		                        }
	        		                    }, {
	        		                        text: 'CSV',
	        		                        cfg: {
	        		                            type: 'csv'
	        		                        }
	        		                    }, {
	        		                        text: 'TSV',
	        		                        cfg: {
	        		                            type: 'tsv',
	        		                            ext: 'csv'
	        		                        }
	        		                    }, {
	        		                        text: 'HTML',
	        		                        cfg: {
	        		                            type: 'html'
	        		                        }
	        		                    }, {
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
				},
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype:'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							layout:{
								type:'vbox',
								align:'stretch'
							},
							defaults:{
								labelAlign: 'right',
								labelWidth: 50,
								margin:'0 0 0 5',
						},
						flex: 1,
						items:[
							{
		                        xtype: 'container',
		                        layout: {
		                            type: 'hbox'
		                        },
		                        defaults: {
		                        	width: 220,
		                        	labelWidth: 70,
		                        	labelAlign: 'right',
		                        	margin: '0 5 0 5',
		                        },
		                        items: [
									{
										xtype: 'shipcallnofield',
										reference: 'ctlScn',
										//emptyText: ViewUtil.getLabel('shipCallNo'),
										fieldLabel: ViewUtil.getLabel('shipCallNo'),										
									},
		            				{
		            					xtype:'partnercdfield',
		                                fieldLabel:me.lblsa,
		                                reference:'ctlSa',
		                                params:{
		                                    searchDivCd: 'SHA' //SHA, CTT, MSC, VDPR, SHA, FWD, STV, TRK, CNS, TRM
		                                }
		                            }
		            				
		                        ]
		                    },
		                    {
		                        xtype: 'container',
		                        layout: {
		                            type: 'hbox'
		                        },
		                        defaults: {
		                        	width: 220,
		                        	labelWidth: 70,
		                        	labelAlign: 'right',
		                        	margin: '5 5 0 5',
		                        },
		                        items: [
		                        	{
		            					xtype:'vesselcalllistfield',
		            					reference:'ctlVessel',
		            					fieldLabel: me.lbljpvc
		               				},
		               				{
		            					reference: 'ctlFromDt',
		            					xtype: 'datefield',
		            					fieldLabel: me.lbleta,
		            					format: MOST.config.Locale.getShortDate(),
		            					editable: false,
		            					listeners: {
		            						change: 'onDateChange'
		            					}
		            				}, 
		            				{
		            					reference: 'ctlToDt',
		            			        xtype: 'datefield',
		            			        width: 150,
		            			        format: MOST.config.Locale.getShortDate(),
		            			        editable: false,
		            					listeners: {
		            						change: 'onDateChange'
		            					}
		            				},		            				
		                        ]
		                    }
						]
					}],
				}
			]
			
		});
		
		me.callParent();
	}
});

