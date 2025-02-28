Ext.define('MOST.model.map.common.VesselImage', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',
	fields: [{
		name:'vesselCode',
		type:'string'
	},{
		name:'atchFileName',
		type:'string'
	},{
		name:'maskedFileName',
		type:'string'
	},{
		name: 'mainImage',
		type: 'string'
	}]
});
