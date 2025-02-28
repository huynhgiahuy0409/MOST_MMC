Ext.define('MOST.model.codes.SearchDelayCodeParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
	{
		name:'dlyCd',
		type:'string'
	},
	{
		name:'dlyCatgCd',
		type:'string'
	},
	{
		name:'descr',
		type:'string'
	},	
	{
		name:'chagYN',
		type:'string'
	},	
	{
		name:'userId',
		type:'string'
	},	
	{
		name:'sytmId',
		type:'string'
	},	
	{
		name:'updDt',
		type:'date',
		dateFormat: 'time'
	},	
	{
		name:'no',
		type:'string'
	},	
	{
		name:'bulkTp',
		type:'string'
	},	
	{
		name:'bulkTpNm',
		type:'string'
	}
	]
});
