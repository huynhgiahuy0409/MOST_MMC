Ext.define('MOST.view.billing.packagetariffdetail.PackageTariffRateTabDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-packagetariffratetabdetail',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],

	// Grid & Labels
	lblPackage: { type: 'bundle', key: 'pckTrfPackage' },
	lblPackageRate: { type: 'bundle', key: 'pckTrfPackageRate' },
	lblperiod: { type: 'bundle', key: 'period' },
	lblapplyDate: { type: 'bundle', key: 'applyDate' },
	lblDescription: { type: 'bundle', key: 'description' },
	lbltariffType: { type: 'bundle', key: 'tariffType' },
	lblpartnerCode: { type: 'bundle', key: 'partnerCode' },
	lblpartner: { type: 'bundle', key: 'partner' },
	lblpartnername: { type: 'bundle', key: 'partnername' },
	lblTariffCode: { type: 'bundle', key: 'pckTrfTariffCode' }, 

	// Button Labels
	btnAdd: { type: 'bundle', key: 'add' },
	btnRemove: { type: 'bundle', key: 'remove' },
	btnUpdate: { type: 'bundle', key: 'update' },
	btnClear: { type: 'bundle', key: 'clear' },

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
					padding: '5 10 10 10',
					items: [
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
									xtype: 'container',
									flex: 1,
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: 'container',
											width: '100%',
											items: [
												{
													xtype: 'container',
													layout: {
														type: 'hbox',
														align: 'stretch'
													}, 
													defaults: {
														labelAlign: 'right',
														margin: '0 5 0 0'
													},
													items: [
														{
															xtype: 'textfield',
															reference: 'refTrCd',
															fieldLabel: ViewUtil.getLabel('pckTrfTariffCode'),
															labelWidth: 60,
															editable: false,
															allowBlank: false,
															width: 150
														},
														{
															xtype: 'textfield',
															reference: 'refDesc',
															editable: false,
															allowBlank: false,
															flex: 1
														},
														{
															xtype: 'button',
															iconCls: 'x-fa fa-search',
															reference: 'btnFindTariff',
															listeners: {
																click: 'openTariffCodePopup'
															}
														},
													]
												},
												{
													xtype: 'container',
													layout: {
														type: 'hbox',
														align: 'stretch'
													},
													defaults: {
														labelAlign: 'right',
														margin: '5 5 0 0'
													},
													width: '100%',
													items: [
														{
															xtype: 'textfield',
															reference: 'refRate',
															fieldLabel: 'Rate',
															labelWidth: 60,
															flex: 1,
															editable: false,
														},
														{
															xtype: 'label',
															text: 'RM',
															margin: '10 0 0 5',
															width: 26
														},
													]
												},
											]
										},

									]
								},
								{
									xtype: 'container',
									padding: '0 0 0 20',
									flex: 1,
									items: [
										{
											xtype: 'container',
											width: '100%',
											layout: {
												type: 'hbox',
											},
											defaults: {
												labelAlign: 'right',
												margin: '5 0 0 0'
											},
											items: [
												{
													xtype: 'numberfield',
													reference: 'refPartnerRate',
													fieldLabel: ViewUtil.getLabel('pckTrfPckRate'),
													labelWidth: 100,
													flex: 1,
													minValue: 0,
													maxValue: 99999.99,
													margin: '5 0 0 0',
													allowBlank: false,
												},
												{
													xtype: 'label',
													text: 'RM',
													margin: '10 0 0 5',
													width: 26,
												}
											]
										},
										{
											xtype: 'container',
											margin: '5 0 0 0',
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'label',
													text: ViewUtil.getLabel('pckTrfPackageRateNoUnit'),
													margin: '5 0 0 30',
													width: 100,
												},
												{
													xtype: 'label',
													text: '',
													reference: 'lblPackRate',
													margin: '5 10 0 50',
													bind: {
														data: '{theCurrentDetail.pkgPrc}',
													}
												},
												{
													xtype: 'label',
													text: '...',
													reference: 'operator',
													margin: '5 10 0 0'
												},
												{
													xtype: 'label',
													text: '',
													reference: 'sumRate',
													width: 35,
													margin: '5 0 0 0',
												},
												{
													xtype: 'label',
													text: 'RM',
													margin: '5 10 0 0'
												},
											]
										},
									]
								}
							]
						}, 
					]
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					defaults: {
						width: 80,
						margin: '5 0 0 5',
					},
					items: [
						{
							xtype: 'button',
							text: 'Update',
							listeners: {
								click: 'onUpdateDetailGrid'
							}
						},
						{
							xtype: 'button',
							text: 'Clear',
							reference: 'refBtnClear',
							listeners: {
								click: 'onClear'
							}
						},
						{
							xtype: 'button',
							itemId: 'deleteButton',
							reference: 'refBtnDelete',
							text: 'Delete',
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemoveGridDetail'
							}
						}
					]
				},
				{
					xtype: 'fieldset',
					margin: '5 0 5 0',
					padding: '0 0 0 0',
					flex: 1,
					items: [
						{
							xtype: 'tsb-datagrid',
							reference: 'refPackageTariffRateDetailGrid',
							stateful: true,
							usePagingToolbar: false,
							stateId: 'stateiPackageTariffRateDetailGrid',
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
							listeners: {
								// celldblclick: 'openPackageTariffDetail',
								cellclick: 'onCellClick'
							},
							bind: {
								store: '{packageTariffRateList}'
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
								items: GridUtil.getGridColumns('PackageTariffRateDetailGrid')
							}
						}
					]
				}
			]
		});
		me.callParent();
	}
});