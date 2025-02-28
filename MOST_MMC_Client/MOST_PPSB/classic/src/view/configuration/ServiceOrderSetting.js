Ext.define('MOST.view.configuration.ServiceOrderSetting',{
    extend: 'Ext.panel.Panel',

    alias: 'widget.app-serviceordersetting',

    requires: [
        'MOST.view.configuration.ServiceOrderSettingController',
        'MOST.view.configuration.ServiceOrderSettingModel',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel'
    ],

    controller: 'serviceordersetting',
    viewModel: {
        type: 'serviceordersetting'
    },

    detailViewAlias: 'app-serviceordersettingdetail',

    listeners: {
        afterrender: 'onLoad'
    },

    lblCat1: {type:'bundle', key:'soc_cat1'},
    lblCat2: {type:'bundle', key:'soc_cat2'},
    lblCat3: {type:'bundle', key:'soc_cat3'},
    lblDate1Chk: {type:'bundle', key:'soc_date1Chk'},
    lblDate2Chk: {type:'bundle', key:'soc_date2Chk'},
    lblShiftChk: {type:'bundle', key:'soc_shiftChk'},
    lblUnit1Chk: {type:'bundle', key:'soc_unit1Chk'},
    lblUnit2Chk: {type:'bundle', key:'soc_unit2Chk'},
    lblProcessType: {type:'bundle', key:'soc_processType'},
    lblPaymentMethod: {type:'bundle', key:'soc_paymentMethod'},
    lblLocationChk: {type:'bundle', key:'soc_locationChk'},
    lblRmkChk: {type:'bundle', key:'soc_rmkChk'},
    lblCmdtChk: {type:'bundle', key:'soc_cmdtChk'},

    btnRetrieve: {type:'bundle', key:'retrieve'},
    btnRefresh: {type:'bundle', key:'refresh'},
    btnAdd: {type:'bundle', key:'add'},
    btnRemove: {type:'bundle', key:'remove'},

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'grid',
                reference: 'refServiceOrderConfGrid',
                flex: 1,
                stateful: true,
                stateId: 'stateServiceOrderConfGrid',
                plugins: [
                    'gridexporter',
                    'gridfilters',
                    'clipboard'
                ],
                bind: {
                    store: '{serviceOrderSettingListStore}'
                },
                selModel: {
                    type: 'spreadsheet',
                    cellSelect: false
                },
                listeners: {
                    itemdblclick: 'onGridItemDoubleClick'
                },
                columns: {
                    defaults: {
                        style: 'text-align:center',
                        align: 'center'
                    },
                    items: [{
                        header: me.lblCat1,
                        dataIndex: 'category1Nm',
                        filter: 'string',
                        width: 150,
                    },{
                        header: me.lblCat2,
                        dataIndex: 'category2Nm',
                        filter: 'string',
                        width: 150,
                    },{
                        header: me.lblCat3,
                        dataIndex: 'category3Nm',
                        filter: 'string',
                        width: 150,
                    },{
                        header: me.lblDate1Chk,
                        xtype: 'actioncolumn',
                        dataIndex: 'dt1Chk',
                        filter: 'string',
                        width: 80,
                        items: [{
                            getClass: function (value, meta, record) {
                                return record.get(meta.column.dataIndex) === 'Y' ? 'x-fa fa-check txt_red' : '';
                            }
                        }]
                    },{
                        header: me.lblDate2Chk,
                        xtype: 'actioncolumn',
                        dataIndex: 'dt2Chk',
                        filter: 'string',
                        width: 80,
                        items: [{
                            getClass: function (value, meta, record) {
                                return record.get(meta.column.dataIndex) === 'Y' ? 'x-fa fa-check txt_red' : '';
                            }
                        }]
                    },{
                        header: me.lblShiftChk,
                        xtype: 'actioncolumn',
                        dataIndex: 'shftChk',
                        filter: 'string',
                        width: 80,
                        items: [{
                            getClass: function (value, meta, record) {
                                return record.get(meta.column.dataIndex) === 'Y' ? 'x-fa fa-check txt_red' : '';
                            }
                        }]
                    },{
                        header: me.lblUnit1Chk,
                        xtype: 'actioncolumn',
                        dataIndex: 'unit1Chk',
                        filter: 'string',
                        width: 80,
                        items: [{
                            getClass: function (value, meta, record) {
                                return record.get(meta.column.dataIndex) === 'Y' ? 'x-fa fa-check txt_red' : '';
                            }
                        }]
                    },{
                        header: me.lblUnit2Chk,
                        xtype: 'actioncolumn',
                        dataIndex: 'unit2Chk',
                        filter: 'string',
                        width: 80,
                        items: [{
                            getClass: function (value, meta, record) {
                                return record.get(meta.column.dataIndex) === 'Y' ? 'x-fa fa-check txt_red' : '';
                            }
                        }]
                    },{
                        header: me.lblPaymentMethod,
                        dataIndex: 'payTpNm',
                        filter: 'string',
                        width: 150,
                    },{
                        header: me.lblProcessType,
                        dataIndex: 'prcTpNm',
                        filter: 'string',
                        width: 150,
                    },{
                        header: me.lblLocationChk,
                        xtype: 'actioncolumn',
                        dataIndex: 'locChk',
                        filter: 'string',
                        width: 80,
                        items: [{
                            getClass: function (value, meta, record) {
                                return record.get(meta.column.dataIndex) === 'Y' ? 'x-fa fa-check txt_red' : '';
                            }
                        }]
                    },{
                        header: me.lblRmkChk,
                        xtype: 'actioncolumn',
                        dataIndex: 'rmkChk',
                        filter: 'string',
                        width: 80,
                        items: [{
                            getClass: function (value, meta, record) {
                                return record.get(meta.column.dataIndex) === 'Y' ? 'x-fa fa-check txt_red' : '';
                            }
                        }]
                    },{
                        header: me.lblCmdtChk,
                        xtype: 'actioncolumn',
                        dataIndex: 'cmdtyChk',
                        filter: 'string',
                        width: 80,
                        items: [{
                            getClass: function (value, meta, record) {
                                return record.get(meta.column.dataIndex) === 'Y' ? 'x-fa fa-check txt_red' : '';
                            }
                        }]
                    }]
                }
            }],

            dockedItems: [{
                xtype: 'container',
                style: {
                	"background-color": "white"
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'container',
                    style: {
                    	"background-color": "white"
                    },
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
                        reference: 'refBtnRetrieve',
                        text: ViewUtil.getLabel('search'),
                        iconCls: 'x-fa fa-search',
                        cls: 'search-button',
                        listeners: {
                            click: 'onSearch'
                        }
                    },{
                    	xtype: 'button',
                    	reference:'refBtnCreate',
                    	text: ViewUtil.getLabel('add'),
    					iconCls: 'x-fa fa-plus',
    					ui: 'create-button',
    					listeners: {
    						click: 'onAdd'
    					}
                    }]
                },{
                    xtype: 'fieldset',
                    margin: '5 5 5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'right',
                        margin: '1 1 1 1',
                        editable: false
                    },
                    items: [{
                        xtype: 'combo',
                        reference: 'refCategory1FilterCombo',
                        fieldLabel: me.lblCat1,
                        width: 220,
                        labelWidth: 80,
                        queryMode: 'local',
                        bind: {
                            store: '{category1ComboStore}'
                        },
                        displayField: 'scdNm',
                        valueField: 'scd',
                        value : '',
                        listeners: {
                            change: 'onCategoryChange'
                        }
                    },{
                        xtype: 'combo',
                        reference: 'refCategory2FilterCombo',
                        fieldLabel: me.lblCat2,
                        width: 220,
                        labelWidth: 80,
                        queryMode: 'local',
                        bind: {
                            store: '{category2ComboStore}'
                        },
                        displayField: 'scdNm',
                        valueField: 'scd',
                        emptyText: 'All',
                        value : '',
                        listeners: {
                            change: 'onCategoryChange'
                        }
                    },{
                        xtype: 'combo',
                        reference: 'refCategory3FilterCombo',
                        fieldLabel: me.lblCat3,
                        width: 220,
                        labelWidth: 80,
                        queryMode: 'local',
                        bind: {
                            store: '{category3ComboStore}'
                        },
                        displayField: 'scdNm',
                        valueField: 'scd',
                        emptyText: 'All',
                        value : '',
                    },{
                        xtype: 'combo',
                        reference: 'refPaymentMethodFilterCombo',
                        fieldLabel: me.lblPaymentMethod,
                        width: 220,
                        labelWidth: 100,
                        queryMode: 'local',
                        displayField: 'scdNm',
                        valueField: 'scd',
                        value : '',
                        bind: {
                            store: '{paymentMethodComboStore}'
                        }
                    },{
                        xtype: 'combo',
                        reference: 'refProcessTypeFilterCombo',
                        fieldLabel: me.lblProcessType,
                        width: 200,
                        labelWidth: 80,
                        queryMode: 'local',
                        bind: {
                            store: '{processTypeComboStore}'
                        },
                        displayField: 'scdNm',
                        valueField: 'scd',
                        value : '',
                        listeners: {
                            change: 'onFilterProcessTypeChanged'
                        }
                    },{
                        xtype: 'textfield',
                        reference: 'refProcessTypeFilterDescription',
                        width: 300,
                        bind: {
                            value: '{filterProcessType.scdDesc}'
                        },
                    }]
                }]
            }]
        });

        me.callParent();
    }
});
