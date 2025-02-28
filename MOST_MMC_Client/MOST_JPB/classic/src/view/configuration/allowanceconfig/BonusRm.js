Ext.define("MOST.view.configuration.allowanceconfig.BonusRm", {
    extend: "Ext.panel.Panel",
    alias: "widget.app-bonusrm",

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
        var bonusRmRowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
            clicksToEdit: 2,
            pluginId: "bonusRmEditor",
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
                    reference: "refBonusRmGrid",
                    state: true,
                    stateId: "stateBonusRmGrid",
                    flex: 1,
                    plugins: [
                        bonusRmRowEditing,
                        "gridexporter",
                        "gridfilters",
                        "clipboard",
                    ],
                    viewConfig: {},
                    bind: {
                        store: "{bonusRmList}",
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
                        items: GridUtil.getGridColumns("BonusRmTab"),
                    },
                },
            ],
        });

        me.callParent();
    },
});
