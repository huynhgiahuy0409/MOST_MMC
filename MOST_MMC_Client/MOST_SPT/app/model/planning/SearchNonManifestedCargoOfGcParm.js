Ext.define('MOST.model.planning.SearchNonManifestedCargoOfGcParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields : [ 
		{
			name : 'vslCallId',
			type : 'string'
		}, {
			name : 'searchType',
			type : 'string'
		}, {
			name : 'blNo',
			type : 'string'
		}, {
			name : 'snNo',
			type : 'string'
		},
		{
			name:'jobNo',
			type:'string'
		},
		{
			name:'jobRoot',
			type:'string'
		},
		{
			name:'jobRootYn',
			type:'string'
		},
		{
			name:'jobPurpCd',
			type:'string'
		},
		{
			name:'jobPurpNm',
			type:'string'
		},
		{
			name:'jobTpCd',
			type:'string'
		},
		{
			name:'jobTpNm',
			type:'string'
		},
		{
			name:'jobGroup',
			type:'string'
		},
		{
			name:'jobCoCd',
			type:'string'
		},
		{
			name:'jobCoNm',
			type:'string'
		},
		{
			name:'workStDt',
			type: 'date',
			dateFormat: 'time'
		},
		{
			name:'workEndDt',
			type: 'date',
			dateFormat: 'time'
		},
		{
			name:'shftId',
			type:'string'
		},
		{
			name:'shftNm',
			type:'string'
		},
		{
			name:'shftDt',
			type:'string'
		},
		{
			name:'shftLvlCd',
			type:'string'
		},
		{
			name:'eqNo',
			type:'string'
		},
		{
			name:'eqTpCd',
			type:'string'
		},
		{
			name:'statCd',
			type:'string'
		},
		{
			name:'odrNo',
			type:'string'
		},
		{
			name:'gangNo',
			type:'string'
		},
		{
			name:'locId',
			type:'string'
		},
		{
			name:'fmLocId',
			type:'string'
		},
		{
			name:'toLocId',
			type:'string'
		},
		{
			name:'locArea',
			type:'string'
		},
		{
			name:'hatchNo',
			type:'string'
		},
		{
			name:'hatchDrt',
			type:'string'
		},
		{
			name:'toHatchNo',
			type:'string'
		},
		{
			name:'shipgNoteNo',
			type:'string'
		},
		{
			name:'cgNo',
			type:'string'
		},
		{
			name:'grNo',
			type:'string'
		},
		{
			name:'gatePassNo',
			type:'string'
		},
		{
			name:'pkgTpCd',
			type:'string'
		},
		{
			name:'delvTpCd',
			type:'string'
		},
		{
			name:'delvTpNm',
			type:'string'
		},
		{
			name:'tsptTpNm',
			type:'string'
		},
		{
			name:'whTpCd',
			type:'string'
		},
		{
			name:'tsptTpCd',
			type:'string'
		},
		{
			name:'opeClassCd',
			type:'string'
		},
		{
			name:'opeClassNm',
			type:'string'
		},
		{
			name:'cgCoCd',
			type:'string'
		},
		{
			name:'spCaCoCd',
			type:'string'
		},
		{
			name:'spCaCoNm',
			type:'string'
		},
		{
			name:'rcCoCd',
			type:'string'
		},
		{
			name:'rcCoNm',
			type:'string'
		},
		{
			name:'fnlOpeYn',
			type:'string'
		},
		{
			name:'fnlDelvYn',
			type:'string'
		},
		{
			name:'dmgYn',
			type:'string'
		},
		{
			name:'stsYn',
			type:'string'
		},
		{
			name:'shuYn',
			type:'string'
		},
		{
			name:'shortYn',
			type:'string'
		},
		{
			name:'rhdlYn',
			type:'string'
		},
		{
			name:'rcCount',
			type:'int'
		},
		{
			name:'rhdlCount',
			type:'int'
		},
		{
			name:'rhdlNo',
			type:'string'
		},
		{
			name:'rhdlNos',
			type:'string'
		},
		{
			name:'rhdlMode',
			type:'string'
		},
		{
			name:'rhdlModeNm',
			type:'string'
		},
		{
			name:'rhdlGroupNo',
			type:'string'
		},
		{
			name:'nxRefNo',
			type:'string'
		},
		{
			name:'nxVslCallId',
			type:'string'
		},
		{
			name:'nxCgNo',
			type:'string'
		},
		{
			name:'cgInOutCd',
			type:'string'
		},
		{
			name:'cntrQty',
			type:'int'
		},
		{
			name:'pkgQty',
			type:'int'
		},
		{
			name:'msrmt',
			type:'float'
		},
		{
			name:'wgt',
			type:'float'
		},
		{
			name:'locQty',
			type:'int'
		},
		{
			name:'locWgt',
			type:'float'
		},
		{
			name:'locMsrmt',
			type:'float'
		},
		{
			name:'pkgNo',
			type:'string'
		},
		{
			name:'repkgTypeCd',
			type:'string'
		},
		{
			name:'snBlNo',
			type:'string'
		},
		{
			name:'grDoNo',
			type:'string'
		},
		{
			name:'hiDate',
			type:'string'
		},
		{
			name:'hoDate',
			type:'string'
		},
		{
			name:'rmk',
			type:'string'
		},
		{
			name:'no',
			type:'int'
		},
		{
			name:'crud',
			type:'string'
		},
		{
			name:'cudYn',
			type:'string'
		},
		{
			name:'updDt',
			type:'string'
		},
		{
			name:'userId',
			type:'string'
		},
		{
			name:'updUserId',
			type:'string'
		},
		{
			name:'isCheck',
			type:'boolean'
		},
		{
			name:'packingSeq',
			type:'string'
		},
		{
			name:'packingRefNo',
			type:'string'
		},
		{
			name:'packingQty',
			type:'int'
		},
		{
			name:'packingMT',
			type:'float'
		},
		{
			name:'packingM3',
			type:'float'
		},
		{
			name:'chk',
			type:'string'
		},
		{
			name:'jobType',
			type:'string'
		}, {
			name:'stat',
			type:'string'
		}, {
			name : 'divCd',
			type : 'string'
		}, {
			name : 'ptnrCd',
			type : 'string'
		}, {
			name : 'cd',
			type : 'string'
		}, {
			name : 'cdNm',
			type : 'string'
		}, {
			name : 'tyCd',
			type : 'string'
		}, {
			name : 'etaFrom',
			type : 'string'
		}, {
			name : 'etaTo',
			type : 'string'
		}, {
			name : 'cbr',
			type : 'string'
		}, {
			name : 'startDate',
			type : 'string'
		}, {
			name : 'docExist',
			type : 'string'
		}, {
			name : 'status',
			type : 'string'
		}, {
			name : 'no',
			type : 'string'
		}, {
			name : 'ie',
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
			name : 'masterBL',
			type : 'string'
		}, {
			name : 'bookingNo',
			type : 'string'
		}, {
			name : 'vslManifestNo',
			type : 'string'
		}, {
			name : 'endDate',
			type : 'string'
		}, {
			name : 'docNo',
			type : 'string'
		}, {
			name : 'activateYN',
			type : 'string'
		}, {
			name : 'categoryCd',
			type : 'string'
		}, {
			name : 'cgNo',
			type : 'string'
		}, {
			name : 'interfacePK',
			type : 'string'
		}
	 ]
})