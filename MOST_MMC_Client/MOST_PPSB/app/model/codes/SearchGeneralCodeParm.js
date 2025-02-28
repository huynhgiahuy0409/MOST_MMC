Ext.define('MOST.model.codes.SearchGeneralCodeParm', {
	extend: 'MOST.model.foundation.parm.BizParm',
	fields: [{
		name: 'lcd',
		type: 'string'
	}, {
		name: 'mcd',
		type: 'string'
	}, {
		name: 'mcdNm',
		type: 'string'
	}, {
		name: 'mcdDesc',
		type: 'string'
	}, {
		name: 'useYn',
		 type: 'string'
	},{
		name: 'version',
		type: 'string'
	},{
		name: 'updatedTime',
		type: 'string',
	}]
});