Ext.define('MOST.view.operation.WHCheckExportForRORO', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-whcheckexportforroro',

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

	controller: 'whcheckexportforroro',

	viewModel: {
		type: 'whcheckexportforroro'
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
							bind: '{theRRDetail.vslCallId}',
							readOnly: true
						},
						{
							xtype: 'textfield',
							flex: 1,
							margin: '0 5 0 0',
							bind: '{theRRDetail.vslNm}',
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
							bind: '{theRRDetail.shipgNoteNo}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlBlGr',
							hidden: true,
							flex: 0.8,
							labelWidth: 60,
							fieldLabel: ViewUtil.getLabel('confirmHandlingInGR'),
							readOnly: true,
							bind: '{theRRDetail.grNo}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlDelvTpNm',
							flex: 0.8,
							labelWidth: 60,
							readOnly: true,
							bind: '{theRRDetail.delvTpNm}'
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
									bind: '{theRRDetail.startDt}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									readOnly: true,
									reference: 'refStartDt'
								},
								{
									xtype: 'textfield',
									flex: 1,
									lableWidth: 70,
									fieldLabel: ViewUtil.getLabel('confirmLoadingShift'),
									bind: '{theRRDetail.shftNm}',
									readOnly: true,
									allowBlank: true
								},
								{
									xtype: 'combobox',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
									labelWidth: 100,
									queryMode: 'local',
									reference: 'refCboCargoTp',
									bind: {
										store: '{confirmHandlingInForCargoTypeCombo}',
										value: '{theRRDetail.cgTpCd}'
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
									reference: 'refCboCargoTpNm',
									bind: {
										value: '{theRRDetail.cgTpNm}'
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
									bind: '{theRRDetail.endDt}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								},
								{
									xtype: 'textfield',
									flex: 1,
									lableWidth: 70,
									fieldLabel: ViewUtil.getLabel('confirmLoadingClearance'),
									bind: {
										value: '{theRRDetail.custMode}'
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
										value: '{theRRDetail.tsptTpCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									allowBlank: false,
									hidden: true
								},
								{
									xtype: 'textfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('confirmLoadingModeOfOpr'),
									queryMode: 'local',
									bind: {
										value: '{theRRDetail.tsptTpNm}'
									},
									allowBlank: false,
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
									bind: '{theRRDetail.snQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.snMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.snM3}'
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
                    	   					hidden:true,
                    	   					labelWidth: 70,
                    	   					fieldLabel: ViewUtil.getLabel('yardTruck'),
                    	   					reference:'ctlYardTruck',
                    	   					bind :{ 
                    	   						value: '{theRRDetail.lorryNo}',
                    	   						vslCallId: '{theRRDetail.vslCallId}',
                    	   						shipgNoteNo: '{theRRDetail.shipgNoteNo}',
                    	   						lorryNo: '{theRRDetail.lorryNo}',
                    	   						searchDivCd : 'YT',
                    	   						isAutoLoad: 'true',
		            	   						weightCheckYn: '{theRRDetail.weightCheckYn}'
                    	   					}
                                        },
                                        {
                     	   					xtype:'textfield',
                     	   					fieldLabel: ViewUtil.getLabel('unitNo'),
                                            labelWidth: 50,
                                            labelAlign: 'right',
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
									bind: '{theRRDetail.whSumQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.whSumMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.whSumM3}'
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
//										{
//        		                            xtype: 'button',
//        		                            reference: 'btnDamage',
//        		                            ui: 'delete-button',
//        		                            text: ViewUtil.getLabel('damageCheck'),
//        		                            disabled: true,
//        		                            listeners: {
//        		    							click:'onDamage_clickHandler'
//        		    						}
//        		                        },
//        		                        {
//        		                            xtype: 'button',
//        		                            reference: 'btnDimension',
//        		                            text: ViewUtil.getLabel('dimensionCheck'),
//        		                            disabled: true,
//        		                            listeners: {
//        		    							click:'onDimension_clickHandler'
//        		    						}
//        		                        },
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
									bind: '{theRRDetail.whBalQty}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.whBalMt}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999999.999,
									decimalPrecision: 3,
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theRRDetail.whBalM3}'
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
									bind: '{theRRDetail.loadQty}',
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
									bind: '{theRRDetail.loadMt}',
									// editable: true,
									// hideTrigger: true,
									listeners: {
//										change: 'onChangeHandlingAmt'
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
									bind: '{theRRDetail.loadM3}',
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
											hidden:true,
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
										value: '{theRRDetail.locId}'
									},
									maxLength: 20,
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
									bind: '{theRRDetail.pkgNo}',
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									},
									enforceMaxLength: true,
									maxLength: 30,
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
										value: '{theRRDetail.rePkgTpCd}'
									},
									allowBlank: false,
									readOnly: true
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