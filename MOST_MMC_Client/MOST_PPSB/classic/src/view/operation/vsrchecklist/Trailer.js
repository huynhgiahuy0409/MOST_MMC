Ext.define('MOST.view.operation.vsrchecklist.Trailer', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-trailer',
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
				xtype: 'app-trailermega',
				reference: 'refTrailerMega',
				layout: 'fit',
				margin: '0 5 5 5'
			},{
				xtype: 'app-trailerdeployment',
				reference: 'refTrailerDeployment',
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
                	reference:'refBtnRefresh',
                	iconCls: 'x-fa fa-refresh',
                	ui: 'update-button',
                	listeners: {
                      click: 'onRefreshTrailer'
                  }
                },{
                	xtype: 'button',
                	text:  ViewUtil.getLabel('add'),
                	ui: 'create-button',
                	iconCls: 'x-fa fa-plus',
                	reference: 'refsAddTrailer',
                	listeners: {
                		click: 'onAddTrailer'
                	}
                },{
                                
                    xtype: 'button',
                    text:  ViewUtil.getLabel('update'),
                    reference: 'refsUpdateTrailer',
                    ui: 'update-button',
                    iconCls: 'fa fa-pencil-square-o',
                    listeners: {
                        click: 'onUpdateTrailer'
                    }
                }, {
                	xtype: 'button',
                	itemId:'deleteItemId',
                	reference: 'refsRemoveTrailer',
                	text: ViewUtil.getLabel('remove'),
                	ui: 'delete-button',
                	iconCls: 'x-fa fa-minus',
                	listeners: {
                		click: 'onRemoveTrailer'
                	}
                }]
			}]	
		});
		
		me.callParent();
	}
});


