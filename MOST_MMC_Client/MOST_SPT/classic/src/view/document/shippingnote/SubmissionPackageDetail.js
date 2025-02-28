Ext.define("MOST.view.document.shippingnote.submissionshippingnote.SubmissionPackageDetail",{
    extend: "Ext.form.Panel",
    alias: 'widget.app-submissionpackagedetail',
    requires:[
  		'MOST.config.Locale'
  	],
	scrollable: 'y',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CONTAINER_GRID_REF_NAME: 'refPkgDetailGrid',				// Main Grid Name 
	CONTAINER_STORE_NAME: 'shippingNotePkgDetail',
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
					height: 150,
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
												type: 'vbox'
											},
											defaults:{
												margin: '5 5 0 5',
											},
											items: [
												{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													defaults:{
														margin: '0 5 0 0',
														width: 300,
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
																value: '{theShippingNote.pkgNo}'
															},
															allowBlank: false
														},{
															xtype: 'textfield',
															margin: '-7 5 0 0',
															reference: 'refPackageDesc',
															fieldLabel: ViewUtil.getLabel('packageDesc'),
															flex: 1,
															bind:{
																value: '{theShippingNote.pkgDesc}'
															}
														},{
					    									xtype:'container',
					    									layout:{
					    										type: 'hbox'
					    									},
					    									padding: '0 0 0 120',
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
													defaults:{
														margin: '0 5 5 0',
														width: 300,
										    			labelAlign: 'right',
								                        labelWidth: 100
													},
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('mt'),
															reference: 'refWgt',
															bind:{
																value: '{theShippingNote.pkgMt}'
															},
															flex: 1,
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
					    									allowBlank: false
														},{
															xtype: 'numberfield',
									                        reference: 'refMsrmt',
									                        flex: 1,
									                        bind:{
																value: '{theShippingNote.pkgM3}'
															},
									                        fieldLabel: ViewUtil.getLabel('m3'),
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3
														},{
															xtype: 'textfield',
									                        reference: 'refPkgRmk',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('rmk'),
									                        bind:{
																value: '{theShippingNote.pkgRmk}'
															}
														}
													]
												},{
													xtype: 'container',
													layout: {
														type: 'hbox'
													},
													defaults:{
														margin: '0 5 5 0',
														width: 300,
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
																value: '{theShippingNote.length}'
															},
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
															listeners:{
																change: 'onChangeLWH'
															}
														},{
															xtype: 'numberfield',
									                        reference: 'refWidth',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('width'),
									                        bind:{
																value: '{theShippingNote.width}'
															},
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
															listeners:{
																change: 'onChangeLWH'
															}
														},{
															xtype: 'numberfield',
									                        reference: 'refHeight',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('height'),
									                        bind:{
																value: '{theShippingNote.height}'
															},
															minValue: 0,
					    									maxValue: 999999999999999.999,
					    									decimalPrecision: 3,
															listeners:{
																change: 'onChangeLWH'
															}
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
				},
				{
					xtype : 'container',
					flex : 1,
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
					items : [
					{
						xtype: 'tsb-datagrid',
						flex: 1,											
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
    		            selModel: {
							type: 'spreadsheet',
							cellSelect: false
    		            },
    		            listeners : {
    		            	cellclick: 'onPkgGridItemClick'
    					},
						columns:{
							defaults: {
			            		style : 'text-align:center'
			            	},
			            	items: GridUtil.getGridColumns('ShippingNotePackageDetail')
						}
					}]
				}
	        ]
		});
		
		me.callParent();
  	}
});