Ext.define('MOST.view.popup.RequesterPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-requesterpopuphht',

	requires: [
		'MOST.view.popup.PartnerCdTypePopupController',
		'MOST.view.popup.PartnerCdTypePopupModel'
    ],


    controller: 'partnercdtypepopup',
	
	viewModel: {
		type: 'partnercdtypepopup'
	},
	lblNo: {type: 'bundle', key: 'gridNo'},
	lblPtyCd: {type: 'bundle', key: 'ptyCd'},
	lblEngPtyNm: {type: 'bundle', key: 'engPtyNm'},
	lblPtyDivName: {type: 'bundle', key: 'ptyDivName'},
	lblTelNo: {type: 'bundle', key: 'telNo'},
	lblFaxNo: {type: 'bundle', key: 'faxNo'},
	lblRepresentative: {type: 'bundle', key: 'representative'},
	lblPtyDivCd: {type: 'bundle', key: 'ptyDivCd'},
	lblEmptySelect: {type: 'bundle', key: 'select'},

	autoSize: true,
	layout: 'fit',
	shadow: false,
	padding: 5,	
	closeAction: 'destroy',
	scrollable: true,
    height : 550,
    
    initialize : function(){
    	var me = this;
    	me.setItems(
		{
			xtype : 'formpanel',
			layout: {
				type: 'vbox',
				align : 'stretch'
			},
			padding: '0 0 0 0',
			items: [{
				xtype: 'container',
				layout: 'hbox',
				items:[{
					xtype: 'combobox',
					reference:'refPayerTypeCombo',
					style: 'opacity: 1;',
	                label: 'Type',
	                labelAlign: 'left',
		            labelWidth : 50,
		            labelTextAlign : 'left',
   					flex : 2,
					bind: {
						store: '{payerCdTypeComboPopupModelStore}'
					},
					displayField: 'engPtyNm',
   					valueField: 'ptyCd',
					editable: false,
			        queryMode: 'local',
					allowBlank: false
		        },{

			   		xtype: 'button',
			   		width: 80,
			   		reference: 'refsearchReqeusterButton',
					//text: 'Search',
					ui: 'action',
					iconCls: 'x-fa fa-search',
			   		handler: 'onHHTSearch',
			   		margin: '0 0 5 0'
		   		}]
			},
			{
				xtype: 'container',
				layout: 'hbox',
				items:[{
					xtype: 'combobox',
					style: 'opacity: 1;',
	                label: 'Code',
	                labelAlign: 'left',
	                width: 130,
	                labelAlign: 'left',
		            labelWidth : 50,
		            labelTextAlign : 'left',
		            margin: '0 10 0 0 ',
					reference:'refPayerCdNmCombo',
					bind: {
						store: '{codeNameComboStore}'
					},
					displayField: 'comName',
   					valueField: 'comCode',
   					value : 'CD',
   					queryMode: 'local',
			        editable: false,
			        allowBlank: false,
		        },{
					xtype: 'textfield',
					margin: '0 10 0 0 ',
					reference : 'refPayerCdNm',
					flex : 1, 
		            labelAlign: 'left',
		            placeholder: 'Input Search',
		            allowBlank: true,
		            listeners:{
						change: function(){
							var me = this;
							me.setValue(this.getValue().toUpperCase());
						}
					}
		       },{
		    		xtype: 'button',
			   		width: 80,
			   		reference: 'refBtnSelectRequestHHT',
					//text: 'Select',
					ui: 'action',
			   		margin: '0 0 5 20',
			   		iconCls: 'x-fa fa-check-square-o',
			   		handler: 'onSelectData',
		       }]
			},
	        {  
	            xtype: 'grid',
	            reference: 'refReqeusterPopupHHTGrid',
	            flex : 1,
	            style: 'border: 1px solid silver; padding: 5px',
				bind: {
					store: '{ptnrListPopupStore}'
				},
				listeners: {
					// childdoubletap : 'onHHTDblClick' 
				},
				selectable:{
					mode: 'single',
				},
				columns:[{
					text: this.lblNo,
            		xtype: 'rownumberer',
            		width : 50,
            		align : 'center'
            	},{
			        width: 80,
			        dataIndex: 'ptnrCode',
			        text: 'Code'
				},{
				    width: 130,
				    dataIndex: 'ptnrName',
				    text: 'Name'
				},{
				    width: 100,
				    dataIndex: 'ptnrTpNm',
				    text: 'Type',
				},{
				    width: 100,
				    dataIndex: 'telNo',
				    text: 'Phone'
				},{
				    width: 100,
				    dataIndex: 'faxNo',
				    text: 'Fax'
				}]
	        }]
		});
    	me.callParent();
    },
  
	afterRender : function() {
		var me = this;
		me.getController().onPopupHHTLoad();
		me.callParent(arguments);
	}
});
 