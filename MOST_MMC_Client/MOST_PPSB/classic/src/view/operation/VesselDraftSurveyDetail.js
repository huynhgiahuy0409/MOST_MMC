Ext.define('MOST.view.cargo.bl.VesselDraftSurveyDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-vesseldraftsurveydetail',
	requires: ['MOST.config.Locale', 'TSB.ux.form.field.DateTimePicker', 'MOST.view.document.DGDeclarationDoc'],

	scrollable: 'vertical',

	layout: {
		type: 'fit',
	},

	listeners: {
		afterrender: 'onDetailLoad',
	},

	width: 768,
	padding: '5 5 5 5',

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			xtype: 'form',
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			items: [
				{
					xtype: 'container',
					items: [
						{
							xtype: 'fieldset',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							margin: '0 0 0 0',
							padding: '10 10 10 10',
							defaults: {
								margin: '0 0 5 0',
							},
							items: [
								// Row 1
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									items: [
										{
											xtype: 'shipcallnofield',
											reference: 'ctlDetailScn',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											fieldStyle: 'text-transform: uppercase',
											bind: {
												value: '{theDetail.scn}',
											},
										},
										{
											xtype: 'numberfield',
											reference: 'refDetailNumberOfCall',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('numberOfCall'),
											bind: '{theDetail.numberOfCalls}',
											readOnly: true
										},
									],
								},
								// Row 2
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									items: [
										{
											xtype: 'numberfield',
											reference: 'refDetailInitialReading',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('initialReading'),
											bind: '{theDetail.initialReadingWgt}',
											allowBlank: false,
											listeners: {
												change: 'calculateVslDraftSurvey'
											}
										},
										{
											xtype: 'numberfield',
											reference: 'refDetailWeighbridgeMt',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('weighbridgeMT'),
											bind: '{theDetail.weighbridgeWgt}',
											readOnly: true
										},
									],
								},
								// Row 3
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									items: [
										{
											xtype: 'numberfield',
											reference: 'refDetailFinalReading',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('finalReading'),
											bind: '{theDetail.finalReadingWgt}',
											listeners: {
												change: 'calculateVslDraftSurvey'
											}
										},
										{
											xtype: 'numberfield',
											reference: 'refOperationMT',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('operationMT'),
											bind: '{theDetail.operationWgt}',
											readOnly: true
										},
									],
								},
								// Row 4
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
									},
									margin: '0 0 0 0',
									items: [
										{
											xtype: 'numberfield',
											reference: 'refDetailDraftSurveyMT',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('draftSurveyMT'),
											bind: '{theDetail.draftSurveyWgt}',
											readOnly: true
										},
										{
											xtype: 'textfield',
											reference: 'refDetailRemark',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('remark'),
											bind: '{theDetail.rmk}',
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
