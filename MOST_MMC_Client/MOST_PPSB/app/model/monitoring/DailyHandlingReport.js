Ext.define('MOST.model.monitoring.DailyHandlingReport', {
	extend: 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'blNo',
			type:'string'
		},
		{
			name:'atw',
			type:'string'
		},
		{
			name:'fromDate',
			type:'string'
		},
		{
			name:'toDate',
			type:'string'
		},
		{
			name:'opeClassCd',
			type:'string'
		},
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'statCd',
			type:'string'
		},
	]
});