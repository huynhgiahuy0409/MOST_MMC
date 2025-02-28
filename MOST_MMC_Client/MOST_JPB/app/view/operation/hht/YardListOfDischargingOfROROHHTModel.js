Ext.define('MOST.view.operation.hht.YardListOfDischargingOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.yardlistofdischargingofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmDischargingOfRORO'
	],

	stores: {
		
		unitItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'unitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlisthht'
			}
		},
	}
});