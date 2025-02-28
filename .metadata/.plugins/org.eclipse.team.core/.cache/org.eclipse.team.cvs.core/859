Ext.define('MOST.view.popup.InternalTruckPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-internaltruckpopup',
	requires: [
		'MOST.view.popup.InternalTruckPopupModel',
		'MOST.view.popup.InternalTruckPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refLorryListPopupGrid',
	MAIN_STORE_NAME: 'lorryListPopup',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"Internal Truck List",
	width: 620,
	height: 400,

	controller: 'internaltruckpopup',
	
	viewModel: {
		type: 'internaltruckpopup'
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
				stateId : 'stateLorryMultiListiPopupGrid',
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
					items: GridUtil.getGridColumns('registrationTruckPopup')
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
						reference:'txtLorryNoCd',
						fieldLabel: ViewUtil.getLabel('truckNo'),
						fieldStyle : 'text-transform: uppercase',
						margin: '0 10 0 10',
	   					labelWidth: 65,
						width: 190,
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						},
						bind: '{theSearch.lorryNo}'
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
			}
			]
		});
		
		me.callParent();
	}
});


