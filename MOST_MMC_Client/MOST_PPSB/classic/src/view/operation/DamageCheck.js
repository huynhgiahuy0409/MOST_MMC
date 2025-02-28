Ext.define('MOST.view.operation.DamageCheck', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-damagecheckregistration',
	
	requires: [
		'MOST.view.operation.DamageCheckModel',
		'MOST.view.operation.DamageCheckController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Damage Check",
	width: 900,
	height: 700,
	scrollable: false,
	
	controller: 'damagecheck',
	
	viewModel: {
		type: 'damagecheck'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DAMAGE_STORE_REF_NAME: 'refDamamageStore',  
	DAMAGE_STORE_NAME: 'damageCheckDetail',           
	FILE_UPLOAD_STORE_NAME :'uploadedFileDamageStore',
	FILE_UPLOAD_REF_NAME : 'refFileUpload',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	
	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox'
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'vbox'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'vbox'
									},
									defaults: {
										labelWidth : 100,
										labelAlign : 'right',
										margin : '5 0 5 5',
										width : 420,
									},
									items: [
										{
											xtype: 'shipcallnofield',
											reference: 'ctlScn',
											emptyText: ViewUtil.getLabel('shipCallNo'),
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											flex: 0.53,
											bind: {
												value: '{theDmg.scn}',
											},
											
										},
										{
											xtype : 'vesselcalllistfield',
											reference : 'ctlVslCallId',
											fieldLabel : ViewUtil.getLabel('vslschCallId'),
											bind : {
												value : '{theDmg.vslCallId}'
											},
											allowBlank: false,
										},
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'vbox'
									},
									defaults: {
										labelWidth : 100,
										labelAlign : 'right',
										margin : '5 0 5 5',
										width : 420,
									},
									items: [
										{
											xtype : 'combobox',
											fieldLabel : ViewUtil.getLabel('blSN'),
											reference : 'ctlCgNo',
											bind: {
												store: '{snBlCombo}',
												value: '{theDmg.blsnNo}'
											},
											displayField: 'cdNm',
											valueField: 'cd',
											queryMode: 'local',
											listeners: {
												change: 'onBlSnChange'
											}
										},
										{
											xtype: 'container',
											hidden: true,
											layout: {
												type: 'hbox'
											},
											defaults: {
												labelAlign: 'right',
											},							
											items: [
												{	
													xtype: 'combo',
													fieldLabel: ViewUtil.getLabel('handlingIOGrDo'),
													reference: 'ctlDoGr',
													width: 220,
													bind: {
														store: '{doGrCombo}'
													},
													displayField: 'doGrNm',
													valueField: 'doGrCd',
													queryMode: 'local',
													editable: false
												},
												{
													xtype: 'combo',
													fieldLabel: ViewUtil.getLabel('LALorryNo'),
													reference: 'ctlLorryNo',
													width: 200,
													labelWidth: 80,
													bind: {
														store: '{lorryNoCombo}'
													},
													displayField: 'lorryNoNm',
													valueField: 'lorryNoCd',
													queryMode: 'local',
													editable: false
												}
											]
										},
										{
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('commodityGroup'),
											reference:'refTxtCommodityGroup',
											readOnly: true,
											bind:'{theDmg.cmdtGrpNm}'
										},
										{
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('commodity'),
											reference:'refTxtCommodity',
											readOnly: true,
											bind:'{theDmg.cmdtNm}'
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											items: [
												{
													xtype: 'label',
													margin: '0 0 0 140',
													width: 15,
													text: ViewUtil.getLabel('grPopupGrQty'),
												   },
												   {
													xtype: 'label',
													margin: '0 0 0 100',
													width: 15,
													text: ViewUtil.getLabel('grPopupGrWgt'),
												   },
												   {
													xtype: 'label',
													margin: '0 0 0 100',
													width: 15,
													text: ViewUtil.getLabel('grPopupGrMsrmt'),
												   },
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											items: [
												{
													xtype:'textfield',
													fieldLabel: 'Damage Amt',
													width : 200,
													labelWidth : 100,
													margin: '0 5 0 0',
													reference:'ctlDmgAmtQty',
													labelAlign: 'right',
													bind: {
														   value: '{theDmg.dmgQty}'
													   },
													maskRe: /(?!-)\d|\./,
													minValue: 0,
													maxValue: 999999999999,
													readOnly: false,
													listeners: {
														change: 'onChangeDamageAmt'
													}
												},
												{
													xtype:'textfield',
													reference:'ctlDmgAmtMT',
													margin: '0 5 0 5',
													width : 100,
													decimalPrecision: 3,
													readOnly: false,
													bind: {
														   value: '{theDmg.dmgMt}'
													   },
													maskRe: /(?!-)\d|\./,
													minValue: 0,
													maxValue: 999999999999,
												},
												{
													xtype:'textfield',
													reference:'ctlDmgAmtM3',
													margin: '0 5 0 5',
													width : 100,
													bind: {
														   value: '{theDmg.dmgM3}'
													   },
													maskRe: /(?!-)\d|\./,
													decimalPrecision: 3,
													readOnly: false,
													minValue: 0,
													maxValue: 999999999999,
												}
											]
										},
										{
											xtype: 'datetimefield',
											fieldLabel : ViewUtil.getLabel('checkTime'),
											reference : 'ctlCheckTime',
											width : 250,
											labelWidth : 100,
											labelAlign : 'right',
											margin : '0 0 0 5',
											editable: false,
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
										},
										{
											xtype : 'combobox',
											fieldLabel : ViewUtil.getLabel('damage.part'),
											reference : 'ctlTheDamagePart',
											emptyText: "Select",
											bind: {
												store: '{theDamageParts}',
												value: '{theDmg.dmgPart}'
											},
											width : 420,
											labelWidth : 100,
											queryMode: 'local',
											displayField: 'invDesc',
											valueField: 'invCd',
											disabled: true,
										},
										{
											xtype : 'combobox',
											fieldLabel : ViewUtil.getLabel('damage.level'),
											reference : 'ctlTheDamageLevel',
											emptyText: "Select",
											bind: {
												store: '{theDamageLevels}',
												value: '{theDmg.dmgLevel}'
											},
											width : 420,
											labelWidth : 100,
											queryMode: 'local',
											displayField: 'invDesc',
											valueField: 'invCd',
											disabled: true,
										},
									]
								},
								{
									xtype : 'combobox',
									fieldLabel : ViewUtil.getLabel('damage.desc'),
									reference : 'ctlDamageDescription',
									emptyText: "Select",
									bind: {
										store: '{theDamageDesc}',
										value: '{theDmg.dmgDesc}'
									},
									width : 420,
									labelWidth : 100,
									margin : '5 0 5 5',
									labelAlign: 'right',
									queryMode: 'local',
									displayField: 'cdNm',
									valueField: 'cd',
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'button',
											margin : '25 0 5 155',
											reference: 'btnClear',
											text: ViewUtil.getLabel('equipmentSettingClear'),
											iconCls: 'fa fa-file-o',
											disabled: false,
											listeners: {
												click:'onClearDmg_clickHandler'
											}
										},
										{
											xtype: 'button',
											margin : '25 0 5 5',
											reference: 'btnAdd',
											text: ViewUtil.getLabel('add'),
											iconCls: 'x-fa fa-plus',
											disabled: false,
											listeners: {
												click:'onAddDmg_clickHandler'
											}
										},
										{
											xtype: 'button',
											margin : '25 0 5 5',
											reference: 'btnUpdate',
											text: 'Update',
											listeners: {
												click:'onUpdateDmg_clickHandler'
											}
										},
										{
											xtype: 'button',
											margin : '25 0 5 5',
											text: ViewUtil.getLabel('delete'),
											 ui: 'delete-button',
											 iconCls: 'x-fa fa-minus',
											reference: 'btnRemove',
											listeners: {
												click:'onRemoveDmg_clickHandler'
											}
										},
									]
								},
								
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox'
							},
							defaults: {
								labelWidth : 100,
								labelAlign : 'right',
								margin : '5 0 5 5',
								width : 420,
							},
							items: [
								{
									xtype: 'textfield',
									flex: 1,
									labelAlign: 'right',
									labelWidth: 100,
									fieldLabel: ViewUtil.getLabel('agent'),
									reference: 'ctlAgent',
									bind: { value: '{theUnitInfo.agentId}' },
									allowBlank: false,
								},
								{
									xtype: 'textfield',
									flex: 1,
									labelAlign: 'right',
									labelWidth: 100,
									fieldLabel: ViewUtil.getLabel('stevedore'),
									reference: 'ctlStevedore',
									bind: { value: '{theUnitInfo.stevedoreId}' },
									allowBlank: false,
								},
								{
									xtype : 'combobox',
									fieldLabel : ViewUtil.getLabel('pkgNo'),
									reference : 'ctlPkgNo',
									bind: {
										store: '{pkgNoCombo}',
										value: '{theDmg.pkgNo}'
									},
									displayField: 'pkgNo',
									valueField: 'pkgNo',
									queryMode: 'local',
									// listeners: {
									// 	change: 'onBlSnChange'
									// }
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'textfield',
											width: 290,
											flex: 1,
											labelAlign: 'right',
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('unitNo'),
											reference: 'ctlUnitNo',
											editable: false,
											bind: { value: '{theUnitInfo.unitNo}' },
											readOnly: false,
											disabled: true
										},
										{
											xtype: 'button',
											margin: '0 5 0 5',
											reference: 'ctlUnitPopup',
											iconCls: 'x-fa fa-search',
											listeners: {
												click: 'openUnitNoPopupDamage'
											}
										}
		
									]
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('brand'),
									reference: 'ctlBrand',
									// flex: 1,
									labelWidth: 100,
									bind: '{theUnitInfo.brandNm}',
									fieldStyle: 'text-transform:uppercase',
									readOnly: true,
									disabled: true
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('model'),
									reference: 'ctlModel',
									bind: '{theUnitInfo.modelNm}',
									fieldStyle: 'text-transform:uppercase',
									readOnly: true,
									disabled: true
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: "3 0 0 25",
											text: 'Check Location',
										},
										{
											xtype: 'radiogroup',
											layout: 'hbox',
											reference: 'ctlTypeOfLocation',
											listeners: {
        		                                change: 'onCheckLocChange',
												bind: 'theDmg.locCd'
        		                            },
											items: [
												{
													xtype: "radiofield",
													boxLabel: ViewUtil.getLabel("vessel"),
													reference: "refRadioVessel",
													name: "location_radio",
													margin: "0 0 0 23",
													inputValue: "VSL",
													checked: true,
												},
												{
													xtype: "radiofield",
													boxLabel: ViewUtil.getLabel("yards"),
													reference: "refRadioYards",
													name: "location_radio",
													margin: "0 0 0 23",
													inputValue: "YARD",
													checked: false,
												},
												{
													xtype: "radiofield",
													boxLabel: 'Gate',
													reference: "refRadioGate",
													name: "location_radio",
													margin: "0 0 0 23",
													inputValue: "GATE",
													checked: false,
												},
											]
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults: {
										margin: '1 1 1 1'
									},
									items: [
										{
											xtype: 'filefield',
											name : 'fileUpload',
											itemId: 'createButton',
											reference: 'refFileField',
											id: 'fileUploadDamageCG',
											buttonText: '',
											enctype: 'multipart/form-data',
											method: 'POST',
											fileUpload: true,
											buttonOnly: true,
											multiple: true,
											margin : '5 0 5 245',
											width: 100,
											style: 'text-align:left',
											buttonConfig: {
												text:  ViewUtil.getLabel('add'),
												iconCls: 'x-fa fa-plus',
											},
											listeners: {
												change: 'onAddFile_clickHandler',
												afterrender:function(cmp){
													cmp.fileInputEl.set({
		//			        		                	accept: 'image/*' //only accept image
														multiple:'multiple'
													});
												}
											}
										},
										{
											xtype: 'button',
											margin : '5 0 5 5',
											reference: 'btnRemoveFile',
											text: ViewUtil.getLabel('delete'),
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											disabled: false,
											listeners: {
												click:'onRemoveFile_clickHandler'
											}
										},
									]
								},
								{
									xtype: 'tsb-datagrid',
									usePagingToolbar : false,
									reference: me.FILE_UPLOAD_REF_NAME,
									height: 90,
									width : 315,
									margin : '5 0 5 110',
									plugins: [
										'gridexporter',
										'gridfilters',
									],
									bind: {
										store: '{' + me.FILE_UPLOAD_STORE_NAME + '}'
									},
									listeners: {
										celldblclick: 'onFileDownloadDblClick'
									},
									selModel: {
										type: 'checkboxmodel',  
										checkOnly: false,
										showHeaderCheckbox: true
									},
									columns: {
										defaults: {
											style : 'text-align:center',
											align: 'center'
										},
										items: GridUtil.getGridColumns('UploadDamageGridList')
									}
								},
								{
									xtype: 'textareafield',
									fieldLabel: ViewUtil.getLabel('remark'),
									reference: 'ctlDamageRemark',
									labelAlign: 'right',
									width : 420,
									bind: '{theDmg.dmgRemark}'
								},
							]
						}
					]
				},
				{
					xtype: 'tsb-datagrid',
					height: 150,
					width: 420,
					usePagingToolbar : false,
					reference: me.DAMAGE_STORE_REF_NAME,
					plugins: [
						'clipboard',
						'gridfilters',
					],
					stateful: true,
					stateId: "",
					viewConfig: {
						stripeRows: true,
						enableTextSelection: true,
					},
					bind: {
						store: '{' + me.DAMAGE_STORE_NAME + '}'
					},
					listeners: {
						cellclick: 'onDamageDetailGridClick'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					columns: {
						defaults: {
							style : 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('DamageGridList')
					}
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							flex: 1,
						},
						{
							xtype: 'button',
							width: 100,
							margin : '15 0 5 0',
							reference: 'btnConfirm',
							text: ViewUtil.getLabel('confirm'),
							listeners: {
								click:'onConfirm_clickHandler'
							}
						},
						{
							xtype: 'container',
							flex: 1,
						},
					]
				}
			],
		});
		
		me.callParent();
	}
});