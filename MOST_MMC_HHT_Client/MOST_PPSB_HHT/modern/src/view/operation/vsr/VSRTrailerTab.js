Ext.define('MOST.view.operation.VSRTrailerTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vsrtrailerhht',

	requires: [
		'Ext.scroll.Scroller',
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length',
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'Ext.Component',
		'MOST.view.popup.EquipmentCdPopupHHT'
	],
	reference: 'vsrtrailerhht',
	itemId: 'vsrtrailerhht',

	/***************************************************************/
	layout: 'fit',
	shadow: false,
	padding: 5,
	scrollable: true,

	listeners: {
		//show: { fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS'] }
	},
	items: [{
		xtype: 'formpanel',
		padding: 0,
		reference: 'refFrmVsrTrailerHHT',
		scrollable: true,
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
			layout: 'hbox',
			items: [
			{//Row1.Col1: left
				xtype: 'container',
				flex: 5,
				layout: 'vbox',
				defaults: {
					//margin: '6 0 0 0'
				},
				items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'textfield',
						reference: 'refEQTyeTrailerHHTField',
						flex: 2,
						bind: '{theVSRTrailerHHT.capaDescr}',
						label: 'Capa Descr',
						labelWidth: 90,
						labelAlign: 'left',
						editable: false,
						clearable: true,
						required: true,
						triggers: {
							someField:{
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'onSearchEQTyeTrailerHHT'
							},
						},
					},
					// {
					// 	xtype: 'button',
					// 	reference: 'refBtnEQTyeTrailerHHT',
					// 	handler: 'onSearchEQTyeTrailerHHT',
					// 	iconCls: 'x-fa fa-search'
					// }, 
					/*{
						xtype: 'label',
						margin: '5 20 0 0',
						style: {
							'text-align': 'left',
							'color': '#808080',
							'font-size': '13px',
							'font-Weight': 'lighter',
						},
						html: { type: 'bundle', key: 'nos' },
					},*/ {
						xtype: 'numberfield',
						reference: 'refNonTonnageTRHHTField',
						flex: 1,
						maxLength:3,
						minValue: 1,
						label: 'Nos',
						labelWidth: 50,
						labelAlign: 'left',
						bind: '{theVSRTrailerHHT.rsQty}',
						//style: 'background-color: #2dd238;',
						required: true,
						ui: 'field-inputcolor',
					}, {
						xtype: 'textfield',
						reference: 'refTREquipmentDivCdHHT',
						flex: 1,
						bind: '{theVSRTrailerHHT.rsNm}',
						
						hidden: true,
					},
					{
						xtype: 'textfield',
						reference: 'refCapacdTrailerHHTField',
						flex: 2,
						bind: '{theVSRTrailerHHT.capaCd}',
						hidden: true,
					}
					]
				}, 
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
					{
						xtype: 'combobox',
						reference: 'refWAreaTrailerHHTcbx',
						flex: 1,
						label: 'W/Area',
						labelWidth: 90,
						labelAlign: 'left',
						bind: {
							store: '{workAreaCombo}',
							value: '{theVSRTrailerHHT.workLocTp}',
						},
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						listeners: {
							select: 'onChangeTRWorkAreaHHT'
						},
						editable: false,
						clearable: true,
						required: true,
					}, {
						xtype: 'combobox',
						reference: 'refTRWorkLocCdHHT',
						label:  'Work Loc',
						labelWidth: 90,
						labelAlign: 'left',
						flex: 1,
						bind: {
							value: '{theVSRTrailerHHT.workLoc}',
						},
						queryMode: 'local',
						displayField: 'cdNm',
						valueField: 'cd',
						disabled: true,
						editable: false,
						clearable: true,
						required: true
					}]
				}, 
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
					/*{
						xtype: 'label',
						margin: '5 10 0 0',
						style: {
							'text-align': 'left',
							'color': '#808080',
							'font-size': '13px',
							'font-Weight': 'lighter',
						},
						html: { type: 'bundle', key: 'contractor' },
					},*/
					{
						xtype: 'textfield',
						reference: 'refContractorTrHHTField',
						flex: 3,
						bind: '{theVSRTrailerHHT.cnrtCd}',
						//style: 'background-color: #f2f22e',
						label:  'Contractor',
						labelWidth: 90,
						labelAlign: 'left',
						listeners: {
							focusleave:{
								fn: 'onPartnerFocusleave',
								e:'Contractor'
							},
							change: function(field, newValue){
								field.setValue(newValue.toUpperCase());
							}
						},
						required: true,
						triggers: {
							someField:{
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'onSearchPartnerHHT'
							},
						},
					},
					// {
					// 	xtype: 'button',
					// 	reference: 'refBtnSearchContractorTrHHT',
					// 	handler: 'onSearchPartnerHHT',
					// 	iconCls: 'x-fa fa-search'
					// }, 
					{
						xtype: 'spacer',
						width: 5
					},
					{
						xtype: 'container',
						items: [
							{
								xtype: 'combobox',
								reference: 'refAPFPTrailerHHTcbx',
								flex: 1,
								bind: {
									store: '{APFPCombo}',
									value: '{theVSRTrailerHHT.hatchDir}',
								},
								displayField: 'name',
								valueField: 'code',
								editable: false,
								clearable: true,
							}
						]
					}
					]
				},
				{
					xtype: 'datetimelocalfield',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					// bind: {
					// 	value: '{theVSRTrailerHHT.setupTime}',
					// },
					reference: 'refTrailerEQArrTimeHHT',
					label:  'Arrival',
					labelWidth: 90,
					labelAlign: 'left',
					inputType: 'datetime-local',
					required: true,
				},
				{
					xtype: 'datetimelocalfield',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					// bind: {
					// 	value: '{theVSRTrailerHHT.workStDt}',
					// },
					reference: 'refStartTrailerTimefield',
					label:  'Start Time',
					labelWidth: 90,
					labelAlign: 'left',
					required: true,
					inputType: 'datetime-local'
				},
				{
					xtype: 'datetimelocalfield',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					// bind: {
					// 	value: '{theVSRTrailerHHT.workEndDt}',
					// },
					reference: 'refEndTrailerTimefield',
					label:  'End Time',
					labelWidth: 90,
					labelAlign: 'left',
					required: true,
					inputType: 'datetime-local'
				}]
			},
			{
				xtype: 'spacer',
				width: 10
			},
			{//Row1.Col2: right
				xtype: 'container',
				flex: 5,
				layou: 'vbox',
				defaults: {
					//margin: '6 0 0 0'
				},
				items: [
				{
					xtype: 'combobox',
					reference: 'refPurposeTRHHTcbx',
					label:  'Purpose',
					labelWidth: 90,
					labelAlign: 'left',
					bind: {
						store: '{purposeCombo}',
						value: '{theVSRTrailerHHT.purpose}',
					},
					displayField: 'scdNm',
					valueField: 'scd',
					editable: false,
					clearable: true, 
					required: true,
				}, 
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
					{
						xtype: 'textfield',
						reference: 'refTRRequestorHHT',
						flex: 1,
						bind: '{theVSRTrailerHHT.payer}',
						label:  'Requestor',
						labelWidth: 90,
						labelAlign: 'left',
						listeners: {
							focusleave:{
								fn: 'onPartnerFocusleave',
								e:'Requestor'
							},
							change: function(field, newValue){
								field.setValue(newValue.toUpperCase());
							}
						},
						required: true,
						triggers: {
							someField:{
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'onSearchRequestorTrailerHHT'
							},
						},
					},
					// {
					// 	xtype: 'button',
					// 	reference: 'refBtnSearchTrailerHHT',
					// 	handler: 'onSearchRequestorTrailerHHT',
					// 	iconCls: 'x-fa fa-search'
					// }
					]
				}, 
				{
					xtype: 'combobox',
					reference: 'refTRCargoTypeHHT',
					flex: 5,
					label:  'Cargo Type',
					labelWidth: 90,
					labelAlign: 'left',
					bind: {
						store: '{cargoCombo}',
						value: '{theVSRTrailerHHT.cgTpCd}',
					},
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					editable: false,
					clearable: true,
					required: true,
				}, {
					xtype: 'combobox',
					reference: 'refTRDModeHHTcbx',
					flex: 3,
					label:  'D.Mode',
					labelWidth: 90,
					labelAlign: 'left',
					bind: {
						store: '{dmodeCombo}',
						value: '{theVSRTrailerHHT.delvTpCd}'
					},
					displayField: 'name',
					valueField: 'code',
					queryMode: 'local',
					editable: false,
					clearable: true,
					required: true,
				},
//				{
//					xtype: 'container',
//					flxe: 1,
//					responsiveConfig: {
//						small: {
//							layout: 'vbox',
//						},
//						large: {
//							layout: 'hbox',
//						}
//					},
//					items: [
//					]
//				},
				{
					xtype: 'container',
					layout: 'hbox',
					//height: 37,
					items:[{
						xtype: 'radiofield',
						reference: 'ctlTRCmbRef',
						label: 'Ref. No',
						labelAlign: 'left',
						labelTextAlign: 'right',
						padding: '5 0 0 0',
						labelWidth: 70,
						width: 90,
						checked: false,
					},
					{
						xtype: 'textfield',
						flex: 1,
						reference: 'refTRCmbRefNo',
						readOnly: false,
						editable: false,
					}]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					//height: 37,
					items:[{
						xtype: 'radiofield',
						reference: 'ctlTRTxtRef',
						label: '   ',
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 70,
						width: 90,
						checked: false,
					},
					{
						xtype: 'textfield',
						flex: 1,
						reference: 'refTRTxtRefNo',
						readOnly: false,
					}]
				},
				{
					xtype: 'textfield',
					reference: 'refTRRemarksHHT',
					//flex: 1,
					maxLength: 150,
					bind: '{theVSRTrailerHHT.rmk}',
					label: 'Remark',
					labelWidth: 90,
					labelAlign: 'left',
					//style: 'background-color: #f2f22e',
					listeners: {
						change: 'onChangeUpperCase'
					},
				}]
			}]
		}, 
		
		{// Row button
			xtype: 'container',
			layout: 'hbox',
			items: [
			{
				xtype: 'button',
				reference: 'refBtnVSRCheckTRListRetrive',
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
				reference: 'refBtnTRClearHHT',
				flex: '1',
				iconCls: 'x-fa fa-eraser',
				ui: 'clear-button-modern',
				text: { type: 'bundle', key: 'clear' },
				handler: 'onClearTrailerVSRHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnTRAddHHT',
				flex: 1,
				iconCls: 'x-fa fa-plus',
				ui: 'action',
				text: { type: 'bundle', key: 'add' },
				handler: 'onAddTrailerHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnTRUpdateHHT',
				flex: 1,
				ui: 'update-button-modern',
				iconCls: 'x-fa fa-save',
				text: { type: 'bundle', key: 'update' },
				handler: 'onUpdateTrailerHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnTRDeleteHHT',
				flex: 1,
				iconCls: 'x-fa fa-minus',
				ui: 'delete-button-modern',
				text: { type: 'bundle', key: 'delete' },
				handler: 'onRemoveTrailerHHT'
			}]
		}, {//grid
			xtype: 'container',
			layout: 'hbox',
			flex: 1,
			responsiveConfig: {
				 small: {
					 flex: 1
				 },
				 large: {
					 flex: undefined,
					 height: 300
				 }
			},
			scrollable: true,
			items: [{
				xtype: 'grid',
				reference: 'refVSRTrailerHHTGrid',
				bind: {
					store: '{trailerList}'
				},
				listeners: {
					select: 'onTrailerHHTClick'
				},
				selectable:{
					mode: 'single'
				},
				columns: [{
					text: 'No',
					xtype: 'rownumberer',
					width : 60,
					align : 'center'
				}, {
					text: 'Status',
					dataIndex: 'confirmStatus',
					width: 180,
				}, {
					text: { type: 'bundle', key: 'eqNo' },
					dataIndex: 'rsNm',
					width: 80
				}, {
					text: { type: 'bundle', key: 'capacity' },
					dataIndex: 'capaDescr',
					width: 180
				}, {
					text: { type: 'bundle', key: 'capacity' },
					dataIndex: 'capaCd',
					hidden: true,
					width: 180
				}, {
					text: { type: 'bundle', key: 'nos' },
					dataIndex: 'rsQty',
					width: 80
				}, {
					text: { type: 'bundle', key: 'workingArea' },
					dataIndex: 'workLocTp',
					width: 120
				}, {
					text: { type: 'bundle', key: 'id' },
					dataIndex: 'workLoc',
					reference: 'refTRWorkLoc',
					width: 150
				}, {
					text: { type: 'bundle', key: 'apFp' },
					dataIndex: 'hatchDir',
					width: 80
				}, {
					text: { type: 'bundle', key: 'contractor' },
					dataIndex: 'cnrtCd',
					width: 160
				}, {
					text: { type: 'bundle', key: 'cargoTp' },
					dataIndex: 'cgTpCd',
					width: 150
				}, {
					text: { type: 'bundle', key: 'refNo' },
					dataIndex: 'refNo',
					width: 100
				}, {
					text: { type: 'bundle', key: 'requestor' },
					dataIndex: 'payer',
					width: 100
				}, {
					text: { type: 'bundle', key: 'purpose' },
					dataIndex: 'purposeNm',
					width: 150
				}, {
					text: { type: 'bundle', key: 'deliveryMode' },
					dataIndex: 'delvTpCd',
					width: 120
				}, {
					text: { type: 'bundle', key: 'eqArr' },
					dataIndex: 'setupTime',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 160
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
					width: 150
				}]
			}]
		}]
	}]
});
