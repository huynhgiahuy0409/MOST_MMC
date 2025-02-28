Ext.define('MOST.model.map.common.Route', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name:'arrivalDate',
		type:'string'
	},{
		name:'averageSpeed',
		type:'string'
	},{
		name:'charterPartySpeed',
		type:'string'
	},{
		name:'code',
		type:'string'
	},{
		name:'dailyIFO',
		type:'string'
	},{
		name:'dailyMDO',
		type:'string'
	},{
		name:'deparmenetCode',
		type:'string'
	},{
		name:'departmentName',
		type:'string'
	},{
		name:'departureDate',
		type:'string'
	},{
		name:'distanceSailed',
		type:'string'
	},{
		name:'fromPort',
		type:'string'
	},{
		name:'toPort',
		type:'string'
	},{
		name:'performanceSpeed',
		type:'string'
	},{
		name:'shipCode',
		type:'string'
	},{
		name:'shipName',
		type:'string'
	},{
		name:'totalDistance',
		type:'string'
	},{
		name:'positionGroup',
		type:'auto'
	
	}]
});
