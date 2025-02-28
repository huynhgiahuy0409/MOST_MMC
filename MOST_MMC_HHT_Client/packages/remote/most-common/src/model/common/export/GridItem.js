Ext.define('MOST.model.common.export.GridItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'thousandSeparator',
			type:'string'
		},
		{
			name:'decimalPoint',
			type:'string'
		},
		{
			name:'headColumnCount',
			type:'int'
		},
		{
			name:'headers',
			mapping: 'headersMap'
		}
	],
	
    associations: [{
		type: 'hasMany',
		name: 'headersMap',
		model: 'MOST.model.common.export.GridCellItem'
	}]
});