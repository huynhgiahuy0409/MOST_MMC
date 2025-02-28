Ext.define('MOST.view.vessel.vesselparticular.VesselParticularDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-vesselparticulardetail',
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	config:{
		vslCd: ''	
	},
	
	scrollable: true,
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CLASS_COMBO_STORE: 'classCombo',
	VESSEL_TYPE_COMBO_STORE: 'vslTypeCombo',
	TRADE_COMBO_STORE: 'tradeCombo',
	SHIPPING_AGENT_COMBO_STORE: 'shaCombo',
	VESSEL_TRADE_COMBO_STORE: 'vslTradeCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	height: 783,
	width: 1035,
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			xtype:'form',
			defaults:{
				margin: '0 5 0 5'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
	                xtype: 'container',
	                defaults:{
	                	padding: '0 10 10 10'
	                },
	                items: [
	    				{
	    					xtype: 'fieldset',
	    					title: ViewUtil.getLabel('vslpatiVslInf'),
	    					items:[
	    						{
	    							xtype: 'container',
	    			                defaults: {
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox',
	    			                    align: 'stretch'
	    			                },
	    			                items:[
	    			                	{
    			                			xtype: 'textfield',
    			                			reference: 'txtId',
    			                			flex:1,
    			                			bind:{
    			                				value: '{vslPapticular.vslCd}'
    			                			},
    			                			fieldLabel: ViewUtil.getLabel('vslpatiID'),
    			                			allowBlank: false,
    			                            maskRe: /[a-zA-Z0-9]/,
    										enforceMaxLength: true,
    										maxLength : 4,
    			                			listeners:{
    			                				focusleave: 'onCheckDuplicateVslId',
    			                				change: 'onUpperCase'
    			                			}
    			                 		},{
				                			xtype: 'textfield',
				                			reference: 'txtVslNm',
				                			flex:2,
										    enforceMaxLength: true,
											maxLength : 40,
				                			bind:{
				                				value: '{vslPapticular.vslNm}'
				                			},
				                			fieldLabel: ViewUtil.getLabel('vesselname'),
				                			allowBlank: false,
				                			listeners:{
				        						change: 'onUpperCase'
				        					}
    			                 		}
	    			                ]
	    						},{
									xtype: 'container',
									flex: 1,
									defaults: {
										margin:'5 20 0 0',
										labelAlign: 'right',
										labelWidth: 100
									},
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items:[
										{
											xtype: 'radiogroup',
											fieldLabel: ViewUtil.getLabel('vslpatiVSlSrvType'),
											flex:1,
											reference: 'rdVSlSrvType',
											bind: {
												value:'{vslPapticular.domYn}'
											},
											items:[
												{
													boxLabel: ViewUtil.getLabel('vslpatiDomestic'),
													name: 'rbSrvType',
													bind:{
														value: '{vslPapticular.domYn}'
													},
													inputValue: '1',
												},{
													boxLabel: ViewUtil.getLabel('vslpatiInternational'),
													name: 'rbSrvType',
													bind:{
														value: '{vslPapticular.domYn}'
													},
													inputValue: '2'
												}
											]
										},{
											xtype: 'radiogroup',
											fieldLabel: ViewUtil.getLabel('vslpatiISPSCompliant'),
											flex:1,
											reference: 'rdISPSCompliant',
											bind: {
												value:'{vslPapticular.complantYn}'
											},
											items:[
												{
													boxLabel: ViewUtil.getLabel('vslpatiCompliant'),
													name: 'rbISPS',
													bind:{
														value: '{vslPapticular.complantYn}'
													},
													inputValue: 'Y'
												},{
													boxLabel: ViewUtil.getLabel('vslpatiNonCompliant'),
													name: 'rbISPS',
													inputValue: 'N',
													checked: true
												}
											]
										},{
											xtype: 'container',
											flex:1
										}
					                ]
								},
	    						{
	    							xtype: 'container',
	    							defaults: {
	    								margin: '5 0 5 0',
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox',
	    			                    align: 'stretch'
	    			                },
	    			                items:[
	    			                	{
					                		xtype: 'textfield',
					                		reference: 'txtYearBuild',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiYearBuild'),
					                		bind:{
					                			value: '{vslPapticular.bldYear}'
					                		},
					                		listeners:{
					                			focusleave: 'onCheckYearBuild',
					                		},
					                		allowBlank: false
					                	},{
					                 		xtype: 'textfield',
					                 		reference: 'txtShpOfNo',
					                 		flex: 1,
						                	fieldLabel: ViewUtil.getLabel('vslpatiShpOfNo'),
										    bind:{
												value: '{vslPapticular.shipOfficialNo}'
											},
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength : 15,
						                	//allowBlank: false,
						                	fieldStyle: 'text-transform:uppercase'
					                 	},{
    				                 		xtype: 'textfield',
    				                 		reference: 'txtCallSign',
    				                 		flex: 1,
    					                	fieldLabel: ViewUtil.getLabel('vslpatiCallSign'),
    					                	allowBlank: false,
    					                	bind:{
    											value: '{vslPapticular.callSign}'
    										},
    									    maskRe: /[a-zA-Z0-9]/,
    										enforceMaxLength: true,
    										maxLength : 10,
    				                		fieldStyle: 'text-transform:uppercase'
	    			                	}
	    			                ]
	    						},{
	    							xtype: 'container',
	    							defaults: {
	    								margin: '5 0 5 0',
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox',
	    			                    align: 'stretch'
	    			                },
	    			                items:[
	    			                	{
					                		xtype: 'container',
							                layout: {
							                	type: 'hbox'
							                },
							                flex: 1,
							                defaults: {
			    			                    labelAlign: 'right',
			    			                },
							                items:[
							                	{
							                		xtype: 'textfield',
							                		reference: 'txtFlag',
							                		flex: 1,
							                		fieldLabel: ViewUtil.getLabel('vslpatiFlag'),
							                		bind:{
							                			value: '{vslPapticular.vslFlagCd}'
							                		},
							                		editable: false,
							                		allowBlank: false
							                	},{
							    					xtype: 'button',
							    					margin: '0 0 0 5',
							    					reference:'ctlOpenFlagPopupButton',
							    					iconCls: 'x-fa fa-search',
							    					listeners:{
							    						click: 'openFlagPopup'
							    					}
							                	}
							                ]
					                	},{
				                 			xtype: 'textfield',
				                 			reference: 'txtCountry',
				                 			flex: 1,
				                 			fieldLabel: ViewUtil.getLabel('vslpatiCountry'),
				                 			allowBlank: false,
			                 				bind:{
			                 					value: '{vslPapticular.cntyCd}'
				                			},
				                 		},{
				        					xtype: 'combobox',
				        					reference: 'cboVslType',
				        					fieldLabel: ViewUtil.getLabel('vslpatiVesselType'),
				        					flex: 1,
				        					emptyText: 'Select',
				        					value: '',
				        					bind:{
				        						value: '{vslPapticular.vslTp}',
				        						store: '{vslTypeCombo}'
				        					},
				        					displayField:'scdNm',
				        					valueField: 'scd',
				        					editable: false,
				        					allowBlank: false,
				        					queryMode:'local',
				        					listeners:{
				        						select: 'onSelectVslType'
				        					}
				                 		}
	    			                ]
	    						},{
	    							xtype: 'container',
	    							defaults: {
	    								margin: '5 0 5 0',
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox',
	    			                    align: 'stretch'
	    			                },
	    			                items:[
	    			                	{
					                		xtype: 'container',
							                layout: {
							                	type: 'hbox'
							                },
							                flex: 1,
							                defaults: {
			    			                    labelAlign: 'right',
			    			                },
							                items:[
							                	{
							                		xtype: 'textfield',
							                		reference: 'txtPortReg',
							                		flex: 1,
							                		fieldLabel: ViewUtil.getLabel('vslpatiPortReg'),
							                		allowBlank: false,
							                		bind:{
							                			value: '{vslPapticular.vslRegPort}'
							                		},
							                		editable: false,
							                		fieldStyle: 'text-transform:uppercase'
							                	},{
							    					xtype: 'button',
							    					margin: '0 0 0 5',
							    					reference:'ctlOpenPortRegPopupButton',
							    					iconCls: 'x-fa fa-search',
							    					listeners:{
							    						click: 'openPortRegPopup'
							    					}
							                	}
							                ]
					                	},{
					                		xtype: 'datefield',
				        					reference: 'ctlDateLaunch',
				        					flex: 1,
				        					fieldLabel: ViewUtil.getLabel('vslpatiLaunch'),
				        					format: MOST.config.Locale.getShortDate(),
				        					bind:{
				        						value: '{vslPapticular.launchDt}'
				        					},
				        					editable: false,
				        					listeners:{
				        						change: 'onChangeDateField'
				        					}
				        				},{
				        					xtype: 'datefield',
				        					reference: 'ctlDtReg',
				        					flex: 1,
				        					fieldLabel: ViewUtil.getLabel('vslpatiDateOfRegistry'),
				        					format: MOST.config.Locale.getShortDate(),
				        					bind:{
				        						value: '{vslPapticular.regDt}'
				        					},
				        					editable: false,
				        					listeners:{
				        						change: 'onChangeDateField'
				        					}
				        				}
	    			                ]
	    						},{
	    							xtype: 'container',
	    							defaults: {
	    								margin: '5 0 5 0',
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox'
	    			                },
	    			                items:[
	    			                	{
    			                			xtype: 'textfield',
											reference: 'txtVesselCd',
											flex: 1,
											margin: '-2 0 5 0',
											fieldLabel: ViewUtil.getLabel('vslpatiVesselCd'),
											//allowBlank: false,
											bind:{
												 value: '{vslPapticular.vslCustCd}'
											},
					                		fieldStyle: 'text-transform:uppercase'
				                 		},{
			                 				xtype: 'textfield',
			                 				reference: 'txtImoNo',
			                 				flex: 1,
			                 				fieldLabel: ViewUtil.getLabel('vslpatiImoNo'),
			                 				allowBlank: false,
			                 				bind:{
												value: '{vslPapticular.imoNo}'
											},
										    maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength : 7,
					                		fieldStyle: 'text-transform:uppercase'
				        				},{
				        					xtype: 'combo',
				        					hidden: true,
				        					reference: 'cboTrade',
				        					fieldLabel: ViewUtil.getLabel('vslpatiTrade'),
				        					flex: 1,
				        					emptyText: 'Select',
				        					bind:{
				        						value: '{vslPapticular.vslTpTrade}',
				        						store: '{' + me.TRADE_COMBO_STORE + '}'
				        					},
				        					displayField:'optionName',
				        					valueField: 'optionValue',
				        					editable: false,
				        					queryMode:'local'
				                 		}
	    			                ]
	    						},{
	    							xtype: 'container',
	    							defaults: {
	    								margin: '0 0 5 0',
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox'
	    			                },
	    			                items:[
	    			                	{
	    			                		xtype: 'combobox',
				                		 	reference: 'cboAgencyCode',
				        					flex: 1,
				        					fieldLabel: ViewUtil.getLabel('vslpatiAgencyCode'),
				        					bind:{
				        						value: '{vslPapticular.saCorpId}',
				        						store: '{shaCombo}'
				        					},
				        					editable: false,
				        					allowBlank: false,
				        					displayField:'cdNm',
				        					valueField: 'cd',
				        					queryMode: 'local',
				        					emptyText: 'Select',
				        					value: '',
											listeners: {
												select: 'selectSha'
											}
	    			                	},{
				                			xtype: 'textfield',
				                			flex: 2,
				                			reference: 'txtName',
				                			width: 350,
				                			fieldLabel: ViewUtil.getLabel('vslpatiAgencyName'),
				                			allowBlank: false,
				                			bind:{
				        						value: '{vslPapticular.corpNm}'
				        					},
				        					editable: false
	    			                	}
	    			                ]
	    						},{
	    							xtype: 'container',
	    							defaults: {
	    								margin: '5 0 5 0',
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox'
	    			                },
	    			                items:[
	    			                	{	
					                		xtype: 'textfield',
					                		hidden: true,
					                		reference: 'txtCustomsSACode',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiCustomsSACode'),
					                		bind:{
				        						value: '{vslPapticular.shipLicense}',
				        					},
					                		fieldStyle: 'text-transform:uppercase'
					                	},{	
					                		xtype: 'datefield',
					                		reference: 'ctlExpiryDate',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiExpiryDate'),
					                		format: MOST.config.Locale.getShortDate(),
					                		editable: false,
					                		bind:{
				        						value: '{vslPapticular.isscExprDt}'
				        					},
				        					listeners:{
				        						change: 'onChangeDateField'
				        					}
					                	},{	
					                		xtype: 'textfield',
					                		reference: 'txtMMSI',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiMMSI'),
					                		bind:{
				        						value: '{vslPapticular.mmsiCd}',
				        					},
				        					maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength : 9,
				        					fieldStyle: 'text-transform:uppercase'
					                	}
	    			                ]
	    						},{
	    							xtype: 'container',
	    							defaults: {
	    								margin: '5 0 5 0',
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox'
	    			                },
	    			                items:[
	    			                	{
	    			                		xtype: 'combobox',
					                		reference: 'cboVesselDesign',
					                		flex: 1,
				        					fieldLabel: ViewUtil.getLabel('vslpatiVesselDesign'),
				        					emptyText: 'Select',
				        					bind:{
				        						value: '{vslPapticular.vslTp1Vsl}',
				        						store: '{vslDesignCombo}'
				        					},
				        					displayField:'optionName',
				        					editable: false,
				        					valueField: 'optionValue',
				        					queryMode: 'local'
					                	},{
				        					xtype: 'combobox',
				        					reference: 'cboShippingLine',
				        					flex: 1,
				        					fieldLabel: ViewUtil.getLabel('vslpatiShippingLine'),
				        					emptyText: 'Select',
				        					bind:{
				        						value: '{vslPapticular.shippingLineCd}',
				        						store: '{shpCombo}'
				        					},
				        					displayField:'cdNm',
				        					valueField: 'cd',
				        					editable: false,
				        					matchFieldWidth: false,
				        					queryMode: 'local',
				        					listConfig: {
				        						listeners: {
				        							beforeshow: function(picker) {
				        								picker.minWidth = picker.up('combobox').getSize().width;
				        							}
				        						}
				        					}
					                	},{
					                		xtype: 'radiogroup',
					                		fieldLabel: ViewUtil.getLabel('vslpatiCrane'),
					                		flex: 1,
					                		reference: 'rdCrane',
					                		bind: {value:'{vslPapticular.craneYn}'},
					                		items:[
					                			{
					                				boxLabel: ViewUtil.getLabel('vslpatiYes'),
					                				name: 'rbCrane',
					                				inputValue: 'Y',
					                				bind:{
						        						value: '{vslPapticular.craneYn}',
						        					},
					                			},
					                			{
					                				boxLabel: ViewUtil.getLabel('vslpatiNo'),
					                				name: 'rbCrane',
					                				inputValue: 'N',
					                				width: 50,
					                				bind:{
						        						value: '{vslPapticular.craneYn}',
						        					},
						        					checked: true
					                			}
					                		]
					                	}
	    			                ]
	    						},{
	    							xtype: 'container',
	    							defaults: {
	    								margin: '5 0 0 0',
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                layout: {
	    			                	type: 'hbox'
	    			                },
	    			                items:[
	    			                	{
	    			                		xtype: 'combobox',
					                		reference: 'cboVesselTerm',
				        					fieldLabel: ViewUtil.getLabel('vslpatiVesselTerm'),
				        					flex: 1,
				        					emptyText: 'Select',
				        					bind:{
				        						value: '{vslPapticular.vslTp2Term}',
				        						store: '{vslTermCombo}'
				        					},
				        					displayField:'optionName',
				        					editable: false,
				        					valueField: 'optionValue',
				        					queryMode: 'local'
					                	},{
					                		xtype: 'combobox',
					                		reference: 'cboVesselTrade',
				        					fieldLabel: ViewUtil.getLabel('vslpatiVesselTrade'),
				        					flex: 1,
				        					emptyText: 'Select',
				        					bind:{
				        						value: '{vslPapticular.vslTp3Trade}',
				        						store: '{' + me.VESSEL_TRADE_COMBO_STORE + '}'
				        					},
				        					displayField:'optionName',
				        					valueField: 'optionValue',
				        					editable: false,
				        					queryMode: 'local'
					                	},{
					                		xtype: 'container',
					                		flex: 1
					                	}
	    			                ]
	    						}
    						]
	    				},{
	    					xtype: 'fieldset',
	    					title: ViewUtil.getLabel('vslpatiDimensions'),
	    					items:[
	    						{
			                		xtype: 'container',
					                layout: {
					                	type: 'hbox',
					                },
									defaults: {
										margin: '0 0 5 0',
										labelAlign: 'right',
										labelWidth: 100
									},
					                items:[
					                	{	
					                		xtype: 'numberfield',
						                	reference: 'txtLoa',
						                	flex:1,
						                	fieldLabel: ViewUtil.getLabel('vslpatiLoa'),
					                		bind:{
				        						value: '{vslPapticular.loa}',
				        					},
				        					maskRe: /[0-9.]/,
				        					allowBlank: false,
				        					enforceMaxLength: true,
				        					minValue: 1,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtLBP',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiLBP'),
					                		allowBlank: true,
					                		bind:{
				        						value: '{vslPapticular.lbp}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtTopTierHeight',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiTopTierHeight'),
					                		bind:{
				        						value: '{vslPapticular.topTiger}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	}
					                ]
			                	},{
			                		xtype: 'container',
					                layout: {
					                	type: 'hbox',
					                },
									defaults: {
										margin: '5 0 5 0',
										labelAlign: 'right',
										labelWidth: 100
									},
					                items:[
					                	{
					                		xtype: 'numberfield',
					                		reference: 'txtBreadth',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiBreadth'),
					                		bind:{
				        						value: '{vslPapticular.vslWidth}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtDepth',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiDepth'),
					                		bind:{
				        						value: '{vslPapticular.vslDepth}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtAntenna',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiAntenna'),
					                		bind:{
				        						value: '{vslPapticular.antnHgt}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	}
					                ]
			                	},{
			                		xtype: 'container',
					                layout: {
					                	type: 'hbox',
					                },
									defaults: {
										margin: '5 0 0 0',
										labelAlign: 'right',
										labelWidth: 100
									},
					                items:[
					                	{
					                		xtype: 'numberfield',
					                		reference: 'txtDHStern',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiDHStern'),
					                		bind:{
				        						value: '{vslPapticular.sternDist}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtDHBow',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiDHBow'),
					                		bind:{
				        						value: '{vslPapticular.bowDist}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtOutreach',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiOutreach'),
					                		bind:{
				        						value: '{vslPapticular.outr}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	}
					                ]
			                	}
			                ]
						},{
							xtype: 'fieldset',
							title: ViewUtil.getLabel('vslpatiCapacity'),
							items:[
								{
									xtype: 'container',
					                defaults: {
					                	margin: '0 0 5 0',
					                	labelAlign: 'right',
					                    labelWidth: 100
					                },
					                layout: {
					                	type: 'hbox',
					                    align: 'stretch'
					                },
					                items:[
				                		{
					                		xtype: 'numberfield',
					                		reference: 'txtNRT',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiNRT'),
					                		allowBlank: false,
					                		bind:{
				        						value: '{vslPapticular.nrt}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{	
				                		 	xtype: 'numberfield',
					                		reference: 'txtGRT',
					                		flex: 1,
					                		allowBlank: false,
					                		fieldLabel: ViewUtil.getLabel('vslpatiGRT'),
					                		bind:{
				        						value: '{vslPapticular.grt}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{	
					                		xtype: 'numberfield',
					                		reference: 'txtBale',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiBale'),
					                		bind:{
				        						value: '{vslPapticular.baleCapa}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	}
					                ]
			                	},{
									xtype: 'container',
					                defaults: {
					                	margin: '5 0 5 0',
					                	labelAlign: 'right',
					                    labelWidth: 100
					                },
					                layout: {
					                	type: 'hbox',
					                    align: 'stretch'
					                },
					                items:[
				                		{
					                		xtype: 'numberfield',
					                		reference: 'txtSummerDraught',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiSummerDraught'),
					                		bind:{
				        						value: '{vslPapticular.summDrf}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtDWT',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiDWT'),
					                		bind:{
				        						value: '{vslPapticular.dwt}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtGrain',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiGrain'),
					                		bind:{
				        						value: '{vslPapticular.grainCapa}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	}
					                ]
			                	},{
									xtype: 'container',
					                defaults: {
					                	margin: '5 0 5 0',
					                	labelAlign: 'right',
					                    labelWidth: 100
					                },
					                layout: {
					                	type: 'hbox',
					                    align: 'stretch'
					                },
					                items:[
				                		{
					                		xtype: 'numberfield',
					                		reference: 'txtBHP',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiBHP'),
					                		bind:{
				        						value: '{vslPapticular.engBhp}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'container',
					                		flex: 1
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtDisplacement',
					                		flex: 1,
					                		bind:{
				        						value: '{vslPapticular.disp}',
				        					},
					                		fieldLabel: ViewUtil.getLabel('vslpatiDisplacement'),
					                		maskRe: /[0-9.]/,
					                		enforceMaxLength: true,
					                		minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	}
					                ]
			                	},{
									xtype: 'container',
					                defaults: {
					                	margin: '5 0 5 0',
					                	labelAlign: 'right',
					                    labelWidth: 100
					                },
					                layout: {
					                	type: 'hbox',
					                    align: 'stretch'
					                },
					                items:[
				                		{
					                		xtype: 'numberfield',
					                		reference: 'txtSpeed',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiSpeed'),
					                		bind:{
				        						value: '{vslPapticular.speed}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtMaxTEU',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiMaxTEU'),
					                		bind:{
				        						value: '{vslPapticular.mxTeu}',
				        					},
					                		maskRe: /[0-9.]/,
					                		enforceMaxLength: true,
					                		minValue: 0,
	    									maxValue: 999999999999999.999,
	    									decimalPrecision: 3
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtHatchQty',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiHatchQty'),
					                		bind:{
				        						value: '{vslPapticular.hatchQty}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999,
	    									decimalPrecision: 0
					                	}
					                ]
			                	},{
									xtype: 'container',
					                defaults: {
					                	margin: '5 0 0 0',
					                	labelAlign: 'right',
					                    labelWidth: 100
					                },
					                layout: {
					                	type: 'hbox',
					                    align: 'stretch'
					                },
					                items:[
				                		{
					                		xtype: 'numberfield',
					                		reference: 'txtMxRowsDeck',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiMxRowsDeck'),
					                		bind:{
				        						value: '{vslPapticular.mxRowDeck}',
				        					},
				        					maskRe: /[0-9.]/,
				        					enforceMaxLength: true,
				        					minValue: 0,
	    									maxValue: 999999999999999,
	    									decimalPrecision: 0
					                	},{
					                		xtype: 'numberfield',
					                		reference: 'txtMxRowsHold',
					                		flex: 1,
					                		fieldLabel: ViewUtil.getLabel('vslpatiMxRowsHold'),
					                		bind:{
				        						value: '{vslPapticular.mxRowHod}',
				        					},
					                		maskRe: /[0-9.]/,
					                		enforceMaxLength: true,
					                		minValue: 0,
	    									maxValue: 999999999999999,
	    									decimalPrecision: 0
					                	},{
					                		xtype: 'container',
					                		flex: 1
					                	}
					                ]
			                	}
							]
						}
					]
				}
	        ],
	        
	        dockedItems: [
	        	{
					xtype: 'toolbar',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right'
		        	},
					items: [
						{
							xtype: 'textfield',
							reference:'refVesselStatus',
							width: 75,
							readOnly: true,
							bind: {
								value: '{vslPapticular.statCdNm}'
							}
						},'->',{
							xtype: 'button',
							text: "Approved",
							ui: 'create-button',
							reference:'refBtnApproved',
							listeners: {
								click: 'onConfirm'
							}
						}
					]
				}
	        ]
		});
		
		me.callParent();
	}
});