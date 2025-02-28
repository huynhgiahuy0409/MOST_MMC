Ext.define('MOST.view.billing.partnertariffratedetail.PartnerTariffRateDetailTabHead', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-partnertariffratedetailtabhead',

	requires: [
		'MOST.view.billing.PartnerTariffRateController',
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],


	config: {
		deliverStr: '',
		cargoStr: '',
		commodityStr: '',
		vesselStr: ''
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					margin: '5 0 5 0',
					padding: '10 10 10 10',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							flex: 1,
							defaults: {
								width: '100%',
								margin: '0 0 5 0'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										margin: '0 5 0 0',
										labelAlign: 'right'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refPartnertxt',
											fieldLabel: ViewUtil.getLabel('partnerCode'),
											labelWidth: 80,
											editable: true,
											flex: 1,
											bind: {
												value: '{theCurrentDetail.ptnrCd}',
											},
											allowBlank: false,
											listeners: {
												focusleave: 'onCheckedPartnerCode',
												change: 'onUpperCase'
											}
										},
										{
											xtype: 'button',
											reference: 'ctlPartnerCodeTypeBtn',
											iconCls: 'x-fa fa-search',
											listeners: {
												click: 'openPartnerCdTypePopupHead'
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
										margin: '0 5 0 0',
										labelAlign: 'right'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refConsignee',
											fieldLabel: ViewUtil.getLabel('consignee'),
											labelWidth: 80,
											editable: false,
											flex: 1,
											bind: {
												value: '{theCurrentDetail.conSig}'
											}
										},
										{
											xtype: 'button',
											iconCls: 'x-fa fa-search',
											listeners: {
												click: 'openPartnerCdForMultiPopup'
											},
										},
									]
								},
								{
									xtype: 'container',
									margin: '0 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										width: '100%',
										labelAlign: 'right',
										margin: '0 5 0 0',
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refRefNoTxt',
											fieldLabel: ViewUtil.getLabel('refNo'),
											labelWidth: 80,
											bind: {
												value: '{theCurrentDetail.rmk}'
											}
										}
									]
								}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							defaults: {
								margin: '0 5 5 0',
								labelAlign: 'right',
								width: '100%'
							},
							items: [
								{
									xtype: 'datefield',
									reference: 'refAplDateField',
									fieldLabel: ViewUtil.getLabel('applyDate'),
									labelWidth: 80,
									allowBlank: false,
									editable: false,
									format: MOST.config.Locale.getShortDate()
								},
								{
									xtype: 'datefield',
									reference: 'refExpDateField',
									fieldLabel: ViewUtil.getLabel('expiryDate'),
									labelWidth: 80,
									margin: '0 5 0 0',
									editable: false,
									bind: {
										value: '{theCurrentDetail.exprYmd}'
									},
									allowBlank: false,
									format: MOST.config.Locale.getShortDate(),
								}
							]
						},
					]
				},
				{
					xtype: 'fieldset',
					margin: '0 0 5 0',
					padding: '10 10 8 10',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					title: 'Categories',
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									items: [
										{
											xtype: 'container',
											margin: '0 5 5 0',
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
													reference: 'refVesselCode',
													fieldLabel: ViewUtil.getLabel('vesselCode'),
													labelWidth: 80,
													editable: false,
													flex: 1,
													bind: {
														value: '{theCurrentDetail.vessels}'
													}
												},
												{
													xtype: 'button',
													margin: '0 0 0 5',
													iconCls: 'x-fa fa-search',
													listeners: {
														click: 'openVesselMultiPopup'
													},
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
												labelAlign: 'right',
												width: '100%',
												margin: '0 5 0 0',
											},
											items: [
												{
													xtype: 'combo',
													reference: 'refBerthNo',
													fieldLabel: ViewUtil.getLabel('berthNo'),
													labelWidth: 80,
													editable: false,
													bind: {
														value: '{theCurrentDetail.berthString}',
														store: '{berthListStore}'
													},
													queryMode: 'local',
													displayField: 'berthNm',
													valueField: 'berthCd'
												}
											]
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
										labelAlign: 'right'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refDelivery',
											fieldLabel: ViewUtil.getLabel('delivery'),
											labelWidth: 80,
											editable: false,
											flex: 1,
											bind: '{theCurrentDetail.deliveryString}'
										},
										{
											xtype: 'button',
											margin: '0 0 0 5',
											iconCls: 'x-fa fa-search',
											listeners: {
												click: 'openDeliveryPopup'
											},
										}
									]
								}

							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
							},
							items: [
								{
									xtype: 'container',
									margin: '10 5 0 0',
									flex: 1,
									items: [
										{
											xtype: 'checkbox',
											margin: '0 0 0 0',
											boxLabel: ViewUtil.getLabel('vesselhandling'),
											reference: 'chbVsl',
											id: 'cbVsl',
											flex: 1,
											listeners: {
												change: 'onCheckedChangeVsl'
											}
										},
										{
											xtype: 'fieldset',
											padding: '5 10 0 10',
											reference: 'fieldSetVsl',
											flex: 1,
											height: 145,
											defaults: {
												labelAlign: 'right'
											},
											items: [
												{
													xtype: 'container', 
													items: [
														{
															xtype: 'radiogroup', 
															margin: '0 0 0 -4', 
															flex: 1,
															layout: {
																type: 'hbox'
															},
															defaults: {
																margin: '0 5 0 0', 
															},
															items: [
																{
																	boxLabel: ViewUtil.getLabel('loa'),
																	inputValue: '1',
																	reference: 'refLOA',
																	name: 'rd',
																	checked: true
																},
																{
																	boxLabel: ViewUtil.getLabel('dwt'),
																	inputValue: '2',
																	name: 'rd',
																	reference: 'refDWT',
																}
															]
														},
													]
												},
												{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													items: [
														{
															xtype: 'container',
															flex: 1,
															margin: '0 5 0 0', 
															layout: {
																type: 'vbox',
																align: 'stretch'
															},
															items: [
																{
																	xtype: 'label',
																	text: ViewUtil.getLabel('from'),
																},
																{
																	xtype: 'numberfield',
																	reference: 'refFormVsl', 
																	minValue: 0,
																	bind: {
																		value: '{theCurrentDetail.tierVal1Vsl}'
																	}
																}
															]
														},

														{
															xtype: 'container',
															flex: 1,
															margin: '0 0 0 5', 
															layout: {
																type: 'vbox',
																align: 'stretch'
															},
															items: [
																{
																	xtype: 'label',
																	text: 'To'
																},
																{
																	xtype: 'numberfield',
																	reference: 'refToVsl',
																	minValue: 0,
																	bind: {
																		value: '{theCurrentDetail.tierVal2Vsl}'
																	}
																}
															]
														}
													]
												}
											]
										},
									]
								},
								{
									xtype: 'container',
									margin: '10 0 0 5',
									flex: 1,
									layout: {
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right'
									},
									items: [
										{
											xtype: 'checkbox',
											margin: '0 0 0 0',
											boxLabel: ViewUtil.getLabel('cargohandling'),
											reference: 'chbCargo',
											id: 'cbCargo',
											flex: 1,
											listeners: {
												change: 'onCheckedChangeCargo'
											}
										},
										{
											xtype: 'fieldset',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											reference: 'fieldSetCargo',
											padding: '5 10 0 10',
											height: 145,
											flex: 1, 
											items: [
												{
													xtype: 'container',
													width: '100%',
													layout: {
														type: 'hbox',
														align: 'stretch'
													},
													defaults: {
														margin: '5 0 0 0',
														labelAlign: 'right'
													},
													items: [
														{
															xtype: 'textfield',
															reference: 'refcargoType',
															fieldLabel: ViewUtil.getLabel('cargoTp'), 
															labelWidth: 80,
															flex: 1, 
															bind: '{theCurrentDetail.cargoString}',
															editable: false
														},
														{

															xtype: 'button',
															iconCls: 'x-fa fa-search',
															reference: 'btnCargo',
															margin: '5 0 0 5',
															listeners: {
																click: 'openCargoPopup'
															}
														}]
												},
												{
													xtype: 'container',
													layout: {
														type: 'hbox',
														align: 'stretch'
													},
													width: '100%',
													defaults: {
														labelAlign: 'right',
														margin: '5 0 0 0',
													},
													items: [
														{
															xtype: 'textfield',
															reference: 'refComdt',
															fieldLabel: ViewUtil.getLabel('commodity'),
															labelWidth: 80,
															flex: 1,
															bind: '{theCurrentDetail.commodityString}',
															editable: false
														},
														{
															xtype: 'button',
															reference: 'btnCommodity',
															margin: '5 0 0 5',
															iconCls: 'x-fa fa-search',
															listeners: {
																click: 'openCommonCodeForMultiPopup'
															}
														}
													]
												},
												{
													xtype: 'container',
													margin: '5 0 0 0',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													items: [
														{
															xtype: 'label',
															text: ViewUtil.getLabel('handledqty')
														},
														{
															xtype: 'container',
															layout: {
																type: 'hbox'
															},
															items: [
																{
																	xtype: 'container',
																	flex: 1,
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	items: [{
																		xtype: 'label',
																		text: ViewUtil.getLabel('from')
																	}, {
																		xtype: 'numberfield',
																		reference: 'refFromCargo',
																		minValue: 0,
																		bind: {
																			value: '{theCurrentDetail.tierVal1Cargo}'
																		}
																	}
																	]
																},
																{
																	xtype: 'label',
																	text: 'MT',
																	margin: '20 30 20 30'
																},
																{
																	xtype: 'container',
																	flex: 1,
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	items: [
																		{
																			xtype: 'label',
																			text: ViewUtil.getLabel('to')
																		}, {
																			xtype: 'numberfield',
																			reference: 'refToCargo',
																			minValue: 0,
																			bind: {
																				value: '{theCurrentDetail.tierVal2Cargo}'
																			}
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
								}
							]
						},
					]
				}
			]
		});

		me.callParent();
	},
});