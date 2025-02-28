Ext.define('MOST.model.fileupload.FileUpload', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'pgmId',
			type:'string'
		},{
			name:'catgCd',
			type:'string'
		},{
			name:'fileName',
			type:'string'
		},{
			name:'fileSize',
			type:'string'
		},{
			name: 'ufileName',
			type: 'string'
		},{
			name: 'workingStatus',
			type: 'string'
		},{
			name: 'fileStream',
			type: 'string'
		},{
			name: 'content',
			type: 'string'
		},{
			name: 'items',
			mapping: 'fileitemlist'
		}
		],
		associations: [{
			type: 'hasMany',
			name: 'fileitemlist',
			model: 'MOST.model.fileupload.FileUpload'
		}]
});
