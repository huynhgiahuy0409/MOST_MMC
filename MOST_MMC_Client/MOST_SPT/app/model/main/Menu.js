Ext.define('MOST.model.main.Menu', {
	extend: 'Ext.data.TreeModel',

	fields: [{
		name: 'menu',
		type: 'string'
	}, {
		name: 'favorite',
		type: 'boolean'
	}, {
		name: 'screenId',
		type: 'string'
	}, {
		name: 'screenAlias',
		type: 'string'
	}]
});