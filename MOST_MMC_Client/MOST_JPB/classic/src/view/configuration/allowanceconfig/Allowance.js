Ext.define("MOST.view.configuration.allowanceconfig.Allowance", {
    extend: "Ext.panel.Panel",
    alias: "widget.app-allowance",

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
        var allowanceRowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
            clicksToEdit: 2,
            pluginId: "allowanceEditor",
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
                    reference: "refAllowanceGrid",
                    state: true,
                    stateId: "stateAllownaceCodeGrid",
                    flex: 1,
                    plugins: [
                        allowanceRowEditing,
                        "gridexporter",
                        "gridfilters",
                        "clipboard",
                    ],
                    bind: {
                        store: "{allowanceList}",
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
                        items: GridUtil.getGridColumns("AllowanceTab"),
                    },
                },
            ],
        });

        me.callParent();
    },
});
