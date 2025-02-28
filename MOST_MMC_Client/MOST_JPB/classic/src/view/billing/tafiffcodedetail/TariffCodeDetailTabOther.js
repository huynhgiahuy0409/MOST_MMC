Ext.define('MOST.view.billing.tariffcodedetail.TariffCodesDetailTabOther', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-tariffcodesdetailtabother',
	requires: [],

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			margin: '5 0 0 0',
			items: [
				{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'top',
						pack: 'left',
					},
					defaults: {
						labelWidth: 100,
					},
					items: [
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'top',
								pack: 'left',
							},
							items: [
								{
									xtype: 'container',
									width: '100%',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('tariffStevedorRole'),
											labelWidth: 215,
											labelAlign: 'left',
											flex: 1,
											margin: '0 0 0 5',
											reference: 'txtStevedoreRole',
											bind: {
												value: '{theDetail.steveRole}',
											},
										},
										{
											xtype: 'button',
											iconCls: 'x-fa fa-search',
											reference: 'btnStevedoreRole',
											margin: '0 10 0 5',
											listeners: {
												click: {
													fn: 'onOpenCommonPopup',
													args: ['stevedoreRole'],
												},
											},
										},
									],
								},
								{ 
									xtype: 'label',
									margin: '5 0 0 5',
									text: ViewUtil.getLabel('tariffPenalty'),
									width: 220,
									height: 26,
									style: 'line-height: 26px'
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									width: '100%',
									layout: {
										type: 'hbox',
										pack: 'left',
									},
									items: [
										{
											xtype: 'radiogroup',
											margin: '0 0 0 15',
											width: 210,
											columns: 1,
											vertical: true,
											reference: 'refRadioGroupPenaltyOnLate',
											listeners: {
												change: 'rgChange',
											},
											defaults: {
												height: 26
											},
											items: [
												{
													boxLabel: ViewUtil.getLabel('tariffDaysAfterAtu'),
													reference: 'radioDaysAfterAtu',
												},
												{
													boxLabel: ViewUtil.getLabel('tariffSubDay'),
													margin: '5 0 0 0',
													checked: true,
													reference: 'radioSubDay',
												},
											],
										},
										{
											xtype: 'numberfield',
											reference: 'txtDelayDaysOnSubmissionManifest',
											flex: 1,
											margin: '0 10 0 0',
											minValue: 0,
											maxValue: 9,
											bind: {
												disabled: '{radioSubDay.checked}',
												value: '{theDetail.subDay}',
											},
										},
									],
								},
								{
									xtype: 'container',
									width: '100%',
									layout: 'hbox',
									margin: '5 0 0 0',
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('tariffPenaltyStevedore'),
											labelWidth: 220,
											flex: 1,
											reference: 'txtPenaltyStevedore',
											bind: {
												value: '{theDetail.paneltySteve}',
											},
										},
										{
											xtype: 'button',
											iconCls: 'x-fa fa-search',
											reference: 'btnPenaltyStevedore',
											margin: '0 10 0 5',
											listeners: {
												click: {
													fn: 'onOpenCommonPopup',
													args: ['penaltyStevedore'],
												},
											},
										},
									],
								},
								{
									xtype: 'checkboxfield',
									margin: '5 0 0 0',
									boxLabel: ViewUtil.getLabel('tariffPenLate'),
									labelWidth: 150,
									reference: 'chkPenLate',
									value: false,
									inputValue: 'Y',
									uncheckedValue: 'N',
									bind: {
										value: '{theDetail.penLate}',
									},
								},
							],
						},
						{
							xtype: 'container',
							flex: 1,
							style: {
								borderLeftStyle: 'solid',
								borderLeftWidth: '0.5px',
								borderLeftColor: '#d0d0d0',
							},
							layout: {
								type: 'vbox',
							},
							items: [
								//s-BILL-003 Tariff Code – Another tab Modification
								{
									xtype: 'container',
									width: '100%',
									layout: {
										type: 'hbox',
									},
									margin: '0 0 0 5',
									items: [
										{
											xtype: 'combobox',
											margin: '0 0 0 5',
											fieldLabel: ViewUtil.getLabel('tariffChargePerWB'),
											labelAlign: 'left',
											labelWidth: 230,
											reference: 'cboChargePerWB',
											flex: 1,
											bind: {
												store: '{chargePerWBCombo}',
												value: '{theDetail.chargePerWb}',
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											editable: true,
										},
										{
											xtype: 'container',
											margin: '5 0 0 5',
											width: 50
										},
									],
								},
								//s-BILL-003 Tariff Code – Another tab Modification
								{
									xtype: 'container',
									width: '100%',
									layout: {
										type: 'hbox',
									},
									margin: '5 0 0 5',
									items: [
										{
											xtype: 'combobox',
											margin: '0 0 0 5',
											fieldLabel: ViewUtil.getLabel('tariffUseOfWeigh'),
											labelAlign: 'left',
											labelWidth: 230,
											reference: 'cboUseOfWeigh',
											flex: 1,
											bind: {
												store: '{wbLryUseCombo}',
												value: '{theDetail.useOfWb}',
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											editable: true,
										},
										{
											xtype: 'label',
											text: 'Lorry',
											margin: '5 0 0 5',
											width: 50
										},
									],
								},
								{
									xtype: 'label',
									margin: '5 0 0 10',
									text: ViewUtil.getLabel('tariffCargoStorageDays'),
									width: 200,
									height: 26,
									style: 'line-height: 26px'
								},
								{
									xtype: 'container',
									width: '100%',
									layout: {
										type: 'hbox',
										align: 'center',
									},
									margin: '5 0 0 10',
									items: [
										{
											xtype: 'numberfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('from'),
											labelAlign: 'right',
											reference: 'txtCargoStorageDaysFrom',
											labelWidth: 50,
											minValue: 0,
											maxValue: 99999,
											bind: {
												value: '{theDetail.cgStorageFrom}',
											},
											listeners: {
												change: {
													fn: 'onChangeNumberTo',
													args: ['txtCargoStorageDaysFrom', 'txtCargoStorageDaysTo'],
												},
											},
										},
										{
											xtype: 'numberfield',
											reference: 'txtCargoStorageDaysTo',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('to'),
											labelAlign: 'right',
											labelWidth: 50,
											minValue: 0,
											maxValue: 99999,
											bind: {
												value: '{theDetail.cgStorageTo}',
											},
											listeners: {
												change: {
													fn: 'onChangeNumberTo',
													args: ['txtCargoStorageDaysFrom', 'txtCargoStorageDaysTo'],
												},
											},
										},
										{
											xtype: 'label',
											text: ViewUtil.getLabel('tariffDays'),
											margin: '5 0 0 5',
											width: 50
										},
									],
								},
								{ 
									xtype: 'label',
									margin: '5 0 0 10',
									text: ViewUtil.getLabel('tariffAccumulative'),
									width: 200,
									height: 26,
									style: 'line-height: 26px'
								},
								{
									xtype: 'container',
									width: '100%',
									layout: {
										type: 'hbox',
										align: 'center',
										pack: 'end',
									},
									margin: '5 0 0 10',
									items: [
										{
											xtype: 'numberfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('from'),
											reference: 'txtAccumulativeFrom',
											labelWidth: 50,
											style: 'text-align:right',
											maskRe: /[0-9]/,
											minValue: 0,
											maxValue: 99999999,
											bind: {
												value: '{theDetail.accumFrom}',
											},
											listeners: {
												change: {
													fn: 'onChangeNumberTo',
													args: ['txtAccumulativeFrom', 'txtAccumulativeTo'],
												},
											},
										},
										{
											xtype: 'numberfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('to'),
											style: 'text-align:right',
											reference: 'txtAccumulativeTo',
											labelWidth: 50,
											maskRe: /[0-9]/,
											minValue: 0,
											maxValue: 99999999,
											bind: {
												value: '{theDetail.accumTo}',
											},
											listeners: {
												change: {
													fn: 'onChangeNumberTo',
													args: ['txtAccumulativeFrom', 'txtAccumulativeTo'],
												},
											},
										},
										{
											xtype: 'label',
											text: ViewUtil.getLabel('mt'),
											margin: '5 0 0 5',
											width: 50
										},
									],
								},
								{
									xtype: 'checkboxfield',
									margin: '5 0 0 10',
									boxLabel: ViewUtil.getLabel('ssrYn'),
									labelWidth: 150,
									reference: 'chkSsrYn',
									value: false,
									inputValue: 'Y',
									uncheckedValue: 'N',
									bind: {
										value: '{theDetail.ssrYn}',
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
