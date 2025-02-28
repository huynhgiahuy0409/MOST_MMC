Ext.define('MOST.model.map.port.Port', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',
	fields: [{
		name: 'portType',
		type: 'string'
	},{
		name: 'portCode',
		type: 'string'
	},{
		name: 'longitude',
		type: 'string'
	},{
		name: 'latitude',
		type: 'string'
	},{
		name: 'routeCode',
		type: 'string'
	},{
		name: 'portSeq',
		type: 'string'
	},{
		name: 'portName',
		type: 'string'
	},{
		name: 'timeZone',
		type: 'string'
	},{
		name: 'areaCode',
		type: 'string'
	},{
		name: 'portVesselCode',
		type: 'string'
	},{
		name: 'portVesselName',
		type: 'string'
	},{
		name: 'portVesselVoy',
		type: 'string'
	},{
		name: 'portVesselQty',
		type: 'string'
	},{
		name: 'portCargoCode',
		type: 'string'
	},{
		name: 'portCargoName',
		type: 'string'
	},{
		name: 'pidCode',
		type: 'string'
	},{
		name: 'codeName',
		type: 'string'
	},{
		name: 'etaDtm',
		type: 'string'
	},{
		name: 'etbDtm',
		type: 'string'
	},{
		name: 'etdDtm',
		type: 'string'
	},{
		name: 'etdDtm',
		type: 'string'
	},{
		name: 'bunkerport',
		type: 'string'
	},{
		name: 'tag',
		type: 'string'
	},{
		name: 'portDate',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'status',
		type: 'string'
	},{
		name: 'winDayQty',
		type: 'string'
	}]
});
