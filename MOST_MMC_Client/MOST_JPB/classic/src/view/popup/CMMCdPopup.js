Ext.define('MOST.view.popup.CMMCdPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-cmmcdpopup',
	requires: [
		'MOST.view.popup.CMMCdPopupModel',
		'MOST.view.popup.CMMCdPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Common Code Popup",
	width: 523,
	height: 360,
	
	controller: 'cmmcdpopup',
	
	viewModel: {
		type: 'cmmcdpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},

	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCommonCodePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commonCodePopup',	
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
            			header: ViewUtil.getLabel('scd'),
            			dataIndex: 'code',
            			reference: 'refScd',
            			filter: 'string',
            			width: 150
            		},
            		{
            			header: ViewUtil.getLabel('scdNm'),
            			dataIndex: 'codeName',
            			reference: 'refScdNm',
            			align: 'left',
            			filter: 'string',
            			width: 300
            		},
            		{
            			header: ViewUtil.getLabel('cmdtCd'),
            			dataIndex: 'code',
            			reference: 'refCmdtCd',
            			filter: 'string',
            			width: 150,
            		},
            		{
            			header: ViewUtil.getLabel('descr'),
            			dataIndex: 'codeName',
            			reference: 'refCmdtName',
            			filter: 'string',
            			width: 150,
            		},
            		{
            			header: ViewUtil.getLabel('cmdtGrpCd'),
            			dataIndex: 'cmmdGrpCode',
            			reference: 'refCmdtGrpCd',
            			filter: 'string',
            			width: 150,
            		},
            		{
            			header: ViewUtil.getLabel('cmdtGrp'),
            			dataIndex: 'cmmdGrpName',
            			reference: 'refCmdtGrp',
            			align: 'left',
            			filter: 'string',
            			width: 300,
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
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
					{
						xtype: 'combo',
						reference: 'ctlCdNmCombo',
						queryMode: 'local',
						width:100,
	   					bind: {
	    	    			store: '{commonCodePopupSearchCombo}',
	    	    			value:'{theSearch.reqType}',
	    	    		},
	    	    		displayField: 'comName',
	    	    		valueField: 'comCode'
					},{
						xtype:'textfield',
						reference:'txtSearchCommonCdNm',
						maxLength: 20,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						width: 180
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

