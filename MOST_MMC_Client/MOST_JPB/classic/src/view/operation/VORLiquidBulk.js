Ext.define('MOST.view.operation.VORLiquidBulk', {
	extend : 'Ext.form.Panel',
	alias : 'widget.app-vorliquidbulk',

	requires : [],

	detailViewAlias : 'app-vorliquidbulkdetail',

	controller : 'vorliquidbulk',

	viewModel : {
		type : 'vorliquidbulk'
	},

	listeners:{
		afterrender: 'onLoad'
	},

	config : {
	},

	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			items : [
				{
					xtype : 'container',
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					padding: '5 5 5 5',
					//hidden:true,
					items : [ 
						{
							xtype : 'radiogroup',
							reference : 'ctl_cgOprType',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [
								{
									xtype : 'radiofield',
									reference : 'ctlVORLoadDischarge',
									disabled : true,
									checked : false,
									boxLabel : ViewUtil.getLabel('vorLoadDischarge')
								},
								{
									xtype : 'radiofield',
									reference : 'ctlVORSTSOperation',
									margin : '0 0 0 30',
									disabled : true,
									checked : false,
									boxLabel : ViewUtil.getLabel('vorSTSOperation')
								},
								{
									xtype : 'radiofield',
									reference : 'ctlVORTranshipment',
									margin : '0 0 0 30',
									disabled : true,
									checked : false,
									boxLabel : ViewUtil.getLabel('vorTranshipment')
								} 
							]
						} 
					]
				},
				{
					xtype : 'tabpanel',
					reference : 'refVORLiquidSummaryTab',
					padding : '0 5 0 0',
					flex:1,
					defaults : {
						margin : '0 0 0 0',
					},
					items : [
						{
							xtype : 'app-berthAndOperationInfo',
							reference : 'refBerthAndOperationInfo',
							title : ViewUtil.getLabel('berthAndOperationInfo'),
							layout: 'fit'
						},
						{
							xtype : 'app-vorSummary',
							reference : 'refVORSummary',
							title : ViewUtil.getLabel('vorSummary'),
							layout: 'fit'
						},
						{
		                	xtype:'panel',
		                	layout: 'fit',
		                	title: ViewUtil.getLabel('vorDelaySummary'),
		                	items : [{
								xtype: 'app-vorDelaySummary',
					    		reference: 'refVORDelaySummary'
							}]						
						}
					]
				},
				{
					xtype : 'fieldset',
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					defaults : {
						labelAlign : 'right',
						labelWidth : 120
					},
					margin : '5 5 5 0',
					items : [
						{
							xtype : 'container',
							layout : {
								type : 'vbox'
							},
							defaults : {
								labelAlign: 'left'
							},
							items : [
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									defaults : {
										style : 'display:inline-block; text-align:center',
									},
									items : [
										{
											xtype : 'label',
											width : 130,
											text : ''
										},
										{
											xtype : 'label',
											width : 100,
											text : ViewUtil.getLabel('vorLd')
										},
										{
											xtype : 'label',
											width : 100,
											text : ViewUtil.getLabel('vorSts')
										},
										{
											xtype : 'label',
											width : 100,
											text : ViewUtil.getLabel('vorTls')
										},
									]
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									defaults : {
										labelAlign: 'right',
										margin : '5 5 0 0',
									},
									items : [
										{
											xtype : 'label',
											margin : '10 5 0 0',
											width : 130,
											style : 'display:inline-block; text-align:right',
											text : ViewUtil.getLabel('plannedMtToLoad')
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.loadPlanMtG}'
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.loadPlanMtS}'
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.loadPlanMtT}'
										},
									]
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									defaults : {
										labelAlign: 'right',
										margin : '5 5 0 0',
									},
									items : [
										{
											xtype : 'label',
											margin : '10 5 0 0',
											style : 'display:inline-block; text-align:right',
											width : 130,
											text : ViewUtil.getLabel('plannedMtToDischarge')
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.disPlanMtG}'
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.disPlanMtS}'
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.disPlanMtT}'
										},
									]
								}
							]
						},
						//actual amount
						{
							xtype : 'container',
							layout : {
								type : 'vbox'
							},
							defaults : {
								labelAlign: 'left'
							},
							items : [
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									defaults : {
										style : 'display:inline-block; text-align:center',
									},
									items : [
										{
											xtype : 'label',
											width : 230,
											text : ''
										},
										{
											xtype : 'label',
											width : 100,
											text : ViewUtil.getLabel('vorLd')
										},
										{
											xtype : 'label',
											width : 100,
											text : ViewUtil.getLabel('vorSts')
										},
										{
											xtype : 'label',
											width : 100,
											text : ViewUtil.getLabel('vorTls')
										},
									]
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									defaults : {
										labelAlign: 'right',
										margin : '5 5 0 0',
									},
									items : [
										{
											xtype : 'label',
											margin : '10 5 0 0',
											style : 'display:inline-block; text-align:right',
											width : 230,
											text : ViewUtil.getLabel('actualMtToLoad')
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.loadActualMtG}'
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.loadActualMtS}'
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.loadActualMtT}'
										},
									]
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									defaults : {
										labelAlign: 'right',
										margin : '5 5 0 0',
									},
									items : [
										{
											xtype : 'label',
											margin : '10 5 0 0',
											style : 'display:inline-block; text-align:right',
											width : 230,
											text : ViewUtil.getLabel('actualMtToDischarge')
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.disActualMtG}'
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.disActualMtS}'
										},
										{
											xtype : 'textfield',
											width : 100,
											readOnly : true,
											bind : '{theBerthing.disActualMtT}'
										},
									]
								}
							]
						},
						
					]
				},
				
			],
			dockedItems : [
				{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
						type: 'hbox'
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [{
							xtype: 'tbfill'
						},
						{
							xtype : 'button',
							itemId: 'inquiryItemId',
							reference : 'refBtnRetrieve',
							text : ViewUtil.getLabel('search'),
							iconCls : 'x-fa fa-search',
							cls : 'search-button',
							listeners : {
								click : 'onSearch'
							}
						},{
							xtype : 'button',
							itemId: 'createItemId',
							reference : 'refBtnCreate',
							text : ViewUtil.getLabel('add'),
							ui : 'create-button',
							iconCls : 'x-fa fa-plus',
							listeners : {
								click : 'onCreate'
							}
						},{
							xtype : 'button',
							itemId : 'deleteItemId',
							reference : 'refBtnDelete',
							text : ViewUtil.getLabel('remove'),
							ui : 'delete-button',
							iconCls : 'x-fa fa-minus',
							listeners : {
								click : 'onDeleteVorSummary'
							}
						},{
							xtype: 'button',
							itemId: 'exportToExcelButton',
							text: ViewUtil.getLabel('exportToExcel'),
							iconCls: 'excel-button-image', 
							cls: 'excel-button', 
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args:[me.MAIN_GRID_REF_NAME, true]
								}
							}
						},
						{
							xtype: 'button',
							itemId: 'exportToPdfButton',
							text: ViewUtil.getLabel('exportToPdf'),
							iconCls: 'x-fa fa-file-pdf-o',
							cls: 'excel-button',
							listeners: {
								click: {
									fn: 'onExportExcelPdfWithServer',
									args:[me.MAIN_GRID_REF_NAME, false]
								}
							}
		            	},
		            	{
							xtype: 'button',
							cls: 'column-setting-button',
							iconCls: 'x-fa fa-columns',
							text: ViewUtil.getLabel('column'),
							listeners: {
								click: 'onColumnSettingPopup',
								args: [me.MAIN_GRID_REF_NAME]
							}
		            	
		                }					
					]
				},
            
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype:'searchfieldset',
							autoScroll: true,
							collapsible:true,
							layout:{
								type:'hbox',
								align:'stretch'
							},
							margin: '0 5 0 0',
							padding: '0 10 10 10',
							defaults:{
								margin: '0 0 5 0'
							},
							flex: 3,
							items:[
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('search'),
									flex: 2.5,
									margin: '0 5 0 0',
									padding: '0 10 10 10',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 90,
									},
									items:[
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 80,
												margin: '0 0 5 0',
											},
											flex:1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'shipcallnofield',
													reference: 'ctlScn',
													//emptyText: ViewUtil.getLabel('shipCallNo'),
													fieldLabel: ViewUtil.getLabel('shipCallNo'),
													bind: {
														value: '{theSearch.scn}',
													},
													
												},
												{
													xtype: 'vesselcalllistfield',
													fieldLabel: ViewUtil.getLabel('vslcallid'),
													reference: 'ctlVslCallId',
													bind: {
														value: '{theSearch.vslCallId}'
													}
												}
											]
										}
					                ]
								},
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('vslInfo'),
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									flex: 7.5,
									margin: '0 0 0 5',
									padding: '0 10 10 10',
									items: [
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 90,
												margin: '0 0 5 0'
											},
											flex: 1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'textfield',
													bind: '{theVessel.vslCd}',
													fieldLabel: ViewUtil.getLabel('vesselCode'),
													readOnly: true
												}, {
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('vesselName'),
													bind: '{theVessel.vslNm}',
													readOnly: true
												}, {
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('voyage'),
													margin: '0 0 0 0',
													bind: '{theVessel.voyage}',
													readOnly: true
												}
											]
										}, {
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 90,
												margin: '0 0 5 0',
											},
											flex: 1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'textfield',
													bind: '{theVessel.arrvSaId}',
													fieldLabel: ViewUtil.getLabel('SNLASA'),
													readOnly: true
												}, {
													xtype: 'datefield',
													fieldLabel: ViewUtil.getLabel('eta'),
													bind: '{theVessel.eta}',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true
												}, {
													xtype: 'datefield',
													fieldLabel: ViewUtil.getLabel('etd'),
													margin: '0 0 0 0',
													bind: '{theVessel.etd}',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true
												}
											]
										}, {
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 90,
												margin: '0 0 5 0'
											},
											flex: 1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('berthingLoc'),
													bind: '{theVessel.berthLoc}',
													readOnly: true
												},
												{
													xtype: 'textfield',
													fieldLabel: ViewUtil.getLabel('scn'),
													bind: '{theVessel.scn}',
													readOnly: true
												},
												{
													xtype: 'textfield',
													margin: '0 0 0 0',
													fieldLabel: ViewUtil.getLabel('operationType'),
													bind: '{theVessel.purpCall}',
													readOnly: true
												}
											]
										}
									]
								}
							]
						}
					]
				}

            ]

		});

		me.callParent();
	}
});