Ext.define('MOST.view.operation.vsrchecklist.TrailerDeployment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-trailerdeployment',
	
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
	TRAILER_DEPLOY_REF_NAME: 'refTrailerGrid', 
	TRAILER_DEPLOY_NAME: 'trailerList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'trailerGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',	
				validateedit: 'onValidateTREdit',
				edit: 'onEdit'
			}
		});
			
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.TRAILER_DEPLOY_REF_NAME,
				flex: 1,
				usePagingToolbar : false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.TRAILER_DEPLOY_NAME + '}'
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners : {
					cellclick: 'onTrailerDeploymentGridClick'
				},
				
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('VSRTrailerMega')
				}
	        }]
		});
		
		me.callParent();
	}
});