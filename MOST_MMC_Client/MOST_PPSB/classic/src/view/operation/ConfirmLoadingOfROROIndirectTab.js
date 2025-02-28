Ext.define('MOST.view.operation.ConfirmLoadingOfROROIndirectTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-confirmLoadingOfROROIndirectTab',
	
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
	MAIN_GRID_REF_NAME: 'refConfirmLoadingOfROROIndirectGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'inDirectUnitItemsList',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},
	flex:1,
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
                {
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					usePagingToolbar : false,
					stateful : true,
					plugins: [
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
						cellClick: 'onIndirectTabClick',
						pagingSearch: 'onSearch'
					},
					
					columns: {
						defaults: {
							style : 'text-align:center',
							align : 'center'
						},
						items: GridUtil.getGridColumns('ConfirmLoadingOfROROIndirectTab')
					}
				}
			]
		});
		
		me.callParent();
	}
});

