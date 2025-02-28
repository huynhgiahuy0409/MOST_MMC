Ext.define('MOST.view.operation.vorliquidbulk.vorSummary', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vorSummary',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVORSummaryGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vorSummary',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
				
		Ext.apply(me, {
			items: [
				{
                    xtype: 'tsb-datagrid',
                    reference: me.MAIN_GRID_REF_NAME,
                    usePagingToolbar : false,
    				stateful : true,
    				stateId : 'stateVORSummaryGrid',
    				plugins: [
    					'gridexporter',
    					'gridfilters',
    					'clipboard'
    	    		],
    	    		bind: {
    	    			store: '{' + me.MAIN_STORE_NAME + '}'
    	    		},
    	    		selModel: {
    					type: 'spreadsheet',
    					cellSelect: false
    				},
    				listeners: {
    						cellDblClick: 'onVORSummaryDblClick'
    				},
                    columns: {
    	            	defaults: {
    	            		style : 'text-align:center',
    	            		align : 'center',
    	            		width : 120
    	            	},
    	            	items: GridUtil.getGridColumns('VORSummary')
    	            	
                    }
		        }
			]
		});
		
		me.callParent();
	}
});