Ext.define('MOST.model.common.export.StringValueItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'key',
			type:'string'
		},
		{
			name:'value',
			mapping: 'string'
		}
	]
});