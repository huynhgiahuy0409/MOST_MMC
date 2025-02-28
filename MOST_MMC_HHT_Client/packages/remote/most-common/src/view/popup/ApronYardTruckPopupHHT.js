Ext.define('MOST.view.popup.ApronYardTruckPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.popup-apronyardtruckpopuphht',

	requires: [
		'MOST.view.popup.ApronYardTruckPopupHHTController',
		'MOST.view.popup.ApronYardTruckPopupHHTModel'
    ],

    controller: 'apronyardtruckpopuphht',
	viewModel: {
		type: 'apronyardtruckpopuphht'
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
					defaults: {
						labelAlign: 'left',
			            labelWidth : '80',
			            labelTextAlign : 'right',
					},
					items:[{
						xtype: 'textfield',
						margin: '0 10 0 0 ',
						flex : 3,
						label: 'Lorry No',
			            reference: 'reflorryNo',
			            placeholder: 'Truck No',
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
				   		text: { type: 'bundle', key: 'search' },
						iconCls: 'x-fa fa-search',
						ui: 'retrieve-button-modern',
						handler: 'onSearch',
						margin: '0 0 5 0',
			   		},
			   		{
				   		xtype: 'button',
				   		//flex : 1.4,
				   		reference: 'refBtnSelectLorryHHT',
				   		text: { type: 'bundle', key: 'select' },
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
		            //height : '300',
		            flex : 1,
		            style: 'border: 1px solid silver; padding: 5px',
					bind: {
						store:'{apronYardTruckListPopup}'
					},
	
					listeners: {
						childdoubletap : 'onHHTDblClick' 
					},
					selectable:{
						mode: 'single',
					},
					columns:[
						{
		            		header: me.lblNo,
		            		xtype: 'rownumberer',
		            		width : 50,
		            		align : 'center'
		        		},
						{
						    width: 120,
						    dataIndex: 'lorryNo',
						    text: { type: 'bundle', key: 'lorryNo' },
						},
						{
						    width: 250,
						    dataIndex: 'shipgNoteNo',
						    text: { type: 'bundle', key: 'snNo' }
						},
						{
						    width: 250,
						    dataIndex: 'blNo',
						    text: { type: 'bundle', key: 'blNo' }
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
 