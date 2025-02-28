Ext.define('MOST.model.document.excelupload.PackageDetailList', {
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
		name:'pkgNo',
		type:'string',
		allowBlank: false
	},{
		name:'pkgDesc',
		type:'string',
		allowBlank: false
	},{
		name:'pkgMt',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'pkgM3',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'length',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'width',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'height',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},
	{
		name:'pkgRmk',
		type:'string'
	},
	],

	validators: {
		vslCallId: { type: 'format', matcher: /^[\w\d]+(-?)[\w\d]+$/i }
		,vinNo: { type: 'format', matcher: /^[\w\d]+$/i }
		,pkgMt: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,pkgM3: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,length: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,width: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,height: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
	}
});
