Ext.define('MOST.model.map.car.StatisticsItem', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name:'customerAlias',
		type:'string'
	},{
		name:'customerCode',
		type:'string'
	},{
		name:'customerName',
		type:'string'
	},{
		name:'month',
		type:'string'
	},{
		name:'year',
		type:'string'
	},{
		name:'pol',
		type:'string'
	},{
		name:'polName',
		type:'string'
	},{
		name:'pod',
		type:'string'
	},{
		name:'amount',
		type:'number'
	},{
		name:'percent',
		type:'number'
	}]
});
