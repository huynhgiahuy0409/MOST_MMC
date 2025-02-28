Ext.define('MOST.view.document.BondedWarehouseShippingNote', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-bondedwarehouselist',

    requires: ['Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel',
        'MOST.view.document.BondedWarehouseShippingNoteModel',
        'MOST.view.document.BondedWarehouseShippingNoteController'],

    detailViewAlias: 'app-bondedwarehousedetail',

    controller: 'bondedwarehouseshippingnote',

    viewModel: {
        type: 'bondedwarehouseshippingnote'
    },

    listeners: {
        afterrender: 'onLoad'
    },

    config: {
        shipNoteInitData: null
    },

    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_GRID_REF_NAME: 'refBondedWarehouseListGrid', // Main Grid Name 
    MAIN_STORE_NAME: 'bondedWarehouseList', // Main Store Name
    /**
     * CONSTANT END
     * =========================================================================================================================
     */

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '5 0 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tsb-datagrid',
                            reference: me.MAIN_GRID_REF_NAME,
                            flex: 1,
                            plugins: [
                                'gridexporter',
                                'gridfilters',
                                'clipboard'],
                            bind: {
                                store: '{' + me.MAIN_STORE_NAME + '}'
                            },
                            usePagingToolbar: false,
                            selModel: {
                                type: 'spreadsheet',
                                cellSelect: false
                            },
                            listeners: {
                                celldblclick: 'onDblClick',
                                pagingSearch: 'onSearch'
                            },
                            columns: {
                                defaults: {
                                    style: 'text-align:center',
                                    align: 'center'
                                },
                                items: GridUtil.getGridColumns('BWShippingNote')
                            }
                        }]
                }],
            dockedItems: [{
                xtype: 'container',
                style: { "background-color": "white" },
                layout: {
                    type: 'hbox',
                    align: 'left'
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
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button',
                    reference: 'refBtnRetrieve',
                    listeners: {
                        click: 'onSearch'
                    }

                },
                {

                    xtype: 'button',
                    itemId: 'createItemId',
                    reference: 'refBtnCreate',
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
                    reference: 'refBtnDelete',
                    text: ViewUtil.getLabel('remove'),
                    ui: 'delete-button',
                    iconCls: 'x-fa fa-minus',
                    listeners: {
                        click: 'onDelete'
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
                            args: [me.MAIN_GRID_REF_NAME, true]
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
                            args: [me.MAIN_GRID_REF_NAME, false]
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
            {
                xtype: 'toolbar',
                enableOverflow: true,
                padding: '0 0 0 0',
                defaults: {
                    labelAlign: 'right',
                },
                items: [
                    {
                        xtype: 'searchfieldset',
                        title: ViewUtil.getLabel('search'),
                        autoScroll: true,
                        collapsible: true,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            // margin: '0 0 5 0'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'container',
                                flex: 1,
                                defaults: {
                                    // margin: '0 1 0 0',
                                    labelAlign: 'right'
                                },
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        reference: 'refBondedK8',
                                        xtype: 'textfield',
                                        selectOnFocus: true,
                                        fieldLabel: ViewUtil.getLabel('bondedK8'),
                                        bind: '{theSearch.bondedK8}',
                                        listeners: {
                                            change: 'onUpperCase'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox'
                                        },
                                        items: [
                                            {
                                                xtype: 'datefield',
                                                reference: 'refDocDateFrom',
                                                altFormats: 'dmY',
                                                width: 190,
                                                margin: '0 0 0 45',
                                                fieldLabel: ViewUtil.getLabel('docDate'),
                                                format: MOST.config.Locale.getShortDate(),
                                                labelAlign: 'right',
                                                labelWidth: 50,
                                                listeners: {
                                                    blur: 'onDateChange'
                                                },
                                                bind: {
                                                    value: '{theSearch.docDateFrom}'
                                                }
                                            },
                                            {
                                                xtype: 'datefield',
                                                reference: 'refDocDateTo',
                                                altFormats: 'dmY',
                                                margin: '0 60 0 5',
                                                width: 135,
                                                format: MOST.config.Locale.getShortDate(),
                                                fieldLabel: '',
                                                listeners: {
                                                    blur: 'onDateChange'
                                                },
                                                bind: {
                                                    value: '{theSearch.docDateTo}'
                                                },
                                            }]
                                    },
                                    {
                                        reference: 'refContainerNo',
                                        xtype: 'textfield',
                                        selectOnFocus: true,
                                        fieldLabel: ViewUtil.getLabel('containerNo'),
                                        bind: '{theSearch.containerNo}',
                                        listeners: {
                                            change: 'onUpperCase'
                                        }
                                    },

                                ]
                            },

                        ]
                    }],
            },
            {
                xtype: 'toolbar',
                enableOverflow: true,
                defaults: {
                    labelAlign: 'right'
                },
                dock: 'bottom',
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '5 5 5 0',
                        defaults: {
                            margin: '5 5 5 5',
                            labelAlign: 'right',
                            labelWidth: 100
                        },
                        flex: 1,
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                reference: 'refTotalQty',
                                readOnly: true,
                                flex: 1,
                                fieldLabel: ViewUtil.getLabel('qty'),
                                bind: '{theCalc.docQtyTotal}'
                            },
                            {
                                xtype: 'textfield',
                                reference: 'refTotalMt',
                                readOnly: true,
                                flex: 1,
                                fieldLabel: ViewUtil.getLabel('mt'),
                                bind: '{theCalc.docMtTotal}'
                            },
                            {
                                xtype: 'textfield',
                                reference: 'refTotalM3',
                                readOnly: true,
                                flex: 1,
                                fieldLabel: ViewUtil.getLabel('m3'),
                                bind: '{theCalc.docM3Total}'
                            },
                            {
                                xtype: 'container',
                                flex: 1
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
