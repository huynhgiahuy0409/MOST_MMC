Ext.define('MOST.model.administrator.SearchUserRegisterParm', {
	extend: 'MOST.model.foundation.parm.BizParm',
	
	fields: [{
	 	name: 'userId',
	 	type:'string'
	},{
	 	name: 'regUserId',
	 	type:'string'
	}, {
		name: 'engNm',
		type:'string'
	}, {
		name: 'telNo',
		type:'string'
	}, {
		name: 'emailAddr',
		type:'string'
	}, {
		name: 'useYn',
		type:'string'
	}, {
		name: 'userType',
		type:'string'
	}, {
		name: 'userLevel',
		type:'string'
	}, {
		name: 'idNo',
		type:'string'
	}, {
		name: 'lastLogin',
		type:'string'
	}, {
		name: 'designation',
		type:'string'
	}, {
		name: 'updDt',
		type: 'string'
	}, {
		name: 'faxNo',
		type:'string'
	}, {
		name: 'addr',
		type:'string'
	}, {
		name: 'extNo',
		type:'string'
	}, {
		name: 'password',
		type:'string'
	}, {
		name: 'ptnrCd',
		type:'string'
	}, {
		name: 'ptnrType',
		type: 'string'
	}, {
		name: 'vcsAp',
		type: 'string'
	}, {
		name: 'fzipsAp',
		type:'string'
	}, {
		name: 'mssAp',
		type:'string'
	}, {
		name: 'jctsAp',
		type:'string'
	}, {
		name: 'mptsAp',
		type:'string'
	}, {
		name: 'spjAp',
		type:'string'
	}, {
		name: 'sptcatosAp',
		type:'string'
	}, {
		name: 'attachFile',
		type:'string'
	}, {
		name: 'userTypeNm',
		type:'string'
	}, {
		name: 'ptnrNm',
		type:'string'
	}, {
		name: 'ptnrTypes',
		type:'string'
	}, {
		name: 'grdCd',
		type:'string'
	}, {
		name: 'userImage',
		type:'auto'
	}, {
		name: 'check',
		type: 'boolean'
	}, {
		name: 'authGrp',
		type: 'string'
	}, {
		name: 'authGrpNm',
		type: 'string'
	}, {
		name: 'authCd',
		type: 'string'
	}, {
		name: 'grpOrd',
		type: 'string'
	}, {
		name: 'staffCd',
		defaultValue: 'SYSTEM'
	}, {
		name: 'partnerType',
		type: 'string'
	}, {
		name: 'partnerTypeName',
		type: 'string'
	}, {
		name: 'partnerCode',
		type: 'string'
	}, {
		name: 'alliance',
		type: 'string'
	}, {
		name: 'allianceCode',
		type: 'string'
	}, {
		name: 'groupId',
		type: 'string'
	}, {
		name: 'groupType',
		type: 'string'
	}, {
		name: 'description',
		type: 'string'
	}, {
		name: 'useApp',
		type: 'string'
	}, {
		name: 'partners',
		type: 'auto'
	}]
});