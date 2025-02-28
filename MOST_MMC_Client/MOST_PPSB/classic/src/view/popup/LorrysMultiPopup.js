Ext.define('MOST.view.popup.LorrysMultiPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-lorrysmultipopup',
	requires: [
		'MOST.view.popup.LorrysMultiPopupModel',
		'MOST.view.popup.LorrysMultiPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refLorryMultiListiPopupGrid',
	MAIN_STORE_NAME: 'lorryMultiListiPopup',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"Trucks Multi List",
	width: 620,
	height: 400,

	controller: 'lorrysmultipopup',
	
	viewModel: {
		type: 'lorrysmultipopup'
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
					items: GridUtil.getGridColumns('LorrysMultiPopup')
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
						bind: '{theSearch.lorryNo}'
	   				},
	   				{
						xtype:'textfield',
						reference:'txtLorryIdCdNm',
						fieldLabel: ViewUtil.getLabel('lorryId'),
						fieldStyle : 'text-transform: uppercase',
	   					labelWidth: 60,
						width:200,
						bind: '{theSearch.lorryId}'

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
	    				change: 'onLorryAllCheck'
	    			 }	
				}]
			}]
		});
		
		me.callParent();
	}
});


