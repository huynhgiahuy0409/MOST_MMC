Ext.define('MOST.view.administrator.ParameterSetting',{
	extend : 'Ext.form.Panel',
	alias : 'widget.app-parametersetting',

	requires: [
	],

	controller: 'parametersetting',
	
	viewModel: {
		type: 'parametersetting'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME : 'refParameterSettingGrid',						// Main Grid Name 
	MAIN_STORE_NAME : 'parametersettinglist',								// Main Store Name
	PARAMETTER_CHECK_COMBOBOX_STORE: 'parametercheckCombo',			// PORT TYPE COMBO STORE NAME
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type : 'vbox',align : 'stretch'},
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'parametersettingEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				validateedit: 'onValidateEdit',				
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				plugins: [
					rowEditing, 
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},	
	    		selModel: {
					type: 'spreadsheet',
					rowSelect: true,
                    cellSelect:false,
				},
				useRecordToolbar : true,
				listeners: {
					celldblclick: 'onDblClick'
				},
				columns: {
					
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('ParameterSettingListView')
				}
		    }],
		    
		    dockedItems: [
		    	{
		    		xtype : 'container',
            		style: {"background-color":"white"}, 
	                layout: {
	                    type: 'hbox',
	                },
	               
                    defaults: {
                    	 margin: '1 1 1 1'
                    },
                    items:[
                    	{xtype: 'tbfill'},
                    	{
							xtype: 'button',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search', 
							cls: 'search-button', 
							listeners: {
								click: 'onSearch'
							}
						}
                    	]
		    	},
		    ]
			
		});
		
		me.callParent();
	}
	
	
});