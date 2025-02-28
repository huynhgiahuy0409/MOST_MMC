Ext.define('MOST.view.operation.detailOfHandling', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-detailOfHandling',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDetailOfHandlingGrid',			
	MAIN_STORE_NAME: 'detailOfHandling',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
				
		Ext.apply(me, {
			items: [
		        {
		            xtype: 'container',
		            flex : 1,
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [{
		                    xtype: 'tsb-datagrid',
		                    margin: '5 0 5 0',
		                    reference: me.MAIN_GRID_REF_NAME,
		                    usePagingToolbar : false,
		    				stateful : true,
		    				flex:1,
		    				stateId : 'stateDetailOfHandlingGrid',
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
		                    columns: {
		    	            	defaults: {
		    	            		style : 'text-align:center',
		    	            		align : 'center'
		    	            	},
		    	            	items: GridUtil.getGridColumns('DetailOfHandling'),
		                    }
				        }
		            ]
		        }
			]
		});
		
		me.callParent();
	}
});