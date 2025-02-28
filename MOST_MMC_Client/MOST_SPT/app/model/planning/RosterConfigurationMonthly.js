Ext.define('MOST.model.planning.RosterConfigurationMonthly', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
			name:'id',
			type:'float'
		},{
			name:'title',
			type:'string'
		},{
			name:'calendarId',
			type:'float'
		},{
			name:'startDate',
			type: 'date',
			dateFormat: 'time'
		},{
			name:'endDate',
			type: 'date',
			dateFormat: 'time'
		},{
			name:'shftGrpCd',
			type:'string'
		},{
			name:'shftId',
			type:'string'
		},{
			name:'rstrYmd',
			type:'string'
		},{
			name:'rsnCd',
			type:'string'
		},{
			name:'idx',
			type:'string'
		},{
			name:'groupCd',
			type:'string'
		},{
			name:'groupNm',
			type:'string'
		},{
			name:'chkShiftGroupMulti',
			type:'int'
		},{
			name:'empId',
			type:'string'
		},{
			name:'engNm',
			type:'string'
		},{
			name:'aplyFmYmd',
			type:'string'
		},{
			name:'aplyToYmd',
			type:'string'
		},{
			name:'roleCdNm',
			type:'string'
		},{
			name:'intvlTpCd',
			type:'string'
		},{
			name:'intvlVal',
			type:'int'
		},{
			name:'hiddenEmpId',
			type:'string'
		},{
			name:'shftDivCd',
			type:'string'
		}
	]
});