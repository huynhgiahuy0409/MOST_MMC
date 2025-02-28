Ext.define('MOST.view.popup.PtnrTypeSelection', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-ptnrtypeselection',
	requires: ['MOST.view.popup.PtnrTypeSelectionModel', 'MOST.view.popup.PtnrTypeSelectionController'],

	title: 'Partner Types',
	width: 400,
	visible: true,

	layout: {
		type: 'fit',
		align: 'stretch',
	},

	controller: 'ptnrtypeselection',
	viewModel: {
		type: 'ptnrtypeselection',
	},

	listeners: {
		afterrender: 'afterrender',
	},

	confg: {
		ptnrTypes: '',
	},

	lblPtnrTypeSelection: { type: 'bundle', key: 'ptnrTypeSelection' },

	initComponent: function () {
		Ext.apply(this, {
			dockedItems: [
				{
					xtype: 'toolbar',
					padding: '10 10 10 10',
					margin: '0 0 0 0',
					items: [
						{
							xtype: 'combo',
							reference: 'txtPtnrType',
							fieldLabel: ViewUtil.getLabel('ptnrTypeSelection'),
							labelAlign: 'right',
							labelWidth: 140,
							width: '100%',
							margin: '0 0 0 0',
							padding: '0 0 0 0',
							displayField: 'scd',
							valueField: 'scdNm',
							queryMode: 'local',
							allowBlank: true,
							bind: {
								store: '{ptnrTypeSelection}',
							},
							listeners: {
								select: 'onSelect',
							},
						},
					],
				},
			],
		});

		this.callParent();
	},
});
