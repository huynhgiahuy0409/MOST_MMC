Ext.define('MOST.view.planning.DeploymentList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-deploymentlist',
	
	requires: [
		'MOST.view.planning.DeploymentListModel',
		'MOST.view.planning.DeploymentListController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'deploymentlist',
	
	viewModel: {
		type: 'deploymentlist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDeploymentGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'deploymentItems',            // Main Store Name
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
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
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
				listeners : {
					pagingSearch:'onSearch'
				},
				columns: {
					defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('DeploymentItems')
				}
			}],
			
			dockedItems:[{
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
				}]			
			},{//Search Condition and Vessel information:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				margin: '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible: true,
					margin: '0 5 0 0',
					padding: '0 10 10 10',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'container',
							flex: 0.5,
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
							},
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'shipcallnofield',
									reference: 'ctlScn',
									emptyText: ViewUtil.getLabel('shipCallNo'),
									flex: 1,
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theSearch.scn}',
									},
								},
								{
									xtype: 'vesselcalllistfield',
									margin: '5 0 0 0',
									reference: 'ctlJpvc',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('vslschlJPVCNo'),
									labelAlign: 'right',
									emptyText: ViewUtil.getLabel('vslschlJPVCNo'),
									bind: {
										value: '{theSearch.vslCallId}',
									},
								},
							],
						},
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									width: '100%',
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
									},
									items: [
										{
											reference: 'ctlSearchDate',
											xtype: 'datefield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('date'),
											format: MOST.config.Locale.getShortDate(),
											editable: true,
										},
										{
											xtype: 'combobox',
											reference: 'refShift',
											fieldLabel: ViewUtil.getLabel('shift'),
											flex: 1,
											margin: '0 0 0 5',
											labelWidth: 80,
											bind: {
												store: '{shiftCombo}',
												value: '{theSearch.shiftId}',
											},
											queryMode: 'local',
											displayField: 'shftNm',
											valueField: 'shftId',
											forceSelection: true,
											editable: false,
											emptyText: ViewUtil.getLabel('select'),
										},
									],
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
									},
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'ctlStaffNo',
											fieldLabel: 'Staff No',
											maxLength: 6,
											flex: 1,
											enforceMaxLength: true,
											bind: {
												value: '{theSearch.staffNo}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'ctlStaffName',
											flex: 1,
											margin: '0 0 0 5',
											maxLength: 50,
											enforceMaxLength: true,
											bind: {
												value: '{theSearch.staffNm}',
											},
											listeners: {
												change: 'onUpperCase',
											},
										},
									],
								},
							],
						},
						{
							xtype: 'container',
							flex: 1.75,
						},
					],
				}]
			}]
		});
		
		me.callParent();
	}
});