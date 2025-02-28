Ext.define('MOST.model.document.excelupload.ROROLoadingList', {
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
	},
	{
		name:'vslCallId',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellNum',
		allowBlank: false
	},
	{
		name:'opeClassCd',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellOpeClassCd',
		allowBlank: false
	},{
		name:'mfDocId', //Manifest Number (BL Number)
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'shipgNoteNo', //CargoId
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'blNo', // Cargo Id
		type:'string'
	},{
		name:'consignee',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'shipper',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'cargoAgent',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank'
	},{
		name:'cargoType',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{       
		name:'cargoSubType',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'commodity',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'packageType',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'mark',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'packageNumber',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'quantity',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellNum',
		allowBlank: false
	},{
		name:'eachWeight',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellFloat'
	},{
		name:'eachVolumn',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellFloat'
	},{
		name:'totalWeight',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellFloat',
		allowBlank: false
	},{
		name:'totalVolumn',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellFloat',
		allowBlank: false
	},{
		name:'loadPort',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'dischargePort',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'cargoDest',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithBlank'
	},{
		name:'dgNo',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithBlank'
	},{
		name:'cargoDesc',
		type:'string'
	},{
		name:'parentId',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithBlank'
	},{
		name:'parentCargoType',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithBlank'
	},{
		name:'deliveryMode',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'hatchNo',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithBlank'
	},{
		name:'transporter',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithBlank'
	},{
		name:'modeofOp',
		type:'string',
		invalidCode: 'cargoLoadingListMsgValidCellStrNumWithBlank'
	}
	],

	validators: {
		vslCallId: { type: 'format', matcher: /^[\w\d]+(-?)[\w\d]+$/i }
		,opeClassCd: { type: 'inclusion', list: ['E'] } //{ type: 'format', matcher: /^[\w\d]+$/i }
		,mfDocId: { type: 'format', matcher: /^[\w\d]+$/i }
		,shipgNoteNo: { type: 'format', matcher: /^[\w\d]+$/i }
		,consignee: { type: 'format', matcher: /^[\w\d&]+$/i }
		,shipper: { type: 'format', matcher: /^[\w\d&]+$/i }
//		,cargoAgent: { type: 'format', matcher: /^[\w\d&]+$/i }
		,cargoType: { type: 'format', matcher: /^[\w\d ]+$/i }
		,cargoSubType: { type: 'format', matcher: /^[\w\d\(\) ]+$/i }
		,commodity: { type: 'format', matcher: /^[\w\d\(\)\" ]+$/i }
		// ,mark: { type: 'format', matcher: /^[\w\d ]+$/i } 			// 	0118573: be allow all characters.
		// ,packageNumber: { type: 'format', matcher: /^[\w\d. ]+$/i }	// 	0118573: be allow all characters.
		,quantity: { type: 'format', matcher: /^[\d]+$/i }
		,length: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,width: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,height: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,eachWeight: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)|^\0{0}$/i }
		,eachVolumn: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)|^\0{0}$/i }
		,totalWeight: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,totalVolumn: { type: 'format', matcher: /(^[\d]+$)|(^[\d]+[.]{1}[\d]+$)/i }
		,loadPort: { type: 'format', matcher: /^[\w\d]+$/i }
		,dischargePort: { type: 'format', matcher: /^[\w\d]+$/i }
		,cargoDest: { type: 'format', matcher: /^[\w\d]+$|^\0{0}$/i }
		,dgNo: { type: 'format', matcher: /((^[1-9])|(^[1-9].\d[A-Z]?))(\/\d{4}$)|(^\0{0}$)/i }

		,parentId: { type: 'format', matcher: /^[\w\d]+$|^\0{0}$/i }
		,parentCargoType: { type: 'format', matcher: /^[\w\d ]+$|^\0{0}$/i }
		,deliveryMode: { type: 'format', matcher: /^[\w\d ]+$/i }
		,hatchNo: { type: 'format', matcher: /^[\w\d,]+$|^\0{0}$/i }
		,estimateArrivalDate: { type:'datetime', format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds() }
		,transporter: { type: 'format', matcher: /^[\w\d&]+$|^\0{0}$/i }
		,modeofOp: { type: 'format', matcher: /^[\w\d &]+$|^\0{0}$/i }
	}
});
