Ext.define('MOST.view.billing.tariffcodedetail.TariffCodesDetailTabEquipment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-tariffcodesdetailtabequipment',
	requires: [],

	layout: { type: 'hbox', align: 'stretch' },

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			margin: '5 0 0 0',
			items: [
				{
					xtype: 'container', 
					flex: 1,
					items: [
						{
							xtype: 'combobox',
							width: '100%',
							fieldLabel: ViewUtil.getLabel('tariffEquipmentType'),
							labelWidth: 100,
							labelAlign: 'right',
							margin: '0 0 0 0',
							reference: 'cboEquipmentType',
							bind: {
								store: '{equipmentTypeListCombo}',
								value: '{theDetail.equipTp}',
							},
							queryMode: 'local',
							displayField: 'scdNm',
							valueField: 'scd',
							editable: false,
							listeners: {
								select: 'onCboEquipmentTypeSelect',
							},
						},
						{
							xtype: 'combobox',
							width: '100%',
							fieldLabel: ViewUtil.getLabel('tariffCapacity'),
							labelWidth: 100,
							labelAlign: 'right',
							flex: 1,
							margin: '5 0 0 0',
							reference: 'cboEquipmentCapa',
							bind: {
								store: '{equipmentCapaListCombo}',
								value: '{theDetail.capacity}',
							},
							queryMode: 'local',
							displayField: 'capaDescr',
							valueField: 'capaCd',
							editable: false,
							listeners: {
								select: 'onCboCapacitySelect',
							},
						},
						{
							xtype: 'container',
							width: '100%',
							margin: '5 0 0 0',
							layout: {
								type: 'hbox',
							}, 
							items: [
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('tariffWorkingArea'),
									labelAlign: 'right',
									labelWidth: 100,
									flex: 1,
									reference: 'txtWorkingArea',
									bind: {
										value: '{theDetail.workingArea}',
									},
								},
								{
									xtype: 'button',
									margin: '0 0 0 5',
									iconCls: 'x-fa fa-search',
									reference: 'btnWorkingArea',
									listeners: {
										click: {
											fn: 'onOpenCommonPopup',
											args: ['workingArea'],
										},
									},
								},
							],
						},
						{
							xtype: 'container',
							laybout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'radiogroup',
									columns: 1,
									fieldLabel: ViewUtil.getLabel('tariffWorkingTime'),
									labelWidth: 100,
									labelAlign: 'right',
									vertical: true,
									margin: '5 0 0 0',
									reference: 'refRadioGroupWorkingTime',
									items: [
										{
											boxLabel: '07:00 - 19:00',
											reference: 'refRadio0717',
											height: 26
										},
										{
											boxLabel: '19:01 - 06:59',
											reference: 'refRadio1806',
											height: 26,
											margin: '5 0 0 0',
										},
									],
								},
							],
						},
					]
				},
				{
					xtype: 'container',
					flex: 1,
					items: [
						
					]
				},   
			],
		});

		me.callParent();
	},
});
