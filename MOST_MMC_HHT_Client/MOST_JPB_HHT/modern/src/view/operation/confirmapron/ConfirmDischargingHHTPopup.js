Ext.define('MOST.view.operation.confirmapron.ConfirmDischargingHHTPopup', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-confirmdischarginghhtpopup',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'MOST.view.operation.ConfirmDischargingHHTPopupController',
        'MOST.view.operation.ConfirmDischargingHHTPopupModel',
        'MOST.view.common.DateTimeLocalField',
		'MOST.view.usercontrol.WebSocketStatusField',
		'MOST.websocket.WebSocketClient',
    ],
    
    reference: 'refConfirmDischargingHHTPopup',
    controller: 'confirmdischarginghhtpopup',
    viewModel: {
        type: 'confirmdischarginghhtpopup'
    },
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	shadow: true,
	padding: 0,
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	maxWidth: 1300,
	minHeigh: 600,
	listeners: {
		painted: 'onLoad'
	},
	closeAction: 'destroy',
	scrollable: true,
    tools: [
		{
			xtype: 'websocketstatusfield',
			reference: 'refWsStatus',
		},
		{
            xtype: 'spacer',
            width: 10
        },
        {
        	type: 'refresh',
        	handler: 'onRefresh'
        },
		{
            xtype: 'spacer',
            flex: 1
        },
	],

    /*
     * ***************************************************************
     * */
    
    items: [
    	{
			xtype: 'formpanel',
			reference: 'refFrmCfrmDischarging',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
		    	{//Row1
					xtype: 'container',
					margin: '10 0 0 0',
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
						{//Row1.Col1:
							xtype: 'container',
							layout: 'hbox',
							flex: 2,
							items:[
								{//Row1.Col1.Col1 BL, Hatch, Start/End DateTime
									xtype: 'container',
									layout: {
										type: 'vbox',
										//align: 'stretch'
									},
									flex: 1,
									defaults: {
										labelAlign: 'left',
										labelTextAlign: 'right',
										labelWidth: 90
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refTxtCfmDischargingBl',
											label: { type: 'bundle', key: 'blno' },
											bind: '{theDetail.blNo}',
											readOnly: true
										},
										{
											xtype: 'combobox',
											reference: 'refCboCmcHatchNo',
											bind: {
												store: '{hatchNoCombo}',
												value: '{theDetail.hatchNo}',
											},
											label: {type: 'bundle', key: 'confirmLoadingHatchNo'},
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local',
											clearable: false,
											required: true,
											typeAhead: true,
											forceSelection: true,
										},
										{
											xtype: 'datetimelocalfield',
											reference: 'refTxtCfmDischargingStartDt',
											label: {type: 'bundle', key: 'startTime'},
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
											bind: {
												value: '{theDetail.startDt}',
											},
											required: true
										},
										{
											xtype: 'datetimelocalfield',
											reference: 'refTxtCfmDischargingEndDt',
											label: {type: 'bundle', key: 'endTime'},
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
											bind: {
												value: '{theDetail.endDt}',
											},
											required: false,
											readOnly: true,
										}
									]
								},
								
								//Row1.Col1.Col2 EQ No, delv Mode, Package No.
								{
									xtype: 'container',
									layout: {
										type: 'vbox',
										//align: 'stretch'
									},
									flex: 1,
									defaults: {
										labelAlign: 'left',
										labelTextAlign: 'right',
										labelWidth: 100
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refTxtCfmDischargingDelvTpNm',
											label: { type: 'bundle', key: 'delvMode'},
											bind: {
												value: '{theDetail.delvTpNm}',	
											},
											readOnly: true
										},
										{
											xtype: 'combobox',
											reference: 'refCboCfmDischargingEq',
											label: { type: 'bundle', key: 'confirmLoadingEquipment'},
											editable: true,
											bind:{
												store: '{equipmentNoList}',
												value:'{theDetail.eqNo}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local',
											forceSelection: true,
											clearable: true
										},
										{
											xtype: 'combobox',
											reference: 'refCboCfmDischargingTsptTpCd',
											queryMode: 'local',
											label: { type: 'bundle', key: 'confirmLoadingModeOfOpr'},
											bind: {
												store: '{modeOfOprCombo}',
												value: '{theDetail.tsptTpCd}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											required: true,
											editable: false,
											readOnly: true
										},
										{											
											xtype: 'textfield',
											reference: 'refTxtCfmDischargingPkgNo',
											label: { type: 'bundle', key: 'confirmLoadingPackageNo'},
											bind:{
												value : '{theDetail.pkgNo}'
											},
											editable: false,
											listeners: {
												change: function(field, newValue){
													field.setValue(newValue.toUpperCase());
												},
											},
											triggers: {
												someField: {
													iconCls: 'x-fa fa-search',
													ui: 'retrieve-button-modern',
													scope: 'controller',
													handler: 'onOpenPackageNoPopup'
												}
											},
										},
									]
								},
								
								{//Row1.Col2: Customs, CargoType, PackageType
									xtype: 'container',
									layout: 'vbox',
									defaults: {
										labelAlign: 'left',
										labelTextAlign: 'right',
										labelWidth: 100
									},
									flex: 1,
									items:[
										{
											xtype: 'textfield',
											reference: 'refTxtCfmDischargingCustMode',
											label: { type: 'bundle', key: 'confirmLoadingClearance'},
											bind: {
												value: '{theDetail.custMode}',
											},
											readOnly: true,
										},
										{
											xtype: 'combobox',
											reference:"refConfirmDischargingHatchDrt",
											label: { type: 'bundle', key: 'apFp'},
											queryMode: 'local',
											bind: {
												store: '{confirmDischargingHatchDrtCombo}',
												value: '{theDetail.hatchDrt}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection:true,
										},
										{
											xtype: 'textfield',
											reference: 'refTxtCfmDischargingPkgTp',
											label: { type: 'bundle', key: 'hht_pkg_tp'},
											bind: {
												value: '{theDetail.rePkgTpCd}'
											},
											editable: false,
											triggers: {
												someField: {
													iconCls: 'x-fa fa-search',
													ui: 'retrieve-button-modern',
													scope: 'controller',
													handler: 'onOpenPackageTypePopup'
												}
											}
										},
										{
											xtype: 'textfield',
											reference: 'refTxtCfmDischargingCgTp',
											label: { type: 'bundle', key: 'confirmLoadingCargoType'},
											bind: {
												value: '{theDetail.cgTpNm}'
											},
											readOnly: true
										},
									]
								}
							]
						},
					]
		    	},
		    	//Row 2: Amount information
		    	{
					xtype: 'fieldset',
					style: 'border-top: 1px solid gray;',
					margin: '10 0 0 0',
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
						//Col 1: //Doc Amount Block
						{
							xtype: 'container',
							layout: 'vbox',
							flex: 2,
							items: [
								{//LABEL : Doc MT Bal Act:
									xtype: 'container',
									layout: {
										type: 'hbox',
										//align: 'stretch'
									},
									defaults: {
										margin: '10 0 0 0',
										labelAlign: 'center',
										style: {
											'text-align': 'center',
											//'font-weight': 800
										},
									},
									items: [
										{
											xtype: 'spacer',
											width: '90'
										},
										{
											xtype: 'label',
											html: 'QTY',
											flex: 1
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'label',
											html: 'MT',
											flex: 1
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'label',
											html: 'M3',
											flex: 1
										}
									]
								},
								{//DOC Amount
									xtype: 'container',
									defaults: {
										margin: '0 0 0 0',
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											margin: '0 0 0 0',
											textAlign: 'center',
										}
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{//row Doc Amount
											xtype: 'container',
											margin: '0 0 0 0',
											items: [
												{
													xtype: 'label',
													padding: '5 10 0 0',
													style: {
														'text-align': 'right'
													},
													width: 80,
													html: 'DOC Amt'
												},
												{
													xtype: 'numberfield',
													flex: 1,
													ui: 'field-numbercolormodern',
													minValue: 0,
													maxValue: 9999999,
													bind: {
														value: '{theDetail.qty}'
													},
													clearable: false,
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													flex: 1,
													ui: 'field-numbercolormodern',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													bind: {
														value: '{theDetail.mt}'
													},
													clearable: false,
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													flex: 1,
													ui: 'field-numbercolormodern',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													bind: {
														value: '{theDetail.m3}'
													},
													clearable: false,
													readOnly: true
												}
											]
										},
										{//Balance Amount
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '5 10 0 0',
													style: {
														'text-align': 'right'
													},
													width: 80,
													html: 'Balance Amt'
												},
												{
													xtype: 'numberfield',
													ui: 'field-yellow',
													flex: 1,
													maxValue: 9999999,
													bind: {
														value: '{theDetail.balQty}',
													},
													clearable: false,
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													ui: 'field-yellow',
													flex: 1,
													maxValue: 9999999.999,
													decimals: 3,
													bind: {
														value: '{theDetail.balMt}',
													},
													clearable: false,
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													ui: 'field-yellow',
													flex: 1,
													maxValue: 9999999.999,
													decimals: 3,
													bind: {
														value: '{theDetail.balM3}',
													},
													clearable: false,
													readOnly: true
												}
											]
										}
									]
								}
							]
						},
						
						//Col2: FInal
						{
							xtype: 'container',
							layout: 'vbox',
							defaults: {
								labelAlign: 'left',
								labelTextAlign: 'right',
								labelWidth: 100
							},
							flex: 1,
							items: [
//								{
//									xtype: 'container',
//									height: 18,
//								},
								{
									xtype: 'checkboxfield',
									reference: 'refChkCfmDischargingFinal',
									width: 230,
									labelWidth: 130,
									labelAlign: 'right',
									labelTextAlign: 'left',
									bind: '{fnlOpeYnChecked}',
									name: 'finalLoad',
									label: 'Final Discharging',
								}
							]

						}
					]
		    	},
		    	
		    	//Row 3: Truck operation
		    	{
					xtype: 'container',
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							layout: 'vbox',
							flex: 2,
							items: [
								{// Radio Control: 
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'left'
									},
									items: [
										{//Vessel to Apron
											xtype: 'radiofield',
											//flex: 1,
											width: 200,
											reference: 'refRadioCfmDischargingVA',
											name: 'loadingType',
											value: 'VA',
											checked: false,
											boxLabel: { type: 'bundle', key: 'confirmDischargingIndirectOperation' },
											listeners: {
												change: 'onChangeDischargingType',
												check: 'onCheckDischargingType'
											}
										},
										{//Vessel to Gate
											xtype: 'radiofield',
											//flex: 1,
											width: 200,
											reference: 'refRadioCfmDischargingVG',
											labelAlign: 'right',
											name: 'loadingType',
											value: 'VG',
											checked: false,
											boxLabel: { type: 'bundle', key: 'confirmDischargingVslToGate' },
											listeners: {
												change: 'onChangeDischargingType',
												check: 'onCheckDischargingType'
											}
										}
									]
								},
								
								{//Amount information: Vessel to Apron
									xtype: 'container',
									reference: 'refCtnCfmDischargingVA',
									hidden: true,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									defaults: {
										margin: '0 0 0 0',
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											textAlign: 'center',
										}
									},
									items: [
										{// Indirect Doc Amount:
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmDischargingInDirectDocAmt' }
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:{
														value : '{theDetail.iqty}'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:{
														value : '{theDetail.imt}'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.im3}'
												},
											]

										},
										{//row Confirm Amount - Indirect
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmDischargingWhAmt' }
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingVaQty',
													minValue: 0,
													maxValue: 9999999,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vaQty}',
													ui: 'numbercolormodern',
													listeners: {
														change: 'onChangeHandlingQty'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingVaMt',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vaMt}',
													ui: 'numbercolormodern',
													hideTrigger: true,
													listeners: {
														change: 'onChangeHandlingMt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingVaM3',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vaM3}',
													ui: 'numbercolormodern',
													hideTrigger: true,
													listeners: {
														change: 'onChangeHandlingM3'
													}
												}
											]
										},

									]
								},
								
								//Amount information: Vessel to Gate
								{//Row: Vessel to Gate
									xtype: 'container',
									reference: 'refCtnCfmDischargingVG',
									hidden: true,
									defaults: {
										margin: '0 0 0 0',
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											margin: '0 0 0 0',
											textAlign: 'center',
										}
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										//Direct doc Amount
										{
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmDischargingDirectDocAmt' }
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.dqty}'
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.dmt}'
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.dm3}'
												}
											]
										},
										{//Confirm Amount
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmDischargingLorryLoad' }
												},
												{
													xtype: 'numberfield',
													ui: 'numbercolormodern',
													reference: 'refTxtCfmDischargingVgQty',
													minValue: 0,
													maxValue: 9999999,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vgQty}',
													listeners: {
														change: 'onChangeHandlingQty'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													ui: 'numbercolormodern',
													reference: 'refTxtCfmDischargingVgMt',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vgMt}',
													hideTrigger: true,
													listeners: {
														change: 'onChangeHandlingMt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													ui: 'numbercolormodern',
													reference: 'refTxtCfmDischargingVgM3',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vgM3}',
													hideTrigger: true,
													listeners: {
														change: 'onChangeHandlingM3'
													}
												}
											]
										},
									]
								}
								
							]
						},
						
						{//Col.Damage, Truck
							xtype: 'container',
							layout: {
								type: 'vbox',
								pack: 'end'
							},
							flex: 1,
							defaults: {
								labelAlign: 'left',
								labelWidth: 80
							},
							items: [
								{//Damage/Dimension Button declare
									xtype: 'container',
									layout: 'hbox',
									margin: '0 0 3 0',
									items: [
										{
											xtype: 'spacer',
											flex: 1
										},
										{
											xtype: 'button',
											hidden: true,
											reference: 'refBtnCfmDischargingDamage',
											width: 150,
											ui: 'delete-button-modern',
											text: { type: 'bundle', key: 'damageCheck' },
											value: 'damagecheckhht',
											handler: 'onOpenTblDamageCheck'
										},
									]
								},
								{
									xtype: 'textfield',
									editable: false,
									readOnly: false,
									reference: 'refConfirmDischargingLorryNo',
									label: { type: 'bundle', key: 'confirmLoadingLorryNo' },
									bind: {
										value: '{theDetail.lorryNo}'
									},
									listeners: {
										change: function(field, newValue){
											field.setValue(newValue.toUpperCase());
										},
									},
									triggers: {
										someField: {
											iconCls: 'x-fa fa-search',
											scope: 'controller',
											handler: 'onOpenTruckPopup'
										}
									},
								},
								{
									xtype: 'textfield',
									label: { type: 'bundle', key: 'remark' },
									bind: '{theDetail.rmk}',
								},
							]
						}
					]
		    	},
		    	
		    	//Row 4: Barge operation
		    	{
					xtype: 'container',
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							layout: 'vbox',
							flex: 2,
							items: [
								{// Radio Control: 
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'left'
									},
									items: [
										{//Vessel to Barge
											xtype: 'radiofield',
											//flex: 1,
											width: 200,
											reference: 'refRadioCfmDischargingVB',
											name: 'loadingType',
											value: 'VB',
											checked: false,
											boxLabel: { type: 'bundle', key: 'vesselToBarge' },
											listeners: {
												//change: 'onChangeDischargingType',
												check: 'onCheckDischargingType'
											}
										},
										{//Apron to Barge
											xtype: 'radiofield',
											//flex: 1,
											width: 200,
											reference: 'refRadioCfmDischargingAB',
											labelAlign: 'right',
											name: 'loadingType',
											value: 'AB',
											checked: false,
											boxLabel: { type: 'bundle', key: 'apronToBarge' },
											listeners: {
												//change: 'onChangeDischargingType',
												check: 'onCheckDischargingType'
											}
										}
									]
								},
								
								{//Row: Vessel to Barge
									xtype: 'container',
									reference: 'refCtnCfmDischargingVB',
									hidden: true,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									defaults: {
										margin: '0 0 0 0',
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											textAlign: 'center',
										}
									},
									items: [
										//Direct Doc Amt
										{
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmDischargingDirectDocAmt' }
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.dqty}'
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.dmt}'
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.dm3}'
												}
											]
										},
										{//confirm amount VB
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmDischargingLorryLoad' }
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingVbQty',
													minValue: 0,
													maxValue: 9999999,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vbQty}',
													ui: 'field-fieldnumbermodern',
													listeners: {
														change: 'onChangeHandlingQty'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingVbMt',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vbMt}',
													ui: 'field-fieldnumbermodern',
													hideTrigger: true,
													listeners: {
														change: 'onChangeHandlingMt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingVbM3',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.vbM3}',
													ui: 'field-fieldnumbermodern',
													hideTrigger: true,
													listeners: {
														change: 'onChangeHandlingM3'
													}
												}
											]
										},
										
									]
								},
								{//Row: Apron to Barge
									xtype: 'container',
									reference: 'refCtnCfmDischargingAB',
									hidden: true,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									defaults: {
										margin: '0 0 0 0',
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											textAlign: 'center',
										}
									},
									items: [
										//Apron bal Amt
										{
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmLoadingApronBal' }
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.aqty}'
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.amt}'
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype : 'numberfield',
													minValue : 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus : true,
													flex: 1,
													readOnly:true,
													bind:'{theDetail.am3}'
												}
											]
										},
										{//confirm amount AB
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmDischargingLorryLoad' }
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingAbQty',
													minValue: 0,
													maxValue: 9999999,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.abQty}',
													ui: 'field-fieldnumbermodern',
													listeners: {
														change: 'onChangeHandlingQty'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingAbMt',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.abMt}',
													ui: 'field-fieldnumbermodern',
													hideTrigger: true,
													listeners: {
														change: 'onChangeHandlingMt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refTxtCfmDischargingAbM3',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.abM3}',
													ui: 'field-fieldnumbermodern',
													hideTrigger: true,
													listeners: {
														change: 'onChangeHandlingM3'
													}
												}
											]
										},
										
									]
								},
								
							]
						},
						//Col2: barge No
						{//Col.barge No
							xtype: 'container',
							layout: 'vbox',
							flex: 1,
							defaults: {
								labelAlign: 'left',
								labelWidth: 80
							},
							items: [
								{
									xtype: 'textfield',
									editable: false,
									reference: 'refConfirmDischargingBargeNo',
									//flex: 1,
									maxLength: 20,
									label: { type: 'bundle', key: 'bargeNo' },
									bind: {
										value: '{theDetail.bargeNo}'
									},
									listeners: {
										change: function(field, newValue){
											field.setValue(newValue.toUpperCase());
										},
									},
									triggers: {
										someField: {
											iconCls: 'x-fa fa-search',
											scope: 'controller',
											handler: 'onOpenBargePopup'
										}
									},
								},
								{
									xtype: 'container',
									flex: 1
								},
								{
									xtype: 'container',
									layout: 'hbox',
									margin: '0 0 5 5',
									items: [
										{
											xtype: 'button',
											reference: 'refScaleAmtBtn',
						    	            text: { type: 'bundle', key: 'scaleAmt' },
						    	            handler: 'onHangingScaleFetch_clickHandler',
						    	            width: 150,
						    	            ui: 'delete-button-modern',
						    	            iconCls: 'x-fa fa-refresh'
										},
									]
									
								},
							]
						}
					]
		    	},
		    	{//Row button Confirm Cancel
		    		xtype: 'container',
		    		layout: {
						type: 'hbox',
						pack: 'end'
					},
		    		items:[
						{
							xtype: 'button',
							reference: 'refBtnCfmDischargingDamage',
							width: 150,
							margin: '0 0 0 10',
							ui: 'retrieve-button-modern',
							text: 'Damage',
							value: 'damagecheckhht',
							handler: 'onOpenTblDamageCheck'
						},
		    	        {
		    	            xtype: 'button',
		    	            text: { type: 'bundle', key: 'confirm' },
		    	            reference: 'refConfirmDCHHTBtn',
		    	            margin: '0 0 0 10',
		    	            width: 150,
		    	            ui: 'action',
		    	            iconCls: 'x-fa fa-floppy-o',
		    	            handler: 'onSave'
		    	        },
		    	        {
		    	            xtype: 'spacer',
		    	            width: 5
		    	        }, 
		    	        {
		    	            xtype: 'button',
		    	            text: { type: 'bundle', key: 'cancel' },
		    	            handler: 'onCancel',
		    	            width: 150,
		    	            ui: 'delete-button-modern',
		    	            iconCls: 'x-fa fa-times'
		    	        },
//		    	        {
//		    	            xtype: 'spacer',
//		    	            width: 10
//		    	        }, 
//		    	        {
//		    	            xtype: 'button',
//		    	            text: 'SEND',
//		    	            handler: 'onSendWebsocket',
//		    	            width: 150,
//		    	            ui: 'action',
//		    	            iconCls: 'x-fa fa-send'
//		    	        },
		    		]
		    	},
			]
    	}
    ]
});
