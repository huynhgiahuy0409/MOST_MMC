Ext.define('MOST.view.document.TruckAssignmentOfRORO', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-truckassignmentofroro',

    requires: [
    	'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],
    
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    RORO_GRID_REF_NAME: 'refTruckAssignmentOfROROGrid',
    RORO_STORE_NAME: 'truckAssignmentOfROROList',
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
        Ext.apply(this, {
            items: [
            	{
                    xtype: 'tsb-datagrid',
                    reference: me.RORO_GRID_REF_NAME,
                    flex: 1,
                    margin: '0 0 5 0',
                    stateful: true,
                    stateId: '',
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                    },
                    plugins: [
                        'gridfilters',
                        'clipboard'
                    ],
                    bind: {
                        store: '{' + me.RORO_STORE_NAME + '}'
                    },
                    selModel: {
                        type: 'spreadsheet',
                        cellSelect: false
                    },
                    listeners: {
                        celldblClick: 'onDblClick'
                    },
                    columns: {
                        defaults: {
                            style: 'text-align:center',
                            align: 'center'
                        },
                        items: GridUtil.getGridColumns('TruckAssignmentOfRORO')
                    }
                }
            ],
            dockedItems: [
            {
                xtype: 'container',
                style: { "background-color": "white" },
                hidden:true,
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
                    reference: 'refBtnRetrieve',
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
                    reference: 'refBtnCreate',
                    text: ViewUtil.getLabel('add'),
                    iconCls: 'x-fa fa-plus'
                },
                {
                    xtype: 'button',
                    itemId: 'btnDelete',
                    reference : 'refBtnDelete',
                    text: ViewUtil.getLabel('remove'),
                    ui: 'delete-button',
                    iconCls: 'x-fa fa-minus'
                },
                {
                    xtype: 'button',
                    itemId: 'exportToExcelButton',
                    text: ViewUtil.getLabel('exportToExcel'),
                    iconCls: 'excel-button-image',
                    cls: 'excel-button'
                },
                {
                    xtype: 'button',
                    itemId: 'exportToPdfButton',
                    text: ViewUtil.getLabel('exportToPdf'),
                    iconCls: 'x-fa fa-file-pdf-o',
                    cls: 'excel-button'
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
            {
            	
                xtype: 'toolbar',
                enableOverflow: true,
                padding: '0 0 0 0',
                margin: '0 0 0 0',
                hidden:true,
                defaults: {
                    labelAlign: 'right',
                },
                items: [{
                    xtype: 'fieldset',
                    autoScroll: true,
                    collapsible: true,
                    margin: '5 5 5 5',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '0 0 0 0'
                    },
                    items: [{
                        xtype: 'searchfieldset',
                        title: ViewUtil.getLabel('search'),
                        defaults: {
                            labelAlign: 'right',
                            labelWidth: 60,
                            margin: '5 5 0 0'
                        },
                        layout: {
                            type: 'vbox',
                        },
                        items: [
                            {
                                xtype: 'vesselcalllistfield',
                                reference: 'ctlVslCallId',
                                fieldLabel: ViewUtil.getLabel('vessel'),
                                emptyText: ViewUtil.getLabel('vessel'),
                                allowBlank: false,
                                bind: {
                                    value: '{theSearch.vslCallId}'
                                }
                            },
                            {
                                xtype: 'combobox',
                                reference: 'ctlSnNo',
                                fieldLabel: ViewUtil.getLabel('LASNNo'),
                                emptyText: "select",
                                bind: {
                                    store: '{snCombo}',
                                    value: '{theSearch.shipgNoteNo}'
                                },
                                displayField: 'scdNm',
                                valueField: 'shipgNoteNo',
                                queryMode: 'local',
                                forceSelection: true,
                                editable: false
                            },
                            {
								xtype : 'combo',
								fieldLabel : ViewUtil.getLabel('cargoTp'),
								reference : 'ctlSearchCgTp',
								emptyText : ViewUtil.getLabel('cargoTp'),
								bind: {
	            	    			store: '{cargoTypeCombo}',
									value: '{theSearch.cgTpCd}'
	            	    		},
	            	    		displayField: 'scdNm',
	           					valueField: 'scd',
	           					queryMode: 'local',
	           					value : '',
                                editable : false,
                                hidden: true
							},
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: ViewUtil.getLabel('vslInfo'),
                        margin: '0 5 0 5',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    margin: '4 0 0 0',
                                    labelWidth: 90
                                },
                                flex: 1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.vslCd}',
                                        fieldLabel: ViewUtil.getLabel('vesselCode'),
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.vslNm}',
                                        fieldLabel: ViewUtil.getLabel('vesselName'),
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.voyage}',
                                        fieldLabel: ViewUtil.getLabel('voyage'),
                                        readOnly: true
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    margin: '4 0 0 0',
                                    labelWidth: 90
                                },
                                flex: 1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.arrvSaId}',
                                        fieldLabel: ViewUtil.getLabel('SNLASA'),
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: ViewUtil.getLabel('eta'),
                                        bind: '{theVslInfo.eta}',
                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                        readOnly: true,
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: ViewUtil.getLabel('etd'),
                                        bind: '{theVslInfo.etd}',
                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                        readOnly: true,
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    margin: '4 0 0 0',
                                },
                                flex: 1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: ViewUtil.getLabel('berthingLoc'),
                                        bind: '{theVslInfo.berthLoc}',
                                        readOnly: true
                                    }
                                ]
                            }
                        ]
                    }]
                }]
            }]
        });

        me.callParent();
    }
});