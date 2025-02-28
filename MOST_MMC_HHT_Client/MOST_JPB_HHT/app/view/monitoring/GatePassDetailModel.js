Ext.define('MOST.view.controller.GatePassDetailModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.gatepassdetail',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.controller.GatePassImport'
	],

	stores: {
		gatePassDetail: {
			model: 'MOST.model.controller.GatePassImport',
			storeId: 'gatePassDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepassdetail/gatePassDetailList'
			}
		},
		generatePDFGatePassDetail: {
			model: 'MOST.model.controller.GatePassImport',
			storeId: 'generatePDFGatePassStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepassdetail/generatepdfgatepassdetail'
			}
		},
	}
});