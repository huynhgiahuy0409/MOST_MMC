Ext.define("MOST.view.administrator.ListOfFreshWater", {
    extend: "Ext.form.Panel",
    alias: "widget.app-listoffws",
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

    detailViewAlias: "app-listoffwsdetail",

    controller: "listoffws",

    viewModel: {
    	type: 'listoffws'
    },

    listeners:{
		afterrender: 'onLoad'
	},

    layout: { type: "vbox", align: "stretch" },

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            xtype: "container",
            layout: {
                type: "vbox",
                align: "stretch",
            },
            items: [
                {
                    // Row : 3
                    xtype: "container",
                    layout: {
                        type: "vbox",
                        align: "stretch",
                    },
                    flex: 1,
                    margin: "0 0 0 0",
                    items: [
                        {
                            xtype: "tabpanel",
                            flex: 1,
                            activeTab: 0,
                            margin: "0 5 5 0",
                            reference: "ctlTruckAssignmentTabPanel",
                            listeners: {
                                tabchange: "onTabChange",
                            },
                            items: [
                                {
                                    xtype: "container",
                                    title: "Vessel",
                                    name: "JPVC",
                                    scrollable: "both",
                                    layout: { type: "vbox", align: "stretch" },
                                    items: [
                                        {
                                            xtype: "app-listoffwsjpvctab",
                                            reference:
                                                "refListofFreshWaterJpvcTab",
                                            flex: 1,
                                        },
                                    ],
                                },
                                {
                                    xtype: "container",
                                    title: "Non-Vessel",
                                    name: "Non-JPVC",
                                    scrollable: "both",
                                    layout: { type: "vbox", align: "stretch" },
                                    items: [
                                        {
                                            xtype: "app-listoffwsnonjpvctab",
                                            reference:
                                                "refListofFreshWaterNonJpvcTab",
                                            flex: 1,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
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
                            itemId: "clearItemId",
                            reference: "refBtnRefresh",
                            text: ViewUtil.getLabel("refresh"),
                            iconCls: "x-fa fa-refresh",
                            listeners: {
                                click: "onRefresh",
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
                                    rgs: ['', true],
                                },
                            },
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
									args:['', true]
								}
							}
						},
                    ],
                },
            ],
        });

        me.callParent();
    },
});
