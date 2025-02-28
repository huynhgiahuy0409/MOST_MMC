Ext.define('MOST.view.popup.PackageNoMultiPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-packagenomultipopup',
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
	MAIN_GRID_REF_NAME: 'refPackageNoMultiPopupGrid',
	MAIN_STORE_NAME: 'packageNoList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title: 'Package Number Detail',
	width: 720,
	height: 400,

	controller: 'packagenomultipopup',
	
	viewModel: {
		type: 'packagenomultipopup'
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
				stateId : 'statePackageNoMultiPopupGrid',
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
					items: GridUtil.getGridColumns('PackageNoMultiPopup')
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
						labelAlign: 'right',
						reference:'txtPackageNo',
						fieldLabel: ViewUtil.getLabel('packageNo'),
						fieldStyle : 'text-transform: uppercase',
	   					labelWidth: 100,
						width:250,
						bind: '{theSearch.packageNo}'
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
	    				change: 'onAllCheck'
	    			 }	
				}]
			}]
		});
		
		me.callParent();
	}
});


