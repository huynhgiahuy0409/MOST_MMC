Ext.define('MOST.view.billing.invoiceadvice.InvoiceAdviceDetailTabHead', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-invoiceadvicedetailtabhead',

	requires: [
		'Ext.form.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.tab.Panel',
		'Ext.tab.Tab'
	],

	height: 380,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					margin: '5 0 0 0',
					padding: '10 10 10 10',
					layout: {
						type: 'vbox',
						align: 'left'
					},
					defaults: {
						labelAlign: 'right'
					},
					items: [{
						xtype: 'textfield',
						fieldLabel: ViewUtil.getLabel('adviceNo'),
						labelWidth: 180,
						width: 490,
						editable: false,
						reference: 'refTxtAdviceNo',
						bind: '{theDetailHead.adviceNo}'

					},
					{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'left'
						},
						margin: '-5 0 0 0',
						defaults: {
							labelAlign: 'right'
						},
						items: [
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'left'
								},
								defaults: {
									labelAlign: 'right',
									margin: '0 5 0 0',
								},
								items: [
									{
										xtype: 'label',
										margin: '5 0 0 0',
										text: ViewUtil.getLabel('loading'),
										width: 50,
										style:
										{
											'font-weight': 'bold',
											'text-align': 'left'
										}
									},
									{
										xtype: 'textfield',
										reference: 'refLodingMT',
										fieldLabel: ViewUtil.getLabel('mTM3QTY'),
										labelWidth: 130,
										width: 230,
										editable: false,
										format: '0,000.000',
										decimalPrecision: 3,
										bind: '{theDetailHead.loadingTotalWgt}'
									},
									{
										xtype: 'textfield',
										reference: 'refLodingM3',
										width: 100,
										editable: false,
										format: '0,000.000',
										decimalPrecision: 3,
										bind: '{theDetailHead.loadingTotalMsrmt}'
									},
									{
										xtype: 'textfield',
										reference: 'refLodingQTY',
										width: 100,
										editable: false,
										format: '0,000.000',
										decimalPrecision: 3,
										bind: '{theDetailHead.loadingTotalQty}'
									}
								]
							}
						]
					},
					{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'left'
						},
						margin: '5 0 0 0',
						defaults: {
							margin: '0 5 0 0',
							labelAlign: 'right'
						},
						items: [
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'left'
								},
								defaults: {
									margin: '0 5 0 0',
									labelAlign: 'right'
								},
								items: [
									{
										xtype: 'label',
										text: ViewUtil.getLabel('discharging'),
										width: 50,
										margin: '5 0 0 0',
										style:
										{
											'font-weight': 'bold',
											'text-align': 'left'
										}
									},
									{
										xtype: 'textfield',
										refernce: 'refdischargingMT',
										fieldLabel: ViewUtil.getLabel('mTM3QTY'),
										labelWidth: 130,
										width: 230,
										editable: false,
										format: '0,000.000',
										decimalPrecision: 3,
										bind: '{theDetailHead.dischargingTotalWgt}'
									},
									{
										xtype: 'textfield',
										refernce: 'refdischargingM3',
										width: 100,
										editable: false,
										format: '0,000.000',
										decimalPrecision: 3,
										bind: '{theDetailHead.dischargingTotalMsrmt}'
									},
									{
										xtype: 'textfield',
										refernce: 'refdischargingQTY',
										width: 100,
										editable: false,
										format: '0,000.000',
										decimalPrecision: 3,
										bind: '{theDetailHead.dischargingTotalQty}'
									}
								]
							}
						]
					},
					{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'left'
						},
						defaults: {
							margin: '5 0 0 0',
							labelAlign: 'right'
						},
						items: [
							{
								fieldLabel: ViewUtil.getLabel('updateTime'),
								reference: 'refdetailupdateTime',
								xtype: 'datetimefield',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								labelWidth: 180,
								width: 490,
								bind: '{theDetailHead.updateTimeField}',
								readOnly: true
							},
						]
					}
					]
				}, {
					xtype: 'tsb-datagrid',
					flex: 1,
					margin: '5 0 0 0',
					reference: 'refinvoiceAdviceDetailHead',
					stateful: true,
					stateId: 'stateinvoiceAdviceDetailHead',
					usePagingToolbar: false,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{invoiceAdviceHeadList}'
					},
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('InvoiceAdviceHeadList')
					}
				}
			]
		});

		me.callParent();
	}
});