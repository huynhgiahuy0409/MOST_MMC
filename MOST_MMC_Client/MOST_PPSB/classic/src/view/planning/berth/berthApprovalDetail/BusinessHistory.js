Ext.define('MOST.view.planning.berth.berthApprovalDetail.BusinessHistory', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthapprovalbusinesshistory',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
	title: {type: 'bundle', key: 'businessHistory'},

	lblBillingType: {type: 'bundle', key: 'billingtype'},
	lblVesselName: {type: 'bundle', key: 'vesselname'},
	lblPeriod: {type: 'bundle', key: 'period'},
	lblCargoType: {type: 'bundle', key: 'cargotype'},
	lblJpvc: {type: 'bundle', key: 'jpvc'},
	
	lblJpvcJob: {type: 'bundle', key: 'jpvcjob'},
	lblAtb: {type: 'bundle', key: 'atb'},
	lblAtc: {type: 'bundle', key: 'atc'},
	lblAtw: {type: 'bundle', key: 'atw'},
	lblAtu: {type: 'bundle', key: 'atu'},
	lblHandlingType: {type: 'bundle', key: 'handlingtype'},
	lblAmount: {type: 'bundle', key: 'amount'},
	lblStatus: {type: 'bundle', key: 'status'},
	lblBalance: {type: 'bundle', key: 'balance'},
	lblPaymentDate: {type: 'bundle', key: 'paymentdate'},
	
	btnSearch: {type: 'bundle', key: 'search'},
    
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
                    xtype: 'container',

                    height: 100,
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            margin: '5 5 0 5',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
				                    defaults: {
				                        labelAlign: 'right',
				                        margin: '5 0 0 0',
				                        editable: false
				                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: me.lblBillingType,
                                            reference: 'ctlBillingType',
                                            queryMode: 'local',
    					   					bind: {
    					    	    			store: '{billingTypeCombo}'
    					    	    		},
    					   					displayField: 'scdNm',
    					   					valueField: 'scd',
    					   					value : '',
                                            width: 250
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'ctlVesselName',
                                            fieldLabel: me.lblVesselName,
                                            margin: '5 0 0 20',
                                            editable: true,
                                            listeners:{
            	    							change: function(){
            	    								var me = this;
            	    								me.setValue(this.getValue().toUpperCase());
            	    							}
            	    						},
                                            width: 290
                                        },
                                        {
                                            xtype: 'datefield',
                                            reference: 'ctlFromDt',
                                            fieldLabel: me.lblPeriod,
                                            format: MOST.config.Locale.getShortDate(),
                                            width: 230,
                                            margin: '5 0 0 0'
                                        },
                                        {
                                            xtype: 'datefield',
                                            reference: 'ctlToDt',
                                            format: MOST.config.Locale.getShortDate(),
                                            margin: '5 0 0 5',
                                            width: 130
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
				                    defaults: {
				                        labelAlign: 'right',
				                        margin: '5 0 0 0',
				                        editable: false
				                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: me.lblCargoType,
                                            reference: 'ctlCargoType',
                                            queryMode: 'local',
    					   					bind: {
    					    	    			store: '{cargoTypeCombo}'
    					    	    		},
    					   					displayField: 'scdNm',
    					   					valueField: 'scd',
    					   					value : '',
                                            width: 250
                                        }, {/*
    			           					xtype:'jpvcfield',
    			           					labelWidth:120,
    			           					width:287,
    			           					fieldLabel:me.lblJpvc,
    			           					reference:'ctlJpvcDetail',
    			           					emptyText:me.lblJpvc
    			           				*/}, {
    										xtype: 'button',
    										text: me.btnSearch,
    										itemId:'inquiryItemId',
    										margin: '5 0 0 30',
    										iconCls: 'x-fa fa-search',
    										reference:'refBtnRetrieve',
    										listeners: {
    											click: 'onBusinessHistorySearch'
    										}
    									}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
    				xtype: 'grid',
    				flex : 1,
    				margin: '5 5 0 5',
    				stateful : true,
    				stateId : 'stateareBerthApprovalBusinessHistoryGrid',
    				reference: 'refBerthApprovalBusinessHistoryGrid',
    	    		bind: {
    	    			store: '{businessHistory}'
    	    		},
    				plugins: [
    					'gridexporter',
    					'gridfilters',
    					'clipboard'
    	    		],
    	    		selModel: {
    					type: 'spreadsheet',
    					cellSelect: false
    				},
    				columns: {
    	            	defaults: {
    	            		style : 'text-align:center',
    	            		align : 'center'
    	            	},
    	            	items: [{
    						header: me.lblBillingType,
    						dataIndex: 'billTp',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblJpvcJob,
    						dataIndex: 'jpvc',
    						filter: 'string',
    						width: 150
    					},
    					{
    						header: me.lblVesselName,
    						dataIndex: 'vslNm',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblAtb,
    						dataIndex: 'atb',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblAtc,
    						dataIndex: 'atc',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblAtw,
    						dataIndex: 'atw',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblAtu,
    						dataIndex: 'atu',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblHandlingType,
    						dataIndex: 'handlingType',
    						filter: 'string',
    						width: 130
    					},
    					{
    						header: me.lblCargoType,
    						dataIndex: 'cargoType',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblAmount,
    						dataIndex: 'amount',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblStatus,
    						dataIndex: 'vslTpNm',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblBalance,
    						dataIndex: 'balance',
    						filter: 'string',
    						width: 100
    					},
    					{
    						header: me.lblPaymentDate,
    						dataIndex: 'paymentDt',
    						filter: 'string',
    						width: 150
    					}]
    				}
                }
			]
		});
		
		me.callParent();
	}
});

