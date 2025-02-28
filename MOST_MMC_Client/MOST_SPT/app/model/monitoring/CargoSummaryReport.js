Ext.define('MOST.model.monitoring.CargoSummaryReport', {
	extend: 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'ata',
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
			name:'vslCallId',
			type:'string'
		},
	]
});