Ext.define('MOST.view.codes.CapacityCodeDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-capacitycodedetail',
	
	requires: [
	],

	listeners: {
		afterrender: 'onDetailLoad'
	},
 	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
   	MAIN_GRID_REF_NAME: 'refcapacityCodeGrid',
   	MAIN_STORE_NAME: 'capacityCodeList',
   	EQUIPMENT_COMBO_GRID_STORE_NAME: 'capacityCodeEquipmentTypeGridCombo',
    EQUIPMENT_COMBO_STORE_NAME: 'capacityCodeEquipmentTypeCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {
		type  : 'vbox',
		align : 'stretch'
	},

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 0 0',
			items: [
				{
	                layout: {
	                    type: 'vbox'
	                },
	                margin: '5 5 5 5',
					padding: '5 5 5 5',
	                defaults: {
	                    labelAlign: 'right',
	                    labelWidth: 100,
						margin: '0 0 5 0'
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
								flex: 1,
							},
							items: [
								{
									reference: 'refEqTpCd',
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('capacityEqTpNm'),
									emptyText: 'Select',
									displayField: 'scdNm',
									valueField: 'scd',
									queryMode: 'local',
									bind: {
										store: '{' + me.EQUIPMENT_COMBO_GRID_STORE_NAME + '}',
										value: '{theDetail.eqTpCd}',
									},
									editable: false,
								},
								{
									reference: 'refCapaCd',
									xtype: 'textfield',
									maxLength: 10,
									enforceMaxLength: true,
									fieldLabel: ViewUtil.getLabel('capacityCd'),
									bind: '{theDetail.capaCd}',
									listeners: {
										change: 'onUpperCase',
									},
								},
							],
						},
						{
							xtype: 'textfield',
							reference: 'refCapaDescr',
							labelWidth: 100,
							fieldLabel: ViewUtil.getLabel('capacityCapaDescr'),
							width: '100%',
							bind: '{theDetail.capaDescr}',
							listeners: {
								change: 'onUpperCase',
							},
						},
						{
							xtype: 'container',
							margin: '0 0 0 0',
							width: '100%',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 100,
								flex: 1,
							},
							items: [
								{
									xtype: 'numberfield',
									reference: 'refCapaQty',
									fieldLabel: ViewUtil.getLabel('capacityCapaQty'),
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
									formatter: 'number("0000,000")',
									bind: '{theDetail.capaQty}',
								},
								{
									xtype: 'container'
								}
							]
						}
		            ]
	            }
			]
		});

		me.callParent();
	}
});