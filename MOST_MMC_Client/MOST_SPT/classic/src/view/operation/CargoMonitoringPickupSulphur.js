Ext.define('MOST.view.operation.CargoMonitoringPickupSulphur', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-cargomonitoringpickupsulphur',
    requires: [
        'MOST.view.operation.CargoMonitoringPickupSulphurController',
        'MOST.view.operation.CargoMonitoringPickupSulphurModel',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel'
    ],

    controller: 'cargomonitoringpickupsulphur',

    viewModel: {
        type: 'cargomonitoringpickupsulphur'
    },

    listeners: {
        afterrender: 'onLoad'
    },
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    
    CONVEYOR_GRID_REF_NAME: 'refConveyourSulphurGrid',
    CONVEYOR_STORE_NAME: 'conveyorSulphurList',
     
    SILO_GRID_REF_NAME: 'refSiloSulphurGrid',
    SILO_STORE_NAME: 'siloSulphurList',
     
     /**
      * CONSTANT END
      * =========================================================================================================================
      */
    layout: { type: 'hbox', align: 'stretch' },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            defaults: {
                margin: '0 0 0 0' // top, right, bottom, left
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 0.5,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            title: ViewUtil.getLabel('conveyorSulphur'),
                            items: [
                                {
                                    xtype: 'tsb-datagrid',
                                    margin: '5 5 0 0',
                                    reference: me.CONVEYOR_GRID_REF_NAME,
                                    stateful: true,
                                    stateId: 'conveyorSulphurGrid',
                                    flex: 1,
                                    plugins: [
                                        'gridexporter',
                                        'gridfilters',
                                        'clipboard'
                                    ],
                                    bind: {
                                        store: '{' + me.CONVEYOR_STORE_NAME + '}'
                                    },
                                    selModel: {
                                        type: 'spreadsheet',
                                        cellSelect: false
                                    },
                                    listeners: {
                                        pagingSearch: 'onSearch',
                                        cellclick: 'onSearchClick'
                                    },
                                    columns: {
                                        defaults: {
                                            style: 'text-align:center',
                                            align: 'center'
                                        },
                                        items: GridUtil.getGridColumns('ConveyorSTCS')
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    marign: '5 5 5 5',
                                    items: [
                                        {
                                            xtype: 'container',
                                            width: 100,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            margin: '5 0 0 0',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'numberfield',
                                                            reference: 'ctlTotalConveyorWeight',
                                                            fieldLabel: ViewUtil.getLabel('cargoDischargingListTotalWeight'),
                                                            readOnly: true,
                                                            width : 250
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 5 0 5'
                        },
                        {
                            xtype: 'fieldset',
                            flex: 0.5,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            title: ViewUtil.getLabel('ticketSulphur'),
                            items: [
                                {
                                    xtype: 'tsb-datagrid',
                                    margin: '5 5 0 0',
                                    reference: me.SILO_GRID_REF_NAME,
                                    stateful: true,
                                    stateId: 'tickeSulphurGrid',
                                    flex: 1,
                                    bind: {
                                        store: '{' + me.SILO_STORE_NAME + '}'
                                    },
                                    listeners: {
                                        pagingSearch: 'onSearch'
                                    },
                                    columns: {
                                        defaults: {
                                            style: 'text-align:center',
                                            align: 'center'
                                        },
                                        items: GridUtil.getGridColumns('TicketSILO')
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    marign: '5 5 5 5',
                                    items: [
                                        {
                                            xtype: 'container',
                                            width: 100,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            margin: '5 0 0 0',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'numberfield',
                                                            reference: 'ctlTotalSiloWeight',
                                                            fieldLabel: ViewUtil.getLabel('cargoDischargingListTotalWeight'),
                                                            readOnly: true,
                                                            width : 250
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 0.05,
                    marign: '5 5 5 5',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            margin: '10 0 0 0',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: ViewUtil.getLabel('confirmSulphur'),
                                            style: 'text-align: right; margin-top: 5px; margin-right: 10px;',
                                            width: 150
                                        },
                                        {
                                            xtype: 'numberfield',
                                            reference: 'ctlTotalSulphurWeight',
                                            hideTrigger: true,
                                            width : 150,
                                            minValue: 0,
                                            maxValue: 999999.999,
                                            decimalPrecision: 3,
                                        },
                                        {
                                            xtype: 'button',
                                            text: ViewUtil.getLabel('complete'),
                                            margin: '0 0 0 10',
                                            cls: 'confirm-button',
                                            iconCls: 'x-fa fa-check',
                                            width: 150,
                                            listeners: {
                                                click: 'onConfirmSulphur'
                                            }
                                        },
                                        {
                                            //remark
                                            xtype: 'textfield',
                                            reference: 'ctlRemark',
                                            fieldStyle: 'text-transform:uppercase',
                                            fieldLabel: ViewUtil.getLabel('remark'),
                                            labelAlign: 'right',
                                            width: 500,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ],
            dockedItems: [{
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                    type: 'hbox',
                },
                defaults: {
                    margin: '5 0 0 0'
                },
                items: [
                    {
                        xtype: 'tbfill'
                    },{
                        xtype: 'button',
                        itemId: 'inquiryItemId',
                        text: ViewUtil.getLabel('search'),
                        iconCls: 'x-fa fa-search',
						cls: 'search-button', 
                        listeners: {
                            click: 'onSearch'
                        }
                    }
                ]
            }, {
                xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0', 
				defaults: {
					labelAlign: 'right',
				},
				items: [{
					xtype: 'searchfieldset',
					margin: '0 5 0 0',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items: [{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '0 0 0 0'
						},
						items: [
							{
								xtype: 'container',
                                flex: 1,
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								items: [
									{
										xtype: 'label',
										text: ViewUtil.getLabel('period'),
										style: 'text-align: right; margin-top: 5px;',
										width: 80
									},
									{
										reference: 'ctlFrom',
										xtype: 'datefield',
										margin: '0 0 0 5',
                                        width: 150,
										editable: false,
										format: MOST.config.Locale.getShortDate(),
										bind: '{theSulphur.dateFrom}'
									},
									{
										reference: 'ctlTo',
										margin: '0 0 0 5',
										xtype: 'datefield',
                                        width: 150,
										editable: false,
										format: MOST.config.Locale.getShortDate(),
										bind: '{theSulphur.dateTo}'
									},
                                    {
                                        xtype: 'button',
                                        itemId: 'searchButton',
                                        margin: '0 0 0 15',
                                        text: ViewUtil.getLabel('findNonJPVCSN'),
                                        cls: 'search-button',
                                        iconCls: 'x-fa fa-search',
                                        reference: 'refBtnSearchInfo',
                                        width: 150,
                                        listeners: {
                                            click: 'onSearchInfo'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        reference: 'ctlNonJPVCSN',
                                        fieldLabel: ViewUtil.getLabel('nonJPVCSN'),
                                        margin: '0 0 0 30',
                                        editable: false,
                                        labelAlign: 'right',
                                        bind: {
                                            store: '{nonJPVCSNList}'
                                        },
                                        queryMode: 'local',
                                        displayField: 'shipgNoteNoNm',
                                        valueField: 'shipgNoteNoCd',
                                        emptyText: 'Select All',
                                    },
								]
                            },
						]
					}]
                }]
            }]
        });
        me.callParent();
    }
});

