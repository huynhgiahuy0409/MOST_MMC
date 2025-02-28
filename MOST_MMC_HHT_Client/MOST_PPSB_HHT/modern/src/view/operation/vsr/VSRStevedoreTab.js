Ext.define('MOST.view.operation.VSRStevedoreTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vsrstevedorehht',

	requires: [
		'Ext.scroll.Scroller',
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],

	reference: 'vsrstevedorehht',
	itemId: 'vsrstevedorehht',

	/***************************************************************/
	layout: 'fit',
	shadow: false,
	padding: 5,
	scrollable: true,
	
	listeners: {
		//show: { fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS'] }
	},
	items: [
	{
		xtype: 'formpanel',
		padding: 0,
		reference: 'refFrmVsrStevedoreHHT',
		// bind: {
		// 	disabled: '{!globalJpvcCheck}',
		// },
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [
		{
			xtype: 'fieldset',
			layout: {
				type: 'vbox',
				align: 'stretch',
				pack: 'start'
			},
			items: [
			{//Detail form Row1:
				xtype: 'container',
				layout: 'hbox',
				items: [
				{//Row1. Left
					xtype: 'container',
					flex: 1,
					layout: 'vbox',
					items: [
					{

						xtype: 'combobox',
						reference: 'refPurposeStvHHTcbx',
						flex: 3,
						label:  'Purpose',
						labelWidth: 90,
						labelAlign: 'left',
						bind: {
							store: '{purposeCombo}',
							value: '{theVSRSteveDoreHHT.purpose}',
						},
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						editable: false,
						clearable: true,
						hidden: true,
					}, 
					{
						xtype: 'container',
						layout: 'hbox',
						items: [{
							xtype: 'textfield',
							reference: 'refStevedoreCompHHTField',
							flex: 1,
							bind: '{theVSRSteveDoreHHT.stvdComp}',
							label:  'Stevedore',
							labelWidth: 90,
							labelAlign: 'left',
							required: true,
							editable: false,
							triggers: {
								someField:{
									iconCls: 'x-fa fa-search',
									scope: 'controller',
									handler: 'onSearchSearchStvTabHHT'
								},
							},
						},
						// {
						// 	xtype: 'button',
						// 	reference: 'refBtnSearchStvTabVSR',
						// 	handler: 'onSearchSearchStvTabHHT',
						// 	iconCls: 'x-fa fa-search'
						// }
						]
					}, 
					{
						xtype: 'numberfield',
						value: 0,
						minValue: 0,
						maxValue: 99,
						reference: 'refSupervisorStvHHTField',
						//flex: 1,
						bind: '{theVSRSteveDoreHHT.nofStvdSprr}',
						label:  'Supervisor',
						labelWidth: 90,
						labelAlign: 'left',
						ui: 'field-inputcolor',
						allowDecimals: false,
					}, 
					{
						xtype: 'numberfield',
						value: 0,
						minValue: 0,
						maxValue: 99,
						reference: 'refNonTonnageStvHHTField',
						//flex: 1,
						bind: '{theVSRSteveDoreHHT.stvdNonTon}',
						label:  'Non Tonnage',
						labelWidth: 90,
						labelAlign: 'left',
						ui: 'field-inputcolor',
						allowDecimals: false,
					},
					{//Start End Time:
						xtype: 'container',
						layout: 'vbox',
						items: [{
							xtype: 'datetimelocalfield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							//flex: 1,
							reference: 'refStartTimeYDStvTimefield',					label: 'Start Time',
							labelWidth: 90,
							labelAlign: 'left',
							required: true,
							inputType: 'datetime-local'
						},
						// {
						// 	xtype: 'spacer',
						// 	width: 15
						// },
						{
							xtype: 'datetimelocalfield',
							//flex: 1,
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							reference: 'refEndTimeYDStvTimefield',
							label: 'End Time',
							labelWidth: 90,
							labelAlign: 'left',
							required: true,
							inputType: 'datetime-local'
						}
						]
					}
					]
				}, 
				{
					xtype: 'spacer',
					width: 15
				},
				{//Row1. /right
					xtype: 'container',
					flex: 1,
					layout: 'vbox',
					items: [
					{
						xtype: 'container',
						layout: 'hbox',
						items: [
						{
							xtype: 'textfield',
							reference: 'refWAreaStvHHTField',
							flex: 1,
							bind: '{theVSRSteveDoreHHT.workLoc}',
							//style: 'background-color: #f2f22e',
							label: 'W.Area',
							labelWidth: 70,
							labelAlign: 'left',
							//editable: false, //  with refBtnWorkingAreaStv
							required: true,
							triggers: {
								someField:{
									iconCls: 'x-fa fa-search',
									scope: 'controller',
									handler: 'onSearchWorkingAreaStvHHT'
								},
							},
						},
						// {
						// 	xtype: 'button',
						// 	reference: 'refBtnWorkingAreaStv',
						// 	handler: 'onSearchWorkingAreaStvHHT',
						// 	iconCls: 'x-fa fa-search'
						// }
					]
					},
					{
						xtype: 'container',
						layout: 'hbox',
						items: [
						{
							xtype: 'textfield',
							reference: 'refRequesterStvHHTField',
							flex: 1,
							label:  'Req.',//'Requestor',
							labelWidth: 70,
							labelAlign: 'left',
							bind: '{theVSRSteveDoreHHT.payer}',
							//style: 'background-color: #f2f22e',
							listeners: {
								focusleave:{
									fn: 'onPartnerFocusleave',
									e:'Requestor'
								},
							},
							required: true,
							placeholder: {type: 'bundle', key: 'requestor'},
							triggers: {
								someField:{
									iconCls: 'x-fa fa-search',
									scope: 'controller',
									handler: 'onSearchRequestorStvHHT'
								},
							},
						},
						// {
						// 	xtype: 'button',
						// 	reference: 'refBtnSearchRequesterStv',
						// 	handler: 'onSearchRequestorStvHHT',
						// 	iconCls: 'x-fa fa-search'
						// }
						]
					},
					{

						xtype: 'textareafield',
						reference: 'refStevedoreHHTRemarks',
						flex: 1,
						label: 'Remarks',
						labelWidth: 70,
						labelAlign: 'left',
						maxLength: 150,
						bind: '{theVSRSteveDoreHHT.rmk}',
						//style: 'background-color: #f2f22e',					
					}]
				}]
			},
			]
		}, 
		{// Row button
			xtype: 'container',
			layout: 'hbox',
			items: [
			{
				xtype: 'button',
				reference: 'refBtnVSRCheckStvRetrive',
				iconCls: 'x-fa fa-search',
				text: 'Retrieve',
				handler: 'onSearchHHT',
				flex: 1,
				ui: 'retrieve-button-modern',
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnClearStvHHT',
				flex: 1,
				iconCls: 'x-fa fa-eraser',
				ui: 'clear-button-modern',
				text: { type: 'bundle', key: 'clear' },
				handler: 'onClearStevedoreVSRHHT'
			},
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnAddStvHHT',
				flex: 1,
				iconCls: 'x-fa fa-plus',
				ui: 'create-button-modern',
				text: { type: 'bundle', key: 'add' },
				handler: 'onAddStevedoreTabHHT'
			},
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnUpdateStvHHT',
				flex: 1,
				ui: 'update-button-modern',
				iconCls: 'x-fa fa-save',
				text: { type: 'bundle', key: 'update' },
				handler: 'onUpdateStevedoreHHT'
			},
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnDeleteStvHHT',
				flex: 1,
				iconCls: 'x-fa fa-minus',
				ui: 'delete-button-modern',
				text: { type: 'bundle', key: 'delete' },
				handler: 'onRemoveStevedoreHHT'
			}]
		}, 
		{//grid
			xtype: 'container',
			layout: 'hbox',
			scrollable: true,
			flex: 1,
			items: [{
				xtype: 'grid',
				reference: 'refVSRStevedoreHHTGrid',
				bind: {
					store: '{stevedoreList}'
				},
				listeners: {
					select: 'onGridYDSteveDoreClick'
				},
				selectable:{
					mode: 'single'
				},
				columns: [{
					text: { type: 'bundle', key: 'gridNo' },
					xtype: 'rownumberer',
					width: 50,
					align: 'center'
				},{
					text: {type: 'bundle', key: 'purpose'},
					dataIndex: 'purposeNm',
					width: 180,
					hidden: true,
				},{
					text: { type: 'bundle', key: 'stevedore' },
					dataIndex: 'stvdComp',
					width: 180
				}, {
					text: { type: 'bundle', key: 'supervisor' },
					dataIndex: 'nofStvdSprr',
					width: 100
				}, {
					text: { type: 'bundle', key: 'nonTonnage' },
					dataIndex: 'stvdNonTon',
					width: 100
				}, {
					text: { type: 'bundle', key: 'category' },
					dataIndex: 'workLocTp',
					width: 140,
					hidden: true,
				}, {
					text: { type: 'bundle', key: 'workingArea' },
					dataIndex: 'workLoc',
					width: 200
				}, {
					text: { type: 'bundle', key: 'startTime' },
					dataIndex: 'workStDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 160
				}, {
					text: { type: 'bundle', key: 'endTime' },
					dataIndex: 'workEndDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 160
				}, {
					text: { type: 'bundle', key: 'remarks' },
					dataIndex: 'rmk',
					width: 250
				}, {
					text: { type: 'bundle', key: 'requestor' },
					dataIndex: 'payer',
					width: 150
				}]
			}]
		}]
	}]
});
