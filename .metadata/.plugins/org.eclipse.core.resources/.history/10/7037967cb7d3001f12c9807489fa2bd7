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
					collapsible:true,
					margin: '5 5 5 5',
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
						flex: 1,
						defaults: {
							margin: '0 5 0 0',
							labelAlign: 'right',
							labelWidth: 100,
							width: 250
						},
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items:[{
							reference: 'ctlSearchDate',
							xtype: 'datefield',
							fieldLabel: ViewUtil.getLabel('date'),
							format: MOST.config.Locale.getShortDate(),
							editable: true
						},{
							xtype: 'combobox',
							fieldLabel: ViewUtil.getLabel('shift'),
							bind: {
								store: '{shiftCombo}',
								value: '{theSearch.shiftId}'
							},
							queryMode: 'local',
					        displayField: 'shftNm',
					        valueField: 'shftId',
					        reference:'refShift',
					        forceSelection : true,
					        editable: false,
					        emptyText: ViewUtil.getLabel('select')
						},{
							xtype : 'vesselcalllistfield',
							margin : '0 0 0 5',
							reference : 'ctlJpvc',
							fieldLabel : ViewUtil.getLabel('vslschlJPVCNo'),
							labelAlign : 'right',
							emptyText : ViewUtil.getLabel('vslschlJPVCNo'),
							bind : {
								value : '{theSearch.vslCallId}'
							}
						}]
					},{
						xtype: 'container',
						flex: 1,
						defaults: {
							margin: '0 5 0 0',
							labelAlign: 'right',
							labelWidth: 100
						},
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items:[{
            				xtype: 'textfield',
            				reference : 'ctlStaffNo',
            				fieldLabel: 'Staff No',
							maxLength: 6,
							enforceMaxLength : true,
							width : 200,
							bind : {
								value : '{theSearch.staffNo}'
							}
						},{
            				xtype: 'textfield',
            				reference : 'ctlStaffName',
							maxLength: 50,
							enforceMaxLength : true,
							width : 200,
							bind : {
								value : '{theSearch.staffNm}'
							},
					        listeners:{
		   						change: 'onUpperCase'
		   					}
            			}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});