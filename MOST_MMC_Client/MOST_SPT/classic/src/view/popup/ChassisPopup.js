Ext.define('MOST.view.popup.ChassisPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-chassispopup',
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
	MAIN_GRID_REF_NAME: 'refChassisListPopupGrid',
	MAIN_STORE_NAME: 'chassisListPopup',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"Chassis Multi List",
	width: 620,
	height: 400,

	controller: 'chassispopup',
	
	viewModel: {
		type: 'chassispopup'
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
					items: GridUtil.getGridColumns('ChassisPopup')
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
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						},
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
					}]
		    	}]
			}]
		});
		
		me.callParent();
	}
});


