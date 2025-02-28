Ext.define('MOST.view.billing.ProofSheet', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-proofsheet',

	requires: [],

	controller: 'proofsheet',
	
	viewModel: {
		type: 'proofsheet'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	PROOFSHEET_TARIFF_GRID_REF_NAME : 'refTariffGrid',
	PROOFSHEET_TARIFF_STORE_NAME: 'tariff',

	MAIN_GRID_REF_NAME : 'refGatheredGrid',
	MAIN_STORE_NAME: 'gathered',
		
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	listeners:{
		afterrender: 'onLoad'
	},
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				margin: 0,
				padding: 0,
				items: [
					{
						xtype: 'fieldset',
						flex: 2.5,
						defaults: {
							labelAlign: 'right',
							labelWidth: 100,
						},
						margin: '0 5 0 0',
						padding: '10 10 10 10',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							width: '100%',
							margin: '0 0 5 0',
							labelWidth: 100,
							labelAlign: 'right'
						},
						items: [
							{
								xtype: 'shipcallnofield',
								reference: 'ctlScn',
								fieldLabel: ViewUtil.getLabel('shipCallNo'),
							},
							{
								xtype: 'vesselcalllistnolabel',
								fieldLabel: ViewUtil.getLabel('vessel'),
								reference: 'ctlVslCallId',
								allowBlank: false
							},
							{
								xtype: 'combobox',
								reference: 'ctlTemplate',
								fieldLabel: ViewUtil.getLabel('proofSheetTemplateName'),
								bind: {
									store: '{templateCombo}'
								},
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								value: '',
								labelAlign: 'right',
								listeners: {
									select: 'onComboTemplateChange'
								}
							},
							{
								xtype: 'combobox',
								reference: 'ctlTariffTp',
								fieldLabel: ViewUtil.getLabel('trfTpCd'),
								bind: {
									store: '{tariffTpCombo}'
								},
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								value: '',
								labelAlign: 'right',
								listeners: {
									select: 'onComboTarrifTypeChange',
								}
							}
						]
				},{//ROW1.COL2
					xtype: 'container',
					defaults: {
						labelAlign: 'right',
						labelWidth: 50
					},
					margin: '0 5 0 0',
					flex: 7.5,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [{//ROW1.COL2.ROW1
						xtype: 'fieldset',
						defaults: {
							labelAlign: 'right',
							labelWidth: 50
						},
						margin: '0 0 5 0',
						padding: '10 10 10 10',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						items: [{
							xtype: 'container',
							margin: '0 0 5 0', 
							layout: {
								type: 'hbox'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								flex: 1,
							},
							items: [{
								xtype:'combobox',
								labelWidth: 120,
								reference:'ctlTariffType',
								fieldLabel: ViewUtil.getLabel('trfTpCd'),
								bind: {
									store: '{tariffTpCombo}',
									value: '{theSearch.tariffTypeCd}'
								},
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								value: '',
								listeners:{
									select:'onComboBoxChange'
								}
							},{
							 	xtype:'combobox',
			 					reference:'ctlPayerCondition',
								fieldLabel: ViewUtil.getLabel('proofSheetPayer'),
								bind: {
									store: '{payerCombo}',
									value: '{theSearch.payer}'
								},
								queryMode: 'local',
		 						displayField: 'payerNm',
		 						valueField: 'payer',
		 						emptyText: 'Select',
								listeners:{
									select:'onComboBoxChange'
		 						}
							},{
							 	xtype:'combobox',
			 					reference:'ctlAdhoc',
								fieldLabel: ViewUtil.getLabel('proofSheetAdhoc'),
								bind: {
									store: '{adhocCombo}',
									value: '{theSearch.adhoc}'
								},
								queryMode: 'local',
	 							displayField: 'adhocNm',
		 						valueField: 'adhocId',
		 						emptyText: 'Select',
		 						editable: false,
								listeners:{
		 							select:'onComboBoxChange'
		 						}
							}]
						},{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align:'stretch'
							},
							flex : 1,
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								flex : 1
							},
							items: [
								{
									xtype: 'combobox',
									labelWidth: 120,
									reference:'ctlUserRefNoCombo',
									fieldLabel: ViewUtil.getLabel('proofSheetUserRefNo'),
									bind: {
										store: '{proofSheetUserRefNoCombo}',
										value: '{theSearch.userRefNo}'
									},
									queryMode: 'local',
									displayField: 'mfDocId',
									valueField: 'mfDocId',
									emptyText: 'Select Data',
									forceSelection:true,
								},
								{
									xtype: 'combobox',
									reference:'ctlSubBlSnNoCombo',
									fieldLabel: ViewUtil.getLabel('subBlOrSn'),
									bind: {
										store: '{proofSheetSubBlSNNoCombo}',
										value: '{theSearch.cgNo}',
									},
									queryMode: 'local',
									displayField: 'cgNo',
									valueField: 'cgNo',
									emptyText: 'Select Data',
									forceSelection:true,
								},
								{
								 	xtype:'combobox',
								 	editable: false,
				 					reference:'ctlRefNo',
									hidden: true,
									fieldLabel: ViewUtil.getLabel('proofSheetRefNo'),
									bind: {
										store: '{refNoCombo}',
										value: '{theSearch.refNo}'
									},
									queryMode: 'local',
			 						displayField: 'refNo',
			 						valueField: 'refNo',
		 							emptyText: 'Select',
			 						editable: false,
									labelAlign: 'right'
								 },
								 {
									xtype:'combobox',
									editable: false,
									reference:'ctlCostCenterCondition',
									fieldLabel: ViewUtil.getLabel('proofSheetCostCenter'),
									bind: {
										store: '{costCenterComboOfPs}',
										value: '{theSearch.costCenterCd}'
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									editable: false,
									hidden: true
								},
								{
									 xtype:'container',
									 layout:{
										 type:'hbox'
									 },
									 flex : 1,
									 items:[{
					 					xtype: 'button',
					 					flex : 0.5,
					 					margin : '0 5 0 85',
					 					iconCls: 'fa fa-check-square-o',
										text: ViewUtil.getLabel('proofSheetVerify'),
										listeners: {
											click: 'onVerify'
										}
									},{
						   				xtype: 'button',
						   				margin : '0 0 0 0',
						   				flex : 0.5,
						   				text: ViewUtil.getLabel('proofSheetUnverify'),
						   				iconCls: 'fa fa-undo',
						   				ui: 'delete-button',
						   				listeners: {
						   					click: 'onUnverify'
						   				}
									}]
								}
							]
						}]
					},{
						xtype: 'fieldset',
						margin: '0 0 0 0',
						padding: '10 10 10 10',
						defaults: {
							labelAlign: 'right',
							labelWidth: 50
						},
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						items: [{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 80
							},
							items: [
								{
									xtype:'container',
									layout:{
										type:'vbox',
										align: 'stretch'
									},
									defaults: {
										labelWidth: 120,
										labelAlign: 'right',
										margin: '0 0 5 0'
									},
									flex: 1,
									items:[
										{
											xtype:'combobox',
											editable: false,
											reference:'ctlPrefix',
											fieldLabel: 'Prefix',
											flex: 1,
											bind: {
												store: '{prefixCombo}',
												value: '{theDetail.prefix}'
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											editable: false
										},
										{
											xtype:'combobox',
											editable: false,
											reference:'ctlTaxType',
											fieldLabel: ViewUtil.getLabel('proofSheetGSTType'),
											flex: 1,
											bind: {
												store: '{taxTypeCombo}',
												value: '{theDetail.taxType}'
											},
											queryMode: 'local',
											displayField : 'gstTpCd',
				    						valueField : 'scd',
											value: '',
											editable: false,
											listeners: {
				    							select: 'onCboVatCdSelect'
				    						}
										},
										{
											xtype:'textfield',
											reference: 'txtUserRefNo',
											fieldLabel: ViewUtil.getLabel('proofSheetGSTValue'),
											bind: '{theDetail.taxValue}',
											flex: 1,
											margin: '0 0 0 0',
											readOnly: true,
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type:'vbox',
										align: 'stretch'
									},
									defaults: {
										labelWidth: 80,
										labelAlign: 'right',
										margin: '0 0 5 0'
									},
									flex: 1,
									items:[
										{
										  	xtype:'combobox',
										  	flex:1,
						  					reference:'ctlCostCenter',
											fieldLabel: ViewUtil.getLabel('proofSheetCostCenter'),
											bind: {
												store: '{costCenterComboOfPs}',
												value: '{theSearch.costCenter}'
											},
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select',
					  						editable: false
										},
										{
											xtype:'partnercdtypefield',
											reference:'ctlPartnerCodeType',
											fieldLabel:ViewUtil.getLabel('proofSheetPayer'),
											bind: {
												value: '{theDetail.payerCd}'
											},
											params:{
												searchModule: CodeConstants.LCD_MOST
											}
										},
									]
								},
								{
									xtype:'container',
									layout:{
										type:'vbox',
										align: 'stretch'
									},
									defaults: {
										labelWidth: 80,
										labelAlign: 'right',
										margin: '0 0 5 0'
									},
									flex: 1,
									items:[
										{
											xtype:'textfield',
											reference: 'txtUserRefNo',
											fieldLabel: ViewUtil.getLabel('userRefNo'),
											bind: '{theDetail.userRefNo}',
											readOnly: true,
										},
										{
											xtype:'textfield',
											reference: 'txtSubBlOrSn',
											fieldLabel: ViewUtil.getLabel('subBlOrSn'),
											bind: '{theDetail.cgNo}',
											readOnly: true,
										},
										{
											xtype: 'button',
											margin : '0 0 0 85',
											itemId: 'updateButton',
											text: ViewUtil.getLabel('update'),
											ui: 'update-button',
											iconCls: 'x-fa fa-pencil-square-o',
											listeners: {
												click: 'onUpdate'
											}
										}
									]
								},
								
								{
									xtype:'container',
			  	   					layout:{
			  	   						type:'hbox'
			  	   					},
			  	   					hidden: true,
			  	   					flex : 1,
			  	   					items:[
			  	   						{
				  	   						xtype: 'checkboxfield',
				  	   						boxLabel: ViewUtil.getLabel('proofSheetRefNo'),
				  	   						value: 'false',
				  	   						reference: 'ctlRefNoCheck',
				  	   						listeners: {
				  	   							change: 'onChange'
				  	   						}	
			  	   						},
			  	   						{
				  	   						xtype:'textfield',
				  	   						reference:'refRefNo',
				  	   						bind: '{theDetail.refNo}',
				  	   						fieldLabel:''
			  	   						}
			  	   					]
								},
								
							]
						}]
					}]
				}]
			},{//ROW 2: GRID 1 + 2
				xtype: 'container',
				flex: 1,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				defaults: {
					margin: '5 0 0 5'// top, right, bottom, left
				},
				items: [{
					xtype: 'fieldset',
					flex: 2.5,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						margin: '0 0 0 0',
						labelAlign: 'right'
					},
					margin: '5 5 0 0',
					padding: '0 0 0 0',
					items: [{
						xtype: 'tsb-datagrid',
						reference: me.PROOFSHEET_TARIFF_GRID_REF_NAME,
						stateful : true,
						flex:1,
						stateId : 'stateTariffGrid',
						plugins: [
							'gridexporter',
							'gridfilters',
							'clipboard'
						],
						bind: {
							store: '{' + me.PROOFSHEET_TARIFF_STORE_NAME + '}'
						},
						selModel: {
							type: 'spreadsheet',
							cellSelect: false,
						},
						listeners: {
						},
						columns: {
							defaults: {
								style : 'text-align:center',
								align : 'center'
							},
							items: GridUtil.getGridColumns('ProofsheetTariffList')
						}
					}]
				},{
					xtype: 'fieldset',
					flex: 7.5,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults: {
						margin: '5 5 0 0',
						labelAlign: 'right'
					},
					margin: '5 5 0 0',
					padding: '0 0 0 0',
					items: [{
						xtype: 'container',
						hidden: true,
						layout: {
							type: 'hbox'
						},
						items: [{
							xtype:'combobox',
							editable: false,
							reference:'ctlForeiqnCurrency',
							width: 300,
							fieldLabel: ViewUtil.getLabel('proofSheetForeiqnCurrency'),
							bind: {
								store: '{currencyCombo}',
								value: '{theSearch.crcyCd}'
							},
							listeners: {
								change: 'exchangeRate',
							},
							queryMode: 'local',
							displayField: 'currency',
							valueField: 'currency',
							value: 'USD',
							editable: false,
							labelAlign: 'right',
							labelWidth: 150
						},{
							xtype:'textfield',
							margin: '0 0 0 5',
							editable: false,
							reference:'refExchangeRate',
							width: 220,
							fieldLabel: ViewUtil.getLabel('proofSheetExchangeRate'),
							labelWidth: 90
						},{
							xtype:'textfield',
							margin: '0 0 0 5',
							editable: false,
							reference:'refApplyDate',
							width: 220,
							fieldLabel: ViewUtil.getLabel('proofSheetApplyDate'),
							labelWidth: 80
						}]
					},{
						xtype: 'tsb-datagrid',
						reference: me.MAIN_GRID_REF_NAME,
						stateful : true,
						flex:1,
						stateId : 'stateGatheredGrid',
						usePagingToolbar : false,
						plugins: [
							'gridexporter',
							'gridfilters',
							'clipboard'
						],
						bind: {
							store: '{' + me.MAIN_STORE_NAME + '}'
						},
						selModel: {
							type: 'spreadsheet',
							cellSelect: false,
							listeners: {
								select: 'onChecked',
								deselect:'onChecked'
							}
						},
						selType: 'checkboxmodel',
						checkOnly: false,
						listeners: {
							cellClick: 'onCellClick',
							cellDblClick: 'onDblClick'
						},
						columns: {
							defaults: {
								style : 'text-align:center',
								align : 'center'
							},
							items: GridUtil.getGridColumns('ProofsheetMain')
						}
					}]
				}]
			}],
			
			dockedItems:[{
				xtype: 'container',
				style: { 
					"background-color":"white" 
				},
				layout: {
					type: 'hbox',
				},
				defaults: {
				    margin: '1 1 5 1'
				},
				items: [{
						xtype: 'tbfill'
				},{
					xtype: 'button',
					itemId: 'inquiryItemId',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					itemId: 'saveItemId',
					reference:'refBtnSave',
					text: ViewUtil.getLabel('save'),
					iconCls: 'x-fa fa-save',
					listeners: {
						click: 'onSave'
					}
				},{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: 'onProofSheetPreview'
					},
					hidden: true
				},{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button',
					listeners: {
						click: 'onProofSheetExport'
					},
					hidden: true
				}]
			}]
		});
		
		me.callParent();
	}
});