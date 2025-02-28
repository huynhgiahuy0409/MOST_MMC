Ext.define('MOST.view.configuration.DriverTruckRegistrationDriversTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-drivertruckregistrationdriverstab',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
		MAIN_GRID_REF_NAME: 'refDriverLorryRegistrationDriversTabGrid',
		MAIN_STORE_NAME: 'driversListOnly',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'driverLorryRegistrationDriversTabGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateDriverEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				itemId: 'driverLorryRegistrationDriversTabGridId',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateDriverLorryRegistrationDriversTablGrid',
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
					/*celldblclick: 'onDblClickDriverGrid',*/
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('DriverLorryRegistrationDriversTabl')
				}
		    }]
		});
		
		me.callParent();
	}
});

