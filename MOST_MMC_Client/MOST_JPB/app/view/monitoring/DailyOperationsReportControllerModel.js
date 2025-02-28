Ext.define('MOST.view.monitoring.DailyOperationsReportControllerModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.dailyoperationreport',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.DailyHandlingReport',
	],

	stores: {
		
	}
});