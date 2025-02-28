Ext.define('MOST.model.configuration.SulphurConfiguration', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'locId',
			type:'string'
		},
		{
			name:'locNm',
			type:'string'
		},
		{
			name:'fbCapa',
			type:'float'
		},
		{
			name:'useScts',
			type:'string'
		},
	]
});
