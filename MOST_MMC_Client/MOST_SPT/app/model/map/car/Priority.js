Ext.define('MOST.model.map.car.Priority', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name:'priorityId',
		type:'string'
	},{
		name:'sequence',
		type:'number'
	},{
		name:'customerAlias',
		type:'string'
	},{
		name:'thredhold',
		type:'number'
	},{
		name:'customers',
		type:'string'
	}]
});
