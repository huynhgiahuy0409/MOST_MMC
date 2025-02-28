Ext.define('MOST.view.billing.ForeignExchangeRateModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.foreignexchangerate',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.ForeignExchangeRate'
	],

	stores: {
		foreignExchangeRateList: {
			model: 'MOST.model.billing.ForeignExchangeRate',
			storeId: 'foreignExchangeRateListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/foreignexchangerate/list'
			}
		},
		
		copyForeignExchangeRate: {
			model: 'MOST.model.billing.ForeignExchangeRate',
			storeId: 'copyForeignExchangeRateStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/foreignexchangerate/copy'
			}
		},
		
		currencyMaster: {
			model: 'MOST.model.billing.ForeignExchangeRate',
			storeId: 'copyForeignExchangeRateStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/foreignexchangerate/selectcurrencymaster'
			}
		},

		foreignExchangeRateListDuplicateDate: {
			model: 'MOST.model.billing.ForeignExchangeRate',
			storeId: 'foreignExchangeRateListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/foreignexchangerate/duplicateDate'
			}
		},

		applyDateCombo: {
			model: 'MOST.model.billing.ForeignExchangeRate',
			storeId: 'applyDateComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/foreignexchangerate/selectCurrencyIndex'
			}
		},
		
		applyCurrencyCombo: {
			model: 'MOST.model.billing.ForeignExchangeRate',
			storeId: 'applyDateComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/foreignexchangerate/selectCurrencyIndex'
			}
		}
	}
});