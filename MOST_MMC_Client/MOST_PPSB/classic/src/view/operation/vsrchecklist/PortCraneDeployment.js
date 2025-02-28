Ext.define('MOST.view.operation.vsrchecklist.PortCraneDeployment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-portcranedeployment',
	
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
	 PORTCRANE_DEPLOY_GRID_REF_NAME: 'refPortCraneGrid',  // Main Grid Name 
	 PORTCRANE_DEPLOY_STORE_NAME: 'portCraneList',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	 
	 //	layout : {type  : 'vbox', align : 'stretch'},
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			items: [ {
				xtype: 'tsb-datagrid',
					reference: me.PORTCRANE_DEPLOY_GRID_REF_NAME,
					flex: 1,
					usePagingToolbar : false,
					stateful : true,
					stateId : 'statePortCraneGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.PORTCRANE_DEPLOY_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners : {
						celldblclick: 'onPortCraneClick',
					},
					
					columns: {
						defaults: {
							style : 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('VSRPortcraneDeploy')
					}
				}	
			]
		});
		me.callParent();
	}
});