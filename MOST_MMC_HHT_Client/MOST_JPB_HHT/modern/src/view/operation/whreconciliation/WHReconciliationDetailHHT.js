Ext.define('MOST.view.operation.WHReconciliationDetailHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-whreconciliationdetailhht',

    requires: [
        'Ext.scroll.Scroller',
        'Ext.layout.overflow.Scroller',
        'MOST.view.controller.WHReconciliationController',
        'MOST.view.controller.WHReconciliationModel',
    ],
    reference: 'whreconciliationdetailhht',
    itemId: 'whreconciliationdetailhht',

    controller: 'whreconciliation',
    viewModel: {
        type: 'whreconciliation'
    },

    listeners: {
        painted: 'onRcnDetailLoad'
    },

    layout: 'fit',
    shadow: false,
    padding: 5,
    closeAction: 'destroy',

    items: [{
        xtype: 'formpanel',
        padding: 0,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'container',
            reference: 'refRcnForm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'fieldset',
                title: 'Selected',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'numberfield',
                    reference: 'refSelectedMt',
                    flex: 1,
                    placeholder: 'MT',
                    readOnly: true,
                    bind: {
                        value: '{selectedReconcileDetailData.wgt}'
                    }
                }, {
                    xtype: 'spacer',
                    width: 3
                }, {
                    xtype: 'numberfield',
                    reference: 'refSelectedM3',
                    flex: 1,
                    placeholder: 'M3',
                    readOnly: true,
                    bind: {
                        value: '{selectedReconcileDetailData.msrmt}'
                    }

                }, {
                    xtype: 'spacer',
                    width: 3
                }, {
                    xtype: 'numberfield',
                    reference: 'refSelectedQty',
                    flex: 1,
                    placeholder: 'QTY',
                    readOnly: true,
                    bind: {
                        value: '{selectedReconcileDetailData.pkgQty}'
                    }
                }, {
                    xtype: 'spacer',
                    width: 3
                }, {
                    xtype: 'textfield',
                    reference: 'refSelectedCond',
                    flex: 1,
                    placeholder: 'Condition',
                    readOnly: true,
                    bind: {
                        value: '{selectedReconcileDetailData.whTpNm}'
                    }
                }]
            }]
        }, {
            xtype: 'fieldset',
            reference: 'refReconForm',
            title: 'Reconcile',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'numberfield',
                reference: 'refAmendMt',
                flex: 1,
                placeholder: 'MT',
                minValue: 0,
                required: true,
                listeners: {
                    change: 'onNumberFieldChange'
                },
                bind: {
                    value: '{selectedReconcileDetailData.amdWgt}',
                }
            }, {
                xtype: 'spacer',
                width: 3
            }, {
                xtype: 'numberfield',
                reference: 'refAmendM3',
                flex: 1,
                placeholder: 'M3',
                minValue: 0,
                required: true,
                listeners: {
                    change: 'onNumberFieldChange'
                },
                bind: {
                    value: '{selectedReconcileDetailData.amdMsrmt}',
                }
            }, {
                xtype: 'spacer',
                width: 3
            }, {
                xtype: 'numberfield',
                reference: 'refAmendQty',
                minValue: 0,
                required: true,
                flex: 1,
                placeholder: 'QTY',
                listeners: {
                    change: 'onNumberFieldChange'
                },
                bind: {
                    value: '{selectedReconcileDetailData.amdPkgQty}',
                }
            }, {
                xtype: 'spacer',
                width: 3
            }, {
                xtype: 'combobox',
                reference: 'refAmendCond',
                flex: 1,
                clearable: false,
                placeholder: 'Condition',
                queryMode: 'local',
                bind: {
                    store: '{cargoReconilCondCombo}',
                    value: '{selectedReconcileDetailData.rcCoCd}'
                },
                displayField: 'scdNm',
                valueField: 'scd'

            }]
        }, {
            xtype: 'datetimelocalfield',
            reference: 'refRcDt',
            label: 'Reconcile date',
            required: true,
            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y H:i'
        }, {
            xtype: 'fieldset',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'button',
                text: 'Clear',
                reference: 'refBtnClear',
                flex: 1,
                ui: 'clear-button-modern',
                handler: 'initAmendValues'
            }, {
                xtype: 'spacer',
                width: 3
            }, {
                xtype: 'button',
                reference: 'refBtnReconcileDetail',
                text: 'Reconcile',
                flex: 1,
                ui: 'create-button-modern',
                handler: 'onHHTDetailReconcileClicked'
            }]
        }, {//girld
            xtype: 'grid',
            reference: 'refWhRcnDtlGrid',
            flex: 1,
            bind: {
                store: '{whReconcilDetailGrid}'
            },
            listeners: {
                select: 'onWhRcnDtlTblSelect'
            },
            selectable: {
                columns: false,
                rows: true,
                cells: false,
                mode: 'single',
                headerCheckbox: false,
            },
            columns: [{
                text: {type: 'bundle', key: 'whReconcilWH'},
                dataIndex: 'locId',
                filter : 'string',
                width: 150
            },{
                text: {type: 'bundle', key: 'whReconcilBLSN'},
                dataIndex: 'cgNo',
                filter : 'string',
                width: 150
            },{
                text: {type: 'bundle', key: 'whReconcilCGCond'},
                dataIndex: 'whTpNm',
                filter : 'string',
                width: 150
            },{
                text: {type: 'bundle', key: 'whReconcilRCCond'},
                dataIndex: 'rcCoCd',
                filter : 'string',
                width: 150
            },{
                text: {type: 'bundle', key: 'whReconcilAmdMt'},
                dataIndex: 'wgt',
                filter : 'string',
                width: 150
            },{
                text: {type: 'bundle', key: 'whReconcilAmdM3'},
                dataIndex: 'msrmt',
                filter : 'string',
                width: 150
            },{
                text: {type: 'bundle', key: 'whReconcilAmdQty'},
                dataIndex: 'pkgQty',
                filter : 'string',
                width: 150
            }]
        }]
    }]
});
