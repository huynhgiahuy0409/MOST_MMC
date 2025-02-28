Ext.define('MOST.model.map.bulk.BondStatistics', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name: 'ltptReasonCode',
		type: 'string'
	}, {
		name: 'ltptReasonName',
		type: 'string'
	}, {
		name: 'balanceWon',
		type: 'string'
	}, {
		name: 'totalCount',
		type: 'string'
	}, {
		name: 'sortSequence',
		type: 'string'
	}]
});
