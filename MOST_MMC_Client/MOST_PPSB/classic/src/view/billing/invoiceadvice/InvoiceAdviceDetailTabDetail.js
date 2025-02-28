Ext.define('MOST.view.billing.invoiceadvice.InvoiceAdviceDetailTabDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-invoiceadvicedetailtabdetail',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],

	height: 380,


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
					margin: '5 0 0 0',
					items: [{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right'
						},
						items: [
							{
								xtype: 'container',
								padding: '5 0 5 0',
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
										flex: 0.95,
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										defaults: {
											labelWidth: 60,
											labelAlign: 'right',
											margin: '5 0 0 0',
										},
										items: [
											{
												xtype: 'partnercdtypefield',
												reference: 'refRequester',
												fieldLabel: ViewUtil.getLabel('requester'),
												allowBlank: false,
												params: {
													searchModule: 'MT'
												},
											},
											{
												xtype: 'partnercdtypefield',
												reference: 'refPayer',
												fieldLabel: ViewUtil.getLabel('payer'),
												allowBlank: false,
												params: {
													searchModule: 'MT'
												},
											},
											{
												xtype: 'combo',
												reference: 'refTariffTp',
												fieldLabel: ViewUtil.getLabel('tariffType'),
												queryMode: 'local',
												bind: {
													store: '{tariffTypeCombo}',
												},
												displayField: 'scdNm',
												valueField: 'scd',
												forceSelection: true,
												allowBlank: false,
												emptyText: '--Select--',
												allowOnlyWhitespace: false
											}
										]
									},
									{
										xtype: 'container',
										flex: 1.3,
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										defaults: {
											labelAlign: 'right',
											labelWidth: 80,
											margin: '5 0 0 0'
										},
										items: [
											{
												xtype: 'combo',
												reference: 'refLdDs',
												fieldLabel: ViewUtil.getLabel('lDDS'),
												queryMode: 'local',
												bind: {
													store: '{loadingAndDischargingCombo}',
												},
												displayField: 'scdNm',
												valueField: 'scd',
												allowBlank: true,
												forceSelection: true,
												editable: false,
												emptyText: 'Select',
												listeners: {
													change: 'onCategoryComboChange'
												}
											},
											{
												xtype: 'cmmcdfield',
												fieldLabel: ViewUtil.getLabel('commodity'),
												reference: 'ctlCmdtCode',
												allowBlank: true,
												params: {
													searchType: 'CMDT'
												}
											},
											{
												xtype: 'container',
												layout: {
													type: 'hbox',
													align: 'stretch'
												},
												defaults: {
													labelAlign: 'right',
													labelWidth: 80,
												},
												items: [
													{
														xtype: 'numberfield',
														flex: 0.6,
														margin: '0 5 0 0',
														fieldLabel: ViewUtil.getLabel('mTM3QTY'),
														reference: 'refMT',
														minValue: 0,
														maxValue: 100000.000,
														align: 'right',
														decimalPrecision: 3,
														selectOnFocus: true,
														listeners: {
															afterrender: function (elem) {
																elem.setValue(0)
															}
														}
													},
													{
														xtype: 'numberfield',
														flex: 0.3,
														margin: '0 5 0 0',
														reference: 'refM3',
														value: 0,
														minValue: 0,
														maxValue: 100000.000,
														align: 'right',
														decimalPrecision: 3,
														selectOnFocus: true,
														listeners: {
															afterrender: function (elem) {
																elem.setValue(0)
															}
														}
													},
													{
														xtype: 'numberfield',
														flex: 0.3,
														margin: '0 0 0 0',
														reference: 'refQty',
														value: 0,
														minValue: 0,
														maxValue: 999999999999,
														align: 'right',
														decimalPrecision: 0,
														selectOnFocus: true,
														listeners: {
															afterrender: function (elem) {
																elem.setValue(0)
															}
														}
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
										defaults: {
											labelAlign: 'right',
											margin: '5 0 0 0',
											labelWidth: 60
										},
										items: [
											{
												xtype: 'combo',
												reference: 'refBlNo',
												fieldLabel: ViewUtil.getLabel('bLNo'),
												bind: {
													store: '{ionvoiceAdviceDetailBillingItemCombo}'
												},
												queryMode: 'local',
												displayField: 'blNo',
												valueField: 'blNo',
												editable: false,
												emptyText: '--Select--',
												forceSelection: true,
												disabled: true
											},
											{
												xtype: 'combo',
												reference: 'refSnNo',
												fieldLabel: ViewUtil.getLabel('sNNo'),
												bind: {
													store: '{ionvoiceAdviceDetailShippingNoteItemCombo}'
												},
												queryMode: 'local',
												displayField: 'shipgNoteNo',
												valueField: 'shipgNoteNo',
												editable: false,
												emptyText: '--Select--',
												forceSelection: true,
												disabled: true
											},
											{
												xtype: 'textfield',
												reference: 'refRemark',
												fieldLabel: ViewUtil.getLabel('remark'),
												maxLength: 50,
												enforceMaxLength: true
											}
										]
									},
								]
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch',
									pack: 'end'

								},
								margin: '5 0 0 0',
								defaults: {
									labelAlign: 'right',
									margin: '0 0 0 5',
								},
								items: [
									{
										xtype: 'button',
										text: ViewUtil.getLabel('add'),
										reference: 'refBtnCreate',
										cls: 'search-button',
										iconCls: 'x-fa fa-plus',
										listeners: {
											click: 'onAddIvAdviceDetailBtnClick'
										}
									},
									{
										xtype: 'button',
										reference: 'refBtnUpdate',
										text: ViewUtil.getLabel('update'),
										listeners: {
											click: 'onUpdateIvAdviceDetailBtnClick'
										}
									},
									{
										xtype: 'button',
										reference: 'refBtnClear',
										text: ViewUtil.getLabel('clear'),
										listeners: {
											click: 'onClearIvAdviceDetailBtnClick'
										}
									},
									{
										xtype: 'button',
										reference: 'refBtnDelete',
										text: ViewUtil.getLabel('remove'),
										ui: 'delete-button',
										iconCls: 'x-fa fa-minus',
										listeners: {
											click: 'onDeleteIvAdviceDetailBtnClick'
										}
									},
									{
										xtype: 'checkboxfield',
										name: 'activeStat',
										reference: 'refChkDeleteAll',
										boxLabel: ViewUtil.getLabel('deleteAll'),
										checked: false
									}
								]
							},
						]
					},
					]
				},
				{
					xtype: 'tsb-datagrid',
					margin: '5 0 0 0',
					flex: 1,
					reference: 'refinvoiceAdviceDetailGrid',
					stateful: true,
					stateId: 'stateinvoiceAdviceDetailGrid',
					usePagingToolbar: false,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					listeners: {
						cellClick: 'onIvAdviceDetailGrid_CellClick'
					},
					bind: {
						store: '{invoiceAdviceDetailGridList}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('InvoiceAdviceDetailGridList')
					}
				}
			]
		});
		me.callParent();
	}
});