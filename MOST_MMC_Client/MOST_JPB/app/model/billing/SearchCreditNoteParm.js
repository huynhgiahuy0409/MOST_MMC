Ext.define('MOST.model.billing.SearchCreditNoteParm', {
	extend: 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name: 'vslCallId',
			type: 'string',
		},
		{
			name: 'invoiceType',
			type: 'string',
		},
		{
			name: 'fromDate',
			type: 'string',
		},
		{
			name: 'toDate',
			type: 'string',
		},
		{
			name: 'ivNo',
			type: 'string',
		},
	],
});
