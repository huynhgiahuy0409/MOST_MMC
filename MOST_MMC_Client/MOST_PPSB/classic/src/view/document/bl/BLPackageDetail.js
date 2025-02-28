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
					reference: 'refBlpackagedetail',
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
											xtype: 'tbfill'
										},
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
																value: '{thePgkDetail.pkgNo}'
															},
															allowBlank: false,
															maskRe: /[0-9A-Za-z]/,
															fieldStyle: 'text-transform:uppercase;',
															listeners: {
																change: function(field, newValue, oldValue){
																	if(newValue){
																		field.setValue(newValue.toUpperCase());
																	}
																}
															}
														},{
															xtype: 'textfield',
															//margin: '-7 5 0 0',
															fieldLabel: ViewUtil.getLabel('packageDesc'),
															flex: 1,
															reference: 'refPackageDesc',
															bind:{
																value: '{thePgkDetail.pkgDesc}'
															}
														},
														{
															xtype: 'numberfield',
															minValue: 0,
					    									maxValue: 9999999999.999,
															decimalPrecision: 3,
															margin: '0 5 0 0',
															fieldLabel: ViewUtil.getLabel('totalMt'),
															flex: 1,
															reference: 'refTotalMt',
															bind:{
																value: '{thePgkDetail.pkgTotalWgt}'
															},
															listeners:{
																change:'onChangePkgTotalWgt'
															},
															hideTrigger: true,
															//readOnly: true
														},
														{
															xtype: 'textfield',
															margin: '0 5 0 0',
															fieldLabel: ViewUtil.getLabel('totalM3'),
															flex: 1,
															reference: 'refTotalM3',
															bind:{
																value: '{thePgkDetail.pkgTotalVol}'
															},
															readOnly: true //System will auto calculate by Total inputted QTY x Measurement M3
														},
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
															reference: 'refWgt', //refPgkDetailWgt
															bind:{
																value: '{thePgkDetail.eachPkgWgt}'
															},
															flex: 1,
															minValue: 0,
					    									maxValue: 9999999999.999,
					    									decimalPrecision: 3,
					    									allowBlank: false,
															readOnly: true,
															editable: false
														},{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('blMeasurement'),
									                        reference: 'refMsrmt',
									                        bind:{
																value: '{thePgkDetail.eachPkgVol}'
															},
															flex: 1,
															minValue: 0,
					    									maxValue: 9999999999.999,
					    									decimalPrecision: 3,
															listeners:{
																change:'onChangePkgUnitVol'
															},
															hideTrigger: true,
					    									//readOnly: true,
															//editable: false //System will auto calculate by Length x Width x Height
														},{
															xtype: 'numberfield',
															minValue: 0,
					    									maxValue: 9999999999,
															decimalPrecision: 0,
															margin: '0 5 0 0',
															fieldLabel: ViewUtil.getLabel('totalQty'),
															flex: 1,
															reference: 'refTotalQty',
															bind:{
																value: '{thePgkDetail.pkgUnitQty}'
															},
															listeners:{
					    										change:'onChangePkgDetailQty'
					    									},
															hideTrigger: true
														},
														{
															xtype: 'textfield',
															margin: '0 5 0 0',
															reference: 'refPkgAgentId',
															fieldLabel: ViewUtil.getLabel('agentid'),
															flex: 1,
															bind:{
																value: '{thePgkDetail.pkgAgentId}'
															},
															maskRe: /[0-9A-Za-z]/,
															listeners:{
																change: function(field, newValue, oldValue){
																	if(newValue){
																		field.setValue(newValue.toUpperCase());
																	}
																}
															},
															allowBlank: false
														},
														{
															xtype: 'textfield',
															margin: '0 5 0 0',
															fieldLabel: ViewUtil.getLabel('agentremark'),
															flex: 1,
															bind:{
																value: '{thePgkDetail.pkgAgentRmk}'
															},
															maskRe: /[0-9A-Za-z ]/,
														},
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
																value: '{thePgkDetail.length}'
															},
															minValue: 0,
					    									maxValue: 9999999999.999,
					    									decimalPrecision: 3,
															listeners:{
					    										change:'onLWHChange'
					    									},
															hideTrigger: true
														},{
															xtype: 'numberfield',
									                        reference: 'refWidth',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('width'),
									                        bind:{
																value: '{thePgkDetail.width}'
															},
															minValue: 0,
															maxValue: 9999999999.999,
					    									decimalPrecision: 3,
															listeners:{
					    										change:'onLWHChange'
					    									},
															hideTrigger: true
														},{
															xtype: 'numberfield',
									                        reference: 'refHeight',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('height'),
									                        bind:{
																value: '{thePgkDetail.height}'
															},
															minValue: 0,
					    									maxValue: 9999999999.999,
					    									decimalPrecision: 3,
															listeners:{
					    										change:'onLWHChange'
					    									},
															hideTrigger: true
														},{
															xtype: 'textfield',
									                        reference: 'refPkgRmk',
									                        flex: 1,
									                        fieldLabel: ViewUtil.getLabel('rmk'),
									                        bind:{
																value: '{thePgkDetail.pkgRmk}'
															},
														},
														{
															xtype:'container',
															layout:{
																type: 'hbox'
															},
															margin: '0 5 0 20',
															flex: 1,
															items:[
																{
																	xtype: 'button',
																	text: ViewUtil.getLabel('excelUpload'),
																	ui: 'create-button',
																	reference:'refExcelUploadForPackageDetailBtn',
																	listeners:{
																		click: 'onPackageDetailExcelUpload'
																	},
																	disabled: true
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
																	},
																	disabled: true
																}
															]
														},
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
													select: 'onSelectPkg' //'onCount',													
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