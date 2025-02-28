Ext.define('MOST.view.popup.UserTypePopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-usertypepopup',
	requires: [
		'MOST.view.popup.UserTypePopupModel',
		'MOST.view.popup.UserTypePopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Select User Type",
	width: 700,
	height: 400,

	controller: 'usertypepopup',
	
	viewModel: {
		type: 'usertypepopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblUserId: {type: 'bundle', key: 'userId'},
	lblPtnrType: {type: 'bundle', key: 'ptnrType'},
	lblPtnrCode: {type: 'bundle', key: 'ptnrCode'},
	lblEngNm: {type: 'bundle', key: 'parnterName'},
	lblUserTypeCombo: {type: 'bundle', key: 'userType'},
	
	btnSearch: {type: 'bundle', key: 'search'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				itemId: 'userTypeGrid',
				reference: 'refUserTypePopupGrid',
				flex : 1,
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{userTypePopup}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					celldblclick: 'onDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [
	            		{
	            			header: me.lblUserId,
	            			dataIndex: 'staffCd',
	            			reference: 'refUserTypeUserId',
	            			filter: 'string',
	            			width: 130
	            		},
	            		{
	            			header: me.lblPtnrType,
	            			dataIndex: 'ptnrType',
	            			reference: 'refUserTypePtnrType',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblPtnrCode,
	            			dataIndex: 'ptnrCode',
	            			reference: 'refUserTypePtnrCode',
	            			filter: 'string',
	            			width: 110
	            		},
	            		{
	            			header: me.lblEngNm,
	            			dataIndex: 'ptnrName',
	            			reference: 'refUserTypeEngNm',
	            			filter: 'string',
	            			align: 'left',
	            			width: 280
	            		}
	            	]
				}
		    }],
		    
		    dockedItems: [
		    {
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
            	},
				items: [
				{
					reference: 'ctlUserTypeCombo',
					xtype: 'combo',
					labelWidth:80,
					width:240,
					fieldLabel: me.lblUserTypeCombo,
					emptyText: me.lblUserTypeCombo,
					queryMode: 'local',
					bind: {
						store: '{userTypeCombo}'
					},
					displayField: 'scdNm',
					valueField: 'scd',
					value : '',
					editable: false,
					allowBlank: true
				},
				{
					xtype:'textfield',
					reference:'ctlPartnerName',
					fieldLabel: me.lblEngNm,
   					labelWidth: 120,
					width: 240,
					emptyText: me.lblEngNm,
					listeners:{
						change: 'onStoreFilter'
					}
   				}, {
					xtype: 'button',
					text: me.btnSearch,
					iconCls: 'x-fa fa-search',
					listeners: {
						click: 'onSearch'
					}
				}
   				]
			}
		    ]			
		});
		
		me.callParent();
	}
});

