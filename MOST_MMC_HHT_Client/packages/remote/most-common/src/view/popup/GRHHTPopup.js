Ext.define('MOST.view.popup.GRHHTPopup', {
	extend: 'Ext.Panel',
	alias: 'widget.app-grhhtpopup',

	requires: [
		'MOST.view.popup.GRHHTPopupController',
		'MOST.view.popup.GRHHTPopupModel',
		'MOST.view.popup.VslCallIdFieldHHT'
	],


	controller: 'grhhtpopup',

	viewModel: {
		type: 'grhhtpopup'
	},

	//autoSize: true,
	layout: 'fit',
	shadow: false,
	padding: 5,	
	closeAction: 'destroy',
	scrollable: true,
    width : 500,
    height: 400,
	
	 listeners: {
	 	painted: 'onLoad'
	 	//show: 'onLoad'
	 },

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
						align: 'top'
					},
					padding: '2 0 0 0',
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 70
					},
					items: [
						{
							xtype: 'vslcallidfieldhht',
							label: { type: 'bundle', key: 'hht_vslcallid' },
							style: 'opacity: 1;',
							flex: 1,
							reference: 'ctlVslCallId',
							emptyText: 'VesselCallId',
							disabled: true,
							change: function (field, newValue) {
								field.setValue(newValue.toUpperCase());
							}
						},
						{
							xtype: 'button',
							reference: 'refSearchButton',
							ui: 'action',
							text: { type: 'bundle', key: 'search' },
							iconCls: 'x-fa fa-search',
							ui: 'retrieve-button-modern',
							handler: 'onSearch',
							//width: 150,
						},
						{
							xtype: 'button',
							//width: 150,
							margin: '0 0 0 5',
							reference: 'refBtnSelectHHT',
							text: { type: 'bundle', key: 'select' },
							ui: 'action',
							iconCls: 'x-fa fa-check-square-o',
							handler: 'onSelect',
						}
					]
				},
				//text field & bttion
				{
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 70
					},
					items: [
						{
							xtype: 'combobox',
							flex: 1.2,
							style: 'opacity: 0.9;',
							label: { type: 'bundle', key: 'snNo' },
							reference: 'ctlSn',
							bind: {
								store: '{snCombo}'
							},
							displayField: 'scdNm',
							valueField: 'shipgNoteNo',
							queryMode: 'local',
							clearable: true,
							typeAhead: true,
							disabled: true,
						},
						{
							xtype: 'textfield',
							reference: 'txtGr',
							flex: 1,
							label: { type: 'bundle', key: 'grNo' },
						}

					]
				},

				//gird
				{
					xtype: 'grid',
					reference: 'refGRPopupGrid',
					style: 'border: 1px solid silver; padding: 5px',
					flex: 1,
					bind: {
						store: '{grPopupList}'
					},
					listeners: {
						childdoubletap: 'onDblClick'
					},
					selectable: {
						mode: 'single',
                        checkbox: true,
						checkboxSelect: true,
						rows: true
					},
					columns: [
						{
							text: { type: 'bundle', key: 'gridNo' },
							xtype: 'rownumberer',
							width: 50,
							align: 'center'
						},
						{
							text: { type: 'bundle', key: 'bookingNo' },
							dataIndex: 'mfDocId',
							width: 170
						},
						{
							text: { type: 'bundle', key: 'grPopuphipgNoteNo' },
							dataIndex: 'shipgNoteNo',
							width: 170
						},
						{
							text: { type: 'bundle', key: 'grPopupGdsRecvNo' },
							dataIndex: 'grNo',
							width: 170
						},
						{
							text: { type: 'bundle', key: 'grPopupVslCallId' },
							dataIndex: 'vslCallId',
							width: 170
						}
					]
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
