Ext.define('MOST.model.monitoring.SummaryRevenueChargesReport', {
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
			name:'vslCallId',
			type:'string'
		},
		{
			name:'terminalCode',
			type:'string'
		},
		{
			name:'terminalName',
			type:'string'
		},
		{
			name:'trfTpCd',
			type:'string'
		},
		{
			name:'payerCd',
			type:'string'
		},
		{
			name:'payerNm',
			type:'string'
		},
	]
});