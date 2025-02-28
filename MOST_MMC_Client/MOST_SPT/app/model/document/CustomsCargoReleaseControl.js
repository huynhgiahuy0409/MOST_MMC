Ext.define('MOST.model.document.CustomsCargoReleaseControl', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields : [ 
		{
			name : 'vslCallId',
			type : 'string'
		}, {
			name : 'jobNo',
			type : 'string'
		}, {
			name : 'docStatCd',
			type : 'string'
		}, {
			name : 'jobNoBl1',
			type : 'string'
		}, {
			name : 'docStatCdBl1',
			type : 'string'
		}, {
			name : 'jobNoMf1',
			type : 'string'
		}, {
			name : 'docStatCdMf1',
			type : 'string'
		}, {
			name : 'jobNoCg1',
			type : 'string'
		}, {
			name : 'docStatCdCg1',
			type : 'string'
		}, {
			name : 'blNo',
			type : 'string'
		}, {
			name : 'status',
			type : 'string'
		}, {
			name : 'dgYn',
			type : 'string'
		}, {
			name : 'dgStatus',
			type : 'string'
		}, {
			name : 'regNo',
			type : 'string'
		}, {
			name : 'regNoMf1',
			type : 'string'
		}, {
			name : 'blRegNo',
			type : 'string'
		}, {
			name : 'cbr',
			type : 'string'
		}, {
			name : 'snNo',
			type : 'string'
		}, {
			name : 'vslNm',
			type : 'string'
		}, {
			name : 'no',
			type : 'string'
		}, {
			name : 'ieCd',
			type : 'string'
		}, {
			name : 'vslCd',
			type : 'string'
		}, {
			name : 'cnsneCd',
			type : 'string'
		}, {
			name : 'releaseNo',
			type : 'string'
		}, {
			name : 'customsAprvStat',
			type : 'string'
		}, {
			name : 'vslManifestNo',
			type : 'string'
		}, {
			name : 'docNo',
			type : 'string'
		}, {
			name : 'damNo',
			type : 'string'
		}, {
			name : 'rdNo',
			type : 'string'
		}, {
			name : 'refNo',
			type : 'string'
		}, {
			name : 'divCD',
			type : 'string'
		}, {
			name : 'customReleaseDT',
			type: 'string',
		}, {
			name : 'custGetIn',
			type: 'string',
		}, {
			name : 'custGetOut',
			type: 'string',
		}, {
			name : 'tmnlDesc',
			type : 'string'
		}, {
			name : 'docExist',
			type : 'string'
		}, {
			name : 'masterBL',
			type : 'string'
		}, {
			name : 'bookingNo',
			type : 'string'
		}, {
			name : 'transDT',
			type : 'string'
		}, {
			name : 'insDT',
			type : 'string'
		}, {
			name : 'seq',
			type : 'string'
		}, {
			name : 'exWhId',
			type : 'string'
		}, {
			name : 'activateYN',
			type : 'string'
		}, {
			name : 'interfacePK',
			type : 'string'
		}, {
			name : 'userId',
			type : 'string'
		}, {
			name : 'updUserId',
			type : 'string'
		}, {
			name : 'createUserId',
			type : 'string'
		}, {
			name : 'channelCd',
			type : 'string'
		}, {
			name : 'channelNm',
			type : 'string'
		}, {
			name : 'releaseMt',
			type : 'string'
		}, {
			name : 'releaseQty',
			type : 'string'
		}, {
			name : 'cargoNo',
			type : 'string'
		}, {
			name : 'categoryCd',
			type : 'string'
		}, {
			name : 'categoryNm',
			type : 'string'
		}, {
			name : 'docMt',
			type : 'string'
		}, {
			name : 'docQty',
			type : 'string'
		}, {
			name : 'balanceMt',
			type : 'string'
		}, {
			name : 'balanceQty',
			type : 'string'
		}, {
			name : 'shaCd',
			type : 'string'
		}, {
			name : 'shaNm',
			type : 'string'
		}, {
			name : 'fwdCd',
			type : 'string'
		}, {
			name : 'fwdNm',
			type : 'string'
		}, {
			name : 'cnsCd',
			type : 'string'
		}, {
			name : 'cnsNm',
			type : 'string'
		}, {
			name : 'cd',
			type : 'string'
		}, {
			name : 'cdNm',
			type : 'string'
		}, {
			name : 'cmdtCd',
			type : 'string'
		}, {
			name : 'cmdtNm',
			type : 'string'
		}, {
			name : 'updDate',
			type : 'string'
		}, {
			name : 'crudFlag',
			type : 'string'
		}, {
			name : 'blSon',
			type : 'string'
		}, {
			name : 'volanteStatus',
			type : 'string'
		}, {
			name : 'abandoNoStatus',
			type : 'string'
		}, {
			name : 'perQty',
			type : 'string'
		}, {
			name : 'cgTpCd',
			type : 'string'
		}, {
			name : 'balanceBlSonMt',
			type : 'string'
		}, {
			name : 'balanceBlSonQty',
			type : 'string'
		}, {
			name : 'bondedWhYn',
			type : 'string'
		},
		//sMantis: 0167587
		{
			name : 'docM3',
			type : 'string'
		},
		{
			name : 'balanceM3',
			type : 'string'
		},
		{
			name : 'releaseM3',
			type : 'string'
		}
		//eMantis: 0167587

	]
})