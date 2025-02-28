Ext.define('MOST.view.controller.InvoiceDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-invoicedetail',

    requires: [
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel'
    ],
    
    /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAIL_GRID_REF_NAME: 'refInvoiceDetailListGrid',
	DETAIL_STORE_NAME: 'invoiceListDetail',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    listeners: {
        afterrender: 'onLoadDetail',
        destroy: 'beforeclose'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    width: 1450,
    minHeight: 640,
    reference: 'invoiceDetail',
    
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
        	items: [{
                xtype: 'container',
                reference: 'refCtnVslCallId',
                layout: {
                    type: 'hbox',
                    align: 'stretch' 
                },
                items: [{
                    xtype: 'fieldset', 
                    margin: '5 0 5 5',
                    items: [{
                        xtype: 'container',
                        layout: {
                        	type : 'hbox'
                        },
                        items: [{
                            xtype: 'vesselcalllistfield',
                            fieldLabel: ViewUtil.getLabel('vslschCallId'),
                            width: 250,
                            labelWidth: 80,
                            reference: 'txtDtlVslCallId',
                            bind: {
                            	value: '{vslDetail.vslCallId}'
                            },
                            labelAlign: 'right',
                    	}]
                    }]
                },{
                    xtype: 'fieldset',
                    margin: '5 5 5 5',
                    layout: {
                        type: 'vbox'
                    },
                    flex: 1,
                    items: [{
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            labelWidth: 80,
                            width : 200
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('vesselname'),
                            reference: 'txtVslNm',
                            bind: '{vslDetail.vslNm}',
                            width : 220,
                            editable: false,
                        },{
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('SNLDSA'),
                            reference: 'txtVslSA',
                            bind: '{vslDetail.arrvSaId}',
                            editable: false,
                        },{
                        	xtype:'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            fieldLabel: ViewUtil.getLabel('atb'),
                            reference: 'txtVslAtb',
                            bind: '{vslDetail.atb}',
                            readOnly: true,
                            editable: false,
                            width : 230
                        }]
                    },{
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            labelWidth: 80,
                            width : 200
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('voyage'),
                            reference: 'txtVslVoy',
                            bind: '{vslDetail.voyage}',
                            width : 220,
                            editable: false,
                        },{
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('berthingLoc'),
                            reference: 'txtVslBerthNo',
                            bind: '{vslDetail.berthLoc}',
                            editable: false,
                        },{
                        	xtype:'datetimefield',
							format: 'd/m/Y H:i',
                            fieldLabel: ViewUtil.getLabel('atu'),
                            reference: 'txtVslAtu',
                            bind: '{vslDetail.atu}',
                            editable: false,
                            readOnly: true,
                            width : 230
                        }]
                    }]
                }] // End of first layer
            },{ // Start of second layer
                xtype: 'container',
                layout: {
                    align: 'stretch',
                    type: 'vbox'
                },
                reference: 'refCtnInvoiceInfo',
                items: [{
                    xtype: 'fieldset',
                    margin: '0 5 2 5',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                		xtype:'container',
                		layout:{
                			type :'vbox'
                		},
                		items:[{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 80,
                                margin : '2 0 0 0',
                            },
                            items: [{
                                xtype: 'combobox',
                                width: 210,
                                reference: 'ctlMasterBlNo',
                                fieldLabel: ViewUtil.getLabel('masterBlNo'),
                                flex: 1,
                                queryMode: 'local',
                                bind: {
                                    store: '{masterBlCombo}',
                                    value: '{theDetail.masterBl}'
                                },
                                displayField: 'scdNm',
                                valueField: 'mfDocId',
                                emptyText: 'Select',
                                editable: false,
                                hidden: true
                            },{
                                xtype:'textfield',
                                reference: 'txtSubBlNo',
                                width: 210,
                                fieldLabel: ViewUtil.getLabel('blno'),
                                bind: '{theDetail.blNo}',
                                readOnly: true,
                            },{
                                xtype: 'combobox',
                                width: 250,
                                reference: 'ctlBookingNo',
                                fieldLabel: ViewUtil.getLabel('bookingNo'),
                                flex: 1,
                                queryMode: 'local',
                                bind: {
                                    store: '{bookingNoCombo}',
                                    value: '{theDetail.bookingNo}'
                                },
                                displayField: 'scdNm',
                                valueField: 'mfDocId',
                                emptyText: 'Select',
                                editable: false,
                                hidden: true
                            },{
                                xtype:'textfield',
                                reference: 'txtSNNo',
                                fieldLabel: ViewUtil.getLabel('sNNo'),
                                bind: '{theDetail.snNo}',
                                readOnly: true,
                            },{
                                xtype: 'textfield',
                                width: 250,
                                fieldLabel: ViewUtil.getLabel('inNo'),
                                flex: 1,
                                reference: 'cboInvoiceNo',
                                queryMode: 'local',
                                bind: '{theDetail.ivNo}',
                                displayField: 'ivNo',
                                valueField: 'ivNo',
                                editable: false,
                                listeners: {
            						change: 'onInvoiceComboChange'
            					},
                            },{
                                xtype: 'textfield',
                                labelWidth: 110,
                                width: 250,
                                flex: 1,
                                enforceMaxLength: true,
                                maskRe: /[0-9]/,
							    maxLength : 2,
                                fieldLabel: ViewUtil.getLabel('ivProformaRatio'),
                                reference: 'ctlIvProformaRatio',
                                bind: '{theDetail.prfRatio}',
                                disabled: true
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 80,
                                margin: '2 0 0 0'
                            },
                            items: [{
                                xtype: 'combobox',
                                width: 210,
                                reference: 'cboPayer',
                                fieldLabel: ViewUtil.getLabel('inPayer'),
                                flex: 1,
                                queryMode: 'local',
                                bind: {
                                    store: '{payerCombo}',
                                    value: '{payerDetail.payer}'
                                },
                                displayField: 'payer',
                                valueField: 'payer',
                                listeners: {
                                    change: 'onSelectPayer'
                                },
                                emptyText: 'Select',
                                editable: false,
                                allowBlank: false,
                            },{
                                xtype: 'textfield',
                                width: 250,
                                fieldLabel: ViewUtil.getLabel('referenceNo'),
                                flex: 1,
                                bind: '{payerDetail.refNo}',
                                reference: 'txtRefNo',
                                editable: false,
                                hidden: true
                            },{
                                xtype: 'textfield',
                                fieldLabel: ViewUtil.getLabel('accountno'),
                                reference: 'txtAccNo',
                                bind: '{payerDetail.custCd}',
                                flex: 1,
                                editable: false
                            },{
                                xtype: 'textfield',
                                width: 250,
                                fieldLabel: ViewUtil.getLabel('name'),
                                bind: '{payerDetail.payerNm}',
                                flex: 1,
                                reference: 'txtName',
                                editable: false
                            },{
                                xtype: 'textfield',
                                width: 485,
                                fieldLabel: ViewUtil.getLabel('address'),
                                reference: 'txtAddress',
                                bind: '{payerDetail.addr}',
                                editable: false
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right',
                                margin: '2 0 0 0',
                                labelWidth: 80,
                            },
                            items: [{
                                xtype: 'combobox',
                                reference: 'cboPaymentTp',
                                fieldLabel: ViewUtil.getLabel('paymenttype'),
                                queryMode: 'local',
                                bind: {
                                    store: '{paymentCombo}',
                                    value: '{payerDetail.payTpCd}'
                                },
                                displayField: 'codeName',
                                valueField: 'code',
                                listeners: {
                                    select: 'onSelectPaymentType'
                                },
                                //allowBlank: false,
                                editable: false,
                                width: 210,
                                hidden: true,
                                emptyText: 'Please select Payment Type'
                            },{
                                xtype: 'combobox',
                                fieldLabel: ViewUtil.getLabel('inPrefix'),
                                reference: 'refCboInvoiPre',
                                width: 210,
                                flex: 1,
                                queryMode: 'local',
                                bind: {
                                    store: '{prefixDetailCombo}',
                                    value: '{payerDetail.ivPrfx}'
                                },
                                displayField: 'ivPrfx',
                                valueField: 'ivPrfx',
                                listeners: {
                                    select: 'onSelectInvoicePrefix',
                                },
                                editable: false,
                                allowBlank: false,
                            },{
                                xtype: 'combobox',
                                width: 250,
                                fieldLabel: ViewUtil.getLabel('invoiceType'),
                                reference: 'refCboInvoiceType',
                                flex: 1,
                                queryMode: 'local',
                                bind: {
                                    store: '{invoiceTypeCombo}',
                                    value: '{theDetail.ivTp}'
                                },
                                displayField: 'scdNm',
                                valueField: 'scd',
                                listeners: {
                                    select: 'onSelectInvoicePrefix',
                                },
                                editable: false,
                                //allowBlank: false,
                                hidden: true
                            },{
                                xtype: 'textfield',
                                reference: 'txtInvoiceDt',
                                editable: false,
                                bind: '{theDetail.inDate}',
                                fieldLabel: ViewUtil.getLabel('inDate')
                            },{
                                xtype: 'textfield',
                                reference: 'txtDueDate',
                                editable: false,
                                width: 250,
                                bind: '{theDetail.dueDate}',
                                fieldLabel: ViewUtil.getLabel('dueDate')
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right',
                                margin: '2 0 0 0',
                                labelWidth: 80,
                            },
                            items: [{
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                items:[{
                                    xtype: 'button',
                                    margin: '12 0 0 5',
                                    text: ViewUtil.getLabel('addItem'),
                                    iconCls: 'x-fa fa-plus',
                                    ui: 'create-button',
                                    reference: 'btnAddItem',
                                    width: 155,
                                    hidden : false,
                                    listeners: {
                                        click: 'openTariffCodePopup'
                                    }
                                },{
                                    xtype: 'button',
                                    margin: '12 0 0 5',
                                    text: ViewUtil.getLabel('createInvoice'),
                                    reference: 'btnCreateInvoice',
                                    iconCls: 'fa fa-envelope',
                                    ui: 'delete-button',
                                    width: 155,
                                    listeners: {
                                        click: 'onCreateInvoice'
                                    }
                                },{
				                    xtype: 'container',
				                    margin: '0 0 0 125',
				                    layout: {
				                        align:'stretch'
				                    },
				                    items: [{
				                        xtype: 'textfield',
				                        reference: 'refRemark',
				                        fieldLabel: ViewUtil.getLabel('remark'),
				                        labelAlign: 'right',
				                        emptyText: 'For Cancel',
				                        bind: '{theDetail.rmk}',
				                        width: 755
				                    }]
				                }]
                            }]
                        }]
                	},{
                		xtype:'container',
                		layout:{
                			type :'vbox'
                		},
                		flex: 1,
                        margin : '0 0 0 0',
                        items:[{
            				xtype: 'tsb-datagrid',
                            width : '100%',
                            flex: 1,
                            margin : '2 5 2 5',
                            reference: 'refIvUploadGrid',
                            stateful: true,
                            usePagingToolbar : false,
                            stateId: 'stateIvUploadGrid',
                            plugins: [
                                'gridexporter',
                                'gridfilters',
                                'clipboard'
                            ],
                            bind: {
                                store: '{ivDetailUpload}'
                            },
                            listeners: {
                                celldblclick: 'onIvFileDownloadDblClick'
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
                        		items: GridUtil.getGridColumns('InvoiceFileUploadGrid')
                        	}
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align:'stretch'
                            },
                            margin : '0 0 0 0',
                            items:[{
                                xtype: 'filefield',
                                padding : '0 0 0 0',
                                name: 'fileUpload',
                                reference: 'btnAddFile',
                                itemId: 'createButton',
                                id: 'ivDetailFileUpload',
                                style: 'text-align:left',
                                method: 'POST',
                                fileUpload: true,
                                margin:'2 0 0 -15',
                                enctype: 'multipart/form-data',
                                hideLabel: true,
                                buttonOnly: true,
                                multiple: true,
                                disabled: true,
                                buttonConfig: {
                                    text: ViewUtil.getLabel('addFile'),
                                    iconCls: 'x-fa fa-plus'
                                },
                                listeners: {
                                    change: 'onAddForFileUpload',
                                    afterrender: function (cmp) {
                                        cmp.fileInputEl.set({
                                            multiple: 'multiple'
                                        });
                                    }
                                }
                            },{
                                xtype: 'button',
                                margin:'2 0 0 -40',
                                text: ViewUtil.getLabel('delFile'),
                                iconCls: 'x-fa fa-minus',
                                ui: 'delete-button',
                                disabled: true,
                                reference: 'btnDelFile',
                                listeners: {
                                    click: 'onDelFile'
                                }
                            }]
                        }]
                	}]
                }]
            },{
				xtype: 'tsb-datagrid',
				reference: me.DETAIL_GRID_REF_NAME,
				flex : 1,
				usePagingToolbar : false,
				plugins : [ 
		            'gridexporter',
		            'gridfilters',
		            'clipboard' 
		        ],
				selModel : {
					type : 'spreadsheet',
					cellSelect : false
				},
				bind: {
					store: '{invoiceList}'
				},
				listeners : {
					cellClick: 'onInvoiceDetailGridClick',
					cellDblClick : 'onInvoiceDetailGridDblClick'
				},
				selModel: {
		            type: 'checkboxmodel',  
		            checkOnly: false,
		            showHeaderCheckbox: true
            	},
				columns : {
					defaults : {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('InvoiceDetail')
				}
			},{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align:'stretch'
                },
                items: [{
                    xtype: 'container',
                    flex: 0.8,
                    layout: {
                        type: 'vbox',
                        align:'stretch'
                    },
                    items: [{
                        xtype: 'fieldset',
                        margin : '0 5 5 5',
                        title: 'Total',
                        layout: 'hbox',
                        defaults:{
                            margin : '0 0 0 0',
                            labelAlign : 'right'
                        },
                        items: [{
                            xtype: 'textfield',
                            labelWidth: 110,
                            reference: 'txtAppliedAmt',
                            editable: false,
                            bind: '{theDetail.aplyAmt}',
                            fieldLabel: ViewUtil.getLabel('appliedAmt')
                        },{
                            xtype: 'textfield',
                            labelWidth: 120,
                            reference: 'txtStandAmt',
                            editable: false,
                            bind: '{theDetail.stdAmt}',
                            fieldLabel: ViewUtil.getLabel('standAmt')
                        },{
                            xtype: 'textfield',
                            labelWidth: 120,
                            editable: false,
                            reference: 'txtDiffAmt',
                            bind: '{theDetail.diffAmt}',
                            fieldLabel: ViewUtil.getLabel('difference'),
                            fieldStyle: 'color:#ff0000'
                        }]
                    },{
                        xtype: 'fieldset',
                        layout: 'hbox',
                        margin : '0 5 5 5',
                        hidden: true,
                        defaults:{
                            margin : '2 0 0 0',
                            labelAlign : 'right'
                        },
                        items: [{
                            xtype: 'combobox',
                            width: 200,
                            labelWidth: 110,
                            reference: 'refFrCurrency',
                            fieldLabel: me.lblForeignCurrency,
                            queryMode: 'local',
                            bind: {
                                store: '{currencyDetailCombo}',
                                value: '{theDetail.crcyCd}'
                            },
                            displayField: 'crcyCd',
                            valueField: 'crcyCd',
                            listeners: {
                                select: 'onSelectCurrency'
                            }
                        },{
                            xtype: 'textfield',
                            width: 200,
                            labelWidth: 100,
                            fieldLabel: me.lblExcRate,
                            reference: 'txtExchangeRate',
                            bind: '{theDetail.exRate}',
                            fieldStyle: 'color:#ff0000',
                            editable: false
                        },{
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 50,
                            reference: 'txtDate',
                            fieldLabel: me.lblDate,
                            bind: '{theDetail.date}',
                            fieldStyle: 'color:#ff0000'
                        }]
                    }]
                }]
            }],
            
		    dockedItems: [{
				xtype: 'container',
				layout: {
					align:'left',
					type: 'hbox'
				},
				defaults: {
					margin: '2 5 0 5'
				},
				items: [{
					xtype: 'tbfill'
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
					reference:'refBtnDtlRetrieve',
					listeners: {
						click: 'onSearchDetail'
					}
				},{
					xtype: 'button',
					margin: '2 5 0 0',
					text: ViewUtil.getLabel('cancel'),
					reference:'refBtnCancel',
					listeners: {
						click: 'onCancelInvoice'
					}
				}]
            }]	
        });
        
        me.callParent();
    }
});