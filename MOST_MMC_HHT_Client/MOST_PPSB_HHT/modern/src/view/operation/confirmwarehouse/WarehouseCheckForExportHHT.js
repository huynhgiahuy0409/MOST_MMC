Ext.define('MOST.view.operation.cmcofwarehouse.WarehouseCheckForExportHHT', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-warehousecheckforexporthht',

	requires: [
		'MOST.view.operation.WarehouseCheckForExportHHTController',
		'MOST.view.operation.WHCheckExportModel',
		'MOST.view.popup.CommonCodePopupHHT',
		'MOST.view.popup.WHCheckerUnSetPopupHHT',
	],
	
	controller: 'warehousecheckforexporthht',
	viewModel: {
		type: 'whcheckexport'
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		margin: '0 2 0 2',
	},
	shadow: false,
	padding: 0,

	listeners: {
		painted: 'onLoad'
	},
	closeAction: 'destroy',

	items: [
		{
			xtype: 'formpanel',
			reference: 'refFrmWHCheckExport',
			padding: 0,
			margin: 0,
			items: [
				//Row 1: SN/ CG type/ Customs
				{
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
							readOnly: true,
							bind: '{theDetail.shipgNoteNo}',
							label: { type: 'bundle', key: 'sNNo' }
						},
						{
							xtype: 'textfield',
							reference: 'refTxtCgTpNm', 
							flex: 1,
							label: { type: 'bundle', key: 'confirmLoadingCargoType'},
							bind: {
								value: '{theDetail.cgTpNm}',
							},
							readOnly: true
						},
						{
							xtype: 'textfield',
							reference: 'refCustomSatus',
							flex: 1,
							readOnly: true,
							bind: '{theDetail.custMode}',
							label: { type: 'bundle', key: 'confirmLoadingClearance'}
						}
					]
				},
				
				//Row 2: Start date/ End date/ final
				{
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
							reference: 'refConfirmLoadingStartDt',
							flex: 1,
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
							readOnly:true,
							label: { type: 'bundle', key: 'startTime' },
						},
						{
							xtype: 'datetimelocalfield',
							reference: 'refConfirmLoadingEndDt',
							flex: 1,
							label: {type: 'bundle', key: 'endTime'},
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),//'d/m/Y H:i',
							required: false,
							readOnly:true,
						},
						{
							xtype: 'checkboxfield',
							reference: 'refWarehouseCheckExporFinal',
							label: { type: 'bundle', key: 'warehouseCheckExpor_final' },
							bind: '{fnlOpeYnChecked}'
						}
					]
				},
				
				//Row 3: Package type/ no.
				{
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
							reference: 'refPkgTypeCode',
							flex: 1,
							bind: {
								value: '{theDetail.rePkgTpCd}',
							},
							editable: false,
							label: { type: 'bundle', key: 'SNLTypeOfPac' },
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
							reference: 'refPkgNo',
							flex: 1,
							bind: '{theDetail.pkgNo}',
							fieldStyle: 'text-transform:uppercase',
							listeners: {
								change: 'onUpperCase'
							},
							label: { type: 'bundle', key: 'confirmLoadingPackageNo' },
							editable: false,
							triggers: {
								someField: {
									iconCls: 'x-fa fa-search',
									ui: 'retrieve-button-modern',
									scope: 'controller',
									handler: 'onOpenPackageNoPopup'
								}
							}
						}
						
					]
				},
				
				//Row 4: truck/ Location
				{
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
							// editable: false,
							required: true,
							reference: 'refLorryNo',
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
							reference: 'refWHCheckExportDeAllocation',
							flex: 1,
							bind: '{theDetail.locId}',
							fieldStyle: 'text-transform:uppercase',
							listeners: {
								change: 'onUpperCase'
							},
							editable: false,
							label: { type: 'bundle', key: 'confirmLoadingLocation' },
							triggers: {
								someField: {
									iconCls: 'x-fa fa-search',
									ui: 'retrieve-button-modern',
									scope: 'controller',
									handler: 'onUnSetLocCofrmLoadingHHT'
								}
							}
						}
					]
				},				

				{
					//########################### AMOUNT INFO ###############
					xtype: 'fieldset',
					padding: '5 0 0 0',
					margin: '10 0 0 0',
					style: 'border-top: 1px solid gray;',
					defaults: {
						labelAlign: 'left',
						defaults: {
							textAlign: 'left',
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
									width: 90
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center',
										'font-weight': 'bold'
									},
									html: 'Qty'
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center',
										'font-weight': 'bold'
									},
									html: 'MT'
								},
								{
									xtype: 'label',
									flex: 1,
									style: {
										'text-align': 'center',
										'font-weight': 'bold'
									},
									html: 'M3'
								},
							]
						},
						{// SN Amount row:
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
							},
							items: [
								{
									xtype: 'label',
									margin: '0 0 0 0',
									padding: '5 5 0 0',
									width: 90,
									style: {
										'text-align': 'right'
									},
									
									html: { type: 'bundle', key: 'hht_whcheckexport_doc_amt' },
									labelTextAlign: 'left',
								},
								{
									xtype: 'numberfield',
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 99999,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snQty}'
								},
								{
									xtype: 'numberfield',
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimals: 3,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snMt}'
								},
								{
									xtype: 'numberfield',
									margin: '0 0 0 0',
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimals: 3,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.snM3}'
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
							defaults: {
								margin: '0 5 0 0',
							},
							items: [
								{
									xtype: 'label',
									margin: '0 0 0 0',
									padding: '5 5 0 0',
									width: 90,
									style: {
										'text-align': 'right'
									},
									html: { type: 'bundle', key: 'hht_whcheckexport_act_amt' }
								},
								{
									xtype: 'numberfield',
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 99999,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whSumQty}'
								},
								{
									xtype: 'numberfield',
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimals: 3,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whSumMt}'
								},
								{
									xtype: 'numberfield',
									margin: '0 0 0 0',
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimals: 3,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whSumM3}'
								},
							]
						},
						{// WH Banlance:
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
							},
							items: [
								{
									xtype: 'label',
									margin: '0 0 0 0',
									padding: '5 5 0 0',
									width: 90,
									style: {
										'text-align': 'right'
									},
									html: { type: 'bundle', key: 'hht_whcheckexport_bal_amt' }
								},
								{
									xtype: 'numberfield',
									ui: 'field-yellow',
									reference:'refBalQty',
									//minValue: 0,
									maxValue: 99999,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalQty}'
								},
								{
									xtype: 'numberfield',
									ui: 'field-yellow',
									//minValue: 0,
									maxValue: 999999999999999.999,
									decimals: 3,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalMt}'
								},
								{
									xtype: 'numberfield',
									margin: '0 0 0 0',
									ui: 'field-yellow',
									//minValue: 0,
									maxValue: 999999999999999.999,
									decimals: 3,
									textAlign: 'right',
									selectOnFocus: true,
									readOnly: true,
									flex: 1,
									bind: '{theDetail.whBalM3}'
								},
							]
						},
						{//Confirm Amount (from Lorry):
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
							},
							items: [
								{
									xtype: 'label',
									margin: '0 0 0 0',
									padding: '5 5 0 0',
									width: 90,
									style: {
										'text-align': 'right'
									},
									html: { type: 'bundle', key: 'hht_whcheckexport_load_amt' }
								},
								{
									xtype: 'numberfield',
									reference: 'refLoadQty',
									ui: 'fieldnumberhht',
									minValue: 0,
									maxValue: 99999,
									textAlign: 'right',
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.loadQty}',
									listeners: {
										change: 'onChangeHandlingAmt'
									}
								},
								{
									xtype: 'numberfield',
									reference: 'refLoadMt',
									ui: 'fieldnumberhht',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimals: 3,
									textAlign: 'right',
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.loadMt}',
									editable: true,
									hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingAmt'
									}
								},
								{
									xtype: 'numberfield',
									margin: '0 0 0 0',
									reference: 'refLoadM3',
									ui: 'fieldnumberhht',
									minValue: 0,
									maxValue: 999999999999999.999,
									decimals: 3,
									textAlign: 'right',
									selectOnFocus: true,
									flex: 1,
									bind: '{theDetail.loadM3}',
									editable: false,
									hideTrigger: true,
									listeners: {
										change: 'onChangeHandlingAmt'
									}
								}
							]
						},
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
                            reference: 'refsWHBtnDamage',
                            width: 150,
                            html: { type: 'bundle', key: 'confirmLoadingDamage' },
                            handler: 'onWHTabDamage',
                            ui: 'delete-button-modern',
                            margin: '0 5 0 0'
                        },
                        {
                            xtype: 'button',
                            reference: 'refsWHBtnDimension',
                            width: 150,
                            html: { type: 'bundle', key: 'confirmLoadingDimension' },
                            handler: 'onWHTabDimension',
                            ui: 'delete-button-modern'
                        }
                    ]
				},
				{//Row: Remark
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
							maxLength: 50,
							enforceMaxLength: true,
							label: { type: 'bundle', key: 'rmk' }
						}
					]
				},
				{//Row End: Buttons
					xtype: 'container',
					margin: '5 2 0 0',	
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'spacer',
							flex: 1
						},
						{
							xtype: 'button',
							reference: 'refConfirmWarehouseInDamageBtn',
							text: { type: 'bundle', key: 'hht_damage' },
							width: 150,
							ui: 'retrieve-button-modern',
							value: 'damagecheckhht',
							handler: 'onOpenTblDamageCheck',
						},
						{
							xtype: 'spacer',
							width: 3
						},
						{
							xtype: 'button',
							reference: 'refBtnConfirmLoadingSave',
							text: { type: 'bundle', key: 'confirm' },
							width: 150,
							ui: 'action',
							iconCls: 'x-fa fa-floppy-o',
							handler: 'onSave'
						}, {
							xtype: 'spacer',
							width: 3
						}, {
							xtype: 'button',
							text: { type: 'bundle', key: 'cancel' },
							width: 150,
							ui: 'delete-button-modern',
							iconCls: 'x-fa fa-times',
							handler: 'onCancel'
						}
					]
				},
			]
		}
	]
});