Ext.define('MOST.view.codes.CountryCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.countryCode',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores: {
		countryCode: {
			model: 'MOST.model.codes.CountryCode',
			storeId: 'countryCodeStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/countrycode/countryCodes'
			}
		},
		
		countryCodeDuplicateCheck: {
			model: 'MOST.model.codes.CountryCode',
			storeId: 'countryCodeDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/countrycode/countryCodeDuplicateCheck'
			}
		}
	}
});
