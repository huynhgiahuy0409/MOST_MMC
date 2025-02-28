Ext.define('MOST.model.billing.InvoicePayer', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'ptnrCd',
			type:'string'
		},
		{
			name:'engSnm',
			type:'string'
		},
		{
			name:'ptnrTpCd',
			type:'string'
		},
		{
			name:'accNo',
			type:'string'
		},
		{
			name:'ivNo',
			type:'string'
		},
		{
			name:'ivPrfx',
			type:'string'
		},
		{
			name:'payer',
			type:'string'
		}
	]
});






