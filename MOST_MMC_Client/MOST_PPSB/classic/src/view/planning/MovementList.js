Ext.define('MOST.view.planning.MovementList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-movementlist',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.planning.berth.BerthApprovalModel',
		'MOST.view.planning.berth.BerthApprovalController'
	],

	controller: 'movementlist',
	
	viewModel: {
		type: 'movementlist'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'movementgrid',
	 MAIN_STORE_NAME: 'movementList',
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
				flex : 1,
				margin: '0 5 0 0',
				stateful : true,
				stateId : 'stateareBerthApprovallistGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		listeners: {
					pagingSearch: 'onSearch'
				},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},			
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('MovementList')
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
					iconCls: 'x-fa fa-plus'
				},{
					xtype: 'button',
					itemId: 'btnDelete',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus'
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
				}]
	    	},{
				xtype:'container',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items : [
					{
						xtype: 'fieldset',
						flex: 1,
						margin: '5 5 5 0',
						padding: '10 10 10 10',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						items: [
							{
								xtype: 'container',
								flex: 1,
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								defaults: {
									labelAlign: 'right',
									margin: '0 0 0 5',
									editable: false
								},
								items: [
									{
										xtype: 'shipcallnofield',
										reference: 'ctlScn',
										flex: 1,
										labelWidth: 70,
										emptyText: ViewUtil.getLabel('shipCallNo'),
										fieldLabel: ViewUtil.getLabel('shipCallNo'),
										bind: {
											value: '{theSearch.scn}',
										},
									},
									{
										xtype: 'combobox',
										reference: 'ctlCatgCd',
										fieldLabel: ViewUtil.getLabel('catgCd'),
										queryMode: 'local',
										labelWidth: 60,
										flex: 1,
										bind: {
											store: '{categoryCombo}',
											value: '{theSearch.opeClassCd}'
										},
										value: '',
										displayField: 'scdNm',
										valueField: 'scd'
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
												xtype: 'textfield',
												reference: 'ctlShpgAgent',
												fieldLabel: ViewUtil.getLabel('shpgAgent'),
												labelAlign: 'right',
												editable: true,
												listeners: {
													change: function () {
														var me = this;
														me.setValue(this.getValue().toUpperCase());
													}
												},
												bind: {
													value: '{theSearch.shpgAgent}'
												},
												labelWidth: 60,
												flex: 1,
											}, 
											{
												xtype: 'button',
												margin: '0 0 0 5',
												iconCls: 'x-fa fa-search',
												listeners: {
													click: 'openShpgAgentPopup'
												}
											}, 
										]
									}, 
									{
										xtype: 'combobox',
										reference: 'ctlMvType',
										queryMode: 'local',
										bind: {
											store: '{mvTypeStatus}',
											value: '{theSearch.mvTpCd}'
										},
										displayField: 'scdNm',
										valueField: 'scd',
										value: '',
										emptyText: 'ALL',
										fieldLabel: ViewUtil.getLabel('mvType'),
										labelWidth: 60,
										flex: 1,
									}, 
									/*{
										xtype: 'container',
										flex: 1.5
									}*/
								]
							}, 
							{
								xtype: 'container',
								flex: 1,
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								defaults: {
									labelAlign: 'right',
									margin: '5 0 0 5',
									editable: false
								},
								items: [
									{
										xtype: 'vesselcalllistfield',
										labelWidth: 70,
										flex: 1,
										fieldLabel: ViewUtil.getLabel('vessel'),
										reference: 'ctlJpvc',
										emptyText: ViewUtil.getLabel('vessel'),
										bind: {
											value: '{theSearch.vslCallId}'
										}
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
												xtype: 'datefield',
												reference: 'ctlFromDt',
												flex: 1,
												fieldLabel: ViewUtil.getLabel('mvDate'),
												labelWidth: 60,
												labelAlign: 'right',
												format: MOST.config.Locale.getShortDate(),
												listeners: {
													change: 'onDateChange'
												},
											}, {
												xtype: 'datefield',
												reference: 'ctlToDt',
												margin: '0 0 0 5',
												flex: 0.65,
												fieldLabel: '',
												format: MOST.config.Locale.getShortDate(),
												listeners: {
													change: 'onDateChange'
												}
											},
										]
									},
									{
										xtype: 'combobox',
										reference: 'ctlWhCombo',
										queryMode: 'local',
										bind: {
											store: '{whCombo}',
											value: '{theSearch.toLocId}'
										},
										displayField: 'locNm',
										valueField: 'locId',
										emptyText: 'ALL',
										value: '',
										fieldLabel: ViewUtil.getLabel('wh_to'),
										labelWidth: 60,
										flex: 1,
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
			}]
		});
		
		me.callParent();
	}
});

