Ext.define('MOST.model.common.CheckSession', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'type',
		type:'string'
	},
	{
		name:'status',
		type:'string'
	},
	{
		name:'partnerType',
		type:'string'
	},
	{
		name:'partnerCode',
		type:'string'
	}
	]
});