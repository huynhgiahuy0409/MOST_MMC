Ext.define('MOST.view.controller.staffandequipment.StaffAndEquipmentStevedore', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-staffandequipmentstevedore',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'manPowerGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				edit: 'onEdit'
			}
		});
			
		Ext.apply(me, {
			items: [
				{
	            	xtype:'fieldset',
	            	layout:{
	            		type:'vbox',
	            		align:'stretch'
	            	},
	            	title:'Mega Summary',
	            	flex:1,
	            	items:[{
	                    xtype: 'tsb-datagrid',
	                    reference: 'refStevedoretGrid',
						usePagingToolbar : false,
	    				stateful : true,
	    				flex: 1,
	    				stateId : 'stateStevedoreGrid',
	    				plugins: [
	    					rowEditing,
	    					'gridexporter',
	    					'gridfilters',
	    					'clipboard'
	    	    		],
	    	    		bind: {
	    	    			store: '{stevedoreCompanyList}'
	    	    		},
	    	    		selModel: {
	    					type: 'spreadsheet',
	    					cellSelect: false
	    				},
	    				listeners: {
	    					celldblclick: 'onManPowerDblClick'
	    				},
	                    columns: {
	    	            	defaults: {
	    	            		style : 'text-align:center',
	    	            		align : 'center'
	    	            	},
	    	            	items:GridUtil.getGridColumns('StaffDeploymentStevedoret')
	    	            	
	                    }
			        }]
	            }]
		});
		
		me.callParent();
	}
});