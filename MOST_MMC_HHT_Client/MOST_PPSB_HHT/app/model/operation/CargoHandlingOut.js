Ext.define('MOST.model.operation.CargoHandlingOut', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'cgNo',
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
		name:'scn',
		type:'string'
	},
	{
		name:'vslNm',
		type:'string'
	},
	{
		name:'actQty',
		type:'int'
	},
	{
		name:'actMt',
		type:'float'
	},
	{
		name:'actM3',
		type:'float'
	},
	{
		name:'qty',
		type:'int'
	},
	{
		name:'mt',
		type:'float'
	},
	{
		name:'m3',
		type:'float'
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
		name:'loadQty',
		type:'int'
	},
	{
		name:'loadMt',
		type:'float'
	},
	{
		name:'loadM3',
		type:'float'
	},
	{
		name:'blNo',
		type:'string'
	},
	{
		name:'grNo',
		type:'string'
	},
	{
		name:'doNo',
		type:'string'
	},
	{
		name:'gateInDt',
		type:'string'
	},
	{
		name:'stat',
		type:'string'
	},
	{
		name:'startDt',
		type:'string'
	},
	{
		name:'endDt',
		type:'string'
	},
	{
		name:'delvTpCd',
		type:'string'
	},
	{
		name:'hatchNo',
		type:'string'
	},
	{
		name:'shftId',
		type:'string'
	},
	{
		name:'shftDt',
		type:'string'
	},
	{
		name:'shftNm',
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
		name:'tsptTpCd',
		type:'string'
	},
	{
		name:'locId',
		type:'string'
	},
	{
		name:'sprLocId',
		type:'string'
	},
	{
		name:'lorryId',
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
		name:'hoDt',
		type:'string'
	},
	{
		name:'whFnlDelvYn',
		type:'string'
	},
	{
		name:'actlDelvTpCd',
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
		name:'cgTpCd',
		type:'string'
	},
	{
		name:'hdlOutStDt',
		type:'string'
	},
	{
		name:'hdlOutEndDt',
		type:'string'
	},
	{
		name:'hdlOutDt',
		type:'string'
	},
	{
		name:'hdlOutDate',
		type:'date',
		calculate: function (data) {
			if(data.hdlOutDt){
				return Ext.Date.parse(data.hdlOutDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},
	{
		name:'hdlInDt',
		type:'string'
	},
	{
		name:'hdlInDate',
		type:'date',
		calculate: function (data) {
			if(data.hdlInDt){
				return Ext.Date.parse(data.hdlInDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
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
		name:'tmnlInDt',
		type:'string'
	},
	{
		name:'tmnlOutDt',
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
		name:'jobTpCd',
		type:'string'
	},
	{
		name:'balStatCd',
		type:'string'
	},
	{
		name:'cntrQty',
		type:'int'
	},
	{
		name:'eqNo',
		type:'string'
	},
	{
		name:'fmLocId',
		type:'string'
	},
	{
		name:'toLocId',
		type:'string'
	},
	{
		name:'toHatchNo',
		type:'string'
	},
	{
		name:'hatchDrt',
		type:'string'
	},
	{
		name:'gangNo',
		type:'string'
	},
	{
		name:'locArea',
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
		name:'jobNo',
		type:'string'
	},
	{
		name:'jobGroup',
		type:'string'
	},
	{
		name:'cgInOutCd',
		type:'string'
	},
	{
		name:'gatePassNo',
		type:'string'
	},
	{
		name:'gatePassIssueDt',
		type:'string'
	},
	{
		name:'fnlYn',
		type:'string'
	},
	{
		name:'rmk',
		type:'string'
	},
	{
		name:'disEndDt',
		type:'string'
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
		name:'rhdlMode',
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
		name:'whTpCd',
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
		name:'disStDt',
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
		name:'custMode',
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
		name:'rhdlNo',
		type:'string'
	},
	{
		name:'rhdlGroupNo',
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
		name:'spYn',
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
		name:'locCount',
		type:'int'
	},
	{
		name:'autoLocFlag',
		type:'string'
	},
	{
		name:'autoNorLocFlag',
		type:'string'
	},
	{
		name:'packingSeq',
		type:'string'
	},
	{
		name:'packingQty',
		type:'int'
	},
	{
		name:'packingMT',
		type:'float'
	},
	{
		name:'packingM3',
		type:'float'
	},
	{
		name:'eachVol',
		type:'string'
	},
	{
		name:'eachWgt',
		type:'string'
	},
	{
		name:'domesticChk',
		type:'string'
	},
	{
		name: 'isMultiCargo',
		type: 'string'
	},
	{
		name:'rePkgTpCd',
		type:'string'
	},
	{
		name:'whConfigurationItems',
		mapping: 'whConfigurationMap'
	}
	],
	
    associations: [{
		type: 'hasMany',
		name: 'whConfigurationMap',
		model: 'MOST.model.configuration.WhConfiguration'
	}]
});