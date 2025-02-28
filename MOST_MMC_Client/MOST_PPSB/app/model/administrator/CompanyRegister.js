Ext.define('MOST.model.administrator.CompanyRegister', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	requires: [],
	fields: [
		{
			name: 'companyCode',
			type: 'string',
		},
		{
			name: 'oldPtnrCode',
			type: 'string',
		},
		{
			name: 'engSnm',
			type: 'string',
		},
		{
			name: 'addr',
			type: 'string',
		},
		{
			name: 'telNo',
			type: 'string',
		},
		{
			name: 'faxNo',
			type: 'string',
		},
		{
			name: 'holdChk',
			type: 'string',
		},
		{
			name: 'accountHold',
			type: 'string',
		},
		{
			name: 'extSHA',
			type: 'string',
		},
		{
			name: 'extFWD',
			type: 'string',
		},
		{
			name: 'col1',
			type: 'string',
		},
		{
			name: 'col2',
			type: 'string',
		},
		{
			name: 'representative',
			type: 'string',
		},
		{
			name: 'regNo',
			type: 'string',
		},
		{
			name: 'zipCd',
			type: 'string',
		},
		{
			name: 'staffCd',
			type: 'string',
		},
		{
			name: 'accNo',
			type: 'string',
		},
		{
			name: 'connType',
			type: 'string',
		},
		{
			name: 'connQty',
			type: 'string',
		},
		{
			name: 'email',
			type: 'string',
		},
		{
			name: 'rmk',
			type: 'string',
		},
		{
			name: 'updDt',
			type: 'string',
		},
		{
			name: 'customEdateSHA',
			type: 'date',
			dateFormat: 'd/m/Y',
		},
		{
			name: 'customSdateSHA',
			type: 'date',
			dateFormat: 'd/m/Y',
		},
		{
			name: 'customRefSha',
			type: 'string',
		},
		{
			name: 'customEdateFWD',
			type: 'date',
			dateFormat: 'd/m/Y',
		},
		{
			name: 'customSdateFWD',
			type: 'date',
			dateFormat: 'd/m/Y',
		},
		{
			name: 'customSFWD',
			type: 'string',
		},
		{
			name: 'customEFWD',
			type: 'string',
		},
		{
			name: 'customRefFwd',
			type: 'string',
		},
		{
			name: 'gstRegDt',
			type: 'date',
			dateFormat: 'd/m/Y',
		},
		{
			name: 'gstApplyDt',
			type: 'date',
			dateFormat: 'd/m/Y',
		},
		{
			name: 'gstExpiredDt',
			type: 'date',
			dateFormat: 'd/m/Y',
		},
		{
			name: 'initPtnrSHA',
			type: 'string',
		},
		{
			name: 'initPtnrFWD',
			type: 'string',
		},
		{
			name: 'companyStatus',
			type: 'string',
		},
		{
			name: 'profileStatus',
			type: 'string',
		},
		{
			name: 'ptnrType',
			type: 'string',
		},
		{
			name: 'tmnlCd',
			type: 'string',
		},
		{
			name: 'companyName',
			type: 'string',
		},
		{
			name: 'vcs',
			type: 'string',
		},
		{
			name: 'vcsAp',
			type: 'string',
		},
		{
			name: 'fzip',
			type: 'string',
		},
		{
			name: 'fzipAp',
			type: 'string',
		},
		{
			name: 'mss',
			type: 'string',
		},
		{
			name: 'mssAp',
			type: 'string',
		},
		{
			name: 'mpts',
			type: 'string',
		},
		{
			name: 'mptsAp',
			type: 'string',
		},
		{
			name: 'jcts',
			type: 'string',
		},
		{
			name: 'jctsAp',
			type: 'string',
		},
		{
			name: 'sysCd',
			type: 'string',
		},
		{
			name: 'useYn',
			type: 'string',
		},
		{
			name: 'sysUserId',
			type: 'string',
		},
		{
			name: 'sysOwner',
			type: 'string',
		},
		{
			name: 'sysOwnerAp',
			type: 'string',
		},
		{
			name: 'userRemark',
			type: 'string',
		},
		{
			name: 'systemList',
			mapping: 'systemList',
		},
		//s-MGR-008 PLUS – Company Register List and Detail screen
		{
			name: 'tmnl',
			type: 'string',
		},
		{
			name: 'suspendChk',
			type: 'string',
		},
		{
			name: 'rentalChk',
			type: 'string',
		},
		{
			name: 'paymentTerm',
			type: 'string',
		},
		{
			name: 'tin',
			type: 'string',
		},
		{
			name: 'sstNo',
			type: 'string',
		},
		{
			name: 'bal',
			type: 'number',
		},
		{
			name: 'creditLimit',
			type: 'number',
		},
		{
			name: 'gstRegDt',
			type: 'string',
		},
		{
			name: 'gstApplyDt',
			type: 'string',
		},
		{
			name: 'gstExpiredDt',
			type: 'string',
		},
		//e-MGR-008 PLUS – Company Register List and Detail screen
	],

	associations: [
		{
			type: 'hasMany',
			name: 'systemItem',
			model: 'MOST.model.administrator.CompanyRegister',
		},
	],
});
