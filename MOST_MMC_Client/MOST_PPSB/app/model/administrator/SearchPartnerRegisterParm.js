Ext.define('MOST.model.administrator.SearchPartnerRegisterParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
  		{
			name : 'companyCode',
			type : 'string'
		}, 
		{
			name : 'ptnrType',
			type : 'string'
		}, 
		{
			name : 'engSnm',
			type : 'string'
		}, 
		{
			name : 'regTimeFrom',
			type : 'string'
		}, 
		{
			name : 'searchType',
			type : 'string'
		}
	],
	
	associations: []
});
