Ext.define('MOST.view.billing.tariffcodedetail.TariffCodesDetailTabCargo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-tariffcodesdetailtabcargo',
	requires: [],

	layout: {
		type: 'hbox',
		align: 'stretch',
	},

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			margin: '5 0 0 0',
			items: [
				{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'vbox',
						align: 'stretch',
					},
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
							},
							items: [
								{
									xtype: 'textfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('category'), 
									reference: 'txtCategory',
									editable: true,
									bind: {
										value: '{theDetail.category}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnCategory',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['category'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffRehandle'),
									flex: 1,
									reference: 'txtRehandle',
									bind: {
										value: '{theDetail.rehandle}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnRehandle',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['rehandle'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffDelivery'),
									flex: 1,
									editable: true,
									reference: 'txtDelivery',
									bind: {
										value: '{theDetail.delvTpCd}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									margin: '0 0 0 5',
									reference: 'btnDelivery',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['delivery'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffTradeType'),
									flex: 1,
									editable: false,
									reference: 'txtTradeType',
									bind: {
										value: '{theDetail.cargoTradeTp}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnTradeType',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['tradeType'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('tariffShiftingType'),
									editable: true,
									reference: 'txtShiftingType',
									bind: {
										value: '{theDetail.shftTp}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnShiftingType',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['shiftingType'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('tariffWHType'),
									editable: true,
									reference: 'txtWhType',
									bind: {
										value: '{theDetail.whTp}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									margin: '0 0 0 5',
									reference: 'btnWhType',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['whType'],
										},
									},
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
							},
							items: [
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 105',
									boxLabel: ViewUtil.getLabel('tariffTranshipmentApprove'),
									reference: 'chkCargoDamaged',
									inputValue: 'Y',
									uncheckedValue: 'N',
									bind: {
										value: '{theDetail.transhipmentApprove}',
									},
								}, 
							],
						},
					],
				},
				{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'vbox',
						align: 'stretch',
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffCagroType'),
									flex: 1,
									reference: 'txtCategoryType',
									bind: {
										value: '{theDetail.trfCgTp}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnCategoryType',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['categoryType'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffCommodityGroup'),
									flex: 1,
									reference: 'txtCommodityGroup',
									bind: {
										value: '{theDetail.cmdtGrpCd}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnCommodityGroup',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['commodityGroup'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffCommodity'),
									flex: 1,
									reference: 'txtCommodity',
									bind: {
										value: '{theDetail.cmdtCd}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnCommodity',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['commodity'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffPackageType'),
									flex: 1,
									editable: true,
									reference: 'txtPackageType',
									bind: {
										value: '{theDetail.pkgTp}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnPackageType',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['packageType'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffDGClass'),
									flex: 1,
									reference: 'txtDgClass',
									bind: {
										value: '{theDetail.dgClass}',
									},
									editable: true,
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									reference: 'btnDgClass',
									margin: '0 0 0 5',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['dgClass'],
										},
									},
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
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffModeOfOpr'),
									editable: true,
									reference: 'txtModeOfOpr',
									bind: {
										value: '{theDetail.oprMode}',
									},
									flex: 1
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									margin: '0 0 0 5',
									reference: 'btnModeOfOpr',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['modeOfOpr'],
										},
									},
								},
							],
						},
						{
							xtype: 'container',
							margin: '5 0 0 0',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 100,
							},
							items: [
								{
									xtype: 'combobox',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('tariffLDDS'),
									reference: 'cboOperationType',
									bind: {
										store: '{operationTypeCombo}',
										value: '{theDetail.oprTp}',
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									editable: false,
								},
								{
									xtype: 'combobox',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('tariffVehicles'),
									labelWidth: 80,
									labelAlign: 'right',
									reference: 'cboVehicle',
									bind: {
										store: '{vehicleCombo}',
										value: '{theDetail.vehicle}',
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									editable: false,
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
							},
							items: [
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 105',
									boxLabel: ViewUtil.getLabel('tariffDamaged'),
									reference: 'chkCargoDamaged',
									inputValue: 'Y',
									uncheckedValue: 'N',
									bind: {
										value: '{theDetail.damagedChk}',
									},
								},
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 100',
									boxLabel: ViewUtil.getLabel('tariffNotToWeight'),
									reference: 'chkCargoNotToWeight',
									inputValue: 'N',
									uncheckedValue: 'Y',
									hidden: true,
									bind: {
										value: '{theDetail.wgtChk}',
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
