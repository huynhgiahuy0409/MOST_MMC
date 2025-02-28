Ext.define('MOST.view.billing.TariffCodeDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-tariffcodesdetail',
	requires: [],

	listeners: {
		afterrender: 'onDetailLoad',
	},

	width: 880,
	height: 660,
	scrollable: true,

	layout: { 
		type: 'vbox', 
		align: 'stretch' 
	},

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					reference: 'refPanel',
					layout: {
						type: 'vbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'fieldset',
							layout: {
								type: 'vbox',
							},
							reference: 'refTariffcodeFieldset',
							margin: '5 5 0 5',
							padding: '10 10 10 10',
							defaults: {
								margin: '5 0 0 0',
								width: '100%'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'left',
									},
									margin: '0 0 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										enforceMaxLength: true,
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtTrfCd',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('trfCd'),
											maxLength: 10,
											enforceMaxLength: true,
											width: '',
											allowBlank: false,
											bind: {
												value: '{theDetail.trfCd}',
												editable: '{theDetail.phantom}',
											},
											listeners: {
												change: function (field, newValue, oldValue) {
													field.setValue(newValue.toUpperCase());
												},
											},
										},
										{
											xtype: 'textfield',
											reference: 'txtSubTrfCd',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('subTrfCd'),
											width: '',
											maxLength: 10,
											allowBlank: false,
											bind: {
												value: '{theDetail.subTrfCd}',
												editable: '{theDetail.phantom}',
											},
											listeners: {
												change: function (field, newValue, oldValue) {
													field.setValue(newValue.toUpperCase());
												},
											},
										},
										{
											xtype: 'combobox',
											reference: 'cmbProformaChk',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('proformaYN'),
											queryMode: 'local',
											allowBlank: false,
											bind: {
												store: '{proformaYNComboStore}',
												value: '{theDetail.prfYn}',
											},
											displayField: 'codeName',
											valueField: 'code',
											editable: true,
											forceSelection: true,
										},
										{
											xtype: 'button',
											margin: '5 0 0 100',
											text: me.btnSave,
											ui: 'create-button',
											iconCls: 'x-fa fa-save',
											reference: 'refBtnSave',
											hidden: true,
											listeners: {
												click: 'onDetailSave',
											},
										},
									],
								},
								{
									xtype: 'textfield',
									reference: 'txtTariffDesc',
									fieldLabel: ViewUtil.getLabel('descr'),
									labelAlign: 'right',
									labelWidth: 100,
									maxLength: 100,
									enforceMaxLength: true,
									allowBlank: false,
									editable: true,
									bind: '{theDetail.descr}',
								},
								{
									xtype: 'textfield',
									reference: 'txtTariffDesc',
									fieldLabel: ViewUtil.getLabel('descrInVN'),
									labelAlign: 'right',
									labelWidth: 100,
									maxLength: 100,
									editable: true,
									bind: '{theDetail.descrVN}',
								},
								{
									xtype: 'combobox',
									reference: 'cmbTariffType',
									fieldLabel: ViewUtil.getLabel('trfTpCd'),
									labelAlign: 'right',
									labelWidth: 100,
									width: '50%',
									queryMode: 'local',
									allowBlank: false,
									bind: {
										store: '{tariffCodeDetailCombo}',
										value: '{theDetail.trfTpCd}',
									},
									displayField: 'scdNm',
									valueField: 'scd',
									editable: true,
									forceSelection: true,
									emptyText: 'Select',
									listeners: {
										select: 'onChangeTariffType',
									},
								},
							],
						},
						{
							xtype: 'fieldset',
							reference: 'refSubInfomration1Fieldset',
							layout: {
								type: 'vbox',
							},
							margin: '5 5 0 5',
							padding: '10 10 10 10',
							defaults: {
								width: '100%'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										flex: 1,
									},
									items: [
										{
											xtype: 'combobox',
											queryMode: 'local',
											fieldLabel: ViewUtil.getLabel('ssrTp'),
											bind: {
												store: '{ssrTypeCombo}',
												value: '{theDetail.ssrTpCd}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											editable: true,
											allowBlank: true,
											forceSelection: true,
											emptyText: 'Select',
										},
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('standardPayer'),
											allowBlank: false,
											queryMode: 'local',
											bind: {
												store: '{standardTraderCombo}',
												value: '{theDetail.pyrTpCd}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											editable: true,
											forceSelection: true,
											emptyText: 'Select',
										},
									],
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									layout: {
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										flex: 1,
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'refCostCenter',
											fieldLabel: ViewUtil.getLabel('tariffCostCenter'),
											allowBlank: true,
											bind: {
												store: '{costCenterCombo}',
												value: '{theDetail.costCntCd}',
											},
											listeners: {
												change: 'onCostCenter_changeEvent',
											},
											queryMode: 'local',
											displayField: 'costCntCd',
											valueField: 'costCntCd',
											editable: true,
											hidden: true,
											emptyText: 'Select',
										},
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('financialCode'),
											allowBlank: true,
											bind: {
												store: '{financialCodeCombo}',
												value: '{theDetail.financialCode}',
											},
											queryMode: 'local',
											displayField: 'financialCode',
											valueField: 'financialCode',
											editable: true,
											emptyText: 'Select',
										},
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('billingtype'),
											allowBlank: false,
											forceSelection: true,
											editable: true,
											queryMode: 'local',
											bind: {
												store: '{billingTypeCombo}',
												value: '{theDetail.billTpCd}',
											},
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select',
										},
									],
								},
							],
						},
						{
							xtype: 'fieldset',
							reference: 'refSubInfomration2Fieldset',
							layout: {
								type: 'vbox',
							},
							margin: '5 5 0 5',
							padding: '10 10 10 10',
							defaults: {
								width: '100%'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'middle',
										pack: 'center',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										flex: 1,
									},
									items: [
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('ivUnit1'),
											bind: {
												store: '{invoiceUnit1Combo}',
												value: '{theDetail.ivUnit1}',
											},
											queryMode: 'local',
											displayField: 'unitCd',
											valueField: 'unitCd',
											editable: true,
											emptyText: 'Select',
										},
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('ivUnit2'),
											bind: {
												store: '{invoiceUnit2Combo}',
												value: '{theDetail.ivUnit2}',
											},
											queryMode: 'local',
											displayField: 'unitCd',
											valueField: 'unitCd',
											editable: true,
											emptyText: 'Select',
										},
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('ivUnit3'),
											bind: {
												store: '{invoiceUnit3Combo}',
												value: '{theDetail.ivUnit3}',
											},
											queryMode: 'local',
											displayField: 'unitCd',
											valueField: 'unitCd',
											editable: true,
											emptyText: 'Select',
										},
									],
								},
								{
									xtype: 'container',
									margin: '5 0 0 0',
									layout: {
										type: 'hbox',
										align: 'middle',
										pack: 'center',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										flex: 1,
									},
									items: [
										{
											xtype: 'combobox',
											fieldLabel: ViewUtil.getLabel('tarifftGSTType'),
											reference: 'CboVatCd',
											displayField: 'gstTpCd',
											valueField: 'scd',
											queryMode: 'local',
											bind: {
												store: '{gstTypeCombo}',
												value: '{theDetail.gstTpCd}',
											},
											listeners: {
												select: 'onCboVatCdSelect',
											},
										},
										{
											xtype: 'textfield',
											reference: 'txtGstRate',
											fieldLabel: ViewUtil.getLabel('tariffGSTRate'),
											bind: '{theDetail.gstRate}',
											readOnly: true,
										},
										{
											xtype: 'container'
										}
									],
								},
							],
						},
					],
				},
				{
					xtype: 'tabpanel',
					reference: 'refTabpanel',
					deferredRender: false,
					margin: '5 5 5 5',
					defaults: {
						margin: '5 5 5 5',
					},
					activeTab: 0,
					items: [
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('vslOpr'),
							scrollable: 'both',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'app-tariffcodesdetailtabvslopr',
									reference: 'refTabVslOpr',
								},
							],
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('tariffTabCargo'),
							scrollable: 'both',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'app-tariffcodesdetailtabcargo',
									reference: 'refTabCargo',
								},
							],
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('tariffTabCargoWeight'),
							scrollable: 'both',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'app-tariffcodedetailtabcargoweight',
									reference: 'refTabCargoWeight',
								},
							],
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('tariffEquipment'),
							scrollable: 'both',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'app-tariffcodesdetailtabequipment',
									reference: 'refTabEquipment',
								},
							],
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('tariffOther'),
							scrollable: 'both',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'app-tariffcodesdetailtabother',
									reference: 'refTabOther',
								},
							],
						},
						{
							xtype: 'panel',
							title: ViewUtil.getLabel('tariffServiceOrder'),
							scrollable: 'both',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'app-tariffcodesdetailtabserviceorder',
									reference: 'refTabServiceOrder',
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
