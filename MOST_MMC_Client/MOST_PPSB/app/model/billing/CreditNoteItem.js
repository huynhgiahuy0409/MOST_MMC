Ext.define('MOST.model.billing.CreditNoteItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name: 'invoiceNo',
			type: 'string',
		},
		{
			name: 'crnStatNm',
			type: 'string',
		},
		{
			name: 'erpStatCd',
			type: 'string',
		},
		{
			name: 'creditNoteNo',
			type: 'string',
		},
		{
			name: 'vslCallId',
			type: 'string',
		},
		{
			name: 'vslNm',
			type: 'string',
		},
		{
			name: 'payer',
			type: 'string',
		},
		{
			name: 'payerNm',
			type: 'string',
		},
		{
			name: 'payerTpCd',
			type: 'string',
		},
		{
			name: 'ivDt',
			type: 'string',
		},
		{
			name: 'aplyAmt',
			type: 'string',
		},
		{
			name: 'gstAmt',
			type: 'string',
		},
		{
			name: 'totalAmt',
			type: 'string',
		},
		{
			name: 'createdBy',
			type: 'string',
		},
		{
			name: 'createdDt',
			type: 'string',
		},
		{
			name: 'ivNo',
			type: 'string',
		},
		{
			name: 'crnStatCd',
			type: 'string',
		},
		{
			name: 'trfCd',
			type: 'string',
		},
		{
			name: 'subTrfCd',
			type: 'string',
		},
		{
			name: 'trfTpNm',
			type: 'string',
		},
		{
			name: 'trfDescr',
			type: 'string',
		},
		{
			name: 'aplyRate',
			type: 'string',
		},
	],
});
