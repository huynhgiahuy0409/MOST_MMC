Ext.define('MOST.view.operation.ServiceOrder',{
    extend: 'Ext.panel.Panel',

    alias: 'widget.app-serviceorderlist',

    requires: [
        'MOST.view.operation.ServiceOrderController',
        'MOST.view.operation.ServiceOrderModel',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel'
    ],

    controller: 'serviceorder',
    viewModel: {
        type: 'serviceorder'
    },

    detailViewAlias: 'app-serviceorderdetail',

    listeners: {
        afterrender: 'onLoad'
    },
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refServiceOrderConfGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'serviceOrderListStore',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    layout : {
        type: 'vbox',
        align: 'stretch'
    },

    SUBMIT_TYPE_SUBMIT: 'SU',
    SUBMIT_TYPE_RESUBMIT: 'RSU',
    SUBMIT_TYPE_APPROVE: 'AP',
    SUBMIT_TYPE_REJECT: 'RJ',
    SUBMIT_TYPE_CANCEL: 'CA',
    SUBMIT_TYPE_COMPLETION: 'CP',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'tsb-datagrid',
                reference: me.MAIN_GRID_REF_NAME,
                usePagingToolbar : false,
                flex: 1,
                stateful: true,
                stateId: 'stateServiceOrderConfGrid',
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
                    showHeaderCheckbox: true,
                },
                listeners: {
                    itemdblclick: 'onGridItemDoubleClick',
                    selectionchange: 'onGridItemSelect',
                    pagingSearch: 'onSearch'
                },
                columns: {
                    defaults: {
                        style: 'text-align:center',
                        align: 'center'
                    },
                    items: GridUtil.getGridColumns('ServiceOrderList')
                }
            },{
                xtype: 'panel',
                reference: 'refServiceOrderDetailPnl',
                stateId: 'stateServiceOrderDetailPnl',
                stateful: true,
                header: false,
                collapsible: true,
                collapsed: false,
                split: true,
                region: 'south',
                height: 250,
                scrollable: true,
                items: [{
                    xtype: 'fieldset',
                    margin: '5 5 5 5',
                    layout: 'fit',
                    height: '95%',
                    items: [{
                        xtype: 'component',
                        margin: '10 10 10 10',
                        bind: {
                            html: '{selectedServiceOrderItem.htmlTpl}'
                        }
                    }]
                }]
            }],

            dockedItems: [{
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                	type: 'hbox',
                },
                defaults: {
                    margin: '1 1 1 1'
                },
   				items: [{
					xtype: 'tbfill'
				},{
                    xtype: 'button',
                    itemId:'inquiryItemId',
                    reference: 'refBtnRetrieve',
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button', 
                    listeners: {
                        click: 'onSearch'
                    }
                },{
                    xtype: 'button',
                    itemId:'createItemId',
                    reference: 'refBtnCreate',
                    text: ViewUtil.getLabel('add'),
                    ui: 'create-button',
                    iconCls: 'x-fa fa-plus',
                    listeners: {
                        click: 'onAdd'
                    }
                },{
                    xtype: 'button',
                    itemId: 'deleteItemId',
                    reference: 'refBtnDelete',
                    text: ViewUtil.getLabel('remove'),
                    ui: 'delete-button',
                    iconCls: 'x-fa fa-minus',
                    listeners: {
                        click: 'onRemove'
                    }
                },{
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
				},{
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
   				xtype : 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
                items: [{
                    xtype: 'searchfieldset',
                    title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    margin: '5 5 5 0',
                    items: [{
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            pack: 'left'
                        },
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            margin: '5 5 0 0',
                            editable: false
                        },
                        items: [{
                            xtype: 'vesselcalllistfield',
                            reference:'refServiceOrderVslCallIdField',
                            fieldLabel: ViewUtil.getLabel('so_jpvc'),
                            emptyText: ViewUtil.getLabel('so_jpvc'),
                            bind: {
								value: '{theSearch.vslCallId}'
							},
                            width: 220,
                            labelWidth: 80
                        },{
                            xtype: 'combo',
                            reference: 'refShiftFilterCombo',
                            fieldLabel: ViewUtil.getLabel('so_shiftChk'),
                            bind: '{theSearch.shftId}',
                            width: 220,
                            labelWidth: 80,
                            queryMode: 'local',
                            bind: {
                                store: '{shiftFilterComboStore}'
                            },
                            displayField: 'shftNm',
                            valueField: 'shftId',
                        },{
                            xtype: 'combo',
                            reference: 'refStatFilterCombo',
                            fieldLabel: ViewUtil.getLabel('so_status'),
                            bind: '{theSearch.statCd}',
                            width: 220,
                            labelWidth: 80,
                            queryMode: 'local',
                            bind: {
                                store: '{statusFilterComboStore}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                        }]
                    },{
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            pack: 'left'
                        },
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            margin: '5 5 0 0',
                            editable: false
                        },
                        items: [{
                            xtype: 'combo',
                            reference: 'refCategory1FilterCombo',
                            fieldLabel: ViewUtil.getLabel('so_cat1'),
                            bind: '{theSearch.category1}',
                            width: 220,
                            labelWidth: 80,
                            queryMode: 'local',
                            bind: {
                                store: '{category1FilterComboStore}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            listeners: {
                                change: 'onCategoryChange'
                            }
                        },{
                            xtype: 'combo',
                            reference: 'refCategory2FilterCombo',
                            fieldLabel: ViewUtil.getLabel('so_cat2'),
                            bind: '{theSearch.category2}',
                            width: 220,
                            labelWidth: 80,
                            queryMode: 'local',
                            bind: {
                                store: '{category2FilterComboStore}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            listeners: {
                                change: 'onCategoryChange'
                            }
                        },{
                            xtype: 'combo',
                            reference: 'refCategory3FilterCombo',
                            fieldLabel: ViewUtil.getLabel('so_cat3'),
                            bind: '{theSearch.category3}',
                            width: 220,
                            labelWidth: 80,
                            queryMode: 'local',
                            displayField: 'scdNm',
                            valueField: 'scd',
                            bind: {
                                store: '{category3FilterComboStore}'
                            }
                        },{
                            xtype: 'textfield',
                            reference: 'refServiceOrderSettingAddItem',
                            hidden: true
                        }]
                    },{
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            pack: 'left'
                        },
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            margin: '5 5 0 0',
                            editable: false
                        },
                        items: [{
                            xtype: 'datefield',
                            reference:'refSvcDtFm',
                            fieldLabel: ViewUtil.getLabel('so_svcDt'),
                            format: MOST.config.Locale.getShortDate(),
                            width: 220,
                            labelWidth: 80,
                            listeners: {
                                change: 'onDateChange'
                            }
                        },{
                            xtype: 'datefield',
                            reference:'refSvcDtTo',
                            format: MOST.config.Locale.getShortDate(),
                            width: 140,
                            listeners: {
                                change: 'onDateChange'
                            }
                        },{
                            xtype: 'button',
                            text: ViewUtil.getLabel('approve'),
                            type: me.SUBMIT_TYPE_APPROVE,
                            iconCls: 'x-fa fa-check',
                            listeners: {
                                click: 'onGridProcessBtnAction'
                            }
                        },{
                            xtype: 'button',
                            text: ViewUtil.getLabel('reject'),
                            type: me.SUBMIT_TYPE_REJECT,
                            iconCls: 'x-fa fa-times',
                            listeners: {
                                click: 'onGridProcessBtnAction'
                            }
                        }]
                    }]
                }]
            }]
        });

        me.callParent();
    }
});
