Ext.define('MOST.view.operation.WHReconciliationHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-whreconciliationhht',

    requires: [
        'Ext.scroll.Scroller',
        'Ext.layout.overflow.Scroller',
        'MOST.view.controller.WHReconciliationController',
        'MOST.view.controller.WHReconciliationModel',
        'MOST.view.operation.WHReconciliationDetailHHT'
    ],

    controller: 'whreconciliation',
    viewModel: {
        type: 'whreconciliation'
    },
    reference: 'whreconciliationhht',
    itemId: 'whreconciliationhht',

    layout: 'fit',
    shadow: false,
    padding: 5,

    listeners: {
        //initialize: 'onTblLoad',
        painted: 'onHHTLoad',
        show: {fn: 'onCheckValidateFormPanel', args: ['ALL_PANELS']},
    },

    items: [{
        xtype: 'formpanel',
        reference: 'whRcnDetail',
        padding: 0,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        items: [{
            // Search filter
            xtype: 'container',
            reference: 'refFilterContainer',
            layout: {
                type: 'hbox',
                align: 'start'
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
                    reference: 'refWhCombo',
                    placeholder: 'Warehouse',
                    queryMode: 'local',
                    bind: {
                        store: '{whCombo}'
                    },
                    displayField: 'codeName',
                    valueField: 'code',
                    clearable: true
                },{
                    xtype: 'combobox',
                    reference: 'refSnCombo',
                    placeholder: 'SN',
                    queryMode: 'local',
                    bind: {
                        store: '{shippingNoteListCombo}',
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
                        store: '{grListCombo}',
                    },
                    displayField: 'scdNm',
                    valueField: 'scdNm',
                    clearable: true
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
                    reference: 'refCatCombo',
                    placeholder: 'Category',
                    queryMode: 'local',
                    bind: {
                        store: '{categoryCombo}'
                    },
                    displayField: 'scdNm',
                    valueField: 'scd',
                    clearable: false,
                    listeners: {
                        change: 'onCategoryChanged'
                    }
                },{
                    xtype: 'combobox',
                    reference: 'refBlCombo',
                    placeholder: 'BL',
                    queryMode: 'local',
                    bind: {
                        store: '{blListCombo}',
                    },
                    displayField: 'scdNm',
                    valueField: 'scdNm',
                    clearable: true
                }]
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
                handler: 'loadTbl',
            }, {
                xtype: 'spacer',
                width: 3
            }, {
                xtype: 'button',
                reference: 'refBtnReconcile',
                text: 'Reconcile',
                flex: 1,
                ui: 'create-button-modern',
                handler: 'onHHTReconcileClicked'
            }]
        }, {
            xtype: 'grid',
            flex: 1,
            reference: 'refWhRcnGrid',
            bind: {
                store: '{whReconcilList}',
            },
            selectable: {
                columns: false,
                rows: true,
                cells: false,
                mode: 'single',
                headerCheckbox: false,
            },
            columns: [{
                    xtype: 'rownumberer',
                    text: 'No',
                    width: 50,
                    height: 20,
                    readOnly: true,
                },{
                    text: {type: 'bundle', key: 'SNLCategory'},
                    reference: 'refCategory',
                    dataIndex: 'opeClassNm',
                    readOnly: true,
                    filter : 'string',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'jpvc'},
                    reference: 'refJPVCNo',
                    dataIndex: 'vslCallId',
                    readOnly: true,
                    filter : 'string',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'whReconcilBLSN'},
                    dataIndex: 'snBlNo',
                    filter : 'string',
                    readOnly: true,
                    width: 150
                },{
                    text: {type: 'bundle', key: 'whReconcilGRNo'},
                    reference: 'refCargoType',
                    dataIndex: 'grNo',
                    readOnly: true,
                    filter : 'string',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'whReconcilCGCond'},
                    dataIndex: 'whTpNm',
                    filter : 'string',
                    readOnly: true,
                    width: 150
                },{
                    text: {type: 'bundle', key: 'whReconcilSPCargo'},
                    dataIndex: 'spCaCoNm',
                    filter : 'string',
                    readOnly: true,
                    width: 150
                },{
                    text: {type: 'bundle', key: 'fwrAgnt'},
                    dataIndex: 'fwrAgnt',
                    filter : 'string',
                    readOnly: true,
                    width: 150
                },{
                    text: {type: 'bundle', key: 'actMt'},
                    reference: 'refGWeight',
                    dataIndex: 'wgt',
                    readOnly: true,
                    filter : 'string',
                    width: 100
                },{
                    text: {type: 'bundle', key: 'actM3'},
                    reference: 'refMeasurement',
                    dataIndex: 'msrmt',
                    readOnly: true,
                    filter : 'string',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'actQty'},
                    reference: 'refQuantity',
                    dataIndex: 'pkgQty',
                    readOnly: true,
                    filter : 'string',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'rhdlMode'},
                    reference: 'refEstArrDate',
                    dataIndex: 'rhdlYn',
                    readOnly: true,
                    filter : 'string',
                    width: 150
                },{
                    text: {type: 'bundle', key: 'whReconcilWH'},
                    dataIndex: 'locId',
                    filter : 'string',
                    readOnly: true,
                    width: 150
                },{
                    text: {type: 'bundle', key: 'whReconcilRC'},
                    dataIndex: 'rcYn',
                    filter : 'string',
                    readOnly: true,
                    width: 150
                }]
        }]
    }]
})