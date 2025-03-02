Ext.define('MOST.model.billing.ProformaInvoice', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'creditNote',
			type:'string'
		},
		{
			name:'creditNoteYn',
			type:'string'
		},
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'category',
			type:'string'
		},
		{
			name:'docNo',
			type:'string'
		},
		{
			name:'proformaInvoiceNo',
			type:'string'
		},
		{
			name:'finalInvoiceNo',
			type:'string'
		},
		{
			name:'docMT',
			type:'string'
		},
		{
			name:'issuedMT',
			type:'string'
		},
		{
			name:'operationMT',
			type:'string'
		},
		{
			name:'issuedStatus',
			type:'string'
		},
		{
			name:'cntDoc',
			type:'string'
		},
		{
			name:'adviceNo',
			type:'string'
		},
		
		{
			name:'adviceSeq',
			type:'string'
		},
		{
			name:'customerType',
			type:'string'
		},
		{
			name:'payerCd',
			type:'string'
		},
		{
			name:'payerTp',
			type:'string'
		},		
		{
			name:'responsibilityCompanyCd',
			type:'string',
		},
		{
			name:'responsibilityCompanyTpCd',
			type:'string'
		},
		{
			name:'operTpCd',
			type:'string'
		},
		{
			name:'refInvNo',
			type:'string'
		},
		{
			name:'addCreditIvNo',
			type:'string'
		},
		{
			name:'shaCd',
			type:'string'
		},
		{
			name:'fwdCd',
			type:'string'
		},
		{
			name:'shpCd',
			type:'string'
		},
		{
			name:'cnsCd',
			type:'string'
		},
		{
			name:'trfCd',
			type:'string'
		},
		{
			name:'subTrf',
			type:'string'
		},
		{
			name:'trfDesc',
			type:'string'
		},
		{
			name:'vatChk',
			type:'string'
		},
		{
			name:'detraccionChk',
			type:'string'
		},
		{
			name:'ivDetraccionChk',
			type:'string'
		},
		{
			name:'ivTp',
			type:'string'
		},
		{
			name:'ivTpNm',
			type:'string'
		},
		{
			name:'ivPrfx',
			type:'string'
		},
		{
			name:'ivAddr',
			type:'string'
		},
		{
			name:'ivNo',
			type:'string'
		},
		{
			name:'rowID',
			type:'string'
		},
		{
			name:'ivAmt',
			type:'string'
		},
		{
			name:'gatherNo',
			type:'string'
		},
		{
			name:'gatherSeq',
			type:'string'
		},
		{
			name:'gatherTpCd',
			type:'string'
		},
		{
			name:'billTpCd',
			type:'string'
		},
		{
			name:'applyRate',
			type:'string'
		},
		{
			name:'applyAmt',
			type:'string'
		},
		{
			name:'stdRate',
			type:'string'
		},
		{
			name:'cgTpCd',
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
			name:'pkgQty',
			type:'string'
		},
		{
			name:'fwrAgent',
			type:'string'
		},
		{
			name:'shipper',
			type:'string'
		},
		{
			name:'consignee',
			type:'string'
		},
		{
			name:'taxPrtg',
			type:'string'
		},
		{
			name:'taxAmt',
			type:'string'
		},
		{
			name:'totalAmt',
			type:'string'
		},
		{
			name:'netAmt',
			type:'string'
		},
		{
			name:'rmk',
			type:'string'
		},
		{
			name:'prUserId',
			type:'string'
		},
		{
			name:'opClassCd',
			type:'string'
		},
		{
			name:'delvTpCd',
			type:'string'
		},
		{
			name:'pkgTpCd',
			type:'string'
		},
		{
			name:'imdgClass',
			type:'string'
		},
		{
			name:'transportTpCd',
			type:'string'
		},
		{
			name:'cmdtCd',
			type:'string'
		},
		{
			name:'allowCreateAddCredit',
			type:'string'
		},
		{
			name:'updateUserId',
			type:'string'
		},
		{
			name:'tmnlUnitOfCharge',
			type:'string'
		},
		{
			name:'tmnlDetraccionChk',
			type:'string'
		},
		{
			name:'tmnlActCd',
			type:'string'
		},
		{
			name:'tmnlCostCenter',
			type:'string'
		},
		{
			name:'tmnlAccountCd',
			type:'string'
		},
		{
			name:'tmnlAccountDesc',
			type:'string'
		},
		{
			name:'apmtTariffDefinition',
			type:'string'
		},
		{
			name:'cancelYn',
			type:'string'
		},
		{
			name:'finalInvNo',
			type:'string'
		},
		{
			name:'adaviceSeq',
			type:'string'
		},
//		{
//			name:'chk',
//			type:'string'
//		},
		
		{
			name:'payerNm',
			type:'string'
		},
		{
			name:'payerAddr',
			type:'string'
		},
		{
			name:'trfTpCd',
			type:'string'
		},
		{
			name:'trfTpNm',
			type:'string'
		},
		{
			name:'blSnNo',
			type:'string'
		},
		{
			name:'unitPrc',
			type:'string'
		},
		{
			name:'cd',
			type:'string'
		},
		{
			name:'cdNm',
			type:'string'
		},
		{
			name:'paidYn',
			type:'string'
		},
		{
			name:'costCenter',
			type:'string'
		},
		{
			name:'ivDt',
			type:'string'
		},
		{
			name:'delvTpNm',
			type:'string'
		},
		{
			name:'statusCd',
			type:'string'
		},
		{
			name:'itemStatus',
			type:'string'
		},
		{
			name:'hgFlag',
			type:'string'
		},
		{
			name:'action',
			type:'string'
		},
		{
			name:'mfDocId',
			type:'string'
		},
		{
			name:'groupingField',
			type:'string'
		},
		{
			name:'masterBL',
			type:'string'
		},
		{
			name:'bookingNo',
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
			name:'adhocYn',
			type:'string'
		},
		{
			name:'ivUnit1',
			type:'string'
		},
		{
			name:'ivUnit2',
			type:'string'
		},
		{
			name:'ivUnit3',
			type:'string'
		},
		{
			name:'taxCd',
			type:'string'
		},
		{
			name:'taxValue',
			type:'string'
		}
		]
});