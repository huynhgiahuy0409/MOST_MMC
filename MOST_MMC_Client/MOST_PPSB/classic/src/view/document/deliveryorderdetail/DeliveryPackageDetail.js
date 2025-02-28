Ext.define('MOST.view.document.deliveryorderdetail.DeliveryPackageDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-deliverypackagedetail',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CONTAINER_GRID_REF_NAME: 'refDoPkgDetailGrid',				// Main Grid Name 
	CONTAINER_STORE_NAME: 'doPkgDetail',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'hbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'container',
		            flex: 1,
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            hidden: true,
		                            fieldLabel: ViewUtil.getLabel('quantity'),
		                            reference:'ctlPackageDetailQty',
		                            margin: '5 5 5 15',
		                            labelAlign: 'right',
		                            fieldStyle: 'background-color:#60ec08;background-image:none',
		                            labelWidth: 100
		                        }
		                    ]
		                },{
							xtype: 'tsb-datagrid',
							flex: 1,
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
//	    		            selType: 'checkboxmodel',
//	    		            selModel: {
//								type: 'spreadsheet',
//								cellSelect: false,
//								listeners:{
//									select: 'onCount',
//									deselect:'onCount'
//								}
//	    		            },
							columns:{
								defaults: {
				            		style : 'text-align:center'
				            	},
				            	items: GridUtil.getGridColumns('DOPackageDetail')
							}
						}
		            ]
		        }
		    ]
		});
		
		me.callParent();
	}
});