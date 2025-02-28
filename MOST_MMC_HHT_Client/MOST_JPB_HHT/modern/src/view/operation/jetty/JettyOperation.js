Ext.define('MOST.view.operation.JettyOperation', {
	extend: 'Ext.Panel',
	alias: 'widget.app-jettyoperation',

	requires: [
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'Ext.scroll.Scroller',
		'Ext.layout.overflow.Scroller',
		'MOST.view.operation.VORLiquidBulkController',
		'MOST.view.operation.VORLiquidBulkModel',
	],

	controller: 'vorliquidbulk',
	viewModel: {
		type: 'vorliquidbulk'
	},

	reference: 'jettyoperation',
	itemId: 'jettyoperation',

	listeners: {
		initialize: 'onTblLoad',
		show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},

	layout: 'fit',
	shadow: false,
	padding: 5,

	items: [
		{
			xtype: 'formpanel',
			reference: 'refsJettyOperation',
			padding: 0,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				// {
				// 	//buton --> need to remove
				// 	hidden: false,
				// 	xtype: 'fieldset',
				// 	layout: {
				// 		type: 'hbox',
				// 		align: 'stretch'
				// 	},
				// 	items: [
				// 		{
				// 			xtype: 'button',
				// 			reference: 'refBtnJettyOprRetrieve',
				// 			text: 'Retrieve',
				// 			handler: 'onTblRetrive',
				// 			ui: 'retrieve-button-modern',
				// 		},
				// 		{
				// 			hidden: true,
				// 			xtype: 'button',
				// 			ui: 'action',
				// 			text: 'OK',
				// 			width: 150,
				// 			margin: '0 0 0 10'
				// 		},
				// 		{
				// 			hidden: true,
				// 			xtype: 'datetimelocalfield',
				// 			margin: '0 0 0 20',
				// 			flex: 1,
				// 			reference: 'refWorkingDate',
				// 			labelAlign: 'left',
				// 			required: true,
				// 			label: { type: 'bundle', key: 'workingYMD' },
				// 			labelWidth: 90,
				// 			inputType: 'date',
				// 			format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y',
				// 			bind: {
				// 				disabled: true,
				// 			}
				// 		},
				// 		{
				// 			hidden: true,
				// 			xtype: 'combobox',
				// 			reference: 'refCbxShft',
				// 			bind: {
				// 				store: '{shiftList}'
				// 			},
				// 			width: 150,
				// 			label: 'Shift',
				// 			labelWidth: 50,
				// 			labelAlign: 'left',
				// 			required: true,
				// 			displayField: 'shftNm',
				// 			valueField: 'shftId',
				// 			queryMode: 'local',
				// 			clearable: true,
				// 			typeAhead: true,
				// 			disabled: true,
				// 		}
				// 	]
				// },
				{//tab
					xtype: 'tabpanel',
					flex: 1,
					tabBar: {
						layout: {
							pack: 'start',
							overflow: 'scroller'
						}
					},
					layout: {
						animation: null
					},
					tabBarPosition: 'top',
					defaults: {
						scrollable: true,
						layout: 'fit',
						userCls: 'card',
						tab: {
							flex: 1,
							ui: 'md-tab'
						}
					},
					items: [
						{
							xtype: 'app-jettyopr',
							flex: 1,
							title: 'Jetty'
						},
						{
							xtype: 'app-jettydelay',
							flex: 1,
							title: 'Delay'
						}
					]
				}
			]
		}
	]
});
