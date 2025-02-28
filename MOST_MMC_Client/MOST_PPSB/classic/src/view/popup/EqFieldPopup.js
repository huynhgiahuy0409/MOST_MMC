Ext.define('MOST.view.popup.EqFieldPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-eqfieldpopup',
	requires: [
		'MOST.view.popup.EqFieldPopupModel',
		'MOST.view.popup.EqFieldPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Equipment List",
	width: 700,
	height: 360,
	
	controller: 'eqfieldpopup',
	
	viewModel: {
		type: 'eqfieldpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},

	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refEqFieldPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'eqFieldPopup',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				usePagingToolbar : false,
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
	    		plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
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
            			header: ViewUtil.getLabel('eqFacNo'),
            			dataIndex: 'eqFacNo',
            			reference: 'refEqFacNo',
            			filter: 'string',
            			width: 150
            		},
            		{
            			header: ViewUtil.getLabel('eqForklift'),
            			dataIndex: 'eqName',
            			reference: 'refEqForklift',
            			align: 'center',
            			filter: 'string',
            			width: 300
            		},
					{
            			header: ViewUtil.getLabel('eqPrime'),
            			dataIndex: 'eqName',
            			reference: 'refEqPrime',
            			align: 'center',
            			filter: 'string',
            			width: 300
            		},
            		{
            			header: ViewUtil.getLabel('eqCapacity'),
            			dataIndex: 'eqCapacity',
            			reference: 'refEqCapacity',
            			filter: 'string',
            			width: 150,
            		},
				]
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
					defaults: {
						margin: '0 5 0 0'
					},
					layout: {		
						type: 'hbox',
						align: 'stretch'
					},
					items: [	
					{
						xtype: 'label',
						margin: '5 12 0 0',
						style: {
							'text-align': 'right'
						},	
						width: 30,
						text: ViewUtil.getLabel('eqTpCd')
					},{
						xtype:'textfield',
						reference:'txtEqName',
						fieldStyle: 'text-align: center;',
						width: 100,
						value: ViewUtil.getLabel('eqForklift'),
						readOnly: true
					},{
						xtype:'textfield',
						reference:'txtEqNameNo',
						fieldStyle: 'text-align: center;',
						style: {
							'text-align': 'center'
						}, 
						width: 150,
						value: ViewUtil.getLabel('eqForkliftNo'),
						readOnly: true
					},{
						xtype:'textfield',
						reference:'eqValue',
						width: 150,
						bind: {
							value: '{theDetail.eqValue}'
						}
					},{
						xtype: 'button',
						text: ViewUtil.getLabel('search'),
						width: 100,
						height: 28,
						iconCls: 'x-fa fa-search',
						margin: '0 0 0 0',
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

