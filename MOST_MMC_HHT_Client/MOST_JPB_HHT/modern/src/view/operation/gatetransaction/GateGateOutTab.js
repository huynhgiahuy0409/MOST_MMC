Ext.define('MOST.view.operation.gatetransaction.GateOutTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-gateouttab',

	requires: [
		'Ext.scroll.Scroller',
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length',
	],

	reference: 'gateouthht',
	itemId: 'gateouthht',

	/***************************************************************/
	layout: 'fit',
	shadow: false,
	padding: 5,
	scrollable: true,
	responsiveFormulas: {
		small: 'width < 700',
		large: 'width >= 700'
	},
	/***************************************************************/


	items: [
		{
			xtype: 'formpanel',
			reference: 'refValidateGateOutForm',
			margin: '5 0 0 0',
			padding: '10 5 5 5',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{// Truck ...  Gate In Time
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						flex: 1,
						margin: '0 5 0 0',
						defaults: {
							labelWidth: 120,
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
									reference: 'refTxtGateOutTabLorryNo',
									label: { type: 'bundle', key: 'lorryNo'},
									required: true,
									listeners: {
										//focusleave: 'onGateOutLorryDriverFocusleave'
									},
									bind: {
										value: '{theGateOut.lorryNo}'
									},
									triggers: {
										someField: {
											iconCls: 'x-fa fa-search',
											ui: 'retrieve-button-modern',
											scope: 'controller',
											handler: 'onSearchLorryGateOut'
										}
									},
								},
								
								{
									xtype: 'textfield',
									reference: 'refTxtGateOutTxnNo',
									label: { type: 'bundle', key: 'gateoperation.txtno'},
									editable: false,
									required: true,
									bind: {
										value: '{theGateOut.gateTxnNo}'
									},
									triggers: {
										someField: {
											iconCls: 'x-fa fa-search',
											ui: 'retrieve-button-modern',
											scope: 'controller',
											handler: 'onSearchGateTicketNoGateOut'
										}
									}
								},
								
								{
									xtype: 'textfield',
									reference: 'refTxtGateOutGateInTime',
									label: { type: 'bundle', key: 'gateoperation.gateintime'},
									required: false,
									clearable: false,
									editable: false
								},

								{//DO
									xtype: 'container',
									hidden: true,
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
											reference: 'refRdoGateOutTabGPass',
											label: 'G/P',
											value: 'GateOutGPVal',
											name: 'GateOutRdo',
											listeners: {
												change: 'onRadioEditableChange'
											},
										},
										{
											xtype: 'textfield',
											reference: 'refTxtGateOutTabGPass',
											flex: 1,
											clearable: false,
											editable: false,
											listeners: {
												//focus: 'onFocusGateOutGP'
											},
											triggers: {
												someField: {
													iconCls: 'x-fa fa-search',
													ui: 'retrieve-button-modern',
													scope: 'controller',
													handler: 'onSearchGPGateOut'
												}
											},
										}
									]
								},
								{//GR
									xtype: 'container',
									hidden: true,
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
											reference: 'refRdoGateOutTabGr',
											value: 'GateOutGRVal',
											name: 'GateOutRdo',
											label: 'G/R',
											listeners: {
												change: 'onRadioEditableChange'
											},
										},
										{
											xtype: 'textfield',
											reference: 'refTxtGateOutTabGr',
											flex: 1,
											listeners: {
												//focus: 'onFocusGateOutGR',
												//focusleave: 'onGateOutGrFocusleave'
											},
											params: {
												tabMode: 'gateIn' // gateIn,
												// gateOut
											},
											editable: false,
											clearable: false,
											triggers: {
												someField: {
													iconCls: 'x-fa fa-search',
													ui: 'retrieve-button-modern',
													scope: 'controller',
													handler: 'onSearchGRListGO'
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
								{// driver
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										labelWidth: 120,
										labelAlign: 'left',
										labelTextAlign: 'right'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refTxtGateOutTabDriverId',
											label: { type: 'bundle', key: 'gateoperation.driverid'},
											clearable: false,
											readOnly: false,
											editable: false,
											flex: 1,
											bind: {
												value: '{theGateOut.driverId}'
											}
										}
									]
								},
								
								{
									xtype: 'datetimelocalfield',
									inputType: 'datetime-local',
									reference: 'refTxtGateOutTabGateOutTime',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									label: { type: 'bundle', key: 'gateoperation.gateoutime'},
									required: false
								},
								{
									xtype: 'combobox',
									reference: 'refCboGateOutTabGateNo',
									label: { type: 'bundle', key: 'gateoperation.gate'},
									bind: {
										store: '{gateComboList}',
									},
									displayField: 'scdNm',
									valueField: 'scd',
									queryMode: 'local',
									editable: false,
									required: true,
								}
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
					responsiveConfig: {
						small: {
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								//padding: '0 0 0 0',
								labelWidth: 120,
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
								labelWidth: 120,
								labelAlign: 'left',
								labelTextAlign: 'right',					
							},
						}
					},
					items: [
						{
							xtype: 'textfield',
							labelWidth: 120,
							flex: 1.6,
							reference: 'refTxtGateOutTabCommodity',
							label: { type: 'bundle', key: 'gateoperation.commodity'},
							readOnly: true,
							bind: {
								value: '{theGateOut.cmdtNm}'
							},
						},
						{
							xtype: 'numberfield',
							responsiveConfig: {
								small: {
									labelWidth: 120,
								},
								large: {
									labelWidth: 50,
									flex: 1,
								}
							},
							reference: 'refTxtGateOutTabQty',
							label: { type: 'bundle', key: 'gateoperation.qty'},
							readOnly: true,
							bind: {
								value: '{theGateOut.pkgQty}'
							},
						},
						{
							xtype: 'numberfield',
							responsiveConfig: {
								small: {
									labelWidth: 120,
								},
								large: {
									labelWidth: 50,
									flex: 1,
								}
							},
							reference: 'refTxtGateOutTabMt',
							maxValue: 9999999.999,
							decimals: 3,
							label: { type: 'bundle', key: 'gateoperation.mt'},
							readOnly: true,
							bind: {
								value: '{theGateOut.wgt}'
							},
						},
						{
							xtype: 'numberfield',
							responsiveConfig: {
								small: {
									labelWidth: 120,
								},
								large: {
									labelWidth: 50,
									flex: 1,
								}
							},
							reference: 'refTxtGateOutTabM3',
							maxValue: 9999999.999,
							decimals: 3,
							label: { type: 'bundle', key: 'gateoperation.m3'},
							readOnly: true,
							hidden: false,
							bind: {
								value: '{theGateOut.msrmt}'
							},

						},
					]
				},
				
				{//Tspt Information
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						flex: 1,
						margin: '0 5 0 0',
						labelWidth: 120,
						labelAlign: 'left',
						labelTextAlign: 'right',
					},
					items: [
						{
							xtype: 'textfield',
							label: { type: 'bundle', key: 'gateoperation.transporter'},
							reference: 'refTxtGateOutTabTransporterName',
							flex: 1,
							bind: {
								value: '{theGateOut.tsptCompNm}'
							},
							clearable: false,
							readOnly: true
						},
					]
				},
				{//Customs Information
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						flex: 1,
						margin: '0 5 0 0',
						labelWidth: 120,
						labelAlign: 'left',
						labelTextAlign: 'right',
					},
					items: [
						{
							xtype: 'textfield',
							reference: 'refTxtGateOutTabCustoms',
							readOnly: true,
							label: { type: 'bundle', key: 'gateoperation.custom'},
							bind: {
								value: '{theGateOut.customsStat}'
							}
						}
					]
				},
				
				{//Driver Information
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						flex: 1,
						margin: '0 5 0 0',
						labelWidth: 120,
						labelAlign: 'left',
						labelTextAlign: 'right',
					},
					items: [
						{
							xtype: 'textfield',
							reference: 'refTxtGateOutTabDriverName',
							label: 'Driver Name',
							bind: {
								value: '{theGateOut.driverNm}'
							},
							clearable: false,
							readOnly: true
						},
						{
							xtype: 'textfield',
							reference: 'refTxtGateOutTabLicense',
							clearable: false,
							readOnly: true,
							label: 'License No.',
							bind: {
								value: '{theGateOut.licsNo}'
							}
						},
						{
							xtype: 'textfield',
							reference: 'refTxtGateOutTabExpired',
							label: 'Expiry Date',
							clearable: false,
							readOnly: true,
							bind: {
								value: '{theGateOut.licsExprYmd}'
							}
						}
					]
				},
				{// Row button Confirm Cancel
					xtype: 'container',
					margin: '0 0 0 0',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					items: [
						{
							xtype: 'button',
							text: { type: 'bundle', key: 'confirm' },
							reference: 'refBtnGateOutConfirm',
							margin: '5 5 0 0',
							width: 150,
							ui: 'action',
							iconCls: 'x-fa fa-floppy-o',
							handler: 'onSave'
						},
						{
							xtype: 'button',
							text: 'Damage',
							reference: 'refBtnDC',
							margin: '5 5 0 0',
							width: 150,
							ui: 'retrieve-button-modern',
							handler: 'openDamageCheck'
						},
					]
				},
			]
		}
	]
});
