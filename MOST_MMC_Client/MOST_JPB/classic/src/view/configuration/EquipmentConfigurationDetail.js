Ext.define('MOST.view.configuration.EquipmentConfigurationDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-equipmentconfigurationdetail',

	requires: [],

	width: 900,
	height: 640,

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	listeners: {
		afterrender: 'onDetailLoad',
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	DETAIL_GRID_FILEUPLOAD_NAME: 'refEquipmentDetailUploadGrid', // Main Grid Name
	DETAIL_STORE_FILEUPLOAD_NAME: 'equipmentDetailUpload', // Main Store Name

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			xtype: 'form',
			defaults: {
				margin: '0 0 0 0', // top, right, bottom, left
			},
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			items: [
				{
					xtype: 'fieldset',
					margin: '5 5 5 5',
					padding: '10 10 10 10',
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
							defaults: {
								margin: '0 0 5 0',
								labelAlign: 'right',
								labelWidth: 100,
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'ctlEqFacCdDetail',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('eqFacCode'),
											allowBlank: false,
											fieldStyle: 'text-transform:uppercase',
											listeners: {
												change: 'onUpperCase',
											},
											bind: '{theDetail.eqFacNo}',
										},
										{
											xtype: 'button',
											margin: '0 0 0 5',
											text: ViewUtil.getLabel('eqDuplication'),
											listeners: {
												click: 'onCheckDuplicationEqCd',
											},
										},
									],
								},
								{
									xtype: 'combo',
									reference: 'ctlEqTpDetail',
									fieldLabel: ViewUtil.getLabel('eqType'),
									allowBlank: false,
									editable: false,
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									bind: {
										store: '{equipmentTypeDetailCombo}',
										value: '{theDetail.eqTpCd}',
									},
									listeners: {
										change: 'onChangeCapaListCombo',
									},
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('eqFacNm'),
									allowBlank: false,
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase',
									},
									bind: '{theDetail.eqFacNm}',
								},
								{
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('eqUsed'),
									queryMode: 'local',
									displayField: 'codeName',
									valueField: 'code',
									editable: false,
									bind: {
										store: '{equipmentUsedYn}',
										value: '{theDetail.useYN}',
									},
								},
								{
									xtype: 'combo',
									reference: 'ctlEqLocDetail',
									fieldLabel: ViewUtil.getLabel('eqLocation'),
									queryMode: 'local',
									displayField: 'locNm',
									valueField: 'locId',
									editable: false,
									bind: {
										store: '{equipmentLocDetailCombo}',
										value: '{theDetail.loc}',
									},
									listeners: {
										select: 'onSelectBerthLocation',
									},
									emptyText: 'Select',
								},
								{
									xtype: 'container',
									reference: 'refWharfMarkContainer',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('eqWharfMark') + ':',
											style: {
												"margin": "5px 5px 0px 0px",
												"text-align": "right",
												"width": "100px"
											}
										},
										{
											xtype: 'numberfield',
											reference: 'refWharfMarkFrom',
											flex: 1,
											disabled: true,
											bind: {
												value: '{theDetail.wharfMarkFrom}',
											},
											listeners: {
												focusleave: 'onWharfMarkFocusLeave',
											}
										},
										{
											xtype: 'numberfield',
											reference: 'refWharfMarkTo',
											flex: 1,
											disabled: true,
											margin: '0 0 0 5',
											bind: {
												value: '{theDetail.wharfMarkTo}',
											},
											listeners: {
												focusleave: 'onWharfMarkFocusLeave',
											}
										}
									]
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('eqModel'),
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase',
									},
									bind: '{theDetail.mdl}',
								},
								{
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('eqManufacturer'),
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									editable: false,
									bind: {
										store: '{equipmentMkrDetailCombo}',
										value: '{theDetail.mkrCd}',
									},
									emptyText: 'Select',
								},
								{
									xtype: 'numberfield',
									fieldLabel: ViewUtil.getLabel('eqProductionYear'),
									bind: '{theDetail.pductYear}',
									maxLength: 4,
									enforceMaxLength: true,
									maskRe: /[0-9:]/,
								},
								{
									xtype: 'container',
									margin: '0 0 0 100',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'radiogroup',
											reference: 'ctl_ownDivCd',
											bind: '{ownDivCdInput}',
											defaults: {
												width: 100
											},
											items: [
												{
													xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('internalequ'),
													name: 'inExternal_radio',
													inputValue: 'I',
												},
												{
													xtype: 'radiofield',
													margin: '0 0 0 15',
													boxLabel: ViewUtil.getLabel('externalequ'),
													name: 'inExternal_radio',
													inputValue: 'E',
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									margin: '0 0 0 100',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'radiogroup',
											reference: 'ctl_purpCd',
											bind: '{purpCdInput}',
											defaults: {
												width: 100
											},
											items: [
												{
													xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('equbulk'),
													name: 'purpCd_radio',
													inputValue: 'BH',
												},
												{
													xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('equbreak'),
													width: 100,
													margin: '0 0 0 15',
													name: 'purpCd_radio',
													inputValue: 'BB',
												},
												{
													xtype: 'radiofield',
													margin: '0 0 0 15',
													boxLabel: ViewUtil.getLabel('equfacility'),
													name: 'purpCd_radio',
													inputValue: 'FC',
												},
											],
										},
									],
								},
							],
						},
						{
							xtype: 'container',
							flex: 1,
							margin: '0 0 0 5',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 140,
								margin: '0 0 5 0',
							},
							items: [
								{
									xtype: 'combo',
									reference: 'ctlSafetyWorkLoad',
									fieldLabel: ViewUtil.getLabel('eqSafetyWorkLoadMT'),
									allowBlank: false,
									editable: false,
									queryMode: 'local',
									displayField: 'capaDesc',
									valueField: 'capaCd',
									bind: {
										store: '{equipmentCapaDetailCombo}',
										value: '{theDetail.capaCd}',
									},
									emptyText: 'Select',
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('eqAvgHourMeterpermonth'),
									bind: '{theDetail.avgHm}',
									maskRe: /[0-9:]/,
								},
								{
									xtype: 'datefield',
									format: MOST.config.Locale.getShortDate(),
									fieldLabel: ViewUtil.getLabel('eqRegistrationDate'),
									maskRe: /[0-9]/,
									altFormats: 'dmY',
									enableKeyEvents: true,
									bind: '{instlYmdString}',
									listeners: {
										focusleave: 'onAutoFillDate',
										keydown: 'onAutoFillDateWhenEnter',
										focusenter: 'onAutoSelect',
									},
								},
								{
									xtype: 'textfield',
									height: 57,
									fieldLabel: ViewUtil.getLabel('eqRemark'),
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase',
									},
									bind: '{theDetail.rmk}',
								},
								{
									xtype: 'numberfield',
									reference: 'ctlDiameter',
									fieldLabel: ViewUtil.getLabel('EQDiameter'),
									fieldStyle: 'text-transform:uppercase',
									listeners: {
									},
									bind: '{theDetail.diameter}',
								},
								{
									xtype: 'textfield',
									reference: 'ctlSafetyPressureLimit',
									fieldLabel: ViewUtil.getLabel('EQSafetyPressureLimit'),
									fieldStyle: 'text-transform:uppercase',
									bind: '{theDetail.safetyLimit}',
								},
								{
									xtype: 'partnercdfield',
									fieldLabel: ViewUtil.getLabel('EQContractor'),
									reference: 'ctlContractor',
									bind: {
										value: '{theDetail.contractor}',
									},
									params: {
										ptnrType: CodeConstants.CM_PTNRTP_CTT,
									},
								},
								{
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('eqStatus'),
									allowBlank: false,
									editable: false,
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									bind: {
										store: '{equipmentStatDetailCombo}',
										value: '{theDetail.statCd}',
									},
								},
								{
									xtype: 'combo',
									reference: 'ctlStopRsnCd',
									fieldLabel: ViewUtil.getLabel('eqStoppageReason'),
									editable: false,
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									bind: {
										store: '{equipmentStopRsnCdDetailCombo}',
										value: '{theDetail.stopRsnCd}',
									},
									emptyText: 'Select',
									listeners: {
										change: 'enableWharfContainer',
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
											xtype: 'label',
											text: ViewUtil.getLabel('eqStopagePeriod') + ':',
											style: {
												"margin": "5px 5px 0px 0px",
												"text-align": "right",
												"width": "140px"
											}
										},
										{
											xtype: 'datefield',
											reference: 'refPeriodStDt',
											disabled: true,
											bind:  '{theDetail.periodSt}',
											flex: 1,
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												change: 'checkFromToPeriod',
											}
										},
										{
											xtype: 'datefield',
											reference: 'refPeriodEdDt',
											disabled: true,
											bind:  '{theDetail.periodEd}',
											flex: 1,
											margin: '0 0 0 5',
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												change: 'checkFromToPeriod',
											}
										}
									]
								},
							],
						},
					]
				},
				{
					xtype: 'container',
					margin: '0 5 5 0',
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'end',
					},
					items: [
						{
							xtype: 'filefield',
							name: 'fileUpload',
							itemId: 'createButton',
							id: 'equipmentDetailFileUpload',
							style: 'text-align:left; width: 100px; margin-right: 5px',
							method: 'POST',
							fileUpload: true,
							enctype: 'multipart/form-data',
							buttonText: '',
							buttonOnly: true,
							multiple: true,
							buttonConfig: {
								text: ViewUtil.getLabel('add'),
								iconCls: 'x-fa fa-plus',
								width: 100
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
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							text: ViewUtil.getLabel('remove'),
							width: 100,
							listeners: {
								click: 'onEquipmentDetailFileUploadGridRemove',
							},
						},
					],
				},
				{
					xtype: 'fieldset',
					margin: '0 5 5 5',
					padding: '0 0 0 0',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'tsb-datagrid',
							reference: me.DETAIL_GRID_FILEUPLOAD_NAME,
							flex: 1,
							stateful: true,
							usePagingToolbar: false,
							stateId: 'stateEquipmentDetailPlanUploadGrid',
							plugins: ['gridexporter', 'gridfilters', 'clipboard'],
							bind: {
								store: '{' + me.DETAIL_STORE_FILEUPLOAD_NAME + '}',
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
								defaults: {
									style: 'text-align:center',
									align: 'center',
								},
								items: GridUtil.getGridColumns('EquipmentDetailGrid'),
							},
						},
					],
				},
			],
		});

		me.callParent();
	},
});
