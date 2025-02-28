Ext.define('MOST.view.operation.ServiceOrderDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-serviceorderdetail',
    requires: [
        'MOST.view.operation.ServiceOrderController',
        'MOST.view.operation.ServiceOrderModel',
        'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],
    width: 1150,
    height: 800,
    layout: 'fit',
    listeners: {
        afterrender: 'onDetailLoad',
        destroy: 'onDestroyView'
    },

    SUBMIT_TYPE_SUBMIT: 'SU',
    SUBMIT_TYPE_RESUBMIT: 'RSU',
    SUBMIT_TYPE_APPROVE: 'AP',
    SUBMIT_TYPE_REJECT: 'RJ',
    SUBMIT_TYPE_CANCEL: 'CA',
    SUBMIT_TYPE_COMPLETION: 'CP',
    SNBL_LIST_STORE:'SNBLGridList',
    
    initComponent: function () {
        var me = this;

        Ext.apply(me, {

            items: [{
                xtype: 'container',
                scrollable: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    margin: '5 5 5 5'
                },
                items: [{
                    /**
                     *  1st Layer
                     */
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '5 5 5 5'
                    },
                    items: [{
                        xtype: 'fieldset',
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelAlign: 'right',
                            margin: '5 5 5 5'

                        },
                        items: [{
                            xtype: 'container',
                            layout: {
                                type : 'hbox',
                                pack: 'left'
                            },
                            defaults:{
                                labelAlign: 'right'
                            },
                            bind: {
                                hidden: '{serviceOrderItem.workingStatus !== "C"}'
                            },
                            items: [{
                                xtype: 'radiogroup',
                                flex: 1,
                                columns: 1,
                                vertical: true,
                                margin: '0 0 0 17',
                                reference: 'refJpvcTypeRadioGroup',
                                listeners: {
                                    change: 'onVesselTypeRadioChanged'
                                },
                                items: [{
                                    boxLabel: ViewUtil.getLabel('jpvc'),
                                    inputValue: 'jpvc',
                                    name: 'jpvcTp',
                                    margin : '2 0 0 0',
                                    reference: 'refJpvcRb',
                                    checked: true                                    
                                }]
                            },{
                                xtype: 'vesselcalllistnolabel',
                                reference: 'refServiceOrderVslCallIdFieldDt',
                                flex: 1,
                                allowBlank: false,
                                visibleName: false,
                                bind: {
                                    value : '{serviceOrderItem.vslCallId}'
                                }
                            }]
                        },{
                            xtype: 'vesselcalllistfield',
                            reference: 'refServiceOrderVslCallId',
                            fieldLabel: ViewUtil.getLabel('jpvc'),
                            labelWidth: 80,
                            bind: {
                                hidden: '{serviceOrderItem.workingStatus === "C" ||' +
                                    '(serviceOrderItem.workingStatus === "U" && serviceOrderItem.vslCallId === "STRG")}'
                            }
                        },{
                            xtype: 'textfield',
                            reference: 'refServiceOrderNonJpvcNo',
                            fieldLabel: ViewUtil.getLabel('nonJpvc'),
                            labelWidth: 80,
                            editable: false,
                            bind: {
                                hidden: '{serviceOrderItem.workingStatus === "C" || ' +
                                    '(serviceOrderItem.workingStatus === "U" && serviceOrderItem.vslCallId !== "STRG")}'
                            }
                        },{
                            xtype: 'textfield',
                            reference: 'refServiceOrderDocNo',
                            fieldLabel: ViewUtil.getLabel('so_odrNo'),
                            editable: false,
                            labelWidth: 80,
                            bind: {
                                value: '{serviceOrderItem.odrNo}',
                                hidden: '{serviceOrderItem.workingStatus !== "U"}'
                            }
                        },{
                            xtype: 'textfield',
                            reference: 'refServiceOrderStatus',
                            fieldLabel: ViewUtil.getLabel('so_status'),
                            editable: false,
                            labelWidth: 80,
                            bind: {
                                value: '{serviceOrderItem.statNm}',
                                hidden: '{serviceOrderItem.workingStatus !== "U"}'
                            }
                        }]
                    },{
                        xtype: 'fieldset',
                        flex: 2,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelWidth: 80,
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'textfield',
                                reference: 'refServiceOrderVslCd',
                                fieldLabel: ViewUtil.getLabel('so_vslCd'),
                                editable: false,
                                bind: {
                                    value: '{serviceOrderVesselItem.vslCd}'
                                }
                            },{
                                xtype: 'textfield',
                                reference: 'refServiceOrderVslNm',
                                fieldLabel: ViewUtil.getLabel('so_vslNm'),
                                editable: false,
                                bind: {
                                    value: '{serviceOrderVesselItem.vslNm}'
                                }
                            },{
                                xtype: 'textfield',
                                reference: 'refServiceOrderVoyage',
                                fieldLabel: ViewUtil.getLabel('so_voyage'),
                                editable: false,
                                bind: {
                                    value: '{serviceOrderVesselItem.voyage}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelWidth: 50,
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'textfield',
                                reference: 'refServiceOrderSa',
                                fieldLabel: ViewUtil.getLabel('so_sa'),
                                editable: false,
                                bind: {
                                    value: '{(serviceOrderVesselItem.arrvSaId) ? ' +
                                        'serviceOrderVesselItem.arrvSaId : serviceOrderVesselItem.depSaId}'
                                }
                            },{
                                xtype: 'textfield',
                                reference: 'refServiceOrderEta',
                                fieldLabel: ViewUtil.getLabel('so_eta'),
                                editable: false,
                                bind: {
                                    value: '{serviceOrderVesselItem.eta1}'
                                }
                            },{
                                xtype: 'textfield',
                                reference: 'refServiceOrderEtd',
                                fieldLabel: ViewUtil.getLabel('so_etd'),
                                editable: false,
                                bind: {
                                    value: '{serviceOrderVesselItem.etd1}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelWidth: 80,
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'textfield',
                                reference: 'refServiceOrderBerthLoc',
                                fieldLabel: ViewUtil.getLabel('so_berthLoc'),
                                editable: false,
                                bind: {
                                    value: '{serviceOrderVesselItem.berthLoc}'
                                }
                            },{
                                xtype: 'textfield',
                                reference: 'refServiceOrderBbtLoc',
                                fieldLabel: ViewUtil.getLabel('so_stoLoc'),
                                editable: false,
                                bind: {
                                    value: '{serviceOrderVesselItem.storageLoc}'
                                }
                            },{
                                xtype: 'textfield',
                                reference: 'refServiceOrderEtw',
                                fieldLabel: ViewUtil.getLabel('so_etw'),
                                editable: false,
                                bind: {
                                    value: '{serviceOrderVesselItem.etw1}'
                                }
                            }]
                        }]
                    }]
                },{
                    /**
                     *  2nd Layer
                     */
                    xtype: 'fieldset',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin : '5 5 5 5'
                    },
                    items: [{
                        xtype: 'container',
                        flex: 3,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items:[{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 80
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: ViewUtil.getLabel('so_cat1'),
                                flex: 1,
                                editable: false,
                                bind: {
                                    value: '{serviceOrderItem.category1Nm}'
                                }
                            },{
                                xtype: 'textfield',
                                fieldLabel: ViewUtil.getLabel('so_cat2'),
                                flex: 1,
                                editable: false,
                                bind: {
                                    value: '{serviceOrderItem.category2Nm}'
                                }
                            },{
                                xtype: 'textfield',
                                fieldLabel: ViewUtil.getLabel('so_cat3'),
                                flex: 1,
                                editable: false,
                                bind: {
                                    value: '{serviceOrderItem.category3Nm}'
                                }
                            }]
                        },{
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('soc_processType'),
                            hidden: true,
                            margin: '10 0 0 0',
                            labelWidth: 80,
                            labelAlign: 'right',
                            flex: 1,
                            editable: false,
                            bind: {
                                value: '{serviceOrderItem.prcTpDesc}'
                            }
                        }]
                    },{
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [{
                            xtype: 'button',
                            reference: 'refSubmitbtn',
                            text: ViewUtil.getLabel('submit'),
                            flex: 1,
                            type: me.SUBMIT_TYPE_SUBMIT,
                            bind: {
                                hidden: '{serviceOrderItem.workingStatus !== "C"}'
                            },
                            listeners: {
                                click: 'onProcessBtnAction'
                            }
                        },{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            bind: {
                                hidden: '{serviceOrderItem.statCd !== "' + me.SUBMIT_TYPE_SUBMIT + '"}'
                            },
                            items: [{
                                xtype: 'button',
                                reference: 'refResubmitbtn',
                                text: ViewUtil.getLabel('resubmit'),
                                flex: 1,
                                type: me.SUBMIT_TYPE_RESUBMIT,
                                listeners: {
                                    click: 'onProcessBtnAction'
                                }
                            },{
                                xtype: 'button',
                                reference: 'refCancelbtn',
                                text: ViewUtil.getLabel('cancel'),
                                flex: 1,
                                type: me.SUBMIT_TYPE_CANCEL,
                                listeners: {
                                    click: 'onProcessBtnAction'
                                }
                            }]
                        },{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            bind: {
                                hidden: '{serviceOrderItem.statCd !== "' + me.SUBMIT_TYPE_SUBMIT + '" && ' +
                                    'serviceOrderItem.statCd !== "' + me.SUBMIT_TYPE_APPROVE + '" && ' +
                                    'serviceOrderItem.statCd !== "' + me.SUBMIT_TYPE_REJECT + '"}'
                            },
                            items: [{
                                xtype: 'button',
                                reference: 'refApprovebtn',
                                text: ViewUtil.getLabel('approve'),
                                flex: 1,
                                type: me.SUBMIT_TYPE_APPROVE,
                                listeners: {
                                    click: 'onProcessBtnAction'
                                }
                            },{
                                xtype: 'button',
                                reference: 'refRejectbtn',
                                text: ViewUtil.getLabel('reject'),
                                flex: 1,
                                type: me.SUBMIT_TYPE_REJECT,
                                listeners: {
                                    click: 'onProcessBtnAction'
                                }
                            }]
                        },{
                            xtype: 'button',
                            reference: 'recCompbtn',
                            text: ViewUtil.getLabel('completion'),
                            flex: 1,
                            type: me.SUBMIT_TYPE_COMPLETION,
                            bind: {
                                hidden: '{serviceOrderItem.statCd !== "' + me.SUBMIT_TYPE_APPROVE + '" && ' +
                                    'serviceOrderItem.statCd !== "' + me.SUBMIT_TYPE_COMPLETION + '"}'
                            },
                            listeners: {
                                click: 'onProcessBtnAction'
                            }
                        },{
                            xtype: 'container',
                            flex: 1,
                            bind: {
                                hidden: '{serviceOrderItem.workingStatus === "U" ' +
                                    '&& (serviceOrderItem.statCd === "' + me.SUBMIT_TYPE_APPROVE + '" ' +
                                    '|| serviceOrderItem.statCd === "' + me.SUBMIT_TYPE_SUBMIT + '")}'
                            }
                        }]
                    }]
                },{
                    /**
                     *  3rd Layer
                     */
                    xtype: 'fieldset',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items: [{
                            xtype: 'partnercdfield',
                            reference: 'refPtnrCd',
                            fieldLabel: ViewUtil.getLabel('payer'),
                            width: 120,
                            bind: {
                                value: '{serviceOrderItem.payer}'
                            }
                        },{
                            xtype: 'textfield',
                            reference: 'refPtnrNm',
                            margin: '0 0 0 10',
                            editable: false,
                            bind: {
                                value: '{serviceOrderItem.payerNm}'
                            }
                        }]
                    },{
                        xtype: 'textfield',
                        reference: 'refPrcRmk',
                        flex: 2,
                        fieldLabel: ViewUtil.getLabel('so_prcRmk'),
                        labelWidth: 150,
                        bind: {
                            value: '{serviceOrderItem.rmk}'
                        }
                    }]
                },{
                    /** ============================================================================================================================================
                     *  4th Layer
                     *  ============================================================================================================================================
                     */
                    xtype: 'panel',
                    reference: 'refReqInputContainer',
                    title: ViewUtil.getLabel('so_reqInput'),
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'left'
                    },
                    defaults: {
                        margin: '2 2 2 2'
                    },
                    items: [{
                        xtype: 'fieldset',
                        reference: 'refReqDatesFieldset',
                        title: ViewUtil.getLabel('so_date'),
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '5 0 0 0'
                        },
                        items: [{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                xtype: 'datetimefield',
                                reference: 'refReqSvcDtFm',
                                fieldLabel: ViewUtil.getLabel('so_svcDt'),
                                labelAlign: 'right',
                                labelWidth: 80,
                                width: 230,
                                allowBlank: false,
                                format: "d/m/Y",
                                bind: {
                                    value: '{serviceOrderItem.svcDtFm}'
                                },
                                listeners: {
                                    select: 'onSvcDtChange'
                                }
                            },{
                                xtype: 'datetimefield',
                                reference: 'refReqSvcDtTo',
                                margin: '0 0 0 10',
                                width: 150,
                                format: "d/m/Y",
                                bind: {
                                    hidden: '{!(serviceOrderItem.svcDtTp === "Y")}',
                                    value: '{serviceOrderItem.svcDtTo}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'datetimefield',
                                reference: 'refReqDt1Fm',
                                labelWidth: 80,
                                width: 230,
                                format: "d/m/Y",
                                bind: {
                                    fieldLabel: '{serviceOrderItem.dt1Tit}',
                                    hidden: '{serviceOrderItem.dt1Chk !== "Y"}',
                                    value: '{serviceOrderItem.dt1Fm}'
                                }
                            },{
                                xtype: 'datetimefield',
                                reference: 'refReqDt1To',
                                margin: '0 0 0 10',
                                width: 150,
                                format:  "d/m/Y",
                                bind: {
                                    hidden: '{!(serviceOrderItem.dt1Chk === "Y" && serviceOrderItem.dt1Tp ==="Y")}',
                                    value: '{serviceOrderItem.dt1To}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'datetimefield',
                                reference: 'refReqDt2Fm',
                                labelWidth: 80,
                                width: 230,
                                format: "d/m/Y",
                                bind: {
                                    fieldLabel: '{serviceOrderItem.dt2Tit}',
                                    hidden: '{serviceOrderItem.dt2Chk !== "Y"}',
                                    value: '{serviceOrderItem.dt2Fm}'
                                }
                            },{
                                xtype: 'datetimefield',
                                reference: 'refReqDt2To',
                                margin: '0 0 0 10',
                                width: 150,
                                format: "d/m/Y",
                                bind: {
                                    hidden: '{!(serviceOrderItem.dt2Chk === "Y" && serviceOrderItem.dt2Tp ==="Y")}',
                                    value: '{serviceOrderItem.dt2To}'
                                }
                            }]
                        },{
                            xtype: 'combobox',
                            reference: 'refReqShift',
                            fieldLabel: ViewUtil.getLabel('so_shiftChk'),
                            labelWidth: 80,
                            labelAlign: 'right',
                            displayField: 'shftNm',
                            valueField: 'shftId',
                            queryMode: 'local',
                            bind: {
                                store: '{shiftComboStore}',
                                value: '{serviceOrderItem.shftId}'
                            }
                        }]
                    },{
						xtype: 'fieldset',
						flex: 1,
				    	title: ViewUtil.getLabel('so_unit'),
				    	width: 350,
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
				    	items: [{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                xtype: 'numberfield',
                                reference: 'refReqUnitField',
                                allowBlank: false,
                                labelAlign: 'left',
                                labelWidth: 105,
                                maxValue: 9999999,
                                minValue: 0,
                                listeners:{
                                	change: 'onChangUnit1'
                                },
                                width: 200,
                                decimalPrecision: '{(serviceOrderItem.unitDec !== null) ? serviceOrderItem.unitDec : 0}',
                                bind: {
                                    fieldLabel: '{serviceOrderItem.unitTit}',
                                    hidden: '{!(serviceOrderItem.unitTit !== null && serviceOrderItem.unitTit !== "")}',
                                    value: '{serviceOrderItem.unit}',
                                }
                            },{
                                xtype: 'component',
                                width: 30,
                                margin: '5 0 5 10',
                                bind: {
                                    html:'{serviceOrderItem.unitUomNm}'
                                }
                            }]
                        },{
							xtype: 'container',
							margin: '5 0 0 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							bind: {
								hidden: '{!(serviceOrderItem.unit1Chk === "Y")}',
							},
							items: [{
								xtype: 'numberfield',
								reference: 'refReqUnit1Field',
								labelAlign: 'left',
								labelWidth: 105,
								width: 200,
								maxValue: 9999999,
                                minValue: 0,
                                listeners:{
                                	change: 'onChangUnit2'
                                },
								decimalPrecision: '{(serviceOrderItem.unit1Dec !== null) ? serviceOrderItem.unit1Dec : 0}',
								bind: {
									fieldLabel: '{serviceOrderItem.unit1Tit}',
									value: '{serviceOrderItem.unit1}'
								}
							},{
								xtype: 'component',
								width: 30,
								margin: '5 0 0 10',
								bind: {
									html:'{serviceOrderItem.unit1UomNm}'
								}
							}]
                        },{
                        	xtype: 'container',
                        	margin: '5 0 0 0',
                        	layout: {
                        		type: 'hbox',
                        		align: 'stretch'
                        	},
                        	bind: {
                        		hidden: '{!(serviceOrderItem.unit2Chk === "Y")}',
                        	},
                        	items: [{
                        		xtype: 'numberfield',
                        		reference: 'refReqUnit2Field',
                        		labelAlign: 'left',
                        		labelWidth: 105,
                        		maxValue: 9999999,
                                minValue: 0,
                                listeners:{
                                	change: 'onChangUnit3'
                                },
                        		width: 200,
                        		decimalPrecision: '{(serviceOrderItem.unit2Dec !== null) ? serviceOrderItem.unit2Dec : 0}',
                        		bind: {
                        			fieldLabel: '{serviceOrderItem.unit2Tit}',
                        			value: '{serviceOrderItem.unit2}'
                        		}
                        	},{
                        		xtype: 'component',
                        		margin: '5 0 0 10',
                        		width: 30,
                        		bind: {
                        			html:'{serviceOrderItem.unit2UomNm}'
                        		}
                        	}]
                        },{
                        	xtype: 'container',
                        	layout: {
                        		type: 'hbox',
                        		align: 'stretch'
                        	},
                        	items: [{
                        		xtype: 'combobox',
                        		reference:'refSearchBlno',
	    						margin: '10 0 5 5',
	    						fieldLabel: ViewUtil.getLabel('LABLNo'),
	    						emptyText: "select",
	    						bind: {
	    							store: '{BLNoList}',
	    							value: '{serviceOrderItem.reqBlNo}'
	    						},
	    						listeners:{
	    							select : 'onSelectBLSNNo',
	    						},
	    						displayField: 'cdNm',
	    						valueField: 'cd',
	    						queryMode: 'local',
	    						hidden: true,
	    						forceSelection: true, 
	    	   					typeAhead: true,
	    					},{
	    						xtype: 'combobox',
	    						reference:'refSearchSnNo',
	    						width: 300,
	    						margin: '10 0 5 5',
	    						fieldLabel: ViewUtil.getLabel('LASNNo'),
	    						emptyText: "select",
	    						bind: {
	    							store: '{SNNoList}',
	    							value: '{serviceOrderItem.reqShipgNoteNo}'
	    						},
	    						listeners:{
	    							select : 'onSelectBLSNNo',
	    						},
	    						displayField: 'cdNm',
	    						valueField: 'cd',
	    						queryMode: 'local',
	    						hidden: true,
	    						forceSelection: true, 
	    	   					typeAhead: true,
	    					},{
	            				xtype: 'button',
	            				itemId: 'inquiryItemId',
	            				reference:'btnSearchBLSNNo',
	            				margin: '10 0 5 5',
	            				text: ViewUtil.getLabel('search'),
	            				iconCls: 'x-fa fa-search',
	            				cls: 'search-button', 
	            				hidden: true,
	            				listeners: {
	            					click: 'onSearchSNBL'
	            				}
	            			}]
                        },{
                        	xtype: 'container',
                        	layout: {
                        		type: 'hbox',
                        		align: 'stretch'
                        	},
                        	margin: '5 5 5 100',
                        	items: [{
                        		xtype: 'button',
                        		text: ViewUtil.getLabel('add'),
                        		itemId:'createItemIdBL',
                        		ui: 'create-button',
                        		iconCls: 'x-fa fa-plus',
	                 			reference:'refBtnBLCreate',
		    					hidden: true,
	                 			listeners: {
	                 				click: 'onAddBL'
	                 			}
	                 		},{
	                 			xtype: 'button',
	                 			itemId:'deleteItemIdBL',
	                 			text: ViewUtil.getLabel('remove'),
	                 			reference:'refBtnBLDelete',
	                 			ui: 'delete-button',
	                 			margin: '0 0 0 5',
	                 			iconCls: 'x-fa fa-minus',
		    					hidden: true,
	                 			listeners: {
	                 				click: 'onRemoveBL'
	                 			}
	                 		},{
	                 			xtype: 'button',
	                 			text: ViewUtil.getLabel('add'),
	                 			itemId:'createItemIdSN',
	                 			ui: 'create-button',
	                 			iconCls: 'x-fa fa-plus',
	                 			reference:'refBtnSNCreate',
	                 			hidden: true,
	                 			listeners: {
	                 				click: 'onAddSN'
	                 			}
	                 		},{
	                 			xtype: 'button',
	                 			itemId:'deleteItemIdSN',
	                 			text: ViewUtil.getLabel('remove'),
	                 			reference:'refBtnSNDelete',
	                 			ui: 'delete-button',
	                 			margin: '0 0 0 5',
	                 			iconCls: 'x-fa fa-minus',
		    					hidden: true,
	                 			listeners: {
	                 				click: 'onRemoveSN'
	                 			}
	                 		}]
                        },{	// GRID UNIT 4th
                        	xtype: 'tsb-datagrid',
    						reference: 'refBLSNListGrid',
    						usePagingToolbar : false,
    						flex : 1,
    						height: 110,
    						margin: '5 0 0 0',
    						stateful : true,
    						stateId : '',
    						plugins: [
    							'gridexporter',
    							'gridfilters',
    							'clipboard'
    						],
    						bind: {
    							store: '{SNBLGridList}'
    						},
    						selModel: {
    							type: 'spreadsheet',
    							cellSelect: false
    						},
    						columns: {
    							defaults: {
    								style : 'text-align:center',
    								align : 'center'
    							},
    							items:GridUtil.getGridColumns('SNBLGridList')
    						}
    					},{
    						xtype: 'textfield',
    						reference: 'refNextSNNo',
    						fieldLabel: ViewUtil.getLabel('nextSnNo'),
    						labelWidth: 120,
    						editable: false,
    						hidden: true,
    						bind: {
    							value: '{serviceOrderItem.reqUnitNo}'
    						}
    					}]
					},{
                        xtype: 'fieldset',
                        reference: 'refReqEtcFieldset',
                        title: ViewUtil.getLabel('so_etc'),
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '5 0 0 0',
                            labelAlign: 'right',
                            labelWidth: 70
                        },
                        bind: {
                            hidden: '{serviceOrderItem.locChk === "N" && serviceOrderItem.rmkChk === "N" && serviceOrderItem.cmdtyChk === "N"}'
                        },
                        items: [{
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bind: {
                                hidden: '{!(serviceOrderItem.cmdtyChk === "Y")}'
                            },
                            items: [{
                                xtype: 'cmmcdfield',
                                reference: 'refReqCmdtCd',
                                fieldLabel: ViewUtil.getLabel('cmdtCdF'),
                                labelAlign: 'right',
                                labelWidth: 70,
                                params:{
                                    searchType: 'CMDT'
                                },
                                bind: {
                                    value: '{serviceOrderItem.cmdtyCd}'
                                }
                            },{
                                xtype: 'textfield',
                                margin: '5 0 0 0',
                                reference: 'refReqCmdtNm',
                                labelAlign: 'right',
                                labelWidth: 70,
                                fieldLabel: ' ',
                                editable: false,
                                bind: {
                                    value: '{serviceOrderItem.cmdtyNm}'
                                }
                            }]
                        },{
                            xtype: 'workingareamultifield',
                            reference: 'refReqLocation',
                            fieldLabel: ViewUtil.getLabel('location'),
                            bind: {
                                hidden: '{!(serviceOrderItem.locChk === "Y")}',
                                value: '{serviceOrderItem.locId}'
                            }
                    	},{
                            xtype: 'textarea',
                            fieldLabel: ViewUtil.getLabel('rmk'),
                            bind: {
                                hidden: '{!(serviceOrderItem.rmkChk === "Y")}',
                                value: '{serviceOrderItem.reqRmk}'
                            }
                        }]
                    }]
                },{
                    /** ============================================================================================================================================
                     *  5th Layer
                     *  ============================================================================================================================================
                     */
                	xtype: 'panel',
                	reference: 'refCompletionInputContainer',
                    header: {
                        title: ViewUtil.getLabel('so_compInput'),
                        items: [{
                            xtype: 'button',
                            text: ViewUtil.getLabel('copy'),
                            listeners: {
                                click: 'copyRequestInputToCompletionInput'
                            }
                        },{
                            xtype: 'button',
                            text: ViewUtil.getLabel('clear'),
                            listeners: {
                                click: 'clearCompletionInput'
                            }
                        }]
                    },
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '2 2 2 2'
                    },
                    items: [{
                        xtype: 'fieldset',
                        reference: 'refCompDatesFieldset',
                        title: ViewUtil.getLabel('so_date'),
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '5 0 0 0'
                        },
                        items: [{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                xtype: 'datetimefield',
                                reference: 'refCompSvcDtFm',
                                fieldLabel: ViewUtil.getLabel('so_svcDt'),
                                labelAlign: 'right',
                                labelWidth: 80,
                                width: 230,
                                format: "d/m/Y",                             
                                bind: {
                                    value: '{serviceOrderItem.comSvcDtFm}'
                                },
                                listeners: {
                                    select: 'onSvcDtChange'
                                }
                            },{
                                xtype: 'datetimefield',
                                reference: 'refCompSvcDtTo',
                                margin: '0 0 0 10',
                                width: 150,
                                format: "d/m/Y",
                                bind: {
                                    hidden: '{!(serviceOrderItem.svcDtTp === "Y")}',
                                    value: '{serviceOrderItem.comSvcDtTo}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'datetimefield',
                                reference: 'refCompDt1Fm',
                                labelWidth: 80,
                                width: 230,
                                format: "d/m/Y",
                                bind: {
                                    fieldLabel: '{serviceOrderItem.dt1Tit}',
                                    hidden: '{serviceOrderItem.dt1Chk !== "Y"}',
                                    value: '{serviceOrderItem.comDt1Fm}'
                                }
                            },{
                                xtype: 'datetimefield',
                                reference: 'refCompDt1To',
                                margin: '0 0 0 10',
                                width: 150,
                                format: "d/m/Y",
                                bind: {
                                    hidden: '{!(serviceOrderItem.dt1Chk === "Y" && serviceOrderItem.dt1Tp ==="Y")}',
                                    value: '{serviceOrderItem.comDt1To}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'datetimefield',
                                reference: 'refCompDt2Fm',
                                labelWidth: 80,
                                width: 230,
                                format: "d/m/Y",
                                bind: {
                                    fieldLabel: '{serviceOrderItem.dt2Tit}',
                                    hidden: '{serviceOrderItem.dt2Chk !== "Y"}',
                                    value: '{serviceOrderItem.comDt2Fm}'
                                }
                            },{
                                xtype: 'datetimefield',
                                reference: 'refCompDt2To',
                                margin: '0 0 0 10',
                                width: 150,
                                format: "d/m/Y",
                                bind: {
                                    hidden: '{!(serviceOrderItem.dt2Chk === "Y" && serviceOrderItem.dt2Tp ==="Y")}',
                                    value: '{serviceOrderItem.comDt2To}'
                                }
                            }]
                        },{
                            xtype: 'combobox',
                            reference: 'refCompShift',
                            fieldLabel: ViewUtil.getLabel('so_shiftChk'),
                            labelWidth: 80,
                            labelAlign: 'right',
                            displayField: 'shftNm',
                            valueField: 'shftId',
                            queryMode: 'local',
                            bind: {
                                store: '{shiftComboStore}',
                                value: '{serviceOrderItem.comShftId}'
                            }
                        }]
                    },{
						xtype: 'fieldset',
						flex: 1,
				    	title: ViewUtil.getLabel('so_unit'),
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
			    		items: [{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                xtype: 'numberfield',
                                reference: 'refCompUnitField',
                                labelAlign: 'left',
                                labelWidth: 105,
                                width: 200,
                                decimalPrecision: '{(serviceOrderItem.unitDec !== null) ? serviceOrderItem.unitDec : 0}',
                                maxValue: 9999999,
                                minValue: 0,
                                listeners:{
                            		change: 'onChangCompUnitField'
                                },
                                bind: {
                                    fieldLabel: '{serviceOrderItem.unitTit}',
                                    hidden: '{!(serviceOrderItem.unitTit !== null && serviceOrderItem.unitTit !== "")}',
                                    value: '{serviceOrderItem.comUnit}'
                                }
                            },{
                                xtype: 'component',
                                width: 30,
                                margin: '5 0 0 10',
                                bind: {
                                    html:'{serviceOrderItem.unitUomNm}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            margin: '5 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            bind: {
                                hidden: '{!(serviceOrderItem.unit1Chk === "Y")}'
                            },
                            items: [{
                                xtype: 'numberfield',
                                reference: 'refCompUnit1Field',
                                labelAlign: 'left',
                                labelWidth: 105,
                                width: 200,
                                maxValue: 9999999,
                                minValue: 0,
                                listeners:{
                                	change: 'onChangCompUnit1Field'
                                },
                            	decimalPrecision: '{(serviceOrderItem.unit1Dec !== null) ? serviceOrderItem.unit1Dec : 0}',
                                bind: {
                                    fieldLabel: '{serviceOrderItem.unit1Tit}',
                                    value: '{serviceOrderItem.comUnit1}'
                                }
                            },{
                                xtype: 'component',
                                width: 30,
                                margin: '5 0 0 10',
                                bind: {
                                    html:'{serviceOrderItem.unit1UomNm}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            margin: '5 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            bind: {
                                hidden: '{!(serviceOrderItem.unit2Chk === "Y")}'
                            },
                            items: [{
                                xtype: 'numberfield',
                                reference: 'refCompUnit2Field',
                                labelAlign: 'left',
                                labelWidth: 105,
                                width: 200,
                                maxValue: 9999999,
                                minValue: 0,
                                listeners:{
                                	change: 'onChangCompUnit2Field'
                                },
                            	decimalPrecision: '{(serviceOrderItem.unit2Dec !== null) ? serviceOrderItem.unit2Dec : 0}',
                                bind: {
                                    fieldLabel: '{serviceOrderItem.unit2Tit}',
                                    value: '{serviceOrderItem.comUnit2}'
                                }
                            },{
                                xtype: 'component',
                                width: 30,
                                margin: '5 0 0 10',
                                bind: {
                                    html:'{serviceOrderItem.unitUomNm}'
                                }
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
    							xtype: 'combobox',
    							reference:'refSearchCompletionBlno',
    							margin: '10 0 5 5',
    							fieldLabel: ViewUtil.getLabel('LABLNo'),
    							emptyText: "select",
    							bind: {
    								store: '{BLNoList}',
    								value: '{serviceOrderItem.comBlNo}'
    							},
    							listeners:{
    								select : 'onSelectCompletionBLSNNo',
    							},
    							displayField: 'cdNm',
    							valueField: 'cd',
    							queryMode: 'local',
    							hidden: true,
    							forceSelection: true, 
    	   						typeAhead: true,
    						},{
    							xtype: 'combobox',
    							reference:'refSearchCompletionSnNo',
    							margin: '10 0 5 5',
    							fieldLabel: ViewUtil.getLabel('LASNNo'),
    							emptyText: "select",
    							bind: {
    								store: '{SNNoList}',
    								value: '{serviceOrderItem.comShipgNoteNo}'
    							},
    							listeners:{
    								select : 'onSelectCompletionBLSNNo',
    							},
    							displayField: 'cdNm',
    							valueField: 'cd',
    							queryMode: 'local',
    							hidden: true,
    							forceSelection: true, 
    	   						typeAhead: true,
    						},{
            					xtype: 'button',
            					itemId: 'inquiryItemId',
            					reference:'btnSearchCompletionBLSNNo',
            					margin: '10 0 5 5',
            					text: ViewUtil.getLabel('search'),
    							hidden: true,
            					iconCls: 'x-fa fa-search',
            					cls: 'search-button', 
            					listeners: {
            						click: 'onSearchCompletionSNBL'
            					}
            				}]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            margin: '5 5 5 100',
                            items: [{
             					xtype: 'button',
             					text: ViewUtil.getLabel('add'),
             					itemId:'createItemIdBL',
             					ui: 'create-button',
             					iconCls: 'x-fa fa-plus',
             					reference:'refBtnCompletionCreateBL',
    							hidden: true,
             					listeners: {
             						click: 'onAddCompletionBL'
             					}
             				},{
             					xtype: 'button',
             					itemId:'deleteItemIdBL',
             					margin: '0 0 0 5',
             					text: ViewUtil.getLabel('remove'),
             					reference:'refBtnCompletionDeleteBL',
             					ui: 'delete-button',
             					iconCls: 'x-fa fa-minus',
    							hidden: true,
             					listeners: {
             						click: 'onRemoveCompletionBL'
             					}
             				},{
             					xtype: 'button',
             					text: ViewUtil.getLabel('add'),
             					itemId:'createItemIdSN',
             					ui: 'create-button',
             					iconCls: 'x-fa fa-plus',
             					reference:'refBtnCompletionCreateSN',
    							hidden: true,
             					listeners: {
             						click: 'onAddCompletionSN'
             					}
             				},{
             					xtype: 'button',
             					itemId:'deleteItemIdSN',
             					margin: '0 0 0 5',
             					text: ViewUtil.getLabel('remove'),
             					reference:'refBtnCompletionDeleteSN',
             					ui: 'delete-button',
             					iconCls: 'x-fa fa-minus',
    							hidden: true,
             					listeners: {
             						click: 'onRemoveCompletionSN'
             					}
             				}]
                        },{
                        	// GRID UNIT 5th
    						xtype: 'tsb-datagrid',
    						reference: 'refSNBLCompletionGrid',
    						usePagingToolbar : false,
    						flex : 1,
    						height:110,
							margin: '0 0 0 0',
    						stateful : true,
    						stateId : '',
    						plugins: [
    							'gridexporter',
    							'gridfilters',
    							'clipboard'
    						],
    						bind: {
    							store: '{SNBLCompletionGridList}'
    						},
    						selModel: {
    							type: 'spreadsheet',
    							cellSelect: false
    						},
    						columns: {
    							defaults: {
    								style : 'text-align:center',
    								align : 'center'
    							},
    							items : GridUtil.getGridColumns('SNBLGridCompletionList')
    						}
    					},{
                            xtype: 'textfield',
                            reference: 'refNextCompletionSNNo',
                            margin: '0 0 0 0',
                            fieldLabel: ViewUtil.getLabel('nextSnNo'),
                            labelWidth: 120,
                            editable: false,
                            hidden: true,
                            bind: {
                                value: '{serviceOrderItem.comUnitNo}'
                            }
                        }]
					},{
                        xtype: 'fieldset',
                        reference: 'refCompEtcFieldset',
                        title: ViewUtil.getLabel('so_etc'),
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '5 0 0 0',
                            labelAlign: 'right',
                            labelWidth: 70
                        },
                        bind: {
                            hidden: '{serviceOrderItem.locChk === "N" && serviceOrderItem.rmkChk === "N" && serviceOrderItem.cmdtyChk === "N"}'
                        },
                        items: [{
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bind: {
                                hidden: '{!(serviceOrderItem.cmdtyChk === "Y")}'
                            },
                            items: [{
                                xtype: 'cmmcdfield',
                                reference: 'refCompCmdtCd',
                                fieldLabel: ViewUtil.getLabel('cmdtCdF'),
                                labelAlign: 'right',
                                labelWidth: 70,
                                params:{
                                    searchType: 'CMDT'
                                },
                                bind: {
                                    value: '{serviceOrderItem.comCmdtyCd}'
                                }
                            },{
                                xtype: 'textfield',
                                margin: '5 0 0 0',
                                reference: 'refCompCmdtNm',
                                labelAlign: 'right',
                                labelWidth: 70,
                                fieldLabel: ' ',
                                bind: {
                                    value: '{serviceOrderItem.comCmdtyNm}'
                                }
                            }]
                        },{
                            xtype: 'workingareamultifield',
                            reference: 'refCompLocation',
                            fieldLabel: ViewUtil.getLabel('location'),
                            bind: {
                                hidden: '{!(serviceOrderItem.locChk === "Y")}',
                                value: '{serviceOrderItem.comLocId}'
                            }
                        },{
                            xtype: 'textarea',
                            fieldLabel: ViewUtil.getLabel('rmk'),
                            bind: {
                                hidden: '{!(serviceOrderItem.rmkChk === "Y")}',
                                value: '{serviceOrderItem.comRmk}'
                            }
                        }]
                    }]
                }]
            }]
        });

        me.callParent();
    }
});
