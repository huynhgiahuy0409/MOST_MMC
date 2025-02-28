Ext.define('MOST.view.planning.VesselScheduleInternal', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselscheduleinternal',
	requires: [
		'MOST.view.planning.VesselScheduleInternalModel',
		'MOST.view.planning.VesselScheduleInternalController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-vesselscheduleinternaldetail',
	closeFunction :'Y',


	controller: 'vesselscheduleinternal',
	
	viewModel: {
		type: 'vesselscheduleinternal'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	 /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselScheduleInternalGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'vesselScheduleInternal',			// Main Store Name
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
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{//Grid
				xtype: 'tsb-datagrid',
				margin: '0 5 0 0',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				stateful : true,
				stateId : 'stateVesselScheduleInternalGrid',
				viewConfig: {
					getRowClass: function (row, index) {
						var cls = "";
				
						if(row.get("vslColor") == "R" || row.get("vwcColor") == 'RED'){
							cls = "red-row";	
						} else if(row.get("vslColor") == "B"){
							cls = "blue-row";
						} else if(row.get("vslColor") == "G"){
							cls = "green-row";
						}
						return cls;
					}
				},
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
					celldblclick: 'onDblClick',
					pagingSearch:'onSearch'
				},
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('VesselScheduleInternal')
				}
			}],
			
			//Docked:
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
				},
				{
 					xtype: 'button',
 					itemId:'inquiryItemId',
 					reference:'refBtnRetrieve',
 					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
 					listeners: {
 						click: 'onSearchBtn'
 					}
				},
				{
					xtype: 'button',
					reference:'refBtnRefresh',
					text:  ViewUtil.getLabel('refresh'),
					iconCls: 'x-fa fa-refresh',
					listeners: {
						click: 'onRefreshAll'
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					reference:'refBtnPreview',
					text: ViewUtil.getLabel('preview'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onVslInternalPreviewPDf',
						}
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
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
				}]
			},
			{// Search Condition:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'searchfieldset',
					padding : '0 10 10 10',
					margin: '0 5 0 0',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					}, 
					items: [
						{ //Col 1
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '0 0 5 0',
							},
							items: [
								{
									xtype: 'shipcallnofield',
									reference: 'ctlScn',
									emptyText: ViewUtil.getLabel('shipCallNo'),
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theSearch.scn}',
									},
									
								},
								{
									xtype: 'vesselcalllistfield',
									fieldLabel: ViewUtil.getLabel('vslschCallId'),
									reference: 'ctlVesselCallId',
									emptyText: ViewUtil.getLabel('vslschCallId'),
									change: function (field, newValue) {
										field.setValue(newValue.toUpperCase());
									},
									bind: { value: '{theSearch.vslCallId}' }
								},
								{
									xtype: 'container',
									margin: '0 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right', 
										labelWidth: 80
									},
									items: [
										{
											reference: 'ctlFromDt',
											xtype: 'datefield',
											margin: '0 5 0 0',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('eta'),
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												select: 'onDateChange'
											},
											// editable: false
											editable: true
										},
										{
											reference: 'ctlToDt',
											xtype: 'datefield',
											anchor: '100%',
											flex: 0.65,
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												select: 'onDateChange'
											},
											editable: false
										},
									]
								},
								{
									hidden: true,
									reference: 'ctlVslStatusCombo',
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('mptsStatusNm'),
									queryMode: 'local',
									bind: {
										store: '{vesselScheduleInternalVslStatusSearchCombo}',
										value: '{theSearch.vslStatus}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: '',
									editable: false,
									allowBlank: true
								},
								{
									hidden: true,
									reference: 'ctlSchStatusCombo',
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('schStatus'),
									queryMode: 'local',
									bind: {
										store: '{vesselScheduleInternalSchStatusSearchCombo}',
										value: '{theSearch.schStatus}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: '',
									editable: false,
									allowBlank: true
								}
							]
						},
						//Col 2
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								margin: '0 0 5 5',
								labelWidth: 100
							},
							items: [

								{
									reference: 'ctlPlanCombo',
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('plan'),
									queryMode: 'local',
									bind: {
										store: '{vesselScheduleInternalPlanSearchCombo}',
										value: '{theSearch.planned}'
									},
									displayField: 'comName',
									valueField: 'comCode',
									value: '',
									editable: false,
									allowBlank: true
								},
								{
									reference: 'ctlVslTypeCombo',
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('vslType'),
									queryMode: 'local',
									bind: {
										store: '{vesselScheduleInternalVslTypeSearchCombo}',
										value: '{theSearch.vslTp}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: '',
									editable: false,
									allowBlank: true
								},
								{
									xtype: 'container',
									margin: '0 0 0 5',
									layout: {
										type: 'hbox',
										align: 'stretch', 
									},
									defaults: {
										labelAlign: 'right', 
										labelWidth: 80, 
										flex: 1
									},
									items: [
										{
											xtype: 'checkboxfield',
											flex: 1.5,
											boxLabel: ViewUtil.getLabel('doubleBanking'),
											value: 'false',
											reference: 'ctlDoubleBanking',
											bind: {
												value: '{theSearch.dbYn}',
											}
										}, {
											xtype: 'checkboxfield',
											margin: '0 0 0 5',
											boxLabel: ViewUtil.getLabel('atd'),
											value: 'false',
											reference: 'ctlAtd',
											bind: {
												value: '{theSearch.atdYn}',
											}
										}, {
											xtype: 'checkboxfield',
											margin: '0 0 0 5',
											boxLabel: ViewUtil.getLabel('allBerth'),
											value: 'false',
											reference: 'ctlAllBerth'
										}, 
										{
											xtype: 'button',
											width: 80,
											text: ViewUtil.getLabel('legend'),
											margin: '0 0 0 5',
											listeners: {
												click: 'openLegendPopup'
											}
										}
									]
								}
							]
						},
						//Col 3
						{
							xtype: 'container',
							flex: 1,
							padding: '31 0 0 0',
							layout: {
								type: 'vbox',
								// align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								margin: '0 5 0 0',
								labelWidth: 100
							},
							items: [
								{
									reference: 'ctlCargoTypeCombo',
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('cargoType'),
									queryMode: 'local',
									bind: {
										store: '{vesselScheduleInternalCargoTypeSearchCombo}',
										value: '{theSearch.cgTpCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									value: '',
									editable: false,
									allowBlank: true
								},
							]
						},
						{
							xtype: 'container',
							flex: 1
						}
					]
				}]
			}]
		});
		me.callParent();
	}
});