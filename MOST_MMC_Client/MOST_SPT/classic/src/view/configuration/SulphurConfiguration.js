Ext.define('MOST.view.configuration.SulphurConfiguration', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-sulphurconfiguration',
	
	requires: [
		'MOST.view.configuration.SulphurConfigurationModel',
		'MOST.view.configuration.SulphurConfigurationController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'sulphurconfiguration',
	
	viewModel: {
		type: 'sulphurconfiguration',
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			xtype:'form',
			defaults:{
				margin: '5 5 5 0' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
		        {
		            xtype: 'container',
		            height: 600,
	                layout: {
	                    type: 'hbox',
	                    align: 'stretch'
	                },
	                defaults: {
                        margin: '5 0 0 0'// top, right, bottom, left
                    },
		            
		            items: [
		            	{
		            		xtype: 'container',
		            		height: 34,
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85,
								margin: '5 5 0 5'
                            },
		            		layout: {
				                type: 'vbox',
				                align: 'stretch'
				            },
		                    items: [
				            	{
		                            xtype: 'combo',
									reference: 'refWarehouseCombo',
									fieldLabel: ViewUtil.getLabel('warehouse'),
									width: 300,
									labelWidth: 100,
									queryMode: 'local',
									bind: {
										store: '{sulphurConfigurationItems}'
									},
									displayField: 'locNm',
		   							valueField: 'locId',
									emptyText: 'Select Data',
									listeners: {
										select: 'onWarehouseSelect'
									}
		                        },{
		                            xtype: 'numberfield',
		                            reference: 'refAddCapacity',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('WHAdditionalCapacity'),
									listeners: {
										change: 'onAddCapacityChange'
									},
									decimalPrecision: 3,
									minValue: 0,
									maxValue: 100000.000,
									allowNegative: false,
									labelWidth: 100,
									hideTrigger: true
		                        },{
		                            xtype: 'numberfield',
		                            reference: 'refStockpileCapacity',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('WHStockpileCapacity'),
		                            bind: '{theSulphur.fbCapa}',
									decimalPrecision: 3,
									minValue: 0,
									maxValue: 100000.000,
									allowNegative: false,
									labelWidth: 100,
									hideTrigger: true
		                        },{
		                            xtype: 'numberfield',
		                            reference: 'refFbCapacity',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('WHFloorBearingCapacity'),
									labelWidth: 100,
									hideTrigger: true,
									editable: false
		                        },{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										margin: '5 5 0 115'
									},
									items: [
										{
											xtype: 'checkboxfield',
											reference: 'cbxSctsChk',
											// fieldLabel: ViewUtil.getLabel('status'),
											boxLabel: ViewUtil.getLabel('WHUseScts'),
											inputValue: 'Y',
											uncheckedValue: 'N',
											name: 'sctsChk',
											bind: '{theSulphur.useScts}',
											checked: false,
										}
									],
								},
		                    ] 
		            	}
		            ]
		        }
			],
            dockedItems:[
            	{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
	                	type: 'hbox',
	                },
					defaults: {
						margin: '1 1 1 1'
		        	},
					items: [
						{
							xtype: 'tbfill'
						},{
							xtype: 'button',
							itemId: 'saveItemId',
							reference:'refBtnSave',
							text: ViewUtil.getLabel('save'),
							iconCls: 'x-fa fa-save',
							listeners: {
								click: 'onSave'
							}
						}
					]
				}
            ]
		});
		
		me.callParent();
	}
});