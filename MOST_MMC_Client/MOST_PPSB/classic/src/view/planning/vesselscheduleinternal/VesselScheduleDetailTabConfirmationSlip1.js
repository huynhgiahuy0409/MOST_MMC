Ext.define('MOST.view.planning.vesselscheduleinternal.VesselScheduleDetailTabConfirmationSlip1', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselscheduledetailtabconfirmationslip1',

	requires: [
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
	CS1_GRID_REF_NAME: 'refConfirmationSlipDryBulkBreakBulkGrid', // Main Grid Name
	CS1_STORE_NAME: 'confirmationSlipDryBreakBulk',
	STOWAGE_GRID_REF_NAME: 'refConfirmationSlipStowagePlanUploadGrid',
	STOWAGE_STORE_NAME: 'confirmationSlipStowagePlanUpload',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'confirmationSlipDryBulkBreakBulkEditor',
			listeners: {
				cancelEdit: 'onConfirmationSlip1CancelEdit',
				validateedit: 'onConfirmationSlip1ValidateEdit',
				edit: 'onConfirmationSlip1Edit',
			},
		});

		Ext.apply(me, {
			items: [
				{
					xtype: 'label',
					html: '<a style="font: 500 13px Roboto;">The Confirmation Slip must be submited by shipping agency 24hours (3days for Scheduled Vessel) before ETA for priority.</a>',
					margin: '12 0 0 0',
					style: {
						'text-align': 'center',
					},
					text: '',
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					margin: '0 0 0 0',
					items: [
						{
							xtype: 'fieldset',
							flex: 3,
							title: ViewUtil.getLabel('vesselInformation'),
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							margin: '0 0 0 0',
							padding: '0 10 10 10 ',
							items: [
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										margin: '5 0 0 0',
										labelAlign: 'right',
										labelWidth: 80,
									},
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									items: [
										{
											margin: '0 0 0 0',
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vesselName'),
											editable: false,
											bind: '{theMain.vslNm}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vesselType'),
											editable: false,
											bind: '{theMain.vslTpNm}',
										},
										{
											xtype: 'datetimefield',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											fieldLabel: ViewUtil.getLabel('eta'),
											readOnly: true,
											bind: '{theMain.eta}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('operationType'),
											editable: false,
											reference: 'ctlConfirmationSlip1OperationType',
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
										margin: '5 0 0 0',
										labelAlign: 'right',
										labelWidth: 80,
									},
									items: [
										{
											xtype: 'partnercdformultifield',
											reference: 'ctlVesselScheduleDetailTabShipper',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('shipper'),
											emptyText: ViewUtil.getLabel('shipper'),
											params: {
												ptnrType: CodeConstants.CM_PTNRTP_CNS,
												initSearch: false,
											},
											bind: {
												value: '{theConfirmationSlip.shipper}',
											},
										},
										{
											xtype: 'partnercdformultifield',
											reference: 'ctlVesselScheduleDetailTabConsignee',
											fieldLabel: ViewUtil.getLabel('consignee'),
											emptyText: ViewUtil.getLabel('consignee'),
											params: {
												ptnrType: CodeConstants.CM_PTNRTP_CNS,
												initSearch: false,
											},
											bind: {
												value: '{theConfirmationSlip.consignee}',
											},
										},
										{
											xtype: 'partnercdformultifield',
											reference: 'ctlVesselScheduleDetailTabForwarding',
											fieldLabel: ViewUtil.getLabel('forwarding'),
											emptyText: ViewUtil.getLabel('forwarding'),
											params: {
												ptnrType: CodeConstants.CM_PTNRTP_FWD,
												initSearch: false,
											},
											bind: {
												value: '{theConfirmationSlip.forwarder}',
											},
										},
										{
											xtype: 'vesselcalllistfield',
											fieldLabel: ViewUtil.getLabel('motherVessel'),
											reference: 'ctlDryBulkMthrVslCallId',
											bind: {
												value: '{theConfirmationSlip.mthrVslCallId}',
											},
										},
									],
								},
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										margin: '5 0 0 0',
										labelAlign: 'right',
										labelWidth: 80,
									},
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'textfield',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('isps'),
											editable: false,
											bind: '{theMain.ispsLevel}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('nextPort'),
											editable: false,
											bind: '{theMain.nextPort}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('lastPort'),
											editable: false,
											bind: '{theMain.lastPort}',
										},
										{
											xtype: 'checkboxfield',
											margin: '5 0 0 85',
											boxLabel: ViewUtil.getLabel('doubleBanking'),
											bind: '{confirmationSlipDbYnChecked}',
											readOnly: true,
										},
									],
								},
							],
						},
						{
							xtype: 'fieldset',
							flex: 1,
							title: ViewUtil.getLabel('stowagePlanUpload'),
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							margin: '0 0 0 5',
							padding: '0 10 10 10',
							items: [
								{
									xtype: 'container',
									margin: '0 0 5 0',
									layout: {
										type: 'hbox',
										pack: 'end',
									},
									items: [
										{
											xtype: 'filefield',
											name: 'vesselScheduleDetailTabFileUpload',
											style: 'text-align:left',
											method: 'POST',
											width: 80,
											fileUpload: true,
											enctype: 'multipart/form-data',
											buttonText: '',
											buttonOnly: true,
											multiple: true,
											buttonConfig: {
												text: ViewUtil.getLabel('add'),
												iconCls: 'x-fa fa-plus',
												width: '100%'
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
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											text: ViewUtil.getLabel('remove'),
											listeners: {
												click: 'onConfirmationSlip1FileUploadGridRemove',
											},
										},
									],
								},
								{
									xtype: 'tsb-datagrid',
									reference: me.STOWAGE_GRID_REF_NAME,
									flex: 1,
									maxHeight: 87,
									stateful: true,
									stateId: 'stateConfirmationSlipStowagePlanUploadGrid',
									usePagingToolbar: false,
									plugins: ['gridexporter', 'gridfilters', 'clipboard'],
									magain: '0 0 0 0',
									bind: {
										store: '{' + me.STOWAGE_STORE_NAME + '}',
									},
									listeners: {
										celldblclick: 'onFileDownloadDblClick',
									},
									selModel: {
										type: 'checkboxmodel',
										checkOnly: false,
										showHeaderCheckbox: true,
									},
									columns: {
										items: GridUtil.getGridColumns('ConfirmationSlip1StowagePlanUpload'),
									},
								},
							],
						},
					],
				},
				{
					xtype: 'fieldset',
					margin: '0 0 0 0',
					padding: '0 10 10 10',
					title: ViewUtil.getLabel('dryBulkBreakBulk'),
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					defaults: {
						margin: '0 0 0 5',
						flex: 1
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							defaults: {
								labelWidth: 80,
								labelAlign: 'right',
								margin: '5 0 0 0',
							},
							items: [
								{
									xtype: 'combo',
									reference: 'refOpeType',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('opeType'),
									dataIndex: 'opeType',
									bind: {
										store: '{vesselScheduleOpeTypeCombo}',
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									renderer: 'onDryBulkGridComboRenderer',
									allowBlank: true,
								},
								{
									xtype: 'numberfield',
									labelAlign: 'right',
									fieldLabel: ViewUtil.getLabel('workDd'),
									dataIndex: 'workDd',
									reference: 'refWorkDd',
									format: '0,000',
									minValue: 0,
									maxValue: 9999999999,
									align: 'right',
									selectOnFocus: true,
								},
								{
									xtype: 'numberfield',
									fieldLabel: ViewUtil.getLabel('oprHrs'),
									dataIndex: 'opeHr',
									format: '0,000.000',
									reference: 'refOpeHr',
									minValue: 0,
									maxValue: 999999999999.999,
									align: 'right',
									decimalPrecision: 3,
									selectOnFocus: true,
								},
							],
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'start',
							},
							defaults: {
								labelWidth: 95,
								labelAlign: 'right',
								margin: '5 0 0 0',
								width: '100%'
							},
							items: [
								{
									xtype: 'combo',
									reference: 'refCgTpNm',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('cgTpNm'),
									dataIndex: 'cgTpCd',
									bind: {
										store: '{vesselScheduleCargoTypeUnLiquidCombo}',
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									listeners: {
										change: 'onCargoTypeUnLiquidComboChange',
									},
									renderer: 'onDryBulkGridComboRenderer',
									allowBlank: true,
								},
								{
									xtype: 'cmmcdfield',
									reference: 'refCmdtCode',
									fieldLabel: ViewUtil.getLabel('dgCommodity'),
									bind: {
										value: '{theConfirmationSlip.cmmdCode}',
									},
									params: {
										searchType: 'CMDT',
									},
								},
								{
									xtype: 'textfield',
									reference: 'refCmdtGrCd',
									fieldLabel: ViewUtil.getLabel('cmdtGrp'),
									editable: false,
									bind: {
										value: '{theConfirmationSlip.cmmdGrpCode}',
									},
								},
							],
						},
						{
							xtype: 'container',
							flex: 0.6,
							layout: {
								type: 'vbox',
								align: 'start',
							},
							defaults: {
								margin: '5 0 0 0',
								width: '100%'
							},
							items: [
								{
									xtype: 'combo',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('topCln'),
									labelAlign: 'right',
									labelWidth: 60,
									dataIndex: 'topCln',
									reference: 'refTopCln',
									bind: {
										store: '{vesselScheduleTopCleanCombo}',
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									editable: false,
								},
								{
									xtype: 'textfield',
									reference: 'refCmdtName',
									editable: false,
									bind: {
										value: '{theConfirmationSlip.cmmdName}',
									},
								},
								{
									xtype: 'textfield',
									editable: false,
									reference: 'refCmdtGr',
									bind: {
										value: '{theConfirmationSlip.cmmdGrpName}',
									},
								},
							],
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							defaults: {
								labelWidth: 80,
								labelAlign: 'right',
								margin: '5 0 0 0',
							},
							items: [
								{
									xtype: 'numberfield',
									reference: 'refWgt',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('mt'),
									dataIndex: 'wgt',
									format: '0,000.000',
									minValue: 0,
									maxValue: 999999999999.999,
									align: 'right',
									decimalPrecision: 3,
									selectOnFocus: true,
								},
								{
									xtype: 'numberfield',
									reference: 'refMsrmt',
									fieldLabel: ViewUtil.getLabel('m3'),
									dataIndex: 'msrmt',
									format: '0,000.000',
									minValue: 0,
									maxValue: 999999999999.999,
									align: 'right',
									decimalPrecision: 3,
									selectOnFocus: true,
								},
								{
									xtype: 'numberfield',
									reference: 'refQty',
									fieldLabel: ViewUtil.getLabel('quantity'),
									dataIndex: 'qty',
									format: '0,000.000',
									minValue: 0,
									maxValue: 999999999999.999,
									align: 'right',
									decimalPrecision: 3,
									selectOnFocus: true,
								},
							],
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'start',
							},
							defaults: {
								labelWidth: 50,
								labelAlign: 'right',
								width: '100%'
							},
							items: [
								{
									xtype: 'tagfield',
									fieldLabel: ViewUtil.getLabel('workHatchNo'),
									maxGrow: 60,
									dataIndex: 'workHatchNo',
									reference: 'refWorkHatchNo',
									bind: {
										store: '{vesselScheduleWorkableHatchCombo}',
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									editable: true,
								},
							],
						},
					],
				},
				{
					xtype: 'container',
					margin: '0 0 0 0',
					flex: 1,
					title: ViewUtil.getLabel('dryBulkBreakBulk'),
					layout: {
						type: 'vbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'container',
							defaults: {
								margin: '5 0 5 5',
							},
							layout: {
								type: 'hbox',
								align: 'stretch',
								pack: 'end',
							},
							items: [
								{
									xtype: 'button',
									text: ViewUtil.getLabel('clear'),
									listeners: {
										click: 'onClearConfirmationSlip1',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-plus',
									text: ViewUtil.getLabel('add'),
									listeners: {
										click: 'onAddConfirmationSlip1',
									},
								},
								{
									xtype: 'button',
									text: ViewUtil.getLabel('update'),
									listeners: {
										click: 'onUpdateConfirmationSlip1',
									},
								},
								{
									xtype: 'button',
									ui: 'delete-button',
									iconCls: 'x-fa fa-minus',
									text: ViewUtil.getLabel('remove'),
									listeners: {
										click: 'onDeleteConfirmationSlip1',
									},
								},
							],
						},
						{
							xtype: 'tsb-datagrid',
							reference: me.CS1_GRID_REF_NAME,
							flex: 1,
							usePagingToolbar: false,
							stateful: true,
							stateId: 'stateConfirmationSlipDryBulkBreakBulkGrid',
							plugins: ['gridexporter', 'gridfilters', 'clipboard'],
							bind: {
								store: '{' + me.CS1_STORE_NAME + '}',
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false,
							},
							listeners: {
								cellClick: 'onRefConfirmationSlipDryBreakBulkGrid_CellClick',
							},
							features: [
								{
									ftype: 'summary',
									dock: 'bottom',
								},
							],
							columns: {
								defaults: {
									style: 'text-align:center',
									align: 'center',
								},
								items: GridUtil.getGridColumns('ConfirmationSlip1'),
							},
						},
						{
							xtype: 'container',
							defaults: {
								margin: '5 0 0 5',
								labelAlign: 'right',
								labelWidth: 100,
							},
							layout: {
								type: 'hbox',
								align: 'stretch',
								pack: 'end',
							},
							items: [
								{
									xtype: 'button',
									text: ViewUtil.getLabel('submitConfirmationSlip'),
									listeners: {
										click: 'onSubmitConfirmationSlip1',
									},
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
