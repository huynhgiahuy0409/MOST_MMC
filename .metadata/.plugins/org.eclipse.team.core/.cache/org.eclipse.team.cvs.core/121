Ext.define('MOST.model.billing.SearchPartnerTariffRateParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'trfRegNo',
			type:'string'
		},
		{	name:'conSig',
			type: 'string'
		},
		{
			name:'unitPrc',
			type:'string'
		},
		{
			name:'ptnrPrc',
			type:'string'
		},
		{
			name:'ptnrCd',
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
			name:'subTrfCd',
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
			name: 'userId',
			type: 'string'
		},
		{
			name: 'pkgPrc',
			type: 'string'
		},
		{
			name: 'ptnrNm',
			type: 'string'
		},
		{ name: 'updTime',
			type: 'string'
		},
		{
			name: 'cargoString',
			type: 'string'
		},{
			name: 'deliveryString',
			type: 'string'
		},
		{
			name: 'commodityString',
			type: 'string'
		},
		{
			name: 'cond',
			mapping: 'partnerConditionMap'
		},
		{
			name: 'vessels',
			type: 'string'
		},
		{
			name: 'pkgRate',
			mapping: 'partnerTariffMap'
		},
		{
			name:'ckLOA',
			type:'int'
		},
		{
			name:'chkCargo',
			type:'boolean'
		},
		{
			name:'tierVal1Cargo',
			type:'string'
		},
		{
			name:'tierVal2Cargo',
			type:'string'
		},
		{
			name:'tierVal1Vsl',
			type:'string'
		},
		{
			name:'tierVal2Vsl',
			type:'string'
		},
		{
			name:'ckDWT',
			type:'int'
		},{
			name:'workingStatus',
			type: 'string'
		}, {
			name: 'berthCd',
			type: 'string'
		},
		{
			name: 'berthNm',
			type: 'string'
		},
		{
			name: 'expireDtChk',
			type: 'string'
		}
	],
	associations: [{
		type: 'hasMany',
		name: 'partnerConditionMap',
		model: 'MOST.model.billing.PartnerTariffRateCondition'
	}, {
		type: 'hasMany',
		name: 'partnerTariffMap',
		model: 'MOST.model.billing.PartnerTariffRate'
	}]
});