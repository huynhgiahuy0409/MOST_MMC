Ext.define('MOST.model.common.meta.MetaEntity', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'sysCd',
		type: 'string'
	}, {
		name: 'cfgTp',
		type: 'string'
	}, {
		name: 'cfgId',
		type: 'string'
	}, {
		name: 'cfgNm',
		type: 'string'
	}, {
		name: 'cfgDesc',
		type: 'string'
	},{
		name: 'updDt',
		type: 'date',
		dateFormat: 'time'
	}]
});