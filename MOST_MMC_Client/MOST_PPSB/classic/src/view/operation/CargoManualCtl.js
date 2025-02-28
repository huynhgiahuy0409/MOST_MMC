Ext.define('MOST.view.operation.CargoManualCtl', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargomanualctl',
	requires: [
		'MOST.view.operation.CargoManualCtlModel',
		'MOST.view.operation.CargoManualCtlController',
		'MOST.view.operation.cargomanualctl.CargoManualCtlTabGeneral',
		'MOST.view.operation.cargomanualctl.CargoManualCtlTabExport',
		'MOST.view.operation.cargomanualctl.CargoManualCtlTabImport',
		'MOST.view.operation.cargomanualctl.CargoManualCtlTabGatePass'
	],

	controller: 'cargomanualctl',
	
	viewModel: {
		type: 'cargomanualctl'
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
		            reference:'ctlCargoManualCtlTabPanel',
		            items: [
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
		                {
		                    xtype: 'container',
		                    title: ViewUtil.getLabel('export'),
		                    name:'export',
		                    scrollable: 'both',
		                    layout: { type: 'vbox', align: 'stretch'},
    						items : [
    							{
	    							xtype: 'app-cargomanualctltabexport',
	    				    		reference: 'refCargoManualCtlTabExport',
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
	    							xtype: 'app-cargomanualctltabimport',
	    				    		reference: 'refCargoManualCtlTabImport',
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
				margin: ' 0 0 0',
				padding: '0 0 0 0',
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
					marging: '0 0 0 0',
					defaults: {
						margin: '1 1 1 1'
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
				padding : '0 0 0 0',
				margin: '0 0 5 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'searchfieldset',
					padding: '0 5 10 10',
					margin: '0 5 0 0',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 10',
						labelAlign: 'right',
					},
					items: [
						{
                    		xtype: 'fieldset',
                            layout: {
                                type: 'vbox',
								align: 'stretch'
                            },
                            margin: '0 5 0 0',
                            padding : '10 10 10 10',
							flex: 1,
							defaults: {
								labelWidth: 70,
								labelAlignL: 'right',
								margin: '5 0 0 0'
							},
                            items: [
                            	{
									xtype: 'shipcallnofield',
									reference: 'ctlScn',
									emptyText: ViewUtil.getLabel('shipCallNo'),
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theSearch.scn}',
									},
									margin: '0 0 0 0'
								},
								{
									xtype: 'vesselcalllistfield',
									fieldLabel: ViewUtil.getLabel('vslcallid'),
									emptyText: ViewUtil.getLabel('vslcallid'),
									reference: 'ctlCargoManualCtlJpvcfield',
									allowBlank: true,
									bind: {
										value: '{theVsl.vslCallId}'
									}
								},
								{
									xtype: 'textfield',
									reference: 'ctlVesselName',
									fieldLabel: ViewUtil.getLabel('vesselname'),
									fieldStyle: 'text-transform:uppercase',
								},
                            ]
						},
						{
                    		xtype: 'fieldset',
    		    			reference: 'refShippingNote',
                            layout: {
                                type: 'vbox',
								align: 'stretch'
                            },
                            margin: '0 5 0 0',
                            padding : '10 10 10 10',
							flex: 1,
							defaults: {
								margin: '5 0 0 0',
								labelWidth: 70,
								labelAlign: 'right'
							},
                            items: [
                            	{
									xtype: 'combobox',
									margin: '0 0 0 0',
									reference: 'ctlCargoManualCtlBookingNo',
									fieldLabel: ViewUtil.getLabel('cmc_bookingno'),
									queryMode: 'local',
									bind: {
										store: '{cargoManualCtlForBookingNoCombo}',
										value: '{theSearch.bookingNo}'
									},
									displayField: 'scdNm',
									valueField: 'mfDocId',
									emptyText: 'ALL',
									forceSelection: true,
									editable: true,
									anyMatch: true,
									listeners: {
										select: 'onMasterBLBookingNoChange'
									}
								},
								{
									xtype: 'combobox',
									reference: 'ctlCargoManualCtlSn',
									fieldLabel: ViewUtil.getLabel('sn'),
									queryMode: 'local',
									bind: {
										store: '{cargoManualCtlForSnCombo}',
										value: '{theSearch.shipgNoteNo}'
									},
									displayField: 'scdNm',
									valueField: 'shipgNoteNo',
									emptyText: 'ALL',
									forceSelection: true,
									editable: true,
									anyMatch: true,
									listeners: {
										select: 'onSnBlComboChange'
									}
								},
								{
									xtype: 'textfield',
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
                            ]
						},
						{
                    		xtype: 'fieldset',
    		    			reference: 'refBL',
    		    			hidden: true,
                            layout: {
                                type: 'vbox',
								align: 'stretch'
                            },
                            margin: '0 5 0 0',
                            padding : '10 10 10 10',
                            flex: 1,
							defaults: {
								margin: '5 0 0 0',
								labelWidth: 70,
								labelAlign: 'right'
							},
                            items: [
                            	{
									xtype: 'combobox',
									margin: '0 0 0 0',
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
										select: 'onMasterBLBookingNoChange'
									}
								},
								{
									xtype: 'combobox',
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
										select: 'onSnBlComboChange'
									}
								},
								{
									xtype: 'container',
									flex: 1
								},
                            ]
						},
						{
                    		xtype: 'fieldset',
                            layout: {
                                type: 'vbox',
                            },
                            margin: '0 5 0 0',
                            padding : '10 10 10 10',
							flex: 1,
							defaults: {
								margin: '5 0 0 0',
								labelWidth: 70,
								labelAlign: 'right',
							},
                            items: [
								{
									xtype: 'container',
									enableOverflow: false,
									margin: '0 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelWidth: 70,
										labelAlign: 'right',
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtTruckNo',
											fieldLabel: ViewUtil.getLabel('lorryNo'),
											margin: '0 5 0 0',
											flex: 7,
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
											xtype: 'checkboxfield',
											hidden: false,
											flex: 3,
											reference: 'ctlCargoManualTruckType',
											boxLabel: ViewUtil.getLabel('cmc_yardtruck'),
											bind: '{truckTypeCheck}',
											listeners: {
												change: 'onChangeYardTruck'
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
									defaults: {
										labelWidth: 70,
										labelAlign: 'right',
										
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'ctlUserRefNo',
											flex: 7, 
											margin: '0 5 0 0',
											fieldLabel: ViewUtil.getLabel('userRefNo'),
											fieldStyle: 'text-transform:uppercase',
											listeners: {
												change: 'onUpperCase'
											},
											bind: {
												value: '{theSearch.userRefNo}'
											},
										},
										{
											xtype: 'container',
											flex: 3,
										},
									]
								}, 
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelWidth: 70,
										labelAlign: 'right',
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'ctlPkgNo',
											flex: 7,
											margin: '0 5 0 0',
											fieldLabel: ViewUtil.getLabel('packageNo'),
											fieldStyle: 'text-transform:uppercase',
											listeners: {
												change: 'onUpperCase'
											},
											bind: {
												value: '{theSearch.pkgNo}'
											},
										},
										{
											xtype: 'checkboxfield',
											hidden: true,
											flex: 3,
											reference: 'ctlBargeOperationChk',
											boxLabel: ViewUtil.getLabel('bargeOperation'),
											bind: {
												value: '{theSearch.bargeCheckYn}'
											},
											listeners: {
												change: 'onBargeOperationChk'
											}
										},
									]
								}
                            ]
						},
						{
                    		xtype: 'fieldset',
                            layout: {
                                type: 'vbox',
                            },
                            margin: '0 5 0 0',
                            padding : '10 10 10 10',
							flex: 1,
							defaults: {
								labelWidth: 70,
								labelAlign: 'right',
								margin: '5 0 0 0',
								width: '100%'
							},
                            items: [
								{
									xtype: 'container',
									flex: 1,
									margin: '0 0 0 0',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelWidth: 70, 
										labelAlign: 'right',
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('shiftDt') + ':',
											margin: '5 5 0 0',
											width: 70,
											style: {
												'text-align': 'right'
											}
										},
										{
											xtype: 'combobox',
											hidden: false,
											flex: 1,
											reference: 'ctlCargoManualCtlShiftDt',
											queryMode: 'local',
											bind: {
												store: '{cargoManualCtlForShiftDtCombo}'
											},
											displayField: 'shftDtDsp',
											valueField: 'shftDt',
											value: '',
											editable: false,
											listeners: {
												change: 'onShiftDtComboChange'
											}
										},
										{
											xtype: 'combobox',
											margin: '0 0 0 5',
											flex: 1,
											reference: 'ctlCargoManualCtlShiftNo',
											queryMode: 'local',
											bind: {
												store: '{cargoManualCtlForShiftNoCombo}'
											},
											displayField: 'shftNm',
											valueField: 'shftId',
											editable: false,
											hidden: false,
											listeners: {
												select: 'onShiftNoComboChange'
											}
										}
									]
								},
								{
									xtype: 'combobox',
									fieldLabel: ViewUtil.getLabel('hatchNo'),
									queryMode: 'local',
									margin: '0 0 31 0',
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
									hidden: false
								},
                            ]
						},
					]
				}]
			}]
		});
		
		me.callParent();
	}
});

