Ext.define('MOST.view.planning.megadetail.MegaDetailTabTrimming', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megadetailtabtrimming',

	requires: [],

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
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										margin: '0 0 5 0',
										width: '100%',
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
												flex: 1,
											},
											items: [
												{
													xtype: 'numberfield',
													reference: 'ctlDetailMegaTrimmingNosofGang',
													fieldLabel: ViewUtil.getLabel('trimmingGang'),
													minValue: 0,
													maxValue: 999999999,
													bind: '{theTrimming.nofGang}',
												},
												{
													xtype: 'workingareamultifield',
													reference: 'ctlTrimmingWorkingArea',
													fieldLabel: ViewUtil.getLabel('workingArea'),
													bind: {
														value: '{theTrimming.locId}',
													},
													listeners: {
														render: function() {
															this.getReferences()['ctlField'].setEditable(false);
														}
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
												labelWidth: 100,
												flex: 1,
											},
											items: [
												{
													xtype: 'datetimefield',
													reference: 'refStartTimeTrimming',
													fieldLabel: ViewUtil.getLabel('startTime'),
													editable: false,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												},
												{
													xtype: 'datetimefield',
													reference: 'refEndTimeTrimming',
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
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									margin: '43 0 21 0',
									padding: '0 0 0 0',
									flex: 1,
									border: false,
									defaults: {
										margin: '0 0 0 0',
										labelAlign: 'right',
										labelWidth: 80,
										flex: 1,
									},
									items: [
										{
											xtype: 'numberfield',
											reference: 'ctlDetailMegaTrimmingNofTrmgSprr',
											fieldLabel: ViewUtil.getLabel('supervisor'),
											minValue: 0,
											maxValue: 999999999,
											bind: '{theTrimming.nofTrmgSprr}',
										},
										{
											xtype: 'numberfield',
											reference: 'ctlDetailMegaTrimmingNofSglmn',
											fieldLabel: ViewUtil.getLabel('signalMen'),
											minValue: 0,
											maxValue: 999999999,
											bind: '{theTrimming.nofSglmn}',
										},
										{
											xtype: 'numberfield',
											reference: 'ctlDetailMegaTrimmingNofDekmn',
											fieldLabel: ViewUtil.getLabel('deckMen'),
											minValue: 0,
											maxValue: 999999999,
											bind: '{theTrimming.nofDekmn}',
										},
										{
											xtype: 'numberfield',
											reference: 'ctlDetailMegaTrimmingNofHopmn',
											fieldLabel: ViewUtil.getLabel('hoperMen'),
											minValue: 0,
											maxValue: 999999999,
											bind: '{theTrimming.nofHopmn}',
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'right',
										pack: 'end',
									},
									margin: '10 0 0 0',
									reference: 'cardCudBtnViewForTrimming',
									defaults: {
										margin: '0 0 0 5',
									},
									items: [
										{
											xtype: 'button',
											reference: 'ctlMegaDetailAddForTrimming',
											iconCls: 'x-fa fa-plus',
											text: ViewUtil.getLabel('add'),
											listeners: {
												click: 'onAddForTrimming',
											},
										},
										{
											xtype: 'button',
											reference: 'ctlMegaDetailUpdateForTrimming',
											ui: 'update-button',
											iconCls: 'x-fa fa-plus',
											text: ViewUtil.getLabel('update'),
											listeners: {
												click: 'onGridUpdateForTrimming',
											},
										},
										{
											xtype: 'button',
											reference: 'ctlMegaDetailDeleteForTrimming',
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											text: ViewUtil.getLabel('delete'),
											listeners: {
												click: 'onGridRemoveForTrimming',
											},
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
							margin: '5 5 0 0',
							padding: '0 0 0 0',
							flex: 1,
							items: [
								{
									xtype: 'tsb-datagrid',
									reference: 'refMegaDetailTrimmingGrid',
									usePagingToolbar: false,
									flex: 1,
									margin: '0 0 0 0',
									stateful: true,
									stateId: 'stateMegaDetailTabTrimmingGrid',
									plugins: ['gridexporter', 'gridfilters', 'clipboard'],
									bind: {
										store: '{megaDetailTrimming}',
									},
									selModel: {
										type: 'spreadsheet',
										cellSelect: false,
									},
									listeners: {
										itemclick: 'onMasterSelectionChangeForTrimming',
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center',
										},
										items: GridUtil.getGridColumns('MegaDetailTrimming'),
									},
								},
							],
						},
					],
				},
				{
					xtype: 'container',
					reference: 'ctlCompanyTrimming',
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
									reference: 'cboContractorTrimming',
									margin: '0 0 0 0',
									fieldLabel: ViewUtil.getLabel('contractor'),
									params: {
										ptnrType: CodeConstants.MT_PTNRTP_CTT,
									},
									bind: {
										value: '{theTrimmingCompany.opeCompCd}'
									}
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									reference: 'ctlTrimmingCompanyNosofGang',
									fieldLabel: ViewUtil.getLabel('nosofGang'),
									bind: '{theTrimmingCompany.nofGang}',
								},
								{
									xtype: 'numberfield',
									reference: 'ctlTrimmingCompanyNofStvdSprr',
									fieldLabel: ViewUtil.getLabel('supervisor'),
									minValue: 0,
									maxValue: 999999999,
									bind: {
										value: '{theTrimmingCompany.nofTrmgSprr}'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlTrimmingCompanyNofSglmn',
									fieldLabel: ViewUtil.getLabel('signalMen'),
									minValue: 0,
									maxValue: 999999999,
									bind: '{theTrimmingCompany.nofSglmn}',
								},
								{
									xtype: 'numberfield',
									reference: 'ctlTrimmingCompanyNofDekmn',
									fieldLabel: ViewUtil.getLabel('deckMen'),
									minValue: 0,
									maxValue: 999999999,
									bind: '{theTrimmingCompany.nofDekmn}',
								},
								{
									xtype: 'numberfield',
									reference: 'ctTrimmingCompanyNofHopmn',
									fieldLabel: ViewUtil.getLabel('hoperMen'),
									minValue: 0,
									maxValue: 999999999,
									bind: '{theTrimmingCompany.nofHopmn}',
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
													reference: 'ctlMegaDetailAddForTrimmingCompany',
													iconCls: 'x-fa fa-plus',
													text: ViewUtil.getLabel('add'),
													listeners: {
														click: 'onAddForTrimmingCompany',
													},
												},
												{
													xtype: 'button',
													reference: 'ctlMegaDetailUpdateForTrimmingCompany',
													ui: 'update-button',
													iconCls: 'x-fa fa-plus',
													text: ViewUtil.getLabel('update'),
													listeners: {
														click: 'onGridUpdateForTrimmingCompany',
													},
												},
												{
													xtype: 'button',
													reference: 'ctlMegaDetailDeleteForTrimmingCompany',
													ui: 'delete-button',
													iconCls: 'x-fa fa-minus',
													text: ViewUtil.getLabel('delete'),
													listeners: {
														click: 'onGridRemoveForTrimmingCompany',
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
									reference: 'refMegaDetailTrimmingCompanyGrid',
									usePagingToolbar: false,
									flex: 1,
									margin: '0 0 0 0',
									stateful: true,
									stateId: 'stateMegaDetailTabTrimmingCompanyGrid',
									plugins: ['gridexporter', 'gridfilters', 'clipboard'],
									bind: {
										store: '{megaDetailTabTrimmingCompany}',
									},
									selModel: {
										// type: 'spreadsheet',
										cellSelect: false,
									},
									listeners: {
										selectionchange: 'onCompanySelectionChangeForTrimming',
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center',
										},
										items: GridUtil.getGridColumns('MegaDetailTabTrimmingCompany'),
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
