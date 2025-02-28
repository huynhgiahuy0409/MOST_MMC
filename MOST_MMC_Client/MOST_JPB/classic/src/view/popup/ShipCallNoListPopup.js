Ext.define('MOST.view.popup.ShipCallNoListPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-shipcallnolistpopup',
	requires: [
	],

	title: "Find Ship Call",
	width: 1000,
	height: 500,

	controller: 'shipcallnolistpopup',

	viewModel: {
		type: 'shipcallnolistpopup'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	layout: { type: 'vbox', align: 'stretch' },

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refShipCallNoListPopupGrid',				// SCN Grid Name 
	VSL_GRID_REF_NAME: 'refGridVessel',				// VSL Grid Name 
	
	MAIN_STORE_NAME: 'shipCallNoListPopup', //SCN Store
	VSL_STORE_NAME: 'vesselCallList', //VesselCall Store

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
					reference: me.MAIN_GRID_REF_NAME,
					usePagingToolbar: false,
					flex: 1,
					stateful: true,
					stateId: 'stateCargoTypePopupGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false,
						mode: 'SINGLE'
					},
					listeners: {
						celldblclick: 'onDblClick',
						cellclick: 'onClickScnGrid',

					},
					columns: {
						defaults: {
							style: 'text-align:center'
						},
						items: GridUtil.getGridColumns('ShipCallNoPopup')
					}
				},
				{
					xtype: 'tsb-datagrid',
					reference: me.VSL_GRID_REF_NAME,
					usePagingToolbar: false,
					flex: 1,
					stateful: true,
					stateId: 'stateCargoTypePopupGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.VSL_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						celldblclick: 'onDblClickVslGrid'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('ShipCallNoVesselCallPopup')
					},
				}
			],

			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					enableOverflow: true,
					//height:90,
					defaults: {
						labelAlign: 'right'
					},
					items: [
						{
							xtype: 'container',
							reference: 'refShipCallNoListPopup',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'toolbar',
									padding: '0 0 0 0',
									enableOverflow: true,
									height: 30,
									defaults: {
										labelAlign: 'right',
										labelTextAlign: 'right'
									},
									items: [
										{
											xtype: 'container',
											flex: 1,
											layout: {
												type: 'hbox',
												align: 'stretch'
											},

											defaults: {
												labelAlign: 'right',
												labelTextAlign: 'right'
											},

											items: [
												{
													fieldLabel: ViewUtil.getLabel('shipCallNo'),
													xtype: 'textfield',
													reference: 'refTxtPopupScn',
													maxLength: 6,
													labelWidth: 90,
													width: 250,
													name: 'vslCd',
													fieldStyle: 'text-transform: uppercase',
													bind: {
														value: '{theSearch.scn}'
													}
												},
												{
													xtype : 'datefield',
													fieldLabel : ViewUtil.getLabel('eta'),
													reference : 'refScnEtaFromDt',
													format : MOST.config.Locale
															.getShortDate(),
													labelWidth : 90,
													margin : '0 5 0 15',
													labelAlign: 'right',
													listeners : {
													 change: 'onDateChange'
													}
												},
												{
													xtype : 'label',
													text : ViewUtil.getLabel('fromtoSign'),
												},
												{
													xtype : 'datefield',
													margin : '0 5 0 5',
													labelAlign: 'right',
													reference : 'refScnEtaToDt',
													format : MOST.config.Locale
															.getShortDate(),
													anchor : '100%',
													/*listeners : {
														change: 'onDateChange'
													}*/
												},
												/*{
													fieldLabel: ViewUtil.getLabel('vesselCode'),
													xtype: 'textfield',
													reference: 'refTxtPopupVslCd',
													maxLength: 5,
													labelWidth: 90,
													width: 200,
													name: 'vslCd',
													margin: '0 10 0 8',
													fieldStyle: 'text-transform: uppercase',
													bind: {
														value: '{theSearch.vslCd}'
													}
												},
												{
													fieldLabel: ViewUtil.getLabel('vesselName'),
													xtype: 'textfield',
													reference: 'refTxtPopupVslNm',
													maxLength: 30,
													labelWidth: 90,
													width: 200,
													name: 'vslNm',
													margin: '0 5 0 8',
													fieldStyle: 'text-transform: uppercase',
													bind: {
														value: '{theSearch.vslNm}'
													}
												},*/
												{
													xtype: 'tbfill'
												},
												{
													xtype: 'button',
													margin: '0 5 0 8',
													text: ViewUtil.getLabel('search'),
													width: 100,
													name: 'btnVesselFindPopup',
													iconCls: 'x-fa fa-search',
													listeners: {
														click: 'onSearch'
													}
												},
											]
										}
									]
								},
							]
						}
					]
				}
			]
		});

		me.callParent();
	}
});

