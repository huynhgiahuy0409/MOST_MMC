Ext.define('MOST.view.operation.vsrchecklist.ForkliftDeployment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-forkliftdeployment',
	
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
	 FORKLIFT_DEPLOY_GRID_REF_NAME: 'refForkliftGrid',  // Main Grid Name 
	 FORKLIFT_DEPLOY_STORE_NAME: 'forkliftList',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.FORKLIFT_DEPLOY_GRID_REF_NAME,
				flex: 1,
				usePagingToolbar : false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.FORKLIFT_DEPLOY_STORE_NAME + '}'
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners : {
					cellclick: 'onForkliftDevploymentGridClick'
				},
				
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('VSRForkliftDeploy')
				}
			}]
		});
		
		me.callParent();
	}
});