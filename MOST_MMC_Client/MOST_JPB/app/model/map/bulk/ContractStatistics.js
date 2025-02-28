Ext.define('MOST.model.map.bulk.ContractStatistics', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name: 'levelValue',
		type: 'string'
	}, {
		name: 'levelName',
		type: 'string',
		calculate: function (data) {
			if (data.levelValue === '1') {
				return '검토중';
			} else if (data.levelValue === '2') {
				return '결재대기';
			} else if (data.levelValue === '3') {
				return '완료';
			} else if (data.levelValue === '4') {
				return '총계';
			}			
		}
	}, {
		name: 'summaryBulk1',
		type: 'string'
	}, {
		name: 'summaryBulk2',
		type: 'string'
	}, {
		name: 'summaryTank',
		type: 'string'
	}]
});
