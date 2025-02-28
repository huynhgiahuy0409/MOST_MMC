Ext.define('MOST.view.document.DGDeclarationDoc', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-dgdeclarationdoc',
	
	requires: [
		'MOST.view.document.DGDeclarationModel'
	],
	
	controller: 'dgdeclaration',
	
	viewModel: {
		type: 'dgdeclaration'
	},
	
	//width: 900,
	//height: 900,
	scrollable: true,
	padding: '0 0 0 0',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	closeAction: 'destroy',

	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
					xtype : 'form',
					width: 900,
					//padding: '0 0 0 0',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							reference : 'ctlDangerousGoodDeclaration',
							xtype : 'label',
							margin : '5 0 5 0',
							style : 'text-align:center;font-weight: bold;',
							html : ViewUtil.getLabel('dangerousGoodDeclaration')
						},{
							reference : 'ctlAgent',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.arrvSaId}',
							name : 'arrvSaId',
							width : 700,
							editable : false,
							fieldLabel : ViewUtil.getLabel('agent'),
							labelWidth : 180,
							labelAlign : 'right'
						},{
							reference : 'ctlContactPerson',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.contactNm}',
							name : 'contactNm',
							width : 700,
							fieldLabel : ViewUtil.getLabel('contactPerson'),
							fieldStyle : 'background-color: #00CCFF;',
							allowBlank : false,
							labelWidth : 180,
							labelAlign : 'right'
						},{
							reference : 'ctlContactNo',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.contactNo}',
							name : 'contactNo',
							width : 700,
							fieldLabel : ViewUtil.getLabel('contactNo'),
							fieldStyle : 'background-color: #00CCFF;',
							allowBlank : false,
							maxLength: 40,
							labelWidth : 180,
							labelAlign : 'right'
						},{
							reference : 'ctlCargoNo',
							margin : '0 10 2 0',
							xtype : 'textfield',
							name : 'cgNo',
							bind : '{theDG.cgNo}',
							width : 700,
							editable : false,
							fieldLabel : ViewUtil.getLabel('cargoNo'),
							labelWidth : 180,
							labelAlign : 'right'
						},{
							reference : 'ctlConsigneeNm',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.impNm}',
							name : 'impNm',
							width : 700,
							editable : false,
							fieldLabel : ViewUtil.getLabel('consigneeNm'),
							labelWidth : 180,
							labelAlign : 'right'
						},{
							reference : 'ctlConsigneeAddr',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.impAddr}',
							name : 'impAddr',
							width : 700,
							editable : false,
							fieldLabel : ViewUtil.getLabel('consigneeAddr'),
							labelWidth : 180,
							labelAlign : 'right'
						},{
							reference : 'ctlShipperNm',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.expNm}',
							name : 'expNm',
							width : 700,
							editable : false,
							fieldLabel : ViewUtil.getLabel('shipperNm'),
							labelWidth : 180,
							labelAlign : 'right'
						},{
							reference : 'ctlShipperAddr',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.expAddr}',
							name : 'expAddr',
							width : 700,
							editable : false,
							fieldLabel : ViewUtil.getLabel('shipperAddr'),
							labelWidth : 180,
							labelAlign : 'right'
						},{
							reference : 'ctlNameOfVessel',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.vslNm}',
							name : 'vslNm',
							width : 700,
							editable : false,
							fieldLabel : ViewUtil.getLabel('nameOfVessel'),
							labelWidth : 180,
							labelAlign : 'right'
						},{
							xtype : 'container',
							margin : '0 5 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									reference : 'ctlTerminal',
									xtype : 'textfield',
									name : 'terminal',
									value : 'Johor Port Bulk & Break Bulk Terminal',
									width : 400,
									editable : false,
									fieldLabel : ViewUtil.getLabel('terminal'),
									labelWidth : 180
								},{
									reference : 'ctlEta',
									xtype : 'datefield',
									bind : '{theDG.eta}',
									name : 'eta',
									flex : 1,
									editable : false,
									readOnly : true,
									fieldLabel : ViewUtil.getLabel('eta'),
									labelWidth : 120,
									format : MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
								}
							]
						},{
							xtype : 'container',
							margin : '0 5 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									reference : 'ctlBerthLocation',
									xtype : 'textfield',
									bind : '{theDG.berthLoc}',
									name : 'berthLoc',
									width : 400,
									editable : false,
									fieldLabel : ViewUtil.getLabel('berthLocation'),
									labelWidth : 180
								},{
									reference : 'ctlVoyageCode',
									xtype : 'textfield',
									bind : '{theDG.voyage}',
									name : 'inbVoy',
									flex : 1,
									editable : false,
									fieldLabel : ViewUtil.getLabel('voyageCode'),
									labelWidth : 120
								}
							]
						},{
							xtype : 'container',
							margin : '0 5 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									reference : 'ctlLastPortOfCall',
									xtype : 'textfield',
									bind : '{theDG.portCd}',
									name : 'lastPort',
									width : 400,
									editable : false,
									fieldLabel : ViewUtil.getLabel('lastPortOfCall'),
									labelWidth : 180
								},{
									reference : 'ctlNextPortOfCall',
									xtype : 'textfield',
									bind : '{theDG.portCdNext}',
									name : 'nxtPort',
									flex : 1,
									editable : false,
									fieldLabel : ViewUtil.getLabel('nextPortOfCall'),
									labelWidth : 120
								}
							]
						},{
							xtype : 'container',
							margin : '0 5 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									xtype : 'radiogroup',
									flex : 1,
									width : 400,
									reference : 'ctlFzNonFzCargo',
									name : 'freeZoneDiv',
									fieldLabel : ViewUtil.getLabel('fzNonFzCargo'),
									labelWidth : 180,
									labelAlign : 'right',
									bind : '{freeZoneDivVal}',
									items : [
										{
											xtype : 'radiofield',
											name : 'freeZoneDiv',
											margin : '0 0 0 10',
											boxLabel : ViewUtil.getLabel('fzCargo'),
											inputValue : 'FZN',
											checked : true
										},{
											xtype : 'radiofield',
											name : 'freeZoneDiv',
											boxLabel : ViewUtil.getLabel('nonFzCargo'),
											inputValue : 'NFZ'
										}
									]
								}
							]
						},{
							reference : 'ctlCategory',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.catgCd}',
							name : 'catgCd',
							width : 700,
							editable : false,
							fieldLabel : ViewUtil.getLabel('category'),
							labelWidth : 180,
							labelAlign : 'right'
						},{
							xtype : 'container',
							margin : '0 10 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									reference : 'ctlReferenceNo',
									xtype : 'textfield',
									bind : '{theDG.refNo}',
									name : 'refNo',
									width : 400,
									editable : false,
									fieldLabel : ViewUtil.getLabel('referenceNo'),
									labelWidth : 180
								},{
									reference : 'ctlSubstance',
									xtype : 'textfield',
									bind : '{theDG.propSnm}',
									name : 'propSnm',
									width : 295,
									fieldLabel : ViewUtil.getLabel('substance'),
									fieldStyle : 'background-color: #00CCFF;',
									allowBlank : false,
									labelWidth : 120
								}
							]
						},{
							xtype : 'container',
							margin : '0 10 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									reference : 'ctlUnno',
									xtype : 'textfield',
									bind : '{theDG.unno}',
									name : 'unno',
									width : 400,
									fieldStyle : 'background-color: #00CCFF;',
									editable : false,
									fieldLabel : ViewUtil.getLabel('uNNoClass'),
									labelWidth : 180
								},{
									reference : 'ctlImdg',
									xtype : 'cmmcdfield',
									bind : {
										value : '{theDG.imdg}'
									},
									name : 'imdg',
									width : 200,
									fieldStyle : 'background-color: #00CCFF;',
									labelWidth : 10,
									editable : false,
									params : {
										searchType : 'IMDG'
									}
								}
							]
						},{
							xtype : 'combobox',
							margin : '0 10 2 0',
							reference : 'ctlProperShippingNm',
							width : 600,
							fieldStyle : 'background-color: #00CCFF;',
							labelWidth : 180,
							labelAlign : 'right',
							fieldLabel : ViewUtil.getLabel('properShippingNm'),
							name : 'substance',
							editable : false,
							bind : {
								store : '{substanceCombo}',
								value : '{theDG.substance}'
							},
							listeners : {
								select : 'onSelectSubstance'
							},
							queryMode : 'local',
							value : '',
							displayField : 'substance',
							valueField : 'substance',
						},{
							xtype : 'container',
							margin : '0 10 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									reference : 'ctlFlashPoint',
									xtype : 'textfield',
									bind : '{theDG.flashPnt}',
									name : 'flashPnt',
									width : 400,
									fieldLabel : ViewUtil.getLabel('flashPoint'),
									labelWidth : 180
								},{
									reference : 'ctlHazchemCode',
									xtype : 'textfield',
									bind : '{theDG.hazChem}',
									name : 'hazChem',
									width : 295,
									enforceMaxLength : true,
									maxLength : 3,
									fieldLabel : ViewUtil.getLabel('hazchemCode'),
									fieldStyle : 'background-color: #00CCFF;',
									allowBlank : false,
									labelWidth : 120
								}
							]
						},{
							xtype : 'container',
							margin : '0 10 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									reference : 'ctlJpaGroup',
									xtype : 'textfield',
									bind : '{theDG.priGrp}',
									name : 'priGrp',
									width : 400,
									fieldLabel : ViewUtil.getLabel('jpaGroup'),
									//fieldStyle : 'background-color: #00CCFF;',
									allowBlank : true,
									editable : false,
									labelWidth : 180
								},{
									reference : 'ctlJpaCode',
									xtype : 'textfield',
									bind : '{theDG.priCd}',
									name : 'priCd',
									width : 295,
									enforceMaxLength : true,
									maxLength : 3,
									fieldLabel : ViewUtil.getLabel('jpaCode'),
									//fieldStyle : 'background-color: #00CCFF;',
									allowBlank : true,
									labelWidth : 120
								}
							]
						},{
							reference : 'ctlPkgMt',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.pkgQty}',
							name : 'pkgQty',
							width : 700,
							fieldLabel : ViewUtil.getLabel('packageMt'),
							labelWidth : 180,
							labelAlign : 'right',
							editable : false
						},{
							xtype : 'container',
							margin : '0 5 2 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								margin : '0 5 0 0',
								labelAlign : 'right'
							},
							items : [
								{
									reference : 'ctlPkg',
									xtype : 'cmmcdfield',
									bind : {
										value : '{theDG.pkgTpCd}'
									},
									name : 'pkg',
									width : 300,
									editableControl : true,
									fieldLabel : ViewUtil.getLabel('packageType'),
									labelWidth : 180,
									labelAlign : 'right',
									params : {
										searchType : 'COMM',
										searchDivCd : 'PKGTP',
										searchLcd : 'MT',
									}
								},{
									reference : 'ctlPkgNm',
									xtype : 'textfield',
									bind : '{theDG.pkgtpcdnm}',
									name : 'pkgtpcdnm',
									flex: 1,
									fieldStyle : 'background-color: #00CCFF;',
									labelWidth : 10,
									editable : false,
								}
							]
						},
						{
							reference : 'ctlRemark',
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.rmk}',
							width : 700,
							fieldLabel : ViewUtil.getLabel('remark'),
							labelWidth : 180,
							labelAlign : 'right',
							maxLength: 500
						},
						{
							reference : 'ctlRemark1',
							hidden: true,
							margin : '0 10 2 0',
							xtype : 'textfield',
							bind : '{theDG.rmk1}',
							name : 'rmk1',
							width : 700,
							fieldLabel : ViewUtil.getLabel('remark'),
							labelWidth : 180,
							labelAlign : 'right'
						},
						{
							xtype : 'container',
							margin : '0 5 2 5',
							layout : {
								type : 'vbox',
								align : 'stretch',
							},
							items : [
								{
									xtype : 'container',
									margin : '0 5 0 0',
									layout : {
										type : 'hbox',
										align : 'stretch',
										//pack : 'end'
									},
									items : [
										{
											xtype : 'label',
											text : ViewUtil.getLabel('attachment'),
											textAlign: 'left',
											width : 180,
										},
										{
											xtype: 'container',
											flex: 1,
										},
										{
											xtype : 'filefield',
											name : 'fileUpload',
											itemId : 'createButton',
											id : 'dgFileUpload',
											//style : 'text-align:left',
											method : 'POST',
											width : 100,
											fileUpload : true,
											enctype : 'multipart/form-data',
											buttonText : '',
											buttonOnly : true,
											multiple : true,
											buttonConfig : {
												text : "ADD",
												height : 28,
												iconCls : 'x-fa fa-plus',
												width : 100,
											},
											listeners : {
												change : 'onAddForFileUpload',
												afterrender : function(cmp) {
													cmp.fileInputEl.set({
														multiple : 'multiple'
													});
												}
											}
										},
										{
											xtype : 'button',
											margin : '0 0 0 10',
											ui : 'delete-button',
											iconCls : 'x-fa fa-minus',
											text : 'Remove',
											width : 100,
											listeners : {
												click : 'onDgFileUploadGridRemove'
											}
										}
									]
								},
								{
									// xtype: 'container',
									// height: 100,
									// margin: '0 10 2 10',
									// layout: {
									// 	type: 'vbox',
									// 	align: 'stretch'
									// },
									// items: [
										
									// ]
									xtype: 'tsb-datagrid',
									margin : '5 5 0 0',
									height: 100,
									reference : 'refDGUploadGrid',
									stateId : 'stateDGUploadGrid',
									stateful : true,
									usePagingToolbar : false,
									// style: {
									// 	borderColor: '#AAA', 
									// 	borderStyle: 'solid', 
									// 	borderWidth: 'thin'
									// },
									
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store : '{dgUpload}'
									},
									listeners: {
										celldblclick : 'onFileDownloadDblClick'
									},
									selModel: {
										type: 'checkboxmodel',  
										//checkOnly: false,
										//showHeaderCheckbox: true
									},
									columns: {
										defaults: {
											style : 'text-align:center',
											align : 'center'
										},
										items: [
											{
												xtype : 'rownumberer',
												width : 50,
												align : 'center'
											},
											{
												header : ViewUtil.getLabel('fileName'),
												dataIndex : 'fileName',
												reference : 'refFileName',
												filter : 'string',
												flex : 1
											},
											{
												header : ViewUtil.getLabel('fileSize'),
												dataIndex : 'fileSize',
												reference : 'refFileSize',
												xtype : 'numbercolumn',
												align : 'right',
												format : '0,000',
											}
										]
									}
								},
							]
						},
						{
							xtype : 'container',							
							layout : {
								type : 'hbox',
								pack: 'center'
							},
							margin : '5 10 10 0',
							items : [
								{
									xtype : 'button',
									width: 80,
									text : ViewUtil.getLabel('ok'),
									listeners : {
										click : 'onOk'
									}
								},{
									xtype : 'button',
									margin : '0 0 0 10',
									width: 80,
									text : ViewUtil.getLabel('cancel'),
									listeners : {
										click : 'onCancel'
									}
								}
							]
						}
					]
				},
			]		
		});
		
		me.callParent();
	}
});