Ext.define('MOST.model.planning.RosterConfigurationOthers', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'engNm',
			type:'string'
		},{
			name:'empId',
			type:'string'
		},{
			name:'role',
			type:'string'
		},{
			name:'shftIndex',
			type:'string'
		},{
			name:'startDate',
			type:'string'
		},{
			name:'rstrYmd',
			type:'string'
		},{
			name:'deliUpdateCd',
			type:'string'
		},{
			name:'deliDeleteCd',
			type:'string'
		},{
			name:'statCdNm',
			type:'string'
		},{
			name:'workLocCdNm',
			type:'string'
		}
	]
});