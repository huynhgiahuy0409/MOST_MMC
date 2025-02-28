Ext.define('MOST.view.operation.shiftingdoublebanking.CargoShifting', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-cargoshifting',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],

	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoShiftingGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'cgShftList',
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
			xtype:'container',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items:[
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						flex: 1
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								width: '100%'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('cgShiftingHatch'),
											reference: 'refCboCgShftHatch',
											bind: {
												store: '{hatchListCombo}',
												value: '{theCargoShifting.hatchNo}'
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select',
											forceSelection: true,
											editable: false,
											allowBlank: false,
											flex: 1
										}, {
											xtype: 'combo',
											bind: {
												store: '{apFpListCombo}',
												value: '{theCargoShifting.hatchDrtCd}'
											},
											queryMode: 'local',
											displayField: 'scd',
											valueField: 'scd',
											forceSelection: true,
											flex: 0.6,
											reference: 'refCboCgShftApFp',
											emptyText: 'Select',
											margin: '5 0 0 5',
											listeners: {
												//select: 'onSelectBankingType'
											}
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelAlign: 'right',
										flex: 1
									},
									items: [
										{
											xtype: 'combo',
											bind: {
												store: '{crewListCombo}',
												value: '{theCargoShifting.stcrDiv}'
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection: true,
											editable: false,
											allowBlank: false,
											margin: '5 0 0 105',
											reference: 'refCboCrewList',
											listeners: {
												//select: 'onSelectBankingType'
											}
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										flex: 1,
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('cgShiftingShiftingType'),
											bind: {
												store: '{shftStyleListCombo}',
												value: '{theCargoShifting.sftTp}'
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection: true,
											editable: false,
											allowBlank: false,
											reference: 'refShftTypeCombo',
											listeners: {
												select: 'onSelectCgShftHatchType'
											}
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										flex: 1,
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('cgShiftingNextHatch'),
											bind: {
												store: '{hatchListCombo}',
												value: '{theCargoShifting.nextHatchNo}'
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection: true,
											editable: false,
											allowBlank: false,
											disabled: true,
											reference: 'refCboCgShftNHatch',
											listeners: {
												//select: 'onSelectCgShftHatchType'
											}
										}
									]
								}, {
									xtype: 'container',
									width: '100%',
									layout: {
										type: 'hbox'
									},
									defaults: { 
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('cgShiftingPackageType'),
											labelWidth: 100,
											reference: 'txtPkgTpCd',
											bind: '{theCargoShifting.pkgTpCd}',
											triggers: {
												someField: {
													cls: 'fa-search',
													scope: 'controller',
													handler: 'onTriggerPkgClick'
												}
											}, 
											flex: 1.1
										},
										{
											xtype: 'textfield',
											flex: 1,
											margin: '5 0 0 5',
											readOnly: true,
											reference: 'refPkgTpName',
											bind: '{theCargoShifting.pkgTpNm}'
										}
									]
								}
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox'
							},
							margin: '0 0 0 40',
							defaults: {
								width: '100%'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										flex: 1,
										margin: '5 5 0 0'
									},
									items: [
										{
											xtype: 'datetimefield',
											fieldLabel: ViewUtil.getLabel('cgShiftingStartTime'),
											bind: '{theCargoShifting.stDate}',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											reference: 'refCgShftStartTime',
											allowBlank: false
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										flex: 1,
										margin: '5 5 0 0'
									},
									items: [
										{
											xtype: 'datetimefield',
											fieldLabel: ViewUtil.getLabel('cgShiftingEndTime'),
											bind: '{theCargoShifting.endDate}',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											reference: 'refCgShfEndTime',
											allowBlank: false
										}
									]
								}, {
									xtype: 'container', 
									margin: '15 0 0 0',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right', 
									},
									items: [
										{
											xtype: 'container',
											width: 100
										},
										{
											xtype: 'label',
											style: {
												'text-align': 'center'
											},
											text: ViewUtil.getLabel('cgShiftingMT'),
											flex: 1
										},
										{
											xtype: 'label',
											style: {
												'text-align': 'center'
											},
											text: ViewUtil.getLabel('cgShiftingM3'),
											flex: 1
										},
										{
											xtype: 'label',
											style: {
												'text-align': 'center'
											},
											text: ViewUtil.getLabel('cgShiftingQty'),
											flex: 1
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 5 0 0'
									},
									items: [
										{
											xtype: 'label',
											margin: '10 5 0 0', 
											style: {
												'text-align': 'right'
											},
											text: 'Cargo Amount',
											width: 100
										},
										{
											xtype: 'numberfield',
											reference: 'refCgShftMt',
											bind: '{theCargoShifting.mt}',
											flex: 1,
											allowBlank: false,
											minValue: 0
										}, {
											xtype: 'numberfield',
											reference: 'refCgShftM3',
											bind: '{theCargoShifting.m3}',
											flex: 1,
											allowBlank: false,
											minValue: 0
										}, {
											xtype: 'numberfield',
											reference: 'refCgShftQty',
											bind: '{theCargoShifting.qty}',
											flex: 1,
											allowBlank: false,
											minValue: 0
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 5 0 0',
										flex: 1
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('cgShiftingRemark'),
											bind: '{theCargoShifting.rmk}',
											reference: 'refTxtCgShftRmk'
										}
									]
								}
							]
						},
						{
							xtype: 'container',
							flex: 2
						}
					]
				}, 
				{
					xtype: 'tsb-datagrid',
					flex: 1,
					margin: '5 0 5 0',
					stateful: true,
					stateId: 'stateShiftingDoubleBankingCSGrid',
					reference: me.MAIN_GRID_REF_NAME,
					usePagingToolbar: false,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					listeners: {
						cellclick: 'onCargoShiftingGridClick'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					scrollable: true,
					columns: {
						items: GridUtil.getGridColumns('CargoShifting'),
					}
				}
			]
		});
		
		me.callParent();
	}
});