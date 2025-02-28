Ext.define('MOST.view.planning.StaffAttendance', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-staffattendance',

	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.planning.StaffAttendanceModel',
		'MOST.view.planning.StaffAttendanceController'
	],

	controller: 'staffattendance',

	detailViewAlias: 'app-staffattendancedetail',

	viewModel: {
		type: 'staffattendance'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					margin: '5 5 5 0',
					padding: '10 10 10 10',
					layout: {
						type: 'hbox',
					},
					defaults: {
						labelAlign: 'right'
					},
					items: [
						{
							xtype: 'radiogroup',
							reference: 'ctlRadioStaff',
							layout: {
								type: 'vbox',
							},
							defaults: {
								margin: '0 0 0 0',
								padding: '0 0 0 0'
							},
							items: [
								{
									name: 'staff_radio',
									reference: 'rdDate',
									inputValue: 'DATE',
									checked: true,
								},
								{
									name: 'staff_radio',
									reference: 'rdStaff',
									margin: '5 0 0 0',
									inputValue: 'STAFF',
									listeners: {
									}
								},
								{
									name: 'staff_radio',
									margin: '5 0 0 0',
									reference: 'rdLeaveStaff',
									inputValue: 'LEAVESTAFF',
									listeners: {
									}
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
								labelWidth: 75,
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 75,
										flex: 1
									},
									items: [
										{
											xtype: 'datefield',
											reference: 'ctrDate',
											fieldLabel: ViewUtil.getLabel('saDate'),
											format: MOST.config.Locale.getShortDate(),
											editable: false,
											listeners: {
												select: 'onRefreshStaffNo'
											}
										},
										{
											xtype: 'combobox',
											reference: 'cboShift',
											fieldLabel: ViewUtil.getLabel('saShift'),
											bind: {
												store: '{shiftCombo}'
											},
											displayField: 'shftNm',
											valueField: 'shftId',
											matchFieldWidth: true,
											queryMode: 'local',
											editable: false,
										}
									]
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('saStaff') + ':',
											style: 'text-align:right',
											width: 75,
											margin: '5 5 0 0'
										},
										{
											xtype: 'datefield',
											reference: 'refdtFrom',
											flex: 1,
											format: MOST.config.Locale.getShortDate(),
											editable: false,
											listeners: {
												change: 'onDateChange'
											}
										},
										{
											xtype: 'datefield',
											reference: 'refdtTo',
											flex: 1,
											margin: '0 0 0 5',
											format: MOST.config.Locale.getShortDate(),
											editable: false,
											listeners: {
												change: 'onDateChange'
											}
										}
									]
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('saLeaveStaff') + ':',
											style: 'text-align:right',
											width: 75,
											margin: '5 5 0 0'
										},
										{
											xtype: 'datefield',
											reference: 'refLeaveStaffdtFrom',
											flex: 1,
											format: MOST.config.Locale.getShortDate(),
											editable: false,
											listeners: {
												change: 'onDateChange'
											}
										},
										{
											xtype: 'datefield',
											reference: 'refLeaveStaffdtTo',
											flex: 1,
											margin: '0 0 0 5',
											format: MOST.config.Locale.getShortDate(),
											editable: false,
											listeners: {
												change: 'onDateChange'
											}
										}
									]
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
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('saCostCenter') + ':',
											style: 'text-align:right',
											width: 75,
											margin: '5 5 0 0'
										},
										{
											xtype: 'combobox',
											reference: 'cboCostCenter',
											flex: 2,
											bind: {
												store: '{costCenterCombo}'
											},
											displayField: 'codeDescription',
											valueField: 'codeCostCenter',
											listeners: {
												select: 'onChangeSelect'
											},
											queryMode: 'local',
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'refCostCenterCd',
											flex: 1,
											margin: '0 0 0 5',
											fieldLabel: '',
											editable: false
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									margin: '5 0 0 0',
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('saStaffNo') + ':',
											style: 'text-align:right',
											width: 75,
											margin: '5 5 0 0'
										},
										{
											xtype: 'textfield',
											reference: 'refStaffNo',
											flex: 1,
											value: '',
											editable: true,
											maxLength: 9,
											maskRe: /[0-9.]/
										},
										{
											xtype: 'textfield',
											reference: 'refStaffName',
											margin: '0 0 0 5',
											flex: 2,
											fieldLabel: '',
											editable: true
										}
									]

								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch',
										pack: 'end'
									},
									items: [
										{
											xtype: 'button',
											text: ViewUtil.getLabel('saReset'),
											listeners: {
												click: 'onReset'
											},
											ui: 'create-button',
											width: 100,
										}
									]
								}
							]

						},
						{
							xtype: 'container',
							flex: 1,
						}
					]
				},
				{
					xtype: 'tsb-datagrid',
					reference: 'refStaffAttendanceGrid',
					usePagingToolbar: false,
					flex: 1,
					stateful: true,
					stateId: 'StaffAttendanceGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{staffAttendanceStore}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						rowclick: 'onRowClick',
						rowdblclick: 'onRowDbClick'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('StaffAttendance')
					}
				}
			],
			dockedItems: [
				{
					xtype: 'container',
					margin: '5 0 0 0',
					layout: {
						type: 'hbox',
						align: 'right',
						pack: 'end'
					},
					defaults: {
						margin: '0 5 0 0'
					},
					items: [
						{
							xtype: 'button',
							text: ViewUtil.getLabel('search'),
							itemId: 'inquiryItemId',
							reference: 'refBtnRetrieve',
							cls: 'search-button',
							iconCls: 'x-fa fa-search',
							listeners: {
								click: 'onSearch'
							}
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('save'),
							reference: 'refBtnSave',
							itemId: 'saveItemId',
							ui: 'create-button',
							iconCls: 'fa fa-floppy-o',
							listeners: {
								click: 'onSave'
							},
							hidden: true
						},
						{
							xtype: 'button',
							cls: 'preview-button',
							reference: 'refBtnPreview',
							text: ViewUtil.getLabel('preview'),
							itemId: 'previewItemId',
							iconCls: 'fa fa-file-pdf-o',
							listeners: {
								click: 'onPreviewPDF'
							},
						},
						{
							xtype: 'button',
							itemId: 'downloadItemId',
							cls: 'downloadpdf-button',
							iconCls: 'fa fa-file-excel-o',
							reference: 'exprtPDFButton',
							text: ViewUtil.getLabel('download'),
							name: 'detailDownload',
							listeners: {
								click: 'onDownloadPDF'
							},
						}
					]
				}
			]
		});

		me.callParent();
	}
});