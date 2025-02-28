Ext.define('MOST.view.planning.berth.BerthMaintenance', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-berthmaintenance',
    requires: [
        'MOST.view.planning.berth.BerthMaintenanceController',
        'MOST.view.planning.berth.BerthMaintenanceModel',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel'
    ],

    width: 1300,
	height: 600,
	scrollable: true,

    controller: 'berthmaintenance',

    viewModel: {
        type: 'berthmaintenance'
    },

    listeners: {
        afterrender: 'onLoad'
    },

    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_GRID_REF_NAME: 'refBerthMaintenanceGrid',  // Main Grid Name 
    MAIN_STORE_NAME: 'berthMaintenanceList',			// Main Store Name
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
        Ext.apply(me, {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
            {
                xtype: 'fieldset',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                margin: '5 5 5 5',
                defaults: {
                    margin: '5 5 5 15',

                },
                items: [
                    {
                        xtype : 'combo',
                        width: 200,
                        emptyText : ViewUtil.getLabel('berthNo'),
                        reference : 'refBerthNo',
                        bind: {
                            store: '{berthLocCombo}',
                        },
                        displayField: 'locNm',
                        valueField: 'locId',
                        queryMode: 'local',
                        listeners: {
                            select: 'onSelectBerthNo',
                        }
                    },
                    {
                        xtype : 'combo',
                        width: 100,
                        emptyText : ViewUtil.getLabel('fromBitt'),
                        reference : 'refFromBitt',
                        bind: {
                            store: '{bittCombo}',
                        },
                        displayField: 'bittNm',
                        valueField: 'bittCd',
                        queryMode: 'local',
                        listeners: {
                            select: 'onSelectFromBitt',
                        }
                    },
                    {
                        xtype : 'combo',
                        width: 100,
                        emptyText : ViewUtil.getLabel('toBitt'),
                        reference : 'refToBitt',
                        bind: {
                            store: '{bittCombo}',
                        },
                        displayField: 'bittNm',
                        valueField: 'bittCd',
                        queryMode: 'local',
                        listeners: {
                            select: 'onSelectToBitt',
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'refFromPosition',
                        emptyText: ViewUtil.getLabel('fromPos'),
                        readOnly: true,
                        width: 100,
                    },
                    {
                        xtype: 'textfield',
                        reference: 'refToPosition',
                        emptyText: ViewUtil.getLabel('toPos'),
                        readOnly: true,
                        width: 100,
                    },
                    {
                        reference: 'refStartTime',
                        xtype: 'datetimefield',
                        width: 150,
                        emptyText : ViewUtil.getLabel('startTime'),
                        format:  MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                        listeners: {
                            select: {
                                fn: 'onCheckDateTimeValid',
                                args: ['refStartTime', 'refEndTime']
                            }
                        },
                    },
                    {
                        reference: 'refEndTime',
                        format:  MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                        emptyText : ViewUtil.getLabel('endTime'),
                        xtype: 'datetimefield',
                        width: 150,
                        listeners: {
                            select: {
                                fn: 'onCheckDateTimeValid',
                                args: ['refStartTime', 'refEndTime']
                            }
                        },
                    },
                    {
                        xtype : 'combo',
                        width: 200,
                        emptyText : ViewUtil.getLabel('stoppageReason'),
                        reference : 'refStoppageReason',
                        bind: {
                            store: '{stoppageReasonCombo}',
                        },
                        displayField: 'scdNm',
                        valueField: 'scd',
                        queryMode: 'local',
                    },
                ]
            },
            {
                xtype: 'tsb-datagrid',
                reference: me.MAIN_GRID_REF_NAME,
                flex: 1,
                plugins: [
                    'gridexporter',
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
                usePagingToolbar: false,
                listeners: {
                    cellclick: 'onGridClick',
                },
                columns: {
                    defaults: {
                        style: 'text-align:center',
                        align: 'center'
                    },
                    items: GridUtil.getGridColumns('BerthMaintenanceList')
                }
            },
            
        ],
            // DockageItems --------------------------------
            dockedItems: [{	// Buttons
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
                    itemId: 'inquiryItemId',
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button',
                    listeners: {
                        click: 'onSearch'
                    }

                },
                {
					xtype: 'button',
					itemId: 'btnAdd',
                    reference:'refBtnAdd',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},
                {
                    xtype: 'button',
                    text: ViewUtil.getLabel('save'),
                    iconCls: 'x-fa fa-save',
                    reference:'refBtnSave',
                    listeners: {
						click: 'onSave'
					}
                },
                {
                    xtype: 'button',
                    itemId: 'refBtnDelete',
                    text: ViewUtil.getLabel('remove'),
                    ui: 'delete-button',
                    iconCls: 'x-fa fa-minus',
                    listeners: {
                        click: 'onRemove'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'exportToExcelButton',
                    text: ViewUtil.getLabel('exportToExcel'),
                    iconCls: 'excel-button-image',
                    cls: 'excel-button',
                    listeners: {
                        click: {
                            fn: 'onExportExcelPdfWithServer',
                            args: [me.MAIN_GRID_REF_NAME, true]
                        }
                    }
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
            {	// Search Filters	
                xtype: 'toolbar',
                enableOverflow: true,
                padding: '0 0 0 0',
                defaults: {
                    labelAlign: 'right',
                },
                items: [{
                    xtype: 'searchfieldset',
                    title: ViewUtil.getLabel('search'),
                    autoScroll: true,
                    collapsible: true,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '0 0 5 0'
                    },
                    items: [{
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelAlign: 'right',
                            margin: '0 0 0 0'
                        },
                        items: [{
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 120,
                                margin: '0 0 0 0'
                            },
                            items: [
                                {
                                    reference: 'refStartTimeSearch',
                                    xtype: 'datetimefield',
                                    // width: 150,
                                    fieldLabel: ViewUtil.getLabel('startEndTime'),
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                    listeners: {
                                        select: {
                                            fn: 'onCheckDateTimeValid',
                                            args: ['refStartTimeSearch', 'refEndTimeSearch']
                                        }
                                    },
                                },
                                {
                                    reference: 'refEndTimeSearch',
                                    margin: '0 0 0 5',
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                    xtype: 'datetimefield',
                                    width: 150,
                                    listeners: {
                                        select: {
                                            fn: 'onCheckDateTimeValid',
                                            args: ['refStartTimeSearch', 'refEndTimeSearch']
                                        }
                                    },
                                }
                            ]
                        },]
                    }]
                }]
            }
            ],
        });
        me.callParent();
    }
});

