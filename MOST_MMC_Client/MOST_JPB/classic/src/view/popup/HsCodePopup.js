Ext.define('MOST.view.popup.HsCodePopup', {
	extend: "Ext.panel.Panel",
	alias: 'widget.popup-hscodepopup',
	
	requires : 
	[ 
		'Ext.grid.filters.Filters'
	],
	
	title: 'HS Code Popup ',
	
	listeners:
	{
		afterrender: 'onLoad'
	},
	
	viewModel: 
	{
		type: 'hscodepopup'
	},
	
	width: 700,
	height: 600,
	
	controller: 'hscodepopup                                                                                                                                                                                                                                                  ',
	layout: 
	{
		type: 'fit',
		align: 'stretch'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refHsCodePopupGrid',				// Main Grid Name
	MAIN_STORE_NAME: 'hsCodePopup',					// Main Store Name 
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me,
		{
			items: [
			{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar: false,
				flex: 1,
				stateful: true,
				bind:
				{
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				listeners:
				{
					celldblclick: 'onDblClick'
				},
				plugins: [
					'gridfilters'
				],
				columns:
				{
					defaults:
					{
						style: 'text-align:center'
					},
					items:
					[
						{
							xtype: 'rownumberer',
							width: 30,
							align: 'center'
						},
//						{
//		            		header: ViewUtil.getLabel('check'),	            		
//				            xtype: 'checkcolumn',
//				            dataIndex: 'chkCdNm',
//				            width: 60,
//				            defaultType: 'integer',
//				            listeners: 
//				            {
//	    		                checkchange: 'onCommonCodeForMultiCheckChange'
//	    		            }
//				        },
						{
							header: ViewUtil.getLabel('code'),
							dataIndex: 'hsCode',
							filter: 'string',
							width: 150
						},
						{
							header: ViewUtil.getLabel('description'),
							dataIndex: 'hsNm',
							filter: 'string',
							width: 150
						},
						{
							header: ViewUtil.getLabel('hsunit'),
							dataIndex: 'unit',
							filter: 'string',
							width: 150
						},
					]
				}
			}
		],
		
		dockedItems: [
			{
				xtype: 'toolbar',
				items:
				[
					{
						xtype: 'textfield',
						fieldLabel: ViewUtil.getLabel('hscd'),
						fieldStyle: 'text-transform : uppercase',
						reference: 'txtHsCd',
						bind: '{theSearch.hsCd}'
					},
					{
						xtype: 'textfield',
						fieldLabel: ViewUtil.getLabel('hsdesc'),
						fieldStyle: 'text-transform : uppercase',
						reference: 'txtHsCdNm',
						bind: '{theSearch.hsCdNm}'
					},
					'-',
					{
						xtype: 'button',
						text: ViewUtil.getLabel('search'),
						iconCls: 'x-fa fa-search',
						listeners: 
						{
							click: 'onSearch'
						}
					}
				]
			},
		]
	});
	
	me.callParent();
	}
});