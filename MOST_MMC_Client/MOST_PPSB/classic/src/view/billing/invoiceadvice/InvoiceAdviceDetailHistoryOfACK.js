Ext.define('MOST.view.billing.invoiceadvice.InvoiceAdviceDetailHistoryOfACK', {
	extend: 'Ext.panel.Panel',
	alias:  'widget.app-invoiceadvicedetailhistoryofack',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"History of Acknowledge",
	width: 950,
	height: 360,

	
	listeners:{
		afterrender: 'onDetailHistoryOfACKLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				usePagingToolbar : false,
				reference: 'refInvoiceAdviceDetailHistoryGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateInvoiceAdviceDetailHistoryGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{invoiceAdviceDetailHistoryGridList}'
	    		},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('InvoiceAdviceDetailHistoryGridList')
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
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
					{
						xtype:'textfield',
						reference:'ctlSearchAdviceNo',
						maxLength: 20,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						width: 180,
						bind:'{theDetailHead.adviceNo}'
					},{
						xtype: 'button',
						text: ViewUtil.getLabel('search'),
						width: 100,
						height: 33,
						iconCls: 'x-fa fa-search',
						margin: '0 0 0 0',
						listeners:{
							click:'onHistorySearch'
						}
					}]
				}]
		    }]
		});
		
		me.callParent();
	}
});

