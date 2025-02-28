Ext.define('MOST.view.billing.tariffcodedetail.TariffCodesDetailTabVslOpr', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-tariffcodesdetailtabvslopr',
	requires: [],

	layout: { type: 'vbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					margin: '5 0 0 0',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 100,
							},
							flex: 1,
							items: [
								{
									xtype: 'numberfield',
									fieldLabel: 'LOA(M)&nbsp&nbsp&nbsp&nbsp&nbsp&nbspFrom',
									reference: 'txtLOAFrom',
									labelWidth: 100,
									flex: 1.45,
									maskRe: /[0-9]/,
									minValue: 0,
									maxValue: 9999,
									bind: {
										value: '{theDetail.loaFrom}',
									},
								},
								{
									xtype: 'numberfield',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('to'),
									reference: 'txtLOATo',
									style: 'text-align:left',
									labelWidth: 20,
									maskRe: /[0-9]/,
									minValue: 0,
									maxValue: 99999,
									bind: {
										value: '{theDetail.loaTo}',
									},
								},
								{
									xtype: 'numberfield',
									fieldLabel: ViewUtil.getLabel('arrivalTime'),
									reference: 'txtArrivalTime',
									margin: '20 0 0 10',
									labelWidth: 250,
									flex: 1,
									maskRe: /[0-9]/,
									minValue: 0,
									maxValue: 999,
									bind: {
										value: '{theDetail.arrvDt}',
									},
									hidden: true,
								},
							]
						},
						{
							xtype: 'container',
							flex: 1
						}
					],
				},
				{
					xtype: 'container',
					margin: '5 0 0 0',
					layout: {
						type: 'hbox',
						align: 'stretch'
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
								labelWidth: 100,
							},
							items: [ 
								{
									xtype: 'numberfield',
									fieldLabel: 'GRT&nbsp&nbsp&nbsp&nbsp&nbsp&nbspFrom',
									flex: 1.45,
									reference: 'txtGRTFrom',
									labelWidth: 100,
									maskRe: /[0-9]/,
									minValue: 0,
									maxValue: 99999,
									bind: {
										value: '{theDetail.grtFrom}',
									},
								},
								{
									xtype: 'numberfield',
									flex: 1, 
									fieldLabel: ViewUtil.getLabel('to'),
									reference: 'txtGRTTo',
									style: 'text-align:left',
									labelWidth: 20,
									maskRe: /[0-9]/,
									minValue: 0,
									maxValue: 99999,
									bind: {
										value: '{theDetail.grtTo}',
									},
								},
							]
						},
						{
							xtype: 'container',
							flex: 1
						}
					],
				}, 
				{
					xtype: 'container',
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
							xtype: 'container',
							margin: '5 0 0 0',
							flex: 1,
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
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffPurposeOfCall'),
									reference: 'cboPurposeOfCall',
									flex: 1,
									bind: {
										value: '{theDetail.purpCall}',
									},
								},
								{
									xtype: 'button',
									margin: '0 0 0 5',
									iconCls: 'x-fa fa-search',
									reference: 'btnPurposeOfCall',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['purposeOfCall'],
										},
									},
								},
							]
						},			 
						{
							xtype: 'checkboxfield',
							boxLabel: ViewUtil.getLabel('tariffOperated'),
							reference: 'chkOpeartedYN',
							margin: '5 0 0 0',
							inputValue: 'Y',
							uncheckedValue: 'N',
							bind: {
								value: '{theDetail.operYn}',
							},
							hidden: true,
						},
						{
							xtype: 'container',
							flex: 1,
						}
					],
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
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
								margin: '5 0 0 0',
								labelAlign: 'right',
								labelWidth: 100,
							},
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('vesselType'),
									reference: 'cboVesselType',
									flex: 1,
									editable: true,
									bind: {
										value: '{theDetail.vslTp}',
									},
								},
								{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									margin: '5 0 0 3',
									reference: 'btnVesselType',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['vesselType'],
										},
									},
								},
							]
						},						
						{
							xtype: 'container',
							flex: 1,
						}
					],
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						margin: '5 0 0 0',
						labelAlign: 'right',
						labelWidth: 100,
					},
					items: [
						{
							xtype: 'combobox',
							fieldLabel: ViewUtil.getLabel('tariffTradeType'),
							reference: 'cboTradeType',
							flex: 1,
							editable: false,
							bind: {
								store: '{tradeTypeListCombo}',
								value: '{theDetail.vslTradeTp}',
							},
							queryMode: 'local',
							displayField: 'scdNm',
							valueField: 'scd',
							editable: true,
						},
						{
							xtype: 'numberfield',
							fieldLabel: 'Passenger Age&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspFrom',
							reference: 'txtPassAgeFrom',
							labelWidth: 180,
							margin: '0 0 0 45',
							minValue: 0,
							maxValue: 999,
							flex: 1,
							listeners: {
								change: {
									fn: 'onChangeNumberTo',
									args: ['txtPassAgeFrom', 'txtPassAgeTo'],
								},
							},
							bind: {
								value: '{theDetail.passenAgeFrom}',
							},
							hidden: true,
						},
						{
							xtype: 'numberfield',
							fieldLabel: ViewUtil.getLabel('to'),
							reference: 'txtPassAgeTo',
							style: 'text-align:left',
							labelWidth: 45,
							margin: '0 0 0 0',
							minValue: 0,
							maxValue: 999,
							flex: 1,
							listeners: {
								change: {
									fn: 'onChangeNumberTo',
									args: ['txtPassAgeFrom', 'txtPassAgeTo'],
								},
							},
							bind: {
								value: '{theDetail.passenAgeTo}',
							},
							hidden: true,
						},
						{
							xtype: 'container',
							flex: 1,
						}
					],
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						margin: '5 0 0 0',
						labelAlign: 'right',
						labelWidth: 100,
					},
					items: [
						{
							xtype: 'combobox',
							fieldLabel: ViewUtil.getLabel('tariffDockageType'),
							reference: 'cboDockageType',
							flex: 1,
							editable: false,
							bind: {
								store: '{dockageTypeListCombo}',
								value: '{theDetail.dockTp}',
							},
							queryMode: 'local',
							displayField: 'scdNm',
							valueField: 'scd',
							editable: true,
							hidden: false,
						},
						{
							xtype: 'combobox',
							flex: 1,
							fieldLabel: ViewUtil.getLabel('tariffFreshWaterServiceType'),
							labelWidth: 150,
							margin: '0 0 0 73',
							reference: 'cboFreshwaterService',
							bind: {
								store: '{freshwaterServiceCombo}',
								value: '{theDetail.freshWtServe}',
							},
							queryMode: 'local',
							displayField: 'scdNm',
							valueField: 'scd',
							editable: true,
							hidden: true,
						},
						{
							xtype: 'container',
							flex: 1,
						}
					],
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						margin: '5 0 0 0',
						labelAlign: 'right',
						labelWidth: 100,
					},
					items: [
						{
							xtype: 'combobox',
							flex: 1,
							fieldLabel: ViewUtil.getLabel('tariffWireType'),
							reference: 'cboWireType',
							editable: false,
							bind: {
								store: '{wireTypeListCombo}',
								value: '{theDetail.wireTp}',
							},
							queryMode: 'local',
							displayField: 'scdNm',
							valueField: 'scd',
							editable: true,
						},
						{
							xtype: 'container',
							flex: 1,
						}
					],
				},
			],
		});

		me.callParent();
	},
});
