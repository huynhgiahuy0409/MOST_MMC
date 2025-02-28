Ext.define('MOST.model.document.excelupload.SearchExcelFileUploadParm', {
	extend: 'MOST.model.foundation.parm.BizParm',
	fields: [
	{
		name:'workingStatus',
		type:'string'
	},
	{
		name:'pgmId',
		type:'string'
	},
	{
		name:'catgCd',
		type:'string'
	},
	{
		name:'fileName',
		type:'string'
	},
	{
		name:'fileSize',
		type:'string'
	},
	{
		name:'ufileName',
		type:'string'
	},
	{
		name:'fileStream',
		type:'auto'
	}
	]
});