Ext.define('MOST.view.operation.LorryListHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-lorrylisthht',

    requires: [
        'Ext.scroll.Scroller',
        'Ext.layout.overflow.Scroller',
        'MOST.view.operation.LorryListController',
        'MOST.view.operation.LorryListModel',
    ],

    controller: 'lorrylist',
    viewModel: {
        type: 'lorrylist'
    },
    reference: 'lorrylisthht',
    itemId: 'lorrylisthht',

    layout: 'fit',
    shadow: false,
    padding: 5,

    listeners: {
        painted: 'onLoad',
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
            reference: 'refEstDtmCtnr',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'datetimelocalfield',
                reference: 'ctlFromDt',
                flex: 1,
                inputType: 'date',
                required: false,
                listeners: {
                    change : 'onDateChange'
                }
            },
            {
                xtype: 'spacer',
                width: 15
            },
            {
                xtype: 'datetimelocalfield',
                reference: 'ctlToDt',
                flex: 1,
                inputType: 'date',
                required: false,
                listeners: {
                    change : 'onDateChange'
                }
            }]
        }, {
            xtype: 'container',
            reference: 'refSnBlCtnr',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                placeholder: 'SN',
                reference: 'ctlSNNo',
                flex: 1,
                required: false,
                clearable: true,
                listeners: {
                    change : 'onTextFieldChange'
                }
            },
            {
                xtype: 'spacer',
                width: 15
            },
            {
                xtype: 'textfield',
                placeholder: 'BL',
                reference: 'ctlLABLNo',
                flex: 1,
                required: false,
                clearable: true,
                listeners: {
                    change : 'onTextFieldChange'
                }
            }]
        }, {
            xtype: 'container',
            reference: 'refLryCtnr',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                placeholder: 'Lorry No',
                reference: 'ctlLorryNo',
                flex: 1,
                required: false,
                clearable: true,
                listeners: {
                    change : 'onTextFieldChange'
                }
            },
            {
                xtype: 'spacer',
                width: 15
            },
            {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    placeholder: 'Transporter',
                    reference: 'ctlTsptrOrigin',
                    clearable: true,
                    flex: 1,
                    required: false,
                    listeners: {
                        change: 'onTextFieldChange'
                    },
                    triggers: {
						someField:{
							iconCls: 'x-fa fa-search',
							scope: 'controller',
							handler: 'onTsptrBtnClicked'
						},
					},
                },
                // {
                // xtype: 'button',
                // iconCls: 'x-fa fa-search',
                // ui: 'Search',
                // handler: 'onTsptrBtnClicked'
                // }
        ]
        }]
        }, {
            xtype: 'container',
            reference: 'refLryDtlCtnr',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                placeholder: 'Driver Name',
                reference: 'ctlLADriverNm',
                clearable: true,
                flex: 1,
                required: false,
                listeners: {
                    change : 'onTextFieldChange'
                }
            },
            {
                xtype: 'spacer',
                width: 15
            },
            {
                xtype: 'textfield',
                placeholder: 'License No.',
                reference: 'ctlLicenceNo',
                clearable: true,
                flex: 1,
                required: false,
                listeners: {
                    change : 'onTextFieldChange'
                }
            }]
        }, {
            xtype: 'container',
            reference: 'refLryDtlCtnr',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'checkbox',
                label: 'No Gate-In/Out',
                reference: 'ctlNoGateIO',
                required: false,
                listeners: {
                    change: 'onNoGateIOCbChangedHHT'
                }
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
                handler: 'onSearch',
            }]
        }, {
            xtype: 'grid',
            reference: 'refGatePassGrid',
            flex: 1,
            bind: {
                store: '{lorryList}'
            },
            selectable: {
                columns: false,
                rows: true,
                cells: false,
                mode: 'single',
                headerCheckbox: false,
            },
            columns:[ {
                text: {type: 'bundle', key: 'expArrivalDt'},
                dataIndex: 'estdt',
                reference: 'refExpArrDate',
                width: 150
            },{
                text: {type: 'bundle', key: 'tsptrOrigin'},
                dataIndex: 'tsptcd',
                reference: 'refTsptrOrigin',
                width: 100
            },{
                text: {type: 'bundle', key: 'lorryNo'},
                dataIndex: 'lorryno',
                reference: 'refLorryNo',
                width: 150
            },{
                text: {type: 'bundle', key: 'LADriverNm'},
                dataIndex: 'driver',
                reference: 'refLADriverNm',
                width: 120
            },{
                text: {type: 'bundle', key: 'expireDate'},
                dataIndex: 'exprdt',
                reference: 'refExpireDate',
                width: 110
            },{
                text: {type: 'bundle', key: 'licenceNo'},
                dataIndex: 'licsno',
                reference: 'refLicenceNo',
                width: 150
            },{
                text: {type: 'bundle', key: 'gateIn'},
                dataIndex: 'gateindt',
                reference: 'refGateIn',
                width: 110
            },{
                text: {type: 'bundle', key: 'gateOut'},
                dataIndex: 'gateoutdt',
                reference: 'refGateOut',
                width: 110
            },{
                text: {type: 'bundle', key: 'LABLNo'},
                dataIndex: 'blno',
                reference: 'refLABLNo',
                width: 150
            },{
                text: {type: 'bundle', key: 'ALSnNo'},
                dataIndex: 'snno',
                reference: 'refALSnNo',
                width: 150
            },{
                text: {type: 'bundle', key: 'jPVC'},
                dataIndex: 'vslcallid',
                reference: 'refJpvc',
                width: 150
            }]
        }]
    }]
})