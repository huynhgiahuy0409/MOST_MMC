Ext.define('MOST.view.operation.JettyDelay', {
    extend: 'Ext.Panel',
    alias: 'widget.app-jettydelay',
    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.scroll.Scroller',
        'Ext.layout.overflow.Scroller',
    ],
    reference: 'jettydelay',
    itemId: 'jettydelay',

    layout: 'fit',
    shadow: false,
    padding: 0,

    items: [
        {
            xtype: 'formpanel',
            reference: 'delayDetail',
            padding: 0,
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
                            xtype: 'fieldset',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {//Cargo type
                                    xtype: 'combobox',
                                    reference: 'refCboCgtp',
                                    bind: {
                                        store: '{cboCgtpStore}',
                                        value: '{theJettyDelay.cgTpCd}'
                                    },
                                    required: true,
                                    placeholder: 'Cargo Type',
                                    displayField: 'cgTpNm',
                                    valueField: 'cgTpCd',
                                    queryMode: 'local',
                                    clearable: true,
                                    typeAhead: true,
                                    editable: false,
                                },
                                {
                                    xtype: 'datetimelocalfield',
                                    reference: 'refStartTime',
                                    inputType: 'datetime-local',
                                    format: 'd/m/Y H:i',
                                    bind: {
                                        value: '{theJettyDelay.startTime}'
                                    },
                                    placeholder: 'Start Time',
                                    required: true
                                },
                                {
                                    xtype: 'datetimelocalfield',
                                    reference: 'refEndTime',
                                    inputType: 'datetime-local',
                                    format: 'd/m/Y H:i',
                                    bind: {
                                        value: '{theJettyDelay.endTime}'
                                    },
                                    placeholder: 'End Time',
                                    required: true,
                                },
                                {
                                    xtype: 'textareafield',   
                                    flex: 1,
                                    bind: {
                                        value: '{theJettyDelay.remark}'
                                    },
                                    placeholder: 'Remark',
                                    //height: 100,
                                    maxLength: 150,
                                    //maxRows: 2,
                                    //maxHeight: 100
                                },
                                {
                                    xtype: 'combobox',
                                    reference: 'refHatchCombo',
                                    placeholder: 'Hatch No',
                                    bind: {
                                        store: '{hatchComboTbl}',
                                        value: '{theJettyDelay.hatchNo}'
                                    },
                                    displayField: 'scdNm',
                                    valueField: 'scd',
                                    editable: false,
                                    allowBlank: true,
                                    queryMode: 'local',
                                },
                               
                            ]
                        }, {//COL2 Delay Code
                            xtype: 'fieldset',
                            flex: 1,
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
                                            xtype: 'combobox',
                                            reference: 'refLstDlyCtgCd',
                                            width: 70,
                                            placeholder: 'Find',
                                            displayField: 'dlyCgt',
                                            valueField: 'dlyCgt',
                                            queryMode: 'local',
                                            clearable: true,
                                            typeAhead: true,
                                            editable: false,
                                            bind: {
                                                store: '{delayCtgList}'
                                            },
                                            listeners: {
                                                change: 'onTblSearchDelayCd'
                                            },
                                        },
                                        {
                                        	xtype: 'spacer',
                                        	width: 2
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'txtDelayCd',
                                            flex: 1,
                                            required: true,
                                            bind: {
                                                value: '{theJettyDelay.delayCode}',
                                            },
                                            placeholder: 'Delay Code',
                                            listeners: {
                                                //change: function(field, newValue){
                                                //	field.setValue(newValue.toUpperCase());
                                                //}
                                                change: 'onChangeDelayCd'
                                            },
                                            triggers: {
												search: {
													iconCls: 'x-fa fa-search',
													ui: 'retrieve-button-modern',
													scope: 'controller',
													handler: 'onTblSearchDelayCd'
												}
											}
                                        }, 
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    style: 'border: 1px solid #eeeeee',
                                    layout: {
                                        type: 'hbox',
                                        align: 'strecth'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            flex: 1,
                                            reference: 'refDelayCodeGrid',
                                            bind: {
                                                store: '{delayCodeTbl}'
                                            },
                                            listeners: {
                                                select: 'onTblSelectDelayCdGrid'
                                            },
                                            selectable: {
                                                mode: 'single',
                                            },
                                            columns: [
                                                {
                                                    text: 'Code',
                                                    dataIndex: 'scd',
                                                    hidden: true
                                                },
                                                {
                                                    text: 'Delay Code Description',
                                                    dataIndex: 'fullCdNm',
                                                    flex: 4,
                                                },
                                                {
                                                    text: 'Description',
                                                    dataIndex: 'scdNm',
                                                    hidden: true
                                                },
                                                {
                                                    text: 'Acpt',
                                                    dataIndex: 'acptYN',
                                                    width: 60
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {//ButtonCRUD
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'button',
                            reference: 'refBtnJettyDlyRetrieve',
                            flex: 1,
                            text: 'Retrieve',
                            ui: 'retrieve-button-modern',
                            handler: 'onTblRetrive'
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: 'Clear',
                            ui: 'clear-button-modern',
                            handler: 'onTblClearDelay'
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: 'Add',
                            ui: 'create-button-modern',
                            handler: 'onTblCreateDelay'
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: 'Update',
                            ui: 'update-button-modern',
                            handler: 'onTblUpdateDelay'
                        },
                        {
                            xtype: 'spacer',
                            width: 3
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: 'Delete',
                            ui: 'delete-button-modern',
                            handler: 'onTblDeleteDelay'
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    responsiveConfig: {
                        small: {
                            flex: 1
                        },
                        large: {
                            flex: undefined,
                            height: 200
                        }
                    },
                    reference: 'refJettyDelayGridList',
                    listeners:
                    {
                        select: 'onCellClickDelayTbl',
                    },
                    bind: {
                        store: '{delaySummary}'
                    },
                    selectable: {
                        columns: false,
                        rows: true,
                        cells: false,
                        mode: 'single',
                        headerCheckbox: false,
                    },
                    columns: [
                        {
                            text: 'Cg Type',
                            dataIndex: 'cgTpCd',
                            width: '80'
                        },
                        {
                            text: 'Delay Code',
                            dataIndex: 'delayCode',
                            width: '90'
                        },
                        {
                            text: 'Accepted',
                            dataIndex: 'accDelay',
                            width: '80'
                        },
                        {
                            text: 'Start Time',
                            dataIndex: 'startTime',
                            xtype: 'datecolumn',
                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            width: '140',
                        },
                        {
                            text: 'End Time',
                            dataIndex: 'endTime',
                            xtype: 'datecolumn',
                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            width: '140',
                        },
                        {
                            text: 'Seq',
                            dataIndex: 'seq',
                            width: '80'
                        },
                    ]
                }
            ]
        }
    ]
})