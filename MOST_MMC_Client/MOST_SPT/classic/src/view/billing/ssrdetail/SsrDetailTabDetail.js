Ext.define('MOST.view.billing.ssrdetail.SsrDetailTabDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-ssrdetailtabdetail',
	requires: [
		'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab'
	],
	//height: 450,
	listeners:{
		//afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 2 20'
					},
					margin : '2 5 2 5',
					items:[
						{
							xtype: 'container',
							flex: 0.5,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults:{
								margin: '5 0 0 0',
								labelAlign:'right'
							},
							items:[
								{
									xtype: 'combo',
									reference: 'cltDetailTabDetailSsrType',
		    	   					labelWidth: 80,
		    	   					width:400,
		    	   					fieldLabel:  ViewUtil.getLabel('ssrtype'),
		    	   					queryMode: 'local',
		    	   					bind: {
		    	    	    			store: '{ssrTypeCombo}'
		    	    	    		},
		    	    	    		displayField: 'scdNm',
		    	   					valueField: 'scd',
		    	   					value : '',
		    	   					editable: false,
		    	   					allowBlank: false,
		    	   					forceSelection:true,
		    	   					listeners: {
		    	   						change: 'onChangeSSRTp' 
		    	   					},
		    	   					fieldStyle: 'background-color: #CAECF4',
								},
								{// CostCenter
									xtype:'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										labelAlign:'right'
									},
									items:[
										{
											xtype: 'combo',
											reference: 'cltTabDetailCostCenter',
				    				        labelWidth: 80,
				    				        flex: 0.6,
				    	   					fieldLabel: ViewUtil.getLabel('costCenter'),
				    	   					queryMode: 'local',
				    	   					bind: {
				    	    	    			store: '{costCenterCombo}'
				    	    	    		},
				    	    	    		displayField: 'scdNm',
				    	   					valueField: 'scd',
				    	   					value : '',
				    	   					editable: false,
				    	   					allowBlank: false,
				    	   					forceSelection:true,
				    	   					listeners: {
												select: 'onChangeCost'
				    	   					},
				    	   					hidden: true,
				    	   					fieldStyle: 'background-color: #CAECF4',
										},
										{
											xtype: 'textfield',
											margin: '0 0 0 15',
											fieldLabel: ViewUtil.getLabel('newCostCenter'),
											reference: 'ctlTabDetailNewCostCenter',
											labelWidth:120,
											flex: 0.4,
											hidden: true,
											editable: false,
										},
										{
											xtype: 'textfield',
											reference: 'ctlTabDetailFinancialCode',
											fieldLabel: ViewUtil.getLabel('financialCode'),
											labelWidth:80,
											flex: 0.4,
											editable: false,
											bind: {
				    	    	    			value: '{theDetail.financialCode}'
				    	    	    		},
										},
									]
								},
								{
									reference: 'cltTabDetailTrfCombo',
		    	   					xtype: 'combo',
		    				        labelWidth: 80,
		    	   					width:280,
		    	   					fieldLabel: 'Tariff',
		    	   					queryMode: 'local',
		    	   					bind: {
		    	   						value: '{theDetail.subTrfCd}',
		    	    	    			store: '{tariffCombo}'
		    	    	    		},
		    	    	    		displayField: 'displayName',
		    	   					valueField: 'subTrfCd',
		    	   					value : '',
		    	   					editable: false,
		    	   					allowBlank: false,
		    	   					forceSelection:true,
		    	   					listeners: {
		    	   						select: 'onSelectTariff',
		    	   						change: 'onChangeTariff'
		    	   					},
		    	   					fieldStyle: 'background-color: #CAECF4',
								}, 
								{// Sub Tariff/ Rate / Gst
									xtype:'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										labelAlign:'right'
									},
									items:[
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('proofSheetSubTrfCd'),
											reference: 'ctlTabDetailSubTrf',
											labelWidth:80,
											flex: 0.5,
											editable: false,
										},
										{
											xtype: 'textfield',
											fieldLabel: 'Tariff Rate',
											reference: 'ctlTabDetailTrfRate',
											labelWidth:70,
											flex: 0.5,
											editable: false,
										},
										{
											reference: 'cltTabDetailGstType',
				    	   					xtype: 'combo',
				    	   					labelWidth: 70,
				    	   					flex: 0.5,
				    	   					fieldLabel:  ViewUtil.getLabel('gstTpCd'),
				    	   					queryMode: 'local',
				    	   					bind: {
				    	    	    			store: '{gstCombo}',
				    	    	    			value: '{theDetail.gstTpCd}'
				    	    	    		},
				    	    	    		displayField: 'gstTpCd',
				    	   					valueField: 'gstTpCd',
				    	   					value : '',
				    	   					editable: false,
				    	   					allowBlank: true,
										},
                                        {
											reference: 'cltTabDetailWTHType',
				    	   					xtype: 'combo',
				    	   					margin: '0 0 0 15',
				    	   					labelWidth: 150,
				    	   					flex: 0.7,
				    	   					fieldLabel:  ViewUtil.getLabel('withholdingtaxtype'),
				    	   					queryMode: 'local',
				    	   					bind: {
				    	    	    			store: '{wthTaxCombo}',
				    	    	    			value: '{theDetail.wthTaxTpCd}'
				    	    	    		},
				    	    	    		displayField: 'scdDesc',
				    	   					valueField: 'scd',
//				    	   					value : '',
				    	   					editable: false,
				    	   					allowBlank: true,
				    	   					disabled: true,
				    	   					forceSelection:true,
				    	   					hidden: true
										},
									]
								},
								{
									// CostCenter
									xtype:'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										labelAlign:'right'
									},
									items:[
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('trfDescrSSR'),
											reference: 'ctlTabDetailTrfDesc',
											labelWidth:80,
											flex: 0.2,
											editable: true,
											allowBlank: false,
											fieldStyle: 'background-color: #CAECF4',
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('gstValue'),
											reference: 'ctlTabDetailGstValue',
											bind: '{theDetail.gstRate}',
											labelWidth:70,
											flex: 0.1,
											editable: false,
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('withholdingtaxvalue'),
											reference: 'ctlTabDetailWHTaxValue',
											labelWidth:150,
											flex: 0.12,
											editable: false,
											hidden: true
										}
									]
								},
							]
						},
						{ //Unit Cover
							xtype: 'container',
							flex: 0.35,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items:[
								{ //Unit
									xtype: 'container',
									flex: 0.35,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items:[
										{
											xtype: 'container',
											flex: 0.5,
											layout: {
												type: 'vbox'
											},
											items: [
												{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													margin: '2 0 0 40',
													items: [
														{
															xtype: 'numberfield',
															reference: 'ctlTabDetailQtyU1',
															labelWidth:50,
															width: 85,
															editable: false,
															disabled: true,
															minValue: 0,
								                            decimalPrecision: 3,
								                            allowDecimals: true,
								    						allowNegative: false,
															listeners: {
																change: 'onChangeText'
															},
															allowBlank: false,
															fieldStyle: 'background-color: #CAECF4',
														},
														{
															xtype: 'label',
															forId: 'myFieldId',
															reference: 'ctlLblTabDetailUnit1',
															text: 'Unit1',
															margin: '4 0 0 5',
														},
													]
												},
												{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													margin: '5 0 0 40',
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: '',
															reference: 'ctlTabDetailQtyU2',
															labelWidth:50,
															width: 85,
															editable: false,
															disabled: true,
															allowBlank: false,
															minValue: 0,
								                            decimalPrecision: 3,
								                            allowDecimals: true,
								    						allowNegative: false,
															listeners: {
																change: 'onChangeText'
															},
															fieldStyle: 'background-color: #CAECF4',
														},
														{
															xtype: 'label',
															forId: 'myFieldId',
															reference: 'ctlLblTabDetailUnit2',
															text: 'Unit2',
															margin: '4 0 0 5',
														},
													]
												},
												{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													margin: '5 0 0 40',
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: '',
															reference: 'ctlTabDetailQtyU3',
															labelWidth:50,
															width: 85,
															editable: false,
															disabled: true,
															allowBlank: false,
															minValue: 0,
								                            decimalPrecision: 3,
								                            allowDecimals: true,
								    						allowNegative: false,
															listeners: {
																change: 'onChangeText'
															},
															fieldStyle: 'background-color: #CAECF4',
														},
														{
															xtype: 'label',
															forId: 'myFieldId',
															reference: 'ctlLblTabDetailUnit3',
															text: 'Unit3',
															margin: '4 0 0 5',
														},
													]
												},
											]
										},
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'vbox'
											},
											
											margin: '0 0 0 5',
											items: [
												{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													defaults:{
														labelAlign: 'right',
														margin: '2 0 0 0'
													},
													
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: 'Applied Rate',
															reference: 'ctlTabDetailApRate',
															labelWidth:90,
															width: 190,
															editable: true,
															allowBlank: false,
															minValue: 0,
								                            decimalPrecision: 3,
								                            allowDecimals: true,
								    						allowNegative: false,
															listeners:{
																change: 'onChangeRate'
															},
															fieldStyle: 'background-color: #CAECF4'
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													defaults:{
														labelAlign: 'right',
														margin: '5 0 0 0',
													},
													
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('dissurRate'),
															reference: 'ctlTabDetailDissurRate',
															labelWidth:90,
															width: 190,
															editable: true,
															allowBlank: true,
								                            decimalPrecision: 3,
								                            allowDecimals: true,
															listeners:{
																change: 'onChangeDisRate'
															},
															fieldStyle: 'background-color: #CAECF4'
														},
														{
															xtype: 'textfield',
															fieldLabel:  ViewUtil.getLabel('ttQty'),
															reference: 'ctlTabDetailTTQty',
															labelWidth:80,
															width: 160,
															editable: false,
															listeners:{
																change: 'onChangeTTQty'
															}
														},
													]
												},
												{
													xtype: 'container',
													layout: {
														type: 'hbox',
													},
													defaults:{
														labelAlign: 'right'
													},
													margin: '5 0 0 0',
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('dissurAmount'),
															reference: 'ctlTabDetailDiscurAmt',
															labelWidth:90,
															width: 190,
															editable: true,
															allowBlank: true,
								                            decimalPrecision: 3,
								                            allowDecimals: true,
															fieldStyle: 'background-color: #CAECF4'
														},
														{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('amount'),
															reference: 'ctlTabDetailAmount',
															labelWidth:80,
															width: 160,
															editable: false,
														},
													]
												},
											]
										}
									]
								},
								{//button
									xtype: 'container',
									margin: '0 0 0 0',
									layout: {
										type: 'hbox',
										pack: 'end'
									},
									items:[
										{
											xtype: 'button',
											text: ViewUtil.getLabel('add'),
											reference: 'btnAddTabDetail',
											cls: 'search-button',
											iconCls: 'x-fa fa-plus',
											margin: '2 5 0 0',
											width: 80,
											listeners: {
												click: 'onAddToGrid'
											}
										}, 
										{
											xtype: 'button',
											text: ViewUtil.getLabel('update'),
											reference: 'btnUpdateTabDetail',
											iconCls: 'x-fa fa-plus',
											margin: '2 5 0 0',
											width: 80,
											listeners: {
												click: 'onUpdateDetaiGrid'
											}
										},
										{
											xtype: 'button',
											reference: 'btnClearTabDetail',
											iconCls: 'x-fa fa-refresh',
											text: ViewUtil.getLabel('clear'),
											margin: '2 5 0 0',
											width: 80,
											listeners: {
												click: 'onClearTabDeatil'
											}
										},
										{
											xtype: 'button',
											text: ViewUtil.getLabel('remove'),
		    	                            ui: 'delete-button',
		    	                            iconCls: 'x-fa fa-minus',
											margin: '2 5 0 0',
											width: 80,
											reference: 'btnDeleteTabDetail',
											listeners: {
												click: 'onDeleteDetail'
											}												
										}
									]
								},
							]
						}
					]
				},{
					xtype: 'tsb-datagrid',
                    reference: 'refSsrDetailTabDetailGrid',
    				stateful : true,
    				stateId : 'ssrDetailTabDetailGrid',
    				flex:1,
    				plugins: [
    					'gridexporter',
    					'gridfilters',
    					'clipboard'
    	    		],
					usePagingToolbar : false,
                	listeners: {
                		cellclick: 'onClickDetail'
                	},
    	    		bind: {
    	    			store: '{ssrDetailGrid}'
    	    		},
                    selModel: {    	    	        
                    	type: 'spreadsheet',
    					cellSelect: false

    	    	    },
                    columns:{
                    	defaults: {
    	            		style : 'text-align:center',
    	            		align : 'center'
    	            	},
						items: GridUtil.getGridColumns('SsrDetail')
                    }
				}
			],
			dockedItems: [{
		    	xtype: 'toolbar',
		    	dock: 'bottom',
		    	items:[
		    		{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						margin: '5 0 0 0',
						items:[{
							xtype: 'container',
							layout: {
								type: 'hbox',
								
							},
							margin: '0 0 0 200',
							flex: 2,
							items:[
								{
									xtype: 'label',
									text:  ViewUtil.getLabel('AmtTTExcl'),
								},
								{
									xtype: 'label',
									reference: 'ctlLblTabDetailAmtTTExclValue',
									text: '',
									//width: 50,
									margin: '0 0 0 10'
								},
								{
									xtype: 'label',
									margin: '0 0 0 3',
									text: ViewUtil.getLabel('defaultCurrency'),
									
								}
							]
						}, {
							xtype: 'container',
							layout: {
								type: 'hbox',
								
							},
							margin: '0 0 0 100',
							flex: 1,
							items:[
								{
									xtype: 'label',
									text:  ViewUtil.getLabel('AmtTTIn'),
								},{
									xtype: 'label',
									reference: 'ctlLblTabDetailAmtTTIn',
									text: '',
									//width: 50,
									margin: '0 0 0 10'
									
								},{
									xtype: 'label',
									margin: '0 0 0 3',
									text: ViewUtil.getLabel('defaultCurrency'),
								}
							]
						}]
					}
		    	]    	
		    }]});
		me.callParent();
	}
});

