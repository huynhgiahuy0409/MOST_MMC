Ext.define('MOST.view.configuration.DriverTruckRegistrationTruckTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-drivertruckregistrationtrucktab',
	
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
	MAIN_GRID_REF_NAME: 'refDriverLorryRegistrationLorriesTabGrid',
	MAIN_STORE_NAME: 'lorriesListOnly',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'driverLorryRegistrationLorriesTabGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateLorryEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				itemId: 'driverLorryRegistrationLorriesTabGridId',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateDriverLorryRegistrationLorriesTablGrid',
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
					celldblclick: 'onDblClickLorryGrid'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('DriverLorryRegistrationLorriesTabl')
				}
		    }]
		});
		
		me.callParent();
	}
});































































































