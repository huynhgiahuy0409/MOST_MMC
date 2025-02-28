Ext.define('MOST.model.planning.roster.RosterMonthlyEvent', {
	extend : 'Ext.calendar.model.Calendar',
	fields: [{
			name:'id',
			type:'float'
		},{
			name:'title',
			type:'string'
		},{
			name:'calendarId',
			type:'float'
		},
		{
			name:'startDate',
			type: 'date',
			dateFormat: 'time'
		},
		{
			name:'endDate',
			type: 'date',
			dateFormat: 'time'
		}
	]
});