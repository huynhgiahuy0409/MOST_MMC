Ext.define('MOST.view.planning.berth.BerthApproval', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthapproval',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	detailViewAlias: 'app-berthapprovaldetail',

	controller: 'berthapproval',
	
	viewModel: {
		type: 'berthapproval'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	btnRetrieve: {type: 'bundle', key: 'retrive'},
	btnCreate: {type: 'bundle', key: 'create'},
	btnDelete: {type: 'bundle', key: 'delete'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	btnSave: {type: 'bundle', key: 'save'},

	lblPlan: {type: 'bundle', key: 'plan'},
	lblVesselType: {type: 'bundle', key: 'vesselType'},
	lblETA: {type: 'bundle', key: 'eta'},
	lblJPVC: {type: 'bundle', key: 'vslCallId'},
	lblMPTSStatus: {type: 'bundle', key: 'mptsstatus'},
	lblCargoType: {type: 'bundle', key: 'cargotype'},
	lblVesselName: {type: 'bundle', key: 'vesselname'},
	lblBerthPlan: {type: 'bundle', key: 'berthplan'},
	lblConfirm: {type: 'bundle', key: 'confirm'},
	lblNovaStatus: {type: 'bundle', key: 'novastatus'},
	lblBerthApprovalUser: {type: 'bundle', key: 'berthapprovaluser'},
	lblMPTSStatusTime: {type: 'bundle', key: 'mptsstatustime'},
	lblStatus: {type: 'bundle', key: 'status'},
	lblBerthLoc: {type: 'bundle', key: 'berthloc'},
	lblBalance: {type: 'bundle', key: 'balance'},
	lblFile: {type: 'bundle', key: 'file'},
	lblAdviseDate: {type: 'bundle', key: 'advisedate'},
	lblConsignee: {type: 'bundle', key: 'consignee'},
	lblConsignor: {type: 'bundle', key: 'consignor'},
	lblLOA: {type: 'bundle', key: 'loa'},
	lblDL: {type: 'bundle', key: 'dl'},
	lblMT: {type: 'bundle', key: 'mt'},
	lblAgency: {type: 'bundle', key: 'agency'},
	
	btnSearch: {type: 'bundle', key: 'search'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	btnExportToExcel: {type: 'bundle', key: 'exportToExcel'},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
	
		Ext.apply(me, {
			items: [{
	            xtype: 'fieldset',
	            layout: {
	                type: 'vbox',
	                align: 'stretch'
	            },
	            margin: '5 5 5 0',
	            items: [ {
			                xtype: 'container',
			                layout: {
			                    type: 'hbox',
			                    align: 'stretch'
			                },
		                    defaults: {
		                        labelAlign: 'right',
		                        margin: '5 5 0 0',
		                        editable: false
		                    },
			                items: [
			                	{
				                    xtype: 'combo',
				                    reference: 'ctlPlanCombo',
				                    fieldLabel: me.lblPlan,
									queryMode: 'local',
				   					bind: {
				    	    			store: '{planStatus}'
				    	    		},
				    	    		value : '',
				   					displayField: 'name',
				   					valueField: 'code'
				                }, {
		                            xtype: 'datefield',
		                            reference: 'ctlEtaFromDt',
			                        width: 250,
		                            fieldLabel: me.lblETA,
		                            format: MOST.config.Locale.getShortDate(),
		        					listeners: {
		        						change: 'onDateChange'
		        					},
		        					editable: false
		                        },
		                        {
		                            xtype: 'datefield',
		                            reference: 'ctlEtaToDt',
		    	                    width: 150,
		                            margin: '5 0 0 5',
		                            fieldLabel: '',
		                            format: MOST.config.Locale.getShortDate(),
		                            listeners: {
		        						change: 'onDateChange'
		        					},
		        					editable: false
		                        }, {
				                	xtype: 'combo',
				                	reference:'ctlStatusCombo',
									queryMode: 'local',
				   					bind: {
				    	    			store: '{vesselStatusCombo}'
				    	    		},
				   					displayField: 'scdNm',
				   					valueField: 'scd',
				   					value : '',
				                    fieldLabel: me.lblMPTSStatus
                                }
			                ]
			            },
			            {
			                xtype: 'container',
			                layout: {
			                    type: 'hbox',
			                    align: 'stretch'
			                },
		                    defaults: {
		                        labelAlign: 'right',
		                        margin: '5 5 0 0',
		                        editable: false
		                    },
			                items: [
			                	{
				                	xtype: 'combo',
				                	reference: 'ctlVesselTypeCombo',
									queryMode: 'local',
				   					bind: {
				    	    			store: '{vesselTypeCombo}'
				    	    		},
				   					displayField: 'scdNm',
				   					valueField: 'scd',
				   					value : '',
				                    fieldLabel: me.lblVesselType
				                }, {
		           					xtype:'vesselcalllistfield',
		           					labelWidth:100,
		           					width:287,
		           					fieldLabel:me.lblJpvc,
		           					reference:'ctlVesselCallId',
		           					emptyText:me.lblJpvc
		           				},{
				                	xtype: 'combo',
				                	reference: 'ctlCargoTypeCombo',
									queryMode: 'local',
				   					bind: {
				    	    			store: '{cargoTypeCombo}'
				    	    		},
				   					displayField: 'scdNm',
				   					valueField: 'scd',
				   					value : '',
				   					margin: '5 0 0 118',
				                    fieldLabel: me.lblCargoType
				                }
			                ]
			            }
	            ]
	        },{
				xtype: 'grid',
				reference: 'refBerthApprovallistGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateareBerthApprovallistGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{berthApprovalList}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					celldblclick: 'onDblClick'
				},
				viewConfig: {
					stripeRows: true,
					enableTextSelection: true,
					getRowClass: function(rec, index) {
						var vslBackcolor;
						if(rec.get('vslColor')) {
							if(rec.get('vslColor') === 'R') {
								vslBackcolor = 'berth-approval-status-r';
							}else if(rec.get('vslColor') === 'B') {
								vslBackcolor = 'berth-approval-status-b';
							}else if(rec.get('vslColor') === 'G') {
								vslBackcolor = 'berth-approval-status-g';
							}
						}            
						return vslBackcolor;
					}
				},				
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [{
						header: me.lblVesselName,
						dataIndex: 'vslNm',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblJPVC,
						dataIndex: 'vslCallId',
						filter: 'string',
						width: 150
					},
					{
						header: me.lblVesselType,
						dataIndex: 'vslTpNm',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblCargoType,
						dataIndex: 'cargoTp',
						filter: 'string',
						width: 150
					},
					{
						header: me.lblBerthPlan,
						xtype: 'actioncolumn',
						dataIndex: 'berthPlanYn',
						filter: 'string',
						width: 100,
						items: [{
							getClass: function (value, meta, record) {
								return record.data.berthPlanYn === 'Y' ? 'x-fa fa-check txt_red' : '';
							}
						}]	
					},
					{
						header: me.lblETA,
						dataIndex: 'eta',
						width: 150				
					},
					{
						header: me.lblConfirm,
						dataIndex: 'sumitDt',
						xtype: 'datecolumn',
						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
						width: 150,
						exportRenderer: function(value, record, dataIndex, cell, column){
							return Ext.util.Format.date(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
						}
					},
					{
						header: me.lblNovaStatus,
						dataIndex: 'summitStatName',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblMPTSStatus,
						dataIndex: 'mptsStatNm',
						filter: 'string',
						width: 150
					},
					{
						header: me.lblBerthApprovalUser,
						dataIndex: 'berthAprvUserId',
						filter: 'string',
						width: 160
					},
					{
						header: me.lblMPTSStatusTime,
						dataIndex: 'mptsStatDt',
						filter: 'string',
						width: 160
					},
					{
						header: me.lblStatus,
						dataIndex: 'status',
						filter: 'string',
						width: 160
					},
					{
						header: me.lblBerthLoc,
						dataIndex: 'berthLoc',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblBalance,
						dataIndex: 'balance',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblFile,
						xtype: 'actioncolumn',
						dataIndex: 'fileYn',
						filter: 'string',
						width: 100,
						items: [{
							getClass: function (value, meta, record) {
								return record.data.fileYn === 'Y' ? 'x-fa fa-check txt_red' : '';
							}
						}]
					},
					{
						header: me.lblAdviseDate,
						dataIndex: 'insDtm',
						xtype: 'datecolumn',
						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
						width: 160,
						exportRenderer: function(value, record, dataIndex, cell, column){
							return Ext.util.Format.date(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
						}
					},
					{
						header: me.lblConsignee,
						dataIndex: 'consignee',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblConsignor,
						dataIndex: 'consignor',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblLOA,
						dataIndex: 'loa',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblDL,
						dataIndex: 'operationType',
						filter: 'string',
						width: 180
					},
					{
						header: me.lblMT,
						dataIndex: 'mt',
						filter: 'string',
						width: 100
					},
					{
						header: me.lblAgency,
						dataIndex: 'arrvSaId',
						filter: 'string',
						width: 100
					}]
				}
		    }],
		    dockedItems: [{
	    	    xtype: 'container',
				layout: {
					type : 'hbox',
					align:'left'
				},
	    	    defaults: {
	    	        margin: '1 1 1 1'
	    	    },
	    	    items: [
	    	    {
	    	        xtype: 'button',
	    	        text: me.btnRetrieve,
	    	        itemId:'inquiryItemId',
	    	        iconCls: 'x-fa fa-search',
	    	        cls: 'search-button', 
	    	        reference:'refBtnRetrieve',
	    	        listeners: {
	    	            click: 'onSearchBtn'
	    	        }
	    	    
	    	    },{
	    	        xtype: 'button',
	    	        text: me.btnRefresh,
	    	        iconCls: 'x-fa fa-refresh',
	    	        reference:'refBtnRefresh',
	    	        listeners: {
	    	            click: 'onRefresh'
	    	        },
	    	    
	    	    },{
	    	        xtype: 'button',
	    	        itemId:'downloadItemId',
	    	        text: me.btnExportToExcel,
	    	        cls: 'excel-button',
	    	        reference:'refBtnDownload',
	    	        iconCls: 'excel-button-image',
	    	        listeners:{
	    	            click: {
                            fn: 'onExportExcel',
                            args:['refBerthApprovallistGrid']
                        }
	    	           }
	    	    },{
    				xtype :'container',
    				layout:{
    					type : 'hbox',
    					pack : 'end'
    				},
    				flex : 1,
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
	    	}
        ]
			
		});
		
		me.callParent();
	}
});

