Ext.define('MOST.view.operation.VSRMEquipmentTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vsrmquipmenthht',

	requires: [
		'Ext.scroll.Scroller',
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],
		
	reference: 'vsrmquipmenthht',
	itemId: 'vsrmquipmenthht',
	
	/***************************************************************/
	shadow: false,
	layout: 'fit',
	scrollable: true,
	padding: 5,
	
	listeners: {
		//show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},
	items: [{
		xtype: 'formpanel',
		padding: 0,
		reference: 'refFrmVsrMEquipmentHHT',
		layout: 'vbox',
		items: [
		{//Row1: Detail
			xtype: 'fieldset',
			layout:'hbox',
			items:[
			{	//Row1.Col1: Left
				xtype:'container',
				layout: 'vbox',
				defaults: {
					//margin: '6 0 0 0'
				},
				flex:5,
				items:[{
					xtype: 'textfield',
					reference: 'refMEWorkOdrNo',
					label: 'W/O No',
					labelWidth: 90,
					labelAlign: 'left',
					inputType: 'text',
					bind:{
						value: '{theMEQ.workOdrNo}'
					},
					required: true
				},
				{
					xtype: 'container',
					layout: 'hbox',
					items:[
					{
						xtype: 'textfield',
						flex: 3,
						reference: 'refMEQTypeCd',
						label: 'EQ Type',
						labelWidth: 90,
						labelAlign: 'left',
						inputType: 'text',
						required: true,
						bind:{
							value: '{theMEQ.capaDescr}'
						},
						triggers: {
							someField:{
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'onSearchMechanicalEquipmentHHT'
							},
						},
					},
					// {
					// 	xtype: 'button',
					// 	iconCls: 'x-fa fa-search',
					// 	handler: 'onSearchMechanicalEquipmentHHT',
					// },
					{
						labelWidth: '90px',
						xtype: 'numberfield',
						flex: 1.5,
						label: 'Nos.',
						labelWidth: 50,
						labelAlign: 'left',
						ui: 'field-inputcolor',
						minValue: 0,
						maxValue: 999,
						defaultValue: 0,
						required: true,
						reference: 'reftxtNos',
						//style: 'background-color: #80FF80;',
						bind:{
							value: '{theMEQ.rsQty}'
						},
					}]
				},
				{	//Radio group
					xtype: 'container',
					reference: 'refEQRadioGrp',
					layout:'hbox',
					items:[
					{	//Ship's Cre
						xtype: 'radiofield',
						reference: 'refRbtnEQShipCrew',
						name : 'cgType',
						value: 'shipCrew',
						label: "Ship's Crew",
						labelAlign: 'right',
						labelWidth: 70,
						labelTextAlign: 'right',
						checked: false,
						width: 90,
						listeners:{
							check: 'onTblContractorMEQChange'
						}
					},
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
					{
						xtype: 'radiofield',
						reference: 'refRbtnEQCnrt',
						name : 'cgType',
						value: 'contractor',
						label: "Contractor",
						labelAlign: 'right',
						labelWidth: 70,
						labelTextAlign: 'right',
						checked: true,
						width: 90,
						listeners:{
							check: 'onTblContractorMEQChange'
						}
					},
					{
						xtype: 'textfield',
						reference: 'refMEQContractorCd',
						inputType: 'text',
						flex: 1,
						listeners: {
							change: 'onChangeUpperCase',
							focusleave:{
								fn: 'onPartnerFocusleave',
								e: 'Contractor'
							}
						},
						bind:{
							value: '{theMEQ.cnrtCd}'
						},
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
					// 	reference:'refMEQF2',
					// 	iconCls: 'x-fa fa-search',						
					// 	handler: 'onSearchPartnerHHT',
					// }
					]
				},
				{
					xtype: 'datetimelocalfield',
					reference: 'refWorkDateEQARR',
					label: 'EQ Arr',
					labelWidth: 90,
					labelAlign: 'left',
					inputType: 'datetime-local',
					format: 'd/m/Y H:i',
					bind:{
						//value: '{theMEQ.setupTime}'
					}
				},
				{
					xtype: 'datetimelocalfield',
					reference: 'refWorkDateMEQStart',
					label: 'Start Time',
					labelWidth: 90,
					labelAlign: 'left',
					inputType: 'datetime-local',
					format: 'd/m/Y H:i',
					bind:{
						value: '{theMEQ.workStDt}'
					}
				},
				{
					xtype: 'datetimelocalfield',
					reference: 'refWorkDateMEQEnd',
					label: 'End Time',
					labelWidth: 90,
					labelAlign: 'left',
					inputType: 'datetime-local',
					format: 'd/m/Y H:i',
					bind:{
						value: '{theMEQ.workEndDt}'
					}
				}]
			},
			{
				xtype: 'spacer',
				width: 10
			},
			{//Row1. Col2: Right
				xtype:'container',
				layout: 'vbox',
				defaults: {
					//margin: '6 0 0 0'
				},
				flex:5,
				items:[
				{
					xtype: 'combobox',
					reference: 'refCboWAreaMEQ',
					label: 'Working Area',
					labelWidth: 90,
					labelAlign: 'left',
					listeners: {
						select : 'onChangeMEQWorkAreaHHT'
					},
					required: true,
					bind: {
						store: '{workAreaCombo}',
						//value: '{theMEQ.workLocTp}'
					},
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					clearable: true,
					typeAhead: true,
					editable: false
				},
				{
					xtype: 'combobox',
					reference: 'refMEWorkLocCd',
					label: 'Working Loc',
					labelWidth: 90,
					labelAlign: 'left',
					// required: true,
					displayField: 'scd',
					valueField: 'scdNm',
				  //queryMode: 'local',
					clearable: true,
					disabled: true,
					bind:{
						store: '{noneStore}',
						//value: '{theMEQ.workLoc}'
					},
					listeners: {
						focusleave:{
							fn: 'onPartnerFocusleave',
							e: 'Working Loc'
						}
					},
					editable: true
				},
				{	//Purpose
					xtype: 'combobox',
					reference: 'ctlMEPurpose',
					label: 'Purpose',
					labelWidth: 90,
					labelAlign: 'left',
					required: true,
					bind: {
						store: '{purposeCombo}',
						value: '{theMEQ.purpose}'
					},
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					clearable: true,
					typeAhead: true,
					editable: false
				},
				{	//Requestor
					xtype: 'container',
					layout: 'hbox',
					items:[{
						xtype: 'textfield',
						reference: 'refMEQRequestor',
						label: 'Requestor',
						labelWidth: 90,
						labelAlign: 'left',
						inputType: 'text',
						listeners: {
							change: 'onChangeUpperCase',
							focusleave:{
								fn: 'onPartnerFocusleave',
								e: 'Requestor'
							}
						},
						bind:{
							value: '{theMEQ.payer}'
						},
						flex: 1,
						required: true,
						triggers: {
							someField:{
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'onSearchRequesterHHT'
							},
						},
					},
					// {
					// 	xtype: 'button',
					// 	iconCls: 'x-fa fa-search',
					// 	handler: 'onSearchRequesterHHT',
					// }
					]
				},
				{	//CargoType
					xtype: 'combobox',
					reference: 'refCboEQCargoType',
					label: 'Cargo Type',
					labelWidth: 90,
					labelAlign: 'left',
					required: true,
					bind: {
						store: '{cargoCombo}',
						value: '{theMEQ.cgTpCd}'
					},
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					clearable: true,
					typeAhead: true,
					editable: false
				},
                {
					xtype: 'container',
					layout: 'hbox',
					//height: 37,
					items:[{
						xtype: 'radiofield',
						reference: 'ctlMECmbRef',
						label: 'Ref. No',
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 70,
						checked: false,
						width: 90
					},
					{
						xtype: 'textfield',
						flex: 1,
						reference: 'refMECmbRefNo',
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
						reference: 'ctlMETxtRef',
						label: '      ',
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 70,
						checked: false,
						width: 90
					},
					{
						xtype: 'textfield',
						flex: 1,
						reference: 'refMETxtRefNo',
						readOnly: false,
					}]
				},
                {
                	xtype: 'textfield',
					maxLength: 150,
                	bind: {
                         value: '{theMEQ.rmk}'
					},
					label: 'Remark',
					labelWidth: 90,
					labelAlign: 'left',
                }]
			}]
		},
		
		{	//Row button
			xtype: 'container',
			layout: 'hbox',
			items: [
			{
				xtype: 'button',
				reference: 'refBtnVSRCheckMEQListRetrive',
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
				reference: 'refBtnClearMEQ',
				flex: 1,
				iconCls: 'x-fa fa-eraser',
				ui: 'clear-button-modern',
				text: { type: 'bundle', key: 'clear' },
				handler: 'onClearMEQHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnAddMEQ',
				flex: 1,
				iconCls: 'x-fa fa-plus',
				ui: 'create-button-modern',
				text: { type: 'bundle', key: 'add' },
				handler: 'onAddMEQHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnUpdateMEQ',
				flex: 1,
				ui: 'update-button-modern',
				iconCls: 'x-fa fa-save',
				text: { type: 'bundle', key: 'update' },
				handler: 'onUpdateMEQHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnDeleteMEQ',
				flex: 1,
				iconCls: 'x-fa fa-minus',
				ui: 'delete-button-modern',
				text: { type: 'bundle', key: 'delete' },
				handler: 'onDeleteMEQHHT'
			}]
		},{//GRID
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
				reference: 'refMechanicalMEQGrid',
                listeners:
                {
                    select: 'onSelectGridMEQHHT',
                },
                bind: {
				    store: '{mechanicalEqList}'
				},
				selectable:{
					columns: false,
					rows: true,
					cells: false,
					mode: 'single',
					headerCheckbox: false,
				},
				columns: [{
					text: 'No',
					xtype: 'rownumberer',
					width : 60,
					align : 'center'
				},{
					text: 'Status',
					dataIndex: 'confirmStatus',
					width: 180,
				}, {
					text: {type: 'bundle', key: 'eqNo'},
					dataIndex: 'rsNm',
					width: 180
				}, {
					text: {type: 'bundle', key: 'capacity'},
					dataIndex: 'capaDescr',
					width: 170
				},{
					text: {type: 'bundle', key: 'refNo'},
					dataIndex: 'refNo',
					width: 200
				}, {
					text: {type: 'bundle', key: 'woNo'},
					dataIndex: 'workOdrNo',
					width: 200
				}, {
					text: {type: 'bundle', key: 'nos'},
					dataIndex: 'rsQty',
					width: 200
				}, {
					text: {type: 'bundle', key: 'workingArea'},
					dataIndex: 'workLoc',
					width: 200
				}, {
					text: {type: 'bundle', key: 'shipCrew'},
					dataIndex: 'shpCrew',
					width: 200
				}, {
					text: {type: 'bundle', key: 'contractor'},
					dataIndex: 'cnrtCd',
					width: 200,
				}, {
					text: {type: 'bundle', key: 'purpose'},
					dataIndex: 'purposeNm',
					width: 200
				}, {
					text: {type: 'bundle', key: 'cargoTp'},
					dataIndex: 'cgTpCd',
					width: 200
				}, {
					text: {type: 'bundle', key: 'requestor'},
					dataIndex: 'payer',
					width: 200
				}, {
					text: {type: 'bundle', key: 'setupTime'},
					dataIndex: 'setupTime',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 200
				}, {
					text: {type: 'bundle', key: 'startTime'},
					dataIndex: 'workStDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 200
				}, {
					text: {type: 'bundle', key: 'endTime'},
					dataIndex: 'workEndDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 200
				}, {
					text: {type: 'bundle', key: 'remarks'},
					dataIndex: 'rmk',
					width: 200
				}]
            }]
		}]
	}]
});
