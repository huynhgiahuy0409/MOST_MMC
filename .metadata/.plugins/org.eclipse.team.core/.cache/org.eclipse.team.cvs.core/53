Ext.define('MOST.model.document.excelupload.GeneralCargoDischargingList', {
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
		invalidCode: 'cargoDischargingListMsgValidCellStrNum',
		allowBlank: false
	},
	{
		name:'opeClassCd',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellOpeClassCd',
		allowBlank: false
	},{
		name:'mfDocId', //Manifest Number (BL Number)
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'shipgNoteNo', //CargoId
		type:'string'
	},{
		name:'blNo', // Cargo Id
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'consignee',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'shipper',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'cargoAgent',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'cargoType',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{       
		name:'cargoSubType',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'commodity',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'packageType',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'mark',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'packageNumber',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'quantity',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellNum',
		allowBlank: false
	},{
		name:'length',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellFloat',
//		allowBlank: false
	},{
		name:'width',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellFloat',
//		allowBlank: false
	},{
		name:'height',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellFloat',
//		allowBlank: false
	},{
		name:'eachWeight',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellFloat'
	},{
		name:'eachVolumn',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellFloat'
	},{
		name:'totalWeight',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellFloat',
		allowBlank: false
	},{
		name:'totalVolumn',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellFloat',
		allowBlank: false
	},{
		name:'loadPort',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'dischargePort',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'cargoDest',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithBlank'
	},{
		name:'dgNo',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithBlank'
	},{
		name:'cargoDesc',
		type:'string'
	},{
		name:'parentId',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithBlank'
	},{
		name:'parentCargoType',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithBlank'
	},{
		name:'deliveryMode',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithoutBlank',
		allowBlank: false
	},{
		name:'hatchNo',
		type:'string',
		invalidCode: 'cargoDischargingListMsgValidCellStrNumWithBlank'
	},{
		name:'estimateArrivalDate',
		type: 'date',
		dateFormat: 'time'
	}
	],

	validators: {
		 vslCallId: { type: 'format', matcher: /^[\w\d]+(-?)[\w\d]+$/i }
		,opeClassCd: { type: 'inclusion', list: ['I'] } //{ type: 'format', matcher: /^[\w\d]+$/i }
		,mfDocId: { type: 'format', matcher: /^[\w\d]+$/i }
		,blNo: { type: 'format', matcher: /^[\w\d]+$/i }
		,consignee: { type: 'format', matcher: /^[\w\d&]+$/i }
		,shipper: { type: 'format', matcher: /^[\w\d&]+$/i }
		,cargoAgent: { type: 'format', matcher: /^[\w\d&]+$/i }
		,cargoType: { type: 'format', matcher: /^[\w\d ]+$/i }
		,cargoSubType: { type: 'format', matcher: /^(?!\s*$).+$/i }
		,commodity: { type: 'format', matcher: /^(?!\s*$).+$/i }
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
   }
});
