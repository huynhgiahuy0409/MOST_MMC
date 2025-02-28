Ext.define('MOST.view.planning.berth.EmailSender', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-berthapprovalemailsender',
	
	requires: [
	    'Ext.layout.container.Table'
	],
	
	width: 1200,
	height: 620,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onEmailSenderlLoad'
	},
	
	config: {
		selectedTemplate : null,
		to:[],
		cc:[]
	},
	
	lblEmailTo: {type: 'bundle', key: 'emailto'},
	lblEmailCc: {type: 'bundle', key: 'emailcc'},
	lblEmailFrom: {type: 'bundle', key: 'emailfrom'},
	lblEmailSubject: {type: 'bundle', key: 'emailsubject'},
	lblEmailContent: {type: 'bundle', key: 'emailcontent'},
	lblApply: {type: 'bundle', key: 'apply'},
	lblSubmit: {type: 'bundle', key: 'submit'},
	lblReset: {type: 'bundle', key: 'reset'},
	lblCancel: {type: 'bundle', key: 'cancel'},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'form',
			defaults:{
				margin: '5 5 0 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			items: [
				 {
			            xtype: 'container',
			            layout: {
			                type: 'hbox',
			                align: 'stretch'			                
			            },

			            height: 230,
			            items: [
			                {
			                    xtype: 'fieldset',
					            margin: '5 5 0 5',
					            layout: {
					                type: 'vbox',
					                align: 'stretch',
					                width: '100%'
					            },
			                    defaults: {
			                        labelAlign: 'right',
			                        margin: '5 5 0 0'
			                    }, 
			                    flex: 2,
			                    items: [
			                        {
			                            xtype: 'textfield',
			                            reference: 'ctlTo',
			                            fieldLabel: me.lblEmailTo
			                        },
			                        {
			                            xtype: 'textfield',
			                            reference: 'ctlCc',
			                            fieldLabel: me.lblEmailCc
			                        },
			                        {
			                            xtype: 'textfield',
			                            reference: 'ctlFrom',
			                            fieldLabel: me.lblEmailFrom
			                        },
			                        {
			                            xtype: 'textfield',
			                            reference: 'ctlSubject',
			                            fieldLabel: me.lblEmailSubject
			                        }
			                    ]
			                },
			                {
			                    xtype: 'fieldset',
			                    margin: '5 5 0 5',
					            layout: {
					                type: 'vbox',
					                align: 'stretch',
					                width: '100%'
					            },
			                    defaults: {
			                        labelAlign: 'right',
			                        margin: '5 5 0 0'
			                    },
			                    flex: 1,
			                    items: [
			                        {
			                            xtype: 'combobox',
			                            reference: 'ctlEmailTemplate',
			                            queryMode: 'local',
					   					bind: {
					    	    			store: '{emailTemplate}'
					    	    		},
					   					displayField: 'subject',
					   					valueField: 'emailID',
					   					value: '',
					   					listeners: {
					   						select: 'onEmailTemplateComboSelect'
					   					}
			                        },
			                        {
			                            xtype: 'button',
			                            text: me.lblApply,
			                    		listeners: {
					   						click: 'onApplyiClick'
					   					}
			                        }
			                    ]
			                },
			                {
			                    xtype: 'fieldset',
			                    margin: '5 5 0 5',
					            layout: {
					                type: 'vbox',
					                align: 'stretch',
					                width: '100%'
					            },
			                    defaults: {
			                        labelAlign: 'right',
			                        margin: '5 5 0 0',
			                        editable: false
			                    },
			                    flex: 2,
			                    items: [
			                        {
			                            xtype: 'textfield',
			                            reference: 'ctlTempSubject',
			                            fieldLabel: me.lblEmailSubject,
			                            bind: '{selectedTemplate.subject}'
			                        },
			                        {
			                            xtype: 'textareafield',
			                            reference: 'ctlTempContent',
			                            fieldLabel: me.lblEmailContent,
			                            bind: '{selectedTemplate.content}'
			                        },
			                        {
			                            xtype: 'textfield',
			                            reference: 'ctlTempTo',
			                            fieldLabel: me.lblEmailTo,
			                            bind: '{to}'
			                        },
			                        {
			                            xtype: 'textfield',
			                            reference: 'ctlTempCc',
			                            fieldLabel: me.lblEmailCc,
			                            bind: '{cc}'
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			        	xtype: 'fieldset',
	                    margin: '10 10 0 10',
			            layout: {
			                type: 'vbox',
			                align: 'stretch',
			                width: '100%'
			            },
	                    defaults: {
	                        labelAlign: 'right',
	                        margin: '5 5 0 0'
	                    },
	                    flex: 1,
			            items: [
			                {
								xtype: 'htmleditor',
								enableColors: true,
								enableAlignments: true,
			                    reference: 'ctlContent',
			                    flex: 1,
			                    fieldLabel: me.lblEmailContent
			                }
			            ]
			        },
			        {
			            xtype: 'container',
			            layout: {
			                type: 'hbox',
			                pack: 'center'
			            },
			            height: 40,
	                    defaults: {
	                        labelAlign: 'right',
	                        margin: '5 5 0 0'
	                    },
			            items: [
			                {
			                    xtype: 'button',
			                    text: me.lblSubmit,
			                    listeners: {
			                    	click: 'onSubmitClick'
			                    }
			                },
			                {
			                    xtype: 'button',
			                    text: me.lblCancel,
			                    listeners: {
			                    	click: 'onCancelClick'
			                    }
			                }
			            ]
			        }
		    ]
		});
		me.callParent();
	}
});