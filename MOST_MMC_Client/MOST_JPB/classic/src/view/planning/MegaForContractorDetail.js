Ext.define('MOST.view.planning.MegaForContractorDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-megaforcontractordetail',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],

	width: 800,

	listeners: {
		afterrender: 'onDetailLoad',
		destroy: 'onSearch'
	},

	layout: {
		type: 'fit',
		align: 'stretch'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	FILE_GRID_REF_NAME: 'refMegaForContractorFileUploadGrid',
	FILE_UPLOAD_STORE_NAME: 'megaForContractorFileUpload',

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldset',
					margin: '5 5 5 5',
					padding: '5 5 5 5',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						flex: 1
					},
					defaults: {
						labelAlign: 'right',
						flex: 1,
						labelWidth: 70,
						editable: false,
						readOnly: true
					},
					items: [
						{
							xtype: 'textfield',
							reference: 'ctlDetailScn',
							fieldLabel: ViewUtil.getLabel('shipCallNo'),
							bind: '{theDetail.scn}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlDetailJpvc',
							fieldLabel: ViewUtil.getLabel('vessel'),
							bind: '{theDetail.vslCallId}'
						},
						{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('vesselName'),
							bind: '{theDetail.vslNm}'
						},
					]
				},
				{
					xtype: 'fieldset',
					margin: '0 5 0 5',
					padding: '5 5 5 5',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						flex: 1
					},
					defaults: {
						labelAlign: 'right',
						flex: 1,
						labelWidth: 70,
						editable: false,
						readOnly: true
					},
					items: [
						{
							xtype: 'textfield',
							reference: 'ctlDetailPurpose',
							fieldLabel: ViewUtil.getLabel('purpose'),
							bind: '{theDetail.purpTpCdNm}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlDetailMegaNo',
							fieldLabel: ViewUtil.getLabel('megaNo'),
							bind: '{theDetail.megaNo}'
						},
						{
							xtype: 'datefield',
							reference: 'ctlDetailMegaWorkYmd',
							format: MOST.config.Locale.getShortDate(),
							fieldLabel: ViewUtil.getLabel('date'),
							bind: '{theDetail.workYmd}'
						},
						{
							xtype: 'textfield',
							reference: 'ctlDetailMegaShift',
							fieldLabel: 'Shift',
							bind: '{theDetail.shftNm}'
						}
					]
				},
				{
					xtype: 'fieldset',
					margin: '5 5 5 5',
					padding: '5 5 5 5',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						flex: 1
					},
					items: [
						{
							xtype: 'container',
							margin: '0 5 0 0',
							layout: {
								type: 'vbox',
							},
							defaults: {
								margin: '0 0 5 0',
								labelAlign: 'right',
								labelWidth: 70,
								width: '100%'
							},
							items: [
								{
									xtype: 'numberfield',
									minValue: 1,
									maxValue: 99999,
									reference: 'refNoOfOper',
									fieldLabel: ViewUtil.getLabel('nofOper'),
									placeholder: 0,
									bind: '{theDetail.nofOpe}',
									readOnly: true,
									editable: false
								},
								{
									xtype: 'numberfield',
									reference: 'refSupplyQty',
									fieldLabel: ViewUtil.getLabel('supplyQty'),
									bind: '{theDetail.supplyQty}',
									allowBlank: false,
									minValue: 0,
									maxValue: 99999,
									placeholder: 0,
								},
								{
									xtype: 'textfield',
									reference: 'refVoucherNo',
									fieldLabel: ViewUtil.getLabel('voucherNo'),
									bind: '{theDetail.voucherNo}'
								},
								{
									xtype: 'textfield',
									reference: 'refDenyRmk',
									fieldLabel: ViewUtil.getLabel('denyRemark'),
									bind: '{theDetail.denyRmk}',
									margin: '0 0 0 0'
								},
							]
						},
						{
							xtype: 'container',
							margin: '0 0 0 0',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								width: '100%'
							},
							items: [
								{
									xtype: 'container',
									margin: '0 0 5 0',
									layout: {
										type: 'hbox',
										pack: 'end'
									},
									items: [
										{
											xtype: 'filefield',
											name: 'fileUpload',
											reference: 'refBtnAddFile',
											itemId: 'createButton',
											id: 'megaForContractorFileUpload',
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
											},
											margin: '0 0 0 5',
											width: 60,
										},
										{
											xtype: 'button',
											margin: '0 0 0 5',
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
									minHeight: 88,
									stateful: true,
									usePagingToolbar: false,
									style: {
										borderColor: '#AAA',
										borderStyle: 'solid',
										borderWidth: 'thin',
									},
									stateId: 'stateMegaForContractorUploadGrid',
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
									flex: 1,
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center'
										},
										items: GridUtil.getGridColumns('MegaForContractorFileUpload')
									}
								}
							]
						},
					]
				},
				{
					xtype: 'container',
					margin: '0 0 5 0',
					layout: {
						type: 'hbox',
						pack: 'center',
					},
					items: [
						{
							xtype: 'button',
							reference: 'ctlMegaForContractorDetailDeny',
							iconCls: 'x-fa fa-ban black',
							ui: 'denie-button',
							text: ViewUtil.getLabel('deny'),
							listeners: {
								click: 'onContractorDeny'
							}
						},
						{
							xtype: 'button',
							reference: 'ctlMegaDetailAddForGearsCompany',
							iconCls: 'x-fa fa-check',
							style: 'background-color:#0A6B26;',
							text: ViewUtil.getLabel('supply'),
							listeners: {
								click: 'onContractorSupply'
							},
							margin: '0 0 0 5'
						}
					]
				}
			]
		});

		me.callParent();
	}
});