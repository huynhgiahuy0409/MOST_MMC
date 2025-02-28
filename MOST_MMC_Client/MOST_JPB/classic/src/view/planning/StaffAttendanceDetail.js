Ext.define('MOST.view.controller.StaffAttendanceDetail', {
	extend: 'Ext.form.Panel',

	alias: 'widget.app-staffattendancedetail',

	requires: [
		'Ext.plugin.Viewport'
	],

	width: 600,

	layout: {
		type: 'fit',
		align: 'stretch'
	},

	listeners: {
		afterrender: 'onDetailLoad',
	},

	config: {
		recvData: null
	},

	initComponent: function () {
		var me = this;

		Ext.apply(this, {
			xtype: 'form',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					margin: '5 5 5 5',
					padding: '10 10 10 10',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							margin: '0 0 0 0',
							flex: 1,
							defaults: {
								labelAlign: 'right',
								width: '100%'
							},
							layout: {
								type: 'vbox'
							},
							items: [ 
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									margin: '0 0 5 0',
									defaults: {
										labelWidth: 80,
										labelAlign: 'right',
										flex: 1
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtStaffNo',
											fieldLabel: ViewUtil.getLabel('saStaffNo'),
											editable: false,
											bind: '{theDetail.staffNo}'
										}, 
										{
											xtype: 'textfield',
											reference: 'txtStaffNm',
											fieldLabel: ViewUtil.getLabel('saStaffName'),
											editable: false,
											bind: '{theDetail.staffNm}'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									margin: '0 0 5 0',
									defaults: {
										labelWidth: 80,
										labelAlign: 'right',
										flex: 1
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtCostCenter',
											fieldLabel: ViewUtil.getLabel('saCostCenter'),
											editable: false,
											bind: '{theDetail.descr}'
										}, 
										{
											xtype: 'textfield',
											reference: 'txtRole',
											fieldLabel: ViewUtil.getLabel('saRole'),
											editable: false,
											bind: '{theDetail.role}'
										}
									]
								},
								{
									xtype: 'container',
									margin: '0 0 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
										flex: 1,
										editable: false,
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'datefield',
											reference: 'txtWorkYmd',
											fieldLabel: ViewUtil.getLabel('saDate'),
											format: MOST.config.Locale.getShortDate(),
											bind: '{theDetail.dspWorkYmd}',
											readOnly: true
										},
										{
											xtype: 'textfield',
											reference: 'txtShift',
											fieldLabel: ViewUtil.getLabel('shift'),
											bind: {
												value: '{theDetail.normalShift}'
											}
										}
									]
								},
							]
						},
					]
				},
				{
					xtype: 'fieldset',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					margin: '0 5 5 5',
					padding: '10 10 10 10',
					defaults: {
						margin: '0 0 0 0',
						flex: 1
					},
					items: [
						{
							xtype: 'checkboxfield',
							reference: 'ctlMa',
							boxLabel: ViewUtil.getLabel('saMa'),
							inputValue: 'Y',
							uncheckedValue: 'N',
							bind: {
								value: '{theDetail.ma}',
							}
						}, 
						{
							xtype: 'checkboxfield',
							reference: 'ctlEA',
							boxLabel: ViewUtil.getLabel('saEA'),
							inputValue: 'Y',
							uncheckedValue: 'N',
							bind: {
								value: '{theDetail.ea}',
							}
						}, 
						{
							xtype: 'checkboxfield',
							reference: 'ctlIncentive',
							boxLabel: ViewUtil.getLabel('saIncentive'),
							inputValue: 'Y',
							uncheckedValue: 'N',
							bind: {
								value: '{theDetail.incentive}',
							}
						}, 
						{
							xtype: 'checkboxfield',
							reference: 'ctlBerthing',
							boxLabel: ViewUtil.getLabel('berthing_unberthing'),
							inputValue: 'Y',
							uncheckedValue: 'N',
							bind: {
								value: '{theDetail.berthUnberthing}',
							}
						}, 
					]
				}
			],
			dockedItems: [
				{
					xtype: 'container',
					margin: '0 0 0 0',
					padding: '5 5 5 5',
					background: 'none',
					dock: 'bottom',
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'center'
					},
					style: {
						'background': '#f6f6f6'
					},
					items: [
						{
							xtype: 'button',
							reference: 'reBtnDetailSave',
							text: ViewUtil.getLabel('save'),
							iconCls: 'x-fa fa-save', 
							handler: 'onDetailUpdate'
						}, 
						{
							xtype: 'button',
							margin: '0 0 0 5',
							text: ViewUtil.getLabel('close'),
							iconCls: 'x-fa fa-close',
							ui: 'delete-button',
							handler: 'onDetailClose'
						}
					]
				}
			]
		}
		);
		me.callParent();
	}
});