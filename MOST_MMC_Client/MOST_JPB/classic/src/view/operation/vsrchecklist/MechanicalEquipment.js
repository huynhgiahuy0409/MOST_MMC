Ext.define('MOST.view.operation.vsrchecklist.MechanicalEquipment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-mechanicalequipment',
	requires: [
		'Ext.grid.plugin.Exporter',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	btnAdd: {type: 'bundle', key: 'add'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnUpdate: {type: 'bundle', key: 'update'},
	btnNew: {type: 'bundle', key: 'vsrNew'},
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype: 'app-mechanicalequipmentmega',
				reference: 'refMechanicalEquipmentMega',
				layout: 'fit',
				margin: '0 5 5 5'
			},{
				xtype: 'app-mechanicalequipmentdeployment',
				reference: 'refMechanicalEquipmentDeployment',
				layout: 'fit',
				flex:1,
				margin: '0 5 5 5'
			}],
			dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right',
					margin :'0 2 0 0'
	        	},
				items: [{
                    xtype: 'label',
                    width: 150,
                    margin: '15 0 0 50',
                    style: "font-weight:bold;",
                    html: me.lblDeployment
                },'->',{
                	xtype: 'button',
                	text:  ViewUtil.getLabel('vsrNew'),
                	iconCls: 'x-fa fa-refresh',
                	ui: 'update-button',
                	listeners: {
                      click: 'onRefreshMechanicalEq'
                  }
                },{
                	xtype: 'button',
                	text:  ViewUtil.getLabel('add'),
                	ui: 'create-button',
                	iconCls: 'x-fa fa-plus',
                	reference: 'refsAddMechanicalEq',
                	listeners: {
                		click: 'onAddMechanicalEq'
                	}
                },{
                                
                    xtype: 'button',
                    text:  ViewUtil.getLabel('update'),
                    reference: 'refsUpdateMechanicalEq',
                    ui: 'update-button',
                    iconCls: 'fa fa-pencil-square-o',
                    listeners: {
                        click: 'onUpdateMechanicalEq'
                    }
                }, {
                	xtype: 'button',
                	itemId:'deleteButton',
                	reference: 'refsRemoveMechanicalEq',
                	text: ViewUtil.getLabel('remove'),
                	ui: 'delete-button',
                	iconCls: 'x-fa fa-minus',
                	listeners: {
                		click: 'onRemoveMechanicalEq'
                	}
                }]
			}]	
		});
		
		me.callParent();
	}
});


