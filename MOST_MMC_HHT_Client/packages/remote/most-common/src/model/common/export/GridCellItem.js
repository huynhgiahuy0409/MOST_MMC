Ext.define('MOST.model.common.export.GridCellItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'text',
			type:'string'
		},
		{
			name:'halign',
			type:'string'
		},
		{
			name:'childrens',
			mapping: 'childrensMap'
		},
		{
			name:'dataField',
			type:'string'
		},
		{
			name:'mergeX',
			type:'int'
		},
		{
			name:'mergeY',
			type:'int'
		},
		{
			name:'mergeX1',
			type:'int'
		},
		{
			name:'mergeY1',
			type:'int'
		},
		{ //added by Brian (2021/01/19, decimalplace)
			name:'precision',
			type:'int'
		},
		
	],
	associations: [{
	type: 'hasMany',
	name: 'childrensMap',
	model: 'MOST.model.common.export.GridCellItem'
}]
});