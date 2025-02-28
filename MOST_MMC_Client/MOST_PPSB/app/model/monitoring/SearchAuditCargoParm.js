Ext.define('MOST.model.monitoring.SearchAuditCargoParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'blNo',
			type:'string'
		},
		{
			name:'snNo',
			type:'string'
		},
		{
			name:'searchType',
			type:'string'
		},
		{
			name:'transFromDt',
			type:'string'
		},
		{
			name:'transToDt',
			type:'string'
		},
		{
			name:'updateType',
			type:'string'
		},
		{
			name:'pgmId',
			type:'string'
		},
	]
});