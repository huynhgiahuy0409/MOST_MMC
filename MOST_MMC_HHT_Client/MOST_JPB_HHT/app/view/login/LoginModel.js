Ext.define('MOST.view.login.LoginModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.login',

	requires: [
	],

	stores: {
		branchCombo : {
			fields: ['comName','comCode'],
			storeId: 'branchCombo',
			data :  [
				{"code":"DB1", "codeName":"KMDC"},
				{"code":"DB2", "codeName":"KRIT"},
				{"code":"DB3", "codeName":"KDIC"},
				{"code":"DB4", "codeName":"KKSC"}
            ]
		},
		
		languageCombo : {
			fields: ['comName','comCode'],
			storeId: 'languageComboStore',
			data :  [
				{"code":"vi-VN", "codeName":"Vietnamese"},
				{"code":"en-US", "codeName":"English"}
            ]
		},

		shiftCombo : {
			fields: ['codeValue','codeDisplay'],
			storeId: 'shiftComboStore',
			data :  [
				{codeValue: 'SF0014', codeDisplay: '1ST'},
                {codeValue: 'SF0012', codeDisplay: '2ND'},
                {codeValue: 'SF0013', codeDisplay: '3ND'}
            ]
		}
	}
});
