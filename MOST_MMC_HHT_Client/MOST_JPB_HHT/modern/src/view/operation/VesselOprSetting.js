Ext.define('MOST.view.operation.VesselOprSetting', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-vsloperationsetting',
	requires: [
		'MOST.view.operation.VesselOprSettingController',
		'MOST.view.operation.VesselOprSettingModel',
	],
	reference: 'VesselOprSetting',
	itemId: 'VesselOprSetting',

	controller: 'vesseloprsetting',
	viewModel: {
		type: 'vesseloprsetting'
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	shadow: true,
	padding: 0,
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	maxWidth: 1300,
	minHeigh: 800,

	// padding: 0,
	// scrollable: true,

	// minWidth: CommonConstants.HHT_MIN_WIDTH,
	// minHeight: 700,
	
	listeners: {
		initialize: 'onTblLoad',
		beforeshow: 'onTblBeforeshow',
		show: function () {
			var me = this;
			//me.getController().onTblLoad();
			me.getController().onCheckValidateFormPanel('ALL_PANELS');	//check required validation for formpanel at this panel
			//me.getController().onCheckValidateFormPanel('refFrmDetail');	//check required validation for 'refFrmDetail' of formpanel at this panel
			//me.getController().onCheckRequiredComponents();				//check required validation for all of component at this panel
		}
	},

	items: [
		{
			xtype: 'formpanel',
			padding: '0 5 0 0',
			// bind: {
			// 	disabled: '{!globalJpvcCheck}',
			// },
			layout: {
				type: 'vbox',
				align: 'stretch'
			},

			listeners: {
				//initialize: 'onTblLoad'
			},

			items: [
				{
					//Row 1: Detail Component:
					xtype: 'container',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'formpanel',
							scrollable: true,
							padding: '8 0 0 8',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							reference: 'refFrmDetail',
							items: [
								{
									xtype: 'container',
									margin: '5 5 5 10',
									reference: 'refCgTypeRadioGrp',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'radiofield',
											reference: 'refCgTypeRadioBBK',
											name: 'cgType',
											value: 'BBK',
											label: { type: 'bundle', key: 'equipmentSettingBBK' },
											labelAlign: 'right',
											labelTextAlign: 'left',
											checked: true,
											listeners: {
												check: 'onTblCargoRaidoChange'
											},
										},
										{
											xtype: 'radiofield',
											reference: 'refCgTypeRadioDBK',
											name: 'cgType',
											value: 'DBK',
											label: { type: 'bundle', key: 'equipmentSettingDBK' },
											labelAlign: 'right',
											labelTextAlign: 'left',
											listeners: {
												check: 'onTblCargoRaidoChange'
											},
										},
										{// Option to display TopClean Grid
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'label',
													margin: '10 10 0 0',
													html: 'Cargo Top/Clean: ',
													style: 'font-size: 14px; font-weight: 600'
												},
												{
													xtype: 'button',
													//width: 40,
													reference: 'btnShowCargoTopClean',
													iconCls: 'x-fa fa-search',
													handler: 'onShowHideCargoTopCleanHHT'
												},
												{
													xtype: 'spacer',
													width: 10
												},
												{
													xtype: 'button',
													//width: 40,
													reference: 'btnHideCargoTopClean',
													iconCls: 'x-fa fa-search-minus',
													handler: 'onShowHideCargoTopCleanHHT'
												}
											]

										}
									]
								},
								{//Detail Control:
									xtype: 'container',
									reference: 'refDetailControl',
									layout: 'vbox',
									defaults: {
										margin: '5 0 0 0',
										defaults: {
											margin: '0 5 0 0',
										},
									},
									items: [
										{
											//Hatch / APFP 
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'combobox',
													flex: 1,
													reference: 'refCbxHatch',
													bind: {
														store: '{hatchNoCombo}',
														value: '{theHatchEq.hatchNo}'
													},
													placeholder: { type: 'bundle', key: 'equipmentSettingHatchno' },
													required: true,
													displayField: 'scdNm',
													valueField: 'scd',
													queryMode: 'local',
													clearable: true,
													typeAhead: true,
													editable: false,
												},
												{
													xtype: 'spacer',
													width: 3
												},
												{
													xtype: 'combobox',
													flex: 1,
													reference: 'refCbhatchDrtCd',
													bind: {
														store: '{apfpCombo}',
														value: '{theHatchEq.hatchDrtCd}',
													},
													placeholder: 'AP/FP',
													displayField: 'scdNm',
													valueField: 'scd',
													queryMode: 'local',
													clearable: true,
													typeAhead: true,
													editable: false,
												}
											]
										},
										{
											//SA / TopClean.
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'combobox',
													flex: 1,
													reference: 'refSAChange',
													bind: {
														store: '{saChangeCombo}',
														value: '{theHatchEq.dptAgent}'
													},
													placeholder: { type: 'bundle', key: 'equipmentSettingTblSAchange' },
													required: false,
													displayField: 'label',
													valueField: 'data',
													queryMode: 'local',
													editable: false
												},
												{
													xtype: 'spacer',
													width: 3
												},
												{
													xtype: 'combobox',
													flex: 1,
													reference: 'refTopClean',
													bind: {
														store: '{topCleanCombo}',
														value: '{theHatchEq.topClean}'
													},
													placeholder: { type: 'bundle', key: 'equipmentSettingTopclean' },
													required: false,
													displayField: 'scdNm',
													valueField: 'scd',
													queryMode: 'local',
													editable: false
												}
											]
										},
										{//FromTo DateTime
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'datetimelocalfield',
													flex: 1,
													placeholder: { type: 'bundle', key: 'equipmentSettingStDt' },
													reference: 'refStartrTime',
													bind: {
														value: '{theHatchEq.workStDt}',
													},
													required: true,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y H:i' , //
												},
												{
													xtype: 'spacer',
													width: 3
												},
												{
													xtype: 'datetimelocalfield',
													flex: 1,
													reference: 'refEndTime',
													placeholder: { type: 'bundle', key: 'equipmentSettingEndDt' },
													bind: {
														value: '{theHatchEq.workEndDt}',
													},
													required: false,
													clearable: true,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y H:i' , //
												}
											]
										},
										{//Eq/Facility
											xype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'combobox',
													flex: 1,
													reference: 'refEqNo',
													bind: {
														store: '{equipmentCombo}', //'{equipmentCombo2}',
														value: '{theHatchEq.eqFacNo}',
													},
													placeholder: { type: 'bundle', key: 'equipmentSettingEqfacno' },
													//required: true,
													displayField: 'eqFacNm',
													valueField: 'eqFacNo',
													queryMode: 'local',
													clearable: true,
													typeAhead: true,
													editable: false,
													//							required: true
												},
												{
													xtype: 'spacer',
													width: 3
												},
												{
													xtype: 'combobox',
													flex: 1,
													reference: 'refFacility',
													bind: {
														store: '{facilityCombo}',
														value: '{theHatchEq.facility}',
													},
													placeholder: 'Facility',
													displayField: 'eqFacNm',
													valueField: 'eqFacNo',
													queryMode: 'local',
													clearable: true,
													typeAhead: true,
													editable: false,
												}
											]
										},
										{//Remark
											xtype: 'textfield', //'textareafield',
											name: 'remark',
											margin: '5 5 0 0',
											bind: {
												value: '{theHatchEq.remark}',
											},
											placeholder: { type: 'bundle', key: 'equipmentSettingRemark' },
											//height: 60,
											maxLength: 150,
											maxRows: 1,
											//maxHeight: 60
											listeners: {
												change: function (ref) {
													var value = ref.getValue();
													var cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
													if (cleaned !== value) {
														ref.setValue(cleaned, true);
													}
												}
											}
										}
									]
								}
							]
						},
						{
							//OGA //Health:
							xtype: 'fieldset',
							reference: 'refOGAInfoContainer',
							scrollable: true,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							padding: '0 0 0 8',
							defaults: {
								margin: '5 5 0 0',
							},
							items: [
								{
									xtype: 'textfield',
									label: { type: 'bundle', key: 'hht_oga' },
									labelAlign: 'left',
									labelTextAlign: 'right',
									labelWidth: 50,
									flex: 1,
									bind: {
										value: '{theVslCallId.ogaStatus}'
									},
									reference: 'txtOGAStatus',
									readOnly: true,
								},
								{
									xtype: 'textfield',
									flex: 1,
									reference: 'txtOGADate',
									bind: {
										value: '{theVslCallId.ogaStatusDate}'
									},
									readOnly: true,
								},
								{
									xtype: 'textfield',
									flex: 1,
									reference: 'txtOGAQuarantine',
									bind: {
										value: '{theVslCallId.ogaQuarantine}'
									},
									//ui: 'field-yellow',
									readOnly: true,
									
								}
							]
						},
						{
							xtype: 'container',
							reference: 'refButtonContainer',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							margin: '5 5 5 5',
							items: [
								{
									xtype: 'button',
									reference: 'refBtnHatchEqRetrieve',
									flex: 1,
									text: 'Retrieve',
									ui: 'retrieve-button-modern',
									handler: 'onTblRetrieve',
								}, {
									xtype: 'spacer',
									width: 3
								},
								{
									xtype: 'button',
									reference: 'btnClearHHT',
									flex: 1,
									text: 'Clear',
									ui: 'clear-button-modern',
									handler: 'onTblClear'
								}, {
									xtype: 'spacer',
									width: 3
								}, {
									xtype: 'button',
									reference: 'refBtnCreateHHT',
									flex: 1,
									text: 'Add',
									ui: 'create-button-modern',
									handler: 'onTblCreate'
								}, {
									xtype: 'spacer',
									width: 3
								},
								{
									xtype: 'button',
									reference: 'btnUpdateHHT',
									flex: 1,
									text: 'Update',
									ui: 'update-button-modern',
									handler: 'onTblUpdate'
								}, {
									xtype: 'spacer',
									width: 3
								}, {
									xtype: 'button',
									reference: 'btnDeleteHHT',
									flex: 1,
									text: 'Delete',
									ui: 'delete-button-modern',
									handler: 'onTblDelete'
								}
							]
						}
					]
				},
				{//Row 2: Grid Component:
					xtype: 'grid',
					margin: '5 5 5 5',
					responsiveConfig: {
						small: {
							flex: 1
						},
						large: {
							flex: undefined,
							height: 300
						}
					},
					reference: 'refHatchEqGrid',
					listeners: {
						select: 'onTblSelectHatchEqGrid'
					},
					bind: {
						store: '{vesselOprSettingList}'
					},
					selectable: {
						columns: false,
						rows: true,
						cells: false,
						mode: 'single',
						headerCheckbox: false,
					},
					columns: [
						{
							text: 'No',
							xtype: 'rownumberer',
							width: 50,
							align: 'center'

						},
						{
							text: { type: 'bundle', key: 'equipmentSettingHatchno' },
							dataIndex: 'hatchNo',
							width: 100,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingWorkstdt' },
							dataIndex: 'workStDt',
							width: 170,
							xtype: 'datecolumn',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingWorkenddt' },
							dataIndex: 'workEndDt',
							width: 170,
							xtype: 'datecolumn',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingCgtpcd' },
							dataIndex: 'cgTpCd',
							width: 110,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingEqfacno' },
							dataIndex: 'eqFacNo',
							width: 180,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingWorkymd' },
							dataIndex: 'workYmd',
							width: 120,
							xtype: 'datecolumn',
							format: MOST.config.Locale.getShortDate(),
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingShftnm' },
							dataIndex: 'shftNm',
							reference: 'refShftNm',
							width: 60,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingHatchdrtcd' },		// AP, FP
							dataIndex: 'hatchDrtCd',
							width: 80,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingTopclean' },
							dataIndex: 'topClean',
							width: 100,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingFacilityname' },
							dataIndex: 'facility',
							width: 170,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingFacilityname' },
							dataIndex: 'facilityName',
							width: 170,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingDptagent' },
							dataIndex: 'dptAgent',
							reference: 'refDptAgent',
							width: 170,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingRemark' },
							dataIndex: 'remark',
							width: 280,
						},
						{
							text: { type: 'bundle', key: 'equipmentSettingVslshiftingyn' },
							dataIndex: 'vslShiftingYN',
							width: 150
						}
					]
				},
				{ //Detail Cargo Top Clean:
					xtype: 'container',
					reference: 'refDetailCargoTopClean',
					layout: 'hbox',
					flex: 1,
					hidden: true,
					items: [/*{
							xtype: 'label',
							html: 'Detail Cargo Top/Clean:',
							style: 'font-size: 14px; font-weight: 600; margin: 15px 0px 5px 10px',
						},*/
						{
							xtype: 'grid',
							/*responsiveConfig: {
								small: {
									flex: 1
								},
								large: {
									flex: undefined,
									height: 200
								}
							},*/
							selectable: {
								columns: false,
								rows: true,
								cells: false,
								mode: 'single',
								headerCheckbox: false,
							},
							reference: 'refCgTopCleanGrid',
							bind: {
								store: '{detailCgTopCleanList}'
							},
							columns: [
								{
									text: 'N.o',
									xtype: 'rownumberer',
									width: 60,
									align: 'center'
								},
								{
									text: { type: 'bundle', key: 'equipmentSettingTblCgopr' }, //'Cg OPR',
									dataIndex: 'cgOptTpCd',
									width: 80
								},
								{
									text: { type: 'bundle', key: 'equipmentSettingTblCgTp' },
									dataIndex: 'cgTpCd',
									width: 80,
									format: MOST.config.Locale.getShortDate(),
								},
								{
									text: { type: 'bundle', key: 'equipmentSettingTblcmdt' },
									dataIndex: 'cmdtCd',
									width: 120
								},
								{
									text: { type: 'bundle', key: 'equipmentSettingTblhatch' },
									dataIndex: 'workHatchNo',
									width: 80
								},
								{
									text: { type: 'bundle', key: 'equipmentSettingTbltopclean' },
									dataIndex: 'topCln',
									width: 100
								}
							]

						}
					]
				},
				//{//Row1: button, working date, shift / health, progress
				// 	xtype: 'fieldset',
				// 	hidden: false,
				// 	layout: {
				// 		type: 'hbox',
				// 		align: 'stretch'
				// 	},
				// 	items: [
				// 		{
				// 			xtype: 'button',
				// 			reference: 'refBtnHatchEqRetrieve',
				// 			iconCls: 'x-fa fa-search',
				// 			text: 'Retrieve',
				// 			handler: 'onTblRetrieve',
				// 			width: 140,
				// 			ui: 'action',
				// 		},
				// 		{
				// 			//Working Date + shift
				// 			xtype: 'fieldset',
				// 			flex: 1,
				// 			layout: {
				// 				type: 'hbox',
				// 				align: 'right'
				// 			},
				// 			items: [
				// 				{
				// 					xtype: 'datefield',
				// 					reference: 'refDtWorkDate',
				// 					flex: 1,
				// 					dateFormat: 'd/m/Y',
				// 					label: { type: 'bundle', key: 'workingYMD' },
				// 					labelWidth: 90,
				// 					labelAlign: 'left',
				// 					//bind: {
				// 					//value: '{theHatchEq.workYmd}'
				// 					//},
				// 					readOnly: false,
				// 					editable: false,
				// 					disabled: false
				// 				},
				// 				{
				// 					xtype: 'combobox',
				// 					flex: 1,
				// 					reference: 'refCbxShftvvvvvvvvvv',
				// 					style: 'margin-left: 20px',
				// 					bind: {
				// 						store: '{opeShiftCombo}',
				// 						//value: '{theHatchEq.shftId}'
				// 					},
				// 					label: { type: 'bundle', key: 'equipmentSettingShftnm' },
				// 					labelAlign: 'left',
				// 					displayField: 'shftNm',
				// 					valueField: 'shftId',
				// 					queryMode: 'local',
				// 					clearable: true,
				// 					typeAhead: true,
				// 					labelWidth: 70,
				// 					readOnly: false,
				// 					editable: true,
				// 					disabled: false
				// 				}
				// 			]
				// 		}
				// 	]
				// },
			]
		}
	]
});