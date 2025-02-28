Ext.define('MOST.view.popup.DOAmountIdentificationPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-doamountidentificationpopup',
	requires: [
	],
	
	title:"DO Amount Identification",
	width: 500,
	height: 220,

	controller: 'doamountidentificationpopup',
	
	viewModel: {
		type: 'doamountidentificationpopup'
	},
	
	listeners:{
		/*afterrender: 'onLoad'*/
	},
	
	config:{
		ptnrType: ''
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					layout: {
						type : 'hbox'
					},
					defaults: {
						margin: '5 5 0 0'
					},
					items: [{
						xtype: 'tbfill'
					},
					{
						xtype: 'button',
						itemId: 'saveItemId',
						text: ViewUtil.getLabel('save'),
						reference:'refSaveBtn',
						iconCls: 'x-fa fa-save',
						cls: 'search-button',
						listeners: {
							click: 'onSave'
						}
					
					}]
				},
				{
					xtype : 'form',
					defaults : {
						margin : '5 5 0 5'
					},
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					items: [
						{
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'DIRECT',
                            reference:'refFsDirect',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            disabled: false,
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 100,
                                margin: '0 5 0 0'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 90,
                                        margin: '2 0 0 0'
                                    },
                                    items: [
                                    	{
		                                    xtype: 'container',
		                                    flex: 1,
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('grossWeight'),
		    	                                    reference:'ctlDDmt',
		    	                                    bind: '{theBL.dMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						allowBlank: false,
		    	    	    						width: 200
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('measurement'),
		    	                                    reference:'ctlDM3',
		    	                                    name: 'dm3',
		    	                                    bind: '{theBL.dM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						allowBlank: false,
		    	    	    						width: 200
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('quantity'),
		    	                                    reference:'ctlDQty',
		    	                                    name: 'dqty',
		    	                                    bind: '{theBL.dQty}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						allowBlank: false,
		    	    	    						width: 200,
		                                        },
		                                    ]
		                                }
		                            ]
                                }
                            ]
                        },{
                            xtype: 'fieldset',
                            title: 'INDIRECT',
                            reference:'refFsInDirect',
                            scrollable: false,
                            layout: {
                                type: 'hbox'
                            },
                            disabled: false,
                            flex: 1,
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 100,
                                margin: '0 5 0 0'
                            },
                            items: [
                            	{
                                    xtype: 'container',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 90,
                                        margin: '2 0 0 0'
                                    },
                                    items: [
                                    	{
		                                    xtype: 'container',
		                                    flex: 1,
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('grossWeight'),
		    	                                    reference:'ctlImt',
		    	                                    bind: '{theBL.iMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						allowBlank: false,
		    	    	    						width: 200
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('measurement'),
		    	                                    reference:'ctlIm3',
		    	                                    bind: '{theBL.iM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						allowBlank: false,
		    	    	    						width: 200
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('quantity'),
		    	                                    reference:'ctlIQty',
		    	                                    bind: '{theBL.iQty}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						allowBlank: false,
		    	    	    						width: 200,
		                                        },
		                                    ]
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

