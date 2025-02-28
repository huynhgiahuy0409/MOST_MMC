Ext.define('MOST.view.billing.CostCenter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-costcenter',
	requires: [
		'MOST.view.billing.CostCenterController',
		'MOST.view.billing.CostCenterModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'costcenter',
	
	viewModel: {
		type: 'costcenter'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */ 
	MAIN_GRID_REF_NAME: 'refcostCenterGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'costCenterList',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	initComponent: function() {

		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'costCenterEditor',
			autoCancel: false,
			listeners: {
				cancelEdit:'onCancelEdit',
				validateedit:'onValidateEdit',
				edit:'onEdit'
			}
		});

		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items:[{
				xtype: 'tsb-datagrid',
	    		reference: me.MAIN_GRID_REF_NAME,
	    		flex: 1,
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
					rowSelect: true,
                    cellSelect:false,
				},
	    		listeners: {
	    			cellDblClick: 'onDblClick',
	    			pagingSearch: 'onSearch'
	    		},
	    		columns:{
	    			defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('CostCenter')
	    		}
			}],
			dockedItems: [{
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items:[{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search', 
					cls: 'search-button', 
					reference:'refBtnRetrieve',
					listeners: {
						click: 'onSearch'
					}
				},
				{
					xtype: 'button',
					itemId: 'btnAdd',
					reference: 'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},
				{
					xtype: 'button',
					itemId: 'btnDelete',
					reference: 'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemove'
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button', 
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, true]
						}
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, false]
						}
					}
            	},{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
				
            	}]
			}, {
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items: [{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '0 0 0 0'
						},
						items: [
						{
							xtype: 'combo',
    	   					reference: 'ctlsearchSBUCombo',
    	   					labelWidth:30,
    	   					width:180,
    	   					fieldLabel: ViewUtil.getLabel('SBU'),
    	   					queryMode: 'local',
    	   					bind: {
    	    	    			store: '{searchSBUCombo}',
    	    	    			value: '{theSearch.codeSBU}'	
    	    	    		},
    	    	    		displayField: 'scdNm',
    	   					valueField: 'scd',
    	   					value : '',
    	   					allowBlank: true,
    	   					forceSelection:true
    	   				},
                        {
    						xtype:'textfield',
    						reference:'ctlsearchCode',
    						fieldLabel: ViewUtil.getLabel('code'),
    	   					labelWidth: 30,
    						width: 180,
    						listeners: {
    							change: 'onUpperCase'
    						},
    						bind: '{theSearch.codeCostCenter}'
                        }]
					}]
				}]
			}]
		});

		me.callParent();
	}
});

