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
				{"code":"JP_MOST_JPB", "codeName":"MOST JPB"},
            ]
		},
		
		languageCombo : {
			fields: ['comName','comCode'],
			storeId: 'languageComboStore',
			data :  [
				{"code":"en-US", "codeName":"English"}
            ]
		}
	}
});
