Ext.define('MOST.view.popup.GetInPopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-getinpopup',
	
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
		afterrender: 'onDetailLoadGetIn'
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
		    	    			value: '{theDetail.whLoc}'
		    	    		},
		   					displayField: 'locNm',
		   					valueField: 'locId',
		   					forceSelection: true,
		   					emptyText:'Selected',
		   					editable: true
		   				}
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
					flex: 1,					
					title: 'Get In Amount',
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
		                                    bind:'{theDetail.docMt}',
		                                    decimalPrecision: 3,
		                                    editable: true
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    fieldLabel: ViewUtil.getLabel('getInM3'),
		                                    bind:'{theDetail.docM3}',
		                                    decimalPrecision: 3,
		                                    editable: true
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    fieldLabel: ViewUtil.getLabel('getInQty'),
		                                    bind:'{theDetail.docQty}',
		                                    decimalPrecision: 0,
		                                    editable: true
		                                }
		                            ]
		                        }
		                    ]
		                }
		            ]
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
										click: 'onSaveGetIn'
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