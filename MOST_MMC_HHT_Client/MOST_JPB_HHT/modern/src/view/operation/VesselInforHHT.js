Ext.define('MOST.view.operation.VesselInfoHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vesselinformationhht',

	requires: [
		'MOST.view.vessel.VesselInforHHTController',
		'MOST.view.vessel.VesselScheduleModel',
		'MOST.view.common.DateTimeLocalField'
	],
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	controller: 'vesselinforhht',
	viewModel: {
		type: 'vesselschedule'
	},
	reference: 'refVesselInforHHT',
	listeners: {
		initialize: 'onLoadVslInfoHHT',
		show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},

	layout: 'fit',
	shadow: false,
	padding: 5,
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	items: [
		{
			xtype: 'formpanel',
			padding: 0,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{// infor
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'fieldset',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelWidth: 50,
								labelAlign: 'left',
								labelTextAlign: 'right',
							},
							items: [
								{
									xtype: 'numberfield',
									reference: 'refWharfMarkFrom',
									label: 'Wharf Mark Start',
									labelWidth: 130,
									//height: 37,
									ui: 'field-inputcolor',
									minValue: 0,
									bind: {
										value: '{theVslSchl.wharfMarkFrom}'
									},
									listeners: {
										focusleave: 'wharfMarkFocusOut'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'refWharfMarkTo',
									label: 'Wharf Mark End',
									ui: 'field-inputcolor',
									labelWidth: 130,
									//height: 37,
									minValue: 0,
									bind: {
										value: '{theVslSchl.wharfMarkTo}'
									},
									listeners: {
										//focusleave: 'wharfMarkFocusOut'
									}
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999,
									defaultValue: 0,
									label: 'LOA',
									reference: 'refTxtLoad',
									bind: {
										value: '{theVslSchl.loa}'
									},
									clearable: false,
									readOnly: true
								},
								{
									xtype: 'combobox',
									label: 'Berth',
									labelWidth: 50,
									queryMode: 'local',
									bind: {
										value: '{theVslSchl.berthLoc}',
										store: '{berthingListCombo}'
									},
									listeners: {
										select: 'onSelectBerth'
									},
									typeAhead: true,
									editable: false,
									displayField: 'locNm',
									valueField: 'locId'
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [{
										xtype: 'component',
										width: 50
									},
									{
										xtype: 'textfield',
										reference: 'refTxtPsStart',
										flex: 1,
										placeholder: 'From',
										readOnly: true
									},
									{
										xtype: 'spacer',
										width: 3
									},
									{
										xtype: 'textfield',
										reference: 'refTxtPsEnd',
										flex: 1,
										placeholder: 'To',
										readOnly: true
									}
									]
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refWorkDateEQARR',
									label: 'ETB',
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.etb}'
									},
									disabled: true,
									required: false
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refDtVslSchEtw',
									label: 'ETW',
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.etw}'
									},
									disabled: true,
									required: false
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refDtVslSchEtc',
									label: 'ETC',
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.etc}'
									},
									disabled: true,
									required: false
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refDtVslSchEtu',
									label: 'ETU',
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.etu}'
									},
									disabled: true,
									required: false
								}
							]
						},
						{
							xtype: 'fieldset',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelWidth: 55,
								labelAlign: 'left',
								labelTextAlign: 'right',
							},
							items: [
								{
									xtype: 'checkbox',
									reference: 'refChkAtbPilot',
									//margin: '0 0 4 0',
									label: 'Berth Pilot',
									labelWidth: 100,
									width: 120,
									bind: {
										checked: '{theVslSchl.atbPilot == "Y"}'
									}
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'numberfield',
											flex: 1,
											ui: 'field-inputcolor',
											placeholder: 'Mooring',
											bind: {
												value: '{theVslSchl.atbMooring}'
											}
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'numberfield',
											flex: 1,
											ui: 'field-inputcolor',
											placeholder: 'Tug',
											bind: {
												value: '{theVslSchl.atbTug}'
											}
										}
									]
								},
								{
									xtype: 'checkbox',
									reference: 'refChkAtuPilot',
									//margin: '0 0 4 0',
									label: 'Unberth Pilot',
									labelWidth: 100,
									width: 120,
									bind: {
										checked: '{theVslSchl.atuPilot == "Y"}'
									}
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'numberfield',
											flex: 1,
											fieldStyle: 'float:left;',
											ui: 'field-inputcolor',
											placeholder: 'Mooring',
											bind: {
												value: '{theVslSchl.atuMooring}'
											}
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'numberfield',
											flex: 1,
											fieldStyle: 'float:left;',
											ui: 'field-inputcolor',
											placeholder: 'Tug',
											bind: {
												value: '{theVslSchl.atuTug}'
											}
										}
									]
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refDtVslSchCurrAtb',
									label: 'CATB',
									labelWidth: 55,
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.curAtb}'
									},
									disabled: true,
									required: false
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refDtVslSchAtb',
									label: 'ATB',
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.atb}'
									},
									clearable: true,
									required: false
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refDtVslSchAtw',
									label: 'ATW',
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.atw}'
									},
									disabled: true,
									required: false
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refDtVslSchAtc',
									label: 'ATC',
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.atc}'
									},
									disabled: true,
									required: false
								},
								{
									xtype: 'datetimelocalfield',
									reference: 'refDtVslSchAtu',
									label: 'ATU',
									inputType: 'datetime-local',
									format: 'd/m/Y H:i',
									bind: {
										value: '{theVslSchl.atu}'
									},
									clearable: true,
									required: false
								}
							]
						}
					]
				},
				{
					xtype: 'container',
					margin: '0 7 5 5',
					padding: '0 0 0 0',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					items: [
						{
							xtype: 'button',
							reference: 'refBtnSaveVsl',
							text: 'Save',
							width: 125,
							iconCls: 'x-fa fa-save',
							ui: 'create-button-modern',
							bind: {
								disabled: '{!globalVesselCallId}',
							},
							handler: 'onSaveHHT'
						}
					]
				}
			]
		}
	]
});
