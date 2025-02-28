Ext.define('MOST.view.operation.VSRForkliftTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-vsrforklifthht',

	requires: [
		'Ext.scroll.Scroller',
		'Ext.data.validator.Presence',
		'Ext.data.validator.Length',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],
		
	reference: 'vsrforklifthht',
	itemId: 'vsrforklifthht',
	
	/***************************************************************/
	layout: 'fit',
	shadow: false,
	padding: 5,
	scrollable: true,
	listeners: {
		//show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']}
	},
	items: [{
		xtype: 'formpanel',
		reference: 'refFrmVsrForkLiftHHT',
		padding: 0,
		// bind: {
		// 	disabled: '{!globalJpvcCheck}' ,
		// },
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [
		{	//Row1: Form
			xtype: 'fieldset',
			//reference: 'refFrmVsrForkLiftHHT',
			layout: 'hbox',
			items: [
			{
				//Row1.Col1:
				xtype: 'container',
				layout: 'vbox',
				defaults: {
					//margin: '10 0 0 0'
				},
				flex: 5,
				items: [{
					//Row1.Col1.Row1:
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'combobox',
						reference: 'refCboForkliftNo',
						flex: 2,
						bind: {
							value: '{theForkLift.rsNm}',
							store: '{flNoCombo}'
						},
						listeners: {
							change: 'onChangeCboForkLiftHHT'
						},
						label: 'F/L No',
						labelWidth: 90,
						labelAlign: 'left',
						displayField: 'engNm',
						valueField: 'eqNo',
						queryMode: 'local',
						required: true,
						editable: false,
						clearable: true,
						typeAhead: true	,
					},{
						xtype: 'spacer',
						width: 3
					},{
						xtype: 'textfield',
						reference: 'refTxtForkliftCapa',
						flex: 1,
						bind: {
							value: '{theForkLift.capaDescr}'
						},
						placeholder: 'Capacity',
						//label: 'Capa Descr',
						readOnly: true,
						editable: false,
					}]
				},
				{	//Row1.Col1.Row2:
					xtype: 'container',
					layout: 'hbox',
					items: [{//Working Area
						xtype: 'textfield',
						reference: 'refTxtWorkingAreaFL',
						flex: 1,
						label: 'Working Area',
						labelWidth: 90,
						labelAlign: 'left',
						required: true,
						editable: false,
						bind:{
							// WEB
							//displayField: 'scdNm',
					        //valueField: 'scd',
					        //queryMode: 'local',
							//store: '{workAreaCombo}',
							//value : '{theForkLift.workLoc}'
						},
						triggers: {
							someField:{
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'onSearchWorkingAreaFLHHT'
							},
						},
					},
					// {
					// 	xtype: 'button',
					// 	iconCls: 'x-fa fa-search',
					// 	handler: 'onSearchWorkingAreaFLHHT'
					// },
//					{// Combo AP FP
//						xtype: 'combobox',
//						flex: 1,
//						label: ' ',
//						labelWidth: 10,
//						reference: 'refCbhatchDrtCdFl',
//						placeholder: 'AP/ FP',
//						bind: {
//							value: '{theForkLift.hatchDir}',
//							store: '{APFPCombo}',
//						},
//						label: ' ',
//						labelWidth: 5,
//						labelAlign: 'left',
//						displayField: 'name',
//						valueField: 'data',
//						queryMode: 'code',
//						clearable: true,
//						typeAhead: true,
//						editable: false,
//					},
					]
				},
				{
					//Row1.Col1.Row3: Radio Group
					xtype: 'container',
					reference: 'refRadioDriverFL',
					layout:'vbox',
					margin: '0 0 0 0',
					defaults: {
						//margin: '10 0 0 0'
					},
					items: [
					{
						xtype: 'container',
						layout: 'hbox',
						height: 37,
						items:[
						{
							xtype: 'radiofield', //JPB
							reference: 'refRadioJPBFL',
							name : 'driver',
							value: 'JPB',
							label: 'Internal',
							labelAlign: 'right',
							labelTextAlign: 'right',
							labelWidth: 70,
							checked: true,
							bind: {
								//value: '{theForkLift.}'
							},
							listeners:{
								change: 'onCheckRadioDriverFL'
							},
						},
						{
							xtype: 'combobox',
							reference: 'refCboJPBFL',
							flex: 1,
							bind: {
								value: '{theForkLift.empId}',
								store: '{empFLCombo}',
								required: '{isRdoJPBFL}',
								disabled: '{!isRdoJPBFL}',
								readOnly: '{!isRdoJPBFL}'
							},
							//placeholder: 'JPBi Staff',//{type: 'bundle', key: ''},
							labelWidth: 0,
							labelAlign: 'left',
							displayField: 'empNm',
							valueField: 'empId',
							queryMode: 'local',
							editable: false,
							clearable: true,
							typeAhead: true	,
						},
						]
					},
					{
						xtype: 'container',
						layout: 'hbox',
						//margin: '10 0 0 0',
						height: 37,
						items:[{
							xtype: 'radiofield', //Contractor
							reference: 'refRadioContractorFL',
							name : 'driver',
							value: 'CTR',
							label: 'Contractor',//{type: 'bundle', key: ''},
							labelAlign: 'right',
							labelTextAlign: 'right',
							labelWidth: 70,
							checked: false,
							listeners:{
								change: 'onCheckRadioDriverFL'
							},
						},
						{
							xtype: 'textfield',
							reference: 'refTxtContractorFL',
							label: '',
							labelWidth: 0,
							labelAlign: 'left',
							allowBlank: true,
							flex: 1,
							listeners: {
								change: 'onChangeUpperCase',
								focusleave:{
									fn: 'onPartnerFocusleave',
									e:'Contractor'
								}
							},
							bind: {
								value: '{theForkLift.cnrtCd}',
								required: '{!isRdoJPBFL}',
								disabled: '{isRdoJPBFL}',
								readOnly: '{isRdoJPBFL}',
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
						// 	reference: 'refBtnSearchCntrFL',
						// 	disabled: true,
						// 	iconCls: 'x-fa fa-search',
						// 	handler: 'onSearchPartnerHHT',
						// }
						]
					},
					{
						xtype: 'container',
						layout: 'hbox',
						height: 37,
						items:[{
							xtype: 'radiofield', //No Driver
							reference: 'refRadioNoDriverFL',
							name : 'driver',
							value: '',
							label: 'No Driver',//{type: 'bundle', key: ''},
							labelAlign: 'right',
							labelTextAlign: 'right',
							labelWidth: 70,
							checked: false,
							listeners:{
								change: 'onCheckRadioDriverFL'
							},
							height: 37,
						}]
					}]
				},
				{//Arrival
					xtype: 'datetimelocalfield',
					reference: 'refDtEQArrvFL',
					label: 'Arrival', //{type: 'bundle', key: 'startTime'},
					labelWidth: 90,
					labelAlign: 'left',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
					bind: {
						//value: '{theForkLift.setupTime}'
					},
					required: true,
				},
				{//Start
					xtype: 'datetimelocalfield',
					reference: 'refDtStartTimeFL',
					label: 'Start', //{type: 'bundle', key: 'startTime'},
					labelWidth: 90,
					labelAlign: 'left',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
					bind: {
						//value: '{workStDt}'
					},
					required: true,
				},
				{//End Time
					xtype: 'datetimelocalfield',
					reference: 'refDtEndTimeFL',
					label: 'End', //{type: 'bundle', key: 'endTime'},
					labelWidth: 90,
					labelAlign: 'left',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
					bind: {
						//value: '{workEndDt}'
					},
					required: true,
				}]
			},
			{
				xtype: 'spacer',
				width: 10
			},
			{
				//Row1.Col2:
				xtype: 'container',
				layout: 'vbox',
				defaults: {
					//margin: '10 0 0 0'
				},
				flex: 5,
				items: [
				{
					xtype: 'combobox',
					reference: 'refCboPurposeFL',
					bind: {
						value: '{theForkLift.purpose}',
						store: '{purposeCombo}'
					},
					label: 'Purpose',
					labelWidth: 90,
					labelAlign: 'left',
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					required: true,
					editable: false,
					clearable: true,
					typeAhead: true	,
				},
				{	// Combo AP FP
					xtype: 'combobox',
					reference: 'refCbhatchDrtCdFl',
					label:  'AP/FP',
					labelWidth: 90,
					labelAlign: 'left',
					bind: {
						value: '{theForkLift.hatchDir}',
						store: '{APFPCombo}',
					},
					displayField: 'name',
					valueField: 'code',
					queryMode: 'local',
					value: '_',
					clearable: true,
					typeAhead: true,
					editable: false,
					hidden: true,
				},
				{
					xtype: 'combobox',
					reference: 'refCboCargoTpFL',
					bind: {
						value: '{theForkLift.cgTpCd}',
						store: '{cargoCombo}'
					},
					label: 'Cargo Type',
					labelWidth: 90,
					labelAlign: 'left',
					displayField: 'scdNm',
					valueField: 'scd',
					queryMode: 'local',
					required: true,
					editable: false,
					clearable: true,
					typeAhead: true	,
				},
				{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'textfield',
						flex: 1,
						reference: 'refTxtReqFL',
						label: 'Requester',
						labelWidth: 90,
						labelAlign: 'left',
						required: true,
						listeners: {
							change: 'onChangeUpperCase',
							focusleave:{
								fn: 'onPartnerFocusleave',
								e:'Requestor'
							}
						},
						bind:{
							value : '{theForkLift.payer}',
						},
						triggers: {
							someField:{
								iconCls: 'x-fa fa-search',
								scope: 'controller',
								handler: 'onSearchRequesterFLHHT'
							},
						},
					},
					// {
					// 	xtype: 'button',
					// 	iconCls: 'x-fa fa-search',
					// 	handler: 'onSearchRequesterFLHHT'
					// }
					]
				},
				{
					xtype: 'combobox',
					reference: 'refCboDelvTpFL',
					bind: {
						value: '{theForkLift.delvTpCd}',
						store: '{dmodeCombo}'
					},
					label: 'DMode',
					labelWidth: 90,
					labelAlign: 'left',
					displayField: 'name',
   					valueField: 'code',
   					value : '',
					queryMode: 'local',
					required: true,
					editable: false,
					clearable: true,
					typeAhead: true	,
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					//height: 37,
					items:[{
						xtype: 'radiofield',
						reference: 'ctlFLCmbRef',
						label: 'Ref. No',
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth:70,
						width:90,	
						checked: false,
					},
					{
						xtype: 'textfield',
						flex: 1,
						reference: 'refFLCmbRefNo',
						readOnly: false,
						editable: false,
						
					}]
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					//height: 37,
					items:[{
						xtype: 'radiofield', 
						reference: 'ctlFLTxtRef',
						label: '      ',
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth:70,
						width:90,	
						checked: false,
					},
					{
						xtype: 'textfield',
						flex: 1,
						reference: 'refFLTxtRefNo',
						readOnly: false,
					}]
				},
				{
					xtype: 'textfield',
					reference: 'refTxtRemarkFL',
					bind: {
						value: '{theForkLift.rmk}'
					},
					label: 'Remark',
					labelWidth: 90,
					labelAlign: 'left',
					//labelTextAlign: 'left',
					maxLength: 100,
					flex: 1,
				}
				]
			}]
		},
		{	//Row2: button
			xtype: 'container',
			margin: '5 0 0 0',
			layout: {
				type: 'hbox',
				align: 'right'
			},
			items: [
			{
				xtype: 'button',
				reference: 'refBtnVSRCheckForkLiftListRetrive',
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
				reference: 'refBtnClearFl',
				text: 'Clear',
				flex: 1,
				iconCls: 'x-fa fa-eraser',
				ui: 'clear-button-modern',
				handler: 'onClearForkLiftHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnAddFl',
				text: 'Add',
				flex: 1,
				ui: 'create-button-modern',
				iconCls: 'x-fa fa-plus',
				handler: 'onAddForkLiftHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnUpdateFl',
				text: 'Update',
				flex: 1,
				iconCls: 'x-fa fa-save',
				ui: 'update-button-modern',
				handler: 'onUpdateForkLiftHHT'
			}, 
			{
				xtype: 'spacer',
				width: 3
			},
			{
				xtype: 'button',
				reference: 'refBtnDeleteFl',
				text: 'Delete',
				flex: 1,
				ui: 'delete-button-modern',
				iconCls: 'x-fa fa-minus',
				handler: 'onDeleteForkLiftHHT'
			}]	

		},
		{	//Row3: Grid
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
			style: 'border: 2px solid silver;',
			items: [{
				xtype: 'grid',
				reference: 'refGrdForkLift',
				bind: {
					store: '{forkliftList}'
				},
				listeners: {
					childsingletap: 'onSelectGridForkLiftHHT'
				},
				selectable: {
					columns: false,
					checkbox: false,
					checkboxSelect: false,
					rows: true,
					cells: false,
					mode: 'single',
					deselectable: true,
					headerCheckbox: false,
				},
				columns: [{
					text: 'No',
					xtype: 'rownumberer',
					width : 60,
					align : 'center'
				},
				{
					text:'Status',
					dataIndex: 'confirmStatus',
					width: 130, 
				},
				{
					text: {type: 'bundle', key: 'refNo'},
					dataIndex: 'refNo',
					width: 130
				},
				{
					text: {type: 'bundle', key: 'flNo'},
					dataIndex: 'rsNm',
					// hidden: true,
					// editor: {
					// 	xtype: 'combo',
					// 	bind: {store: '{flNoCombo}'},
					// 	displayField: 'engNm',
					// 	valueField: 'eqNo',
					// 	queryMode: 'local',
					// 	editable: false,
					// 	listeners: {
					// 		change : 'onChangeFlNo',
					// 		select: 'onFlNoSelect'
					// 	},
					// 	emptyText: 'Select',
					// 	allowBlank: false
					// },
					width: 150
				},
				{
					text: {type: 'bundle', key: 'capacity'},
					reference: 'refCapaDescr',
					dataIndex: 'capaDescr',
					width: 100
				},
				{
					text: {type: 'bundle', key: 'capacity'},
					reference: 'refCapaCd',
					dataIndex: 'capaCd',
					hidden: true,
					width: 150
				},
				{
					text: {type: 'bundle', key: 'shftGroup'},
					dataIndex: 'mbsCd',
					hidden: true,
					width: 100
				},
				{
					text: {type: 'bundle', key: 'operator'},
					reference: 'refOperator',
					dataIndex: 'operator',
					width: 200
				},
				{
					text: {type: 'bundle', key: 'workingArea'},
					dataIndex: 'workLocTp',
					width: 130
				},
				{
					text: {type: 'bundle', key: 'id'},
					dataIndex: 'workLoc',
					reference: 'refFLWorkLoc',
					width: 150
				},
				{
					text: {type: 'bundle', key: 'apFp'},
					dataIndex: 'hatchDir',
					width: 80
				},
				{
					text: {type: 'bundle', key: 'cargoTp'},
					dataIndex: 'cgTpCd',
					width: 160
				},
				{
					text: {type: 'bundle', key: 'requestor'},
					dataIndex: 'payer',
					width: 100
				},
				{
					text: {type: 'bundle', key: 'refYN'},
					dataIndex: 'refYn',
					width: 90
				},
				{
					text: {type: 'bundle', key: 'purpose'},
					dataIndex: 'purposeNm',
					width: 150
				},{
					text: {type: 'bundle', key: 'deliveryMode'},
					dataIndex: 'delvTpCd',
					width: 160
				},
				{
					text: {type: 'bundle', key: 'eqArr'},
					dataIndex: 'setupTime',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 160
				},
				{
					text: {type: 'bundle', key: 'startTime'},
					dataIndex: 'workStDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 160
				},
				{
					text: {type: 'bundle', key: 'endTime'},
					dataIndex: 'workEndDt',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					xtype: 'datecolumn',
					width: 160
				},
				{
					text: {type: 'bundle', key: 'remarks'},
					dataIndex: 'rmk',
					width: 200
				}]
			}]
		}]
	}]
});
