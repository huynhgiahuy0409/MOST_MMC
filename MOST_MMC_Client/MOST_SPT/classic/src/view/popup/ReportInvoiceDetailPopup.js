Ext.define('MOST.view.popup.ReportInvoiceDetailPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-reportinvoicedetailpopup',
	requires: [
		
	],
	
	title: "Select Currency",
	width: 450,


	//controller: 'invoicinglist',
	
	//viewModel: {
		//type: 'invoicinglist'
	//},
	
	listeners:{
		afterrender: 'onDetailPreviewLoad',
		destroy:'beforerptivdetailpopupclose'
	},
	config: {
		//recvData: null
	},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [
				{
					xtype:'container',
					layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            flex:1,
		            defaults:{
						margin: '5 5 5 5' // top, right, bottom, left
					},
		            items:[
						{
							xtype:'container',
							layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            flex:1,
				            defaults:{
								margin: '5 5 5 5' // top, right, bottom, left
							},
				            items:[{
			             		xtype: 'radiogroup',
			             		columns: 2,
			                    vertical: true,
			                    //margin:'0 0 0 17',
			                    reference:'refRdGrpCurrency',
			                    width: 150,
			                    listeners:{
			                    	change: 'onRdGroupChange'
			                    },
			                    items:[{ 
			                    		boxLabel: ViewUtil.getLabel('defaultCurrency'),
			                    		reference:'rdRm',
			                    		inputValue:'rm',
			                    		name:'rb',
			                    		checked: true,
			                    	},{ 
			                    		boxLabel: ViewUtil.getLabel('others'),
			                    		reference:'rdOthers',
			                    		name:'rb',
			                    		inputValue:'others',
			                    		
			                    }]
			         		 },{
			         			 xtype:'combobox',
			         			 reference: 'cboCurrency',
			         			 width:150,
			         			 disabled:true,
			         			 bind: {
			    	    			store: '{currencyCombo}'
			         			 },
			   					 displayField: 'currency',
			   					 valueField: 'currency',
			   					 queryMode:'local',
			   					 listeners:{
			   						 change:function(ele, newValue, oldValue){
			   							var me = this
			   							me.setRawValue(newValue.toUpperCase());
			   							me.setValue(newValue.toUpperCase());
			   						 }
			   					 }
			   					 /*renderer:function(val){
			   						 return val.toUpperCase();
			   					 }*/
			         		 }]
						},
						
						{
							xtype:'container',
							layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            flex:1,
				            defaults:{
								margin: '5 5 5 5' // top, right, bottom, left
							},
				            items:[
				            	{
					            	xtype: 'radiogroup',
				             		columns: 1,
				                    vertical: true,
				                    margin:'0 0 0 17',
				                    reference:'refDetailRadioReportType',
				                    flex:1,
				                    items:[{
				                    	boxLabel: ViewUtil.getLabel('pdfFile'),
				                		inputValue: 'PDF',
				                		name:'exporttype',
				                		flex:1,
				                		reference:'refDetailRadioPdf',
				                		checked:true
				                    },{
				                    	boxLabel: ViewUtil.getLabel('excelFile'),
				                		inputValue: 'EXCEL' ,
				                		name:'exporttype',
				                		flex:1,
				                		reference:'refDetailRadioExcel'
				                    }]
					            },
				            	{
					            	xtype: 'radiogroup',
				             		columns: 1,
				                    vertical: true,
				                    margin:'0 0 0 17',
				                    reference:'refDetailRadioReportPaymentType',
				                    flex:1,
				                    items:[{
				                    	boxLabel: ViewUtil.getLabel('invoice'),
				                		inputValue: 'INVOICE',
				                		name:'paymentType',
				                		flex:1,
				                		reference:'refDetailRadioInvoice',
				                		checked:true
				                    },
									{
				                    	boxLabel: ViewUtil.getLabel('cashReceipt'),
				                		inputValue: 'CASH' ,
				                		name:'paymentType',
				                		flex:1,
				                		reference:'refDetailRadioCashReceipt',
				                		hidden: true
				                    }]
					            }
				            ]
						}
		            ]
				},	
			]
		});
		
		me.callParent();
	}
});

