Ext.define('MOST.view.popup.PackingListPopup', {
	extend : "Ext.panel.Panel",
	alias : 'widget.popup-packinglistpopup',

	requires : [],

	viewModel : {
		type : 'goodsreceipt'
	},

	controller : 'goodsreceipt',
	
	width: 450,
	height: 400,
	
	layout : {type  : 'vbox', align : 'stretch'},

	listeners:{
		afterrender: 'onLoadPackinglistPopup'
	},
	
	config:{
		params : null
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPackingListPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'packingList',	
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
	    		columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('PackingList')
				}
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
								xtype : 'button',
								text : 'Search',
								iconCls: 'x-fa fa-search',
								listeners : {
									click : 'onLoadPackinglistPopup'
								}
							},
							{
			 					xtype: 'button',
			 					text: ViewUtil.getLabel('ok'),
			 					width:120,
			 					margin: '0 5 0 5',
			 					reference:'refBtnOK',
			 					listeners: {
			 						click: 'onUpdatePackinglist'
			 					}
							}]
					}]
			} ]
		});
		
		me.callParent();
	}
});