Ext.define('MOST.model.operation.ApronCheckerHHT', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name: 'workingStatus',
		type: 'string'
	},
	{
		name:'startDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'endDt',
		type: 'date',
		dateFormat: 'time'
	},
	]
});