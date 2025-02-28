Ext.define('MOST.view.operation.VORList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vorList',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'hbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVORListGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vorList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [
				 {
	                    xtype: 'tsb-datagrid',
	                    reference: me.MAIN_GRID_REF_NAME,
	                    usePagingToolbar : false,
	    				stateful : true,
	    				flex:1,
	    				stateId : 'stateVORListGrid',
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
	    					cellDblClick: 'onVORListDblClick',
	    					itemclick: 'onSelect',
	    				},
	                    columns: {
	    	            	defaults: {
	    	            		style : 'text-align:center',
	    	            		align : 'center'
	    	            	},
	    	            	items: GridUtil.getGridColumns('VORList'),
	    	            	
	                    }
			        }
			],
			dockedItems: [{
                xtype: 'toolbar',
                margin : '5 5 0 0',
                dock: 'bottom',
                items: [
                	{
						xtype : 'textfield',
						reference: 'refRemark',
						fieldLabel : ViewUtil.getLabel('remarks'),
						width : 600,
						labelWidth: 82
         	 		},
         	 		{
						xtype: 'button',
						margin: '0 0 0 5',
						itemId: 'updateButton',
						reference:'refBtnSave',
						text: ViewUtil.getLabel('update'),
						ui: 'update-button',
						iconCls: 'x-fa fa-plus',
						listeners: {
							click: 'onUpdate'
						}
					},{
						xtype: 'button',
						margin: '0 0 0 5',
						itemId: 'exportToExcelButton',
						reference:'refBtnDownload',
						text: ViewUtil.getLabel('exportToExcel'),
						iconCls: 'x-fa fa-file-excel-o txt_green',
						listeners: {
							click: {
								fn: 'onExportExcel',
							}
						}
					}
                ]
            }]
		});
		
		me.callParent();
	}
});