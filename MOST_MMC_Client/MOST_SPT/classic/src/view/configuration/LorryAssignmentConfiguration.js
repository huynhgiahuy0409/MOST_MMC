Ext.define('MOST.view.configuration.LorryAssignmentConfiguration', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-lorryassignmentconfiguration',
    
    requires: [
        'MOST.view.configuration.LorryAssignmentConfigurationModel',
        'MOST.view.configuration.LorryAssignmentConfigurationController',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel'
    ],
    
    controller: 'lorryassignmentconfiguration',
    
    viewModel: {
        type: 'lorryassignmentconfiguration',
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
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '5 0 0 0'// top, right, bottom, left
                    },
                    
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    html: 'Colors configuration',
                                    margin: '15 0 0 15',
                                    style: 'font: 30px bold',
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'box',
                                    width: 60,
                                    height: 30,
                                    style: 'background-color: yellow; border: 1px solid black;',
                                    margin: '10 0 0 40',
                                    labelWidth: 300
                                },
                                {
                                    xtype: 'numberfield',
                                    reference: 'ctlYellowNumber',
                                    width: 80,
                                    minValue: 0,
                                    margin: '11 10 0 15',
                                    style: 'border: 1px solid black;',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'label',
                                    html: 'minutes',
                                    margin: '15 0 0 0'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'box',
                                    width: 60,
                                    height: 30,
                                    style: 'background-color: red; border: 1px solid black;',
                                    margin: '10 0 0 40',
                                    labelWidth: 300
                                },
                                {
                                    xtype: 'numberfield',
                                    reference: 'ctlRedNumber',
                                    width: 80,
                                    minValue: 0,
                                    margin: '11 10 0 15',
                                    style: 'border: 1px solid black;',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'label',
                                    html: 'minutes',
                                    margin: '15 0 0 0'
                                }
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