Ext.define('MOST.view.operation.VesselDelay', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesseldelay',
	requires: [
	],

	controller: 'vesseldelay',
	
	viewModel: {
		type: 'vesseldelay'
	},
		
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselDelayGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselDelayList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [
    		{
            	xtype:'container',
            	layout:{
            		type:'vbox',
					align :'stretch'
            	},
            	items:[
            		{
                    	xtype:'container',
                    	layout:{
                    		type:'hbox',
                    		align :'stretch'
                    	},
                    	margin:'0 0 0 0',
                    	flex: 1,
                    	items:[
                    		{
								xtype: 'container',
								layout: {
									type: 'vbox',
									align: 'stretch'
								},
								margin: '0 0 0 0',
								flex: 1,
								defaults: {
									labelWidth: 80,
									labelAlign: 'right',
									margin: '0 0 5 0'
								},
        	            		items:[
									/*
									{
										xtype: 'datefield',
										fieldLabel: ViewUtil.getLabel('vesselDelayDate'),
										//bind: '{theDelay.inptDate}',
										reference: 'refInputDate',
										format: MOST.config.Locale.getShortDate(),
										allowBlank: false,
										listeners: {
											focusleave: 'onGettingHatchAndEq',
											change: 'onChangeDelayDate'
										}
									},
									*/
        							{
        		            			xtype: 'combo',
        		            			fieldLabel: ViewUtil.getLabel('vesselDelayShift'),
        		            			reference: 'refShiftId',
        								bind: {
        									store: '{shiftCombo}',
        									value: '{theDelay.shftId}'
        								},
        								displayField: 'shftNm',
        						        valueField: 'shftId',
        						        queryMode: 'local',
        						        editable: false,
        						        allowBlank: false,
                       					listeners:{
                    						change:'onGettingHatchAndEq',
                    						select:'onSelectShift'
                    					},
                    					hidden: true,
        		            		},{
        		            			xtype: 'combo',
        		            			fieldLabel: ViewUtil.getLabel('vesselDelayHatchNo'),
        		            			reference: 'refVesselDelayHatchNo',
        								bind: {
        									store: '{hatchNoCombo}',
        									value: '{theDelay.hatchNo}'
        								},
        								displayField: 'scdNm',
        			   					valueField: 'scd',
        						        queryMode: 'local',
        						        editable: false,
        						        value:'',
        						        allowBlank: true, //ADP allow blank
        						        listeners:{
                    						change:'onGetEquipmenttList'
                    					}
        		            		},{
        		            			xtype: 'combo',
        		            			fieldLabel: ViewUtil.getLabel('vesselDelayEquipmentNo'),
        		            			reference: 'refVesselDelayEquipmentNo',
        								bind: {
        									store: '{deployedEquipmentNoList}',
        									value: '{theDelay.eqNo}'
        								},
        								displayField: 'scdNm',
        			   					valueField: 'scd',
        						        queryMode: 'local',
        						        editable: false,
        						        allowBlank: true, //ADP allow blank
        						        value:''
        		            		}
        	            		]
        	            	},{
								xtype: 'container',
								layout: {
									type: 'vbox',
									align: 'strecth'
								},
								margin: '0 0 0 0',
								defaults: {
									labelWidth: 120,
									labelAlign: 'right',
									margin: '0 0 5 0',
									width: '100%'
								},
								flex: 1,
								items: [{
        		            			xtype: 'textfield',
        		            			fieldLabel: ViewUtil.getLabel('vesselDelayDelayCode'),
        		            			bind: '{theDelay.rsnCd}',
        		            			reference:'refTxtDelayCode',
        		            			allowBlank: false,
        		    					triggers: {
        		    	                    someField: {
        		    	                        cls: 'fa-search',
        		    	                        scope: 'controller',
        		    	                        handler: 'onOpenDelayCodePopup'
        		    	                    }
        		    	                },
        		            			listeners: {
        		            				focusleave: 'onCheckedContractor',
        		            				change: 'onUpperCase'
        		            			}
        							},{ 
        		       					xtype: 'textfield',
        		       					fieldLabel: ViewUtil.getLabel('vesselDelayDelayDescription'),
        		       					bind: '{theDelay.rsnCdNm}',
        		       					reference:'refTxtDelayCodeName',
        		       					editable: false
        		            		},{ 
        		       					xtype: 'textfield',
        		       					fieldLabel: ViewUtil.getLabel('vesselDelayAcceptedDelay'),
        		       					bind: '{theDelay.acptYN}',
        		       					reference:'refTxtAcptYN',
        		       					editable: false
        		            		},{
        		            			xtype: 'combo',
        		            			fieldLabel: ViewUtil.getLabel('vesselDelayHatchDrtCd'),
        		            			reference:'refVesselDelayHatchDrtC',
        								bind: {
        									store: '{apfpCombo}',
        									value: '{theDelay.hatchDrtCd}'
        								},
        								displayField: 'label',
        			   					valueField: 'data',
        						        queryMode: 'local',
        						        editable: false,
										margin:'0 0 0 0',
        						        value:''
        		            		}
        	            		]
        	            	},{
								xtype: 'container',
								layout: {
									type: 'vbox',
									align: 'strecth'
								},
								margin: '0 0 0 0',
								defaults: {
									labelWidth: 80,
									labelAlign: 'right',
									margin: '0 0 5 0',
									width: '100%'
								},
								flex: 1,
        	            		items:[{ 
        		       					xtype: 'partnercdfield',
        		       					fieldLabel: ViewUtil.getLabel('vesselDelayContractor'),
        		       					reference:'refTxtContractor',
        		       					allowBlank: false,
        		       					bind:{
        		       						value:'{theDelay.contractor}'
        		       					},
        		       					params:{
        		       						searchPtyDivCd: 'CTT'
        		       					}
        		            		},{
        								xtype: 'datetimefield',
        								//bind: '{theDelay.stDate}',
        								reference : 'refStartDate',
        								fieldLabel: ViewUtil.getLabel('vesselDelayFromTime'),
        	       						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        	       						allowBlank: false,
        								listeners: {
        									change: function(e, newValue, oldValue, eOpts )  {
        										var sc = this.lookupReferenceHolder();
        										sc.updateDelayStartDate(e.lastDate);
        									}
        								}
        							},{
        								xtype: 'datetimefield',
        								//bind: '{theDelay.endDate}',
        								reference : 'refEndDate',
        								fieldLabel: ViewUtil.getLabel('vesselDelayToTime'),
        	       						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        	       						allowBlank: false,
        		       					listeners: {
        		       						change: function(e, newValue, oldValue, eOpts )  {
        										var sc = this.lookupReferenceHolder();
        										sc.updateDelayEndDate(e.lastDate);
        									}
        								}
        							},{ 
        		       					xtype: 'textfield',
										margin: '0 0 0 0',
        		       					bind: '{theDelay.totalHRS}',
        		       					reference: 'refTotalHRS',
        		       					fieldLabel: ViewUtil.getLabel('vesselDelayTotalHRS'),
        		       					editable: false
        		            		}
        	            		]
        	            	}, {
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('vesselDelayRemark'),
								reference : 'refRmk',
								bind: '{theDelay.rmk}',
								labelWidth: 80,
								labelAlign: 'right',
								margin:'0 5 0 0', 
								flex: 1
							}
                    	]
                    }, 
            	]
            },{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				margin: '5 5 5 0',
				stateful : true,
				stateId : 'stateVesselDelayGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		listeners: {
	    			cellclick: 'onGridClick',
	    			pagingSearch: 'onSearch'
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false,
					listeners: {
	    	            select: 'onChecked',
	    	            deselect:'onChecked'
	    	        }
				},
				selType: 'checkboxmodel',
				checkOnly: false,
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('VesselDelayList'),
				}
		    }],
			dockedItems: [
				{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
						type : 'hbox',
					},
					defaults: {
						margin: '1 1 1 1'
					},
                    items: [{
    						xtype: 'tbfill'
    					},
                    	{
							xtype: 'button',
							itemId: 'inquiryItemId',
							reference:'refBtnRetrieve',
                        	text: ViewUtil.getLabel('search'),
        					iconCls: 'x-fa fa-search',
        					cls: 'search-button', 
    						listeners: {
    							click: 'onSearch'
    						}
                        },
                        {	
							xtype: 'button',
							//itemId: 'createItemId',
							reference:'refBtnCreate1',
        					text: ViewUtil.getLabel('add'),
        					ui: 'create-button',
        					iconCls: 'x-fa fa-plus',
        					listeners: {
        						click: 'onAdd'
        					}
        		    	},
        		    	{
        					xtype: 'button',
        					itemId: 'deleteItemId',
        					reference:'refBtnDelete',
        					text: ViewUtil.getLabel('remove'),
        					ui: 'delete-button',
        					disabled:true,
        					iconCls: 'x-fa fa-minus',
        					listeners: {
        						click: 'onRemove'
        					}
        		    	},{
        					xtype: 'button',
        					itemId: 'saveItemId',
        					text: ViewUtil.getLabel('vesselDelaySave'),
        					ui: 'update-button',
    						iconCls: 'x-fa fa-save',
        					reference:'refBtnSave',
        					disabled:true,
        					listeners: {
        						click: 'onSave'
        					}
        				},{
        					xtype: 'button',
        					text: ViewUtil.getLabel('vesselDelayClear'),
        					iconCls: 'fa fa-file-o',
        					reference:'refBtnClear',
        					listeners: {
        						click: 'onClear'
        					}					
        				},
        				{
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
        					reference: 'refBtnVerify',
        					margin : '1 1 1 5',
        					text: ViewUtil.getLabel('verify'),
        					iconCls: 'fa fa-check',
        					listeners: {
        						click: 'onVerify'
        					}
        		    	},{
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
					padding: '0 0 0 0',
					margin: '0 -3 10 0',
    				enableOverflow: true,
    				defaults: {
    					labelAlign: 'right'
                	},
                	items: [
                		{
							xtype: 'fieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible: true,
							flex: 1,
							padding: '0 10 10 10',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
                            items: [
                            	{
                            		xtype: 'searchfieldset',
            		    			title: ViewUtil.getLabel('search'),
                                    layout: {
                                        type: 'hbox'
                                    },
                                    margin: '0 5 0 0',
                                    padding : '0 10 10 10',
									flex: 0.5,
                                    items: [
                                        {
											xtype: 'container', 
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											flex: 1,
											defaults: {
												labelWidth: 70,
												labelAlign: 'right',
											},
											items: [

					                        	{
													xtype: 'shipcallnofield',
													reference: 'ctlScn',
													/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
													fieldLabel: ViewUtil.getLabel('shipCallNo'),
													editable: false,
													bind: {
														value: '{theSearch.scn}',
													},
												},
												{
													xtype:'vesselcalllistfield',
													margin: '5 0 0 0',
													fieldLabel: ViewUtil.getLabel('vessel'),
													bind :{
														value: '{theSearch.vslCallId}'
													},
													reference:'ctlVslCallId',
												},
												{
													xtype: 'datefield',
													margin: '5 0 0 0',
													reference:'ctlWorkYmdField',
													fieldLabel: ViewUtil.getLabel('vesselDelayDate'),
													format: MOST.config.Locale.getShortDate(),            							                    
													editable: true, 
													listeners:{
														select:'onSearch'
													}, 
												}
											]
										},
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												labelWidth: 60,
											},
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											flex: 1,
											items: [
												{
													xtype: 'combobox',
													reference: 'ctlShiftCombo',
													fieldLabel: ViewUtil.getLabel('vesselDelayShift'),
													queryMode: 'local',
													bind: {
														store: '{shiftCombo}',
														value: '{theSearch.shftId}'
													},
													displayField: 'shftNm',
													valueField: 'shftId',
													emptyText: 'All',
													value: '',
													listeners: {
														select: 'onSearch'
													}
												},
												{
													xtype: 'combobox',
													margin: '-5 0 0 0',
													reference: 'ctlHatchCombo',
													fieldLabel: ViewUtil.getLabel('vesselDelayHatchNo'),
													queryMode: 'local',
													bind: {
														store: '{hatchNoCombo}',
														value: '{theSearch.hatchNo}'
													},
													displayField: 'scdNm',
													valueField: 'scd',
													value: '',
													emptyText: 'All',
													editable: false,
													listeners: {
														select: 'onSearch'
													}
												}
											]
										
										}
                                    ]
                            	},
                            	{
                            		xtype: 'fieldset',
            		    			title: ViewUtil.getLabel('vslInfo'),
                                    flex: 1,
                                    margin: '0 0 0 5',
                                    padding : '0 10 10 10',
                                    layout: {
                                        type: 'hbox',
										align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
											flex: 1,
                                            defaults: {
                                                labelAlign: 'right',
                                                labelWidth: 100,
												margin: '0 0 5 0'
                                            },
                                            layout: {
                                                type: 'vbox',
												align: 'stretch'
                                            },
                                            items: [
                                            	{
                                                	xtype: 'textfield',
                        	                    	fieldLabel: ViewUtil.getLabel('vesselDelayVesselCode'),
                        	                    	reference: 'refVslCd',
                        	                    	readOnly: true,
                        	                    	bind: '{theVsl.vslCd}'
                                                },
                                                {
                                                	xtype: 'textfield',
                        	                    	fieldLabel: ViewUtil.getLabel('vesselDelayVesselName'),
                        	                    	reference: 'refVslNm',
                        	                    	readOnly: true,
                        	                    	bind: '{theVsl.vslNm}'
                                                },
                                                {
                                                	xtype: 'textfield',
                        	                    	fieldLabel: ViewUtil.getLabel('vesselDelayVoyage'),
                        	                    	readOnly: true,
                        	                    	bind: '{theVsl.voyage}',
													margin: '0 0 0 0'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
											flex: 1,
                                            defaults: {
                                                labelAlign: 'right',
                                                labelWidth: 100,
												margin: '0 0 5 0'
                                            },
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                            	{
                                                	xtype: 'textfield',
                        	                    	fieldLabel: ViewUtil.getLabel('vesselDelaySa'),
                        	                    	reference: 'refsa',
                        	                    	readOnly: true,
            	            	                    bind: '{theVsl.arrvSaId}'
                                                },
                                                {
                        	                    	xtype:'datetimefield',
                        	                    	fieldLabel: ViewUtil.getLabel('vesselDelayEta'),
                        	                    	reference: 'refETA',
                                					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                        	                    	readOnly: true,
            	            	                    bind: '{theVsl.eta}'
                                                },
                                                {
                                                	xtype:'datetimefield',
                        	                    	fieldLabel: ViewUtil.getLabel('vesselDelayEtd'),
                        	                    	reference: 'refETD',
                        	                    	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                        	                    	readOnly: true,
            	            	                    bind: '{theVsl.etd}',
													margin: '0 0 0 0'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
											flex: 1,
                                            defaults: {
                                                labelAlign: 'right',
                                                labelWidth: 100,
												margin: '0 0 5 0'
                                            },
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                            	{
                                                	xtype: 'textfield',
                        	                    	fieldLabel: ViewUtil.getLabel('vesselDelayBerthingloc'),
                        	                    	readOnly: true,
            	            	                    bind: '{theVsl.berthLoc}'
                                                },
                                                {
                                                	xtype: 'textfield',
                        	                    	fieldLabel: ViewUtil.getLabel('vesselDelayStorageloc'),
                        	                    	readOnly: true
                                                },
                                                {
                                                	xtype: 'container',
													margin: '0 0 0 0'
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