Ext.define('MOST.view.planning.WarehouseHistory', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-warehousehistory',
	
	requires: [
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refWHHistory',
	MAIN_STORE_NAME: 'whHistoryList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	controller: 'warehousehistory',
	
	viewModel: {
		type: 'warehousehistory'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	DATEFORMAT : 'd/m/Y',
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function(){
		var me = this;
		Ext.apply(me, {
			items: [{
                xtype: 'tsb-datagrid',
                flex: 1,
                reference: me.MAIN_GRID_REF_NAME,
                stateful: true,
                stateId: 'stateWHHistoryGrid', 
                plugins: [
                    'gridexporter',
                    'gridfilters',
                    'clipboard'
                ],
                selModel: {
    				type: 'spreadsheet',
    				cellSelect: false          				
                },
                bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
                columns:{
                    defaults: {
                        style : 'text-align:center',
                        align : 'center'
                    },
                    items: GridUtil.getGridColumns('WarehouseHistory')
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
					reference:'refBtnRefresh',
					text: ViewUtil.getLabel('refresh'),
					iconCls: 'x-fa fa-refresh',
					listeners: {
						click: 'onRefresh'
					}
				},
				{
					xtype: 'button',
					itemId: 'btnAdd',
					reference:'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus'
				},
				{
					xtype: 'button',
					itemId: 'btnDelete',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus'
				},
				{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button'
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button'
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
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					padding: '5',
					flex:1,
					layout: {
						type: 'vbox',
						align: 'stretch'
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
						items: [{
							xtype:'fieldset', 
							width: 230,
							padding: '5',
							layout:{
								type: 'vbox',
							},
							defaults: {
								margin: '0 0 5 0',
								labelWidth: 50,
								width: 210
							},
							items: [{
								xtype: 'combobox',
								reference: 'cboCategory',
								fieldLabel: ViewUtil.getLabel('category'),
								bind: {
									store: '{categoryCombo}'
								},
								listeners:{
									select:'onSelectCategory'
								},
								displayField: 'scdNm',
								valueField: 'scd',
								queryMode:'local',
								emptyText:'Select',
								labelAlign: 'right',
								forceSelection : true
							},{
								xtype: 'combobox',
								reference: 'cboCgCond',
								fieldLabel: ViewUtil.getLabel('whHistoryCGCond'),
								bind: {
									store: '{cgcondCombo}',
									value: '{theSearch.cgCoCd}'
								},
								displayField: 'scdNm',
								valueField: 'scd',
								queryMode:'local',
								emptyText:'Select',
								labelAlign: 'right',
								forceSelection : true
							}]
						},{
							xtype: 'fieldset',
							flex: 8,
							margin: '0 0 0 5',
							layout:{
								type: 'vbox',
								align: 'stretch',
								
							},
							items: [{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								margin: '0 0 5 0',
								defaults:{
									margin: '0 5 0 0',
									labelAlign: 'right',
									labelWidth: 50,
									width: 200
								},
								items: [{
									xtype: 'textfield',
									reference:'txtJpvc',
									margin: '0 5 0 0',
									fieldLabel: ViewUtil.getLabel('vessel'),
									labelAlign: 'right',
									emptyText: ViewUtil.getLabel('vessel'),
									triggers: {
										jpvcTrigger: {
											cls: 'fa-search',
											text:'search',
											scope:'controller',
											handler: 'onTxtJpvcTriggerClick'
										}
									},
									listeners: {
										change: function(){
											var me = this;
											this.setValue(this.getValue().toUpperCase());
										},
										blur: 'onFieldFocusleave'
									},
									bind: {
										value: '{theSearch.vslCallId}'
									}
								},{
									xtype: 'combobox',
									margin: '0 5 0 0',
									reference:'fieldSNtxt',
									fieldLabel: ViewUtil.getLabel('shipgNoteNo'),
									bind: {
										store: '{snListCombo}',
										value: '{theSearch.snNo}'
									},
									displayField: 'scdNm',
									valueField: 'shipgNoteNo',
									fieldStyle : 'text-transform: uppercase',
									editable: true,
									queryMode:'local',
									listeners:{
										select: 'onSelectSnCombo'
									}
								}]
							},{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								margin: '0 0 5 0',
								defaults:{
									margin: '0 5 0 0',
									labelAlign: 'right',
									labelWidth: 50,
									width: 200
								},
								items: [{
									xtype: 'combobox',
									margin: '0 5 0 0',  
									reference:'fieldMasterBLtxt',
									fieldLabel: ViewUtil.getLabel('masterBLNo'),
									bind: {
										store: '{masterBlCombo}',
										value: '{theSearch.mfDocId}'
									},
									displayField: 'scdNm',
									valueField: 'mfDocId',
									queryMode: 'local',
									fieldStyle : 'text-transform: uppercase',
									editable: true,
									emptyText: 'Select',
									listeners:{
										select: 'onSelectMasterBl'
									}
								},{
									xtype: 'combobox',
									margin: '0 5 0 0',                                                       
									fieldLabel: ViewUtil.getLabel('cgNo'),
									displayField: 'cdNm',
									valueField: 'cd',
									bind: {
										store: '{grListCombo}',
										value: '{theSearch.grNo}'
									},
									reference:'fieldGRtxt',
									fieldStyle : 'text-transform: uppercase',
									editable: true,
									queryMode: 'local'
								}]
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								margin: '0 0 5 0',
								defaults:{
									margin: '0 5 0 0',
									labelAlign: 'right',
									labelWidth: 50,
									width: 200
								},
								items: [{
									xtype: 'combobox',
									margin: '0 5 0 0',  
									reference:'fieldBLtxt',
									fieldLabel: ViewUtil.getLabel('bl'),
									bind: {
										store: '{blListCombo}',
										value: '{theSearch.blNo}'
									},
									displayField: 'scdNm',
									valueField: 'blNo',
									queryMode: 'local',
									fieldStyle : 'text-transform: uppercase',
									editable: true,
									emptyText: 'Select'
								}]
							},{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								margin: '0 0 5 0',
								defaults:{
									margin: '0 5 0 0',
									labelAlign: 'right',
									labelWidth: 50,
									width: 200
								},
								items: [{
									xtype: 'datefield',
									format: me.DATEFORMAT,
									reference:'fromDt',
									margin: '0 5 0 0',                                                       
									fieldLabel: ViewUtil.getLabel('whHistoryFromTime'),
									disabled: true,
									listeners: {
										blur: 'onDateChange'
									},
									editable: true
								},
								{
									xtype: 'datefield',
									format: me.DATEFORMAT,
									reference:'toDt',
									margin: '0 5 0 0',                                                       
									fieldLabel: ViewUtil.getLabel('whHistoryToTime'),
									disabled:true,
									listeners: {
										blur: 'onDateChange'
									},
									editable: true
								}]
							},{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								margin: '0 0 5 0',
								defaults:{
									margin: '0 5 0 0',
									labelAlign: 'right',
									labelWidth: 50,
									width: 200
								},
								items: []
							}]
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});
