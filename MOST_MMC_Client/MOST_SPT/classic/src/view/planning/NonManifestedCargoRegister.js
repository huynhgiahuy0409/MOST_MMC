Ext.define('MOST.view.planning.NonManifestedCargoRegister',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.app-nonmanifestedcargoregister',
	requires : [
		'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	reference:'refNonManifestedPopup',
	
	layout : { type : 'hbox', align : 'stretch'},
	
	controller: 'nonmanifestedcargoofgc',
	
	viewModel: {
		type: 'nonmanifestedcargoofgc'
	},
	listeners:{
		afterrender:'onRegisterLoad'
	},
		
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 0 0',
			items: [{
	            layout: {
	                type: 'vbox',
	            },
                margin: '4 4 4 4',
                defaults: {
                    labelAlign: 'right',
                    labelWidth: 100,
                    margin: '2 2 2 2',
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 100,
                    },
                },
                items: [
	                {
	                    xtype: 'container',
	                    layout: {
							type: 'hbox',
	                    },
	                    items: [
		    				{
								reference : 'refVslCallId',
								xtype : 'textfield',
								fieldLabel : ViewUtil.getLabel('vslschCallId'),
								maxLength: 10,
								enforceMaxLength: true,
								bind:  '{theDetail.vslCallId}',
								readOnly: true
							}
		    			]
	                },{
	                    xtype: 'container',
	                    layout: {
							type: 'hbox',
	                    },                   
	                    items: [
	                    	{
								xtype: 'label',
								margin: '2 5 0 0',
								style: {
									'text-align': 'right'
								},
								width: 100,
								text: ViewUtil.getLabel('confirmLoadingStartDateTime')
							},{
								xtype: 'datetimefield',
								flex: 2,
								bind: '{theDetail.hdlInStDt}',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								allowBlank: false
							}
						]
	                },{
	                    xtype: 'container',
	                    layout: {
							type: 'hbox',
	                    },                   
	                    items: [
	                    	{
								xtype: 'label',
								margin: '2 5 0 0',
								style: {
									'text-align': 'right'
								},
								width: 100,
								text: ViewUtil.getLabel('confirmLoadingEndDateTime')
							},{
								xtype: 'datetimefield',
								flex: 2,
								bind: '{theDetail.hdlInEndDt}',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								allowBlank: false
							}
						]
	                },{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items: [
							{
								xtype: 'label',
								margin: '2 5 0 0',
								style: {
									'text-align': 'right'
								},
								width: 100,
								text: ViewUtil.getLabel('nonmanifest_wh_ammt')
							},{
								xtype: 'numberfield',
								reference: 'ctlWhQty',
								minValue: 0,
								maxValue: 99999,
								margin: '2 5 0 0',
								selectOnFocus: true,
								flex: 1,
								bind: '{theDetail.nonManifestedQty}'
							},{
								xtype: 'numberfield',
								reference: 'ctlWhMT',
								minValue: 0,
								maxValue: 99999.999,
								decimalPrecision: 3,
								selectOnFocus: true,
								margin: '2 5 0 0',
								flex: 1,
								bind: '{theDetail.nonManifestedMt}'
							},{
								xtype: 'numberfield',
								reference: 'ctlWhM3',
								minValue: 0,
								maxValue: 99999.999,
								decimalPrecision: 3,
								selectOnFocus: true,
								flex: 1,
								bind: '{theDetail.nonManifestedM3}'
							},{
								xtype: 'container',
								flex: 3
							}
						]
					},{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items: [
							{
								xtype: 'label',
								margin: '2 5 0 0',
								style: {
									'text-align': 'right'
								},
								width: 100,
								text: ViewUtil.getLabel('confirmLoadingLocation')
							},{
								xtype: 'textfield',
								reference: 'ctlNonManifestLocId',
								flex: 1.1,
								bind: '{theDetail.craneNo}',
								maxLength: 15,
								margin: '2 5 0 0',
								enforceMaxLength: true,
								fieldStyle: 'text-transform:uppercase',
								listeners: {
									change: 'onUpperCase'
								},
								editable: false,
							},{
								xtype: 'button',
								reference: 'ctlConfirmHandlingInWhAllocation',
								flex: 0.9,
								text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
								bind: { disabled: '{spareCargoCheck}' },
								listeners: {
									click: {
										fn: 'onWarehouseDetailRegisterAllocation',
										args: ['ctlNonManifestedLocId']
									}
								}
							},{
								xtype: 'container',
								flex: 2
							}
						]
					},{
						reference : 'refRemark',
						xtype : 'textfield',
						fieldLabel : ViewUtil.getLabel('remark'),
						bind:  '{theDetail.remark}'
					}
				]
            }],
            
            dockedItems: [
            	{
	                xtype:'toolbar',
	                dock : 'bottom',
	                items : [
	                	{
							xtype: 'container',
							style: { "background-color":"white" },
							layout: {
								type: 'vbox',
								align:'center'
							},
							flex:1,
							items: [
								{
									xtype:'container',
									layout: {
										type: 'hbox',
										align:'center'
								    },
								    items:[
										{
											xtype:'button',
											margin:'0 5 5 0',
											text: ViewUtil.getLabel('confirm'),
											reference:'btnOk',
											iconCls: 'fa fa-floppy-o',
											cls: 'search-button',                 	
											listeners:{
												click: 'onRegisterSave'
											}
										},{
											xtype:'button',
											text: ViewUtil.getLabel('cancel'),
											reference:'btnCancel',
											iconCls: 'fa fa-window-close',
											cls: 'search-button',                 	
											listeners:{
												click: 'onCancel'
											}
										}
								    ]
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