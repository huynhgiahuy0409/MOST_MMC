Ext.define('MOST.model.billing.SearchInvoiceUnitParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
	{
		name:'unitCd',
		type:'string'
	},
	{
		name:'unitTpCd',
		type:'string'
	},
	{
		name:'unitTpNm',
		type:'string'
	},
	{
		name:'descr',
		type:'string'
	},
	{
		name:'no',
		type:'string'
	},
	{
		name:'updateTimeField',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'userId',
		type:'string'
	},
	]
});