Ext.define('MOST.view.operation.CargoHandlingIn', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-cargohandlingin',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.button.Button',
		'Ext.form.Label',
		'Ext.form.field.Checkbox'
	],

	width: 700,
	height: 580,
	scrollable: true,

	controller: 'cargohandlingin',

	viewModel: {
		type: 'cargohandlingin'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	defaults: {
		padding: '5 0 5 0',
		margin: '0 5 2 5',
		layout: {
			type: 'hbox',
			align: 'stretch'
		}
	},

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					margin: '5 5 5 5',
					defaults: {
						margin: '0 5 0 5',
						labelAlign: 'right',
						labelWidth: 100
					},
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'textfield',
							flex: 1,
							fieldLabel: ViewUtil.getLabel('confirmHandlingInSN'),
							readOnly: true,
							labelWidth: 100,
							bind: '{theDetail.shipgNoteNo}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlBlGr',
							flex: 0.8,
							labelWidth: 60,
							fieldLabel: ViewUtil.getLabel('confirmHandlingInGR'),
							readOnly: true,
							bind: '{theDetail.grNo}'
						},
						{
							xtype: 'combobox',
							flex: 0.8,
							queryMode: 'local',
							bind: {
								store: '{confirmHandlingInForDeliveryCombo}',
								value: '{theDetail.delvTpCd}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							readOnly: true
						}
					]
				},
				{//##################### TIME/ TRUCK/ TRANSPORTER
					xtype: 'fieldset',
					margin: '5 5 5 5',
					defaults: {
						margin: '5 5 0 5',
						labelAlign: 'right',
						labelWidth: 100
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							defaults: {
								labelAlign: 'right',
							},
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingStartDateTime')
								},
								{
									xtype: 'datetimefield',
									flex: 2,
									// bind: '{theDetail.hdlInStDt}',
									reference: 'confirmHandlingInStartTime',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									allowBlank: false
								},
								{
									xtype: 'combobox',
									flex: 2,
									fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
									labelWidth: 100,
									queryMode: 'local',
									reference: 'refCboCargoTp',
									bind: {
										store: '{confirmHandlingInForCargoTypeCombo}',
										value: '{theDetail.cgTpCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									allowBlank: false,
									forceSelection: true,
									listeners: {
										select: 'onCboCargoTpChange'
									},
									readOnly: true,
									hideTrigger: true,
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingEndDateTime')
								},
								{
									xtype: 'datetimefield',
									flex: 2,
									bind: '{theDetail.hdlInEndDt}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								},
								{
									xtype: 'container',
									flex: 2
								}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
							},
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingLorryNo')
								},
								{
									xtype: 'container',
									flex: 2,
									defaults: {
										labelAlign: 'right',
										labelWidth: 100
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'truckfield',
											reference: 'ctlConfirmHandlingInLorryNo',
											flex: 1,
											bind: {
												value: '{theDetail.lorryId}',
												lorryNo: '{theDetail.lorryId}',
												vslCallId: '{theDetail.vslCallId}',
												grNo: '{theDetail.grNo}',
												searchDivCd : 'IN-GATE',
		            	   						weightCheckYn: '{theDetail.weightCheckYn}',
		            	   						searchDelvTp: 'I',
		            	   						isOpeChk: 'Y'
											},
											allowBlank: false
										}
									]
								},
								{
									xtype: 'textfield',
									flex: 2,
									fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
									bind: '{theDetail.tsptr}',
									readOnly: true
								},
								{
									xtype: 'container'
								}
							]
						}
					]
				},

				{//########################### HANDLING-IN INFO ###############
					xtype: 'fieldset',
					defaults: {
						margin: '0 5 0 5',
						labelAlign: 'right',
						defaults: {
							margin: '0 5 2 0',
							labelAlign: 'right',
							labelWidth: 100,
							layout: {
								type: 'hbox',
								align: 'stretch'
							}
						}
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{// MT M3 QTY lable row
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									width: 100
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center'
									},
									text: 'Qty'
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center'
									},
									text: 'MT'
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center'
									},
									text: 'M3'
								},								
								{
									xtype: 'container',
									flex: 3
								}
							]
						},
						{// SN Amount row:
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmHandlingInSnAmt')
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 99999,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 99999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 99999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snM3}'
								},								
								{
									xtype: 'container',
									flex: 3
								}
							]
						},
						{// GR Amount
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmHandlingInHandedAmt')
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 99999,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.grQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.grMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.grM3}'
								},								
								{
									xtype: 'container',
									flex: 3
								}
							]
						},
						{// WH IN Amount: HandedAmt
							xtype: 'container',
							hidden: true,
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmHandlingInHandedAmt')
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 99999,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.accuSumQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.accuSumWgt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.accuSumMsrmt}'
								},								
								{
									xtype: 'container',
									flex: 3
								}
							]
						},
						{// WH Banlance:
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							margin: '15 5 0 5',
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmHandlingInBalanceAmt')
								},
								{
									xtype: 'numberfield',
									reference: 'refBalanceQty',
									//minValue: 0,
									maxValue: 99999999,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalQty}'
								},
								{
									xtype: 'numberfield',
									reference: 'refBalanceMT',
									//minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalWgt}'
								},
								{
									xtype: 'numberfield',
									reference: 'refBalanceM3',
									//minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalMsrmt}'
								},
								
								{
									xtype: 'container',
									flex: 3
								}
							]
						},
						{//Confirm Amout (from Lorry):
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmHandlingConfirmAmt')
								},
								{
									xtype: 'numberfield',
									reference: 'ctlLoadQty',
									minValue: 0,
									maxValue: 99999,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.pkgQty}',
									listeners: {
										change: 'onChangeHandlingInAmt'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlLoadMt',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.wgt}',
									editable: false,
									hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingInAmt'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlLoadM3',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.msrmt}',
									editable: false,
									hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingInAmt'
									}
								},
								
								{
									xtype: 'container',
									flex: 3,
									items: [
										{
											xtype: 'checkboxfield',
											reference: 'ctlConfirmHandlingInFinal',
											boxLabel: ViewUtil.getLabel('confirmHandlingInFinalHandling'),
											bind: '{fnlOpeYnChecked}'
										}
									]
								}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '5 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingLocation')
								},
								{
									xtype: 'textfield',
									reference: 'ctlConfirmHandlingInLocId',
									flex: 1,
									bind: '{theDetail.locId}', 
									enforceMaxLength: true,
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									},
									editable: false,
								},
								{
									xtype: 'button',
									reference: 'ctlConfirmHandlingInWhAllocation',
									flex: 1,
									text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
									bind: { disabled: '{spareCargoCheck}' },
									listeners: {
										click: {
											fn: 'onWarehouseAllocation',
											args: ['ctlConfirmHandlingInLocId']
										}
									}
								},
								{
        		                    xtype: 'container',
        		                    flex: 2,
        		                    layout: {
				                        type: 'hbox',
				                        pack: 'end'
				                    },
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
        		                    items: [
        		                    	{
        		                            xtype: 'button',
        		                            ui: 'delete-button',
        		                            reference: 'btnDamage',
        		                            text: ViewUtil.getLabel('damageCheck'),
        		                            listeners: {
        		    							click:'onDamage_clickHandler'
        		    						}
        		                        },
        		                        {
        		                            xtype: 'button',
        		                            reference: 'btnDimension',
        		                            text: ViewUtil.getLabel('dimensionCheck'),
        		                            listeners: {
        		    							click:'onDimension_clickHandler'
        		    						}
        		                        },
        		                    ]
								}
								
							]
						},
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '5 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingPackageNo'),
								},
								{
									xtype: 'textfield',
									disabled: true,
									reference: 'cltPkgNo',
									flex: 1.5,
									bind: '{theDetail.pkgNo}',
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									}
								},
								{
		                            xtype: 'button',
									disabled: true,
		                            reference: 'btnPackageNo',
		                            flex: 0.5,
		                            iconCls: 'x-fa fa-search',
				 					listeners: {
				 						click: 'onOpenPkgNoPopup'
				 					}
		                        },
								{
									xtype: 'cmmcdfield',
									reference: 'ctlConfirmHandlingInPacTypeCode',
									flex: 2,
									fieldLabel: ViewUtil.getLabel('confirmLoadingPkgType'),
									bind: {
										value: '{theDetail.rePkgTpCd}'
									},
									params: {
										searchType: 'COMM',
										searchDivCd: 'PKGTP',
										searchLcd: 'MT'
									},
									allowBlank: false
								}
							]
						}
					]
				},
				{//########################### SHUT OUT DAMAGE ###############
					xtype: 'fieldset',
					title: 'Shu-Out',
					defaults: {
						margin: '0 5 0 5',
						labelAlign: 'right',
						defaults: {
							margin: '0 5 2 0',
							labelAlign: 'right',
							labelWidth: 100,
							layout: {
								type: 'hbox',
								align: 'stretch'
							}
						}
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{// MT M3 QTY lable row
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									width: 100
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center'
									},
									text: 'Qty'
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center'
									},
									text: 'MT'
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center'
									},
									text: 'M3'
								},
								{
									xtype: 'container',
									flex: 3
								}
							]
						},
						{//Shut Out Info
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmHandlingConfirmAmt')
								},
								{
									xtype: 'numberfield',
									reference: 'ctlConfirmHandlingInShuQty',
									minValue: 0,
									maxValue: 99999,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.shuQty}',
									listeners: {
										change: 'onChangeHandlingInShuAmt'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlConfirmHandlingInShuMt',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.shuMt}',
									editable: false,
									hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingInShuAmt'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlConfirmHandlingInShuM3',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.shuM3}',
									editable: false,
									hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingInShuAmt'
									}
								},

								{
									xtype: 'container',
									flex: 3,

								}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									margin: '5 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingLocation')
								},
								{
									xtype: 'textfield',
									reference: 'ctlConfirmHandlingInShuLocId',
									flex: 1,
									bind: '{theDetail.shuLocId}',
									enforceMaxLength: true,
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									},
									editable: false,
								},
								{
									xtype: 'button',
									reference: 'ctlConfirmHandlingInShuWhAllocation',
									flex: 1,
									text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
									bind: { disabled: '{spareCargoCheck}' },
									listeners: {
										click: {
											fn: 'onWarehouseAllocation',
											args: ['ctlConfirmHandlingInShuLocId']
										}
									}
								},
								{
									xtype: 'container',
									flex: 2,
									layout: {
										type: 'hbox',
										pack: 'end'
									},
									defaults: {
										margin: '0 5 2 0',
										labelAlign: 'right',
										labelWidth: 140
									},
								}
							]
						},
					]

					
				},
				
				{//BUTTON
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'center'
					},
					margin: '0 5 0 5',
					items: [{
						xtype: 'button',
						margin: '0 5 0 0',
						text: ViewUtil.getLabel('confirm'),
						reference: 'btnOk',
						iconCls: 'fa fa-floppy-o',
						cls: 'search-button',
						listeners: {
							click: 'onSave'
						}
					}, {
						xtype: 'button',
						text: ViewUtil.getLabel('cancel'),
						reference: 'btnCancel',
						iconCls: 'fa fa-window-close',
						ui: 'delete-button',
						listeners: {
							click: 'onCancel'
						}
					}]
				}
			],

			dockedItems: [

			]
		});

		me.callParent();
	}
});