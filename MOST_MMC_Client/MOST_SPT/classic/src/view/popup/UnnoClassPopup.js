Ext.define('MOST.view.popup.UnnoPopup', {
	extend : "Ext.panel.Panel",
	alias : 'widget.popup-unnoclasspopup',

	requires : [],

	viewModel : {
		type : 'unnoclasspopup'
	},

	controller : 'unnoclasspopup',
	
	width: 450,
	height: 400,
	
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
	MAIN_GRID_REF_NAME: 'refUnnoClassPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'unnoclassPopup',	
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
						header : ViewUtil.getLabel('dgUnno'),
						dataIndex : 'unno',
						width : 100
					}, {
						header : ViewUtil.getLabel('dgClass'),
						dataIndex : 'classLevel',
						width : 100
					},{
						header : ViewUtil.getLabel('substance'),
						dataIndex : 'substance',
						width : 150
					}
				],
			}],
			dockedItems: [{
		    	xtype: 'toolbar',
		    	docked: 'bottom',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items : [
					{
						xtype: 'searchfieldset',
						flex: 1,
						layout:{
							type: 'hbox',
						     align: 'stretch'
						},
						items: [
							{
								xtype: 'combo',
								reference: 'ctlCdNmCombo',
								width:100,
								queryMode: 'local',
			   					bind: {
			    	    			store: '{unnoCodeNameCombo}',
			    	    			value : '{theSearch.reqType}'
			    	    		},
			    	    		displayField: 'comName',
			    	    		valueField: 'comCode',
			    	    		editable: false
							},{
								xtype:'textfield',
								reference:'txtSearchCommonCdNm',
								maxLength: 20,
								enforceMaxLength: true,
								margin: '0 5 0 5',
								width: 180,
								listeners: {
									change : 'onUpperCase'
								},
								bind: '{theSearch.scd}'
							},
							{
								xtype : 'button',
								text : 'Search',
								iconCls: 'x-fa fa-search',
								listeners : {
									click : 'onSearch'
								}
							}]
					}]
			} ]
		});
		
		me.callParent();
	}
});