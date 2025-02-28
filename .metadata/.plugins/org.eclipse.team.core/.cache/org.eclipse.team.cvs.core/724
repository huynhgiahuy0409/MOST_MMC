Ext.define('MOST.view.monitoring.LogWeightBridgeMonitoringTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-logwbmonitoringtab',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	flex:1,
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refLogWBMonitoringTabGrid',
	MAIN_STORE_NAME: 'listFilesWB',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				itemId: 'logWBMonitoringTabGridId',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				usePagingToolbar : false,
				stateful : true,
				stateId : 'stateLogWBMonitoringTablGrid',
				plugins: [
					'gridexporter', 
					'gridfilters',
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
				selModel: {
					type: 'checkboxmodel',  
					checkOnly: false,
					showHeaderCheckbox: false,
					mode: 'SINGLE'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'left'
	            	},
	            	items:GridUtil.getGridColumns('logWBMonitoring')
				}
		    }]
		});
		
		me.callParent();
	}
});