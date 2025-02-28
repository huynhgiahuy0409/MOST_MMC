Ext.define("MOST.view.document.bl.BLInfo",{
    extend: "Ext.form.Panel",
   
    alias: 'widget.blinfo',
    requires:[
  		'MOST.config.Locale',
  		'TSB.ux.form.field.DateTimePicker'
  	],
	scrollable: 'y',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	FILE_GRID_REF_NAME : 'refBLFileUploadGrid', // File Grid Name  
	FILE_UPLOAD_STORE_NAME : 'blFileUpload', // File Store Name

	CARGO_GRID_REF_NAME: 'refBlCargoGrid',
	CARGO_STORE_NAME: 'blCargo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
  	initComponent: function() {
		var me = this;
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'blCargoEditor',
			autoCancel: false,
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateEdit',
				edit: 'onEdit' 
			}
		});
		
		Ext.apply(me, {
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
	                xtype: 'container',
	                defaults:{
	                	padding: '5 5 5 5'
	                },
	                items: [
	    				{
	    					xtype: 'fieldset',
	    					defaults:{
	    						margin: '5 0 0 0'
	    					},
	    					items:[
	    						{
	    							xtype: 'container',
	    			                defaults: {
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100
	    			                },
	    			                margin: '0 0 0 0',
	    			                layout: {
	    			                	type: 'hbox',
	    			                },
	    			                items:[
	    			                	{
	    									xtype: 'textfield',
	    									fieldLabel: ViewUtil.getLabel('pod'),
	    									flex: 1,
	    									reference:'txtPodCd',
	    									value : CONSTANTS.LAIP_PORT_CODE,
	    									emptyText: CONSTANTS.LAIP_PORT_CODE,
	    				                    readOnly:true,
	    									bind: '{theBL.pod}'
	    								},{
	    				                    xtype: 'combobox',
	    				                    fieldLabel: ViewUtil.getLabel('typeofCargo'),
	    				                    flex: 1,
	    				                    reference: 'ctlTypeofCargo',
	    				                    bind: {
	    				                    	store: '{typeCargoCombo}',
	    				                    	value: '{theBL.cgTpCd}'
	    				                    },
	    									queryMode: 'local',
	    							        displayField: 'scdNm',
	    							        valueField: 'scd',
	    							        editable: false,
	    							        allowBlank: false,
	    							        emptyText: 'Select',
	    							        value : '',
	    							        listeners:{
	    							        	select: 'onComboBoxChange',
	    							        	change: 'onTabSetting1'
	    							        }
	    				                },{
	    				                	xtype: 'container',
	    				                	layout:{
	    				                		type: 'hbox'
	    				                	},
	    				                	flex: 1,
	    				                	items:[
	    				                		{
	    				                			xtype:'container',
	    				                			flex:1,
	    				                			padding: '0 0 0 40',
			    									items:[
			    										{
			    											xtype: 'checkboxfield',
			    											boxLabel: ViewUtil.getLabel('packageCargo'),
			    											reference: 'refProjectCargo',
			    											bind: {
																value: '{theBL.projectCargo}'	
															},
			    											inputValue: 'Y',
			    					                        uncheckedValue: 'N',
			    					                        checked:false,
			    					                        disabled: true,
			    					                        listeners: {
			    					                        	// change: 'onTabSetting' Removed. From OPR-013. B2 – Ver0.2
			    					                        },
															editable: false
			    										}
			    									]
	    				                		},
												{
	    						                	xtype:'container',
	    						                	flex:1,
	    						                	padding: '0 0 0 20',
	    											items:[
	    												{
	    													xtype: 'checkboxfield',
	    													boxLabel: ViewUtil.getLabel('domesticCargo'),
	    													reference: 'refDomesticChk',
	    													bind: '{theBL.domesticChk}',
	    													inputValue: 'Domestic Cargo',
	    							                        uncheckedValue: 'N',
	    							                        checked:false
	    												}
	    											]
	    				                		}
	    				                	]
										},{
	    									xtype:'container',
	    									flex: 1,
	    									layout:{
	    										type: 'hbox'
	    									},
	    									defaults: {
	    	    			                    labelAlign: 'right',
	    	    			                    labelWidth: 100
	    	    			                },
	    									items:[
	    										{
						                            xtype: 'partnercdfield',
						                            flex: 1.5,
						                            fieldLabel: ViewUtil.getLabel('forwardingAgent'),
						                            reference : 'fsForwAgent',
						                            bind: {
						                            	value: '{theBL.fwdCd}'
						                            },
						    	   					params:{
						    	   						ptnrType: CodeConstants.CM_PTNRTP_FWD // CNS, FWD, TRK
						    	   					}
						                        },{
													xtype: 'textfield',
													flex:1,
													margin: '0 0 0 5',
													reference: 'fsForwAgentName',
													bind: '{theBL.fwdNm}',
													allowBlank: true,
													readOnly: true
												}
	    									]
										}	
	    			                ]
	    						},{
	    							xtype: 'container',
	    							layout:{
	    								type: 'hbox'
	    							},
	    							margin: '-5 0 0 0',
	    			                items:[
	    			                	{
	    			                		xtype: 'container',
	    			                		flex:1,
	    			                		items:[
	    			                			{
	    			    							xtype: 'container',
	    			    			                layout: {
	    			    			                	type: 'hbox',
	    			    			                    align: 'stretch'
	    			    			                },
	    			    			                items:[
	    			    			                	{
	    			    			                		xtype: 'container',
	    			    			                		flex: 1,
	    			    			                		layout:{
	    			    			                			type: 'hbox'
	    			    			                		},
	    			    			                		defaults: {
	    			    	    			                    labelAlign: 'right',
	    			    	    			                    labelWidth: 100
	    			    	    			                },
	    			    			                		items:[
	    			    			                			{
	    			    			                				xtype: 'portcodefield',
	    			    	    		                            fieldLabel: ViewUtil.getLabel('pOL'),
	    			    	    		                            reference:'txtPolCd',
	    			    	    		                            flex: 2,
	    			    	    									bind:{
	    			    	    										value : '{theBL.pol}'
	    			    	    									},
	    			    	    									allowBlank: false
	    			    	    								},{
	    			    	    									xtype: 'textfield',
	    			    	    									reference:'txtPolCdName',
	    			    	    									margin: '0 0 0 5',
	    			    	    									flex: 1,
	    			    	    									readOnly: true,
	    			    	    									bind:{
	    			    	    										value : '{theBL.polNm}'
	    			    	    									}
	    			    	    								}
	    			    			                		]
	    			    		                        },{
	    			    			                		xtype: 'container',
	    			    			                		flex: 1,
	    			    			                		layout:{
	    			    			                			type: 'hbox'
	    			    			                		},
	    			    			                		defaults: {
	    			    	    			                    labelAlign: 'right',
	    			    	    			                    labelWidth: 100
	    			    	    			                },
	    			    			                		items:[
	    			    			                			{
	    			    	    									xtype: 'cmmcdfield',
	    			    	    									flex: 2,
	    			    	    									fieldLabel: ViewUtil.getLabel('commodityGroup'),
	    			    	    									reference: 'ctlCommodityGroup',
	    			    	    		                            bind:{
	    			    	    		                            	value : '{theBL.cmdtGrpCd}',
	    			    	    		                            	cgTpCd: '{theBL.cgTpCd}'
	    			    	    		                            },
	    			    	    		                            labelAlign: 'right',
	    			    	    		                            allowBlank: false,
	    			    	    		                            editable: false,
	    			    	    		    	   					params:{
	    			    	    		    	   						searchType: 'CMDT_GRP'
	    			    	    		    	   					}
	    			    	    								},{
	    			    	    									xtype: 'textfield',
	    			    	    									reference:'ctlCommodityGroupName',
	    			    	    									margin: '0 0 0 5',
	    			    	    									editable: false,
	    			    	    									flex: 1,
	    			    	    									bind:{
	    			    	    										value : '{theBL.cmdtGrpNm}'
	    			    	    									}
	    			    	    								}
	    			    			                		]
	    			    		                        }
	    			    			                ]
	    			    						},{
	    			    							xtype: 'container',
	    			    			                defaults: {
	    			    			                    labelAlign: 'right',
	    			    			                    labelWidth: 100
	    			    			                },
	    			    			                layout: {
	    			    			                	type: 'hbox',
	    			    			                    align: 'stretch'
	    			    			                },
	    			    			                margin: '5 0 0 0',
	    			    			                items:[
	    			    			                	{
	    			    			                		xtype: 'container',
	    			    			                		flex: 1,
	    			    			                		layout:{
	    			    			                			type: 'hbox'
	    			    			                		},
	    			    			                		defaults: {
	    			    	    			                    labelAlign: 'right',
	    			    	    			                    labelWidth: 100
	    			    	    			                },
	    			    			                		items:[
	    			    			                			{
	    			    	    		                            xtype: 'portcodefield',
	    			    	    		                            fieldLabel: ViewUtil.getLabel('fnd'),
	    			    	    		                            reference:'txtFndCd',
	    			    	    		                            flex: 2,
	    			    	    									bind:{
	    			    	    										value : '{theBL.fnlPortCd}'
	    			    	    									}
	    			    	    		                        },{
	    			    	    									xtype: 'textfield',
	    			    	    									reference:'txtFndCdName',
	    			    	    									margin: '0 0 0 5',
	    			    	    									flex: 1,
	    			    	    									bind:{
	    			    	    										value : '{theBL.fnlPortNm}'
	    			    	    									}
	    			    	    								}
	    			    			                		]
	    			    		                        },{
	    			    			                		xtype: 'container',
	    			    			                		flex: 1,
	    			    			                		layout:{
	    			    			                			type: 'hbox'
	    			    			                		},
	    			    			                		defaults: {
	    			    	    			                    labelAlign: 'right',
	    			    	    			                    labelWidth: 100
	    			    	    			                },
	    			    			                		items:[
	    			    			                			{
	    			    	    									xtype: 'cmmcdfield',
	    			    	    									fieldLabel: ViewUtil.getLabel('commodityCode'),
	    			    	    									reference: 'ctlCommodity',
	    			    	    									flex: 2,
	    			    	    		                			bind:{
	    			    	    		                				value : '{theBL.cmdtCd}',
	    			    	    		                				cgTpCd: '{theBL.cgTpCd}',
	    			    	    		                				cmdtGrpCd: '{theBL.cmdtGrpCd}'
	    			    	    		                			},
	    			    	    		                			labelAlign: 'right',
	    			    	    		                			allowBlank: false,
	    			    	    		                			editable: false,
	    			    	    		                			params:{
	    			    	    		                				searchType: 'CMDT'
	    			    	    		                			}
	    			    	    								},{
	    			    	    									xtype: 'textfield',
	    			    	    									reference:'ctlCommodityName',
	    			    	    									margin: '0 0 0 5',
	    			    	    									editable: false,
	    			    	    									flex: 1,
	    			    	    									bind:{
	    			    	    										value : '{theBL.cmdtCdNm}'
	    			    	    									}
	    			    	    								}
	    			    			                		]
	    			    		                        }
	    			    			                ]
	    			    						},
												{
													xtype: 'container',
													width: '100%',
													margin: '5 0 0 0',
													layout: {
	    			    			                	type: 'hbox',
	    			    			                    align: 'stretch'
	    			    			                },
													defaults: {
														labelAlign: 'right',
														labelWidth: 100,
													},
													items: [
														{
															xtype: 'container',
															flex: 1,
															layout:{
																type: 'hbox'
															},
															defaults: {
																labelAlign: 'right',
																labelWidth: 100
															},
															items:[
																{
																	xtype: 'combobox',
																	fieldLabel: ViewUtil.getLabel('category'),
																	reference: 'refCategory',
																	editable:false,
																	allowBlank: false,
																	flex: 1,
																	queryMode:'local',
																	bind: {
																		store: '{categoryCombo}',
																		value:'{theBL.opClassCd}'
																	},
																	displayField:'scdNm',
																	valueField:'scd',
																	emptyText: 'Select',
																	value : '',
																	listeners: {
																		select: 'onStrgCheck'
																	}
																}
															]
	    			    								},
														{
	    			    			                		xtype: 'container',
	    			    			                		flex: 1,
	    			    			                		layout:{
	    			    			                			type: 'hbox'
	    			    			                		},
	    			    			                		defaults: {
	    			    	    			                    labelAlign: 'right',
	    			    	    			                    labelWidth: 100
	    			    	    			                },
	    			    			                		items:[
	    			    			                			{
	    			    	    									xtype: 'cmmcdfield',
	    			    	    									fieldLabel: ViewUtil.getLabel('typeofpackages'),
	    			    	    									reference: 'txtTypeOfPackages',
	    			    	    									flex: 2,
	    			    	    		                            bind:{
	    			    	    		                            	value : '{theBL.pkgTpCd}',
	    			    	    		                            	cgTpCd: '{theBL.cgTpCd}',
	    			    	    		                				cmdtGrpCd: '{theBL.cmdtGrpCd}',
	    			    	    		                				cmdtCd: '{theBL.cmdtCd}'
	    			    	    		                            },
	    			    	    		                            labelAlign: 'right',
	    			    	    		                            allowBlank: false,
	    			    	    		                            editable: false,
	    			    	    		                            params:{
	    			    	    		                            	searchLcd:CodeConstants.LCD_MOST,
	    			    	    		                            	searchMcd: CodeConstants.MCD_MT_PKGTP,
	    			    	    	        	   						searchType: 'COMM'
	    			    	    	        	   					}
	    			    	    								},{
	    			    	    									xtype: 'textfield',
	    			    	    									reference:'txtTypeOfPackagesName',
	    			    	    									margin: '0 0 0 5',
	    			    	    									editable: false,
	    			    	    									flex: 1,
	    			    	    									bind:{
	    			    	    										value : '{theBL.pkgTpNm}'
	    			    	    									}
	    			    	    								},
	    			    			                		]
	    			    		                        }
													]
												},
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
	    			    			                margin: '5 0 0 0',
	    			    			                items:[
	    			    			                	{
	    			    		                            xtype: 'textfield',
	    			    		                            fieldLabel: ViewUtil.getLabel('mafiParentId'),
	    			    		                            reference:'txtMafiParentId',
	    			    		                            hidden: true,
	    			    		                            bind: {
	    			    										value: '{theBL.parentId}',
	    			    									},
	    			    		                            flex: 1,
	    			    		                        },{
	    			    									xtype: 'textfield',
	    			    									fieldLabel: ViewUtil.getLabel('packagenumber'),
	    			    									reference: 'txtPackageNumber',
	    			    									hidden: true,
	    			    									flex: 1
	    			    								}
	    			    			                ]
	    			    						}
	    			                		]
	    			                	},
										{
	    			                		xtype: 'container',
	    			                		flex:1,
	    			                		margin: '0 0 0 0',
	    			                		padding: '0 0 0 5',
	    			                		items:[
	    			                			{
	    			                				xtype: 'container',
	    			                				layout: {
	    			                					type: 'vbox'
	    			                				},
	    			                				items:[
	    			                					{
					    				                	xtype: 'container',
															flex: 1,
					    				                	layout:{
					    				                		type: 'hbox'
					    				                	},
					    				                	items:[
					    				                		{
			    	    						                	xtype:'container',
																	flex: 1,
			    	    						                	padding: '0 0 0 36',
			    	    											items:[
			    	    												{
			    	    													xtype: 'checkboxfield',
			    	    													boxLabel: ViewUtil.getLabel('notToWgt'),
			    	    													reference: 'refWeightChk',
			    	    													bind: '{theBL.wgtChk}',
			    	    													inputValue: 'N',
			    	    							                        uncheckedValue: 'Y',
			    	    							                        checked: true,
																			editable: true,
			    	    												}
			    	    											]
			    			                					},
																{
																	xtype:'container',
																	flex: 1,
																	padding: '0 0 0 65',
																	items:[
																		{
																			xtype: 'checkboxfield',
																			boxLabel: ViewUtil.getLabel('bondedWh'),
																			reference: 'refBondedWhYn',
																			bind: '{theBL.bondedWhYn}',
																			inputValue: 'Y',
																			uncheckedValue: 'N',
																			checked:false
																		}
																	]
																}
					    				                	]
														},
														{
					    				                	xtype: 'container',
															flex: 1,
															margin: '-5 0 0 0',
					    				                	layout:{
					    				                		type: 'hbox'
					    				                	},
					    				                	items:[
					    				                		{
			    	    						                	xtype:'container',
																	flex: 1,
			    	    						                	padding: '0 0 0 35',
			    	    											items:[
			    	    												{
			    	    													xtype: 'checkboxfield',
			    	    													boxLabel: ViewUtil.getLabel('anchorage'),
			    	    													reference: 'refAnchorage',
			    	    													bind: '{theBL.anchorageChk}',
			    	    													inputValue: 'Y',
			    	    							                        uncheckedValue: 'N',
//			    	    							                        disabled: true,
			    	    							                        checked:false
			    	    												}
			    	    											]
			    			                					},
																{
																	xtype:'container',
																	flex: 1,
																	padding: '0 0 0 80',
																	items:[
																		{
																			xtype: 'checkboxfield',
																			boxLabel: ViewUtil.getLabel('privateJetty'),
																			reference: 'refPrivateJetty',
																			bind: '{theBL.privateJettyChk}',
																			inputValue: 'Y',
																			uncheckedValue: 'N',
																			checked:false
																		}
																	]
																},
					    				                	]
														},
														{
					    				                	xtype: 'container',
															width: '100%',
															margin: '-5 0 0 0',
					    				                	layout:{
					    				                		type: 'hbox'
					    				                	},
					    				                	items:[
					    				                		{
			    	    						                	xtype:'container',
																	//flex: 1,
			    	    						                	padding: '0 0 0 35',
			    	    											items:[
			    	    												{
			    	    													xtype: 'checkboxfield',
			    	    													boxLabel: ViewUtil.getLabel('transshipmentAprv'),
			    	    													reference: 'refTsAprovalYNChk',
			    	    													bind: '{theBL.tsAprovalYN}',
			    	    													inputValue: 'Y',
			    	    							                        uncheckedValue: 'N',
			    	    							                        disabled: true,
			    	    							                        checked:false
			    	    												}
			    	    											]
			    			                					},
																{
																	xtype: 'container',
																	flex: 1
																},
																{
					    			                				xtype: 'container',
					    			                				layout: {
					    			                					type: 'hbox',
																		pack: 'end'
					    			                				},
					    			                				margin: '0 20 0 0',
					    			                				items:[ 
																		{
																			xtype: 'filefield',
																			name : 'fileUpload',
																			reference: 'refBtnAddFile',
																			margin: '0 -56 0 5',
																			itemId: 'createButton',
																			id:'blFileUpload',
																			style: 'text-align:left',
																			method: 'POST',
																			fileUpload: true,
																			enctype: 'multipart/form-data',
																			buttonText: '',
																			buttonOnly: true,
																			multiple: true,
																			buttonConfig: {
																				text:  ViewUtil.getLabel('add'),
																				iconCls: 'x-fa fa-plus' 
																			},
																			listeners: {
																				change: 'onFileGridAdd',
																				afterrender:function(cmp){
																					cmp.fileInputEl.set({
																						multiple:'multiple'
																					});
																				}
																			}
																		},
																		{
																			xtype: 'button',
																			margin: '0 0 0 5',
																			reference : 'refBtnRemoveFile',
																			ui: 'delete-button',
																			iconCls: 'x-fa fa-minus',
																			text: ViewUtil.getLabel('remove'),
																			listeners: {
																				click: 'onRemoveForFileUpload'
																			}
																		}
																	]
					    			                			},
					    				                	]
														},
	    			                				]
	    			                			},
												
	    			                		]
	    			                	},
										
	    			                ]
	    						},
								{
	    							xtype: 'container',
									margin: '0 0 0 0',
	    			                defaults: {
	    			                    labelAlign: 'right',
	    			                    labelWidth: 100,
	    			                },
	    			                layout: {
	    			                	type: 'hbox'
	    			                },
	    			                items:[
										//BL quantity
										{
											xtype: 'container',
											margin: '-5 0 0 0',
											flex: 2,
											layout: {
												type: 'vbox'
											},	 			
											items: [
												{
													xtype: 'container',
													width: '100%',
													layout: {
														type: 'hbox'
													},
													defaults: {
														labelAlign: 'right',
														labelWidth: 100,
													},	
													items: [
														{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('parentCmdtGrp'),
															reference: 'txtParentCmdtGrp',
															bind: {
																value: '{theBL.parentCgTp}',
															},
															flex: 1,
														},{
															xtype: 'container',
															flex: 1,
														},
													]
												},{
													xtype: 'container',
													width: '100%',
													layout: {
														type: 'hbox'
													},
													items: [
														{
															xtype: 'container',
															flex: 1,
															layout:{
																type: 'hbox'
															},
															defaults: {
																labelAlign: 'right',
																labelWidth: 100
															},
															items:[
																{
																	xtype: 'textfield',
																	reference:'ctlUnno',
																	fieldLabel: ViewUtil.getLabel('unnoClass'),
																	flex: 0.6,
																	bind:{
																		value : '{theBL.unno}'
																	}
																},{
																	xtype: 'cmmcdfield',
																	margin: '0 0 -5 5',
																	reference: 'txtImdgNo',
																	flex: 0.4,
																	bind:{
																		value : '{theBL.imdgClass}'
																	},
																	labelAlign: 'right',
																	editlable : false,
																	   params:{
																		   searchType: 'IMDG'
																	   }
																},{
							    			                		xtype: 'container',
							    			                		flex: 1,
							    			                		layout:{
							    			                			type: 'hbox'
							    			                		},
							    			                		defaults: {
							    	    			                    labelAlign: 'right',
							    	    			                    labelWidth: 100,
							    	    			                },
							    			                		items:[
							    			                			{
																            xtype: 'textfield',
																            margin: '0 5 0 0',
																            fieldLabel: 'H.S Code:',
																            reference:'ctlHSCode',
																            maxLength: 20,
																            flex: 1.74,
																			enforceMaxLength: true,
																			maskRe: /[0-9A-Za-z]/,
																			fieldStyle : 'text-transform: uppercase',
																            listeners: {
					//												        	beforeRender: 'onRenderField',
					//												        	focus : 'onFocus',
					//												        	focusleave: 'onFieldFocusleave',
																	        	change: function(){
																					var me = this;
																					me.setValue(this.getValue().toUpperCase());
																				}
																			},
																			bind:{
							    	    										value : '{theBL.hsCode}'
							    	    									},
																        },{
																			xtype: 'button',
																			reference:'ctlHSCodeButton',
																			iconCls: 'x-fa fa-search',
																			fieldStyle : 'text-transform: uppercase',
																			listeners:{
																				click: 'openHsCodePopup'
																			}
																		},{
							    	    									xtype: 'textfield',
							    	    									reference:'ctlHSCodeName',
							    	    									margin: '0 0 0 5',
							    	    									editable: false,
							    	    									flex: 1.01,
							    	    									bind:{
							    	    										value : '{theBL.hsNm}'
							    	    									}
							    	    								}
							    			                		]
							    		                        }
															]
														}, 
													]
												},

												{
													xtype: 'container',
													margin: '5 0 0 0',
													width: '100%',
													layout: {
														type: 'hbox'
													},
													defaults: {
														labelAlign: 'right',
														labelWidth: 100
													},
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('blGrossWeight'),
															reference: 'refTxtWeght',
															flex: 1,
															bind: {
																value: '{theBL.wgt}'
															},
															minValue: 0,
															maxValue: 999999999999999.999,
															decimalPrecision: 3,
															allowBlank: false,
															listeners:{
																change: 'onWeightChange'
															}
														},{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('eachWeight'),
															reference: 'refEachWeight',
															readOnly: true,
															bind: {
																value: '{theBL.eachWgt}',
															},
															flex: 1
														},
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('length'),
															reference: 'txtLength',
															bind: {
																value: '{theBL.cgLength}'
															},
															minValue: 0,
															maxValue: 999999999999999.999,
															decimalPrecision: 3,
															listeners:{
																change:'onChangeLWH'
															},
															hidden : true
														}
													]
												},
												{
													xtype: 'container',
													margin: '5 0 0 0',
													width: '100%',
													layout: {
														type: 'hbox'
													},
													defaults: {
														labelAlign: 'right',
														labelWidth: 100
													},
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('blMeasurement'),
															reference: 'refTxtVol',
															flex: 1,
															bind: {
																value: '{theBL.vol}'
															},
															minValue: 0,
															maxValue: 999999999999999.999,
															decimalPrecision: 3,
															allowBlank: false,
															listeners:{
																change: 'onMeasurementChange'
															}
														},
														{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('eachVolume'),
															reference: 'refEachVolume',
															readOnly: true,
															bind: {
																value: '{theBL.eachVol}',
															},
															flex: 1
														},
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('width'),
															reference: 'txtWidth',
															bind: {
																value: '{theBL.cgWidth}'
															},
															flex: 1,
															minValue: 0,
															maxValue: 999999999999999.999,
															decimalPrecision: 3,
															listeners:{
																change:'onChangeLWH'
															},
															hidden : true
														}
													]
												},

												{
													xtype: 'container',
													margin: '5 0 0 0',
													width: '100%',
													layout: {
														type: 'hbox'
													},
													defaults: {
														labelAlign: 'right',
														labelWidth: 100
													},
													items: [
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('quantity'),
															reference: 'refTxtNoOfPackage',
															flex: 1,
															bind: {
																value:'{theBL.pkgQty}',
																fieldStyle: '{fs}'
															},
															allowBlank: false,
															minValue: 0,
															maxValue: 99999999,
															decimalPrecision: 0,
															listeners:{
																change: 'onNoOfPkgChange'
															}
														},
														{
															xtype: 'container',
															flex: 1,
														},
														{
															xtype: 'numberfield',
															fieldLabel: ViewUtil.getLabel('height'),
															reference: 'txtHeight',
															bind: {
																value: '{theBL.cgHeight}',
															},
															flex: 1,
															minValue: 0,
															maxValue: 999999999999999.999,
															decimalPrecision: 3,
															listeners:{
																change:'onChangeLWH'
															},
															hidden : true
														}
													]
												},
												{
													xtype: 'container',
													defaults: {
														labelAlign: 'right',
														labelWidth: 100,
														margin: '5 0 0 0'
													},
													width: '100%',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													items:[
														{
															xtype: 'textareafield',
															fieldLabel: ViewUtil.getLabel('mAndN'),
															reference: 'txtmAndN',
															bind: {
																value:'{theBL.markNo}',
																readOnly: '{crudRead}'
															},
															flex: 1,
															maxLength: 350,
															enforceMaxLength: true
														},{
															xtype: 'textareafield',
															fieldLabel: ViewUtil.getLabel('descOfGoods'),
															reference: 'txtDescOfGoods',
															bind: {
																value:'{theBL.gdsRmk}',
																readOnly: '{crudRead}'
															},
															flex: 1,
														}
													]
												}


											]
										},
										//File Upload Grid			
										{
	    									xtype: 'container',
	    									flex: 2,
											padding: '0 0 0 5',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
						                        	xtype: 'tsb-datagrid',
						                        	reference: me.FILE_GRID_REF_NAME,
						                        	height: 302,
						                        	stateful : true,
						                        	usePagingToolbar : false,
						                        	style: {
						                        		borderColor: '#AAA', 
						                        		borderStyle: 'solid', 
						                        		borderWidth: 'thin',
						                        	},
						                        	stateId : 'stateShippingNoteUploadGrid',
						                        	plugins: [
						                        		'gridexporter',
						                        		'gridfilters',
						                        		'clipboard'
						                        	],
						                        	bind: {
						                        		store: '{'+me.FILE_UPLOAD_STORE_NAME +'}'
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
						                        			align : 'center'
						                        		},
						                        		items: GridUtil.getGridColumns('ShippingNoteFileUpload')
						                        	}
								                }
											]
	    								},
										{
	    									xtype: 'textfield',
	    									fieldLabel: ViewUtil.getLabel('freightton'),
	    									reference: 'refFreighTon',
	    									hidden: true,
	    									bind: {
	    										value: '{theBL.freighTon}',
	    									},
	    									flex: 1
	    								}
	    			                ]
	    						},
    						]
	    				},
						{
	    					xtype: 'fieldset',
							padding: '0 10 10 10',
							margin: '0 0 0 0',
	    					collapsed: true,
	    					collapsible: true,
	    					title: ViewUtil.getLabel('hatchNo'),
	    					items: [
	    						{
		    						xtype: 'container',
		    					    layout: {
		    					    	type: 'hbox',
		    					    	align: 'stretch'
		    					    },
		    					    items: [
		    					    	{
			    							xtype: 'tsb-datagrid',
			    							height: 150,
			    							flex: 1,
			    							reference: me.CARGO_GRID_REF_NAME,
			    							usePagingToolbar : false,
			    							plugins: [
												rowEditing,
												'gridexporter',
												'gridfilters',
												'clipboard'
			    							],
			    							bind:{
			    								store: '{' + me.CARGO_STORE_NAME + '}'
			    							},
			    							selModel: {
			    								type: 'spreadsheet',
			    								cellSelect: false
			    							},
			    							dockedItems:[
			    								{
				    								xtype: 'container',
				    								margin: '0 0 5 0',
											    	flex: 1,
													layout: {
								                    	type: 'hbox',
								    	                pack: 'end'
								                    },
				    								items:[
				    									{
					    									xtype: 'button',
					    									text: ViewUtil.getLabel('add'),
					    									margin: '0 5 0 5',
					    									ui: 'create-button',
					    									iconCls: 'x-fa fa-plus',
					    									reference:'refBtnAddCargo',
					    									listeners:{
					    										click:'onAddCargo'
					    									}
					    								},{
					    									xtype: 'button',
					    									text: ViewUtil.getLabel('remove'),
					    									nargin: '0 5 0 5',
					    									ui: 'delete-button',
					    									iconCls: 'x-fa fa-minus',
					    									reference:'refBtnRemoveCargo',
					    									listeners:{
					    										click:'onRemoveCargo'
					    									},
					    									bind: {
					    										disabled: '{!isRemoveable}'
					    									},
					    									disabled: false
					    								}
					    							]
				    							}
			    							],
			    							columns:{
			    								defaults: {
			    									style : 'text-align:center'
			    								},
			    								items: GridUtil.getGridColumns('BLCargo')
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