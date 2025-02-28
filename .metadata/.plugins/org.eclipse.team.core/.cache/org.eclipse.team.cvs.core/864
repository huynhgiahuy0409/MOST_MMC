Ext.define('MOST.view.popup.PtnrTypeSelection', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-ptnrtypeselection',
	requires: [
		'MOST.view.popup.PtnrTypeSelectionModel',
		'MOST.view.popup.PtnrTypeSelectionController'
	],
	
	title:"Partner Types",
	width: 400,
	height: 100,
	
	layout: {type: 'fit', align: 'stretch'},
	
	controller: 'ptnrtypeselection',
	viewModel: {
		type: 'ptnrtypeselection'
	},
	
	listeners: {
    	afterrender: 'afterrender'
	},
	
	confg:{
		ptnrTypes: ''
	},
	
	lblPtnrTypeSelection: {type: 'bundle', key: 'ptnrTypeSelection'},
	
	initComponent: function() {
		
		Ext.apply(this, {
			dockedItems: [{
				xtype: 'toolbar',
				items: 
				[	{
						xtype: 'label',
						html: this.lblPtnrTypeSelection,
					}, {
						xtype: 'combo',
						reference: 'txtPtnrType',
						displayField: 'scd',
						valueField: 'scdNm',
						queryMode: 'local',
						allowBlank: true,
						bind: {
							store: '{ptnrTypeSelection}'
						},
						listeners: {
							select	: 'onSelect'
						},
					}
				]
			}]
		});

		this.callParent();
	}
});