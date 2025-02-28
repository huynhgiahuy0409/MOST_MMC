Ext.define('MOST.model.common.ContainerFilter', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
{
		name:'filterCd',
		type:'string'
	},
	{
		name:'layoutName',
		type:'string'
	},
	{
		name:'pgmCode',
		type:'string'
	},
	{
		name:'fieldName',
		type:'string'
	},
	{
		name:'seq',
		type:'integer'
	},
	{
		name:'fieldItem',
		type:'string'
	},
	{
		name:'groupID',
		type:'string'
	}
	],

	associations: [
		{
			type: 'hasMany',
			name: 'filterMap',
			model: 'MOST.model.common.ContainerFilter'
		}
	]
	
});