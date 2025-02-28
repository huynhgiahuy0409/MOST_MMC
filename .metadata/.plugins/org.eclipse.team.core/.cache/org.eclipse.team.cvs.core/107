Ext.define('MOST.model.billing.InvoiceTemplate', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'templateCd',
		type:'string'
	},
	{
		name:'templateNm',
		type:'string'
	},
	{
		name:'payer',
		type:'string'
	},
	{
		name:'deliveryTpCd',
		type:'string'
	},
	{
		name:'cargoTpCd',
		type:'string'
	},
	{
		name:'category',
		type:'string'
	},
	{
		name:'descr',
		type:'string'
	},
	{
		name:'updUserId',
		type:'string'
	},
	{
		name:'updTime',
		type:'string'
	},
	{
		name:'version',
		type:'string'
	},
	{
		name:'trfCd',
		type:'string'
	},
	{
		name:'subTrfCd',
		type:'string'
	},
	{
		name:'items',
		mapping: 'invoicetemplateMap'
	},	
	{
		name:'workingStatus',
		type:'string'
	},
	{
		name:'trfTpCd',
		type:'string'
	},
	{
		name:'subTrfCd',
		type:'string'
	},
	{
		name:'trfTpCdNm',
		type:'string'
	},
	{
		name:'ivUnit1',
		type:'string'
	},
	{
		name:'ivUnit2',
		type:'string'
	},
	{
		name:'ivUnit3',
		type:'string'
	},
	{
		name:'selectedFlag',
		type:'string'
	},
	{
		name:'tariffTypeItems',
		mapping: 'tariffTypeMap'
	}
	],

	associations: [{
		type: 'hasMany',
		name: 'invoicetemplateMap',
		model: 'MOST.model.billing.InvoiceTemplate'
	},
	{
		type: 'hasMany',
		name: 'tariffTypeMap',
		model: 'MOST.model.billing.TariffCode'
	}]
});