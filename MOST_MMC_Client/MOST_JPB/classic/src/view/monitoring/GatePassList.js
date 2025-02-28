Ext.define('MOST.view.monitoring.GatePassList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-gatepasslist',
	requires: [
		'MOST.view.monitoring.GatePassListModel',
		'MOST.view.monitoring.GatePassListController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Gate Pass List",
	width: 1100,
	height: 700,

	controller: 'gatepasslist',
	
	viewModel: {
		type: 'gatepasslist'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGatePassListGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'gatePassListData',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
                xtype: 'container',
                defaults: {
                    margin: '0 5 5 0',
                    defaults: {
                    	 margin: '5 5 0 5',
                         labelWidth: 70,
                         width: 220,
                         labelAlign: 'right'
                    }
                },
                layout: {
                    type: 'vbox',
                    align:'stretch'
                },
                items: [
                	// 1 Flow
                    {
                        xtype: 'fieldset',
                        width: 400,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'radiofield',
                                reference: 'rdGp',
                                name: 'gatePassListRadio',
                                width: 30,
                                checked: true,
                                inputValue: 'grVal',
                                listeners: {
                                	change: 'onRadioEditableChange'
                                }
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtGp1',
                                fieldLabel: ViewUtil.getLabel('gatePassListGp'),
                                bind: '{theSearch.gatePassNo}',
                                maxLength: 20,
			                	enforceMaxLength : true,
			                	listeners:{
			                		change: function(){
			                			var me = this;
			                			me.setValue(this.getValue().toUpperCase());
			                		}
			                	},
			                	editable: true,
			                	disabled: false
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtGr1',
                                fieldLabel: ViewUtil.getLabel('gatePassListGr'),
                                bind: '{theSearch.cgNo}',
                                maxLength: 20,
			                	enforceMaxLength : true,
			                	listeners:{
			                		change: function(){
			                			var me = this;
			                			me.setValue(this.getValue().toUpperCase());
			                		}
			                	},
			                	editable: true,
			                	disabled: false
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'radiofield',
                                reference: 'rdGpDt',
                                name: 'gatePassListRadio',
                                inputValue: 'gpdtVal',
                                width: 30,
                                listeners: {
                                	change: 'onRadioEditableChange'
                                }
                            },
                            {
                                xtype: 'datetimefield',
                                fieldLabel: ViewUtil.getLabel('gatePassListGpDate'),
                                reference: 'refGpFromDt',
                                format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                listeners: {
		    						change: 'onDateChange'
		    					},
		    					editable: false,
			                	disabled: true
                            },
                            {
                                xtype: 'label',
                                margin: '13 5 0 10',
                                width: 10,
                                text: ViewUtil.getLabel('fromtoSign'),
                            },
                            {
                                xtype: 'datetimefield',
                                width: 145,
                                reference: 'refGpToDt',
                                format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                listeners: {
		    						change: 'onDateChange'
		    					},
		    					editable: false,
			                	disabled: true
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtGp2',
                                fieldLabel: ViewUtil.getLabel('gatePassListGp'),
                                bind: '{theSearch.gatePassNo}',
                                maxLength: 20,
                                labelWidth: 68,
                                width: 220,
			                	enforceMaxLength : true,
			                	listeners:{
			                		change: function(){
			                			var me = this;
			                			me.setValue(this.getValue().toUpperCase());
			                		}
			                	},
			                	editable: false,
			                	disabled: true
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtLorry',
                                fieldLabel: ViewUtil.getLabel('gatePassListLorry'),
                                bind: '{theSearch.lorryNo}',
                                maxLength: 30,
                                labelWidth: 68	,
                                width: 220,
			                	enforceMaxLength : true,
			                	listeners:{
			                		change: function(){
			                			var me = this;
			                			me.setValue(this.getValue().toUpperCase());
			                		}
			                	},
			                	editable: false,
			                	disabled: true
                            },
                            {
                                xtype: 'container',
                                flex: 1
                            }
                        ]
                    },
                    // 3 Flow
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                        	defaults:{
                        		margin: '5 5 0 5',
                                labelWidth: 70,
                                labelAlign: 'right',
                                width: 220
                        	}
                        },
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                	{
                                        xtype: 'radiofield',
                                        reference: 'rdJpvc',
                                        name: 'gatePassListRadio',
                                        width: 30,
                                        inputValue: 'jpvcVal',
                                        listeners: {
                                        	change: 'onRadioEditableChange'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                               
                                items: [
                                    {
                                    	xtype:'vesselcalllistfield',
    				   					reference:'ctlVslCallId',
    				   					width: 257,
    				   					fieldLabel:ViewUtil.getLabel('vslcallid'),
    				   					bind: {
    										value: '{theSearch.vslCallId}'
    									},
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                               
                                items: [
                                    {
                                        xtype: 'combo',
                                        fieldLabel: ViewUtil.getLabel('gatePassListSn'),
                                        reference: 'ctlSn1Combo',
                                       	queryMode: 'local',
                                       	bind: {
                                       		store: '{sn1Combo}',
                                       		value: '{theSearch.shipgNoteNo}'
                                   	    },
                                   	 	displayField: 'shipgNoteNo',
                                   	 	valueField: 'shipgNoteNo',
                                   	 	value : '',
                                   	 	editable: false,
                                   	 	disabled: true
                                    },
                                    {
                                        xtype: 'combo',
                                        fieldLabel: ViewUtil.getLabel('gatePassListBl'),
                                        reference: 'ctlBlCombo',
                                       	queryMode: 'local',
                                       	bind: {
                                       		store: '{blCombo}',
                                       		value: '{theSearch.blNo}'
                                   	    },
                                   	 	displayField: 'blNo',
                                   	 	valueField: 'blNo',
                                   	 	value : '',
                                   	 	editable: false,
                                   	 	disabled: true
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                width: 370,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                reference: 'txtGr3',
                                                fieldLabel: ViewUtil.getLabel('gatePassListGr'),
                                                bind: '{theSearch.cgNo}',
                                                maxLength: 20,
                                                labelWidth: 80,
                                                labelAlign: 'right',
                                                width: 200,
        					                	enforceMaxLength : true,
        					                	listeners:{
        					                		change: function(){
        					                			var me = this;
        					                			me.setValue(this.getValue().toUpperCase());
        					                		}
        					                	},
        					                	editable: false,
        					                	disabled: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                reference: 'txtGp3',
                                                bind: '{theSearch.gatePassNo}',
                                                labelWidth:35,
                                                labelAlign: 'right',
                                                width: 160,
                                                fieldLabel: ViewUtil.getLabel('gatePassListGp'),
                                                maxLength: 20,
        					                	enforceMaxLength : true,
        					                	listeners:{
        					                		change: function(){
        					                			var me = this;
        					                			me.setValue(this.getValue().toUpperCase());
        					                		}
        					                	},
        					                	editable: false,
        					                	disabled: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'combo',
                                        labelWidth: 80,
                                        width: 350,
                                        fieldLabel: ViewUtil.getLabel('gatePassListDmode'),
                                        reference: 'ctlDmodeCombo',
                                       	queryMode: 'local',
                                       	bind: {
                                       		store: '{arrSchDModeCombo}',
                                       		value: '{theSearch.delvTpNm}'
                                   	    },
                                   	 	displayField: 'name',
                                   	 	valueField: 'code',
                                   	 	value : '',
                                   	 	editable: false,
                                   	 	disabled: true
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'datetimefield',
                                        reference: 'refShiftDt',
                                        fieldLabel: ViewUtil.getLabel('gatePassListShiftDate'),
                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                        bind: {
                                       		value: '{theSearch.shftDt}'
                                   	    },
	                                    listeners: {
	    		    						change: 'onDateChange'
	    		    					},
	    		    					editable: false,
					                	disabled: true
                                    },
                                    {
                                        xtype: 'combo',
                                        reference: 'ctlShiftCombo',
                                        fieldLabel: ViewUtil.getLabel('gatePassListShift'),
                                       	queryMode: 'local',
                                       	bind: {
                                       		store: '{arrShftIdCombo}',
                                       		value: '{theSearch.shftId}'
                                   	    },
                                   	 	displayField: 'label',
                                   	 	valueField: 'data',
                                   	 	value : '',
                                   	 	editable: false,
                                   	 	disabled: true
                                    }
                                ]
                            }
                        ]
                    },
                    // 4 Flow
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        title: '',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'radiofield',
                                reference: 'rdEta',
                                name: 'gatePassListRadio',
                                inputValue: 'etaVal',
                                width: 30,
                                listeners: {
                                	change: 'onRadioEditableChange'
                                }
                            },
                            {
                                xtype: 'datetimefield',
                                reference: 'refEstArriFromDt',
                                fieldLabel: ViewUtil.getLabel('gatePassListEstArriDate'),
                                format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		    					editable: false,
			                	disabled: true
                            },
                            {
                                xtype: 'label',
                                margin: '13 5 0 10',
                                width: 10,
                                text: ViewUtil.getLabel('fromtoSign')
                            },
                            {
                                xtype: 'datetimefield',
                                reference: 'refEstArriToDt',
                                width: 145,
                                format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		    					editable: false,
			                	disabled: true
                            },
                            {
                            	xtype: 'button',
                            	width: 70,
                            	 margin: '5 5 0 0',
				                    reference: 'refFind',
				                    text: ViewUtil.getLabel('find'),
				                    iconCls: 'x-fa fa-search',
									listeners:{
										click:'onFind'
									},
									editable: false,
			                	disabled: true
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: ViewUtil.getLabel('gatePassListSn'),
                                reference: 'ctlSn2Combo',
                               	queryMode: 'local',
                               	bind: {
                               		store: '{sn2Combo}',
                               		value: '{theSearch.shipgNoteNo}'
                           	    },
                           	 	displayField: 'shipgNoteNo',
                           	 	valueField: 'shipgNoteNo',
                           	 	value : '',
                           	 	editable: false,
			                	disabled: true
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtGr4',
                                fieldLabel: ViewUtil.getLabel('gatePassListGr'),
                                bind: '{theSearch.cgNo}',
                                maxLength: 20,
			                	enforceMaxLength : true,
			                	listeners:{
			                		change: function(){
			                			var me = this;
			                			me.setValue(this.getValue().toUpperCase());
			                		}
			                	},
			                	editable: false,
			                	disabled: true
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtGp4',
                                fieldLabel: ViewUtil.getLabel('gatePassListGp'),
                                bind: '{theSearch.gatePassNo}',
                                maxLength: 20,
			                	enforceMaxLength : true,
			                	listeners:{
			                		change: function(){
			                			var me = this;
			                			me.setValue(this.getValue().toUpperCase());
			                		}
			                	},
			                	editable: false,
			                	disabled: true
                            }
                        ]
                    }
                ]
            },{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateGatePassListGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
				listeners: {
					celldblclick: 'onDblClickForGatePassDetail',
					pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('GatePassList'),
				}
		    }],
		    
		    dockedItems: [
		    	{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
		                    xtype: 'button',
		                    itemId:'inquiryItemId',
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
		            	}
		            ]
				}
		    ]
		});
		
		me.callParent();
	}
});

