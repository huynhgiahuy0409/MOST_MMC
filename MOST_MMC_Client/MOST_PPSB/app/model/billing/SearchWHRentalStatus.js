Ext.define('MOST.model.billing.SearchWHRentalStatus', {
    extend : 'MOST.model.foundation.parm.BizParm',
    fields: [
		{
			name:'payer',
			type:'string'
		},
		{
			name:'conttNo',
			type:'string'
		},
		{
			name:'refNo',
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
			name:'whCd',
			type:'string'
		},
		{
			name:'statCd',
			type:'string'
		},
    ]
})