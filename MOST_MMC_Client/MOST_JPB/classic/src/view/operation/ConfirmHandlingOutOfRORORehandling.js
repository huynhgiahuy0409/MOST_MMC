Ext.define('MOST.view.operation.ConfirmHandlingOutOfRORORehandling', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-rehandlinghandlingoutofroro',
	
	requires: [
		'MOST.view.operation.ConfirmHandlingOutOfRORORehandlingModel',
		'MOST.view.operation.ConfirmHandlingOutOfRORORehandlingController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'rehandlinghandlingoutofroro',
	
	viewModel: {
		type: 'rehandlinghandlingoutofroro'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'cargoItems',            // Main Store Name
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
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				//flex: 0.5,
				height: 150,
				//usePagingToolbar : false,
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
					cellclick: 'onCargoGrid_ItemClick',
					pagingSearch:'onSearch'
				},
				columns: {
					defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('HandlingOutOfRORORehandlingCargoItems')
				}
			},
			{
				xtype : 'container',
				style: { "background-color":"white" },
				flex: 1,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				items : [
					{
						xtype: 'fieldset',
						flex: 0.6,
				    	title: ViewUtil.getLabel('unitList'),
				    	margin: '5 20 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
				    	items: [
				    		{
								xtype: 'tsb-datagrid',
								reference: 'refStackedUnitGrid',
								flex: 1,
								usePagingToolbar : false,
								plugins: [
									'gridexporter',
									'gridfilters',
									'clipboard'
								],
								bind: {
									store: '{stackedUnitItems}'
								},
								selModel: {
									type: 'spreadsheet',
									cellSelect: false
								},
								listeners : {
									cellclick: 'onStackedUnitGrid_ItemClick',
								},
								columns: {
									defaults: {
					            		style : 'text-align:center',
					            		align: 'center'
					            	},
					            	items: GridUtil.getGridColumns('HandlingOutOfRORORehandlingUnitItems')
								}
							}
				    	]
					},
					{
						xtype: 'container',
						flex: 1,
				    	//margin: '5 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
				    	items: [
				    		{
						    	xtype: 'fieldset',
						    	flex: 1,
						    	title: ViewUtil.getLabel('handlingOutSummary'),
						    	autoScroll: true,
						    	margin: '5 20 0 0',
					    		layout: {
					    			type: 'vbox',
					    			//align: 'stretch'
					    		},
					    		items: [
					    			{
										xtype: 'container',
										layout: {
								    		type: 'hbox',
								            align: 'stretch'
							    		},
							    		defaults:{
							    			width: 250,
							    			labelAlign: 'right',
					                        labelWidth: 100,
					                        margin: '0 0 5 5'
							    		},
								    	items: [
								    		{
						                        xtype: 'textfield',
						                        flex: 1,
						                        reference: 'txtUnitNo',
						                        fieldLabel: ViewUtil.getLabel('unitNo'),
						                        bind: {
													value: '{unitItem.unitNo}'
					            	    		},
						                        editable: false
						                    }
								    	]
					    			},
					    			{
										xtype: 'container',
										layout: {
								    		type: 'hbox',
								            align: 'stretch'
							    		},
							    		defaults:{
							    			width: 505,
							    			labelAlign: 'right',
					                        labelWidth: 100,
					                        margin: '0 0 5 5'
							    		},
								    	items: [
                                            {
												xtype: 'radiogroup',
												layout: 'hbox',
												reference: 'ctlTypeOfTransport',
												items: [
												    {
														xtype: 'radiofield',
														width: 95,
														boxLabel: ViewUtil.getLabel('driverId'),
														reference: 'refRadioDriver',
														name: 'tspt_radio',
														margin: '0 5 0 0',
														inputValue: 'DV',
														checked: true,
														listeners: {
															change: 'onChangeDriverTruck'
														}
													},
													{
														xtype : 'combo',
														//flex: 1,
														margin: '0 5 0 0',
														width: 145,
														//fieldLabel : ViewUtil.getLabel('delvMode'),
														reference : 'ctlDriverCombo',
														emptyText : ViewUtil.getLabel('driverId'),
														bind: {
															store: '{driverCombo}',
															//value: '{unitItem.driverId}'
														},
														displayField: 'cdNm',
														valueField: 'cd',
														queryMode: 'local',
														value : '',
														editable: false,
														listeners: {
															change: 'onDriverCombo_changeHandler'
														}
													},


													{
														xtype: 'radiofield',
														width: 95,
														boxLabel: ViewUtil.getLabel('truckNo'),
														reference: 'refRadioTruck',
														name: 'tspt_radio',
														margin: '0 5 0 5',
														inputValue: 'LR',
														checked: false,
														listeners: {
															change: 'onChangeDriverTruck'
														}
													},

													{
														xtype : 'combo',
														//flex: 1,
														margin: '0 5 0 0',
														width: 145,
														//fieldLabel : ViewUtil.getLabel('delvMode'),
														reference : 'ctlTruckCombo',
														emptyText : ViewUtil.getLabel('truckNo'),
														bind: {
															store: '{truckCombo}',
															//value: '{unitItem.truckNo}'
														},
														displayField: 'cdNm',
														valueField: 'cd',
														queryMode: 'local',
														value : '',
														editable: false
													},

												]
                                            }
								    	]
					    			},
					    			{
										xtype: 'container',
										layout: {
								    		type: 'hbox',
								            align: 'stretch'
							    		},
							    		defaults:{
							    			width: 250,
							    			labelAlign: 'right',
					                        labelWidth: 100,
					                        margin: '0 0 5 5'
							    		},
								    	items: [
								    		{
						                        xtype: 'textfield',
						                        flex: 1,
						                        reference: 'txtDriverName1',
						                        fieldLabel: ViewUtil.getLabel('driverNm'),
						                        bind: {
													//value: '{unitItem.driverNm}'
					            	    		},
						                        editable: false
						                    },
						                    {
												xtype : 'combo',
												flex: 1,
												fieldLabel : ViewUtil.getLabel('driverId'),
												reference : 'ctlDriverWithTruckCombo',
												emptyText : ViewUtil.getLabel('driverId'),
												bind: {
													store: '{driverWithTruckCombo}',
													//value: '{unitItem.driverId}'
												},
												displayField: 'cdNm',
												valueField: 'cd',
												queryMode: 'local',
												value : '',
												editable: false,
												listeners: {
													change: 'onDriverWithTruckCombo_changeHandler'
												}
											},
								    	]
					    			},
					    			{
										xtype: 'container',
										layout: {
								    		type: 'hbox',
								            align: 'stretch'
							    		},
							    		defaults:{
							    			width: 250,
							    			labelAlign: 'right',
					                        labelWidth: 100,
					                        margin: '0 0 5 5'
							    		},
								    	items: [
								    		{
						                        xtype: 'textfield',
						                        flex: 1,
						                        reference: 'txtLicenseNo1',
						                        fieldLabel: ViewUtil.getLabel('driverlicenseNo'),
						                        bind: {
													//value: '{unitItem.driverNm}'
					            	    		},
						                        editable: false
						                    },
                                            {
						                        xtype: 'textfield',
						                        flex: 1,
						                        reference: 'txtDriverName2',
						                        fieldLabel: ViewUtil.getLabel('driverNm'),
						                        bind: {
													//value: '{unitItem.driverNm}'
					            	    		},
						                        editable: false
						                    },
								    	]
					    			},
					    			{
										xtype: 'container',
										layout: {
								    		type: 'hbox',
								            align: 'stretch'
							    		},
							    		defaults:{
							    			width: 250,
							    			labelAlign: 'right',
					                        labelWidth: 100,
					                        margin: '0 0 5 5'
							    		},
								    	items: [
                                            {
						                        xtype: 'textfield',
						                        flex: 1,
						                        reference: 'txtHandlingOutRmk',
						                        fieldLabel: ViewUtil.getLabel('remark'),
						                        bind: {
													value: '{unitItem.hoRemarks}'
					            	    		},
						                        editable: true
						                    },

                                            {
						                        xtype: 'textfield',
						                        flex: 1,
						                        reference: 'txtLicenseNo2',
						                        fieldLabel: ViewUtil.getLabel('driverlicenseNo'),
						                        bind: {
													//value: '{unitItem.driverNm}'
					            	    		},
						                        editable: false
						                    },
								    	]
					    			},
			                    ]
				    		},
				    		
				    		{
								xtype: 'container',
								heigh: 20,
								layout: {
						    		type: 'hbox',
						            pack: 'end'
					    		},
					    		defaults:{
			                        margin: '5 1 5 1'
					    		},
						    	items: [
						    		{
										xtype: 'button',
										reference: 'refBtnClear',
										margin: '5 1 5 1',
										//flex: 1,
										text: ViewUtil.getLabel('clear'),
										listeners: {
											click:'onClear_clickHandler'
										}
									},
									{
										xtype: 'button',
										reference:'refBtnCreate',
										margin: '5 1 5 1',
										text: ViewUtil.getLabel('add'),
										cls: 'search-button',
										iconCls: 'x-fa fa-plus',
										listeners: {
											click:'onAdd_clickHandler'
										}              
									},
									{
										xtype: 'button',
										reference:'refBtnUpdate',
										margin: '5 1 5 1',
										text: ViewUtil.getLabel('update'),
										//cls: 'search-button',
										//iconCls: 'x-fa fa-plus',
										listeners: {
											click:'onUpdate_clickHandler'
										}              
									},
									{
										xtype: 'button',
										reference:'refBtnDelete',
										margin: '5 1 5 1',
										text: ViewUtil.getLabel('remove'),
										ui: 'delete-button',
										iconCls: 'x-fa fa-minus',
										listeners: {
											click:'onRemove_clickHandler'
										}
									}
						    	]
				    		},
				    		
				    		{
								xtype: 'tsb-datagrid',
								reference: 'refHandlingOutUnitGrid',
								flex: 1,
								usePagingToolbar : false,
								plugins: [
									'gridexporter',
									'gridfilters',
									'clipboard'
								],
								bind: {
									store: '{handlingOutUnitItems}'
								},
								selModel: {
									type: 'spreadsheet',
									cellSelect: false
								},
								listeners : {
									cellclick: 'onHandlingOutUnit_ItemClick',
								},
								columns: {
									defaults: {
					            		style : 'text-align:center',
					            		align: 'center'
					            	},
					            	items: GridUtil.getGridColumns('HandlingOutOfRORORehandlingItems')
								}
							}
				    	]
					}
				]
			}
			
			],
			
			dockedItems:[{
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
                },{
 					xtype: 'button',
 					text: ViewUtil.getLabel('search'),
 					itemId:'inquiryItemId',
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
 					reference:'refBtnRetrieve',
 					listeners: {
 						click: 'onSearch'
 					}
                 },{
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
				
				},{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, false]
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
            	
				}]			
				},
				{//Search Condition and Vessel information:
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[{
						xtype: 'searchfieldset',
						autoScroll: true,
						collapsible:true,
						margin: '5 5 5 5',
						flex:1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults:{
							margin: '0 0 5 0'
						},
						items:[{// Left: Search Condition
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('search'),
							layout: {
								type: 'vbox'
							},
							defaults: {
                                width : 250,
                                labelAlign : 'right',
								labelWidth : 80,
								margin : '0 0 5 5',
							},
							items: [
							{
								xtype : 'vesselcalllistfield',
								reference : 'ctlVslCallId',
								fieldLabel : ViewUtil.getLabel('vslcallid'),
								emptyText : ViewUtil.getLabel('vslcallid'),
								bind : {
									value : '{theSearch.vslCallId}'
								}
							},
							{
								xtype : 'combo',
								fieldLabel : ViewUtil.getLabel('SNLSNNo'),
								reference : 'ctlSearchSnNo',
								emptyText : ViewUtil.getLabel('SNLSNNo'),
								bind: {
	            	    			store: '{snCombo}',
									value: '{theSearch.shipgNoteNo}'
	            	    		},
	            	    		displayField: 'cdNm',
	           					valueField: 'cd',
	           					queryMode: 'local',
	           					value : '',
	           					editable: false
							},
							{
								xtype:'textfield',
								reference:'ctlSearchUnitNo',
								fieldLabel: ViewUtil.getLabel('unitNo'),
								fieldStyle: 'text-transform:uppercase',
								listeners:{
									change: 'onUpperCase'
								},
								bind: {
									value: '{theSearch.unitNo}'
								}
							   }
							]
						},
						{//Right: VesselInfo:
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('vslInfo'),
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							flex: 1,
							margin: '0 0 5 5',
							items: [
							{
								xtype : 'container',
								defaults : {
									margin : '5 5 0 0',
									labelAlign : 'right',
									width : 230,
									labelWidth : 80
								},
								layout : {
									type : 'vbox'
								},
								items : [
								{
									xtype : 'textfield',
									margin : '0 5 0 0',
									fieldLabel : ViewUtil.getLabel('vesselCode'),
									bind : '{theVslInfo.vslCd}',
									readOnly : true
								},
								{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('vesselType'),
									bind : '{theVslInfo.vslTp}',
									readOnly : true
								},
								{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('voyage'),
									bind : '{theVslInfo.voyage}',
									readOnly : true
								},
								{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('SNLDSA'),
									bind : '{theVslInfo.depSaId}',
									readOnly : true
								}]
							},
							{
								xtype : 'container',
								defaults : {
									margin : '0 5 5 0',
									labelAlign : 'right',
									width : 180,
									labelWidth : 40
								},
								layout : {
									type : 'vbox'
								},
								items : [
								{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('SNLASA'),
									bind : '{theVslInfo.arrvSaId}',
									readOnly : true
								},
								{
									xtype : 'datefield',
									fieldLabel : ViewUtil.getLabel('SNLETA'),
									bind : '{theVslInfo.eta}',
									readOnly : true,
									format : MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
								},
								{
									xtype : 'datefield',
									fieldLabel : ViewUtil.getLabel('etd'),
									bind : '{theVslInfo.etd}',
									readOnly : true,
									format : MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
								}]
							},
							{
								xtype : 'container',
								defaults : {
									margin : '0 5 5 0',
									labelAlign : 'right',
									width : 230,
									labelWidth : 100
								},
								layout : {
									type : 'vbox'
								},
								items : [
								{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('berthingLoc'),
									bind : '{theVslInfo.berthLoc}',
									readOnly : true
								},
								{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('storageLoc'),
									readOnly : true
								}]
							}]
						}]
					}]
				}]
		});
		
		me.callParent();
	}
});