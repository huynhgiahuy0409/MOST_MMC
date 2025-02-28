Ext.define('MOST.model.operation.LorryLoadingConfirm', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'shipgNoteNo',
			type:'string'
		},
		{
			name:'lorryNo',
			type:'string'
		},
		{
			name:'lorryId',
			type:'string'
		},
		{
			name:'tankId',
			type:'string'
		},
		{
			name:'lorryLoad',
			type:'string'
		},
		{
			name:'countOfTrip',
			type:'string'
		},
		{
			name: 'userId',
			type: 'string'
		}
	]
});