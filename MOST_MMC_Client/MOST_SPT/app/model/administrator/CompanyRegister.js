Ext.define('MOST.model.administrator.CompanyRegister', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	requires: [
  	],
	fields: [
		{
		 	name: 'companyCode',
			type: 'string'
		},
		{
		 	name: 'engSnm',
			type: 'string'
		},
		{
		 	name: 'ptnrTp',
			type: 'string'
		},
		{
		 	name: 'addr',
			type: 'string'
		},
		{
		 	name: 'telNo',
			type: 'string'
		},
		{
		 	name: 'faxNo',
			type: 'string'
		},
		{
		 	name: 'holdChk',
			type: 'string'
		},
		{
		 	name: 'accountHold',
			type: 'string'
		},
		{
		 	name: 'oldPtnrCode',
			type: 'string'
		},
		{
		 	name: 'cntUser',
			type: 'string'
		}
	],

	associations: [
	]

});