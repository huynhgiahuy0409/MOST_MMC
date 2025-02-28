Ext.define('MOST.view.planning.vesselscheduleinternal.VesselScheduleDetailTabMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselscheduledetailtabmain',

	requires: [],

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('berthPlanning'),
					margin: '0 0 0 0',
					padding: '0 10 10 10',
					layout: {
						type: 'vbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
							},
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'combobox',
									reference: 'ctlBerthLocation',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('berthLocation'),
									labelWidth: 80,
									name: 'berthLocationCombo',
									queryMode: 'local',
									bind: {
										store: '{vesselScheduleBerthInfoCombo}',
										value: '{theMain.berthLoc}',
										readOnly: '{externalMode}',
									},
									displayField: 'locNm',
									valueField: 'locId',
									value: '',
									forceSelection: true,
									allowBlank: false,
									listeners: {
										select: 'onBerthLocationComboChange',
									},
								},
								{
									xtype: 'combobox',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('vslschBerthLabel'),
									labelWidth: 80,
									reference: 'ctlBerthLabel',
									queryMode: 'local',
									editable: false,
									bind: {
										store: '{vesselScheduleBerthLabelCombo}',
										value: '{theMain.berthLabel}',
										readOnly: '{externalMode}',
									},
									displayField: 'berthLabelNm',
									valueField: 'berthLabel',
									value: '',
								},
								{
									xtype: 'numberfield',
									reference: 'ctlVesselScheduleDetailWharfMarkStarts',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('wharfMarkStarts'),
									labelWidth: 100,
									bind: '{theMain.wharfMarkFrom}',
									readOnly: true,
									listeners: {
										focusleave: 'onWharfMarkStartsFocusleave',
									},
								},
								{
									xtype: 'numberfield',
									reference: 'ctlVesselScheduleDetailWharfMarkEnds',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('wharfMarkEnds'),
									labelWidth: 100,
									bind: '{theMain.wharfMarkTo}',
									readOnly: true,
								},
								{
									xtype: 'button',
									margin: '0 5 0 5',
									width: 100,
									text: ViewUtil.getLabel('addBerthPlan'),
									bind: {
										disabled: '{externalMode}',
									},
									listeners: {
										click: 'onAddBerthPlanClick',
									},
								},
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 5',
									reference: 'refChkDoubleBankingDtl',
									boxLabel: ViewUtil.getLabel('doubleBankingCheckBox'),
									value: 'false',
									readOnly: true,
									bind: '{theMain.dbYnChecked}',
								},
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 5',
									boxLabel: ViewUtil.getLabel('confirmationSlip'),
									readOnly: true,
									bind: '{csYnChecked}',
								},
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 5',
									boxLabel: ViewUtil.getLabel('dg'),
									readOnly: true,
									bind: '{theMain.dgGoodYnChecked}',
								},
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 5',
									boxLabel: ViewUtil.getLabel('isps'),
									readOnly: true,
									bind: '{theMain.ispsYnChecked}',
								},
							],
						},
					],
				},
				{
					xtype: 'fieldset',
					padding: '0 10 10 10',
					margin: '0 0 0 0',
					title: ViewUtil.getLabel('vesselParticularInformation'),
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'container',
							flex: 4,
							defaults: {
								margin: '5 0 0 0',
							},
							items: [
								{
									xtype: 'container',
									margin: '0 0 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vesselId'),
											bind: '{theMain.vslCd}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vesselName'),
											bind: '{theMain.vslNm}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('invoiceStatus'),
											readOnly: true,
											bind: '{theMain.invoiceStatus}',
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vslpatiBreadth'),
											bind: '{theMain.vslWidth}',
											editable: false,
										},
									],
								},
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('loa'),
											bind: '{theMain.loa}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('nrt'),
											bind: '{theMain.nrt}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vesselType'),
											bind: '{theMain.vslTpNm}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('sAgency'),
											bind: '{theMain.arrvSaId}',
											editable: false,
										},
									],
								},
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('isscNo'),
											bind: '{theMain.isscNo}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vesselOwner'),
											bind: '{theMain.vslOwner}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('grt'),
											bind: '{theMain.grt}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('dwt'),
											bind: '{theMain.dwt}',
											editable: false,
										},
									],
								},
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'datetimefield',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											flex: 1,
											fieldLabel: ViewUtil.getLabel('expiryDate'),
											bind: '{theMain.isscExprDt}',
											readOnly: true,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('highestPoint'),
											bind: '{theMain.highestPoint}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('authority'),
											bind: '{theMain.isscNmAuth}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('callSign'),
											bind: '{theMain.callSign}',
											editable: false,
										},
									],
								},
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'textfield',
											flex: 2,
											fieldLabel: ViewUtil.getLabel('remark'),
											bind: '{theMain.remarks}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('imoNo'),
											bind: '{theMain.imoNo}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('btr'),
											bind: '{theMain.btr}',
											editable: false,
										},
									],
								},
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('novaStatus'),
											bind: '{theMain.summitStatName}',
											editable: false,
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('status'),
											bind: '{theMain.reconcileStatus}',
											editable: false,
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
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('dAgency'),
									labelAlign: 'right',
									labelWidth: 60,
									width: '100%',
									margin: '0 0 5 0',
									bind: '{theMain.deprSaId}',
									editable: false,
								},
								{
									xtype: 'fieldset',
									margin: '0 0 0 10',
									padding: '0 10 10 10',
									title: ViewUtil.getLabel('ogaStatus'),
									defaults: {
										margin: '5 0 0 0',
										anchor: '100%',
									},
									items: [
										{
											xtype: 'textfield',
											margin: '0 0 0 0',
											reference: 'ctlOgaStatusText',
											bind: '{theMain.ogaStatus}',
											readOnly: true,
										},
										{
											xtype: 'datetimefield',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											reference: 'ctlOgaDate',
											bind: '{theMain.ogaStatusDate}',
											readOnly: true,
										},
										{
											xtype: 'textfield',
											reference: 'refOgaQuarantineText',
											bind: '{theMain.ogaQuarantine}',
											readOnly: true,
										},
									],
								},
							],
						},
					],
				},
				{
					xtype: 'fieldset',
					padding: '0 10 10 10',
					margin: '0 0 0 0',
					title: ViewUtil.getLabel('voyageInformation'),
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					defaults: {
						flex: 1,
					},
					items: [
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								labelWidth: 70,
								width: '100%',
								margin: '5 0 0 0',
							},
							layout: {
								type: 'vbox',
							},
							items: [
								{
									xtype: 'textfield',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('vslschCallId'),
									reference: 'txtJpvc',
									bind: '{theMain.vslCallId}',
									editable: false,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('eta'),
									reference: 'txtETA',
									bind: '{theMain.eta}',
									readOnly: true,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('etb'),
									reference: 'txtETB',
									editable: true,
									bind: {
										value: '{theMain.etb}',
										readOnly: '{externalMode}',
									},
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('etw'),
									editable: true,
									reference: 'txtETW',
									bind: {
										value: '{theMain.etw}',
										readOnly: '{externalMode}',
									},
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('etc'),
									editable: true,
									reference: 'txtETC',
									bind: {
										value: '{theMain.etc}',
										readOnly: '{externalMode}',
									},
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('etu'),
									reference: 'txtETU',
									editable: true,
									bind: {
										value: '{theMain.etu}',
										readOnly: '{externalMode}',
									},
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('etd'),
									editable: true,
									reference: 'txtETD',
									bind: {
										value: '{theMain.etd}',
										readOnly: '{externalMode}',
									},
								},
							],
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 70,
								width: '100%',
								margin: '5 0 0 0',
							},
							items: [
								{
									xtype: 'textfield',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: '{theMain.shipCallNo}',
									editable: false,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									reference: 'txtATA',
									fieldLabel: ViewUtil.getLabel('ata'),
									bind: '{theMain.ata}',
									readOnly: false,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									reference: 'txtCurrATB',
									fieldLabel: ViewUtil.getLabel('currentAtb'),
									bind: {
										value: '{theMain.curAtb}',
									},
									editable: false,
									readOnly: true,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('atb'),
									reference: 'txtATB',
									bind: {
										value: '{theMain.atb}',
										readOnly: '{externalMode}',
									},
									listeners: {
										select: {
											fn: 'checkBerthMaintenance',
											args:[true]
										}
									},
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									reference: 'txtATW',
									fieldLabel: ViewUtil.getLabel('atw'),
									bind: '{theMain.atw}',
									readOnly: false,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									reference: 'txtATC',
									fieldLabel: ViewUtil.getLabel('atc'),
									bind: '{theMain.atc}',
									readOnly: false,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									reference: 'txtATU',
									fieldLabel: ViewUtil.getLabel('atu'),
									bind: {
										value: '{theMain.atu}',
										readOnly: '{externalMode}',
									},
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									reference: 'txtATD',
									fieldLabel: ViewUtil.getLabel('atd'),
									bind: '{theMain.atd}',
									readOnly: false,
								},
							],
						},
						{
							xtype: 'container',
							flex: 1.3,
							defaults: {
								labelAlign: 'right',
								labelWidth: 85,
								width: '100%',
								margin: '5 0 0 10'
							},
							layout: {
								type: 'vbox',
							},
							items: [
								{
									xtype: 'datetimefield',
									margin: '0 0 0 10',
									fieldLabel: ViewUtil.getLabel('pilotBookDateTime'),
									bind: '{theMain.pilotBookDateTime}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									readOnly: true,
									labelWidth: 125,
								},
								{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('vslpatiDomestic'),
									reference: 'refDomesticChk',
									bind: '{domesticChecked}',
									inputValue: 'Y',
									uncheckedValue: 'N',
								},
								{
									xtype: 'container',
									margin: '36 0 0 10',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 50,
									},
									items: [
										{
											xtype: 'checkboxfield',
											boxLabel: ViewUtil.getLabel('pilot'),
											bind: {
												value: '{atbPilotChecked}',
												readOnly: '{externalMode}',
											},
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('mooring'),
											flex: 1,
											minValue: 0,
											maxValue: 99999.99,
											decimalPrecision: 2,
											selectOnFocus: true,
											bind: {
												value: '{theMain.atbMooring}',
												readOnly: '{externalMode}',
											},
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('tug'),
											flex: 1,
											minValue: 0,
											maxValue: 99999.99,
											decimalPrecision: 2,
											selectOnFocus: true,
											bind: {
												value: '{theMain.atbTug}',
												readOnly: '{externalMode}',
											},
										},
									],
								},
								{
									xtype: 'container',
									margin: '67 0 0 10',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 50,
									},
									items: [
										{
											xtype: 'checkboxfield',
											boxLabel: ViewUtil.getLabel('pilot'),
											bind: {
												value: '{atuPilotChecked}',
												readOnly: '{externalMode}',
											},
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('mooring'),
											flex: 1,
											minValue: 0,
											maxValue: 99999.99,
											decimalPrecision: 2,
											selectOnFocus: true,
											bind: {
												value: '{theMain.atuMooring}',
												readOnly: '{externalMode}',
											},
										},
										{
											xtype: 'numberfield',
											fieldLabel: ViewUtil.getLabel('tug'),
											flex: 1,
											minValue: 0,
											maxValue: 99999.99,
											decimalPrecision: 2,
											selectOnFocus: true,
											bind: {
												value: '{theMain.atuTug}',
												readOnly: '{externalMode}',
											},
										},
									],
								},
							],
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
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
									fieldLabel: ViewUtil.getLabel('inbound'),
									bind: '{theMain.inbVoy}',
									editable: false,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('dischCargo'),
									bind: '{theMain.dischCargo}',
									editable: false,
								},
								{
									xtype: 'numberfield',
									fieldLabel: ViewUtil.getLabel('dischQty'),
									bind: '{theMain.dischCargoQty}',
									readOnly: true,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('dischMt'),
									editable: false,
								},
								{
									xtype: 'numberfield',
									fieldLabel: ViewUtil.getLabel('dischM3'),
									readOnly: true,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('shiftQty'),
									bind: '{theMain.shiftCargoQty}',
									editable: false,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('purposeOfCall'),
									bind: '{theMain.purpCall}',
									editable: false,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('arrivalDraft'),
									bind: '{theMain.drfArrv}',
									editable: false,
								},
							],
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								labelWidth: 85,
								width: '100%',
								margin: '5 0 0 0',
							},
							layout: {
								type: 'vbox',
							},
							items: [
								{
									xtype: 'textfield',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('outbound'),
									bind: '{theMain.outbVoy}',
									editable: false,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('loadCargo'),
									bind: '{theMain.loadCargo}',
									editable: false,
								},
								{
									xtype: 'numberfield',
									fieldLabel: ViewUtil.getLabel('loadQty'),
									bind: '{theMain.loadCargoQty}',
									readOnly: true,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('loadMt'),
									editable: false,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('loadM3'),
									editable: false,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('pilotOn'),
									bind: '{theMain.pilotOnboard}',
									editable: false,
									readOnly: true,
								},
								{
									xtype: 'datetimefield',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									fieldLabel: ViewUtil.getLabel('pilotOff'),
									bind: '{theMain.pilotDisembark}',
									editable: false,
									readOnly: true,
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('departureDraft'),
									bind: '{theMain.drfDeptr}',
									editable: false,
								},
							],
						},
					],
				},
				{
					xtype: 'fieldset',
					margin: '0 0 0 0',
					padding: '0 10 10 10',
					title: ViewUtil.getLabel('doubleBankingInformation'),
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					defaults: {
						labelAlign: 'right',
						margin: '0 0 0 10',
					},
					items: [
						{
							xtype: 'textfield',
							flex: 1,
							fieldLabel: ViewUtil.getLabel('motherVesselJpvc'),
							labelWidth: 150,
							readOnly: true,
							bind: '{theMain.motherVslCallId}',
						},
						{
							xtype: 'textfield',
							flex: 1,
							fieldLabel: ViewUtil.getLabel('doubleBankingVesselJpvc'),
							labelWidth: 150,
							readOnly: true,
							bind: '{theMain.dbVslCallId}',
						},
						{
							xtype: 'container',
							flex: 1,
						},
					],
				},
			],
		});

		me.callParent();
	},
});
