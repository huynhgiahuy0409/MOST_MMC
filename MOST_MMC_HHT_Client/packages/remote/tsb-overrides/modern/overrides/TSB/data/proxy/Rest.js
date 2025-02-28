Ext.define('TSB.data.proxy.Rest', {
	override: 'Ext.data.proxy.Rest',
	
	config: {
		timeout : '300000'
//		timeout : '180000'
	},
	
    constructor: function(config) {
		var me = this;
		me.callParent(arguments);        
    }	
});