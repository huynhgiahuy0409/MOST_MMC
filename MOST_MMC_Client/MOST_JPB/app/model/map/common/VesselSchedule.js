Ext.define('MOST.model.map.common.VesselSchedule', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name:'vesselCode',
		type:'string'
	},{
		name:'vesselName',
		type:'string'
	},{
		name:'route',
		type:'string'
	},{
		name:'status',
		type:'string'
	},{
		name:'voyageNo',
		type:'string'
	},{
		name:'latitude',
		type:'string'
	},{
		name:'longitude',
		type:'string'
	},{
		name:'heading',
		type:'string'
	},{
		name:'speed',
		type:'string'
	},{
		name: 'portCode',
		type: 'string'
	},{
		name: 'portName',
		type: 'string'
	},{
		name: 'sequence',
		type: 'number'
	},{
		name: 'dischargeQuantity',
		type: 'number'
	},{
		name: 'loadQuantity',
		type: 'number'
	},{
		name:'eta',
		type: 'date',
		dateFormat: 'time'
	},{
		name:'etb',
		type: 'date',
		dateFormat: 'time'
	},{
		name:'etu',
		type: 'date',
		dateFormat: 'time'
	},{
		name:'etd',
		type: 'date',
		dateFormat: 'time'
	},{
		name:'ata',
		type: 'date',
		dateFormat: 'time'
	},{
		name:'atb',
		type: 'date',
		dateFormat: 'time'
	},{
		name:'atu',
		type: 'date',
		dateFormat: 'time'
	},{
		name:'atd',
		type: 'date',
		dateFormat: 'time'
	}]
});
