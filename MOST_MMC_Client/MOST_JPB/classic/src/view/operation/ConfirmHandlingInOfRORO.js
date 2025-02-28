Ext.define('MOST.view.operation.ConfirmHandlingInOfRORO', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-confirmhandlinginofroro',

    requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.button.Button',
		'Ext.form.Label',
		'Ext.form.field.Checkbox'
	],

	width: 700,
	height: 500,
	scrollable: true,

	controller: 'confirmHandlingInOfRORO',
	
	viewModel: {
		type: 'confirmHandlingInOfRORO'
	},
	
	listeners:{
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

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	initComponent: function() {
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
							bind: '{theRRDetail.shipgNoteNo}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlBlGr',
							flex: 0.8,
							labelWidth: 60,
							fieldLabel: ViewUtil.getLabel('confirmHandlingInGR'),
							readOnly: true,
							bind: '{theRRDetail.grNo}'
						},
						{
							xtype: 'combobox',
							flex: 0.8,
							queryMode: 'local',
							bind: {
								store: '{confirmHandlingInForDeliveryCombo}',
								value: '{theRRDetail.delvTpCd}'
							},
							reference: 'confirmHandlingInDelvTpCd',
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
									// bind: '{theRRDetail.hdlInStDt}',
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
										value: '{theRRDetail.cgTpCd}'
									},
									forceSelection:true,
		                            readOnly:true,
		                            displayField: 'scdNm',
		                            valueField: 'scd'
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
									bind: '{theRRDetail.hdlInEndDt}',
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
											reference: 'ctlHILorryNo',
											flex: 1,
											bind: {
												value: '{theRRDetail.lorryId}',
												lorryNo: '{theRRDetail.lorryId}',
												vslCallId: '{theRRDetail.vslCallId}',
												grNo: '{theRRDetail.grNo}',
												searchDivCd : 'IN-GATE',
		            	   						weightCheckYn: '{theRRDetail.weightCheckYn}'
											},
//											allowBlank: false
										}
									]
								},
								{
									xtype: 'textfield',
									flex: 2,
									fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
									bind: '{theRRDetail.tsptr}',
									readOnly: true
								},
								{
									xtype: 'container'
								}
							]
						},{
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
    								xtype: 'textfield', 
    							 	width: 359,
    							 	readOnly: true,
    								fieldLabel: ViewUtil.getLabel('gateoperation.driverid'),
    								bind:{
    									value : '{theRRDetail.driverId}'
    								},
    								reference:'ctlDriverID',
    							},
    							{
    								xtype: 'button',
    								margin: '0 0 0 5',
    			 					iconCls: 'x-fa fa-search',
    			 					listeners: {
    			 						click: 'openDriversPopup'
    			 					}
    							},
								{
									xtype: 'container',
									flex: 2
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
									bind: '{theRRDetail.snQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 99999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.snMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 99999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.snM3}'
								},								
								{
									xtype: 'container',
									flex: 3
								}
							]
						},
						{// WH IN Amount: HandedAmt
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
									bind: '{theRRDetail.accuSumQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.accuSumWgt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.accuSumMsrmt}'
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
									maxValue: 99999,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.whBalQty}'
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
									bind: '{theRRDetail.whBalWgt}'
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
									bind: '{theRRDetail.whBalMsrmt}'
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
									bind: '{theRRDetail.pkgQty}',
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
									bind: '{theRRDetail.wgt}',
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
									bind: '{theRRDetail.msrmt}',
									editable: false,
									hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingInAmt'
									}
								},
								
								{
									xtype: 'container',
									flex: 3,
//									items: [
//										{
//											xtype: 'checkboxfield',
//											reference: 'ctlConfirmHandlingInFinal',
//											hidden:true,
//											boxLabel: ViewUtil.getLabel('confirmHandlingInFinalHandling'),
//											bind: '{fnlOpeYnChecked}'
//										}
//									]
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
									bind: '{theRRDetail.locId}',
									//maxLength: 15,
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
                     	   					xtype:'textfield',
                     	   					fieldLabel: ViewUtil.getLabel('unitNo'),
                                            labelWidth: 50,
                                            labelAlign: 'right',
//               							 	width: 308,
//             								margin: '5 2 5 0',
                     	   					reference:'ctlUnitNoSearchField',
                     	   					readOnly:true,
        				                    bind:{
        				                    	value : '{theRRDetail.unitNo}'
        				                    }
                                         },{
             								xtype: 'button',
             								disabled: false,
                     	   					reference:'ctlBtnUnitNoSearchField',
             			 					iconCls: 'x-fa fa-search',
             			 					listeners: {
             			 						click: 'openUnitListPopup'
             			 					}
             							},
        		                    	{
        		                            xtype: 'button',
        		                            ui: 'delete-button',
        		                            reference: 'btnDamage',
        		                            hidden:true,
        		                            text: ViewUtil.getLabel('damageCheck'),
        		                            listeners: {
        		    							click:'onDamage_clickHandler'
        		    						}
        		                        },
        		                        {
        		                            xtype: 'button',
        		                            reference: 'btnDimension',
        		                            hidden:true,
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
									reference: 'cltPkgNo',
									flex: 1.5,
									bind: '{theRRDetail.pkgNo}',
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									}
								},
								{
		                            xtype: 'button',
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
										value: '{theRRDetail.rePkgTpCd}'
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