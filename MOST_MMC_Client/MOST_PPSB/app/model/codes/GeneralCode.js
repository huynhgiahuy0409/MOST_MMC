Ext.define('MOST.model.codes.GeneralCode', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'lcd',
		type: 'string'
	}, {
		name: 'mcd',
		type: 'string'
	}, {
		name: 'mcdNm',
		type: 'string'
	}, {
		name: 'mcdDesc',
		type: 'string'
	}, {
		name: 'useYn',
		 type: 'string'
	},{
		name: 'version',
		type: 'string'
	},{
		name: 'updatedTime',
		type: 'string',
	}]
});