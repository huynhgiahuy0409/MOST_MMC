Ext.define('MOST.view.billing.DefineHolidayCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.defineholidaycode',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.DefineHolidayCode'
	],

	stores: {
		defineHolidayCodeList: {
			model: 'MOST.model.billing.DefineHolidayCode',
			storeId: 'defineHolidayCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/defineholidaycode/list'
			}
		},
		defineHolidayCodeDuplicateCheck: {
			model: 'MOST.model.billing.DefineHolidayCode',
			showProgressBar : false,
			storeId: 'defineHolidayCodeDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/defineholidaycode/list/duplicatecheck'
			}
		}
	}
});