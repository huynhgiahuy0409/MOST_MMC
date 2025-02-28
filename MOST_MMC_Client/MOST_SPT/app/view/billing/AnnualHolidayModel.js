Ext.define('MOST.view.billing.AnnualHolidayModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.annualholiday',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.AnnualHoliday'
	],

	stores: {
		defineHolidayList: {
			model: 'MOST.model.billing.AnnualHoliday',
			storeId: 'defineholidayStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/annualholiday/defineholiydaylist'
			}
		},
		
		annualHolidayList: {
			model: 'MOST.model.billing.AnnualHoliday',
			storeId: 'annualholidayStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/annualholiday/annualholidaylist'
			}
		},
		
		annualHolidayListDuplicateCheck: {
			model: 'MOST.model.billing.AnnualHoliday',
			storeId: 'annualHolidayListDuplicateCheckStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/annualholiday/annualholidaylist/duplicatecheck'
			}
		}
	}
});