Ext.define('MOST.view.operation.GatePassHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-gatepasshht',

    requires: [
        'Ext.scroll.Scroller',
        'Ext.layout.overflow.Scroller',
        'MOST.view.controller.GatePassDetailController',
        'MOST.view.controller.GatePassDetailModel',
    ],

    controller: 'gatepasslist',
    viewModel: {
        type: 'gatepasslist'
    },
    reference: 'gatepasshht',
    itemId: 'gatepasshht',

    layout: 'fit',
    shadow: false,
    padding: 5,

    listeners: {
        painted: 'onGatePassHHTLoad',
        show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']},
    },

    items: [{
        xtype: 'formpanel',
        reference: 'refGatePassList',
        padding: 0,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'container',
            reference: 'refFilterContainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'fieldset',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'combobox',
                    reference: 'refSnCombo',
                    placeholder: 'SN',
                    queryMode: 'local',
                    bind: {
                        store: '{snCombo}',
                    },
                    displayField: 'scdNm',
                    valueField: 'scdNm',
                    clearable: true,
                    listeners: {
                        change: 'onSnNoChanged'
                    }
                },{
                    xtype: 'combobox',
                    reference: 'refGrCombo',
                    placeholder: 'GR',
                    queryMode: 'local',
                    bind: {
                        store: '{grCombo}',
                    },
                    displayField: 'scdNm',
                    valueField: 'scdNm',
                    clearable: true,
                    listeners: {
                        change: 'onGrNoChanged'
                    }
                },{
                    xtype: 'datetimelocalfield',
                    reference: 'refGatePassStDt',
                    required: false,
                    value: '2022-01-01T01:27',
                    format:  MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y H:i'
                }]

            },{
                xtype: 'fieldset',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'combobox',
                    reference: 'refBlCombo',
                    placeholder: 'BL',
                    queryMode: 'local',
                    bind: {
                        store: '{blCombo}',
                    },
                    displayField: 'scdNm',
                    valueField: 'scdNm',
                    clearable: true,
                    listeners: {
                        change: 'onBlNoChanged'
                    }
                }, {
                    xtype: 'textfield',
                    reference: 'refGPTxt',
                    placeholder: 'GP'
                },{
                    xtype: 'datetimelocalfield',
                    reference: 'refGatePassEndDt',
                    required: false,
                    format:  MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y H:i'
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: 'Print option',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                reference: 'refPrintRmk',
                placeholder: 'Remark'
            }]
        }, {
            // Control buttons
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'button',
                reference: 'refBtnRetrieve',
                flex: 1,
                text: 'Retrieve',
                ui: 'retrieve-button-modern',
                handler: 'onSearchGatePassHHT',
            }, {
                xtype: 'spacer',
                width: 3
            }, {
                xtype: 'button',
                reference: 'refBtnPrint',
                text: 'Print',
                flex: 1,
                ui: 'create-button-modern',
                handler: 'onPrintGatePassHHT'
            }]
        }, {
            xtype: 'grid',
            reference: 'refGatePassGrid',
            flex: 1,
            bind: {
                store: '{gatePassListData}'
            },
            selectable: {
                columns: false,
                rows: true,
                cells: false,
                mode: 'single',
                headerCheckbox: false,
            },
            columns:[ {
                    text: {type: 'bundle', key: 'catgNm'},
                    dataIndex: 'catgNm',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'jpvc'},
                    dataIndex: 'vslCallId',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'gatePassNoGatePass'},
                    dataIndex: 'gatePassNo',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'gpTime'},
                    dataIndex: 'gatePassIssueDt',
                    width: 160
                }, {
                    text: {type: 'bundle', key: 'lorry'},
                    dataIndex: 'lorryNo',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'noTripsGatePass'},
                    dataIndex: 'noTrips',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'wgtGatePass'},
                    xtype: 'numbercolumn',
                    align : 'right',
                    format: '0,000.000',
                    dataIndex: 'wgt',
                }, {
                    text: {type: 'bundle', key: 'msrmtGatePass'},
                    xtype: 'numbercolumn',
                    align : 'right',
                    format: '0,000.000',
                    dataIndex: 'msrmt',
                }, {
                    text: {type: 'bundle', key: 'pkgQtyGatePass'},
                    xtype: 'numbercolumn',
                    align : 'right',
                    format: '0,000',
                    dataIndex: 'pkgQty',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'cgNoGatePass'},
                    dataIndex: 'cgNo',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'rehandleGatePass'},
                    dataIndex: 'rehandle',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'delvStatGatePass'},
                    dataIndex: 'delvStat',
                    width: 110
                }, {
                    text: {type: 'bundle', key: 'tsptTpNmGatePass'},
                    dataIndex: 'tsptTpNm',
                    width: 110
                }, {
                    text:{type: 'bundle', key: 'delvTpNmGatePass'},
                    dataIndex: 'delvTpNm',
                    width: 110
                }, {
                    text:{type: 'bundle', key: 'issued'},
                    dataIndex: 'issued',
                    width: 110
                }]
        }]
    }]
})