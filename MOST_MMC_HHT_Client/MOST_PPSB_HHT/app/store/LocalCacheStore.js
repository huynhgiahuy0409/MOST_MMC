Ext.define('MOST.store.LocalCacheStore',{
	extend: 'Ext.data.Store',
	alias: 'store.localcache',
	model: 'MOST.model.common.LocalCacheInfo',
	proxy: {
		type: 'ajax',
		url: 'resources/data/LocalCacheInfo.json',
		reader: {
		   type: 'json',
		   rootProperty: 'data'
		}
	} 
});