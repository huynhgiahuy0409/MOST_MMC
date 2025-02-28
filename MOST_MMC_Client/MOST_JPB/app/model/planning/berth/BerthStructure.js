Ext.define('MOST.model.planning.berth.BerthStructure', {
	extend: 'MOST.model.foundation.dataitem.DataItem',

	fields: [{
		name: 'terminalCd',
		type: 'string'
	}, {
		name: 'berthTp',
		type: 'string'
	}, {
		name: 'berthNm',
		type: 'string'
	}, {
		name: 'berthCd',
		type: 'string'
	}, {
		name: 'startPos',
		type: 'string'
	}, {
		name: 'endPos',
		type: 'string'
	}, {
		name: 'length',
		type: 'string'
	}, {
		name: 'drawable',
		type: 'int'
	}]
});