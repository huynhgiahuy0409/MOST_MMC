Ext.define('MOST.view.configuration.DriverTruckRegistrationChassisTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-drivertruckregistrationchassistab',
	
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
	MAIN_GRID_REF_NAME: 'refDriverLorryRegistrationChassisTabGrid',
	MAIN_STORE_NAME: 'chassisListOnly',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'driverLorryRegistrationChassisTabGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateChassisEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				itemId: 'driverLorryRegistrationCHassisTabGridId',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateDriverLorryRegistrationChassisTablGrid',
				plugins: [
					rowEditing, 
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
					pagingSearch: 'onSearch',
					celldblclick: 'onDblClickChassisGrid'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('DriverLorryRegistrationChassisTabl')
				}
		    }]
		});
		
		me.callParent();
	}
});































































































