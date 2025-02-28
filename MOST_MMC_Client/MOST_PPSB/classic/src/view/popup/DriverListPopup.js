Ext.define('MOST.view.popup.DriverListPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-driverlistpopup',
	requires: [],

	title: 'Driver List Popup',
	width: 700,
	height: 360,

	controller: 'driverlistpopup',

	viewModel: {
		type: 'driverlistpopup',
	},

	listeners: {
		afterrender: 'onLoad',
	},

	layout: { type: 'vbox', align: 'stretch' },

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDriverListPopupGrid', // Main Grid Name
	MAIN_STORE_NAME: 'driverListPopup',
	COMBO_BOX_STORE: 'driverListPopupSearchCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					usePagingToolbar: false,
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					stateful: true,
					plugins: ['gridexporter', 'gridfilters', 'clipboard'],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}',
					},
					listeners: {
						celldblclick: 'onDblClick',
					},
					viewConfig: {
						loadMask: true,
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('DriverListPopup'),
					},
				},
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					margin: '0 0 0 0',
					padding: '5 5 5 5',
					enableOverflow: true,
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'container',
							margin: '0 0 0 0',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'combo',
									reference: 'ctlCdNmCombo',
									queryMode: 'local',
									width: 100,
									bind: {
										store: '{driverListPopupSearchCombo}',
										value: '{theSearch.reqType}',
									},
									displayField: 'comName',
									valueField: 'comCode',
								},
								{
									xtype: 'textfield',
									reference: 'txtSearchCommonCdNm',
									maxLength: 20,
									enforceMaxLength: true,
									margin: '0 5 0 5',
									flex: 1,
									fieldStyle: 'text-transform: uppercase',
									listeners: {
										change: function () {
											var me = this;
											me.setValue(this.getValue().toUpperCase());
										},
									},
								},
								{
									xtype: 'button',
									text: ViewUtil.getLabel('search'),
									width: 100,
									iconCls: 'x-fa fa-search',
									margin: '0 0 0 0',
									listeners: {
										click: 'onSearch',
									},
								},
							],
						},
					],
				},
			],
		});

		me.callParent();
	},
});
