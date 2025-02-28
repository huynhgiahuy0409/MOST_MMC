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
				{"code":"ANCH", "codeName":"ANCHORAGE"},
				{"code":"BDSW", "codeName":"BAGAN DALAM DOCKYARD"},
				{"code":"BWCT", "codeName":"BUTTERWORTH CARGO TERMINAL"},
				{"code":"CALT", "codeName":"CALTEX"},
				{"code":"ESSO", "codeName":"ESSO"},
				{"code":"FERY", "codeName":"FERRY TERMINAL"},
				{"code":"PBCT", "codeName":"PRAI BULK CARGO TERMINAL"},
				{"code":"PRWF", "codeName":"PRAI WHARVES"},
				{"code":"SHEL", "codeName":"SHELL"},
				{"code":"SWPR", "codeName":"SWETTENHAM PIER"},
				{"code":"VOTP", "codeName":"VEGETABLE OIL TANKER PIER"}
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
