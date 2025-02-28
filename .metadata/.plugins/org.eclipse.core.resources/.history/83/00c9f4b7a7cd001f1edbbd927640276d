Ext.define('MOST.view.configuration.WarehouseDefinitionList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-warehousedefinitionlist',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	detailViewAlias: 'app-warehousedefinitiondetail',

	controller: 'warehouseDefinition',
	
	viewModel: {
		type: 'warehouseDefinition',
		data: {
			fontcolor: '#0f0',
			backcolor: '#0f0'
		}
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refWarehousedefinitionlistGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'warehouseDefinitionGrid',            // Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: 'refWarehousedefinitionlistGrid',
				flex : 1,
				stateful : true,
				stateId : 'statearehousedefinitionlistGrid',
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
					celldblclick: 'onDblClick',
					pagingSearch:'onSearch'
				},
				columns: {
					defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('WarehouseDefinition')
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
				items: [{
					xtype: 'tbfill'
				},{
					xtype: 'button',
					itemId:'inquiryItemId',
					reference:'refBtnRetrieve',
 					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
 					listeners: {
 						click: 'onSearch'
 					}
				},{
 					xtype: 'button',
 					reference:'refBtnClear',
 					text: ViewUtil.getLabel('refresh'),
 					iconCls: 'x-fa fa-refresh',
 					listeners: {
 						click: 'onRefresh'
 					}
				},{
 					xtype: 'button',
 					itemId:'createItemId',
 					reference:'refBtnCreate',
 					text: ViewUtil.getLabel('add'),
 					ui: 'create-button',
 					iconCls: 'x-fa fa-plus',
 					listeners: {
 						click: 'onAdd'
 					}
 				},{
 					xtype: 'button',
 					itemId:'deleteItemId',
 					reference:'refBtnDelete',
 					text: ViewUtil.getLabel('remove'),
 					ui: 'delete-button',
 					iconCls: 'x-fa fa-minus',
 					listeners: {
 						click: 'onRemove'
 					}
 				},{
 					xtype: 'button',
 					itemId:'downloadItemId',
 					reference:'refBtnDownload',
 					text: ViewUtil.getLabel('exportToExcel'),
 					iconCls: 'excel-button-image',
 					listeners: {
 						click: {
 							fn: 'onExportExcel',
 							args:['refSingleGridGrid']
 						}
 					}
 				}],
		    },
		    {//Search Toolbar:
		    	xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
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
						items:[{
						xtype: 'container',
						layout:{
							type:'hbox'
						},
						defaults:{
							labelAlign: 'right',
							labelWidth: 80,
							margin: '0 0 0 0'
						},
						items: [{
		   					xtype: 'combo',
		   					reference: 'ctlWarehouseType',
		   					labelWidth:80,
		   					width:240,
							fieldLabel: ViewUtil.getLabel('WHType'),
							queryMode: 'local',
		   					bind: {
		    	    			store: '{warehouseTypeCombo}',
		    	    			value: '{theSearch.locTpCd}'
		    	    			
		    	    		},
		   					displayField: 'scdNm',
		   					valueField: 'scd',
		   					value : '',
		   					editable: false
		   				},{
		   					xtype: 'combo',
		   					reference: 'ctlWarehouseArea',
		   					labelWidth:80,
		   					width:240,
							fieldLabel: ViewUtil.getLabel('WHArea'),
							queryMode: 'local',
		   					bind: {
		    	    			store: '{warehouseAreaCombo}',
		    	    			value: '{theSearch.areaId}'
		    	    		},
		   					displayField: 'locNm',
		   					valueField: 'locId',
		   					editable: true,
		   					forceSelection: true, 
		   					typeAhead: true,
		   					value : ''
		   				},{
		   					xtype: 'combo',
		   					reference: 'ctlWarehouseUsed',
		   					labelWidth:80,
		   					width:190,
		   					fieldLabel: ViewUtil.getLabel('WHUsed'),
		   					queryMode: 'local',
	   						bind: {
   								store: '{warehouseUsedYn}',
   								value: '{theSearch.locUseYn}'
							},
		   					displayField: 'codeName',
		   					valueField: 'code',
		   					value : '',
		   					editable: false,
		   					allowBlank: true
		   				}]
					}]
				}]
		    }]
		});
		me.callParent();
	},

	afterRender : function(){
		var me = this;
		me.getController().onLoad();
		me.callParent(arguments);
	}
});

