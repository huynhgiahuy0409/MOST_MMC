Ext.define('MOST.view.document.CustomRelease', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-customcargorelease',

	requires: [
		'MOST.view.controller.CustomReleaseController',
		'MOST.view.controller.CustomReleaseModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],


	controller: 'customrelease',

	viewModel: {
		type: 'customrelease'
	},

	listeners: {
		afterrender: 'onLoad'
	},

	lblJpvc: { type: 'bundle', key: 'jpvc' },
	lblNo: { type: 'bundle', key: 'VSRNo' },
	lblVesselName: { type: 'bundle', key: 'vesselName' },
	lblVesselCode: { type: 'bundle', key: 'vesselCode' },
	lblCreatedDate: { type: 'bundle', key: 'createdDate' },
	lblBlNo: { type: 'bundle', key: 'blNo' },
	lblALSnNo: { type: 'bundle', key: 'ALSnNo' },
	lblBLCBRNo: { type: 'bundle', key: 'BLCBRNo' },
	lblSNLCBRNo: { type: 'bundle', key: 'SNLCBRNo' },
	lblShipCallNoVsc: { type: 'bundle', key: 'vslschlSCN' },
	lblIE: { type: 'bundle', key: 'deployedequipment_iE' },
	lblMT: { type: 'bundle', key: 'mt' },
	lblPOL: { type: 'bundle', key: 'gatePassDetailPol' },
	lblPOD: { type: 'bundle', key: 'gatePassDetailPod' },
	lblCustDeclNo: { type: 'bundle', key: 'SNLCustomDeclaration' },
	lblStatus: { type: 'bundle', key: 'status' },

	lblReleaseDt: { type: 'bundle', key: 'releaseDt' },
	lblUpdateUserId: { type: 'bundle', key: 'updateUserId' },
	lblUpdateDt: { type: 'bundle', key: 'updateDt' },
	btnSearch: { type: 'bundle', key: 'search' },
	btnRetrieve: { type: 'bundle', key: 'retrive' },

	/**
	* =========================================================================================================================
	* CONSTANT START
	*/
	MAIN_GRID_REF_NAME: 'refCustomReleaseGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'customRelease',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */


	layout: { 
		type: 'vbox', 
		align: 'stretch' 
	},

	initComponent: function () {
		var me = this;

		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 1,
			pluginId: 'customRowEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				edit: 'onEdit'
			}
		});
		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'toolbar',
					enableOverflow: true,
					padding: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'searchfieldset',
							autoScroll: true,
							collapsible: true,
							margin: '-4 5 5 0',
							padding: '0 5 5 5',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 0 5 0'
							},
							items: [
								{ //Col 1
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									flex: 1,
									items: [
			                        	{
											xtype: 'shipcallnofield',
											reference: 'ctlScn',
											labelWidth: 100,
											/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											bind: {
												value: '{theSearch.scn}',
											},
										},
										{
											xtype: 'vesselcalllistfield',
											reference: 'ctlVslCallId',
											margin: '5 0 0 0',
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('vslcallid'),
											bind: {
												value: '{theSearch.vslCallId}'
											}
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'datefield',
													reference: 'ctlFromDt',
													labelWidth: 100,
													flex: 1.8,
													margin: '0 5 0 0',
													allowBlank: false,
													fieldLabel: ViewUtil.getLabel('customsCargoRelease_createDt'),
													format: MOST.config.Locale.getShortDate(),
													listeners: {
														change: 'onDateChange'
													},
													editable: false
												},
												{
													xtype: 'datefield',
													reference: 'ctlToDt',
													flex: 1,
													allowBlank: false,
													format: MOST.config.Locale.getShortDate(),
													listeners: {
														change: 'onDateChange'
													},
													editable: false
												}
											]
										}
									]
								},

								{ //Col 2
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									flex: 1,
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlBLCombo',
											labelWidth: 100,
											width: '100%',
											margin: '2 0 0 0',
											fieldLabel: ViewUtil.getLabel('blno'),
											queryMode: 'local',
											bind: {
												store: '{blCombo}'
											},
											listeners: {
												select: 'onBLChange'
											},
											displayField: 'blNoNm',
											valueField: 'blNo',
											value: '',
											forceSelection: true, 
											emptyText: 'Select',
											allowBlank: true,
											anyMatch: true
										},
										{
											xtype: 'combobox',
											reference: 'ctlStatusCombo',
											labelWidth: 100,
											width: '100%',
											fieldLabel: ViewUtil.getLabel('customsCargoRelease_status'),
											queryMode: 'local',
											bind: {
												store: '{statusCombo}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											forceSelection: true, 
											emptyText: 'Select',
											allowBlank: true,
											anyMatch: true
										},
									]
								},

								{ //Col 3
									xtype: 'container',
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									flex: 1,
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlSNCombo',
											labelWidth: 100,
											width: '100%', 
											margin: '2 0 0 0',
											fieldLabel: ViewUtil.getLabel('sNNo'),
											queryMode: 'local',
											bind: {
												store: '{snCombo}'
											},
											displayField: 'snNoNm',
											valueField: 'snNo',
											value: '',
											forceSelection: true, 
											emptyText: 'Select',
											allowBlank: true,
											editable: false,
											listeners: {
												select: 'onSNChange'
											},
										},
										{
											xtype: 'textfield',
											reference: 'ctlCbr', 
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('customsReleaseDocNo'),
											width: '100%', 
											value: '',
											editable: false,
											labelAlign: 'right',
										},
									]
								},
								{
									xtype: 'container',
									flex: 1
								}
							]
						},
					]
				},
				{
					xtype: 'tsb-datagrid',
					margin: '0 5 5 0',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					multiColumnSort: true,
					stateful: true,
					stateId: 'stateCustomReleaseGrid',
					viewConfig: {
						stripeRows: true,
						enableTextSelection: true,

					},
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard',
						rowEditing,
					],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					}, 
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('CustomRelease')
					}
				}],

			dockedItems: [
				{
					xtype: 'container',
					style: {
						"background-color": "white"
					},
					layout: {
						type: 'hbox',
					},
					padding: '0 0 0 0',
					defaults: {
						margin: '5 5 0 0'
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							itemId: 'inquiryItemId',
							reference: 'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							listeners: {
								click: 'onSearch'
							}
						},
					]
				}]
		});

		me.callParent();
	}
});

