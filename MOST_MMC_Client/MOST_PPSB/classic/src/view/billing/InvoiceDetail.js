Ext.define('MOST.view.controller.InvoiceDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-invoicedetail',

	requires: [
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
	],

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAIL_GRID_REF_NAME: 'refInvoiceDetailListGrid',
	DETAIL_STORE_NAME: 'invoiceListDetail',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	listeners: {
		afterrender: 'onLoadDetail',
		destroy: 'beforeclose',
	},

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	width: 1500,
	minHeight: 640,
	reference: 'invoiceDetail',

	initComponent: function () {
		var me = this;

		Ext.apply(this, {
			items: [
				{
					xtype: 'container',
					reference: 'refCtnVslCallId',
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'fieldset',
							margin: '5 0 5 5',
							padding: '10 10 10 10',
							defaults: {
								labelWidth: 70,
								labelAlign: 'right',
							},
							items: [
								{
									xtype: 'shipcallnofield',
									reference: 'ctlDtlScn',
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{vslDetail.scn}',
									},
								},
								{
									xtype: 'vesselcalllistfield',
									fieldLabel: ViewUtil.getLabel('vslschCallId'),
									margin: '5 0 0 0',
									reference: 'txtDtlVslCallId',
									bind: {
										value: '{vslDetail.vslCallId}',
									},
									labelAlign: 'right',
								},
							],
						},
						{
							xtype: 'fieldset',
							margin: '5 5 5 5',
							padding: '10 10 10 10',
							layout: {
								type: 'vbox',
							},
							flex: 1,
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
										flex: 1,
										editable: false,
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vesselname'),
											reference: 'txtVslNm',
											bind: '{vslDetail.vslNm}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('SNLDSA'),
											reference: 'txtVslSA',
											bind: '{vslDetail.arrvSaId}',
										},
										{
											xtype: 'datetimefield',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											fieldLabel: ViewUtil.getLabel('atb'),
											reference: 'txtVslAtb',
											bind: '{vslDetail.atb}',
											readOnly: true,
										},
										{
											xtype: 'container',
										},
									],
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
										flex: 1,
										editable: false,
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('voyage'),
											reference: 'txtVslVoy',
											bind: '{vslDetail.voyage}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('berthingLoc'),
											reference: 'txtVslBerthNo',
											bind: '{vslDetail.berthLoc}',
										},
										{
											xtype: 'datetimefield',
											format: 'd/m/Y H:i',
											fieldLabel: ViewUtil.getLabel('atu'),
											reference: 'txtVslAtu',
											bind: '{vslDetail.atu}',
											readOnly: true,
										},
										{
											xtype: 'container',
										},
									],
								},
							],
						},
					], // End of first layer
				},
				{
					// Start of second layer
					xtype: 'container',
					layout: {
						align: 'stretch',
						type: 'vbox',
					},
					reference: 'refCtnInvoiceInfo',
					items: [
						{
							xtype: 'fieldset',
							margin: '0 5 5 5',
							padding: '10 10 10 10',
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							defaults: {
								margin: '0 0 0 0',
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										labelWidth: 75,
										labelAlign: 'right',
										margin: '5 0 0 0',
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlMasterBlNo',
											fieldLabel: ViewUtil.getLabel('masterBlNo'),
											queryMode: 'local',
											bind: {
												store: '{masterBlCombo}',
												value: '{theDetail.masterBl}',
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											emptyText: 'Select',
											editable: false,
											hidden: true,
										},
										{
											xtype: 'textfield',
											reference: 'txtSubBlNo',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('blno'),
											bind: '{theDetail.blNo}',
											readOnly: true,
										},
										{
											xtype: 'combobox',
											reference: 'cboPayer',
											fieldLabel: ViewUtil.getLabel('inPayer'),
											queryMode: 'local',
											bind: {
												store: '{payerCombo}',
												value: '{payerDetail.payer}',
											},
											displayField: 'payer',
											valueField: 'payer',
											listeners: {
												change: 'onSelectPayer',
											},
											emptyText: 'Select',
											editable: false,
											allowBlank: false,
										},
										{
											xtype: 'combobox',
											reference: 'refCboInvoiPre',
											fieldLabel: ViewUtil.getLabel('inPrefix'),
											queryMode: 'local',
											bind: {
												store: '{prefixDetailCombo}',
												value: '{payerDetail.ivPrfx}',
											},
											displayField: 'ivPrfx',
											valueField: 'ivPrfx',
											listeners: {
												select: 'onSelectInvoicePrefix',
											},
											editable: false,
											allowBlank: false,
										},
										{
											xtype: 'combobox',
											reference: 'refCboInvoiceType',
											fieldLabel: ViewUtil.getLabel('invoiceType'),
											queryMode: 'local',
											bind: {
												store: '{invoiceTypeCombo}',
												value: '{theDetail.ivTp}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											listeners: {
												select: 'onSelectInvoicePrefix',
											},
											editable: false,
											hidden: true,
										},
										{
											xtype: 'combobox',
											reference: 'cboPaymentTp',
											fieldLabel: ViewUtil.getLabel('paymenttype'),
											queryMode: 'local',
											bind: {
												store: '{paymentCombo}',
												value: '{payerDetail.payTpCd}',
											},
											displayField: 'codeName',
											valueField: 'code',
											listeners: {
												select: 'onSelectPaymentType',
											},
											editable: false,
											hidden: true,
											emptyText: 'Please select Payment Type',
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												flex: 1,
											},
											items: [
												{
													xtype: 'button',
													text: ViewUtil.getLabel('addItem'),
													iconCls: 'x-fa fa-plus',
													ui: 'create-button',
													reference: 'btnAddItem',
													hidden: false,
													listeners: {
														click: 'openTariffCodePopup',
													},
												},
												{
													xtype: 'button',
													margin: '0 0 0 5',
													text: ViewUtil.getLabel('createInvoice'),
													reference: 'btnCreateInvoice',
													iconCls: 'fa fa-envelope',
													ui: 'delete-button',
													listeners: {
														click: 'onCreateInvoice',
													},
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										labelWidth: 75,
										labelAlign: 'right',
										margin: '5 0 0 0',
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlBookingNo',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('bookingNo'),
											queryMode: 'local',
											bind: {
												store: '{bookingNoCombo}',
												value: '{theDetail.bookingNo}',
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											emptyText: 'Select',
											editable: false,
											hidden: true,
										},
										{
											xtype: 'textfield',
											reference: 'txtSNNo',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('sNNo'),
											bind: '{theDetail.snNo}',
											readOnly: true,
										},
										{
											xtype: 'textfield',
											reference: 'txtName',
											fieldLabel: ViewUtil.getLabel('payerName'),
											bind: '{payerDetail.payerNm}',
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'txtInvoiceDt',
											editable: false,
											bind: '{theDetail.inDate}',
											fieldLabel: ViewUtil.getLabel('inDate'),
										},
									],
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										labelWidth: 75,
										labelAlign: 'right',
										margin: '5 0 0 0',
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'cboInvoiceNo',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('inNo'),
											queryMode: 'local',
											bind: '{theDetail.ivNo}',
											displayField: 'ivNo',
											valueField: 'ivNo',
											editable: false,
											listeners: {
												change: 'onInvoiceComboChange',
											},
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('accountno'),
											reference: 'txtAccNo',
											bind: '{payerDetail.custCd}',
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'txtDueDate',
											editable: false,
											bind: '{theDetail.dueDate}',
											fieldLabel: ViewUtil.getLabel('dueDate'),
										},
									],
								},
								{
									xtype: 'container',
									flex: 1.25,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 0 0 0',
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('referenceNo'),
											bind: '{payerDetail.refNo}',
											reference: 'txtRefNo',
											editable: false,
											hidden: true,
										},
										{
											xtype: 'textfield',
											reference: 'ctlIvProformaRatio',
											fieldLabel: ViewUtil.getLabel('ivProformaRatio'),
											margin: '0 0 0 0',
											enforceMaxLength: true,
											maskRe: /[0-9]/,
											maxLength: 2,
											bind: '{theDetail.prfRatio}',
											disabled: true,
										},
										{
											xtype: 'textfield',
											reference: 'txtAddress',
											fieldLabel: ViewUtil.getLabel('address'),
											bind: '{payerDetail.addr}',
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'refRemark',
											fieldLabel: ViewUtil.getLabel('remark'),
											labelAlign: 'right',
											emptyText: 'For Cancel',
											bind: '{theDetail.rmk}',
										},
									],
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									margin: '0 0 0 5',
									items: [
										{
											xtype: 'tsb-datagrid',
											reference: 'refIvUploadGrid',
											minHeight: 88,
											stateful: true,
											usePagingToolbar: false,
											stateId: 'stateIvUploadGrid',
											plugins: ['gridexporter', 'gridfilters', 'clipboard'],
											bind: {
												store: '{ivDetailUpload}',
											},
											listeners: {
												celldblclick: 'onIvFileDownloadDblClick',
											},
											selModel: {
												type: 'checkboxmodel',
												checkOnly: false,
												showHeaderCheckbox: true,
											},
											columns: {
												defaults: {
													style: 'text-align:center',
													align: 'center',
												},
												items: GridUtil.getGridColumns('InvoiceFileUploadGrid'),
											},
										},
										{
											xtype: 'container',
											margin: '5 0 0 0',
											layout: {
												type: 'hbox',
												pack: 'end',
											},
											items: [
												{
													xtype: 'filefield',
													reference: 'btnAddFile',
													width: 80,
													name: 'fileUpload',
													itemId: 'createButton',
													id: 'ivDetailFileUpload',
													style: 'text-align:left',
													method: 'POST',
													fileUpload: true,
													enctype: 'multipart/form-data',
													hideLabel: true,
													buttonOnly: true,
													multiple: true,
													disabled: true,
													buttonConfig: {
														text: ViewUtil.getLabel('addFile'),
														iconCls: 'x-fa fa-plus',
													},
													listeners: {
														change: 'onAddForFileUpload',
														afterrender: function (cmp) {
															cmp.fileInputEl.set({
																multiple: 'multiple',
															});
														},
													},
												},
												{
													xtype: 'button',
													width: 80,
													margin: '0 0 0 5',
													text: ViewUtil.getLabel('delFile'),
													iconCls: 'x-fa fa-minus',
													ui: 'delete-button',
													disabled: true,
													reference: 'btnDelFile',
													listeners: {
														click: 'onDelFile',
													},
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					xtype: 'tsb-datagrid',
					reference: me.DETAIL_GRID_REF_NAME,
					flex: 1,
					usePagingToolbar: false,
					plugins: ['gridexporter', 'gridfilters', 'clipboard'],
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
					},
					bind: {
						store: '{invoiceList}',
					},
					listeners: {
						cellClick: 'onInvoiceDetailGridClick',
						cellDblClick: 'onInvoiceDetailGridDblClick',
					},
					selModel: {
						type: 'checkboxmodel',
						checkOnly: false,
						showHeaderCheckbox: true,
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('InvoiceDetail'),
					},
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'fieldset',
									margin: '0 5 5 5',
									padding: '0 10 10 10',
									title: 'Total',
									layout: 'hbox',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										editable: false,
										xtype: 'textfield',
									},
									items: [
										{
											reference: 'txtAppliedAmt',
											bind: '{theDetail.aplyAmt}',
											fieldLabel: ViewUtil.getLabel('appliedAmt'),
										},
										{
											reference: 'txtStandAmt',
											bind: '{theDetail.stdAmt}',
											fieldLabel: ViewUtil.getLabel('standAmt'),
										},
										{
											reference: 'txtDiffAmt',
											bind: '{theDetail.diffAmt}',
											fieldLabel: ViewUtil.getLabel('difference'),
											fieldStyle: 'color:#ff0000',
										},
									],
								},
								{
									xtype: 'fieldset',
									layout: 'hbox',
									margin: '0 5 5 5',
									hidden: true,
									defaults: {
										margin: '2 0 0 0',
										labelAlign: 'right',
									},
									items: [
										{
											xtype: 'combobox',
											width: 200,
											labelWidth: 110,
											reference: 'refFrCurrency',
											fieldLabel: me.lblForeignCurrency,
											queryMode: 'local',
											bind: {
												store: '{currencyDetailCombo}',
												value: '{theDetail.crcyCd}',
											},
											displayField: 'crcyCd',
											valueField: 'crcyCd',
											listeners: {
												select: 'onSelectCurrency',
											},
										},
										{
											xtype: 'textfield',
											width: 200,
											labelWidth: 100,
											fieldLabel: me.lblExcRate,
											reference: 'txtExchangeRate',
											bind: '{theDetail.exRate}',
											fieldStyle: 'color:#ff0000',
											editable: false,
										},
										{
											xtype: 'textfield',
											width: 150,
											labelWidth: 50,
											reference: 'txtDate',
											fieldLabel: me.lblDate,
											bind: '{theDetail.date}',
											fieldStyle: 'color:#ff0000',
										},
									],
								},
							],
						},
					],
				},
			],

			dockedItems: [
				{
					xtype: 'container',
					layout: {
						align: 'left',
						type: 'hbox',
					},
					defaults: {
						margin: '5 5 0 0',
						width: 75,
					},
					items: [
						{
							xtype: 'tbfill',
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							reference: 'refBtnDtlRetrieve',
							listeners: {
								click: 'onSearchDetail',
							},
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('cancel'),
							reference: 'refBtnCancel',
							listeners: {
								click: 'onCancelInvoice',
							},
						},
					],
				},
			],
		});

		me.callParent();
	},
});
