Ext.define('MOST.view.monitoring.WarehouseBalance', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-warehousebalance',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.monitoring.WarehouseBalanceController',
		'MOST.view.monitoring.WarehouseBalanceModel'
		
    ],

	controller: 'warehousebalance',
	
	viewModel: {
		type: 'warehousebalance'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_GRID_REF_NAME: 'refWarehouseBalance',
    MAIN_STORE_NAME: 'warehouseBalanceList',	
    /**
    * CONSTANT END
    * =========================================================================================================================
    */
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'container',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
            items: [
	            {
	                xtype: 'container',
	                flex: 1,
	                layout: {
	                    type: 'hbox',
	                    align: 'stretch'
	                },
	                items: [
	                    {
	                        xtype: 'tsb-datagrid',
	                        reference: me.MAIN_GRID_REF_NAME,
	                        flex : 1,
	                        margin : '0 5 5 0',
	                        stateful : true,
	                        stateId : '',
	                        viewConfig: {
	                            stripeRows: true,
	                            enableTextSelection: true,
	                        },
	                        plugins: [
	                            'gridfilters',
	                            'clipboard'
	                        ],
	                        bind: {
	                            store:  '{' + me.MAIN_STORE_NAME + '}'
	                        },
	                        selModel: {
	                            type: 'spreadsheet',
	                            cellSelect: false
	                        },
	                        listeners: {
	                        	cellclick: 'onGridItemClick',
	                            pagingSearch:'onSearch'
	                        },
	                        columns: {
	                            defaults: {
	                                style : 'text-align:center',
	                                align : 'center'
	                            },
	                            items:GridUtil.getGridColumns('WarehouseBalance')
	                        }
	                    }
	                ]
	            },
	            {
	                xtype: 'fieldset',
	                padding: '10 10 10 10',
					margin: '5 5 5 0',
	                layout: {
	                    type: 'hbox',
	                    align: 'stretch'
	                },
	                defaults: {
						labelAlign: 'right'
	            	},
	                items: [
	                	{
                            xtype: 'textfield',
                            fieldStyle: 'background-color:#60ec08;background-image:none;font-weight:bold;text-align: right;',
    				    	labelStyle: 'font-weight:bold;',
    				    	reference:'refTotalBalMt',
                            //bind: '{item.totalBalMt}',
                            fieldLabel: ViewUtil.getLabel('TotalBalMt'),
                            editable: false
                        },
                        {
                        	xtype: 'textfield',
                        	fieldStyle: 'background-color:#60ec08;background-image:none;font-weight:bold;text-align: right;',
    				    	labelStyle: 'font-weight:bold;',
    				    	reference:'refTotalBalM3',
                            //bind: '{item.totalBalM3}',
                            fieldLabel: ViewUtil.getLabel('TotalBalM3'),
                            editable: false
                        },
                        {
                        	xtype: 'textfield',
                        	fieldStyle: 'background-color:#60ec08;background-image:none;font-weight:bold;text-align: right;',
    				    	labelStyle: 'font-weight:bold;',
    				    	reference:'refTotalBalQty',
                            //bind: '{item.totalBalQty}',
                            fieldLabel: ViewUtil.getLabel('TotalBalQty'),
                            editable: false
                        }
	                ]
	            }
            ],
            dockedItems:[{//Toolbar buttons:
                xtype : 'container',
                style: { "background-color":"white" },
                layout: {
                    type: 'hbox',
                },
                defaults: {
                    margin: '1 1 1 1'
                },
                items: [{
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
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
                
                }]
            },
            {// Toolbar SearchCondition and VesselInfo:
                xtype: 'toolbar',
                enableOverflow: true,
                padding : '0 0 0 0',
                margin: '0 0 5 0',
                defaults: {
                    labelAlign: 'right',
                },
                items:[
                	{
						xtype: 'fieldset',
						margin: '0 5 0 0',
						padding: '0 10 10 10',
						flex: 1,
						autoScroll: true,
						collapsible:true,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items:[
							{// Left: Search Condition
								xtype: 'searchfieldset',
								flex: 1,
								margin: '0 5 0 0',
								padding: '0 10 10 10',
								title: ViewUtil.getLabel('search'),
								defaults: {
					                layout: {
					                    type: 'vbox',
					                    align: 'stretch'
					                },
									flex: 1,
					                defaults: {
					                    margin: '0 0 5 0',
					                    labelAlign: 'right',
					                    flex: 1,
					                    labelWidth: 80
					                }
					            },
					            layout: {
					                type: 'hbox'
					            },
					            items: [
					            	{
					                    xtype: 'container',
					                    items: [
					                    	{
			                    				xtype: 'shipcallnofield',
												reference: 'ctlScn',
												emptyText: ViewUtil.getLabel('shipCallNo'),
												fieldLabel: ViewUtil.getLabel('shipCallNo'),
												bind: {
													value: '{theSearch.scn}',
												},
			                    			},
					                    	{
				                                xtype: 'vesselcalllistfield',
				                                reference:'ctlVslCallId',
				                                fieldLabel: ViewUtil.getLabel('vessel'),
				                                emptyText: ViewUtil.getLabel('vessel'),
				                                bind: {
				                                    value: '{theSearch.vslCallId}'
				                                },
				                            },
				                            {
				                                xtype: 'textfield',
				                                reference:'ctlUserRefNo',
				                                fieldLabel: ViewUtil.getLabel('lotNo'),
				                                listeners: {
						    						change: 'onUpperCase'
						    					},
				                                bind: {
				                                    value: '{theSearch.userRefNo}'
				                                }
				                            },
											{
												xtype: 'combobox',
												fieldLabel: ViewUtil.getLabel('masterBLNo'),
												reference:'ctlMasterBlno',
												bind: {
													store: '{masterBlCombo}',
													value: '{theSearch.mfDocId}'
												},
												displayField: 'scdNm',
												valueField: 'mfDocId',
												queryMode: 'local',
												emptyText: "Select",
												forceSelection : true,
												editable: true,
												listeners : {
													select: 'onSelectMasterBl'
												}
											},
											{
												xtype: 'combobox',
												fieldLabel: ViewUtil.getLabel('blNo'),
												reference:'ctlBlno',
												margin: '0 0 0 0',
												bind: {
													store: '{BLNoList}',
													value: '{theSearch.blNo}'
												},
												displayField: 'scdNm',
												valueField: 'blNo',
												queryMode: 'local',
												emptyText: "Select",
												forceSelection : true
											},
		    		                        {
												xtype: 'combobox',
												margin: '5 0 0 0',
												fieldLabel: ViewUtil.getLabel('snNo'),
												reference:'ctlSNno',
												bind: {
													store: '{snNoList}',
													value: '{theSearch.shipgNoteNo}'
												},
												displayField: 'scdNm',
												valueField: 'shipgNoteNo',
												queryMode: 'local',
												emptyText: "select",
												forceSelection : true
											}
					                    ]
					            	},
					            	{
					                    xtype: 'container',
					                    items: [
											{
							   					xtype: 'combo',
							   					reference: 'ctlWarehouseType',
												fieldLabel: ViewUtil.getLabel('WHType'),
												queryMode: 'local',
							   					bind: {
							    	    			store: '{warehouseTypeCombo}',
							    	    			value: '{theSearch.locTpCd}'
							    	    			
							   					},
							   					displayField: 'scdNm',
							   					valueField: 'scd',
							   					value : '',
							   					editable: false
							   				},
							   				{
		            							xtype: 'combobox',
		            							reference: 'refWHId',
		            							fieldLabel: ViewUtil.getLabel('WHId'),
		                                        bind:{
		                                        	store: '{warehouseViewCombo}',
		                                        	//value: '{theSearch.reqPos}'
		                                        },
		                                        emptyText:'All',
		            							displayField: 'scdNm',
		            							valueField: 'scd'
		            						},
		            						{
		    									xtype: 'cmmcdfield',
		    									fieldLabel: ViewUtil.getLabel('commodity'),
		    									reference: 'refCmdtCd',
		    		                			params:{
		    		                				searchType: 'CMDT'
		    		                			}
		    								},
		    								{
		    		                            xtype: 'partnercdfield',
		    		                            labelAlign: 'right',
		    		                            reference:'ctlCnsnee',
		    		                            fieldLabel: ViewUtil.getLabel('csgnee'),
		    		                            bind:{
		    		                            	value : '{theBL.cnsne}'
		    		                            },
		    		                            labelAlign: 'right',
		    		    	   					params:{
		    		    	   						ptnrType: CodeConstants.CM_PTNRTP_CNS // CNS, FWD, TRK
		    		    	   					}
		    		                        },
					                    	{
												xtype: 'checkbox',
												margin: '0 0 5 85',
												reference: 'refBondedWhYn',
												boxLabel: ViewUtil.getLabel('bondedWarehouse'),
				                                bind: {
				                                    value: '{theSearch.bondedWhYn}'
				                                }
											}
					                    ]
					            	}
					            ]
							},
							
							{//Right: VesselInfo:
								xtype: 'fieldset',
								flex: 1,
								margin: '0 0 0 5',
								padding: '0 10 10 10',
								title: ViewUtil.getLabel('vslInfo'),
								defaults: {
					                labelAlign: 'right',
					                layout: {
					                    type: 'vbox',
										align: 'stretch'
					                },
									flex: 1,
					                defaults: {
					                    margin: '0 0 5 0',
					                    labelAlign: 'right',
					                    flex: 1,
					                    labelWidth: 80
					                }
					            },
					            layout: {
					                type: 'hbox',
					            },
					            items: [
					            	{
					                    xtype: 'container',
					                    items: [
					                    	{
		                                        xtype: 'textfield',
		                                        bind: '{theVslInfo.vslCd}',
		                                        fieldLabel: ViewUtil.getLabel('vesselCode'),
		                                        readOnly : true
		                                    },
		                                    {
		                                        xtype: 'textfield',
		                                        bind: '{theVslInfo.vslNm}',
		                                        fieldLabel: ViewUtil.getLabel('vesselName'),
		                                        readOnly : true
		                                    },
		                                    {
		                                        xtype: 'textfield',
		                                        bind: '{theVslInfo.voyage}',
		                                        fieldLabel: ViewUtil.getLabel('voyage'),
		                                        readOnly : true
		                                    },
		                                    {
		                                        xtype: 'textfield',
												margin: '0 0 0 0',
		                                        bind: '{theVslInfo.arrvSaId}',
		                                        fieldLabel: ViewUtil.getLabel('SNLASA'),
		                                        readOnly : true
		                                    },
		                                    
					                    ]
					            	},
					            	{
					                    xtype: 'container',
					                    items: [
					                    	{
		                                        xtype: 'datefield',
		                                        fieldLabel: ViewUtil.getLabel('eta'),
		                                        bind: '{theVslInfo.eta}',
		                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                                        readOnly : true,
		                                    },
		                                    {
		                                        xtype: 'datefield',
		                                        fieldLabel: ViewUtil.getLabel('etd'),
		                                        bind: '{theVslInfo.etd}',
		                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                                        readOnly : true,
		                                    },
		                                    {
		                                        xtype: 'textfield',
												margin: '0 0 0 0',
		                                        fieldLabel: ViewUtil.getLabel('berthingLoc'),
		                                        bind: '{theVslInfo.berthLoc}',
		                                        readOnly : true
		                                    }
					                    ]
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