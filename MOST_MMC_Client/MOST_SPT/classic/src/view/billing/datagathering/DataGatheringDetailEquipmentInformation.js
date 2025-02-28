Ext.define('MOST.view.datagathering.DataGatheringDetailEquipmentInformation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-datagatheringdetailequipmentinformation',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
			{
	            xtype: 'fieldset',
	            title: ViewUtil.getLabel('dataGatheringDetailEquipmentInformatioinequipmentType'),
	            margin: '5 0 5 0',
	            layout : {type  : 'vbox', align : 'stretch'},
	            flex: 1,
	            items: [
					{
					xtype: 'tsb-datagrid',
					flex : 1,
					itemId: 'masterDetailDetailGrid',
					usePagingToolbar : false,
					reference: 'refDataGatheringDetailEquipmentInfoGrid',
					stateful : true,
					scrollable: true,
					stateId : 'stateDataGatheringDetailEquipmentInfoGrid',
					plugins: [
		    		          'gridexporter',
		    		          'gridfilters',
		    		          'clipboard'
		    		],
		    		bind: {
		    			store: '{dataGatheringEquipmentInfoList}'
		    		},
		    		selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items: GridUtil.getGridColumns('DataGatheringDetailEquipmentInformation')
					}
			    }]
		    }]
		});
		
		me.callParent();
	}
});

