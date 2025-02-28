Ext.define('MOST.model.planning.SearchDeploymentListParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'deplDateFrom',
			type:'string'
		},
		{
			name:'deplDateTo',
			type:'string'
		},
		{
			name:'searchType',
			type:'string'
		},
		{
			name:'shiftId',
			type:'string'
		},
		{
			name:'staffNo',
			type:'string'
		},
		{
			name:'staffNm',
			type:'string'
		}
		]
});
