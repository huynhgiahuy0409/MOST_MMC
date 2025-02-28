Ext.define("MOST.view.planning.berth.EmailSender", {
    extend: "Ext.form.Panel",

    alias: "widget.app-berthapprovalemailsender",

    requires: ["Ext.layout.container.Table"],

    width: 1200,

    layout: {
        type: "fit",
        align: "stretch",
    },

    listeners: {
        afterrender: "onEmailSenderlLoad",
    },

    config: {
        selectedTemplate: null,
        to: [],
        cc: [],
    },

    lblCancel: { type: "bundle", key: "cancel" },

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            xtype: "form",
            layout: {
                type: "vbox",
                align: "stretch",
            },
			defaults: {
                margin: "5 5 0 5", 
				width: "100%",
            },
            items: [
                {
                    xtype: "container",
                    layout: {
                        type: "hbox",
                        align: "stretch",
                    },
					defaults: {
						flex: 1
					},
                    items: [
                        {
                            xtype: "fieldset",
                            margin: "5 5 0 0",
							padding: "10 10 10 10",
                            layout: {
                                type: "vbox",
                                align: "stretch",
                                width: "100%",
                            },
                            defaults: {
                                labelAlign: "right",
                                margin: "5 0 0 0",
								labelWidth: 60,
                            },
                            items: [
                                {
                                    xtype: "textfield",
                                    reference: "ctlTo",
									margin: "0 0 0 0",
                                    fieldLabel: ViewUtil.getLabel("emailto"),
                                },
                                {
                                    xtype: "textfield",
                                    reference: "ctlCc",
                                    fieldLabel: ViewUtil.getLabel("emailcc"),
                                },
                                {
                                    xtype: "textfield",
                                    reference: "ctlFrom",
                                    fieldLabel: ViewUtil.getLabel("emailfrom"),
                                },
                                {
                                    xtype: "textfield",
                                    reference: "ctlSubject",
                                    fieldLabel: ViewUtil.getLabel("emailsubject"),
                                },
                            ],
                        },
                        {
                            xtype: "fieldset",
							flex: 0.5,
                            margin: "5 5 0 5",
							padding: '10 10 10 10',
                            layout: {
                                type: "vbox",
                                align: "stretch",
                                width: "100%",
                            },
                            defaults: {
                                labelAlign: "right",
                                margin: "5 0 0 0",
								labelWidth: 60,
                            },
                            items: [
                                {
                                    xtype: "combobox",
                                    reference: "ctlEmailTemplate",
									margin: "0 0 0 0",
                                    queryMode: "local",
                                    bind: {
                                        store: "{emailTemplate}",
                                    },
                                    displayField: "subject",
                                    valueField: "emailID",
                                    value: "",
                                    listeners: {
                                        select: "onEmailTemplateComboSelect",
                                    },
                                },
                                {
                                    xtype: "button",
                                    text: ViewUtil.getLabel("apply"),
                                    listeners: {
                                        click: "onApplyiClick",
                                    },
                                },
                            ],
                        },
                        {
                            xtype: "fieldset",
                            margin: "5 0 0 5",
							padding: "10 10 10 10",
                            layout: {
                                type: "vbox",
                                align: "stretch",
                                width: "100%",
                            },
                            defaults: {
                                labelAlign: "right",
                                margin: "5 0 0 0",
                                editable: false,
								labelWidth: 60,
                            },
                            items: [
                                {
                                    xtype: "textfield",
                                    reference: "ctlTempSubject",
									margin: "0 0 0 0",
                                    fieldLabel: ViewUtil.getLabel("emailsubject"),
                                    bind: "{selectedTemplate.subject}",
                                },
                                {
                                    xtype: "textareafield",
                                    reference: "ctlTempContent",
                                    fieldLabel: ViewUtil.getLabel("emailcontent"),
                                    bind: "{selectedTemplate.content}",
                                },
                                {
                                    xtype: "textfield",
                                    reference: "ctlTempTo",
                                    fieldLabel: ViewUtil.getLabel("emailto"),
                                    bind: "{to}",
                                },
                                {
                                    xtype: "textfield",
                                    reference: "ctlTempCc",
                                    fieldLabel: ViewUtil.getLabel("emailcc"),
                                    bind: "{cc}",
                                },
                            ],
                        },
                    ],
                },
                {
                    xtype: "fieldset",
					flex: 1,
                    margin: "5 5 0 5", 
					padding: "10 10 0 10",
                    layout: {
                        type: "vbox",
                        align: "stretch",
                    },
                    items: [
                        {
                            xtype: "htmleditor",
                            enableColors: true,
                            enableAlignments: true,
                            reference: "ctlContent",
                            flex: 1,
                            fieldLabel: ViewUtil.getLabel("emailcontent"),
							labelAlign: "right",
							labelWidth: 60
                        },
                    ],
                },
                {
                    xtype: "container",
					margin: "5 0 5 0",
                    layout: {
                        type: "hbox",
                        pack: "center",
                    },
                    defaults: {
                        labelAlign: "right",
                    },
                    items: [
                        {
                            xtype: "button",
                            text: ViewUtil.getLabel("submit"),
                            listeners: {
                                click: "onSubmitClick",
                            },
                        },
                        {
                            xtype: "button",
                            text: ViewUtil.getLabel("cancel"),
							margin: '0 0 0 5',
                            listeners: {
                                click: "onCancelClick",
                            },
                        },
                    ],
                },
            ],
        });
        me.callParent();
    },
});
