Ext.define("MOST.view.codes.CountryCode",{
	extend: "Ext.panel.Panel",
    
    alias: 'widget.app-countrycode',
    requires: [
		'MOST.view.codes.CountryCodeModel',
		'MOST.view.codes.CountryCodeController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
   	],
       	
   	detailViewAlias: 'app-countrycodedetail',
   	controller: 'countryCode',
   	viewModel: {
   		type: 'countryCode'
   	},
	listeners: {
		afterrender: 'onLoad'
	},
   	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   	MAIN_GRID_REF_NAME: 'refCountryCodeGrid',
   	MAIN_STORE_NAME: 'countryCode',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
    	
   	layout: {type:'hbox', align:'stretch'},
   	initComponent: function() {
   		var me = this;
   		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
   			clicksToMoveEditor: 2,
			clicksToEdit: 2,
   			pluginId :'countryCodeEditor',
   			autoCancel: false,
   			listeners:{
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
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
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
						celldblclick: 'onDblclick',
						pagingSearch: 'onSearch'
					},
					columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items:GridUtil.getGridColumns('CountryCode')
					}
				}  
			],
   			dockedItems: [
   				{
	                xtype: 'container',
	                style: { "background-color":"white" },
	                layout: {
	                	type: 'hbox',
	                },
	                defaults: {
	                    margin: '1 1 1 1'
	                },
	   				items: [
	   					{
	   						xtype: 'tbfill'
	   					},{
							xtype: 'button',
							reference:'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search', 
							cls: 'search-button', 
							listeners: {
								click: 'onSearch'
							}
						},{
							xtype: 'button',
							itemId: 'btnAdd',
							reference:'refBtnCreate',
							text: ViewUtil.getLabel('add'),
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
						},{
							xtype: 'button',
							itemId: 'btnDelete',
							reference:'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
							}
						},{
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
						},{
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
						}
	   				]
	   			},{
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
		   			items: [
		   				{
			   				xtype:'searchfieldset',
			   				title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
			   				layout:{
			   					type:'vbox',
			   					align:'stretch'
			   				},
			   				defaults:{
								margin: '0 0 5 0'
							},
			   				flex: 1,
			   				items:[
			   					{
			   	       				xtype: 'container',
			   	       				layout:{
			   	       					type:'hbox'
			   	       				},
			   	       				defaults:{
			   	       					labelAlign: 'right',
			   	       					labelWidth:80,
			   	       					margin:'5 5 5 0'
			   	       				},
			   	       				items: [
			   	       					{
				   	       					reference: 'txtCountryCode',
				   	       					xtype: 'textfield',
				   	       					inputType: "search",
				   	       					selectOnFocus: true,
				   	       					fieldLabel: ViewUtil.getLabel('countrycode'),
				   	       					emptyText: ViewUtil.getLabel('countrycode'),
				   	       					enableKeyEvents :true,
				   	       					fieldStyle: 'text-transform:uppercase',
				   	       					maxLength: 2,
				   	       		            enforceMaxLength: true,
				   	       		            bind: '{theSearch.scd}'	
				   	       				},{
				   	       					reference: 'txtCountryName',
				   	       					xtype: 'textfield',
				   	       					inputType: "search",
				   	       					selectOnFocus: true,
				   	       					fieldLabel: ViewUtil.getLabel('countryname'),
				   	       					emptyText: ViewUtil.getLabel('countryname'),
				   	       					fieldStyle: 'text-transform:uppercase',
				   	       					maxLength: 50,
				   	       		            enforceMaxLength: true,
				   	       		            bind: '{theSearch.scdNm}'	
				   	       				}
				   	       			]
			   	       			}     					
			   				]
			   			}
		   			]
				}
	   		]
   		});
   		
   		me.callParent();
   	}
});
