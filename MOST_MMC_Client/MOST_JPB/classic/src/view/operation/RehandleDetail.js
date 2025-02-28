Ext.define('MOST.view.operation.RehandleDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-rehandledetail',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:900,
	height: 560,
	scrollable: true,
	
	listeners:{
		afterrender: 'onRehandleDetailLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: 'refRehandleDetailGrid',
					usePagingToolbar : false,
					flex : 1,
					stateful : true,
					stateId : 'stateRehandleDetailGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
		    		],
		    		bind: {
		    			store: '{rehandleDetailList}'
		    		},
		    		selModel: {
		    			type: 'checkboxmodel',  
			            checkOnly: false,
			            showHeaderCheckbox: true
					},
					columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items:GridUtil.getGridColumns('RehandleDetail')
					}
			    }
			],
		    
		    dockedItems: [
		    	{
					xtype: 'toolbar',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right'
	            	},
					items: [
						'->',
                        {
        					xtype: 'button',
        					itemId: 'deleteButton',
        					text: ViewUtil.getLabel('remove'),
        					reference:'refBtnDelete',
        					ui: 'delete-button',
        					iconCls: 'x-fa fa-minus',
        					listeners: {
        						click: 'onRehandleDetailRemove'
        					}
        				},
						{
							xtype: 'button',
							itemId: 'exportToExcelButton',
							reference:'refBtnDownload',
							text: ViewUtil.getLabel('exportToExcel'),
							iconCls: 'x-fa fa-file-excel-o txt_green',
							listeners: {
								click: {
									fn: 'onExportExcel',
									args:['refRehandleDetailGrid']
								}
							}
						}
					]
		    	}
		    ]
		});
		
		me.callParent();
	}
});