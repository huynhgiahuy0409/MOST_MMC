Ext.define('MOST.view.planning.roster.UnavailableLogForStaff', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-unavailablelogforstaff',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width: 550,
	height: 600,
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'unavailableLogForStaffGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				edit: 'onUnavailableLogForStaffEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: 'refUnavailableLogForStaffGrid',
				flex : 1,
				usePagingToolbar: false,
				stateful : true,
				stateId : 'stateUnavailableLogForStaffGrid',
				plugins: [
					   rowEditing,
    		          'gridexporter',
    		          'gridfilters',
    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{unavailableLogforStaffListStore}'
	    		},
	    		margin:'0 5 5 5',
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('UnavailableLogForStaff')
				}
		    }],
		    
		    dockedItems: [{
	            xtype: 'toolbar',
	            dock: 'top',
	            margin: '0 0 0 0',
	            items: [
	                {
	                    xtype: 'container',
	                    flex: 1,
	                    title: '',
	                    layout: {
	                        type: 'vbox',
	                        align: 'stretch'
	                    },
	                    items: [
	                        {
	                            xtype: 'container',
	                            layout: {
	                                type: 'hbox',
	                                align: 'stretch'
	                            },
	                            items: [
	                                {
	                                    xtype: 'textfield',
	                                    reference: 'txtStaffCd',
	                                    margin: '0 5 0 20',
	                                    width: 160,
	                                    fieldLabel:  ViewUtil.getLabel('staffNo'),
	                                    labelAling:'right',
	                                    editable: false,
	                                    labelWidth: 80
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    reference: 'txtStaffNm',
	                                    height: 0,
	                                    editable: false,
	                                    margin: '0 0 10 0',
	                                    width: 250
	                                }
	                            ]
	                        }
	                    ]
	                }
	            ]
	        },
	        {
	            xtype: 'toolbar',
	            dock: 'top',
	            height: 44,
	            items: ['->',
	                {
	                    xtype: 'button',
	                    width: 100,
	                    text: ViewUtil.getLabel('add'),
	                    ui: 'create-button',
	                    iconCls: 'x-fa fa-plus',
	                    listeners: {
	                    	click: 'onUnavailableLogForStaffAdd'
	                    }
	                    
	                },
	                {
	                    xtype: 'button',
	                    width: 100,
	                    text: ViewUtil.getLabel('remove'),
	                    ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
	                    listeners: {
							click: 'onUnavailableLogForStaffRemove'
						}
	                }
	            ]
	        }]
        });
		me.callParent();
	}
});


