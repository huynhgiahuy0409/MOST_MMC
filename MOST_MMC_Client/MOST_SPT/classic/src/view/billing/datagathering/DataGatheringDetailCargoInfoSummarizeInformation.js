Ext.define('MOST.view.datagathering.DataGatheringDetailCargoInfoSummarizeInformation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-datagatheringdetailcargoinfosummarizeinformation',
	
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

			items: [{
				xtype: 'tsb-datagrid',
				itemId: 'masterDetailDetailGrid',
				usePagingToolbar : false,
				reference: 'refDataGatheringDetailCargoSummarizeInfoGrid',
	            flex: 1,
				stateful : true,
				scrollable: true,
				stateId : 'stateDataGatheringDetailCargoSummarizeInfoGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{dataGatheringCargoSummarizeInfoList}'
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
	            	items: GridUtil.getGridColumns('DataGatheringDetailCargoInfoSummarizeInformation')
				}
		    }]
		});
		
		me.callParent();
	}
});

