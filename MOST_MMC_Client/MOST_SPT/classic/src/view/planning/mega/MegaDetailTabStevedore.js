Ext.define('MOST.view.planning.megadetail.MegaDetailTabStevedore', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megadetailtabstevedore',
	
	requires: [
	],
	
	flex:1,
	
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'container',
		            layout: {
		                type: 'vbox'
		            },
		            flex: 1,
		            defaults: {
		                margin: '5 0 0 30',
		                labelAlign: 'right',
		                labelWidth: 100,
						width: '100%'
		            },
		            items: [
						{
							xtype: 'label',
							text: ViewUtil.getLabel('breakBulk'),
							style: 'display:inline-block; text-align:center'
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'partnercdfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('stevedoreCompany'),
									bind: { value: '{theStevedore.stvdComp}' },
									reference: 'ctlDetailMegaStedoreCompany',
									params: {
										ptnrType: CodeConstants.MT_PTNRTP_STV
									}
								}
							]
		                },
		                {
		                    xtype: 'container',
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 120
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'workingareamultifield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('workingArea'),
		                            bind:{
		                            	value : '{theStevedore.locId}'
		                            },
		                            reference: 'ctlStevedoreWorkingArea'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 120, 
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                        	xtype: 'numberfield',
									flex: 2,
		                            minValue : 0,
		                        	maxValue: 23,
		                        	selectOnFocus : true,
		                            fieldLabel: ViewUtil.getLabel('reqTime'),
		                            reference: 'ctlStvReqHh',
		                            bind:'{theStevedore.reqTime}'
		                        },
		                        {
		                        	xtype: 'numberfield',
									flex: 1,
		                            minValue : 0,
		                        	maxValue: 59,
		                        	reference: 'ctlStvReqMm',
		                        	selectOnFocus : true,
		                            bind:'{theStevedore.reqMin}'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 120
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
								{
									xtype: 'numberfield',
									width: '100%',
									minValue: 0,
									maxValue: 999999999,
									reference: 'ctlDetailMegaStedoreNosofGang',
									fieldLabel: ViewUtil.getLabel('nosofGang'),
									bind: '{theStevedore.nofGang}'
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
		                        align: 'stretch'
		                    },
		                    items: [
								{
									xtype: 'container',
									width: 120,
									layout: {
										type: 'hbox',
										align: 'stretch',
										pack: 'end'
									}, 
									items: [
										{
											xtype: 'label',
											height: 30,
											margin: '-3 0 0 0',
											html: 'Lashing/Unlashing<br/>Choking Company',
											text: '',
										}
									]
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'partnercdfield',
											flex: 1,
											bind: { value: '{theLashing.stvdComp}' },
											reference: 'ctlDetailMegaStedoreLashingCompany',
											params: {
												ptnrType: CodeConstants.MT_PTNRTP_STV
											}
										}
									]
								}
		                    ]
		                },
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'workingareamultifield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('workingArea'),
									bind: {
										value: '{theLashing.locId}'
									},
									reference: 'ctlDetailMegaStevedoreLashingWorkingArea'
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'numberfield',
									flex: 2,
									minValue: 0,
									maxValue: 23,
									selectOnFocus: true,
									reference: 'ctlLshRegHh',
									fieldLabel: ViewUtil.getLabel('reqTime'),
									bind: '{theLashing.reqTime}'
								},
								{
									xtype: 'numberfield',
									flex: 1,
									minValue: 0,
									maxValue: 59,
									selectOnFocus: true,
									reference: 'ctlLshRegMm',
									bind: '{theLashing.reqMin}'
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'numberfield',
									width: '100%',
									minValue: 0,
									maxValue: 999999999,
									reference: 'ctlDetailMegaStedoreLashingNosofGang',
									fieldLabel: ViewUtil.getLabel('nosofGang'),
									bind: '{theLashing.nofGang}',
									editable: false
								}
							]
						}
		            ]
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
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox'
		                    },
		                    items: [
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										margin: '5 0 0 5',
										labelAlign: 'right',
										labelWidth: 120
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('additional'),
											style: 'text-align:center;'
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('supervisor'),
											minValue: 0,
											maxValue: 999999999,
											bind: '{theStevedore.nofStvdSprr}',
											reference: 'ctlDetailMegaStevedoreNofStvdSprr'
										},
										{
											xtype: 'numberfield',
											minValue: 0,
											maxValue: 999999999,
											fieldLabel: ViewUtil.getLabel('winchMen'),
											bind: '{theStevedore.nofWchmn}',
											reference: 'ctlDetailMegaStevedoreNofWchmn',
											listeners: {
												change: 'winchMenAndGeneralWorkerChange'
											}
										},
										{
											xtype: 'numberfield',
											minValue: 0,
											maxValue: 999999999,
											fieldLabel: ViewUtil.getLabel('generalWorkers'),
											bind: '{theStevedore.nofStvdGwker}',
											reference: 'ctlDetailMegaStevedoreNoStvdGwker',
											listeners: {
												change: 'winchMenAndGeneralWorkerChange'
											}
										}
									]
								}, 
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    defaults: {
		                        margin: '5 0 0 0'
		                    },
		                    layout: {
		                        type: 'vbox'
		                    },
		                    items: [
								{
									xtype: 'container',
									width: '100%',
									defaults: {
										margin: '0 0 0 5',
										labelAlign: 'right',
										labelWidth: 120
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'partnercdfield',
											width: '100%',
											bind: { value: '{theTally.stvdComp}' },
											reference: 'ctlDetailMegaStedoreTallyCompany',
											fieldLabel: ViewUtil.getLabel('tallyCompany'),
											params: {
												ptnrType: CodeConstants.CM_PTNRTP_TLY
											}
										}
									]
								},
								{
									xtype: 'container',
									width: '100%',
									defaults: {
										margin: '0 0 0 5',
										labelAlign: 'right',
										labelWidth: 120
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'workingareamultifield',
											reference: 'ctlWorkingAreaTally',
											width: '100%',
											fieldLabel: ViewUtil.getLabel('workingArea'),
											bind: {
												value: '{theTally.locId}'
											}
										}
									]
								},
								{
									xtype: 'container',
									width: '100%',
									defaults: {
										margin: '0 0 0 5',
										labelAlign: 'right',
										labelWidth: 120
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'numberfield',
											minValue: 0,
											maxValue: 23,
											selectOnFocus: true,
											flex: 2,
											reference: 'ctlTallyRegHh',
											fieldLabel: ViewUtil.getLabel('reqTime'),
											bind: '{theTally.reqTime}'
										},
										{
											xtype: 'numberfield',
											flex: 1,
											minValue: 0,
											maxValue: 59,
											selectOnFocus: true,
											bind: '{theTally.reqMin}'
										}
									]
								}
		                    ]
		                },
						{
							xtype: 'container',
							reference: 'ctlCrewContainer',
							activeItem: 0,
							layout: 'card',
							items: [
								{
									xtype: 'container',
									reference: 'ctlMegaDetailStrevdoreCrewBlankContainer',
									flex: 1,
									defaults: {
										margin: '5 5 0 5',
										labelAlign: 'right',
										labelWidth: 120
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
									]
								},
								{
									xtype: 'container', 
									reference: 'ctlMegaDetailStrevdoreCrewVslOprContainer',
									hidden: true,
									flex: 1,
									defaults: {
										margin: '5 0 0 5',
										labelAlign: 'right',
										labelWidth: 120
									},
									layout: {
										type: 'vbox'
									},
									items: [
										{
											xtype: 'checkboxfield',
											margin: '5 0 0 70',
											reference: 'ctlMegaDetailStevedoreShipCrew',
											boxLabel: ViewUtil.getLabel('shipCrew'),
											boxLabelAlign: 'before', 
											bind: '{shipClewYnChecked}'
										},
										{
											xtype: 'container',
											defaults: { 
												labelAlign: 'right',
												labelWidth: 120
											},
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'workingareamultifield',
													reference: 'ctlWorkingAreaVesselOperation',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('workingArea'),
													bind: {
														value: '{theCrew.locId}'
													}
												}
											]
										},
										{
											xtype: 'container',
											width: '100%',
											defaults: {
												labelAlign: 'right',
												labelWidth: 120
											},
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'numberfield',
													minValue: 0,
													maxValue: 23,
													selectOnFocus: true,
													flex: 2,
													reference: 'ctlVesselOperationRegHh',
													fieldLabel: ViewUtil.getLabel('reqTime'),
													bind: '{theCrew.reqTime}'
												},
												{
													xtype: 'numberfield',
													margin: '0 0 0 5',
													minValue: 0,
													maxValue: 59,
													selectOnFocus: true,
													flex: 1,
													bind: '{theCrew.reqMin}'
												}
											]
										}
									]
								},
								{
									xtype: 'container',
									width: '100%',
									reference: 'ctlMegaDetailStrevdoreCrewWhOprContainer',
									hidden: true,
									defaults: {
										margin: '5 0 0 5',
										labelAlign: 'right', 
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'numberfield',
											flex: 1.5,
											minValue: 0,
											maxValue: 9999999999,
											align: 'right',
											selectOnFocus: true,
											fieldLabel: ViewUtil.getLabel('oprSupervisor'),
											labelWidth: 120,
											bind: '{theStevedore.nofOprSprr}'
										},
										{
											xtype: 'numberfield',
											flex: 1,
											minValue: 0,
											maxValue: 9999999999,
											align: 'right',
											selectOnFocus: true,
											fieldLabel: ViewUtil.getLabel('oprClerk'),
											labelWidth: 50,
											bind: '{theStevedore.nofOprClerk}'
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
					defaults: {
						margin: '5 0 0 5',
						labelAlign: 'right',
						labelWidth: 120,
						width: '100%'
					}, 
					layout: {
						type: 'vbox',
					},
					items: [
						{
							xtype: 'label',
							text: ViewUtil.getLabel('summary'),
							style: 'display:inline-block; text-align:center'
						},
						{
							xtype: 'numberfield',
							minValue : 0,
							maxValue: 999999999,
							fieldLabel: ViewUtil.getLabel('supervisor'),
							readOnly:true,
							bind:'{theStevedore.nofStvdSprr}'
						},
						{
							xtype: 'numberfield',
							minValue : 0,
							maxValue: 999999999,
							fieldLabel: ViewUtil.getLabel('nonTonnage'),
							bind:'{theStevedore.stvdNonTon}',
							readOnly:true
						}
					]
				},
			]
		});
		
		me.callParent();
	}
});