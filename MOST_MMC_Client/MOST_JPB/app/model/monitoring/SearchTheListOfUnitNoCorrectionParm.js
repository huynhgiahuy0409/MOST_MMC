Ext.define('MOST.model.monitoring.SearchTheListOfUnitNoCorrectionParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'snNo',
			type:'string'
		},
		{
			name:'blNo',
			type:'string'
		},
		{
			name:'cgTpCd',
			type:'string'
		},
		{
			name:'unitNo',
			type:'string'
		},
		{
			name:'searchType',
			type:'string'
		},
		{
			name:'estArrvFromDt',
			type:'string'
		},
		{
			name:'estArrvToDt',
			type:'string'
		}
	]
	
});