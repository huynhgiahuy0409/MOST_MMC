Ext.define('MOST.model.billing.SearchStandardTariffRate', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
	{
		name:'subTrfCd',
		type:'string'
	},
	{
		name:'trfRegNo',
		type:'string'
	},
	{
		name:'unitPrc',
		type:'string'
	},
	{
		name:'ptnrCd',
		type:'string'
	},
	{
		name:'aplyYmd',
		type:'string'
	},
	{
		name:'exprYmd',
		type:'string'
	},
	{
		name:'pkgTrfNo',
		type:'string'
	},
	{
		name:'prcTpCd',
		type:'string'
	},
	{
		name:'pkgNm',
		type:'string'
	},
	{
		name:'rmk',
		type:'string'
	},
	{
		name:'trfCd',
		type:'string'
	},
	{
		name:'descr',
		type:'string'
	},
	{
		name:'trfTpCd',
		type:'string'
	},
	{
		name:'billTpCd',
		type:'string'
	},
	{
		name:'costCntCd',
		type:'string'
	},
	{
		name:'ssrTpCd',
		type:'string'
	},
	{
		name:'pyrTpCd',
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
		name:'minVal1',
		type:'string'
	},
	{
		name:'minVal2',
		type:'string'
	},
	{
		name:'minVal3',
		type:'string'
	},
	{
		name:'no',
		type:'string'
	},
//	{
//		name:'sytmId',
//		type:'string'
//	},
	{
		name:'updateTimeField',
		type: 'date',
		dateFormat: 'time'
	},
	
	{
		name:'workingStatus',
		type:'string'
	},
	{
		name:'items',
		mapping: 'standardTariffRateMap'
	}
	],
	
    associations: [{
		type: 'hasMany',
		name: 'standardTariffRateMap',
		model: 'MOST.model.billing.StandardTariffRate'
	}]
});