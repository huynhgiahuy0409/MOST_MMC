Ext.define('MOST.view.document.DeliveryOrderOfVehicle', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-rorodeliveryorder',

    requires: [
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel',
        'MOST.view.document.DeliveryOrderOfVehicleController',
        'MOST.view.document.DeliveryOrderOfVehicleModel'
    ],

    controller: 'deliveryOrderOfVehicle',

    viewModel: {
        type: 'deliveryOrderOfVehicle'
    },

    listeners: {
        afterrender: 'onLoad'
    },
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_GRID_REF_NAME: 'refDeliveryOrderOfVehicleGrid',
    MAIN_STORE_NAME: 'listOfDeliveryOrderOfVehicle',
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
            xtype: 'container',
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
                            xtype: 'tsb-datagrid',
                            reference: me.MAIN_GRID_REF_NAME,
                            flex: 1,
                            height: 150,
                            margin: '0 5 5 0',
                            stateful: true,
                            stateId: '',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                            },
                            plugins: [
                                'gridfilters',
                                'clipboard'
                            ],
                            bind: {
                                store: '{' + me.MAIN_STORE_NAME + '}'
                            },
                            selModel: {
                                type: 'spreadsheet',
                                cellSelect: false
                            },
                            listeners: {
                                cellClick: 'onCellClick',
                                pagingSearch: 'onSearch'
                            },
                            columns: {
                                defaults: {
                                    style: 'text-align:center',
                                    align: 'center'
                                },
                                items: GridUtil.getGridColumns('DeliveryOrderOfVehicle')
                            }
                        }
                    ]
                },
//                {
//                    xtype: 'fieldset',
//                    layout: {
//                        type: 'hbox',
//                        align: 'stretch'
//                    },
//                    margin: '5 5 5 5',
//                    defaults: {
//                        margin: '5 5 5 5',
//                        pack: 'center'
//                    },
//                    items: [
//                        {
//                            xtype: 'numberfield',
//                            reference: 'ctlQty',
//                            maskRe: /[0-9.]/,
//                            margin: '10 0 15 0',
//                            minValue: 0,
//                            maxValue: 999999999999999.999,
//                            labelWidth: 70,
//                            width: 220,
//                            labelAlign: 'right',
//                            fieldLabel: ViewUtil.getLabel('qty'),
//                            bind: '{theSubDO.nosOfVin}'
//                        },
//                        {
//                            xtype: 'datetimefield',
//                            reference: 'ctlExpectedDate',
//                            width: 300,
//                            fieldLabel: ViewUtil.getLabel('expLorryArr'),
//                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
//                            labelAlign: 'right',
//                            margin: '10 25 15 0',
//                            labelWidth: 150,
//                            listeners: {
//                                change: function(e, newValue, oldValue, eOpts )  {
//                                    var sc = this.lookupReferenceHolder();
//                                    sc.updateExpectedDate(e.lastDate);
//                                }
//                            }
//                        },
//                        {
//                            xtype: 'partnercdformultifield',
//                            fieldLabel: ViewUtil.getLabel('tsptrOrigin'),
//                            margin: '10 0 15 0',
//                            labelWidth: 120,
//                            width: 350,
//                            reference: 'ctlPartnerCodeMultiField',
//                            name: 'tsptr',
//                            bind: { value: '{theSubDO.tsptr}' },
//                            params: {
//                                searchPtyDivCd: 'TRK'
//                            },
//                            editableControl: true,
//                        },
//                        {
//                            xtype: 'button',
//                            margin: '10 5 10 45',
//                            width: 170,
//                            reference: 'ctlAssinTrans',
//                            text: 'Assign',
//                            listeners: {
//                                click: 'openAssignDriversAndTruckForVehiclePopup'
//                            }
//                        }
//                    ]
//                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    items: [
                        {
                            xtype: 'tsb-datagrid',
                            reference: 'refSubDeliveryOrderOfVehicle',
                            flex: 1,
                            height: 150,
                            margin: '0 5 5 0',
                            stateful: true,
                            stateId: '',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                            },
                            plugins: [
                                'gridfilters',
                                'clipboard'
                            ],
                            bind: {
                                store: '{listOfSubDeliveryOrderOfVehicle}'
                            },
                            selModel: {
                                type: 'spreadsheet',
                                cellSelect: false
                            },
                            listeners: {
                                cellClick: 'onSubGridCellClick',
                                pagingSearch: 'onSearch'
                            },
                            columns: {
                                defaults: {
                                    style: 'text-align:center',
                                    align: 'center'
                                },
                                items: GridUtil.getGridColumns('SubDeliveryOrderOfVehicle')
                            }
                        }
                    ]
                },
                
                {
                    xtype: 'container',
                    style: { "background-color":"white" },
                    heigh: 20,
                    margin: '5 5 5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                    	{
                            xtype: 'button',
                            reference: 'ctlAssinTrans',
                            text: 'Assign',
                            listeners: {
                                click: 'openAssignDriversAndTruckForVehiclePopup'
                            }
                        }
                    ]
                }
            ],
            dockedItems: [{//Toolbar buttons:
                xtype: 'container',
                style: { "background-color": "white" },
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
                    reference: 'refBtnRetrieve',
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button',
                    listeners: {
                        click: 'onSearch'
                    }
                },
                {
                    xtype: 'button',
                    hidden: true,
                    reference: 'refBtnCreate',
                    itemId: 'btnAdd',
                    reference: 'btnAdd',
                    text: ViewUtil.getLabel('add'),
                    iconCls: 'x-fa fa-plus',
                    listeners: {
                        click: 'onAdd'
                    }
                },
                {
                    xtype: 'button',
                    hidden: true,
                    reference: 'refBtnUpdate',
                    reference: 'btnUpdate',
                    margin: '0 0 0 5',
                    text: ViewUtil.getLabel('update'),
                    listeners: {
                        click: 'onUpdate'
                    }
                },
                {
                    xtype: 'button',
                    hidden: true,
                    reference: 'refBtnDelete',
                    itemId: 'btnDelete',
                    reference: 'btnRemove',
                    text: ViewUtil.getLabel('remove'),
                    ui: 'delete-button',
                    iconCls: 'x-fa fa-minus',
                    listeners: {
                        click: 'onRemove'
                    }
                },
                {
                    xtype: 'button',
                    hidden: true,
                    itemId: 'exportToExcelButton',
                    text: ViewUtil.getLabel('exportToExcel'),
                    iconCls: 'excel-button-image',
                    cls: 'excel-button'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    itemId: 'exportToPdfButton',
                    text: ViewUtil.getLabel('exportToPdf'),
                    iconCls: 'x-fa fa-file-pdf-o',
                    cls: 'excel-button'
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
                padding: '0 0 0 0',
                margin: '0 0 0 0',
                defaults: {
                    labelAlign: 'right',
                },
                items: [{
                    xtype: 'fieldset',
                    autoScroll: true,
                    collapsible: true,
                    margin: '5 5 5 5',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '0 0 0 0'
                    },
                    items: [{// Left: Search Condition
                        xtype: 'searchfieldset',
                        title: ViewUtil.getLabel('search'),
                        defaults: {
                            labelAlign: 'right',
                            labelWidth: 60,
                            margin: '5 5 0 0'
                        },
                        layout: {
                            type: 'vbox',
                        },
                        items: [
                            {
                                xtype: 'vesselcalllistfield',
                                reference: 'ctlVslCallId',
                                fieldLabel: ViewUtil.getLabel('vessel'),
                                emptyText: ViewUtil.getLabel('vessel'),
                                allowBlank: false,
                                bind: {
                                    value: '{theSearch.vslCallId}'
                                },
                            },
                            {
                                xtype: 'combobox',
                                reference: 'ctlBlNo',
                                fieldLabel: ViewUtil.getLabel('blno'),
                                emptyText: "select",
                                bind: {
                                    store: '{blCombo}',
                                    value: '{theSearch.blNo}'
                                },
                                displayField: 'scdNm',
                                valueField: 'blNo',
                                queryMode: 'local',
                                emptyText: "select",
                                value: ''
                            }
                        ]
                    },
                    {//Right: VesselInfo:
                        xtype: 'fieldset',
                        title: ViewUtil.getLabel('vslInfo'),
                        margin: '0 5 0 5',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    margin: '4 0 0 0',
                                    labelWidth: 90
                                },
                                flex: 1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.vslCd}',
                                        fieldLabel: ViewUtil.getLabel('vesselCode'),
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.vslNm}',
                                        fieldLabel: ViewUtil.getLabel('vesselName'),
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.voyage}',
                                        fieldLabel: ViewUtil.getLabel('voyage'),
                                        readOnly: true
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    margin: '4 0 0 0',
                                    labelWidth: 90
                                },
                                flex: 1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.arrvSaId}',
                                        fieldLabel: ViewUtil.getLabel('SNLASA'),
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: ViewUtil.getLabel('eta'),
                                        bind: '{theVslInfo.eta}',
                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                        readOnly: true,
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: ViewUtil.getLabel('etd'),
                                        bind: '{theVslInfo.etd}',
                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                        readOnly: true,
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    margin: '4 0 0 0',
                                },
                                flex: 1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: ViewUtil.getLabel('berthingLoc'),
                                        bind: '{theVslInfo.berthLoc}',
                                        readOnly: true
                                    }
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