Ext.define('MOST.model.common.SearchCondition', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'pgmCode',
		type:'string'
	},
	{
		name:'id',
		type:'string'
	},
	{
		name:'view',
		type:'string'
	},
	{
		name:'searchConditionsString',
		type:'string'
	}
	]
});