Ext.define('MOST.view.monitoring.LogHangingScaleMonitoringTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-loghangingscalemonitoringtab',
	
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
	MAIN_GRID_REF_NAME: 'refLogHGMonitoringTabGrid',
	MAIN_STORE_NAME: 'listFilesHG',	
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
				itemId: 'logHGMonitoringTabGridId',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				usePagingToolbar : false,
				stateful : true,
				stateId : 'stateLogHGMonitoringTablGrid',
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
	            	items:GridUtil.getGridColumns('logHGMonitoring')
				}
		    }]
		});
		
		me.callParent();
	}
});