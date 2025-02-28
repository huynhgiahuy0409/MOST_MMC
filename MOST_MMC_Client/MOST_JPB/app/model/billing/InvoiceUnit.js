Ext.define('MOST.model.billing.InvoiceUnit', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
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