Ext.define('MOST.view.operation.confirmapron.CMCofApronHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-cmcofapronhht',
	requires: [
		'Ext.scroll.Scroller',
		'Ext.layout.overflow.Scroller',
		'Ext.SegmentedButton',
		'MOST.view.common.DateTimeLocalField',
		'MOST.view.operation.CMCofApronHHTModel',
		'MOST.view.operation.CMCofApronHHTController',
		
		'MOST.view.operation.confirmapron.CMCofApronExportTab',
		'MOST.view.operation.confirmapron.CMCofApronImportTab',
	],
	controller: 'cmcofapronhht',
	viewModel: {
		type: 'cmcofapronhht'
	},
	
	listeners:{
		initialize: 'onTblLoad'
	},
	
	//======================================================
	layout: 'fit',
	shadow: false,
	padding: 5,	
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	scrollable: true, 
	responsiveFormulas: {
		small: CommonConstants.SMALL_WIDTH,
		large: CommonConstants.LARGE_WIDTH
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
				xtype: 'fieldset',
				scrollable: true, 
				padding: '5 0 0 5',
				layout: { 
					type: 'hbox',
					align: 'top',
					pack: 'end'
				},
				defaults: {
					margin: '0 5 0 0'
				},
				items: [
					{
						xtype: 'container',
						// layout: {
						// 	type: 'hbox',
						// 	align: 'top',
						// 	pack: 'end'
						// },
						margin: '0 0 0 5',
						responsiveConfig: {
							small: {
								margin: '0 0 0 5',
								layout: {
									type: 'vbox',
									align: 'stretch'
								},
								defaults: {
									//margin: '0 0 5 0',
									//padding: '0 0 10 0'
								},
							},
							large: {
								margin: '0 0 0 5',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},					
								defaults: {
									//margin: '0 5 0 0',
									//flex: 1,							
								},
							}
						},
						
						defaults: {
							labelAlign: 'right',
							labelTextAlign: 'left',
							//labelWidth: 80,
						},
						items: [
							{// Barge Check
								xtype: 'checkboxfield',
								//labelWidth: 100,
								reference: 'refChkBargeOperation',
								label: {type: 'bundle', key: 'bargeOperation'}
							},
							{// Yard Truck Check
								xtype: 'checkboxfield',
								reference: 'refChkYardTruck',
								label: {type: 'bundle', key: 'yardTruck'},
								bind: '{truckTypeCheck}',
								value: 'I',
								//labelWidth: 100,
								listeners: {
				                	change: 'onChangeYardTruck'
				                },
							},
							
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
						xtype: 'button',
						iconCls: 'x-fa fa-upload',
						reference: 'refBtnLoading',
						width: 150,
						text: {type: 'bundle', key: 'loadingCtl'},
						reference: 'refBtnLoading',
						ui: 'action',
						handler: 'onTblLoading'
					},
					{
						xtype: 'button',
						iconCls: 'x-fa fa-download',
						reference: 'refBtnDischarging',
						width: 150,
						text: {type: 'bundle', key: 'dischargingCtl'},
						ui: 'action',
						handler: 'onTblDischarging'
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
						reference: 'refBtnQRScanApron',
						iconCls: 'x-fa fa-qrcode fa-10x',
						textAlign : 'center', 
						ui: 'delete-button-modern',
						//ui: 'raised',
						handler: 'onTblBtnBarcode'
					},
					// {//Test
					// 	xtype: 'button',
					// 	reference: 'refBtnOpenQR',
					// 	iconCls: 'x-fa fa-qrcode fa-10x',
					// 	textAlign : 'center',
					// 	text: 'QR',
					// 	ui: 'delete-button-modern',
					// 	handler: 'openQR'
					// },
				]
			},
			
			//ROW 2: Search Condition 
			{
				xtype: 'container',
				padding: '5 5 0 5',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				// defaults: {
				// 	margin: '0 0 5 0',
				// 	padding: '0 0 10 0'
				// },
				responsiveConfig: {
					small: {
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							margin: '0 0 5 0',
							padding: '0 0 10 0'
						},
					},
					large: {
						layout: {
							type: 'hbox',
							align: 'stretch'
						},					
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
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
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
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
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
								listeners:{
									change: function(){
										var me = this;
										me.setValue(this.getValue().toUpperCase());
									}
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
					html: "<div id='qr-readerCMC' style='width:400px'></div>",
					width: 1,
					height: 1,
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
						xtype:'app-cmcofapronimporttab',
						reference: 'refPnlImport',
						flex: 1,
						title: 'Import',
						name: 'cmcimport',
						listeners: {
							activate: 'onActivateTabHHT'
						}
					},
					{
						xtype:'app-cmcofapronexporttab',
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