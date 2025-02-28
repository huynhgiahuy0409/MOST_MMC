Ext.define('MOST.view.planning.berth.berthApprovalDetail.PartnerInformation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthapprovalpartnerInformation',

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	title: { type: 'bundle', key: 'partnerInformation' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'panel',
					layout: {
						type: 'vbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('partner'),
									flex: 1,
									margin: '5 5 0 0',
									padding: '0 10 10 10',
									layout: {
										type: 'vbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0',
										editable: false,
										width: '100%',
									},
									items: [
										{
											xtype: 'textareafield',
											margin: '0 0 0 0',
											height: 88,
											fieldLabel: ViewUtil.getLabel('partnername'),
											bind: '{partnerInfo.engSnm}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('partnerCode'),
											bind: '{partnerInfo.agencyCode}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('companyStatus'),
											bind: '{partnerInfo.companyStatus}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('contactPerson'),
											bind: '{partnerInfo.contactPerson}',
										},
										{
											xtype: 'fieldset',
											title: ViewUtil.getLabel('partnerType'),
											padding: '0 10 10 10',
											margin: '0 0 0 0',
											flex: 1,
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'tagfield',
													queryMode: 'local',
													width: '100%',
													growMax: 60,
													bind: {
														store: '{partnerType}',
														value: '{partnerTypeArray}',
													},
													displayField: 'ptnrName',
													valueField: 'ptnrType',
													publishes: 'ptnrName',
													readOnly: true,
												},
											],
										},
									],
								},
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('address'),
									flex: 1,
									margin: '5 5 0 5',
									padding: '0 10 10 10',
									layout: {
										type: 'vbox',
									},
									defaults: {
										labelAlign: 'right',
										editable: false,
										width: '100%',
										margin: '5 0 0 0',
									},
									items: [
										{
											xtype: 'textareafield',
											margin: '0 0 0 0',
											height: 88,
											fieldLabel: ViewUtil.getLabel('officeaddress'),
											bind: '{partnerInfo.addr}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('telephoneno'),
											bind: '{partnerInfo.telNo}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('faxno'),
											bind: '{partnerInfo.faxNo}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('homepage'),
											bind: '{partnerInfo.homepage}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('email'),
											bind: '{partnerInfo.email}',
										},
									],
								},
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('account'),
									flex: 1,
									margin: '5 0 0 5',
									padding: '0 10 10 10',
									layout: {
										type: 'vbox',
									},
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0',
										editable: false,
										width: '100%',
									},
									items: [
										{
											xtype: 'textfield',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('nricno'),
											bind: '{partnerInfo.licNo}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('paymenttype'),
											bind: '{partnerInfo.paymentType}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('creditlimit'),
											bind: '{partnerInfo.creditLimit}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('outstanding'),
											bind: '{partnerInfo.outstanding}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('balance'),
											bind: '{partnerInfo.balance}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('bankname'),
											bind: '{partnerInfo.bankName}',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('accountno'),
											bind: '{partnerInfo.accNo}',
										},
									],
								},
							],
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								pack: 'end',
							},
							margin: '5 0 0 0',
							defaults: {
								margin: '0 0 0 5',
							},
							items: [
								{
									xtype: 'displayfield',
									reference: 'ctlStatus',
									width: 100,
									align: 'right',
									name: 'cbfStatus',
								},
								{
									xtype: 'button',
									reference: 'btnApprove',
									text: ViewUtil.getLabel('approvevessel'),
									value: 'AP',
									listeners: {
										click: 'onApproveVessel',
									},
								},
								{
									xtype: 'button',
									reference: 'btnReject',
									text: ViewUtil.getLabel('rejectvessel'),
									value: 'RJ',
									listeners: {
										click: 'onApproveVessel',
									},
                                    hidden: true
								},
								{
									xtype: 'button',
									reference: 'btnCancel',
									text: ViewUtil.getLabel('cancel'),
									value: 'CN',
									listeners: {
										click: 'onApproveVessel',
									},
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
								margin: '0 0 5 0',
								editable: false,
							},
							items: [
								{
									xtype: 'textareafield',
									fieldLabel: ViewUtil.getLabel('remark'),
									labelWidth: 50,
									bind: '{partnerInfo.remark}',
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
