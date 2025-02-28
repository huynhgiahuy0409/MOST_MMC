Ext.define('MOST.model.administrator.SearchParameterSetting', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'pgmCode',
			type:'string'
		},
		{
			name:'usingSession',
			type:'string'
		}
	]
});