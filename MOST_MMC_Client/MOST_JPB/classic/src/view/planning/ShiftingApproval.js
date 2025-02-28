Ext.define('MOST.view.planning.ShiftingApproval', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-shiftingapproval',
	requires: [
		'MOST.view.planning.ShiftingApprovalModel',
		'MOST.view.planning.ShiftingApprovalController',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'shiftingapproval',

	viewModel: {
		type: 'shiftingapproval'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refShiftingApprovalGrid',
	MAIN_STORE_NAME: 'shiftingAprrovalStore',
	REPORT_TYPE_PDF: 'PDF',
	REPORT_TYPE_EXCEL: 'EXCEL',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;


		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '5 5 4 0',
					stateful: true,
					usePagingToolbar: false,
					stateId: 'stateInvoiceAdviceGrid',
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
							align: 'center',
						},
						items: GridUtil.getGridColumns('ShiftingAprroval')
					}
				},
				{
					xtype: 'fieldset',
					felx: 1,
					layout: {
						type: 'vbox'
					},
					margin: '0 5 5 0',
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'vbox'

									},
									defaults: {
										labelAlign: 'right',
										margin: '5 10 0 0',
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtVslCallId',
											fieldLabel: ViewUtil.getLabel('sftJPVC'),
											width: 300,
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'txtATB',
											fieldLabel: ViewUtil.getLabel('sftATB'),
											width: 300,
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'txtSa',
											fieldLabel: ViewUtil.getLabel('s_a'),
											width: 300,
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'txtFromLoc',
											fieldLabel: ViewUtil.getLabel('sftFrmLoc'),
											width: 300,
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'txtToLoc',
											fieldLabel: ViewUtil.getLabel('sftToLoc'),
											width: 300,
											editable: false,
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									margin: '0 0 0 0',
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0',
									},
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 120
											},
											items: [
												{
													reference: 'ctlPositionCombo',
													xtype: 'combo',
													width: 300,
													fieldLabel: ViewUtil.getLabel('sftPos'),
													queryMode: 'local',
													bind: {
														store: '{positionStore}'
													},
													displayField: 'scdNm',
													valueField: 'scd',
													emptyText: 'Select status',
													editable: false,
													disabled: true,

												},
												{
													xtype: 'textfield',
													margin: '0 0 0 5',
													reference: 'ctrlSftDTNo',
													fieldLabel: ViewUtil.getLabel('sftDateTime'),
													width: 300,
													editable: false,
												}
											]
										},
										{
											reference: 'ctlReasonCombo',
											xtype: 'combo',
											labelWidth: 120,
											width: 300,
											fieldLabel: ViewUtil.getLabel('reason'),
											queryMode: 'local',
											bind: {
												store: '{reasonStore}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select status',
											editable: false,
											disabled: true,
										},
										{
											xtype: 'textareafield',
											reference: 'txtRmk',
											grow: true,
											margin: '5 0 0 20',
											fieldLabel: ViewUtil.getLabel('sftrmk'),
											width: 450,
											height: 57,
											disabled: true,
										},
										{
											xtype: 'button',
											text: ViewUtil.getLabel('approval'),
											margin: '5 0 0 500',
											align: 'right',
											pack: 'end',
											reference: 'btnApproval',
											disabled: true,
											listeners: {
												click: 'onApproval'
											},
											style: 'background-color:#0A6B26;'
										}
									]
								}]
						}]
				}],

			dockedItems: [
				{
					xtype: 'container',
					style: { "background-color": "white" },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '5 5 5 0'
					},
					items: [{
						xtype: 'tbfill'
					},
					{
						xtype: 'button',
						itemId: 'inquiryItemId',
						reference: 'refBtnRetrieve',
						text: ViewUtil.getLabel('search'),
						iconCls: 'x-fa fa-search',
						cls: 'search-button',
						listeners: {
							click: 'onSearchBtn'
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
								fn: 'exportToDocument',
								reportType: me.REPORT_TYPE_EXCEL
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
								fn: 'exportToDocument',
								reportType: me.REPORT_TYPE_PDF
							}
						}
					},
					{
						xtype: 'button',
						itemId: 'exportShiftNoticeToExcelButton',
						text: ViewUtil.getLabel('download'),
						iconCls: 'fa fa-download', 
						cls: 'excel-button',
						listeners: {
							click: 'onDownload'
						},
						hidden: true
					},
					{
						xtype: 'button',
						itemId: 'exportShiftNoticeButton',
						text: ViewUtil.getLabel('preview'),
						iconCls: 'x-fa fa-file-pdf-o',
						cls: 'excel-button',
						listeners: {
							click: {
								fn: 'onDownloadExport',
								reportType: me.REPORT_TYPE_PDF
							}
						},
						hidden: true
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

					},
					]
				},
				{
					xtype: 'toolbar',
					enableOverflow: true,
					margin: '0 -3 0 0',
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'searchfieldset',
							autoScroll: true,
							collapsible: false,
							layout: {
								type: 'hbox',
								align: 'stretch',
								pack: 'begin'
							},
							padding: '10 10 10 10',
							width: '100%',
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										editable: false,
									},
									items: [
										{
											xtype: 'shipcallnofield',
											reference: 'ctlScn',
											/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											labelWidth: 100,
											bind: {
												value: '{theSearch.scn}',
											},
										},
										{
											xtype: 'vesselcalllistfield',
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('vslschlJPVCNo'),
											reference: 'refVslCallIdfield'
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											margin: '0 0 0 50',
											items: [
												{
													xtype: 'combo',
													width: 80,
													id: 'idComboATB',
													reference: 'comboATB',
													bind: {
														store: '{ATBCombo}'
													},
													queryMode: 'local',
													displayField: 'scdNm',
													valueField: 'scd',
													margin: '0 5 0 5'
												},
												{
													reference: 'ctlDateFromDt',
													xtype: 'datefield',
													id: 'ctlSADateFromDt',
													fieldLabel: me.lblperiod,
													format: MOST.config.Locale.getShortDate(),
													listeners: {
														change: 'onDateChange'
													},
													editable: false,
													margin: '0 5 0 0'
												},
												{
													reference: 'ctlDateToDt',
													xtype: 'datefield',
													id: 'ctlSADateToDt',
													format: MOST.config.Locale.getShortDate(),
													listeners: {
														change: 'onDateChange'
													},
													editable: false,
												}
											]
										}
									]
								}
							]
						}]
				}
			]
		});

		me.callParent();
	}
});

