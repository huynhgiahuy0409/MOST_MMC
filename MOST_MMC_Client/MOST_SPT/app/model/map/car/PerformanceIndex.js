Ext.define('MOST.model.map.car.PerformanceIndex', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name:'departmentCode',
		type:'string'
	},{
		name:'departmentName',
		type:'string'
	},{
		name:'delayedCount',
		type:'number'
	},{
		name:'normalCount',
		type:'number'
	},{
		name:'totalCount',
		type:'number'
	}]
});
