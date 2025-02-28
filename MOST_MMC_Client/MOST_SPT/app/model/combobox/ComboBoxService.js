Ext.define('MOST.model.combobox.ComboBoxService', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'lcd',
		type: 'string'
	},{
		name: 'mcd',
		type: 'string'
	},{
		name: 'scd',
		type: 'string'
	},{
		name: 'scdNm',
		type: 'string'
	},{
		name: 'scdDesc',
		type: 'string'
	},{
		name: 'scdLgv',
		type: 'string'
	},{
		name: 'version',
		type: 'string'
	},{
		name: 'lcdNm',
		type: 'string'
	},{
		name: 'mcdNm',
		type: 'string'
	},{
		name: 'locId',
		type: 'string'
	},{
		name: 'locNm',
		type: 'string'
	},{
		name: 'useYn',
		type: 'string'
	},{
		name: 'updUserId',
		type: 'string'
	},{
		name: 'updDtm',
		type: 'string'	
	},{
		name: 'shftTpCd',
		type: 'string'	
	},{
		name: 'shftTpCdNm',
		type: 'string'	
	},{
		name: 'blNo',
		type: 'string'	
	},{
		name: 'doNo',
		type: 'string'	
	},{
		name: 'wgt',
		type: 'string'	
	},{
		name: 'vol',
		type: 'string'	
	},{
		name: 'delvTpCd',
		type: 'string'	
	},{
		name: 'delvTpNm',
		type: 'string'	
	},{
		name: 'cmdtCd',
		type: 'string'	
	},{
		name: 'pkgQty',
		type: 'string'	
	},{
		name: 'tsptr',
		type: 'string'	
	},{
		name: 'shipgNoteNo',
		type: 'string'	
	},{
		name: 'shftNm',
		type: 'string'	
	},{
		name: 'shftId',
		type: 'string'	
	},{
		name: 'shftIdx',
		type: 'string'	
	},{
		name: 'fmHhMm',
		type: 'string'	
	},{
		name: 'toHhMm',
		type: 'string'	
	},{
		name: 'eqDivCd',
		type: 'string'	
	},{
		name: 'eqDivCdNm',
		type: 'string'	
	},{
		name: 'roleCd',
		type: 'string'	
	},{
		name: 'roleCdNm',
		type: 'string'	
	},{
		name: 'groupCd',
		type: 'string'	
	},{
		name: 'groupNm',
		type: 'string'	
	},{
		name: 'ptnrCode',
		type: 'string'	
	},{
		name: 'ptnrName',
		type: 'string'	
	},{
		name: 'mfDocId',
		type: 'string'	
	},{
		name: 'grNo',
		type: 'string'	
	},{
		name: 'sDoNo',
		type: 'string'	
	},{
		name: 'unitNo',
		type: 'string'	
	},{
		name: 'reqPos',
		type: 'string'	
	},{
		name: 'planLocId',
		type: 'string'	
	},{
		name: 'blNoSnNo',
		type: 'string'	
	},{
		name: 'refNo',
		type: 'string'	
	},{
		name: 'payer',
		type: 'string'	
	},{
		name: 'payerNm',
		type: 'string'	
	},{
		name: 'payerTp',
		type: 'string'	
	},{
		name: 'payTpCd',
		type: 'string'	
	},{
		name: 'userRefNo',
		type: 'string'	
	},{
		name: 'cgNo',
		type: 'string'	
	},{
		name: 'ivPrefix',
		type: 'string'	
	},{
		name: 'vslCallId',
		type: 'string'	
	},{
		name: 'addr',
		type: 'string'	
	},{
		name: 'accNo',
		type: 'string'	
	},{
		name: 'ivPrfx',
		type: 'string'	
	},{
		name: 'trfCd',
		type: 'string'	
	},{
		name: 'subTrfCd',
		type: 'string'	
	},{
		name: 'displayName',
		type: 'string'	
	},{
		name: 'trfName',
		type: 'string'	
	},{
		name: 'ssrType',
		type: 'string'	
	},{
		name: 'costCenter',
		type: 'string'	
	},{
		name: 'ivUnit1',
		type: 'string'	
	},{
		name: 'ivUnit2',
		type: 'string'	
	},{
		name: 'ivUnit3',
		type: 'string'	
	},{
		name: 'length',
		type: 'string'	
	},{
		name: 'berthTp',
		type: 'string'	
	},{
		name: 'pstSta',
		type: 'string'	
	},{
		name: 'pstEnd',
		type: 'string'	
	},{
		name: 'financialCode',
		type: 'string'	
	},{
		name: 'trfRate',
		type: 'string'	
	},{
		name: 'masterBL',
		type: 'string'	
	},{
		name: 'bookingNo',
		type: 'string'	
	},{
		name: 'gstTpCd',
		type: 'string'	
	},{
		name: 'gstRate',
		type: 'string'	
	},{
		name: 'custCd',
		type: 'string'	
	},
	{
		name: 'catgCd',
		type: 'string'	
	},
	{
		name: 'cgTpCd',
		type: 'string'	
	},
	{
		name: 'pkTpCd',
		type: 'string'	
	},
	{
		name: 'shprCnsne',
		type: 'string'	
	},
	{
		name: 'cnsne',
		type: 'string'	
	},
	{
		name: 'unno',
		type: 'string'	
	},
	{
		name: 'pol',
		type: 'string'	
	},
	{
		name: 'pod',
		type: 'string'	
	},{
		name: 'shprNm',
		type: 'string'	
	},{
		name: 'cnsneNm',
		type: 'string'	
	},{
		name: 'cmdtDesc',
		type: 'string'	
	},{
		name: 'pkgTpNm',
		type: 'string'	
	},
	{
		name: 'capa',
		type: 'number'	
	}
]
});