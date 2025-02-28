Ext.define("MOST.view.document.deliveryorderdetail.ROROTab",{
    extend: "Ext.form.Panel",
    alias: 'widget.dororotab',
    requires:[
  		'MOST.config.Locale'
  	],
	scrollable: 'y',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CONTAINER_GRID_REF_NAME: 'refROROGrid',				// Main Grid Name 
	CONTAINER_STORE_NAME: 'unitList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
  	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			xtype:'container',
			defaults:{
				margin: '5 0 0 0'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items:[
				{
					xtype: 'fieldset',
					margin: '5 0 5 0',
					padding: '0 5 0 5',
					height: 361,
					items:[
						{
							xtype: 'container',
							layout: {
								type  : 'vbox', 
								align : 'stretch' 
							},
							items:[
								{
									xtype: 'container',
									items: [
										{
											xtype: 'tsb-datagrid',
											height: 300,
											reference: me.CONTAINER_GRID_REF_NAME,
											usePagingToolbar : false,
											plugins: [
						    		          'gridexporter',
						    		          'gridfilters',
						    		          'clipboard'
					    		            ],
					    		            bind:{
										    	 store: '{' + me.CONTAINER_STORE_NAME + '}'
					    		            },
					    		            selModel: {
												type: 'spreadsheet',
												cellSelect: false
					    		            },
					    		            listeners : {
					    		            	cellclick: 'onUnitsGridItemClick'
					    					},
											columns:{
												defaults: {
								            		style : 'text-align:center'
								            	},
								            	items: GridUtil.getGridColumns('dogrroroUnitGridColumns')
											}
										}
									]
								}
							]
						}
					]
				}
	        ]
		});
		
		me.callParent();
  	}
});