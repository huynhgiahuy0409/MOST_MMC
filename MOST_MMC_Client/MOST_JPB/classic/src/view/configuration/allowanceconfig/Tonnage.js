Ext.define("MOST.view.configuration.allowanceconfig.Tonnage", {
    extend: "Ext.panel.Panel",
    alias: "widget.app-tonnage",

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
        var TonnageRowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
            clicksToEdit: 2,
            pluginId: "tonnageEditor",
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
                    reference: "refTonnageGrid",
                    state: true,
                    stateId: "stateTonnageGrid",
                    flex: 1,
                    plugins: [
                        TonnageRowEditing,
                        "gridexporter",
                        "gridfilters",
                        "clipboard",
                    ],
                    viewConfig: {},
                    bind: {
                        store: "{tonnageList}",
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
                        items: GridUtil.getGridColumns("TonnageTab"),
                    },
                },
            ],
        });

        me.callParent();
    },
});
