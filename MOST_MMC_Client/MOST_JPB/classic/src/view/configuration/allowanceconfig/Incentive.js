Ext.define("MOST.view.configuration.allowanceconfig.Incentive", {
    extend: "Ext.panel.Panel",
    alias: "widget.app-incentive",

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
        var incentiveRowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
            clicksToEdit: 2,
            pluginId: "incentiveEditor",
            listeners: {
                cancelEdit: "onCancelEdit",
                validateedit: "onValidateEdit",
                edit: "onEdit",
            },
        });

        Ext.apply(me, {
            items: [
                {
                    xtype: "grid",
                    reference: "refIncentiveGrid",
                    state: true,
                    stateId: "stateIncentiveGrid",
                    flex: 1,
                    plugins: [
                        incentiveRowEditing,
                        "gridexporter",
                        "gridfilters",
                        "clipboard",
                    ],
                    bind: {
                        store: "{incentiveList}",
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
                        items: GridUtil.getGridColumns("IncentiveTab"),
                    },
                },
            ],
        });

        me.callParent();
    },
});
