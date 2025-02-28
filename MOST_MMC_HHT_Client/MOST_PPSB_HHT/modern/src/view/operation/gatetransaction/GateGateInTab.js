Ext.define('MOST.view.operation.gatetransaction.GateInTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-gateintab',

	requires: [
		'Ext.scroll.Scroller',
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length', 'Ext.tab.Panel',
	],

	reference: 'gateinhht',
	itemId: 'gateinhht',

	/***************************************************************/
	layout: 'fit',
	shadow: false,
	padding: 5,
	scrollable: true,
	responsiveFormulas: {
		small: 'width < 800',
		large: 'width >= 800'
	},

	items: [
		{
			xtype: 'formpanel',
			reference: 'refValidateGateInForm', //refGateInHHT', //refFrmGateInHHT
			margin: '5 0 0 0',
			padding: '10 5 5 5',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{// Row button Confirm Cancel
					xtype: 'container',
					margin: '0 0 5 0',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					items: [
						// {
						// 	xtype: 'segmentedbutton',
						// 	hidden: true,
						// 	reference: 'refFrontRearCam',
						// 	flex: 1,
						// 	listeners: {
						// 		change: 'onChangeSegmentCam'
						// 	},
						// 	items: [{
						// 		text: 'R',
						// 		value: 1,
						// 		pressed: true
						// 	}, {
						// 		 text: 'F',
						// 		 value: 0
						// 	}]
						// },
						// {
						// 	xtype: 'button',
						// 	margin: '5 5 0 0',
						// 	reference: 'refBtnQRScanApron',
						// 	iconCls: 'x-fa fa-qrcode fa-10x',
						// 	textAlign : 'center', 
						// 	text: { type: 'bundle', key: 'hht_qrscan' },
						// 	ui: 'delete-button-modern',
						// 	width: 150,
						// 	handler: 'onTblBtnBarcode'
						// },
						// {
						// 	xtype: 'spacer',
						// 	width: 5
						// },
						{
							xtype: 'button',
							margin: '0 5 0 0',
							text: { type: 'bundle', key: 'confirm' },
							reference: 'refBtnGateInConfirm',
							width: 150,
							ui: 'action',
							iconCls: 'x-fa fa-floppy-o',
							handler: 'onSave'
						},
						{
							xtype: 'button',
							margin: '0 5 0 0',
							text: 'DC',
							reference: 'refBtnDC',
							width: 150,
							ui: 'retrieve-button-modern',
							handler: 'openDamageCheck'
						}
					]
				},
				// {
				// 	xtype: 'container',
				// 	margin: '0 0 5 0',
				// 	hidden: false,
				// 	layout: 
				// 	{
				// 		type: 'hbox',
				// 		align: 'stretch'
				// 	},
				// 	items:[{
				// 		xtype: 'panel',
				// 		style: 'border-style: inherit; border-radius: 5px; border-color: 0000ff; margin-left: auto; margin-right: auto;',
				// 		reference: 'refPnlqrcoderedercomp',
				// 		html: "<div id='qr-readerCMC' style='width:400px'></div>",
				// 		width: 1,
				// 		height: 1,
				// 		}
				// 	]
				// },
				{// Truck ...  Gate In Time
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						flex: 1,
						margin: '0 5 0 0',
						defaults: {
							labelWidth: 100,
							labelAlign: 'left',
							labelTextAlign: 'right'
						},
					},
					items: [
						{
							xtype: 'container',
							layout: 'vbox',
							items: [
								{
									xtype: 'textfield',
									reference: 'refTxtGateInTabLorryNo',
									label: { type: 'bundle', key: 'lorryNo'},
									required: true,
									listeners: {
										//focusleave: 'onGateInLorryDriverFocusleave'
									},
									bind: {
										value: '{theGateIn.lorryNo}'
									},
									triggers: {
										someField: {
											iconCls: 'x-fa fa-search',
											ui: 'retrieve-button-modern',
											scope: 'controller',
											handler: 'onSearchLorryGateIn'
										}
									},
									editable: false,
								},
								{//DO
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										labelWidth: 80,
										labelAlign: 'left',
										labelTextAlign: 'right'
									},
									items: [
										{
											xtype: 'radiofield',
											width: 100,
											reference: 'refRdoGateInTabBlDo',
											name: 'GateInRdo',
											value: 'GateInDOVal',
											bind: {
												checked: '{theGateIn.isBLDo}'
											},
											label: { type: 'bundle', key: 'sdoNo'},
											listeners: {
												change: 'onRadioEditableChange'
											},
										},
										{
											xtype: 'textfield',
											reference: 'refTxtGateInTabBlDo',
											flex: 1,
											clearable: false,
											editable: false,
											listeners: {
												//focus: 'onFocusGateInBLDO'
											},
											bind: {
												value: '{theGateIn.sdoNo}'
											},
											triggers: {
												someField: {
													iconCls: 'x-fa fa-search',
													ui: 'retrieve-button-modern',
													scope: 'controller',
													handler: 'onSearchDOGateIn'
												}
											},
										}
									]
								},
								{//GR
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										labelWidth: 80,
										labelAlign: 'left',
										labelTextAlign: 'right'
									},
									items: [
										{
											xtype: 'radiofield',
											width: 100,
											reference: 'refRdoGateInTabGr',
											name: 'GateInRdo',
											value: 'GateInGRVal',
											label: { type: 'bundle', key: 'grNo'},
											listeners: {
												change: 'onRadioEditableChange'
											},
										},
										{
											xtype: 'textfield',
											reference: 'refTxtGateInTabGr',
											flex: 1,
											listeners: {
												//focus: 'onFocusGateInGR'
											},
											params: {
												tabMode: 'gateIn'
											},
											editable: false,
											clearable: false,
											bind: {
												value: '{theGateIn.grNo}'
											},
											triggers: {
												someField: {
													iconCls: 'x-fa fa-search',
													ui: 'retrieve-button-modern',
													scope: 'controller',
													handler: 'onSearchGRListGI'
												}
											},
										}
									]
								},

							]
						},
						{// Driver ... Gate In time
							xtype: 'container',
							layout: 'vbox',
							items: [
								{
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										labelAlign: 'left',
										labelTextAlign: 'right',
										labelWidth: 100,
										flex: 1,
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'refCboGateInTabGateNo',
											label: { type: 'bundle', key: 'gateoperation.gate'},
											bind: {
												store: '{gateComboList}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local',
											editable: false,
											required: true,
										},
									]
								},
								{
									xtype: 'datetimelocalfield',
									inputType: 'datetime-local',
									reference: 'refTxtGateInTabGateInTime',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									label: { type: 'bundle', key: 'gateoperation.gateintime'},
									required: false
								},
								{// driver
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										labelWidth: 100,
										labelAlign: 'left',
										labelTextAlign: 'right'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refTxtGateInTabDriverId',
											label: { type: 'bundle', key: 'driverId'},
											required: false,
											flex: 1,
											bind: {
												value: '{theGateIn.driverId}'
											}
										}
									]
								},
							]
						},
					]
				},
				{//Split
					xtype: 'fieldset',
					style: 'border-top: 1px solid gray;',
					margin: '10 0 10 0',
				},
				{//Commodity to MT
					xtype: 'container',
					defaults: {
						margin: '0 5 0 0',
						labelWidth: 120,
						labelAlign: 'left',
						labelTextAlign: 'right',
						flex: 1,
					},
					items: [
						{
							xtype: 'textfield',
							reference: 'refTxtGateInTabCommodity',
							labelWidth: 100,
							label: { type: 'bundle', key: 'gateoperation.commodity'},
							readOnly: true,
							bind: {
								value: '{theGateIn.cmdtCd}'
							},
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
						margin: '0 5 0 0',
						//padding: '0 0 0 0',
						align: 'stretch',
						flex: 1,
						labelWidth: 120,
						labelAlign: 'left',
						labelTextAlign: 'right',					
					},
					items: [
						{
							xtype: 'numberfield',
							responsiveConfig: {
								small: {
									labelWidth: 100,
								},
								large: {
									labelWidth: 100,
									flex: 1,
								}
							},
							reference: 'refTxtGateInTabQty',
							label: { type: 'bundle', key: 'gateoperation.qty'},
							readOnly: true,
							bind: {
								value: '{theGateIn.pkgQty}'
							},
						},
						{
							xtype: 'numberfield',
							responsiveConfig: {
								small: {
									labelWidth: 100,
								},
								large: {
									labelWidth: 50,
									flex: 1,
								}
							},
							reference: 'refTxtGateInTabMt',
							maxValue: 9999999.999,
							decimals: 3,
							label: { type: 'bundle', key: 'gateoperation.mt'},
							readOnly: true,
							bind: {
								value: '{theGateIn.wgt}'
							},
						},
						{
							xtype: 'numberfield',
							responsiveConfig: {
								small: {
									labelWidth: 100,
								},
								large: {
									labelWidth: 50,
									flex: 1,
								}
							},
							reference: 'refTxtGateInTabM3',
							maxValue: 9999999.999,
							decimals: 3,
							label: { type: 'bundle', key: 'gateoperation.m3'},
							readOnly: true,
							hidden: false,
							bind: {
								value: '{theGateIn.msrmt}'
							},

						},
					]
				},
				
				{//Customs/ Delv Mode/ Transporter
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 0 0',
					padding: '0 0 0 0',
					// defaults: {
					// 	flex: 1,
					// 	margin: '0 5 0 0',
					// 	labelWidth: 100,
					// 	labelAlign: 'left',
					// 	labelTextAlign: 'right',
					// },
					responsiveConfig: {
						small: {
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								//padding: '0 0 0 0',
								labelWidth: 100,
								labelAlign: 'left',
								labelTextAlign: 'right',
							},
						},
						large: {
							layout: {
								type: 'hbox',
								align: 'stretch'
							},					
							defaults: {
								margin: '0 5 0 0',
								//padding: '0 0 0 0',
								align: 'stretch',
								flex: 1,
								labelWidth: 100,
								labelAlign: 'left',
								labelTextAlign: 'right',					
							},
						}
					},
					items: [
						{
							xtype: 'textfield',
							flex: 1,
							reference: 'refTxtGateInTabCustoms',
							readOnly: true,
							label: { type: 'bundle', key: 'gateoperation.custom'},
							bind: {
								value: '{theGateIn.customsStat}'
							}
						},
						{
							xtype: 'textfield',
							flex: 1,
							reference: 'refTxtGateInTabDMode',
							readOnly: true,
							label: { type: 'bundle', key: 'gateoperation.dmode'},
							bind: {
								value: '{theGateIn.delvTpNm}'
							}
						},
						{
							xtype: 'textfield',
							flex: 1,
							reference: 'refTxtGateInTabTransporterName',
							label: { type: 'bundle', key: 'gateoperation.transporter'},
							bind: {
								value: '{theGateIn.tsptr}'
							},
							clearable: false,
							readOnly: true
						}
					]
				},
				
				{//Driver Information
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 0 0',
					// defaults: {
					// 	flex: 1,
					// 	margin: '0 5 0 0',
					// 	labelWidth: 100,
					// 	labelAlign: 'left',
					// 	labelTextAlign: 'right',
					// },
					responsiveConfig: {
						small: {
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								//padding: '0 0 0 0',
								labelWidth: 100,
								labelAlign: 'left',
								labelTextAlign: 'right',
							},
						},
						large: {
							layout: {
								type: 'hbox',
								align: 'stretch'
							},					
							defaults: {
								margin: '0 5 0 0',
								//padding: '0 0 0 0',
								align: 'stretch',
								flex: 1,
								labelWidth: 100,
								labelAlign: 'left',
								labelTextAlign: 'right',					
							},
						}
					},
					items: [
						{
							xtype: 'textfield',
							flex: 1,
							reference: 'refTxtGateInTabDriverName',
							label: { type: 'bundle', key: 'gateoperation.drivername'},
							bind: {
								value: '{theGateIn.driverNm}'
							},
							readOnly: true,
						},
						{
							xtype: 'textfield',
							flex: 1,
							reference: 'refTxtGateInTabLicense',
							readOnly: true,
							label: { type: 'bundle', key: 'gateoperation.licenseno'},
							bind: {
								value: '{theGateIn.licsNo}'
							}
						},
						{
							xtype: 'textfield',
							flex: 1,
							reference: 'refTxtGateInTabExpired',
							label: { type: 'bundle', key: 'gateoperation.expirydate'},
							readOnly: true,
							bind: {
								value: '{theGateIn.licsExprYmd}'
							}
						},
					]
				},

				{//To Location
					xtype: 'container',
					margin: '0 0 0 0',
					layout: 'hbox',
					defaults: {
						flex: 1,
						margin: '0 5 0 0',
						labelWidth: 100,
						labelAlign: 'left',
						labelTextAlign: 'right',
					},
					items: [
						{
							xtype: 'textfield',
							reference: 'refTxtGateInTabToLocId',
							label: { type: 'bundle', key: 'gateoperation.tolocation'},
							readOnly: true,
							bind: {
								value: '{theGateIn.toLocId}'
							},
						},
					]
				},
			]
		}
	]
});
