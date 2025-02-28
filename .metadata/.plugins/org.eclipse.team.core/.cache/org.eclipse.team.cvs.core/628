Ext.define('MOST.view.billing.PartnerTariffRateDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-partnertariffratedetail',

	requires: [
		'MOST.view.billing.PartnerTariffRateModel',
		'MOST.view.billing.PartnerTariffRateController',
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],

	height: 483,
	width: 930,

	listeners: {
		afterrender: 'onDetailLoad',
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	config: {
		recvData: null,
		masterItem: null,
		listData: null
	},

	initComponent: function () {
		var me = this;

		Ext.apply(this, {
			xtype: 'form',
			defaults: {
				margin: '5 5 0 5' // top, right, bottom, left
			},
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			flex: 1,
			items: [{
				xtype: 'tabpanel',
				reference: 'ctlPartnerTariffRateDetailTabPanel',
				flex: 1,
				activeTab: 0,
				items: [ 
					{ // Vessel Schedule
						xtype: 'app-partnertariffratedetailtabhead',
						reference: 'refpartnerTariffRateHead',
						title: ViewUtil.getLabel('header'),
						flex: 1
					},
					{
						xtype: 'app-partnertariffratetabdetail',
						reference: 'refpartnerTariffRateDetail',
						title: ViewUtil.getLabel('detail'),
						flex: 1
					},
				]
			}]
		});

		me.callParent();
	}
});