Ext.define('MOST.view.popup.InGateTruckListPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.popup-ingatetrucklistpopuphht',

	requires: [
		'MOST.view.popup.InGateTruckListPopupHHTController',
		'MOST.view.popup.InGateTruckListPopupHHTModel'
    ],

    controller: 'ingatetrucklistpopuphht',
	viewModel: {
		type: 'ingatetrucklistpopuphht'
	},

    shadow: false,
    layout: 'fit',
    scrollable: true,
    width : 650,
	padding: 5,	

    initialize : function(){
    	var me = this;
    	me.setItems({
			xtype: 'formpanel',
			layout: {
				type: 'vbox',
				align: 'stretch'				
			},
			padding: '0 0 0 0',
			items: [
				//Lorry NO Textfield
				{
					xtype: 'container',
					layout: 'hbox',
					items:[{
						xtype: 'textfield',
						margin: '0 10 0 0 ',
						flex : 3,
						label: { type: 'bundle', key: 'lorryNo'},
	   					labelAlign: 'left',
			            labelWidth : '70',
			            labelTextAlign : 'left',			            
			            reference: 'reflorryNo',
			            listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						}
			       },{
				   		xtype: 'button',
				   		//flex : 1.5,
				   		reference: 'refsearchLorryButton',
						text: { type: 'bundle', key: 'search'},
						iconCls: 'x-fa fa-search',
						ui: 'retrieve-button-modern',
						handler: 'onSearch',
						margin: '0 0 5 0',
			   		},
			   		{
				   		xtype: 'button',
				   		//flex : 1.4,
				   		reference: 'refBtnSelectLorryHHT',
						text: { type: 'bundle', key: 'select'},
						ui: 'action',
				   		margin: '0 0 5 5',
				   		iconCls: 'x-fa fa-check-square-o',
				   		handler: 'onSelectData',
			   		}
			   		]
				},
		        {  
		            xtype: 'grid',
		            reference: 'refLorryPopupHHTGridHHT',
		            flex : 1,
		            style: 'border: 1px solid silver; padding: 5px',
					bind: {
						store:'{lorryGateInListPopup}'
					},
					listeners: {
						childdoubletap : 'onHHTDblClick' 
					},
					selectable:{
						mode: 'single',
					},
					columns:[
						{
						    width: 120,
						    dataIndex: 'lorryNo',
						    text: { type: 'bundle', key: 'lorryNo' },
						},
						{
						    width: 100,
						    dataIndex: 'grNo',
						    text: { type: 'bundle', key: 'grNo' },
						},
						{
						    width: 200,
						    dataIndex: 'sdoNo',
						    text: { type: 'bundle', key: 'sdoNo' },
						},
						{
						    width: 180,
						    dataIndex: 'gateTxnNo',
						    text: { type: 'bundle', key: 'gate_txnno' },
						}
					],
		        }
			]
    	});
    	me.callParent();
    },
  
	afterRender : function() {
		var me = this;
		me.getController().onHHTLoad();
		me.callParent(arguments);
	}
});
 