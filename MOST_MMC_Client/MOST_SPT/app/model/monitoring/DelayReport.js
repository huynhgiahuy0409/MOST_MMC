Ext.define('MOST.model.monitoring.DelayReport', {
	extend: 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'fromDate',
			type:'string'
		},
		{
			name:'toDate',
			type:'string'
		},
		{
			name:'dlyGrpCd',
			type:'string'
		},
		
		
	]
});