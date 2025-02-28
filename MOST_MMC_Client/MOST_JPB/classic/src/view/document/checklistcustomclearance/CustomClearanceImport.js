Ext.define('MOST.view.document.checklistcustomclearance.CustomClearanceImport', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-customclearanceimport',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				reference: 'refImportGrid',
				flex : 1,
				height: 600,
				stateful : true,
				stateId : 'stateImportGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{importList}'
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
	            	items: [
            		{
            			header: ViewUtil.getLabel('vslCallId'),
            			dataIndex: 'vslCallId',
            			filter : 'string',
            			align : 'left',
            			width: 140
            		},
            		{
            			header: ViewUtil.getLabel('LABLNo'),
            			dataIndex: 'blNo',
            			filter : 'string',
            			align : 'left',
            			width: 140
            		},{
            			header: ViewUtil.getLabel('custClearanceRelease'),
            			dataIndex: 'customClearanceType',
            			filter : 'string',
            			align : 'left',
            			width: 140
            		},
            		{
            			header: ViewUtil.getLabel('customAgent'),
            			dataIndex: 'customAgent',
            			filter : 'string',
            			align : 'left',
            			width: 140
            		},
            		{
            			header: ViewUtil.getLabel('customAgentFileNo'),
            			dataIndex: 'customAgentFileNo',
            			filter : 'string',
            			align : 'left',
            			width: 180
            		},
            		{
            			header: ViewUtil.getLabel('customclearanceNo'),
            			dataIndex: 'releaseNo',
            			filter : 'string',
            			align : 'left',
            			width: 180
            		},
            		{
            			header: ViewUtil.getLabel('clearanceType'),
            			dataIndex: 'status',
            			filter : 'string',
            			align : 'left',
            			width: 140
            		},
            		{
            			header: ViewUtil.getLabel('deliveryType'),
            			dataIndex: 'delvTpCd',
            			filter : 'string',
            			align : 'left',
            			width: 140
            		},
            		{
            			header: ViewUtil.getLabel('ivNo'),
            			dataIndex: 'ivNo',
            			filter : 'string',
            			align : 'left',
            			width: 140
            		},
            		{
            			header: ViewUtil.getLabel('lastDateStg'),
            			dataIndex: 'lastDateStg',
            			filter : 'string',
            			align : 'left',
            			width: 200
            		}]
				}
		    }],
		});
		
		me.callParent();
	}
});

