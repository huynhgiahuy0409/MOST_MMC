Ext.define('MOST.view.datagathering.DataGatheringDetailCargoInfoDetailInfomation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-datagatheringdetailcargoinfodetailinformation',
	
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
				reference: 'refDataGatheringDetailCargodetailInfoGrid',
				flex : 1,
				stateful : true,
				scrollable: true,
				stateId : 'stateDataGatheringDetailCargodetailInfoGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{dataGatheringCargoInfoList}'
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
	            	items: GridUtil.getGridColumns('DataGatheringDetailCargoInfoDetailInfomation')
				}
		    }]
		});
		
		me.callParent();
	}
});

