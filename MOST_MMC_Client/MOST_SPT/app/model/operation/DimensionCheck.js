Ext.define('MOST.model.operation.DimensionCheck', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name: 'vslCallId',
			type: 'string'
		},
		{
			name:'blNo',
			type:'string'
		},
		{
			name:'grNo',
			type:'string'
		},
		{
			name:'docLength',
			type:'string'
		},
		{
			name:'actLength',
			type:'string'
		},
		{
			name:'doctWidth',
			type:'string'
		},
		{
			name:'actWidth',
			type:'string'
		},
		{
			name:'docHeight',
			type:'string'
		},
		{
			name:'actHeight',
			type:'string'
		},
		{
			name:'checkTime',
			type:'string'
		},
		{
			name:'dimensionRemark',
			type:'string'
		},
		{
			name:'doGrCd',
			type:'string'
		},
		{
			name:'doGrNm',
			type:'string'
		},
		]
});