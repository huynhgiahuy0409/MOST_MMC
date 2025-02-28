Ext.define('MOST.model.configuration.SearchBizConfigurationParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'code',
			type:'string'
		},
		{
			name:'description',
			type:'string'
		},
		{
			name:'searchType',
			type:'string'
		}
	]
});