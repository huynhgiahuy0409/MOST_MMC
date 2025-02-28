Ext.define("MOST.view.configuration.allowanceconfig.Fuel", {
    extend: "Ext.panel.Panel",
    alias: "widget.app-fuel",

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
        var fuelRowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
            clicksToEdit: 2,
            pluginId: "fuelEditor",
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
                    reference: "refFuelGrid",
                    state: true,
                    stateId: "stateFuelGrid",
                    flex: 1,
                    plugins: [
                        fuelRowEditing,
                        "gridexporter",
                        "gridfilters",
                        "clipboard",
                    ],
                    viewConfig: {},
                    bind: {
                        store: "{fuelList}",
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
                        items: GridUtil.getGridColumns("FuelTab"),
                    },
                },
            ],
        });

        me.callParent();
    },
});
