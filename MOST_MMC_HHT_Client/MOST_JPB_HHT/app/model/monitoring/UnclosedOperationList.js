Ext.define('MOST.model.controller.UnclosedOperationList', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'searchType',
			type:'string'
		},
		{
			name:'currentPage',
			type:'string'
		},
		{
			name:'numbPerPage',
			type:'string'
		},
		{
			name:'pageType',
			type:'string'
		},
		{
			name:'fromRow',
			type:'string'
		},
		{
			name:'toRow',
			type:'string'
		},
		{
			name:'fromATB',
			type:'string'
		},
		{
			name:'toATB',
			type:'string'
		}

	]
});