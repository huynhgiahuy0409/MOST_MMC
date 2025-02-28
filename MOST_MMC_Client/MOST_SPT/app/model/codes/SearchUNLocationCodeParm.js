Ext.define('MOST.model.codes.SearchUNLocationCodeParm',{
	extend: 'MOST.model.foundation.parm.BizParm',
	fields:[{
		name:'cntryCd',
		type:'string'
	},{
		name:'portCd',
		type:'string'
	},{
		name:'portNm',
		type: 'string'
	},{
		name:'insDtm',
		type:'string'
	},{
		name: 'updDtm',
		type: 'string'
	},{
		name: 'insUserId',
		type: 'string'
	},{
		name: 'updUserId',
		type: 'string'
	},{
		name: 'portVal',
		type: 'string'
	},{
		name: 'mapassPortCd',
		type: 'string'
	}]
});