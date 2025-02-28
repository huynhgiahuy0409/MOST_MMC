Ext.define('MOST.view.popup.DownloadPDFExcelPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-downloadpdfexcelpopup',
	requires: [
		
	],
	
	title: "Download Report",
	width: 400,


	//controller: 'invoicinglist',
	
	//viewModel: {
		//type: 'invoicinglist'
	//},
	
	listeners:{
		afterrender: 'onDetailPreviewLoadPopup',
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
				            ]
						}
		            ]
				},	
			]
		});
		me.callParent();
	}
});

