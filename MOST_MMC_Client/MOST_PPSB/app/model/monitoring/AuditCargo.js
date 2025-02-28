Ext.define('MOST.model.monitoring.AuditCargo', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name: 'workingStatus',
		type: 'string'
	},
	{
		name:'vslCallId',
		type:'string'
	},
	{
		name:'vslCd',
		type:'string'
	},
	{
		name:'callSeq',
		type:'string'
	},
	{
		name:'callYear',
		type:'string'
	},
	{
		name:'searchType',
		type:'string'
	},
	{
		name:'blNo',
		type:'string'
	},
	{
		name:'snNo',
		type:'string'
	},
	{
		name:'pgmId',
		type:'string'
	},
	{
		name:'sessionInfo',
		type:'string'
	},
	{
		name:'refNo1',
		type:'string'
	},
	{
		name:'refNo2',
		type:'string'
	},
	{
		name:'historySeq',
		type:'string'
	},
	{
		name:'dataField',
		type:'string'
	},
	{
		name:'oldValue',
		type:'string'
	},
	{
		name:'newValue',
		type:'string'
	},
	{
		name:'userId',
		type:'string'
	},
	{
		name:'updateTime',
		type:'string'
	},
	{
		name:'cdNm',
		type:'string'
	},
	{
		name:'cd',
		type:'string'
	},
//	{
//		name:'startDt',
//		type: 'date',
//		dateFormat: 'time'
//	},
//	{
//		name:'endDt',
//		type: 'date',
//		dateFormat: 'time'
//	},
	]
});