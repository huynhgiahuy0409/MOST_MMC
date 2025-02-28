Ext.define('MOST.model.map.bulk.ClaimStatistics', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name: 'totalCount',
		type: 'string'
	}, {
		name: 'requestTotalCount',
		type: 'string'
	}, {
		name: 'requestCount',
		type: 'string'
	}, {
		name: 'requestConfirmCount',
		type: 'string'
	}, {
		name: 'requestLawCount',
		type: 'string'
	}, {
		name: 'requestCompeleteCount',
		type: 'string'
	}, {
		name: 'completeCount',
		type: 'string'
	}]
});
