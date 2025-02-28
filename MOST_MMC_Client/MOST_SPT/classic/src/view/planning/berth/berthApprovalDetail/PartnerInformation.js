Ext.define('MOST.view.planning.berth.berthApprovalDetail.PartnerInformation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthapprovalpartnerInformation',
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	flex:1,
	
	title: {type: 'bundle', key: 'partnerInformation'},

	lblPartner: {type: 'bundle', key: 'partner'},
	lblPartnerName: {type: 'bundle', key: 'partnername'},
	lblPartnerCode: {type: 'bundle', key: 'partnecode'},
	lblCompanyStatus: {type: 'bundle', key: 'companyStatus'},
	lblContactPerson: {type: 'bundle', key: 'contactPerson'},
	lblPartnerType: {type: 'bundle', key: 'partnerType'},
	lblShippingLine: {type: 'bundle', key: 'shippingLine'},
	lblShipperConsignee: {type: 'bundle', key: 'shipperConsignee'},
	lblShippingAgent: {type: 'bundle', key: 'shippingAgent'},
	lblFowarder: {type: 'bundle', key: 'fowarder'},
	
	lblAddress: {type: 'bundle', key: 'address'},
	lblOfficeAddress: {type: 'bundle', key: 'officeaddress'},
	lblTelephoneNo: {type: 'bundle', key: 'telephoneno'},
	lblFaxNo: {type: 'bundle', key: 'faxno'},
	lblHomepage: {type: 'bundle', key: 'homepage'},
	lblEmail: {type: 'bundle', key: 'email'},

	lblAccount: {type: 'bundle', key: 'account'},
	lblNricNo: {type: 'bundle', key: 'nricno'},
	lblPaymentType: {type: 'bundle', key: 'paymenttype'},
	lblCreditLimit: {type: 'bundle', key: 'creditlimit'},
	lblOutstanding: {type: 'bundle', key: 'outstanding'},
	lblBalance: {type: 'bundle', key: 'balance'},
	lblBankName: {type: 'bundle', key: 'bankname'},
	lblAccountNo: {type: 'bundle', key: 'accountno'},
	
	lblStatus: {type: 'bundle', key: 'status'},
	lblApproveVessel: {type: 'bundle', key: 'approvevessel'},
	lblRejectVessel: {type: 'bundle', key: 'rejectvessel'},
	lblCancel: {type: 'bundle', key: 'cancel'},

	
	lblRemark: {type: 'bundle', key: 'remark'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox'
                            },

                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: me.lblPartner,
                                    flex: 1,
                                    margin: '5 5 0 5',
                                    height: 370,
                                    layout: {
                                        type: 'vbox'
                                    },
				                    defaults: {
				                        labelAlign: 'right',
				                        margin: '5 5 0 0',
				                        editable: false,
				                        width: '100%'
				                    }, 
                                    items: [{
                                            xtype: 'textareafield',
                                            fieldLabel: me.lblPartnerName,
                                            bind: '{partnerInfo.engSnm}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblPartnerCode,
                                            bind: '{partnerInfo.agencyCode}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblCompanyStatus,
                                            bind: '{partnerInfo.companyStatus}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblContactPerson,
                                            bind: '{partnerInfo.contactPerson}'
                                        },{
                                            xtype: 'fieldset',
                                            title: me.lblPartnerType,
                                            flex: 1,
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
						                    defaults: {
						                        labelAlign: 'right',
						                        margin: '5 5 0 0'
						                    },  
                                            items: [
                                                {
                                                    xtype: 'tagfield',
                                                    queryMode: 'local',
                                                    growMax: 60,
            					   					bind: {
            					    	    			store: '{partnerType}',
            					    	    			value: '{partnerTypeArray}'
            					    	    		},
            					   					displayField: 'ptnrName',
            					   					valueField: 'ptnrType',
            					   					publishes: 'ptnrName',
            					   					readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: me.lblAddress,
                                    flex: 1,
                                    height: 370,
                                    margin: '5 5 0 5',
                                    layout: {
                                        type: 'vbox'
                                    },
				                    defaults: {
				                        labelAlign: 'right',
				                        margin: '5 5 0 0',
				                        editable: false,
				                        width: '100%'
				                    }, 
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            fieldLabel: me.lblOfficeAddress,
                                            bind: '{partnerInfo.addr}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblTelephoneNo,
                                            bind: '{partnerInfo.telNo}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblFaxNo,
                                            bind: '{partnerInfo.faxNo}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblHomepage,
                                            bind: '{partnerInfo.homepage}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblEmail,
                                            bind: '{partnerInfo.email}'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: me.lblAccount,
                                    flex: 1,
                                    margin: '5 5 0 5',
                                    height: 370,
                                    layout: {
                                        type: 'vbox'
                                    },
				                    defaults: {
				                        labelAlign: 'right',
				                        margin: '5 0 0 0',
				                        editable: false,
				                        width: '100%'
				                    }, 
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblNricNo,
                                            bind: '{partnerInfo.licNo}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblPaymentType,
                                            bind: '{partnerInfo.paymentType}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblCreditLimit,
                                            bind: '{partnerInfo.creditLimit}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblOutstanding,
                                            bind: '{partnerInfo.outstanding}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblBalance,
                                            bind: '{partnerInfo.balance}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblBankName,
                                            bind: '{partnerInfo.bankName}'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: me.lblAccountNo,
                                            bind: '{partnerInfo.accNo}'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 40,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
		                    defaults: {
		                        margin: '5 5 0 0'
		                    }, 
                            items: [{
	                            	xtype: 'displayfield',
	                            	reference: 'ctlStatus',
	                            	width: 180,
			                        align: 'left',
	                                name: 'cbfStatus'
	                            },
                            	{
                                    xtype: 'button',
                                    reference: 'btnApprove',
                                    text: me.lblApproveVessel,
                                    value: 'AP',
                                    listeners: {
										click: 'onApproveVessel'
									}
                                },
                                {
                                    xtype: 'button',
                                    reference: 'btnReject',
                                    text: me.lblRejectVessel,
                                    value: 'RJ',
                                    listeners: {
										click: 'onApproveVessel'
									}
                                },
                                {
                                    xtype: 'button',
                                    reference: 'btnCancel',
                                    text: me.lblCancel,
                                    value: 'CN',
                                    listeners: {
										click: 'onApproveVessel'
									}
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 170,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
		                    defaults: {
		                        labelAlign: 'right',
		                        margin: '5 5 0 0',
		                        editable: false
		                    }, 
                            items: [
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: me.lblRemark,
                                    height: '100%',
                                    bind: '{partnerInfo.remark}'
                                }
                            ]
                        }
                    ]
                }
			]
		});
		
		me.callParent();
	}
});

