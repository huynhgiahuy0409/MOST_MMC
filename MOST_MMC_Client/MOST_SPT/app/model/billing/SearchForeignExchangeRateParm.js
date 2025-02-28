Ext.define('MOST.model.billing.SearchForeignExchangeRateParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
	{
		name:'currency',
		type:'string'
	},
	{
		name:'rate',
		type:'string'
	},
	{
		name:'applyDate',
		type:'string'
	},
	{
		name:'expireDate',
		type:'string'
	},
	{
		name:'applyNewDate',
		type:'string'
	},
	{
		name:'expireNewDate',
		type:'string'
	},
	{
		name:'indexDt',
		type:'string'
	},
	{
		name:'descr',
		type:'string'
	},
	{
		name:'divCd',
		type:'string'
	},
	{
		name:'strVersion',
		type:'string'
	},
	{
		name:'workingStatus',
		type:'string'
	},
	{
		name:'no',
		type:'string'
	},
	{
		name:'items',
		mapping: 'currencyMap'
	}
	],
	
    associations: [{
		type: 'hasMany',
		name: 'currencyMap',
		model: 'MOST.model.billing.Currency'
	}]
});