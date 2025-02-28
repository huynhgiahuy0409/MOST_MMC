Ext.define('MOST.view.operation.vordrybreakbulk.SummaryOfHandling', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-summaryOfHandling',
	
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
	MAIN_GRID_REF_NAME: 'refSummaryOfHandlingGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'summaryOfHandling',
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
    				flex: 1,
    				stateId : 'stateSummaryOfHandlingGrid',
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
    					
    				},
                    columns: {
    	            	defaults: {
    	            		style : 'text-align:center',
    	            		align : 'center'
    	            	},
    	            	items: GridUtil.getGridColumns('SummaryOfHandling'),
                    }
		        }
			],
			dockedItems: [{
                xtype: 'toolbar',
                margin : '5 5 0 0',
                dock: 'bottom',
                items: [
                	 {
                         xtype: 'container',
                         flex: 1,
                         margin : '5 5 0 0',
                         defaults: {
                             labelAlign: 'right'
                         },
                         layout: {
                             type: 'hbox'
                         },
                         items: [
                         	{
     							xtype : 'textfield',
     							reference: 'refVORTotalLoad',
     							fieldLabel : ViewUtil.getLabel('vorTotalLoad'),
     							editable: false,
     							width : 220,
     							labelWidth: 82
                  	 		},
                  	 		{
     							xtype : 'textfield',
     							reference: 'refVORTotalDischarge',
     							fieldLabel : ViewUtil.getLabel('vorTotalDischarge'),
     							editable: false,
     							width : 240,
     							labelWidth: 120
                  	 		}
                         ]
                     }
                ]
            }]
		});
		
		me.callParent();
	}
});