Ext.define('MOST.view.billing.CreditNote', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-creditnote',
	requires: [
		'MOST.view.billing.CreditNoteController',
		'MOST.view.billing.CreditNoteModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
	],

	detailViewAlias: 'app-creditnotedetail',
	controller: 'creditnote',
	viewModel: {
		type: 'creditnote',
	},
	listeners: {
		afterrender: 'onLoad',
	},

	/** =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCreditNoteGrid',
	MAIN_STORE_NAME: 'creditNoteStore',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					usePagingToolbar : false,
					flex: 1,
					margin: '0 5 5 0',
					stateId: 'stateCreditNoteGrid',
					plugins: ['gridexporter', 'gridfilters', 'clipboard'],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}',
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
						dragSelect: false,
					},
					listeners: {
						rowdblclick: 'onDBClickGrid',
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('CreditNoteGridList'),
					},
				},
			],
			dockedItems: [
				{
					xtype: 'container',
					style: { 'background-color': 'white' },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '5 5 0 0',
					},
					items: [
						{
							xtype: 'tbfill',
						},
						{
							xtype: 'button',
							reference: 'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							listeners: {
								click: 'onRetreive',
							},
						},
						{
							xtype: 'button',
							cls: 'column-setting-button',
							iconCls: 'x-fa fa-columns',
							text: ViewUtil.getLabel('column'),
							listeners: {
								click: 'onColumnSettingPopup',
								args: [me.MAIN_GRID_REF_NAME],
							},
						},
					],
				},
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible: true,
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							flex: 1,
							margin: '0 5 10 0',
							padding: '0 10 10 10',
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									margin: '0 0 0 0',
									flex: 1,
									items: [
										{
											xtype: 'vesselcalllistfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vslcallid'),
											labelWidth: 145,
											labelAlign: 'right',
											reference: 'refMainVslCallIdfield',
											change: function (field, newValue) {
												field.setValue(newValue.toUpperCase());
											},
											bind: {
												value: '{theSearch.vslCallId}',
											},
										},

										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											items: [
												{
													xtype: 'radiogroup',
													layout: {
														type: 'hbox',
														pack: 'end',
														align: 'center',
													},
													reference: 'ctlRdoGrp',
													bind: '{theSearch.searchType}',
													simpleValue: true,
													width: 150,
													margin: '5 0 0 0',
													defaults: {
														xtype: 'radiofield',
														name: 'ivDateType',
													},
													items: [
														{
															boxLabel: ViewUtil.getLabel('LB_creditNoteInDate'),
															reference: 'refRadioInDate',
															inputValue: 'ivDt',
															margin: '0 10 0 0',
														},
														{
															boxLabel: ViewUtil.getLabel('LB_creditNoteERP'),
															reference: 'refRadioErp',
															inputValue: 'erp',
														},
													],
												},
												{
													xtype: 'datefield',
													reference: 'ctlDateFromDt',
													margin: '5 0 0 0',
													flex: 1,
													format: MOST.config.Locale.getShortDate(),
												},
												{
													xtype: 'datefield',
													reference: 'ctlDateToDt',
													margin: '5 0 0 5',
													flex: 1,
													format: MOST.config.Locale.getShortDate(),
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									flex: 1,
									items: [
										{
											xtype: 'textfield',
											reference: 'refInvoiceNo',
											fieldLabel: ViewUtil.getLabel('LB_creditNoteOrgIvNo'),
											labelWidth: 150,
											labelAlign: 'right',
											width: '100%',
											bind: '{theSearch.ivNo}',
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'start',
										pack: 'end',
									},
									flex: 1.5,
									items: [
										{
											xtype: 'button',
											text: ViewUtil.getLabel('LB_btn_creditNoteCreate'),
											iconCls: 'fa fa-envelope',
											listeners: {
												click: 'onCreateCreditNote',
											},
										},
									],
								},
							],
						},
					],
				},
			],
		});

		me.callParent();
	},
});
