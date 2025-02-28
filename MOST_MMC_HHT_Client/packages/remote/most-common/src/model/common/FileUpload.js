Ext.define('MOST.model.common.FileUpload', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
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