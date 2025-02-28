Ext.define('MOST.model.configuration.WarehouseDrawItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'items',
			mapping: 'whViewInfoMap'
		}
	],
	associations: [
		{
			type: 'hasMany',
			name: 'whViewInfoMap',
			model: 'MOST.model.foundation.dataitem.DataItem'
		}
	]
});
