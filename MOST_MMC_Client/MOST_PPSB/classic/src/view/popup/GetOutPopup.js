Ext.define('MOST.view.popup.GetOutPopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-getoutpopup',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	width: 400,
	height: 300,
	
	listeners:{
		afterrender: 'onDetailLoadGetOut'
	},
	
    defaults: {
        padding: '5 0 5 0',
        margin: '5 5 0 5',
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },
    
	layout : {
		type  : 'vbox', 
		align : 'stretch'
	},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'fieldset',
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 120
		            },
		            hidden: true,
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		   					reference: 'ctlWarehouseCombo',
		   					xtype: 'combo',
		   					fieldLabel: ViewUtil.getLabel('consolDeconsolWh'),
		   					queryMode: 'local',
		   					bind: {
		    	    			store: '{warehouseList}',
		    	    			//value: '{theDetail.rhdlMode}'
		    	    		},
		   					displayField: 'locNm',
		   					valueField: 'locId',
		   					forceSelection: true,
		   					emptyText:'Selected',
		   					editable: true,
//        					listeners: {
//        						change: 'onChangeRehandleMode'
//        					}
		   				}
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
					flex: 1,					
					title: 'Get Out Amount',
		            defaults: {
		                margin: '5 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 120
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
							margin: '2 2 2 2',
							border: 1,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
							defaults:{
								margin: '2 2 2 2',
								padding: '0 0 10 0',
							},
		                    items: [
		                        {
		                            xtype: 'container',
		                            flex: 1,
		                            defaults: {
		                                margin: '5 20 0 5',
		                                labelAlign: 'right',
		                                labelWidth: 80
		                            },
		                            layout: {
		                                type: 'vbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'numberfield',
		                                    fieldLabel: ViewUtil.getLabel('getInMt'),
		                                    bind:'{theDetail.balMt}',
		                                    decimalPrecision: 3,
		                                    readOnly: false
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    fieldLabel: ViewUtil.getLabel('getInM3'),
		                                    bind:'{theDetail.balM3}',
		                                    decimalPrecision: 3,
		                                    readOnly: false
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    fieldLabel: ViewUtil.getLabel('getInQty'),
		                                    bind:'{theDetail.balQty}',
		                                    decimalPrecision: 0,
		                                    readOnly: false
		                                }
		                            ]
		                        }
		                    ]
		                }
		            ],
		        }
			],
			dockedItems: [{
				xtype:'toolbar',
				dock : 'bottom',
				items : [{
					xtype: 'container',
					layout: {
						type: 'vbox',
						align:'center'
					},
					flex:1,
					items: [{
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
									click: 'onSaveGetOut'
								}
							}
							]
					}
					]
				}
				]
			}]
		});
		
		me.callParent();
	}
});