Ext.define('MOST.view.operation.confirmwarehouse.CMCofWarehouseHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-cmcofwarehousehht',
	requires: [
		'Ext.scroll.Scroller',
		'Ext.layout.overflow.Scroller',
		'Ext.SegmentedButton',
		'MOST.view.common.DateTimeLocalField',
		'MOST.view.operation.CMCofWarehouseHHTModel',
		'MOST.view.operation.CMCofWarehouseHHTController',
		
		'MOST.view.operation.confirmwarehouse.CMCofWarehouseExportTab',
		'MOST.view.operation.confirmwarehouse.CMCofWarehouseImportTab',

		'MOST.view.popup.AssignedInternalTruckListPopupHHT',
		
		'MOST.view.popup.InGateTruckListPopupHHT'
	],
	controller: 'cmcofwarehousehht',
	viewModel: {
		type: 'cmcofwarehousehht'
	},
	
	listeners:{
		initialize: 'onTblLoad'
	},
	
	//======================================================
	layout: 'fit',
	shadow: false,
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	padding: 5,	
	responsiveFormulas: {
		small: 'width < 800',
		large: 'width >= 800'
	},
	
	items:[{
		xtype: 'formpanel',
		padding: 0,
		layout: { 
			type: 'vbox',
			//align: 'stretch'
		},
		items:[
			//Row 1: Button setting
			{
				xtype: 'container',
				padding: '0 0 0 0',
				layout: { 
					type: 'vbox'
				},
				defaults: {
					margin: '0 0 0 0'
				},
				items: [
					{
						xtype: 'container',
						padding: '5 0 0 5',
						layout: { 
							type: 'hbox',
							pack: 'end'
						},
						defaults: {
							margin: '0 5 0 0'
						},
						items: [
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'end'
								},
								defaults: {
									labelAlign: 'right',
									labelTextAlign: 'left',
									labelWidth: 120,
								},
								items: [
									{// Yard Truck Check
										xtype: 'checkboxfield',
										reference: 'refChkYardTruck',
										label: {type: 'bundle', key: 'yardTruck'},
										bind: '{truckTypeCheck}',
										value: 'I',
										listeners: {
						                	change: 'onChangeYardTruck'
						                },
									}
								]
							},
							{
								xtype: 'button',
								iconCls: 'x-fa fa-search',
								text: {type: 'bundle', key: 'search'},
								reference:'refBtnCargoManualHHTRetrive',
								handler: 'onTblRetrieve',
								width: 150,
								ui: 'retrieve-button-modern'
							},
							{
				                xtype: 'segmentedbutton',
				                hidden: true,
				                reference: 'refFrontRearCam',
				                flex: 1,
				                listeners: {
				                	change: 'onChangeSegmentCam'
				                },
				                items: [{
				                    text: 'R',
				                    value: 1,
				                    pressed: true
				                }, {
				                	 text: 'F',
				                     value: 0
				                }]
							},
							{
								xtype: 'button',
								width: 150,
								reference: 'refBtnQRScan',
								text: 'QR Code',
								iconCls: 'x-fa fa-qrcode fa-10x',
								textAlign : 'center', 
								ui: 'delete-button-modern',
								//ui: 'raised',
								handler: 'onTblBtnBarcode'
							}
						]
					},					
					{
						xtype: 'container',
						autoScroll: true,
						collapsible:true,
						padding: '5 0 0 5',
						layout: { 
							type: 'hbox',
							pack: 'end'
						},
						defaults: {
							margin: '0 5 0 0'
						},
						items: [
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									pack: 'end',
									align: 'top'
								},
								defaults: {
									margin: '0 5 0 0',
									labelAlign: 'left',
									labelWidth: 120,
								},
								items: [
									{
										xtype: 'button',
										iconCls: 'x-fa fa-upload',
										width: 150,
										text: {type: 'bundle', key: 'warehouseCheckExportCtl'},
										reference: 'refBtnWhCheck',
										ui: 'action',
										handler: 'onTblWhCheck'
									},
									{
										xtype: 'button',
										iconCls: 'x-fa fa-download',
										reference: 'refBtnHandlingIn',
										width: 150,
										text: {type: 'bundle', key: 'handlingIn'},
										ui: 'action',
										handler: 'onTblHandlingIn'
									},
									{
										xtype: 'button',
										iconCls: 'x-fa fa-download',
										reference: 'refBtnHandlingOut',
										width: 150,
										text: {type: 'bundle', key: 'handlingOut'},
										ui: 'action',
										handler: 'onTblHandlingOut'
									},
									{
										xtype: 'button',
										margin: '0 0 0 0',
										iconCls: 'x-fa fa-exchange',
										reference: 'refBtnMovement',
										width: 150,
										text: {type: 'bundle', key: 'movement'},
										ui: 'action',
										disabled: true,
										handler: 'onTblMovement'
									}
								]
							}
						]
					},
				]
			},
			
			//ROW 2: Search Condition 
			{
				xtype: 'container',
				padding: '5 0 0 5',
				responsiveConfig: {
					small: {
						layout: 'vbox',
						defaults: {
							margin: '0 0 5 0',
							padding: '0 0 10 0'
						},
					},
					large: {
						layout: 'hbox',						
						defaults: {
							margin: '0 5 0 0',
							flex: 1,							
						},
					}
				},
				items:[
					//col 1: SN
					{
						xtype: 'fieldset',
						flex: 1,
						reference: 'refContSnNo',
						layout: 'vbox',
						defaults: {
							labelAlign: 'left',
							labelWidth: 90,
						},
						border: true,
						style: 'border-style: inherit; border-radius: 5px; border-color: antiquewhite',
						items: [
							{
								xtype: 'combobox',
								reference: 'refCboBookingNo',
								bind: {
									store: '{bookingNoStore}',
									value: '{theSearch.bookingNo}'
								},
								label: {type: 'bundle', key: 'cmc_bookingno'},
								displayField: 'scdNm',
								valueField: 'mfDocId',
								queryMode: 'local',
								clearable: true,
								typeAhead: true,
								editable: false,
								hidden: false
							},
							{
								xtype: 'combobox',
								reference: 'refCboShipgNoteNo',
								bind: {
									store: '{shipgNoteNoStore}',
									value: '{theSearch.shipgNoteNo}'
								},
								label: {type: 'bundle', key: 'sn'},
								displayField: 'scdNm',
								valueField: 'shipgNoteNo',
								queryMode: 'local',
								clearable: true,
								typeAhead: true,
								editable: false,
								hidden: false
							},
							{
								xtype: 'textfield',
								reference: 'refTxtGrNo',
								maxLength: 20,
								label: { type: 'bundle', key: 'grNo' },
								bind: {
									value: '{theSearch.grNo}'
								}
							}
						]
					},
					
					//col 2: BL
					{
						xtype: 'fieldset',
						flex: 1,
						reference: 'refContBlNo',
						layout: 'vbox',
						defaults: {
							labelAlign: 'left',
							labelWidth: 90,
						},
						border: true,
						style: 'border-style: inherit; border-radius: 5px; border-color: antiquewhite',
						items: [
							{
								xtype: 'combobox',
								reference: 'refCboMBLNo',
								bind: {
									store: '{mblNoStore}',
									value: '{theSearch.masterBL}'
								},
								label: {type: 'bundle', key: 'cmc_masterbl'},
								displayField: 'scdNm',
								valueField: 'mfDocId',
								queryMode: 'local',
								clearable: true,
								typeAhead: true,
								editable: false,
								hidden: false
							},
							{
								xtype: 'combobox',
								reference: 'refCboBlNo',
								bind: {
									store: '{blNoStore}',
									value: '{theSearch.blNo}'
								},
								label: {type: 'bundle', key: 'bl'},
								displayField: 'scdNm',
								valueField: 'blNo',
								queryMode: 'local',
								clearable: true,
								typeAhead: true,
								editable: false,
								hidden: false
							},
							{
								xtype: 'textfield',
								label: { type: 'bundle', key: 'SDONo' },
								reference: 'refTxtSdoNo',
								maxLength: 20,
								bind: {
									value: '{theSearch.sdoNo}'
								}
							}
						]
					},
					
					//col 3:
					{
						xtype: 'fieldset',
						flex: 1,
						layout: 'vbox',
						defaults: {
							labelAlign: 'left',
							labelWidth: 90,
						},
						border: true,
						style: 'border-style: inherit; border-radius: 5px; border-color: antiquewhite',
						items: [
							{//Truck No
								xtype: 'textfield',
								reference: 'refTxtLorryNo',
								maxLength: 20,
								label: { type: 'bundle', key: 'lorryNo' },
								bind: {
									value: '{theSearch.lorryNo}'
								},
								triggers: {
									someField: {
										iconCls: 'x-fa fa-search',
										ui: 'retrieve-button-modern',
										scope: 'controller',
										handler: 'onOpenTruckPopup'
									}
								},
							},
							{
								xtype: 'textfield',
								reference: 'refTxtUserRefNo',
								maxLength: 30,
								label: { type: 'bundle', key: 'lotNo' },
								bind: {
									value: '{theSearch.userRefNo}'
								},
								listeners:{
	                    			change: 'onUpperCase'
	                    		}
							},
							{
								xtype: 'textfield',
								reference: 'refTxtIMTNo',
								//maxLength: 20,
								label: 'IMT No.',
								bind: {
									value: '{theSearch.imtNo}'
								},
								listeners:{
	                    			change: 'onUpperCase'
	                    		}
							},
						]
					},
					
					//COL3: QR
//					{
//						xtype: 'fieldset',
//						layout: {
//							type: 'vbox',
//							pack: 'end'
//						},
//						defaults: {
//							labelAlign: 'right'
//						},
//						border: true,
//						style: 'border-style: inherit; border-radius: 5px; border-color: antiquewhite',
//						items: [
//							{
//								xtype: 'container',
//								layout: {
//									type: 'hbox',
//									pack: 'end'
//								},
//								items: [
//									{
//										xtype: 'button',
//										reference: 'refBtnQRScan',
//										iconCls: 'x-fa fa-qrcode fa-10x',
//										textAlign : 'center', 
//										width: 100,
//										height: 100,
//										ui: 'raised',
//										margin: '5 5 5 5',
//										handler: 'onTblBtnBarcode'
//									}
//								]
//							}
//						]
//					}
					
				]
			},
			//ROW 3
			{
				xtype: 'container',
				hidden: false,
				layout: 
				{
					type: 'hbox',
					align: 'stretch'
				},
				items:[{
					xtype: 'panel',
					style: 'margin-left: auto; margin-right: auto;',
					reference: 'refPnlqrcoderedercomp',
					html: "<div id='qr-readerCMC2' style='width:400px'></div>",
//					width: 150,
//					height: 150,
					}
				]
			},
			//ROW 4: IMPORT/EXPORT TAB
			{
				//tab
				xtype: 'tabpanel',
				reference: 'refTabCargoManualCtl',
				flex:1,
		        tabBar: {
		            layout: {
		                pack: 'start',
		                overflow: 'scroller'
		            }
		        },			
				layout:{
					animation: null
				},
				tabBarPosition: 'top',
		        defaults: {
		            scrollable: true,
		            layout: 'fit',
		            userCls: 'card',
		            tab: {
		                flex: 1,
		                ui: 'md-tab'    
		            }
		        },			
				items: [
					{
						xtype:'app-cmcofwarehouseimporttab',
						reference: 'refPnlImport',
						flex: 1,
						title: 'Import',
						name: 'cmcimport',
						listeners: {
							activate: 'onActivateTabHHT'
						}
					},
					{
						xtype:'app-cmcofwarehouseexporttab',
						reference: 'refPnlExport',
						flex: 1,
						title: 'Export',
						name: 'cmcexport',
						listeners: {
							activate: 'onActivateTabHHT'
						}
					}
					
					]
				}
			]
		}
	]
});