Ext.define('MOST.model.operation.SearchShiftingDoubleBankingParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'vslCd',
			type:'string'
		},
		{
			name:'searchType',
			type:'string'
		},
		{
			name:'cgOptTpCd',
			type:'string'
		},
		{
			name:'dblBnkShip1',
			type:'string'
		},
		{
			name:'vslShiftingYN',
			type:'string'
		},
		{
			name:'vslShiftingSeq',
			type:'string'
		},
		{
			name:'vslTp',
			type:'string'
		}

	]
});