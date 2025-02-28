Ext.define('MOST.model.configuration.BizConfiguration',{
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields:[
		{
			name: 'code',
			type: 'string'
		},
		{
			name: 'value',
			type: 'string'
		},
		{
			name: 'description',
			type: 'string'
		},
		{
			name: 'category',
			type: 'string'
		},
		{
			name: 'useYn',
			type: 'string'
		},
		{
			name: 'staffCd',
			type: 'string'
		},
		{
			name: 'updTime',
			type: 'string'
		}
	]

});