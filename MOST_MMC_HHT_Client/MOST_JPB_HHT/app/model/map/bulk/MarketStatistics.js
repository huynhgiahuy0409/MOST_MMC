Ext.define('MOST.model.map.bulk.MarketStatistics', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name: 'marketIndexDisplay',
		type: 'string'
	}, {
		name: 'marketIndexValue',
		type: 'string'
	}, {
		name: 'levelIndex',
		type: 'string'
	}, {
		name: 'todate',
		type: 'string'
	}, {
		name: 'frequency',
		type: 'string'
	}, {
		name: 'indexValue',
		type: 'number'
	}]
});
