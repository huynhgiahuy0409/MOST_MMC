Ext.define('MOST.view.document.TerminalHoldReleaseControl', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-terminalholdreleasecontrol',
	requires: [
		'MOST.view.document.TerminalHoldReleaseControlModel',
		'MOST.view.document.TerminalHoldReleaseControlController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-terminalholdreleasecontrolhistory',
	closeFunction :'Y',

	controller: 'terminalholdreleasecontrol',
	
	viewModel: {
		type: 'terminalholdreleasecontrol'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	 /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTerminalHoldReleaseControlGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'terminalHoldReleaseControl',			// Main Store Name
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
			items: [
				{
					xtype : 'fieldset',
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
					margin : '5 5 5 0',
					padding: '10 10 10 10',
					items : [
						{
							xtype : 'container',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [
								{
									xtype : 'container',
									layout : {
										type : 'hbox',
										align : 'stretch',
									},
									items: [
										{
											xtype : 'button',
											width : 100,
											margin : '0 5 0 0',
											reference : 'ctlHold',
											text : ViewUtil.getLabel('hold'),
											listeners : {
												click : 'openHoldPopup'
											}
										}
									]
								},{
									xtype : 'container',
									layout : {
										type : 'hbox',
										align : 'stretch',
									},
									items : [
										{
											xtype : 'button',
											hidden: true,
											width : 250,
											margin : '3 5 0 5',
											reference : 'ctlAbandonoLegal',
											disabled: true,
											text : ViewUtil.getLabel('releaseAbandonoLegal'),
											listeners : {
												click : 'onReleaseAbandonoLegal'
											}
										}
									]
								}
							]
						}
					]
				},{//Grid
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					stateful : true,
					stateId : 'stateTerminalHoldReleaseControlGrid',
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
						//celldblclick: 'onDblClick',
						pagingSearch:'onSearch',
						cellclick:'onCellClick'
					},
					columns: {
						defaults: {
							style : 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('TerminalHoldReleaseControl')
					}
                }
            ],
			//Docked:
			dockedItems: [
				{//Docked Button
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
		 					reference:'refBtnRetrieve',
		 					text: ViewUtil.getLabel('search'),
		 					itemId:'inquiryItemId',
							iconCls: 'x-fa fa-search',
							cls: 'search-button', 
		 					listeners: {
		 						click: 'onSearch'
		 					}
						},
						{
							xtype: 'button',
							itemId: 'btnDelete',
							reference:'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
							}
						},
						{
							xtype: 'button',
							reference:'refBtnRefresh',
							text:  ViewUtil.getLabel('refresh'),
							iconCls: 'x-fa fa-refresh',
							listeners: {
								click: 'onRefresh'
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
									fn: 'onExportExcelPdfWithServer',
									args:[me.MAIN_GRID_REF_NAME, false]
								}
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
						},
						{
		 					xtype: 'button',
		 					reference:'refBtnSave',
							text:  ViewUtil.getLabel('save'),
							iconCls: 'x-fa fa-save',
							listeners: {
								click: 'onSave'
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
						}
					]
				},{// Search Condition:
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							flex: 1,
							padding: '0 10 10 10',
							margin: '0 5 0 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items:[
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										width: '100%'
									},
									items:[
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults: {
												labelAlign: 'right',  
												width: '100%'
											},
											items: [
												{
													xtype: 'vesselcalllistfield',
													labelWidth: 100,
													reference: 'ctlVslCallId',
													emptyText: ViewUtil.getLabel('vslcallid'),
													change: function (field, newValue) {
														field.setValue(newValue.toUpperCase());
													},
													bind: { value: '{theSearch.vslCallId}' }
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											margin: '5 0 0 0',
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													reference: 'ctlFromDt',
													xtype: 'datefield',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('createdDate'), 
													labelWidth: 100,
													format: MOST.config.Locale.getShortDate(),
													editable: true
												}, {
													reference: 'ctlToDt',
													xtype: 'datefield',
													flex: 0.55,
													margin: '0 0 0 5',
													format: MOST.config.Locale.getShortDate(),
													editable: true
												}
											]
										}, 
									]
					    		},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '0 0 5 0',
										labelWidth: 100,
										width: '100%'
									},
									items: [
										{
											xtype: 'combo',
											reference: 'ctlMasterBlCombo',
											fieldLabel: ViewUtil.getLabel('masterBlNo'),
											queryMode: 'local',
											bind: {
												store: '{masterBlItems}',
												value: '{theSearch.masterBL}'
											},
											listeners: {
												select: 'onSelectMasterBl',
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											value: '',
											emptyText: 'Select',
											editable: false,
											allowBlank: true
										},
										{
											xtype: 'combo',
											reference: 'ctlBlCombo',
											fieldLabel: ViewUtil.getLabel('blNo'),
											queryMode: 'local',
											bind: {
												store: '{blItems}',
												value: '{theSearch.bl}'
											},
											displayField: 'scdNm',
											valueField: 'blNo',
											value: '',
											emptyText: 'Select',
											editable: false,
											allowBlank: true
										},
										{
											xtype: 'combo',
											reference: 'ctlStatusCombo',
											margin: '0 0 0 0',
											fieldLabel: ViewUtil.getLabel('status'),
											queryMode: 'local',
											bind: {
												store: '{statusCombo}',
												value: '{theSearch.status}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											emptyText: 'Select',
											editable: false,
											allowBlank: true
										}
									]
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right', 
										labelWidth: 100,
										width: '100%'
									},
									items:[
										{
											xtype: 'combo',
											reference: 'ctlBookingNo',
											fieldLabel: ViewUtil.getLabel('bookingNo'),
											queryMode: 'local',
											bind: {
												store: '{bookingNoItems}',
												value: '{theSearch.bookingNo}'
											},
											listeners: {
												select: 'onSelectBookingNo',
											},
											displayField: 'scdNm',
											valueField: 'mfDocId',
											value: '',
											emptyText: 'Select',
											editable: false,
											allowBlank: true
										},
										{
											xtype: 'combo',
											reference: 'ctlSnNo',
											margin: '-5 0 0 0',
											fieldLabel: ViewUtil.getLabel('vorSNNo'),
											queryMode: 'local',
											bind: {
												store: '{snNoItems}',
												value: '{theSearch.snNo}'
											},
											displayField: 'scdNm',
											valueField: 'shipgNoteNo',
											value: '',
											emptyText: 'Select',
											editable: false,
											allowBlank: true
										}
									]
					    		},
								{
									xtype: 'container',
									flex: 1
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