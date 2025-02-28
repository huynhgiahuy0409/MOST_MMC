Ext.define('MOST.model.administrator.SearchCompanyRegisterParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
  		{
			name : 'companyCode',
			type : 'string'
		}, {
			name : 'oldPtnrCode',
			type : 'string'
		}, {
			name : 'ptnrType',
			type : 'string'
		}, {
			name : 'ptnrCode',
			type : 'string'
		}, {
			name : 'engSnm',
			type : 'string'
		}, {
			name : 'checkMember',
			type : 'string'
		}, {
			name : 'regTimeFrom',
			type : 'string'
		}, {
			name : 'searchType',
			type : 'string'
		}
	],
	
	associations: []
});
