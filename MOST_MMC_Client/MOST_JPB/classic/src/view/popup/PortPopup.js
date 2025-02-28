Ext.define('MOST.view.popup.PortPopup', {
	extend : "Ext.panel.Panel",

	alias : 'widget.popup-portpopup',

	requires : [ 
	    'Ext.grid.filters.Filters'
    ],

	listeners:{
		afterrender: 'onLoad'
	},
	
    viewModel : {
		type : 'portpopup'
	},
	width: 700,
	height: 600,
	reference: 'refPortWin',

	controller : 'portpopup',
	layout: {type: 'fit', align: 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPortGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'portPopup',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent : function() {
		var me = this;
		Ext.apply(me,{
			
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar : false,
				flex : 1,
				stateful : true,
	    		
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		
	    		listeners : {
	    			celldblclick : 'dblclick'
	    		},
	    		
	    		plugins: [
	    		          'gridfilters'
	    		],
	    		
	    		columns: {
	    			defaults: {
	            		style : 'text-align:center'
	            	},
	            	items:[
					{
						xtype: 'rownumberer',
						width : 30,
						align : 'center'
					},
					{
						header : ViewUtil.getLabel('countrycd'),
						dataIndex : 'countryCode',
						filter: 'string',
						width : 150
					},
					{
						header : ViewUtil.getLabel('countryNm'),
						dataIndex : 'countryName',
						filter: 'string',
						width : 150
					}, {
						header : ViewUtil.getLabel('unloCode'),
						dataIndex : 'portCode',
						filter: 'string',
						width : 150
					}, {
						header : ViewUtil.getLabel('unloName'),
						dataIndex : 'portName',
						filter: 'string',
						width : 150
					}]
	    		}
			}],
			
			
		dockedItems : [{
			xtype : 'toolbar',
			items : [
				{
					xtype : 'textfield',
					fieldLabel : ViewUtil.getLabel('countrycd'),
					fieldStyle: 'text-transform : uppercase',
					reference : 'txtCountryCd',
					bind: '{theSearch.countryCode}'
				},
				{
					xtype : 'textfield',
					fieldLabel : ViewUtil.getLabel('countryNm'),
					fieldStyle: 'text-transform : uppercase',
					reference : 'txtCountryNm',
					bind: '{theSearch.countryName}'
				},
				'-',
				{
					xtype : 'button',
					text : ViewUtil.getLabel('search'),
					iconCls : 'x-fa fa-search',
					listeners : {
						click : 'onSearch'
					}
				} ]
			}, {
			xtype : 'toolbar',
			items : [
				{
					xtype : 'textfield',
					fieldLabel : ViewUtil.getLabel('unloCode'),
					fieldStyle: 'text-transform : uppercase',
					reference : 'txtPortCd',
					bind: '{theSearch.portCode}'
				},
				{
					xtype : 'textfield',
					fieldLabel : ViewUtil.getLabel('unloName'),
					fieldStyle: 'text-transform : uppercase',
					reference : 'txtPortNm',
					bind: '{theSearch.portName}'
				} ]
		} ]
						});
		me.callParent();
	}
});