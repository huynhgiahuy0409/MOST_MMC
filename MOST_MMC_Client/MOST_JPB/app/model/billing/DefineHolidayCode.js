Ext.define('MOST.model.billing.DefineHolidayCode', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'strHlDayYmd',
		type:'int'
	},
	{
		name:'strHlMonthYmd',
		type:'int'
	},
	{
		name:'strHlDayCd',
		type:'string'
	},
	{
		name:'strDescr',
		type:'string'
	},
	{
		name:'strVersion',
		type:'string'
	},
	{
		name:'no',
		type:'string'
	},
	{
		name:'strFormatHlDayYmd',
		type:'string'
	},
	{
		name:'updateTimeField',
		type: 'date',
		dateFormat: 'time'
	}
	]
});