Ext.define('MOST.view.operation.cmcofwarehouse.ConfirmHandlingInHHTPopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-confirmhandlinginhhtpopup',

	requires: [
		'MOST.view.operation.ConfirmHandlingInHHTPopupController',
		'MOST.view.operation.CargoHandlingInModel',
		'MOST.view.popup.CommonCodePopupHHT',
		'MOST.view.popup.WHCheckerSetLocPopupHHT',
		'MOST.view.popup.WHCheckerUnSetPopupHHT',
	],
	//title: 'Confirm Handling-In',
	controller: 'confirmhandlinginhhtpopup',
	viewModel: {
		type: 'cargohandlingin'
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
		painted: 'onLoadHHT'
	},
	closeAction: 'destroy',
	items: [
		{
			xtype: 'formpanel',
			reference: 'refFrmCfrmHI',
			padding: 5,
			margin: 0,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					//Row1:
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 90
					},
					items: [
						{
							xtype: 'textfield',
							flex: 1,
							reference: 'refSn',
							label: { type: 'bundle', key: 'confirmLoadingSn' },
							bind: '{theDetail.shipgNoteNo}',
							readOnly: true
						},
						{
							xtype: 'textfield',
							reference: 'refTxtGr',
							flex: 1,
							label: { type: 'bundle', key: 'confirmLoadingGr' },
							bind: '{theDetail.grNo}',
							readOnly: true
						}
					]
				}, 
				{
					//Row2:
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 90
					},
					items: [
						{
							xtype: 'datetimelocalfield',
							flex: 1,
							reference: 'refConfirmHdlInStartDt',
							label: {type: 'bundle', key: 'startTime'},
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
							clearable: false,
							editable: true,
							disabled: false,
						},
						{
							xtype: 'combobox',
							flex: 1,
							queryMode: 'local',
							bind: {
								store: '{confirmHandlingInForDeliveryCombo}',
								value: '{theDetail.delvTpCd}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							required: false,
							readOnly: true,
							label: { type: 'bundle', key: 'delvTpCd' }
						}
					]
				},
				{
					//Row3:
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 90
					},
					items: [
						{
							xtype: 'datetimelocalfield',
							flex: 1,
							reference: 'refConfirmHdlInEndDt',
							label: {type: 'bundle', key: 'endTime'},
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
							required: false,
							readOnly: true,
						},
						{
							xtype: 'combobox',
							flex: 1,
							label: { type: 'bundle', key: 'confirmLoadingCargoType'},
							queryMode: 'local',
							reference: 'refCboCargoTp',
							bind: {
								store: '{confirmHandlingInForCargoTypeCombo}',
								value: '{theDetail.cgTpCd}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							readOnly: true
						}
						
					]
				},
				{
					//Row4:
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 90
					},
					items: [
						{
							xtype: 'textfield',
							label: { type: 'bundle', key: 'hht_pkg_tp'},
							reference: 'refConfirmHandlingInPacTypeCode', //Package Type
							flex: 1,
							bind: {
								value: '{theDetail.rePkgTpCd}',
							},
							editable: false,
							triggers: {
								someField: {
									iconCls: 'x-fa fa-search',
									ui: 'retrieve-button-modern',
									scope: 'controller',
									handler: 'onSearchPkgTpHHT'
								}
							}
						},
						{											
							xtype: 'textfield',
							flex: 1,
							reference: 'refTxtPkgNo',
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
				{
					//Row5:
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 90
					},
					items: [
						{
							xtype: 'textfield',
							editable: false,
							required: true,
							reference: 'refLorryNo',
							flex: 1,
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
							xtype: 'container',
							layout: {
								type: 'hbox',
								pack: 'end'
							},
							flex: 1,
							items: [
								{
									xtype: 'checkboxfield',
									flex: 1,
									labelWidth: 73,
									labelAlign: 'right',
									labelTextAlign: 'left',
									reference: 'refConfirmHandlingInFinal',
									bind: '{fnlOpeYnChecked}',
									label: {type: 'bundle', key: 'fnlOpeYn'}
								}
							]
						}
					]
				},
				{
					//Row6:
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'center',
						
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 90,
						margin: '0 0 0 0',
					},
					items: [
						{
							xtype: 'textfield',
							reference: 'refConfirmHILocId',
							flex: 1,
							bind: '{theDetail.locId}',
							ui: 'field-inputcolor',
							required: false,
							editable: false,
							required: true,
							label: { type: 'bundle', key: 'confirmLoadingLocation' }
						}, 
						// {
						// 	xtype: 'spacer',
						// 	width: 5
						// }, 
						{
							xtype: 'container',
							layout: 'hbox',
							flex: 1,
							items: [
								{
									xtype: 'button',
									reference: 'refBtnConfirmHILocation',
									text: { type: 'bundle', key: 'confirmLoadingWhAllocation' },
									ui: 'action',
									margin: '0 0 5 5',
									handler: 'onWarehouseAllocationHHT'
								}
							]
						},
					]
				},
			
				{//Row : MT, M3,... Amount
					xtype: 'container',
					// bind: {
					// hidden: '{refCgConfirmOtherInfoRadio.checked}'
					// },
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{//Left: Doc MT Bal Act:
							xtype: 'container',
							flex: 1.5,
							// autoHeight: true,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{//Title Col:
									//Title Col:
									xtype: 'container',
									layout: {
										type: 'hbox',
										pack: 'center'
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
											width: 90
										}, 
										{
											xtype: 'label',
											html: 'Qty',
											flex: 1
										},

										{
											xtype: 'label',
											html: 'MT',
											flex: 1
										}, 

										{
											xtype: 'label',
											html: 'M3',
											flex: 1
										}, 

									]
								}, {
									//SN Amount
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									hidden: true,
									items: [
										{
											xtype: 'label',
											margin: '0 5 0 0',
											html: {type: 'bundle', key: 'hht_handlingin_whbl_amt'},
											style: {
												'text-align': 'right',
												'padding-top': '6px',
											},
											width: 90,
										},										
										{
											xtype: 'numberfield',
											reference: 'refTxtSnQty', //Qty
											ui: 'field-numbercolormodern',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.snQty}',
											editable: false,
											readOnly: true
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'numberfield',
											reference: 'refTxtSnMt', //MT 
											ui: 'field-numbercolormodern',                             
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.snMt}',
											editable: false,
											readOnly: true
										},
										{
											xtype: 'spacer',
											width: 3
										}, {
											xtype: 'numberfield',
											reference: 'refTxtSnM3', //M3
											ui: 'field-numbercolormodern',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.snM3}',
											editable: false,
											readOnly: true
										},
									]

								}, {
									//Handled Amount:
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: '0 5 0 0',
											html: {type: 'bundle', key: 'hht_handlingin_whin_amt'}, //Handled Amount
											style: {
												'text-align': 'right',
												'padding-top': '6px',
											},
											width: 90,
										},
										{
											xtype: 'numberfield',
											reference: 'refTxtHdledQty', //Qty
											ui: 'field-numbercolormodern',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.accuSumQty}',
											// label: {type: 'bundle', key: 'generalWorkers'},
											editable: false,
											readOnly: true
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'numberfield',
											reference: 'refTxtHdledMt', //MT
											ui: 'field-numbercolormodern',                              
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.accuSumWgt}',
											editable: false,
											readOnly: true
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'numberfield',
											reference: 'refTxtHdledM3',      //M3
											ui: 'field-numbercolormodern',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.accuSumMsrmt}',
											// label: {type: 'bundle', key: 'winchMen'},
											editable: false,
											readOnly: true
										},
									]

								},
								{// WH Balance
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: '0 5 0 0',
											html:  {type: 'bundle', key: 'hht_handlingin_whbl_amt'}, //GR
											style: {
												'text-align': 'right',
												'padding-top': '6px',
											},
											width: 90,
										}, 
										{
											xtype: 'numberfield',
											reference: 'refBalanceQty', //Qty
											//ui: 'field-yellow',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.whBalQty}',
											editable: false,
											readOnly: true
										}, 
										{
											xtype: 'spacer',
											width: 3
										}, 
										{
											xtype: 'numberfield',
											reference: 'refBalanceMT', //MT    
											//ui: 'field-yellow',                          
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.whBalWgt}',
											editable: false,
											readOnly: true
										}, 
										{
											xtype: 'spacer',
											width: 3
										}, 
										{
											xtype: 'numberfield',
											reference: 'refBalanceM3', //M3
											//ui: 'field-yellow',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.whBalMsrmt}',
											editable: false,
											readOnly: true
										} 										 
									]
								},
								{// GR
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: '0 5 0 0',
											html:  {type: 'bundle', key: 'hht_gr_amt'}, //GR
											style: {
												'text-align': 'right',
												'padding-top': '6px',
											},
											width: 90,
										}, 
										{
											xtype: 'numberfield',
											reference: 'refTxtGrQty', //Qty
											ui: 'field-numbercolormodern',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.grQty}',
											// label: {type: 'bundle', key: 'generalWorkers'},
											editable: false,
											readOnly: true
										}, 
										{
											xtype: 'spacer',
											width: 3
										}, 
										{
											xtype: 'numberfield',
											reference: 'refTxtGrMt', //MT 
											ui: 'field-numbercolormodern',                             
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.grMt}',
											editable: false,
											readOnly: true
										}, 
										{
											xtype: 'spacer',
											width: 3
										}, 
										{
											xtype: 'numberfield',
											reference: 'refTxtGrM3', //M3
											ui: 'field-numbercolormodern',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.grM3}',
											// label: {type: 'bundle', key: 'winchMen'},
											editable: false,
											readOnly: true
										} 										 
									]
								},
								/*{//Bal
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
											{
										xtype:'label',
										html: 'B.', //{type: 'bundle', key: 'confirmLoadingNormalBalAmt'},
										width: 70
									},{
										xtype: 'numberfield',
										reference: 'refTxtBalMt', //MT
										flex: 1,
										minValue : 0,
										maxValue: 9999999,
										textAlign: 'right',
										bind:'{theDetail.balMt}',
										editable: false,
										readOnly: true
									},{
										xtype: 'spacer',
										width: 3						
									},{
										xtype: 'numberfield',
										reference: 'refTxtBalM3', //M3
										flex: 1,
										minValue : 0,
										maxValue: 9999999,
										textAlign: 'right',
										bind:'{theDetail.balM3}',
										editable: false,
										readOnly: true
									},{
										xtype: 'spacer',
										width: 3						
									},{
										xtype: 'numberfield',
										reference: 'refTxtBalQty', //Qty
										flex: 1,
										minValue : 0,
										maxValue: 9999999,
										textAlign: 'right',
										bind:'{theDetail.balQty}',
										// label: {type: 'bundle', key: 'generalWorkers'},
										editable: false,
										readOnly: true
									}]
								},*/
								{//Actual
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: '0 5 0 0',
											html: {type: 'bundle', key: 'hht_handlingin_load_amt'}, //{type: 'bundle', key: 'confirmLoadingActualAmt'},
											style: {
												'text-align': 'right',
												'padding-top': '6px',
											},
											width: 90,
										},
										{
											xtype: 'numberfield',
											reference: 'refTxtHIQty',//Qty
											ui: 'fieldnumberhht',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.pkgQty}',
											// label: {type: 'bundle', key: 'generalWorkers'},
											required: true,
											listeners: {
												change: 'onChangeQty'
											}
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'numberfield',
											reference: 'refTxtHIMt', //MT
											ui: 'fieldnumberhht',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.wgt}',
											// label: {type: 'bundle', key: 'supervisor'},
											required: true,
											listeners: {
												change: 'onChangeMt'
											}
										},
										{
											xtype: 'spacer',
											width: 3
										},
										{
											xtype: 'numberfield',
											reference: 'refTxtHIM3', //M3
											ui: 'fieldnumberhht',
											flex: 1,
											minValue: 0,
											maxValue: 9999999,
											textAlign: 'right',
											bind: '{theDetail.msrmt}',
											// label: {type: 'bundle', key: 'winchMen'},
											//required: true,
											listeners: {
												change: 'onChangeM3'
											}
										},										
									]
								},
								{
									// HIDDEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
									xtype: 'container',
									hidden: true,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											html: 'Bal.',
											width: 80
										},
										{
											xtype: 'numberfield',
											minValue: 0,
											maxValue: 9999999.999,
											decimalPrecision: 3,
											selectOnFocus: true,
											readOnly: true,
											reference: 'refBalanceMT',
											flex: 1,
											bind: '{theDetail.balMt}'
										},
										{
											xtype: 'numberfield',
											minValue: 0,
											maxValue: 9999999.999,
											decimalPrecision: 3,
											selectOnFocus: true,
											readOnly: true,
											flex: 1,
											reference: 'refBalanceM3',
											bind: '{theDetail.balM3}'
										},
										{
											xtype: 'numberfield',
											minValue: 0,
											maxValue: 9999999,
											selectOnFocus: true,
											readOnly: true,
											flex: 1,
											reference: 'refBalanceQty',
											bind: '{theDetail.balQty}'
										}
									]

								},
							]
						}
					]
				},
				{	
                    xtype: 'container',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'right'
                    },
                    style: {
                        'text-align': 'right'
                    },
                    items: [
                        {
                            xtype: 'button',
                            reference: 'refsHIBtnDamage',
                            width: 150,
                            html: { type: 'bundle', key: 'confirmLoadingDamage' },
                            handler: 'onHITabDamage',
                            margin: '0 5 0 0',
                            ui: 'delete-button-modern'
                        },
                        {
                            xtype: 'button',
                            reference: 'refsHIBtnDimension',
                            width: 150,
                            html: { type: 'bundle', key: 'confirmLoadingDimension' },
                            handler: 'onHITabDimension',
                            ui: 'delete-button-modern'
                        }
                    ]
				},
				{//Row0:
					xtype: 'container',
					layout: {
						type: 'hbox',				
						pack: 'center',
						align: 'top',
					},
					defaults: {
						margin: '5 5 0 0'
					},
					items: [
						{
							xtype: 'button',
							reference: 'refConfirmHandlingInDamageBtn',
							text: { type: 'bundle', key: 'hht_damage' },
							width: 150,
							ui: 'retrieve-button-modern',
							value: 'damagecheckhht',
							handler: 'onOpenTblDamageCheck',
						},
						{
							xtype: 'button',
							reference: 'refBtnConfirmHIsave',
							text: { type: 'bundle', key: 'confirm' },
							width: 150,
							ui: 'action',
							iconCls: 'x-fa fa-floppy-o',
							handler: 'onSave'
						},
						{
							xtype: 'button',
							reference: 'refBtnCancelHI',
							text: { type: 'bundle', key: 'cancel' },
							width: 150,
							ui: 'delete-button-modern',
							iconCls: 'x-fa fa-times',
							handler: 'onCancelHHT'
						},
					]
				}, 

			]
		},
		
	]
});