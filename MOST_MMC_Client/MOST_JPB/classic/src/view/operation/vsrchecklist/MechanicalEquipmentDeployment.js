Ext.define('MOST.view.operation.vsrchecklist.MechanicalEquipmentDeployment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-mechanicalequipmentdeployment',
	
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
	ME_EQUIPMENT_DEPLOY_GRID_REF_NAME: 'refMechanicalEqGrid',
	ME_EQUIPMENT_DEPLOY_STORE_NAME: 'mechanicalEqList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
//	layout : {type  : 'vbox', align : 'stretch'},
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
            items: [{
				xtype: 'tsb-datagrid',
				reference: me.ME_EQUIPMENT_DEPLOY_GRID_REF_NAME,
				stateful : true,
				stateId : 'stateMechanicalEqGrid',
				flex: 1,
				usePagingToolbar : false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.ME_EQUIPMENT_DEPLOY_STORE_NAME + '}'
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners : {
					cellclick: 'onMEClick'
				},
				
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('VSRMechanicalEquipmentDeploy')
				}
            }]
		});
		
		me.callParent();
	}
});