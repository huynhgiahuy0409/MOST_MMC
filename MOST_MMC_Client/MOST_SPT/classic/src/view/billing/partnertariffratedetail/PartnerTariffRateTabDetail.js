Ext.define('MOST.view.billing.partnertariffratedetail.PartnerTariffRateTabDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-partnertariffratetabdetail',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAIL_GRID_REF_NAME: 'refPartnerTariffRateDetailGrid',  // Detail Grid Name 
	DETAIL_STORE_NAME: 'partnerTariffRateDetailGrid',        // Detail Store Name

	FILE_GRID_REF_NAME: 'refPartnerTariffFileUploadGrid', // File Grid Name
	FILE_UPLOAD_STORE_NAME: 'partnerTariffFileUpload', // File Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
			ptype: 'cellediting',
			clicksToEdit: 1,
			pluginId: 'partnerTariffRateEditor',
			listeners: {
				edit: 'onEdit'
			}
		});

		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					margin: '5 0 0 0',
					padding: '5 10 10 10',
					layout: {
						type: 'hbox'
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							margin: '0 5 0 0',
							flex: 1,
							items: [
								{
									xtype: 'container',
									width: '100%',
									layout: {
										type: 'hbox'
									},
									defaults: {
										labelAlign: 'right',
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'refTrCd',
											fieldLabel: ViewUtil.getLabel('trfCd'),
											labelWidth: 80,
											width: 180,
											editable: false,
											bind: '{selectedRecord.trfCd}',
										},
										{
											xtype: 'textfield',
											reference: 'refDesc',
											flex: 1,
											bind: '{selectedRecord.descr}',
											editable: false,
											margin: '5 0 0 5'
										},
										{
											xtype: 'button',
											margin: '5 0 0 5',
											text: 'Find',
											reference: 'btnFindTariff',
											listeners: {
												click: 'openTariffCodePopup'
											}
										}]
								},
								{
									xtype: 'container',
									layout: {
										type: 'vbox',
										align: 'stretch',
									}, 
									items: [
										{
											xtype: 'container',
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'refRate',
													fieldLabel: ViewUtil.getLabel('rate'),
													margin: '5 0 0 0',
													labelWidth: 80, 
													flex: 1,
													bind: '{selectedRecord.unitPrc}',
													editable: false
												},
												{
													xtype: 'label',
													text: 'VND',
													margin: '10 0 0 5',
													width: 41
												}
											]
										},
										{
											xtype: 'container',
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'numberfield',
													reference: 'refPartnerRate',
													fieldLabel: ViewUtil.getLabel('ptnrRate'),
													margin: '5 0 0 0',
													labelWidth: 80,
													flex: 1,
													minValue: 0,
													maxValue: 999999999999.999,
													bind: '{selectedRecord.ptnrPrc}'
												},
												{
													xtype: 'label',
													text: 'VND',
													margin: '10 0 0 5',
													width: 41
												},
											]
										}, 
									]
								},
							]
						},
						{
							xtype: 'container',
							margin: '0 0 0 5',
							flex: 1,
							items: [
								{
									xtype: 'container',
									margin: '5 0 5 5',
									layout: {
										type: 'hbox',
										pack: 'end'
									},
									items: [
										{
											xtype: 'filefield',
											name: 'fileUpload',
											reference: 'refBtnAddFile',
											margin: '0 0 0 5',
											width: 60,
											itemId: 'createButton',
											id: 'partnerTariffFileUpload',
											style: 'text-align:left',
											method: 'POST',
											fileUpload: true,
											enctype: 'multipart/form-data',
											buttonText: '',
											buttonOnly: true,
											multiple: true,
											buttonConfig: {
												text: ViewUtil.getLabel('add'),
												iconCls: 'x-fa fa-plus'
											},
											listeners: {
												change: 'onFileGridAdd',
												afterrender: function (cmp) {
													cmp.fileInputEl.set({
														multiple: 'multiple'
													});
												}
											}
										},
										{
											xtype: 'button',
											margin: '0 0 0 5',
											width: 80,
											reference: 'refBtnRemoveFile',
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											text: ViewUtil.getLabel('remove'),
											listeners: {
												click: 'onRemoveForFileUpload'
											}
										}
									]
								},
								{
									xtype: 'tsb-datagrid',
									reference: me.FILE_GRID_REF_NAME,
									height: 100,
									stateful: true,
									usePagingToolbar: false,
									style: {
										borderColor: '#AAA',
										borderStyle: 'solid',
										borderWidth: 'thin'
									},
									stateId: 'statePartnerTariffUploadGrid',
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{' + me.FILE_UPLOAD_STORE_NAME + '}'
									},
									listeners: {
										celldblclick: 'onFileDownloadDblClick'
									},
									selModel: {
										type: 'checkboxmodel',
										checkOnly: false,
										showHeaderCheckbox: true
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center'
										},
										items: GridUtil.getGridColumns('PartnerTariffFileUpload')
									}
								}
							]
						},

					]
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'start'
					},
					defaults: {
						labelAlign: 'right',
						margin: '5 5 0 0',
					},
					items: [
						{
							xtype: 'button',
							width: 80,
							text: ViewUtil.getLabel('update'),
							listeners: {
								click: 'onUpdateDetailGrid'
							}
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('clear'),
							width: 80,
							reference: 'refBtnClear',
							listeners: {
								click: 'onClearButton'
							}
						}, {
							xtype: 'button',
							itemId: 'deleteButton',
							reference: 'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							width: 80,
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemoveGridDetail'
							}
						}]
				},
				{
					xtype: 'tsb-datagrid',
					margin: '5 0 5 0',
					flex: 1,
					reference: me.DETAIL_GRID_REF_NAME,
					stateful: true,
					usePagingToolbar: false,
					stateId: 'stateinvoiceAdviceDetailGrid',
					plugins: [
						cellEditing,
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					listeners: {
						//            		celldblclick: 'openPartnerTariffDetail',
						cellclick: 'onCellClick'
					},
					bind: {
						store: '{' + me.DETAIL_STORE_NAME + '}'
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
						items: GridUtil.getGridColumns('PartnerTariffRates_detail')
					}
				}]
		});

		me.callParent();
	}
});