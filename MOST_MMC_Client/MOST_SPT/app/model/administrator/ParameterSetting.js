Ext.define('MOST.model.administrator.ParameterSetting', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'category',
			type:'string'
		},
		{
			name:'code',
			type:'string'
		},
		{
			name:'settingChk',
			type:'string'
		},
		{
			name:'value',
			type:'string'
		},
		{
			name:'description',
			type:'string'
		}

	]
});