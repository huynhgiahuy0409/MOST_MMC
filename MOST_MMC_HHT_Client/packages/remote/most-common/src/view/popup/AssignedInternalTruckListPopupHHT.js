Ext.define('MOST.view.popup.AssignedInternalTruckListPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.popup-assignedinternaltrucklistpopuphht',

	requires: [
		'MOST.view.popup.AssignedInternalTruckListPopupHHTController',
		'MOST.view.popup.AssignedInternalTruckListPopupHHTModel'
    ],

    controller: 'assignedinternaltrucklistpopuphht',
	viewModel: {
		type: 'assignedinternaltrucklistpopuphht'
	},

    shadow: false,
    layout: 'fit',
    scrollable: true,
    width : 650,
    padding: '5',

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
					padding: 3,
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
	   					labelAlign: 'left',
			            labelWidth : '70',
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
		            height : '300',
		            flex : 1,
		            style: 'border: 1px solid silver; padding: 5px',
					bind: {
						store:'{assignedInternalTruckListPopup}'
					},
	
					listeners: {
						childdoubletap : 'onHHTDblClick' 
					},
					selectable:{
						mode: 'single',
					},
					columns:[
						{
		            		header: 'No.',
		            		xtype: 'rownumberer',
		            		width : 50,
		            		align : 'center'
		        		},
						{
						    width: 150,
						    dataIndex: 'lorryNo',
						    text: 'Lorry No',
						},
						{
						    width: 200,
						    dataIndex: 'shipgNoteNo',
						    text: 'SN'
						},
						{
						    width: 200,
						    dataIndex: 'blNo',
						    text: 'BL'
						},
						{
						    width: 200,
						    dataIndex: 'vslCallId',
						    text: 'VslCallId',
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
 