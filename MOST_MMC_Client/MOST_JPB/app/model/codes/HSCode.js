Ext.define('MOST.model.codes.HSCode', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: 
	[
		{
			name: 'hsCdDiv',
			type: 'string'
		}, 
		{
			name: 'hsCode',
			type: 'string'
		}, 
		{
			name: 'hsNm',
			type: 'string'
		}, 
		{
			name: 'unit',
			type: 'string'
		}, 
		{
			name: 'chpt',
			type: 'string'
		},
		{
			name: 'tmnlCd',
			type: 'string'
		}
	]
});