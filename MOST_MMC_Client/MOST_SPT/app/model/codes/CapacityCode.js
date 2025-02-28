Ext.define('MOST.model.codes.CapacityCode', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'eqTpCd',
			type:'string'
		},
		{
			name:'eqTpNm',
			type:'string'
		},
		{
			name:'capaCd',
			type:'string'
		},
		{
			name:'capaDescr',
			type:'string'
		},
		{
			name: 'capaQty',
			type: 'string'
		},
		{
			name:'updTime',
			type:'date',
			dateFormat: 'time'
		}
		]
});
