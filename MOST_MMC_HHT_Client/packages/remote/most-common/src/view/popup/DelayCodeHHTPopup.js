Ext.define('MOST.view.popup.DelayCodeHHTPopup', {
	extend: 'Ext.Panel',
	alias: 'widget.app-delaycodehhtpopup',

	requires: [
		'MOST.view.popup.DelayCodePopupHHTController',
		'MOST.view.popup.DelayCodePopupHHTModel'
	],

	controller: 'delaycodepopuphht',

	viewModel: {
		type: 'delaycodepopuphht'
	},

	//autoSize: true,
	layout: 'fit',
	shadow: false,
	padding: 5,	
	closeAction: 'destroy',
	scrollable: true,
    //width : 550,

	initialize: function () {
		var me = this;
		me.setItems({
			xtype: 'formpanel',
			layout: {
				type: 'vbox',
				align : 'stretch'
			},
			padding: '0 0 0 0',
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',						
					},
					items: [
						{
							xtype:'combobox',
							reference:'refTypeCombo',
							align : 'left',
							bind: {
								store: '{tpCombo}'
							},
							displayField: 'tpNm',
							valueField: 'tpCd',
							queryMode: 'local',
							value : 'CD',
							width : 100,
							editable: false
						},
						{
							xtype: 'textfield',
							flex: 1,
							margin: '0 0 0 5',
							reference: 'txtScd',
							listeners:{
								  change: function(){
									  this.setValue(this.getValue().toUpperCase());
								  },
							  }
						},
						{
							xtype: 'button',
							align: 'center',
							width: 80,
							margin: '0 0 5 5',
							reference: 'refSearchDelayCodeButton',
							iconCls: 'x-fa fa-search',
							ui: 'action',
							handler: 'onSearch',
						},
						{
							xtype: 'button',
							align: 'center',
							width: 80,
							margin: '0 0 5 5',
							reference: 'refSelectDelayCodeButton',
							iconCls: 'x-fa fa-check-square-o',
							ui: 'action',
							handler: 'onSelectDelayCodeHHT',
						},
					]
				},
				{

					xtype: 'grid',
					reference: 'refDelayCodeGrid',
					flex: 1,
					//height: '300',
					style: 'border: 1px solid silver; padding: 5px',
					bind: {
						store: '{delayCodePopup}'
					},
					listeners: {
						childdoubletap: 'onSelectDelayCodeHHT'
					},
					selectable: {
						mode: 'single',
					},
					columns: [{
						header: 'No',
						xtype: 'rownumberer',
						width: 50,
						align: 'center'
					},
					{
						flex: 1,
						dataIndex: 'scd',
						text: 'Code'
					},
					{
						flex: 1,
						dataIndex: 'scdNm',
						text: 'Name'
					},
					{
						flex: 1,
						dataIndex: 'acptYN',
						text: 'Accepted Delay'
					},
					],
				
				}
				]
		});
		me.callParent();
	},

	afterRender: function () {
		var me = this;
		//me.getController().onLoad();
		me.callParent(arguments);
	}
});
