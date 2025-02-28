Ext.define('MOST.view.popup.BLDOListPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-bldolistpopup',
	requires: [],

	title: 'BL/DO List',
	width: 1024,
	height: 512,

	controller: 'bldolistpopup',

	viewModel: {
		type: 'bldolistpopup',
	},

	listeners: {
		afterrender: 'onLoad',
	},

	layout: {
		type: 'vbox',
		align: 'stretch',
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBLDOPopupGrid',
	MAIN_STORE_NAME: 'blDOListPopup',
	COMBO_BOX_STORE: 'masterBlCombo',
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
					usePagingToolbar : true,
					listeners: {
						celldblclick: 'onDblClick',
						pagingSearch: 'onSearch'
					},
					viewConfig: {
						stripeRows: true,
						loadMask: true,

					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center',
						},
						items: GridUtil.getGridColumns('BLDOListPopup'),
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
							defaults: {
								flex: 1,
							},
							items: [
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										width: '100%',
										margin: '0 0 5 0',
									},
									items: [
										{
											xtype: 'shipcallnofield',
											reference: 'ctlScn',
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											fieldStyle : 'text-transform: uppercase',
											bind: {
												value: '{theSearch.scn}',
											},
										},
										{
											xtype: 'combobox',
											reference: 'txtMasterBlNo',
											selectOnFocus: true,
											fieldLabel: ViewUtil.getLabel('popup_masterBLNo'),
											margin: '0 0 0 0',
											bind: {
												store: '{masterBlCombo}',
												value: '{theSearch.mfDocId}',
											},
											displayField: 'mfDocId',
											valueField: 'mfDocId',
											emptyText: 'Select',
											queryMode: 'local',
											forceSelection: true,
											anyMatch: true,
										},
									],
								},
								{
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										width: '100%',
										margin: '0 0 5 0',
									},
									items: [
										{
											xtype: 'vesselcalllistfield',
											fieldLabel: ViewUtil.getLabel('vslschlJPVCNo'),
											reference: 'ctlVslCallId',
											fieldStyle : 'text-transform: uppercase',
											listeners: {
												change: 'onVslCallIdChange'
											},
											bind: {
												value: '{theSearch.vslCallId}',
											},
										},
										{
											xtype: 'partnercdtypefield',
											fieldLabel: ViewUtil.getLabel('popup_consignee'),
											reference: 'ctlPartner',
											fieldStyle : 'text-transform: uppercase',
											flex: 1,
											margin: '0 0 0 0',
											labelWidth: 100,
											params: {
												searchModule: 'MT',
												ptnrType: 'CNS',
											},
											bind: {
												value: '{theSearch.ptnrCd}',
											},
											editable: false,
										},
									],
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										pack: 'end',
									},
									items: [
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
				},
			],
		});

		me.callParent();
	},
});
