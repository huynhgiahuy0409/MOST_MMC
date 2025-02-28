Ext.define('MOST.view.billing.tariffcodedetail.TariffCodesDetailTabServiceOrder', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-tariffcodesdetailtabserviceorder',
	requires: [],

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
					},
					margin: '5 0 0 0',
					defaults: {
						labelAlign: 'right',
						labelWidth: 80,
						queryMode: 'local',
						flex: 1,
						displayField: 'scdNm',
						valueField: 'scd',
                        xtype: 'combo',
					},
					items: [
						{
							reference: 'refCategory1FilterCombo',
							fieldLabel: ViewUtil.getLabel('soc_cat1'),
							bind: {
								store: '{category1FilterComboStore}',
								value: '{theDetail.category1}',
							},
							listeners: {
								change: 'onCategory1Change',
							},
						},
						{
							reference: 'refCategory2FilterCombo',
							fieldLabel: ViewUtil.getLabel('soc_cat2'),
							bind: {
								store: '{category2FilterComboStore}',
								value: '{theDetail.category2}',
							},
							listeners: {
								change: 'onCategory2Change',
							},
						},
						{
							reference: 'refCategory3FilterCombo',
							fieldLabel: ViewUtil.getLabel('soc_cat3'),
							bind: {
								store: '{category3FilterComboStore}',
								value: '{theDetail.category3}',
							},
						},
					],
				},
			],
		});

		me.callParent();
	},
});
