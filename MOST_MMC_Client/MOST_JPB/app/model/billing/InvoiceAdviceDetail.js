Ext.define('MOST.model.billing.InvoiceAdviceDetail', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'vesselCallingID',
		type:'string'
	},
	{
		name:'adviceNo',
		type:'string'
	},
	{
		name:'vesselName',
		type:'string'
	},
	{
		name:'partnerTypeCode',
		type:'string'
	},
	{
		name:'partnerTypeName',
		type:'string'
	},
	{
		name:'partnerCode',
		type:'string'
	},
	{
		name:'partnerName',
		type:'string'
	},
	{
		name:'payerTpCd',
		type:'string'
	},
	{
		name:'payerTpName',
		type:'string'
	},
	{
		name:'payerCd',
		type:'string'
	},
	{
		name:'payerName',
		type:'string'
	},
	{
		name:'tarrifTypeCode',
		type:'string'
	},
	{
		name:'tarrifTypeName',
		type:'string'
	},
	{
		name:'operationTypeCode',
		type:'string'
	},
	{
		name:'operationTypeName',
		type:'string'
	},
	{
		name:'commodityCode',
		type:'string'
	},
	{
		name:'handleAmount',
		type:'string'
	},
	{
		name:'ackStatusCode',
		type:'string'
	},
	{
		name:'eta',
		type:'string'
	},
	{
		name:'etd',
		type:'string'
	},
	{
		name:'shippingAgent',
		type:'string'
	},
	{
		name:'loadding',
		type:'string'
	},
	{
		name:'discharging',
		type:'string'
	},
	{
		name:'no',
		type:'string'
	},
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
		name:'callSign',
		type:'string'
	},
	{
		name:'vslNm',
		type:'string'
	},
	{
		name:'inbVoy',
		type:'string'
	},
	{
		name:'outbVoy',
		type:'string'
	},
	{
		name:'etaVessel',
		type:'string'
	},
	{
		name:'etdVessel',
		type:'string'
	},
	{
		name:'etbVessel',
		type:'string'
	},
	{
		name:'etwVessel',
		type:'string'
	},
	{
		name:'vslTp',
		type:'string'
	},
	{
		name:'vslOperator',
		type:'string'
	},
	{
		name:'voyage',
		type:'string'
	},
	{
		name:'berthLoc',
		type:'string'
	},
	{
		name:'advSeq',
		type:'string'
	},
	{
		name:'blNo',
		type:'string'
	},
	{
		name:'shipgNoteNo',
		type:'string'
	},
	{
		name:'wgt',
		type:'string'
	},
	{
		name:'msrmt',
		type:'string'
	},
	{
		name:'qty',
		type:'string'
	},
	{
		name:'cargoTp',
		type:'string'
	},
	{
		name:'accNo',
		type:'string'
	},
	{
		name:'addr',
		type:'string'
	},
	{
		name:'docNo',
		type:'string'
	},
	{
		name:'confirm',
		type:'string'
	},
//	{
//		name:'commodityCodeList',
//		type:'list'
//	},
//	{
//		name:'partnerCodedTypeList',
//		type:'list'
//	},
//	{
//		name:'detailList',
//		type:'list'
//	},
//	{
//		name:'JPVClist',
//		type:'list'
//	},
//	{
//		name:'sub',
//		type:'list'
//	},
//	{
//		name:'BLList',
//		type:'list'
//	},
//	{
//		name:'SNList',
//		type:'list'
//	},
	{
		name:'loadingTotalWgt',
		type:'string'
	},
	{
		name:'loadingTotalMsrmt',
		type:'string'
	},
	{
		name:'loadingTotalQty',
		type:'string'
	},
	{
		name:'dischargingTotalWgt',
		type:'string'
	},
	{
		name:'dischargingTotalMsrmt',
		type:'string'
	},
	{
		name:'dischargingTotalQty',
		type:'string'
	},
	{
		name:'chgDt',
		type:'string'
	},
	{
		name:'oldVal',
		type:'string'
	},
	{
		name:'newVal',
		type:'string'
	},
	{
		name:'histSeq',
		type:'string'
	},
	{
		name:'validateNumber',
		type:'string'
	},
	{
		name:'rmk',
		type:'string'
	},
	{
		name:'arrvSaId',
		type:'string'
	},
	{
		name:'updateTimeField',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'items',
		mapping: 'invoiceAdviceDetailMap'
	}
	],
	associations: [{
		type: 'hasMany',
		name: 'invoiceAdviceDetailMap',
		model: 'MOST.model.billing.InvoiceAdviceDetail'
	}]
});