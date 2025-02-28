Ext.define('MOST.view.operation.cmcofwarehouse.WarehouseCheckForImportHHT', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-warehousecheckforimporthht',

	requires: [
		'MOST.view.operation.WarehouseCheckForImportHHTController',
		'MOST.view.operation.WHCheckImportModel',
		'MOST.view.popup.CommonCodePopupHHT',
		'MOST.view.popup.WHCheckerSetLocPopupHHT',
		//'MOST.view.common.WebSocketStatusField'
	],

	controller: 'warehousecheckforimporthht',
	viewModel: {
		type: 'whcheckimport'
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		//margin: '0 2 0 2',
	},
	shadow: true,
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	padding: 0,

	listeners: {
		painted: 'onLoad'
	},
	closeAction: 'destroy',
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

	items: [
		{
			xtype: 'formpanel',
			margin: '0 0 0 0',
			padding: '7 2 0 0',
			reference: 'ctlFrmCfrmWHCheckImport',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{//Row1: Cargo Information
					xtype: 'container',
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
						{//Row1.Col1 BL, Cargo Type, Start/End DateTime
							xtype: 'container',
							layout: {
								type: 'vbox'
							},
							flex: 1,
							defaults: {
								labelAlign: 'left',
								labelTextAlign: 'right',
								labelWidth: 100,
								margin: '0 5 0 0',
							},
							items: [
								{
									xtype: 'textfield',
									flex: 1,
									labelAlign: 'left',
									labelTextAlign: 'right',
									label: { type: 'bundle', key: 'blno' },
									reference: 'ctlCgNo',
									readOnly: true,
									bind: '{theDetail.blNo}'
								},
								{//Cargo Type
									xtype: 'combobox',
									flex: 1,
									reference: 'ctlCargoType',
									label: { type: 'bundle', key: 'confirmLoadingCargoType'},
									queryMode: 'local',
									bind: {
										store: '{whCheckImportsForCargoTypeCombo}',
										value: '{theDetail.cgTpCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									editable: false,
									disabled: true,
									clearable: false
								}
							]
						},
						
						{//Row1.Col2 delv mode/ customs
							xtype: 'container',
							layout: {
								type: 'vbox'
							},
							flex: 1,
							defaults: {
								labelAlign: 'left',
								labelTextAlign: 'right',
								labelWidth: 90,
								margin: '0 5 0 0',
							},
							items: [
								{//Delv:
									xtype: 'combobox',
									flex: 1,
									label: { type: 'bundle', key: 'delvTpCd'},
									queryMode: 'local',
									bind: {
										store: '{whCheckImportForDeliveryCombo}',
										value: '{theDetail.delvTpCd}',
									},
									ediable: false,
									readOnly: true,
									disabled: true,
									displayField: 'scdNm',
									valueField: 'scd'
								},
								{//Release status:
									xtype: 'textfield',
									flex: 1,
									label: { type: 'bundle', key: 'confirmLoadingClearance'},
									bind: {
										value: '{theDetail.custMode}',
									},
									ediable: false
								},
							]
						},
						
						{//Row1.Col3 Transport Type/ Pkg Type
							xtype: 'container',
							layout: {
								type: 'vbox'
							},
							flex: 1,
							defaults: {
								labelAlign: 'left',
								labelTextAlign: 'right',
								labelWidth: 90,
								margin: '0 5 0 0',
							},
							items: [
								{//Transport Type (Operation Mode)
									xtype: 'combobox',
									flex: 1,
									reference: 'refOPRModeHHTcbx',
									label: { type: 'bundle', key: 'confirmLoadingModeOfOpr'},
									queryMode: 'local',
									bind: {
										store: '{whCheckImportForModeOfOprCombo}',
										value: '{theDetail.tsptTpCd}'
									},
									displayField: 'scdNm',
									valueField: 'scd',
									editable: false,
									clearable: true,
									required: true
								},
								{
									xtype: 'textfield',
									reference: 'ctlTxtPkgTypeCd',
									label: { type: 'bundle', key: 'hht_pkg_tp'},
									bind: {
										value: '{theDetail.rePkgTpCd}',
									},
									editable: false,
									triggers: {
										someField: {
											iconCls: 'x-fa fa-search',
											ui: 'retrieve-button-modern',
											scope: 'controller',
											handler: 'onSearchPkgType'
										}
									}
								}
							]
						},
						
					]
				},
				
				{//Row2: Cargo Information
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'hbox',
						//align: 'stretch'
					},
					items: [
						{//Col1 Start/End DateTime
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox'
							},
							
							defaults: {
								labelAlign: 'left',
								labelTextAlign: 'right',
								labelWidth: 100,
								margin: '0 5 0 0',
							},
							items: [
								{//start datetime
									xtype: 'datetimelocalfield',
									flex: 1,
									reference: 'ctlDtmWhCheckImpStart',
									label: {type: 'bundle', key: 'startTime'},
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									clearable: false,
									editable: false,
									disabled: true
								},
								{//start datetime
									xtype: 'datetimelocalfield',
									flex: 1,
									reference: 'ctlDtmWhCheckImpEnd',
									label: {type: 'bundle', key: 'endTime'},
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									clearable: false,
									editable: false,
									disabled: true
								}
							]
						},
						
						{//Col2 Pkg No/Lorry No
							xtype: 'container',
							layout: {
								type: 'vbox'
							},
							flex: 2,
							defaults: {
								labelAlign: 'left',
								labelTextAlign: 'right',
								labelWidth: 90,
								margin: '0 5 0 0',
							},
							items: [
								{
									xtype: 'textfield',
									reference: 'refPkgNo',
									editable: false,
									label: { type: 'bundle', key: 'confirmLoadingPackageNo'},
									flex: 1,
									bind: '{theDetail.pkgNo}',
									listeners: {
										change: function(field, newValue){
											field.setValue(newValue.toUpperCase());
										}
									},
									triggers: {
										someField: {
											iconCls: 'x-fa fa-search',
											ui: 'retrieve-button-modern',
											scope: 'controller',
											handler: 'onOpenPackageNoPopup'
										}
									}
								},
								{
									xtype: 'textfield',
									flex: 1,
									editable: false,
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
								}
							]
						}
					]
				},
				
				{//Row3: Remarks
					xtype: 'container',
					//flex: 1,
					layout: {
						type: 'hbox',
						//align: 'stretch'
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
							flex: 1,
							label: { type: 'bundle', key: 'remark' },
							bind: '{theDetail.remark}'
						}
					]
				},
				
				//ROW 4
				{//Label for Amt
					xtype: 'fieldset',
					margin: '5',
					style: 'border-top: 1px solid gray;',
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
				
				{//Row: BL Qty, BL Balance
					xtype: 'container',
					hidden: false,
					defaults: {
						margin: '0 0 0 0',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							margin: '0 5 2 0',
							textAlign: 'right',
						}
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{//Row Doc Amt
							xtype: 'container',
							defaults: {
								labelAlign: 'left',
								labelTextAlign: 'right',
								labelWidth: 100,
								margin: '0 5 0 0',
							},
							items: [
								{
									xtype: 'label',
									style: {
										'text-align': 'right'
									},
									width: 100,
									html: { type: 'bundle', key: 'whCheckImportDocAmt' }
								},
								{
									xtype: 'numberfield',
									flex: 1,
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 999999,
									textAlign: 'right',
									bind: {
										value: '{theDetail.qty}'
									},
									clearable: false,
									readOnly: true
								},
								{
									xtype: 'numberfield',
									flex: 1,
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 999999.999,
									textAlign: 'right',
									bind: {
										value: '{theDetail.mt}'
									},
									clearable: false,
									readOnly: true
								},
								{
									xtype: 'numberfield',
									flex: 1,
									ui: 'field-numbercolormodern',
									minValue: 0,
									maxValue: 999999.999,
									decimals: 3,
									textAlign: 'right',
									bind: {
										value: '{theDetail.m3}'
									},
									clearable: false,
									readOnly: true
								}
							]
						},
						{//Row Apron Balnace Amount
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									style: {
										'text-align': 'right'
									},
									width: 100,
									html: { type: 'bundle', key: 'whCheckImportBalance' }
								},
								{
									xtype: 'numberfield',
									flex: 1,
									ui: 'field-yellow',
									maxValue: 999999,
									bind: {
										value: '{theDetail.abQty}',
									},
									clearable: false,
									readOnly: true
								},
								{
									xtype: 'numberfield',
									flex: 1,
									ui: 'field-yellow',
									maxValue: 999999.999,
									decimals: 3,
									bind: {
										value: '{theDetail.abMt}',
									},
									clearable: false,
									readOnly: true
								},
								{
									xtype: 'numberfield',
									flex: 1,
									ui: 'field-yellow',
									maxValue: 999999.999,
									decimals: 3,
									bind: {
										value: '{theDetail.abM3}',
									},
									clearable: false,
									readOnly: true
								}
							]
						},
						{//Direct Balance Amount
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'label',
									style: {
										'text-align': 'right'
									},
									width: 100,
									html: { type: 'bundle', key: 'whCheckImportWHAmt' }
								},
								{
									xtype: 'numberfield',
									reference: 'ctlTxtWhQty',
									flex: 1,
		                        	ui: 'fieldnumberhht',
									value: 0,
									bind: {
										value: '{theDetail.whQty}',
									},
									minValue: 0,
									maxValue: 999999,
									selectOnFocus: true,
									readOnly: true,
									/*listeners: {
										change: 'onChangeQty'
									}*/
								},
								{
									xtype: 'numberfield',
									reference: 'ctlTxtWhMt',
									flex: 1,
		                        	ui: 'fieldnumberhht',
									decimals: 3,
									value: 0,
									bind: {
										value: '{theDetail.whWgt}',
									},
									minValue: 0,
									maxValue: 999999.999,
									selectOnFocus: true,
									readOnly: true
								},
								{
									xtype: 'numberfield',
									reference: 'ctlTxtWhM3',
									flex: 1,
		                        	ui: 'fieldnumberhht',
									decimals: 3,
									value: 0,
									bind: {
										value: '{theDetail.whM3}',
									},
									minValue: 0,
									maxValue: 999999.999,
									selectOnFocus: true,
									readOnly: true
								}
							]
						},
						{//Set Location Text box button
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'top'
							},
							items: [
								{
									xtype: 'label',
									style: {
										'text-align': 'right'
									},
									width: 100,
									html: { type: 'bundle', key: 'confirmLoadingLocation' }
								},
								{
									xtype: 'textfield',
									reference: 'ctlWhCheckImportLocId',
									width: 140,
									readOnly: false,
									required: true,
									bind: {
										value: '{theDetail.locId}'
									},
									ui: 'field-inputtextmodern',
									fieldStyle: 'text-transform:uppercase',
									editable: false,
									enforceMaxLength: true,
									clearable: false
								},
								{
									xtype: 'button',
									ui: 'action',
									textAlign: 'left',									
									margin: '0 5 5 0',
									iconCls: 'x-fa fa-search',
									text: { type: 'bundle', key: 'confirmLoadingWhAllocation' },
									handler: 'onWarehouseAllocation'
								},

							]

						},
						{	
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'left'
		                    },
		                    style: {
		                        'text-align': 'right'
		                    },
		                    items: [
		                        {
		                            xtype: 'button',
		                            reference: 'refsWHiBtnDimension',
		                            width: 150,
		                            html: { type: 'bundle', key: 'confirmLoadingDimension' },
		                            handler: 'onWHiTabDimension',
		                            ui: 'delete-button-modern',
		                            hidden: true
		                        }
		                    ]
						},
					]
				},
				//RBT. 2024 modified. Row confirm cancel button
				{
					//Row button Confirm Cancel
					xtype: 'container',
					margin: '0 5 5 5',
					layout: 'hbox',
					items:[
						{
							xtype: 'spacer',
							flex: 1
						},
						{
							xtype: 'button',
							reference: 'refConfirmWarehouseOutDamageBtn',
							text: { type: 'bundle', key: 'hht_damage' },
							width: 150,
							ui: 'retrieve-button-modern',
							value: 'damagecheckhht',
							handler: 'onOpenTblDamageCheck',
						},
						{
							xtype: 'spacer',
							width: 5
						},
						{
							xtype: 'button',
							text: { type: 'bundle', key: 'confirm' },
							textAlign: 'center',
							labelTextAlign: 'center',
							reference: 'refBtnHHTConfirmApronToWH',
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
					]
				}
			]
		}
	]
});