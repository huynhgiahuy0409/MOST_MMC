Ext.define('MOST.view.operation.VesselDelayHHT', {
	extend : 'Ext.Panel',
	//1. Alias:
	alias: 'widget.app-vesseldelayhht',
	//2. Require:
	requires: [
		'Ext.scroll.Scroller',
		'Ext.layout.overflow.Scroller',
		'MOST.view.operation.VesselDelayController',
		'MOST.view.operation.VesselDelayModel',
		'MOST.view.common.DateTimeLocalField'
		
	],
	//3. Reference Controller by alias:
	controller: 'vesseldelayhht',
	//4. Reference View Model by alias:
	viewModel: {
		type: 'vesseldelayhht'
	},
	reference : 'delayvsl',
	itemId: 'delayvsl',
	//====================================
	layout: 'fit',
	shadow: false,
	padding: 5,
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	responsiveFormulas: {
		small: CommonConstants.SMALL_WIDTH,
		large: CommonConstants.LARGE_WIDTH
	},
//	profiles: {
//        defaults: {
//            buttonShadow: true,
//            height: 300,
//            width: 400,
//            shadow: true
//        },
//        ios: {
//            buttonShadow: undefined
//        },
//        modern: {
//            defaults: {
//                height: undefined,
//                width: undefined
//            }
//        }
//    }, 

    listeners: {
		//initialize: 'onTblLoad',
    	painted: 'onTblLoad',
		show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']},
	},
	
	items: [{
		xtype: 'formpanel',
		reference: 'delayDetail',
		padding: 0,
		bind: {
			// disabled: '{!globalJpvcCheck}',
		},
		
		layout: { 
			type: 'vbox',
			align: 'stretch'
		},
		
		items: [
			{
			//Row1: button, working date, shift  ->> need to remove
			hidden: true,
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				//Dalay date. Shift
				xtype: 'fieldset',
				flex: 1,
				layout:{
					type: 'hbox',
					align: 'strecth'
				},
				items:[{	
					xtype: 'datetimelocalfield',
					reference: 'refWorkingDate',
					labelWidth: 130,
					flex: 4,
					bind:{
						disabled: true,
					},
					inputType: 'date',
					label: 'Working Date',
					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y H:i' 
				},
				{
					xtype: 'combobox',
					flex: 3.5,
					//ui: 'tabletstyle1',
					reference: 'refCbxShft',
					style: 'margin-left: 20px',
					bind: {
						store: '{shiftCombo}',
						//value: '{theHatchEq.shftId}'
						disabled: true,
					},
					label: {type: 'bundle', key: 'equipmentSettingShftnm'},
					labelAlign: 'left',
					displayField: 'shftNm',
					valueField: 'shftId',
					queryMode: 'local',
					clearable: true,
					typeAhead: true,
					labelWidth: 50,
					readOnly: true,
					editable: false
				}]
			}],
		}, 
		
		{//Button Row. Retrieve, Add, Update, Clear, Delete
			xtype: 'container',
			responsiveConfig: {
				small: {
					layout: {
						type: 'vbox',
						pack: 'top',
					},
					
				},
				large: {
					layout: {
						type: 'hbox',
						align: 'right',
						pack: 'end',
						
					},
				}
			},
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'right',
						pack: 'end',
						
					},
					responsiveConfig: {
						small: {							
							margin: '5 0 0 0',
							defaults: {
								margin: '0 5 0 0',
							},
						},
						large: {
							defaults: {
								margin: '5 5 0 0',
							},
							
						}
					},
					items: [
						{
							xtype: 'button',
							reference: 'refBtnVslDelayRetrieve',
							//iconCls: 'x-fa fa-search',
							text: 'Retrieve',
							handler: 'onTblRetrieve',
							width: 120,
							ui: 'retrieve-button-modern',
						},
						{
							xtype: 'button',
							reference: 'refBtnVslDelayAdd',
							width: 120,
							ui: 'create-button-modern',
							text: { type: 'bundle', key: 'add' },
							handler: 'onTblCreate'
						},
						{
							xtype: 'button',
							reference: 'refBtnVslDelayUpdate',
							width: 120,
							ui: 'update-button-modern',
							//iconCls: 'x-fa fa-save',
							text: { type: 'bundle', key: 'update' },
							handler: 'onTblUpdate'
						}
					]
				},
				{
					
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'right',
						pack: 'end',
						
					},
					responsiveConfig: {
						small: {							
							margin: '5 0 0 0',
							defaults: {
								margin: '0 5 0 0',
							},
						},
						large: {
							defaults: {
								margin: '0 5 0 0',
							},
							
						}
					},
					items: [
						{
							xtype: 'button',
							reference: 'refBtnVslDelayClear',
							width: 120,
							ui: 'clear-button-modern',
							text: { type: 'bundle', key: 'clear' },
							handler: 'onTblClear',
							marginRight: '0'
						},
						{
							xtype: 'button',
							reference: 'refBtnVslDelayDelete',
							width: 120,
							ui: 'delete-button-modern',
							text: { type: 'bundle', key: 'delete' },
							handler: 'onTblDelete'
						},
					]
				},
				
				
			]
		},
		//Row2: Detail Control and DelayCode Grid
		// {
		// 	xtype: 'container',
		// 	//height: 338,
		// 	hidden: true,
		// 	scrollable: true,
		// 	layout: {
		// 		type: 'hbox',
		// 		align: 'stretch'
		// 	},
		// 	//////////////////////////////////////////////////////////
		// 	//modal: true,
		// 	items: [{//Row2.Col1
		// 		xtype: 'fieldset',
		// 		flex: 3,
		// 		layout:{
		// 			type: 'vbox',
		// 			align: 'stretch'
		// 		},
		// 		items: [{//Hbox Hatch + Ap
		// 			xtype: 'container',
		// 			layout:{
		// 				type: 'hbox',
		// 				align: 'stretch'
		// 			},
		// 			items:[{
		// 				xtype: 'combobox',
		// 				flex: 1,
		// 				reference: 'refCbxHatch',
		// 				bind: {
		// 					store: '{hatchNoCombo}',
		// 					value:'{theDelayVessel.hatchNo}',
		// 				},
		// 				placeholder: 'Hatch',
		// 				displayField: 'hatchNo',
		// 				valueField: 'hatchNo',
		// 				queryMode: 'local',
		// 				typeAhead: false,
		// 				required: false,
		// 				clearable: true,
		// 				listeners: {
		// 					select: 'onTblSelectHatchNo'
		// 				}
		// 			},{
		// 				xtype: 'spacer',
		// 				width: 3
		// 			},{
		// 				xtype: 'combobox',
		// 				flex: 1,
		// 				reference: 'refCbxAp',
		// 				bind: {
		// 					store: '{apfpCombo}',
		// 					value:'{theDelayVessel.hatchDrtCd}',
		// 				},
		// 				placeholder: 'AP',
		// 				displayField: 'label',
		// 				valueField: 'data',
		// 				queryMode: 'local',
		// 				editable: false,
		// 				clearable: true,
		// 				typeAhead: false,
		// 			}]
		// 		}, {//Contractor + EQ  - Responsive
		// 			xtype: 'container',
		// 			responsiveConfig: {
		// 				small: {
		// 					layout: 'vbox'
		// 				},
		// 				large: {
		// 					layout: 'hbox'
		// 				}
		// 			},
		// 			items:[
		// 			{
		// 				xtype: 'container',
		// 				layout: 'hbox',
		// 				items:[
		// 				{
		// 					xtype: 'textfield',
		// 					flex: 1,
		// 					bind: {
		// 						value: '{theDelayVessel.contractor}',
		// 					},
		// 					placeholder: 'Contractor',
		// 					reference: 'refTxtTblContractor',
		// 					editable: false,
		// 					disabled: true,
		// 				},{
		// 					xtype: 'button',
		// 					reference: 'refBtnContractor',
		// 					iconCls: 'x-fa fa-search',
		// 					handler: 'onSearchContractorHHT',
		// 					disabled: true,
		// 				}]
		// 			},
		// 			{
		// 				xtype: 'combobox',
		// 				responsiveConfig: {
		// 					small: {
		// 						style: 'margin-left: 0px',
		// 					},
		// 					large: {
		// 						style: 'margin-left: 10px',
		// 					},
		// 				},
		// 				reference: 'refEqNo',
		// 				flex: 1,
		// 				bind: {
		// 					store: '{equipmentCombo}',
		// 					value: '{theDelayVessel.eqNo}',
		// 				},
		// 				placeholder: 'EQ',
		// 				displayField: 'eqNm',
		// 				valueField: 'eqNo',
		// 				queryMode: 'local',
		// 				clearable: true,
		// 				typeAhead: false	,	
		// 				editable: false,
		// 				required: false,
		// 			}]
		// 		},
		// 		{//From  Date
		// 			xtype: 'datetimelocalfield',
		// 			reference: 'refDelayFromTime',
		// 			placeholder: 'From',
		// 			bind:{
		// 				value: '{theDelayVessel.stDt}',
		// 			},
		// 			required: false,
		// 			format:  MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y H:i' 
		// 		},{//To  Date
		// 			xtype: 'datetimelocalfield',
		// 			reference: 'refDelayToTime',
		// 			bind:{
		// 				value: '{theDelayVessel.endDt}'	,
		// 			},
		// 			required: false,
		// 			format:  MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y H:i' 
		// 		},
		// 		{
		// 			xtype: 'textfield',
		// 			name: 'remark',
		// 			bind: {
		// 				value:'{theDelayVessel.rmk}',
		// 			},
		// 			placeholder: 'Remark',
		// 			maxLength: 150,
		// 			flex: 1,
		// 			listeners: {
		//             	change:function (ref) {
		//             		var value = ref.getValue();
		//             		var cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
		//                     if (cleaned !== value) {
		//                     	ref.setValue(cleaned, true);
		//                     }
		//         		}
		//             }
		// 		}]
		// 	}, {//Row2.Col2: Delay Code
		// 		xtype: 'fieldset',
		// 		flex: 4,
		// 		layout:{
		// 			type: 'vbox',
		// 			align: 'stretch'
		// 		},
		// 		items:[{//Row2.Col2. Row1
		// 			xtype: 'container',
		// 			layout: { 
		// 				type: 'hbox',
		// 				align: 'stretch'
		// 			},
		// 			items: [{
		// 				xtype: 'combobox',
		// 				reference: 'refLstDlyCtgCd',
		// 				placeholder: 'Find',
		// 				displayField: 'dlyCgt',
		// 				valueField: 'dlyCgt',
		// 				queryMode: 'local',
		// 				clearable: true,
		// 				//typeAhead: true,
		// 				editable: false,
		// 				width: 70,
		// 				bind: {
		// 					store:'{dalyCtgList}'
		// 				},
		// 				listeners:{
		// 					change: 'onTblSearchDelayCd'
		// 				}
		// 			},
		// 			//{
		// 			//	xtype: 'spacer',
		// 			//	width: 3
		// 			//},
		// 			{
		// 				xtype: 'textfield',
		// 				reference: 'txtDelayCd',
		// 				flex: 1,
		// 				required: true,
		// 				bind: {
		// 					value: '{theDelayVessel.rsnCd}',
		// 				},
		// 				placeholder: 'Delay Code',
		// 				maxLength: 30,
		// 				listeners: {
		// 					//change: function(field, newValue){
		// 					//	field.setValue(newValue.toUpperCase());
		// 					//},
		// 					change: 'onChangeDelaycd'
		// 				}
		// 			}, {
		// 				xtype: 'button',
		// 				name: 'btnSearchDlyCd',
		// 				layout: 'fit',
		// 				iconCls: 'x-fa fa-search',
		// 				handler: 'onTblSearchDelayCd'
		// 			}
		// 			]
		// 		},{//Row2.Col2. Row2
		// 			xtype: 'container',
        //             layout: {
        //             	type: 'hbox',
        //             	align: 'strecth'
        //             },
		// 			border: true,
		// 			scrollable: true,
		// 			flex: 1,
		// 			items: [{
		// 				xtype: 'grid',
		// 				flex: 1,
		// 				height: 200,
		// 				reference: 'refDelayCodeGrid',
		// 				bind: {
		// 					store: '{delayCodePopup}'
		// 				},
		// 				listeners:{
		// 					select: 'onTblSelectDelayCdGrid'
		// 				},
		// 				selectable:{
		// 					mode: 'single',
		// 				},
		// 				columns: [{
		// 					text: 'Code',
		// 					dataIndex: 'scd',
		// 					hidden: true,
		// 				},
		// 				{
		// 					text: 'Description',
		// 					dataIndex: 'scdNm',
		// 					hidden: true,
		// 				},
		// 				{
		// 					text: 'Delay Code Description',
		// 					dataIndex: 'fullCdNm',
		// 					flex: 1,
		// 				},
		// 				{
		// 					text: 'Acpt',
		// 					dataIndex: 'acptYN',
		// 					width: 60
		// 				}]
		// 			}]
		// 		}]
		// 	}]
		// },

		{//Detail Component 1: Code, Description
			xtype: 'container',
			margin: '15 0 0 0',
			padding: '0 0 0 0',
			layout:  {
				type: 'hbox',
				align: 'stretch'
			},
			defaults: {
				labelAlign: 'left',
				labelTextAlign: 'right',
				labelWidth: 100,
				margin: '0 5 0 0',
			},
			items: [
				{
					xtype: 'textfield',
					reference: 'refVesselDelayCode',
					flex: 1.3,
					label: { type: 'bundle', key: 'vesselDelayDelayCode' },
					maxLength: 20,
					enforceMaxLength: true,
					fieldStyle: 'text-transform: uppercase',
					triggers: {
						someField:{
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onOpenDelayCodeHHTPopup'
						},
					},
					bind: '{theDelay.rsnCd}',
					listeners: {
						change: function (field, newValue) {
							field.setValue(newValue.toUpperCase());
						}
					}
				},
				{
					xtype: 'textfield',
					reference: 'refVesselDelayDescription',
					flex: 2,
					// labelWidth: 80,
					// label: { type: 'bundle', key: 'vesselDelayDelayDescription' },
					editable: false,
					bind: '{theDelay.rsnCdNm}',
				},
			]
		},
		{//Detail Component 2:
			xtype: 'container',
			margin: '0 0 0 0',
			layout:  {
				type: 'hbox',
				align: 'stretch'
			},
			defaults: {
				labelAlign: 'left',
				labelTextAlign: 'right',
				labelWidth: 100,
				margin: '0 5 0 0',
			},
			items: [
				{
					xtype: 'combobox',
					reference: 'refVesselDelayHatchNoCombo',
					flex: 1,
					label: { type: 'bundle', key: 'vesselDelayHatchNo' },
					bind: {
						store: '{hatchNoCombo}',
						value: '{theDelay.hatchNo}'
					},
					displayField: 'scdNm',
					valueField: 'scd',
					editable: false,
					allowBlank: true,
					queryMode: 'local',
				},
				{
					xtype: 'textfield',
					reference: 'refVesselDelayAccepted',
					flex: 1,
					labelAlign: 'left',
					label: { type: 'bundle', key: 'vesselDelayAcceptedDelay' },
					bind: '{theDelay.acptYN}',
					editable: false
				},
			]
		},

		{//Detail Component 3:
			xtype: 'container',
			margin: '0 0 5 0',
			layout:  {
				type: 'hbox',
				align: 'stretch'
			},
			defaults: {
				labelAlign: 'left',
				labelTextAlign: 'right',
				labelWidth: 100,
				margin: '0 5 0 0',
			},
			items: [
				{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'vbox',
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 100,
					},
					items: [
						{
							xtype: 'datetimelocalfield',
							// flex: 1,
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							reference: 'refStartDate',
							//labelWidth: 73,
							required: true,
							label: "From Time",
							inputType: 'datetime-local',
							listeners: {
								focusleave: 'updateDelayStartDateHHT',
							},
							bind:{
								value:'{theDelay.stDt}'
							},
						},
						{
							xtype: 'datetimelocalfield',
							// flex: 1,
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							reference: 'refEndDate',
							//labelWidth: 73,
							required: false,
							label: "To Time",
							inputType: 'datetime-local',
							listeners: {
								focusleave: 'updateDelayEndDateHHT'
							 },
							bind:{
								value:'{theDelay.endDt}'
							},
						},
						{
							xtype: 'textfield',
							reference: 'refHrsMins',
							labelAlign: 'left',
							label: { type: 'bundle', key: 'vesselDelayTotalHRS' },
							bind: '{theDelay.totalHRS}',
						},
					]
				},
				{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'vbox',
						pack: 'top'
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 100,
					},
					items: [
						{
							xtype: 'combobox',
							bind: {
								store: '{deployedEquipmentNoList}',
								value: '{theDelay.eqNo}'
							},
							labelAlign: 'left',
							label: { type: 'bundle', key: 'confirmLoadingEquipment' },
							reference: 'refVesselDelayEqNo',
							displayField: 'scdNm',
							valueField: 'scd',
							queryMode: 'local',
							value:''
						},
						{
							xtype: 'textfield',
							reference: 'refVesselDelayStevedore',
							labelAlign: 'left',
							label: { type: 'bundle', key: 'vesselDelayContractor' },
							maxLength: 20,
							enforceMaxLength: true,
							fieldStyle: 'text-transform: uppercase',
							triggers: {
								someField:{
									iconCls: 'x-fa fa-search',
									scope: 'controller',
									handler: 'onOpenStevedoreHHTPopup'
								},
							},
							bind:{
								value:'{theDelay.contractor}'
							},
							listeners: {
								change: function (field, newValue) {
									field.setValue(newValue.toUpperCase());
								}
							}
						},
						{
							xtype: 'textfield',
							flex: 1,
							bind: {
								value:'{theDelayVessel.rmk}',
							},
							labelAlign: 'left',
							label: { type: 'bundle', key: 'remark' },
							reference: 'refVesselDelayRemark',
							bind: '{theDelay.rmk}',
						}
					]
				}
			]
		},

		//Row4: Grid Data
		{
			xtype: 'grid',
			flex: 1,
			reference: 'refVesselDelayGrid',
			bind: {
				store: '{vesselDelayList}',
			},
			selectable:{
				columns: false,
				rows: true,
				cells: false,
				mode: 'single',
				headerCheckbox: true,
			},
			listeners:{
				select: 'onTblSelectDelayVslGrid',
			},
			columns: [
				{
					xtype: 'rownumberer',
					text: { type: 'bundle', key: 'gridNo' },
					width: 50,
					height: 20,
					readOnly: true,
				},
				{
					text: { type: 'bundle', key: 'vesselDelayDelayCode' },
					dataIndex: 'rsnCd',
					width: 120,
					readOnly: true,
				},
				{
					text: { type: 'bundle', key: 'vesselDelayDelayDescription' },
					dataIndex: 'rsnCdNm',
					width: 250
				},
				{
					text: { type: 'bundle', key: 'vesselDelayContractor' },
					dataIndex: 'contractor',
					width: 80
				},
				{
					text: { type: 'bundle', key: 'vesselDelayAcceptedDelay' },
					dataIndex: 'acptYN',
					width: 150,
				},
				{
					text: { type: 'bundle', key: 'vesselDelayFromTime' },
					dataIndex: 'stDt',
					width: 180,
					autoSizeColumn: true
				},
				{
					text: { type: 'bundle', key: 'vesselDelayToTime' },
					dataIndex: 'endDt',
					readOnly: true,
					width: 180,
				},
				{
					text: { type: 'bundle', key: 'vesselDelayTotalHRS' },
					dataIndex: 'totalHRS',
					width: 120,
				},
				{
					text: { type: 'bundle', key: 'vesselDelayDate' },
					dataIndex: 'inptDt',
					width: 100,
					readOnly: true
				},
				{
					text: { type: 'bundle', key: 'vesselDelayRemark' },
					dataIndex: 'rmk',
					width: 200
				},
				//{
				//	text: { type: 'bundle', key: 'vesselDelayCreateBy' },
				//	dataIndex: 'insUserId',
				//	width: 180,
				//	readOnly: true
				//},
				///{
				//	text: { type: 'bundle', key: 'vesselDelayCreateTime' },
				//	dataIndex: 'insDate',
				//	//format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				//	//xtype: 'datecolumn',
				//	width: 180,
				//	readOnly: true
				//},
				{
					text: { type: 'bundle', key: 'vesselDelayUpdateBy' },
					dataIndex: 'userId',
					width: 130
				},
				{
					text: { type: 'bundle', key: 'vesselDelayTime' },
					dataIndex: 'updateDt',
					//format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					//xtype: 'datecolumn',
					width: 200
				},
				{
					text: { type: 'bundle', key: 'vesselDelayStatus' },
					dataIndex: 'verifyStatus',
				},
				{
					text: { type: 'bundle', key: 'vesselDelayVerifyBy' },
					dataIndex: 'verifyBy',
					width: 120,
				},
				{
					text: { type: 'bundle', key: 'vesselDelayVerifyDate' },
					dataIndex: 'verifyDate',
					width: 120,
					readOnly: true
				},
				{
					text: { type: 'bundle', key: 'vesselDelayShift' },
					dataIndex: 'shftNm',
					width: 100,
					readOnly: true
				},
				{
					text: { type: 'bundle', key: 'vesselDelayHatchDrtCd' },
					dataIndex: 'hatchDrtCd',
					width: 100,
					readOnly: true
				},
				{
					text: { type: 'bundle', key: 'vesselDelayHatchNo' },
					dataIndex: 'hatchNo',
					width: 100,
					readOnly: true
				},
				{
					text: { type: 'bundle', key: 'vesselDelayEquipmentNo' },
					dataIndex: 'eqNo',
					width: 150,
					readOnly: true
				},
			]
		}]
	}]
});