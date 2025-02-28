Ext.define('MOST.view.operation.WHCheckExport', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-whcheckexport',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.button.Button',
		'Ext.form.Label',
		'Ext.form.field.Checkbox'
	],

	width: 700,
	height: 590,
	scrollable: true,

	controller: 'whcheckexport',

	viewModel: {
		type: 'whcheckexport'
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
				{//Vessel Info
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
							fieldLabel: ViewUtil.getLabel('confirmLoadingJpvc'),
							bind: '{theDetail.vslCallId}',
							readOnly: true
						},
						{
							xtype: 'textfield',
							flex: 1,
							margin: '0 5 0 0',
							bind: '{theDetail.vslNm}',
							readOnly: true
						},
					]
				},
				{//SN status
					xtype: 'fieldset',
					margin: '0 5 5 5',
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
							xtype: 'label',
							margin: '2 5 0 0',
							style: {
								'text-align': 'right'
							},
							width: 100,
							text: ViewUtil.getLabel('confirmHandlingInSN')
						},
						{
							xtype: 'textfield',
							flex: 1,
							readOnly: true,
							labelWidth: 100,
							bind: '{theDetail.shipgNoteNo}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlBlGr',
							hidden: true,
							flex: 0.8,
							labelWidth: 60,
							fieldLabel: ViewUtil.getLabel('confirmHandlingInGR'),
							readOnly: true,
							bind: '{theDetail.grNo}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlDelvTpNm',
							flex: 0.8,
							labelWidth: 60,
							readOnly: true,
							bind: '{theDetail.delvTpNm}'
						}
					]
				},

				{//##################### TIME / Cargo Type/ Mode OPE
					xtype: 'fieldset',
					margin: '0 5 5 5',
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
									xtype: 'datetimefield',
									flex: 1.2,
									lableWidth: 100,
									fieldLabel: ViewUtil.getLabel('confirmLoadingStartDateTime'),
									bind: '{theDetail.startDt}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									readOnly: true,
									reference: 'refStartDt'
								},
								{
									xtype: 'textfield',
									flex: 1,
									lableWidth: 70,
									fieldLabel: ViewUtil.getLabel('confirmLoadingShift'),
									bind: '{theDetail.shftNm}',
									readOnly: true,
									allowBlank: true
								},
								{
									xtype: 'combobox',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
									labelWidth: 100,
									queryMode: 'local',
									reference: 'refCboCargoTpa',
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
									hidden: true,
								},
								{
									xtype: 'textfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
									labelWidth: 100,
									queryMode: 'local',
									reference: 'refCboCargoTp',
									bind: {
										value: '{theDetail.cgTpNm}'
									},
									editable: false

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
									xtype: 'datetimefield',
									flex: 1.2,
									lableWidth: 100,
									fieldLabel: ViewUtil.getLabel('confirmLoadingEndDateTime'),
									bind: '{theDetail.endDt}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								},
								{
									xtype: 'textfield',
									flex: 1,
									lableWidth: 70,
									fieldLabel: ViewUtil.getLabel('confirmLoadingClearance'),
									bind: {
										value: '{theDetail.custMode}'
									},
									forceSelection: true,
									readOnly: true
								},
								{
									xtype: 'combobox',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('confirmLoadingModeOfOpr'),
									queryMode: 'local',
									bind: {
										store: '{confirmLoadingForModeOfOprCombo}',
										value: '{theDetail.tsptTpCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									allowBlank: false,
//									hidden: true
								},
								{
									xtype: 'textfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('confirmLoadingModeOfOpr'),
									queryMode: 'local',
									bind: {
										value: '{theDetail.tsptTpNm}'
									},
									allowBlank: false,
									hidden: true,
									editable: false									
								}
							]
						}
					]
				},

				{//########################### AMOUNT INFO ###############
					xtype: 'fieldset',
					defaults: {
						margin: '0 5 5 5',
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
									maxValue: 999999999,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snM3}'
								},
								{
									xtype: 'container',
									flex: 3,
									layout: {
										type: 'hbox',
										// align: 'stretch'
									},
									items: [
										{
                    	   					xtype:'truckfield',
                    	   					flex:1,
                    	   					labelWidth: 70,
                    	   					fieldLabel: ViewUtil.getLabel('yardTruck'),
                    	   					reference:'ctlYardTruck',
                    	   					bind :{ 
                    	   						value: '{theDetail.lorryNo}',
                    	   						vslCallId: '{theDetail.vslCallId}',
                    	   						shipgNoteNo: '{theDetail.shipgNoteNo}',
                    	   						lorryNo: '{theDetail.lorryNo}',
                    	   						searchDivCd : 'YT',
                    	   						isAutoLoad: 'true',
        										cgTpCd: '{theDetail.cgTpCd}',
		            	   						weightCheckYn: '{theDetail.weightCheckYn}'
                    	   					}
                                        },
									]
								},
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
									text: ViewUtil.getLabel('warehouseCheckExpor_amount')
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whSumQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whSumMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whSumM3}'
								},
								
								{
									xtype: 'container',
									flex: 3,
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
        		                            reference: 'btnDamage',
        		                            ui: 'delete-button',
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
						{// WH Banlance:
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
									text: ViewUtil.getLabel('warehouseCheckExpor_bal_amount')
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									reference:'ctlBalQty',
									maxValue: 999999999,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalM3}'
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
									text: ViewUtil.getLabel('warehouseCheckExpor_loaded_amount')
								},
								{
									xtype: 'numberfield',
									reference: 'ctlLoadQty',
									minValue: 0,
									maxValue: 999999999,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.loadQty}',
									listeners: {
										change: 'onChangeHandlingAmt'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlLoadMt',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.loadMt}',
									// editable: true,
									// hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingAmt'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlLoadM3',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.loadM3}',
									// editable: false,
									// hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingAmt'
									}
								},
								
								{
									xtype: 'container',
									flex: 3,
									items: [
										{
											xtype: 'checkboxfield',
											reference: 'ctlWarehouseCheckExporFinal',
											boxLabel: ViewUtil.getLabel('warehouseCheckExpor_final'),
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
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingLocation')
								},
								{
									xtype: 'textfield',
									reference: 'cltWHCheckExportDeAllocation',
									flex: 2,
									bind: {
										value: '{theDetail.locId}'
									},
									maxLength: 45,
									enforceMaxLength: true,
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									},
									editable: false,
								},
								{
									xtype: 'button',
									reference: 'cltBtnWarehouseCheckLocId',
									flex: 2,
									text: ViewUtil.getLabel('confirmLoadingWhDeAllocation'),
									listeners: {
										click: {
											fn: 'onWarehouseDeAllocation',
											args: ['cltWHCheckExportDeAllocation']
										}
									}
								},
								{
									xtype: 'container',
									flex: 3
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
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingPackageNo'),
								},
								{
									xtype: 'textfield',
									reference: 'cltPkgNo',
									margin: '0 0 0 0',
									flex: 2,
									bind: '{theDetail.pkgNo}',
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									},
									enforceMaxLength: true,
									maxLength: 60,
									enforceMaxLength: true,
									//maskRe: /[0-9A-Za-z]/,
									readOnly: true
								},
								{
									xtype: 'button',
									margin: '0 0 0 5',
				 					iconCls: 'x-fa fa-search',
				 					listeners: {
				 						click: 'onOpenPkgNoPopup'
				 					}
								},
								{
									xtype: 'textfield',
									reference: 'ctlConfirmHandlingInPacTypeCode',
									flex: 2,
									fieldLabel: ViewUtil.getLabel('confirmLoadingPkgType'),
									bind: {
										value: '{theDetail.rePkgTpCd}'
									},
									// params: {
									// 	searchType: 'COMM',
									// 	searchDivCd: 'PKGTP',
									// 	searchLcd: 'MT'
									// },
									allowBlank: false,
									readOnly: true
								}
							]
						}
					]
				},

				{//########################### SHUT-OUT / DAMAGE ###############
					xtype: 'fieldset',
					defaults: {
						margin: '0 5 5 5',
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
						{// Shut-out Amount row:
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
									text: ViewUtil.getLabel('confirmLoadingShutOut')
								},
								{
									xtype: 'numberfield',
									reference: 'ctlShutOutQty',
									minValue: 0,
									maxValue: 999999999,
									selectOnFocus: true,
									//readOnly: true,
									flex: 1,
									bind: '{theDetail.shuQty}',
									listeners: {
										change: 'onChangeShutOutAmt'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'ctlShutOutMt',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									//readOnly: true,
									flex: 1,
									bind: '{theDetail.shuMt}'
								},
								{
									xtype: 'numberfield',
									reference: 'ctlShutOutM3',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									//readOnly: true,
									flex: 1,
									bind: '{theDetail.shuM3}'
								},
								{
									xtype: 'container',
									flex: 3,
								},
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
									margin: '2 5 0 0',
									style: {
										'text-align': 'right'
									},
									width: 100,
									text: ViewUtil.getLabel('confirmLoadingLocation')
								},
								{
									xtype: 'textfield',
									margin: '0 0 0 0',
									reference: 'cltWHCheckExportShuAllocation',
									flex: 2,
									bind: {
										value: '{theDetail.shuLocId}'
									},
									maxLength: 45,
									enforceMaxLength: true,
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									},
									editable: false,
								},
								{
									xtype: 'button',
									margin: '0 0 0 6',
									reference: 'cltBtnWarehouseCheckLocId',
									flex: 1,
									text: 'Allocation',
									listeners: {
										click: {
											fn: 'onAllocationShutOut',
											args: ['cltWHCheckExportShuAllocation']
										}
									}
								},
								{
									xtype: 'container',
									flex: 3,
								},
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
					}, 
				]
				}
			],

			dockedItems: [

			]
		});

		me.callParent();
	}
});