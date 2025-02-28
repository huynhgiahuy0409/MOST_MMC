Ext.define('MOST.view.planning.megadetail.MegaDetailTabVesselSchedule', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megadetailtabvesselschedule',
	
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
					margin: '5 0 0 0',
					flex: 1,
					defaults: {
						margin: '5 5 0 5'
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'radiofield',
							name: 'itmVsselScheduleLoc',
							reference: 'ctlMegaDetailHatchRadio',
							inputValue: 'HTC',
							boxLabel: ViewUtil.getLabel('hatch'),
						},
						{
							xtype: 'textfield',
							reference: 'ctlMegaDetailWorkHatchNo',
							bind: '{theMain.workHatchNo}',
							editable: false
						},
						{
							xtype: 'radiofield',
							name: 'itmVsselScheduleLoc',
							reference: 'ctlMegaDetailWarehouseRadio',
							inputValue: 'WHO',
							boxLabel: ViewUtil.getLabel('warehouse'),
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 0',
								labelAlign: 'right',
								labelWidth: 25
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'combo',
									editable: false,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('sn'),
									reference: 'ctlMegaDetailSn',
									bind: {
										store: '{megaDetailVesselScheduleSn}',
										value: '{theMain.shipgNoteNo}'
									},
									queryMode: 'local',
									displayField: 'shipgNoteNo',
									valueField: 'shipgNoteNo',
									listeners: {
										change: 'onChangeShipgNoteNo'
									}
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 0',
								labelAlign: 'right',
								labelWidth: 25
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'combo',
									editable: false,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('do'),
									reference: 'ctlMegaDetailDo',
									bind: {
										store: '{megaDetailVesselScheduleDo}',
										value: '{theMain.dono}'
									},
									queryMode: 'local',
									displayField: 'dono',
									valueField: 'dono',
									listeners: {
										change: 'onChangeDeliveryNo'
									}
								}
							]
						}
					]
				},
		        {
		            xtype: 'container',
					margin: '5 0 0 0',
		            flex: 2,
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    height: 155,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            flex: 1,
		                            defaults: {
		                                margin: '5 5 0 5'
		                            },
		                            layout: {
		                                type: 'vbox',
		                                align: 'stretch'
		                            },
		                            items: [
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
													xtype: 'cmmcdfield',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('commodity'),
													reference: 'ctlDetailCommodity',
													params: {
														searchType: 'CMDT'
													},
													bind: {
														value: '{theMain.cmdt}'
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
													xtype: 'textfield',
													flex: 2,
													editable: false,
													fieldLabel: ViewUtil.getLabel('cmdtGrp'),
													reference: 'ctlDetailCommodityGroupCd',
													bind: {
														value: '{theMain.cmdtGrCd}'
													}
												},
												{
													xtype: 'textfield',
													flex: 1,
													editable: false,
													reference: 'ctlDetailCommodityGroup',
													bind: {
														value: '{theMain.cmdtGr}'
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
		                                            xtype: 'combobox',
		                                            flex: 1,
		                                            fieldLabel: ViewUtil.getLabel('cargoType'),
		                                            reference: 'ctlDetailCgTpCd',
		        		           					queryMode: 'local',
		        		           					bind: {
		        		            	    			store: '{megaDetailCargoTypeCombo}',
		        		            	    			value: '{theMain.cgTpCd}'
		        		            	    		},
		        		           					displayField: 'scdNm',
		        		           					valueField: 'scd',
		        		           					value : ''
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
													flex: 1,
													fieldLabel: ViewUtil.getLabel('cargoTonnage'),
													reference: 'ctlDetailCargoTonnage',
													minValue: 0,
													maxValue: 9999999999,
													selectOnFocus: true,
													bind: '{theMain.wgt}'
												},
												{
													xtype: 'label',
													margin: '5 0 0 5',
													text: ViewUtil.getLabel('mt'),
												}
											]
										}
		                            ]
		                        },
								{
									xtype: 'container',
									flex: 1,
									padding: '0 0 0 0',
									defaults: {
										margin: '5 0 0 0'
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'container',
											defaults: {
												margin: '0 5 0 5',
												labelAlign: 'right',
												labelWidth: 120
											},
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'usertypefield',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('requester'),
													bind: { value: '{theMain.reqr}' },
													reference: 'ctlDetailRequester',
													//editableControl: false
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
													xtype: 'textfield',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('requestCompany'),
													bind: '{theMain.reqComp}',
													editable: false
												},
												{
													xtype: 'container',
													width: 0
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
													xtype: 'datetimefield',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													flex: 1,
													fieldLabel: ViewUtil.getLabel('requestedDate'),
													bind: '{theMain.reqDt}',
													readOnly: true
												},
												{
													xtype: 'container',
													width: 0
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
													xtype: 'textfield',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('approvedby'),
													bind: '{theMain.appr}',
													editable: false
												},
												{
													xtype: 'container',
													width: 0
												}
											]
										}
									]
								}
		                    ]
		                },
						{
							xtype: 'container',
							defaults: {
								margin: '0 5 0 5',
								labelAlign: 'right',
								labelWidth: 100
							},
							margin: '0 0 0 0',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									text: ViewUtil.getLabel('remark'),
								},
								{
									xtype: 'textareafield',
									reference: 'ctlDetailRemark',
									bind: '{theMain.rmk}'
								}
							]
						},
						{
							xtype: 'container',
							margin: '5 0 0 0',
							reference: 'ctlDetailRejectMessage',
							defaults: {
								margin: '0 5 0 5',
								labelAlign: 'right',
								labelWidth: 100
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									height: 20,
									text: ViewUtil.getLabel('csc_remark'),
								},
								{
									xtype: 'textareafield',
									reference: 'ctlDetailRejectRemark',
									bind: '{theMain.rejRmk}'
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