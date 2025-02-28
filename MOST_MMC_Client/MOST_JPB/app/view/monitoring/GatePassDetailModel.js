Ext.define('MOST.view.monitoring.GatePassDetailModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.gatepassdetail',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.GatePassImport'
	],

	stores: {
		gatePassDetail: {
			model: 'MOST.model.monitoring.GatePassImport',
			storeId: 'gatePassDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepasslist/gatePassDetailList'
			}
		}
	}
});