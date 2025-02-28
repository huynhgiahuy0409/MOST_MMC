Ext.define('MOST.view.billing.datagathering.DataGatheringDetailCargoInformation', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-datagatheringdetailcargoinformation',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
	    'Ext.form.field.Date',
	    'Ext.tab.Panel',
	    'Ext.tab.Tab'
	],
	
	listeners:{
	},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			flex:1,
			items:[{
				xtype: 'tabpanel',
				margin: '5 0 5 0',
				activeTab: 0,
				flex: 1,
				items: [{
                 	title:ViewUtil.getLabel('datagatheringdetailecargoinfodetailinformation'),
                 	xtype: 'app-datagatheringdetailcargoinfodetailinformation',
                 	flex: 1
				},{
                 	title:ViewUtil.getLabel('datagatheringdetailecargoinfosummarizeinformation'),
                 	xtype: 'app-datagatheringdetailcargoinfosummarizeinformation',
                 	flex: 1
				}]
			}]
		});
		
		me.callParent();
	}
});

