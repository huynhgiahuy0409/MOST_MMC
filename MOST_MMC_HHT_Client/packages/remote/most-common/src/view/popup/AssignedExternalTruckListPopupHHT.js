Ext.define('MOST.view.popup.AssignedExternalTruckListPopupHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.popup-assignedexternaltrucklistpopuphht',

	requires: [
		'MOST.view.popup.AssignedExternalTruckListPopupHHTController',
		'MOST.view.popup.AssignmentTruckPopupModel'
	],

	controller: 'assignedexternaltrucklistpopuphht',
	viewModel: {
		type: 'assignmenttruckpopup'
	},

	// layout: {
	// 	type: 'vbox',
	// 	align: 'stretch'
	// },

	layout: 'fit',
	shadow: false,
	padding: 5,	
	closeAction: 'destroy',
	scrollable: true,
    width : 500,
	//height: 400,

	listeners: {
		painted: 'onLoad'
	},
	items: [
		{
			xtype: 'formpanel',
			layout: {
				type: 'vbox',
				align : 'stretch'
			},
			padding: '0 0 0 0',
			items: [
				{//Lorry No field
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							reference: 'txtLorryNoId',
							flex: 1,
							labelAlign: 'left',
							labelWidth: 70,
							label: { type: 'bundle', key: 'truckNo' },
							listeners: {
								change: function () {
									var me = this;
									me.setValue(this.getValue().toUpperCase());
								}
							}
						},
						{
							xtype: 'button',
							//width: 150,
							margin: '0 0 5 5',
							reference: 'refBtnSearchLorryNoHHT',
							iconCls: 'x-fa fa-search',
							ui: 'retrieve-button-modern',
							text: { type: 'bundle', key: 'search' },
							handler: 'onSearch',
						},
						{
							xtype: 'button',
							//width: 150,
							margin: '0 0 5 5',
							reference: 'refBtnSelectHHT',
							text: { type: 'bundle', key: 'select' },
							ui: 'action',
							iconCls: 'x-fa fa-check-square-o',
							handler: 'onSelectDataHHT',
						}			
					]
				},
				{//Lorry No Grid
					xtype: 'grid',
					reference: 'refAssignmentLorrysPopupGrid',
					flex : 1,
	            	style: 'border: 1px solid silver; padding: 5px', //style: 'border: 1px solid silver; border-radius: 3px',					border: true,
					
					bind: {
						store: '{assignmentTruckListPopup}'
					},
					listeners: {
						childdoubletap: 'onHHTDblClick'
					},
					selectable: {
						columns: false,
						checkbox: true,
						checkboxSelect: true,
						rows: true,
						cells: false,
						mode: 'single',
						deselectable: true,
						headerCheckbox: false,
					},
					columns: [
						{
							text: { type: 'bundle', key: 'gridNo' },
							xtype: 'rownumberer',
							width: 50,
							align: 'center'
						},
						{
							text: { type: 'bundle', key: 'lorryNo' },
							dataIndex: 'lorryNo',
							width: 120
						},
						{
							text: { type: 'bundle', key: 'blNo' },
							dataIndex: 'blNo',
							width: 170
						},
						{
							text: { type: 'bundle', key: 'doNo' },
							dataIndex: 'doNo',
							width: 170
						},
						{
							text: { type: 'bundle', key: 'shipgNoteNo' },
							dataIndex: 'shipgNoteNo',
							width: 170
						},
						{
							text: { type: 'bundle', key: 'grNo' },
							dataIndex: 'grNo',
							width: 120
						},
						{
							text: { type: 'bundle', key: 'transporter' },
							dataIndex: 'transportCd',
							width: 180
						},
						{
							text: { type: 'bundle', key: 'driverNm' },
							dataIndex: 'driverName',
							width: 180
						}
					]
				}
			]
		}
	]
});
