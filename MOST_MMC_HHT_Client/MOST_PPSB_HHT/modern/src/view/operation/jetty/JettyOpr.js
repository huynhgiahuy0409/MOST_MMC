Ext.define('MOST.view.operation.JettyOpr', {
	extend: 'Ext.Panel',
	alias: 'widget.app-jettyopr',

	requires: [
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'Ext.scroll.Scroller',
		'Ext.layout.overflow.Scroller',
	],

	reference: 'jettyopr',
	itemId: 'jettyopr',

	layout: 'fit',
	shadow: false,
	padding: 0,

	listeners: {
		show: { fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS'] },
	},

	items: [
		{
			xtype: 'formpanel',
			reference: 'oprDetail',
			padding: 0,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{//Radio Button Jetty Info/Operation
					xtype: 'fieldset',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'fieldset',
							flex: 1,
							margin: 0,
							layout: {
								type: 'hbox',
							},
							items: [
								{
									xtype: 'radiofield',
									reference: 'refJettyOprListRadiofield',
									name: 'jettyOpr',
									value: 'LIST',
									label: 'Jetty Info',
									labelAlign: 'right',
									labelTextAlign: 'left',
									checked: true,
													listeners:{
														check: 'onTblCargoRaidoChange'
													},
								},
								{
									xtype: 'radiofield',
									reference: 'refJettyOprRadiofield',
									name: 'jettyOpr',
									value: 'OPERATION',
									label: 'Jetty Operation',
									labelAlign: 'right',
									labelTextAlign: 'left',
													listeners:{
														check: 'onTblCargoRaidoChange'
													},
								}
							]
						},
						// {
						// 	xtype: 'fieldset',
						// 	flex: 1,
						// 	layout: {
						// 		type: 'hbox',
						// 		align: 'stretch'
						// 	},
						// 	items: [
						// 		{
						// 			xtype: 'combobox',
						// 			reference: 'refBlSnNoCombo',
						// 			label: 'BL/SN No',
						// 			bind: {
						// 				store: '{blSnComboTbl}',
						// 			},
						// 			listeners: {
						// 				change: 'onBlSnChangedTbl'
						// 			},
						// 			labelAlign: 'left',
						// 			labelTextAlign: 'right',
						// 			labelWidth: 70,
						// 			displayField: 'scdNm',
						// 			valueField: 'scd',
						// 			editable: false,
						// 			allowBlank: true,
						// 			queryMode: 'local',
						// 			required: true,
						// 			disabled: true
						// 		},
						// 	]
						// },
					]
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{//Col1. fieldset (Left part) Jetty Info
							xtype: 'fieldset',
							flex: 1,
							bind: {
								hidden: '{refJettyOprRadiofield.checked}',
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{//Co1(Left part: Jetty Info).Col1 (Detail)
									xtype: 'container',
									layout: 'vbox',
									flex: 1,
									items: [
										{// commodity
											xtype: 'combobox',
											hidden: false,
											reference: 'refCboCmdt',
											placeholder: 'Commodity',
											required: true,
											bind: {
												store: '{cmdtComboTbl}'
												//value: '{theJettyOpr.cmdtCd}',
											},
											listeners: {
												select: 'onCmdtChangedTbl'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local',
											clearable: false,
											typeAhead: true,
											editable: false,
											readonly: true,
										},
										{
											xtype: 'combobox',
											reference: 'refBlSnNoCombo',
											placeholder: 'BL/SN No',
											bind: {
												store: '{blSnComboTbl}',
											},
											listeners: {
												change: 'onBlSnChangedTbl'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											editable: false,
											allowBlank: true,
											queryMode: 'local',
											required: true,
											disabled: true
										},
										{//LD/DS
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'combobox',
													flex: 1,
													reference: 'refCboJobTpCd',
													placeholder: 'LD/DS',
													disabled: true,
													required: true,
													bind: {
														store: '{jobTpCdStore}'
													},
													displayField: 'jobTpCd',
													valueField: 'jobTpCd',
													queryMode: 'local',
													clearable: true,
													typeAhead: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'combobox',
													flex: 1,
													reference: 'refCboCgtpOpr',
													placeholder: 'CGType',
													disabled: true,
													required: true,
													bind: {
														store: '{cgTpStore}'
													},
													displayField: 'cgTpCd',
													valueField: 'cgTpCd',
													queryMode: 'local',
													clearable: true,
													typeAhead: true,
												}
											]
										},
										{//terminalOPR
											xtype: 'combobox',
											labelWidth: '90px',
											reference: 'refCboTkOpr',
											placeholder: 'Terminal OPR',
											required: true,
											disabled: true,
											bind: {
												store: '{tkOprStore}'
											},
											displayField: 'tkOpr',
											valueField: 'tkOpr',
											queryMode: 'local',
											clearable: true,
											typeAhead: true
										},
										{//CNS shipper
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{//shipper
													xtype: 'combobox',
													reference: 'refCboShprCnsne',
													flex: 1,
													placeholder: 'Shipper',
													required: true,
													disabled: true,
													bind: {
														store: '{shprCnsneStore}'
													},
													displayField: 'shprCnsne',
													valueField: 'shprCnsne',
													queryMode: 'local',
													clearable: true,
													typeAhead: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{//Cnsigne
													xtype: 'combobox',
													reference: 'refCboCnsne',
													flex: 1,
													placeholder: 'Cnsigne',
													required: true,
													disabled: true,
													bind: {
														store: '{cnsneStore}'
													},
													displayField: 'cnsne',
													valueField: 'cnsne',
													queryMode: 'local',
													clearable: true,
													typeAhead: true
												}
											]
										},
										{
											xtype: 'combobox',
											reference: 'refCboPkgTpCd',
											placeholder: 'PkgTp',
											required: true,
											disabled: true,
											bind: {
												store: '{pkgTpCdStore}'
											},
											displayField: 'pkgTpCd',
											valueField: 'pkgTpCd',
											queryMode: 'local',
											clearable: true,
											typeAhead: true
										},
										{
											xtype: 'combobox',
											reference: 'refCboLine',
											placeholder: 'Line',
											bind: {
												store: '{lineComboTbl}',
												value: '{theJettyOpr.hoseTpCd}'
											},
											required: true,
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local',
											editable: false,
											clearable: true,
											typeAhead: true
										},
									]
								},
								{
									xtype: 'spacer',
									width: 5,
								},
								{//Co1(Left part: Jetty Info).Col2 (Grid Info: Commodity)
									xtype: 'container',
									flex: 1,
									layout: 'vbox',
									items: [
										{
											xtype: 'container',
											layout: 'hbox',
											flex: 1,
											scrollable: true,
											style: 'border: 1px solid #eeeeee',
											padding: '3 3 3 3',
											margin: '0 0 3 0',
											items: [
												{
													xtype: 'grid',
													reference: 'refGidCS2Info',
													bind: {
														store: '{vorliquidbulkcmdt}'
													},
													listeners: {
														// select: 'onTblSelectCgOpeInf'
													},
													selectable: {
														mode: 'single',
													},
													columns: [
														{
															text: 'CMDT',
															dataIndex: 'cmdtCd',
															width: 80
														},
														{
															text: 'OPE TP',
															dataIndex: 'opeTp',
															width: 60
														},
														{
															text: 'SHIPPER',
															dataIndex: 'shprCnsne',

														},
														{
															text: 'CNSNE',
															dataIndex: 'cnsne',

														},
														{
															text: 'L.PlanMT',
															dataIndex: 'loadPlanMt',
														},
														{
															text: 'L.ActMT',
															dataIndex: 'loadActualMt',
															//width: 60
														},
														{
															text: 'L.Bal',
															type: 'float',
															renderer: function (value, rec, col, cell) {
																var pl = parseFloat(rec.data.loadPlanMt);
																var ac = parseFloat(rec.data.loadActualMt);
																return pl - ac;
															}
														},
														{
															text: 'D.PlanMT',
															dataIndex: 'disPlanMt',
															//width: 60
														},
														{
															text: 'D.ActMT',
															dataIndex: 'disActualMt',
															//width: 60
														},
														{
															text: 'D.Bal',
															type: 'float',
															renderer: function (value, rec, col, cell) {
																var pl = parseFloat(rec.data.disPlanMt);
																var ac = parseFloat(rec.data.disActualMt);
																return pl - ac;
															}
														},
														{
															text: 'TMN OPE',
															dataIndex: 'tkOpr',

														},
														{
															text: 'PGK TP',
															dataIndex: 'pkgTpCd',

														},
													]
												}
											]
										},

										{
											xtype: 'container',
											layout: 'hbox',
											items: [
												{
													xtype: 'numberfield',
													flex: 1,
													placeholder: 'Tonnage',
													minValue: 0,
													maxValue: 999999999,
													defaultValue: 0,
													reference: 'reftxtTonnage',
													required: true,
													bind: {
														value: '{theJettyOpr.tonHdlAmt}'
													},
													ui: 'field-inputcolor',
													listeners: {
														focusleave: 'onChangeTonage'
													}
												},
												{
													xtype: 'spacer',
													width: 3,
												},
												{
													xtype: 'checkbox',
													flex: 1,
													reference: 'refcboCompleteOpr',
													label: { type: 'bundle', key: 'vorCompleted' },
													labelAlign: 'right',
													labelWidth: 90,
													labelTextAlign: 'left',
													//width: 150,
												}
											]

										},
										{
											xtype: 'container',
											//layout: 
											layout: {
												type: 'hbox',
												pack: 'bottom',
											},
											items: [
												{
													xtype: 'numberfield',
													flex: 1,
													placeholder: 'Pump Rate',
													minValue: 0,
													maxValue: 999999999,
													defaultValue: 0,
													reference: 'reftxtPumpRate',
													readOnly: true,
													editable: false,
													ui: 'field-inputcolor',
													bind: {
														value: '{theJettyOpr.pumpRate}'
													}
												},
												{
													xtype: 'spacer',
													width: 3,
												},
												{
													xtype: 'numberfield',
													placeholder: 'Nos.',
													minValue: 0,
													maxValue: 999,
													defaultValue: 0,
													required: true,
													reference: 'reftxtNos',
													ui: 'field-inputcolor',
													bind: {
														value: '{theJettyOpr.lineNumber}'
													}
												}
											]
										},

									]
								}
							]
						},



						{
							//Col2 fieldset (right part) Jetty Operation ============================================
							xtype: 'fieldset',
							flex: 1,
							bind: {
								hidden: '{refJettyOprListRadiofield.checked}',
							},
							layout: {
								type: 'hbox',
								align: 'strecth'
							},
							/*defaults: {
								labelWidth: 120,
								labelAlign: 'left'
							},*/
							items: [
								{	
									xtype: 'container',
									reference: 'jettyOperationLeftContainer',
									layout: 'vbox',
									defaults: {
										flex: 1,
										labelWidth: 90,
										labelAlign: 'left',
										labelTextAlign: 'right'
									},
									flex: 1,
									items: [
										{//LD/DS
											xtype: 'textfield',
											label: 'P.Hoseon',
											disabled: true,
											reference: 'reftxtPrevHoseOnDt',
											inputType: 'text'
										},
										{//
											xtype: 'textfield',
											label: 'P.commc',
											disabled: true,
											reference: 'reftxtPrevCommenceDt',
											inputType: 'text',
											fieldStyle: 'background-color: #2dd238;'
										},
										{//
											xtype: 'textfield',
											label: 'P.Complt',
											disabled: true,
											reference: 'reftxtPrevCompleteDt',
											inputType: 'text'
										},
										{//
											xtype: 'textfield',
											label: 'P.Hose off',
											inputType: 'text',
											reference: 'reftxtPrevHoseOffDt'
										},
										{// commodity
											xtype: 'textfield',
											label: 'OpenType',
											disabled: true,
											value: 'Load/Discharge',
											hidden: true
										}
									]
								},
								{
									xtype: 'spacer',
									width: 5,

								},
								{
									xtype: 'container',
									reference: 'jettyOperationRightContainer',
									layout: 'vbox',
									flex: 1.35,
									items: [
										{//
											xtype: 'datetimelocalfield',
											reference: 'refDtHoseOn',
											label: 'Hose on',
											height: 41,
											labelWidth: 70,
											inputType: 'datetime-local',
											format: 'd/m/Y H:i',
											bind: {
												value: '{theJettyOpr.hoseOnDt}'
											},
											required: false,
											clearable: true,
											typeAhead: true
										},

										{//
											xtype: 'datetimelocalfield',
											reference: 'refDtCommence',
											label: 'Cmmc',
											labelWidth: 70,
											height: 41,
											required: false,
											inputType: 'datetime-local',
											format: 'd/m/Y H:i',
											bind: {
												value: '{theJettyOpr.stDt}'
											},
											clearable: true,
											typeAhead: true
										},
										{//
											xtype: 'datetimelocalfield',
											reference: 'refDtComplete',
											height: 41,
											required: false,
											inputType: 'datetime-local',
											format: 'd/m/Y H:i',
											bind: {
												value: '{theJettyOpr.endDt}'
											},
											clearable: true,
											label: 'Cmplt',
											labelWidth: 70,
										},

										{//
											xtype: 'datetimelocalfield',
											reference: 'refDtHoseOff',
											height: 41,
											inputType: 'datetime-local',
											format: 'd/m/Y H:i',
											bind: {
												value: '{theJettyOpr.hoseOffDt}'
											},
											required: false,
											label: 'Hose off',
											labelWidth: 70,
											clearable: true,
										}
									]
								}
							]
						}
					]
				},

				{
					xtype: 'container',
					layout: 'vbox',
					hidden: true, ///////////////////////////////////////////////
					items: [
						{
							//Title Col:
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '15 0 8 0'
							},
							items: [
								{
									xtype: 'spacer',
									width: '20'
								},
								{
									xtype: 'label',
									html: 'Doc',
									flex: 1
								},
								{
									xtype: 'label',
									html: 'Handled',
									flex: 1
								},
								{
									xtype: 'label',
									html: 'Balance',
									flex: 1
								}
							]
						},
						{//Load
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									html: 'LD',
									width: '20'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									defaultValue: 0,
									disabled: true,
									reference: 'reftxtLDoc',
									flex: 1
								},
								{
									xtype: 'spacer',
									width: 3
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									defaultValue: 0,
									reference: 'reftxtLHandle',
									flex: 1,
									disabled: true
								},
								{
									xtype: 'spacer',
									width: 3
								},
								{
									xtype: 'numberfield',
									maxValue: 999999999,
									defaultValue: 0,
									reference: 'reftxtLBalance',
									disabled: true,
									flex: 1
								}
							]
						},
						{//Bal
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									html: 'DS',
									width: '20'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									defaultValue: 0,
									reference: 'reftxtDDoc',
									flex: 1,
									disabled: true
								},
								{
									xtype: 'spacer',
									width: 3
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									defaultValue: 0,
									reference: 'reftxtDHandle',
									flex: 1,
									disabled: true
								},
								{
									xtype: 'spacer',
									width: 3
								},
								{
									xtype: 'numberfield',
									maxValue: 999999999,
									defaultValue: 0,
									reference: 'reftxtDBalance',
									disabled: true,
									flex: 1
								}
							]
						}
					]
				},
				{// HEALTH ================================================			
					xtype: 'fieldset',
					bind: {
						hidden: '{refJettyOprRadiofield.checked}'
					},
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'label',
							html: 'Health'
						},
						{
							xtype: 'label',
							reference: 'refOGAStatus',
							readOnly: true,
							flex: 1,
							style: 'color: red;text-align:center'
						},
						{
							xtype: 'spacer',
							width: 3
						},
						{
							xtype: 'label',
							reference: 'refOGADate',
							readOnly: true,
							style: 'color: red;text-align:center',
							flex: 1
						},
						{
							xtype: 'spacer',
							flex: 1
						}
					]
				},
				{
					//ButtonCRUD
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'button',
							reference: 'refBtnJettyOprRetrieve',
							text: 'Retrieve',
							flex: 1,
							ui: 'retrieve-button-modern',
							handler: 'onTblRetrive',
						},
						{
							xtype: 'spacer',
							width: 3
						},
						{
							xtype: 'button',
							reference: 'refBtnJettyOprClear',
							text: 'Clear',
							flex: 1,
							ui: 'clear-button-modern',
							handler: 'onTblClearOpr'
						},
						{
							xtype: 'spacer',
							width: 3
						},
						{
							xtype: 'button',
							reference: 'refBtnJettyOprAdd',
							text: 'Add',
							flex: 1,
							ui: 'create-button-modern',
							handler: 'onTblAddOpr'
						},
						{
							xtype: 'spacer',
							width: 3
						},
						{
							xtype: 'button',
							reference: 'refBtnJettyOprUpdate',
							text: 'Update',
							flex: 1,
							ui: 'update-button-modern',
							handler: 'onTblUpdateOpr'
						},
						{
							xtype: 'spacer',
							width: 3
						},
						{
							xtype: 'button',
							reference: 'refBtnJettyOprDelete',
							text: 'Delete',
							flex: 1,
							ui: 'delete-button-modern',
							handler: 'onTblDeleteOpr'
						}
					]
				},
				{//GRID	
					xtype: 'grid',
					reference: 'refJettyOPRGridList',
					responsiveConfig: {
						small: {
							flex: 1
						},
						large: {
							flex: 1,
							height: 250
						}
					},
					listeners: {
						select: 'onCellClickOPRTbl'
					},
					bind: {
						store: '{cargoSummary}'
					},
					selectable: {
						columns: false,
						rows: true,
						cells: false,
						mode: 'single',
						headerCheckbox: false,
					},
					columns: [
						{
							xtype: 'rownumberer',
							text: 'No',
							width: 50,
							readOnly: true,
						},
						{
							text: 'Commodity',
							dataIndex: 'cmdtCd',
							width: '110'
						},
						{
							text: 'LD/DS',
							dataIndex: 'jobTpCd',
							width: '110'
						},
						{
							text: 'Cargo Type',
							dataIndex: 'cgTpCd',
							width: '110'
						},
						{
							text: 'Tmnl OPR',
							dataIndex: 'tkOpr',
							width: '110'
						},
						{
							text: 'Shipper',
							dataIndex: 'shprCnsne',
							width: '70'
						},
						{
							text: 'Consignee',
							dataIndex: 'cnsne',
							width: '85'
						},
						{
							text: 'Pkg.Tp',
							dataIndex: 'pkgTpCd',
							width: '80'
						},
						{
							text: 'Line Type',
							dataIndex: 'hoseTpCd',
							width: '120'
						},
						{
							text: 'Line No',
							dataIndex: 'lineNo',
							width: '70'
						},
						{
							text: 'Tonnage',
							dataIndex: 'tonHdlAmt',
							width: '100'
						},
						{
							text: 'Pumping',
							dataIndex: 'pumpRate',
							width: '100'
						},
						{
							xtype: 'datecolumn',
							text: 'Hose On Date',
							dataIndex: 'hoseOnDt',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							width: '150'
						},
						{
							xtype: 'datecolumn',
							text: 'Hose Off Date',
							dataIndex: 'hoseOffDt',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							width: '150'
						},
						{
							xtype: 'datecolumn',
							text: 'Commence Date',
							dataIndex: 'stDt',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							width: '150'
						},
						{
							xtype: 'datecolumn',
							text: 'Complete Date',
							dataIndex: 'endDt',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							width: '150'
						}
					]
				}
			]
		}
	]
});
