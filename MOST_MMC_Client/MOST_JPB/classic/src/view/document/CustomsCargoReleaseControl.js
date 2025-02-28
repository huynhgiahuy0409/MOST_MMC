Ext.define('MOST.view.document.CustomsCargoReleaseControl', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-customscargoreleasecontrol',
	requires: [
		'MOST.view.document.CustomsCargoReleaseControlModel',
		'MOST.view.document.CustomsCargoReleaseControlController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	closeFunction: 'Y',

	controller: 'customscargoreleasecontrol',

	viewModel: {
		type: 'customscargoreleasecontrol'
	},

	listeners: {
		afterrender: 'onLoad'
	},
	/**
	* =========================================================================================================================
	* CONSTANT START
	*/
	MAIN_GRID_REF_NAME: 'refCustomsCargoReleaseControlGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'customsCargoReleaseControl',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			style: {
				"background-color": "white"
			},
			items: [
				{
					xtype: 'fieldset',
					margin: '5 5 0 0',
					padding: '10 5 10 10',
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								//Col1
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0',
										labelWidth: 110,
										width: '100%'
									},
									layout: {
										type: 'vbox'
									},
									items: [
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('category'),
											reference: 'refDtlCategory',
											bind: {
												store: '{categoryCombo}',
												value: '{theDetail.categoryCd}'
											},
											listeners: {
												select: 'onSelectCategory',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local',
											emptyText: "Select",
											allowBlank: false,
											forceSelection: true,
											editable: false,
											disabled: true
										},
										{
											xtype: 'datetimefield',
											reference: 'ctlReleaseDate',
											bind: '{customReleaseDTString}',
											fieldLabel: ViewUtil.getLabel('releaseDate'),
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											allowBlank: false,
											editable: false
										},
										{
											xtype: 'textfield',
											reference: 'refDtlDamNo',
											maskRe: /[0-9]/,
											enforceMaxLength: true,
											maxLength: 17,
											fieldLabel: ViewUtil.getLabel('damNo'),
											bind: '{theDetail.releaseNo}',
										},

										{
											xtype: 'textfield',
											reference: 'refDtlRemark',
											enforceMaxLength: true,
											maxLength: 100,
											bind: '{theDetail.tmnlDesc}',
											fieldLabel: ViewUtil.getLabel('remark'),
										}
									]
								},

								//Col2
								{
									xtype: 'container',
									flex: 1,
									padding: '0 10 0 0',
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0',
										labelWidth: 120,
										width: '100%',
									},
									layout: {
										type: 'vbox'
									},
									items: [
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('documentNo'),
											reference: 'refDtlDocumentNo',
											bind: {
												store: '{docNoItems}',
												value: '{theDetail.docNo}'
											},
											listeners: {
												select: 'onSelectDocNo',
											},
											displayField: 'cdNm',
											valueField: 'cd',
											queryMode: 'local',
											emptyText: "Select",
											allowBlank: false,
											forceSelection: true,
											editable: false,
											disabled: true
										},
										{
											xtype: 'combobox',
											reference: 'refDtlBlNo',
											fieldLabel: ViewUtil.getLabel('blno'),
											bind: {
												store: '{blNoItems}',
												value: '{theDetail.blNo}'
											}, 
											listeners: {
												select: 'onSelectCargoNo'
											},
											displayField: 'scdNm',
											valueField: 'blNo',
											queryMode: 'local',
											forceSelection: true,
											editable: false,
											emptyText: 'Select',
											disabled: true
										},
										{
											xtype: 'combobox',
											reference: 'refDtlSNNo',
											fieldLabel: ViewUtil.getLabel('sNNo'),
											bind: {
												store: '{shipgNoteNoItems}',
												value: '{theDetail.snNo}'
											},
											listeners: {
												select: 'onSelectCargoNo'
											},
											displayField: 'scdNm',
											valueField: 'shipgNoteNo',
											queryMode: 'local',
											forceSelection: true,
											editable: false,
											emptyText: 'Select',
											disabled: true
										}
									]
								},
								//Col3
								{
									xtype: 'container',
									flex: 3,
									padding: '0 0 0 0',
									defaults: {
										labelAlign: 'right',
										margin: '0 5 0 0',
										width: '100%',
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'container',
											flex: 2,
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'container',
													flex: 1,
													padding: '0 0 0 0',
													defaults: {
														labelAlign: 'right',
														margin: '5 5 0 0',
														labelWidth: 70,
														width: '100%',
													},
													layout: {
														type: 'vbox'
													},
													items: [
														{
															xtype: 'textfield',
															reference: 'refDtlDocMt',
															fieldLabel: ViewUtil.getLabel('docMt'),
															editable: false,
															bind: {
																value: '{theDetail.docMt}'
															},
														},
														{
															xtype: 'textfield',
															reference: 'refDtlDocM3',
															fieldLabel: ViewUtil.getLabel('docM3'),
															editable: false,
															bind: {
																value: '{theDetail.docM3}'
															},
															minValue: 0,
															maxValue: 999999999999999.999,
															decimalPrecision: 3,
														},
														{
															xtype: 'textfield',
															reference: 'refDtlDocQty',
															fieldLabel: ViewUtil.getLabel('docQty'),
															editable: false,
															bind: {
																value: '{theDetail.docQty}'
															},
														},
													]
												},
												{
													xtype: 'container',
													reference: 'refReleaseMetricsContainer',
													flex: 1,
													defaults: {
														labelAlign: 'right',
														margin: '5 25 0 -20',
														labelWidth: 70,
														width: '100%',
													},
													layout: {
														type: 'vbox'
													},
													items: [
														{
															xtype: 'numberfield',
															reference: 'refDtlMt',
															fieldLabel: ViewUtil.getLabel('mt'),
															bind: {
																value: '{theDetail.releaseMt}'
															},
															listeners: {
																blur: 'onchangeCargoMetrics'
															},
															minValue: 0,
															maxValue: 999999999999999.999,
															decimalPrecision: 3,
															allowNegative: false,
														}, 
														{
															xtype: 'numberfield',
															reference: 'refDtlM3',
															fieldLabel: ViewUtil.getLabel('m3'),
															bind: {
																value: '{theDetail.releaseM3}'
															},
															listeners: {
																blur: 'onchangeCargoMetrics'
															},
															minValue: 0,
															maxValue: 999999999999999.999,
															decimalPrecision: 3,
															allowNegative: false,
														},
														{
															xtype: 'numberfield',
															reference: 'refDtlQty',
															fieldLabel: ViewUtil.getLabel('qty'),
															bind: {
																value: '{theDetail.releaseQty}'
															},
															listeners: {
																blur: 'onchangeCargoMetrics'
															},
															minValue: 0,
															maxValue: 99999999,
															decimalPrecision: 0,
															allowNegative: false,
														},
													]
												},
												{
													xtype: 'container',
													reference: 'refBalanceMetricsContainer',
													flex: 1,
													defaults: {
														labelAlign: 'right',
														margin: '5 5 0 0',
														labelWidth: 70,
														width: '100%',
													},
													layout: {
														type: 'vbox'
													},
													items: [

														{
															xtype: 'textfield',
															reference: 'refDtlBalanceMt',
															fieldLabel: ViewUtil.getLabel('balmt'),
															readOnly: true,
															editable: false,
															bind: {
																value: '{theDetail.balanceMt}'
															},
														},
														{
															xtype: 'textfield',
															reference: 'refDtlBalanceM3',
															fieldLabel: ViewUtil.getLabel('balm3'),
															readOnly: true,
															editable: false,
															bind: {
																value: '{theDetail.balanceM3}'
															},
														}, 
														{
															xtype: 'textfield',
															reference: 'refDtlBalanceQty',
															fieldLabel: ViewUtil.getLabel('balqty'),
															readOnly: true,
															editable: false,
															bind: {
																value: '{theDetail.balanceQty}'
															},
														},
													]
												},
											]
										},
										{
											xtype: 'container',
											padding: '0 0 0 30',
											flex: 1,
											items: [
												{
													xtype: 'fieldset',
													flex: 1,
													title: ViewUtil.getLabel('bondedWarehouse'),
													defaults: {
														labelAlign: 'right',
														width: '100%',
														margin: '0 0 5 0',
													},
													layout: {
														type: 'vbox'
													},
													style: {
														"margin": "-7px 0 0 0",
														"padding": "0 10px 5px 10px",
													},
													items: [
														{
															xtype: 'checkboxfield',
															boxLabel: ViewUtil.getLabel('bondedWarehouse'),
															reference: 'ctlBondedWhYn',
															margin: '5 0 5 0',
															bind: {
																value: '{theDetail.bondedWhYn}'
															},
															inputValue: 'Y',
															uncheckedValue: 'N',
															checked: false,
															listeners: {
																change: 'onDateFieldSet'
															}
														},
														{
															xtype: 'datetimefield',
															reference: 'ctlGateInTime',
															fieldLabel: ViewUtil.getLabel('portSafetyConfirmationGateInTime'),
															labelWidth: 90,
															format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
															editable: false,
															disabled: true
														},
														{
															xtype: 'datetimefield',
															reference: 'ctlGateOutTime',
															fieldLabel: ViewUtil.getLabel('portSafetyConfirmationGateOutTime'),
															labelWidth: 90,
															format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
															editable: false,
															disabled: true
														}

													]
												},
											]
										}
									]
								},
							]
						}
					]
				},
				{
					xtype: 'container',
					margin: '5 5 5 5',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					defaults: {
						margin: '0 0 0 5',
					},
					items: [
						{
							xtype: 'button',
							text: ViewUtil.getLabel('clear'),
							reference: 'refsClearBtn',
							cls: 'search-button',
							iconCls: 'fa fa-refresh',
							listeners: {
								click: 'onClear'
							}
						}, {
							xtype: 'button',
							text: ViewUtil.getLabel('add'),
							reference: 'refsAddBtn',
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
						}, {
							xtype: 'button',
							text: ViewUtil.getLabel('update'),
							reference: 'refsUpdateBtn',
							//ui: 'update-button',
							cls: 'print-button',
							iconCls: 'fa fa-pencil-square-o',
							listeners: {
								click: 'onUpdate'
							}
						}, {
							xtype: 'button',
							itemId: 'deleteButton',
							text: ViewUtil.getLabel('remove'),
							reference: 'refsRemoveBtn',
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
							}
						}
					]
				},
				{
					xtype: 'container',
					flex: 1.4,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{//Grid
							xtype: 'tsb-datagrid',
							reference: me.MAIN_GRID_REF_NAME,
							flex: 1,
							stateful: true,
							stateId: 'stateVesselShiftingRequestGrid',
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
							bind: {
								store: '{' + me.MAIN_STORE_NAME + '}'
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							listeners: {
								cellClick: 'onCellClick',
								pagingSearch: 'onSearch'
							},
							columns: {
								defaults: {
									style: 'text-align:center',
									align: 'center'
								},
								items: GridUtil.getGridColumns('CustomsCargoReleaseControl')
							}
						}]
				}
			],
			//Docked:
			dockedItems: [
				{//Docked Button
					xtype: 'container',
					style: {
						"background-color": "white"
					},
					layout: {
						type: 'hbox',
					},
					padding: '0 0 0 0',
					defaults: {
						margin: '5 5 0 0'
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							itemId: 'inquiryItemId',
							reference: 'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							listeners: {
								click: 'onSearch'
							}
						},
						{
							xtype: 'button',
							reference: 'refBtnRefresh',
							text: ViewUtil.getLabel('refresh'),
							iconCls: 'x-fa fa-refresh',
							listeners: {
								click: 'onRefresh'
							}
						},
						{
							xtype: 'button',
							reference: 'refBtnPreview',
							itemId: 'exportToPdfButton',
							text: ViewUtil.getLabel('preview'),
							iconCls: 'x-fa fa-file-pdf-o',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args: [me.MAIN_GRID_REF_NAME, false]
								}
							}
						},
						{
							xtype: 'button',
							itemId: 'exportToExcelButton',
							text: ViewUtil.getLabel('exportToExcel'),
							iconCls: 'excel-button-image',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args: [me.MAIN_GRID_REF_NAME, true]
								}
							}
						},
						{
							xtype: 'button',
							cls: 'column-setting-button',
							iconCls: 'x-fa fa-columns',
							text: ViewUtil.getLabel('column'),
							listeners: {
								click: 'onColumnSettingPopup',
								args: [me.MAIN_GRID_REF_NAME]
							}
						}
					]
				},

				{//Search Condition and VP infor:
					xtype: 'fieldset',
					collapsible: true,
					enableOverflow: true,
					defaults: {
						labelAlign: 'right',
					},
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					style: {
						"margin": "0 5px 0 0",
						"border": "1px solid #d0d0d0 !important",
						"padding": "0px 10px 10px 10px"
					},
					items: [
						{// Left: Search Condition
							xtype: 'searchfieldset',
							flex: 3,
							margin: '0 0 0 0',
							padding: '10 10 0 10',
							title: ViewUtil.getLabel('search'),
							defaults: {
								layout: {
									type: 'vbox',
								},
								defaults: {
									labelAlign: 'right',
									flex: 1,
									labelWidth: 110
								}
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
									},
									defaults: {
										labelAlign: 'right',
										width: "100%",
									},
									items: [
										{
											xtype: 'vesselcalllistfield',
											reference: 'ctlVslCallId',
											margin: '0 0 0 0',
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('vslcallid'),
											bind: {
												value: '{theSearch.vslCallId}'
											}
										},
										{
											xtype: 'datefield',
											reference: 'ctlFromDt',
											fieldLabel: ViewUtil.getLabel('releaseDate'),
											labelWidth: 100,
											margin: '5 0 0 0',
											format: MOST.config.Locale.getShortDate(),
											editable: false
										},
										{
											xtype: 'datefield',
											reference: 'ctlToDt',
											fieldLabel: ViewUtil.getLabel('to'),
											labelWidth: 100,
											margin: '5 0 0 0',
											format: MOST.config.Locale.getShortDate(),
											editable: false
										}
									]
								},
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										labelAlign: 'right',
										labelWidth: 115,
										margin: '0 5 5 0',
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									flex: 1,
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlMasterBlCombo',
											fieldLabel: ViewUtil.getLabel('masterBLNo'),
											bind: {
												store: '{masterBlItems}',
												value: '{theSearch.masterBL}'
											},
											listeners: {
												change: 'loadBLNoComboData'
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											queryMode: 'local',
											forceSelection: true,
											editable: true,
											allowBlank: true,
											emptyText: 'Select',
										},
										{
											xtype: 'combobox',
											reference: 'ctlBlNo',
											fieldLabel: ViewUtil.getLabel('blno'),
											bind: {
												store: '{blNoCombo}',
												value: '{theSearch.blNo}'
											},
											displayField: 'scdNm',
											valueField: 'blNo',
											queryMode: 'local',
											forceSelection: true,
											editable: false,
											emptyText: 'Select', 
										},
									]
								},
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										margin: '0 0 0 0',
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									flex: 1,
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlBookingNo',
											fieldLabel: ViewUtil.getLabel('bookingNo'),
											bind: {
												store: '{bookingNoItems}',
												value: '{theSearch.bookingNo}'
											},
											listeners: {
												change: 'loadShipgNoteNoComboData'
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											queryMode: 'local',
											forceSelection: true,
											editable: true,
											allowBlank: true,
											emptyText: 'Select',
										},
										{
											xtype: 'combobox',
											reference: 'ctlSNNo',
											fieldLabel: ViewUtil.getLabel('sNNo'),
											margin: '5 0 0 0',
											bind: {
												store: '{shipgNoteNoCombo}',
												value: '{theSearch.snNo}'
											},
											displayField: 'scdNm',
											valueField: 'shipgNoteNo',
											queryMode: 'local',
											forceSelection: true,
											editable: false,
											emptyText: 'Select',
										},
									]
								}
							]
						},
						{//Right: VesselInfo:
							xtype: 'fieldset',
							flex: 2,
							margin: '0 0 0 5',
							padding: '10 10 10 10',
							width: '100%',
							title: ViewUtil.getLabel('vslInfo'),
							defaults: {
								labelAlign: 'right',
								layout: {
									type: 'vbox'
								},
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										margin: '0 10 5 0',
										labelAlign: 'right',
										labelWidth: 93,
										width: '100%'
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vesselCode'),
											bind: '{theVslInfo.vslCd}',
											readOnly: true
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vesselName'),
											bind: '{theVslInfo.vslNm}',
											readOnly: true
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('voyage'),
											bind: '{theVslInfo.voyage}',
											readOnly: true
										}
									]
								},
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										margin: '0 0 5 5',
										labelAlign: 'right',
										labelWidth: 95,
										width: '100%'
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('berthingLoc'),
											bind: '{theVslInfo.berthLoc}',
											readOnly: true
										},
										{
											xtype: 'datefield',
											fieldLabel: ViewUtil.getLabel('SNLETA'),
											bind: '{theVslInfo.eta}',
											readOnly: true,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
										},
										{
											xtype: 'datefield',
											fieldLabel: ViewUtil.getLabel('etd'),
											bind: '{theVslInfo.etd}',
											readOnly: true,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
										}
									]
								},
							]
						}
					]
				},
			]
		});

		me.callParent();
	}
});