Ext.define('MOST.model.map.common.VesselCargo', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name:'customerName',
		type:'string'
	},{
		name:'portName',
		type:'string'
	},{
		name:'cargoName',
		type:'string'
	},{
		name: 'dischargeQuantity',
		type: 'number'
	},{
		name: 'loadQuantity',
		type: 'number'
	},{
		name: 'currentQuantity',
		type: 'number'
	},{
		name: 'transportUnit',
		type: 'string'
	}]
});
