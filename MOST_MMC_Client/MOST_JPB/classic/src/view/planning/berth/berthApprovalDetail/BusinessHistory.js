Ext.define('MOST.view.planning.berth.berthApprovalDetail.BusinessHistory', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthapprovalbusinesshistory',

	layout: {
		type: 'vbox',
		align: 'stretch',
	},
	title: { type: 'bundle', key: 'businessHistory' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					items: [
						{
							xtype: 'fieldset',
							flex: 1,
							margin: '5 0 0 0',
							padding: '10 10 10 10',
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
										align: 'stretch',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
										margin: '5 0 0 0',
										editable: false,
										width: '100%',
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('vslCallId'),
											reference: 'ctlVesselCallIdDetail',
											margin: '0 0 0 0',
											bind: '{vesselInfo.vslCallId}',
										},
										{
											xtype: 'textfield',
											reference: 'ctlVesselName',
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
										labelAlign: 'right',
										labelWidth: 100,
										margin: '5 0 0 0',
										editable: false,
										width: '100%',
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlBillingType',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('billingtype'),
											labelWidth: 100,
											queryMode: 'local',
											bind: {
												store: '{billingTypeCombo}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
										},
										{
											xtype: 'combobox',
											reference: 'ctlCargoType',
											fieldLabel: ViewUtil.getLabel('cargoType'),
											queryMode: 'local',
											bind: {
												store: '{cargoTypeCombo}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
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
										labelAlign: 'right',
										margin: '5 0 0 0',
										editable: false,
										width: '100%',
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
												editable: false,
											},
											items: [
												{
													xtype: 'label',
													text: ViewUtil.getLabel('period') + ':',
													width: 50,
													margin: '5 5 0 0',
													style: 'text-align: right;',
												},
												{
													xtype: 'datefield',
													reference: 'ctlFromDt',
													flex: 1,
													format: MOST.config.Locale.getShortDate(),
												},
												{
													xtype: 'datefield',
													reference: 'ctlToDt',
													flex: 1,
													margin: '0 0 0 5',
													format: MOST.config.Locale.getShortDate(),
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									flex: 0.5,
								},
							],
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('search'),
							itemId: 'inquiryItemId',
							margin: '5 0 5 0',
							iconCls: 'x-fa fa-search',
							reference: 'refBtnRetrieve',
							listeners: {
								click: 'onBusinessHistorySearch',
							},
						},
					],
				},
				{
					xtype: 'tsb-datagrid',
					margin: '0 0 4 0',
					minHeight: 300,
					maxHeight: 600,
					flex: 1,
					stateful: true,
					stateId: 'stateareBerthApprovalBusinessHistoryGrid',
					reference: 'refBerthApprovalBusinessHistoryGrid',
					usePagingToolbar: false,
					bind: {
						store: '{businessHistory}',
					},
					plugins: ['gridexporter', 'gridfilters', 'clipboard'],
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('BerthApprovalBusinessHistory'),
					},
				},
                {
                    xtype: 'container',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'refBusinessTotalAmount',
                            fieldLabel: ViewUtil.getLabel('totalAmount'),
                            labelAlign: 'right',
                            margin: '0 0 0 0',
                            labelWidth: 100,
                            width: 250,
                            editable: false,
                        }
                    ]
                }
			],
		});

		me.callParent();
	},
});
