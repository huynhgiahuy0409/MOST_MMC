Ext.define("MOST.view.configuration.allowanceconfig.Dayoff", {
    extend: "Ext.panel.Panel",
    alias: "widget.app-dayoff",

    requires: [
        "Ext.grid.plugin.RowEditing",
        "Ext.grid.plugin.Exporter",
        "Ext.grid.plugin.Clipboard",
        "Ext.grid.filters.Filters",
        "Ext.grid.selection.SpreadsheetModel",
    ],

    layout: {
        type: "vbox",
        align: "stretch",
    },

    initComponent: function () {
        var me = this;
        var DayoffRowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
            clicksToEdit: 2,
            pluginId: "dayoffEditor",
            listeners: {
                cancelEdit: "onCancelEdit",
                validateedit: "onValidateEdit",
                edit: "onEdit",
            },
        });

        Ext.apply(me, {
            items: [
                {
                    xtype: "tsb-datagrid",
                    reference: "refDayoffGrid",
                    state: true,
                    stateId: "stateDayoffGrid",
                    flex: 1,
                    plugins: [
                        DayoffRowEditing,
                        "gridexporter",
                        "gridfilters",
                        "clipboard",
                    ],
                    viewConfig: {},
                    bind: {
                        store: "{dayoffList}",
                    },
                    selModel: {
                        type: "spreadsheet",
                        cellSelect: false,
                    },
                    listeners: {
                        celldblclick: "onGridDblClick",
                    },
                    columns: {
                        defaults: {
                            style: "text-align:center",
                            align: "center",
                        },
                        items: GridUtil.getGridColumns("DayOffTab"),
                    },
                },
            ],
        });

        me.callParent();
    },
});
