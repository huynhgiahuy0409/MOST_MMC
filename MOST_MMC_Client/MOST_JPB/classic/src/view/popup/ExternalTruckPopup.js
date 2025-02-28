Ext.define('MOST.view.popup.ExternalTruckPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-externaltruckpopup',
	requires: [
		'MOST.view.popup.ExternalTruckPopupModel',
		'MOST.view.popup.ExternalTruckPopupController',
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
	
	title:"External Truck List",
	width: 620,
	height: 400,

	controller: 'externaltruckpopup',
	
	viewModel: {
		type: 'externaltruckpopup'
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
				},
				
				viewConfig: {
					loadMask: true 
				},
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
						xtype:'textfield',
						reference:'txtLorryIdCdNm',
						fieldLabel: ViewUtil.getLabel('lorryId'),
						fieldStyle : 'text-transform: uppercase',
	   					labelWidth: 60,
						width:200,
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						},
						bind: '{theSearch.lorryId}',
						hidden: true

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


