Ext.define('MOST.view.configuration.WarehouseDefinitionLayout', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-warehousedefinitionlayout',
	
    requires: [
	    'Ext.draw.Container',
	    'MOST.config.Locale'
	],
   	layout: {
		type: 'vbox',
		align: 'stretch'
    },
    
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			items: [{
				xtype: 'panel',
				itemId: 'warehouseLayoutViewId',
				reference: 'panel-warehouselayoutview',
				region: 'center',
				layout : 'fit',
				items: [{
						layout:{
							type: 'vbox',
							align: 'stretch'
						},
						items: [{
								xtype: 'panel',
								flex: 1,
								reference: 'refWarehouseLayoutView',
								layout: {
									type: 'absolute'
								},
								scrollable: true
						}]
				}],		            	
                dockedItems: [{
				    xtype: 'toolbar',
					dock: 'top',
					margin: '1 0 0 0',
					hidden: false,
					items: [{
	                    	xtype:'button',					
				            text: ViewUtil.getLabel('warehouseZoom'),
	                    	iconCls: 'x-fa fa-search-plus',
				            arrowAlign:'right',
				            tooltip: ViewUtil.getLabel('warehouseZoom'),
				            menu: [{ 
				            	xtype: 'segmentedbutton',
				            	vertical: false,
				            	items:[{
					            	text: '-20%', 
					            	tooltip: 'Zoom Out (-20%)',
					            	handler: 'onZoomWarehouse',
					            	value: '-20'
					            }, {
									xtype: 'button',
									text: '100%',
						        	tooltip: 'Zoom to 100%',
									handler: 'onZoomWarehouse',
									value: 100,
					            	pressed: true
					            }, {
					            	text: '+20%', 
					            	tooltip: 'Zoom In (+20%)',
					            	handler: 'onZoomWarehouse',
					            	value: '20'
					            }]
				            }]			
	                    },{
		                	xtype:'button',	
		                	enableToggle: true,
		                	text: ViewUtil.getLabel('setUnusedBlock'),
		                	iconCls: 'fa fa-ban',
		                	tooltip: ViewUtil.getLabel('setUnusedBlock'),
		                	reference: 'refUnusedBlock'
		                },{
	                    	xtype: 'checkboxfield',
	                    	boxLabel: 'Keep Fit Warehouse To Window',
	                    	name: 'fitWindow',
	                    	reference: 'refFit',
	                    	listeners: {
	                    		change: 'onFitWarehouseToWindow'
	                    	}	
	                    }
	                ]
                }]
			}]
		});
		
		me.callParent();
	},

	afterRender : function(){
		var me = this;
		var ref = me.up().up().getController().getReferences().refWarehouseLayoutView;
		ref.getScrollable().on("scroll", me.up().up().getController().onScroll, me.up().up().getController());
		ref.on("resize", me.up().up().getController().onResize, me.up().up().getController());

		me.callParent(arguments);
	}
});