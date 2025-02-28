Ext.define('MOST.store.vms.Route',{
	extend: 'Ext.data.Store',
	alias: 'store.route',
	model : 'MOST.model.map.common.Route',
	proxy : {
		type : 'rest',
		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/routes/data'
	}
});