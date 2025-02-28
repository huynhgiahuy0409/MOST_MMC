Ext.define('MOST.model.popup.VesselSchedulePopup',{
	extend: 'MOST.model.foundation.dataitem.DataItem',
	
	fields:[{
		name: 'vslCallId',
		type: 'string'
	},{
		name: 'vslCD',
		type: 'string'
	},{
		name: 'vslTP',
		type: 'string'
	},{
		name: 'vslNM',
		type: 'string'
	},{
		name: 'summitStat',
		type: 'string'
	},{
		name: 'callYear',
		type: 'string'
	},{
		name: 'callSeq',
		type: 'string'
	},{
		name: 'inbVoy',
		type: 'string'
	},{
		name: 'outbVoy',
		type: 'string'
	},{
		name: 'cgOpTp',
		type: 'string'
	},{
		name: 'ispsLevel',
		type: 'string'
	},{
		name: 'deptTp',
		type: 'string'
	},{
		name: 'atb',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'etb',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'eta',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'etd',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'ata',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'atd',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'atu',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'berthTp',
		type: 'string'
	},{
		name: 'odrETA',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'cusref',
		type: 'string'
	},{
		name: 'lastPort',
		type: 'string'
	},{
		name: 'arrvHeight',
		type: 'string'
	},{
		name: 'deptHeight',
		type: 'string'
	},{
		name: 'cargoType',
		type: 'string'
	},{
		name: 'flatJpvc',
		type: 'string'
	},{
		name: 'loa',
		type: 'string'
	},{
		name: 'nrt',
		type: 'string'
	},{
		name: 'grt',
		type: 'string'
	},{
		name: 'dwt',
		type: 'string'
	},{
		name: 'flag',
		type: 'string'
	},{
		name: 'trade',
		type: 'string'
	},{
		name: 'loadCargoQty',
		type: 'string'
	},{
		name: 'dischCargoQty',
		type: 'string'
	},{
		name: 'purpOfCallNm',
		type: 'string'
	}, {
		name: 'flagCd',
		type: 'string'
	}, {
		name: 'lastPortCd',
		type: 'string'
	}, {
		name: 'nextPortCd',
		type: 'string'
	}]

});