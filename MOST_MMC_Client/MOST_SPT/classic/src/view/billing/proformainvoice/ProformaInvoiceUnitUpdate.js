Ext.define('MOST.view.billing.proformainvoice.ProformaInvoiceUnitUpdate', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-proformainvoiceunitupdate',

	requires: [
	],
	
	title: 'Update Unit',
	
	listeners:{
		afterrender:'onUnitUpdateLoad'
	},
	
	layout: {type:'hbox', align:'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
            layout: {
                type: 'hbox'
            },
            margin: '0 0 0 0',
			items: [
				{
	                layout: {
	                    type: 'vbox'
	                },
	                margin: '5 5 5 5',
	                items: [
		                {
							xtype: 'container',
			                defaults: {
			                    labelAlign: 'right',
			                    width: 150,
			                    labelWidth: 40,
			                    flex: 1
			                },
			                margin: '0 0 0 0',
			                layout: {
			                	type: 'hbox',
			                },
			                items:[
			    				{
			    					xtype: 'numberfield',
			    					reference: 'refUpdateUnit1',
			    					fieldLabel : ViewUtil.getLabel('ivUnit1'),
			    					minValue: 0,
			    					bind: '{theUnit.unit1Val}',
			                        decimalPrecision: 3,
			                        allowDecimals: true,
			    					allowNegative: false,
			    					allowBlank: false,
			    				},{
			    					xtype: 'numberfield',
			    					reference: 'refUpdateUnit2',
			    					fieldLabel : ViewUtil.getLabel('ivUnit2'),
			    					minValue: 0,
			    					bind: '{theUnit.unit2Val}',
			                        decimalPrecision: 3,
			                        allowDecimals: true,
			    					allowNegative: false,
			    					allowBlank: false,
			    				},{
			    					xtype: 'numberfield',
			    					reference: 'refUpdateUnit3',
			    					fieldLabel : ViewUtil.getLabel('ivUnit3'),
			    					margin: '0 0 0 0',
			    					minValue: 0,
			    					bind: '{theUnit.unit3Val}',
			                        decimalPrecision: 3,
			                        allowDecimals: true,
			    					allowNegative: false,
			    					allowBlank: false,
			    				}
			    			]
						}
		            ]
	            }
			],
			
			dockedItems:[{
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '5 5 0 5'
				},
                items: [{
					xtype: 'tbfill'
                },
                {
					xtype: 'button',
					itemId: 'updateButton',
					text: ViewUtil.getLabel('update'),
					ui: 'update-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onUpdate'
					}
            	}]
			}]
		});

		me.callParent();
	}
});