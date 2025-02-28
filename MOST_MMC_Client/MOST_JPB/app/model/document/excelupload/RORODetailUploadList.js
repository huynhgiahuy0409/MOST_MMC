Ext.define('MOST.model.document.excelupload.RORODetailUploadList', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	
	fields: [
	{
		name:'vslCd',
		type:'string'
	},
	{
		name:'callYear',
		type:'string'
	},
	{
		name:'callSeq',
		type:'string'
	},{
		name:'brandCd',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'modelCd',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'unitNo',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'newYn',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'roroMt',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'cbm',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	}
	],

	validators: {
		vslCallId: { type: 'format', matcher: /^[\w\d]+(-?)[\w\d]+$/i }
		,vinNo: { type: 'format', matcher: /^[\w\d]+$/i }
		,vehicleMake: { type: 'format', matcher: /^[\w\d&]+$/i }
		,vehicleModel: { type: 'format', matcher: /^[\w\d&]+$/i }
		,newUsed: { type: 'format', matcher: /^[\w\d&]+$/i }
		,weight: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,volume: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
	}
});
