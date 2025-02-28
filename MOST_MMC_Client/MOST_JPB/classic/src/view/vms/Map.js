Ext.define('MOST.view.vms.Map', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-map',
	
	requires: [
	],
	
	//html: "<div id='ais_map'><div id='popup'></div></div>",
	listeners: {
		beforerender: 'onMapBeforeRender',
	    // The resize handle is necessary to set the map!
	    resize: 'onMapResize'
	},
	
	initComponent: function () {
		var me = this;
		
		 Ext.apply(me, {
//			xtype : 'panel',
			html: "<div id='ais_map' class='map'></div><div id='popup' class='ol-popup'><a href='#' id='popup-closer' class='ol-popup-closer'></a><div id='popup-content'></div></div>"
		 });
		me.callParent(arguments);
	}
	
});
