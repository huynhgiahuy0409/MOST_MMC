Ext.define('MOST.view.planning.roster.ShiftDefinitionGroup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-shiftdefinitiongroup',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'hbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	SHIFT_DEF_GRP_GRID_REF_NAME: 'refShiftDefinitionGroupGrid',				// Main Grid Name 
	SHIFT_DEF_GRP_STORE_NAME: 'shiftGroupDefOnlyStore',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'shiftDefinitionGroupEditor',
			autoCancel: false,
			listeners: {
				cancelEdit: 'onCancelEdit',				
				validateedit: 'onShiftDefGroupValidateEdit',				
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				itemId: 'shiftDefinitionGroupGrid',
				reference: me.SHIFT_DEF_GRP_GRID_REF_NAME,
				usePagingToolbar : false,
				flex : 1,			
				stateId : 'stateShiftDefinitionGroupGrid',
				plugins: [
	    		          rowEditing, 
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.SHIFT_DEF_GRP_STORE_NAME + '}'
	    		},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('ShiftDefinitionGroup')
				}
		    }],
		    
		    dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
            	},
				items: ['->',{
					xtype: 'button',
					text: ViewUtil.getLabel('add'),
					ui: 'create-button',
					reference: 'refBtnCreate',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: {
							fn: 'onShiftDefAdd',
							args: ['G']
						}
					}
				}, 
				{
					xtype: 'button',
					itemId: 'deleteButton',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					reference: 'refBtnDelete',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: {
							fn: 'onShiftDefRemove',
							args: ['G']
						}
					}
				}]
		    }]
		});
		
		me.callParent();
	}
});

