Ext.define('MOST.view.configuration.AllowanceConfiguration', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-allowanceconfiguration',

	requires: [
		'MOST.view.configuration.AllowanceConfigurationModel',
		'MOST.view.configuration.AllowanceConfigurationController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
	],

	controller: 'allowanceconfiguration',

	viewModel: {
		type: 'allowanceconfiguration',
	},

	listeners: {
		afterrender: 'onLoad',
	},

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					flex: 1,
					deferredRender: false,
					reference: 'tabpnl',
					defaults: {
						margin: '5 5 5 0',
					},
					listeners: {
						beforetabchange: 'onTabChange',
					},
					items: [
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('allowance'),
							reference: 'refAllowanceTab',
							autoScroll: true,
							autoHeight: false,
							disabled: false,
							layout: 'fit',
							items: [
								{
									xtype: 'app-allowance',
									flex: 1,
								},
							],
							tabName: 'allowance'
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('multiSkill'),
							reference: 'refMultiskillTab',
							autoScroll: true,
							autoHeight: false,
							disabled: false,
							layout: 'fit',
							items: [
								{
									xtype: 'app-multiskill',
									flex: 1,
								},
							],
							tabName: 'multiskill'
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('incentive'),
							reference: 'refIncentiveTab',
							autoScroll: true,
							autoHeight: false,
							disabled: false,
							layout: 'fit',
							items: [
								{
									xtype: 'app-incentive',
									flex: 1,
								},
							],
							tabName: 'incentive'
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('fuel'),
							reference: 'refFuelTab',
							autoScroll: true,
							autoHeight: false,
							disabled: false,
							layout: 'fit',
							items: [
								{
									xtype: 'app-fuel',
									flex: 1,
								},
							],
							tabName: 'fuel'
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('tonnage'),
							reference: 'refTonnageTab',
							autoScroll: true,
							autoHeight: false,
							disabled: false,
							layout: 'fit',
							items: [
								{
									xtype: 'app-tonnage',
									flex: 1,
								},
							],
							tabName: 'tonnage'
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('dayOff'),
							reference: 'refDayoffTab',
							autoScroll: true,
							autoHeight: false,
							disabled: false,
							layout: 'fit',
							items: [
								{
									xtype: 'app-dayoff',
									flex: 1,
								},
							],
							tabName: 'dayoff'
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('bonusRmAmmount'),
							reference: 'refBonusRmTab',
							autoScroll: true,
							autoHeight: false,
							disabled: false,
							layout: 'fit',
							items: [
								{
									xtype: 'app-bonusrm',
									flex: 1,
								},
							],
							tabName: 'bonusRm'
						},
					],
				},
			],
			dockedItems: [
				{
					xtype: 'container',
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
								pack: 'end',
							},
							defaults: {
								margin: '5 5 5 0',
							},
							items: [
								{
									xtype: 'button',
									reference: 'refBtnRetrieve',
									itemId: 'inquiryItemId',
									text: ViewUtil.getLabel('search'),
									iconCls: 'x-fa fa-search',
									cls: 'search-button',
									listeners: {
										click: 'onSearch',
									},
								},
								{
									xtype: 'button',
									reference: 'refBtnCreate',
									itemId: 'createItemId',
									text: ViewUtil.getLabel('add'),
									ui: 'create-button',
									iconCls: 'x-fa fa-plus',
									listeners: {
										click: 'onAdd',
									},
								},
								{
									xtype: 'button',
									reference: 'refBtnDelete',
									itemId: 'deleteItemId',
									text: ViewUtil.getLabel('remove'),
									ui: 'delete-button',
									iconCls: 'x-fa fa-minus',
									listeners: {
										click: 'onRemove',
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
