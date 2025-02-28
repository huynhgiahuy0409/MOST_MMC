Ext.define('MOST.model.billing.InvoiceList', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'vslNm',
			type:'string'
		},
		{
			name:'berthLoc',
			type:'string'
		},
		{
			name:'vslOperator',
			type:'string'
		},
		{
			name:'atb',
			type:'string'
		},
		{
			name:'atu',
			type:'string'
		},
		{
			name:'shipCallNo',
			type:'string'
		},
		{
			name:'voyage',
			type:'string'
		},
		{
			name:'accNo',
			type:'string'
		},
		{
			name:'isFileAtt',
			type:'string'
		},
		{
			name:'ivNo',
			type:'string'
		},
		{
			name:'payer',
			type:'string'
		},
		{
			name:'ivPrfx',
			type:'string'
		},
		{
			name:'statCd',
			type:'string'
		},
		{
			name: 'statusNm',
			type: 'string'
		},
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'ivAmt',
			type:'string'
		},
		{
			name:'ivDt',
			type:'string'
		},
		{
			name:'ivDueDt',
			type:'string'
		},
		{
			name:'payTpCd',
			type:'string'
		},
		{
			name:'payDocNo',
			type:'string'
		},
		{
			name:'payAmt',
			type:'string'
		},
		{
			name:'payDt',
			type:'string'
		},
		{
			name:'ivSytmId',
			type:'string'
		},
		{
			name:'vwDt',
			type:'string'
		},
		{
			name:'vwUserId',
			type:'string'
		},
		{
			name:'billDays',
			type:'string'
		},
		{
			name:'currency',
			type:'string'
		},
		{
			name:'exRate',
			type:'string'
		},
		{
			name:'frgnAmt',
			type:'string'
		},
		{
			name:'no',
			type:'string'
		},
//		{
//			name:'ivNos',
//			type:'list'
//		},
		{
			name:'prUserId',
			type:'string'
		},
		{
			name:'prDt',
			type:'string'
		},
		{
			name:'erpStatCd',
			type:'string'
		},
		{
			name:'curPage',
			type:'int'
		},
		{
			name:'pagingSearchType',
			type:'string'
		},
		{
			name:'pageSize',
			type:'int'
		},
		{
			name:'test1',
			type:'int'
		},
		{
			name:'test2',
			type:'int'
		},
		{
			name:'totalPage',
			type:'string'
		},
		{
			name:'crDate',
			type:'string'
		},
		{
			name:'userId',
			type:'string'
		},
		{
			name:'transferStatus',
			type:'string'
		},
		{
			name:'gstAmount',
			type:'string'
		},
		{
			name:'totalAmount',
			type:'string'
		},
		{
			name:'totalWithAmt',
			type:'string'
		},
		{
			name:'revsAmt',
			type:'string'
		},
		{
			name:'frgnGstAmt',
			type:'string'
		},
		{
			name:'paidSt',
			type:'string'
		},
		{
			name:'paidStOrg',
			type:'string'
		},
		{
			name: 'isUpdatePaid',
			type: 'string'
		},
		{
			name:'crud',
			type:'string'
		},
		{
			name:'uploadItemsList',
			mapping: 'uploadMap'
		},
		{
			name: 'financialCode',
			type: 'string'
		},
		{
			name: 'scrId',
			type: 'string'
		},
		{
			name: 'masterBl',
			type: 'string'
		},
		{
			name: 'blNo',
			type: 'string'
		},
		{
			name: 'bookingNo',
			type: 'string'
		},
		{
			name: 'snNo',
			type: 'string'
		},
		{
			name: 'ivNo',
			type: 'string'
		},
		{
			name: 'inDate',
			type: 'string'
		},
		{
			name: 'dueDate',
			type: 'string'
		},
		{
			name: 'aplyAmt',
			type: 'string'
		},
		{
			name: 'stdAmt',
			type: 'string'
		},
		{
			name: 'diffAmt',
			type: 'string'
		},
		{
			name: 'rmk',
			type: 'string'
		},
		{
			name: 'date',
			type: 'string'
		},
		{
			name: 'exchangeRate',
			type: 'string'
		},
		{
			name: 'frCrcy',
			type: 'string'
		},
		{
			name: 'crcyCd',
			type: 'string'
		},
		{
			name: 'ivUnit1',
			type: 'string'
		},
		{
			name: 'ivUnit2',
			type: 'string'
		},
		{
			name: 'ivUnit3',
			type: 'string'
		},
		{
			name: 'seq',
			type: 'string'
		},
		{
			name: 'custCd',
			type: 'string'
		},
		{
			name: 'payerNm',
			type: 'string'
		},
		{
			name: 'taxCd',
			type: 'string'
		},
		{
			name: 'taxValue',
			type: 'string'
		},
		{
			name: 'taxAmt',
			type: 'string'
		},
		{
			name: 'refNo',
			type: 'string'
		},
		{
			name: 'accNm',
			type: 'string'
		},
		{
			name: 'bankNm',
			type: 'string'
		}
	],
	
	associations: [{
		type: 'hasMany',
		name: 'uploadMap',
		model: 'MOST.model.common.FileUpload'
	}]
});






