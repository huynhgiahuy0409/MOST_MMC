Ext.define('MOST.view.planning.SpaceMovementPlanDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-spacemovementplandetail',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.button.Button',
		'Ext.form.Label',
		'Ext.form.field.Checkbox',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	width: 1200,
	height: 800,
	scrollable: true,

	listeners: {
		afterrender: 'onDetailLoad'
	},

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					title: "",
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 5 0 5',
					padding: '10 10 10 10',
					items: [
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('spaceMovementRequestReqNo'),
									bind: '{theDetail.reqNo}',
									readOnly: true,
									reference: 'cttReqNo'
								},
								{
									xtype: 'partnercdtypefield',
									reference: 'ctlRequester',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('spaceMovementRequestReqr'),
									bind: {
										value: '{theDetail.reqr}'
									},
									editableControl: true,
									params: {
										searchModule: CodeConstants.LCD_MOST
									}
								},
								{
									xtype: 'textfield',
									reference: 'ctlRequesterNm',
									margin: '0 0 0 5',
									flex: 2,
									bind: '{theDetail.reqrNm}',
									readOnly: true,
								}
							]
						},
						{
							xtype: 'container',
							margin: '5 0 0 0',
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								flex: 1,
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									reference: 'ctlStatus',
									fieldLabel: ViewUtil.getLabel('spaceMovementRequestStatNm'),
									readOnly: true,
									bind: '{theDetail.statNm}'
								},
								{
									xtype: 'partnercdtypefield',
									reference: 'ctlPayer',
									fieldLabel: ViewUtil.getLabel('payer'),
									bind: { value: '{theDetail.payer}' },
									editableControl: true,
									params: {
										searchModule: CodeConstants.LCD_MOST
									}
								},
								{
									xtype: 'textfield',
									reference: 'ctlPayerNm',
									margin: '0 0 0 5',
									flex: 2,
									bind: '{theDetail.payerNm}',
									readOnly: true,
								}
							]
						},
					]
				},
				{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('vesselCargo'),
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					margin: '0 5 0 5',
					padding: '0 10 5 10',
					defaults: {
						flex: 1
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
										margin: '0 0 5 0'
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'shipcallnofield',
											reference: 'ctlDetailScn',
											emptyText: ViewUtil.getLabel('shipCallNo'),
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											bind: {
												value: '{theDetail.scn}',
											},
										},
										{
											xtype: 'vesselcalllistnolabel',
											reference: 'ctlJpvc',
											fieldLabel: ViewUtil.getLabel('vessel'),
											bind: {
												value: '{theDetail.vslCallId}'
											},
											emptyText: ViewUtil.getLabel('vessel'),
											allowBlank: false
										},
										{
											xtype: 'textfield',
											reference: 'ctlVesselName',
											fieldLabel: ViewUtil.getLabel('vesselname'),
											bind: '{theDetail.vslNm}',
											readOnly: true
										},
									]
								},
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container', 
									reference: 'blInfoContainer',
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
										margin: '0 0 5 0',
										readOnly: true,
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refZBNo',
											fieldLabel: ViewUtil.getLabel('zbNo'),
											bind: '{theDetail.zbNo}',
											editable: false,
										},
										{
											xtype: 'combo',
											reference: 'ctlMasterBL',
											fieldLabel: ViewUtil.getLabel('spaceMovementSummaryMasterBL'),
											queryMode: 'local',
											bind: {
												store: '{masterBLCombo}',
												value: '{theDetail.masterBL}'
											},
											listeners: {
												select: 'onSelectedMfDocId'
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											editable: true,
											forceSelection: true
										},
										{
											xtype: 'combo',
											reference: 'ctlBlVessel',
											fieldLabel: ViewUtil.getLabel('spaceMovementSummarySubBL'),
											queryMode: 'local',
											bind: {
												store: '{blCombo}',
												value: '{theDetail.blNo}'
											},
											listeners: {
												select: 'onSelectBLNo'
											},
											displayField: 'blNo',
											valueField: 'blNo',
											editable: true,
											forceSelection: true,
											documentType: 'BL'
										},
										{
											xtype: 'combobox',
											reference: 'refSearchDONo',
											fieldLabel: ViewUtil.getLabel('doNo'),
											queryMode: 'local',
											bind: {
												store: '{doCombo}',
												value: '{theDetail.doNo}'
											},
											displayField: 'doNo',
											valueField: 'doNo',
											editable: true,
											forceSelection: true
										},
									]
								},
							]
						},
						{
							xtype: 'container',
							reference: 'shipgNoteInfoContainer',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
										margin: '0 0 5 0',
										readOnly: true,
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refZBStatus',
											fieldLabel: ViewUtil.getLabel('zbStatus'),
											bind: '{theDetail.zbStatus}',
											editable: false,
										},
										{
											xtype: 'combo',
											reference: 'ctlBookingNo',
											fieldLabel: ViewUtil.getLabel('spaceMovementSummaryBookingNo'),
											queryMode: 'local',
											bind: {
												store: '{bookingNoCombo}',
												value: '{theDetail.bookingNo}'
											},
											listeners: {
												select: 'onSelectedMfDocId'
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											editable: true,
											forceSelection: true
										},
										{
											xtype: 'combo',
											reference: 'ctlSnVessel',
											fieldLabel: ViewUtil.getLabel('sn'),
											bind: {
												store: '{snCombo}',
												value: '{theDetail.shipgNoteNo}'
											},
											displayField: 'shipgNoteNo',
											valueField: 'shipgNoteNo',
											listeners: {
												select: 'onSelectSNNo'
											},
											queryMode: 'local',
											editable: true,
											forceSelection: true,
											documentType: 'SN'
										},
										{
											xtype: 'combobox',
											reference: 'refSearchGrNo',
											fieldLabel: ViewUtil.getLabel('LAGRNo'),
											bind: {
												store: '{goodsReceiptCombo}',
												value: '{theDetail.grNo}'
											},
											displayField: 'grNo',
											valueField: 'grNo',
											queryMode: 'local',
											editable: true,
											forceSelection: true
										},
									]
								},
							]
						},
						{
							xtype: 'container',
							reference: 'otherCargoInfoContainer',
							flex: 1.1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 100,
								width: '100%',
								margin: '5 0 0 0'
							},
							items: [
								{
									xtype: 'container',
									margin: '0 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'ctlCommodityGroup',
											fieldLabel: ViewUtil.getLabel('spaceMovementPlanCommodityGroup'),
											bind: '{theDetail.cmdtGrpNm}',
											editable: false,
											flex: 1
										},
										{
											xtype: 'checkbox',
											reference: 'chkIsNotPlanned',
											boxLabel: ViewUtil.getLabel('spaceMovementPlanChkIsNotPlanned'),
											bind: {
												value: '{theDetail.isNotPlanned}'
											},
											width: 90,
											margin: '0 0 0 5',
											hidden: true
										},
									]
								},
								{
									xtype: 'textfield',
									labelAlign: 'right',
									labelWidth: 100,
									reference: 'ctlLotNo',
									fieldLabel: ViewUtil.getLabel('lotNo'),
									bind: '{theDetail.lotNo}',
									fieldStyle: 'text-transform: uppercase',
									editable: false,
								},
								{
									xtype: 'textfield',
									reference: 'ctlPod',
									labelAlign: 'right',
									labelWidth: 100,
									fieldLabel: ViewUtil.getLabel('spaceMovementPlanPod'),
									bind: '{theDetail.pod}',
									editable: false,
								},
								{
									xtype: 'textfield',
									reference: 'ctlShpCns',
									fieldLabel: ViewUtil.getLabel('shipperConsignee'),
									bind: '{theDetail.cngShp}',
									editable: false,
								},
							]
						},
					]
				},
				{
					xtype: 'container',
					margin: '5 5 0 0',
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'end'
					},
					items: [
						{
							xtype: 'button',
							reference: 'btnDetailRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							width: 100,
							listeners: {
								click: 'onRetrieve'
							},
							hidden: true
						},
					]
				},
				{
					xtype: 'fieldset',
					padding: '10 10 10 10',
					margin: '0 5 0 5',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							reference: 'requestAreaAndTimeContainer',
							flex: 1,
							padding: '0 5 0 0',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelWidth: 80,
								labelAlign: 'right',
								editable: false
							},
							items: [
								{
									xtype: 'combobox',
									reference: 'ctlRequestTp',
									fieldLabel: ViewUtil.getLabel('spaceMovementRequestReqTpNm'),
									bind: {
										store: '{spaceMovementRequestTypeCombo}',
										value: '{theDetail.reqTpCd}',
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									allowBlank: false,
									forceSelection: true,
									readOnly: true
								},
								{
									xtype: 'combobox',
									reference: 'ctlSpaceMovementRequestDetailMvTp',
									visible: false,
									bind: {
										store: '{spaceMovementRequestTypeExtraCombo}',
										value: '{theDetail.mvTp}'
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd'
								}
							]
						},
						{
							xtype: 'container',
							flex: 1.5,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								width: '100%',
								margin: '5 0 0 0'
							},
							items: [
								{
									xtype: 'container',
									margin: '0 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 75
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlAreaLocation',
											fieldLabel: ViewUtil.getLabel('location'),
											flex: 1,
											bind: {
												store: '{locationCombo}',
												value: '{theDetail.reqPos}'
											},
											listeners: {
												select: 'onSelectLocation'
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											allowBlank: false,
											forceSelection: true,
											editable: false
										},
										{
											xtype: 'button',
											reference: 'refBtnTerminalView',
											iconCls: 'x-fa fa-search',
											margin: '0 5 0 5',
											listeners: {
												click: 'onOpenTerminalView'
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
									items: [
										{
											xtype: 'textfield',
											reference: 'ctlAreaCell',
											fieldLabel: ViewUtil.getLabel('confirmMovementSetLocation'),
											labelAlign: 'right',
											labelWidth: 75,
											flex: 1,
											bind: {
												value: '{theDetail.planLocId}'
											},
											editable: false
										},
										{
											xtype: 'button',
											reference: 'refBtnAreaCell',
											itemId: 'areaCellButton',
											iconCls: 'x-fa fa-search',
											margin: '0 5 0 5',
											listeners: {
												click: 'onCellLocBtnClicked'
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
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('areaSize'),
											style: "text-align:right",
											margin: '5 5 0 0',
											width: 75
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
													xtype: 'textfield',
													reference: 'ctlAreaM2',
													flex: 1,
													readOnly: true,
													bind: {
														value: '{theDetail.reqM2}'
													},
													maskRe: /[0-9.]/
												},
												{
													xtype: 'label',
													margin: '5 0 0 5',
													width: 31,
													text: ViewUtil.getLabel('spaceMovementRequestReqM2'),
													style: "text-align:center"
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
											items: [
												{
													reference: 'ctlAreaMT',
													xtype: 'textfield',
													flex: 1,
													fieldLabel: "",
													bind: {
														value: '{theDetail.reqMt}'
													},
													readOnly: true,
													maskRe: /[0-9.]/
												},
												{
													xtype: 'label',
													width: 31,
													margin: '5 0 0 5',
													text: ViewUtil.getLabel('LAMT'),
													style: "text-align:center"
												}
											]
										},
									]
								},
							]
						},
						{
							xtype: 'container',
							flex: 1.5,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 60
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'datetimefield',
											flex: 1,
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('spaceMovementRequestEta'),
											reference: 'ctlEstArrvDt',
											bind: '{theDetail.eta}',
											allowBlank: false,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											listeners: {
												select: 'onSelectDate'
											}
										},
										{
											xtype: 'container',
											flex: 0.75,
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													reference: 'ctlPeriod',
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('spaceMovementRequestPeriod'),
													labelWidth: 40,
													flex: 1,
													labelAlign: 'right',
													bind: {
														value: '{theDetail.period}'
													},
													editable: false
												},
												{
													xtype: 'label',
													margin: '5 0 0 5',
													width: 30,
													text: ViewUtil.getLabel('days'),
												}
											]
										}
									]
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 60
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'datetimefield',
											flex: 1,
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('estDeliveryDate'),
											reference: 'ctlEstDelvDt',
											bind: '{theDetail.svcDt}',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											listeners: {
												select: 'onSelectDate'
											}
										},
										{
											xtype: 'container',
											flex: 0.75
										}
									]
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 60
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											reference: 'ctlRemark',
											xtype: 'textfield',
											flex: 1,
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('remark'),
											bind: '{theDetail.rmk}',
											editable: true
										}
									]
								}
							]
						},
					]
				},
				{
					xtype: 'container',
					margin: '5 0 0 0',
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'end'
					},
					defaults: {
						width: 80,
						margin: '0 5 0 0'
					},
					items: [
						{
							xtype: 'button',
							reference: 'btnUpdate',
							ui: 'update-button',
							iconCls: 'fa fa-check-square-o',
							text: ViewUtil.getLabel('update'),
							listeners: {
								click: 'onUpdateForDetail'
							}
						},
						{
							xtype: 'button',
							reference: 'btnRefresh',
							itemId: 'refreshButton',
							text: ViewUtil.getLabel('refresh'),
							iconCls: 'x-fa fa-refresh',
							disabled: false,
							listeners: {
								click: 'onRefresh'
							}
						},
					]
				},
				{
					xtype: 'tsb-datagrid',
					margin: '5 5 0 5',
					reference: 'refSpaceMovementPlanDetailGrid',
					flex: 1,
					stateful: true,
					stateId: 'stateSpaceMovementPlanDetailGrid',
					usePagingToolbar: false,
					plugins: [
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{spaceMovementPlanDetail}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
						mode: 'MULTI'
					},
					listeners: {
						rowclick: 'onGridRowClick',
						selectionchange: 'onSelectionChange'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('SpaceMovementPlanDetail')
					}
				},
				{
					xtype: 'container',
					margin: '5 5 5 5',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelAlign: 'right',
						labelWidth: 80,
						readOnly: true,
						flex: 1
					},
					items: [
						{
							xtype: 'numberfield',
							reference: 'ctlTotalMT',
							fieldLabel: 'Total MT',
							bind: '{theDetail.totalMT}',
						},
						{
							xtype: 'numberfield',
							reference: 'ctlTotalM3',
							fieldLabel: 'Total M3',
							bind: '{theDetail.totalM3}',
						},
						{
							xtype: 'numberfield',
							reference: 'ctlTotalQty',
							fieldLabel: 'Total Qty',
							bind: '{theDetail.totalQty}',
						},
					]
				},
				{
					xtype: 'container',
					margin: '0 0 5 0',
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'center'
					},
					defaults: {
						width: 80,
						margin: '0 5 0 0',
						bind: {
							disabled: '{theDetail.reqNo !== "" && theDetail.statCd !== "REQ"}'
						},
					},
					items: [ 
						{
							xtype: 'button',
							reference: 'btnConfirm',
							text: ViewUtil.getLabel('confirm'),
							ui: 'create-button',
							iconCls: 'x-fa fa-check',
							listeners: {
								click: 'onConfirm',
							}
						},
						{
							xtype: 'button',
							reference: 'btnReject',
							text: ViewUtil.getLabel('reject'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-ban', 
							listeners: {
								click: 'onReject'
							}
						}
					]
				}
			]
		});

		me.callParent();
	}
});