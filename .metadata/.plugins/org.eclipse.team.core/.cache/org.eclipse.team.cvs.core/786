Ext.define('MOST.view.operation.vsrchecklist.Forklift', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-forklift',
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
				xtype: 'app-forkliftmega',
				reference: 'refForkliftMega',
				layout: 'fit',
				margin: '0 5 5 5'
			},{
				xtype: 'app-forkliftdeployment',
				reference: 'refForkliftDeployment',
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
				items: ['->',
				{
					xtype: 'button',
					text:  ViewUtil.getLabel('vsrNew'),
					reference:'refBtnRefresh',
					iconCls: 'x-fa fa-refresh',
                    ui: 'update-button',
                    listeners: {
                        click: 'onRefreshForklift'
                    }
				},{
					xtype: 'button',
					text:  ViewUtil.getLabel('add'),
					itemId:'createItemId',
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					reference:'refsAddForklift',
					listeners: {
						click: 'onAddForklift'
					}
				},{
                    
                    xtype: 'button',
                    text:  ViewUtil.getLabel('update'),
                    reference: 'refsUpdateForklift',
                    ui: 'update-button',
                    iconCls: 'fa fa-pencil-square-o',
                    listeners: {
                        click: 'onUpdateForklift'
                    }
                }, {
                	xtype: 'button',
					itemId:'deleteItemId',
					reference:'refsRemoveForklift',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemoveForklift'
					}
				}]
			}]	
		});
		
		me.callParent();
	}
});


