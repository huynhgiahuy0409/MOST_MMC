Ext.define('MOST.view.popup.ExportPDFPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-exportpdfpopup',
	requires: [
		
	],
	
	
	width: 470,

	config: {
		//recvData: null
	},
	
	listeners:{
		afterrender: 'onLoadExportPDFPopup'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype:'container',
				/*layout: {
	                type: 'vbox',
	                align: 'stretch'
	            },*/
	            flex:1,
	            defaults:{
					margin: '5 5 5 5' // top, right, bottom, left
				},
	            items:[{
	            	xtype: 'radiogroup',
             		columns: 1,
                    vertical: true,
                    margin:'0 0 0 17',
                    reference:'refRadioReportType',
                    //reference:'ctlMegaDetailWarehouseRadio',
                    //inputValue : 'WHO',
                    flex:1,
                    listeners: {
                       // change: 'onRadioIvReportChange'
                    },
                    items:[
                    {
    		    		xtype: 'container',
    		    		felx: 1,
    			    	layout: {
    			    		type: 'hbox',
    			    		align: 'stretch'
    			    	},
    			    	items: [
    			    	{
    						xtype: 'radiogroup',
    						layout: 'vbox',
    						reference: 'ctl_berth',
    						hidden : true,
    						items:[
    						{
    							xtype: 'radiofield',
    							boxLabel: ViewUtil.getLabel('allBerth'),
    							reference: 'refRadioAll',
    							name: 'allBerth_radio',
    							margin: '5 10 0 10',
    							inputValue: 'Y',
    							listeners: {
    								change: 'onChangeBerth'
    							}
    						},
    						{
    							xtype: 'radiofield',
    							boxLabel: ViewUtil.getLabel('berth'),
    							reference: 'refRadioBerth',
    							margin: '5 10 0 10',
    							checked: true,
    							name: 'allBerth_radio',
    							inputValue: 'N'
    						}]
    					},
                        {
    						xtype: 'container',
	    		    		felx: 1,
	    			    	layout: {
	    			    		type: 'vbox',
	    			    		align: 'stretch'
	    			    	},
	    			    	items: [
	    			    	{
	    			    		xtype: 'label',
	    			    		text:'', 
	    			    		height: 30
	    			    	},
							{
								xtype:'combobox',
								reference: 'refPopupBerthType',
		                        labelWidth: 50,
								fieldLabel: ViewUtil.getLabel('berth'),
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								width: 200,
								margin:'5 0 0 0',
								editable: false,
								//disabled: true,
								bind: {
									store: '{popUpBerthTypeCombo}'
								}
							}]
    					}]
                    },
					{
    		    		xtype: 'container',
    		    		felx: 1,
    			    	layout: {
    			    		type: 'hbox',
    			    		align: 'stretch'
    			    	},
    			    	items: [ {
    						xtype: 'button',
    						text: ViewUtil.getLabel('exportToPDF'),
    						width: 100,
    						height: 33,
    						margin:'10 10 0 25',
    						name: 'btnExportTypePopupOK',
    						listeners:{
    							click:'onPrintPDF'
    						}
    					},
                        {
    						xtype: 'button',
    						text: ViewUtil.getLabel('previewToPDF'),
    						width: 100,
    						height: 33,
    						margin:'10 10 0 0',
    						name: 'btnExportTypePopupOK',
    						listeners:{
    							click:'onDetailPreview'
    						}
    					}]
    				}]
	            }]
			}]
		});
		
		me.callParent();
	}
});

