Ext.define('MOST.view.vms.AreaManagement', {
	/**
     * @memberOf TSB
     */
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-areamanagement',
	requires: [
	           ],
	
	controller: 'vesselmapcontroller',
	           
	constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);	// 170725 HS ADD
    },	
	
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			scrollable: false,
				items: [{
	            	xtype: 'panel',
			    	reference: 'refMap',
			    	flex: 1,
			    	region: 'center',
			    	layout: 'fit',
			    	items: [{
			    		xtype: 'container',
			    		reference: 'refAreaMapContainer'
			    	}],
			    	listeners: {
			    	    // The resize handle is necessary to set the map!
			    	    resize: 'onMapResize',
			    	},
//			    	dockedItems: [{
//					    xtype: 'toolbar',
//					    reference: 'refDock',
//						dock: 'top',
//						margin: '1 0 0 0',
//						hidden: false,
////						items: [{
////	                    	xtype:'button',					
////	                    	text: 'Base Map',
////	                    	iconCls: 'x-fa fa-map',
////	                    	arrowAlign:'right',
////	                    	tooltip: 'Base Map',
////	                    	reference: 'refBaseMap',
////							menu: [{ 
////	                    		xtype: 'radiogroup',
////	                    		vertical: true,
////	                    		columns: 1,
////	                    		width: 200,
////	                    		defaults: {
////	                    			handler: 'onBaseMapOptions'
////	                    		},
////	                    		items:[{
////	                    			boxLabel: 'Esri - Oceans',
////	                    			inputValue: 'ESRI_OCEANS',
////	                				checked: true
////	                    		}]
////							}]
////	                    }]
//	                }]
			    }]
		});
		me.callParent(arguments);
	},
	
	afterRender : function(){
		var me = this;
		me.getController().loadMap(null, null, 
				me.lookupReference('refAreaMapContainer'),
				null,
				null,
				'AREA');
		me.getController().onAreaSetting();
		me.callParent(arguments);
	}
});
