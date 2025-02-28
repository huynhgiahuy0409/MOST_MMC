Ext.define('MOST.view.vessel.VesselBaplieForGC', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselbaplie',
	
	requires: [
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'vesselbaplieforgc',
	
	viewModel: {
		type: 'vesselbaplieforgc'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselBaplieGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'vesselBaplieStore',			// Main Store Name
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
		
		Ext.apply(me,{
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
					listeners : {
						celldblclick: 'onDblClick',
						pagingSearch:'onSearch'
					},
					columns: {
						defaults: {
							style : 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('VesselBaplieForGC')
					}
				}
			],
				
			dockedItems:[
				{//Toolbar buttons:
					xtype : 'container',
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
							itemId: 'inquiryItemId',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button', 
		 					reference:'refBtnRetrieve',
							listeners: {
								click: 'onSearch'
							}
						},{
							xtype: 'button',
							text:  ViewUtil.getLabel('add'),
							itemId:'createItemId',
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							reference:'refBtnCreate',
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
							},
						},{
							xtype : 'button',
							itemId : 'downloadItemId',
							text : ViewUtil.getLabel('export'),
							cls : 'excel-button',
							reference : 'refBtnDownload',
							iconCls : 'fa fa-file-excel-o',
							hidden : true
						},{
							xtype: 'button',
							itemId: 'exportToExcelButton',
							text: ViewUtil.getLabel('exportToExcel'),
							iconCls: 'excel-button-image', 
							cls: 'excel-button'
						},{
							xtype: 'button',
							itemId: 'exportToPdfButton',
							text: ViewUtil.getLabel('exportToPdf'),
							iconCls: 'x-fa fa-file-pdf-o',
							cls: 'excel-button'
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
				},{// Toolbar SearchCondition and VesselInfo:
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'fieldset',
							autoScroll: true,
							collapsible:true,
							margin: '5 5 5 5',
							flex:1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults:{
								margin: '0 0 5 0'
							},
							items:[
								{// Left: Search Condition
									xtype: 'searchfieldset',
									title: ViewUtil.getLabel('search'),
									layout: {
										type: 'vbox'
									},
									items: [
										{
											xtype: 'container',
											layout: { type: 'hbox'},
											defaults:{
												margin: '5 5 5 5',
												labelAlign: 'right'
											},
											items: [
												{
													xtype:'vesselcalllistfield',
													reference:'ctlJpvc',
													fieldLabel: ViewUtil.getLabel('vslcallid'),
													labelWidth: 85,
													width:250,
													flex: 1,
													bind:{value: '{theSearch.vslCallId}'}
												}
											]
										}
									]
								},{//Right: VesselInfo:
									xtype: 'fieldset',
									title: ViewUtil.getLabel('vslInfo'),
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									flex: 1,
									margin: '0 0 5 5',
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults:{
												margin: '5 5 0 0',
												labelAlign: 'right'
											},
											items: [
												{
													xtype: 'textfield',
													width: 250,
													editable: false,
													fieldLabel:  ViewUtil.getLabel('vesselCode'),
													bind: '{theJpvc.vslCd}',
													labelWidth: 90,
												},{
													xtype: 'textfield',
													width: 220,
													editable: false,
													fieldLabel: ViewUtil.getLabel('arrvSaId'),
													bind: '{theJpvc.arrvSaId}',
													labelWidth: 50,
													hasFocus: false,
												},{
													xtype: 'textfield',
													width: 250,
													editable: false,
													fieldLabel: ViewUtil.getLabel('berthingLoc'),
													bind: '{theJpvc.berthLoc}',
													labelWidth: 80,
												}
											]
										},{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults:{
												margin: '5 5 0 0',
												labelAlign: 'right'
											},
											items: [
												{
													xtype: 'textfield',
													width: 250,
													editable: false,
													fieldLabel: ViewUtil.getLabel('vesselName'),
													bind: '{theJpvc.vslNm}',
													labelWidth: 90
												},{
													xtype:'datefield',
													editable: false,
													readOnly:true,
													width: 220,
													fieldLabel: ViewUtil.getLabel('eta'),
													bind: '{theJpvc.eta}',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													labelWidth: 50
												},{
													xtype:'datefield',
													editable: false,
													readOnly:true,
													width: 250,
													fieldLabel: ViewUtil.getLabel('etd'),
													bind: '{theJpvc.etd}',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													labelWidth: 80
												}
											]
										},{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults:{
												margin: '5 5 5 0',
												labelAlign: 'right'
											},
											items: [
												{
													xtype: 'textfield',
													editable: false,
													width: 250,
													fieldLabel: ViewUtil.getLabel('voyage'),
													bind: '{theJpvc.voyage}',
													labelWidth: 90
												}
											]
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