Ext.define('MOST.view.planning.megadetail.MegaDetailTabStevedore', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megadetailtabstevedore',

	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	flex: 1,

	layout: { type: 'hbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					flex: 5,
					layout: {
						type: 'vbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'fieldset',
							margin: '5 5 0 0',
							padding: '10 10 10 10',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'container',
									border: false,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									defaults: {
										margin: '5 0 0 0',
										width: '100%'
									},
									items: [
										{
											xtype: 'container',
											margin: '0 0 0 0',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 100,
												flex: 1,
											},
											items: [
												{
													xtype: 'numberfield',
													reference: 'ctlDetailMegaStedoreNosofGang',
													fieldLabel: ViewUtil.getLabel('stevedoreGang'),
													minValue: 0,
													maxValue: 999999999,
													bind: '{theStevedore.nofGang}',
												},
												{
													xtype: 'workingareamultifield',
													reference: 'ctlWorkingAreaStevedore',
													fieldLabel: ViewUtil.getLabel('workingArea'),
													bind: {
														value: '{theStevedore.locId}',
													},
													listeners: {
														render: function() {
															this.getReferences()['ctlField'].setEditable(false);
														}
													},
													editable: false,
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
												labelWidth: 100,
												flex: 1,
											},
											items: [
												{
													xtype: 'datetimefield',
													reference: 'refStartTimeStevedore',
													fieldLabel: ViewUtil.getLabel('startTime'),
													editable: false,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												},
												{
													xtype: 'datetimefield',
													reference: 'refEndTimeStevedore',
													fieldLabel: ViewUtil.getLabel('endTime'),
													editable: false,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												},
											],
										}, 
									],
								},
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('additional'),
									margin: '12 0 26 0',
									padding: '0 0 0 0',
									flex: 1,
									border: false,
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										flex: 1
									},
									items: [
										{
											xtype: 'numberfield',
											reference: 'ctlDetailMegaStevedoreNofStvdSprr',
											fieldLabel: ViewUtil.getLabel('supervisor'),
											minValue: 0,
											maxValue: 999999999,
											bind: '{theStevedore.nofStvdSprr}',
										},
										{
											xtype: 'numberfield',
											reference: 'ctlDetailMegaStevedoreNofWchmn',
											fieldLabel: ViewUtil.getLabel('winchMen'),
											minValue: 0,
											maxValue: 999999999,
											bind: '{theStevedore.nofWchmn}',
										},
										{
											xtype: 'numberfield',
											reference: 'ctlDetailMegaStevedoreNoStvdGwker',
											fieldLabel: ViewUtil.getLabel('generalWorkers'),
											minValue: 0,
											maxValue: 999999999,
											bind: '{theStevedore.nofStvdGwker}',
										},
									],
								},
								{ 
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'right',
										pack: 'end'
									},
									margin: '10 0 0 0',
									reference: 'cardCudBtnViewForStevedore',
									defaults: {
										margin: '0 0 0 5'
									},
									items: [
										{
											xtype: 'button',
											reference: 'ctlMegaDetailAddForStevedore',
											iconCls: 'x-fa fa-plus',
											text: ViewUtil.getLabel('add'),
											listeners: {
												click: 'onAddForStevedore'
											}
										}, {
											xtype: 'button',
											reference: 'ctlMegaDetailUpdateForStevedore',
											ui: 'update-button',
											iconCls: 'x-fa fa-plus',
											text: ViewUtil.getLabel('update'),
											listeners: {
												click: 'onGridUpdateForStevedore'
											}
										}, {
											xtype: 'button',
											reference: 'ctlMegaDetailDeleteForStevedore',
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											text: ViewUtil.getLabel('delete'),
											listeners: {
												click: 'onGridRemoveForStevedore'
											}
										}
									]
								} 
							],
						},
						{
							xtype: 'fieldset',
							layout: {
								type: 'vbox',
								align: 'stretch'						
							},
							margin: '5 5 0 0',
							padding: '0 0 0 0',
							flex: 1,
							items: [
								{
									xtype: 'tsb-datagrid',
									reference: 'refMegaDetailStevedoreGrid',
									usePagingToolbar: false,
									flex: 1,
									margin: '0 0 0 0',
									stateful: true,
									stateId: 'stateMegaDetailTabStevedoreGrid',
									plugins: ['gridexporter', 'gridfilters', 'clipboard'],
									bind: {
										store: '{megaDetailStevedore}',
									},
									selModel: {
										type: 'spreadsheet',
										cellSelect: false,
									},
									listeners: {
										itemclick: 'onMasterSelectionChangeForStevedore',
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center',
										},
										items: GridUtil.getGridColumns('MegaDetailStevedore'),
									},
								},
							]
						}
					],
				},
				{
					xtype: 'container',
					reference: 'ctlCompanyStevedore',
					flex: 2.5,
					layout: {
						type: 'vbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'fieldset',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							margin: '5 0 0 0',
							padding: '10 10 10 10',
							defaults: {
								labelAlign: 'right',
								labelWidth: 90,
								margin: '5 0 0 0',
								width: '100%',
							},
							items: [
								{
									xtype: 'partnercdfield',
									reference: 'cboContractorStevedore',
									fieldLabel: ViewUtil.getLabel('contractor'),
									margin: '0 0 0 0',
									params: {
										ptnrType: CodeConstants.MT_PTNRTP_CTT,
									},
									bind: {
										value: '{theStevedoreCompany.opeCompCd}'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlStevedoreCompanyNosofGang',
									fieldLabel: ViewUtil.getLabel('nosofGang'),
									minValue: 0,
									maxValue: 999999999,
									bind: {
										value: '{theStevedoreCompany.nofGang}'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlStevedoreCompanyNofStvdSprr',
									fieldLabel: ViewUtil.getLabel('supervisor'),
									minValue: 0,
									maxValue: 999999999,
									bind: {
										value: '{theStevedoreCompany.nofStvdSprr}'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlStevedoreCompanyNofWchmn',
									fieldLabel: ViewUtil.getLabel('winchMen'),
									minValue: 0,
									maxValue: 999999999,
									bind: {
										value: '{theStevedoreCompany.nofWchmn}'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlStevedoreCompanyNoStvdGwker',
									fieldLabel: ViewUtil.getLabel('generalWorkers'),
									minValue: 0,
									maxValue: 999999999,
									bind: {
										value: '{theStevedoreCompany.nofStvdGwker}'
									}
								},
								{
									xtype: 'container',
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												pack: 'end',
											},
											defaults: {
												margin: '0 0 0 5',
											},
											items: [
												{
													xtype: 'button',
													reference: 'ctlMegaDetailAddForStevedoreCompany',
													iconCls: 'x-fa fa-plus',
													text: ViewUtil.getLabel('add'),
													listeners: {
														click: 'onAddForStevedoreCompany',
													},
												},
												{
													xtype: 'button',
													reference: 'ctlMegaDetailUpdateForStevedoreCompany',
													ui: 'update-button',
													iconCls: 'x-fa fa-plus',
													text: ViewUtil.getLabel('update'),
													listeners: {
														click: 'onGridUpdateForStevedoreCompany',
													},
												},
												{
													xtype: 'button',
													reference: 'ctlMegaDetailDeleteForStevedoreCompany',
													ui: 'delete-button',
													iconCls: 'x-fa fa-minus',
													text: ViewUtil.getLabel('delete'),
													listeners: {
														click: 'onGridRemoveForStevedoreCompany',
													},
												},
											],
										},
									],
								},
							],
						},
						{
							xtype: 'fieldset',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							flex: 1,
							margin: '5 0 0 0',
							padding: '0 0 0 0',
							items: [
								{
									xtype: 'tsb-datagrid',
									reference: 'refMegaDetailStevedoreCompanyGrid',
									usePagingToolbar: false,
									flex: 1,
									margin: '0 0 0 0',
									stateful: true,
									stateId: 'stateMegaDetailTabStevedoreCompanyGrid',
									plugins: ['gridexporter', 'gridfilters', 'clipboard'],
									bind: {
										store: '{megaDetailTabStevedoreCompany}',
									},
									selModel: {
										// type: 'spreadsheet',
										cellSelect: false,
									},
									listeners: {
										select: 'onCompanySelectionChangeForStevedore',
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center',
										},
										items: GridUtil.getGridColumns('MegaDetailTabStevedoreCompany'),
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
