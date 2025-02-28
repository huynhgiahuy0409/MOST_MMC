Ext.define('MOST.view.billing.SsrList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-ssrlist',
	requires: [
		'MOST.view.billing.SsrListModel',
		'MOST.view.billing.SsrListController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-ssrdetail',
	
	controller: 'ssrlist',
	
	viewModel: {
		type: 'ssrlist'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
   	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   	MAIN_GRID_REF_NAME: 'refSsrListGrid',
   	MAIN_STORE_NAME: 'ssrListList',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			items: [{
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
					items:GridUtil.getGridColumns('SsrList')
				}
		    }],
		    dockedItems: [{
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                	type: 'hbox',
                },
                defaults: {
                    margin: '1 1 1 1'
                },
                items: [{
						xtype: 'tbfill'
				},
				{
					xtype: 'button',
					reference:'refBtnRetrieve',
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
						// click: 'onRemove'
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
				},
				{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
				}]
		    },
		    {
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '5 0 5 0',
				defaults: {
					labelAlign: 'right',
				},
       			items: [{
       				xtype:'searchfieldset',
       				title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
       				layout:{
       					type:'vbox',
       					align:'stretch'
       				},
       				defaults:{
						//margin: '0 0 5 0'
					},
       				flex: 1,
       				items:[
		            {
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						}, 
						defaults: {
							labelAlign: 'right',
							margin: '0 5 0 0',
							editable: false
						},
						items: [
						{
							reference: 'ctlFrmDate',
							xtype: 'datefield',
							labelWidth:70,
							width:190,
							fieldLabel: ViewUtil.getLabel('period'),
							format: MOST.config.Locale.getShortDate(),
							allowBlank: false,
							listeners: {
								select: 'onChangeDateMain',
							}					
						},
						{
							reference: 'ctlToDate',
							xtype: 'datefield',
							width:120,
							format: MOST.config.Locale.getShortDate(),
							allowBlank: false,
							listeners:{
								select: 'onChangeDateMain',
							}
						},
						{
							reference: 'cltStatus',
							xtype: 'combo',
							labelWidth:70,
							width:250,
							fieldLabel: ViewUtil.getLabel('ssrStatCd'),
							queryMode: 'local',
							bind: {
								store: '{ssrStatusCombo}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							editable: true,
							allowBlank: true,
							forceSelection:true
						},
						{
							xtype:'partnercdtypefield',
							reference:'ctlPartner',
							fieldLabel:ViewUtil.getLabel('payerCd'),
							emptyText:ViewUtil.getLabel('payerCd'),
							params:{
								searchModule: 'MT'
							},
							change: function(field, newValue){
								   field.setValue(newValue.toUpperCase());
							},
							labelWidth: 70,
							width: 250,
							editable: false
						}]
					},
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox'
						}, 
						defaults: {
							labelAlign: 'right',
							margin: '5 5 0 0',
							editable: false
						},
						items: [
						{
							reference: 'cltSsrType',
							xtype: 'combo',
							labelWidth:70,
							width:315,
							fieldLabel: ViewUtil.getLabel('ssrtype'),
							queryMode: 'local',
							bind: {
								store: '{ssrTypeCombo}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							editable: true,
							allowBlank: true,
							forceSelection:true
						},
						{
							xtype:'vesselcalllistfield',
							reference: 'cltvesselCallId',
							width:250,
							labelWidth:70,
							fieldLabel:ViewUtil.getLabel('vessel'),
							emptyText:ViewUtil.getLabel('vessel'),
						},
						{
							reference: 'cltBerthNo',
							xtype: 'combo',
							labelWidth:70,
							width:250,
							fieldLabel: ViewUtil.getLabel('berthNo'),
							queryMode: 'local',
							bind: {
								store: '{berthNoCombo}'
							},
							displayField: 'locNm',
							valueField: 'locId',
							value : '',
							editable: true,
							allowBlank: true,
							forceSelection:true
						},
						{
							reference: 'cltWhId',
							xtype: 'combo',
							labelWidth:100,
							width:280,
							fieldLabel: ViewUtil.getLabel('whId'),
							queryMode: 'local',
							bind: {
								store: '{whIdCombo}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							editable: true,
							allowBlank: true,
							forceSelection:true
						}]
					}]
       			}],
			}]
		});
		
		me.callParent();
	}
});

