Ext.define('MOST.model.monitoring.SearchWarehouseBalanceParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'userRefNo',
			type:'string'
		},
		{
			name:'searchType',
			type:'string'
		},
		{
			name:'bondedWhYn',
			type:'string'
		},
		{
			name:'whId',
			type:'string'
		},
		{
			name:'cmdtCd',
			type:'string'
		}
	]
	
});