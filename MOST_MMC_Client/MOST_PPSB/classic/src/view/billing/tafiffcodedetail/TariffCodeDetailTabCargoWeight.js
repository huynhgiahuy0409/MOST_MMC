Ext.define('MOST.view.billing.tariffcodedetail.TariffCodeDetailTabCargoWeight', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-tariffcodedetailtabcargoweight',
	requires: [],

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					// Wrapped vbox(Left Side, Right Side)
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							// Left vbox
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'label',
									text: ViewUtil.getLabel('tariffCargoLift'),
									margin: '5 0 0 10',
									style: 'text-align:left',
                                    height: 26
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									items: [
										{
											xtype: 'radio',
											reference: 'rdoOperator',
											margin: '0 0 0 10',
											checked: true,
											bind: {
												value: '{!rdoFromTo.checked}',
											},
										},
                                        {
                                            xtype: 'label',
                                            text: ViewUtil.getLabel('operator'),
                                            height: 26,
                                            width: 100,
                                            style: 'line-height: 26px',
                                            margin: '0 0 0 5',
                                        },
										{
											xtype: 'combobox',
											reference: 'cboOperator',
											flex: 1,
                                            margin: '0 0 0 5',
											bind: {
												store: '{operatorCombo}',
												disabled: '{rdoFromTo.checked}',
												value: '{theDetail.operator}',
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											editable: false,
										},
										{
											xtype: 'numberfield',
                                            flex: 1,
                                            margin: '0 0 0 5',
											reference: 'txtCargoListOperatorNumber',
											fieldLabel: '',
											bind: {
												disabled: '{rdoFromTo.checked}',
												value: '{theDetail.operatorNo}',
											},
											maskRe: /[0-9]/,
											decimalPrecision: 3,
											minValue: 0,
											maxValue: 9999,
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
										labelWidth: 100,
									},
									items: [
										{
											xtype: 'radio',
											reference: 'rdoFromTo',
											margin: '0 0 0 10',
											bind: {
												value: '{!rdoOperator.checked}',
											},
										},
                                        {
                                            xtype: 'label',
                                            text: ViewUtil.getLabel('from'),
                                            height: 26,
                                            width: 105,
                                            style: 'line-height: 26px',
                                            margin: '0 0 0 5',
                                        },
										{
											xtype: 'numberfield',
                                            flex: 1,
                                            margin: '0 5 0 0',
											reference: 'txtCargoListFrom',
											style: 'text-align:right',
											decimalPrecision: 3,
											minValue: 0,
											maxValue: 99999,
											bind: {
												disabled: '{rdoOperator.checked}',
												value: '{theDetail.cargoFrom}',
											},
										},
										{
											xtype: 'numberfield',
                                            flex: 1,
											fieldLabel: ViewUtil.getLabel('to'),
											reference: 'txtCargoListTo',
											style: 'text-align:right',
											labelWidth: 20,
											decimalPrecision: 3,
											minValue: 0,
											maxValue: 99999,
											bind: {
												disabled: '{rdoOperator.checked}',
												value: '{theDetail.cargoTo}',
											},
										},
									],
								},
								{
									xtype: 'container',
                                    width: '100%',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'left',
										labelWidth: 123,
									},
									items: [
										{
											xtype: 'combobox',
                                            flex: 1,
											reference: 'cboMeasurementCondition',
											fieldLabel: ViewUtil.getLabel('tariffMeasurementCondition'),
											bind: {
												store: '{invoiceUnit1Combo}',
												value: '{theDetail.msrmtCond}',
											},
											margin: '5 0 0 10',
											queryMode: 'local',
											displayField: 'unitCd',
											valueField: 'unitCd',
											editable: false,
										},
									],
								},
							],
						},
						{
							// Right vbox
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [],
						},
					],
				},
			],
		});

		me.callParent();
	},
});
