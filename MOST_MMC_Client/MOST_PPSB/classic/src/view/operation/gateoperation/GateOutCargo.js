Ext.define('MOST.view.operation.GateOutCargo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-gateoutcargo',
	requires: [],

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGateOutCargo',
	MAIN_STORE_NAME: 'gateOutCargo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					padding: '5 5 5 5',
					height: 802,
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'fieldset',
							padding: '10 10 5 10',
							margin: '0 0 0 0',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							defaults: {},
							items: [
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
										labelWidth: 100,
										width: '100%',
									},
									items: [
										{
											xtype: 'truckfield',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('gateoperation.truck'),
											reference: 'ctlGateOutLorryField',
											bind: {
												value: '{gateOutLorry.lorryNo}',
												searchDivCd: 'IN-GATE',
												isAutoLoad: 'false',
												searchType: 'GO',
											},
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('gateoperation.driver'),
													flex: 1,
													labelWidth: 100,
													margin: '0 0 0 0',
													reference: 'ctlGateOutDriverIdField',
													bind: {
														value: '{gateOutLorry.driverId}',
													},
													readOnly: true,
												},
												{
													xtype: 'textfield',
													reference: 'txtGateOutDriverName',
													flex: 0.75,
													margin: '0 0 0 5',
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateOutLorry.driverNm}',
													},
													readOnly: true,
												},
											],
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('gateoperation.gatePassNo'),
											reference: 'ctlGateOutTicketNoField',
											bind: {
												value: '{gateOutLorry.gatePassNo}',
											},
											readOnly: true,
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('gateTicketNo'),
											reference: 'ctlGateOutTicketNoField',
											bind: {
												value: '{gateOutLorry.gateTxnNo}',
											},
											readOnly: true,
										},
										{
											xtype: 'textfield',
											reference: 'refGiOfGateOutDateTimeLink',
											editable: false,
											readOnly: true,
											fieldLabel: ViewUtil.getLabel('gateoperation.gateintime'),
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											anchor: '100%',
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateOutLorry.gateInDt}',
											},
										},
										{
											xtype: 'combo',
											reference: 'ctlGateOutGateCombo',
											fieldLabel: ViewUtil.getLabel('gateoperation.gate'),
											queryMode: 'local',
											bind: {
												store: '{gateComboList}',
											},
											editable: false,
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select'
										},
										{
											xtype: 'textfield',
											reference: 'refVslNm',
											fieldLabel: ViewUtil.getLabel('gateoperation.vslNm'),
											bind: {
												value: '{gateOutLorry.vslNm}',
											},
										},
										{
											xtype: 'container',
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'refScn',
													fieldLabel: ViewUtil.getLabel('gateoperation.scn'),
													labelAlign: 'right',
													labelWidth: 100,
													flex: 1,
													bind: {
														value: '{gateOutLorry.scn}',
													},
												},
												{
													xtype: 'textfield',
													reference: 'refVslCallId',
													flex: 0.75,
													margin: '0 0 0 5',
													bind: {
														value: '{gateOutLorry.vslCallId}',
													},
													emptyText: 'Vessel Call Id',
												},
											],
										},
										{
											xtype: 'textfield',
											reference: 'txtGateOutCommodity',
											fieldLabel: ViewUtil.getLabel('gateoperation.commodity'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateOutLorry.cmdtNm}',
											},
										},
										{
											xtype: 'container',
											hidden: true,
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'txtGateOutLicenseNo',
													flex: 1,
													labelWidth: 100,
													fieldLabel: ViewUtil.getLabel('gateoperation.licenseno'),
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateOutLorry.liscNo}',
													},
												},
												{
													xtype: 'textfield',
													reference: 'txtGateOutExpiryDate',
													fieldLabel: ViewUtil.getLabel('gateoperation.expirydate'),
													flex: 1,
													labelWidth: 60,
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateOutLorry.expdate}',
													},
												},
											],
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'txtGateOutTransporter',
													fieldLabel: ViewUtil.getLabel('gateoperation.transporter'),
													flex: 1,
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateOutLorry.tsptr}',
													},
												},
												{
													xtype: 'textfield',
													reference: 'txtGateOutTransporterName',
													flex: 0.75,
													margin: '0 0 0 5',
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateOutLorry.tsptCompNm}',
													},
												},
											],
										},
										{
											xtype: 'datetimefield',
											reference: 'refGateOutDateTime',
											fieldLabel: ViewUtil.getLabel('gateoperation.gateoutime'),
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											anchor: '100%',
											editable: false,
											//width: setWidth
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
												},
												{
													xtype: 'button',
													text: ViewUtil.getLabel('ok'),
													width: 80,
													listeners: {
														click: 'onOk',
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
										labelAlign: 'right',
										labelWidth: 100,
										width: '100%',
										margin: '5 0 0 0',
									},
									items: [
										{
											xtype: 'textfield',
											margin: '0 0 0 0',
											reference: 'txtGOCustomStatus',
											fieldLabel: ViewUtil.getLabel('gateoperation.custom'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateOutLorry.customsReleaseStatus}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'txtGateOutQty',
											fieldLabel: ViewUtil.getLabel('gateoperation.qty'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateOutLorry.pkgQty}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'txtGateOutMt',
											fieldLabel: ViewUtil.getLabel('gateoperation.mt'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateOutLorry.wgt}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'txtGateOutM3',
											fieldLabel: ViewUtil.getLabel('gateoperation.m3'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateOutLorry.msrmt}',
											},
										},
									],
								},
							],
						},
						{
							xtype: 'fieldset',
							flex: 1,
							margin: '0 0 0 5',
							padding: '0 0 0 0',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							defaults: {
								labelAlign: 'right',
							},
							items: [
								{
									xtype: 'tsb-datagrid',
									reference: me.MAIN_GRID_REF_NAME,
									usePagingToolbar: false,
									flex: 1,
									plugins: ['gridexporter', 'gridfilters', 'clipboard'],
									bind: {
										store: '{' + me.MAIN_STORE_NAME + '}',
									},
									selModel: {
										type: 'spreadsheet',
										cellSelect: false,
									},
									listeners: {
										cellclick: 'onGridGOREClick1',
									},

									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center',
										},
										items: GridUtil.getGridColumns('GateOutCargo'),
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
