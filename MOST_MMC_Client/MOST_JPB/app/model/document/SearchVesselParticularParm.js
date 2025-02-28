Ext.define('MOST.model.document.SearchVesselParticularParm', {
	extend: 'MOST.model.foundation.parm.BizParm',
	fields: [
 		{
			name : 'vslNm',
			type : 'string'
		}, {
			name : 'shipOffNo',
			type : 'string'
		}, {
			name : 'imoNo',
			type : 'string'
		}, {
			name : 'sdt',
			type: 'date',
			dateFormat: 'time'
		}, {
			name : 'callSign',
			type : 'string'
		}, {
			name : 'edt',
			type: 'date',
			dateFormat: 'time'
		}, {
			name : 'confCk',
			type : 'string'
		}, {
			name : 'ptnrCode',
			type : 'string'
		}, {
			name : 'peopleDiv',
			type : 'string'
		}, {
			name : 'vslCd',
			type : 'string'
		}, {
			name : 'jct',
			type : 'string'
		}, {
			name : 'status',
			type : 'string'
		}, {
			name : 'agencyCode',
			type : 'string'
		}, {
			name : 'saCorpId',
			type : 'string'
		}
		
	]
});