Ext.define('MOST.model.common.export.FileExportServiceBizParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'classID',
			type:'string'
		},
		{
			name:'serviceID',
			type:'string'
		},
		{
			name:'searchConditions',
			mapping: 'stringValueMap'
		}
	],
	
    associations: [{
		type: 'hasMany',
		name: 'stringValueMap',
		model: 'MOST.model.common.export.StringValueItem'
	}]
});