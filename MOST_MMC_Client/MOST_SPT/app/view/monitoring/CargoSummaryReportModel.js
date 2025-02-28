Ext.define('MOST.view.monitoring.CargoSummaryReportModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cargosummaryreport',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.CargoSummaryReport',
	],

	stores: {
		cargoSummaryReport: {
			model: 'MOST.model.monitoring.CargoSummaryReport',
			storeId: 'cargoSummaryReportStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/statistic/cargoSummaryReportItems'
			}
		},
	}
});