Ext.define('MOST.view.configuration.WarehouseDefinitionDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-warehousedefinitiondetail',
	
	requires: [
	    'Ext.layout.container.Table'
	],
	
	width: 1150,
	height: 550,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'form',
			defaults:{
				margin: '5 5 0 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
            items: [{
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'fieldset',
                                flex: 6,
                                margin: '0 5 0 0',
                                weight: 50,
                                title: '',
                                items: [
                                    {
                                        xtype: 'container',
            		                    defaults: {
            		                        labelAlign: 'right',
            		                        margin: '5 5 0 0',
            		                        labelWidth: 100
            		                    }, 
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        flex: 1,
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                enforceMaxLength: true,
                        						maxLength : 10,
                                                reference: 'ctlLocId',
                                                fieldLabel: ViewUtil.getLabel('WHLocId'),
                                                allowBlank: false,
                                                bind: '{theDetail.locId}',
                                                name: 'locId',
                                                listeners:{
                        							change: function(){
                        								var me = this;
                        								me.setValue(this.getValue().toUpperCase());
                        							}
                        						}
                                            },
                                            {
                                                xtype: 'button',
                                                margin: '5 0 0 5',
                                                text: ViewUtil.getLabel('WHDuplication'),
                                                listeners:{
                                                	click: 'onCheckDuplicationLocId'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
            		                    defaults: {
            		                        labelAlign: 'right',
            		                        margin: '5 5 0 0',
            		                        labelWidth: 100
            		                    }, 
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        flex: 1,
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: ViewUtil.getLabel('WHLocName'),
                                                name: 'locNm',
                                                allowBlank: false,
                                                bind: '{theDetail.locNm}',
                                                listeners:{
                        							change: function(){
                        								var me = this;
                        								me.setValue(this.getValue().toUpperCase());
                        							}
                        						}
                                            },
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: ViewUtil.getLabel('WHDivision'),
                                                reference: 'ctlWarehouseDivCode',
                                                labelWidth: 180,
                                                allowBlank: false,
                                                editable: false,
                    							queryMode: 'local',
                                                bind: {
													store: '{warehouseLocationDiv}',
													value: '{theDetail.locDivCd}'
												},
												name: 'locDivCd',
												displayField: 'codeName',
												valueField: 'code',
												emptyText: 'Select',
								            	listeners: {
								            		change: 'onWarehouseLocationDivChange'
								            	} 
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 4,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        defaults: {
            		                        labelAlign: 'right',
            		                        margin: '5 5 0 0'
            		                    },
                                        layout: 'table',
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                reference: 'ctlWarehouseDtlTerminal',
                                                width: 240,
                                                fieldLabel: ViewUtil.getLabel('terminal'),
                                                editable: false,
                            					queryMode: 'local',
                               					displayField: 'scdNm',
                               					valueField: 'scd',
                               					name: 'terminalCd',
                                                disabled: true,
                               					bind: {
                                	    			store: '{warehouseDtlTerminalCombo}',
                                	    			value: '{theDetail.tmnlCd}'
                                	    		},
                                            },
                                            {
                                                xtype: 'combobox',
                                                reference: 'ctlWarehouseDtlArea',
                                                labelWidth: 70,
                                                width: 200,
                                                fieldLabel: ViewUtil.getLabel('WHAreaCode'),
                                                //allowBlank: false,
                                                editable: false,
                            					queryMode: 'local',
                               					displayField: 'locNm',
                               					valueField: 'locId',
                               					emptyText: 'Select',
                               					name: 'areaId',
                               					bind: {
                                	    			store: '{warehouseDtlAreaCombo}',
                                	    			value: '{theDetail.areaId}'
                                	    		},
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        defaults: {
            		                        labelAlign: 'right',
            		                        margin: '5 5 0 0'
            		                    },  
                                        layout: 'table',
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: ViewUtil.getLabel('WHType'),
                                                reference: 'ctlWarehouseDtlType',
                                                width: 240,
                                                allowBlank: false,
                                                editable: false,
                                                queryMode: 'local',
                               					displayField: 'scdNm',
                               					valueField: 'scd',
                               					emptyText: 'Select',
                               					name: 'locTpCd',
                               					bind: {
                                	    			store: '{warehouseDtlTypeCombo}',
                                	    			value: '{theDetail.locTpCd}'
                                	    		},
                                            },
                                            {
                                                xtype: 'combobox',
                                                reference: 'ctlUsed',
                                                labelWidth: 70,
                                                width: 200,
                                                fieldLabel: ViewUtil.getLabel('WHUsed'),
                                                queryMode: 'local',
												bind: {
//													store: '{warehouseDtlUsedYn}',
													store: {
											            data: [
											                { code: 'Y', codeName: 'Yes' },
											                { code: 'N', codeName: 'No' }
											            ]
											        },
											        value: '{theDetail.locUseYn}'
												},
							   					displayField: 'codeName',
							   					valueField: 'code',
                                                emptyText: 'Select',
							   					editable: false,
							   					allowBlank: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },{
                        xtype: 'fieldset',
                        margin: '5 5 0 5',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                flex: 2,
                                layout: {
                                    type: 'vbox'
                                },
    		                    defaults: {
    		                        margin: '5 0 5 0',
    		                        labelAlign: 'right',
    		                        labelWidth: 100
    		                    },
                                items: [
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            reference: 'ctrlLeftX',
                                            hideTrigger: true,
                                            allowBlank: false,
    	        							selectOnFocus : true,
                                            fieldLabel: ViewUtil.getLabel('WHLeft'),
                                            minValue: 0,
                                            name: 'leftX',
                                            bind: '{theDetail.leftX}'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'M'
    		                            }]
                                	},
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            allowBlank: false,
                                            fieldLabel: ViewUtil.getLabel('WHTop'),
                                            minValue: 0,
                                            name: 'topY',
                                            bind: '{theDetail.topY}'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'M'
    		                            }]
                                	},
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            allowBlank: false,
                                            fieldLabel: ViewUtil.getLabel('WHLength'),
                                            minValue: 0,
                                            name: 'len',
                                            bind: '{theDetail.len}'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'M'
    		                            }]
                                	},
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            allowBlank: false,
                                            fieldLabel: ViewUtil.getLabel('WHWidth'),
                                            minValue: 0,
                                            name: 'wth',
                                            bind: '{theDetail.wth}'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'M'
    		                            }]
                                	},
                                    {
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel: ViewUtil.getLabel('WHStackingHeight'),
                                            minValue: 0,
                                            name: 'wth',
                                            bind: '{theDetail.skht}'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'M'
    		                            }]
                                	},
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            reference: 'ctlTotalArea',
                                            fieldLabel: ViewUtil.getLabel('WHTotalArea'),
                                            readOnly: true,
                                            // editable: false,
                                            bind: '{theDetail.totDims}',
                                            name: 'totDims',
                                            // fieldStyle: 'background-color: #ddd !important;',
                                            inputAttrTpl: 'style="background-color: #ddd !important;"'
                                        },{
    		                            	xtype: 'label',
    		                            	margin: '5 5 0 5',
    		                            	text: 'M2'
    		                            }]
                                	}
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 2,
                                layout: {
                                    type: 'vbox'
                                },
    		                    defaults: {
    		                    	margin: '5 0 5 0',
    		                        labelAlign: 'right',
    		                        labelWidth: 140
    		                    },
                                items: [
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                                labelWidth: 120
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            reference: 'ctlBayQty',
                                            minValue: 0,
                                            maxValue: 10000,
                                            allowBlank: false,
                                            fieldLabel: ViewUtil.getLabel('WHNoOfBays'),
                                            name: 'bayQty',
                                            bind: '{theDetail.bayQty}'
                                        }]
                                		
                                	},
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                                labelWidth: 120
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            reference: 'ctlRowQty',
                                            minValue: 0,
                                            maxValue: 10000,
                                            allowBlank: false,
                                            fieldLabel: ViewUtil.getLabel('WHNoOfRows'),
                                            name: 'rowwQty',
                                            bind: '{theDetail.rowwQty}'
                                        }]
                                		
                                	},
                                    {
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                                labelWidth: 120
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            reference: 'ctlLengthOfOneBay',
                                            fieldLabel: ViewUtil.getLabel('WHLengthOfOneBay'),
                                            readOnly: true,
                                            bind: '{theDetail.bayLen}',
                                            name: 'bayLen',
                                            inputAttrTpl: 'style="background-color: #ddd !important;"'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'M'
    		                            }]
                                		
                                	},
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                                labelWidth: 120
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            reference: 'ctlLengthOfOneRow',
                                            fieldLabel: ViewUtil.getLabel('WHLengthOfOneRow'),
                                            readOnly: true,
                                            bind: '{theDetail.rowwLen}',
                                            name: 'rowwLen',
                                            inputAttrTpl: 'style="background-color: #ddd !important;"'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'M'
    		                            }]
                                		
                                	},
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                                labelWidth: 120
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            reference: 'ctlAreaPerBlock',
                                            fieldLabel: ViewUtil.getLabel('WHAreaPerBlock'),
                                            readOnly: true,
                                            bind: '{theDetail.areaPBlk}',
                                            name: 'areaPBlk',
                                            inputAttrTpl: 'style="background-color: #ddd !important;"'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'M2'
    		                            }]
                                		
                                	},
                                	{
    				            		xtype: 'container',
    				            		defaults: {
    	                                    labelAlign: 'right',
    		                                labelWidth: 120
    		                            },
    				            		layout: {
    						                type: 'hbox',
    						            },
    						            items:[{
                                            xtype: 'numberfield',
                                            reference: 'ctlFloorBearingCapacity',
                                            hideTrigger: true,
                                            fieldLabel: ViewUtil.getLabel('WHFloorBearingCapacity'),
                                            name: 'fbCapa',
                                            bind: '{theDetail.fbCapa}'
                                        },{
    		                            	xtype:'label',
    		                            	margin: '5 5 0 5',
    		                            	text:'Ton'
    		                            }]
                                	},
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1.5,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        height: '50%',
                                        layout: 'center',
                                        layout: {
                                            type: 'vbox'
                                        },
                	                    defaults: {
            		                    	margin: '5 0 5 0',
            		                        labelAlign: 'right'
            		                    },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                layout: {
                                                    type: 'hbox'
                                                },
                                                height: '50%',
                                                items: [
                                                    {
                                                        xtype: 'colorfield',
                                                        fieldLabel: ViewUtil.getLabel('WHFontColor'),
                                                        labelWidth: 70,
                                                        width: 210,
                                                        name: 'foreColr',
                                                        bind: '{theDetail.foreColr}'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                layout: {
                                                    type: 'hbox'
                                                },
                                                height: '50%',
                                                items: [
                                                    {
                                                        xtype: 'colorfield',
                                                        fieldLabel: ViewUtil.getLabel('WHBackColor'),
                                                        labelWidth: 70,
                                                        width: 210,
                                                        name: 'bkColr',
                                                        bind: '{theDetail.bkColr}'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        height: '50%',
                                        layout: 'center',
                                        items: [
                                            {
                                                xtype: 'button',
                                                reference: 'ctlOpenLayoutButton',
                                                width: 200,
                                                text: ViewUtil.getLabel('WHBayRowDesign'),
                                                listeners:{
                                                	click: 'onOpenWarehouseLayout'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },{
                        xtype: 'fieldset',
                        margin:'5 5 5 5',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
    		                    defaults: {
    		                    	margin: '5 0 5 0',
    		                        labelAlign: 'right',
    		                        labelWidth: 100
    		                      
    		                    },   
                                items: [
                                    {
                                        xtype: 'combobox',
                                        reference: 'ctlMainUsage',
                                        allowBlank: false,
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: ViewUtil.getLabel('WHMainUsage'),
										bind: {
											store: '{warehouseMainUsage}',
											value: '{theDetail.useCd}'
										},
										displayField: 'codeName',
										valueField: 'code'
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        flex: 1,
                                        width: 533,
                                        fieldLabel: ViewUtil.getLabel('WHCargoType'),
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                reference: 'ctlEdible',
                                                flex: 1,
                                                boxLabel: ViewUtil.getLabel('WHEdible'),
                                                inputValue: 'Y',
                                                uncheckedValue: 'N',
                                                name: 'edYn',
                                                bind: '{edYnChecked}'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                reference: 'ctlNonEdible',
                                                flex: 1,
                                                boxLabel: ViewUtil.getLabel('WHNonEdible'),
                                                inputValue: 'Y',
                                                uncheckedValue: 'N',
                                                name: 'nonEdYn',
                                                bind: '{nonEdYnChecked}'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                reference: 'ctlDG',
                                                flex: 1,
                                                boxLabel: ViewUtil.getLabel('WHDG'),
                                                inputValue: 'Y',
                                                uncheckedValue: 'N',
                                                name: 'dgYn',
                                                bind: '{dgChecked}'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
    		                    defaults: {
    		                    	margin: '5 0 5 0',
    		                        labelAlign: 'right',
    		                        labelWidth: 50
    		                    },
    		                    flex: 1,
                                items: [
                                    {
                                        xtype: 'textareafield',
                                        width: '100%',
                                        fieldLabel: ViewUtil.getLabel('WHRemark'),
                                        name: 'rmk',
                                        bind: '{theDetail.rmk}'
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