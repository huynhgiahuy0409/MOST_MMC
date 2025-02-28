Ext.define('MOST.view.planning.NonManifestedCargoOfGc', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-nonmanifestedcargoofgc',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	closeFunction :'Y',

	controller: 'nonmanifestedcargoofgc',
	viewModel: {
		type: 'nonmanifestedcargoofgc'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	 /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refNonManifestedCargoOfGcGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'nonManifestedCargoOfGc',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},	

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
               {
                	xtype: 'fieldset',
    				margin : '0 5 5 0',
    				items:[{
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right'
                                },
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                	{
                                        xtype: 'combobox',
                                        margin: '2 0 0 0',
                                        fieldLabel: ViewUtil.getLabel('originalCgNo'),
                                        reference:'refOriginalCgNo',
                                        bind: {
                        	    			store: '{orgBlItems}',
                        	    			value: '{theDetail.orgCgNo}'
                        	    		},
                       					displayField: 'cdNm',
                       					valueField: 'cd',
                       					queryMode: 'local',
                       					emptyText: "Select",
                       					forceSelection : true,
                       					editable : false,
                       					hidden:true
                                    },
                                    {
                                        xtype: 'textfield',
                                        reference :'refTxtOriginalCgNo',
                                        margin: '2 0 0 0',
                                        editable : false,
                                        fieldLabel: ViewUtil.getLabel('originalCgNo'),
                                        bind: '{theDetail.orgCgNo}',
                                   },
                                   {
                                       xtype: 'container',
                                       defaults: {
                                            labelAlign: 'right'
                                        },
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                        	{
	                                            xtype: 'textfield',
	                                            editable : false,
	                                            reference :'refMt',
	                                            margin: '2 0 0 0',
	                                            fieldLabel: ViewUtil.getLabel('mtm3qty'),
	                                            bind: '{theDetail.nonManifestedMt}',
	                                       },{
												xtype: 'textfield',
												editable : false,
												reference :'refM3',
												margin: '2 0 0 0',
												bind: '{theDetail.nonManifestedM3}',
	                                       },{
												xtype: 'textfield',
												editable : false,
												reference :'refQty',
												margin: '2 0 0 0',
												bind: '{theDetail.nonManifestedQty}',
	                                       }
	                                   ]
                                   },
                                   {
                                       xtype: 'container',
                                       defaults: {
                                            labelAlign: 'right'
                                       },
                                       layout: {
                                    	   type: 'hbox',
                                    	   align: 'stretch'
                                       },
                                       items: [
                                    	   {
												xtype: 'textfield',
												reference :'refLocation',
												margin: '2 0 0 0',
												editable : false,
												fieldLabel: ViewUtil.getLabel('location'),
												bind: '{theDetail.nonManifestedLocId}',
                                    	   },{
												xtype: 'button',
												width : 150,
												margin: '2 0 0 10',
												text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
												listeners: {
													click: {
														fn : 'onWarehouseAllocation',
														args : ['refLocation']
													}
												}
                                    	    }
                                	   	]
									},
									{
										xtype: 'combobox',
										margin: '35 55 0 55',
										fieldLabel: ViewUtil.getLabel('LABLNo'),
										reference:'refSearchBlno',
										bind: {
											store: '{orgBlItems}',
											value: '{theDetail.linkageBlNo}'
										},
	                       	    		listeners:{
	                       	    			select : 'onSelectBLSNNo',
	                       	    		},
                      					displayField: 'cdNm',
                      					valueField: 'cd',
                      					queryMode: 'local',
                      					emptyText: "Select",
                      					forceSelection : true,
                      					editable : false
                                   },
                                   {
                                        xtype: 'combobox',
                                        margin: '2 0 0 0',
                                        fieldLabel: ViewUtil.getLabel('subBlNo'),
                                        reference:'refDtlSubBlNo',
                                        bind: {
                        	    			store: '{blItems}',
                        	    			value: '{theDetail.linkageBlNo}'
                        	    		},
                        	    		listeners:{
                        	    			select : 'onSelectBLSNNo',
                        	    		},
                       					displayField: 'cdNm',
                       					valueField: 'cd',
                       					queryMode: 'local',
                       					emptyText: "Select",
                       					forceSelection : true,
                       					editable : false,
                       					hidden:true
                                    },
                                    {
                                        xtype: 'combobox',
                                        margin: '2 0 0 0',
                                        fieldLabel: ViewUtil.getLabel('loadingShipgNoteNo'),
                                        reference:'refDtlSnNo',
                                        bind: {
                        	    			store: '{snItems}',
                        	    			value: '{theDetail.linkageSnNo}'
                        	    		},
                        	    		listeners:{
                        	    			select : 'onSelectSnNo',
                        	    		},
                       					displayField: 'cdNm',
                       					valueField: 'cd',
                       					queryMode: 'local',
                       					emptyText: "Select",
                       					forceSelection : true,
                       					editable : false,
                       					disabled: true,
                       					hidden:true
                                    },
                                    {
                                        xtype: 'combobox',
                                        margin: '2 0 0 0',
                                        fieldLabel: ViewUtil.getLabel('grNo'),
                                        reference:'refDtlGrNo',
                                        bind: {
                        	    			store: '{grItems}',
                        	    			value: '{theDetail.linkageGrNo}'
                        	    		},
                       					displayField: 'cdNm',
                       					valueField: 'cd',
                       					queryMode: 'local',
                       					emptyText: "Select",
                       					forceSelection : true,
                       					editable : false,
                       					disabled: true,
                       					hidden:true
                                    } 
                                ]
                            },
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    labelWidth: 150
                                },
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                	{
                                        xtype: 'textfield',
                                        reference :'refCategory',
                                        margin: '2 0 0 0',
                                        bind: '{theDetail.catgNm}',
                                        editable: false,
                                        fieldLabel: ViewUtil.getLabel('category'),
                                	},{
										xtype: 'textfield',
										reference :'refCargoType',
										margin: '2 0 0 0',
										bind: '{theDetail.cgTpNm}',
										editable: false,
										fieldLabel: ViewUtil.getLabel('cargoType'),
                                	},{
										xtype: 'textfield',
										reference :'refMasterBlBookkingNo',
										margin: '2 0 0 0',
										bind: '{theDetail.linkageMblBookingNo}',
										editable: false,
										fieldLabel: ViewUtil.getLabel('masterBlBookkingNo'),
										hidden:true
                                	},{
										xtype: 'textfield',
										reference :'refDeliveryMode',
										margin: '2 0 0 0',
										bind: '{theDetail.delvTpNm}',
										editable: false,
										fieldLabel: ViewUtil.getLabel('deliveryMode'),
                                	},
	                                {
	                                    xtype: 'container',
	                                    defaults: {
	                                    	labelAlign: 'right'
	                                    },
										layout: {
										    type: 'hbox',
										    align: 'stretch'
										},
										items: [
											{
											    xtype: 'textfield',
												editable : false,
												reference :'refBLMt',
												margin: '2 0 0 50',
												fieldLabel: ViewUtil.getLabel('mtm3qty'),
												bind: '{theDetail.wgt}',
											},
											{
												xtype: 'textfield',
												editable : false,
												reference :'refBLM3',
												margin: '2 0 0 0',
												bind: '{theDetail.m3}',
											},
											{
												xtype: 'textfield',
												editable : false,
												reference :'refBLQty',
												margin: '2 0 0 0',
												bind: '{theDetail.pkgQty}',
											}
										]
	                                },
	                                {
	                                    xtype: 'container',
	                                    defaults: {
											labelAlign: 'right',
											labelWidth: 150
	                                    },
	                                    layout: {
											type: 'hbox',
											align: 'stretch'
	                                    },
	                                    items: [
	                                    	{
												xtype: 'textfield',
												reference :'refCommodity',
												margin: '2 0 0 0',
												width: 280,
												editable: false,
												fieldLabel: ViewUtil.getLabel('commodity'),
												bind: '{theDetail.cmdtCd}',
		                                    },{
		                                        xtype: 'textfield',
		                                        reference :'refCommodityNm',
		                                        margin: '2 0 0 0',
		                                        width: 300,
		                                        editable: false,
		                                        bind: '{theDetail.cmdtNm}',
		                                    }
		                                ]
	                                },{
	                                    xtype: 'container',
	                                    defaults: {
											labelAlign: 'right',
											labelWidth: 150
	                                    },
										layout: {
										    type: 'hbox',
										    align: 'stretch'
										},
										items: [
											{
												xtype: 'textfield',
												reference :'refSha',
												margin: '2 0 0 0',
												width: 280,
												editable: false,
												fieldLabel: ViewUtil.getLabel('shippingAgent'),
												bind: '{theDetail.shaCd}',
		                                    },{
		                                        xtype: 'textfield',
		                                        reference :'refShaNm',
		                                        margin: '2 0 0 0',
		                                        width: 300,
		                                        editable: false,
		                                        bind: '{theDetail.shaNm}',
		                                    }
		                                ]
	                                },{
	                                    xtype: 'container',
	                                    defaults: {
	                                    	labelAlign: 'right',
											labelWidth: 150
										},
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										items: [
											{
												xtype: 'textfield',
												reference :'refFwd',
												margin: '2 0 0 0',
												width: 280,
												editable: false,
												fieldLabel: ViewUtil.getLabel('forwardingAgent'),
												bind: '{theDetail.fwdCd}',
											},{
		                                        xtype: 'textfield',
		                                        reference :'refFwdNm',
		                                        margin: '2 0 0 0',
		                                        width: 300,
		                                        editable: false,
		                                        bind: '{theDetail.fwdNm}',
											}
										]
	                                },{
	                                    xtype: 'container',
	                                    defaults: {
	                                    	labelAlign: 'right',
	                                    	labelWidth: 150
	                                    },
	                                    layout: {
											type: 'hbox',
											align: 'stretch'
	                                    },
	                                    items: [
	                                    	{
	                                    		xtype: 'textfield',
	                                    		reference :'refCns',
	                                    		width: 280,
	                                    		margin: '2 0 0 0',
	                                    		editable: false,
	                                    		fieldLabel: ViewUtil.getLabel('shipperConsignee'),
	                                    		bind: '{theDetail.cnsCd}',
	                                    	},{
		                                        xtype: 'textfield',
		                                        reference :'refCnsNm',
		                                        margin: '2 0 0 0',
		                                        width: 300,
		                                        editable: false,
		                                        bind: '{theDetail.cnsNm}',
	                                    	}
	                                    ]
	                                },{
										xtype: 'textfield',
										margin: '2 0 0 0',
										reference: 'refDtlMarkNos',
										enforceMaxLength: true,
										maxLength : 100,
										bind: '{theDetail.markNos}',
										fieldLabel: ViewUtil.getLabel('marksAndNos'),
										editable: false
									},{
										xtype: 'textareafield',
										margin: '2 0 0 0',
										reference: 'refDtlRemark',
										enforceMaxLength: true,
										maxLength : 100,
										bind: '{theDetail.remark}',
										fieldLabel: ViewUtil.getLabel('remark'),
									},{
                                    	xtype: 'container',
                                        defaults: {
                                        	labelAlign: 'right',
                                        },
                                        layout: {
                                        	type: 'hbox',
                                        	align: 'stretch'
                                        },
                                        items: [{
                                        	xtype: 'button',
                                        	text: ViewUtil.getLabel('clear'),
                                        	reference: 'refsClearBtn',
                                        	margin :'10 2 0 350',
                                        	iconCls: 'fa fa-refresh',
                                        	listeners: {
                                        		click: 'onDetailClear'
                                        	}
                                        },{
                        					xtype: 'button',
                        					text: ViewUtil.getLabel('update'),
                        					reference: 'refsUpdateBtn',
                        					ui: 'update-button',
                        					margin :'10 2 0 5',
                        					iconCls: 'fa fa-pencil-square-o',
                        					listeners: {
                        						click: 'onUpdate'
                        					}
                        				},{
                        					xtype: 'button',
                        					itemId: 'deleteButton',
                        					text: ViewUtil.getLabel('remove'),
                        					reference: 'refsRemoveBtn',
                        					margin :'10 2 0 5',
                        					ui: 'delete-button',
                        					iconCls: 'x-fa fa-minus',
                        					listeners: {
                        						click: 'onRemove'
                        					}
                        				}]  
									}
                                ]
                            }
                        ]
    				}]
                },
                {
                    xtype: 'container',
                    flex: 1.4,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {//Grid
							xtype: 'tsb-datagrid',
							reference: me.MAIN_GRID_REF_NAME,
							flex: 1,
							stateful : true,
							stateId : 'stateNonManifestedCargoOfGcGrid',
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
							bind: {
								store: '{' + me.MAIN_STORE_NAME + '}'
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							listeners : {
								cellClick: 'onCellClick',
								pagingSearch:'onSearch'
							},
							columns: {
								defaults: {
									style : 'text-align:center',
									align: 'center'
								},
								items: GridUtil.getGridColumns('NonManifestedCargoOfGc')
							}

                        }
                    ]
                }
            ],
			
			dockedItems: [{//Docked Button
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
					xtype: 'tbfill'
				},
				{
 					xtype: 'button',
 					itemId:'inquiryItemId',
 					reference:'refBtnRetrieve',
 					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
 					listeners: {
 						click: 'onSearch'
 					}
				},{
 					xtype: 'button',
 					reference:'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},
				{
					xtype: 'button',
					reference:'refBtnRefresh',
					text:  ViewUtil.getLabel('refresh'),
					iconCls: 'x-fa fa-refresh',
					listeners: {
						click: 'onRefresh'
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('preview'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, false]
						}
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button', 
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, true]
						}
					}
				},
				{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
				}]
			},
			{// Search Condition:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items:[{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '0 5 0 0'
						},
						items:[
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth:140,
								margin: '0 5 0 0'
							},
							items:[{
			   					xtype:'vesselcalllistfield',
			   					width:330,
			   					fieldLabel:ViewUtil.getLabel('vslschCallId'),
			   					reference:'ctlJpvc',
			   					emptyText:ViewUtil.getLabel('vslschCallId'),
			   					change: function(field, newValue){
						        	   field.setValue(newValue.toUpperCase());
						        },
								bind:{value: '{theSearch.vslCallId}'}
							},{
								xtype: 'combobox',
								reference:'ctlSubBlNoCombo',
								fieldLabel: ViewUtil.getLabel('subBlNo'),
								emptyText: "Select",
								width:270,
								bind: {
									store: '{blItems}',
									value: '{theSearch.blNo}'
								},
								displayField: 'cdNm',
								valueField: 'cd',
								queryMode: 'local',
								forceSelection : true,
								editable : false,
								hidden: true
							},
			   				{
			   					reference: 'ctlSnCombo',
			   					xtype: 'combo',
			   					width:270,
			   					fieldLabel: ViewUtil.getLabel('sn'),
			   					queryMode: 'local',
			   					bind: {
			    	    			store: '{snItems}',
									value: '{theSearch.snNo}'
			    	    		},
			    	    		emptyText:'Select',
			   					displayField: 'cdNm',
			   					valueField: 'cd',
			   					value : '',
			   					editable: false,
			   					hidden:true
			   				}]
						}]
		    		}]
				}]
			}]
		});
		
		me.callParent();
	}
});