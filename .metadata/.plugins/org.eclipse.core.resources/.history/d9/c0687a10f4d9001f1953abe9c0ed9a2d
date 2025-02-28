Ext.define('MOST.model.planning.berth.BerthPlan', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	
	fields: [{
		name: 'jpvcNo',
		type: 'string'
	}, {
		name: 'shipCallNo',
		type: 'string'
	}, {
		name: 'referenceNo',
		type: 'string'
	}, {
		name: 'arrvSaId',
		type: 'string'
	}, {
		name: 'inVoy',
		type: 'string'
	}, {
		name: 'outVoy',
		type: 'string'
	}, {
		name: 'inLane',
		type: 'string'
	}, {
		name: 'outLane',
		type: 'string'
	}, {
		name: 'docStatus',
		type: 'string'
	}, {
		name: 'berthCd',
		type: 'string'
	}, {
		name: 'berthTp',
		type: 'string'
	}, {
		name: 'eta',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'etb',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'etw',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'etc',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'etu',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'etd',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'ata',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'atb',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'atw',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'atc',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'atu',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'atd',
		type: 'date',
		dateFormat: 'time'
	}, {
		name: 'berthAlongside',
		type: 'string'
	}, {
		name: 'pstSta',
		type: 'float'
	}, {
		name: 'startPos',
		type: 'float'
	}, {
		name: 'endPos1',
		type: 'float',
		calculate: function (data) {
			if(data.startPos > 0){
				return data.startPos + data.loa;
			}else{
				return data.pstSta + data.loa;
			}
		}
	}, {
		name: 'endPos',
		type: 'float'
	}, {
		name: 'remarks',
		type: 'string'
	}, {
		name: 'vesselName',
		type: 'string'
	}, {
		name: 'callSign',
		type: 'string'
	}, {
		name: 'loa',
		type: 'float'
	}, {
		name: 'width',
		type: 'float'
	}, {
		name: 'planYn',
		type: 'string'
	},{
		name: 'shfAtb',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'shfAtu',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'opeStat',
		type: 'string'
	},{
		name: 'startH',
		type: 'float'
	},{
		name: 'endH',
		type: 'float'
	},]
});