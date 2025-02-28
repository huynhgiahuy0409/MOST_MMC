Ext.define('MOST.view.monitoring.AssignedTruck', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-assignedlorrylist',
	requires: [],
	
	controller: 'assignedtruck',
	
	viewModel: {
		type: 'assignedtruck'
	},
	
	detailViewAlias: 'app-unitnodetailforroro',
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refAssignedLorryListGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'assignedTruck',			// Main Store Name
	MAIN_STORE_PIVOT : 'pivotList',			 			// Main Pivot Store Name
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
		            xtype: 'tabpanel',
		            reference:'refAssignedTruckList',
		        	height: 310,
		        	minHeight: 310,
		            deferredRender:false,
		            margin : '0 5 5 0',
		            activeTab: 0,
		            flex : 1,
		            items: [{
		            	xtype: 'tsb-datagrid',
						reference: me.MAIN_GRID_REF_NAME,
						flex : 1,
						stateful : true,
						title: 'List',
						stateId : 'stateAssignedTruckGrid',
						plugins: [
							'gridexporter',
							'gridfilters',
							'clipboard'
						],
						bind: {
							store: '{' + me.MAIN_STORE_NAME + '}'
						},
						listeners: {
							rowdblclick: 'onDblClick',
							pagingSearch: 'onSearch'
						},
						selModel: {
							type: 'spreadsheet',
							cellSelect: false
						},
						columns: {
							defaults: {
								style : 'text-align:center',
								align : 'center'
							},
							items: GridUtil.getGridColumns('AssignedLorryList'),
						}
		            },{
		            	xtype: 'app-assignedtruckpivot',
	                    reference: 'refassignedtruckpivot',
	                    title: 'Pivot'
		            }
		          ]
				}],
			
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
	                items: [
	                	{
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
		                },
		                {
							xtype: 'button',
							itemId: 'exportToPdfButton',
							reference:'refBtnPreview',
							text: ViewUtil.getLabel('preview'),
							iconCls: 'x-fa fa-file-pdf-o',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onPreview',
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
		            	}
					]
				},
				
				{//Search Condition and VP infor:
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'searchfieldset',
							margin: '0 5 0 0',
							padding: '0 10 10 10',
							flex: 1,
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								layout: {
				                    type: 'vbox',  
									align: 'stretch'
				                },
				                defaults: {
				                    labelAlign: 'right',
				                    labelWidth: 100,
									margin: '0 0 5 0'
				                }
							},
							items:[
								{
				                    xtype: 'container',
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
											xtype : 'vesselcalllistfield',
											reference : 'ctlVslCallId',
											fieldLabel : ViewUtil.getLabel('vslcallid'),
											bind : {
												value : '{theSearch.vslCallId}'
											}
										},
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('masterBLNo'),
											reference:'ctlMasterBlno',
											bind: {
												store: '{masterBlCombo}',
												value: '{theSearch.mfDocId}'
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											queryMode: 'local',
											emptyText: "Select",
											forceSelection : true,
											editable: true,
											listeners : {
												select: 'onSelectMasterBl'
											}
										},
										{
											xtype: 'combo',
											reference: 'ctlCgTp',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('cargoTp'),
											queryMode: 'local',
											bind: {
												store: '{cargoTpCombo}',
												value: '{theSearch.cargoTp}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											editable: true,
											emptyText: "Select",
											listeners : {
												select: 'onSelectCargoTpCombo'
											}
										}
				                    ]
								},
								{
				                    xtype: 'container',
				                    items: [
				                    	{
											xtype: 'textfield',
											reference: 'refVesselName',
											fieldLabel: ViewUtil.getLabel('vesselname'),
											bind : {
												value : '{theSearch.vslNm}'
											}
										},
				                    	{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('LABLNo'),
											reference:'ctlBlno',
											bind: {
												store: '{BLNoList}',
												value: '{theSearch.blNo}'
											},
											displayField: 'blNo',
											valueField: 'blNo',
											queryMode: 'local',
											emptyText: "select",
											forceSelection : true,
											listeners : {
												select: 'onSelectSnBlCombo'
											}
										}
				                    ]
								},
								{
				                    xtype: 'container',
				                    items: [
				                    	{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('LASNNo'),
											reference:'ctlSNNo',
											bind: {
												store: '{SNNoList}',
												value: '{theSearch.shipgNoteNo}'
											},
											displayField: 'shipgNoteNo',
											valueField: 'shipgNoteNo',
											queryMode: 'local',
											emptyText: "select",
											forceSelection : true,
											listeners : {
												select: 'onSelectSnBlCombo'
											}
										},
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('location'),
											reference:'ctlLodcation',
											bind: {
												store: '{locationList}',
												value: '{theSearch.whLoc}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local',
											emptyText: "select",
											forceSelection : true,
											editable : false
										}
				                    ]
								},
								{
				                    xtype: 'container', 
				                    items: [
				                    	{
											xtype: 'checkboxfield',
											margin: '0 0 0 50',
											boxLabel: ViewUtil.getLabel('noGateIO'),
											value: 'false',
											reference: 'ctlNoGateIO',
											bind: {
												value: '{theSearch.noGate}'
											}
										},
				                    ]
								}
							]
						}
					]
				},
				{//Search Condition: Gate/Transport information
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 5 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'fieldset',
							margin: '0 5 0 0',
							padding: '0 10 10 10',
							flex: 1,
							autoScroll: true,
							collapsible:true,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items:[
								{// Left: Search Condition
									xtype: 'searchfieldset',
									margin: '0 5 0 0',
									padding: '10 10 10 10',
									flex: 3,
									defaults: {
						                layout: {
						                    type: 'vbox',
						                    
						                },
						                defaults: {
						                    margin: '0 5 5 5',
						                    labelAlign: 'right',
						                    flex: 1,
						                    labelWidth: 100
						                }
						            },
						            layout: {
						                type: 'hbox'
						            },
						            items: [
						            	{
						                    xtype: 'container',
						                    items: [
						                    	{
						    						xtype: 'radiogroup',
						    						reference: 'rdSearchType',
						    						columns: 1,
						    						vertical: true,
						    						bind:{
						    							value: '{theSearch.searchType}'
						    						},
													defaults: {
														margin: '0 5 0 5',
													},
						    						items:[
						    							// {
						                    			// 	boxLabel: ViewUtil.getLabel('expArrivalDt'),
						                    			// 	name: 'rqSearchType',
						                    			// 	flex: 1,
						                    			// 	inputValue: 'EA',
						                    			// 	checked: true,
						                    			// 	bind:{
						            					// 		value: '{theSearch.searchType}'
						            					// 	}
						                    			// },{
						                    			// 	boxLabel: ViewUtil.getLabel('securityIn'),
						                    			// 	name: 'rqSearchType',
						                    			// 	flex: 1,
						                    			// 	inputValue: 'SI',
						                    			// 	bind:{
						            					// 		value: '{theSearch.searchType}'
						            					// 	}
						                    			// },
														{
						                    				boxLabel: ViewUtil.getLabel('gateIn'),
						                    				name: 'rqSearchType',
						                    				flex: 1,
						                    				inputValue: 'GI',
						                    				bind:{
						            							value: '{theSearch.searchType}'
						            						}
						                    			},{
						                    				boxLabel: ViewUtil.getLabel('gateOut'),
						                    				name: 'rqSearchType',
						                    				flex: 1,
						                    				inputValue: 'GO',
						                    				bind:{
						            							value: '{theSearch.searchType}'
						            						}
						                    			}
						    						]
						    					}
						                    ]
										},
						            ]
								},
								{// Right: Search Condition
									xtype: 'searchfieldset',
									margin: '0 0 0 5',
									padding: '10 10 10 10',
									flex: 7,
									defaults: {
						                layout: {
						                    type: 'vbox', 
						                },
										flex: 1,
						                defaults: {
						                    labelAlign: 'right',
						                    labelWidth: 100,
											width: '100%',
											margin: '0 0 5 0'
						                }
						            },
						            layout: {
						                type: 'hbox',
										align: 'stretch'
						            },
						            items: [
						            	{
						                    xtype: 'container',
						                    items: [
						                    	{
													reference : 'ctlFromDt',
													xtype : 'datetimefield',
													allowBlank: true,
													fieldLabel : ViewUtil.getLabel('fromToDate'),
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													bind: {
														value: '{theSearch.aplyYmd}'
													},
												},
												{
													xtype: 'partnercdfield',
													reference: 'ctlTsptrOrigin',
													fieldLabel: ViewUtil.getLabel('tsptrOrigin'),
													params: {
														searchDivCd : 'TRK' // SHA, CTT, MSC, VDPR, SHA, FWD, STV, TRK, CNS, TRM
													},
													listeners: {
														change: function() {
															var me = this;
															me.setValue(this.getValue().toUpperCase());
														}
													},
													bind:{
														value: '{theSearch.ptnrCd}'
													}
												},
												{
													xtype : 'textfield',
													reference : 'ctlLorryNo',
													fieldLabel : ViewUtil.getLabel('lorryNo'),
													listeners : {
														change : function() {
															var me = this;
															me.setValue(this.getValue().toUpperCase());
														}
													},
													bind: {
														value: '{theSearch.LORRYNO}'
													}
												},
												{
													xtype : 'textfield',
													reference : 'ctlUnitNo',
													margin: '0 0 0 0',
													fieldLabel : ViewUtil.getLabel('unitNo'),
													listeners : {
														change : function() {
															var me = this;
															me.setValue(this.getValue().toUpperCase());
														}
													},
													bind: {
														value: '{theSearch.unitNo}'
													},
													maxLength: 30,
													enforceMaxLength: true
												}
						                    ]
										},
										{
						                    xtype: 'container',
						                    items: [
						                    	{
													xtype: 'datetimefield',
													reference : 'ctlToDt',
													fieldLabel : ViewUtil.getLabel('to'),
													allowBlank: true,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													bind:{
														value: '{theSearch.exprYmd}'
													},
												},
												{
													xtype : 'textfield',
													reference : 'ctlLADriverNm',
													fieldLabel : ViewUtil.getLabel('LADriverNm'),
													listeners : {
														change : function() {
															var me = this;
															me.setValue(this.getValue().toUpperCase());
														}
													},
													bind: {
														value: '{theSearch.DRIVER}'
													}
													
												},
												{
													xtype : 'textfield',
													reference : 'ctlLicenceNo',
													fieldLabel : ViewUtil.getLabel('licenceNo'),
													listeners : {
														change : function() {
															var me = this;
															me.setValue(this.getValue().toUpperCase());
														}
													},
													bind: {
														value: '{theSearch.LICSNO}'
													}
												}
						                    ]
										},
										{
											xtype: 'container',
											flex: 1
										}
						            ]
								}
							]
						}, 
					]
				},
			]
		});
		
		me.callParent();
	}
});

