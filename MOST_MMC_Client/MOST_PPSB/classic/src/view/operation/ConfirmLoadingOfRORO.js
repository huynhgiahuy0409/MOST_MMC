Ext.define('MOST.view.operation.ConfirmLoadingOfRORO', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-confirmloadingofroro',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	width:850,
	height: 750,
	scrollable: true,
	
	controller: 'confirmLoadingOfRORO',
	
	viewModel: {
		type: 'confirmLoadingOfRORO'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	defaults: {
        padding: '5 0 5 0',
        margin: '0 5 2 5',
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },
    
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			xtype:'form',
			defaults:{
				margin: '2 5 2 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
		            xtype: 'fieldset',
		            margin: '5 5 0 5',
		            defaults: {
		                labelAlign: 'right',
		                layout: {
		                    type: 'hbox',
		                    align: 'stretch'
		                },
		                defaults: {
		                    margin: '0 5 2 5',
		                    labelAlign: 'right',
		                    flex: 1,
		                    labelWidth: 100
		                }
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		            	{
		                    xtype: 'container',
		                    items: [
		                    	{
				                    xtype: 'textfield',
									flex: 1,							
				                    fieldLabel: ViewUtil.getLabel('confirmLoadingJpvc'),
				                    bind:'{theRRDetail.vslCallId}',
				                    readOnly:true
				                },
				                {
				                    xtype: 'textfield',
				                    flex: 1,
				                    reference:'ctlBlSnNo',
				                    fieldLabel: ViewUtil.getLabel('confirmLoadingSn'),
				                    bind:'{theRRDetail.shipgNoteNo}',
				                    readOnly:true
				                },
		                    ]
		            	},
		            	{
		                    xtype: 'container',
		                    items: [
		                    	{
				                    xtype: 'textfield',
				                    fieldLabel: ViewUtil.getLabel('vesselname'),
				                    flex: 1,
				                    bind:'{theRRDetail.vslNm}',
				                    readOnly:true
				                },
				                
				                {
				                    xtype: 'combobox',
				                    flex: 1,
				                    fieldLabel: ViewUtil.getLabel('deliveryMode'),
				                    //labelWidth: 150,
				                    queryMode: 'local',
				                    bind: {
				                    	value: '{theRRDetail.delvTpNm}'
				                    },
				                    readOnly:true
				                },
		                    ]
		            	},
		            	{
		                    xtype: 'container',
		                    items: [
		                    	{
				                    xtype: 'container',
									flex: 1,							
				                },
				                {
				                    xtype: 'textfield',
				                    reference: 'ctlBlGr',
				                    flex: 1,
				                    hidden:true,
				                    fieldLabel: ViewUtil.getLabel('confirmLoadingGr'),
				                    bind:'{theRRDetail.grNo}',
				                    readOnly:true
				                }
		                    ]
		            	},
		            ]
				},
		        {
		            xtype: 'fieldset',
		            margin: '5 5 0 5',
		            defaults: {
		            	margin: '0 5 2 5',
	                    labelAlign: 'right',
	                    flex: 1,
	                    labelWidth: 100
		            },
					reference:'ctlEqForm',
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		            	{
		                    xtype: 'combobox',
		                    fieldLabel: ViewUtil.getLabel('confirmLoadingEquipment'),
		                    queryMode: 'local',
		                    bind: {
								store: '{deployedEquipmentNoList}',
								value: '{theRRDetail.eqNo}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            allowBlank: false
		                },
		                {
		                    xtype: 'combobox',
		                    reference: 'ctlConfirmLoadingHatchNo',
		                    fieldLabel: ViewUtil.getLabel('confirmLoadingHatchNo'),
		                    queryMode: 'local',
		                    bind: {
                            	store: '{confirmLoadingHatchCombo}',
                            	value:'{theRRDetail.hatchNo}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            forceSelection:true
		                }
		            ]
		        },

		        {
		            xtype: 'fieldset',
		            margin: '5 5 0 5',
		            defaults: {
		                //margin: '0 5 0 5',
		                labelAlign: 'right',
		                layout: {
		                    type: 'hbox',
		                    align: 'stretch'
		                },
		                defaults: {
		                    margin: '0 5 2 5',
		                    labelAlign: 'right',
		                    flex: 1,
		                    labelWidth: 100
		                }
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    items: [
		                        {
		                            xtype: 'datetimefield',
		                            flex:1,
		                            reference: 'ctlConfirmLoadingStartDt',
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingStartDateTime'),
		                            bind:{
										value: '{theRRDetail.startDt}',
									},
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            allowBlank:false,
									readOnly: true,
									edittable: false,
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex:1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingShift'),
		                            bind:'{theRRDetail.shftNm}',
		                            readOnly:true,
		                        },
								{
									xtype: 'textfield',
									flex:1,
									reference: 'cltTxtCgTpCdNm',
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
		                            bind: {
										value: '{theRRDetail.cgTpNm}'
									},
		                            readOnly: true,
		                            allowBlank: true
									
								}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    items: [
		                        {
		                            xtype: 'datetimefield',
		                            flex:1,
		                            reference: 'ctlConfirmLoadingEndDt',
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingEndDateTime'),
		                            bind:'{theRRDetail.endDt}',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									readOnly: true,
									edittable: false,
		                        },
								{
									xtype: 'textfield',
									flex:1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingClearance'),
		                            bind: {
										value: '{theRRDetail.custMode}',
									},
		                            readOnly: true,
		                            allowBlank: true
								},	
		                        {
		                            xtype: 'combobox',
		                            flex:1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingModeOfOpr'),
		                            bind: {
		                            	value: '{theRRDetail.tsptTpCd}'
		                            },
									edittable: false,
									readOnly: true
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    items: [
		                        {
		                            xtype: 'container',
		                            flex:1
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex:1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingLorryCompany'),
		                            bind:'{theRRDetail.tsptr}',
		                            readOnly:true,
		                            fieldStyle:'text-transform:uppercase',
		                            //uppercase: true
		                            renderer:function(val){
		           						if(val != null || val != ''){
		           							
		           							return val.toUpperCase();
		           						}
		           					},
		                        },
		                        
		                        {
									xtype: 'container',	
									flex:1,
									defaults: {
						                labelAlign: 'right',
										margin: '0 5 0 0',
						            },
									layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
						            items: [
						            	{
											xtype: 'container',
											width: 100
						            	},
						            	{
											xtype: 'checkboxfield',	
											flex:1,
											hidden:true,
											boxLabel: ViewUtil.getLabel('confirmLoadingFinalDelivery'),
											bind: '{fnlOpeYnChecked}'
										}
						            ]
		                        },
		                        	
		                    ]
		                },						
		            ]
		        },
				{//ROW SHIPGNOTE AMT, FREIGHT TON PKG TP:
					xtype: 'fieldset',
					margin: '5 5 0 5',								
					defaults: {
		                labelAlign: 'right',
						margin: '0 5 0 5',
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
					items: [
						{//SN AMT
							xtype: 'container',
							flex: 1,
							defaults: {										
								defaults: {
									margin: '0 5 2 0',
									labelAlign: 'right',
									labelWidth: 100,
								},
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items:[					
								{//label row: MT M3 QTY
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'container',
											width: 100
										},
										{
											xtype: 'label',
											flex: 1,
											style: {
												'text-align': 'center'
											},
											text: 'Qty'
										},
										{
											xtype: 'label',
											flex: 1,
											style: {
												'text-align': 'center'
											},
											text: 'MT'
										},
										{
											xtype: 'label',
											flex: 1,
											style: {
												'text-align': 'center'
											},
											text: 'M3'
										}
									]
								},
								{//row
									xtype: 'container',
									items: [
										{
											xtype: 'label',
											flex: 1,
											margin: '2 5 0 5',
											style: {
												'text-align': 'right'
											},
											text: ViewUtil.getLabel('confirmLoadingSnDocAmt')
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.snQty}',
											readOnly:true
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.snMt}',
											readOnly:true
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.snM3}',
											readOnly:true
										},
									]
								},
								{//row
									xtype: 'container',											
									items: [
										{
											xtype: 'label',
											flex: 1,
											margin: '2 5 0 5',
											style: {
												'text-align': 'right'
											},
											text: ViewUtil.getLabel('confirmLoadingSnLoadingAmt')
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.accuSumQty}',
											readOnly:true
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.accuSumWgt}',
											readOnly:true
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.accuSumMsrmt}',
											readOnly:true
										}
									]
								},
								{//row
									xtype: 'container',
									items: [
										{
											xtype: 'label',
											flex: 1,
											margin: '2 5 0 5',
											style: {
												'text-align': 'right'
											},
											text: ViewUtil.getLabel('confirmLoadingGrDocAmt')
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.docQty}',
											readOnly:true
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.docMt}',
											readOnly:true
										},
										{
											xtype: 'textfield',
											flex: 1,
											bind:'{theRRDetail.docM3}',
											readOnly:true
										}
									]
								},
								

							]
						},
						{//FREIGHT TON PKG TP:
							xtype: 'container',
							flex: 1,
							defaults: {										
								defaults: {
									margin: '5 5 2 0',
									labelAlign: 'right',
									labelWidth: 100,
								},
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
							},
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items:[
								{//row
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
		             	   					xtype:'textfield', //Display list of vin
		             	   					fieldLabel: ViewUtil.getLabel('unitNo'),
											flex: 1,
		             	   					reference:'ctlUnitNoSearchField',
		             	   					readOnly:true,
						                    bind:{
						                    	value : '{theRRDetail.unitNo}'
						                    }
		                                 },{
		     								xtype: 'button',
		     								disabled: false,
		             	   					reference:'ctlBtnUnitNoSearchField',
		     			 					iconCls: 'x-fa fa-search',
		     			 					listeners: {
		     			 						click: 'openUnitListPopup'
		     			 					}
		     							}
									]
								},
								{//row
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: '2 5 0 0',
											style: {
												'text-align': 'right'
											},
											width: 100,
											text: ViewUtil.getLabel('confirmLoadingPackageNo')
										},
										{
											xtype: 'textfield',
											reference: 'cltPkgNo',
											flex: 1,
											bind:'{theRRDetail.pkgNo}',
											fieldStyle: 'text-transform:uppercase',
											listeners:{
												change: 'onUpperCase'
											},
											enforceMaxLength : true,
											editable: false
										},
										{
				                            xtype: 'button',
				                            reference: 'btnPackageNo',
				                            iconCls: 'x-fa fa-search',
						 					listeners: {
						 						click: 'onOpenPkgNoPopup'
						 					}
				                        },
									]
								},
								{//row
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											margin: '2 5 0 0',
											style: {
												'text-align': 'right'
											},
											width: 100,
											text: ViewUtil.getLabel('confirmLoadingPackingType')
										},
										{
											xtype: 'cmmcdfield',
											hidden: true,
											width: 100,
											bind:{
												value : '{theRRDetail.rePkgTpCd}'
											},
											params:{
												   searchType: 'COMM',
												   searchDivCd: 'PKGTP',
												   searchLcd: 'MT',
												   searchCol1: 'LB'
											   }
										},
										{
											xtype: 'cmmcdfield',
											reference:'ctlConfirmLoadingPacTypeCode',
											flex:1,
											labelWidth: 60,
											//fieldLabel: ViewUtil.getLabel('confirmLoadingPkgType'),
											bind:{
												value : '{theRRDetail.rePkgTpCd}'
											},
											params:{
												   searchType: 'COMM',
												   searchDivCd: 'PKGTP',
												   searchLcd:CodeConstants.LCD_MOST,
					                               searchMcd: CodeConstants.MCD_MT_PKGTP,
											   },
											allowBlank:false
										}
									]
								}
							]
						}
					]
				},

				{// Fieldset: Gate to vessel, Gate To apron, Arpon to vessel
					xtype: 'fieldset',
					margin: '5 5 0 5',
		            defaults: {
		                labelAlign: 'right',
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
						{//Gate to vessel, Gate To apron,
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{//Gate to vessel
									xtype: 'container',
									reference: 'refGV',	
									defaults: {
										margin: '0 5 2 0',
										labelAlign: 'right',
										labelWidth: 100,
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											margin: '0 5 2 0'
										}
									},
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{//row
											xtype: 'radiofield',
											reference:'ctlRadioGV',
											name: 'loadingType',
                    						inputValue: 'GV',
											boxLabel: ViewUtil.getLabel('confirmLoadingGV'),
											listeners: {
												change: 'onCheckLoadingType'
											}
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													width: 100,
													text: ViewUtil.getLabel('confirmLoadingBalAmt')
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balQty}',
													readOnly:true
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balMt}',
													readOnly:true
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balM3}',
													readOnly:true
												}
											]
										},
										{//row
											xtype: 'container',
											items: [												
												{
													xtype: 'label',
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													width: 100,
													text: ViewUtil.getLabel('confirmLoadingLoadingAmt')
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadGvQty', //'ctlConfirmLoadingQty',
													minValue : 0,
													selectOnFocus : true,
													flex: 1,
													bind:{
														value: '{theRRDetail.loadGvQty}',
													},
													listeners: {
//														change: 'onChangePkgQty'
													},
													allowBlank:false
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadGvMt',//'ctlConfirmLoadingMt',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadGvMt}',
													hideTrigger: true,
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadGvM3', //'ctlConfirmLoadingM3',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadGvM3}',
													hideTrigger: true,
												}
											]
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													width: 100,
													text: ViewUtil.getLabel('lorryNo')
												},
												{
						    	   					xtype:'truckfield',
						    	   					flex: 1,
						    	   					reference:'ctlConfirmLoadingLorryNo',
						    	   					bind :{ 
						    	   						value: '{theRRDetail.externalLorryNo}',
						    	   						vslCallId: '{theRRDetail.vslCallId}',
						    	   						shipgNoteNo: '{theRRDetail.blSn}',
						    	   						grNo: '{theRRDetail.grNo}',
						    	   						lorryNo: '{theRRDetail.lorryNo}',
						    	   						searchDivCd : 'IN-GATE',
						    	   						isAutoLoad: 'true',
				            	   						weightCheckYn: '{theRRDetail.weightCheckYn}'
						    	   					}
						                        },
											]	
										},
										{//row
											xtype: 'container',
											items: [
												{
				    								xtype: 'textfield',
				    								flex:1,
				    								labelAlign: 'right',
//				    							 	width: 150,
//				    								margin: '0 2 0 2',
				    							 	readOnly: true,
				    								fieldLabel: ViewUtil.getLabel('gateoperation.driverid'),
				    								bind:{
				    									value : '{theRRDetail.driverId}'
				    								},
				    								reference:'ctlDriverID',
				    							},
				    							{
				    								xtype: 'button',
//				    								margin: '0 2 0 2',
				    			 					iconCls: 'x-fa fa-search',
				    			 					listeners: {
				    			 						click: 'openDriversPopup'
				    			 					}
				    							},
											]	
										}
									]
								},
								//Barge to Vessel (Direct)
								{
									xtype: 'container',
									reference: 'refBV',	
									defaults: {
										margin: '0 5 2 0',
										labelAlign: 'right',
										labelWidth: 100,
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											margin: '0 5 2 0'
										}
									},
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{//row
											xtype: 'radiofield',
											reference:'ctlRadioBV',
											name: 'loadingType',
                    						inputValue: 'BV',
                    						hidden:true,
											boxLabel: ViewUtil.getLabel('bargeToVessel'),
											listeners: {
												change: 'onCheckLoadingType'
											}
										},
										{//row
											xtype: 'container',
                    						hidden:true,
											items: [
												{
													xtype: 'label',
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													width: 100,
													text: ViewUtil.getLabel('confirmLoadingBalAmt')
												},
												
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balQty}',
													readOnly:true
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balMt}',
													readOnly:true
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balM3}',
													readOnly:true
												}
											]
										},
										{//row
											xtype: 'container',
                    						hidden:true,
											items: [												
												{
		        		                            xtype: 'button',
		        		                            ui: 'delete-button',
		        		                            iconCls: 'x-fa fa-refresh',
		        		                            reference: 'btnHsFetch',
		        		                            width: 100,
		        		                            margin: '2 5 0 0',
		        		                            text: ViewUtil.getLabel('scaleAmt'),
		        		                            listeners: {
		        		    							click:'onHangingScaleFetch_clickHandler'
		        		    						}
		        		                        },
												{
													xtype : 'numberfield',
													reference: 'ctlLoadBvQty', //'ctlConfirmLoadingQty',
													minValue : 0,
													selectOnFocus : true,
													flex: 1,
													bind:{
														value: '{theRRDetail.loadBvQty}',
													},
													listeners: {
														//change: 'onChangePkgQty'
													},
													allowBlank:false
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadBvMt',//'ctlConfirmLoadingMt',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadBvMt}',
													hideTrigger: true,
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadBvM3', //'ctlConfirmLoadingM3',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadBvM3}',
													hideTrigger: true,
												}
											]
										},
										
										{//row
											xtype: 'container',
                    						hidden:true,
											items: [
												{
													xtype: 'label',
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													width: 100,
													text: ViewUtil.getLabel('bargeNo')
												},
												{
													xtype: 'bargefield',
													reference: 'ctlBargeNo',
													flex: 1,
													bind :{
														value : '{theRRDetail.bargeNo}',
														vslCallId: '{theRRDetail.vslCallId}',
													}
												}
											]	
										}

									]
								},
								{//Gate To apron,
									xtype: 'container',
									hidden: true,
									reference: 'refGA',
									defaults: {
										margin: '0 5 2 0',
										labelAlign: 'right',
										labelWidth: 100,
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											margin: '0 5 2 0'
										}
									},
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{//row
											xtype: 'radiofield',
											reference:'ctlRadioGA',
											name: 'loadingType',
                    						inputValue: 'GA',
											boxLabel: ViewUtil.getLabel('confirmLoadingGA'),
											listeners: {
												change: 'onCheckLoadingType'
											}
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													width: 100,
													text: ViewUtil.getLabel('confirmLoadingBalAmt')
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balQty}',
													readOnly:true
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balMt}',
													readOnly:true
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.balM3}',
													readOnly:true
												}
											]
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													width: 100,
													text: ViewUtil.getLabel('confirmLoadingApronAmt')
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadGaQty',
													minValue : 0,	
													maxValue: 99999,												
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadGaQty}',
													listeners: {
														change: 'onChangePkgQty',
														
													},
													allowBlank:false
													
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadGaMt',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadGaMt}',
													hideTrigger: true,
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadGaM3',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadGaM3}',
													hideTrigger: true,
												}
											]
										}
									]
								}
							]
						},
						
						{//Arpon to vessel, ...
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{//Arpon to vessel,
									xtype: 'container',
									reference: 'refAV',
									defaults: {
										margin: '0 5 2 0',
										labelAlign: 'right',
										labelWidth: 100,
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											margin: '0 5 2 0'
										}
									},
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{//row
											xtype: 'radiofield',
											reference:'ctlRadioAV',
											name: 'loadingType',
                    						inputValue: 'AV',
											boxLabel: ViewUtil.getLabel('confirmLoadingAV'),
											listeners: {
												change: 'onCheckLoadingType'
											}
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													width: 100,
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													text: ViewUtil.getLabel('confirmLoadingApronBal')
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.avBalQty}',
													readOnly:true
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.avBalMt}',
													readOnly:true
												},
												{
													xtype: 'textfield',
													flex: 1,
													bind:'{theRRDetail.avBalM3}',
													readOnly:true
												}
											]
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													width: 100,
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													text: ViewUtil.getLabel('confirmLoadingApronAmt')
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadAvQty',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadAvQty}',
													listeners: {
														//change: 'onChangePkgQty'
													},
													hideTrigger: false,
													edittable: false
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadAvMt',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,													
													bind:'{theRRDetail.loadAvMt}',
													hideTrigger: true,
													edittable: false
												},
												{
													xtype : 'numberfield',
													reference: 'ctlLoadAvM3',
													minValue : 0,
													maxValue: 999999999999.999,
													decimalPrecision: 3,
													selectOnFocus : true,
													flex: 1,
													bind:'{theRRDetail.loadAvM3}',
													hideTrigger: true,
													edittable: false
												}

											]
										},
										{//row
											xtype: 'container',
											items: [
												{
													xtype: 'label',
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													width: 100,
													text: ViewUtil.getLabel('stevedore')
												},
												{
													xtype: 'textfield',
													flex: 1,
													//with:300,
													bind:'{theRRDetail.stevedoreId}',
													maxLength: 40,
													enforceMaxLength : true
												}
											]
										},
										{//row
											xtype: 'container',
											hidden:true,
											items: [
												{
													xtype: 'label',
													width: 100,
													margin: '2 5 0 0',
													style: {
														'text-align': 'right'
													},
													text: ViewUtil.getLabel('yardTruck')
												},
												{
						    	   					xtype:'truckfield',
						    	   					flex: 1,
						    	   					reference:'refYardTruck',
						    	   					bind :{ 
						    	   						value : '{theRRDetail.internalLorryNo}',
						    	   						vslCallId: '{theRRDetail.vslCallId}',
						    	   						shipgNoteNo: '{theRRDetail.shipgNoteNo}',
						    	   						lorryNo: '{theRRDetail.lorryNo}',
						    	   						searchDivCd : 'APRON',
						    	   						isAutoLoad: 'true',
				            	   						weightCheckYn: '{theRRDetail.weightCheckYn}'
						    	   					}
						                        },
											]
										}
									]
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'hbox',
										pack: 'end'
									},
									defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
									items: [
//										{
//        		                            xtype: 'button',
//        		                            reference: 'btnDamage',
//        		                            text: ViewUtil.getLabel('damageCheck'),
//        		                            listeners: {
//        		    							click:'onDamage_clickHandler'
//        		    						}
//        		                        },
//        		                        {
//        		                            xtype: 'button',
//        		                            reference: 'btnDimension',
//        		                            text: ViewUtil.getLabel('dimensionCheck'),
//        		                            listeners: {
//        		    							click:'onDimension_clickHandler'
//        		    						}
//        		                        },
									]								
								}
							]
						},
						
					]
				},
			],
		    
		    dockedItems: [{
                xtype:'toolbar',
                dock : 'bottom',
                items : [{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align:'center'
						},
						flex:1,
						items: [{
							xtype:'container',
							layout: {
								type: 'hbox',
								align:'center'
						    },
						    items:[
								{
									xtype:'button',
									margin:'0 5 5 0',
									text: ViewUtil.getLabel('confirm'),
									reference:'btnOk',
									iconCls: 'fa fa-floppy-o',
									cls: 'search-button',                 	
									listeners:{
										click: 'onSave'
									}
								},{
									xtype:'button',
									text: ViewUtil.getLabel('cancel'),
									reference:'btnCancel',
									iconCls: 'fa fa-window-close',
									ui: 'delete-button',                 	
									listeners:{
										click: 'onCancel'
									}
								}
						    ]
						}
                    ]
					}
               	]
		    }]
		});
		
		me.callParent();
	}
});