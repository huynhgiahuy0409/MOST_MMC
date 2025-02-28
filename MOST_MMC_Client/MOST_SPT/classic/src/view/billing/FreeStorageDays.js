Ext.define('MOST.view.billing.FreeStorageDays', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-freestoragedays',
	requires: [
		'MOST.view.billing.FreeStorageDaysController',
		'MOST.view.billing.FreeStorageDaysModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'freestoragedays',
	
	viewModel: {
		type: 'freestoragedays'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refFreeStorageDaysGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'freeStorageDaysList',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			errorSummary: false,
			pluginId :'freeStorageDaysGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				validateedit: 'onValidateEdit',				
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items:[{
	            xtype: 'container',
	            margin: '5 5 5 5',
	            layout: {
	                type: 'hbox',
	                align: 'stretch',
	                
	            }, 
	            defaults: {
                    labelAlign: 'right',
                    margin: '5 5 5 0',
                    editable: false
                },
	            items: [
	            	{
						xtype:'label',
						text:'**Priority: 1.Partner, 2.Category, 3.Cargo Type, 4.Commodity',
						style: 'color:#FF7200; font-size: 12px'
					}
	            ]
			},{
				xtype: 'tsb-datagrid',
	    		reference: me.MAIN_GRID_REF_NAME,
	    		flex: 1,
				margin: '0 5 0 0',
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
	            	items: GridUtil.getGridColumns('FreeStorageDays')
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
					margin: '0 5 0 0',
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
								xtype: 'partnercdtypefield',
								reference: 'ctlPartnerCodeType',
								fieldLabel: ViewUtil.getLabel('partnerCode'),
								labelWidth: 80,
								flex: 1,
								editable: false,
								bind: '{theSearch.ptnrCd}'
							}, 
							{
								xtype: 'container',
								flex: 1,
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								items: [
									{
										xtype: 'label',
										text: ViewUtil.getLabel('period'),
										style: 'text-align: right; margin-top: 5px;',
										width: 80
									},
									{
										reference: 'ctlFrom',
										xtype: 'datefield',
										margin: '0 0 0 5',
										flex: 1,
										editable: false,
										format: MOST.config.Locale.getShortDate(),
										bind: '{theSearch.aplyYmd}'
									},
									{
										reference: 'ctlTo',
										margin: '0 0 0 5',
										xtype: 'datefield',
										flex: 1,
										editable: false,
										format: MOST.config.Locale.getShortDate(),
										bind: '{theSearch.exprYmd}'
									},
								]
							}, 
							{
								xtype: 'container',
								flex: 2.5
							}
						]
					}]
				}]
			}]
		});
		me.callParent();
	}
});

