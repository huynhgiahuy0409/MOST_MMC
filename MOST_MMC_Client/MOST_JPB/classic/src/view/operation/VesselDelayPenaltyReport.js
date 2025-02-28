Ext.define("MOST.view.operation.VesselDelayPenaltyReport", {
    extend: "Ext.panel.Panel",
    alias: "widget.app-vesseldelaypenaltyreport",
    requires: [
        "Ext.grid.plugin.RowEditing",
        "Ext.grid.plugin.Exporter",
        "Ext.grid.plugin.Clipboard",
        "Ext.grid.filters.Filters",
        "Ext.grid.selection.SpreadsheetModel",
    ],
    detailViewAlias: 'app-vesseldelaypenaltyreportdetail',

    controller: "vesseldelaypenaltyreport",

    viewModel: {
        type: 'vesseldelaypenaltyreport'
    },

    listeners: {
        afterrender: "onLoad",
    },
    width: 800,
    height: 700,

    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_GRID_REF_NAME: 'refVesselDelayPenaltyReportGrid',				// Main Grid Name 
    MAIN_STORE_NAME: 'vesselDelayPntyList',
    /**
     * CONSTANT END
     * =========================================================================================================================
     */

    layout: { type: "vbox", align: "stretch" },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [
                {
                    xtype: "container",
                    layout: {
                        type: "hbox",
                        align: "stretch",
                    },
                    items: [
                        {
                            xtype: "textfield",
                            margin: "5 0 5 20",
                            fieldLabel: ViewUtil.getLabel("vesselDelayDPRNo"),
                            reference: "refDPRNo",
                            labelWidth: 50,
                            editable: false,
                            width: 200,
                        },
                        {
                            xtype: "partnercdfield",
                            margin: "5 0 5 20",
                            fieldLabel: me.lblVesselDelayContractorName,
                            reference: "refContractorName",
                            params: {
                                searchDivCd: "VDPR",
                            },
                            labelWidth: 120,
                            //hailey
                            allowBlank: false,
                            disabled: false,
                            width: 300,
                            hidden: true,
                        },
                        {
                            xtype: "textfield",
                            margin: "5 0 5 20",
                            //fieldLabel: me.lblVesselDelayPenalty,
                            reference: "refPenalty",
                            labelWidth: 50,
                            editable: false,
                            width: 200,
                            hidden: true,
                        },
                    ],
                },
                {
                    xtype: 'tsb-datagrid',
                    reference: me.MAIN_GRID_REF_NAME,
                    flex: 1,
                    margin: '5 5 5 0',
                    stateful: true,
                    stateId: 'stateVesselDelayGrid',
                    plugins: [
                        'gridexporter',
                        'gridfilters',
                        'clipboard'
                    ],
                    bind: {
                        store: '{' + me.MAIN_STORE_NAME + '}'
                    },
                    listeners: {
                        cellclick: 'onGridClick',
                        cellDblClick : 'onDblClick',
                        pagingSearch: 'onSearch'
                    },
                    selModel: {
                        type: 'spreadsheet',
                        cellSelect: false,
                        listeners: {
                            select: 'onChecked',
                            deselect: 'onChecked'
                        }
                    },
                    columns: {
                        defaults: {
                            style: 'text-align:center',
                            align: 'center'
                        },
                        items: GridUtil.getGridColumns('VesselDelayPenaltyReportList'),
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: "container",
                    style: { "background-color": "white" },
                    layout: {
                        type: "hbox",
                    },
                    defaults: {
                        margin: "1 1 1 1",
                    },
                    items: [
                        {
                            xtype: "tbfill",
                        },
                        {
                            xtype: "button",
                            itemId: "inquiryItemId",
                            reference: "refBtnRetrieve",
                            text: ViewUtil.getLabel("search"),
                            iconCls: "x-fa fa-search",
                            cls: "search-button",
                            listeners: {
                                click: "onSearch",
                            },
                        },
                        {
                            xtype: "button",
                            //itemId: 'createItemId',
                            reference: "refBtnCreate1",
                            text: ViewUtil.getLabel("add"),
                            ui: "create-button",
                            iconCls: "x-fa fa-plus",
                            listeners: {
                                click: "onAdd",
                            },
                        },
                        {
                            xtype: "button",
                            itemId: "deleteItemId",
                            reference: "refBtnDelete",
                            text: ViewUtil.getLabel("remove"),
                            ui: "delete-button",
                            disabled: true,
                            iconCls: "x-fa fa-minus",
                            listeners: {
                                click: "onRemove",
                            },
                            disabled: true,
                        },
                        {
                            xtype: "button",
                            itemId: "exportToExcelButton",
                            text: ViewUtil.getLabel("exportToExcel"),
                            iconCls: "excel-button-image",
                            cls: "excel-button",
                            listeners: {
                                click: {
                                    fn: "onExportExcelPdfWithServer",
                                    args: [me.MAIN_GRID_REF_NAME, true],
                                },
                            },
                        },
                        {
                            xtype: "button",
                            itemId: "exportToPdfButton",
                            text: ViewUtil.getLabel("exportToPdf"),
                            iconCls: "x-fa fa-file-pdf-o",
                            cls: "excel-button",
                            listeners: {
                                click: {
                                    fn: "onExportExcelPdfWithServer",
                                    args: [me.MAIN_GRID_REF_NAME, false],
                                },
                            },
                        },
                        {
                            xtype: "button",
                            cls: "column-setting-button",
                            iconCls: "x-fa fa-columns",
                            text: ViewUtil.getLabel("column"),
                            listeners: {
                                click: "onColumnSettingPopup",
                                args: [me.MAIN_GRID_REF_NAME],
                            },
                        },
                    ],
                },
                {
                    xtype: "toolbar",
                    padding: "0 0 0 0",
                    margin: "0 -3 10 0",
                    enableOverflow: true,
                    defaults: {
                        labelAlign: "right",
                    },
                    items: [
                        {
                            xtype: "fieldset",
                            title: ViewUtil.getLabel("search"),
                            autoScroll: true,
                            collapsible: true,
                            flex: 1,
                            padding: "0 10 10 10",
                            layout: {
                                type: "hbox",
                                align: "stretch",
                            },
                            items: [
                                {
                                    xtype: "searchfieldset",
                                    title: ViewUtil.getLabel("search"),
                                    layout: {
                                        type: "hbox",
                                    },
                                    margin: "0 5 0 0",
                                    padding: "0 10 10 10",
                                    flex: 0.5,
                                    items: [
                                        {
                                            xtype: "container",
                                            layout: {
                                                type: "vbox",
                                                align: "stretch",
                                            },
                                            flex: 1,
                                            defaults: {
                                                labelWidth: 70,
                                                labelAlign: "right",
                                            },
                                            items: [
                                                {
                                                    xtype: "shipcallnofield",
                                                    reference: "ctlScn",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "shipCallNo"
                                                        ),
                                                    editable: false,
                                                    bind: {
                                                        value: "{theSearch.scn}",
                                                    },
                                                },
                                                {
                                                    xtype: "vesselcalllistfield",
                                                    margin: "5 0 0 0",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vessel"
                                                        ),
                                                    bind: {
                                                        value: "{theSearch.vslCallId}",
                                                    },
                                                    reference: "ctlVslCallId",
                                                },
                                                {
                                                    xtype: "datefield",
                                                    margin: "5 0 0 0",
                                                    reference:
                                                        "ctlWorkYmdField",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayDate"
                                                        ),
                                                    format: MOST.config.Locale.getShortDate(),
                                                    editable: true,
                                                    listeners: {
                                                        select: "onSearch",
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            xtype: "container",
                                            defaults: {
                                                labelAlign: "right",
                                                labelWidth: 60,
                                            },
                                            layout: {
                                                type: "vbox",
                                                align: "stretch",
                                            },
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: "combobox",
                                                    reference: "ctlShiftCombo",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayShift"
                                                        ),
                                                    queryMode: "local",
                                                    bind: {
                                                        store: "{shiftCombo}",
                                                        value: "{theSearch.shftId}",
                                                    },
                                                    displayField: "shftNm",
                                                    valueField: "shftId",
                                                    emptyText: "All",
                                                    value: "",
                                        
                                                },
                                                {
                                                    xtype: "combobox",
                                                    margin: "-5 0 0 0",
                                                    reference: "ctlHatchCombo",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayHatchNo"
                                                        ),
                                                    queryMode: "local",
                                                    bind: {
                                                        store: "{hatchNoCombo}",
                                                        value: "{theSearch.hatchNo}",
                                                    },
                                                    displayField: "scdNm",
                                                    valueField: "scd",
                                                    value: "",
                                                    emptyText: "All",
                                                    editable: false,
                                                    
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    xtype: "fieldset",
                                    title: ViewUtil.getLabel("vslInfo"),
                                    flex: 1,
                                    margin: "0 0 0 5",
                                    padding: "0 10 10 10",
                                    layout: {
                                        type: "hbox",
                                        align: "stretch",
                                    },
                                    items: [
                                        {
                                            xtype: "container",
                                            flex: 1,
                                            defaults: {
                                                labelAlign: "right",
                                                labelWidth: 100,
                                                margin: "0 0 5 0",
                                            },
                                            layout: {
                                                type: "vbox",
                                                align: "stretch",
                                            },
                                            items: [
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayVesselCode"
                                                        ),
                                                    reference: "refVslCd",
                                                    readOnly: true,
                                                    bind: "{theVsl.vslCd}",
                                                },
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayVesselName"
                                                        ),
                                                    reference: "refVslNm",
                                                    readOnly: true,
                                                    bind: "{theVsl.vslNm}",
                                                },
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayVoyage"
                                                        ),
                                                    readOnly: true,
                                                    bind: "{theVsl.voyage}",
                                                    margin: "0 0 0 0",
                                                },
                                            ],
                                        },
                                        {
                                            xtype: "container",
                                            flex: 1,
                                            defaults: {
                                                labelAlign: "right",
                                                labelWidth: 100,
                                                margin: "0 0 5 0",
                                            },
                                            layout: {
                                                type: "vbox",
                                                align: "stretch",
                                            },
                                            items: [
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelaySa"
                                                        ),
                                                    reference: "refsa",
                                                    readOnly: true,
                                                    bind: "{theVsl.arrvSaId}",
                                                },
                                                {
                                                    xtype: "datetimefield",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayEta"
                                                        ),
                                                    reference: "refETA",
                                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                                    readOnly: true,
                                                    bind: "{theVsl.eta}",
                                                },
                                                {
                                                    xtype: "datetimefield",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayEtd"
                                                        ),
                                                    reference: "refETD",
                                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                                    readOnly: true,
                                                    bind: "{theVsl.etd}",
                                                    margin: "0 0 0 0",
                                                },
                                            ],
                                        },
                                        {
                                            xtype: "container",
                                            flex: 1,
                                            defaults: {
                                                labelAlign: "right",
                                                labelWidth: 100,
                                                margin: "0 0 5 0",
                                            },
                                            layout: {
                                                type: "vbox",
                                                align: "stretch",
                                            },
                                            items: [
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayBerthingloc"
                                                        ),
                                                    readOnly: true,
                                                    bind: "{theVsl.berthLoc}",
                                                },
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel:
                                                        ViewUtil.getLabel(
                                                            "vesselDelayStorageloc"
                                                        ),
                                                    readOnly: true,
                                                },
                                                {
                                                    xtype: "container",
                                                    margin: "0 0 0 0",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        me.callParent();
    },
});
