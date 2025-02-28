Ext.define('MOST.view.billing.ProformaInvoiceDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-proformainvoicedetail',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.grid.plugin.RowEditing'
	],
	
	title: {type: 'bundle', key: 'proformaInvoiceDetail'},
	width: 1300,
	height: 590,
	scrollable: true,
	
	listeners: {
		afterrender: 'onDetailLoad',
		destroy: 'onSearch'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refProformaInvoiceGenerationGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'proformaInvoiceDataItems',            // Main Store Name
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

		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 5,
				usePagingToolbar : false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				selModel: {
					type: 'checkboxmodel',
					checkOnly: false,
					showHeaderCheckbox: true
				},
				listeners : {
					celldblclick: 'onDblClick'
				},
				features: [{
					id: 'group',
					ftype: 'grouping',
					groupHeaderTpl: '<span style="color:red; font-weight:bold;">{[values.rows[0].data.groupingField]}</span>',
					hideGroupedHeader: true,
					enableGroupingMenu: false,
				    collapsible : false
				}],
				columns: {
					defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('ProformaInvoiceGenerationItems')
				},
			},
			{
	    		xtype: 'container',
	    		margin : '0 5 0 5',
	    		flex: 1,
		    	layout: {
		    		type: 'hbox',
					layout: 'stretch'
		    	},
		    	items: [{
					xtype: 'container',
					flex: 1.1,
					layout: {
						type: 'vbox',
						layout: 'stretch'
					},
					defaults:{
						labelWidth : 100,
						labelAlign: 'right',
						margin : '2 0 0 0'
					},
					items: [{
						xtype: 'combobox',
						fieldLabel: 'Collection Type', //ViewUtil.getLabel('subTotal'),
						reference: 'refCollectionType',
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						allowBlank: false,
						hidden: true,
						bind: {
							store: '{cashCollectionCombo}'
						},
						listeners: {
							select: 'onSelectCashCollection'
						}
					},
					{
						xtype: 'datefield',
						fieldLabel: 'Payment Date', //ViewUtil.getLabel('cashRequired'),
						reference: 'refPaymentDate',
						format: MOST.config.Locale.getShortDate(),
						allowBlank: false,
						hidden: true,
						value: new Date()
					}]
		    	},{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'vbox',
						layout: 'stretch'
					},
					defaults:{
						labelWidth : 120,
						// width : 250,
						labelAlign: 'right',
						margin : '2 0 0 0'
					},
					items: [{
						xtype: 'textfield',
						fieldLabel: 'Payment Ref. No', //ViewUtil.getLabel('subTotal'),
						reference: 'refPaymentRefNo',
						bind: {
							value: '{theDetail.erpPayNo}'
						},
						hidden: true,
						disabled: true
					},
					{
						xtype: 'textfield',
						fieldLabel: 'Name of Bank', //ViewUtil.getLabel('cashRequired'),
						reference: 'refBankName',
						bind: {
							value: '{theDetail.bankNm}'
						},
						hidden: true,
					}]
		    	},{
					xtype: 'container',
		    		flex: 2,
					layout: {
						type: 'vbox',
						layout: 'stretch'
					},
					defaults:{
						labelWidth : 80,
						labelAlign: 'right',
						margin : '2 0 10 0'
					},
					items: [{
						xtype: 'textareafield',
						fieldLabel: 'Remark', //ViewUtil.getLabel('subTotal'),
						reference: 'refRemark',
						bind: {
							value: '{theDetail.rmk}'
						},
						width: '100%',
						hidden: true,
						anchor: '100%'
					}]
		    	},{
		    		xtype: 'container',
		    		flex: 1,
			    	layout: {
			    		type: 'vbox',
						layout: 'stretch',
			    	},
					defaults:{
						labelWidth : 120,
						width : 250,
						labelAlign: 'right',
						margin : '5 2.5 0 0'
					},
			    	items: [{
		    			xtype: 'textfield',
		    			fieldLabel : ViewUtil.getLabel('subTotal'),
				    	reference: 'refsSubTotal',
				    	editable: false,
				    	fieldStyle: 'background-color:#60ec08;background-image:none;font-weight:bold;text-align: right;',
				    	labelStyle: 'font-weight:bold;',
		    		},{
		    			xtype: 'textfield',
		    			fieldLabel : ViewUtil.getLabel('cashRequired'),
				    	reference: 'refsCashRequired',
				    	editable: false,
				    	fieldStyle: 'background-color:#60ec08;background-image:none;font-weight:bold;text-align: right;',
				    	labelStyle: 'font-weight:bold;',
		    		}]
	    		}]
			}],
			
			dockedItems:[{
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '5 5 0 0'
				},
                items: [{
					xtype: 'tbfill'
                },
                {
 					xtype: 'button',
					text:  ViewUtil.getLabel('paymentConfirm'),
					hidden: true,
					iconCls: 'x-fa fa-check-square-o',
                    cls: 'print-button',
					reference:'btnConfirmItem',
					listeners: {
						click: 'onPayConfirm'
					}
				},
                {
 					xtype: 'button',
					text:  ViewUtil.getLabel('addItem'),
					hidden: false,
					iconCls: 'x-fa fa-plus',
                    ui: 'create-button',
					reference:'btnAddItem',
					listeners: {
						click: 'openTariffCodePopup'
					}
				},
                {
 					xtype: 'button',
					text:  ViewUtil.getLabel('calculation'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-list-ul',
					reference:'btnCalculation',
					listeners: {
						click: 'btnCalculation_clickHandler'
					}
				},
				{
					xtype: 'button',
					text:  'Settlement',
					iconCls: 'x-fa fa-list-ul', //'fa fa-balance-scale',
					cls: 'print-button',
					reference:'btnSettlement',
					listeners: {
						click: 'btnSettlement_clickHandler'
					}
				},
				{
 					xtype: 'button',
					text:  ViewUtil.getLabel('save'),
					ui: 'update-button',
					iconCls: 'x-fa fa-save',
					reference:'btnSave',
					listeners: {
						click: 'onDetailSave'
					}
				},
				{
                    xtype: 'button',
                    reference:'btnPrintReceipt',
                    text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
                    hidden: true,
                    listeners: {
 						click: 'onBtnPrintReceipt_click'
 					}
                }]			
			},{//Search Condition and Vessel information:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				margin: '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'searchfieldset',
					autoScroll: true,
					collapsible:true,
					margin: '5 5 5 5',
					flex:1,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults:{
		    			width: 300,
		    			labelAlign: 'right',
                        labelWidth: 100,
                        margin: '0 0 0 5'
		    		},
		    		items:[{
						xtype : 'container',
						flex:1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults:{
			    			width: 350,
			    			labelAlign: 'right',
	                        labelWidth: 100,
	                        margin: '0 0 5 5'
			    		},
			    		items: [{
							xtype : 'vesselcalllistfield',
							reference : 'ctlDtlVslCallId',
							fieldLabel : ViewUtil.getLabel('proformaInvoiceVslCallId'),
							allowBlank: false,
							bind : {
								value : '{theDetail.vslCallId}'
							}
						},{
							xtype : 'combo',
							width: 350,
							fieldLabel : ViewUtil.getLabel('bLNo'),
							reference : 'ctlBlNo',
							allowBlank: true,
							hidden: true,
							emptyText : ViewUtil.getLabel('bLNo'),
							bind: {
            	    			store: '{blCombo}',
								value: '{theDetail.blNo}'
            	    		},
            	    		displayField: 'blNo',
           					valueField: 'blNo',
           					queryMode: 'local',
           					value : ''
						},{
							xtype : 'combo',
							width: 350,
							fieldLabel : ViewUtil.getLabel('proformaInvoiceMaterBL'),
							reference : 'ctlMaterBL',
							allowBlank: true,
							bind: {
            	    			store: '{masterBLCombo}',
								value: '{theDetail.masterBL}'
            	    		},
            	    		listeners: {
            	    			select: 'onCtlMasterBL_ChangeEvent',
								//change: 'onCtlMasterBL_ChangeEvent'
							},
            	    		displayField: 'mfDocId',
           					valueField: 'mfDocId',
           					queryMode: 'local',
           					value : ''
						},{
							xtype : 'combo',
							width: 360,
							labelWidth: 110,
							fieldLabel : ViewUtil.getLabel('payer'),
							reference : 'ctlPayer',
							labelAlign : 'right',
							emptyText : ViewUtil.getLabel('payer'),
							bind: {
								store: '{payerCombo}',
								value: '{theDetail.payer}'
							},
							allowBlank: false,
							displayField: 'payerNm',
							valueField: 'payer',
							queryMode: 'local',
							value : ''
						},{
							xtype: 'checkboxfield',
							reference : 'ctlPrintReceipt',
							boxLabel: ViewUtil.getLabel('printReceipt'),
							checked:true,
							disabled: true,
							margin:'0 0 0 400'
						}]
					},{
						xtype : 'container',
						flex:1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults:{
			    			width: 350,
			    			labelAlign: 'right',
	                        labelWidth: 100,
	                        margin: '0 0 5 5'
			    		},
			    		items: [{
							xtype : 'combo',
							hidden: true,
							fieldLabel : ViewUtil.getLabel('SNLSNNo'),
							reference : 'ctlSNNo',
							labelAlign : 'right',
							emptyText : ViewUtil.getLabel('SNLSNNo'),
							bind: {
            	    			store: '{shippingNoteCombo}',
								value: '{theDetail.shipgNoteNo}'
            	    		},
							allowBlank: false,
            	    		displayField: 'shipgNoteNo',
           					valueField: 'shipgNoteNo',
           					queryMode: 'local',
           					value : ''
						}, {
							xtype: 'datefield',
							reference: 'ctlExpectedDt',
							fieldLabel: ViewUtil.getLabel('expectedDate'),
							format: MOST.config.Locale.getShortDate(),
							editable: true
						}, {
							xtype : 'combo',
							width: 350,
							fieldLabel : ViewUtil.getLabel('proformaInvoiceBookingNo'),
							reference : 'ctlBookingNo',
							allowBlank: true,
							bind: {
            	    			store: '{bookingNoCombo}',
								value: '{theDetail.bookingNo}'
            	    		},
            	    		listeners: {
            	    			select: 'onCtlBookingNo_ChangeEvent',
								//change: 'onCtlBookingNo_ChangeEvent'
							},
            	    		displayField: 'mfDocId',
           					valueField: 'mfDocId',
           					queryMode: 'local',
           					value : ''
						}, {
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('proformaInvoiceApplyFreeDays'),
							reference: 'ctlApplyFreeDays',
							maxLength: 3,
							maskRe: /[\d]/,
							margin: '0 0 5 5',
							labelWidth : 110,
							width: 170,
							bind: {
								disabled: '{ctlMaterBL.selection === null && ctlBookingNo.selection === null}'
							},
						}, {
								xtype: 'button',
								reference: 'ctlBtnApplyFreeDays',
								text: ViewUtil.getLabel('datagatheringdetailapplybtn'),
								margin: '0 0 5 5',
								width: 50,
								tooltip: ViewUtil.getLabel('proformaInvoiceApplyFreeDaysTooltip'),
								bind: {
									disabled: '{ctlMaterBL.selection === null && ctlBookingNo.selection === null}'
								},
								listeners: {
									click: 'onClickApplyFreeDays'
								}
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});