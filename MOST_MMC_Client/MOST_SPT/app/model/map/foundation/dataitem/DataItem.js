Ext.define('MOST.model.map.foundation.dataitem.DataItem', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'string'
	},{
		name: 'collection',
		type: 'auto'
	},{
		name: 'version',
		type: 'string'
	},{
		name: 'userId',
		type: 'string'
	}],
	proxy: {
		type: 'rest',
		url: ''
	}
});