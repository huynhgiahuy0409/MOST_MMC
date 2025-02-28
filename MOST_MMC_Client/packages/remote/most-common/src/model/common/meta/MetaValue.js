Ext.define('MOST.model.common.meta.MetaValue', {
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
		name: 'keyNm',
		type: 'string'
	}, {
		name: 'keyVal',
		type: 'string'
	}, {
		name: 'keyDesc',
		type: 'string'
	}]
});