Ext.define('MOST.view.popup.EmpIdPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-empidpopup',
	requires: [
		'MOST.view.popup.EmpIdPopupModel',
		'MOST.view.popup.EmpIdPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"EmpId List",
	
	width: 800,
	height: 360,

	controller: 'empidpopup',
	
	viewModel: {
		type: 'empidpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				reference: 'refEmpIdPopupGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateEmpIdPopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{empIdPopupDataSet}'
	    		},
				listeners: {
					celldblclick: 'onDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [{
	            		header: ViewUtil.getLabel('gridNo'),
	            		xtype: 'rownumberer',
	            		width : 50,
	            		align : 'center'
	            	},
	            	{
            			header: ViewUtil.getLabel('roleCd'),
            			dataIndex: 'roleCd',
            			reference: 'refRoleCd',
            			filter: 'string',
            			width: 70
            		},
	            	{
            			header: ViewUtil.getLabel('sroleCd'),
            			dataIndex: 'sRoleCd',
            			reference: 'refSRoleCd',
            			filter: 'string',
            			width: 120
            		},
            		{
            			header: ViewUtil.getLabel('empId'),
            			dataIndex: 'empId',
            			reference: 'refEmpId',
            			filter: 'string',
            			width: 100
            		},
            		{
            			header: ViewUtil.getLabel('empNm'),
            			dataIndex: 'empNm',
            			reference: 'refEmpNm',
            			filter: 'string',
            			align: 'left',
            			width: 257
            		}]
				}
		    }],
		    
		    dockedItems: [{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [
				{
					xtype: 'container',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
	   					xtype: 'combo',
	   					reference: 'ctlRoleCdCombo',
	   					queryMode: 'local',
	   					margin: '0 5 0 0',
	   					bind: {
	    	    			store: '{empIdCombo}'
	    	    		},
	   					displayField: 'scdNm',
	   					valueField: 'scd',
	   					width: 240,
	   					value : '',
	   					editable: false,
	   					allowBlank: true,
	   					emptyText: ViewUtil.getLabel('select'),
	   					listeners: {
							select: {
								fn: 'onSearchComboSelect',
								args: ['this']
							}
						} 
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});

