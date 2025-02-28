Ext.define("MOST.view.document.bl.BLPackageDetail",{
    extend: "Ext.form.Panel",
    alias: 'widget.blpackagedetail',
    requires:[
  		'MOST.config.Locale'
  	],
	scrollable: 'y',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CONTAINER_GRID_REF_NAME: 'refPkgDetailGrid',				// Main Grid Name 
	CONTAINER_STORE_NAME: 'blPkgDetail',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
  	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			xtype:'container',
			defaults:{
				margin: '5 0 0 0'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items:[
				{
					xtype: 'fieldset',
					margin: '5 0 5 0',
					padding: '0 5 0 5',
					height: 361,
					items:[
						{
							xtype: 'container',
							layout: {
								type  : 'vbox', 
								align : 'stretch' 
							},
							items:[
								{
									xtype: 'container',
									layout: {
										type: 'hbox', 
										pack: 'end'
									},
									defaults:{
										margin: '5 0 0 5',
									},
									items: [
										{
			                                xtype: 'button',
			                                text: ViewUtil.getLabel('clear'),
			                                reference:'refBtnClearPackage',
			                                listeners: {
			            						click: 'onClearPackage'
			            					} 
			                            },{
											xtype: 'button',
											text: ViewUtil.getLabel('add'),
											ui: 'create-button',
											iconCls: 'x-fa fa-plus',
											reference:'refBtnAddPackage',
											listeners:{
												click:'onAddPackage'
											}
										},{
			                                xtype: 'button',
			                                text: ViewUtil.getLabel('update'),
			                                reference:'refBtnUpdatePackage',
			                                listeners: {
			            						click: 'onUpdatePackage'
			            					} 
			                            },{
											xtype: 'button',
											iconCls: 'x-fa fa-minus',
											ui: 'delete-button',
											text: ViewUtil.getLabel('remove'),
											reference:'refBtnRemovePackage',
											listeners:{
												click:'onRemovePackage'
											},
											disabled: false
										}
									]
								},{
									xtype: 'container',
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												stretch: 'align'
											},
											flex: 1,
											defaults:{
												margin: '5 5 0 5',
											},
											items: [
												{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													flex: 1,
													defaults:{
														margin: '0 5 5 0',
														width: 270,
										    			labelAlign: 'right',
								                        labelWidth: 100
													},
													items: [
														{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('packageNo'),
															reference: 'refPackageNo',
															flex: 1,
															bind:{
																value: '{theBL.pkgNo}'
															},
															allowBlank: false
														},{
															xtype: 'textfield',
															margin: '-7 5 0 0',
															fieldLabel: ViewUtil.getLabel('packageDesc'),
															flex: 1,
															reference: 'refPackageDesc',
															bind:{
																value: '{theBL.pkgDesc}'
															}
														},
														{
															xtype: 'textfield',
															margin: '0 5 0 0',
															fieldLabel: ViewUtil.getLabel('totalMt'),
															flex: 1,
															reference: 'refTotalMt',
															bind:{
																value: '{theBL.wgt}'
															},
															readOnly: true
														},
														{
															xtype: 'textfield',
															margin: '0 5 0 0',
															fieldLabel: ViewUtil.getLabel('totalM3'),
															flex: 1,
															reference: 'refTotalM3',
															bind:{
																value: '{theBL.vol}'
															},
															readOnly: true
														}
													]
												},{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													flex: 1,
													defaults:{
														margin: '0 5 5 0',
														width: 270,
										    			labelAlign: 'right',
								                        labelWidth: 100
													},
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('blGrossWeight'),
															reference: 'refWgt',
															bind:{
																value: '{theBL.pkgMt}'
															},
															flex: 1,
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
					    									allowBlank: false
														},{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('blMeasurement'),
									                        reference: 'refMsrmt',
									                        bind:{
																value: '{theBL.pkgM3}'
															},
															flex: 1,
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
					    									//allowBlank: false,
														},{
															xtype: 'textfield',
															margin: '0 5 0 0',
															fieldLabel: ViewUtil.getLabel('totalQty'),
															flex: 1,
															reference: 'refTotalQty',
															bind:{
																value: '{theBL.pkgQty}'
															},
															readOnly: true
														},{
					    									xtype:'container',
					    									layout:{
					    										type: 'hbox'
					    									},
					    									padding: '0 0 0 90',
					    									flex: 1,
					    									items:[
					    										{
																	xtype: 'button',
																	text: ViewUtil.getLabel('excelUpload'),
																	ui: 'create-button',
																	reference:'refExcelUploadForPackageDetailBtn',
																	listeners:{
																		click: 'onPackageDetailExcelUpload'
																	}
																},{
																	xtype: 'button',
																	text: ViewUtil.getLabel('sampleUpload'),
																	margin: '0 0 0 5',
																	ui: 'create-button',
																	reference:'refSampleUploadBtn',
																	listeners:{
																		click: {
																			fn: 'onExportExcelSamplePackageDetailTab',																
																		}
																	}
																}
					    									]
														}
													]
												},{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													flex: 1,
													defaults:{
														margin: '0 5 5 0',
														width: 270,
										    			labelAlign: 'right',
								                        labelWidth: 100
													},
													items: [
														{
															xtype: 'numberfield',
									                        reference: 'refLength',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('length'),
									                        bind:{
																value: '{theBL.length}'
															},
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
															listeners:{
					    										change:'onLWHChange'
					    									}
														},{
															xtype: 'numberfield',
									                        reference: 'refWidth',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('width'),
									                        bind:{
																value: '{theBL.width}'
															},
															minValue: 0,
															maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
															listeners:{
					    										change:'onLWHChange'
					    									}
														},{
															xtype: 'numberfield',
									                        reference: 'refHeight',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('height'),
									                        bind:{
																value: '{theBL.height}'
															},
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
															listeners:{
					    										change:'onLWHChange'
					    									}
														},{
															xtype: 'textfield',
									                        reference: 'refPkgRmk',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('rmk'),
									                        bind:{
																value: '{theBL.pkgRmk}'
															},
															listeners:{
					    										change:'onLWHChange'
					    									}
														}
													]
												}
											]
										},{
											xtype: 'tsb-datagrid',
											height: 200,
											reference: me.CONTAINER_GRID_REF_NAME,
											usePagingToolbar : false,
											plugins: [
						    		          'gridexporter',
						    		          'gridfilters',
						    		          'clipboard'
					    		            ],
					    		            bind:{
										    	 store: '{' + me.CONTAINER_STORE_NAME + '}'
					    		            },
					    		            selType: 'checkboxmodel',
					    		            selModel: {
												type: 'spreadsheet',
												cellSelect: false,
												listeners:{
													select: 'onCount',
													deselect:'onCount'
												}
					    		            },
					    		            listeners : {
					    		            	cellclick: 'onPkgGridItemClick'
					    					},
											columns:{
												defaults: {
								            		style : 'text-align:center'
								            	},
								            	items: GridUtil.getGridColumns('BLPackageDetail')
											}
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