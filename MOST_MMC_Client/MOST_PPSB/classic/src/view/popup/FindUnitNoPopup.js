Ext.define('MOST.view.popup.FindUnitNoPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-findunitnopopup',
	requires: [
		'MOST.view.popup.FindUnitNoPopupModel',
		'MOST.view.popup.FindUnitNoPopupController',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoPopupGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'cargoItems',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	title: "Find Unit No",
	width: 660,
	height: 440,

	controller: 'findunitnopopup',

	viewModel: {
		type: 'findunitnopopup'
	},

	listeners:{
		afterrender: 'onUnitPopupLoad'
	},



	layout: { type: 'hbox', align: 'stretch' },
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,

					items: [
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							margin: '0 0 0 0',
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '3 0 0 0'
							},
							// height : 450,
							flex: 1,
							items: [
								{
									xtype: 'tsb-datagrid',
									reference: me.MAIN_GRID_REF_NAME,
									flex: 1,
									usePagingToolbar: false,
									margin: '5 5 5 5',
									scrollable: true,
									stateful: true,
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
										cellclick: 'onCellClick',
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center'
										},
										items: GridUtil.getGridColumns('CargoPopupItems')
									}
								}
							]
						},
						{
							xtype: 'container',
							margin: '0 0 0 5',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '3 0 0 0'
							},
							// height : 450,
							listeners: {
								pagingSearch: 'onSearch'
							},
							flex: 1,
							items: [

								{
									xtype: 'tsb-datagrid',
									reference: 'refUnitItems',
									flex: 1,
									usePagingToolbar: false,
									margin: '5 5 5 5',
									// stateful : true,
									bind: {
										store: '{unitItems}'
									},
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									selModel: {
										type: 'spreadsheet',
										cellSelect: false
									},
									listeners: {
										celldblclick: 'onDblClick',
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center'
										},
										items: GridUtil.getGridColumns('UnitPopupItems')
									}
								}
							]
						}
					]
				}],
			dockedItems: [
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [{
						xtype: 'container',
						autoScroll: true,
						collapsible: true,
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							margin: '0 0 5 0'
						},
						flex: 1,
						items: [
							{
								xtype: 'container',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelAlign: 'right',
									labelWidth: 80,
									margin: '5 5 5 0'
								},
								items: [
									{
										xtype: 'radiogroup',
										layout: 'hbox',
										reference: 'ctlTypeOfTransport',
										items: [
											{
												xtype: 'radiofield',
												width: 95,
												boxLabel: ViewUtil.getLabel('import'),
												reference: 'refRadioImport',
												name: 'tspt_radio',
												margin: '0 5 0 0',
												inputValue: 'Import',
												checked: true,
												listeners: {
													//change: 'onChangeDriverTruck'
												}
											},
											{
												xtype: 'radiofield',
												width: 95,
												boxLabel: ViewUtil.getLabel('export'),
												reference: 'refRadioExport',
												name: 'tspt_radio',
												margin: '0 5 0 5',
												inputValue: 'Export',
												checked: false,
												listeners: {
													//change: 'onChangeDriverTruck'
												}
											},



										]
									},
									{
										xtype: 'button',
										itemId: 'inquiryItemId',
										text: ViewUtil.getLabel('search'),
										iconCls: 'x-fa fa-search',
										cls: 'search-button',
										reference: 'refBtnRetrieve',
										listeners: {
											click: 'onSearch'
										}
									},
								]
							}
						]
					}],
				}]

		});
		me.callParent();
	}
});

