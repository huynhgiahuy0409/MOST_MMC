Ext.define('MOST.model.common.SearchColumnDisplay', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'code',
		type:'string'
	},
	{
		name:'menu',
		type:'string'
	},
	{
		name:'seq',
		type:'int'
	},
	{
		name:'no',
		type:'string'
	},
	{
		name:'gridReference', // added by Brian (2022/11/29 for Multi grid)
		type:'string'
	},
	{
		name:'defaultCheck',
		type:'string'
	}
	]
});