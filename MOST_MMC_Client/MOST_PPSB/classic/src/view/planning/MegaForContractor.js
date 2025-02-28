Ext.define('MOST.view.planning.MegaForContractor', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megaforcontractor',
	requires: [
		'MOST.view.planning.MegaForContractorModel',
		'MOST.view.planning.MegaForContractorController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'megaforcontractor',
	
	detailViewAlias: 'app-megaforcontractor',
	
	viewModel: {
		type: 'megaforcontractor'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'fieldset',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				margin: '5 5 5 0',
				defaults:{
					margin: '5 5 0 0'
				},
				items: [{ //Row 1
					xtype: 'container',
					layout: {
						type: 'hbox'
					},
					defaults: {
						labelAlign: 'right',
						margin: '0 5 0 0'
					},	
					items:[
						{
							xtype: 'shipcallnofield',
							reference: 'ctlScn',
							//emptyText: ViewUtil.getLabel('shipCallNo'),
							labelWidth: 80,
							width: 318,
							fieldLabel: ViewUtil.getLabel('shipCallNo'),
							bind: {
								value: '{theSearch.scn}',
							},
							
						},
						{
           					xtype: 'vesselcalllistfield',
           					width: 240,
           					fieldLabel: ViewUtil.getLabel('vessel'),
							labelWidth: 70,
							allowBlank: false,   
           					reference:'ctlJpvc',
							bind: {
								value: '{theSearch.vslCallId}'
							}
           				},{
							xtype: 'partnercdfield',
							labelWidth: 70,
							fieldStyle: 'background-color: #ffccff;',
							width: 235,
							//margin : '0 5 0 20',
							fieldLabel: ViewUtil.getLabel('sa'),
							reference:'ctlSa',
							params:{
								searchDivCd: 'SHA'
							},
							bind: {
								value: '{theSearch.saId}'
							}
						},{
							reference: 'ctlServiceDate',
							xtype: 'datefield',
							labelWidth: 90,
							width: 240,
							fieldLabel: ViewUtil.getLabel('workYmd'),
							format: MOST.config.Locale.getShortDate(),
							listeners: {
	    						change: 'onServiceDateChange'
	    					}
						},{
							xtype:'cmmcdfield',
							labelWidth: 91,
							width: 250,
							fieldLabel: ViewUtil.getLabel('commodity'),
							reference: 'ctlCommodity',
							fieldStyle: 'background-color: #ffccff;',
							params:{
								searchType : 'CMDT'
							},
							bind: {
								value: '{theSearch.cmdt}'
							}
						},
		   				{
							xtype: 'partnercdfield',
							reference: 'refCboContractorForklift',
							labelWidth: 90,
							queryMode:'local',
							editable: false,
							matchFieldWidth: true,
							displayField: 'engPtyNm',
							valueField: 'ptyCd',									
							filter: 'string',
							fieldLabel: ViewUtil.getLabel('contractor'),
							editable: false,
							matchFieldWidth: false,
							width: 240,
							params:{
								searchDivCd: 'CTT'
							},
						},            
		            ]
	    		},
				//Row 2
	    		{
					xtype: 'container',
					layout: {
						type: 'hbox'
					},
					defaults: {
						labelAlign: 'right',
						margin: '0 5 0 0'
					},
					items:[
	                	{
	    					reference: 'ctlFromDt',
	    					xtype: 'datefield',
	    					labelWidth: 80,
							width: 200,
							allowBlank: false,
	    					fieldLabel: ViewUtil.getLabel('saDate'),
	    					format: MOST.config.Locale.getShortDate(),
	    					listeners: {
	    						change: 'onDateChange'
	    					},
	    					editable: false
	    				},{
	    					reference: 'ctlToDt',
	    			        xtype: 'datefield',
							width : 115,
							allowBlank: false,
	    			        format: MOST.config.Locale.getShortDate(),
	    					listeners: {
	    						change: 'onDateChange'
	    					},
	    					editable: false
	    			    },{
							reference: 'ctlDeploymentCombo',
							xtype: 'combo',
							labelWidth: 115,
							//margin : '0 5 0 45',
							width: 240,
							fieldLabel: ViewUtil.getLabel('deploymentYn'),
							queryMode: 'local',
							bind: {
							 store: '{megaRequisitionDeploymentCombo}'
						 	},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							editable: false,
							allowBlank: true
						},
//						{
//	    					xtype:'textfield',
//	    					reference:'ctlMegaNo',
//	    					fieldLabel: me.lblMegaNo,
//	    					labelWidth:80,
//	    					//margin:'0 5 0 30',
//	    					width: 200,
//	    					fieldStyle: 'text-transform:uppercase',
//	    					listeners:{
//	    						change: 'onUpperCase'
//	    					}
//	       				},
	       				{
	       					reference: 'ctlPurposeCombo',
	       					xtype: 'combo',
	       					labelWidth: 68,
	       					width: 235,
	       					fieldLabel: ViewUtil.getLabel('purpose'),
	       					queryMode: 'local',
	       					bind: {
	        	    			store: '{megaRequisitionPurposeCombo}'
	        	    		},
	       					displayField: 'scdNm',
	       					valueField: 'scd',
	       					value : '',
	       					matchFieldWidth: false,
	       					editable: false,
	       					allowBlank: true
						},
	       				{
							reference: 'ctlMegaStatusCombo',
							xtype: 'combo',
							labelWidth: 88,
							width: 240,
							fieldLabel: ViewUtil.getLabel('megaStatus'),
							queryMode: 'local',
							bind: {
							 store: '{megaRequisitionMegaStatusCombo}'
						 	},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							editable: false,
							allowBlank: true
						},
						{
		   					reference: 'ctlShiftCombo',	
		   					xtype: 'combo',
		   					labelWidth: 89,
		   					width: 250,
		   					fieldLabel: ViewUtil.getLabel('shift'),
		   					queryMode: 'local',
		   					bind: {
		    	    			store: '{megaRequisitionShiftCombo}'
		    	    		},
		   					displayField: 'shftNm',
		   					valueField: 'shftId',
		   					value : '',
		   					editable: false,
		   					allowBlank: true
		   				},
	                ]
	    		}
			]},
			{
				xtype: 'tsb-datagrid',
				reference: 'refMegaContractorGrid',
				flex : 1,
				stateful : true,
				stateId : 'statemegaContractorGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{megaContractor}'
	    		},
	    		selModel: {
		            type: 'checkboxmodel',  
		            checkOnly: false,
					showHeaderCheckbox: true,
            	},
				listeners: {
					cellclick: 'onMegaGridClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('MegaForContractor')
                }
		    },
		    {
				xtype: 'fieldset',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				defaults: {
					labelAlign: 'right',
					margin: '5 5 0 0',
					editable: false
				},
				margin:'0 5 5 0',
				items:[
					{
			            xtype: 'container',
			            width: 500,
			            defaults: {
			                margin: '0 0 0 5',
			                labelWidth: 60,
			                labelAlign: 'right'
			            },
			            layout: {
			                type: 'vbox',
			                align: 'stretch'
			            },
			            items: [
			                {
			                    xtype: 'container',
			                    layout: {
			                        type: 'hbox',
			                       
			                    },
			                    items: [
			                        {
			                            xtype: 'label',
			                            width: 70,
			                            text: ViewUtil.getLabel('breakBulk')
			                            
			                        },
			                        {
					                    xtype: 'textfield',
					                    reference: 'ctlNosofGang',
					                    fieldLabel: ViewUtil.getLabel('nosofGang'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                },
					                {
					                    xtype: 'textfield',
					                    reference: 'ctlBBSupervisor',
					                    fieldLabel: ViewUtil.getLabel('supervisor'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                },
					                {
					                    xtype: 'textfield',
					                    reference: 'ctlWinchMen',
					                    fieldLabel: ViewUtil.getLabel('winchMen'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                },
					                {
					                    xtype: 'textfield',
					                    reference: 'ctlBBGeneralWorkers',
					                    fieldLabel: ViewUtil.getLabel('generalWorkers'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                }
			                    ]
			                },
			                {
			                    xtype: 'container',
			                    layout: {
			                        type: 'hbox',
			                    
			                    },
			                    items: [
			                        {
			                            xtype: 'label',
			                            width: 70,
			                            text: ViewUtil.getLabel('dryBulk')
			                        },
			                        {
					                    xtype: 'textfield',
					                    reference: 'ctlNosofHatch',
					                    fieldLabel: ViewUtil.getLabel('nosofHatch'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                },
					                {
					                    xtype: 'textfield',
					                    reference: 'ctlDBSupervisor',
					                    fieldLabel: ViewUtil.getLabel('supervisor'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                },
					                {
					                    xtype: 'textfield',
					                    reference: 'ctlSignalMen',
					                    fieldLabel: ViewUtil.getLabel('signalMen'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                },
					                {
					                    xtype: 'textfield',
					                    reference: 'ctlDeckMen',
					                    fieldLabel: ViewUtil.getLabel('deckMen'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                },
					                {
					                    xtype: 'textfield',
					                    reference: 'ctlHoperMen',
					                    fieldLabel: ViewUtil.getLabel('hoperMen'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                },
					                {
					                    xtype: 'textfield',
					                    reference: 'ctlDBGeneralWorkers',
					                    fieldLabel: ViewUtil.getLabel('generalWorkers'),
					                    value: '0',
					                    editable: false,
					                    labelAlign: 'right',
					                    width : 165
					                }
			                    ]
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
    					align: 'left',
    				},
                    defaults: {
                        margin: '1 1 1 1'
                    },
                    items: [{
						xtype: 'tbfill'
					},
                    {
                        xtype: 'button',
                        text: ViewUtil.getLabel('search'),
                        itemId: 'inquiryItemId',
                        iconCls: 'x-fa fa-search',
                        cls: 'search-button', 
                        reference:'refBtnRetrieve',
                        listeners: {
                            click: 'onSearchBtn'
                        }	
                    
                    },
                    {
                        xtype: 'button',
                        itemId: 'previewItemId',
                        text: ViewUtil.getLabel('preview'),
                        name: 'detailPreview',
                        cls: 'excel-button',
                        reference:'refBtnPreview',
                        iconCls: 'fa fa-file-pdf-o',
                        listeners:{
                              click:'onMegaPreviewPDF'
                           }
                    },
                    {
                        xtype: 'button',
                        itemId: 'downloadItemId',
                        text: ViewUtil.getLabel('download'),
                        cls: 'excel-button',
                        reference:'refBtnDownload',
                        iconCls: 'fa fa-file-excel-o',
                        listeners:{
                              click:'onExport'
                           }
                    },{
        				xtype :'container',
        				layout:{
        					type : 'hbox',
        					pack : 'end'
        				},
        				flex : 1,
						hidden: true,
        				margin : '0 0 0 0',
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
        			}]
                }]
		});
		
		me.callParent();
	}
});

