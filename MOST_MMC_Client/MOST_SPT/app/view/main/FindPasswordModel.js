Ext.define('MOST.view.main.FindPasswordModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.findpassword',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		findPasswordConfig: {
			model: 'MOST.model.administrator.User',
			storeId: 'findPasswordConfigStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/auth/findPassword'
			}
		},
	}
});