Ext.define('MOST.view.billing.CreditNoteDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-creditnotedetail',
	requires: [
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
	],

	/** =========================================================================================================================
	 * CONSTANT START
	 */
	DETAIL_GRID_REF_NAME: 'refCreditNoteDetailGrid',
	DETAIL_STORE_NAME: 'creditNoteDetailStore',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: { type: 'vbox', align: 'stretch' },

	listeners: {
		afterrender: 'onDetailLoad',
	},

	width: 1280,
	minHeight: 640,

	initComponent: function () {
		var me = this;

		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'creditNoteDetailEditor',
			listeners: {
				beforeEdit: 'onBeforeEdit',
				edit: 'onEdit',
			},
		});

		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.DETAIL_GRID_REF_NAME,
					usePagingToolbar : false,
					flex: 1,
					margin: '0 5 0 5',
					plugins: [rowEditing, 'gridexporter', 'gridfilters', 'clipboard'],
					bind: {
						store: '{creditNoteDetailStore}',
					},
					selModel: {
						type: 'checkboxmodel',
						headerText: ViewUtil.getLabel('remove'),
                        headerWidth: 60,
						showHeaderCheckbox: true,

					},
					listeners: {
						select: 'onDtlSelectCheck',
						deselect: 'onDtlDeselectCheck',
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('CreditNoteDetailGridList'),
					},
				},
			],
			dockedItems: [
				{
					xtype: 'container',
					style: { 'background-color': 'white' },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '5 5 0 0',
					},
					items: [
						{
							xtype: 'tbfill',
						},
						{
							xtype: 'button',
							reference: 'reBtnDetailSave',
							text: ViewUtil.getLabel('save'),
							iconCls: 'x-fa fa-save', 
							listeners: {
								click: 'onBtnDetailSave',
							},
						},
						{
							xtype: 'button',
							reference: 'refBtnIssuedCreditNote',
							text: ViewUtil.getLabel('LB_btn_creditNoteIssued'),
							iconCls: 'fa fa-envelope', 
							listeners: {
								click: 'onBtnDetailSave',
							},
						},
					],
				},
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'fieldset',
							autoScroll: true,
							collapsible: true,
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							flex: 1,
                            margin: '0 5 10 5',
                            padding: '0 10 10 10',
                            defaults: {
                                margin: '0 0 5 0'
                            },
							items: [
								{
									xtype: 'container', // Row 1
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										xtype: 'textfield',
										flex: 1,
										labelAlign: 'right',
										labelWidth: 120,
									},
									items: [
										{
											fieldLabel: ViewUtil.getLabel('LB_grid_creditNoteIvNo'),
											reference: 'refDtlIvNo',
											bind: {
												value: '{creditNoteDetail.invoiceNo}',
											},
											readOnly: true,
										},
										{
											fieldLabel: ViewUtil.getLabel('LB_creditNoteInDate'),
											reference: 'refDtlInDt',
											bind: {
												value: '{creditNoteDetail.ivDt}',
											},
											readOnly: true,
										},
										{
											xtype: 'container',
										},
									],
								},
								{
									xtype: 'container', // Row 2
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										flex: 1,
										labelAlign: 'right',
										labelWidth: 120,
										readOnly: true,
									},
									items: [
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('LB_creditNoteIvTp'),
											reference: 'refDtlCboIvTp',
											bind: {
												store: '{invoiceTypeCombo}',
												value: '{creditNoteDetail.ivTp}',
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
										},
										{
											xtype: 'combo',
											reference: 'refDtlCboPaymentTp',
											fieldLabel: ViewUtil.getLabel('LB_creditNotePaymentTp'),
											bind: {
												store: '{paymentTypeCombo}',
												value: '{creditNoteDetail.payTpCd}',
											},
											queryMode: 'local',
											displayField: 'codeName',
											valueField: 'code',
											allowBlank: false,
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('LB_creditNoteAmt'),
											reference: 'refDtlAmt',
											decimalPrecision: 3,
											bind: {
												value: '{creditNoteDetail.aplyAmt}',
											},
										},
									],
								},
								{
									xtype: 'container', // Row 3
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										xtype: 'textfield',
										flex: 1,
										labelAlign: 'right',
										labelWidth: 120,
										readOnly: true,
									},
									items: [
										{
											fieldLabel: ViewUtil.getLabel('LB_creditNoteVslCallId'),
											reference: 'refDtlVslCallId',
											bind: {
												value: '{creditNoteDetail.vslCallId}',
											},
										},
										{
											fieldLabel: ViewUtil.getLabel('LB_creditNoteVslNm'),
											reference: 'refDtlVslNm',
											bind: {
												value: '{creditNoteDetail.vslNm}',
											},
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('LB_creditNoteGstAmt'),
											reference: 'refDtlGstAmt',
											decimalPrecision: 3,
											bind: {
												value: '{creditNoteDetail.gstAmt}',
											},
										},
									],
								},
								{
									xtype: 'container', // Row 4
									flex: 1, 
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										xtype: 'textfield',
										flex: 1,
										labelAlign: 'right',
										labelWidth: 120,
										readOnly: true,
									},
									items: [
										{
											fieldLabel: ViewUtil.getLabel('LB_creditNotePayerCd'),
											reference: 'refDtlPayerCd',
											bind: {
												value: '{creditNoteDetail.payer}',
											},
										},
										{
											fieldLabel: ViewUtil.getLabel('LB_creditNotePayerNm'),
											reference: 'refDtlPayerNm',
											bind: {
												value: '{creditNoteDetail.payerNm}',
											},
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('LB_creditNoteTotalAmt'),
											reference: 'refDtlTotalAmt',
											decimalPrecision: 3,
											bind: {
												value: '{creditNoteDetail.totalAmt}',
											},
										},
									],
								},
								{
									xtype: 'container', // Row 5
									flex: 1,
                                    margin: '0 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										xtype: 'textfield',
										labelAlign: 'right',
										labelWidth: 120,
									},
									items: [
										{
											fieldLabel: ViewUtil.getLabel('LB_creditNoteRmk'),
											reference: 'refDtlRmk',
											placeholder: 'Credit Note Remark',
											flex: 2,
											bind: {
												value: '{creditNoteDetail.remark}',
											},
										},
										{
											xtype: 'container',
											flex: 1,
										},
									],
								},
							],
						},
					],
				},
			],
		});

		me.callParent();
	},
});
