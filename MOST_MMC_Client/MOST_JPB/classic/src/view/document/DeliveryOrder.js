Ext.define('MOST.view.document.DeliveryOrder', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-listofdeliveryorder',
	requires: [
		'MOST.view.document.DeliveryOrderController',
		'MOST.view.document.DeliveryOrderModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-deliveryorderdetail',
	
	controller: 'deliveryorder',
	
	viewModel: {
		type: 'deliveryorder'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refListOfDeliveryOrderGrid',
	 MAIN_STORE_NAME: 'listOfDeliveryOrder',

	 SUB_DO_GRID_REF_NAME: 'refListOfSubDeliveryOrderGrid',
	 SUB_DO_STORE_NAME: 'listOfSubDeliveryOrder',
	 DELIVERY_MODE_STORE: 'delvModeCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('doInfo'),
					flex: 1,
					padding: '0 10 10 10',
					margin: '0 5 0 0',
					layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
					items:[
						{
							xtype: 'tsb-datagrid',
							reference: me.MAIN_GRID_REF_NAME,
							flex : 1,
							stateful : true,
							stateId : 'stateListOfDeliveryOrderGrid',
							viewConfig: {
					            stripeRows: true,
					            enableTextSelection: true,
					        },
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
				    		],
				    		bind: {
				    			store: '{' + me.MAIN_STORE_NAME + '}'
				    		},
							listeners: {
								cellClick: 'onSubDOLoad',
								cellDblClick: 'onDblClick',
				    			pagingSearch: 'onSearch'
							},
							columns: {
				            	defaults: {
				            		style : 'text-align:center',
				            		align : 'center'
				            	},
				            	items: GridUtil.getGridColumns('DeliveryOrder')
							}
					    }
					]
				},{
					xtype: 'fieldset',
					hidden: true,
					title: ViewUtil.getLabel('subDoInfo'),
					flex: 1,
					margin: '0 5 0 0',
					padding: '0 10 0 10',
					layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
					items:[
						{
							xtype: 'tsb-datagrid',
							reference: me.SUB_DO_GRID_REF_NAME, 
							flex : 1,
							stateful : true,
							stateId : 'stateListOfDeliveryOrderGrid',
							viewConfig: {
					            stripeRows: true,
					            enableTextSelection: true,
					        },
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
				    		],
				    		bind: {
				    			store: '{' + me.SUB_DO_STORE_NAME + '}'
				    		},
							listeners:{
								cellDblClick: 'onSubDODblClick'
							},
							columns: {
				            	defaults: {
				            		style : 'text-align:center',
				            		align : 'center'
				            	},
				            	items: GridUtil.getGridColumns('SubDeliveryOrder')
							}
						}
					]
				},
				{
					xtype : 'container',
					heigh: 20,
					margin: '5 5 5 0',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					items: [
						{
							xtype: 'button',
							text: ViewUtil.getLabel('truckAssignment'),
							cls: 'search-button', 
							reference:'refBtnAssignment',
							listeners: {
								click: 'openTruckAssignment'
							}
						}
					]
				}
			],
	    
			dockedItems: [
				{
					xtype : 'container',
					style: { "background-color":"white" },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items:[
						{
							xtype: 'tbfill'
						},{
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
							itemId:'createItemId',
							reference:'refBtnCreate',
							text:  ViewUtil.getLabel('add'),
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
						},{
							xtype: 'button',
							itemId: 'deleteItemId',
							reference:'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
							}
						},{
							xtype: 'button',
							itemId: 'previewItemId',
							reference:'refBtnPreview',
							text: ViewUtil.getLabel('preview'),
							cls: 'preview-button',
							iconCls: 'fa fa-file-pdf-o',
							listeners: {
								click: 'onDetailPreview'
							}
						},{
							xtype: 'button',
							itemId: 'downloadItemId',
							reference:'refBtnDownload',
							text: ViewUtil.getLabel('download'),
							cls: 'downloadpdf-button',
							iconCls: 'fa fa-file-excel-o',
							listeners: {
								click: 'onDetailDownload'
							},
							hidden: true
						},{
							xtype: 'button',
							itemId: 'exportToExcelButton',
							text: ViewUtil.getLabel('exportToExcel'),
							iconCls: 'excel-button-image', 
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args:[me.SUB_DO_GRID_REF_NAME, true]
								}
							}
						},{
							xtype: 'button',
							itemId: 'exportToPdfButton',
							text: ViewUtil.getLabel('exportToPdf'),
							iconCls: 'x-fa fa-file-pdf-o',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args:[me.SUB_DO_GRID_REF_NAME, false]
								}
							}
						},{
							xtype: 'button',
							cls: 'column-setting-button',
							iconCls: 'x-fa fa-columns',
							text: ViewUtil.getLabel('column'),
							listeners: {
								click: 'onColumnSettingPopup',
								args: [me.MAIN_GRID_REF_NAME]
							}
		            	}
					]
				},{
					xtype: 'toolbar',
					enableOverflow: true,
					margin : '0 -3 0 0',
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype:'searchfieldset',
							autoScroll: true,
							collapsible:true,
							layout:{
								type:'hbox',
								align:'stretch'
							},
							flex: 3,
							padding: '0 10 10 10', 
							items:[
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('search'),
									flex: 1,
									margin: '0 5 0 0',
									padding: '0 10 10 10', 
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 90
									},
									items:[
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 90, 
											},
											flex: 1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'shipcallnofield',
													reference: 'ctlScn',
													//emptyText: ViewUtil.getLabel('shipCallNo'),
													fieldLabel: ViewUtil.getLabel('shipCallNo'),
													bind: {
														value: '{theSearch.scn}',
													},
													
												},
												{
													xtype: 'vesselcalllistfield',
													fieldLabel: ViewUtil.getLabel('vessel'),
													margin: '5 0 0 0',
													reference: 'ctlVessel',
													bind: {
														value: '{theSearch.vslCallId}'
													}
												}, {
													xtype: 'combobox',
													reference: 'ctlMasterBlNo',
													margin: '5 0 0 0',
													fieldLabel: ViewUtil.getLabel('masterBLNo'),
													bind: {
														store: '{masterBlCombo}',
														value: '{theSearch.mfdocid}'
													},
													listeners: {
														select: 'onSelectMasterBlCombo'
													},
													displayField: 'scdNm',
													valueField: 'mfDocId',
													emptyText: 'Select',
													queryMode: 'local',
													forceSelection: true,
													anyMatch: true
												}, {
													xtype: 'combobox',
													margin: '5 0 0 0',
													fieldLabel: ViewUtil.getLabel('blno'),
													reference: 'ctlBlNo',
													bind: {
														store: '{blNoList}',
														value: '{theSearch.blno}'
													},
													displayField: 'blNo',
													valueField: 'blNo',
													queryMode: 'local',
													listeners: {
														select: 'onSelectBlCombo'
													},
													anyMatch: true
												}, {
													xtype: 'combobox',
													margin: '5 0 0 0',
													fieldLabel: ViewUtil.getLabel('subDoNo'),
													reference: 'ctlSubDoNo',
													bind: {
														store: '{subDoNoList}',
														value: '{theSearch.sdono}'
													},
													displayField: 'sDoNo',
													valueField: 'sDoNo',
													queryMode: 'local',
													anyMatch: true,
													hidden: true
												}
											]
										}
					                ]
								},{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('vslInfo'),
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									flex: 3,
									padding: '0 10 10 10', 
									margin: '0 0 0 5',
									items:[
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 90
											},
											flex:1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'textfield',
													bind: '{theSearch.vslCd}',
													fieldLabel: ViewUtil.getLabel('vesselCode'),
													readOnly : true
												},{
													xtype: 'textfield',
													margin: '-5 0 0 0',
													fieldLabel: ViewUtil.getLabel('vesselName'),
													bind: '{theSearch.vslNm}',
													readOnly : true
												},{
													xtype: 'textfield',
													margin: '5 0 0 0',
													fieldLabel: ViewUtil.getLabel('voyage'),
													bind: '{theSearch.voyage}',
													readOnly : true
												}
											]
										},{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 90
											},
											flex:1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'textfield', 
													bind: '{theSearch.arrvSaId}',
													fieldLabel: ViewUtil.getLabel('SNLASA'),
													readOnly : true
												},{
													xtype: 'datefield',
													margin: '-5 0 0 0',
													fieldLabel: ViewUtil.getLabel('eta'),
													bind: '{theSearch.eta}',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly : true
												},{
													xtype: 'datefield',
													fieldLabel: ViewUtil.getLabel('etd'),
													margin: '5 0 0 0',
													bind: '{theSearch.etd}',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly : true
												}
											]
										},{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 90,
											},
											flex:1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('berthingLoc'),
													bind: '{theSearch.berthLoc}',
													readOnly : true
												}
											]
										}
									]
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

