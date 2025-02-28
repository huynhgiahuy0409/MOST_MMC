Ext.define('MOST.view.operation.CargoManualCtlForRORO', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargomanualctlroro',
	requires: [
		'MOST.view.operation.CargoManualCtlForROROModel',
		'MOST.view.operation.CargoManualCtlForROROController',
		'MOST.view.operation.cargomanualctl.CargoManualCtlROROTabImport',
		'MOST.view.operation.cargomanualctl.CargoManualCtlROROTabImport'
	],

	controller: 'cargomanualctlforroro',
	
	viewModel: {
		type: 'cargomanualctlforroro'
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
		            xtype: 'tabpanel',
		            flex: 1,
		            listeners:{
		            	tabchange:'onTabChange'
		            },
		            activeTab: 0,
		            margin: '0 5 5 0',
		            reference:'ctlCargoManualCtlROROTabPanel',
		            items: [
						/*
		                {
		                    xtype: 'container',
		                    title: ViewUtil.getLabel('general'),
		                    name:'general',
		                    scrollable: 'both',
		                    layout: { type: 'vbox', align: 'stretch'},
   						items : [
	    						{
	    							xtype: 'app-cargomanualctltabgeneral',
	    				    		reference: 'refCargoManualCtlTabGeneral',
	    				    		flex: 1
	    						}
   						]
		                },
						*/
		                {
		                    xtype: 'container',
		                    title: ViewUtil.getLabel('export'),
		                    name:'export',
		                    scrollable: 'both',
		                    layout: { type: 'vbox', align: 'stretch'},
    						items : [
    							{
	    							xtype: 'app-cargomanualctlrorotabexport',
	    				    		reference: 'refCargoManualCtlROROTabExport',
	    				    		flex: 1
	    						}
    						]
		                },
		                {
		                    xtype: 'container',
		                    title: ViewUtil.getLabel('import'),
		                    name:'import',
		                    scrollable: 'both',
		                    layout: { type: 'vbox', align: 'stretch'},
    						items : [
    							{
	    							xtype: 'app-cargomanualctlrorotabimport',
	    				    		reference: 'refCargoManualCtlROROTabImport',
	    				    		flex: 1
	    						}
    						]
		                },
		                {
		                    xtype: 'container',
		                    hidden: true,
		                    title: ViewUtil.getLabel('gatePass'),
		                    name:'gatePass',
		                    scrollable: 'both',
		                    layout: { type: 'vbox', align: 'stretch'},
    						items : [
    							{
	    							xtype: 'app-cargomanualctltabgatepass',
	    				    		reference: 'refCargoManualCtlTabGatePass',
	    				    		flex: 1
	    						}
    						]
		                }
		            ]
		        }
			],
		    
		    dockedItems: [
		    {//Toolbar Button:
				xtype: 'toolbar',
				margin: '0 0 0 0',
				padding: '0 0 0 0',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right',
					labelWidth: 60
            	},
				items: [
				{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
						align:'left'
					},
					margin: '0 0 0 0', 
					defaults: {
						margin: '1 1 1 0'
					},
					items: [{
                		xtype: 'button',
                		itemId: 'inquiryItemId',
                		text: ViewUtil.getLabel('search'),
						iconCls: 'x-fa fa-search',
						cls: 'search-button', 
                		listeners: {
                			click: 'onSearch'
                		}
					}]
				},'-',
                {
                    xtype: 'button',
                    disabled: true,
                    reference:"ctlLoadingButton",
                    text: ViewUtil.getLabel('loadingCtl'),
                    iconCls: 'x-fa fa-level-up',
					listeners: {
						click: 'onLoading'
					}		                    
                },
                {
                    xtype: 'button',
                    disabled: true,
                    reference:"ctlDischargingButton",
                    text: ViewUtil.getLabel('dischargingCtl'),
                    iconCls: 'x-fa fa-level-down',
					listeners: {
						click: 'onDischarging'
					}
                },
                {
                    xtype: 'button',
                    disabled: false,
                    reference:"ctlWHCheckExportButton",
                    text: ViewUtil.getLabel('warehouseCheckExportCtl'),
                    iconCls: 'x-fa fa-level-up',
					listeners: {
						click: 'onWHCheckExport'
					},
					hidden: true		                    
                },
                {
                    xtype: 'button',
                    disabled: false,
                    reference:"ctlWhCheckImportButton",
                    text: ViewUtil.getLabel('warehouseCheckImportCtl'),
                    iconCls: 'x-fa fa-level-down',
					listeners: {
						click: 'onWhCheckImport'
					},
					hidden: true
                },
                {
                    xtype: 'button',
                    disabled: true,
                    reference:"ctlHandlingInButton",
                    text: ViewUtil.getLabel('handlingIn'),
                    iconCls: 'x-fa fa-sign-in',
					listeners: {
						click: 'onHandlingIn'
					}
                },
                {
                    xtype: 'button',
                    disabled: true,
                    reference:"ctlHandlingOutButton",
                    text: ViewUtil.getLabel('handlingOut'),
                    iconCls: 'x-fa fa-sign-out',
					listeners: {
						click: 'onHandlingOut'
					}
                },
                {
                    xtype: 'button',
                    disabled: true,
                    reference:"ctlMovementButton",
                    text: ViewUtil.getLabel('movement'),
                    iconCls: 'x-fa fa-retweet',
					listeners: {
						click: 'onMovement'
					}
                },{
                    xtype: 'button',
                    disabled: true,
                    reference:"ctlNonManifestedButton",
                    text: ViewUtil.getLabel('nonManifested'),
					listeners: {
						click: 'onWhCheckImport'
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
			{//Toolbar Search Condition:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				margin: '0 0 5 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					padding: '0 10 10 10',
					margin: '0 5 0 0',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 10',
						labelAlign: 'right',
						labelWidth: 90,
					},
					items:[
						{ // 1st
							xtype: 'container',
							flex: 1,
							layout: 'hbox',
							enableOverflow: true,
							defaults: {
								labelAlign: 'right',
								labelWidth: 70,
								margin: '0 5 0 0'
							},
							items: [
								{
									xtype: 'container',
									width: 100
								},
								{
									xtype: 'vesselcalllistfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('vslcallid'),
									emptyText: ViewUtil.getLabel('vslcallid'),
									reference: 'ctlCargoManualCtlJpvcfield',
									allowBlank: true,
									bind: {
										value: '{theVsl.vslCallId}'
									}
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 70,
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											reference: 'ctlVesselName',
											fieldLabel: ViewUtil.getLabel('vesselname'),
											fieldStyle: 'text-transform:uppercase',
										},
										{
											xtype: 'button',
											margin: '0 0 0 5',
											reference: 'ctlCargoManualCtlJpvcInfoButton',
											enableToggle: true,
											pressed: false,
											iconCls: 'ticon-vessel-sail txt_blue',
											handler: 'onJpvcInfoToggle'
										},
									]
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 65,
									},
									items: [
										{//Truck No
											xtype: 'textfield',
											flex: 1,
											reference: 'txtTruckNo',
											disabled: false,
											fieldLabel: ViewUtil.getLabel('lorryNo'),
											bind: {
												value: '{theSearch.lorryNo}'
											},
											listeners: {
												change: 'onChangeTruckNo'
											},
											triggers: {
												someField: {
													cls: 'fa-search',
													scope: 'controller',
													handler: 'onOpenTruckPopup'
												}
											},
										},
										{
											xtype: 'radiofield',
											margin: '0 0 0 5',
											reference: 'refSelectedTruck',
											boxLabel: ViewUtil.getLabel('lorryNo'),
											name: 'truckDriverRadio',
											inputValue: 'cmcTruckVal',
											width: 100,
											checked: true,
											listeners: {
												change: 'onRadioEditableChange'
											}
										},
									]
								},
								{
									xtype: 'combo',
									width: 150,
									fieldLabel: ViewUtil.getLabel('hatchNo'),
									queryMode: 'local',
									bind: {
										store: '{hatchNoCombo}',
										value: '{theSearch.hatchNo}',
									},
									listeners: {
										change: 'onChangeSearchCondition'
									},
									displayField: 'cdNm',
									valueField: 'cd',
									reference: 'refCboHatchNo',
									emptyText: ViewUtil.getLabel('gridemptytextAll'),
									allowBlank: false,
									forceSelection: true,
									hidden: true
								},
								{
									xtype: 'container',
									margin: '0 0 0 5',
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 70,
									},
									items: [
										
										{
											xype: 'button',
											hidden: true,
											width: 26,
											height: 26,
											text: 'Reset Windows',
											iconCls: 'x-fa fa-windows',
											tooltip: 'Reset State of Window',
											menu: [
												{
													text: 'Reset All',
													handler: 'onResetWindowsState',
													iconCls: 'x-fa fa-list',
													value: 'all'
												},
												{
													text: ViewUtil.getLabel('loadingCtl'),
													handler: 'onResetWindowsState',
													iconCls: 'x-fa fa-pencil',
													value: 'app-confirmloadingpopup'
												},
												{
													text: ViewUtil.getLabel('dischargingCtl'),
													handler: 'onResetWindowsState',
													iconCls: 'x-fa fa-sign-out',
													value: 'app-confirmdischargingpopup'
												},
												{
													text: ViewUtil.getLabel('handlingIn'),
													handler: 'onResetWindowsState',
													iconCls: 'x-fa fa-level-up',
													value: 'app-confirmhandlinginpopup'
												},
												{
													text: ViewUtil.getLabel('handlingOut'),
													handler: 'onResetWindowsState',
													iconCls: 'x-fa fa-level-down',
													value: 'app-confirmhandlingoutpopup'
												},
												{
													text: ViewUtil.getLabel('movement'),
													handler: 'onResetWindowsState',
													iconCls: 'x-fa fa-retweet',
													value: 'app-confirmmovementpopup'
												}
											]
										}
									]
								}, 
							]
						},
						{
							// 2rd
							xtype: 'container',
							flex: 1,
							layout: 'hbox',
							reference: 'ctlJpvcToolbar',
							hidden: true,
							overflowHandler: 'menu',
							enableOverflow: true,
							defaults: {
								labelAlign: 'right', 
								margin: '0 5 0 0'
							},
							items: [
								{
									xtype: 'container',
									padding: '0 10 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch',
										pack: 'end'
									},
									width: 100,
									items: [
										{
											xtype: 'button',
											iconCls: 'x-fa fa-close',
											tooltip: 'Close Palette',
											handler: 'onCloseForJpvcInfo'
										},
									]
								},
								{
									xtype: 'textfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('berthLoc'),
									labelWidth: 70,
									editable: false,
									bind: '{theVsl.berthLoc}'
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'datefield',
											flex: 1,
											labelAlign: 'right',
											fieldLabel: ViewUtil.getLabel('etaEtd'),
											labelWidth: 70,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											bind: '{theVsl.eta}',
											readOnly: true
										},
										{
											xtype: 'datefield',
											flex: 0.65,
											margin: '0 0 0 5',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											bind: '{theVsl.etd}',
											readOnly: true
										}
									]
								},
								{
									xtype: 'container',
									flex: 1
								},
								{
									xtype: 'container',
									flex: 1
								}
							]
						},
						{
							// 3nd
							xtype: 'container',
							flex: 1,
							margin: '0 0 0 0',
							layout: {
								type: 'hbox',
								// align: 'stretch'
							},
							enableOverflow: true,
							defaults: {
								labelAlign: 'right',
								labelWidth: 60,
								margin: '0 5 0 0'
							},
							items: [
								{
									xtype: 'segmentedbutton',
									width: 100,
									reference: 'refCargoManualROROSearchMode',
									vertical: false,
									defaults: {
										listeners: {
											click: 'onSearchModeClick'
										},
										padding: '3 3 3 3',
									},
									items: [{
										tooltip: ViewUtil.getLabel('sn'),
										text: ViewUtil.getLabel('sn'),
										value: 'SN',
										pressed: true
									}, {
										tooltip: ViewUtil.getLabel('bl'),
										text: ViewUtil.getLabel('bl'),
										value: 'BL'
									}]
								},
								{
									xtype: 'container',
									reference: 'ctlSnContainer',
									overflowHandler: 'menu',
									enableOverflow: true,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									flex: 2,
									margin: '0 0 0 10', 
									defaults: {
										labelAlign: 'right',
										labelWidth: 70, 
										flex: 1, 
									},
									items: [
										{//Booking Number
											xtype: 'combobox',
											reference: 'ctlCargoManualCtlBookingNo',
											fieldLabel: ViewUtil.getLabel('cmc_bookingno'),
											padding: '0 6 0 0',
											queryMode: 'local',
											bind: {
												store: '{cargoManualCtlForBookingNoCombo}',
												value: '{theSearch.bookingNo}'
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											emptyText: 'ALL',
											forceSelection: true,
											editable: false,
											listeners: {
												change: 'onMasterBLBookingNoChange'
											}
										},
										{
											xtype: 'combobox',
											labelWidth: 70, 
											reference: 'ctlCargoManualCtlSn',
											fieldLabel: ViewUtil.getLabel('sn'),
											padding: '0 2 0 0',
											queryMode: 'local',
											bind: {
												store: '{cargoManualCtlForSnCombo}',
												value: '{theSearch.shipgNoteNo}'
											},
											displayField: 'scdNm',
											valueField: 'shipgNoteNo',
											emptyText: 'ALL',
											forceSelection: true,
											editable: false,
											listeners: {
												change: 'onSnBlComboChange'
											}
										},
										{
											xtype: 'container',
											hidden: true,
											flex: 1,
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelAlign: 'right'
											},
											items: [
												{
													xtype: 'textfield',
													margin: '0 5 0 0',
													flex: 1,
													reference: 'ctlCargoManualCtlGr',
													fieldLabel: ViewUtil.getLabel('gr'),
													fieldStyle: 'text-transform:uppercase',
													listeners: {
														change: 'onUpperCase'
													},
													bind: {
														value: '{theSearch.cgNo}'
													},
												},
												{
													xtype: 'button',
													reference: 'ctlCargoManualCtlGrButton',
													text: ViewUtil.getLabel('go'),
													iconCls: 'x-fa fa-pencil',
													listeners: {
														click: 'onGr'
													}
												},
											]
										},
									]
								},
								{
									xtype: 'container',
									flex: 2,
									margin: '0 0 0 10',
									reference: 'ctlBlContainer',
									overflowHandler: 'menu',
									enableOverflow: true,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 70, 
										width: '50%'
									},
									items: [
										//Master BL :
										{
											xtype: 'combobox',
											flex: 1,
											padding: '0 6 0 0',
											reference: 'ctlCargoManualCtlMasterBL',
											fieldLabel: ViewUtil.getLabel('cmc_masterbl'),
											queryMode: 'local',
											bind: {
												store: '{cargoManualCtlForMasterBlCombo}',
												value: '{theSearch.masterBL}'
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											emptyText: 'ALL',
											forceSelection: true,
											listeners: {
												change: 'onMasterBLBookingNoChange'
											}
										},
										{
											xtype: 'combobox',
											flex: 1,
											padding: '0 2 0 0',
											reference: 'ctlCargoManualCtlBl',
											fieldLabel: ViewUtil.getLabel('bl'),
											queryMode: 'local',
											bind: {
												store: '{cargoManualCtlForBlCombo}',
												value: '{theSearch.blNo}'
											},
											displayField: 'scdNm',
											valueField: 'blNo',
											emptyText: 'ALL',
											forceSelection: true,
											listeners: {
												change: 'onSnBlComboChange'
											}
										},
										{
											xtype: 'container',
											hidden: true,
											flex: 1,
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelAlign: 'right'
											},
											items: [
												{
													xtype: 'textfield',
													
													reference: 'ctlCargoManualCtlGp',
													margin: '0 5 0 0',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('gp'),
													fieldStyle: 'text-transform:uppercase',
													listeners: {
														change: 'onUpperCaseGP'
													}
												},
												{
													xtype: 'button',
													reference: 'ctlCargoManualCtlGpButton',
													text: ViewUtil.getLabel('go'),
													iconCls: 'x-fa fa-pencil',
													listeners: {
														click: 'onGp'
													}
												}
											]
										},
									]
								}, 
								{
									xtype: 'container',
									flex: 1,
									margin: '0 1 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 70,
									},
									items: [
										{//Driver
											xtype: 'textfield',
											flex: 1,
											disabled: true,
											reference: 'txtDriverId',
											fieldLabel: ViewUtil.getLabel('driver'),
											labelWidth: 68,
											bind: {
												value: '{theSearch.driverId}'
											},
											listeners: {
												change: 'onChangeDriverId'
											},
											triggers: {
												someField: {
													cls: 'fa-search',
													scope: 'controller',
													handler: 'onOpenDriverPopup'
												}
											},
										},
										{
											xtype: 'radiofield',
											margin: '0 0 0 5',
											boxLabel: ViewUtil.getLabel('driverId'),
											reference: 'refSelectedDriver',
											name: 'truckDriverRadio',
											inputValue: 'cmcDriverVal',
											width: 100,
											listeners: {
												change: 'onRadioEditableChange'
											}
										}
									]
								}, 
								
								{
									xtype: 'container',
									flex: 1
								}
							]
						},
					//4th
					{
						xtype: 'container',
						margin: '5 0 0 10',
						flex: 1,
						layout: 'hbox',
						enableOverflow: true,
						defaults: {
							labelAlign: 'right',
							labelWidth: 70,
							margin: '0 5 0 0'
		            	},
		            	items: [
		            		{
								xtype: 'container',
								width:100
		            		},
							{
	                    		xtype: 'textfield',
	                    		reference: 'ctlUserRefNo',
	                    		flex: 1,
	                    		fieldLabel: ViewUtil.getLabel('userRefNo'),
	                    		fieldStyle: 'text-transform:uppercase',
	                    		listeners:{
	                    			change: 'onUpperCase'
	                    		},
	                    		bind: {
	                    			value: '{theSearch.userRefNo}'
	                    		},
	                    	},
	                    	{
	                    		xtype: 'textfield',
	                    		reference: 'ctlPkgNo',
	                    		flex: 1,
	                    		fieldLabel: ViewUtil.getLabel('packageNo'),
	                    		fieldStyle: 'text-transform:uppercase',
	                    		listeners:{
	                    			change: 'onUpperCase'
	                    		},
	                    		bind: {
	                    			value: '{theSearch.pkgNo}'
	                    		},
	                    	},
	                    	{
								xtype: 'checkboxfield',
								flex: 1,
								hidden: true,
								reference: 'ctlBargeOperationChk',
								boxLabel: ViewUtil.getLabel('bargeOperation'),
								bind: {
	                    			value: '{theSearch.bargeCheckYn}'
	                    		},
								listeners: {
									change: 'onBargeOperationChk'
								}
							},
							{
								xtype: 'container',
								flex: 1
							},
							{
								xtype: 'container',
								flex: 1
							}, 
						]
					},]
				}]
			}]
		});
		
		me.callParent();
	}
});

