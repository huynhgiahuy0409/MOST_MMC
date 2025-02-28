Ext.define('MOST.view.popup.ChassisMultiPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-chassismultipopup',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refChassisMultiListiPopupGrid',
	MAIN_STORE_NAME: 'chassisMultiListiPopup',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"Chassis Multi List",
	width: 620,
	height: 400,

	controller: 'chassismultipopup',
	
	viewModel: {
		type: 'chassismultipopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				margin: '5 5 5 5',
				stateful : true,
				stateId : 'stateChassisMultiListiPopupGrid',
				usePagingToolbar : false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners : {
					celldblclick: 'onDblClick'
				},
				
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('ChassisMultiPopup')
				}
			}],
		    
		    dockedItems: [{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [{
					xtype: 'container',
					flex: 1,
					layout:{
						type: 'hbox',
					     align: 'stretch'
					},
					items: [
	   				{
						xtype:'textfield',
						reference:'txtChassis',
						fieldLabel: ViewUtil.getLabel('chassisNo'),
						fieldStyle : 'text-transform: uppercase',
	   					labelWidth: 60,
						width:200,
						bind: '{theSearch.plateNo}'
	   				},
	   				{
						xtype: 'button',
						text: ViewUtil.getLabel('search'),
						margin: '0 3 0 5',
						name: 'btnSearch',
						iconCls: 'x-fa fa-search',
						listeners:{
							click:'onSearch'
						}
					},
					{
						xtype: 'button',
						text: ViewUtil.getLabel('update'),
						width: 91,
						name: 'btnUpdate',
						margin: '0 0 0 0',
						listeners:{
							click:'onUpdate'
						}
					}]
		    	}]
			},{
		    	xtype: 'toolbar',
				enableOverflow: true,
				items: [{
					 xtype: 'checkboxfield',
	                 margin: '0 0 0 63',
	                 width: 50,
	                 boxLabel: 'All',
	                 boxLabelAlign : 'after',
	                 listeners: {
	    				change: 'onChassisAllCheck'
	    			 }	
				}]
			}]
		});
		
		me.callParent();
	}
});


