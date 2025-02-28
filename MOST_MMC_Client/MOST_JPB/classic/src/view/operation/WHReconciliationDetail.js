Ext.define('MOST.view.operation.WHReconciliationDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-whreconciliationdetail',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],

	listeners:{
		afterrender: 'onWHReconcilDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAIL_GRID_REF_NAME: 'refWHReconcilDetailGrid',				// Main Grid Name 
	DETAIL_STORE_NAME: 'whReconcilDetailGrid',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout :'fit',
	width: 1200,
	height:600,

	initComponent: function() {
		var me = this;
		var whReconcilDetailGridRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'whReconcilDetailEditor',
			listeners: {
				cancelEdit: 'onWhReconcilCancelEdit',				
				validateedit: 'onWhReconcilValidateEdit',				
				edit: 'onWhReconcilDetailEdit'
			}
		});
		Ext.apply(me,{
			xtype: 'panel',
            flex: 1,
            defaults: {
                margin: '5 5 5 5',
                labelAlign: 'right',
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[{
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex:1,
                items: [{

        				xtype: 'tsb-datagrid',
        				reference: me.DETAIL_GRID_REF_NAME,
        				usePagingToolbar : false,
        				stateful : true,
        				flex:1,
        				stateId : 'stateWHReconcilDetailGrid',
        				plugins: [
        					whReconcilDetailGridRowEditing, 
        					'gridexporter',
        					'gridfilters',
        					'clipboard'
        	    		],
        	    		bind: {
        	    			store: '{' + me.DETAIL_STORE_NAME + '}'
        	    		},
        				listeners: {
        					celldblclick: 'onWhRecDetailDblClick',
        					
        				},
        	    		selModel: {
        					type: 'spreadsheet',
        					cellSelect: false
        				},
        				
        				columns: {
        	            	defaults: {
        	            		style : 'text-align:center',
        	            		align : 'center'
        	            	},
        	            	items: GridUtil.getGridColumns('WHReconcilDetail')
        				}
                    }]
                
            }],
            dockedItems:[{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
	        	},
				items: [{
					xtype:'container',
					layout:{
						type:'hbox'
					},
					flex:1,
					items:[{
						xtype:'textfield',
						fieldLabel: ViewUtil.getLabel('whReconcilAccAmt'),
						labelWidth: 150,
						width:250,
						labelAlign:'right',
						reference:'txtMt',
						editable:false,
						fieldStyle:'text-align:center'
					},{
						xtype:'textfield',
						width: 100,
						margin: '0 0 0 5',
						editable:false,
						reference:'txtM3',
						fieldStyle:'text-align:center'
					},{
						xtype:'textfield',
						width: 100,
						margin: '0 0 0 5',
						editable:false,
						reference:'txtQty',
						fieldStyle:'text-align:center'
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});