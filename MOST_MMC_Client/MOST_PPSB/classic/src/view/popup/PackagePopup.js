Ext.define('MOST.view.popup.PackagePopup', {
	extend : "Ext.panel.Panel",

	alias : 'widget.app-packagepopup',

	requires : [ 
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	viewModel : {
		type : 'packagepopup'
	},

	controller : 'packagepopup',
	
	width: 700,
	height: 450,
	
	layout : {type  : 'vbox', align : 'stretch'},

	listeners:{
		afterrender: 'onLoad'
	},
	
	config:{
		params : null
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPackagePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'packagePopup',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent : function() {
		var me = this;
		
		Ext.apply(me, {
			items:[{
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
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
	    		listeners: {
	    			cellDblClick: 'dblclick'
	    		},
	    		columns: [
					{
						header : ViewUtil.getLabel('packagecd'),
						dataIndex : 'scd',
						width : 150
					}, {
						header : ViewUtil.getLabel('packagenm'),
						dataIndex : 'scdNm',
						width : 400
					}
				],
			}],
			dockedItems: [{
				xtype : 'toolbar',
				items : [
					{
						xtype : 'textfield',
						fieldLabel : ViewUtil.getLabel('packagecd'),
						reference : 'txtPackageCd',
						fieldStyle: 'text-transform:uppercase',
						bind: '{theSearch.pkgTpCode}'
					},
					{
						xtype : 'textfield',
						fieldLabel : ViewUtil.getLabel('packagenm'),
						reference : 'txtPackageNm',
						fieldStyle: 'text-transform:uppercase',
						bind: '{theSearch.scdNm}'
					},{
						xtype : 'button',
						text : 'Search',
						iconCls: 'x-fa fa-search',
						listeners : {
							click : 'onSearch'
						}
					} ]
			} ]
		});
		
		me.callParent();
	}
});