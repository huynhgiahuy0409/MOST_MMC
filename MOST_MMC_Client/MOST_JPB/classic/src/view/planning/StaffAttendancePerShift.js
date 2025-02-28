Ext.define('MOST.view.planning.StaffAttendancePerShift', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-staffattendancepershift',

	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.planning.StaffAttendancePerShiftModel',
		'MOST.view.planning.StaffAttendancePerShiftController',
	],

	detailViewAlias: 'app-staffandequipmentdetail',

	controller: 'staffattendancepershift',

	viewModel: {
		type: 'staffattendancepershift'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	config: {
		recvData: null
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					margin: '0 5 5 0',
					padding: '10 10 10 10',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'radiogroup',
							reference: 'ctlRadioStaffPerShift',
							layout: {
								type: 'vbox',
							},
							defaults: {
								margin: '0 0 0 0',
								padding: '0 0 0 0'
							},
							items: [
								{
									xtype: 'radiofield',
									reference: 'rdDate',
									name: 'staff_radio_pershift',
									inputValue: 'DATE',
									checked: true,
									boxLabel: ViewUtil.getLabel('saDate'),
									listeners: {
										change: 'onChecked'
									}
								}, {
									xtype: 'radiofield',
									reference: 'rdStaff',
									margin: '5 0 0 0',
									name: 'staff_radio_pershift',
									inputValue: 'STAFF',
									boxLabel: ViewUtil.getLabel('saStaff'),
									listeners: {
										change: 'onChecked'
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
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelWidth: 35,
										labelAlign: 'right',
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('date') + ':',
											style: 'text-align:right',
											width: 35,
											margin: '5 5 0 0'
										},
										{
											xtype: 'datefield',
											reference: 'ctrDate',
											flex: 1,
											format: MOST.config.Locale.getShortDate(),
											labelAlign: 'right',
											editable: false,
											listeners: {
											}
										},
										{
											xtype: 'combobox',
											reference: 'cboShift',
											flex: 1,
											margin: '0 0 0 5',
											fieldLabel: ViewUtil.getLabel('saShift'),
											bind: {
												store: '{shiftCombo}'
											},
											displayField: 'shftNm',
											valueField: 'shftId',
											matchFieldWidth: true,
											queryMode: 'local',
											editable: false,
											emptyText: 'Select'
										},
									]
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											text: ViewUtil.getLabel('date') + ':',
											style: 'text-align:right',
											width: 35,
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
											format: MOST.config.Locale.getShortDate(),
											flex: 1,
											margin: '0 0 0 5',
											editable: false,
											listeners: {
												change: 'onDateChange'
											}
										},
									]
								},
							]
						},
						{
							xtype: 'container',
							flex: 1,
							margin: '0 0 0 0',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelWidth: 80,
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
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
												select: 'onChangeSelect',
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
									margin: '5 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
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
											editable: true,
											maxLength: 9,
											maskRe: /[0-9.]/
										},
										{
											xtype: 'textfield',
											reference: 'refStaffName',
											margin: '0 0 0 5',
											fieldLabel: '',
											flex: 2,
											editable: true
										}
									]
								},

							]
						},
						{
							xtype: 'container',
							margin: '0 0 0 5',
							flex: 1.5,
							layout: {
								type: 'hbox',
							},
							items: [
								{
									xtype: 'button',
									reference: 'refBtnReset',
									text: ViewUtil.getLabel('saReset'),
									iconCls: 'x-fa fa-refresh',
									listeners: {
										click: 'onReset'
									}
								},
							]
						}
					]
				},

				{
					xtype: 'tsb-datagrid',
					reference: 'refStaffAttendancePerShiftGrid',
					flex: 1,
					usePagingToolbar: false,
					stateful: true,
					stateId: 'StaffAttendancePerShiftGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{staffAttendancePerShiftStore}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						cellDblClick: 'onDblClickOnPerShift'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('StaffAttendancePerShift')
					}
				}
			],

			dockedItems: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					flex: 1,
					margin: '5 5 5 0',
					items: [
						{
							xtype: 'button',
							itemId: 'inquiryItemId',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							reference: 'refBtnRetrieve',
							listeners: {
								click: 'onBtnSearchClick'
							}
						},
						{
							ui: 'default-toolbar',
							xtype: 'button',
							margin: '0 0 0 5',
							cls: 'dock-tab-btn',
							text: 'Export to ...',
							menu: {
								defaults: {
									handler: 'exportTo'
								},
								items: [{
									text: 'Excel xlsx',
									cfg: {
										type: 'excel07',
										ext: 'xlsx'
									}
								}, {
									text: 'Excel xlsx (include groups)',
									cfg: {
										type: 'excel07',
										ext: 'xlsx',
										includeGroups: true,
										includeSummary: true
									}
								}, {
									text: 'Excel xml',
									cfg: {
										type: 'excel03',
										ext: 'xml'
									}
								}, {
									text: 'Excel xml (include groups)',
									cfg: {
										includeGroups: true,
										includeSummary: true
									}
								}, {
									text: 'CSV',
									cfg: {
										type: 'csv'
									}
								}, {
									text: 'TSV',
									cfg: {
										type: 'tsv',
										ext: 'csv'
									}
								}, {
									text: 'HTML',
									cfg: {
										type: 'html'
									}
								}, {
									text: 'HTML (include groups)',
									cfg: {
										type: 'html',
										includeGroups: true,
										includeSummary: true
									}
								}]
							}
						}
					]
				}
			]
		});

		me.callParent();
	}
});