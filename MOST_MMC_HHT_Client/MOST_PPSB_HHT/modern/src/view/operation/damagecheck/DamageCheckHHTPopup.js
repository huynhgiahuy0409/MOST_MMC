Ext.define('MOST.view.operation.DamageCheckHHTPopup', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-damagecheckhhtpopup',

    requires: [
        'MOST.view.controller.DamageCheckHHTController'
        , 'MOST.view.controller.TheListOfDamageCheckOfGCModel'
        //    ,'MOST.view.operation.UnitNoPopupHHT'
    ],

    controller: 'damagecheckhht',
    viewModel: {
        type: 'theListOfDamageCheckOfGC'
    },

    listeners: {
        painted: 'onTblLoadDetail',
    },

    layout: 'fit',
    shadow: false,
    padding: 5,

    items: [{
        xtype: 'formpanel',
        reference: 'mainWrapper',
        padding: 0,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            { // 2nd: input Field
                xtype: 'container',
                reference: 'inputWrapper',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'container',
                    reference: 'leftInputConatiner',
                    flex: 2,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {   // Update Row GAP-001
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                flex: 1,
                                labelWidth: 100,
                                labelAlign: 'left',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'refStevedoreId',
                                    label: { type: 'bundle', key: 'hht_damagecheck_stevedoreid' },
                                    bind: {
                                        value: '{tblDamageCheckDetail.stevedoreId}',
                                    },
                                    required: true,
                                    allowBlank: false
                                },]
                        },
                        {   // 1 Row
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                flex: 1,
                                labelWidth: 100,
                                labelAlign: 'left',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    reference: 'refVslCallId',
                                    label: 'Vessel Call Id',
                                    bind: {
                                        value: '{tblDamageCheckDetail.vslCallId}',
                                    },
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'refAgentId',
                                    label: { type: 'bundle', key: 'hht_damagecheck_agentid' },
                                    bind: {
                                        value: '{tblDamageCheckDetail.agentId}',
                                    },
                                    required: true,
                                    allowBlank: false
                                },]
                        },
                        {   // 1 Row
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                xtype: 'combobox',
                                displayField: 'cdNm',
                                valueField: 'cd',
                                queryMode: 'local',
                                flex: 1,
                                labelWidth: 100,
                                labelAlign: 'left',
                                clearable: true,
                            },
                            items: [{
                                label: { type: 'bundle', key: 'hht_damagecheck_masterbl' },
                                reference: 'refDtlCboMasterBL',
                                bind: {
                                    store: '{tblDtlMasterBlComboStore}',
                                    value: '{tblDamageCheckDetail.masterBlNo}',
                                    // required: '{tblDamageCheckDetail.catgCd === "I"}'
                                },
                                listeners: {
                                    select: 'onTblSelectDetailMfDocIdCombo'
                                }
                            }, {
                                label: { type: 'bundle', key: 'hht_damagecheck_bookingno' },
                                reference: 'refDtlCboBookingNo',
                                bind: {
                                    store: '{tblDtlBookingNoComboStore}',
                                    value: '{tblDamageCheckDetail.bookingNo}',
                                    // required: '{tblDamageCheckDetail.catgCd  === "E"}'
                                },
                                listeners: {
                                    select: 'onTblSelectDetailMfDocIdCombo'
                                }
                            }]
                        }, { // 2 Row
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                xtype: 'combobox',
                                displayField: 'cdNm',
                                valueField: 'cd',
                                queryMode: 'local',
                                clearable: true,
                                flex: 1,
                                labelWidth: 100,
                                labelAlign: 'left'
                            },
                            items: [{
                                label: { type: 'bundle', key: 'hht_damagecheck_subbl' },
                                reference: 'refDtlCboSubBL',
                                bind: {
                                    store: '{tblDtlBlComboStore}',
                                    value: '{tblDamageCheckDetail.blNo}',
                                    // required: '{tblDamageCheckDetail.catgCd === "I"}'
                                },
                                listeners: {
                                    select: 'onTblSelectDetailCgNoCombo'
                                }

                            }, {
                                label: { type: 'bundle', key: 'hht_damagecheck_sn_slash' },
                                reference: 'refDtlCboSN',
                                bind: {
                                    store: '{tblDtlSnComboStore}',
                                    value: '{tblDamageCheckDetail.snNo}',
                                    // required: '{tblDamageCheckDetail.catgCd === "E"}'
                                },
                                listeners: {
                                    select: 'onTblSelectDetailCgNoCombo'
                                }
                            }]
                        }, { // 3 Row
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                clearable: true,
                                labelWidth: 100,
                                labelAlign: 'left'
                            },
                            items: [{
                                xtype: 'textfield',
                                reference: 'refTblDtlUnitNo',
                                label: 'Unit No.',
                                flex: 5,
                                editable: false,
                                bind: {
                                    value: '{tblDamageCheckDetail.unitNo}',
                                    // disabled: '{!(tblDamageCheckDetail.cgTpCd === "RCV")}',
                                    required: '{tblDamageCheckDetail.cgTpCd === "RCV"}'
                                },
                            }, {
                                xtype: 'button',
                                reference: 'refTblDetailBtnUnitNo',
                                iconCls: 'x-fa fa-search',
                                flex: 0.5,
                                hidden: true,
                                maxWidth: 49,
                                minWidth: 49,
                                handler: 'openUnitNoPopUp',
                                bind: {
                                    disabled: '{!(tblDamageCheckDetail.cgTpCd === "RCV")}',
                                },
                            }, {
                                xtype: 'textfield',
                                label: 'Commodity Grp',
                                reference: 'refTblDetailCommodityGroup',
                                flex: 5,
                                bind: {
                                    value: '{tblDamageCheckDetail.cmdtGrpCd}',
                                    hidden: '{tblDamageCheckDetail.cgTpCd === "RCV"}'
                                },
                                readOnly: true,
                            }, {
                                xtype: 'textfield',
                                label: 'Brand',
                                reference: 'refDamageCheckBrandCd',
                                flex: 5,
                                bind: {
                                    value: '{tblDamageCheckDetail.brandCd}',
                                    hidden: '{!(tblDamageCheckDetail.cgTpCd === "RCV")}'
                                },
                                readOnly: true,
                            }]
                        }, { // 4 Row
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                flex: 1,
                                labelWidth: 100,
                                labelAlign: 'left',
                                clearable: true
                            },
                            items: [{
                                xtype: 'datefield',
                                reference: 'refTblDtlCheckedDt',
                                label: 'Check Time',
                                dateFormat: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                bind: {
                                    value: '{tblDamageCheckDetail.checkedDt}'
                                },
                                // required: true,
                            }, {
                                xtype: 'textfield',
                                label: 'Commodity',
                                reference: 'refTblDetailCommodity',
                                bind: {
                                    value: '{tblDamageCheckDetail.cmdtCd}',
                                    hidden: '{tblDamageCheckDetail.cgTpCd === "RCV"}'
                                },
                                readOnly: true,
                            }, {
                                xtype: 'textfield',
                                label: 'Model',
                                reference: 'refDamageCheckModelCd',
                                bind: {
                                    value: '{tblDamageCheckDetail.modelCd}',
                                    hidden: '{!(tblDamageCheckDetail.cgTpCd === "RCV")}'
                                },
                                readOnly: true,
                            }]
                        }, { // 5 Row
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                xtype: 'label',
                                height: '100%',
                                // html: 'Check Location',
                                // style: {
                                //     'align-self': 'center'
                                // }
                                html: '<p style="width: 100px; height: 100%;vertical-align: middle;align-self: center;"> Check Location </p>',
                            }, {
                                xtype: 'formpanel',
                                flex: 1,
                                reference: 'refTblDetailLocationRadioGroup',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    xtype: 'radiofield',
                                    name: 'location',
                                    flex: 1,
                                    labelAlign: 'right',
                                    labelTextAlign: 'left',
                                    labelWidth: 100,
                                    listeners: {
                                        // change: 'onCheckLocChange'
                                    },
                                },
                                items: [{
                                    reference: 'refRdVessel',
                                    label: 'Vessel', //{type: 'bundle', key: 'handlingIn'},
                                    value: 'VSL',
                                    reference: 'refRadioVessel',
                                    bind: {
                                        checked: '{tblDamageCheckDetail.locCd === "VSL"}'
                                    }
                                }, {
                                    reference: 'refRdYard',
                                    label: 'Yard', //{type: 'bundle', key: 'handlingIn'},
                                    value: 'YARD',
                                    reference: 'refRadioYards',
                                    bind: {
                                        checked: '{tblDamageCheckDetail.locCd === "YARD"}'
                                    }
                                }, {
                                    reference: 'refRdGate',
                                    label: 'Gate', //{type: 'bundle', key: 'handlingIn'},
                                    value: 'GATE',
                                    reference: 'refRadioGate',
                                    bind: {
                                        checked: '{tblDamageCheckDetail.locCd === "GATE"}'
                                    }
                                }]
                            }]
                        }, { // 6 Row
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                xtype: 'numberfield',
                                flex: 1,
                                clearable: true,
                                minValue: 0,
                                maxValue: 999999.999,
                                ui: 'field-numbercolormodern',
                                decimals: 3,
                                margin: '0 5 2 0',
                            },
                            items: [{
                                label: 'Amt',
                                labelAlign: 'left',
                                labelWidth: 100,
                                placeholder: 'Qty',
                                tooltip: 'Qty',
                                reference: 'refDamageCheckDetailQty',
                                bind: {
                                    value: '{tblDamageCheckDetail.dmgQty}',
                                    // required: '{tblDamageCheckDetail.cgTpCd === "BBK"}'
                                },
                                listeners: {
                                    change: 'onChangeQty'
                                }
                            }, {
                                placeholder: 'MT',
                                tooltip: 'MT',
                                reference: 'refDamageCheckDetailMt',
                                bind: {
                                    value: '{tblDamageCheckDetail.dmgMt}',
                                    // required: '{tblDamageCheckDetail.cgTpCd === "DBN"}'
                                },
                            }, {
                                placeholder: 'M3',
                                tooltip: 'M3',
                                reference: 'refDamageCheckDetailM3',
                                bind: {
                                    value: '{tblDamageCheckDetail.dmgM3}'
                                },
                            }]
                        }, { // 7 Row
                            xtype: 'fieldset',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                xtype: 'combobox',
                                queryMode: 'local',
                                clearable: true,
                                flex: 1,
                                labelWidth: 100,
                                labelAlign: 'left'
                            },
                            items: [{
                                label: 'Damage Part',
                                labelWidth: 92,
                                reference: 'cboDamagePart',
                                bind: {
                                    store: '{tblDamageParts}',
                                    // required: '{tblDtlDamageCheckStore.data.length <= 0}'
                                },
                                displayField: 'cdNm',
                                valueField: 'cd',
                                // disabled: true
                            }, {
                                label: 'Damage Level',
                                reference: 'cboDamageLevel',
                                bind: {
                                    store: '{tblDamageLevels}',
                                    // required: '{tblDtlDamageCheckStore.data.length <= 0}'
                                },
                                displayField: 'cdNm',
                                valueField: 'cd',
                                // disabled: true
                            }]
                        }, { // 8 Row
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                xtype: 'combobox',
                                hidden: true,
                                queryMode: 'local',
                                clearable: true,
                                flex: 0.5,
                                labelWidth: 100,
                                labelAlign: 'left',
                                label: 'Damage Desc.',
                                reference: 'refDamageCheckDetailDesc',
                                bind: {
                                    store: '{tblDamageDesc}',
                                    value: '{tblDamageCheckDetail.dmgDesc}'
                                },
                                displayField: 'cdNm',
                                valueField: 'cd',
                                required: true
                            }, {
                                xtype: 'combobox',
                                queryMode: 'local',
                                clearable: true,
                                flex: 0.5,
                                labelWidth: 100,
                                labelAlign: 'left',
                                label: { type: 'bundle', key: 'hht_damagecheck_packageno' },
                                reference: 'refDamageCheckPackageNo',
                                bind: {
                                    store: '{pkgNoCombo}',
									value: '{tblDamageCheckDetail.pkgNo}'
                                },
                                displayField: 'pkgNo',
								valueField: 'pkgNo',
                            }]
                        }]
                }, {
                    xtype: 'container',
                    reference: 'rightInputConatiner',
                    flex: 1,
                    margin: '0 0 10 10',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        { // 1st: top Button
                            xtype: 'container',
                            reference: 'topBtnWrapper',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            defaults: {
                                xtype: 'button',
                                ui: 'create-button-modern'
                            },
                             style: {
                                    'padding': '0 0 5px 0'
                            },
                            items: [
                                {
                                    text: { type: 'bundle', key: 'hht_btn_confirm' },
                                    handler: 'onTblDetailConfirm'
                                },
                                {
                                    xtype: 'spacer',
                                    width: 3
                                },
                                {
                                    text: { type: 'bundle', key: 'hht_btn_cancel' },
                                    handler: 'onTblDetailCancel'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 4,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                xtype: 'grid',
                                flex: 1,
                                reference: 'refFileUpload',
                                bind: {
                                    store: '{uploadedFileDamageStore}'
                                },
                                columns: [{
                                    xtype: 'rownumberer',
                                    text: 'No.'
                                }, {
                                    text: 'File Name',
                                    dataIndex: 'fileName',
                                    reference: 'refFileName',
                                    flex: 1
                                }, {
                                    text: 'Size',
                                    dataIndex: 'fileSize',
                                    reference: 'refFileSize',
                                    format: "0,000",
                                }]
                            },]
                        }, {
                            xtype: 'container',
                            reference: 'fileBtnContainer',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            margin: '0 0 10 0',
                            defaults: {
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Upload',
                                    iconCls: 'x-fa fa-plus',
                                    ui: 'create-button-modern',
                                    handler: 'onAddFile',
                                },
                                {
                                    xtype: 'spacer',
                                    width: 3
                                },
                                {
                                    xtype: 'button',
                                    text: 'Delete',
                                    iconCls: 'x-fa fa-minus',
                                    ui: 'delete-button-modern',
                                    handler: 'onRemoveFile_clickHandler',
                                }]
                        }, {
                            xtype: 'container',
                            flex: 4,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                xtype: 'textareafield',
                                label: 'Remark',
                                reference: 'refDamageCheckDetailRemark',
                                labelTextAlign: 'left',
                                bind: {
                                    value: '{tblDamageCheckDetail.remark}'
                                },
                                flex: 1,
                                maxLength: 500
                            }]
                        }]
                }]
            }, {
                xtype: 'container',  // 3rd > Buttons
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                margin: '10 0 10 0',
                defaults: {
                    xtype: 'button',
                    width: 150,
                },
                items: [
                    {
                        reference: 'refBtnDamageCheckHHTPopupAdd',
                        text: 'ADD',
                        handler: 'onTblAddDetailGrid',
                        ui: 'create-button-modern',
                    },
                    {
                        xtype: 'spacer',
                        width: 3
                    },
                    {
                        reference: 'refBtnDamageCheckHHTPopupUpdate',
                        text: 'UPDATE',
                        handler: 'onTblUpdateDetailGrid',
                        ui: 'update-button-modern',
                    },
                    {
                        xtype: 'spacer',
                        width: 3
                    },
                    {
                        reference: 'refBtnDamageCheckHHTPopupDelete',
                        text: 'DELETE',
                        handler: 'onTblDeleteDetailGrid',
                        ui: 'delete-button-modern',
                    },
                    {
                        xtype: 'spacer',
                        width: 3
                    },
                    {
                        reference: 'refBtnDamageCheckHHTPopupClear',
                        text: 'CLEAR',
                        handler: 'onTblDetailClear',
                        ui: 'create-button-modern'
                    },
                    {
                        xtype: 'spacer',
                        flex: 6
                    }]
            }, { // 4th: grid
                xtype: 'container',
                scrollable: true,
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'grid',
                    reference: 'refTblGridDamageCheckDetail',
                    flex: 1,
                    bind: {
                        store: '{tblDtlDamageCheckStore}'
                    },
                    listeners: {
                        childsingletap: 'onSelectGridDamageCheckHHT'
                    },
                    columns: [{
                        xtype: 'rownumberer',
                        text: 'No.'
                    },
                    {
                        text: { type: 'bundle', key: 'cargoNo' },
                        dataIndex: 'cgNo',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'brand' },
                        dataIndex: 'brandCd',
                        width: 150,
                        hidden: true,
                        reference: 'refDamageCheckBrand'
                    },
                    {
                        text: { type: 'bundle', key: 'model' },
                        dataIndex: 'modelCd',
                        width: 150,
                        hidden: true,
                        reference: 'refDamageCheckModel'
                    },
                    {
                        text: { type: 'bundle', key: 'unitNo' },
                        dataIndex: 'unitNo',
                        width: 150,
                        hidden: true,
                        reference: 'refDamageCheckUnitNo'
                    },
                    {
                        text: { type: 'bundle', key: 'hht_damagecheck_thedamagepart' },
                        dataIndex: 'dmgPartNm',
                        width: 150,
                        // hidden: true,
                        reference: 'refDamageCheckDamagePart'
                    },
                    {
                        text: { type: 'bundle', key: 'theDamageLevel' },
                        dataIndex: 'dmgLevelNm',
                        width: 150,
                        hidden: true,
                        reference: 'refDamageCheckDamageLevel'
                    },
                    {
                        text: { type: 'bundle', key: 'qty' },
                        dataIndex: 'dmgQty',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'mt' },
                        dataIndex: 'dmgMt',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'm3' },
                        dataIndex: 'dmgM3',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'checkLocation' },
                        dataIndex: 'locCd',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'checkTime' },
                        dataIndex: 'checkedDt',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'hht_damagecheck_damagedesc' },
                        dataIndex: 'dmgDescNm',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'remark' },
                        dataIndex: 'dmgRemark',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'hht_damagecheck_stevedoreid' },
                        dataIndex: 'stevedoreId',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'hht_damagecheck_agentid' },
                        dataIndex: 'agentId',
                        width: 150
                    },
                    {
                        text: { type: 'bundle', key: 'hht_damagecheck_packageno' },
                        dataIndex: 'packageNo',
                        width: 150
                    },
                    ]
                }]
            }
        ]
    }]
});