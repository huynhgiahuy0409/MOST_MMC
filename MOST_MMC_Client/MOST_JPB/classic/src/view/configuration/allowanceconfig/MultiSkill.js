Ext.define("MOST.view.configuration.allowanceconfig.MultiSkill", {
    extend: "Ext.panel.Panel",
    alias: "widget.app-multiskill",

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
        var multiskillRowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
            clicksToEdit: 2,
            pluginId: "multiskillEditor",
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
                    reference: "refMultiskillGrid",
                    state: true,
                    stateId: "stateMultiskillGrid",
                    flex: 1,
                    plugins: [
                        multiskillRowEditing,
                        "gridexporter",
                        "gridfilters",
                        "clipboard",
                    ],
                    viewConfig: {},
                    bind: {
                        store: "{multiskillList}",
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
                        items: GridUtil.getGridColumns("MultiSkillTab"),
                    },
                },
            ],
        });

        me.callParent();
    },
});
