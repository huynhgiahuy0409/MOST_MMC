Ext.define('MOST.view.billing.ProformaInvoice', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-proformainvoice',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
    ],
    
    detailViewAlias: 'app-proformainvoicedetail',
    
	controller: 'proformainvoice',
	
	viewModel: {
		type: 'proformainvoice'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	MAIN_GRID_REF_NAME: 'refGridProformaInvoice',
	MAIN_STORE_NAME: 'proformaInvoiceList', 

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateProformaInvoiceGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		
	    		viewConfig: {
					getRowClass: function (row, index) {
						var cls = "";
				
						if(row.get("ivTp") == "C"){
							cls = "red-row";	
						} else if(row.get("ivTp") == "A"){
							cls = "blue-row";
						}
						
						return cls;
					}
				},
				selModel: {
					type: 'checkboxmodel',
					mode: 'MULTI',
					checkOnly: false,
					showHeaderCheckbox: true,
				},
				listeners: {            						
					pagingSearch: 'onSearch',
					cellclick: 'onProformaInvoiceGrid_cellClick',
					cellDblClick: 'onProformaInvoiceGrid_cellDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('ProformaInvoiceList'),
				}
			}],
			
            dockedItems:[{
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                	type: 'hbox',
                },
                defaults: {
                    margin: '5 5 0 0'
                },
   				items: [{
   					xtype: 'tbfill'
   				},{
					xtype: 'button',
					reference: 'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search', 
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					hidden: true,
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button'
				},{
					xtype: 'button',
					hidden: true,
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button'
				},{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
				}]
            },{
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right'
            	},
				items: [{
					xtype:'searchfieldset',
	       			title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex: 1,
			        layout: {
			        	type: 'vbox',
			        	align: 'stretch'
                    },
       				defaults:{
						margin: '0 0 5 0'
					},
					items: [{ //row 1
						xtype: 'container',
						flex: 1,
						defaults: {
                    		labelAlign: 'right',
	                        margin: '0 0 0 0',
	                        editable: false
						},
						layout: {
                        	type: 'hbox',
                        	align: 'stretch'
						},                                 
						items: [{
                            xtype: 'combobox',
                            reference: 'refCboInvoiceType',
                            fieldLabel: ViewUtil.getLabel('proformaInvoiceSearchFilter'),
                            bind: {
                            	store: '{invoiceTypeCombo}',
            	    			value: '{theSearch.invoiceType}'
            	    		},
            	    		queryMode: 'local',
           					displayField: 'scdNm',
           					valueField: 'scd',
                            width: 300,
        			        labelWidth:80,
        			        labelAlign: 'right',
        			        hidden: true
						},{ //row 1
							xtype: 'container',
							flex: 1,
							defaults: {
								labelAlign: 'right',
								margin: '1 5 0 0',
								editable: false
							},
							layout: {
								type: 'hbox',
								pack: 'end'
							},                                 
							items: [
							{
                                xtype: 'button',
								hidden: true,
                                text: ViewUtil.getLabel('proformaInvoiceCredit'),
                                reference:'refBtnCredit',
                                iconCls: 'x-fa fa-minus',
                                ui: 'delete-button',
                                listeners: {
                                    click: 'createCredit'
                                }
							},{
            					xtype: 'button',
            					hidden: true,
            					reference: 'refBtnAdditional',
            					text: ViewUtil.getLabel('proformaInvoiceAdditional'),
            					iconCls: 'x-fa fa-plus',
            					style: 'background-color:#9900ff;color:red;',
            					listeners: {
            						click: 'createAdditional'                    						
            					}
            				}]
                     	}]
            		},{ //row 2
                        xtype: 'container',
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            labelWidth: 80,
	                        margin: '0 5 0 0',
	                        editable: false
                        },
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'vesselcalllistfield',
                            width: 350,
                            reference: 'ctlVslCallId',
                            fieldLabel:ViewUtil.getLabel('vessel'),
                            labelAlign: 'right',
                            labelWidth: 80,
           					change: function(field, newValue){
           						field.setValue(newValue.toUpperCase());
           						startGetJpvc();
           					},
                        },{
                            xtype: 'textfield',
                            width: 460,
                            labelWidth: 200,
                            reference: 'refTxtProformaIvNo',
                            fieldLabel: ViewUtil.getLabel('ivNo'),   
                            bind:'{theSearch.ivNo}', 
                            editable:true, 
                            listeners:{
								change: 'onUpperCase'
							},
                        }, {
							xtype: 'container',
							flex: 1,
							defaults: {
								labelAlign: 'right',
								labelWidth: 100,
								margin: '0 5 0 0',
								editable: false
							},
							layout: {
								type: 'hbox',
								pack: 'end'
							},
							items: [
								{
									xtype: 'button',
									text: ViewUtil.getLabel('proformaInvoiceProforma'),
									reference:'refBtnProforma',
									iconCls: 'fa fa-money',
									cls: 'search-button',
									width: 125,
									listeners: {
										click: 'createProforma'
									}
								},
							]
						},
						]
                    },{ //row3  
                        xtype: 'container',
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            margin: '0 5 0 0',
	                        editable: true
                        },
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },	                               
                        items: [{
                            xtype: 'datefield',
                            width: 220,
                            labelWidth: 80,
                            reference: 'refDtFrom',
                            fieldLabel: ViewUtil.getLabel('proformaInvoiceDate'),
                            format: MOST.config.Locale.getShortDate()
                        },{
                            xtype: 'datefield',			                       
                            reference: 'refDtTo',
                            anchor: '100%',
                            width: 125,
                            format: MOST.config.Locale.getShortDate()
                     	},
						{
							xtype: 'container',
							flex: 1,
							defaults: {
								labelAlign: 'right',
								labelWidth: 100,
								margin: '0 5 0 0',
								editable: false
							},
							layout: {
								type: 'hbox',
								pack: 'end'
							},
							items: [
								{
									xtype: 'button',
									text: ViewUtil.getLabel('proformaInvoiceCreateIv'),
									reference:'refBtnCreateIv',
									iconCls: 'fa fa-envelope',
									ui: 'delete-button',
									width: 125,
									listeners: {
										click: 'onClickCreateInvoice'
									}
								},
							]
						}
						]
                    }]
				}]
            }]
		});
		
		me.callParent();
	}
});