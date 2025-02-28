Ext.define('MOST.view.operation.vsrchecklist.PortCrane', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-portcrane',
	requires: [
		'Ext.grid.plugin.Exporter',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	btnAdd: {type: 'bundle', key: 'add'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnUpdate: {type: 'bundle', key: 'update'},
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype: 'app-portcranemega',
				reference: 'refPortCraneMega',
				layout: 'fit',
				margin: '0 5 5 5'
			},{
				xtype: 'app-portcranedeployment',
				reference: 'refPortCraneDeployment',
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
				items: ['->',{
					xtype: 'button',
					text:  ViewUtil.getLabel('add'),
					itemId:'createItemId',
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAddPortCrane'
					}
				},{
					
					xtype: 'button',
					text:  ViewUtil.getLabel('update'),
					ui: 'update-button',
                    iconCls: 'fa fa-pencil-square-o',
					listeners: {
						click: 'onUpdatePortCrane'
					}
				}, {
					xtype: 'button',
					itemId: 'deleteButton',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemovePortCrane'
					}
				}]
			}]	
		});
		
		me.callParent();
	}
});


