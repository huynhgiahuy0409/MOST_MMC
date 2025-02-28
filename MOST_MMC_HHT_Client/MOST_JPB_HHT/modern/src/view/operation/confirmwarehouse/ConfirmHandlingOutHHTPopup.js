Ext.define('MOST.view.operation.cmcofwarehouse.ConfirmHandlingOutHHTPopup', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-confirmhandlingOutHHT',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'MOST.view.operation.ConfirmHandlingOutHHTPopupController',
        'MOST.view.operation.CargoHandlingOutModel',
        'MOST.view.popup.WHCheckerUnSetPopupHHT',
        'MOST.view.common.DateTimeLocalField'
    ],

    controller: 'confirmhandlingouthhtpopup',
    viewModel: {
        type: 'cargohandlingout'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        margin: '0 2 0 2',
    },
    shadow: true,
    padding: 0,
    minWidth: CommonConstants.HHT_MIN_WIDTH,
    maxWidth: 1300,
    minHeight: 600,
    listeners: {
        painted: 'onLoadHHT'
    },
    closeAction: 'destroy',
    items: [
        {// Form HandlingOut:
            xtype: 'formpanel',
            reference: 'refValidateHOForm',
            padding: 0,
            margin: '5 0 0 0',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {// Row1 BL/cg type/ customs
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left',
                        labelTextAlign: 'right',
                        labelWidth: 90,
                        margin: '0 5 0 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            label: { type: 'bundle', key: 'confirmHandlingOutBlGr' },
                            bind: '{theDetail.cgNo}',
                            readOnly: true,
                        },
                        {
                            xtype: 'combobox',
                            flex: 1,
                            reference: 'refShiftgPositionCbx',
                            queryMode: 'local',
                            bind: {
                                store: '{confirmHandlingOutForCargoTypeCombo}',
                                value: '{theDetail.cgTpCd}'
                            },
                            displayField: 'scdNm',
                            valueField: 'scd',
                            disabled: true,
                            label: { type: 'bundle', key: 'confirmDischargingCgTp' }
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            label: { type: 'bundle', key: 'confirmLoadingClearance' },
                            labelAlign: 'left',
                            bind: '{theDetail.custMode}',
                            readOnly: true
                        }
                    ]
                },
                {//Row2: Pakage
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left',
                        labelTextAlign: 'right',
                        labelWidth: 90,
                        margin: '0 5 0 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            reference: 'refTxtPkgNo',
                            label: { type: 'bundle', key: 'confirmLoadingPackageNo' },
                            bind: {
                                value: '{theDetail.pkgNo}'
                            },
                            editable: false,
                            listeners: {
                                change: function (field, newValue) {
                                    field.setValue(newValue.toUpperCase());
                                },
                            },
                            triggers: {
                                someField: {
                                    iconCls: 'x-fa fa-search',
                                    ui: 'retrieve-button-modern',
                                    scope: 'controller',
                                    handler: 'onOpenPackageNoPopup'
                                }
                            },
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            reference: 'refTxtCfmDischargingPkgTp',
                            label: { type: 'bundle', key: 'hht_pkg_tp' },
                            bind: {
                                value: '{theDetail.rePkgTpCd}'
                            },
                            editable: false,
                            triggers: {
                                someField: {
                                    iconCls: 'x-fa fa-search',
                                    ui: 'retrieve-button-modern',
                                    scope: 'controller',
                                    handler: 'onSearchpktpPopupHHT'
                                }
                            }
                        }

                    ]
                },
                {//Row3: Start End Time
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left',
                        labelTextAlign: 'right',
                        labelWidth: 90,
                        margin: '0 5 0 0'
                    },
                    items: [
                        {
                            xtype: 'datetimelocalfield',
                            label: '',
                            reference: 'HandlingOutHHTSDt',
                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            clearable: false,
                            disabled: false,
                            required: true,
                            flex: 1,
                            label: { type: 'bundle', key: 'startTime' }
                        },
                        {
                            xtype: 'datetimelocalfield',
                            reference: 'HandlingOutHHTEDt',
                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            clearable: false,
                            flex: 1,
                            label: { type: 'bundle', key: 'endTime' },
                            required: false,
                            readOnly: true,
                        }
                    ]
                },
                {//Row4: Remarks
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left',
                        labelTextAlign: 'right',
                        labelWidth: 90,
                        margin: '0 5 0 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            reference: 'refRemarkHHTTextField',
                            ui: 'field-inputtextmodern',
                            maxLength: 100,
                            label: { type: 'bundle', key: 'rmk' }
                        }
                    ]
                },
                {//Row5: Truck
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left',
                        labelTextAlign: 'right',
                        labelWidth: 90,
                        margin: '0 5 0 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            required: true,
                            reference: 'refTxtLorryNo',
                            flex: 1,
                            label: { type: 'bundle', key: 'confirmLoadingLorryNo' },
                            bind: {
                                value: '{theDetail.lorryNo}'
                            },
                            listeners: {
                                change: function (field, newValue) {
                                    field.setValue(newValue.toUpperCase());
                                },
                            },
                            triggers: {
                                someField: {
                                    iconCls: 'x-fa fa-search',
                                    scope: 'controller',
                                    handler: 'onOpenTruckPopup'
                                }
                            },
                        },
                        {
                            xtype: 'spacer',
                            flex: 1
                        },
                        {
                            xtype: 'checkbox',
                            labelAlign: 'right',
                            labelTextAlign: 'left',
                            reference: 'ctlChkMultipleCargoHHT',
                            bind: '{isMultiCargoCheck}',
                            checked: false,
                            label: { type: 'bundle', key: 'multipleCargo' },
                            editable: true,
                            readOnly: false,
                        }
                    ]
                },
                {//Row6: Location
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'left',
                        labelTextAlign: 'right',
                        labelWidth: 90,
                        margin: '0 5 0 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'HandlingOutUnsetLocIdHHT',
                            flex: 1,
                            ui: 'field-inputtextmodern',
                            bind: '{theDetail.locId}',
                            editable: false,
                            required: true,
                            label: { type: 'bundle', key: 'confirmLoadingLocation' },
                        },
                        {
                            xtype: 'button',
                            text: 'De-Allocation',
                            //width: 250,
                            margin: '0 0 5 5',
                            ui: 'action',
                            reference: 'refBtnSearchUnsetPopupHHT',
                            iconCls: 'x-fa fa-search',
                            handler: 'onSearchUnsetPopupHHT'

                        },
                        {
                            xtype: 'spacer',
                            width: 20
                        },
                        {
                            reference: 'handlingOutHHTChxFinal',
                            xtype: 'checkbox',
                            label: { type: 'bundle', key: 'confirmDischargingFinal' },
                            labelAlign: 'right',
                            labelTextAlign: 'left',
                            bind: '{whFnlDelvYnHHTChecked}',
                            checked: false
                        }
                    ]
                },


                {//Row Label: QTY MT M3
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '10 0 0 0',
                        labelAlign: 'center',
                        style: {
                            'text-align': 'center',
                            'font-weight': 800
                        },
                    },
                    items: [
                        {
                            xtype: 'spacer',
                            width: '90'
                        },
                        {
                            xtype: 'label',
                            html: 'QTY',
                            flex: 1
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'label',
                            html: 'MT',
                            flex: 1
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'label',
                            html: 'M3',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: false,
                    defaults: {
                        margin: '0 0 0 0',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '0 5 2 0',
                            textAlign: 'right',
                        }
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [

                        {//Doc
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    style: {
                                        'text-align': 'right',
                                        'padding-top': '6px',
                                    },
                                    width: 90,
                                    margin: '0 0 5 0',
                                    padding: '5 10 0 0',
                                    html: { type: 'bundle', key: 'confirmDischargingDoc' }
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    flex: 1,
                                    margin: '0 5 0 0',
                                    bind: '{theDetail.docQty}',
                                    minValue: 0,
                                    maxValue: 9999999999
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    flex: 1,
                                    bind: '{theDetail.docMt}',
                                    margin: '0 5 0 0',
                                    minValue: 0,
                                    maxValue: 999999999999999.999,
                                    decimalPrecision: 3
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    flex: 1,
                                    margin: '0 5 0 0',
                                    bind: '{theDetail.docM3}',
                                    minValue: 0,
                                    maxValue: 999999999999999.999,
                                    decimalPrecision: 3

                                }
                            ]
                        },
                        {//Actual
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    style: {
                                        'text-align': 'right',
                                        'padding-top': '6px',
                                    },
                                    width: 90,
                                    margin: '0 0 5 0',
                                    padding: '5 10 0 0',
                                    html: { type: 'bundle', key: 'confirmHandlingOutActual' }
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    ui: 'field-numbercolormodern',
                                    margin: '0 5 0 0',
                                    flex: 1,
                                    bind: '{theDetail.actQty}',
                                    minValue: 0,
                                    maxValue: 9999999999
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    ui: 'field-numbercolormodern',
                                    margin: '0 5 0 0',
                                    flex: 1,
                                    bind: '{theDetail.actMt}',
                                    minValue: 0,
                                    maxValue: 999999999999999.999,
                                    decimalPrecision: 3
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    ui: 'field-numbercolormodern',
                                    flex: 1,
                                    margin: '0 5 0 0',
                                    bind: '{theDetail.actM3}',
                                    minValue: 0,
                                    maxValue: 999999999999999.999,
                                    decimalPrecision: 3
                                }
                            ]
                        },
                        {//W/H Balance
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    style: {
                                        'text-align': 'right',
                                        'padding-top': '6px',
                                    },
                                    width: 90,
                                    margin: '0 0 5 0',
                                    padding: '5 10 0 0',
                                    html: 'W/H Bal'
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    ui: 'field-yellow',
                                    //minValue: 0,
                                    margin: '0 5 0 0',
                                    maxValue: 999999999,
                                    flex: 1,
                                    bind: '{theDetail.balQty}'
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    ui: 'field-yellow',
                                    //minValue: 0,
                                    maxValue: 999999999999.999,
                                    decimals: 3,
                                    flex: 1,
                                    margin: '0 5 0 0',
                                    bind: '{theDetail.balMt}'
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    ui: 'field-yellow',
                                    //minValue: 0,
                                    maxValue: 999999999999.999,
                                    decimals: 3,
                                    margin: '0 5 0 0',
                                    flex: 1,
                                    bind: '{theDetail.balM3}'
                                }
                            ]
                        },
                        {//Allowable
                            xtype: 'container',
                            hidden: true,
                            items: [
                                {
                                    xtype: 'label',
                                    style: {
                                        'text-align': 'right',
                                        'padding-top': '6px',
                                    },
                                    width: 90,
                                    margin: '0 0 5 0',
                                    padding: '5 10 0 0',
                                    html: 'Allowable Amt'
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    reference: 'ctlAllowQty',
                                    ui: 'field-numbercolormodern',
                                    minValue: 0,
                                    margin: '0 5 0 0',
                                    maxValue: 999999999,
                                    flex: 1,
                                    bind: '{theLorryDetail.allowableQtyValidation}'
                                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    reference: 'ctlAllowMt',
                                    ui: 'field-numbercolormodern',
                                    minValue: 0,
                                    maxValue: 999999999999.999,
                                    decimals: 3,
                                    flex: 1,
                                    margin: '0 5 0 0',
                                    bind: '{theLorryDetail.allowableWgtValidation}'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1
                                }
                            ]
                        },
                        {//Load
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    style: {
                                        'text-align': 'right',
                                        'padding-top': '6px',
                                    },
                                    width: 90,
                                    margin: '0 0 5 0',
                                    padding: '5 10 0 0',
                                    html: 'Load Amt'
                                },
                                {
                                    xtype: 'numberfield',
                                    reference: 'ctlLoadQty',
                                    minValue: 0,
                                    maxValue: 999999999,
                                    ui: 'fieldnumberhht',
                                    margin: '0 5 0 0',
                                    flex: 1,
                                    bind: '{theDetail.loadQty}',
                                    listeners: {
                                        change: 'onChangeQty',
                                        focusleave: 'onFocusLeaveQty'
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    reference: 'ctlLoadMt',
                                    minValue: 0,
                                    maxValue: 999999999999.999,
                                    decimals: 3,
                                    margin: '0 5 0 0',
                                    //placeholder: 'load',
                                    ui: 'fieldnumberhht',
                                    flex: 1,
                                    bind: '{theDetail.loadMt}',
                                    listeners: {
                                        change: 'onChangeMt',
                                        focusleave: 'onFocusLeaveQty'
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    reference: 'ctlLoadM3',
                                    minValue: 0,
                                    maxValue: 999999999999.999,
                                    decimals: 3,
                                    margin: '0 5 0 0',
                                    ui: 'fieldnumberhht',
                                    flex: 1,
                                    bind: '{theDetail.loadM3}',
                                    listeners: {
                                        change: 'onChangeM3'
                                    }
                                }
                            ]
                        },

                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    style: {
                        'text-align': 'right'
                    },
                    items: [
                        {
                            xtype: 'button',
                            reference: 'refsHOBtnDamage',
                            width: 150,
                            html: { type: 'bundle', key: 'confirmLoadingDamage' },
                            handler: 'onHOTabDamage',
                            ui: 'delete-button-modern',
                            margin: '0 5 0 0'
                        },
                        {
                            xtype: 'button',
                            reference: 'refsHOBtnDimension',
                            width: 150,
                            html: { type: 'bundle', key: 'confirmLoadingDimension' },
                            handler: 'onHOTabDimension',
                            ui: 'delete-button-modern'
                        }
                    ]
                },
                {// Row button Confirm Cancel
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        margin: '5 5 0 0'
                    },
                    items: [
                        {
                            xtype: 'spacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            reference: 'refBtnConfirmHOHHT',
                            text: { type: 'bundle', key: 'confirm' },
                            width: 150,
                            ui: 'action',
                            iconCls: 'x-fa fa-floppy-o',
                            handler: 'onSave'
                        },
                        {
                            xtype: 'button',
                            text: { type: 'bundle', key: 'cancel' },
                            width: 150,
                            ui: 'delete-button-modern',
                            iconCls: 'x-fa fa-times',
                            handler: 'onCancel'
                        },
                    ]
                },
            ]
        },
    ]
});
