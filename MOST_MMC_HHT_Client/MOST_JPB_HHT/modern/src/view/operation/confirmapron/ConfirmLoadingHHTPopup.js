Ext.define('MOST.view.operation.confirmapron.ConfirmLoadingHHTPopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-confirmloadinghhtpopup',

	requires: [
		'MOST.view.operation.ConfirmLoadingHHTPopupModel',
		'MOST.view.operation.ConfirmLoadingHHTPopupController',
		'MOST.view.common.DateTimeLocalField'
	],
	
	//title: 'Confirm Loading',
	controller: 'confirmloadinghhtpopup',
	viewModel: {
		type: 'confirmloadinghhtpopup'
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
	items: [
		{
			xtype: 'formpanel',
			reference: 'refFrmCfrmLoading',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [/******************* Horizontal Design *******************/
				{//Row1
					xtype: 'container',
					margin: '10 0 0 0',
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							layout: 'hbox',
							flex: 2,
							items:[
								{// SN, Hatch, Start/End DateTime
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
											reference: 'refTxtCfmLoadingSn',
											label: { type: 'bundle', key: 'confirmLoadingSn' },
											bind: '{theDetail.shipgNoteNo}',
											readOnly: true
										},
										{
											xtype: 'combobox',
											reference: 'refCboCmcHatchNo',
											bind: {
												store: '{confirmLoadingHatchCombo}',
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
											reference: 'refConfirmLoadingStartDt',
											label: {type: 'bundle', key: 'startTime'},
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
											bind: {
												value: '{theDetail.startDt}',
											},
											required: true
										},
										{
											xtype: 'datetimelocalfield',
											reference: 'refConfirmLoadingEndDt',
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
										{// GR, DeliveryType
											xtype: 'container',
											layout: 'hbox',
											defaults: {
												labelAlign: 'left',
												labelTextAlign: 'right',
												labelWidth: 100
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'refTxtCfmLoadingGr',
													flex: 1,
													label: { type: 'bundle', key: 'confirmLoadingGr' },
													bind:{
														value: '{theDetail.grNo}'
													},
													readOnly: true
												},
//												{
//													xtype: 'textfield',
//													reference: 'refTxtCfmLoadingDelvTpNm',
//													margin: '0 0 0 5',
//													flex: 1,
//													//label: { type: 'bundle', key: 'delvMode'},
//													labelTextAlign: 'left',
//													bind: {
//														value: '{theDetail.opDelvTpNm}',	
//													},
//													readOnly: true
//												}
											]
										},
										{
											xtype: 'combobox',
											reference: 'refCboCfmLoadingEq',
											label: { type: 'bundle', key: 'confirmLoadingEquipment'},
											editable: true,
											bind:{
												store: '{deployedEquipmentNoList}',
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
											queryMode: 'local',
											label: { type: 'bundle', key: 'confirmLoadingModeOfOpr'},
											bind: {
												store: '{confirmLoadingForModeOfOprCombo}',
												value: '{theDetail.tsptTpCd}'
											},
											listeners: {
												//change: 'onChangeTransModeHHT'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											required: true,
											editable: false,
											readOnly: true,
											disabled: true,
										},
										{												
											xtype: 'textfield',
											reference: 'refTxtPkgNo',
											label: { type: 'bundle', key: 'confirmLoadingPackageNo'},
											bind:{
												value : '{theDetail.pkgNo}'
											},
											clearable: false,
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
								}
							]

						},
						{//Customs, GangNo, CargoType, PackageType
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
									reference: 'refTxtCfmLoadingCustMode',
									label: { type: 'bundle', key: 'confirmLoadingClearance'},
									bind: {
										value: '{theDetail.custMode}',
									},
									readOnly: true
								},
								{
									xtype: 'combobox',
									reference:"refConfirmLoadingHatchDrt",
									label: { type: 'bundle', key: 'apFp'},
									queryMode: 'local',
									bind: {
										store: '{confirmLoadingHatchDrtCombo}',
										value: '{theDetail.hatchDrt}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									forceSelection:true,
								},
								{
									xtype: 'textfield',
									reference: 'refTxtCfmLoadingPkgTp',
									label: { type: 'bundle', key: 'hht_pkg_tp'},
									bind: {
										value: '{theDetail.rePkgTpCd}'
									},
									readOnly: true
								},
								{
									xtype: 'textfield',
									reference: 'refTxtCfmLoadingCgTp',
									label: { type: 'bundle', key: 'confirmLoadingCargoType'},
									bind: {
										value: '{theDetail.cgTpCdNm}'
									},
									readOnly: true
									
								},
							]
						}
						
					]
				},
				
				{//Row2
					xtype: 'fieldset',
					style: 'border-top: 1px solid gray;',
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
						{//Doc Amount Block
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
										margin: '0 0 0 0',
										labelAlign: 'center',
										style: {
											'text-align': 'center',
											'font-weight': 800
										},
									},
									items: [
										{
											xtype: 'spacer',
											width: '80'
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
								{//DOC SN AMT
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
										{//row SN Amount
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													margin: '2 0 0 0',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmLoadingSnDocAmt' }
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.snQty}',
													ui: 'field-numbercolormodern',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.snMt}',
													ui: 'field-numbercolormodern',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.snM3}',
													ui: 'field-numbercolormodern',
													readOnly: true
												}
											]
										},
										{//row Loaded
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													margin: '2 0 0 0',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmLoadingSnLoadingAmt' }
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.accuSumQty}',
													ui: 'field-numbercolormodern',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.accuSumWgt}',
													ui: 'field-numbercolormodern',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.accuSumMsrmt}',
													ui: 'field-numbercolormodern',
													readOnly: true
												}
											]
										},
										{//row GR
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													margin: '2 0 0 0',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90,
													html: { type: 'bundle', key: 'confirmLoadingGrDocAmt' }
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.docQty}',
													ui: 'field-numbercolormodern',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.docMt}',
													ui: 'field-numbercolormodern',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.docM3}',
													ui: 'field-numbercolormodern',
													readOnly: true
												}
											]
										},
									]
								},
							]
						},
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
								{
									xtype: 'container',
									height: 18,
								},
//								{
//									xtype: 'textfield',
//									label: { type: 'bundle', key: 'freightTon'},
//									bind: '{theDetail.freightTon}',
//									fieldStyle: 'text-transform:uppercase',
//									enforceMaxLength : true,
//									readOnly: true,
//								},
								{
									xtype: 'checkboxfield',
									reference: 'refChkCfmLoadingFinalLoad',
									width: 200,
									labelAlign: 'right',
									labelTextAlign: 'left',
									bind: '{fnlOpeYnChecked}',
									name: 'finalLoad',
									label: {type: 'bundle', key: 'fnlOpeYn'},
								}
							]

						}
					]
				},
				
				{//Row3
					xtype: 'fieldset',
					padding	: '5 0 5 5',
					style: 'border-top: 1px solid gray;',
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
										{//Raido Gate to Vessel
											xtype: 'radiofield',
											//flex: 1,
											width: 200,
											reference: 'refRadioCfmLoadingAV',
											name: 'loadingType',
											value: 'AV',
											boxLabel: { type: 'bundle', key: 'confirmLoadingAV' },
											listeners: {
												change: 'onCheckLoadingType'
											},
											disabled: true,

										},
										{//Radio Gate to vessel
											xtype: 'radiofield',
											//flex: 1,
											width: 200,
											labelAlign: 'right',
											reference: 'refRadioCfmLoadingGV',
											name: 'loadingType',
											value: 'GV',
											boxLabel: { type: 'bundle', key: 'confirmLoadingGV' },
											listeners: {
												change: 'onCheckLoadingType'
											},
											disabled: true,
										},
										{//Radio Barge to vessel
											xtype: 'radiofield',
											//flex: 1,
											width: 200,
											labelAlign: 'right',
											reference: 'refRadioCfmLoadingBV',
											name: 'loadingType',
											value: 'BV',
											boxLabel: { type: 'bundle', key: 'bargeToVessel' },
											listeners: {
												change: 'onCheckLoadingType'
											},
											disabled: true,
										}
										
									]
								},

								{//Gate to vessel Control
									xtype: 'container',
									reference: 'refCtnConfirmLoadingGV',
									hidden: false,
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

										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90, //Label
													html: { type: 'bundle', key: 'confirmLoadingBalAmt' }
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.balQty}',
													ui: 'field-yellow',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.balMt}',
													ui: 'field-yellow',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.balM3}',
													ui: 'field-yellow',
													readOnly: true,
												}
											]
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90, //Label
													html: { type: 'bundle', key: 'confirmLoadingLoadingAmt' }
												},
												{
													xtype: 'numberfield',
													reference: 'refLoadGvQty', //'refConfirmLoadingQty',
													minValue: 0,
													selectOnFocus: true,
													flex: 1,
													bind: {
														value: '{theDetail.loadGvQty}',
													},
													ui: 'fieldnumberhht',
													allowBlank: false,
													listeners: {
														change: 'onChangeHandlingAmt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refLoadGvMt',//'refConfirmLoadingMt',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.loadGvMt}',
													ui: 'fieldnumberhht',
													hideTrigger: true,
													listeners: {
														//change: 'onChangeHandlingAmt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refLoadGvM3', //'refConfirmLoadingM3',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.loadGvM3}',
													ui: 'fieldnumberhht',
													hideTrigger: true,
													listeners: {
														//change: 'onChangeHandlingAmt'
													}
												}
											]
										},

									]
								},

								{//Apron to vessel,
									xtype: 'container',
									reference: 'refCtnConfirmLoadingAV',
									hidden: false,
									defaults: {
										margin: '0 0 0 0',
										//labelAlign: 'right',
										//labelWidth: 100,
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
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90, //Label
													html: { type: 'bundle', key: 'confirmLoadingApronBal' }
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.avBalQty}',
													ui: 'field-yellow',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.avBalMt}',
													ui: 'field-yellow',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.avBalM3}',
													ui: 'field-yellow',
													readOnly: true
												}
											]
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90, //Label
													html: { type: 'bundle', key: 'confirmLoadingApronAmt' }
												},
												{
													xtype: 'numberfield',
													reference: 'refLoadAvQty',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.loadAvQty}',
													ui: 'fieldnumberhht',
													listeners: {
														//change: 'onChangeHandlingAmt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refLoadAvMt',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.loadAvMt}',
													ui: 'fieldnumberhht',
													hideTrigger: true,
													listeners: {
														//change: 'onChangeHandlingAmt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refLoadAvM3',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.loadAvM3}',
													ui: 'fieldnumberhht',
													hideTrigger: true,
													listeners: {
														//change: 'onChangeHandlingAmt'
													}
												}

											]
										},

									]
								},
								
								{//Barge to vessel Control
									xtype: 'container',
									reference: 'refCtnConfirmLoadingBV',
									hidden: false,
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

										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													padding: '0 3 0 0',
													style: {
														'text-align': 'right'
													},
													width: 90, //Label
													html: { type: 'bundle', key: 'confirmLoadingBalAmt' }
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.balQty}',
													ui: 'field-yellow',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.balMt}',
													ui: 'field-yellow',
													readOnly: true
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind: '{theDetail.balM3}',
													ui: 'field-yellow',
													readOnly: true,
												}
											]
										},
										{//row
											xtype: 'container',
											items: [
//												{
//													xtype: 'label',
//													padding: '0 3 0 0',
//													style: {
//														'text-align': 'right'
//													},
//													width: 90, //Label
//													html: { type: 'bundle', key: 'confirmLoadingLoadingAmt' }
//												},
												{
													xtype: 'container',
													layout: 'hbox',
													margin: '0 2 0 0',
													items: [
														{
															xtype: 'button',
										    	            text: '',
										    	            handler: 'onHangingScaleFetch_clickHandler',
										    	            width: 90,
										    	            ui: 'delete-button-modern',
										    	            iconCls: 'x-fa fa-refresh'
														},
													]
													
												},

												{
													xtype: 'numberfield',
													reference: 'refLoadBvQty', //'refConfirmLoadingQty',
													minValue: 0,
													selectOnFocus: true,
													flex: 1,
													bind: {
														value: '{theDetail.loadBvQty}',
													},
													ui: 'fieldnumberhht',
													allowBlank: false,
													listeners: {
														change: 'onChangeHandlingAmt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refLoadBvMt',//'refConfirmLoadingMt',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.loadBvMt}',
													ui: 'fieldnumberhht',
													hideTrigger: true,
													listeners: {
														//change: 'onChangeHandlingAmt'
													}
												},
												{
													xtype: 'spacer',
													width: 5
												},
												{
													xtype: 'numberfield',
													reference: 'refLoadBvM3', //'refConfirmLoadingM3',
													minValue: 0,
													maxValue: 9999999.999,
													decimals: 3,
													selectOnFocus: true,
													flex: 1,
													bind: '{theDetail.loadBvM3}',
													ui: 'fieldnumberhht',
													hideTrigger: true,
													listeners: {
														//change: 'onChangeHandlingAmt'
													}
												}
											]
										},

									]
								},
								
								{//Remark
									xtype: 'container',
									layout: 'hbox',
									items: [
										{
											xtype: 'label',
											padding: '0 3 0 0',
											style: {
												'text-align': 'right'
											},
											width: 90,
											html: { type: 'bundle', key: 'remark' }
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind: '{theDetail.rmk}',
											ui: 'field-inputtextmodern'
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
							items: [ 	
								{
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
											reference: 'refBtnCfmLoadingDamage',
											width: 120,
											ui: 'retrieve-button-modern',
											text: 'Damage',
											value: 'damagecheckhht',
											handler: 'onOpenTblDamageCheck',
											hidden: true
										},
									]
									
								},
								{
									xtype: 'container',
									reference: 'refTruckFieldContainer',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									margin: '0 0 0 0',
									defaults: {
										labelAlign: 'left',
										labelTextAlign: 'right',
										labelWidth: 100,
										margin: '0 0 0 0'
									},
									items: [
										{
											xtype: 'textfield',
											editable: false,
											reference: 'refTxtCfmLoadingLorryNo',
											flex: 1,
											label: { type: 'bundle', key: 'confirmLoadingLorryNo' },
											bind: {
												value: '{theDetail.lorryNo}',
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
									]
								},
								
								{
									xtype: 'container',
									reference: 'refBargeFieldContainer',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									margin: '0 0 0 0',
									defaults: {
										labelAlign: 'left',
										labelTextAlign: 'right',
										labelWidth: 100,
										margin: '0 0 0 0'
									},
									items: [
										{
											xtype: 'textfield',
											editable: false,
											reference: 'refTxtCfmLoadingBargeNo',
											flex: 1,
											label: { type: 'bundle', key: 'bargeNo' },
											bind: {
												value: '{theDetail.bargeNo}',
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
									]
								}
							]
						},
					]
				},
				{//Row4: button Confirm Cancel
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'end'
					},
					margin: '5 0 10 0',
					items: [
						{
							xtype: 'spacer',
							flex: 1
						},
						{
							xtype: 'button',
							reference: 'refBtnCfmLoadingDamage',
							width: 150,
							ui: 'retrieve-button-modern',
							text: 'Damage',
							value: 'damagecheckhht',
							handler: 'onOpenTblDamageCheck'
						},
						{
							xtype: 'spacer',
							width: 5
						},
						{
							xtype: 'button',
							reference: 'refBtnConfirmLoadingSave',
							text: { type: 'bundle', key: 'hht_btn_confirm' },
							width: 150,
							ui: 'action',
							iconCls: 'x-fa fa-floppy-o',
							handler: 'onDetailSaveHHT'
						},
						{
							xtype: 'spacer',
							width: 5
						},
						{
							xtype: 'button',
							text: { type: 'bundle', key: 'hht_btn_cancel' },
							width: 150,
							ui: 'delete-button-modern',
							iconCls: 'x-fa fa-times',
							handler: 'onCancelHHT'
						}
					]
				},
				{//Row5
					xtype: 'container',
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
					]
				},
			]
		}
	]
});