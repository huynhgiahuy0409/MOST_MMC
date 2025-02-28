Ext.define('MOST.view.billing.TariffCode', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-tariffcode',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-tariffcodesdetail',
	
	controller: 'tariffcode',
	
	viewModel: {
		type: 'tariffcode'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTariffCodeGrid',	// Main Grid Name 
	MAIN_STORE_NAME: 'tariffCodeList',	// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			items: [
			{
				xtype: 'tsb-datagrid', //'grid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				margin:'5 5 5 0',
				stateful : true,
				stateId : 'stateTariffCodeGrid',
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
					pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
					},
					items: GridUtil.getGridColumns('TariffCodes')
				}
		    }],
		    dockedItems: [
		    	{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
						type : 'hbox',
						align: 'right'//'left'
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [
					{
						xtype: 'tbfill'
					},
					{
						xtype: 'button',
						reference: 'refBtnRetrieve',
						text: ViewUtil.getLabel('search'),
						iconCls: 'x-fa fa-search', 
						cls: 'search-button', 
						listeners: {
							click: 'onSearch'
						}
					
					},{
						xtype: 'button',
						itemId: 'btnAdd',
						reference: 'refBtnCreate',
						text: ViewUtil.getLabel('add'),
						iconCls: 'x-fa fa-plus',
						listeners: {
							click: 'onAdd'
						}
					},{
						xtype: 'button',
						itemId: 'btnDelete',
						reference: 'refBtnDelete',
						text: ViewUtil.getLabel('remove'),
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
						listeners: {
							click: 'onRemove'
						}
					},,
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
				},{
					xtype : 'toolbar',
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
							items:[{
								xtype: 'combo',
								reference: 'refsearchTariffCodeCombo',
								labelWidth:70,
								width:300,
								fieldLabel: ViewUtil.getLabel('trfTpCd'), // me.lblTariffType,
								queryMode: 'local',
								bind: {
									store: '{tariffCodeCombo}',
									value: 'MGM'
								},
								displayField: 'scdNm',
							    valueField: 'scd',
							    value : '',
							    editable: false,
							    allowBlank: true,
							    forceSelection:true,
							    disabled: true
							},
//							{
//								xtype : 'combobox',
//								editable : false,
//								reference : 'refCostCenterCondition',
//								width : 200,
//								fieldLabel: ViewUtil.getLabel('tariffCostCentre'), // me.lblCostCenter,
//								bind : {
//									store : '{costCenterCombo}',
//									value: '{theSearch.costCntCd}'
//								},
//								queryMode : 'local',
//								displayField : 'costCntCd',
//								valueField : 'costCntCd',
//								editable : true,
//								emptyText : 'Select',
//								labelAlign : 'right',
//								labelWidth: 80
//							},
//							{
//								xtype : 'combobox',
//								fieldLabel: ViewUtil.getLabel('billingtype'), // me.lblBillingType,
//								reference : 'refBillingType',
//								queryMode : 'local',
//								bind : {
//									store : '{billingTypeCombo}',
//									value: '{theSearch.billTpCd}'
//								},
//								displayField : 'scdNm',
//								valueField : 'scd',
//								value : '',
//								width : 250,
//								editable : true
//							}
							]
						}]
					}]
				}
			]
		});
		me.callParent();
	}
});

