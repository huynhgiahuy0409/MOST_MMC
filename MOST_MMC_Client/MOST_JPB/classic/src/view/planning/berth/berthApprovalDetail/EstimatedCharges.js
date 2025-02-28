Ext.define('MOST.view.planning.berth.berthApprovalDetail.EstimatedCharges', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthapprovalestimatedcharges',

	requires: [],

	title: { type: 'bundle', key: 'estimatedCharges' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'panel',
					flex: 1,
					items: [
						{
							xtype: 'fieldset',
							title: ViewUtil.getLabel('vesselinformation'),
							margin: '0 0 0 0',
							padding: '0 10 10 10',
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
									layout: {
										type: 'vbox',
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 0 0 0',
										editable: false,
										width: '100%',
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vslCallId'),
											margin: '0 0 0 0',
											bind: '{vesselInfo.vslCallId}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vslNm'),
											bind: '{vesselInfo.vslNm}',
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
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 0 0 0',
										editable: false,
										width: '100%',
									},
									items: [
										{
											xtype: 'textfield',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('loadingcargo'),
											bind: '{vesselInfo.loadCargo}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('operationType'),
											bind: '{vesselInfo.opeTp}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('cargoType'),
											bind: '{vesselInfo.cgTp}',
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
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 0 0 0',
										editable: false,
										width: '100%',
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('discharging'),
											bind: '{vesselInfo.dischargeCargo}',
											margin: '0 0 0 0',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('etw'),
											bind: '{vesselInfo.etw}',
											readOnly: true,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('etc'),
											bind: '{vesselInfo.etc}',
											readOnly: true,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
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
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 0 0 0',
										width: '100%',
										editable: false,
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('loa'),
											bind: '{vesselInfo.loa}',
											margin: '0 0 0 0',
										},
										{
											xtype: 'datefield',
											fieldLabel: ViewUtil.getLabel('eta'),
											bind: '{vesselInfo.eta}',
											readOnly: true,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
										},
										{
											xtype: 'datefield',
											fieldLabel: ViewUtil.getLabel('etd'),
											bind: '{vesselInfo.etd}',
											readOnly: true,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
										},
									],
								},
							],
						},
						{
							xtype: 'fieldset',
							title: ViewUtil.getLabel('estimatecharges'),
							margin: '0 0 0 0',
							padding: '0 10 10 10',
							layout: {
								type: 'vbox',
								align: 'stretch',
								width: '100%',
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										pack: 'end',
									},
									items: [
										{
											xtype: 'button',
											width: 170,
											margin: '0 0 5 0',
											text: ViewUtil.getLabel('clear'),
											itemId: 'clearItemId',
											reference: 'refBtnClear',
											listeners: {
												click: 'onCalculationClear',
											},
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										width: '100%',
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0',
									},
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: ViewUtil.getLabel('portdues'),
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('rate'),
											labelWidth: 50,
											bind: '{calculation.pdrate}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('loa'),
											labelWidth: 50,
											bind: '{calculation.loa}',
											editable: false,
										},
										{
											xtype: 'container',
											width: 200,
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												width: '100%',
												pack: 'end',
											},
											defaults: {
												labelAlign: 'right',
												margin: '0 0 0 0',
												editable: false,
											},
											items: [
												{
													xtype: 'label',
													text: '=',
													style: 'text-align: right',
													margin: '5 5 0 0',
													width: 50,
												},
												{
													xtype: 'textfield',
													bind: '{calculation.pdtotal}',
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0',
									},
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: ViewUtil.getLabel('dockage'),
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('rate'),
											labelWidth: 50,
											bind: '{calculation.dkrate}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('loa'),
											labelWidth: 50,
											bind: '{calculation.loa}',
											editable: false,
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('hours'),
											bind: '{calculation.dkhours}',
											labelWidth: 50,
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												width: '100%',
												pack: 'end',
											},
											defaults: {
												labelAlign: 'right',
												margin: '0 0 0 0',
												editable: false,
											},
											items: [
												{
													xtype: 'label',
													text: '=',
													style: 'text-align: right',
													margin: '5 5 0 0',
													width: 50,
												},
												{
													xtype: 'textfield',
													bind: '{calculation.dktotal}',
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0',
									},
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: ViewUtil.getLabel('stevedore'),
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('rate'),
											labelWidth: 50,
											bind: '{calculation.sdrate}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('tonnage'),
											labelWidth: 50,
											bind: '{calculation.sdton}',
										},
										{
											xtype: 'container',
											width: 200,
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												width: '100%',
												pack: 'end',
											},
											defaults: {
												labelAlign: 'right',
												margin: '0 0 0 0',
												editable: false,
											},
											items: [
												{
													xtype: 'label',
													text: '=',
													style: 'text-align: right',
													margin: '5 5 0 0',
													width: 50,
												},
												{
													xtype: 'textfield',
													bind: '{calculation.sdtotal}',
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0',
									},
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: ViewUtil.getLabel('pilotagedue'),
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('rate'),
											labelWidth: 50,
											bind: '{calculation.ptdrate}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('loa'),
											labelWidth: 50,
											bind: '{calculation.loa}',
											editable: false,
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'label',
											text: ViewUtil.getLabel('twotimes'),
											style: 'text-align: left',
											margin: '5 0 0 17',
											width: 150,
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												pack: 'end',
											},
											defaults: {
												labelAlign: 'right',
												margin: '0 0 0 0',
												editable: false,
											},
											items: [
												{
													xtype: 'label',
													text: '=',
													style: 'text-align: right',
													margin: '5 5 0 0',
													width: 50,
												},
												{
													xtype: 'textfield',
													bind: '{calculation.ptdtotal}',
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0',
									},
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: ViewUtil.getLabel('tugservice'),
										},
										{
											xtype: 'numberfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('rate'),
											labelWidth: 50,
											bind: '{calculation.tsrate}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('loa'),
											labelWidth: 50,
											bind: '{calculation.loa}',
											editable: false,
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('hours'),
											labelWidth: 50,
											bind: '{calculation.tshours}',
										},
										{
											xtype: 'container',
											flex: 1,
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0',
									},
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: '',
										},
										{
											xtype: 'label',
											text: '×',
											margin: '5 0 0 305',
											style: 'text-align: center',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('tugqty'),
											labelWidth: 50,
											bind: '{calculation.tugqty}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'label',
											text: ViewUtil.getLabel('twotimes'),
											style: 'text-align: left',
											margin: '5 0 0 17',
											width: 150,
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												width: '100%',
												pack: 'end',
											},
											defaults: {
												labelAlign: 'right',
												margin: '0 0 0 0',
												editable: false,
											},
											items: [
												{
													xtype: 'label',
													text: '=',
													style: 'text-align: right',
													margin: '5 5 0 0',
													width: 50,
												},
												{
													xtype: 'textfield',
													bind: '{calculation.tstotal}',
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0',
									},
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: ViewUtil.getLabel('professionalfee'),
										},
										{
											xtype: 'numberfield',
											width: 200,
											labelWidth: 50,
											fieldLabel: ViewUtil.getLabel('rate'),
											bind: '{calculation.pfrate}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'numberfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('hours'),
											labelWidth: 50,
											bind: '{calculation.pfhours}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'label',
											text: ViewUtil.getLabel('twotimes'),
											style: 'text-align: left',
											margin: '5 0 0 17',
											width: 150,
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												pack: 'end',
											},
											defaults: {
												labelAlign: 'right',
												margin: '0 0 0 0',
												editable: false,
											},
											items: [
												{
													xtype: 'label',
													text: '=',
													style: 'text-align: right',
													margin: '5 5 0 0',
													width: 50,
												},
												{
													xtype: 'textfield',
													bind: '{calculation.pftotal}',
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 0 0',
									},
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: ViewUtil.getLabel('mooring'),
										},
										{
											xtype: 'numberfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('rate'),
											labelWidth: 50,
											bind: '{calculation.moorrate}',
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											width: 200,
											fieldLabel: ViewUtil.getLabel('loa'),
											labelWidth: 50,
											bind: '{calculation.loa}',
											editable: false,
										},
										{
											xtype: 'label',
											text: '×',
											style: 'text-align: center',
											margin: '5 0 0 0',
											width: 50,
										},
										{
											xtype: 'label',
											text: ViewUtil.getLabel('twotimes'),
											style: 'text-align: left',
											margin: '5 0 0 17',
											width: 150,
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												pack: 'end',
											},
											defaults: {
												labelAlign: 'right',
												margin: '0 0 0 0',
												editable: false,
											},
											items: [
												{
													xtype: 'label',
													text: '=',
													style: 'text-align: right',
													margin: '5 5 0 0',
													width: 50,
												},
												{
													xtype: 'textfield',
													bind: '{calculation.moortotal}',
												},
											],
										},
									],
								},
							],
						},
						{
							xtype: 'container',
							margin: '5 0 5 0',
							layout: {
								type: 'hbox',
							},
							defaults: {
								labelAlign: 'right',
							},
							items: [
								{
									xtype: 'textfield',
									margin: '0 0 0 115',
									width: 200,
									fieldLabel: ViewUtil.getLabel('amount'),
									labelWidth: 50,
									bind: '{calculation.amount}',
									editable: false,
								},
								{
									xtype: 'label',
									text: '+',
									style: 'text-align: center',
									margin: '5 0 0 0',
									width: 50,
								},
								{
									xtype: 'textfield',
									width: 130,
									bind: '{calculation.pecent}',
									value: 10,
									margin: '0 5 0 55',
								},
								{
									xtype: 'label',
									text: '%',
									style: 'text-align: center',
									margin: '5 0 0 0',
									width: 20,
								},
								{
									xtype: 'textfield',
									margin: '0 0 0 97',
									width: 145,
									editable: false,
									bind: '{calculation.tax}',
								},
								{
									xtype: 'container',
									flex: 1,
									margin: '0 10 0 0',
									layout: {
										type: 'hbox',
										pack: 'end',
									},
									defaults: {
										labelAlign: 'right',
										editable: false,
									},
									items: [
										{
											xtype: 'label',
											text: '=',
											style: 'text-align: right',
											margin: '5 5 0 0',
											width: 50,
										},
										{
											xtype: 'textfield',
											bind: '{calculation.totalamount}',
											editable: false,
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
