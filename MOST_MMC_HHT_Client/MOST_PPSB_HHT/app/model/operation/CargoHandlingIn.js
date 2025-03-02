Ext.define('MOST.model.operation.CargoHandlingIn', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'cgNo',
		type:'string'
	},
	{
		name:'grNo',
		type:'string'
	},
	{
		name:'stat',
		type:'string'
	},
	{
		name:'shipgNoteNo',
		type:'string'
	},
	{
		name:'vslCallId',
		type:'string'
	},
	{
		name:'hdlInEndDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'hdlInStDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'hdlInEndDtStr',
		type: 'string',
	},
	{
		name:'hdlInStDtStr',
		type: 'string',
	},
	{
		name:'hdlInDt',
		type:'string'
	},
	{
		name:'vslNm',
		type:'string'
	},
	{
		name:'snQty',
		type:'int'
	},
	{
		name:'snMt',
		type:'float'
	},
	{
		name:'snM3',
		type:'float'
	},
	{
		name:'grQty',
		type:'int'
	},
	{
		name:'grMt',
		type:'float'
	},
	{
		name:'grM3',
		type:'float'
	},
	{
		name:'balQty',
		type:'int'
	},
	{
		name:'balMt',
		type:'float'
	},
	{
		name:'balM3',
		type:'float'
	},
	{
		name:'pkgQty',
		type:'int'
	},
	{
		name:'wgt',
		type:'float'
	},
	{
		name:'msrmt',
		type:'float'
	},
	{
		name:'delvTpCd',
		type:'string'
	},
	{
		name:'opDelvTpCd',
		type:'string'
	},
	{
		name:'shftId',
		type:'string'
	},
	{
		name:'shftNm',
		type:'string'
	},
	{
		name:'shftDt',
		type:'string'
	},
	{
		name:'tsptr',
		type:'string'
	},
	{
		name:'tsptrNm',
		type:'string'
	},
	{
		name:'lorryId',
		type:'string'
	},
	{
		name:'locId',
		type:'string'
	},
	{
		name:'locNm',
		type:'string'
	},
	{
		name:'shuLocId',
		type:'string'
	},
	{
		name:'dmgLocId',
		type:'string'
	},
	{
		name:'spLocId',
		type:'string'
	},
	{
		name:'locArea',
		type:'string'
	},
	{
		name:'pkgTpCd',
		type:'string'
	},
	{
		name:'wgtUnit',
		type:'string'
	},
	{
		name:'msrmtUnit',
		type:'string'
	},
	{
		name:'cgTpCd',
		type:'string'
	},
	{
		name:'catgCd',
		type:'string'
	},
	{
		name:'catgNm',
		type:'string'
	},
	{
		name:'portOfLoad',
		type:'string'
	},
	{
		name:'portOfDis',
		type:'string'
	},
	{
		name:'fdest',
		type:'string'
	},
	{
		name:'cmdtCd',
		type:'string'
	},
	{
		name:'cmdtGrpCd',
		type:'string'
	},
	{
		name:'tsptTpCd',
		type:'string'
	},
	{
		name:'fwrAgnt',
		type:'string'
	},
	{
		name:'shpgAgent',
		type:'string'
	},
	{
		name:'cntryOfOrg',
		type:'string'
	},
	{
		name:'cgInOutCd',
		type:'string'
	},
	{
		name:'gateInDt',
		type:'string'
	},
	{
		name:'rmk',
		type:'string'
	},
	{
		name:'lorryFlag',
		type:'boolean'
	},
	{
		name:'seq',
		type:'string'
	},
	{
		name:'jobPurpCd',
		type:'string'
	},
	{
		name:'fnlDelvYn',
		type:'string'
	},
	{
		name:'fnlOpeYn',
		type:'string'
	},
	{
		name:'jobTpCd',
		type:'string'
	},
	{
		name:'jobNo',
		type:'string'
	},
	{
		name:'jobGroup',
		type:'string'
	},
	{
		name:'spYn',
		type:'string'
	},
	{
		name:'blSn',
		type:'string'
	},
	{
		name:'shpCng',
		type:'string'
	},
	{
		name:'currLocId',
		type:'string'
	},
	{
		name:'shpr',
		type:'string'
	},
	{
		name:'shprNm',
		type:'string'
	},
	{
		name:'cnsne',
		type:'string'
	},
	{
		name:'cnsneNm',
		type:'string'
	},
	{
		name:'shutRhdlMode',
		type:'string'
	},
	{
		name:'dmgRhdlMode',
		type:'string'
	},
	{
		name:'rhdlYn',
		type:'string'
	},
	{
		name:'shuQty',
		type:'int'
	},
	{
		name:'shuMt',
		type:'float'
	},
	{
		name:'shuM3',
		type:'float'
	},
	{
		name:'dmgQty',
		type:'int'
	},
	{
		name:'dmgMt',
		type:'float'
	},
	{
		name:'dmgM3',
		type:'float'
	},
	{
		name:'loadCnclMode',
		type:'string'
	},
	{
		name:'gatePassYn',
		type:'boolean'
	},
	{
		name:'gatePassIssueDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'shuYn',
		type:'string'
	},
	{
		name:'dmgYn',
		type:'string'
	},
	{
		name:'cgCoCd',
		type:'string'
	},
	{
		name:'balStatCd',
		type:'string'
	},
	{
		name:'locQty',
		type:'int'
	},
	{
		name:'locWgt',
		type:'float'
	},
	{
		name:'locMsrmt',
		type:'float'
	},
	{
		name:'whTpCd',
		type:'string'
	},
	{
		name:'nxVslCallId',
		type:'string'
	},
	{
		name:'nxRefNo',
		type:'string'
	},
	{
		name:'stsYn',
		type:'string'
	},
	{
		name:'rhdlMode',
		type:'string'
	},
	{
		name:'crud',
		type:'string'
	},
	{
		name:'userId',
		type:'string'
	},
	{
		name:'accuSumQty',
		type:'int'
	},
	{
		name:'accuSumWgt',
		type:'float'
	},
	{
		name:'accuSumMsrmt',
		type:'float'
	},
	{
		name:'cargo',
		type:'string'
	},
	{
		name:'docQty',
		type:'int'
	},
	{
		name:'docMt',
		type:'float'
	},
	{
		name:'docM3',
		type:'float'
	},
	{
		name:'dgYn',
		type:'string'
	},
	{
		name:'dgStatus',
		type:'string'
	},
	{
		name:'loadStDt',
		type:'string'
	},
	{
		name:'jobPurpNm',
		type:'string'
	},
	{
		name:'grGp',
		type:'string'
	},
	{
		name:'grDo',
		type:'string'
	},
	{
		name:'jobCoCd',
		type:'string'
	},
	{
		name:'spCaCoCd',
		type:'string'
	},
	{
		name:'repkgTypeCd',
		type:'string'
	},
	{
		name:'pkgNo',
		type:'string'
	},
	{
		name:'scaleAmt',
		type:'string'
	},
	{
		name:'rcYn',
		type:'string'
	},
	{
		name:'gatePassNo',
		type:'string'
	},
	{
		name:'whStartDt',
		type:'string'
	},
	{
		name:'inWhDtNo',
		type:'string'
	},
	{
		name:'whConfigurationItems',
		mapping: 'whConfigurationMap'
	},
	{
		name:'whBalWgt',
		type: 'float',
	},
	{
		name:'whBalMsrmt',
		type: 'float',
	},
	{
		name:'whBalQty',
		type: 'int',
	},
	{
		name:'rePkgTpCd',
		type:'string'
	}
	],
	
	associations: [{
		type: 'hasMany',
		name: 'whConfigurationMap',
		model: 'MOST.model.configuration.WhConfiguration'
	}]
});