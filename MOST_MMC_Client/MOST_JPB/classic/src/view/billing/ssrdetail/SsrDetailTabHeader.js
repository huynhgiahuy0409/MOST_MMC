Ext.define('MOST.view.billing.ssrdetail.SsrDetailTabHeader', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-ssrdetailtabheader',
	requires: [
		'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab'
	],
	//height: 450,
	width: 750,
	
	listeners:{
		//afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            defaults:{
						margin: '10 5 0 20',
						labelAlign: 'right'
					},
		            margin: '5 0 5 0',
		            items: [
		            	{
		            		xtype: 'container',
		            		layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },		            		
		            		items:[
				            	{
				            		xtype: 'container',
				                	flex:1,
		                            layout: {
		                                type: 'vbox',
		                                align: 'stretch'
		                            },
		                            defaults:{
		        						labelAlign: 'right',
		        						margin: '0 0 5 0'
		        					},
		                            items:[
		                            	{
		            						xtype: 'textfield',
		            						reference: 'cltDetailTabHeaderSSRNo',
		                                    flex:1,
		                                    fieldLabel: 'SSR No', 
		                                    labelWidth: 90,
		                                    editable:false,
		                                    bind:'{theHeadDetail.ssrNo}'
		            					},
		                            	{
		            						xtype: 'datefield',
		            						reference: 'cltDetailTabHeaderIssueDate',
		            				        fieldLabel: ViewUtil.getLabel('issueDt'),
		            				        flex:1,
		            				        labelWidth: 90,
		            				        format: MOST.config.Locale.getShortDate(),
		            				        allowBlank: false,
//		            				        bind:'{theHeadDetail.issueDt}',
		            				        fieldStyle: 'background-color: #CAECF4',
		            				    },
		            				    {
		            				    	xtype: 'datefield',
		            						reference: 'cltDetailTabHeaderDueDate',
		            				        fieldLabel: ViewUtil.getLabel('dueDt'),
		            				        flex:1,
		            				        labelWidth: 90,
		            				        format: MOST.config.Locale.getShortDate(),
		            				        allowBlank: false,
//		            				        bind:'{theHeadDetail.dueDt}',
		            				        fieldStyle: 'background-color: #CAECF4',
		            				    },
		                            	{
		            				    	xtype: 'combo',
		            						reference: 'cltDetailTabHeaderBerthNo',
		            	   					flex:1,
		            				        labelWidth: 90,
		            	   					width:200,
		            	   					fieldLabel: ViewUtil.getLabel('berthNo'),
		            	   					queryMode: 'local',
		            	   					bind: {
		            	    	    			store: '{berthNoCombo}',
		            	    	    			value: '{theHeadDetail.berthNo}'
		            	    	    		},
		            	    	    		displayField: 'locNm',
		            	   					valueField: 'locId',
		            	   					value : '',
		            	   					editable: true,
		            	   					allowBlank: true,
		            	   					forceSelection:true
		            					},
		            					{
		            						xtype: 'combo',
		            						reference: 'cltDetailTabHeaderWhId',
		            	   					flex:1,
		            				        labelWidth: 90,
		            	   					width:150,
		            	   					fieldLabel: ViewUtil.getLabel('whId'),
		            	   					queryMode: 'local',
		            	   					bind: {
		            	    	    			store: '{whIdCombo}',
		            	    	    			value: '{theHeadDetail.whId}'
		            	    	    		},
		            	    	    		displayField: 'scdNm',
		            	   					valueField: 'scd',
		            	   					value : '',
		            	   					editable: true,
		            	   					allowBlank: true,
		            	   					forceSelection:true
		            					},
		            					{
		        							xtype : 'combo',
		        							labelWidth: 90,
		        							fieldLabel : ViewUtil.getLabel('refNo'),
		        							reference : 'cltDetailTabHeaderRefNo',
		        							bind: {
		        		    	    			store: '{snBlCombo}',
		        		    	    			value: '{theHeadDetail.refNo}'
		        		    	    		},
		        		    	    		displayField: 'cdNm',
		        		   					valueField: 'cd',
		        		   					queryMode: 'local',
		        		                    listeners:{
		        								select:'getRefNoCombo'
		        							},
		        						},
		                            ]
				            	},
				            	{// Header Right
				            		xtype: 'container',
				                	flex:1,
		                            layout: {
		                                type: 'vbox',
		                                align: 'stretch'
		                            },
		                            defaults:{
		        						labelAlign: 'right',
		        						margin: '0 0 5 0'
		        					},
		                            items:[
		                            	{
		                   					xtype:'partnercdtypefield',
		            						reference:'cltDetailTabHeaderPartner',
		            						fieldLabel:ViewUtil.getLabel('ssrPayer'),
		            						emptyText:ViewUtil.getLabel('ssrPayer'),
		            						params:{
		            							searchModule: CodeConstants.LCD_MOST
		            						},
		            						change: function(field, newValue){
		            				        	   field.setValue(newValue.toUpperCase());
		            				        },
		            				        labelWidth: 120,                                                                     
		            				        allowBlank: false,
		            						editable: false,
		            						bind:{
		            							value: '{theHeadDetail.payerCd}'
		            						},
		            						fieldStyle: 'background-color: #CAECF4',
		                   				},
		                   				{
		            						xtype: 'textfield',
		                                    fieldLabel: ViewUtil.getLabel('accountno'),
		                                    labelWidth: 120,
		                                    editable:false,
		                                    reference: 'cltDetailTabHeaderAccNo',
		                                    bind:{
		                                    	value: '{theHeadDetail.accountNo}'
		                                    }
		            					},
		            					{
		            						xtype: 'textfield',
		                                    fieldLabel: ViewUtil.getLabel('payerType'),
		                                    labelWidth: 120,
		                                    editable:false,
		                                    hidden: true,
		                                    reference: 'cltDetailTabHeaderPayerTpCd',
		                                    bind:{
		                                    	value: '{theHeadDetail.payerTpCd}'
		                                    }
		            					},
		                            	{
		            						reference: 'cltDetailTabHeaderTpPay',
		            	   					xtype: 'combo',
		            				        labelWidth: 120,
		            	   					width:200,
		            	   					fieldLabel: ViewUtil.getLabel('paymenttype'),
		            	   					queryMode: 'local',
		            	   					bind: {
		            	    	    			store: '{typePaymentCombo}',
		            	    	    			value: '{theHeadDetail.paymentType}'
		            	    	    		},
		            	    	    		displayField: 'codeName',
		            	   					valueField: 'code',
		            	   					value : '',
		            	   					editable: false,
		            	   					allowBlank: true,
		            	   					forceSelection:true,
		            	   					hidden: true,
		            	   					listeners:{
		            	   						//change: 'onChangePayTp'
		            	   					},
		            	   					fieldStyle: 'background-color: #CAECF4',
		            					},
		            					{
		            						xtype: 'textfield',		                                    
		                                    fieldLabel: ViewUtil.getLabel('paymterm'),
		                                    labelWidth: 120,
		                                    readOnly: true,
		                                    width:200,
		                                    reference: 'cltDetailTabHeaderPaymTerm',
		                                    maxLength : 20,
		                                    enforceMaxLength : true,
		                                    hidden: true,
		                                    bind:{
		                                    	value: '{theHeadDetail.paymTerm}'
		                                    }
		            					},
		            					{
		            						xtype: 'combo',
		            						reference: 'cltDetailTabHeaderIVPrx',
		            				        labelWidth: 120,
		            	   					width:150,
		            	   					fieldLabel: ViewUtil.getLabel('inPrefix'),
		            	   					queryMode: 'local',
		            	   					bind: {
		            	    	    			store: '{invoicePrefixCombo}',
		            	    	    			value: '{theHeadDetail.ivPrfx}'
		            	    	    		},
		            	    	    		displayField: 'scdNm',
		            	   					valueField: 'scd',
		            	   					value : '',
		            	   					editable: false,
		            	   					allowBlank: false,
		            	   					forceSelection:true,
		            	   					listeners:{
		            	   						change: 'onChangeIvPrefix'
		            	   					},
		            	   					fieldStyle: 'background-color: #CAECF4',
		            					}
		                            ]
				            	}
		            		]
		            	},{
		            		xtype: 'container',
		            		layout: {
		            			type: 'vbox',
		            			align: 'stretch'
		            		},
		            		defaults:{
		            			labelAlign: 'right',
		            			margin : '0 0 0 20'
		            		},
		            		margin : '0 0 0 0',
		            		items:[
		            			{
		            				xtype: 'textareafield',
		            				reference: 'cltDetailTabHeaderRemark',
		            				flex:1,
		            				fieldLabel: ViewUtil.getLabel('remark'),
		            				labelWidth: 90,
		            				width: 300,
		            				editable:true,
		            				bind:{
		            					value:'{theHeadDetail.rmk}'
		            				}
		            			}
		            		]
		            	}
		            ]
				}
			],
		    
		    /*Head*/
		    dockedItems: [{
		    	
		    }]
		});
		
		me.callParent();
	}
});

