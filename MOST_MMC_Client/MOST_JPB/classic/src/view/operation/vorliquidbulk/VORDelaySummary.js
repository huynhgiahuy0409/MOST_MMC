Ext.define('MOST.view.operation.vorliquidbulk.vorDelaySummary', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vorDelaySummary',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type: 'vbox', align: 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVORDelaySummaryGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vorDelaySummary',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
				
		Ext.apply(me, {
			items: [{
                xtype: 'container',
                items: [{
					xtype: 'textfield',
					margin: '5 0 5 0',
					reference: 'refVORSummaryTotalDelayTime',
					fieldLabel: ViewUtil.getLabel('vorTotalDelayTime'),
					labelAlign : 'right',
					readOnly : true,
					fieldStyle: "text-align: center;",
					width:270,
					labelWidth: 140
		        
	        	}]
			},{
	        	xtype: 'panel',
	        	layout: 'fit',
	        	flex: 1,
	        	items: [{
	        		xtype: 'tsb-datagrid',
	        		reference: me.MAIN_GRID_REF_NAME,
	        		usePagingToolbar : false,
	        		stateful : true,
	        		stateId : 'stateVORDelaySummaryGrid',
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
	        				items: GridUtil.getGridColumns('VORDelaySummary'),
	        				
	        			}		
	        	}]
			}]
		});
		
		me.callParent();
	}
});