Ext.define('MOST.view.planning.MegaDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-megadetail',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],

	height: 600,
	width: 1200,

	listeners: {
		afterrender: 'onDetailLoad'
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function () {
		var me = this;
		Ext.apply(this, {
			xtype: 'form',
			defaults: {
				margin: '5 5 5 0' // top, right, bottom, left
			},
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'fieldset',
							margin: '0 0 0 5',
							padding: '10 10 10 10',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 0 5 0',
								labelAlign: 'right',
								labelWidth: 60
							},
							items: [
								{
									xtype: 'container',
									layout: { type: 'hbox' },
									defaults: {
										margin: '0 0 0 5',
										labelAlign: 'right'
									},
									items: [
										{
											xtype: 'vesselcalllistfield',
											bind: {
												value: '{theVsl.vslCallId}'
											},
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vessel'),
											labelWidth: 55,
											reference: 'ctlDetailJpvc',
											allowBlank: false
										}
									]
								},
								{
									xtype: 'combobox',
									reference: 'ctlDetailPurpose',
									fieldLabel: ViewUtil.getLabel('purpose'),
									queryMode: 'local',
									bind: {
										store: '{megaDetailPurposeCombo}',
										value: '{theMain.purpTpCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: '',
									allowBlank: false,
									emptyText: ViewUtil.getLabel('select'),
									listeners: {
										change: 'onComboChangeForMegaDetailPurpose'
									}
								},
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 45',
									reference: 'ctlMegaDetailWhAppr',
									boxLabel: ViewUtil.getLabel('whSupervisor'),
								},
								{
									xtype: 'textfield',
									reference: 'ctlDetailMegaNo',
									fieldLabel: ViewUtil.getLabel('megaNo'),
									flex: 1,
									margin: '0 0 0 0',
									editable: false,
									bind: '{theMain.megaNo}'
								}
							]
						},
						{
							xtype: 'fieldset',
							margin: '0 0 0 5',
							padding: '10 10 10 10',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox'
									},
									defaults: {
										margin: '0 0 5 0',
										labelAlign: 'right',
										flex: 1,
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vesselCode'),
											labelWidth: 70,
											editable: false,
											bind: '{theVsl.vslCd}'
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('sa'),
											labelWidth: 50,
											flex: 0.9,
											editable: false,
											bind: '{theVsl.arrvSaId}'
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('berthingLoc'),
											labelWidth: 70,
											editable: false,
											bind: '{theVsl.berthLoc}'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										margin: '0 0 5 0',
										labelAlign: 'right',
										
									flex: 1,
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vesselName'),
											labelWidth: 70,
											editable: false,
											bind: '{theVsl.vslNm}'
										},
										{
											xtype: 'datetimefield',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											reference: 'dtEta',
											flex: 0.9,
											fieldLabel: ViewUtil.getLabel('eta'),
											labelWidth: 50,
											readOnly: true,
											bind: '{theVsl.eta}'
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('storageLoc'),
											labelWidth: 70,
											editable: false
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										margin: '0 0 0 0',
										labelAlign: 'right',
										flex: 1,
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('voyage'),
											labelWidth: 70,
											editable: false,
											bind: '{theVsl.voyage}'
										},
										{
											xtype: 'datetimefield',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											reference: 'dtEtd',
											flex: 0.9,
											fieldLabel: ViewUtil.getLabel('etd'),
											labelWidth: 50,
											readOnly: true,
											bind: '{theVsl.etd}'
										},
										{
											xtype: 'datetimefield',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											reference: 'dtEtw',
											fieldLabel: ViewUtil.getLabel('etw'),
											labelWidth: 70,
											readOnly: true,
											bind: '{theVsl.etw}'
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'container',
					margin: '0 5 0 5',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelAlign: 'right'
					},
					items: [
						{
							xtype: 'container',
							flex: 2,
							layout: {
								type: 'vbox',
								align: 'stretch',
								pack: 'center'
							},
							items: [
								{
									xtype: 'container',
									width: '100%',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										flex: 3
									},
									items: [
										{
											xtype: 'datefield',
											labelWidth: 50,
											reference: 'ctlDetailMegaWorkYmd',
											format: MOST.config.Locale.getShortDate(),
											fieldLabel: ViewUtil.getLabel('date'),
											bind: '{theMain.workYmd}'
										},
										{
											xtype: 'combobox',
											labelWidth: 50,
											reference: 'ctlDetailMegaShift',
											fieldLabel: 'Shift',
											queryMode: 'local',
											bind: {
												store: '{megaDetailShiftCombo}',
												value: '{theMain.shftId}'
											},
											allowBlank: false,
											emptyText: ViewUtil.getLabel('select'),
											displayField: 'shftNm',
											valueField: 'shftId',
											value: '',
											listeners: {
												change: 'onShiftChange'
											}
										}, 
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('refNo'),
											labelWidth: 50,
											editable: false,
											bind: '{theMain.refNo}'
										},
										{
											xtype: 'label',
											reference: 'ctlSubmitLabel',
											flex: 1,
											border: 5,
											padding: '5 0 0 5',
											width: 50,
											text: '[Submit]'
										},
									]
								}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch',
								pack: 'end'
							},
							items: [
								{
									xtype: 'container',
									reference: 'ctlApprovalContainer',
									activeItem: 6,
									layout: 'card',
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch',
												pack: 'center'
											},
											items: [
												{
													xtype: 'container',
													layout: {
														type: 'hbox',
														align: 'stretch',
														pack: 'end'
													},
													items: [
														{
															xtype: 'button',
															reference: 'refBtnSubmitMega',
															width: 120,
															text: ViewUtil.getLabel('submitMega'),
															listeners: {
																click: 'onSubmitMega'
															}
														}
													]
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch',
												pack: 'center'
											},
											items: [
												{
													xtype: 'container',
													defaults: {
														margin: '0 0 0 5'
													},
													layout: {
														type: 'hbox',
														align: 'stretch',
														pack: 'end'
													},
													items: [
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('resubmitMega'),
															listeners: {
																click: 'onSubmitMega'
															}
														},
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('cancelMega'),
															listeners: {
																click: 'onCancelMega'
															}
														}
													]
												}
											]
										},
										{
											xtype: 'container',
											items: [
												{
													xtype: 'container',
													defaults: {
														margin: '0 0 5 5'
													},
													layout: {
														type: 'hbox',
														align: 'stretch',
														pack: 'end'
													},
													items: [
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('resubmitMega'),
															listeners: {
																click: 'onResubmitMega'
															}
														},
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('cancelMega'),
															listeners: {
																click: 'onCancelMega'
															}
														}
													]
												},
												{
													xtype: 'container',
													defaults: {
														margin: '0 0 0 5'
													},
													layout: {
														type: 'hbox',
														align: 'stretch',
														pack: 'end'
													},
													items: [
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('approvalMega'),
															cls: 'search-button',
															listeners: {
																click: 'onApprovalMega'
															}
														},
														{
															xtype: 'button',
															width: 120,
															cls: 'search-button',
															text: ViewUtil.getLabel('rejectMega'),
															listeners: {
																click: 'onRejectMega'
															}
														}
													]
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch',
												pack: 'center'
											},
											items: [
												{
													xtype: 'container',
													defaults: {
														margin: '0 0 0 5'
													},
													layout: {
														type: 'hbox',
														align: 'stretch',
														pack: 'end'
													},
													items: [
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('cancelMega'),
															listeners: {
																click: 'onCancelMega'
															}
														},
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('amendMega'),
															listeners: {
																click: 'onAmendMega'
															}
														}
													]
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch',
												pack: 'center'
											},
											items: [
												{
													xtype: 'container',
													defaults: {
														margin: '0 0 0 5'
													},
													layout: {
														type: 'hbox',
														align: 'stretch',
														pack: 'end'
													},
													items: [
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('approvalMega'),
															listeners: {
																click: 'onApprovalMega'
															}
														},
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('rejectMega'),
															listeners: {
																click: 'onRejectMega'
															}
														}
													]
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch',
												pack: 'center'
											},
											items: [
												{
													xtype: 'container',
													defaults: {
														margin: '0 0 0 5'
													},
													layout: {
														type: 'hbox',
														align: 'stretch',
														pack: 'end'
													},
													items: [
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('approvalCanceledMega'),
															listeners: {
																click: 'onApprovalCancellationMega'
															}
														},
														{
															xtype: 'button',
															width: 120,
															text: ViewUtil.getLabel('rejectCanceledMega'),
															listeners: {
																click: 'onRejectCancellationMega'
															}
														}
													]
												}
											]
										},
										{
											xtype: 'container'
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'container',
					flex: 1,
					margin: '5 5 5 5',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'tabpanel',
							reference: 'ctlMegaDetailTabPanel',
							deferredRender: false, //all tab load
							flex: 1,
							listeners: {
								tabchange: 'onTabChange'
							},
							activeTab: 0,
							items: [
								{ // Vessel Schedule
									xtype: 'container',
									title: ViewUtil.getLabel('vesselSchedule'),
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabvesselschedule',
											reference: 'refMegaDetailTabVesselSchedule',
											flex: 1
										}
									]
								},
								{
									xtype: 'container',
									title: ViewUtil.getLabel('stevedore'),
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabstevedore',
											reference: 'refMegaDetailTabStevedore',
											flex: 1
										}
									]
								},
								{
									xtype: 'container',
									title: ViewUtil.getLabel('trimming'),
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabtrimming',
											reference: 'refMegaDetailTabTrimming',
											flex: 1
										}
									]
								},
								{
									xtype: 'container',
									title: ViewUtil.getLabel('gears'),
									layout: { type: 'vbox', align: 'stretch' },
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabgears',
											reference: 'refMegaDetailTabGears',
											flex: 1
										}
									]
								},
								{
									xtype: 'container',
									title: ViewUtil.getLabel('forklift'),
									layout: { type: 'vbox', align: 'stretch' },
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabforklift',
											reference: 'refMegaDetailTabForklift',
											flex: 1
										}
									]
								},
								{
									xtype: 'container',
									title: ViewUtil.getLabel('trailer'),
									layout: { type: 'vbox', align: 'stretch' },
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabtrailer',
											reference: 'refMegaDetailTabTrailer',
											flex: 1
										}
									]
								},
								{
									xtype: 'container',
									title: ViewUtil.getLabel('mechanical'),
									layout: { type: 'vbox', align: 'stretch' },
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabmechanical',
											reference: 'refMegaDetailTabMechanical',
											flex: 1
										}
									]
								},
								{
									xtype: 'container',
									title: ViewUtil.getLabel('portCrane'),
									layout: { type: 'vbox', align: 'stretch' },
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabportcrane',
											reference: 'refMegaDetailTabPortCrane',
											flex: 1
										}
									]
								},
								{
									xtype: 'container',
									title: ViewUtil.getLabel('cargoDetail'),
									layout: { type: 'vbox', align: 'stretch' },
									scrollable: 'both',
									items: [
										{
											xtype: 'app-megadetailtabcargodetail',
											reference: 'reMegadetailtabcargodetail',
											flex: 1
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