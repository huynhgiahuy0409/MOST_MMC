Ext.define('MOST.view.document.assigningdriverandtruck.AssigningDriversAndCarTrucksForVehicle', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-assigningdriversandcartrucksforvehicle',
	requires: [],

	width: 1150,
	height: 520,
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refAssignedDriversAndTrucksForVehicleGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'assignedDriversAndTrucks',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: {
		type: 'hbox',
		align: 'stretch'
	},


	initComponent: function () {

		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					margin: '5 5 0 0',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						defaults: {
							margin: '0 0 0 0'
						},
						xtype: 'tabpanel',
						reference: 'refAssigningDriversAndTrucksForVehicle',
						flex: 1,
						items: [{
							xtype: 'panel',
							itemId: "tabDrivers",
							activeTab: 0,
							title: ViewUtil.getLabel('assigningDriversTab'),
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [{
								xtype: 'app-assigningdriverstab',
								reference: 'refAssigningDriversTab',
								flex: 1
							}]
						},
						{
							xtype: 'panel',
							itemId: "tabTrucks",
							activeTab: 1,
							title: ViewUtil.getLabel('assigningTrucksTab'),
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [{
								xtype: 'app-assigningtruckstab',
								reference: 'refAssigningTrucksTab',
								flex: 1
							}]

						}]
					}]

				},
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
						align: 'center',
						pack: 'center'
					},
					items: [
						{
							xtype: 'button',
							width: 90,
							text: ViewUtil.getLabel('add'),
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							reference: 'refBtnCreate',
							listeners: {
								click: 'onAssigningDriversAndTrucksForVehicleAdd'
							}
						},
						{
							xtype: 'button',
							margin: '5 0 0 0',
							width: 90,
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							reference: 'refBtnRemove',
							listeners: {
								click: 'onAssigningDriversAndTrucksForVehicleRemove'
							}
						}
					]
				},
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '5 5 5 5',
					viewConfig: {
						stripeRows: true,
						enableTextSelection: true,
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					title: '',
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('AssigningDriversAndTrucksForVehicle')
					}
				}],

			dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [{
					xtype: 'fieldset',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelWidth: 60,
						labelAlign: 'right',
						margin: '5 0 0 0'
					},
					items: [
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								margin: '4 0 0 0',
								labelWidth: 90
							},
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									bind: '{theAssigning.subDoNo}',
									fieldLabel: ViewUtil.getLabel('SDONo'),
									readOnly: true
								},
								{
									xtype: 'textfield',
									bind: '{theAssigning.nosOfVin}',
									fieldLabel: ViewUtil.getLabel('noOfVIN'),
									readOnly: true
								}

							]
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								margin: '4 0 0 0',
								labelWidth: 90
							},
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									bind: '{theAssigning.tsptr}',
									reference: 'refTsptr',
									fieldLabel: ViewUtil.getLabel('transportCo'),
									readOnly: true
								}

							]
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								labelWidth: 90,
								margin: '4 0 0 0',
							},
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									reference: 'refDriverNm',
									fieldStyle: 'text-transform:uppercase',
									fieldLabel: ViewUtil.getLabel('driverNm')
								},
								{
									xtype: 'textfield',
									reference: 'refTruckNo',
									fieldStyle: 'text-transform:uppercase',
									fieldLabel: ViewUtil.getLabel('truckNo')
								}
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'center',
								pack: 'center'
							},
							margin: '5 0 0 10',
							items: [
								{
									xtype: 'button',
									width: 90,
									text: ViewUtil.getLabel('search'),
									cls: 'search-button',
									reference: 'CtlBtnSearch',
									listeners: {
										click: 'onAssigningSearch'
									}
								},
								{
									xtype: 'button',
									margin: '5 0 0 0',
									width: 90,
									text: ViewUtil.getLabel('ok'),
									reference: 'ctlBtnOk',
									listeners: {
										click: 'onClickOk'
									}
								}
							]
						},
					]
				}
				]
			}]
		});

		me.callParent();

	}
});

