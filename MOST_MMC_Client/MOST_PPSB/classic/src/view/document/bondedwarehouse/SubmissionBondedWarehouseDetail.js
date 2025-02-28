Ext.define('MOST.view.document.submissionbondedwarehouse.SubmissionoBondedWarehouseDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-submissionbondedwarehousedetail',

    requires: [
    ],

    layout: { type: 'hbox', align: 'stretch' },

    initComponent: function () {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        margin: '10 0 0 30',
                        labelAlign: 'right',
                        labelWidth: 80
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            reference: 'refFactoryChk',
                            boxLabel: ViewUtil.getLabel('bondedFactory'),
                            bind: '{bondedWarehouse.factoryChk}',
                            // inputValue: CommonConstants.YES,
                            // uncheckedValue: CommonConstants.NO,
                            listeners: {                
                                change: 'onCheckBox'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            reference: 'refImportChk',
                            boxLabel: ViewUtil.getLabel('bondedImport'),
                            bind: '{bondedWarehouse.importChk}',
                            // inputValue: CommonConstants.YES,
                            // uncheckedValue: CommonConstants.NO,
                            listeners: {
                                change: 'onCheckBox'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            reference: 'refHandlingChk',
                            boxLabel: ViewUtil.getLabel('bondedHandling'),
                            bind: '{bondedWarehouse.handlingChk}',
                            // inputValue: CommonConstants.YES,
                            // uncheckedValue: CommonConstants.NO,
                            listeners: {
                                change: 'onCheckBox'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    defaults: {
                        margin: '5 0 0 0',
                        labelAlign: 'right',
                        labelWidth: 80
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('containerNo'),
                            reference: 'refContainerNo',
                            bind: {
                                value: '{bondedWarehouse.containerNo}',
                            },
                            labelAlign: 'right',
                            labelWidth: 120,
                            maskRe: /[0-9A-Za-z]/,
                            fieldStyle: 'text-transform:uppercase',
                            maxLength: 20,
                            enforceMaxLength: true,
                            allowBlank: false,
                            listeners: {
                                change: 'onUpperCase'
                            },
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'shipcallnofield',
                                    width: 220,
                                    padding: '0 0 0 0',
                                    reference: 'ctlScn',
                                    fieldLabel: ViewUtil.getLabel('shipCallNoVsc'),
                                    bind: {
                                        value: '{bondedWarehouse.scn}',
                                    },
                                    labelWidth: 120,
                                    labelAlign: 'right',
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '0 0 0 5',
                                    flex: 1,
                                    padding: '',
                                    labelAlign: 'right',
                                    reference: 'refScnName',
                                    bind: '{bondedWarehouse.scnName}',
                                    labelWidth: 120,
                                    editable: false
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('bondedK8No'),
                            reference: 'refBondedK8No',
                            labelAlign: 'right',
                            labelWidth: 120,
                            bind: {
                                value: '{bondedWarehouse.bondedK8No}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: ViewUtil.getLabel('cargoType'),
                            reference: 'refCargoType',
                            labelAlign: 'right',
                            labelWidth: 120,
                            bind: {
                                value: ViewUtil.getLabel('bondedText')
                            },
                            editable: false,
                            readOnly: true,
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'cmmcdfield',
                                    width: 220,
                                    padding: '0 0 0 0',
                                    fieldLabel: ViewUtil.getLabel('commodityGroup'),
                                    reference: 'refCommodityGroupCode',
                                    bind: {
                                        value: '{bondedWarehouse.cmdtGroupCd}',
                                    },
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                    allowBlank: false,
                                    // params: {
                                    //     searchType: 'CMDT_GRP',
                                    //     searchCol1: '',
                                    //     extendVal: 'CSTO'
                                    // },
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '0 0 0 5',
                                    flex: 1,
                                    padding: '',
                                    labelAlign: 'right',
                                    reference: 'refCommodityGroupName',
                                    bind: '{bondedWarehouse.cmdtGroupCdNm}',
                                    labelWidth: 120,
                                    editable: false
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'cmmcdfield',
                                    width: 220,
                                    padding: '0 0 0 0',
                                    fieldLabel: ViewUtil.getLabel('commodityCode'),
                                    reference: 'refCommodityCode',
                                    bind: {
                                        value: '{bondedWarehouse.cmdtCd}',
                                        col1: '{bondedWarehouse.cmdtGroupCd}'
                                    },
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                    allowBlank: false,
                                    params: {
                                        searchType: 'CMDT',
                                        extendVal: 'CSTO'
                                    },
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '0 0 0 5',
                                    flex: 1,
                                    padding: '',
                                    labelAlign: 'right',
                                    reference: 'refCommodityName',
                                    bind: '{bondedWarehouse.cmdtCdNm}',
                                    labelWidth: 120,
                                    editable: false,
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'cmmcdfield',
                                    width: 220,
                                    padding: '0 0 0 0',
                                    fieldLabel: ViewUtil.getLabel('typeofpackages'),
                                    reference: 'refTypeofPackage',
                                    bind: { value: '{bondedWarehouse.pkgTpCd}' },
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                    allowBlank: false,
                                    params: {
                                        searchLcd: 'MT',
                                        searchDivCd: 'PKGTP',
                                        searchType: 'COMM',
                                        searchCol1: 'CSTO'
                                    },

                                },
                                {
                                    xtype: 'textfield',
                                    margin: '0 0 0 5',
                                    flex: 1,
                                    labelAlign: 'right',
                                    reference: 'refPackageName',
                                    bind: '{bondedWarehouse.pkgTpCdNm}',
                                    labelWidth: 120,
                                    editable: false,
                                }
                            ]
                        },
                    ]
                },
                {   
                    xtype: 'container',
                    // flex: 1,
                    margin: '0 0 0 0',
                    defaults: {
                        margin: '5 5 0 5',
                        labelAlign: 'right',
                        labelWidth: 120
                    },
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
                            // margin: '10 5 0 0',
                            items: [
                                {
                                    xtype: 'combobox',
                                    reference: 'ctlBlDoNoField',
                                    width: 240,
                                    fieldStyle: 'text-transform : uppercase',
                                    fieldLabel: ViewUtil.getLabel('gateoperation.bldo'),
                                    editable: true,
                                    hideTrigger: true,
                                    enableKeyEvents: true,
                                    enforceSelection: true,
                                    queryMode: 'local',
                                    bind: {
                                        value: '{bondedWarehouse.blNo}',
                                        // store: '{blDOListStore}',
                                    },
                                    displayField: 'blNo',
                                    valueField: 'blNo',
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    reference: 'ctlBtnBlDoNoField',
                                    iconCls: 'x-fa fa-search',
                                    listeners: {
                                        click: 'openBLDOPopup',
                                    },
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    reference: 'refShipperNm',
                                    readOnly: true,
                                    bind: '{bondedWarehouse.cnsneNm}',
                                    margin: '0 5 0 5',
                                    width: 270,
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'partnercdtypefield',
                                    width: 271,
                                    reference: 'refPayer',
                                    fieldLabel: ViewUtil.getLabel('payer'),
                                    bind: { value: '{bondedWarehouse.payer}' },
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                    params: {
                                        searchModule: CodeConstants.LCD_MOST
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    reference: 'refPayerNm',
                                    readOnly: true,
                                    allowBlank: false,
                                    bind: '{bondedWarehouse.payerNm}',
                                    margin: '0 5 0 5',
                                    width: 270,
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                    width: 240,
                                    fieldLabel: ViewUtil.getLabel('accountno'),
                                    reference: 'refAccountNo',
                                    readOnly: true,
                                    bind: {
                                        value: '{bondedWarehouse.accountNo}',
                                    },
                                    editable: false,
                                    allowBlank: false
                                    
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    margin: '0 0 0 0',
                                    padding: '0 5 0 0',
                                    fieldLabel: ViewUtil.getLabel('qty'),
                                    reference: 'refQuantity',
                                    bind: '{bondedWarehouse.pkgQty}',
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                    width: 240,
                                    minValue: 0,
                                    maxValue: 999999,
                                    selectOnFocus: true,
                                    allowDecimals: false,
                                    allowBlank: true,
                                    listeners: {
                                        keyup: 'onChangeMtM3Qty',
                                        focusleave: 'onChangeMtM3Qty'
                                    },
                                    enableKeyEvents: true,
                                    hideTrigger: true,
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    margin: '0 0 0 0',
                                    padding: '0 5 0 0',
                                    fieldLabel: ViewUtil.getLabel('grossWeight'),
                                    reference: 'refGrossWgt',
                                    bind: '{bondedWarehouse.cgWgt}',
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                    width: 240,
                                    minValue: 0,
                                    maxValue: 999999.999,
                                    decimalPrecision: 3,
                                    allowDecimals: true,
                                    allowBlank: true,
                                    selectOnFocus: true,
                                    listeners: {
                                        keyup: 'onChangeMtM3Qty',
                                        focusleave: 'onChangeMtfM3Qty'
                                    },
                                    enableKeyEvents: true,
                                    hideTrigger: true,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    margin: '0 0 0 0',
                                    padding: '0 5 0 0',
                                    fieldLabel: ViewUtil.getLabel('measurement'),
                                    reference: 'refMeasurement',
                                    bind: '{bondedWarehouse.cgMsrmt}',
                                    labelAlign: 'right',
                                    labelWidth: 120,
                                    width: 240,
                                    minValue: 0,
                                    maxValue: 999999.999,
                                    decimalPrecision: 3,
                                    allowBlank: true,
                                    selectOnFocus: true,
                                    allowDecimals: true,
                                    listeners: {
                                        keyup: 'onChangeMtM3Qty',
                                        focusleave: 'onChangeMtM3Qty'
                                    },
                                    enableKeyEvents: true,
                                    hideTrigger: true,
                                    readOnly: true
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