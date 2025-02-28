Ext.define('MOST.model.billing.InvoiceAdviceDetailHead', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'adviceNo',
		type:'string'
	},
	{
		name:'payerCd',
		type:'string'
	},
	{
		name:'totalTariffs',
		type:'int'
	},
	{
		name:'confirmAcceptPayment',
		type:'string'
	},
	{
		name:'loadingTotalWgt',
		type:'string'
	},
	{
		name:'loadingTotalMsrmt',
		type:'string'
	},
	{
		name:'loadingTotalQty',
		type:'string'
	},
	{
		name:'dischargingTotalWgt',
		type:'string'
	},
	{
		name:'dischargingTotalMsrmt',
		type:'string'
	},
	{
		name:'dischargingTotalQty',
		type:'string'
	},
	{
		name:'updateTimeField',
		type: 'date',
		dateFormat: 'time'
	},
	]
});