Ext.define('MOST.view.planning.DGDetail', {
	extend: 'Ext.form.Panel',

	alias: 'widget.dgdetail',

	requires: [
		//	'MOST.view.document.DGDetailModel',
		//	'MOST.view.document.DGDetailController'
	],

	//controller: 'DGDetail',

	//	viewModel: {
	//		type: 'dgdeclaration'
	//	},

	width: 940,
	height: 850,
	scrollable: true,
	//flex:1,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	listeners: {
		afterrender: 'onDetailLoad',
	},

	config: {
		recvData: null
	},

	config: {
		recvData: null
	},

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults: {
						margin: '0 10 2 0'
					},
					items: [
						{
							reference: 'ctlDangerousGoodDeclaration',
							xtype: 'label',
							margin: '3 0 3 0',
							style: 'text-align:center;font-weight: bold;',
							html: ViewUtil.getLabel('dangerousGoodDeclaration'),
						},
						{
							reference: 'ctlAgent',
							xtype: 'textfield',
							bind: '{theDG.arrvSaId}',
							name: 'arrvSaId',
							width: 700,
							editable: false,
							fieldLabel: ViewUtil.getLabel('agent'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							reference: 'ctlContactPerson',
							xtype: 'textfield',
							bind: '{theDG.contactNm}',
							name: 'contactNm',
							width: 700,
							fieldLabel: ViewUtil.getLabel('contactPerson'),
							fieldStyle: 'background-color: #e6f2ff;',
							allowBlank: false,
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							reference: 'ctlContactNo',
							xtype: 'textfield',
							bind: '{theDG.contactNo}',
							name: 'contactNo',
							width: 700,
							fieldLabel: ViewUtil.getLabel('contactNo'),
							fieldStyle: 'background-color: #e6f2ff;',
							allowBlank: false,
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							reference: 'ctlCargoNo',
							xtype: 'textfield',
							name: 'cgNo',
							bind: '{theDG.cgNo}',
							width: 700,
							editable: false,
							fieldLabel: ViewUtil.getLabel('cargoNo'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							reference: 'ctlConsigneeNm',
							xtype: 'textfield',
							bind: '{theDG.impNm}',
							name: 'impNm',
							width: 700,
							editable: false,
							fieldLabel: ViewUtil.getLabel('consigneeNm'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							reference: 'ctlConsigneeAddr',
							xtype: 'textfield',
							bind: '{theDG.impAddr}',
							name: 'impAddr',
							width: 700,
							editable: false,
							fieldLabel: ViewUtil.getLabel('consigneeAddr'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							reference: 'ctlShipperNm',
							xtype: 'textfield',
							bind: '{theDG.expNm}',
							name: 'expNm',
							width: 700,
							editable: false,
							fieldLabel: ViewUtil.getLabel('shipperNm'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							reference: 'ctlShipperAddr',
							xtype: 'textfield',
							bind: '{theDG.expAddr}',
							name: 'expAddr',
							width: 700,
							editable: false,
							fieldLabel: ViewUtil.getLabel('shipperAddr'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							reference: 'ctlNameOfVessel',
							xtype: 'textfield',
							bind: '{theDG.vslNm}',
							name: 'vslNm',
							width: 700,
							editable: false,
							fieldLabel: ViewUtil.getLabel('nameOfVessel'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							xtype: 'container',
							height: 32,
							margin: '0 5 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									reference: 'ctlTerminal',
									xtype: 'textfield',
									name: 'terminal',
									value: 'Johor Port Bulk & Break Bulk Terminal',
									flex: 1,
									editable: false,
									fieldLabel: ViewUtil.getLabel('terminal'),
									labelWidth: 180
								},
								{
									reference: 'ctlEta',
									xtype: 'datefield',
									bind: '{theDG.eta}',
									name: 'eta',
									flex: 1,
									editable: false,
									readOnly: true,
									fieldLabel: ViewUtil.getLabel('eta'),
									labelWidth: 120,
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
								}
							]
						},
						{
							xtype: 'container',
							margin: '0 5 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									reference: 'ctlBerthLocation',
									xtype: 'textfield',
									bind: '{theDG.berthLoc}',
									name: 'berthLoc',
									flex: 1,
									editable: false,
									fieldLabel: ViewUtil.getLabel('berthLocation'),
									labelWidth: 180
								},
								{
									reference: 'ctlVoyageCode',
									xtype: 'textfield',
									bind: '{theDG.inbVoy}',
									name: 'inbVoy',
									flex: 1,
									editable: false,
									fieldLabel: ViewUtil.getLabel('voyageCode'),
									labelWidth: 120
								}
							]
						},
						{
							xtype: 'container',
							margin: '0 5 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									reference: 'ctlLastPortOfCall',
									xtype: 'textfield',
									bind: '{theDG.lastPort}',
									name: 'lastPort',
									flex: 1,
									editable: false,
									fieldLabel: ViewUtil.getLabel('lastPortOfCall'),
									labelWidth: 180
								},
								{
									reference: 'ctlNextPortOfCall',
									xtype: 'textfield',
									bind: '{theDG.nxtPort}',
									name: 'nxtPort',
									flex: 1,
									editable: false,
									fieldLabel: ViewUtil.getLabel('nextPortOfCall'),
									labelWidth: 120
								}
							]
						},
						{
							xtype: 'container',
							margin: '0 5 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'radiogroup',
									flex: 1,
									width: 400,
									reference: 'ctlFzNonFzCargo',
									name: 'freeZoneDiv',
									fieldLabel: ViewUtil.getLabel('fzNonFzCargo'),
									labelWidth: 180,
									labelAlign: 'right',
									bind: '{freeZoneDivVal}',
									items: [
										{
											xtype: 'radiofield',
											disabled: true,
											name: 'freeZoneDiv',
											margin: '0 0 0 10',
											boxLabel: ViewUtil.getLabel('fzCargo'),
											inputValue: 'FZN',
											checked: true
										},
										{
											xtype: 'radiofield',
											disabled: true,
											name: 'freeZoneDiv',
											boxLabel: ViewUtil.getLabel('nonFzCargo'),
											inputValue: 'NFZ'
										}
									]
								}
							]
						},
						{
							reference: 'ctlCategory',
							margin: '0 10 2 0',
							xtype: 'textfield',
							bind: '{theDG.catgCd}',
							name: 'catgCd',
							width: 700,
							editable: false,
							fieldLabel: ViewUtil.getLabel('category'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							xtype: 'container',
							margin: '0 10 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									reference: 'ctlReferenceNo',
									xtype: 'textfield',
									bind: '{theDG.refNo}',
									name: 'refNo',
									width: 400,
									editable: false,
									fieldLabel: ViewUtil.getLabel('referenceNo'),
									labelWidth: 180
								},
								{
									reference: 'ctlSubstance',
									xtype: 'textfield',
									bind: '{theDG.propSnm}',
									name: 'propSnm',
									width: 295,
									fieldLabel: ViewUtil.getLabel('substance'),
									fieldStyle: 'background-color: #e6f2ff;',
									allowBlank: false,
									labelWidth: 120
								}
							]
						},
						{
							xtype: 'container',
							margin: '0 10 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									reference: 'ctlUnno',
									xtype: 'textfield',
									bind: '{theDG.unno}',
									name: 'unno',
									width: 400,
									fieldStyle: 'background-color: #e6f2ff;',
									editable: false,
									fieldLabel: ViewUtil.getLabel('uNNoClass'),
									labelWidth: 180
								},
								{
									reference: 'ctlImdg',
									xtype: 'cmmcdfield',
									bind: { value: '{theDG.imdg}' },
									name: 'imdg',
									width: 200,
									fieldStyle: 'background-color: #e6f2ff;',
									labelWidth: 10,
									editable: false,
									params: {
										searchType: 'IMDG'
									}
								}
							]
						},
						{
							xtype: 'combobox',
							margin: '0 10 2 0',
							reference: 'ctlProperShippingNm',
							width: 600,
							fieldStyle: 'background-color: #e6f2ff;',
							//allowBlank: false,
							labelWidth: 180,
							labelAlign: 'right',
							fieldLabel: ViewUtil.getLabel('properShippingNm'),
							name: 'substance',
							editable: false,
							bind: {
								store: '{substanceCombo}',
								value: '{theDG.substance}'
							},
							listeners: {
								select: 'onSelectSubstance'
							},
							queryMode: 'local',
							value: '',
							displayField: 'substance',
							valueField: 'substance',
						},
						{
							xtype: 'container',
							margin: '0 10 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									reference: 'ctlFlashPoint',
									xtype: 'textfield',
									bind: '{theDG.flashPnt}',
									name: 'flashPnt',
									width: 400,
									fieldLabel: ViewUtil.getLabel('flashPoint'),
									labelWidth: 180
								},
								{
									reference: 'ctlHazchemCode',
									xtype: 'textfield',
									bind: '{theDG.hazChem}',
									name: 'hazChem',
									width: 295,
									enforceMaxLength: true,
									maxLength: 3,
									fieldLabel: ViewUtil.getLabel('hazchemCode'),
									fieldStyle: 'background-color: #e6f2ff;',
									allowBlank: false,
									labelWidth: 120
								}
							]
						},
						{
							xtype: 'container',
							margin: '0 10 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									reference: 'ctlJpaGroup',
									xtype: 'textfield',
									bind: '{theDG.priGrp}',
									name: 'priGrp',
									width: 400,
									fieldLabel: ViewUtil.getLabel('jpaGroup'),
									allowBlank: true,
									editable : false,
									labelWidth: 180
								},
								{
									reference: 'ctlJpaCode',
									xtype: 'textfield',
									bind: '{theDG.priCd}',
									name: 'priCd',
									width: 295,
									enforceMaxLength: true,
									maxLength: 5,
									fieldLabel: ViewUtil.getLabel('jpaCode'),
									allowBlank: true,
									editable : false,
									labelWidth: 120
								}
							]
						},
						{
							reference: 'ctlPkgMt',
							margin: '0 10 2 0',
							xtype: 'textfield',
							bind: '{theDG.pkgQty}',
							name: 'pkgQty',
							width: 700,
							fieldLabel: ViewUtil.getLabel('packageMt'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							xtype: 'container',
							margin: '0 10 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									reference: 'ctlPkg',
									xtype: 'cmmcdfield',
									bind: { value: '{theDG.pkg}' },
									name: 'pkg',
									width: 300,
									editable: false,
									fieldLabel: ViewUtil.getLabel('packageType'),
									labelWidth: 180,
									labelAlign: 'right',
									params: {
										searchType: 'COMM',
										searchDivCd: 'PKGTP',
										searchLcd: 'MT',
									}
								},
								{
									reference: 'ctlPkgNm',
									margin: '0 0 0 5',
									xtype: 'textfield',
									bind: '{theDG.pkgtpcdnm}',
									name: 'pkgtpcdnm',
									flex: 1,
									fieldStyle: 'background-color: #e6f2ff;',
									labelWidth: 10,
									editable: false,
								}
							]
						},
						{
							reference: 'refLblCondition',
							hidden: true,
							margin: '0 10 2 15',
							xtype: 'label',
							width: 700,
							html: ViewUtil.getLabel('dg_condition'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							xtype: 'container',
							reference: 'refCondition',
							hidden: true,
							margin: '0 10 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0',
								labelAlign: 'right'
							},
							items: [,
								{
									xtype: 'checkboxgroup',
									margin: '2 5 0 15',
									labelAlign: 'right',
									columns: 1,
									flex: 1,
									items: [
										{ boxLabel: ViewUtil.getLabel('dg_cond1'), reference: 'refChkSHP', flex: 1, name: 'rb', readOnly: true },
										{ boxLabel: ViewUtil.getLabel('dg_cond2'), reference: 'refChkSHA', flex: 1, name: 'rb', readOnly: true },
										{ boxLabel: ViewUtil.getLabel('dg_cond3'), reference: 'refChkTRK', flex: 1, name: 'rb', readOnly: true },
										{ boxLabel: ViewUtil.getLabel('dg_cond4'), reference: 'refChkFWD', flex: 1, name: 'rb', readOnly: true },
										{ boxLabel: ViewUtil.getLabel('dg_cond5'), reference: 'refChkCNS', flex: 1, name: 'rb', readOnly: true },
										{ boxLabel: ViewUtil.getLabel('dg_cond6'), reference: 'refChkTLY', flex: 1, name: 'rb', readOnly: true },
										{ boxLabel: ViewUtil.getLabel('dg_cond7'), reference: 'refChkREP', flex: 1, name: 'rb', readOnly: true },
									]
								},
							]
						},
						{
							reference: 'ctlRemark',
							margin: '0 10 2 0',
							xtype: 'textfield',
							bind: '{theDG.rmk1}',
							name: 'rmk1',
							width: 700,
							fieldLabel: ViewUtil.getLabel('remark'),
							labelWidth: 180,
							labelAlign: 'right'
						},
						{
							xtype: 'container',
							margin: '0 10 2 0',
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							items: [,
								{
									xtype: 'label',
									labelAlign: 'bottom',
									margin: '0 20 0 10',
									text: ViewUtil.getLabel('attachment'),
									width: 180,
								},
								{
									xtype: 'tbfill'
								},
								{
									xtype: 'container',
									margin: '10 0 5 0',
									reference: 'refAddRemove',
									layout: {
										type: 'hbox',
										align: 'stretch',
										pack: 'end'
									},
									items: [,
										{
											xtype: 'filefield',
											name: 'fileUpload',
											itemId: 'createButton',
											id: 'dgListFileUpload',
											style: 'text-align:left',
											method: 'POST',
											width: 80,
											fileUpload: true,
											enctype: 'multipart/form-data',
											buttonText: '',
											buttonOnly: true,
											multiple: true,
											buttonConfig: {
												text: "Add",
												reference: 'refBtnCreate',
												height: 28,
												iconCls: 'x-fa fa-plus'
											},
											listeners: {
												change: 'onAddForFileUpload',
												afterrender: function (cmp) {
													cmp.fileInputEl.set({
														multiple: 'multiple'
													});
												}
											}
										},
										{
											xtype: 'button',
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											text: 'Remove',
											reference: 'refBtnDelete',
											maxHeight: 28,
											width: 90,
											listeners: {
												click: 'onDgFileUploadGridRemove'
											}
										},
									]
								},
							]
						},
						{
							xtype: 'container',
							height: 70,
							margin: '0 10 2 10',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'grid',
									flex: 1,
									reference: 'refDGUploadGrid',
									stateful: true,
									stateId: 'stateDGUploadGrid',
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{dgUpload}'
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
											style: 'text-align:center',
											align: 'center'
										},
										items: [
											{
												xtype: 'rownumberer',
												width: 50,
												align: 'center'
											},
											{
												header: ViewUtil.getLabel('fileName'),
												dataIndex: 'fileName',
												reference: 'refFileName',
												filter: 'string',
												flex: 1
											},
											{
												header: ViewUtil.getLabel('fileSize'),
												dataIndex: 'fileSize',
												reference: 'refFileSize',
												xtype: 'numbercolumn',
												align: 'right',
												format: '0,000',
											}
										]
									}
								}
							]
						},
						{
							xtype: 'container',
							margin: '5 0 5 0',
							layout: {
								type: 'hbox',
								align: 'center'
							},
							items: [
								{
									xtype: 'tbfill'
								},
								{
									xtype: 'button',
									margin: '0 10 0 0',
									width: 100,
									text: ViewUtil.getLabel('submit'),
									reference: 'refBtnSubmit',
									hidden: true,
									
									listeners: {
										click: 'onSubmit'
									}
								},
								{
									xtype: 'button',
									margin: '0 10 0 0',
									width: 100,
									text: ViewUtil.getLabel('close'),
									reference: 'refBtnClose',
									listeners: {
										click: 'onClose'
									}
								},
								{
									xtype: 'tbfill'
								},
							]
						}
					]
				}
			]
		});

		me.callParent();
	}

});